import React from 'react';
import { Mail, RefreshCw, MessageSquare } from 'lucide-react';
import Button from '../../../shared/Button';
import { useTranslations } from '../../../../hooks/useTranslations';

interface CommunicationsHeaderProps {
  onRefresh: () => void;
  refreshing: boolean;
  activeTab: 'email' | 'sms';
  setActiveTab: (tab: 'email' | 'sms') => void;
}

/**
 * Header component for the communications section
 */
const CommunicationsHeader: React.FC<CommunicationsHeaderProps> = ({
  onRefresh,
  refreshing,
  activeTab,
  setActiveTab
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.communications || {
    title: 'Communications',
    email: 'Email',
    sms: 'SMS',
    refresh: 'Refresh',
    refreshing: 'Refreshing...'
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 flex items-center gap-2">
        <Mail className="h-6 w-6 text-blue-600" />
        <span>{t?.title || 'Communications'}</span>
      </h2>
      
      <div className="flex items-center gap-4">
        <div className="flex p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setActiveTab('email')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'email' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Mail className="h-4 w-4" />
              <span>{t?.email || 'Email'}</span>
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('sms')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'sms' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" />
              <span>{t?.sms || 'SMS'}</span>
            </div>
          </button>
        </div>
        
        <Button
          onClick={onRefresh}
          variant="secondary"
          size="sm"
          leftIcon={<RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />}
          disabled={refreshing}
        >
          {refreshing ? (t?.refreshing || 'Refreshing...') : (t?.refresh || 'Refresh')}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(CommunicationsHeader);