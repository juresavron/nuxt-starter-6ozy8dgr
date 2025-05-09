import { useCallback } from 'react';

/**
 * Hook for coupon utility functions
 * @returns Utility functions for coupons
 */
export const useCouponUtils = () => {
  /**
   * Checks if a coupon is expired
   * @param coupon Coupon object
   * @returns Boolean indicating if the coupon is expired
   */
  const isExpired = useCallback((coupon: any) => {
    if (!coupon || !coupon?.expires_at) return false;
    try {
      const expiryDate = new Date(coupon.expires_at);
      return expiryDate < new Date();
    } catch (err) {
      console.error('Error parsing expiry date:', err);
      return false;
    }
  }, []);

  /**
   * Gets company name by ID
   * @param companyId Company ID
   * @param companies Array of companies
   * @returns Company name
   */
  const getCompanyName = useCallback((companyId: string, companies: any[]) => {
    if (!companyId) return 'Unknown';
    if (!companies || !Array.isArray(companies) || companies.length === 0) return 'Unknown';
    
    const company = companies.find(c => c && c.id === companyId);
    return company?.name || 'Unknown';
  }, []);

  /**
   * Formats discount amount and type
   * @param amount Discount amount
   * @param type Discount type ('percentage' or 'fixed')
   * @returns Formatted discount string
   */
  const formatDiscount = useCallback((amount: number, type: 'percentage' | 'fixed') => {
    if (amount === undefined || amount === null) return '0';
    if (!type) return `${amount}`;
    return `${amount}${type === 'percentage' ? '%' : '€'}`;
  }, []);

  return {
    isExpired,
    getCompanyName,
    formatDiscount
  };
};

export default useCouponUtils;