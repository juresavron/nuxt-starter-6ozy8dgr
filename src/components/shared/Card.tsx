import * as React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import { getColorScheme } from '../../utils/colors';
import { useState, useEffect } from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  transition?: any;
  hover?: boolean;
  gradient?: boolean;
  colorScheme?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable card component with consistent styling
 */
const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  initial,
  animate,
  transition,
  hover = true,
  gradient = true,
  colorScheme = 'blue',
  style = {},
}) => {
  const scheme = getColorScheme(colorScheme);
  const [isClient, setIsClient] = useState(false);
  
  // Only enable animations after component is mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <motion.div 
      initial={isClient ? (initial || { opacity: 0, y: 10 }) : { opacity: 1, y: 0 }}
      animate={isClient ? (animate || { opacity: 1, y: 0 }) : { opacity: 1, y: 0 }}
      transition={isClient ? (transition || { duration: 0.4 }) : { duration: 0 }}
      style={{
        ...style,
        willChange: 'transform, opacity',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        WebkitTransform: 'translate3d(0, 0, 0)',
        transform: 'translate3d(0, 0, 0)'
      }}
      className={cn(
        "bg-white p-6 rounded-xl shadow-sm border", 
        gradient ? "bg-gradient-to-br" : "",
        gradient ? scheme.gradient : "", 
        gradient ? scheme.border : "border-blue-100/40",
        hover && "hover:shadow-lg transition-all duration-300 hover:scale-[1.01]", 
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default Card;
export { Card };