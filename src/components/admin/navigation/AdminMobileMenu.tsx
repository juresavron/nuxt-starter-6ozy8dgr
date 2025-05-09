import React from 'react';
import { motion } from 'framer-motion';
import { X, LogOut, Settings, Shield, User } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { useTranslations } from '../../../hooks/useTranslations';
import { useAuth } from '../../../hooks/auth/useAuth';
import { useAdminStore } from '../../../hooks/admin/store';
import AdminNavItems from './AdminNavItems';

interface AdminMobileMenuProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
  isSuperAdmin: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

/**
 * Mobile menu for admin panel
 */
const AdminMobileMenu: React.FC<AdminMobileMenuProps> = ({
  activeTab,
  onTabChange,
  isSuperAdmin,
  onClose,
  onSignOut
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin || {};
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-50 lg:hidden"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-600/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Menu panel */}
      <div className="relative flex flex-col w-full max-w-xs h-full bg-white shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            ocenagor <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">Admin</span>
          </span>
          <button
            type="button"
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* User info */}
        {user && (
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-medium">
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">{user.email}</p>
                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                  {isSuperAdmin ? (
                    <>
                      <Shield className="h-3 w-3 text-purple-500" />
                      <span>{t?.superadmin || 'Superadmin'}</span>
                    </>
                  ) : (
                    <>
                      <User className="h-3 w-3 text-gray-400" />
                      <span>{t?.admin || 'Admin'}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation */}
        <div className="flex-1 py-6 px-4 overflow-y-auto">
          <div className="space-y-1">
            <AdminNavItems
              activeTab={activeTab}
              onTabChange={onTabChange}
              isSuperAdmin={isSuperAdmin}
              className="flex-col items-start !p-0 !bg-transparent !border-0"
            />
          </div>
        </div>
        
        {/* Footer actions */}
        <div className="p-4 border-t border-gray-100">
          <div className="space-y-1">
            <button 
              className="flex w-full items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Settings className="h-4 w-4 text-gray-500" />
              <span>{t?.accountSettings || 'Account Settings'}</span>
            </button>
            
            <button 
              className="flex w-full items-center gap-3 px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 transition-colors"
              onClick={onSignOut}
            >
              <LogOut className="h-4 w-4 text-red-500" />
              <span>{t?.signOut || 'Sign Out'}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminMobileMenu;