import React, { useState } from 'react';
import { Building2, BarChart3, Menu, X, BookOpen, Users, Mail, Shield, CreditCard } from 'lucide-react';
import { translations } from '../../../translations/sl';
import { useAdminStore } from "../../../hooks/admin/store";
import { cn } from '../../../utils/cn';
import Button from '../../shared/Button';
import { useWindowSize } from 'react-use';
import { Link } from 'react-router-dom';
import { useTranslations } from '../../../hooks/useTranslations';

interface AdminHeaderProps {
  activeTab: 'overview' | 'companies' | 'blog' | 'contacts' | 'admins' | 'subscriptions';
  onTabChange: (tab: 'overview' | 'companies' | 'blog' | 'contacts' | 'admins' | 'subscriptions') => void;
  onSignOut: () => void;
}

interface TabItem {
  id: 'overview' | 'companies' | 'blog' | 'contacts' | 'admins' | 'subscriptions';
  icon: React.ElementType;
  label: string;
}

/**
 * Header component for the admin panel
 * Includes navigation tabs and action buttons
 */
const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  onTabChange,
  onSignOut,
}) => {
  const { isSuperAdmin } = useAdminStore();
  const { width } = useWindowSize();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const translationHook = useTranslations();
  
  const isMobile = width < 640;
  
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
      label: translationHook?.app?.admin?.subscriptions?.title || 'Subscriptions Management',
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
      id: 'admins',
      icon: Users,
      label: translationHook?.app?.admin?.admins?.title || 'Admin Management',
    }] : [])
  ];

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/90 transition-all">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 relative">
         <div className="flex items-center gap-2 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-400 z-20">
            <Link to="/home" className="font-heading hover:opacity-80 transition-opacity">
              {translations.app.name}
            </Link>
          </div>
          
          {/* Navigation and Actions */}
          <div className="flex items-center gap-3 sm:gap-4 z-20">
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-1 p-1 bg-blue-50/70 backdrop-blur-sm rounded-lg border border-blue-100">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    activeTab === tab.id ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={onSignOut}
                className="flex items-center justify-center px-3 sm:px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-300 hover:shadow-sm border border-red-100"
              >
                <span className="hidden sm:inline">{translationHook?.app?.admin?.signOut || translations.app.admin.signOut}</span>
                <span className="sm:hidden">{translationHook?.app?.admin?.signOutShort || 'Odjava'}</span>
              </button>
            </div>
          </div>
           
          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 py-2 sm:hidden shadow-lg rounded-b-lg">
              <nav className="flex flex-col">
                {tabs.map(tab => {
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        onTabChange(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-4 rounded-lg transition-colors group",
                        activeTab === tab.id 
                          ? "bg-blue-50 text-blue-700 font-medium shadow-sm" 
                          : "text-gray-600 hover:bg-gray-50/80 hover:text-gray-900"
                      )}
                    >
                      <span className="relative z-10">
                        {tab.label}
                      </span>
                      <TabIcon 
                        className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          activeTab === tab.id ? "text-blue-500" : "text-gray-400",
                          activeTab === tab.id ? "translate-x-1" : "group-hover:translate-x-1"
                        )}
                      />
                    </button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdminHeader);