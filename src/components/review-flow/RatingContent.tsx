import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from '../../hooks/useTranslations';
import MobileRatingView from './steps/MobileRatingView';
import DesktopRatingView from './steps/DesktopRatingView';
import LanguageSelector from './LanguageSelector';
import Card from '../shared/Card';

// Mobile detection helper
const isMobileDevice = () => {
  if (typeof navigator === 'undefined') return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

interface RatingContentProps {
  companyName: string;
  companyLogo?: string;
  colorScheme?: string;
  giftDescription?: string;
  rating: number;
  showForm: boolean;
  reviewId?: string | null;
  companyId?: string;
  couponType?: 'coupon' | 'lottery' | 'none';
  nextDrawingDate?: string;
  lotteryDrawingFrequency?: string;
  onRating: (value: number) => void;
}

const RatingContent: React.FC<RatingContentProps> = ({
  companyName,
  companyLogo,
  colorScheme = 'indigo',
  giftDescription,
  rating,
  showForm,
  reviewId = null,
  companyId,
  couponType = 'coupon',
  nextDrawingDate,
  lotteryDrawingFrequency,
  onRating
}) => {
  const translations = useTranslations();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile devices
  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  // Handle rating change
  const handleRatingChange = async (value: number) => {
    console.log("RatingContent: handleRatingChange called with value:", value);
    setIsTransitioning(true);
    
    // Ensure rating is at least 1
    const validRating = value < 1 ? 1 : value;
    
    try {
      if (typeof onRating === 'function') {
        await onRating(validRating);
      } else {
        console.error("RatingContent: onRating is not a function");
      }
    } catch (err) {
      console.error("RatingContent: Error in handleRatingChange:", err);
    }
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <Card
      colorScheme={colorScheme} 
      gradient={false} 
      className="space-y-6 max-w-2xl mx-auto p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border-2 rounded-xl"
      style={{
        WebkitTapHighlightColor: 'transparent',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        WebkitTransform: 'translate3d(0, 0, 0)'
      }}
    >
      <AnimatePresence mode="wait">
        {isMobile ? (
          <MobileRatingView
            companyName={companyName}
            companyLogo={companyLogo}
            colorScheme={colorScheme}
            giftDescription={giftDescription}
            rating={rating}
            reviewId={reviewId}
            companyId={companyId}
            couponType={couponType}
            nextDrawingDate={nextDrawingDate}
            lotteryDrawingFrequency={lotteryDrawingFrequency}
            onRating={handleRatingChange}
          />
        ) : (
          <DesktopRatingView
            companyName={companyName}
            companyLogo={companyLogo}
            colorScheme={colorScheme}
            giftDescription={giftDescription}
            rating={rating}
            reviewId={reviewId}
            companyId={companyId}
            couponType={couponType}
            nextDrawingDate={nextDrawingDate}
            lotteryDrawingFrequency={lotteryDrawingFrequency}
            onRating={handleRatingChange}
          />
        )}
      </AnimatePresence>
      
      <LanguageSelector colorScheme={colorScheme} className="mt-6" />
    </Card>
  );
};

export default React.memo(RatingContent);