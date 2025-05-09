import { supabase } from '../../../../lib/supabase';
import { retryWithBackoff } from '../utils';

/**
 * Fetch email logs from Supabase with improved retry logic
 * @param isSuperAdmin Whether the current user is a superadmin
 * @param assignedCompanyIds Company IDs assigned to the current user
 * @returns Array of email logs
 */
export async function fetchEmailLogs(
  isSuperAdmin: boolean,
  assignedCompanyIds: string[]
) {
  console.log('emailLogsFetcher: Fetching email logs', {
    isSuperAdmin,
    assignedCompanyIds: assignedCompanyIds?.length || 0
  });
  
  return await retryWithBackoff(async () => {
    let query = supabase
      .from('email_logs')
      .select(`
        id,
        recipient,
        subject,
        content,
        status,
        template_name,
        sent_at,
        company_id,
        companies(name),
        metadata
      `)
      .order('sent_at', { ascending: false });
      
    // Filter by assigned companies for non-superadmins
    if (!isSuperAdmin && assignedCompanyIds.length > 0) {
      console.log('emailLogsFetcher: Filtering email logs for non-superadmin', {
        assignedCompanyIds: assignedCompanyIds.length
      });
      query = query.in('company_id', assignedCompanyIds);
    }
    
    const { data, error } = await query;
      
    if (error) {
      console.error('emailLogsFetcher: Error fetching email logs:', error);
      throw error;
    }
    
    // Format data to include company name
    const formattedData = data?.map(email => ({
      ...email,
      company_name: email.companies?.name
    })) || [];
    
    console.log(`emailLogsFetcher: Successfully fetched ${formattedData?.length || 0} email logs`);
    return formattedData;
  }, 5, 3000); // Increased retries and initial delay
}

/**
 * Fetch SMS logs from Supabase with improved retry logic
 * @param isSuperAdmin Whether the current user is a superadmin
 * @param assignedCompanyIds Company IDs assigned to the current user
 * @returns Array of SMS logs
 */
export async function fetchSmsLogs(
  isSuperAdmin: boolean,
  assignedCompanyIds: string[]
) {
  console.log('smsLogsFetcher: Fetching SMS logs', {
    isSuperAdmin,
    assignedCompanyIds: assignedCompanyIds?.length || 0
  });
  
  return await retryWithBackoff(async () => {
    let query = supabase
      .from('sms_logs')
      .select(`
        id,
        recipient,
        content,
        status,
        sent_at,
        company_id,
        companies(name),
        metadata
      `)
      .order('sent_at', { ascending: false });
      
    // Filter by assigned companies for non-superadmins
    if (!isSuperAdmin && assignedCompanyIds.length > 0) {
      console.log('smsLogsFetcher: Filtering SMS logs for non-superadmin', {
        assignedCompanyIds: assignedCompanyIds.length
      });
      query = query.in('company_id', assignedCompanyIds);
    }
    
    const { data, error } = await query;
      
    if (error) {
      console.error('smsLogsFetcher: Error fetching SMS logs:', error);
      throw error;
    }
    
    // Format data to include company name
    const formattedData = data?.map(sms => ({
      ...sms,
      company_name: sms.companies?.name
    })) || [];
    
    console.log(`smsLogsFetcher: Successfully fetched ${formattedData?.length || 0} SMS logs`);
    return formattedData;
  }, 5, 3000); // Increased retries and initial delay
}