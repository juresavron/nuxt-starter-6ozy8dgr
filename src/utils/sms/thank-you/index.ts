import sendSMS from '../core/sendSMS';
import { logSMSSent } from '../core/logging';
import { getThankYouSMSTemplate } from './templates';

/**
 * Send a thank you SMS to a customer after submitting a review
 * @param phoneNumber Recipient phone number
 * @param companyName Company name
 * @param rating Review rating (1-5)
 * @param companyId Optional company ID for logging
 * @param reviewId Optional review ID for logging
 * @returns Success status
 */
export const sendThankYouSMS = async (
  phoneNumber: string,
  companyName: string,
  rating: number,
  companyId?: string,
  reviewId?: string
): Promise<boolean> => {
  try {
    // Get SMS template
    const message = getThankYouSMSTemplate(companyName, rating);
    
    // Send SMS
    const success = await sendSMS(phoneNumber, message);
    
    if (success) {
      // Log SMS sent
      await logSMSSent(
        phoneNumber,
        message,
        'thank_you_sms',
        companyId,
        reviewId,
        { rating }
      );
    }
    
    return success;
  } catch (error) {
    console.error('Error sending thank you SMS:', error);
    return false;
  }
}

export default sendThankYouSMS;