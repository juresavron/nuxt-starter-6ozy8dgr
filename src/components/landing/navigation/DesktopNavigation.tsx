import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import NavLink from './NavLink';
import LoginButton from './LoginButton';
import PhoneButton from './PhoneButton';
import Logo from './Logo';
import { useTranslations } from '../../../hooks/useTranslations';
import LanguageSelector from '../../shared/LanguageSelector';
import UserMenu from './UserMenu';
import { useLanguageStore } from '../../../hooks/useLanguageStore';

interface DesktopNavigationProps {
  isScrolled: boolean;
  activeSection: string;
  isAuthenticated: boolean;
  userEmail: string | null;
  tabs: Array<{ id: string; label: string }>;
  scrollToSection: (sectionId: string) => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  isScrolled,
  activeSection,
  isAuthenticated,
  userEmail,
  tabs,
  scrollToSection
}) => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
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
              translatedLabel = navTranslations.nfc || 'NFC';
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ios-optimized",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-3"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-14">
        {/* Logo */}
        <Logo isScrolled={isScrolled} size="md" />
        
        {/* Navigation Links - Horizontally centered with even spacing */}
        <div className="hidden lg:flex items-center mx-auto px-1 py-1 rounded-full bg-white/10 backdrop-blur-sm shadow-lg ios-optimized">
          {translatedTabs.map(tab => (
            <NavLink
              key={tab.id}
              href={`/#${tab.id}`}
              label={tab.label}
              active={activeSection === tab.id}
              onClick={() => scrollToSection(tab.id)}
              isScrolled={isScrolled}
            />
          ))}
        </div>
        
        {/* Right side buttons - unified height and styling */}
        <div className="flex items-center gap-2 ml-auto">
          <PhoneButton isScrolled={isScrolled} className="h-10" />
          <LanguageSelector isScrolled={isScrolled} className="h-10" />
          
          {isAuthenticated ? (
            <UserMenu 
              isScrolled={isScrolled} 
              userEmail={userEmail}
              className="h-10"
            />
          ) : (
            <LoginButton isScrolled={isScrolled} className="h-10" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DesktopNavigation;