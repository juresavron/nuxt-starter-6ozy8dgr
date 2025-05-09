import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';

interface NavButtonProps {
  href?: string;
  label?: string;
  isScrolled: boolean;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  'aria-expanded'?: boolean;
  'aria-haspopup'?: string;
}

const NavButton: React.FC<NavButtonProps> = ({
  href,
  label,
  isScrolled,
  variant = 'primary',
  onClick,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = "w-auto flex items-center justify-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300";
  
  const variantStyles = {
    primary: isScrolled
      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-md"
      : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/20",
    secondary: isScrolled
      ? "text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-sm"
      : "text-white bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
  };
  
  const ButtonComponent = motion(href ? Link : "button");
  
  const buttonProps = {
    ...(href ? { to: href } : {}),
    onClick,
    className: cn(baseStyles, variantStyles[variant], className),
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    ...props
  };

  return (
    <ButtonComponent {...buttonProps}>
      {children || label}
    </ButtonComponent>
  );
};

export default NavButton;