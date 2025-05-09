import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAdminStore } from '../store';
import { useConfirmDelete } from '../../useConfirmDelete';
import { useTranslations } from '../../useTranslations';

interface SubscriptionState {
  showCancelModal: boolean;
  selectedSubscription: Subscription | null;
  cancelReason: string;
  isCancelling: boolean;
  cancelImmediately: boolean;
}

interface Subscription {
  id?: string | number;
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
 * Hook for managing subscriptions in the admin panel
 */
export const useSubscriptionManagement = () => {
  const { isSuperAdmin } = useAdminStore();
  const { confirmDelete } = useConfirmDelete();
  const translations = useTranslations();
  const t = translations?.app?.subscriptions;
  
  // State for subscription data
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [initialized, setInitialized] = useState(false);
  
  // Get current user ID
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Group modal and cancellation-related state
  const [modalState, setModalState] = useState<SubscriptionState>({
    showCancelModal: false,
    selectedSubscription: null,
    cancelReason: '',
    isCancelling: false,
    cancelImmediately: false
  });

  // Format date from Unix timestamp
  const formatTimestamp = useCallback((timestamp: number | null) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString('sl-SI');
  }, []);

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

  // Get current user ID
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getSession();
      setCurrentUserId(data.session?.user?.id || null);
    };
    
    getCurrentUser();
  }, []);

  // Fetch subscriptions on mount
  useEffect(() => {
    if (isSuperAdmin) {
      fetchSubscriptions();
    }
  }, [isSuperAdmin, fetchSubscriptions]);

  // Helper function for updating modal state
  const updateModalState = useCallback((updates: Partial<SubscriptionState>) => {
    setModalState(prev => ({ ...prev, ...updates }));
  }, []);

  // Open cancel modal
  const openCancelModal = useCallback((subscription: Subscription) => {
    updateModalState({
      selectedSubscription: subscription,
      cancelImmediately: false,
      showCancelModal: true
    });
  }, [updateModalState]);

  // Open immediate cancel modal
  const openImmediateCancelModal = useCallback((subscription: Subscription) => {
    updateModalState({
      selectedSubscription: subscription,
      cancelImmediately: true,
      showCancelModal: true
    });
  }, [updateModalState]);

  // Set cancel reason
  const setCancelReason = useCallback((reason: string) => {
    updateModalState({ cancelReason: reason });
  }, [updateModalState]);

  // Set show cancel modal
  const setShowCancelModal = useCallback((show: boolean) => {
    updateModalState({ showCancelModal: show });
  }, [updateModalState]);

  // Set cancel immediately
  const setCancelImmediately = useCallback((immediately: boolean) => {
    updateModalState({ cancelImmediately: immediately });
  }, [updateModalState]);

  // Handle subscription cancellation
  const handleCancelSubscription = useCallback(async () => {
    const { selectedSubscription, cancelReason, cancelImmediately } = modalState;
    
    if (!selectedSubscription?.subscription_id) return;
    
    updateModalState({ isCancelling: true });
    
    try {
      setError(null);
      
      // Call Stripe webhook to cancel subscription
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cancel-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          subscription_id: selectedSubscription.subscription_id,
          cancel_reason: cancelReason,
          cancel_immediately: cancelImmediately
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to cancel subscription');
      }
      
      // Refresh subscriptions and reset state
      await fetchSubscriptions();
      updateModalState({
        showCancelModal: false,
        cancelReason: '',
        cancelImmediately: false,
        isCancelling: false
      });
    } catch (err) {
      console.error('Error cancelling subscription:', err);
      setError(err instanceof Error ? err.message : 'Failed to cancel subscription');
      updateModalState({ isCancelling: false });
    }
  }, [modalState, fetchSubscriptions]);

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
        throw new Error(errorData.error || 'Failed to cancel subscription');
      }
      
      // Refresh subscriptions
      await fetchSubscriptions();
    } catch (err) {
      console.error('Error cancelling subscription immediately:', err);
      setError(err instanceof Error ? err.message : 'Failed to cancel subscription');
    }
  }, [confirmDelete, fetchSubscriptions]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  return {
    subscriptions,
    loading,
    error,
    refreshing,
    initialized,
    showCancelModal: modalState.showCancelModal,
    selectedSubscription: modalState.selectedSubscription,
    cancelReason: modalState.cancelReason,
    isCancelling: modalState.isCancelling,
    cancelImmediately: modalState.cancelImmediately,
    currentUserId,
    setError,
    setShowCancelModal,
    setCancelReason,
    setCancelImmediately,
    fetchSubscriptions,
    handleRefresh,
    openCancelModal,
    openImmediateCancelModal,
    handleCancelSubscription,
    handleImmediateCancellation,
    formatTimestamp
  };
};

export default useSubscriptionManagement;