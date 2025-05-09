import { useState, useCallback, useMemo } from 'react';
import { saveAs } from 'file-saver';

/**
 * Hook for filtering and exporting coupons
 * @param coupons Array of coupons
 * @param companies Array of companies
 * @returns Filter state and functions
 */
export const useCouponFilters = (coupons: any[], companies: any[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUsed, setFilterUsed] = useState<boolean | null>(null);
  const [filterCompany, setFilterCompany] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  // Filter coupons based on search term and filters
  const filteredCoupons = useMemo(() => {
    if (!Array.isArray(coupons)) {
      console.warn('useCouponFilters: coupons is not an array', coupons);
      return [];
    }
    
    const safeCompanies = Array.isArray(companies) ? companies : [];
    
    return coupons.filter(coupon => {
      // Apply search filter
      if (searchTerm) {
        const company = safeCompanies.find(c => c?.id === coupon?.company_id)?.name || '';
        const searchLower = searchTerm.toLowerCase();
        
        if (
          !coupon?.coupon_code?.toLowerCase().includes(searchLower) &&
          !company.toLowerCase().includes(searchLower) &&
          !(coupon?.email && coupon.email.toLowerCase().includes(searchLower)) &&
          !(coupon?.phone && coupon.phone.toLowerCase().includes(searchLower))
        ) {
          return false;
        }
      }
      
      // Apply used/unused filter
      if (filterUsed !== null && coupon?.is_used !== filterUsed) {
        return false;
      }
      
      // Apply company filter
      if (filterCompany && coupon?.company_id !== filterCompany) {
        return false;
      }
      
      return true;
    });
  }, [coupons, companies, searchTerm, filterUsed, filterCompany]);

  // Handle copying coupon code to clipboard
  const handleCopy = useCallback((code: string) => {
    console.log('Copying coupon code to clipboard:', code);
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  // Export coupons to CSV
  const handleExport = useCallback(() => {
    console.log('Exporting coupons to CSV');
    
    if (!Array.isArray(filteredCoupons) || filteredCoupons.length === 0) {
      console.warn('No coupons to export');
      return;
    }
    
    const safeCompanies = Array.isArray(companies) ? companies : [];
    
    // Create CSV content
    const headers = ['Coupon Code', 'Company', 'Discount', 'Status', 'Created', 'Expires', 'Contact'];
    const rows = filteredCoupons.map(coupon => {
      const company = safeCompanies.find(c => c?.id === coupon?.company_id)?.name || 'Unknown';
      const discount = `${coupon?.discount_amount || 0}${coupon?.discount_type === 'percentage' ? '%' : '€'}`;
      const status = coupon?.is_used ? 'Used' : 'Unused';
      const created = coupon?.created_at ? new Date(coupon.created_at).toLocaleDateString() : 'Unknown';
      const expires = coupon?.expires_at ? new Date(coupon.expires_at).toLocaleDateString() : 'Never';
      const contact = coupon?.email || coupon?.phone || 'N/A';
      
      return [coupon.coupon_code, company, discount, status, created, expires, contact];
    });
    
    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `coupons_export_${new Date().toISOString().split('T')[0]}.csv`);
    console.log('CSV export complete');
  }, [filteredCoupons, companies]);

  return {
    searchTerm,
    setSearchTerm,
    filterUsed,
    setFilterUsed,
    filterCompany,
    setFilterCompany,
    copied,
    setCopied,
    filteredCoupons,
    handleCopy,
    handleExport
  };
};

export default useCouponFilters;