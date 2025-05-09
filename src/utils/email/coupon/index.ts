import sendEmail from '../core/sendEmail';
import { logEmailSent } from '../core/logging';
import { getCouponEmailTemplate } from './templates';

/**
 * Send a coupon email to a customer
 * @param email Recipient email address
 * @param couponCode Coupon code
 * @param companyName Company name
 * @param discountAmount Discount amount
 * @param discountType Discount type ('percentage' or 'fixed')
 * @param expiresAt Optional expiration date
 * @param companyId Optional company ID for logging
 * @param reviewId Optional review ID for logging
 * @returns Success status
 */
export const sendCouponEmail = async (
  email: string,
  couponCode: string,
  companyName: string,
  discountAmount: number,
  discountType: 'percentage' | 'fixed',
  expiresAt?: string,
  companyId?: string,
  reviewId?: string
): Promise<boolean> => {
  try {
    // Format discount
    const discount = `${discountAmount}${discountType === 'percentage' ? '%' : '€'}`;
    
    // Get email template
    const { subject, html } = getCouponEmailTemplate(companyName, couponCode, discount, expiresAt);
    
    // Send email
    const success = await sendEmail(email, subject, html);
    
    if (success) {
      // Log email sent
      await logEmailSent(
        email,
        subject,
        html,
        'coupon_email',
        companyId,
        reviewId,
        { 
          couponCode,
          discountAmount,
          discountType,
          expiresAt
        }
      );
    }
    
    return success;
  } catch (error) {
    console.error('Error sending coupon email:', error);
    return false;
  }
}

export default sendCouponEmail;