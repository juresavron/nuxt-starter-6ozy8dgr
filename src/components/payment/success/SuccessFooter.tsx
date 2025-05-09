import React from 'react';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../shared/Button';
import { cn } from '../../../utils/cn';

interface SuccessFooterProps {
  confirmationMessage: string;
  homeButtonText: string;
  dashboardButtonText: string;
}

/**
 * Footer component for the success page
 * Shows confirmation message and navigation buttons
 */
const SuccessFooter: React.FC<SuccessFooterProps> = ({
  confirmationMessage,
  homeButtonText,
  dashboardButtonText
}) => {
  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
        <div className="flex flex-col items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <ArrowRight className="h-6 w-6 text-blue-600" style={{ fill: 'rgba(219, 234, 254, 0.5)' }} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Naslednji koraki</h3>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-lg mx-auto text-center">
          {confirmationMessage}
        </p>
      </div>
      
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Button
          as={Link}
          to="/"
          variant="primary"
          leftIcon={<Home className="h-5 w-5" style={{ fill: 'rgba(255, 255, 255, 0.2)' }} />}
          className={cn(
            "py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg hover:shadow-xl",
            "transition-all duration-300 rounded-xl text-base transform hover:scale-[1.02]"
          )}
        >
          {homeButtonText}
        </Button>
        
        <Button
          as={Link}
          to="/admin"
          variant="secondary"
          rightIcon={<ShoppingBag className="h-5 w-5" style={{ fill: 'rgba(59, 130, 246, 0.1)' }} />}
          className={cn(
            "py-3 px-6 shadow-md hover:shadow-lg transition-all duration-300",
            "rounded-xl text-base border border-blue-100 transform hover:scale-[1.02]"
          )}
        >
          {dashboardButtonText}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default SuccessFooter;