import * as React from 'react';
import { useState, useCallback } from 'react';
import RatingStarButton from './RatingStarButton';

interface RatingStarsGroupProps {
  rating: number;
  colorScheme?: string;
  onRating: (value: number) => void;
}

/**
 * Group of star buttons for rating selection
 */
const RatingStarsGroup: React.FC<RatingStarsGroupProps> = ({
  rating,
  colorScheme = 'indigo',
  onRating
}) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  // Handle rating change
  const handleRating = useCallback((value: number) => {
    console.log("RatingStarsGroup: handleRating called with value:", value);
    if (typeof onRating === 'function') {
      onRating(value);
    } else {
      console.error("RatingStarsGroup: onRating is not a function");
    }
  }, [onRating]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-center gap-3 sm:gap-4">
        {[1, 2, 3, 4, 5].map((value) => (
          <RatingStarButton
            key={value}
            value={value}
            rating={rating}
            hoveredRating={hoveredRating}
            colorScheme={colorScheme}
            onHover={setHoveredRating}
            onRating={handleRating}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(RatingStarsGroup);