import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Subscription {
  subscription_id: string | null;
  subscription_status: string;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if user is logged in
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setSubscription(null);
          return;
        }

        // Fetch subscription data
        const { data, error: fetchError } = await supabase
          .from("stripe_subscriptions")
          .select("*");

        if (fetchError) {
          throw fetchError;
        }

        setSubscription(data);
      } catch (err) {
        console.error('Error fetching subscription:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch subscription');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();

    // Set up subscription to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        fetchSubscription();
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

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
}