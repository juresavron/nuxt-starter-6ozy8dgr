import React from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';
import Card from '../../shared/Card';
import Button from '../../shared/Button';
import { cn } from '../../../utils/cn';

interface SubscriptionDetailsCardProps {
  subscription: any;
  formatTimestamp: (timestamp: number | null) => string;
  onCancel?: () => void;
  onUpgrade?: () => void;
}

const SubscriptionDetailsCard: React.FC<SubscriptionDetailsCardProps> = ({
  subscription,
  formatTimestamp,
  onCancel,
  onUpgrade
}) => {
  if (!subscription) return null;

  return (
    <Card className="mb-6">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-blue-600" style={{ fill: 'rgba(219, 234, 254, 0.5)' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Podatki o naročnini</h2>
              <div className="mt-1">
                {getSubscriptionStatusBadge(subscription.subscription_status || 'unknown')}
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {subscription.current_period_start && subscription.current_period_end && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Trenutno obdobje</h3>
              <p className="text-gray-900">
                {formatTimestamp(subscription.current_period_start)} - {formatTimestamp(subscription.current_period_end)}
              </p>
            </div>
          )}
          
          {subscription.cancel_at_period_end !== null && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Samodejno podaljšanje</h3>
              <p className="text-gray-900">
                {subscription.cancel_at_period_end === false 
                  ? 'Da'
                  : 'Ne (preklic ob koncu obdobja)'}
              </p>
            </div>
          )}
        </div>
        
        {subscription.payment_method_brand && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Način plačila</h3>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-900">
                {subscription.payment_method_brand.toUpperCase()} •••• {subscription.payment_method_last4}
              </p>
            </div>
          </div>
        )}
        
        {subscription.subscription_status === 'active' && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
            {!subscription.cancel_at_period_end && onCancel && (
              <Button
                variant="secondary"
                onClick={onCancel}
                className="flex-1"
              >
                Prekliči naročnino
              </Button>
            )}
            {onUpgrade && (
              <Button
                variant="primary"
                onClick={onUpgrade}
                className="flex-1"
              >
                Nadgradi paket
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

function getSubscriptionStatusBadge(status: string) {
  switch (status) {
    case 'active':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Aktivna
        </span>
      );
    case 'trialing':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Clock className="w-3 h-3 mr-1" />
          Preizkusno obdobje
        </span>
      );
    case 'past_due':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <AlertCircle className="w-3 h-3 mr-1" />
          Zapadla plačila
        </span>
      );
    case 'canceled':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" />
          Preklicana
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {status || 'Neznano'}
        </span>
      );
  }
}

export default SubscriptionDetailsCard;