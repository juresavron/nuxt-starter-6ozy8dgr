import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../utils/cn';
import { useTranslations } from '../../../hooks/useTranslations';

interface GdprConsentProps {
  colorScheme?: string;
  className?: string;
}

/**
 * GDPR consent component with privacy policy link
 */
const GdprConsent: React.FC<GdprConsentProps> = ({
  colorScheme = 'indigo',
  className = ''
}) => {
  const translations = useTranslations();

  return (
    <span className={cn("text-sm text-gray-500", className)}>
      {translations?.gamification?.form?.gdprSubmit || 'S pošiljanjem tega obrazca se strinjam z obdelavo osebnih podatkov v skladu z'}{' '}
      <Link 
        to="/privacy" 
        className={cn(
          "underline hover:no-underline",
          colorScheme === 'amber' ? 'text-amber-600 hover:text-amber-700' :
          colorScheme === 'emerald' ? 'text-emerald-600 hover:text-emerald-700' :
          colorScheme === 'rose' ? 'text-rose-600 hover:text-rose-700' :
          colorScheme === 'bw' ? 'text-gray-700 hover:text-gray-900' :
          'text-indigo-600 hover:text-indigo-700'
        )}
      >
        {translations?.gamification?.form?.gdprLink || 'politiko zasebnosti'}
      </Link>
    </span>
  );
};

export default GdprConsent;