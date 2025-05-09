import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useLanguageStore, type Language } from '../../hooks/useLanguageStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { useClientSide } from '../../hooks/useClientSide';
import { cn } from '../../utils/cn';

interface LanguageSelectorProps {
  isScrolled?: boolean;
  className?: string;
}

const languages = [
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' }
] as const;

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ isScrolled = true, className = '' }) => {
  const isClient = useClientSide();
  const { language, setLanguage } = useLanguageStore();
  // Initialize with default values
  const [currentLanguage, setCurrentLanguage] = useState<Language>(language || 'sl');
  const [isOpen, setIsOpen] = useState(false);
  
  // Get language from store only on client side
  useEffect(() => {
    if (isClient) {
      if (language && ['sl', 'en', 'it'].includes(language)) {
        setCurrentLanguage(language as Language);
      }
    }
  }, [isClient, language]);

  // Find the current language object
  const languageObject = languages.find(l => l.code === currentLanguage);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      setIsOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Handle dropdown toggle with stopPropagation
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Handle language change
  const handleLanguageChange = (code: Language) => {
    if (isClient) {
      setCurrentLanguage(code);
      setLanguage(code);
    }
    setIsOpen(false);
  };

  if (!isClient) return null;

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      y: -5, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className={cn(
          "flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium rounded-full transition-all duration-300",
          isScrolled
            ? "bg-white text-gray-700 hover:bg-gray-50 border border-gray-100 shadow-sm"
            : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/20",
          className
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
          <span className="text-base">{languageObject?.flag}</span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            isOpen ? "rotate-180" : "",
            isScrolled ? "text-gray-500" : "text-white/70"
          )}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100/80 overflow-hidden z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-1">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  whileHover={{ x: 4, backgroundColor: 'rgba(243, 244, 246, 0.8)' }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-sm transition-colors",
                    currentLanguage === lang.code
                      ? 'bg-blue-50/80 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </div>
                  {currentLanguage === lang.code && (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(LanguageSelector);