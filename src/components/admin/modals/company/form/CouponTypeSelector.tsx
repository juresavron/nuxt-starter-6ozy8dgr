import React from 'react';
import { Gift, Ticket, X } from 'lucide-react';
import { useTranslations } from '../../../../../hooks/useTranslations';
import { cn } from '../../../../../utils/cn';

interface CouponTypeOption {
  id: 'coupon' | 'lottery' | 'none';
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  hoverBgColor: string;
  selectedBgColor: string;
}

interface CouponTypeSelectorProps {
  couponType: string;
  onChange: (type: string) => void;
  disabled?: boolean;
  label?: string;
}

/**
 * Component for selecting the coupon type for a company
 */
const CouponTypeSelector: React.FC<CouponTypeSelectorProps> = ({
  couponType,
  onChange,
  disabled = false,
  label
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.company?.form?.couponType || {};
  
  // Coupon type options
  const couponTypeOptions: CouponTypeOption[] = [
    { 
      id: 'coupon', 
      name: t?.coupon?.title || 'Kupon za vsako oceno', 
      description: t?.coupon?.description || 'Stranka prejme kupon po oddani oceni',
      icon: <Gift className="h-6 w-6" />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      hoverBgColor: 'hover:bg-emerald-50/70',
      selectedBgColor: 'bg-emerald-50'
    },
    { 
      id: 'lottery', 
      name: t?.lottery?.title || 'Žrebanje', 
      description: t?.lottery?.description || 'Stranke sodelujejo v žrebanju za nagrade namesto takojšnjih kuponov',
      icon: <Ticket className="h-6 w-6" />,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      hoverBgColor: 'hover:bg-amber-50/70',
      selectedBgColor: 'bg-amber-50'
    },
    { 
      id: 'none', 
      name: t?.none?.title || 'Brez nagrad', 
      description: t?.none?.description || 'Ne zbiraj kontaktnih podatkov in ne ponujaj nagrad',
      icon: <X className="h-6 w-6" />,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      hoverBgColor: 'hover:bg-gray-50/70',
      selectedBgColor: 'bg-gray-50'
    }
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label || t?.title || "Tip nagrade"}
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {couponTypeOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "relative p-5 rounded-xl border-2 transition-all duration-300 flex flex-col items-start gap-3 text-left h-full",
              "hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]",
              couponType === option.id
                ? `${option.selectedBgColor} border-blue-500 ring-2 ring-blue-100 shadow-md`
                : `border-gray-200 ${option.hoverBgColor} bg-white hover:border-gray-300`,
              disabled && "opacity-60 cursor-not-allowed"
            )}
            disabled={disabled}
          >
            {couponType === option.id && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full"></div>
            )}
            <div className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full",
              option.bgColor,
              option.color
            )}>
              {option.icon}
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">{option.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{option.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(CouponTypeSelector);