import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../../../hooks/useTranslations';

/**
 * Footer component for the mobile menu
 */
const MobileMenuFooter: React.FC = () => {
  const translations = useTranslations();
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="px-6 py-5 mt-auto bg-gray-50 border-t border-gray-100 text-center"
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600">
          &copy; {currentYear} ocenagor.si
        </p>
        <div className="flex justify-center gap-4">
          <a href="/terms" className="text-sm text-gray-500 hover:text-gray-700">Pogoji</a>
          <span className="text-gray-300">|</span>
          <a href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">Zasebnost</a>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMenuFooter;