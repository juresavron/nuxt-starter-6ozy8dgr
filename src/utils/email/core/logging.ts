import { supabase } from '../../../lib/supabase';

/**
 * Log email sent to the database
 * @param recipient Recipient email address
 * @param subject Email subject
 * @param content Email content
 * @param templateName Template name or type of email
 * @param companyId Optional company ID
 * @param reviewId Optional review ID
 * @param metadata Optional additional metadata
 * @returns Success status
 */
export const logEmailSent = async (
  recipient: string,
  subject: string,
  content: string,
  templateName: string,
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
        type: 'email',
        recipient,
        subject,
        content,
        communicationType: templateName,
        status: 'sent',
        company_id: companyId,
        review_id: reviewId,
        metadata
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to log email');
    }

    return true;
  } catch (error) {
    console.error('Error logging email:', error);
    return false;
  }
}

export default logEmailSent;