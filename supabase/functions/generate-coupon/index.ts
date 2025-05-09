import { createClient } from 'npm:@supabase/supabase-js@2.39.8';

// CORS headers for responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Interface for request payload
interface GenerateCouponPayload {
  review_id: string;
  company_id: string;
  email?: string;
  phone?: string;
  discount_amount?: number;
  discount_type?: 'percentage' | 'fixed';
  expires_days?: number;
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
    const payload = await parseRequestBody(req);
    
    // Validate required fields
    if (!payload.review_id || !payload.company_id) {
      return createErrorResponse('Missing required fields: review_id and company_id are required', 400);
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return createErrorResponse('Server configuration error', 500);
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get company name for coupon code generation
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('name')
      .eq('id', payload.company_id)
      .single();
      
    if (companyError) {
      return createErrorResponse(`Failed to fetch company: ${companyError.message}`, 500);
    }

    // Generate coupon code
    const couponCode = generateCouponCode(company.name, payload.review_id);
    
    // Set default values
    const discountAmount = payload.discount_amount || 10;
    const discountType = payload.discount_type || 'percentage';
    const expiresDays = payload.expires_days || 30;
    
    // Calculate expiration date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresDays);

    // Insert coupon into database
    const { data: coupon, error: insertError } = await supabase
      .from('coupons')
      .insert({
        company_id: payload.company_id,
        review_id: payload.review_id,
        coupon_code: couponCode,
        discount_amount: discountAmount,
        discount_type: discountType,
        email: payload.email || null,
        phone: payload.phone || null,
        expires_at: expiresAt.toISOString()
      })
      .select()
      .single();
      
    if (insertError) {
      return createErrorResponse(`Failed to create coupon: ${insertError.message}`, 500);
    }

    // Send email with coupon if email is provided
    if (payload.email) {
      await sendCouponEmail(
        payload.email,
        couponCode,
        company.name,
        discountAmount,
        discountType,
        expiresAt.toISOString()
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        coupon: {
          id: coupon.id,
          coupon_code: coupon.coupon_code,
          discount_amount: coupon.discount_amount,
          discount_type: coupon.discount_type,
          expires_at: coupon.expires_at
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error generating coupon:', error);
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

// Parse request body
async function parseRequestBody(req: Request): Promise<GenerateCouponPayload> {
  try {
    return await req.json();
  } catch (error) {
    throw new Error('Invalid request body');
  }
}

// Generate a unique coupon code
function generateCouponCode(companyName: string, reviewId: string): string {
  // Format: First 3 chars of company name + random 4 chars + last 3 digits of review ID
  const companyPrefix = companyName.substring(0, 3).toUpperCase();
  const randomChars = Array.from({ length: 4 }, () => 
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join('');
  const reviewSuffix = reviewId.substring(reviewId.length - 3);
  
  return `${companyPrefix}${randomChars}${reviewSuffix}`;
}

// Send email with coupon
async function sendCouponEmail(
  email: string,
  couponCode: string,
  companyName: string,
  discountAmount: number,
  discountType: 'percentage' | 'fixed',
  expiresAt?: string
) {
  try {
    // Format discount
    const discount = `${discountAmount}${discountType === 'percentage' ? '%' : '€'}`;
    
    // Format expiration date
    const expirationText = expiresAt 
      ? `This coupon expires on ${new Date(expiresAt).toLocaleDateString()}.`
      : 'This coupon has no expiration date.';

    // Create email content
    const subject = `Your ${discount} discount coupon from ${companyName}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #3b82f6; margin-bottom: 10px;">Your Discount Coupon</h1>
          <p style="color: #4b5563; font-size: 16px;">Thank you for your feedback!</p>
        </div>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
          <p style="font-size: 14px; color: #6b7280; margin-bottom: 10px;">Your coupon code:</p>
          <div style="background-color: white; padding: 15px; border-radius: 6px; border: 1px dashed #d1d5db; margin-bottom: 15px;">
            <p style="font-family: monospace; font-size: 24px; font-weight: bold; color: #1f2937; margin: 0;">${couponCode}</p>
          </div>
          <p style="font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 5px;">
            ${discount} OFF
          </p>
          <p style="font-size: 14px; color: #6b7280;">
            at ${companyName}
          </p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
            Present this coupon code during your next visit to ${companyName} to receive your discount.
            ${expirationText}
          </p>
        </div>
        
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px;">
            This email was sent to you because you provided your email address when leaving a review.
            If you have any questions, please contact ${companyName} directly.
          </p>
        </div>
      </div>
    `;

    // Send email using send-email function
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables');
    }
    
    const response = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({
        to: email,
        subject,
        html,
        from: 'noreply@ocenagor.si'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send coupon email');
    }

    console.log(`Coupon email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending coupon email:', error);
    return false;
  }
}