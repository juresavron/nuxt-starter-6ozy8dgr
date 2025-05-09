import React from 'react';
import { Ticket } from 'lucide-react';
import Card from '../../../shared/Card';
import { useTranslations } from '../../../../hooks/useTranslations';

interface CouponEmptyStateProps {
  message?: string;
}

/**
 * Empty state component for coupons
 */
const CouponEmptyState: React.FC<CouponEmptyStateProps> = ({
  message
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.coupons || {};

  return (
    <Card>
      <div className="p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Ticket className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{t?.noCoupons || 'No coupons found'}</h3>
        <p className="text-gray-500">
          {message || 'When customers receive coupons, they will appear here.'}
        </p>
      </div>
    </Card>
  );
};

export default React.memo(CouponEmptyState);