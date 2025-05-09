import React from 'react';
import { Star } from 'lucide-react';
import { useWindowSize } from 'react-use';

interface CompanyReviewsProps {
  companyReviews: any[];
}

/**
 * Component to display company review statistics
 */
const CompanyReviews: React.FC<CompanyReviewsProps> = ({ companyReviews }) => {
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  // Calculate review statistics
  const stats = companyReviews.reduce((acc, review) => {
    acc.total++;
    acc.ratingSum += review.rating;
    return acc;
  }, { total: 0, ratingSum: 0 });

  // Calculate average rating
  const avgRating = stats.total ? (stats.ratingSum / stats.total).toFixed(1) : '0.0';

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= Number(avgRating)
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-200'
            }`}
          />
        ))}
      </div> 
      <span className="text-xs sm:text-sm font-medium">{avgRating}</span>
      {!isMobile && (
        <span className="text-sm text-gray-600">
          {stats.total} reviews
        </span>
      )}
    </div>
  );
};

export default React.memo(CompanyReviews);