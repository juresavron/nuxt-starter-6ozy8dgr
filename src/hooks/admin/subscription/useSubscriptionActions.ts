import { useCallback } from 'react';
import { supabase } from '../../../lib/supabase';

/**
 * Hook for subscription-related actions
 * @param fetchSubscriptions Function to refresh subscriptions
 * @param confirmDelete Function to confirm delete actions
 * @param setError Function to set error state
 * @returns Subscription action functions
 */
export const useSubscriptionActions = (
  fetchSubscriptions: () => Promise<void>,
  confirmDelete: (options: any) => Promise<boolean>,
  setError: (error: string | null) => void
) => {
  // Format date from Unix timestamp
  const formatTimestamp = useCallback((timestamp: number | null) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString('sl-SI');
  }, []);

  // Handle immediate cancellation
  const handleImmediateCancellation = useCallback(async (subscription: any) => {
    if (!subscription.subscription_id) return;
    
    const confirmed = await confirmDelete({
      title: 'Takojšnji preklic naročnine',
      message: 'Ali ste prepričani, da želite takoj preklicati to naročnino? To dejanje ne more biti razveljavljeno in uporabnik bo takoj izgubil dostop.',
      confirmText: 'Da, prekliči zdaj',
      cancelText: 'Ne, ohrani naročnino'
    });
    
    if (!confirmed) return;
    
    try {
      setError(null);
      
      // Call Stripe webhook to cancel subscription immediately
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cancel-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          subscription_id: subscription.subscription_id,
          cancel_immediately: true
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Napaka pri preklicu naročnine');
      }
      
      // Refresh subscriptions
      await fetchSubscriptions();
    } catch (err) {
      console.error('Error cancelling subscription immediately:', err);
      setError(err instanceof Error ? err.message : 'Napaka pri preklicu naročnine');
    }
  }, [confirmDelete, fetchSubscriptions, setError]);

  return {
    formatTimestamp,
    handleImmediateCancellation
  };
};

export default useSubscriptionActions;