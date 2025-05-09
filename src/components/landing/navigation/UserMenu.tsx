import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ChevronDown, LogOut, CreditCard, Gauge } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { supabase } from '../../../lib/supabase';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';

interface UserMenuProps {
  isScrolled?: boolean;
  isCompact?: boolean;
  userEmail?: string | null;
  className?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ 
  isScrolled = false,
  isCompact = false,
  userEmail = null,
  className = ''
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const translations = useTranslations();
  const { language } = useLanguageStore();

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!showUserMenu) return;
    
    const handleClickOutside = () => setShowUserMenu(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  // Toggle user menu
  const toggleUserMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowUserMenu(!showUserMenu);
  };

  // Handle sign out
  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await supabase.auth.signOut();
      window.location.href = '/home';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Get first letter of email for avatar
  const userInitial = userEmail ? userEmail[0].toUpperCase() : 'U';

  // Translations
  const dashboardText = translations?.landing?.navigation?.dashboard || 
                        (language === 'en' ? 'Dashboard' : 'Nadzorna plošča');
  const subscriptionText = translations?.app?.subscriptions?.manageSubscription || 
                          (language === 'en' ? 'Manage Subscription' : 'Upravljaj naročnino');
  const signOutText = translations?.app?.signOut || 
                     (language === 'en' ? 'Sign Out' : 'Odjava');
  const myAccountText = language === 'en' ? 'My Account' : 'Moj račun';

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleUserMenu}
        className={cn(
          "flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
          isScrolled
            ? "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100 shadow-sm"
            : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/20",
          isCompact ? "w-9 px-2 min-w-9" : "w-auto",
          className
        )}
        aria-expanded={showUserMenu}
        aria-haspopup="true"
      >
        <div className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold",
          isScrolled 
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md" 
            : "bg-gradient-to-r from-white/90 to-white/80 text-blue-700 shadow-sm"
        )}>
          {userInitial}
        </div>
        {!isCompact && (
          <span className={cn(
            "hidden sm:inline font-medium",
            isScrolled ? "text-blue-700" : "text-white"
          )}>
            {userEmail?.split('@')[0] || myAccountText}
          </span>
        )}
        <ChevronDown className={cn(
          "h-3.5 w-3.5 transition-transform duration-300",
          isScrolled ? "text-blue-400" : "text-white/70",
          showUserMenu ? "rotate-180" : ""
        )} />
      </motion.button>
      
      <AnimatePresence>
        {showUserMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100/80 overflow-hidden z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-2 px-4 border-b border-gray-100 bg-gradient-to-r from-blue-50/80 to-blue-100/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-medium text-gray-700">
                  {language === 'en' ? 'Logged in as ' : 'Prijavljeni kot '}
                  <span className="text-blue-600 font-semibold">{userEmail?.split('@')[0] || 'user'}</span>
                </span>
              </div>
            </div>
            <div className="py-1">
              <Link
                to="/admin"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <Gauge className="h-5 w-5 text-blue-500" />
                <span>{dashboardText}</span>
              </Link>
              <Link
                to="/account/subscription"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <CreditCard className="h-5 w-5 text-blue-500" />
                <span>{subscriptionText}</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>{signOutText}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(UserMenu);