/**
 * Types for analytics-related components
 */

export interface TaskStat {
  name: string;
  count: number;
  percentage: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface ConversionMetrics {
  totalHighRatingReviews: number;
  completedAnyTask: number;
  completedAllTasks: number;
  conversionRate: number;
  completionRate: number;
  topTask?: TaskStat | null;
}