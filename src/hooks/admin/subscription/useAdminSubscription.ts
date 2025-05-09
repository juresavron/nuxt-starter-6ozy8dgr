import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../auth/useAuth';

export interface AdminSubscription {
  admin_id: string;
  admin_email: string;
  is_superadmin: boolean;
  customer_id: string | null;
  subscription_id: string | null;
  subscription_status: string | null;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean | null;
  payment_method_brand?: string | null;
  payment_method_last4?: string | null;
}

/**
 * Hook for fetching and managing admin subscription data
 * @returns Admin subscription data and related state
 */
export const useAdminSubscription = () => {
  const [subscription, setSubscription] = useState<AdminSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch admin subscription data
  useEffect(() => {
    const fetchAdminSubscription = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch subscription data from the admin_subscriptions view
        const { data, error: fetchError } = await supabase
          .from('admin_subscriptions')
          .select('*')
          .eq('admin_id', user.id)
          .maybeSingle();
        
        if (fetchError) throw fetchError;
        
        setSubscription(data);
      } catch (err) {
        console.error('Error fetching admin subscription:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch subscription data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAdminSubscription();
  }, [user?.id]);

  // Check if subscription is active
  const isSubscriptionActive = subscription?.subscription_status === 'active' || 
                              subscription?.subscription_status === 'trialing';

  // Format date from Unix timestamp
  const formatTimestamp = (timestamp: number | null) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return {
    subscription,
    isSubscriptionActive,
    loading,
    error,
    formatTimestamp
  };
};

export default useAdminSubscription;