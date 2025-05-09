import * as React from 'react';
import { useState, useEffect, useCallback, memo } from 'react';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import MobileRatingView from './steps/MobileRatingView';
import DesktopRatingView from './steps/DesktopRatingView';
import LanguageSelector from './LanguageSelector';
import Card from '../shared/Card';

// Mobile detection helper
const isMobileDevice = () => {
  if (typeof navigator === 'undefined') return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

interface RatingStepProps {
  companyName: string;
  companyLogo?: string;
  colorScheme?: string;
  giftDescription?: string;
  rating: number;
  showForm: boolean;
  reviewId?: string | null;
  companyId?: string;
  couponType?: 'coupon' | 'lottery' | 'none';
  onRating: (value: number) => void;
}

const colorClasses = {
  indigo: {
    bg: 'from-indigo-50 to-indigo-50/50 border border-indigo-100/50',
    text: 'text-indigo-700',
  },
  emerald: {
    bg: 'from-emerald-50 to-emerald-50/50 border border-emerald-100/50',
    text: 'text-emerald-700',
  },
  amber: {
    bg: 'from-amber-50 to-amber-50/50 border border-amber-100/50',
    text: 'text-amber-700',
  },
  rose: {
    bg: 'from-rose-50 to-rose-50/50 border border-rose-100/50',
    text: 'text-rose-700',
  },
  bw: {
    bg: 'from-gray-100 to-gray-100 border border-gray-200',
    text: 'text-gray-800',
  },
};

const getColorScheme = (scheme: string) => {
  return colorClasses[scheme as keyof typeof colorClasses] || colorClasses.indigo;
};

const RatingStep: React.FC<RatingStepProps> = ({
  companyName,
  companyLogo,
  colorScheme = 'indigo',
  giftDescription,
  rating,
  showForm,
  reviewId = null,
  companyId,
  couponType = 'coupon',
  onRating
}) => {
  const scheme = getColorScheme(colorScheme);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile devices and set ready state after a short delay
  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  // Handle rating change
  const handleRatingChange = useCallback(async (value: number) => {
    console.log("RatingStep: handleRatingChange called with value:", value);
    setIsTransitioning(true);
    
    // Ensure rating is at least 1
    const validRating = value < 1 ? 1 : value;
    
    try {
      if (typeof onRating === 'function') {
        await onRating(validRating);
      }
    } catch (err) {
      console.error("RatingStep: Error in handleRatingChange:", err);
    }
    
    setTimeout(() => setIsTransitioning(false), 500);
  }, [onRating]);

  console.log("RatingStep: Rendering with rating:", rating || 0, "onRating type:", typeof onRating);
  
  return (
    <Card
      colorScheme={colorScheme} 
      gradient={false} 
      className="space-y-6 max-w-2xl mx-auto p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border-2"
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
            onRating={handleRatingChange}
          />
        )}
      </AnimatePresence>
      
      <LanguageSelector colorScheme={colorScheme} className="mt-6" />
    </Card>
  );
};

export default memo(RatingStep);