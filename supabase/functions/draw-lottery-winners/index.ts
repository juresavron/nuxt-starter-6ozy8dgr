// CORS headers for responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Coupon configuration
const COUPON_CONFIG = {
  discountAmount: 10,
  discountType: 'percentage',
  expiryDays: 30
};

import { createClient } from 'npm:@supabase/supabase-js@2.39.8';

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
    // Parse request body to get specific company ID if provided
    const body = await parseRequestBody(req);
    const companyId = body?.company_id || null;

    // Initialize Supabase client
    const supabase = initializeSupabase();
    
    // Get companies eligible for drawing
    const companies = await getEligibleCompanies(supabase, companyId);
    
    // Process each company
    const results = await processCompanies(supabase, companies);

    // Return success response
    return new Response(
      JSON.stringify({ success: true, results }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error drawing lottery winners:', error);
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
async function parseRequestBody(req: Request) {
  try {
    return await req.json();
  } catch (e) {
    // No body or invalid JSON
    return null;
  }
}

// Initialize Supabase client
function initializeSupabase() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Server configuration error: Missing Supabase credentials');
  }
  
  return createClient(supabaseUrl, supabaseServiceKey);
}

// Get companies eligible for drawing
async function getEligibleCompanies(supabase: any, companyId: string | null) {
  const now = new Date();
  let companiesQuery = supabase
    .from('companies')
    .select('id, name, coupon_type, lottery_drawing_frequency, lottery_drawing_day, next_drawing_date, last_drawing_date')
    .eq('coupon_type', 'lottery');
    
  // If specific company ID is provided, filter by it
  if (companyId) {
    companiesQuery = companiesQuery.eq('id', companyId);
  } else {
    // Otherwise, only get companies due for drawing
    companiesQuery = companiesQuery.or(`next_drawing_date.is.null,next_drawing_date.lte.${now.toISOString()}`);
  }
  
  const { data: companies, error: companiesError } = await companiesQuery;
    
  if (companiesError) {
    throw new Error(`Failed to fetch companies: ${companiesError.message}`);
  }
  
  return companies || [];
}

// Process each company for drawing
async function processCompanies(supabase: any, companies: any[]) {
  const results = [];
  const now = new Date();
  
  for (const company of companies) {
    // Skip companies without lottery enabled
    if (company.coupon_type !== 'lottery') continue;
    
    // Calculate next drawing date if not set
    if (!company.next_drawing_date) {
      const nextDate = calculateNextDrawingDate(
        company.lottery_drawing_frequency, 
        company.lottery_drawing_day
      );
      
      // Update company with next drawing date
      await updateCompanyDrawingDate(supabase, company.id, nextDate);
      
      // Skip drawing for this company as we just set the initial date
      results.push({
        company_id: company.id,
        company_name: company.name,
        status: 'scheduled',
        next_drawing: nextDate.toISOString()
      });
      continue;
    }
    
    // Check if drawing is due or forced by specific company ID
    const drawingDate = new Date(company.next_drawing_date);
    if (drawingDate > now && !company.id) {
      // Not due yet
      results.push({
        company_id: company.id,
        company_name: company.name,
        status: 'scheduled',
        next_drawing: company.next_drawing_date
      });
      continue;
    }
    
    // Drawing is due or forced, perform the drawing
    const drawingResult = await performDrawing(supabase, company.id, company.name);
    
    // Calculate next drawing date
    const nextDate = calculateNextDrawingDate(
      company.lottery_drawing_frequency, 
      company.lottery_drawing_day
    );
    
    // Update company with next drawing date and last drawing date
    await updateCompanyDrawingDates(supabase, company.id, nextDate, now);
    
    results.push({
      company_id: company.id,
      company_name: company.name,
      status: drawingResult.success ? 'drawn' : 'failed',
      winner_id: drawingResult.winner_id,
      error: drawingResult.error,
      next_drawing: nextDate.toISOString()
    });
  }
  
  return results;
}

// Update company with next drawing date
async function updateCompanyDrawingDate(supabase: any, companyId: string, nextDate: Date) {
  await supabase
    .from('companies')
    .update({ next_drawing_date: nextDate.toISOString() })
    .eq('id', companyId);
}

// Update company with next drawing date and last drawing date
async function updateCompanyDrawingDates(supabase: any, companyId: string, nextDate: Date, now: Date) {
  await supabase
    .from('companies')
    .update({ 
      next_drawing_date: nextDate.toISOString(),
      last_drawing_date: now.toISOString()
    })
    .eq('id', companyId);
}

// Calculate next drawing date based on frequency and day
function calculateNextDrawingDate(frequency: string, day: number): Date {
  const now = new Date();
  let nextDate = new Date(now);
  
  switch (frequency) {
    case 'daily':
      // Next day
      nextDate.setDate(nextDate.getDate() + 1);
      nextDate.setHours(0, 0, 0, 0);
      break;
      
    case 'weekly':
      // Next occurrence of the specified day of week (0-6, Sunday-Saturday)
      const currentDay = nextDate.getDay();
      const daysUntilNext = (day - currentDay + 7) % 7;
      nextDate.setDate(nextDate.getDate() + (daysUntilNext === 0 ? 7 : daysUntilNext));
      nextDate.setHours(0, 0, 0, 0);
      break;
      
    case 'monthly':
      // Next occurrence of the specified day of month (1-31)
      nextDate.setDate(1); // Go to first day of month
      nextDate.setMonth(nextDate.getMonth() + 1); // Go to next month
      
      // Adjust for months with fewer days
      const lastDayOfMonth = new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 0).getDate();
      nextDate.setDate(Math.min(day, lastDayOfMonth));
      nextDate.setHours(0, 0, 0, 0);
      break;
      
    default:
      // Default to monthly on the 1st
      nextDate.setDate(1);
      nextDate.setMonth(nextDate.getMonth() + 1);
      nextDate.setHours(0, 0, 0, 0);
  }
  
  return nextDate;
}

// Perform drawing for a company
async function performDrawing(supabase: any, companyId: string, companyName: string) {
  try {
    // Get all non-winner entries for this company
    const { data: entries, error: fetchError } = await supabase
      .from('lottery_entries')
      .select('id, email, phone, review_id')
      .eq('company_id', companyId)
      .eq('is_winner', false);
      
    if (fetchError) throw fetchError;
    
    if (!entries || entries.length === 0) {
      return { 
        success: false, 
        error: 'No eligible entries found for drawing a winner' 
      };
    }
    
    // Select a random entry
    const randomIndex = Math.floor(Math.random() * entries.length);
    const winnerEntry = entries[randomIndex];
    
    // Mark as winner
    const { error: updateError } = await supabase
      .from('lottery_entries')
      .update({
        is_winner: true,
        won_at: new Date().toISOString()
      })
      .eq('id', winnerEntry.id);
      
    if (updateError) throw updateError;
    
    // The coupon will be generated automatically by the database trigger
    // But we'll still notify the winner via email
    
    // Send notification email if email is provided
    if (winnerEntry.email) {
      await sendWinnerEmail(
        winnerEntry.email,
        companyName
      );
    }
    
    return { 
      success: true, 
      winner_id: winnerEntry.id
    };
  } catch (error) {
    console.error('Error performing drawing:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
}

/**
 * Sends an email notification to the lottery winner
 * @param email Recipient email
 * @param companyName Company name
 * @returns Success status
 */
async function sendWinnerEmail(email: string, companyName: string) {
  try {
    // Create email content
    const subject = `Čestitamo! Zmagali ste v žrebanju podjetja ${companyName}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #3b82f6; margin-bottom: 10px;">🎉 Čestitamo! 🎉</h1>
          <p style="color: #4b5563; font-size: 16px;">Zmagali ste v žrebanju podjetja ${companyName}!</p>
        </div>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="font-size: 16px; color: #1f2937; margin-bottom: 15px;">
            Z veseljem vas obveščamo, da ste bili izbrani kot zmagovalec v našem žrebanju.
          </p>
          <p style="font-size: 16px; color: #1f2937; margin-bottom: 15px;">
            Vaš kupon je bil ustvarjen in ga lahko prevzamete pri podjetju ${companyName}.
          </p>
          <p style="font-size: 16px; color: #1f2937; margin-bottom: 15px;">
            Za prevzem nagrade kontaktirajte podjetje ${companyName}.
          </p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
            Hvala za sodelovanje v našem programu ocenjevanja.
          </p>
        </div>
        
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px;">
            To sporočilo ste prejeli, ker ste ob oddaji ocene posredovali svoj e-poštni naslov.
            Za vsa vprašanja se obrnite neposredno na podjetje ${companyName}.
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
      throw new Error(errorData.error || 'Failed to send winner email');
    }

    console.log(`Winner email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending winner email:', error);
    return false;
  }
}