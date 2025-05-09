import React from 'react';
import { ShoppingCart, CreditCard, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface CheckoutProgressProps {
  currentStep: 1 | 2 | 3;
}

/**
 * Progress indicator component for the checkout flow
 * Shows the current step in the checkout process
 */
const CheckoutProgress: React.FC<CheckoutProgressProps> = ({
  currentStep
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex items-center justify-center mb-12"
    >
      {/* Step 1: Cart */}
      <div className="flex items-center">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
          currentStep >= 1 ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' : 'bg-gray-100 text-gray-400'
        } shadow-md transition-all duration-300 transform ${currentStep === 1 ? 'scale-115' : ''}`}>
          <ShoppingCart className="h-5 w-5" style={{ fill: currentStep >= 1 ? 'rgba(255, 255, 255, 0.2)' : 'none' }} />
        </div>
        <div className={`h-1 w-16 ${
          currentStep >= 2 ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gray-100'
        } transition-colors duration-300`}></div>
      </div>
      
      {/* Step 2: Payment */}
      <div className="flex items-center">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
          currentStep >= 2 ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' : 'bg-gray-100 text-gray-400'
        } shadow-md transition-all duration-300 transform ${currentStep === 2 ? 'scale-115' : ''}`}>
          <CreditCard className="h-5 w-5" style={{ fill: currentStep >= 2 ? 'rgba(255, 255, 255, 0.2)' : 'none' }} />
        </div>
        <div className={`h-1 w-16 ${
          currentStep >= 3 ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gray-100'
        } transition-colors duration-300`}></div>
      </div>
      
      {/* Step 3: Confirmation */}
      <div className="flex items-center">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
          currentStep >= 3 ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' : 'bg-gray-100 text-gray-400'
        } shadow-md transition-all duration-300 transform ${currentStep === 3 ? 'scale-115' : ''}`}>
          <CheckCircle className="h-5 w-5" style={{ fill: currentStep >= 3 ? 'rgba(255, 255, 255, 0.2)' : 'none' }} />
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutProgress;