import { supabase } from '../../../lib/supabase';

interface AISMSGenerationRequest {
  companyName: string;
  rating: number;
  phone: string;
  smsType: 'google_redirect' | 'coupon_code' | 'thank_you';
  comment?: string;
  selectedIssues?: string[];
  couponCode?: string;
  googleLink?: string;
  language?: string;
}

/**
 * Generate and send an AI SMS for a review
 * @param params SMS generation parameters
 * @returns Success status
 */
export const generateAISMS = async (params: AISMSGenerationRequest): Promise<boolean> => {
  try {
    // Call the generate-ai-sms edge function
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-ai-sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        companyName: params.companyName,
        rating: params.rating,
        smsType: params.smsType,
        comment: params.comment,
        selectedIssues: params.selectedIssues,
        couponCode: params.couponCode,
        googleLink: params.googleLink,
        language: params.language
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate AI SMS');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error('Failed to generate AI SMS content');
    }

    // In a real implementation, this would call an SMS service API
    // For now, we'll just simulate sending an SMS
    console.log(`[SIMULATED SMS] To: ${params.phone}, Message: ${result.message}`);
    
    // Log the SMS
    await logAISMS(
      params.phone,
      result.message,
      params.smsType,
      params.companyName,
      params.rating,
      params.selectedIssues
    );

    return true;
  } catch (error) {
    console.error('Error generating and sending AI SMS:', error);
    return false;
  }
};

/**
 * Log AI-generated SMS to the database
 * @param recipient Recipient phone number
 * @param content SMS content
 * @param smsType Type of SMS
 * @param companyName Company name
 * @param rating Review rating
 * @param selectedIssues Selected feedback issues
 * @returns Success status
 */
const logAISMS = async (
  recipient: string,
  content: string,
  smsType: string,
  companyName: string,
  rating: number,
  selectedIssues?: string[]
): Promise<boolean> => {
  try {
    // Call the log-communication edge function
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/log-communication`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        type: 'sms',
        recipient,
        content,
        communicationType: smsType,
        status: 'sent',
        metadata: {
          companyName,
          rating,
          selectedIssues,
          aiGenerated: true
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to log SMS');
    }

    return true;
  } catch (error) {
    console.error('Error logging AI SMS:', error);
    return false;
  }
};

export default generateAISMS;