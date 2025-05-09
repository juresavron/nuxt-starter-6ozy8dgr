import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, AlertCircle, Clock, XCircle, RefreshCw } from 'lucide-react';
import Button from '../../../shared/Button';
import { useTranslations } from '../../../../hooks/useTranslations';
import Card from '../../../shared/Card';

interface SubscriptionTableProps {
  subscriptions?: any[];
  isSuperAdmin?: boolean;
  loading?: boolean;
  error?: string | null;
  refreshing?: boolean;
  handleRefresh?: () => void;
}

/**
 * Subscription table component
 */
const SubscriptionTable: React.FC<SubscriptionTableProps> = ({
  subscriptions = [],
  isSuperAdmin = false,
  loading = false,
  error = null,
  refreshing = false,
  handleRefresh
}) => {
  const translations = useTranslations();
  const t = translations?.app?.subscriptions;

  const formatStatus = (status: string) => {
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
  };

  const formatTimestamp = (timestamp: number | null) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  if (loading) {
    return (
      <Card className="p-6 flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">{t?.loading || 'Loading subscriptions...'}</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-500 mb-4">
          <p>{error}</p>
        </div>
        {handleRefresh && (
          <div className="flex justify-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleRefresh}
              leftIcon={<RefreshCw className="h-4 w-4" />}
            >
              {t?.retry || 'Try again'}
            </Button>
          </div>
        )}
      </Card>
    );
  }

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <Card className="p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <CreditCard className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{t?.noSubscriptions || 'No subscriptions found'}</h3>
        <p className="text-gray-500">
          {isSuperAdmin 
            ? (t?.noSubscriptionsAdmin || 'There are no active subscriptions in the system yet.')
            : (t?.noSubscriptionMessage || 'You don\'t have any active subscriptions yet.')}
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t?.adminEmail || 'Admin Email'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t?.subscriptionStatus || 'Status'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t?.periodEnd || 'Period End'}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t?.actions || 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subscriptions.map((subscription, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {subscription.admin_email || 'Unknown Email'}
                        {subscription.is_superadmin && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {t?.superadmin || 'Superadmin'}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatStatus(subscription.subscription_status || 'unknown')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatTimestamp(subscription.current_period_end)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="secondary"
                      size="sm"
                      as="a"
                      href="/account/subscription"
                    >
                      {t?.manage || 'Manage'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default SubscriptionTable;