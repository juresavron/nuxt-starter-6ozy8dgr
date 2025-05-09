import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Button from '../../shared/Button';

interface CheckoutHeaderProps {
  title: string;
  subtitle: string;
  onBackClick: () => void;
  backButtonText: string;
}

/**
 * Header component for the checkout page
 * Includes back button, title, and progress indicator
 */
const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({
  title,
  subtitle,
  onBackClick,
  backButtonText
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <Button
        variant="secondary"
        onClick={onBackClick}
        leftIcon={<ArrowLeft className="h-5 w-5" />}
        className="mb-8 shadow-sm hover:shadow-md transition-all duration-300"
      >
        {backButtonText}
      </Button>
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 mb-4">{title}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      </div>
    </motion.div>
  );
};

export default CheckoutHeader;