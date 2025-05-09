import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdminSubscription } from '../../hooks/admin/subscription/useAdminSubscription';
import { useConfirmDelete } from '../../hooks/useConfirmDelete';
import { supabase } from '../../lib/supabase';
import Button from '../shared/Button';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorAlert from '../shared/ErrorAlert';
import { ErrorSeverity } from '../../utils/errorHandler';
import CancelSubscriptionModal from '../admin/sections/subscriptions/CancelSubscriptionModal';
import SubscriptionDetailsCard from '../account/subscription/SubscriptionDetailsCard';
import BillingHistoryCard from '../account/subscription/BillingHistoryCard';
import SuperadminSubscriptionNote from '../account/subscription/SuperadminSubscriptionNote';

const ManageSubscriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const { confirmDelete } = useConfirmDelete();
  
  // State
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // Subscription data
  const { subscription, loading } = useAdminSubscription();
  
  // Check authentication on mount
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/login', { state: { returnTo: '/account/subscription' } });
      }
    })();
  }, [navigate]);
  
  // Format date from Unix timestamp
  const formatTimestamp = useCallback((timestamp: number | null) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString('sl-SI');
  }, []);
  
  // Handle cancellation
  const handleCancelSubscription = async () => {
    if (!subscription?.subscription_id) return;
    
    try {
      setIsCancelling(true);
      setError(null);
      
      // Call Stripe webhook to cancel subscription
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cancel-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          subscription_id: subscription.subscription_id,
          cancel_reason: cancelReason
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to cancel subscription');
      }
      
      setShowCancelModal(false);
      setCancelReason('');
      window.location.reload();
    } catch (err) {
      console.error('Error cancelling subscription:', err);
      setError(err instanceof Error ? err.message : 'Failed to cancel subscription');
    } finally {
      setIsCancelling(false);
    }
  };
  
  // Refresh page
  const handleRefresh = () => {
    setRefreshing(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4 flex items-center justify-center">
        <LoadingSpinner size="lg" color="blue" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/admin')}
            leftIcon={<ArrowLeft className="h-5 w-5" />}
            className="mb-6"
          >
            Nazaj na nadzorno ploščo
          </Button>
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Upravljanje naročnine</h1>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleRefresh}
              leftIcon={<RefreshCw className="h-4 w-4" />}
              disabled={refreshing}
            >
              {refreshing ? 'Osveževanje...' : 'Osveži'}
            </Button>
          </div>
        </motion.div>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <ErrorAlert message={error} severity={ErrorSeverity.ERROR} />
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {subscription && subscription.subscription_status !== 'not_started' ? (
            <>
              <SubscriptionDetailsCard 
                subscription={subscription} 
                formatTimestamp={formatTimestamp} 
                onCancel={() => setShowCancelModal(true)} 
                onUpgrade={() => navigate('/pricing')} 
              />
              <BillingHistoryCard />
            </>
          ) : (
            <div className="text-center">
              {subscription?.is_superadmin ? (
                <SuperadminSubscriptionNote />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <CreditCard className="h-8 w-8 text-gray-400" style={{ fill: 'rgba(229, 231, 235, 0.5)' }} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Ni aktivne naročnine</h3>
                      <p className="text-gray-500 mb-6">Trenutno nimate aktivne naročnine.</p>
                      <Button
                        variant="primary"
                        onClick={() => navigate('/pricing')}
                      >
                        Ogled paketov
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
      
      <CancelSubscriptionModal
        showModal={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        cancelReason={cancelReason}
        onCancelReasonChange={setCancelReason}
        onConfirmCancel={handleCancelSubscription}
        isCancelling={isCancelling}
        error={error}
      />
    </div>
  );
};

export default ManageSubscriptionPage;