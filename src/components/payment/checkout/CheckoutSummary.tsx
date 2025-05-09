import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Shield } from 'lucide-react';
import Button from '../../shared/Button';
import { useTranslations } from '../../../hooks/useTranslations';
import { cn } from '../../../utils/cn';
import { SecurePayment } from '../../landing/pricing';
import OrderSummaryItem from './OrderSummaryItem';

interface CheckoutSummaryProps {
  productName: string;
  price: string;
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

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
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
  const t = translations?.landing?.pricing;

  const texts = {
    packageText: packageText || t?.package || 'Package',
    priceText: priceText || t?.price || 'Price',
    billingText: billingText || t?.billing || 'Billing',
    monthlyText: monthlyText || t?.monthly || 'Monthly',
    yearlyText: yearlyText || t?.yearly || 'Yearly',
    totalText: totalText || t?.total || 'Total',
    checkoutButtonText: checkoutButtonText || t?.proceedToCheckout || 'Proceed to Checkout',
    termsText: termsText || t?.termsNotice || 'By proceeding, you agree to our Terms of Service and Privacy Policy. Your payment will be securely processed through the Stripe payment system.'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4"
    >
      <Card className="overflow-hidden border border-blue-100/80 shadow-md hover:shadow-lg transition-all duration-300">
        <div className="p-6 sm:p-8">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 mb-4">
            {texts.totalText}
          </h3>

          <OrderSummaryItem label={texts.packageText} value={productName} />
          <OrderSummaryItem label={texts.priceText} value={`${price}€`} />
          
          {isSubscription && (
            <OrderSummaryItem 
              label={texts.billingText} 
              value={isYearly ? texts.yearlyText : texts.monthlyText} 
            />
          )}
          
          <OrderSummaryItem 
            label={texts.totalText} 
            value={`${price}€`}
            isBold 
            hasBorder 
          />
          
          <SecurePayment
            message={t?.securePaymentInfo || "Your data is securely encrypted"}
            className="my-6"
          />
          
          <Button
            variant="primary"
            onClick={onCheckout}
            isLoading={isLoading}
            disabled={isLoading}
            className="w-full py-4 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? 
              (t?.processing || 'Processing...') : 
              texts.checkoutButtonText
            }
          </Button>
          
          <p className="text-xs text-center text-gray-500 mt-4 leading-relaxed max-w-md mx-auto">
            {texts.termsText}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default CheckoutSummary;