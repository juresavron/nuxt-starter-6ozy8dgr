import React from 'react';
import { CreditCard } from 'lucide-react';
import { useTranslations } from '../../../../hooks/useTranslations';
import Card from '../../../shared/Card';

interface EmptySubscriptionStateProps {
  isSuperAdmin: boolean;
}

const EmptySubscriptionState: React.FC<EmptySubscriptionStateProps> = ({ isSuperAdmin }) => {
  const translations = useTranslations();
  const t = translations?.app?.subscriptions;

  return (
    <Card>
      <div className="p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <CreditCard className="h-8 w-8 text-gray-400" style={{ fill: 'rgba(229, 231, 235, 0.5)' }} />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{t?.noSubscriptions || 'Ni aktivnih naročnin'}</h3>
        <p className="text-gray-500">
          {isSuperAdmin 
            ? (t?.noSubscriptionsAdmin || 'V sistemu še ni aktivnih naročnin.')
            : (t?.noSubscriptionMessage || 'Trenutno nimate aktivne naročnine.')}
        </p>
      </div>
    </Card>
  );
};

export default React.memo(EmptySubscriptionState);