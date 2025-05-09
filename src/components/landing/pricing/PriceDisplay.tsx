import React from 'react';
import { cn } from '../../../utils/cn';

interface PriceDisplayProps {
  price: string | number;
  isSubscription?: boolean;
  isYearly?: boolean;
  monthlyText?: string;
  yearlyText?: string;
  className?: string;
}

/**
 * Component to display a product price with subscription details
 */
const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  isSubscription = false,
  isYearly = false,
  monthlyText = "Monthly subscription",
  yearlyText = "Yearly subscription",
  className
}) => {
  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
        {price}€
      </p>
      {isSubscription && (
        <p className="text-xs sm:text-sm text-gray-500">
          {isYearly ? yearlyText : monthlyText}
        </p>
      )}
    </div>
  );
};

export default PriceDisplay;