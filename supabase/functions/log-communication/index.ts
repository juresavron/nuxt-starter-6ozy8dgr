import { createClient } from 'npm:@supabase/supabase-js@2.39.8';

// CORS headers for responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Interface for request payload
interface LogCommunicationPayload {
  type: 'email' | 'sms';
  recipient: string;
  subject?: string;
  content: string;
  communicationType: string;
  status: string;
  company_id?: string;
  review_id?: string;
  error_message?: string;
  metadata?: Record<string, any>;
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
    // Parse request body
    let payload: LogCommunicationPayload;
    try {
      payload = await req.json();
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return createErrorResponse('Invalid request body format', 400);
    }
    
    // Validate required fields
    if (!payload.type || !payload.recipient || !payload.content || !payload.communicationType) {
      return createErrorResponse('Missing required fields', 400);
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return createErrorResponse('Server configuration error', 500);
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Log communication based on type
    let result;
    try {
      if (payload.type === 'email') {
        result = await logEmail(supabase, payload);
      } else {
        result = await logSMS(supabase, payload);
      }
    } catch (dbError) {
      console.error(`Error inserting ${payload.type} log:`, dbError);
      return createErrorResponse(`Failed to log ${payload.type}: ${dbError.message}`, 500);
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        id: result.id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error logging communication:', error);
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

// Log email communication
async function logEmail(supabase: any, payload: LogCommunicationPayload) {
  const { data, error } = await supabase
    .from('email_logs')
    .insert({
      recipient: payload.recipient,
      subject: payload.subject || '',
      content: payload.content,
      template_name: payload.communicationType,
      status: payload.status,
      company_id: payload.company_id || null,
      review_id: payload.review_id || null,
      metadata: payload.metadata || null
    })
    .select()
    .single();
    
  if (error) {
    console.error('Error logging email:', error);
    throw new Error(`Failed to log email: ${error.message}`);
  }
  
  return data;
}

// Log SMS communication
async function logSMS(supabase: any, payload: LogCommunicationPayload) {
  const { data, error } = await supabase
    .from('sms_logs')
    .insert({
      recipient: payload.recipient,
      content: payload.content,
      status: payload.status,
      company_id: payload.company_id || null,
      review_id: payload.review_id || null,
      error_message: payload.error_message || null,
      metadata: payload.metadata || null
    })
    .select()
    .single();
    
  if (error) {
    console.error('Error logging SMS:', error);
    throw new Error(`Failed to log SMS: ${error.message}`);
  }
  
  return data;
}