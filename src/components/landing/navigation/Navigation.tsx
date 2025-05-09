import React from 'react';
import { cn } from '../../../utils/cn';
import { useNavigation } from '../../../hooks/landing/useNavigation';
import DesktopNavigation from './DesktopNavigation';
import TabletNavigation from './TabletNavigation';
import MobileNavigation from './MobileNavigation';
import { useWindowSize } from 'react-use';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const {
    isMenuOpen,
    setIsMenuOpen,
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
  // These breakpoints align with Tailwind's default breakpoints
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
        />
      )}
    </div>
  );
};

export default Navigation;