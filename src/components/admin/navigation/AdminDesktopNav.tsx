import React from 'react';
import { cn } from '../../../utils/cn';
import AdminNavLink from './AdminNavLink';
import type { TabItem } from './AdminNavigation';

interface AdminDesktopNavProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: any) => void;
  className?: string;
}

/**
 * Desktop navigation component for admin panel
 */
const AdminDesktopNav: React.FC<AdminDesktopNavProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className
}) => {
  return (
    <div className={cn("hidden sm:flex items-center", className)}>
      <nav className="flex flex-wrap gap-1 p-1 bg-gray-50/80 backdrop-blur-sm rounded-lg border border-gray-100/70 shadow-sm overflow-x-auto max-w-full">
        {tabs.map((tab) => (
          <AdminNavLink
            key={tab.id}
            label={tab.label}
            icon={tab.icon}
            isActive={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          />
        ))}
      </nav>
    </div>
  );
};

export default AdminDesktopNav;