import * as React from 'react';
import { useState, useEffect } from 'react';
import { cn } from '../../../utils/cn';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface RatingStarButtonProps {
  value: number;
  rating: number;
  hoveredRating: number;
  colorScheme?: string;
  onHover: (value: number) => void;
  onRating: (value: number) => void;
}

/**
 * Individual star button component for rating selection
 */
const RatingStarButton: React.FC<RatingStarButtonProps> = ({
  value,
  rating,
  hoveredRating,
  colorScheme = 'indigo',
  onHover,
  onRating
}) => {
  const [touchStartTime, setTouchStartTime] = useState(0);
  const activeRating = hoveredRating || rating;
  const isActive = value <= activeRating;

  // Get button gradient based on color scheme
  const getButtonGradient = (): string => {
    if (!isActive) return '';

    return colorScheme === 'amber' ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
           colorScheme === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
           colorScheme === 'rose' ? 'bg-gradient-to-r from-rose-500 to-pink-500' :
           colorScheme === 'bw' ? 'bg-gradient-to-r from-gray-700 to-gray-900' :
           'bg-gradient-to-r from-indigo-500 to-purple-600';
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartTime(Date.now());
    onHover(value);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchDuration = Date.now() - touchStartTime;
    onHover(0);

    if (touchDuration < 300) {
      onRating(value);
    }
  };

  return (
    <motion.button
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: isActive ? -5 : 0
      }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 20,
        mass: 0.8,
        delay: value * 0.08
      }}
      onClick={() => onRating(value)}
      onMouseEnter={() => onHover(value)}
      onMouseLeave={() => onHover(0)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => onHover(0)}
      className={cn( 
        "relative p-1.5 sm:p-2 rounded-xl outline-none transform-gpu",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "active:scale-95 transition-all duration-200",
        isActive 
          ? `${getButtonGradient()} shadow-lg hover:shadow-xl`
          : "hover:bg-gray-50/80",
        isActive ? "transform -translate-y-1" : ""
      )}
      style={{
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        WebkitTransform: 'translate3d(0, 0, 0)',
        transform: 'translate3d(0, 0, 0)',
        transition: 'all 0.2s ease-out'
      }}
      aria-label={`Rate ${value} stars`}
      whileHover={{ scale: 1.1 }}
    >
      <div className={isActive ? "animate-pulse" : ""}>
        <Star 
          strokeWidth={1.5}
          className={cn(
            "h-10 w-10 sm:h-12 sm:w-12 transition-all duration-200",
            isActive 
              ? "text-white"
              : value <= hoveredRating 
                ? "text-amber-300" 
                : "text-gray-300",
            isActive ? "fill-white drop-shadow-md" : ""
          )}
        />
      </div>
    </motion.button>
  );
};

export default React.memo(RatingStarButton);