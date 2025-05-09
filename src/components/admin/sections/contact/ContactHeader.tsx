import React from 'react';
import { Mail, RefreshCw } from 'lucide-react';
import Button from '../../../shared/Button';
import { useTranslations } from '../../../../hooks/useTranslations';

interface ContactHeaderProps {
  onRefresh: () => void;
  refreshing: boolean;
}

/**
 * Header component for the contact requests section
 */
const ContactHeader: React.FC<ContactHeaderProps> = ({
  onRefresh,
  refreshing
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.contacts || {};

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 flex items-center gap-2">
        <Mail className="h-6 w-6 text-purple-600" style={{ fill: 'rgba(237, 233, 254, 0.5)' }} />
        <span>{t?.title || 'Contact Requests'}</span>
      </h2>
      <Button
        onClick={onRefresh}
        variant="secondary"
        size="sm"
        leftIcon={<RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} style={{ fill: 'rgba(229, 231, 235, 0.3)' }} />}
        disabled={refreshing}
      >
        {refreshing ? t?.refreshing || 'Refreshing...' : t?.refresh || 'Refresh'}
      </Button>
    </div>
  );
};

export default React.memo(ContactHeader);