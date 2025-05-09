import React, { useState, useEffect } from 'react';
import { Menu, BellDot, ChevronDown, Search } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from '../../../hooks/useTranslations';
import { useAdminStore } from '../../../hooks/admin/store';

import AdminLogo from './AdminLogo';
import AdminNavItems from './AdminNavItems';
import AdminUserMenu from './AdminUserMenu';
import AdminMobileMenu from './AdminMobileMenu';
import AdminSearchBar from './AdminSearchBar';

interface AdminNavbarProps {
  onSignOut: () => void;
  activeTab: string;
  onTabChange: (tab: any) => void;
}

/**
 * Main navigation bar component for admin panel
 * Responsive design with mobile/desktop views
 */
const AdminNavbar: React.FC<AdminNavbarProps> = ({
  onSignOut,
  activeTab,
  onTabChange
}) => {
  const { isSuperAdmin } = useAdminStore();
  const translations = useTranslations();
  const t = translations?.app?.admin || {};

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-200",
      isScrolled 
        ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200"
        : "bg-white border-b border-gray-100"
    )}>
      <div className="max-w-screen-2xl mx-auto">
        <div className="px-4 flex h-16 items-center justify-between">
          {/* Left section: Logo and mobile menu toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden -ml-2 p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100/80 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
            
            <AdminLogo />
          </div>

          {/* Center section: Navigation tabs (desktop only) */}
          <div className="hidden lg:flex flex-1 justify-center">
            <AdminNavItems
              activeTab={activeTab}
              onTabChange={onTabChange}
              isSuperAdmin={isSuperAdmin}
            />
          </div>

          {/* Right section: Actions and user menu */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100/80 transition-colors"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="h-5 w-5" />
            </button>
            
            <div className="relative">
              <button
                type="button"
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100/80 transition-colors"
              >
                <BellDot className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
            </div>

            <AdminUserMenu onSignOut={onSignOut} />
          </div>
        </div>

        {/* Search bar (expandable) */}
        <AnimatePresence>
          {showSearch && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-4 pb-3"
            >
              <AdminSearchBar />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <AdminMobileMenu 
            activeTab={activeTab}
            onTabChange={(tab) => {
              onTabChange(tab);
              setMobileMenuOpen(false);
            }}
            isSuperAdmin={isSuperAdmin}
            onClose={() => setMobileMenuOpen(false)}
            onSignOut={onSignOut}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default AdminNavbar;