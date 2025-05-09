import sendSMS from '../core/sendSMS';
import { logSMSSent } from '../core/logging';
import { getGoogleReviewSMSTemplate } from './templates';

/**
 * Send a Google review request SMS to a customer
 * @param phoneNumber Recipient phone number
 * @param companyName Company name
 * @param googleLink Google review link
 * @param companyId Optional company ID for logging
 * @param reviewId Optional review ID for logging
 * @returns Success status
 */
export const sendGoogleReviewSMS = async (
  phoneNumber: string,
  companyName: string,
  googleLink: string,
  companyId?: string,
  reviewId?: string
): Promise<boolean> => {
  try {
    // Get SMS template
    const message = getGoogleReviewSMSTemplate(companyName, googleLink);
    
    // Send SMS
    const success = await sendSMS(phoneNumber, message);
    
    if (success) {
      // Log SMS sent
      await logSMSSent(
        phoneNumber,
        message,
        'google_review_sms',
        companyId,
        reviewId,
        { googleLink }
      );
    }
    
    return success;
  } catch (error) {
    console.error('Error sending Google review SMS:', error);
    return false;
  }
}

export default sendGoogleReviewSMS;