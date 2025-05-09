import React from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';

interface LegalLinksProps {
  title: string;
}

const LegalLinks: React.FC<LegalLinksProps> = ({ title }) => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  const termsText = translations?.landing?.footer?.links?.terms || (language === 'en' ? 'Terms of Service' : 'Pogoji uporabe');
  const privacyText = translations?.landing?.footer?.links?.privacy || (language === 'en' ? 'Privacy Policy' : 'Politika zasebnosti');
  
  return (
    <div className="mt-6 md:mt-0">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{title}</h3>
      <ul className="space-y-2 sm:space-y-3">
        <li>
          <a href="/terms" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors">
            {termsText}
          </a>
        </li>
        <li>
          <a href="/privacy" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors">
            {privacyText}
          </a>
        </li>
        <li>
          <a href="/gdpr" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors">GDPR</a>
        </li>
      </ul>
    </div>
  );
};

export default LegalLinks;