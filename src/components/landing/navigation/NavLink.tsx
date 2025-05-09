import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';

interface NavLinkProps {
  href: string;
  label: string;
  active: boolean;
  onClick: () => void;
  isScrolled: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  label,
  active,
  onClick,
  isScrolled
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 mx-0.5",
        isScrolled ? (
          active
            ? "text-blue-600 bg-blue-50/80"
            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50/80"
        ) : (
          active
            ? "text-white bg-white/20"
            : "text-white/90 hover:text-white hover:bg-white/10"
        )
      )}
      aria-current={active ? 'page' : undefined}
    >
      {label}
      {active && (
        <motion.span 
          layoutId="activeIndicator"
          className={cn(
            "absolute inset-x-0 -bottom-1 h-0.5 rounded-full", 
            isScrolled ? "bg-blue-600" : "bg-white"
          )}
          aria-hidden="true"
        />
      )}
    </motion.button>
  );
};

export default NavLink;