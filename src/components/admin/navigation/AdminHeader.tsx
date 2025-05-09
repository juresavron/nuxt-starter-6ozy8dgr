import React from 'react';
import { Menu, X, Bell } from 'lucide-react';
import { useTranslations } from '../../../hooks/useTranslations';
import { cn } from '../../../utils/cn';

interface AdminHeaderProps {
  onSignOut: () => void;
  activeTab: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  onSignOut,
  activeTab
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin || {};

  // Get title based on active tab
  const getTitle = () => {
    switch (activeTab) {
      case 'overview':
        return t?.overview?.title || 'Overview';
      case 'companies':
        return t?.companies?.title || 'Companies';
      case 'blog':
        return t?.blog?.title || 'Blog Posts';
      case 'contacts':
        return t?.contacts?.title || 'Contact Requests';
      case 'admins':
        return t?.admins?.title || 'Admin Management';
      case 'subscriptions':
        return t?.subscriptions?.title || 'Subscriptions';
      case 'coupons':
        return t?.coupons?.title || 'Coupons';
      case 'lottery':
        return t?.lottery?.title || 'Lottery';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">{getTitle()}</h1>
      
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        
        {/* User profile - can be expanded later */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">A</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;