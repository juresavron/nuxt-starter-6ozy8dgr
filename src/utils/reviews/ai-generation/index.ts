import { generateAIEmail } from './email';
import { generateAISMS } from './sms';
import { detectLanguage } from './language';

/**
 * Send a review notification email using AI-generated content
 * @param companyName Company name
 * @param rating Review rating (1-5)
 * @param comment Optional review comment
 * @param email Recipient email address
 * @param selectedIssues Optional selected feedback issues
 * @param giftDescription Optional gift description
 * @returns Success status
 */
export const sendReviewNotification = async (
  companyName: string,
  rating: number,
  comment: string = '',
  email: string,
  selectedIssues: string[] = [],
  giftDescription?: string
): Promise<boolean> => {
  try {
    // Detect language from comment or default to Slovenian
    const language = comment ? detectLanguage(comment) : 'sl';
    
    // Generate AI email content
    const emailType = rating <= 3 ? 'low_rating_feedback' : 
                     rating === 4 ? 'mid_rating_feedback' : 
                     'high_rating_thank_you';
    
    // Generate and send email
    return await generateAIEmail({
      companyName,
      rating,
      comment,
      email,
      selectedIssues,
      emailType,
      language,
      giftDescription
    });
  } catch (error) {
    console.error('Error sending review notification:', error);
    return false;
  }
};

/**
 * Send a review notification SMS using AI-generated content
 * @param companyName Company name
 * @param rating Review rating (1-5)
 * @param comment Optional review comment
 * @param phone Recipient phone number
 * @param selectedIssues Optional selected feedback issues
 * @param smsType Type of SMS to send
 * @param additionalData Additional data for SMS (coupon code, Google link)
 * @returns Success status
 */
export const sendReviewSMS = async (
  companyName: string,
  rating: number,
  phone: string,
  smsType: 'google_redirect' | 'coupon_code' | 'thank_you',
  additionalData: {
    comment?: string;
    selectedIssues?: string[];
    couponCode?: string;
    googleLink?: string;
  } = {}
): Promise<boolean> => {
  try {
    // Detect language from comment or default to Slovenian
    const language = additionalData.comment ? detectLanguage(additionalData.comment) : 'sl';
    
    // Generate and send SMS
    return await generateAISMS({
      companyName,
      rating,
      phone,
      smsType,
      comment: additionalData.comment,
      selectedIssues: additionalData.selectedIssues,
      couponCode: additionalData.couponCode,
      googleLink: additionalData.googleLink,
      language
    });
  } catch (error) {
    console.error('Error sending review SMS:', error);
    return false;
  }
};

export { generateAIEmail, generateAISMS, detectLanguage };