import * as React from 'react';
import { useMemo, useCallback } from 'react';
import { getDateFromRange } from '../../../utils/date';
import type { Database } from '../../../types/database';

type Review = Database['public']['Tables']['reviews']['Row'];

// Define types for stats and trends
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

// Helper function to calculate date ranges for comparison
const calculateDateRanges = (dateRange: string, customDateRange?: { startDate: Date; endDate: Date }) => {
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
    currentStart = new Date(customDateRange?.startDate || now);
    
    // Calculate previous period of same duration
    const duration = (customDateRange?.endDate || now).getTime() - currentStart.getTime();
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

  return { currentStart, currentEnd, previousStart, previousEnd };
};

// Helper function to filter reviews by date range
const filterReviewsByDateRange = (reviews: Review[], startDate: Date, endDate: Date): Review[] => {
  return reviews.filter((review: Review) => {
    if (!review || !review.created_at) return false;
    const reviewDate = new Date(review.created_at);
    return reviewDate >= startDate && reviewDate <= endDate;
  });
};

// Helper function to calculate average rating
const calculateAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  return reviews.reduce((acc, review) => acc + (review?.rating || 0), 0) / reviews.length;
};

// Helper function to calculate conversion rate
const calculateConversionRate = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const completedCount = reviews.filter(r => r && r?.completed_at).length;
  return (completedCount / reviews.length) * 100;
};

// Helper function to calculate percentage change
const calculateChange = (current: number, previous: number): number => {
  // If previous is zero or NaN, handle specially to avoid division by zero
  if (previous === 0 || isNaN(previous)) {
    // If current is also zero, there's no change (0%)
    if (current === 0 || isNaN(current)) return 0;
    // If current is positive, it's a 100% increase from zero
    return 100;
  }
  
  // Normal percentage change calculation
  return ((current - previous) / Math.abs(previous)) * 100;
};

// Helper function to determine trend direction
const getTrend = (change: number): 'up' | 'down' | 'neutral' => {
  if (Math.abs(change) < 0.5) return 'neutral';
  return change > 0 ? 'up' : 'down';
};

// Helper function to cap extreme percentage changes
const capChange = (value: number): number => {
  return Math.max(Math.min(value, 999), -999);
};

/**
 * Hook for comparing stats between current and previous periods
 * @param reviews Array of reviews to analyze
 * @returns Comparison stats with trends
 */
export const useStatsComparison = (
  reviews: Review[], 
  dateRange: string, 
  customDateRange?: { startDate: Date; endDate: Date }
) => {
  // Ensure reviews is an array
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  // Calculate stats with memoization for performance
  const stats = useMemo(() => {
    // Get date ranges for current and previous periods
    const { currentStart, currentEnd, previousStart, previousEnd } = calculateDateRanges(dateRange, customDateRange);

    // Filter reviews for current and previous periods
    const currentReviews = filterReviewsByDateRange(safeReviews, currentStart, currentEnd);
    const previousReviews = filterReviewsByDateRange(safeReviews, previousStart, previousEnd);

    // Calculate metrics for current period
    const currentAvg = calculateAverageRating(currentReviews);
    const currentConversion = calculateConversionRate(currentReviews);

    // Calculate metrics for previous period
    const previousAvg = calculateAverageRating(previousReviews);
    const previousConversion = calculateConversionRate(previousReviews);

    // For 'all' date range, set all changes to 0 and trends to neutral
    const isAllTimeRange = dateRange === 'all';
    
    // Calculate changes
    const ratingChange = calculateChange(currentAvg, previousAvg);
    const reviewsChange = calculateChange(currentReviews.length, previousReviews.length);
    const conversionChange = calculateChange(currentConversion, previousConversion);
    
    // Cap changes to prevent extreme values
    const cappedRatingChange = capChange(ratingChange);
    const cappedReviewsChange = capChange(reviewsChange);
    const cappedConversionChange = capChange(conversionChange);

    return {
      averageRating: {
        value: currentAvg,
        change: 0,
        trend: 'neutral' as 'up' | 'down' | 'neutral'
      },
      totalReviews: {
        value: currentReviews.length,
        change: 0,
        trend: 'neutral' as 'up' | 'down' | 'neutral'
      },
      conversionRate: {
        value: currentConversion,
        change: 0,
        trend: 'neutral' as 'up' | 'down' | 'neutral'
      }
    };
  }, [safeReviews, dateRange, customDateRange]);
  
  return stats;
};

export default useStatsComparison;