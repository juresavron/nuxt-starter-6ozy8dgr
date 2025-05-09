import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';

/**
 * Hook for fetching and managing subscription data
 * @param isSuperAdmin Whether the current user is a superadmin
 * @returns Subscription data and related state
 */
export const useSubscriptionData = (isSuperAdmin: boolean) => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Fetch subscriptions
  const fetchSubscriptions = useCallback(async () => {
    try {
      if (!initialized) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }
      setError(null);
      
      // Fetch from admin_subscriptions view
      const { data, error: fetchError } = await supabase
        .from('admin_subscriptions')
        .select('*')
        .order('admin_email', { ascending: true });
      
      if (fetchError) throw fetchError;
      
      setSubscriptions(data || []);
      console.log('Subscriptions fetched:', data?.length || 0);
    } catch (err) {
      console.error('Error fetching subscriptions:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch subscriptions');
    } finally {
      setLoading(false);
      setRefreshing(false);
      setInitialized(true);
    }
  }, [initialized]);

  return {
    subscriptions,
    loading,
    error,
    refreshing,
    initialized,
    setSubscriptions,
    setLoading,
    setError,
    setRefreshing,
    setInitialized,
    fetchSubscriptions
  };
};