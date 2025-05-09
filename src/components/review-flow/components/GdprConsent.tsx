import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslations } from '../../../hooks/useTranslations';

interface GdprConsentProps {
  className?: string;
}

/**
 * GDPR consent text component
 */
const GdprConsent: React.FC<GdprConsentProps> = ({
  className = ''
}) => {
  const translations = useTranslations();

  return (
    <div className={`text-sm text-gray-500 text-center ${className}`}>
      {translations?.review?.form?.gdprSubmit || 'S pošiljanjem tega obrazca se strinjam z obdelavo osebnih podatkov v skladu z'}{' '}
      <Link to="/privacy" className="text-indigo-600 hover:text-indigo-800">
        {translations?.review?.form?.gdprLink || 'politiko zasebnosti'}
      </Link>
    </div>
  );
};

export default React.memo(GdprConsent);