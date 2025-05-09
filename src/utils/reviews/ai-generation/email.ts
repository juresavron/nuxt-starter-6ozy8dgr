import { supabase } from '../../../lib/supabase';

interface AIEmailGenerationRequest {
  companyName: string;
  rating: number;
  comment?: string;
  email: string;
  selectedIssues?: string[];
  emailType?: string;
  language?: string;
  giftDescription?: string;
}

/**
 * Generate and send an AI email for a review
 * @param params Email generation parameters
 * @returns Success status
 */
export const generateAIEmail = async (params: AIEmailGenerationRequest): Promise<boolean> => {
  try {
    // Call the generate-ai-email edge function
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-ai-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        companyName: params.companyName,
        rating: params.rating,
        comment: params.comment,
        selectedIssues: params.selectedIssues,
        emailType: params.emailType,
        language: params.language,
        giftDescription: params.giftDescription
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate AI email');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error('Failed to generate AI email content');
    }

    // Send the generated email
    const emailResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        to: params.email,
        subject: result.subject,
        html: result.html,
        from: 'noreply@ocenagor.si'
      })
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      throw new Error(errorData.error || 'Failed to send email');
    }

    // Log the email
    await logAIEmail(
      params.email,
      result.subject,
      result.html,
      params.emailType || 'review_notification',
      params.companyName,
      params.rating,
      params.selectedIssues
    );

    return true;
  } catch (error) {
    console.error('Error generating and sending AI email:', error);
    return false;
  }
};

/**
 * Log AI-generated email to the database
 * @param recipient Recipient email address
 * @param subject Email subject
 * @param content Email content
 * @param templateName Template name or type of email
 * @param companyName Company name
 * @param rating Review rating
 * @param selectedIssues Selected feedback issues
 * @returns Success status
 */
const logAIEmail = async (
  recipient: string,
  subject: string,
  content: string,
  templateName: string,
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
        type: 'email',
        recipient,
        subject,
        content,
        communicationType: templateName,
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
      throw new Error(errorData.error || 'Failed to log email');
    }

    return true;
  } catch (error) {
    console.error('Error logging AI email:', error);
    return false;
  }
};

export default generateAIEmail;