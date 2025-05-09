import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAdminStore } from '../store';

/**
 * Hook for fetching and managing lottery entries data
 * @param isSuperAdmin Whether the current user is a superadmin
 * @returns Lottery data and related state
 */
export const useLotteryData = (isSuperAdmin: boolean) => {
  const [lotteryEntries, setLotteryEntries] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [initialized, setInitialized] = useState(false);
  
  const { assignedCompanyIds } = useAdminStore();

  // Fetch lottery entries and companies
  const fetchData = useCallback(async () => {
    try {
      console.log('useLotteryData: Starting data fetch');
      if (!initialized) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }
      setError(null);
      
      // Fetch companies first
      console.log('useLotteryData: Fetching companies');
      let companiesQuery = supabase.from('companies').select('id, name, coupon_type, lottery_drawing_frequency, lottery_drawing_day, next_drawing_date, last_drawing_date');
      
      // Filter companies for regular admins
      if (!isSuperAdmin && assignedCompanyIds.length > 0) {
        console.log('useLotteryData: Filtering companies for non-superadmin');
        companiesQuery = companiesQuery.in('id', assignedCompanyIds);
      }
      
      const { data: companiesData, error: companiesError } = await companiesQuery;
      
      if (companiesError) throw companiesError;
      
      console.log(`useLotteryData: Fetched ${companiesData?.length || 0} companies`);
      setCompanies(companiesData || []);
      
      // Then fetch lottery entries
      console.log('useLotteryData: Fetching lottery entries');
      let query = supabase.from('lottery_entries').select(`
        id, 
        company_id, 
        review_id, 
        email, 
        phone, 
        entry_date, 
        is_winner, 
        won_at, 
        prize_claimed, 
        prize_claimed_at
      `).order('entry_date', { ascending: false });
      
      // Filter by assigned companies for regular admins
      if (!isSuperAdmin && assignedCompanyIds.length > 0) {
        console.log('useLotteryData: Filtering entries for non-superadmin');
        query = query.in('company_id', assignedCompanyIds);
      }
      
      const { data, error: entriesError } = await query;
      
      if (entriesError) throw entriesError;
      
      console.log(`useLotteryData: Fetched ${data?.length || 0} lottery entries`);
      setLotteryEntries(data || []);
      setInitialized(true);
    } catch (err) {
      console.error('Error fetching lottery entries:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch lottery entries');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [isSuperAdmin, assignedCompanyIds, initialized]);

  return {
    lotteryEntries,
    companies,
    loading,
    error,
    refreshing,
    initialized,
    setLotteryEntries,
    setCompanies,
    setLoading,
    setError,
    setRefreshing,
    setInitialized,
    fetchData
  };
};

export default useLotteryData;