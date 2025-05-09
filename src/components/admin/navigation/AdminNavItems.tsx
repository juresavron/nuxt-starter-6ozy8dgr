import React from 'react';
import { 
  BarChart3, Building2, BookOpen, Users, Mail, Shield, 
  CreditCard, Ticket, Gift, Palette, Settings, MessageSquare
} from 'lucide-react';
import { cn } from '../../../utils/cn';
import { useTranslations } from '../../../hooks/useTranslations';
import { useWindowSize } from 'react-use';

interface AdminNavItemsProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
  isSuperAdmin: boolean;
  className?: string;
}

/**
 * Navigation tabs/links for admin panel
 */
const AdminNavItems: React.FC<AdminNavItemsProps> = ({
  activeTab,
  onTabChange,
  isSuperAdmin,
  className
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const translations = useTranslations();
  const t = translations?.app?.admin || {};
  
  // Define navigation items
  const navItems = [
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
    // Items only visible to superadmins
    ...(isSuperAdmin ? [
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
    ] : [])
  ];

  return (
    <nav className={cn("flex flex-col", className)}>
      <div className={cn(
        "flex flex-col gap-1 p-1 overflow-y-auto",
        isMobile ? "max-h-[calc(100vh-170px)]" : "max-h-[calc(100vh-200px)]"
      )}>
        {navItems.map((item) => (
          <NavItem 
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            active={activeTab === item.id}
            onClick={() => onTabChange(item.id)}
          />
        ))}
      </div>
    </nav>
  );
};

interface NavItemProps {
  id: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  onClick: () => void;
}

/**
 * Individual navigation item/tab
 */
const NavItem: React.FC<NavItemProps> = ({
  id,
  label,
  icon: Icon,
  active,
  onClick
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 py-2.5 text-sm font-medium rounded-md transition-all duration-200 w-full",
        isMobile ? "px-2.5" : "px-3", 
        active 
          ? "bg-white text-blue-600 shadow-sm" 
          : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
      )}
      aria-current={active ? "page" : undefined}
    >
      <Icon 
        className={cn(
          "flex-shrink-0", 
          isMobile ? "h-4 w-4" : "h-5 w-5", 
          active ? "text-blue-500" : "text-gray-500"
        )}
      />
      <span 
        className={cn(
          "truncate",
          isMobile ? "text-xs" : "text-sm"
        )}
      >
        {label}
      </span>
    </button>
  );
};

export default AdminNavItems;