import { supabase } from '../../../../lib/supabase';
import { retryWithBackoff } from '../utils';
import type { Database } from '../../../../types/database';

type SocialTask = Database['public']['Tables']['social_tasks']['Row'];

/**
 * Fetch social tasks from Supabase with improved retry logic
 * @param isSuperAdmin Whether the current user is a superadmin
 * @param assignedCompanyIds Company IDs assigned to the current user
 * @returns Array of social tasks
 */
export async function fetchTasks(
  isSuperAdmin: boolean,
  assignedCompanyIds: string[]
): Promise<SocialTask[]> {
  console.log('taskFetcher: Fetching social tasks', {
    isSuperAdmin,
    assignedCompanyIds: assignedCompanyIds?.length || 0
  });
  
  return await retryWithBackoff(async () => {
    let tasksQuery = supabase.from('social_tasks').select('*');
    
    if (!isSuperAdmin && assignedCompanyIds.length > 0) {
      tasksQuery = tasksQuery.in('company_id', assignedCompanyIds);
    }
    
    const { data, error } = await tasksQuery;
      
    if (error) {
      console.error('taskFetcher: Error fetching social tasks:', error);
      throw error;
    }
    
    console.log(`taskFetcher: Successfully fetched ${data?.length || 0} social tasks`);
    return data || [];
  }, 5, 3000); // Increased retries and initial delay
}