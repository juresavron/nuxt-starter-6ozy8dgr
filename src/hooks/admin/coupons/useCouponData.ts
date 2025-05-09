import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAdminStore } from '../store';

/**
 * Hook for fetching and managing coupons data
 * @returns Coupons data and related state
 */
export const useCouponData = () => {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [initialized, setInitialized] = useState(false);
  
  const { isSuperAdmin, assignedCompanyIds } = useAdminStore();

  // Fetch coupons and companies
  const fetchData = useCallback(async () => {
    try {
      console.log('useCouponData: Starting data fetch');
      if (!initialized) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }
      setError(null);
      
      // Fetch companies first
      console.log('useCouponData: Fetching companies');
      let companiesQuery = supabase
        .from('companies')
        .select('id, name');
      
      // Filter companies for regular admins
      if (!isSuperAdmin && assignedCompanyIds.length > 0) {
        console.log('useCouponData: Filtering companies for non-superadmin');
        companiesQuery = companiesQuery.in('id', assignedCompanyIds);
      }
      
      const { data: companiesData, error: companiesError } = await companiesQuery;
      
      if (companiesError) throw companiesError;
      
      console.log(`useCouponData: Fetched ${companiesData?.length || 0} companies`);
      setCompanies(companiesData || []);
      
      // Then fetch coupons
      console.log('useCouponData: Fetching coupons');
      let query = supabase
        .from('coupons')
        .select(`
        id, 
        company_id, 
        review_id, 
        coupon_code, 
        discount_amount, 
        discount_type, 
        is_used, 
        used_at, 
        created_at, 
        expires_at, 
        email, 
        phone
      `)
        .order('created_at', { ascending: false });
      
      // Apply filters if needed for regular admins
      if (!isSuperAdmin && assignedCompanyIds.length > 0) {
        console.log('useCouponData: Filtering coupons for non-superadmin');
        query = query.in('company_id', assignedCompanyIds);
      }
      
      const { data, error: couponsError } = await query;
      
      if (couponsError) throw couponsError;
      
      console.log(`useCouponData: Fetched ${data?.length || 0} coupons`);
      setCoupons(data || []);
      setInitialized(true);
    } catch (err) {
      console.error('Error fetching coupons:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch coupons');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [isSuperAdmin, assignedCompanyIds]);

  return {
    coupons,
    companies,
    loading,
    error,
    refreshing,
    setCoupons,
    setCompanies,
    setLoading,
    setError,
    setRefreshing,
    initialized,
    setInitialized,
    fetchData
  };
};

export default useCouponData;