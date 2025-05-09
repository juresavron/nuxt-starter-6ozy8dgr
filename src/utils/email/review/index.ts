import sendEmail from '../core/sendEmail';
import { logEmailSent } from '../core/logging';
import { getReviewReminderEmailTemplate } from './templates';

/**
 * Send a review reminder email to a customer
 * @param email Recipient email address
 * @param companyName Company name
 * @param reviewLink Review link
 * @param companyId Optional company ID for logging
 * @param reviewId Optional review ID for logging
 * @returns Success status
 */
export const sendReviewReminderEmail = async (
  email: string,
  companyName: string,
  reviewLink: string,
  companyId?: string,
  reviewId?: string
): Promise<boolean> => {
  try {
    // Get email template
    const { subject, html } = getReviewReminderEmailTemplate(companyName, reviewLink);
    
    // Send email
    const success = await sendEmail(email, subject, html);
    
    if (success) {
      // Log email sent
      await logEmailSent(
        email,
        subject,
        html,
        'review_reminder_email',
        companyId,
        reviewId,
        { reviewLink }
      );
    }
    
    return success;
  } catch (error) {
    console.error('Error sending review reminder email:', error);
    return false;
  }
}

export default sendReviewReminderEmail;