import React from 'react';
import { useLanguageStore, type Language } from '../../hooks/useLanguageStore';
import { cn } from '../../utils/cn';

interface LanguageSelectorProps {
  colorScheme?: string;
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  colorScheme = 'indigo',
  className = ''
}) => {
  const { language, setLanguage } = useLanguageStore();
  
  const languages = [
    { code: 'sl', name: 'SLO', flag: '🇸🇮' },
    { code: 'en', name: 'ENG', flag: '🇬🇧' },
    { code: 'it', name: 'ITA', flag: '🇮🇹' }
  ];

  const handleLanguageChange = (code: Language) => {
    setLanguage(code);
  };

  return (
    <div className={cn(
      "flex items-center justify-center gap-2 mt-4",
      className
    )}>
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code as Language)}
          className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors",
            language === lang.code 
              ? colorScheme === 'amber' ? 'bg-amber-100 text-amber-700' :
                colorScheme === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                colorScheme === 'rose' ? 'bg-rose-100 text-rose-700' :
                colorScheme === 'bw' ? 'bg-gray-200 text-gray-800' :
                'bg-indigo-100 text-indigo-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          <span className="text-lg">{lang.flag}</span>
          <span>{lang.name}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;