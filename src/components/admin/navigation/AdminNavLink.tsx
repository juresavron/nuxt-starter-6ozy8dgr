import React from 'react';
import { cn } from '../../../utils/cn';
import type { LucideIcon } from 'lucide-react';

interface AdminNavLinkProps {
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

/**
 * Navigation link component for admin panel
 */
const AdminNavLink: React.FC<AdminNavLinkProps> = ({
  label,
  icon: Icon,
  isActive,
  onClick,
  className
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-2 sm:px-3 py-2 text-sm font-medium rounded-md transition-all duration-300",
        "flex items-center gap-1 sm:gap-2 whitespace-nowrap",
        isActive 
          ? "bg-white text-blue-600 shadow-sm" 
          : "text-gray-600 hover:text-gray-900 hover:bg-white/50",
        className
      )}
    >
      <Icon 
        className={cn(
          "h-4 w-4 flex-shrink-0", 
          isActive ? "text-blue-500" : "text-gray-500"
        )}
      />
      <span className="sm:inline">{label}</span>
    </button>
  );
};

export default AdminNavLink;