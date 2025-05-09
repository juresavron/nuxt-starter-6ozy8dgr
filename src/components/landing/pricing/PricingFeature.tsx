import React from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface PricingFeatureProps {
  feature: string;
  highlighted?: boolean;
  className?: string;
}

/**
 * Component to display a single pricing feature with checkmark
 */
const PricingFeature: React.FC<PricingFeatureProps> = ({
  feature,
  highlighted = false,
  className
}) => {
  return (
    <li className={cn(
      "flex items-start gap-3 py-1.5",
      highlighted && "font-medium",
      className
    )}>
      <CheckCircle 
        className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" 
        style={{ fill: 'rgba(220, 252, 231, 0.5)' }}
      />
      <span className="text-xs sm:text-sm leading-relaxed">{feature}</span>
    </li>
  );
};

export default PricingFeature;