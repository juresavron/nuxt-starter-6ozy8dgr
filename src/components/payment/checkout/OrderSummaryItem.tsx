import React from 'react';
import { cn } from '../../../utils/cn';

interface OrderSummaryItemProps {
  label: string;
  value: React.ReactNode;
  isBold?: boolean;
  hasBorder?: boolean;
  className?: string;
}

/**
 * Component for displaying a single item in the order summary
 */
const OrderSummaryItem: React.FC<OrderSummaryItemProps> = ({
  label,
  value,
  isBold = false,
  hasBorder = false,
  className
}) => {
  return (
    <div className={cn(
      "flex justify-between items-center py-2", 
      hasBorder && "border-t border-gray-100 pt-4 mt-2",
      className
    )}>
      <span className={cn(
        isBold ? "font-semibold text-gray-800" : "text-gray-500 text-sm"
      )}>
        {label}:
      </span>
      <span className={cn(
        isBold 
          ? "font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700" 
          : "font-medium text-gray-800"
      )}>
        {value}
      </span>
    </div>
  );
};

export default OrderSummaryItem;