/**
 * Utility functions for sending notifications
 */
import { 
  sendAIGeneratedEmail, 
  sendAIGeneratedSMS 
} from '../../../utils/reviews/ai-generation';

interface ReviewData {
  reviewId: string | null;
  companyId?: string;
  companyName: string;
  rating: number;
  selectedIssues: string[];
  comment: string;
  email: string;
  phone: string;
}

interface NotificationOptions {
  sendThankYouEmail?: boolean;
  sendCouponEmail?: boolean;
  sendCouponSms?: boolean;
  sendGoogleReviewEmail?: boolean;
}

/**
 * Sends notifications based on review data
 * @param reviewData Review data
 * @param options Notification options
 */
export const sendNotifications = async (
  reviewData: ReviewData,
  options: NotificationOptions
): Promise<void> => {
  const { email, phone, companyName, rating } = reviewData;
  const { 
    sendThankYouEmail = true, 
    sendCouponEmail = false, 
    sendCouponSms = false, 
    sendGoogleReviewEmail = false 
  } = options;

  if (email || phone) {
    // Generate and send email if email is provided and sendThankYouEmail is enabled
    if (email && sendThankYouEmail) {
      console.log('📧 sendNotifications: Generating and sending AI thank you email', {
        email: email ? `${email.substring(0, 3)}...` : '(empty)', 
        companyName,
        rating,
        timestamp: new Date().toISOString()
      });
      
      // Send AI-generated email
      sendAIGeneratedEmail(reviewData).catch(err => {
        console.error('Error sending AI thank you email:', err);
      });
    }
    
    // Generate and send Google review email if email is provided and sendGoogleReviewEmail is enabled
    if (email && sendGoogleReviewEmail && rating >= 4) {
      console.log('📧 sendNotifications: Generating and sending AI Google review email', {
        email: email ? `${email.substring(0, 3)}...` : '(empty)', 
        companyName,
        rating,
        timestamp: new Date().toISOString()
      });
      
      // Send AI-generated email for Google review
      sendAIGeneratedEmail({
        ...reviewData,
        emailType: 'google_redirect'
      }).catch(err => {
        console.error('Error sending AI Google review email:', err);
      });
    }
    
    // Generate and send SMS if phone is provided and sendCouponSms is enabled
    if (phone && sendCouponSms) {
      console.log('📱 sendNotifications: Generating and sending AI SMS', {
        phone: phone ? `${phone.substring(0, 3)}...` : '(empty)', 
        companyName,
        rating,
        timestamp: new Date().toISOString()
      });
      
      // Send AI-generated SMS
      sendAIGeneratedSMS(reviewData).catch(err => {
        console.error('Error sending AI SMS:', err);
      });
    }
  }
};