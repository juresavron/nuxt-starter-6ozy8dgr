import { Resend } from 'npm:resend@3.2.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // In production, you should limit this to your domain
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-auth, *',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
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
    // Get the API key from environment variables
    const resendApiKey = Deno.env.get('EMAIL_API_KEY');
    console.log('API Key available:', !!resendApiKey);
    
    if (!resendApiKey) {
      console.error('EMAIL_API_KEY environment variable is not set');
      return new Response(
        JSON.stringify({ error: 'EMAIL_API_KEY is not set' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Initialize Resend client
    const resend = new Resend(resendApiKey);

    // Parse request body
    const payload: EmailPayload = await req.json();
    console.log('Received email request:', { 
      to: payload.to, 
      subject: payload.subject,
      from: payload.from || 'Not specified'
    });
    
    // Validate required fields
    if (!payload.to || !payload.subject || !payload.html) {
      console.error('Missing required fields in email request');
      return new Response(
        JSON.stringify({ error: 'Missing required fields: to, subject, or html' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Set default from address if not provided
    const from = payload.from || 'noreply@ocenagor.si';

    // Send email
    console.log('Sending email via Resend API');
    const { data, error } = await resend.emails.send({
      from,
      to: payload.to.trim(),
      subject: payload.subject,
      html: payload.html,
    });

    if (error) {
      console.error('Resend API error:', JSON.stringify(error));
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Return success response
    console.log('Email sent successfully:', data?.id);
    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: data?.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Unexpected error in send-email function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});