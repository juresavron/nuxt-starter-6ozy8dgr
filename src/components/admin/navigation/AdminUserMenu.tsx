import React, { useState } from 'react';
import { User, ChevronDown, LogOut, Settings, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../hooks/auth/useAuth';
import { useAdminStore } from '../../../hooks/admin/store';
import { cn } from '../../../utils/cn';
import { useTranslations } from '../../../hooks/useTranslations';

interface AdminUserMenuProps {
  onSignOut: () => void;
}

/**
 * User menu dropdown for admin panel
 */
const AdminUserMenu: React.FC<AdminUserMenuProps> = ({
  onSignOut
}) => {
  const { user } = useAuth();
  const { isSuperAdmin } = useAdminStore();
  const [isOpen, setIsOpen] = useState(false);
  const translations = useTranslations();
  const t = translations?.app?.admin || {};
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Get first letter of email for avatar
  const getInitials = () => {
    if (!user?.email) return 'U';
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <div className="relative">
      {/* User menu toggle */}
      <button
        type="button"
        className="flex items-center gap-2 p-1 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100/80 transition-colors"
        onClick={toggleMenu}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-medium">
          {getInitials()}
        </div>
        <ChevronDown className={cn(
          "h-4 w-4 text-gray-400 transition-transform duration-200",
          isOpen && "transform rotate-180"
        )} />
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for closing */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={closeMenu}
            />
            
            {/* Menu content */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50"
            >
              {/* User info */}
              <div className="px-4 py-3 border-b border-gray-100">
                {user?.email && (
                  <>
                    <p className="text-sm font-medium text-gray-700">{user.email}</p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      {isSuperAdmin && (
                        <>
                          <Shield className="h-3 w-3 text-purple-500" />
                          <span>{t?.superadmin || 'Superadmin'}</span>
                        </>
                      )}
                      {!isSuperAdmin && (
                        <>
                          <User className="h-3 w-3 text-blue-400" />
                          <span>{t?.admin || 'Admin'}</span>
                        </>
                      )}
                    </p>
                  </>
                )}
              </div>
              
              {/* Menu items */}
              <div className="py-1">
                <button 
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="h-4 w-4 text-gray-500" />
                  <span>{t?.accountSettings || 'Account Settings'}</span>
                </button>
                
                <button 
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  onClick={onSignOut}
                >
                  <LogOut className="h-4 w-4 text-red-500" />
                  <span>{t?.signOut || 'Sign Out'}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminUserMenu;