import React from 'react';
import { Shield, CreditCard } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface SecurePaymentProps {
  message?: string;
  isSubscription?: boolean;
  className?: string;
  variant?: 'default' | 'subscription';
}

/**
 * Component to display secure payment badge
 */
const SecurePayment: React.FC<SecurePaymentProps> = ({
  message = 'Your data is securely encrypted',
  isSubscription = false,
  className,
  variant = 'default'
}) => {
  if (variant === 'subscription' || isSubscription) {
    return (
      <div className={cn("flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100", className)}>
        <CreditCard className="h-5 w-5 text-amber-600" style={{ fill: 'rgba(251, 191, 36, 0.1)' }} />
        <p className="text-xs sm:text-sm text-amber-700">
          Your payment information will be securely stored for recurring payments.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center p-3 bg-blue-50/70 rounded-lg border border-blue-100/50", className)}>
      <Shield className="h-4 w-4 text-blue-600 mr-2" style={{ fill: 'rgba(219, 234, 254, 0.5)' }} />
      <span className="text-xs text-blue-700">{message}</span>
    </div>
  );
};

export default SecurePayment;