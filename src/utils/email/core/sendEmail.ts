import { supabase } from '../../../lib/supabase';

/**
 * Core function to send an email using the Supabase Edge Function
 * @param to Recipient email address
 * @param subject Email subject
 * @param html HTML content of the email
 * @param from Optional sender email address (defaults to noreply@ocenagor.si)
 * @returns Success status
 */
export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  from: string = 'noreply@ocenagor.si'
): Promise<boolean> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        to,
        subject,
        html,
        from
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send email');
    }

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export default sendEmail;