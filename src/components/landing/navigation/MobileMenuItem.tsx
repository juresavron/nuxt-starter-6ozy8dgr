import React from 'react';
import { cn } from '../../../utils/cn';

interface MobileMenuItemProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({
  label,
  active = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-3 rounded-lg transition-colors group flex items-center justify-between",
        active
          ? "bg-blue-50 text-blue-600 font-medium"
          : "text-blue-600 hover:text-blue-700 hover:bg-blue-50/50"
      )}
    >
      <span className="text-sm font-medium">{label}</span>
      <svg
        className={cn(
          "h-4 w-4 transition-transform duration-300",
          active ? "text-blue-600" : "text-blue-600/60",
          active ? "translate-x-0" : "group-hover:translate-x-1"
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

export default MobileMenuItem;