import { Stripe } from 'npm:stripe@14.17.0';
import { createClient } from 'npm:@supabase/supabase-js@2.39.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface PaymentIntentPayload {
  amount: number;
  currency: string;
  description: string;
}

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
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // Get Stripe API key from environment variables
    const stripeApiKey = Deno.env.get('STRIPE_SECRET_KEY');
    
    if (!stripeApiKey) {
      console.error('STRIPE_SECRET_KEY environment variable is not set');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Initialize Stripe client
    const stripe = new Stripe(stripeApiKey, {
      apiVersion: '2023-10-16',
    });

    // Parse request body
    const payload: PaymentIntentPayload = await req.json();
    
    // Validate required fields
    if (!payload.amount || !payload.currency) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: amount or currency' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: payload.amount,
      currency: payload.currency,
      description: payload.description || 'Payment for ocenagor.si',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return client secret
    return new Response(
      JSON.stringify({ 
        clientSecret: paymentIntent.client_secret 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});