import type { Database } from '../../../../types/database';

export type Company = Database['public']['Tables']['companies']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
export type SocialTask = Database['public']['Tables']['social_tasks']['Row'];

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