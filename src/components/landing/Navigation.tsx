import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { useNavigation } from "../../hooks/landing/useNavigation";
import DesktopNavigation from './navigation/DesktopNavigation';
import MobileNavigation from './navigation/MobileNavigation';
import TabletNavigation from './navigation/TabletNavigation';
import { useWindowSize } from 'react-use';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const {
    isMenuOpen,
    setIsMenuOpen,
    toggleMenu,
    isScrolled,
    activeSection,
    scrollToSection,
    isNavVisible,
    isClient,
    translations,
    tabs,
    isAuthenticated,
    userEmail
  } = useNavigation();

  const { width } = useWindowSize();
  
  // Determine which navigation to display based on screen width
  const isDesktop = width >= 1024; // lg breakpoint (1024px and above)
  const isTablet = width >= 768 && width < 1024; // md to lg breakpoint (768px to 1023px)
  const isMobile = width < 768; // below md breakpoint (0px to 767px)

  return (
    <div
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isNavVisible ? "translate-y-0" : "-translate-y-full",
        className
      )}
    >
      {/* Render the appropriate navigation based on screen size */}
      {isDesktop && (
        <DesktopNavigation 
          isScrolled={isScrolled}
          activeSection={activeSection}
          isAuthenticated={isAuthenticated}
          userEmail={userEmail}
          tabs={tabs}
          scrollToSection={scrollToSection}
        />
      )}
      
      {isTablet && (
        <TabletNavigation 
          isScrolled={isScrolled}
          activeSection={activeSection}
          isAuthenticated={isAuthenticated}
          userEmail={userEmail}
          tabs={tabs}
          scrollToSection={scrollToSection}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          toggleMenu={toggleMenu}
        />
      )}
      
      {isMobile && (
        <MobileNavigation 
          isScrolled={isScrolled}
          activeSection={activeSection}
          isAuthenticated={isAuthenticated}
          userEmail={userEmail}
          tabs={tabs}
          scrollToSection={scrollToSection}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          toggleMenu={toggleMenu}
        />
      )}
    </div>
  );
};

export default Navigation;