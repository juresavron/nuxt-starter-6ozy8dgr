import { useMemo, useCallback } from 'react';
import { getDateFromRange } from '../../../utils/date';
import { useAdminStore } from '../store';
import type { Database } from '../../../types/database';

type Review = Database['public']['Tables']['reviews']['Row'];

interface ComparisonStats {
  averageRating: {
    value: number;
    change: number;
    trend: 'up' | 'down' | 'neutral';
  };
  totalReviews: {
    value: number;
    change: number;
    trend: 'up' | 'down' | 'neutral';
  };
  conversionRate: {
    value: number;
    change: number;
    trend: 'up' | 'down' | 'neutral'; 
  };
}

/**
 * Hook for comparing stats between current and previous periods
 * @param reviews Array of reviews to analyze
 * @param dateRange Date range string ('1d', '7d', '30d', '6m', 'all', 'custom')
 * @returns Comparison stats with trends
 */
export const useReviewStats = (reviews: Review[], dateRange: string, customDateRangeOverride?: { startDate: Date; endDate: Date }) => {
  // Ensure reviews is an array
  const safeReviews = Array.isArray(reviews) ? reviews : [];
  const { customDateRange: storeCustomDateRange } = useAdminStore();
  
  // Use provided custom date range or fall back to store value
  const customDateRange = customDateRangeOverride || storeCustomDateRange;
  
  // Helper functions for calculations
  const calculateChange = useCallback((current: number, previous: number): number => {
    if (previous === 0 || isNaN(previous)) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  }, []);

  const getTrend = useCallback((change: number): 'up' | 'down' | 'neutral' => {
    if (Math.abs(change) < 0.1) return 'neutral';
    return change > 0 ? 'up' : 'down';
  }, []);

  // Cap extreme percentage changes to prevent UI issues
  const capChange = useCallback((value: number): number => {
    return Math.max(Math.min(value, 999), -999);
  }, []);
  
  // Calculate stats with memoization for performance
  const stats = useMemo(() => {
    const now = new Date();
    let currentStart: Date;
    let previousStart: Date;
    let currentEnd = new Date();
    currentEnd.setHours(23, 59, 59, 999);
    let previousEnd: Date;

    // Set comparison periods based on dateRange
    if (dateRange === 'all') {
      currentStart = new Date(0); // Beginning of time
      previousStart = new Date(0);
      previousEnd = new Date(0);
    } else if (dateRange === 'custom') {
      // For custom date range, use the provided dates
      currentStart = new Date(customDateRange.startDate);
      
      // Calculate previous period of same duration
      const duration = customDateRange.endDate.getTime() - customDateRange.startDate.getTime();
      previousStart = new Date(currentStart.getTime() - duration);
      previousEnd = new Date(currentStart);
    } else {
      // For standard date ranges, use getDateFromRange
      [currentStart, currentEnd] = getDateFromRange(dateRange, customDateRange);
      
      // Calculate previous period of same duration
      const duration = currentEnd.getTime() - currentStart.getTime();
      previousStart = new Date(currentStart.getTime() - duration);
      previousEnd = new Date(currentStart);
    }

    // Current period reviews
    const currentReviews = safeReviews.filter(review => {
      if (!review || !review.created_at) return false;
      const reviewDate = new Date(review.created_at);
      return reviewDate >= currentStart && reviewDate <= currentEnd;
    });

    // Previous period reviews 
    const previousReviews = safeReviews.filter(review => {
      if (!review || !review.created_at) return false;
      const reviewDate = new Date(review.created_at);
      return reviewDate >= previousStart && reviewDate < previousEnd;
    });

    // Calculate average ratings
    const currentAvg = currentReviews.length > 0
      ? currentReviews.reduce((acc, review) => acc + review.rating, 0) / currentReviews.length
      : 0;
    const previousAvg = previousReviews.length > 0
      ? previousReviews.reduce((acc, review) => acc + review.rating, 0) / previousReviews.length
      : 0;
    
    // Calculate conversion rates 
    const currentCompleted = currentReviews.filter(r => r && r.completed_at).length;
    const previousCompleted = previousReviews.filter(r => r.completed_at).length;
    
    // Calculate conversion rates based on completed_at field
    const currentConversion = currentReviews.length > 0 
      ? (currentCompleted / currentReviews.length) * 100 
      : 0;
    
    const previousConversion = previousReviews.length > 0 
      ? (previousCompleted / previousReviews.length) * 100 
      : 0;

    // For 'all' date range, set all changes to 0 and trends to neutral
    const isAllTimeRange = dateRange === 'all';
    
    const ratingChange = capChange(calculateChange(currentAvg, previousAvg));
    const reviewsChange = capChange(calculateChange(currentReviews.length, previousReviews.length));
    const conversionChange = capChange(calculateChange(currentConversion, previousConversion));

    return {
      averageRating: {
        value: currentAvg,
        change: isAllTimeRange ? 0 : ratingChange,
        trend: isAllTimeRange ? 'neutral' : getTrend(ratingChange)
      },
      totalReviews: {
        value: currentReviews.length,
        change: isAllTimeRange ? 0 : reviewsChange,
        trend: isAllTimeRange ? 'neutral' : getTrend(reviewsChange)
      },
      conversionRate: {
        value: currentConversion,
        change: isAllTimeRange ? 0 : conversionChange,
        trend: isAllTimeRange ? 'neutral' : getTrend(conversionChange)
      }
    };
  }, [safeReviews, dateRange, customDateRange, calculateChange, getTrend, capChange]);

  return stats;
};

export default useReviewStats;