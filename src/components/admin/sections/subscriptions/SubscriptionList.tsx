import React from 'react';
import { useTranslations } from '../../../../hooks/useTranslations';
import { formatTimestamp } from '../../../../utils/date';
import Card from '../../../shared/Card';
import SubscriptionStatusBadge from './SubscriptionStatusBadge';
import Button from '../../../shared/Button';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../../../utils/cn';

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

interface SubscriptionListProps {
  subscriptions: Subscription[];
  loading: boolean;
  onManage: (subscription: Subscription) => void;
  onCancel: (subscription: Subscription) => void;
  onCancelImmediate: (subscription: Subscription) => void;
  currentUserId: string | null;
}

const SubscriptionList: React.FC<SubscriptionListProps> = ({
  subscriptions,
  loading,
  onManage,
  onCancel,
  onCancelImmediate,
  currentUserId
}) => {
  const translations = useTranslations();
  const t = translations?.app?.subscriptions || {};

  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">{t?.loading || 'Nalaganje naročnin...'}</p>
      </div>
    );
  }

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-600">{t?.noSubscriptions || 'Ni aktivnih naročnin'}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t?.adminEmail || 'E-pošta administratorja'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t?.subscriptionStatus || 'Status naročnine'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t?.periodEnd || 'Konec obdobja'}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t?.actions || 'Dejanja'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscriptions.map((subscription, index) => (
              <motion.tr
                key={subscription.admin_id || index}
                className="hover:bg-gray-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                      {subscription.admin_email || 'Unknown Email'}
                      {subscription.is_superadmin && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {t?.superadmin || 'Superadmin'}
                        </span>
                      )}
                      {subscription.admin_id === currentUserId && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {t?.currentUser || 'Vi'}
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <SubscriptionStatusBadge status={subscription.subscription_status || 'unknown'} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatTimestamp(subscription.current_period_end)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onManage(subscription)}
                      leftIcon={<ExternalLink className="h-4 w-4" />}
                    >
                      {t?.manage || 'Upravljaj'}
                    </Button>
                    {subscription.subscription_status === 'active' && !subscription.cancel_at_period_end && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onCancel(subscription)}
                      >
                        {t?.cancel || 'Prekliči'}
                      </Button>
                    )}
                    {subscription.subscription_status === 'active' && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onCancelImmediate(subscription)}
                      >
                        {t?.cancelImmediate || 'Prekliči takoj'}
                      </Button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionList;