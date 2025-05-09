import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  isTransitioning: boolean;
  colorScheme?: string;
  onRating: (value: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  isTransitioning,
  colorScheme = 'indigo',
  onRating
}) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const getStarColor = (value: number) => {
    const activeRating = hoveredRating || rating;
    if (value > activeRating) return 'text-gray-300';
    return value <= activeRating ? 'text-amber-400' : 'text-gray-300';
  };

  const getButtonGradient = (value: number) => {
    const activeRating = hoveredRating || rating;
    if (activeRating === 0 || value > activeRating) return '';
    
    switch (colorScheme) {
      case 'emerald': return 'bg-gradient-to-br from-emerald-500 to-teal-500';
      case 'amber': return 'bg-gradient-to-br from-amber-500 to-orange-500';
      case 'rose': return 'bg-gradient-to-br from-rose-500 to-pink-500';
      case 'bw': return 'bg-gradient-to-br from-gray-700 to-gray-900';
      default: return 'bg-gradient-to-br from-indigo-500 to-purple-500';
    }
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          className={`relative p-1 transition-all duration-200 ${
            isTransitioning ? 'transform scale-110' : ''
          }`}
          onClick={() => onRating(value)}
          onMouseEnter={() => setHoveredRating(value)}
          onMouseLeave={() => setHoveredRating(0)}
        >
          <div
            className={`absolute inset-0 rounded-lg opacity-0 hover:opacity-10 transition-opacity ${getButtonGradient(
              value
            )}`}
          />
          <Star
            className={`w-8 h-8 sm:w-12 sm:h-12 transition-colors ${getStarColor(value)}`}
            fill="currentColor"
          />
        </button>
      ))}
    </div>
  );
};

export default RatingStars;