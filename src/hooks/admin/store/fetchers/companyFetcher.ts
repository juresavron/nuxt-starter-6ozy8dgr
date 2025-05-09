import { supabase } from '../../../../lib/supabase';
import { retryWithBackoff } from '../utils';
import type { Database } from '../../../../types/database';

type Company = Database['public']['Tables']['companies']['Row'];

/**
 * Fetch companies from Supabase with improved retry logic
 * @param isSuperAdmin Whether the current user is a superadmin
 * @param assignedCompanyIds Company IDs assigned to the current user
 * @returns Array of companies
 */
export async function fetchCompanies(
  isSuperAdmin: boolean,
  assignedCompanyIds: string[]
): Promise<Company[]> {
  console.log('companyFetcher: Fetching companies', {
    isSuperAdmin,
    assignedCompanyIds: assignedCompanyIds?.length || 0
  });
  
  return await retryWithBackoff(async () => {
    let companiesQuery = supabase
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (!isSuperAdmin && assignedCompanyIds.length > 0) {
      console.log('companyFetcher: Filtering companies for non-superadmin', {
        assignedCompanyIds: assignedCompanyIds.length
      });
      companiesQuery = companiesQuery.in('id', assignedCompanyIds);
    }
    
    const { data, error } = await companiesQuery;
      
    if (error) {
      console.error('companyFetcher: Error fetching companies:', error);
      throw error;
    }
    
    console.log(`companyFetcher: Successfully fetched ${data?.length || 0} companies`);
    return data || [];
  }, 5, 3000); // Increased retries and initial delay
}

/**
 * Delete a company by ID
 * @param companyId Company ID to delete
 */
export async function deleteCompany(companyId: string): Promise<void> {
  console.log(`companyFetcher: Deleting company ${companyId}`);
  
  // Delete company from database
  const { error: deleteError } = await supabase
    .from('companies')
    .delete()
    .eq('id', companyId);
      
  if (deleteError) {
    console.error('companyFetcher: Error deleting company:', deleteError);
    throw deleteError;
  }
  
  console.log(`companyFetcher: Company ${companyId} deleted successfully`);
}