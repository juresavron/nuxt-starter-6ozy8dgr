import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../utils/cn';

interface AdminLogoProps {
  className?: string;
}

/**
 * Logo component for admin navigation
 */
const AdminLogo: React.FC<AdminLogoProps> = ({ className }) => {
  return (
    <Link 
      to="/home" 
      className={cn(
        "flex items-center gap-2 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 transition-opacity hover:opacity-90",
        className
      )}
    >
      <span className="font-heading">ocenagor</span>
      <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">Admin</span>
    </Link>
  );
};

export default AdminLogo;