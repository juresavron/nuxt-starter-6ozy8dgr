import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

// CORS headers for responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': '*',
};

// Helper function to create responses with CORS headers
function corsResponse(body: string | object | null, status = 200) {
  // For 204 No Content, don't include Content-Type or body
  if (status === 204) {
    return new Response(null, { status, headers: corsHeaders });
  }

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

// Main request handler
Deno.serve(async (req) => {
  try {
    // Handle CORS preflight request
    if (req.method === 'OPTIONS') {
      return corsResponse({}, 204);
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
      return corsResponse({ error: 'Method not allowed' }, 405);
    }

    // Initialize Stripe client
    const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecret) {
      console.error('STRIPE_SECRET_KEY environment variable is not set');
      return corsResponse({ error: 'Server configuration error' }, 500);
    }
    
    const stripe = new Stripe(stripeSecret, {
      appInfo: { name: 'Bolt Integration', version: '1.0.0' },
    });

    // Parse request body
    const { price_id, success_url, cancel_url, mode } = await req.json();

    // Validate request parameters
    const error = validateParameters(
      { price_id, success_url, cancel_url, mode },
      {
        cancel_url: 'string',
        price_id: 'string',
        success_url: 'string',
        mode: { values: ['payment', 'subscription'] },
      },
    );

    if (error) {
      return corsResponse({ error }, 400);
    }

    // Authenticate user
    const user = await authenticateUser(req);
    if (!user) {
      return corsResponse({ error: 'Failed to authenticate user' }, 401);
    }

    // Get or create Stripe customer
    const customerId = await getOrCreateCustomer(user);
    if (!customerId) {
      return corsResponse({ error: 'Failed to create customer' }, 500);
    }

    // Create checkout session
    const session = await createCheckoutSession(customerId, price_id, success_url, cancel_url, mode);

    // Return session ID and URL
    return corsResponse({ 
      sessionId: session.id, 
      url: session.url 
    });
  } catch (error: any) {
    console.error(`Checkout error: ${error.message}`);
    return corsResponse({ error: error.message }, 500);
  }
});

// Authenticate user from request
async function authenticateUser(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return null;
  }

  const token = authHeader.replace('Bearer ', '');
  
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    throw new Error('Server configuration error');
  }
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const { data: { user }, error: getUserError } = await supabase.auth.getUser(token);

  if (getUserError || !user) {
    console.error('Failed to authenticate user:', getUserError);
    return null;
  }

  return user;
}

// Get or create Stripe customer for user
async function getOrCreateCustomer(user: any) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    throw new Error('Server configuration error');
  }
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  // Initialize Stripe client
  const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY');
  if (!stripeSecret) {
    console.error('STRIPE_SECRET_KEY environment variable is not set');
    throw new Error('Server configuration error');
  }
  
  const stripe = new Stripe(stripeSecret, {
    appInfo: { name: 'Bolt Integration', version: '1.0.0' },
  });

  // Check if customer already exists
  const { data: customer, error: getCustomerError } = await supabase
    .from('stripe_customers')
    .select('customer_id')
    .eq('user_id', user.id)
    .is('deleted_at', null)
    .maybeSingle();

  if (getCustomerError) {
    console.error('Failed to fetch customer information:', getCustomerError);
    return null;
  }

  // Return existing customer ID if found
  if (customer?.customer_id) {
    return customer.customer_id;
  }

  // Create new customer in Stripe
  const newCustomer = await stripe.customers.create({
    email: user.email,
    metadata: { userId: user.id },
  });

  // Save customer mapping in database
  const { error: createCustomerError } = await supabase
    .from('stripe_customers')
    .insert({ user_id: user.id, customer_id: newCustomer.id });

  if (createCustomerError) {
    console.error('Failed to save customer mapping:', createCustomerError);
    await stripe.customers.del(newCustomer.id).catch(console.error);
    return null;
  }

  return newCustomer.id;
}

// Create Stripe checkout session
async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string,
  mode: 'payment' | 'subscription'
) {
  // Initialize Stripe client
  const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY');
  if (!stripeSecret) {
    console.error('STRIPE_SECRET_KEY environment variable is not set');
    throw new Error('Server configuration error');
  }
  
  const stripe = new Stripe(stripeSecret, {
    appInfo: { name: 'Bolt Integration', version: '1.0.0' },
  });

  // Create subscription record if needed
  if (mode === 'subscription') {
    await ensureSubscriptionRecord(customerId);
  }

  console.log(`Creating checkout session for customer ${customerId} with price ${priceId}`);

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode,
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
  
  console.log(`Created checkout session ${session.id}`);
  return session;
}

// Ensure subscription record exists for customer
async function ensureSubscriptionRecord(customerId: string) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    throw new Error('Server configuration error');
  }
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Check if subscription record exists
  const { data: subscription, error: getSubError } = await supabase
    .from('stripe_subscriptions')
    .select('status')
    .eq('customer_id', customerId)
    .maybeSingle();

  if (getSubError) {
    console.error('Failed to fetch subscription:', getSubError);
    throw new Error('Failed to fetch subscription information');
  }

  // Create subscription record if it doesn't exist
  if (!subscription) {
    console.log(`Creating subscription record for customer ${customerId}`);
    const { error: createSubError } = await supabase
      .from('stripe_subscriptions')
      .insert({ customer_id: customerId, status: 'not_started' });

    if (createSubError) {
      console.error('Failed to create subscription record:', createSubError);
      throw new Error('Failed to create subscription record');
    }
    console.log(`Created subscription record for customer ${customerId}`);
  }
}

// Validate request parameters
type ExpectedType = 'string' | { values: string[] };
type Expectations<T> = { [K in keyof T]: ExpectedType };

function validateParameters<T extends Record<string, any>>(
  values: T,
  expected: Expectations<T>
): string | undefined {
  for (const parameter in values) {
    const expectation = expected[parameter];
    const value = values[parameter];

    if (expectation === 'string') {
      if (value == null) {
        return `Missing required parameter ${parameter}`;
      }
      if (typeof value !== 'string') {
        return `Expected parameter ${parameter} to be a string got ${JSON.stringify(value)}`;
      }
    } else {
      if (!expectation.values.includes(value)) {
        return `Expected parameter ${parameter} to be one of ${expectation.values.join(', ')}`;
      }
    }
  }

  return undefined;
}