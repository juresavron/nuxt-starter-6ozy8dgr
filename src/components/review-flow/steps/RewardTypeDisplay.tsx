import React from 'react';
import { cn } from '../../../utils/cn';
import { useTranslations } from '../../../hooks/useTranslations';

interface RewardTypeDisplayProps {
  couponType: 'coupon' | 'lottery' | 'none';
  colorScheme?: string;
  drawingDate?: string;
  drawingFrequency?: string;
}

const RewardTypeDisplay: React.FC<RewardTypeDisplayProps> = ({ 
  couponType, 
  colorScheme = 'indigo',
  drawingDate,
  drawingFrequency
}) => {
  const translations = useTranslations();

  // Skip rendering if no coupon type or it's set to 'none'
  if (!couponType || couponType === 'none') {
    return null;
  }

  // Determine icon and message based on coupon type
  const icon = couponType === 'lottery' ? '🎲' : '🎟️';
  const rewardMessage = couponType === 'lottery'
    ? translations?.review?.form?.lotteryReward || 'Po oddaji ocene boste sodelovali v žrebanju za nagrado.'
    : translations?.review?.form?.couponReward || 'Po oddaji ocene boste prejeli kupon.';

  // Format drawing date if available
  let drawingInfo = '';
  if (couponType === 'lottery') {
    if (drawingDate) {
      const date = new Date(drawingDate);
      const formattedDate = date.toLocaleDateString();
      drawingInfo = translations?.review?.form?.drawingDate 
        ? `${translations.review.form.drawingDate}: ${formattedDate}` 
        : `Žrebanje: ${formattedDate}`;
    } else if (drawingFrequency) {
      drawingInfo = translations?.review?.form?.drawingFrequency 
        ? `${translations.review.form.drawingFrequency}: ${drawingFrequency}` 
        : `Žrebanje poteka: ${drawingFrequency}`;
    }
  }

  return (
    <div className="space-y-2">
      <div className={cn(
        "flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium shadow-md w-full",
        "hover:shadow-lg transition-all duration-300 group",
        colorScheme === 'amber' ? "bg-amber-50 border border-amber-100 text-amber-700" :
        colorScheme === 'emerald' ? "bg-emerald-50 border border-emerald-100 text-emerald-700" :
        colorScheme === 'rose' ? "bg-rose-50 border border-rose-100 text-rose-700" :
        colorScheme === 'bw' ? "bg-gray-50 border border-gray-200 text-gray-700" :
        "bg-indigo-50 border border-indigo-100 text-indigo-700"
      )}>
        <span className="text-lg group-hover:scale-110 transition-transform duration-300">{icon}</span>
        <span className="text-sm sm:text-base">{rewardMessage}</span>
      </div>
      
      {drawingInfo && (
        <div className={cn(
          "text-center text-xs sm:text-sm",
          colorScheme === 'amber' ? "text-amber-600" :
          colorScheme === 'emerald' ? "text-emerald-600" :
          colorScheme === 'rose' ? "text-rose-600" :
          colorScheme === 'bw' ? "text-gray-600" :
          "text-indigo-600"
        )}>
          {drawingInfo}
        </div>
      )}
    </div>
  );
};

export default React.memo(RewardTypeDisplay);