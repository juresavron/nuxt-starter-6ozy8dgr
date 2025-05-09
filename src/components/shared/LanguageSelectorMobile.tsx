import * as React from 'react';
import { useState } from 'react';
import { useLanguageStore, type Language } from '../../hooks/useLanguageStore';
import { motion } from 'framer-motion';
import { Check, Globe } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTranslations } from '../../hooks/useTranslations';

/**
 * Mobile-optimized language selector for use in the mobile menu
 */
const LanguageSelectorMobile: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();
  const translations = useTranslations();
  
  const languages = [
    { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' }
  ];

  const handleLanguageChange = (code: Language) => {
    setLanguage(code);
  };

  return (
    <div className="py-2">
      <h3 className="text-base font-medium text-gray-600 mb-3 px-4">
        {language === 'en' ? 'Select Language' : 
         language === 'it' ? 'Seleziona Lingua' : 
         'Izberite Jezik'}
      </h3>
      <div className="space-y-1">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code as Language)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3 rounded-lg",
              language === lang.code 
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            )}
          >
            <div className="flex items-center">
              <span className="text-xl mr-3">{lang.flag}</span>
              <span className="font-medium text-base">{lang.name}</span>
            </div>
            {language === lang.code && (
              <Check className="h-5 w-5 text-blue-600" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelectorMobile;