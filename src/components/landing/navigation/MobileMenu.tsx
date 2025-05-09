import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';
import { useScrollLock } from '../../../hooks/shared/useScrollLock';
import MobileMenuItems from './MobileMenuItems';
import MobileMenuFooter from './MobileMenuFooter';
import MobileMenuAuth from './MobileMenuAuth';
import Logo from './Logo';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  tabs: Array<{ id: string; label: string }>;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  isAuthenticated: boolean;
  userEmail: string | null;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  tabs,
  activeSection,
  scrollToSection,
  isAuthenticated,
  userEmail
}) => {
  // Lock scroll when menu is open
  useScrollLock(isOpen);
  
  // Close menu when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Special handling for iOS devices
  useEffect(() => {
    if (isOpen) {
      // Fix for iOS to prevent background interactions
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        // Restore scroll position when closing menu
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm"
            onClick={onClose} // Add click handler directly to backdrop
            data-testid="mobile-menu-backdrop"
            style={{ 
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              WebkitTransform: 'translate3d(0, 0, 0)',
              transform: 'translate3d(0, 0, 0)'
            }}
          />
          
          {/* Menu panel */}
          <motion.div
            className="mobile-menu-content fixed right-0 top-0 bottom-0 h-[100dvh] w-[85vw] max-w-sm bg-white shadow-2xl overflow-y-auto z-[56]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 300
            }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
            data-testid="mobile-menu-panel"
            style={{ 
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              WebkitTransform: 'translate3d(0, 0, 0)',
              transform: 'translate3d(0, 0, 0)',
              touchAction: 'manipulation',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="p-5 flex items-center justify-between border-b border-gray-100">
              <Logo isScrolled={true} size="sm" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onClose();
                }}
                className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors active:bg-gray-200"
                aria-label="Close menu"
                style={{ touchAction: 'manipulation' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Menu items */}
            <div className="p-4">
              <MobileMenuItems
                tabs={tabs}
                activeSection={activeSection}
                scrollToSection={(sectionId) => {
                  scrollToSection(sectionId);
                  onClose();
                }}
              />
              
              <MobileMenuAuth
                isAuthenticated={isAuthenticated}
                userEmail={userEmail}
                onClose={onClose}
              />
            </div>
            
            <MobileMenuFooter />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;