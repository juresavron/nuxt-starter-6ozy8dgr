import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import OrderSummaryItem from './OrderSummaryItem';
import { useTranslations } from '../../../hooks/useTranslations';

interface OrderSummaryProps {
  productName: string;
  price: string | number;
  isSubscription?: boolean;
  isYearly?: boolean;
  onCheckout: () => void;
  isLoading: boolean;
  termsText?: string;
  checkoutButtonText?: string;
  packageText?: string;
  priceText?: string;
  billingText?: string;
  monthlyText?: string;
  yearlyText?: string;
  totalText?: string;
}

/**
 * Order summary component for the checkout page
 * Shows order details and checkout button
 */
const OrderSummary: React.FC<OrderSummaryProps> = ({
  productName,
  price,
  isSubscription = false,
  isYearly = false,
  onCheckout,
  isLoading,
  termsText,
  checkoutButtonText,
  packageText,
  priceText,
  billingText,
  monthlyText,
  yearlyText,
  totalText
}) => {
  const translations = useTranslations();
  
  // Use provided text or fallback to translations
  const t = translations?.landing?.pricing;
  
  // Fallback texts in case translations are not available
  const texts = {
    packageText: packageText || t?.package || 'Package',
    priceText: priceText || t?.price || 'Price',
    billingText: billingText || t?.billing || 'Billing',
    monthlyText: monthlyText || t?.monthly || 'Monthly',
    yearlyText: yearlyText || 'Yearly',
    totalText: totalText || t?.total || 'Total',
    checkoutButtonText: checkoutButtonText || t?.proceedToCheckout || 'Proceed to Checkout',
    termsText: termsText || t?.termsNotice || 'By proceeding, you agree to our Terms of Service and Privacy Policy. Your payment will be processed securely by Stripe.'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 mb-2">
              {texts.packageText}
            </h3>
            
            <div className="border-t border-gray-100 pt-6">
              <OrderSummaryItem 
                label={texts.packageText} 
                value={productName} 
              />
              
              <OrderSummaryItem 
                label={texts.priceText} 
                value={`${price}€`} 
              />
              
              {isSubscription && (
                <OrderSummaryItem 
                  label={texts.billingText} 
                  value={isYearly ? texts.yearlyText : texts.monthlyText} 
                />
              )}
              
              <OrderSummaryItem 
                label={texts.totalText} 
                value={`${price}€`} 
                isBold={true}
                hasBorder={true}
              />
            </div>
          </div>
          
          <Button
            variant="primary"
            onClick={onCheckout}
            isLoading={isLoading}
            className="w-full mt-8 py-4 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl"
          >
            {texts.checkoutButtonText}
          </Button>
          
          <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed max-w-md mx-auto">
            {texts.termsText}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default OrderSummary;