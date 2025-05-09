import React from 'react';
import { cn } from '../../../utils/cn';
import { CheckCircle } from 'lucide-react';

interface FeatureListProps {
  features: string[];
  packageIncludesText?: string;
  subscriptionTypeText?: string;
  className?: string;
}

/**
 * Component to display a list of features for a product
 */
const FeatureList: React.FC<FeatureListProps> = ({
  features,
  packageIncludesText = "Package includes",
  subscriptionTypeText,
  className
}) => {
  return (
    <div className={cn("space-y-5 sm:space-y-6", className)}>
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <h4 className="font-medium text-sm sm:text-base text-gray-800">{packageIncludesText}:</h4>
        {subscriptionTypeText && (
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
            {subscriptionTypeText}
          </span>
        )}
      </div>
      
      <ul className="space-y-2 sm:space-y-3">
        {features.map((feature, index) => (
          <li 
            key={index}
            className={cn(
              "flex items-start gap-3 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg transition-colors",
              index % 2 === 0 ? "bg-gray-50" : ""
            )}
          >
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" style={{ fill: 'rgba(220, 252, 231, 0.5)' }} />
            <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureList;