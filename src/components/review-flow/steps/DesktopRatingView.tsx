import * as React from 'react';
import { motion } from 'framer-motion';
import RatingHeader from './RatingHeader';
import GiftDescription from './GiftDescription';
import RatingStarsGroup from './RatingStarsGroup';
import RatingFooter from './RatingFooter';
import RewardTypeDisplay from './RewardTypeDisplay';

interface DesktopRatingViewProps {
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
 * Desktop-optimized rating view component with animations
 */
const DesktopRatingView: React.FC<DesktopRatingViewProps> = ({
  companyName,
  companyLogo,
  colorScheme = 'indigo',
  giftDescription,
  rating,
  popupBlocked = false,
  manualRedirectUrl = null,
  reviewId,
  companyId,
  couponType = 'coupon',
  nextDrawingDate,
  lotteryDrawingFrequency,
  onRating
}) => {
  return (
    <>
      <motion.div
        key="rating-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        <RatingHeader companyName={companyName} companyLogo={companyLogo} colorScheme={colorScheme} />
      </motion.div>

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="text-center mb-8 space-y-4"
      >
        {giftDescription && couponType !== 'none' && <GiftDescription giftDescription={giftDescription} colorScheme={colorScheme} />}
        {couponType && couponType !== 'none' && (
          <RewardTypeDisplay 
            couponType={couponType} 
            colorScheme={colorScheme} 
            drawingDate={nextDrawingDate}
            drawingFrequency={lotteryDrawingFrequency}
          />
        )}
      </motion.div>

      <motion.div
        key="rating-stars"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="py-6"
      >
        <RatingStarsGroup
          rating={rating}
          colorScheme={colorScheme}
          onRating={onRating}
        />

        <RatingFooter colorScheme={colorScheme} />
      </motion.div>
    </>
  );
};

export default React.memo(DesktopRatingView);