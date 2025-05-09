import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import Logo from './Logo';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';

interface MobileNavigationProps {
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

const MobileNavigation: React.FC<MobileNavigationProps> = ({
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
  return (
    <>
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20 
        }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[50] transition-all duration-300 flex items-center justify-between h-16 ios-optimized",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3 px-4"
            : "bg-transparent py-3 px-4"
        )}
      >
        {/* Logo */}
        <Logo isScrolled={isScrolled} size="sm" />
        
        {/* Mobile Menu Button */}
        <div className="relative z-[60]">
          <MobileMenuButton
            isOpen={isMenuOpen}
            onClick={toggleMenu}
            isScrolled={isScrolled}
          />
        </div>
      </motion.div>
      
      {/* Mobile Menu */}
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

export default MobileNavigation;