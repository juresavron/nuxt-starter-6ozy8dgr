import React from 'react';
import { motion } from 'framer-motion';

interface SectionBadgeProps {
  icon: string;
  text: string;
  className?: string;
  iconElement?: React.ReactNode;
}

const SectionBadge: React.FC<SectionBadgeProps> = ({ 
  icon, 
  text,
  iconElement,
  className = ''
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8 shadow-lg transform hover:scale-105 transition-all duration-300 border border-blue-50/80 ios-optimized ${className}`}
      style={{
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    >
      {iconElement ? (
        <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-white">
          {iconElement}
        </span>
      ) : (
        <span className="text-base sm:text-xl ios-optimized" style={{ transform: 'translate3d(0, 0, 0)' }}>{icon}</span>
      )}
      <span className="text-blue-700">{text}</span>
    </motion.div>
  );
};

export default React.memo(SectionBadge);