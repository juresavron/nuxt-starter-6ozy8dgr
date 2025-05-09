import { generateSMSContent } from '../sms';
import { logCommunication } from './logging';
import { getLanguageCode } from '../language';

/**
 * Sends an SMS message using the Supabase Edge Function
 * @param phone Phone number to send SMS to
 * @param message SMS content
 * @param metadata Additional metadata to log
 * @returns Success status
 */
export async function sendSMS(
  phone: string,
  message: string,
  metadata: Record<string, any> = {}
): Promise<boolean> {
  try {
    if (!phone || !message) {
      console.error('Missing required parameters for sendSMS');
      return false;
    }

    // Call SMS sending edge function
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        to: phone,
        message,
        metadata
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send SMS');
    }

    // Log the communication
    await logCommunication({
      type: 'sms',
      recipient: phone,
      content: message,
      communicationType: metadata.type || 'general',
      status: 'sent',
      company_id: metadata.company_id,
      review_id: metadata.review_id,
      metadata
    });

    return true;
  } catch (error) {
    console.error('Error sending SMS:', error);
    
    // Log the failed communication
    await logCommunication({
      type: 'sms',
      recipient: phone,
      content: message,
      communicationType: metadata.type || 'general',
      status: 'failed',
      error_message: error instanceof Error ? error.message : 'Unknown error',
      company_id: metadata.company_id,
      review_id: metadata.review_id,
      metadata
    });
    
    return false;
  }
}

/**
 * Sends an SMS with a Google review link
 * @param phone Phone number to send SMS to
 * @param companyName Company name
 * @param googleLink Google review link
 * @param rating Customer rating
 * @param reviewId Review ID for tracking
 * @param companyId Company ID for tracking
 * @returns Success status
 */
export async function sendGoogleReviewSMS(
  phone: string,
  companyName: string,
  googleLink: string,
  rating: number,
  reviewId?: string,
  companyId?: string,
  comment?: string,
  selectedIssues?: string[]
): Promise<boolean> {
  try {
    if (!phone || !companyName || !googleLink) {
      console.error('Missing required parameters for sendGoogleReviewSMS');
      return false;
    }

    // Detect language from company name or default to Slovenian
    const language = getLanguageCode(companyName);

    // Generate personalized content based on rating
    const smsContent = await generateSMSContent({
      companyName,
      rating,
      smsType: 'google_redirect',
      googleLink,
      comment,
      selectedIssues,
      language
    });

    // Send the SMS
    return await sendSMS(phone, smsContent, {
      type: 'google_review',
      company_id: companyId,
      review_id: reviewId,
      rating
    });
  } catch (error) {
    console.error('Error sending Google review SMS:', error);
    return false;
  }
}

/**
 * Sends an SMS with a coupon code
 * @param phone Phone number to send SMS to
 * @param companyName Company name
 * @param couponCode Coupon code
 * @param rating Customer rating
 * @param reviewId Review ID for tracking
 * @param companyId Company ID for tracking
 * @returns Success status
 */
export async function sendCouponSMS(
  phone: string,
  companyName: string,
  couponCode: string,
  rating: number,
  reviewId?: string,
  companyId?: string,
  comment?: string,
  selectedIssues?: string[]
): Promise<boolean> {
  try {
    if (!phone || !companyName || !couponCode) {
      console.error('Missing required parameters for sendCouponSMS');
      return false;
    }

    // Detect language from company name or default to Slovenian
    const language = getLanguageCode(companyName);

    // Generate personalized content based on rating
    const smsContent = await generateSMSContent({
      companyName,
      rating,
      smsType: 'coupon_code',
      couponCode,
      comment,
      selectedIssues,
      language
    });

    // Send the SMS
    return await sendSMS(phone, smsContent, {
      type: 'coupon_code',
      company_id: companyId,
      review_id: reviewId,
      rating,
      coupon_code: couponCode
    });
  } catch (error) {
    console.error('Error sending coupon SMS:', error);
    return false;
  }
}

/**
 * Sends a thank you SMS
 * @param phone Phone number to send SMS to
 * @param companyName Company name
 * @param rating Customer rating
 * @param reviewId Review ID for tracking
 * @param companyId Company ID for tracking
 * @returns Success status
 */
export async function sendThankYouSMS(
  phone: string,
  companyName: string,
  rating: number,
  reviewId?: string,
  companyId?: string,
  comment?: string,
  selectedIssues?: string[]
): Promise<boolean> {
  try {
    if (!phone || !companyName) {
      console.error('Missing required parameters for sendThankYouSMS');
      return false;
    }

    // Detect language from company name or default to Slovenian
    const language = getLanguageCode(companyName);

    // Generate personalized content based on rating
    const smsContent = await generateSMSContent({
      companyName,
      rating,
      smsType: 'thank_you',
      comment,
      selectedIssues,
      language
    });

    // Send the SMS
    return await sendSMS(phone, smsContent, {
      type: 'thank_you',
      company_id: companyId,
      review_id: reviewId,
      rating
    });
  } catch (error) {
    console.error('Error sending thank you SMS:', error);
    return false;
  }
}