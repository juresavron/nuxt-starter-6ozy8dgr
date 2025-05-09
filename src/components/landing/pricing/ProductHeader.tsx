import React from 'react';
import { Building2, Award } from 'lucide-react';

interface ProductHeaderProps {
  name: string;
  icon?: React.ReactNode;
}

/**
 * Component to display a product name/title in pricing and checkout pages
 */
const ProductHeader: React.FC<ProductHeaderProps> = ({
  name,
  icon
}) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center shadow-sm">
        {icon || <Award className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900">{name}</h3>
    </div>
  );
};

export default ProductHeader;