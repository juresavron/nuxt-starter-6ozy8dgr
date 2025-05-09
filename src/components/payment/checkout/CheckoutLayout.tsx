import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Button from '../../shared/Button';
import { useTranslations } from '../../../hooks/useTranslations';

interface CheckoutLayoutProps {
  title: string;
  subtitle: string;
  onBackClick: () => void;
  backButtonText: string;
  children: React.ReactNode;
}

/**
 * Layout component for the checkout page
 * Provides consistent structure for checkout flow
 */
const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({
  title,
  subtitle,
  onBackClick,
  backButtonText,
  children
}) => {
  const translations = useTranslations();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={onBackClick}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
            className="hover:shadow-md transition-all duration-300 border-blue-100"
          >
            {backButtonText}
          </Button>
        </motion.div>
        
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 mb-3">{title}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {children}
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} ocenagor.si. {translations?.app?.copyright || 'Vse pravice pridržane.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;