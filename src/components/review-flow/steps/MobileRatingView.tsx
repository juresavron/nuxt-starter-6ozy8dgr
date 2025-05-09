import * as React from 'react';
import RatingHeader from './RatingHeader';
import GiftDescription from './GiftDescription';
import RatingStarsGroup from './RatingStarsGroup';
import RatingFooter from './RatingFooter';
import RewardTypeDisplay from './RewardTypeDisplay';

interface MobileRatingViewProps {
  companyName: string;
  companyLogo?: string;
  colorScheme?: string;
  giftDescription?: string;
  rating: number;
  popupBlocked?: boolean;
  manualRedirectUrl?: string | null;
  reviewId: string | null;
  companyId?: string;
  couponType?: 'coupon' | 'lottery' | 'none';
  nextDrawingDate?: string;
  lotteryDrawingFrequency?: string;
  onRating: (value: number) => void;
}

/**
 * Mobile-optimized rating view component
 */
const MobileRatingView: React.FC<MobileRatingViewProps> = ({
  companyName,
  companyLogo,
  colorScheme = 'indigo',
  giftDescription,
  rating,
  reviewId,
  companyId,
  couponType = 'coupon',
  nextDrawingDate,
  lotteryDrawingFrequency,
  onRating
}) => {
  return (
    <>
      <RatingHeader companyName={companyName} companyLogo={companyLogo} colorScheme={colorScheme} />

      <div className="text-center mb-8 space-y-4">
        {giftDescription && couponType !== 'none' && <GiftDescription giftDescription={giftDescription} colorScheme={colorScheme} />}
        {couponType && couponType !== 'none' && (
          <RewardTypeDisplay 
            couponType={couponType} 
            colorScheme={colorScheme} 
            drawingDate={nextDrawingDate}
            drawingFrequency={lotteryDrawingFrequency}
          />
        )}
      </div>

      <div className="py-6">
        <RatingStarsGroup
          rating={rating}
          colorScheme={colorScheme}
          onRating={onRating}
        />
        
        <RatingFooter colorScheme={colorScheme} className="mt-4" />
      </div>
    </>
  );
};

export default React.memo(MobileRatingView);