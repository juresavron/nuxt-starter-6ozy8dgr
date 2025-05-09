import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { useTranslations } from '../../../hooks/useTranslations';
import { useAdminStore } from '../../../hooks/admin/store';
import { useWindowSize } from 'react-use';

import AdminLogo from './AdminLogo';
import AdminSidebarItems from './AdminSidebarItems';
import AdminUserProfile from './AdminUserProfile';
import AdminSearchBar from './AdminSearchBar';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
  onSignOut: () => void;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
}

/**
 * Left sidebar navigation for admin panel
 */
const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onTabChange,
  onSignOut,
  isCollapsed: propIsCollapsed,
  setIsCollapsed: propSetIsCollapsed
}) => {
  const { isSuperAdmin } = useAdminStore();
  const translations = useTranslations();
  const { width } = useWindowSize();
  const isMobile = width < 768;
  
  // Use internal state if props not provided
  const [localIsCollapsed, setLocalIsCollapsed] = useState(false);
  
  // Use either prop state or local state
  const isCollapsed = propIsCollapsed !== undefined ? propIsCollapsed : localIsCollapsed;
  const setIsCollapsed = propSetIsCollapsed || setLocalIsCollapsed;

  // For mobile/tablet, render a slide-over sidebar
  if (isMobile && !isCollapsed) {
    return (
      <AnimatePresence>
        <motion.div 
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          exit={{ x: -280 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg"
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <AdminLogo />
              <button
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
                onClick={() => setIsCollapsed(true)}
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
            
            <div className="px-3 py-4 border-b border-gray-100">
              <AdminUserProfile isCollapsed={false} />
            </div>
            
            <div className="px-3 pt-3 pb-2">
              <AdminSearchBar />
            </div>
            
            <div className="flex-1 overflow-y-auto p-2">
              <AdminSidebarItems 
                activeTab={activeTab}
                onTabChange={(tab) => {
                  onTabChange(tab);
                  if (isMobile) setIsCollapsed(true);
                }}
                isSuperAdmin={isSuperAdmin}
                isCollapsed={false}
              />
            </div>
            
            <div className="p-3 border-t border-gray-100">
              <button
                onClick={onSignOut}
                className="flex items-center w-full px-3 py-2.5 gap-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                <span>{translations?.app?.admin?.signOut || 'Sign Out'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Collapsed view for mobile/tablet
  if (isMobile && isCollapsed) {
    return (
      <div className="sticky top-0 z-40 flex h-16 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center px-4 w-full justify-between">
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <AdminLogo />
          <button
            onClick={onSignOut}
            className="p-2 rounded-full text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  // Desktop view
  return (
    <div className={cn(
      "h-screen flex flex-col bg-white border-r border-gray-200 transition-all duration-300 z-20 sticky top-0 left-0",
      isCollapsed ? "w-20" : "w-64",
      "hidden lg:flex" // Hide on mobile, show on large screens
    )}>
      {/* Logo & Toggle */}
      <div className={cn(
        "flex items-center px-4 py-4 border-b border-gray-100",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed && <AdminLogo />}
        {isCollapsed && (
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-xl">
            <span className="text-xl font-bold text-blue-600">O</span>
          </div>
        )}
        
        <button 
          className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* User Profile */}
      <div className="px-3 py-4 border-b border-gray-100">
        <AdminUserProfile isCollapsed={isCollapsed} />
      </div>

      {/* Search (only when expanded) */}
      {!isCollapsed && (
        <div className="px-3 pt-3 pb-2">
          <AdminSearchBar />
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-2 py-4">
        <AdminSidebarItems 
          activeTab={activeTab}
          onTabChange={onTabChange}
          isSuperAdmin={isSuperAdmin}
          isCollapsed={isCollapsed}
        />
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-gray-100">
        <button 
          onClick={onSignOut}
          className={cn(
            "flex items-center rounded-lg w-full text-red-600 hover:bg-red-50 transition-colors",
            isCollapsed ? "justify-center p-3" : "justify-start px-3 py-2.5 gap-3"
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span>{translations?.app?.admin?.signOut || 'Sign Out'}</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;