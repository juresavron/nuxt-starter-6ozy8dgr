import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../utils/cn';

interface AdminNavLogoProps {
  className?: string;
}

/**
 * Logo component for admin navigation
 */
const AdminNavLogo: React.FC<AdminNavLogoProps> = ({ className }) => {
  return (
    <Link 
      to="/home" 
      className={cn(
        "flex items-center gap-2 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-400 z-20 transition-opacity hover:opacity-90",
        className
      )}
    >
      <span className="font-heading">ocenagor.si</span>
    </Link>
  );
};

export default AdminNavLogo;