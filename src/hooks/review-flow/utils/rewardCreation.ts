/**
 * Utility functions for creating rewards (coupons or lottery entries)
 */
import { createCoupon } from './couponUtils';
import { createLotteryEntry } from './lotteryUtils';

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

/**
 * Creates a reward (coupon or lottery entry) based on coupon type
 * @param reviewData Review data
 * @param couponType Type of reward to create
 * @returns Promise that resolves when reward is created
 */
export const createReward = async (
  reviewData: ReviewData,
  couponType: 'coupon' | 'lottery' | 'none' = 'coupon'
): Promise<void> => {
  const { reviewId, companyId, email, phone } = reviewData;
  
  console.log('🎁 createReward: Starting reward creation with type:', couponType, {
    reviewId,
    companyId,
    email: email ? `${email.substring(0, 3)}...` : 'not provided',
    phone: phone ? `${phone.substring(0, 3)}...` : 'not provided',
    timestamp: new Date().toISOString()
  });
  
  if (couponType === 'coupon' && (email || phone)) {
    console.log('🎟️ createReward: Generating coupon', {
      reviewId,
      companyId,
      email: email ? `${email.substring(0, 3)}...` : 'not provided',
      phone: phone ? `${phone.substring(0, 3)}...` : 'not provided',
      timestamp: new Date().toISOString()
    });
    
    const result = await createCoupon(companyId, reviewId, email, phone);
    
    if (!result.success) {
      console.error('🚨 createReward: Error creating coupon:', result.error);
    } else {
      console.log('✅ createReward: Coupon created successfully', {
        couponId: result.couponId,
        timestamp: new Date().toISOString()
      });
    }
  } else if (couponType === 'lottery' && (email || phone)) {
    console.log('🎲 createReward: Creating lottery entry', {
      reviewId,
      companyId,
      email: email ? `${email.substring(0, 3)}...` : 'not provided',
      phone: phone ? `${phone.substring(0, 3)}...` : 'not provided',
      timestamp: new Date().toISOString()
    });
    
    const result = await createLotteryEntry(companyId, reviewId, email, phone);
    
    if (!result.success) {
      console.error('🚨 createReward: Error creating lottery entry:', result.error);
    } else {
      console.log('✅ createReward: Lottery entry created successfully', {
        entryId: result.entryId,
        timestamp: new Date().toISOString()
      });
    }
  } else if (couponType === 'none') {
    console.log('ℹ️ createReward: No reward type selected, skipping reward creation', {
      timestamp: new Date().toISOString()
    });
  }
};