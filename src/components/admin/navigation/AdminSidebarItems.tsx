import React from 'react';
import { 
  BarChart3, Building2, BookOpen, Users, Mail, 
  CreditCard, Ticket, Gift, MessageSquare, Settings
} from 'lucide-react';
import { cn } from '../../../utils/cn';
import { useTranslations } from '../../../hooks/useTranslations';
import { NavItem } from './index';

interface AdminSidebarItemsProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
  isSuperAdmin: boolean;
  isCollapsed?: boolean;
}

/**
 * Navigation items for the admin sidebar
 */
const AdminSidebarItems: React.FC<AdminSidebarItemsProps> = ({
  activeTab,
  onTabChange,
  isSuperAdmin,
  isCollapsed = false
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin || {};
  
  // Define navigation items
  const navItems: NavItem[] = [
    {
      id: 'overview',
      label: t?.overview?.title || 'Overview',
      icon: BarChart3,
    },
    {
      id: 'companies',
      label: t?.companies?.title || 'Companies',
      icon: Building2,
    },
    {
      id: 'subscriptions',
      label: t?.subscriptions?.title || 'Subscriptions',
      icon: CreditCard,
    },
    {
      id: 'coupons',
      label: t?.coupons?.title || 'Coupons',
      icon: Ticket,
    },
    {
      id: 'lottery',
      label: t?.lottery?.title || 'Lottery',
      icon: Gift,
    },
    {
      id: 'communications',
      label: t?.communications?.title || 'Communications',
      icon: MessageSquare,
    },
  ];
  
  // Admin-only navigation items
  const adminOnlyItems: NavItem[] = isSuperAdmin ? [
    {
      id: 'blog',
      label: t?.blog?.title || 'Blog',
      icon: BookOpen,
    },
    {
      id: 'contacts',
      label: t?.contacts?.title || 'Contacts',
      icon: Mail,
    },
    {
      id: 'admins',
      label: t?.admins?.title || 'Admins',
      icon: Users,
    }
  ] : [];

  // Settings and configuration
  const settingsItems: NavItem[] = [
    {
      id: 'settings',
      label: t?.settings?.title || 'Settings',
      icon: Settings,
    }
  ];

  // Combine all item groups
  const allItems = [
    { items: navItems, label: t?.mainNavigation || 'Main Navigation' },
    { items: adminOnlyItems, label: t?.adminArea || 'Admin Area' },
    { items: settingsItems, label: t?.configuration || 'Configuration' }
  ].filter(group => group.items.length > 0);

  return (
    <nav className="space-y-6">
      {allItems.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-1">
          {!isCollapsed && group.label && (
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {group.label}
            </h3>
          )}
          
          {group.items.map((item) => (
            <SidebarNavItem 
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              active={activeTab === item.id}
              onClick={() => onTabChange(item.id)}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      ))}
    </nav>
  );
};

interface SidebarNavItemProps {
  id: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  onClick: () => void;
  isCollapsed: boolean;
}

/**
 * Individual navigation item in the sidebar
 */
const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  id,
  label,
  icon: Icon,
  active,
  onClick,
  isCollapsed
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center w-full rounded-lg transition-all duration-200",
        isCollapsed 
          ? "justify-center p-3" 
          : "px-3 py-2.5 gap-3",
        active 
          ? "bg-blue-50 text-blue-700" 
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      )}
      aria-current={active ? "page" : undefined}
    >
      <Icon 
        className={cn(
          "flex-shrink-0", 
          isCollapsed ? "h-5 w-5" : "h-5 w-5",
          active ? "text-blue-600" : "text-gray-500"
        )}
      />
      {!isCollapsed && <span className="truncate">{label}</span>}
      
      {active && isCollapsed && (
        <span className="absolute left-0 w-1 h-8 bg-blue-600 rounded-r-full"></span>
      )}
    </button>
  );
};

export default AdminSidebarItems;