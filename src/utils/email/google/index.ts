import sendEmail from '../core/sendEmail';
import { logEmailSent } from '../core/logging';
import { getGoogleReviewEmailTemplate } from './templates';

/**
 * Send a Google review request email to a customer
 * @param email Recipient email address
 * @param companyName Company name
 * @param googleLink Google review link
 * @param companyId Optional company ID for logging
 * @param reviewId Optional review ID for logging
 * @returns Success status
 */
export const sendGoogleReviewEmail = async (
  email: string,
  companyName: string,
  googleLink: string,
  companyId?: string,
  reviewId?: string
): Promise<boolean> => {
  try {
    // Get email template
    const { subject, html } = getGoogleReviewEmailTemplate(companyName, googleLink);
    
    // Send email
    const success = await sendEmail(email, subject, html);
    
    if (success) {
      // Log email sent
      await logEmailSent(
        email,
        subject,
        html,
        'google_review_email',
        companyId,
        reviewId,
        { googleLink }
      );
    }
    
    return success;
  } catch (error) {
    console.error('Error sending Google review email:', error);
    return false;
  }
}

export default sendGoogleReviewEmail;