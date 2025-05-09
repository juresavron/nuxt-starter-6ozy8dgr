import React, { useState, useEffect } from 'react';
import { Building2, BarChart3, Menu, X, BookOpen, Users, Mail, CreditCard, Ticket, Gift } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { useWindowSize } from 'react-use';
import { useTranslations } from '../../../hooks/useTranslations';
import { translations } from '../../../translations/sl';
import Button from '../../shared/Button';
import AdminNavLogo from './AdminNavLogo';
import AdminDesktopNav from './AdminDesktopNav';
import AdminMobileMenu from './AdminMobileMenu';

export interface TabItem {
  id: 'overview' | 'companies' | 'blog' | 'contacts' | 'admins' | 'subscriptions' | 'coupons' | 'lottery';
  icon: React.ElementType;
  label: string;
}

interface AdminNavigationProps {
  activeTab: string;
  onTabChange: (tabId: 'overview' | 'companies' | 'blog' | 'contacts' | 'admins' | 'subscriptions' | 'coupons' | 'lottery') => void;
  onSignOut: () => void;
  isSuperAdmin?: boolean;
}

/**
 * Main navigation component for admin panel
 */
const AdminNavigation: React.FC<AdminNavigationProps> = ({
  activeTab,
  onTabChange,
  onSignOut,
  isSuperAdmin = false
}) => {
  const { width } = useWindowSize();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const translationHook = useTranslations();
  
  // Detect scrolling for navbar effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Define tabs with their icons for better mobile display
  const tabs: TabItem[] = [
    {
      id: 'overview',
      icon: BarChart3,
      label: translationHook?.app?.admin?.overview?.title || translations.app.admin.overview.title,
    },
    {
      id: 'companies',
      icon: Building2,
      label: translationHook?.app?.admin?.companies?.title || translations.app.admin.companies.title,
    },
    // Show subscriptions tab for all admins
    {
      id: 'subscriptions',
      icon: CreditCard,
      label: translationHook?.app?.admin?.subscriptions?.title || 'Subscriptions',
    },
    // Show coupons tab for all admins
    {
      id: 'coupons' as const,
      icon: Ticket,
      label: translationHook?.app?.admin?.coupons?.title || 'Coupons',
    },
    // Show lottery tab for all admins
    {
      id: 'lottery' as const,
      icon: Gift,
      label: translationHook?.app?.admin?.lottery?.title || 'Lottery',
    },
    // Show communications tab for all admins
    {
      id: 'communications' as const,
      icon: Mail,
      label: translationHook?.app?.admin?.communications?.title || 'Communications',
    },
    // Only show blog tab for superadmins
    ...(isSuperAdmin ? [{
      id: 'blog' as const,
      icon: BookOpen,
      label: translationHook?.app?.admin?.blog?.title || translations.app.admin.blog.title,
    }] : []),
    ...(isSuperAdmin ? [{
      id: 'contacts' as const,
      icon: Mail,
      label: translationHook?.app?.admin?.contacts?.title || 'Contact Requests',
    }] : []),
    ...(isSuperAdmin ? [{
      id: 'admins' as const,
      icon: Users,
      label: translationHook?.app?.admin?.admins?.title || 'Admin Management',
    }] : [])
  ];
  
  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300 w-full border-b",
      isScrolled 
        ? "bg-white/90 backdrop-blur-sm shadow-sm border-gray-200"
        : "bg-white border-gray-100"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - Only render once */}
          <div className="flex-shrink-0">
            <AdminNavLogo />
          </div>
          
          {/* Desktop Navigation - centered */}
          <AdminDesktopNav
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={onTabChange}
            className="flex-grow sm:justify-center"
          />
          
          {/* Action Buttons - right aligned */}
          <div className="flex-shrink-0 flex items-center gap-2">
            {/* Mobile Menu Toggle */}
            <div className="sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  mobileMenuOpen 
                    ? "bg-gray-100 text-gray-900" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/70"
                )}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
            
            {/* Sign Out Button */}
            <Button 
              onClick={onSignOut}
              variant="ghost"
              size="sm"
              className={cn(
                "text-red-600 hover:text-red-700 hover:bg-red-50/70 border border-red-100"
              )}
            >
              <span className="hidden sm:inline">{translationHook?.app?.admin?.signOut || translations.app.admin.signOut}</span>
              <span className="sm:hidden">{translationHook?.app?.admin?.signOutShort || 'Odjava'}</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <AdminMobileMenu
        isOpen={mobileMenuOpen}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onClose={() => setMobileMenuOpen(false)}
        className="absolute top-full left-0 right-0 z-50"
      />
    </header>
  );
};

export default AdminNavigation;