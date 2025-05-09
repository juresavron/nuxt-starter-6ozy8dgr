import React from 'react';
import Card from '../../shared/Card';
import { Shield } from 'lucide-react';
import { useTranslations } from '../../../hooks/useTranslations';

const SuperadminSubscriptionNote: React.FC = () => {
  const translations = useTranslations();
  const t = translations?.app?.subscriptions;
  
  return (
    <Card>
      <div className="p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
          <Shield className="h-8 w-8 text-purple-600" style={{ fill: 'rgba(233, 213, 255, 0.5)' }} />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{t?.superadminAccount || 'Superadmin račun'}</h3>
        <p className="text-gray-500">
          {t?.fullAccess || 'Kot superadmin imate dostop do vseh funkcij brez naročnine.'}
        </p>
      </div>
    </Card>
  );
};

export default SuperadminSubscriptionNote;