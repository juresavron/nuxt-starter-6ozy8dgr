import { supabase } from '../../../../lib/supabase';
import { retryWithBackoff } from '../utils';

/**
 * Fetch subscriptions from Supabase with improved retry logic
 * @returns Array of subscriptions
 */
export async function fetchSubscriptions() {
  console.log('subscriptionFetcher: Fetching subscriptions');
  
  try {
    return await retryWithBackoff(async () => {
      const { data, error } = await supabase
        .from('admin_subscriptions')
        .select('*')
        .order('admin_email', { ascending: true });

      if (error) {
        console.error('subscriptionFetcher: Error fetching subscriptions:', error);
        throw error;
      }
      
      console.log(`subscriptionFetcher: Successfully fetched ${data?.length || 0} subscriptions`);
      return data || [];
    }, 5, 3000); // Increased retries and initial delay
  } catch (err) {
    console.error('subscriptionFetcher: Error fetching subscriptions:', err);
    console.warn('subscriptionFetcher: Continuing with empty list');
    return [];
  }
}