import { supabase } from '../../../lib/supabase';

/**
 * Log SMS sent to the database
 * @param recipient Recipient phone number
 * @param content SMS content
 * @param communicationType Type of SMS
 * @param companyId Optional company ID
 * @param reviewId Optional review ID
 * @param metadata Optional additional metadata
 * @returns Success status
 */
export const logSMSSent = async (
  recipient: string,
  content: string,
  communicationType: string,
  companyId?: string,
  reviewId?: string,
  metadata?: Record<string, any>
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
        communicationType,
        status: 'sent',
        company_id: companyId,
        review_id: reviewId,
        metadata
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to log SMS');
    }

    return true;
  } catch (error) {
    console.error('Error logging SMS:', error);
    return false;
  }
}

export default logSMSSent;