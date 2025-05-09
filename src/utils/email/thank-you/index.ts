import sendEmail from '../core/sendEmail';
import { logEmailSent } from '../core/logging';
import { getThankYouEmailTemplate } from './templates';

/**
 * Send a thank you email to a customer after submitting a review
 * @param email Recipient email address
 * @param companyName Company name
 * @param rating Review rating (1-5)
 * @param companyId Optional company ID for logging
 * @param reviewId Optional review ID for logging
 * @returns Success status
 */
export const sendThankYouEmail = async (
  email: string,
  companyName: string,
  rating: number,
  companyId?: string,
  reviewId?: string
): Promise<boolean> => {
  try {
    // Get email template
    const { subject, html } = getThankYouEmailTemplate(companyName, rating);
    
    // Send email
    const success = await sendEmail(email, subject, html);
    
    if (success) {
      // Log email sent
      await logEmailSent(
        email,
        subject,
        html,
        'thank_you_email',
        companyId,
        reviewId,
        { rating }
      );
    }
    
    return success;
  } catch (error) {
    console.error('Error sending thank you email:', error);
    return false;
  }
}

export default sendThankYouEmail;