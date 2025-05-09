import { useCallback } from 'react';
import { supabase } from '../../../lib/supabase';

/**
 * Hook for coupon-related actions
 * @param fetchData Function to refresh data after actions
 * @returns Coupon action functions
 */
export const useCouponActions = (fetchData: () => Promise<void>) => {
  /**
   * Toggles a coupon's used status
   * @param couponId Coupon ID to toggle
   * @param currentStatus Current used status
   */
  const handleToggleUsed = useCallback(async (couponId: string, currentStatus: boolean) => {
    try {
      console.log(`Toggling coupon ${couponId} used status from ${currentStatus} to ${!currentStatus}`);
      const { error } = await supabase
        .from('coupons')
        .update({ 
          is_used: !currentStatus,
          used_at: !currentStatus ? new Date().toISOString() : null
        })
        .eq('id', couponId);
        
      if (error) {
        console.error('Error updating coupon:', error);
        throw error;
      }
      
      // Refresh data
      await fetchData();
      console.log('Coupon status updated successfully');
    } catch (err) {
      console.error('Error updating coupon:', err);
      throw err;
    }
  }, [fetchData]);

  /**
   * Copies a coupon code to the clipboard
   * @param code Coupon code to copy
   * @returns Promise that resolves when the code is copied
   */
  const copyToClipboard = useCallback(async (code: string): Promise<void> => {
    try {
      console.log('Copying to clipboard:', code);
      await navigator.clipboard.writeText(code);
      console.log('Copied to clipboard successfully');
    } catch (err) {
      console.error('Error copying to clipboard:', err);
      throw err;
    }
  }, []);

  return {
    handleToggleUsed,
    copyToClipboard
  };
};

export default useCouponActions;