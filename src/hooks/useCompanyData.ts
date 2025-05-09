import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Hook for fetching company data
 * @param companyId Company ID to fetch
 * @returns Company data and loading state
 */
export const useCompanyData = (companyId?: string) => {
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch company data function
  const fetchCompany = useCallback(async () => {
    if (!companyId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log('useCompanyData: Fetching company data for ID:', companyId);

      const { data, error: fetchError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', companyId)
        .single();

      if (fetchError) {
        console.error('useCompanyData: Error fetching company:', fetchError);
        throw fetchError;
      }

      console.log('useCompanyData: Company data fetched successfully:', {
        name: data?.name,
        colorScheme: data?.color_scheme
      });
      
      setCompany(data);
    } catch (err) {
      console.error('Error fetching company:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch company data');
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  return { company, loading, error };
};