import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAdminStore } from '../store';
import type { Database } from '../../../types/database';

type Company = Database['public']['Tables']['companies']['Row'];

/**
 * Hook for company CRUD operations
 * @param onRefresh Callback to refresh data after operations
 * @returns Company action functions and state
 */
export const useCompanyActions = (onRefresh: () => Promise<void>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { deleteCompany: deleteCompanyFromStore } = useAdminStore();

  /**
   * Deletes a company by ID
   * @param companyId Company ID to delete
   */
  const deleteCompany = useCallback(async (companyId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the store's deleteCompany function to update state without refetching
      await deleteCompanyFromStore(companyId);
      
    } catch (err) {
      console.error('Error deleting company:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete company');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [onRefresh]);

  /**
   * Creates a new company
   * @param companyData Company data to create
   * @returns Created company
   */
  const createCompany = useCallback(async (companyData: Partial<Company>) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: createError } = await supabase
        .from('companies')
        .insert(companyData)
        .select()
        .single();
        
      if (createError) throw createError;
      
      // Refresh data
      await onRefresh();
      
      return data;
    } catch (err) {
      console.error('Error creating company:', err);
      setError(err instanceof Error ? err.message : 'Failed to create company');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [onRefresh]);

  /**
   * Updates an existing company
   * @param companyId Company ID to update
   * @param companyData Updated company data
   * @returns Updated company
   */
  const updateCompany = useCallback(async (companyId: string, companyData: Partial<Company>) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: updateError } = await supabase
        .from('companies')
        .update(companyData)
        .eq('id', companyId)
        .select()
        .single();
        
      if (updateError) throw updateError;
      
      // Refresh data
      await onRefresh();
      
      return data;
    } catch (err) {
      console.error('Error updating company:', err);
      setError(err instanceof Error ? err.message : 'Failed to update company');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [onRefresh]);

  return {
    loading,
    error,
    deleteCompany,
    createCompany,
    updateCompany,
    setError
  };
};

export default useCompanyActions;