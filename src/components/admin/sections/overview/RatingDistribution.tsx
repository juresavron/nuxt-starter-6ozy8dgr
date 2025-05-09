import * as React from 'react';
import { Star, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../../../utils/cn';
import { useTranslations } from '../../../../hooks/useTranslations';
import type { Database } from '../../../../types/database';

type Review = Database['public']['Tables']['reviews']['Row'];

interface RatingDistributionProps {
  reviews: Review[];
}

const RatingDistribution: React.FC<RatingDistributionProps> = ({ reviews }) => {
  const safeReviews = Array.isArray(reviews) ? reviews.filter(r => r !== null && r !== undefined) : [];
  const totalReviews = safeReviews.length;
  const translations = useTranslations();
  
  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0]; // Index 0 = 1 star, etc.
  safeReviews.forEach(r => {
    if (r.rating >= 1 && r.rating <= 5) {
      ratingCounts[r.rating - 1]++;
    }
  });
  
  // Calculate high vs low ratings
  const highRatings = safeReviews.filter(r => r.rating >= 4).length;
  const lowRatings = safeReviews.filter(r => r.rating <= 3).length;
  const highRatingPercentage = totalReviews > 0 ? (highRatings / totalReviews) * 100 : 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {totalReviews === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="py-12 text-center text-gray-500 bg-gray-50/50 rounded-xl border border-gray-100 hover:border-amber-100/50 transition-colors"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <Star className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-base">{translations?.app?.admin?.reviews?.noReviewsInRange || 'Ni ocen v izbranem obdobju'}</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingCounts[rating - 1];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            
            return (
              <motion.div 
                key={rating} 
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: (5 - rating) * 0.1 }}
              > 
                <div className="w-16 text-base text-gray-700 flex items-center gap-1.5">
                  {rating} <Star className="h-5 w-5 text-amber-500" />
                </div>
                <div className="flex-1 group relative">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden transition-all duration-300">
                    <motion.div
                      initial={{ width: 0, opacity: 0.6 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.7, delay: (5 - rating) * 0.1 + 0.3, ease: "easeOut" }}
                      className={`h-full transition-all duration-300 group-hover:shadow-md group-hover:opacity-90 ${
                        rating === 5 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                        rating === 4 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                        rating === 3 ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                        rating === 2 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                        'bg-gradient-to-r from-red-500 to-rose-500'
                      }`}
                    />
                  </div>
                </div>
                <div className="w-20 text-base font-medium text-gray-900 text-right">
                  {count} <span className="text-xs text-gray-500">({percentage.toFixed(0)}%)</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
      
      <div className="mt-8 text-sm text-gray-500 text-right">
        {totalReviews > 0 && (
          <span className="px-3 py-1 bg-gray-50 rounded-full border border-gray-100">{translations?.app?.admin?.stats?.totalReviewsInPeriod || 'Skupaj ocen v obdobju'}: <span className="font-medium text-blue-600">{totalReviews}</span></span>
        )}
      </div>
    </motion.div>
  );
};

export default RatingDistribution;