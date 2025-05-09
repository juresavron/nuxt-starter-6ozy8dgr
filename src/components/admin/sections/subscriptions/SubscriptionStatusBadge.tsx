import React from 'react';
import { CheckCircle, AlertCircle, Clock, XCircle } from 'lucide-react';
import { useTranslations } from '../../../../hooks/useTranslations';

interface SubscriptionStatusBadgeProps {
  status: string;
}

const SubscriptionStatusBadge: React.FC<SubscriptionStatusBadgeProps> = ({ status }) => {
  const translations = useTranslations();
  const t = translations?.app?.subscriptions;

  switch (status) {
    case 'active':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          {t?.active || 'Aktivna'}
        </span>
      );
    case 'trialing':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Clock className="w-3 h-3 mr-1" />
          {t?.trial || 'Preizkus'}
        </span>
      );
    case 'past_due':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <AlertCircle className="w-3 h-3 mr-1" />
          {t?.pastDue || 'Zapadlo plačilo'}
        </span>
      );
    case 'canceled':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" />
          {t?.canceled || 'Preklicano'}
        </span>
      );
    case 'not_started':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {t?.notStarted || 'Ni začeta'}
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {status || 'Neznano'}
        </span>
      );
  }
};

export default SubscriptionStatusBadge;