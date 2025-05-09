import sendSMS from '../core/sendSMS';
import { logSMSSent } from '../core/logging';
import { getCouponSMSTemplate } from './templates';

/**
 * Send a coupon SMS to a customer
 * @param phoneNumber Recipient phone number
 * @param couponCode Coupon code
 * @param companyName Company name
 * @param discountAmount Discount amount
 * @param discountType Discount type ('percentage' or 'fixed')
 * @param companyId Optional company ID for logging
 * @param reviewId Optional review ID for logging
 * @returns Success status
 */
export const sendCouponSMS = async (
  phoneNumber: string,
  couponCode: string,
  companyName: string,
  discountAmount: number,
  discountType: 'percentage' | 'fixed',
  companyId?: string,
  reviewId?: string
): Promise<boolean> => {
  try {
    // Format discount
    const discount = `${discountAmount}${discountType === 'percentage' ? '%' : '€'}`;
    
    // Get SMS template
    const message = getCouponSMSTemplate(companyName, couponCode, discount);
    
    // Send SMS
    const success = await sendSMS(phoneNumber, message);
    
    if (success) {
      // Log SMS sent
      await logSMSSent(
        phoneNumber,
        message,
        'coupon_sms',
        companyId,
        reviewId,
        { 
          couponCode,
          discountAmount,
          discountType
        }
      );
    }
    
    return success;
  } catch (error) {
    console.error('Error sending coupon SMS:', error);
    return false;
  }
}

export default sendCouponSMS;