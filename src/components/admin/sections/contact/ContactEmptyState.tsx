import React from 'react';
import { Mail } from 'lucide-react';
import Card from '../../../shared/Card';
import { useTranslations } from '../../../../hooks/useTranslations';

interface ContactEmptyStateProps {
  message?: string;
}

/**
 * Empty state component for contact requests
 */
const ContactEmptyState: React.FC<ContactEmptyStateProps> = ({
  message
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.contacts || {};

  return (
    <Card>
      <div className="p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Mail className="h-8 w-8 text-gray-400" style={{ fill: 'rgba(229, 231, 235, 0.5)' }} />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{t?.noRequests || 'No contact requests yet'}</h3>
        <p className="text-gray-500">
          {message || 'When visitors submit the contact form on your website, their requests will appear here.'}
        </p>
      </div>
    </Card>
  );
};

export default React.memo(ContactEmptyState);