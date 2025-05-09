import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ProductFeatureProps {
  feature: string;
}

/**
 * Individual product feature component
 * Shows a feature with a checkmark icon
 */
const ProductFeature: React.FC<ProductFeatureProps> = ({
  feature
}) => {
  return (
    <li className="flex items-start gap-3 py-1">
      <CheckCircle 
        className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" 
      />
      <span className="text-gray-700 leading-relaxed">{feature}</span>
    </li>
  );
};

export default ProductFeature;