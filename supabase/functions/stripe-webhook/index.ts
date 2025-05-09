import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { Stripe } from 'npm:stripe@14.17.0';
import { createClient } from 'npm:@supabase/supabase-js@2.39.8';

// Initialize Stripe and Supabase clients
const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const stripe = new Stripe(stripeSecret, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!, 
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// CORS headers for responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Main request handler
Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return createErrorResponse('Method not allowed', 405);
  }

  try {
    // Validate environment variables
    if (!stripeSecret || !stripeWebhookSecret) {
      throw new Error('Missing required environment variables');
    }

    // Get the signature from the headers
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      return createErrorResponse('Missing stripe-signature header', 400);
    }

    // Get the raw request body
    const body = await req.text();
    
    // Verify the webhook signature and construct the event
    const event = await verifyWebhookSignature(body, signature);
    
    // Process the event asynchronously
    EdgeRuntime.waitUntil(processStripeEvent(event));

    // Return a success response
    return new Response(
      JSON.stringify({ received: true }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
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

// Verify webhook signature and construct event
async function verifyWebhookSignature(body: string, signature: string): Promise<Stripe.Event> {
  try {
    return stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    throw new Error(`Webhook signature verification failed: ${err.message}`);
  }
}

// Process Stripe event
async function processStripeEvent(event: Stripe.Event): Promise<void> {
  console.log(`Processing event: ${event.type}`);
  
  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentIntentSucceeded(event);
      break;
    case 'checkout.session.completed':
      await handleCheckoutSessionCompleted(event);
      break;
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      await handleSubscriptionEvent(event);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
}

// Handle payment intent succeeded event
async function handlePaymentIntentSucceeded(event: Stripe.Event): Promise<void> {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  
  // Skip if this is a subscription-related payment
  if (paymentIntent.invoice) {
    console.log(`PaymentIntent ${paymentIntent.id} is for a subscription, skipping`);
    return;
  }
  
  console.log(`PaymentIntent ${paymentIntent.id} succeeded`);
  
  try {
    // Store payment in database
    const { error: insertError } = await supabase
      .from('payments')
      .insert({
        payment_id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        description: paymentIntent.description,
        metadata: paymentIntent.metadata,
      });
      
    if (insertError) {
      console.error('Error storing payment:', insertError);
    }
  } catch (error) {
    console.error('Error processing payment intent:', error);
  }
}

// Handle checkout session completed event
async function handleCheckoutSessionCompleted(event: Stripe.Event): Promise<void> {
  const session = event.data.object as Stripe.Checkout.Session;
  const customerId = session.customer as string;
  
  if (!customerId) {
    console.error('No customer ID in checkout session');
    return;
  }
  
  const { mode, payment_status } = session;
  
  if (mode === 'subscription') {
    // Handle subscription checkout
    await syncCustomerFromStripe(customerId);
  } else if (mode === 'payment' && payment_status === 'paid') {
    // Handle one-time payment
    await processOneTimePayment(session, customerId);
  }
}

// Handle subscription events
async function handleSubscriptionEvent(event: Stripe.Event): Promise<void> {
  const subscription = event.data.object as Stripe.Subscription;
  const customerId = subscription.customer as string;
  
  if (!customerId) {
    console.error('No customer ID in subscription event');
    return;
  }
  
  await syncCustomerFromStripe(customerId);
}

// Process one-time payment
async function processOneTimePayment(
  session: Stripe.Checkout.Session, 
  customerId: string
): Promise<void> {
  try {
    // Extract the necessary information from the session
    const {
      id: checkout_session_id,
      payment_intent,
      amount_subtotal,
      amount_total,
      currency,
      payment_status,
    } = session;

    // Insert the order into the stripe_orders table
    const { error: orderError } = await supabase.from('stripe_orders').insert({
      checkout_session_id,
      payment_intent_id: payment_intent as string,
      customer_id: customerId,
      amount_subtotal: amount_subtotal || 0,
      amount_total: amount_total || 0,
      currency: currency || 'usd',
      payment_status,
      status: 'completed', // assuming we want to mark it as completed since payment is successful
    });

    if (orderError) {
      console.error('Error inserting order:', orderError);
      return;
    }
    
    console.info(`Successfully processed one-time payment for session: ${checkout_session_id}`);
  } catch (error) {
    console.error('Error processing one-time payment:', error);
  }
}

// Sync customer subscription data from Stripe
async function syncCustomerFromStripe(customerId: string): Promise<void> {
  try {
    console.info(`Syncing subscription data for customer: ${customerId}`);
    
    // Fetch latest subscription data from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    // Handle case with no subscriptions
    if (subscriptions.data.length === 0) {
      console.info(`No active subscriptions found for customer: ${customerId}`);
      await updateSubscriptionStatus(customerId, 'not_started');
      return;
    }

    // Get the first subscription (assuming one subscription per customer)
    const subscription = subscriptions.data[0];
    
    // Prepare payment method data if available
    const paymentMethodData = getPaymentMethodData(subscription);
    
    // Update subscription in database
    await updateSubscriptionData(customerId, subscription, paymentMethodData);
    
    console.info(`Successfully synced subscription for customer: ${customerId}`);
  } catch (error) {
    console.error(`Failed to sync subscription for customer ${customerId}:`, error);
    throw error;
  }
}

// Update subscription status when no subscriptions exist
async function updateSubscriptionStatus(customerId: string, status: string): Promise<void> {
  const { error } = await supabase.from('stripe_subscriptions').upsert(
    {
      customer_id: customerId,
      subscription_status: status,
    },
    {
      onConflict: 'customer_id',
    },
  );

  if (error) {
    console.error('Error updating subscription status:', error);
    throw new Error('Failed to update subscription status in database');
  }
}

// Get payment method data from subscription
function getPaymentMethodData(subscription: Stripe.Subscription): {
  payment_method_brand?: string | null;
  payment_method_last4?: string | null;
} {
  if (
    subscription.default_payment_method && 
    typeof subscription.default_payment_method !== 'string'
  ) {
    return {
      payment_method_brand: subscription.default_payment_method.card?.brand ?? null,
      payment_method_last4: subscription.default_payment_method.card?.last4 ?? null,
    };
  }
  
  return {};
}

// Update subscription data in database
async function updateSubscriptionData(
  customerId: string, 
  subscription: Stripe.Subscription,
  paymentMethodData: {
    payment_method_brand?: string | null;
    payment_method_last4?: string | null;
  }
): Promise<void> {
  const { error } = await supabase.from('stripe_subscriptions').upsert(
    {
      customer_id: customerId,
      subscription_id: subscription.id,
      price_id: subscription.items.data[0].price.id,
      current_period_start: subscription.current_period_start,
      current_period_end: subscription.current_period_end,
      cancel_at_period_end: subscription.cancel_at_period_end,
      ...paymentMethodData,
      status: subscription.status,
    },
    {
      onConflict: 'customer_id',
    },
  );

  if (error) {
    console.error('Error syncing subscription:', error);
    throw new Error('Failed to sync subscription in database');
  }
}