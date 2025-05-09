import React from 'react';
import { motion } from 'framer-motion';
import { useSubscriptionManagement } from '../../../hooks/admin/subscription/useSubscriptionManagement';
import { useAdminStore } from '../../../hooks/admin/store';
import ErrorAlert from '../../shared/ErrorAlert';
import { ErrorSeverity } from '../../../utils/errorHandler';

// Import sub-components
import SubscriptionHeader from './subscriptions/SubscriptionHeader';
import SubscriptionList from './subscriptions/SubscriptionList';
import EmptySubscriptionState from './subscriptions/EmptySubscriptionState';
import CancelSubscriptionModal from './subscriptions/CancelSubscriptionModal';

const Subscriptions: React.FC = () => {
  const { isSuperAdmin } = useAdminStore();
  
  // Use the subscription management hook
  const {
    subscriptions,
    loading,
    error,
    refreshing,
    showCancelModal,
    selectedSubscription,
    cancelReason,
    isCancelling,
    cancelImmediately,
    currentUserId,
    setError,
    setShowCancelModal,
    setCancelReason,
    fetchSubscriptions,
    handleRefresh,
    openCancelModal,
    openImmediateCancelModal,
    handleCancelSubscription,
  } = useSubscriptionManagement();

  return (
    <div className="space-y-6 pb-20">
      <SubscriptionHeader 
        onRefresh={handleRefresh} 
        refreshing={refreshing} 
      />

      {error && (
        <ErrorAlert
          message={error}
          severity={ErrorSeverity.ERROR}
          onDismiss={() => setError(null)}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {subscriptions.length === 0 ? (
          <EmptySubscriptionState isSuperAdmin={isSuperAdmin} />
        ) : (
          <SubscriptionList
            subscriptions={subscriptions}
            loading={loading}
            onManage={() => window.location.href = '/account/subscription'}
            onCancel={openCancelModal}
            onCancelImmediate={openImmediateCancelModal}
            currentUserId={currentUserId}
          />
        )}
      </motion.div>

      {/* Modals */}
      <CancelSubscriptionModal
        showModal={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        cancelReason={cancelReason}
        onCancelReasonChange={setCancelReason}
        onConfirmCancel={handleCancelSubscription}
        isCancelling={isCancelling}
        error={error}
        cancelImmediately={cancelImmediately}
      />
    </div>
  );
};

export default React.memo(Subscriptions);