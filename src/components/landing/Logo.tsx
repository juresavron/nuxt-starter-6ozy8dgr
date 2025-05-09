import React from 'react';
import { cn } from '../../utils/cn';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from '../../hooks/useTranslations';

interface LogoProps {
  isScrolled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ 
  isScrolled = false,
  size = 'md'
}) => {
  const translations = useTranslations();
  
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };
  
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };
  
  return (
    <motion.a
      href="/"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 group transition-all duration-300 z-10"
      aria-label="Home"
    >
      <div className={cn(
        "flex items-center justify-center rounded-xl",
        "bg-gradient-to-r shadow-md",
        isScrolled ? "from-amber-500 to-yellow-600" : "from-amber-400 to-yellow-500",
        "transform group-hover:scale-110 transition-transform duration-300",
        iconSizes[size]
      )}>
        <Star className="h-5 w-5 text-white" fill="white" />
      </div>
      
      <div className="relative">
        <span 
          className={cn(
            `font-bold transition-colors duration-300 bg-clip-text text-transparent bg-gradient-to-r ${sizeClasses[size]}`,
            isScrolled ? "from-amber-500 to-amber-600" : "from-white to-white/90"
          )}
        >
          ocenagor
        </span>
        <span 
          className={cn(
            `font-bold transition-colors duration-300 bg-clip-text text-transparent bg-gradient-to-r ${sizeClasses[size]}`,
            isScrolled ? "from-yellow-600 to-yellow-500" : "from-white/90 to-white/80"
          )}
        >
          .si
        </span>
      </div>
    </motion.a>
  );
};

export default Logo;