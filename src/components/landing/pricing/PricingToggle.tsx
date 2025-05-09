import React from 'react';
import { cn } from '../../../utils/cn';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import { useWindowSize } from 'react-use';

interface PricingToggleProps {
  isYearly: boolean;
  onToggle: (value: boolean) => void;
  monthlyText?: string;
  yearlyText?: string;
  savingsText?: string;
  className?: string;
}

/**
 * Pricing Toggle component with responsive design
 */
const PricingToggle: React.FC<PricingToggleProps> = ({
  isYearly,
  onToggle,
  monthlyText,
  yearlyText,
  savingsText,
  className
}) => {
  const { language } = useLanguageStore();
  const { width } = useWindowSize();
  const isMobile = width < 640;
  const translations = useTranslations();
  
  // Get translated text for monthly/yearly/savings
  const translatedMonthlyText = monthlyText || 
    translations?.landing?.pricing?.monthly || 
    (language === 'sl' ? 'MESEČNO' : 
     language === 'it' ? 'MENSILE' : 
     'MONTHLY');
  
  const translatedYearlyText = yearlyText || 
    translations?.landing?.pricing?.yearly || 
    (language === 'sl' ? 'LETNO' : 
     language === 'it' ? 'ANNUALE' : 
     'YEARLY');
  
  const translatedSavingsText = savingsText || 
    translations?.landing?.pricing?.yearlySavings || 
    (language === 'sl' ? 'Prihranite do 20%' : 
     language === 'it' ? 'Risparmia fino al 20%' : 
     'Save up to 20%');

  return (
    <div className={cn(
      "flex items-center justify-center bg-gray-100 p-2 rounded-full",
      className
    )}>
      {/* Yearly button with better text wrapping */}
      <button
        onClick={() => onToggle(true)}
        className={cn(
          "flex flex-col justify-center items-center px-4 sm:px-6 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all duration-300",
          "min-h-[50px] sm:min-h-[56px] min-w-[90px] sm:min-w-[110px]",
          isYearly
            ? "bg-blue-500 border-blue-500 text-white"
            : "bg-white border-blue-500 text-gray-600"
        )}
      >
        <span className="whitespace-nowrap">{translatedYearlyText}</span>
        {isYearly && (
          <span className="text-[10px] sm:text-xs leading-tight text-center">{translatedSavingsText}</span>
        )}
      </button>

      {/* Monthly button with better text wrapping */}
      <button
        onClick={() => onToggle(false)}
        className={cn(
          "ml-2 flex justify-center items-center px-4 sm:px-6 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all duration-300",
          "min-h-[50px] sm:min-h-[56px] min-w-[90px] sm:min-w-[110px]",
          !isYearly
            ? "bg-blue-500 border-blue-500 text-white"
            : "bg-white border-blue-500 text-gray-600"
        )}
      >
        <span className="whitespace-nowrap">{translatedMonthlyText}</span>
      </button>
    </div>
  );
};

export default PricingToggle;