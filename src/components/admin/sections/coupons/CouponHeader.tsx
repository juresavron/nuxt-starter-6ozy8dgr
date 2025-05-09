import React from 'react';
import { Ticket, RefreshCw } from 'lucide-react';
import Button from '../../../shared/Button';
import { useTranslations } from '../../../../hooks/useTranslations';

interface CouponHeaderProps {
  onRefresh: () => void;
  refreshing: boolean;
}

/**
 * Header component for the coupons section
 */
const CouponHeader: React.FC<CouponHeaderProps> = ({ onRefresh, refreshing }) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.coupons || {};

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 flex items-center gap-2">
        <Ticket className="h-6 w-6 text-blue-600" />
        <span>{t?.title || 'Coupons'}</span>
      </h2>
      <Button
        onClick={onRefresh}
        variant="secondary"
        size="sm"
        leftIcon={<RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />}
        disabled={refreshing}
      >
        {refreshing ? t?.refreshing || 'Refreshing...' : t?.refresh || 'Refresh'}
      </Button>
    </div>
  );
};

export default React.memo(CouponHeader);