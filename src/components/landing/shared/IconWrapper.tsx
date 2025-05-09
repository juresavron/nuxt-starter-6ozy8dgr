import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { LucideIcon } from 'lucide-react';

interface IconWrapperProps {
  icon: LucideIcon; 
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'mobile-sm' | 'mobile-xs' | 'mobile-md';
  gradient?: string;
  className?: string;
  rotate?: 'left' | 'right' | 'none';
}

/**
 * Standardized icon wrapper component with consistent sizing,
 * gradients, and animation for all landing page sections
 */
const IconWrapper: React.FC<IconWrapperProps> = ({ 
  icon: Icon, 
  size = 'lg', 
  gradient = 'from-blue-500 to-blue-600',
  className = '',
  rotate = 'left'
}) => {
  const sizeClasses = {
    // Standardized sizes with consistent scaling across breakpoints
    'mobile-xs': 'w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10', // Extra small for mobile
    'mobile-sm': 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12', // Small for mobile
    'mobile-md': 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14', // Medium for mobile
    'xs': 'w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11', // Extra small
    'sm': 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12', // Small
    'md': 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14', // Medium
    'lg': 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16'  // Large
  };
  
  const iconSizeClasses = {
    // Standardized icon sizes with consistent scaling
    'mobile-xs': 'h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5', // Extra small icons for mobile
    'mobile-sm': 'h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6', // Small icons for mobile
    'mobile-md': 'h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7', // Medium icons for mobile
    'xs': 'h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 md:h-5.5 md:w-5.5', // Extra small icons
    'sm': 'h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6', // Small icons
    'md': 'h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7', // Medium icons
    'lg': 'h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8' // Large icons
  };
  
  const rotateClasses = {
    left: '-rotate-6 hover:rotate-0',
    right: 'rotate-6 hover:rotate-0',
    none: 'rotate-0'
  };

  return (
    <motion.div 
      className={cn(
        // Base styling
        "flex-shrink-0 rounded-xl flex items-center justify-center shadow-md",
        "bg-gradient-to-br transform transition-transform duration-300 ios-optimized",
        // Dynamic classes
        sizeClasses[size],
        gradient,
        rotateClasses[rotate],
        className
      )}
      whileHover={{ scale: 1.05 }}
      style={{
        willChange: 'transform',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden'
      }}
    >
      <Icon className={cn("text-white", iconSizeClasses[size])} />
    </motion.div>
  );
};

export default IconWrapper;