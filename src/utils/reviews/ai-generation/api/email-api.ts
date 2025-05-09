import { supabase } from '../../../../lib/supabase';

/**
 * Interface for email generation request
 */
export interface EmailGenerationRequest {
  companyName: string;
  rating: number;
  comment?: string;
  selectedIssues?: string[];
  emailType?: string;
  language?: string;
  giftDescription?: string;
}

/**
 * Interface for email generation response
 */
export interface EmailGenerationResponse {
  success: boolean;
  subject: string;
  html: string;
  text: string;
  error?: string;
}

/**
 * Generates an AI-powered email
 * @param params Email generation parameters
 * @returns Generated email content
 */
export async function generateEmail(params: EmailGenerationRequest): Promise<EmailGenerationResponse> {
  try {
    console.log(`Generating email for ${params.companyName}, rating: ${params.rating}`);
    
    // Call the Supabase Edge Function
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-ai-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify(params)
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error generating email:', errorData);
      
      // Return fallback email content
      return createFallbackEmailResponse(params);
    }

    const data = await response.json();
    return {
      success: true,
      subject: data.subject,
      html: data.html,
      text: data.text
    };
  } catch (error) {
    console.error('Error generating email:', error);
    return createFallbackEmailResponse(params);
  }
}

/**
 * Creates a fallback email response when AI generation fails
 * @param params Email generation parameters
 * @returns Fallback email content
 */
function createFallbackEmailResponse(params: EmailGenerationRequest): EmailGenerationResponse {
  const { companyName, rating, giftDescription } = params;
  
  // Create appropriate fallback content based on rating
  let subject = '';
  let html = '';
  let text = '';
  
  if (rating <= 3) {
    // Low rating fallback
    subject = `Thank you for your feedback about ${companyName}`;
    html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Thank you for your feedback</h2>
        <p>We appreciate you taking the time to share your experience with us.</p>
        <p>We're sorry to hear that your experience wasn't perfect. Your feedback helps us improve our services.</p>
        <p>If you'd like to discuss your experience further, please don't hesitate to contact us directly.</p>
        <p>We hope to have the opportunity to serve you better in the future.</p>
        <p>Best regards,<br>${companyName} Team</p>
      </div>
    `;
    text = `Thank you for your feedback. We appreciate you taking the time to share your experience with us. We're sorry to hear that your experience wasn't perfect. Your feedback helps us improve our services. If you'd like to discuss your experience further, please don't hesitate to contact us directly. We hope to have the opportunity to serve you better in the future. Best regards, ${companyName} Team`;
  } else if (rating === 4) {
    // Mid rating fallback
    subject = `Thank you for your positive review of ${companyName}`;
    html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Thank you for your positive review</h2>
        <p>We appreciate your 4-star review and your valuable feedback.</p>
        <p>We're glad that your overall experience was positive, and we're always working to make it even better.</p>
        <p>We look forward to serving you again soon!</p>
        <p>Best regards,<br>${companyName} Team</p>
      </div>
    `;
    text = `Thank you for your positive review. We appreciate your 4-star review and your valuable feedback. We're glad that your overall experience was positive, and we're always working to make it even better. We look forward to serving you again soon! Best regards, ${companyName} Team`;
  } else {
    // High rating fallback
    subject = `Thank you for your excellent review of ${companyName}`;
    html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Thank you for your excellent review!</h2>
        <p>We're thrilled that you had such a positive experience with us.</p>
        <p>Your 5-star review means a lot to our team and motivates us to continue providing excellent service.</p>
        ${giftDescription ? `<p>Don't forget to use your reward: ${giftDescription}</p>` : ''}
        <p>We look forward to welcoming you back soon!</p>
        <p>Best regards,<br>${companyName} Team</p>
      </div>
    `;
    text = `Thank you for your excellent review! We're thrilled that you had such a positive experience with us. Your 5-star review means a lot to our team and motivates us to continue providing excellent service. ${giftDescription ? `Don't forget to use your reward: ${giftDescription}` : ''} We look forward to welcoming you back soon! Best regards, ${companyName} Team`;
  }
  
  return {
    success: false,
    subject,
    html,
    text,
    error: 'Failed to generate email'
  };
}

/**
 * Sends an email
 * @param to Recipient email address
 * @param subject Email subject
 * @param html HTML content
 * @param text Plain text content
 * @param metadata Additional metadata
 * @returns Success status
 */
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text: string,
  metadata: {
    companyId?: string;
    reviewId?: string;
    emailType: string;
    from?: string;
  }
): Promise<boolean> {
  try {
    console.log(`Sending email to ${to}`);
    
    // Call the send-email Edge Function
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          to,
          subject,
          html,
          text,
          from: metadata.from || 'noreply@ocenagor.si'
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send email');
    }

    // Log the communication
    await logEmailCommunication(to, subject, html, 'delivered', metadata);
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Log the failed communication
    await logEmailCommunication(to, subject, html, 'failed', metadata, error);
    
    return false;
  }
}

/**
 * Logs an email communication
 * @param recipient Recipient email address
 * @param subject Email subject
 * @param content Email content
 * @param status Delivery status
 * @param metadata Additional metadata
 * @param error Error if any
 */
async function logEmailCommunication(
  recipient: string,
  subject: string,
  content: string,
  status: 'delivered' | 'failed',
  metadata: {
    companyId?: string;
    reviewId?: string;
    emailType: string;
  },
  error?: any
): Promise<void> {
  try {
    // Call the log-communication Edge Function
    await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/log-communication`,
      {
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
          communicationType: metadata.emailType,
          status,
          company_id: metadata.companyId,
          review_id: metadata.reviewId,
          error_message: error ? error.message : undefined,
          metadata: {
            ...metadata,
            error: error ? error.toString() : undefined
          }
        })
      }
    );
  } catch (logError) {
    console.error('Error logging email communication:', logError);
  }
}