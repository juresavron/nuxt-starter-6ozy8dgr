/**
 * Utility functions for coupon creation in the review flow
 */
import { supabase } from '../../../lib/supabase';

/**
 * Creates a coupon for a review
 * @param companyId Company ID
 * @param reviewId Review ID
 * @param email Customer email
 * @param phone Customer phone
 * @returns Success status and coupon ID if successful
 */
export const createCoupon = async (
  companyId?: string,
  reviewId?: string | null,
  email?: string,
  phone?: string
): Promise<{ success: boolean; couponId?: string; error?: string }> => {
  try {
    console.log('🎟️ createCoupon: Starting coupon creation', {
      companyId,
      reviewId,
      hasEmail: !!email,
      hasPhone: !!phone,
      timestamp: new Date().toISOString()
    });

    if (!companyId || !reviewId) {
      console.error('🚨 createCoupon: Missing required parameters', {
        companyId,
        reviewId,
        timestamp: new Date().toISOString()
      });
      return { success: false, error: 'Missing required parameters' };
    }

    console.log('🎟️ createCoupon: Calling generate-coupon edge function', {
      companyId,
      reviewId,
      hasEmail: !!email,
      hasPhone: !!phone,
      timestamp: new Date().toISOString()
    });

    // Call the generate-coupon edge function
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-coupon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        review_id: reviewId,
        company_id: companyId,
        email: email || null,
        phone: phone || null
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('🚨 createCoupon: Error response from generate-coupon', {
        status: response.status,
        error: errorData.error || 'Unknown error',
        timestamp: new Date().toISOString()
      });
      return { success: false, error: errorData.error || 'Failed to generate coupon' };
    }

    const result = await response.json();
    console.log('✅ createCoupon: Coupon generated successfully', {
      couponId: result.coupon?.id,
      couponCode: result.coupon?.coupon_code,
      timestamp: new Date().toISOString()
    });

    return { success: true, couponId: result.coupon?.id };
  } catch (error) {
    console.error('🚨 createCoupon: Exception during coupon creation', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create coupon' 
    };
  }
};

/**
 * Verifies if a coupon exists for a review
 * @param reviewId Review ID to check
 * @returns Boolean indicating if coupon exists
 */
export const verifyCoupon = async (reviewId: string): Promise<boolean> => {
  try {
    if (!reviewId) return false;

    const { data, error } = await supabase
      .from('coupons')
      .select('id')
      .eq('review_id', reviewId)
      .maybeSingle();

    if (error) {
      console.error('🚨 verifyCoupon: Error verifying coupon', {
        error: error.message,
        reviewId,
        timestamp: new Date().toISOString()
      });
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('🚨 verifyCoupon: Exception during verification', {
      error: error instanceof Error ? error.message : 'Unknown error',
      reviewId,
      timestamp: new Date().toISOString()
    });
    return false;
  }
};