import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import NavLink from './NavLink';
import Logo from './Logo';
import { useTranslations } from '../../../hooks/useTranslations';
import LanguageSelector from '../../shared/LanguageSelector';
import UserMenu from './UserMenu';
import LoginButton from './LoginButton';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';
import { useLanguageStore } from '../../../hooks/useLanguageStore';

interface TabletNavigationProps {
  isScrolled: boolean;
  activeSection: string;
  isAuthenticated: boolean;
  userEmail: string | null;
  tabs: Array<{ id: string; label: string }>;
  scrollToSection: (sectionId: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  toggleMenu: () => void;
}

const TabletNavigation: React.FC<TabletNavigationProps> = ({
  isScrolled,
  activeSection,
  isAuthenticated,
  userEmail,
  tabs,
  scrollToSection,
  isMenuOpen,
  setIsMenuOpen,
  toggleMenu
}) => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  // Get translations for important tabs to show on tablet
  const getShortTabTranslations = () => {
    const navTranslations = translations?.landing?.navigation || {};
    
    return {
      benefits: navTranslations.benefits ? navTranslations.benefits.substring(0, 4) : 'Pred',
      'nfc-showcase': navTranslations.nfc ? navTranslations.nfc.substring(0, 4) : 'NFC',
      'how-it-works': navTranslations.howItWorks ? navTranslations.howItWorks.substring(0, 4) : 'How',
      pricing: navTranslations.pricing ? navTranslations.pricing.substring(0, 4) : 'Pric'
    };
  };
  
  const shortLabelTranslations = getShortTabTranslations();
  
  // Filter out blog and social-proof tabs
  const filteredTabs = tabs.filter(tab => tab.id !== 'blog' && tab.id !== 'social-proof');
  
  // Show only the first 4 tabs on tablet with abbreviated translations
  const visibleTabs = filteredTabs.slice(0, 4).map(tab => ({
    ...tab,
    label: shortLabelTranslations[tab.id as keyof typeof shortLabelTranslations] || tab.label.substring(0, 4)
  }));
  
  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[50] transition-all duration-500 h-16",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
            : "bg-transparent py-3"
        )}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Logo isScrolled={isScrolled} size="sm" />
          
          {/* Center Navigation - Show only important tabs with shorter labels */}
          <div className="hidden md:flex items-center gap-1 py-1 px-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg h-10">
            {visibleTabs.map(tab => (
              <NavLink
                key={tab.id}
                href={`/#${tab.id}`}
                label={tab.label}
                active={activeSection === tab.id}
                onClick={() => scrollToSection(tab.id)}
                isScrolled={isScrolled}
              />
            ))}
            
            {/* More Button - Just a + sign */}
            <button
              onClick={toggleMenu}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-full transition-all duration-300",
                isScrolled
                  ? "text-gray-700 hover:bg-gray-50/80 hover:text-gray-900"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              )}
            >
              +
            </button>
          </div>
          
          {/* Right side buttons - unified height and minimal styling */}
          <div className="flex items-center gap-2">
            <LanguageSelector isScrolled={isScrolled} className="h-10" />
            
            {isAuthenticated ? (
              <UserMenu 
                isScrolled={isScrolled} 
                userEmail={userEmail} 
                isCompact={true}
                className="h-10"
              />
            ) : (
              <LoginButton isScrolled={isScrolled} className="h-10" />
            )}
            
            {/* Mobile menu button - visible on smaller tablets */}
            <div className="md:hidden relative z-[60]">
              <MobileMenuButton
                isOpen={isMenuOpen}
                onClick={toggleMenu}
                isScrolled={isScrolled} 
              />
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Mobile menu for all hidden items */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        tabs={tabs}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        isAuthenticated={isAuthenticated}
        userEmail={userEmail}
      />
    </>
  );
};

export default TabletNavigation;