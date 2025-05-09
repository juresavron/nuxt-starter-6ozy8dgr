import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, AlertCircle, Clock, XCircle, ArrowRight } from 'lucide-react';
import { useTranslations } from '../../../../hooks/useTranslations';
import { useAdminSubscription } from '../../../../hooks/admin/subscription/useAdminSubscription'; 
import { useAdminStore } from '../../../../hooks/admin/store';
import { Link } from 'react-router-dom';
import Card from '../../../shared/Card';
import Button from '../../../shared/Button';
import LoadingSpinner from '../../../shared/LoadingSpinner';

const UserSubscriptionCard: React.FC = () => {
  const { subscription, loading, error, isSubscriptionActive, formatTimestamp } = useAdminSubscription();
  const { isSuperAdmin } = useAdminStore();
  const translations = useTranslations();
  const t = translations?.app?.subscriptions;
  
  // Don't show subscription card for superadmins
  if (isSuperAdmin) {
    return null;
  }

  if (loading) {
    return (
      <Card className="p-6 flex justify-center items-center h-48">
        <LoadingSpinner size="md" color="blue" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-500">
          <p>Error loading subscription: {error}</p>
        </div>
      </Card>
    );
  }

  if (!subscription || subscription.subscription_status === 'not_started') {
    return (
      <Card className="p-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <CreditCard className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t?.noActiveSubscription || 'No Active Subscription'}</h3>
          <p className="text-gray-500 mb-6">
            {t?.noSubscriptionMessage || 'You don\'t have an active subscription at the moment.'}
          </p>
          <Button
            as={Link}
            to="/pricing"
            variant="primary"
          >
            {t?.viewPricingPlans || 'View Pricing Plans'}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-blue-600" style={{ fill: 'rgba(219, 234, 254, 0.5)' }} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {subscription?.is_superadmin ? (t?.superadminAccount || 'Superadmin Account') : (t?.yourSubscription || 'Your Subscription')}
              </h3>
              <div className="mt-1">
                {subscription?.subscription_status ? formatStatus(subscription.subscription_status, t) : 
                 subscription?.is_superadmin ? (
                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                     <CheckCircle className="w-3 h-3 mr-1" />
                     {t?.superadmin || 'Superadmin'}
                   </span>
                 ) : null}
              </div>
            </div>
          </div>
        </div>
        
        {subscription?.subscription_status && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {subscription.current_period_start && subscription.current_period_end && (
              <div className="flex items-start gap-2">
                <div className="text-sm font-medium text-gray-500">{t?.currentPeriod || 'Current Period'}:</div>
                <div className="text-sm text-gray-900">
                  {formatTimestamp(subscription.current_period_start)} - {formatTimestamp(subscription.current_period_end)}
                </div>
              </div>
            )}
            
            {subscription.cancel_at_period_end !== null && (
              <div className="flex items-start gap-2">
                <div className="text-sm font-medium text-gray-500">{t?.autoRenewal || 'Auto Renewal'}:</div>
                <div className="text-sm text-gray-900">
                  {subscription.cancel_at_period_end === false 
                    ? (t?.yes || 'Yes')
                    : (t?.no || 'No (Cancels at period end)')}
                </div>
              </div>
            )}
          </div>
        )}
        
        {subscription?.payment_method_brand && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          </div>
        )}
      </div>
    </Card>
  );
};

// Format subscription status
function formatStatus(status: string, t: any) {
  switch (status) {
    case 'active':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          {t?.active || 'Active'}
        </span>
      );
    case 'trialing':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Clock className="w-3 h-3 mr-1" />
          {t?.trial || 'Trial'}
        </span>
      );
    case 'past_due':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <AlertCircle className="w-3 h-3 mr-1" />
          {t?.pastDue || 'Past Due'}
        </span>
      );
    case 'canceled':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" />
          {t?.canceled || 'Canceled'}
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {status || 'Unknown'}
        </span>
      );
  }
}

export default UserSubscriptionCard;