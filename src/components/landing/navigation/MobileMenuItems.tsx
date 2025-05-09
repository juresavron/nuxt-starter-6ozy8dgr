import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import LanguageSelectorMobile from '../../shared/LanguageSelectorMobile';

interface MobileMenuItemsProps {
  tabs: Array<{ id: string; label: string }>;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

const MobileMenuItems: React.FC<MobileMenuItemsProps> = ({
  tabs,
  activeSection,
  scrollToSection
}) => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  // Animation variants for staggered animation
  const staggerMenuItems = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Get translated tab labels
  const getTranslatedTabs = () => {
    return tabs
      .filter(tab => tab.id !== 'blog' && tab.id !== 'social-proof')
      .map(tab => {
        // Try to get translation from language files
        let translatedLabel = tab.label;
        
        // Map section IDs to translation keys
        if (translations?.landing?.navigation) {
          const navTranslations = translations.landing.navigation;
          
          switch(tab.id) {
            case 'benefits':
              translatedLabel = navTranslations.benefits || 'Benefits';
              break;
            case 'how-it-works':
              translatedLabel = navTranslations.howItWorks || 'How It Works';
              break;
            case 'nfc-showcase':
              translatedLabel = navTranslations.nfc || 'NFC Cards';
              break;
            case 'pricing':
              translatedLabel = navTranslations.pricing || 'Pricing';
              break;
            case 'industries':
              translatedLabel = navTranslations.industries || 'Industries';
              break;
            case 'contact':
              translatedLabel = navTranslations.contact || 'Contact';
              break;
            default:
              translatedLabel = tab.label;
          }
        }
        
        return {
          ...tab,
          label: translatedLabel
        };
      });
  };
  
  const translatedTabs = getTranslatedTabs();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={staggerMenuItems}
      className="space-y-2 py-4"
    >
      {translatedTabs.map((tab) => (
        <motion.button
          key={tab.id}
          variants={menuItemVariants}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(tab.id);
          }}
          className={`w-full flex items-center justify-between py-3.5 px-5 rounded-lg text-base ${
            activeSection === tab.id 
              ? 'bg-blue-50 text-blue-600 shadow-sm' 
              : 'text-gray-700 hover:bg-gray-50 transition-colors'
          }`}
          style={{
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
        >
          <span className="font-medium text-base md:text-lg">{tab.label}</span>
          <div className={`flex items-center justify-center w-7 h-7 rounded-full ${
            activeSection === tab.id ? 'bg-blue-100 text-blue-600' : 'text-gray-400'
          }`}>
            <ChevronRight className="h-4 w-4" />
          </div>
        </motion.button>
      ))}

      {/* Language selector for mobile */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <motion.div variants={menuItemVariants}>
          <LanguageSelectorMobile />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MobileMenuItems;