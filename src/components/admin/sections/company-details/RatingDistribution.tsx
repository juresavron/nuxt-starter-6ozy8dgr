import React, { useEffect } from 'react';
import { Star, Calendar } from 'lucide-react';
import { translations } from '../../../../translations/sl';
import { useAdminStore } from '../../../../hooks/admin/store';
import { getDateFromRange } from '../../../../utils/date';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../../utils/cn';
import { useTranslations } from '../../../../hooks/useTranslations';
import type { Database } from '../../../../types/database';

type Review = Database['public']['Tables']['reviews']['Row'];

interface RatingDistributionProps {
  reviews: Review[];
  showDateSelector?: boolean;
}

const RatingDistribution: React.FC<RatingDistributionProps> = ({ 
  reviews,
  showDateSelector = false
}) => {
  const translationsHook = useTranslations();
  const { dateRange, customDateRange } = useAdminStore();
  const [startDate, endDate] = getDateFromRange(dateRange, customDateRange);

  // Log when date range changes
  React.useEffect(() => {
    console.log('RatingDistribution: Date range changed', {
      dateRange,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    });
  }, [dateRange, customDateRange, startDate, endDate]);
  
  // Filter reviews by date range
  const filteredReviews = React.useMemo(() => {
    console.log('RatingDistribution: Filtering reviews by date range', {
      totalReviews: Array.isArray(reviews) ? reviews.length : 0,
      dateRange,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    });
    
    const filtered = Array.isArray(reviews) ? reviews.filter(review => {
      if (!review || !review.created_at) return false;
      const reviewDate = new Date(review.created_at);
      return reviewDate >= startDate && reviewDate <= endDate;
    }) : [];
    
    console.log('RatingDistribution: Filtered reviews:', {
      before: Array.isArray(reviews) ? reviews.length : 0,
      after: filtered.length
    });
    
    return filtered;
  }, [reviews, startDate, endDate]);

  // Log filtered reviews count
  React.useEffect(() => {
    console.log('RatingDistribution: Filtered reviews count:', filteredReviews.length);
  }, [filteredReviews.length]);
  
  const totalReviews = Array.isArray(filteredReviews) ? filteredReviews.length : 0;
  
  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const count = Array.isArray(filteredReviews) 
      ? filteredReviews.filter(review => review && review.rating === i + 1).length 
      : 0;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { rating: i + 1, count, percentage };
  }).reverse();

  // Format date range for display
  const formatDateRange = () => {
    const formatDate = (date: Date) => date.toLocaleDateString('sl-SI', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <Star className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 tracking-tight">{translationsHook?.app?.admin?.company?.ratingDistribution || translations.app.admin.company.ratingDistribution}</h2>
        </div>
        
        {showDateSelector && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{formatDateRange()}</span>
          </div>
        )}
      </div>
      
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
          <p className="text-base">{translationsHook?.app?.admin?.reviews?.noReviewsInRange || 'Ni ocen v izbranem obdobju'}</p>
        </motion.div>
      ) : (
      <AnimatePresence>
        <div className="space-y-4">
          {ratingDistribution.map(({ rating, count, percentage }) => (
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
          ))}
        </div>
      </AnimatePresence>
      )}
      
      <div className="mt-8 text-sm text-gray-500 text-right">
        {totalReviews > 0 && (
          <span className="px-3 py-1 bg-gray-50 rounded-full border border-gray-100">{translationsHook?.app?.admin?.stats?.totalReviewsInPeriod || 'Skupaj ocen v obdobju'}: <span className="font-medium text-blue-600">{totalReviews}</span></span>
        )}
      </div>
    </>
  );
};

export default RatingDistribution;