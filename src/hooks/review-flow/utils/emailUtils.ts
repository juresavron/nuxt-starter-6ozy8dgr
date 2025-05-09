/**
 * Utility functions for sending email notifications
 */
import { 
  sendReviewNotification, 
  sendLowRatingNotification,
  sendAIGeneratedEmail,
  sendAIGeneratedSMS
} from '../../../utils/reviews/ai-generation';

/**
 * Sends email notification based on review rating
 * @param email Email address to send to
 * @param companyName Company name for the email
 * @param rating Review rating
 * @param selectedIssues Selected feedback issues
 * @param comment Review comment
 * @returns Success status
 */
export const sendEmailByRating = async (
  email: string,
  companyName: string,
  rating: number,
  selectedIssues: string[],
  comment: string,
  reviewId?: string
): Promise<boolean> => {
  try {
    if (!email) {
      console.log('📧 sendEmailByRating: No email to send notification to', {
        timestamp: new Date().toISOString()
      });
      return false;
    }
    
    console.log('📧 sendEmailByRating: Sending AI-generated email notification', { 
      email: email ? `${email.substring(0, 3)}...${email.includes('@') ? email.substring(email.indexOf('@')) : ''}` : '(empty)', 
      companyName, 
      rating,
      selectedIssuesCount: selectedIssues.length,
      commentLength: comment?.length || 0,
      timestamp: new Date().toISOString()
    });
    
    // Use AI-generated email
    const success = await sendAIGeneratedEmail({
      reviewId,
      companyName,
      rating,
      comment,
      selectedIssues,
      email
    });
    
    console.log('✅ sendEmailByRating: Email notification result:', {
      success,
      email: email ? `${email.substring(0, 3)}...${email.includes('@') ? email.substring(email.indexOf('@')) : ''}` : '(empty)',
      timestamp: new Date().toISOString()
    });
    
    return success;
  } catch (error) {
    console.error('🚨 sendEmailByRating: Exception during email sending', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      email: email ? `${email.substring(0, 3)}...${email.includes('@') ? email.substring(email.indexOf('@')) : ''}` : '(empty)',
      timestamp: new Date().toISOString()
    });
    return false;
  }
};

/**
 * Sends SMS notification based on review rating
 * @param phone Phone number to send to
 * @param companyName Company name for the SMS
 * @param rating Review rating
 * @param reviewId Review ID
 * @returns Success status
 */
export const sendSMSByRating = async (
  phone: string,
  companyName: string,
  rating: number,
  reviewId?: string,
  googleLink?: string
): Promise<boolean> => {
  try {
    if (!phone) {
      console.log('📱 sendSMSByRating: No phone to send notification to', {
        timestamp: new Date().toISOString()
      });
      return false;
    }
    
    console.log('📱 sendSMSByRating: Sending AI-generated SMS notification', { 
      phone: phone ? `${phone.substring(0, 3)}...` : '(empty)', 
      companyName, 
      rating,
      timestamp: new Date().toISOString()
    });
    
    // Determine SMS type based on rating
    let smsType: 'google_redirect' | 'thank_you' = 'thank_you';
    let additionalData: { googleLink?: string } = {};
    
    if (rating >= 4 && googleLink) {
      smsType = 'google_redirect';
      additionalData = { googleLink };
    }
    
    // Use AI-generated SMS
    const success = await sendAIGeneratedSMS(
      {
        reviewId,
        companyName,
        rating,
        phone
      },
      smsType,
      additionalData
    );
    
    console.log('✅ sendSMSByRating: SMS notification result:', {
      success,
      phone: phone ? `${phone.substring(0, 3)}...` : '(empty)',
      timestamp: new Date().toISOString()
    });
    
    return success;
  } catch (error) {
    console.error('🚨 sendSMSByRating: Exception during SMS sending', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      phone: phone ? `${phone.substring(0, 3)}...` : '(empty)',
      timestamp: new Date().toISOString()
    });
    return false;
  }
};