import React, { useState, useEffect, useCallback } from 'react';
import { useAdminStore } from '../../../hooks/admin/store';
import ErrorAlert from '../../shared/ErrorAlert';
import { ErrorSeverity } from '../../../utils/errorHandler';
import { useTranslations } from '../../../hooks/useTranslations';

// Import modular components
import {
  CommunicationsHeader,
  EmailList,
  SMSList
} from './communications';

/**
 * Communications section of the admin panel
 * Shows all sent emails and SMS messages
 */
const Communications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'email' | 'sms'>('email');
  const [refreshing, setRefreshing] = useState(false);
  
  const { 
    emailLogs, 
    smsLogs, 
    loading, 
    error, 
    setError,
    fetchData
  } = useAdminStore();
  
  const translations = useTranslations();
  const t = translations?.app?.admin?.communications || {};

  // Refresh data
  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await fetchData();
    } catch (err) {
      console.error('Error refreshing communications data:', err);
      setError(err instanceof Error ? err.message : 'Failed to refresh communications data');
    } finally {
      setRefreshing(false);
    }
  }, [fetchData, setError]);

  return (
    <div className="space-y-6 pb-20">
      <CommunicationsHeader 
        onRefresh={handleRefresh}
        refreshing={refreshing}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {error && (
        <ErrorAlert
          message={error}
          severity={ErrorSeverity.ERROR}
          onDismiss={() => setError(null)}
        />
      )}

      {activeTab === 'email' ? (
        <EmailList
          emails={emailLogs || []}
          loading={loading || refreshing}
        />
      ) : (
        <SMSList
          messages={smsLogs || []}
          loading={loading || refreshing}
        />
      )}
    </div>
  );
};

export default React.memo(Communications);