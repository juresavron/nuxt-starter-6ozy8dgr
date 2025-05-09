import React from 'react';
import { cn } from '../../../utils/cn';
import type { LucideIcon } from 'lucide-react';

interface AdminMobileMenuItemProps {
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

/**
 * Mobile menu item component for admin panel
 */
const AdminMobileMenuItem: React.FC<AdminMobileMenuItemProps> = ({
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
        "w-full flex items-center justify-between px-6 py-3.5 transition-colors group",
        isActive 
          ? "bg-blue-50 text-blue-700 font-medium" 
          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Icon 
          className={cn(
            "h-5 w-5", 
            isActive ? "text-blue-500" : "text-gray-500"
          )}
        />
        <span>{label}</span>
      </div>
      
      {isActive && (
        <div className="h-5 w-1 rounded-full bg-blue-500" />
      )}
    </button>
  );
};

export default AdminMobileMenuItem;