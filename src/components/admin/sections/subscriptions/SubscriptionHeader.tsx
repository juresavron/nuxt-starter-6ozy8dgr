import React from 'react';
import { CreditCard, RefreshCw } from 'lucide-react';
import Button from '../../../shared/Button';
import { useTranslations } from '../../../../hooks/useTranslations';
import { motion } from 'framer-motion';

interface SubscriptionHeaderProps {
  onRefresh: () => void;
  refreshing: boolean;
}

const SubscriptionHeader: React.FC<SubscriptionHeaderProps> = ({ onRefresh, refreshing }) => {
  const translations = useTranslations();
  const t = translations?.app?.subscriptions;

  return (
    <div className="flex justify-between items-center mb-6">
      <motion.h2 
        className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CreditCard className="h-6 w-6 text-blue-600" style={{ fill: 'rgba(219, 234, 254, 0.3)' }} />
        <span>{t?.title || 'Upravljanje naročnin'}</span>
      </motion.h2>
      
      <Button
        onClick={onRefresh}
        variant="secondary"
        size="sm"
        leftIcon={<RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} style={{ fill: 'rgba(229, 231, 235, 0.3)' }} />}
        disabled={refreshing}
      >
        {refreshing ? (t?.refreshing || 'Osveževanje...') : (t?.refresh || 'Osveži')}
      </Button>
    </div>
  );
};

export default SubscriptionHeader;