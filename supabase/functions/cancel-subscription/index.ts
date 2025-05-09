import { Stripe } from 'npm:stripe@14.17.0';
import { createClient } from 'npm:@supabase/supabase-js@2.39.8';

// CORS headers for responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Interface for request payload
interface CancelSubscriptionPayload {
  subscription_id: string;
  cancel_reason?: string;
  cancel_immediately?: boolean;
}

// Main request handler
Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return createErrorResponse('Method not allowed', 405);
  }

  try {
    // Initialize Stripe client
    const stripe = initializeStripe();
    
    // Parse request body
    const payload = await parseRequestBody(req);
    
    // Validate required fields
    if (!payload.subscription_id) {
      return createErrorResponse('Missing required field: subscription_id', 400);
    }

    // Authenticate user
    const user = await authenticateUser(req);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    // Check authorization for subscription cancellation
    const authorized = await checkCancellationAuthorization(user.id, payload.subscription_id);
    if (!authorized) {
      return createErrorResponse('Unauthorized to cancel this subscription', 403);
    }

    // Cancel the subscription
    const result = await cancelSubscription(stripe, payload);

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        subscription: {
          id: result.id,
          status: result.status,
          cancel_at_period_end: result.cancel_at_period_end,
          current_period_end: result.current_period_end
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return createErrorResponse(error.message, 500);
  }
});

// Helper function to create error responses
function createErrorResponse(message: string, status: number): Response {
  return new Response(
    JSON.stringify({ error: message }),
    {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}

// Initialize Stripe client
function initializeStripe(): Stripe {
  const stripeApiKey = Deno.env.get('STRIPE_SECRET_KEY');
  
  if (!stripeApiKey) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set');
  }
  
  return new Stripe(stripeApiKey, {
    apiVersion: '2023-10-16',
  });
}

// Parse request body
async function parseRequestBody(req: Request): Promise<CancelSubscriptionPayload> {
  try {
    return await req.json();
  } catch (error) {
    throw new Error('Invalid request body');
  }
}

// Authenticate user from request
async function authenticateUser(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return null;
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const token = authHeader.replace('Bearer ', '');
  
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  
  if (authError || !user) {
    console.error('Auth error:', authError);
    return null;
  }
  
  return user;
}

// Check if user is authorized to cancel subscription
async function checkCancellationAuthorization(
  userId: string, 
  subscriptionId: string
): Promise<boolean> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  // Check if user is a superadmin
  const { data: adminData, error: adminError } = await supabase
    .from('admin_users')
    .select('is_superadmin')
    .eq('id', userId)
    .single();
  
  if (!adminError && adminData?.is_superadmin) {
    return true; // Superadmins can cancel any subscription
  }
  
  // Check if subscription belongs to the user
  const { data: subscriptionData, error: subscriptionError } = await supabase
    .from('stripe_subscriptions')
    .select('customer_id')
    .eq('subscription_id', subscriptionId)
    .single();
  
  if (subscriptionError || !subscriptionData) {
    console.error('Error fetching subscription:', subscriptionError);
    return false;
  }
  
  const { data: customerData, error: customerError } = await supabase
    .from('stripe_customers')
    .select('user_id')
    .eq('customer_id', subscriptionData.customer_id)
    .single();
  
  if (customerError || !customerData) {
    console.error('Error fetching customer:', customerError);
    return false;
  }
  
  return customerData.user_id === userId;
}

// Cancel subscription in Stripe
async function cancelSubscription(
  stripe: Stripe, 
  payload: CancelSubscriptionPayload
): Promise<Stripe.Subscription> {
  if (payload.cancel_immediately) {
    // Cancel immediately
    return await stripe.subscriptions.cancel(payload.subscription_id);
  } else {
    // Cancel at period end
    return await stripe.subscriptions.update(payload.subscription_id, {
      cancel_at_period_end: true,
      cancellation_reason: payload.cancel_reason || undefined
    });
  }
}