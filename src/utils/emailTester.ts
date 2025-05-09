import { 
  sendContactNotification, 
  sendContactConfirmation, 
  sendReviewNotification, 
  sendReviewConfirmation 
} from './email';
import { useLanguageStore } from '../hooks/useLanguageStore';

/**
 * Test utility to verify email functionality
 */
export const testEmails = async () => {
  console.log('🧪 Starting email tests...');
  
  try {
    // Get current language
    const language = useLanguageStore.getState().language;
    console.log(`Testing emails in ${language === 'sl' ? 'Slovenian' : 'English'} language`);
    
    // Test contact notification email
    console.log('Testing contact notification email...');
    const contactNotificationResult = await sendContactNotification(
      'Test User',
      'test@example.com',
      'Test Company',
      'This is a test message to verify the contact notification email template.'
    );
    console.log('Contact notification result:', contactNotificationResult);
    
    // Test contact confirmation email
    console.log('Testing contact confirmation email...');
    const contactConfirmationResult = await sendContactConfirmation(
      'Test User',
      'test@example.com'
    );
    console.log('Contact confirmation result:', contactConfirmationResult);
    
    // Test review notification email
    console.log('Testing review notification email...');
    const reviewNotificationResult = await sendReviewNotification(
      'Test Company',
      5,
      'This is a test comment to verify the review notification email template.',
      'test@example.com'
    );
    console.log('Review notification result:', reviewNotificationResult);
    
    // Test review confirmation email
    console.log('Testing review confirmation email with gift...');
    const reviewConfirmationResult = await sendReviewConfirmation(
      'test@example.com',
      'Test Company',
      5,
      '10% discount on your next visit'
    );
    console.log('Review confirmation result:', reviewConfirmationResult);
    
    // Test review confirmation email without gift
    console.log('Testing review confirmation email without gift...');
    const reviewConfirmationNoGiftResult = await sendReviewConfirmation(
      'test@example.com',
      'Test Company',
      4
    );
    console.log('Review confirmation (no gift) result:', reviewConfirmationNoGiftResult);
    
    console.log('🎉 All email tests completed!');
    return {
      success: true,
      results: {
        contactNotification: contactNotificationResult,
        contactConfirmation: contactConfirmationResult,
        reviewNotification: reviewNotificationResult,
        reviewConfirmation: reviewConfirmationResult,
        reviewConfirmationNoGift: reviewConfirmationNoGiftResult
      }
    };
  } catch (error) {
    console.error('❌ Email test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};