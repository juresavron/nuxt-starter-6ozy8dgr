import React, { useState } from 'react';
import { Share2 } from 'lucide-react';
import type { Database } from '../../../../types/database';
import ChartControls from './analytics/ChartControls';
import ConversionMetricsCards from './analytics/ConversionMetricsCards';
import TaskChart from './analytics/TaskChart';
import TaskCompletionTable from './analytics/TaskCompletionTable';
import NoGamificationData from './analytics/NoGamificationData';

type Review = Database['public']['Tables']['reviews']['Row'];
type SocialTask = Database['public']['Tables']['social_tasks']['Row'];

interface GamificationAnalyticsProps {
  reviews: Review[];
  tasks: SocialTask[];
  colorScheme?: string;
}

/**
 * Analyzes and displays gamification-related metrics and statistics
 */
const GamificationAnalytics: React.FC<GamificationAnalyticsProps> = ({
  reviews,
  tasks,
  colorScheme = 'blue'
}) => {
  // UI state
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  const [viewMode, setViewMode] = useState<'count' | 'percentage'>('count');

  // Filter reviews that have gamification steps completed
  const gamificationReviews = reviews.filter(review => 
    review.flow_type === 'high_rating_gamification' && 
    Array.isArray(review.gamification_steps_completed) && 
    review.gamification_steps_completed.length > 0
  );

  // Calculate task completion statistics
  const taskStats = React.useMemo(() => {
    // Initialize with Google review task
    const stats: Record<string, { name: string, count: number, percentage: number }> = {
      'google_review': { name: 'Google ocena', count: 0, percentage: 0 }
    };
    
    // Add all social tasks
    tasks.forEach(task => {
      stats[task.platform] = { name: task.platform, count: 0, percentage: 0 };
    });
    
    // Count completed tasks
    let totalCompletions = 0;
    gamificationReviews.forEach(review => {
      if (Array.isArray(review.gamification_steps_completed)) {
        review.gamification_steps_completed.forEach(step => {
          if (stats[step]) {
            stats[step].count += 1;
            totalCompletions += 1;
          }
        });
      }
    });
    
    // Calculate percentages
    Object.keys(stats).forEach(key => {
      stats[key].percentage = totalCompletions > 0 
        ? Math.round((stats[key].count / totalCompletions) * 100) 
        : 0;
    });
    
    // Convert to array and sort by count
    return Object.values(stats).sort((a, b) => b.count - a.count);
  }, [gamificationReviews, tasks]);

  // Calculate conversion metrics
  const conversionMetrics = React.useMemo(() => {
    const totalHighRatingReviews = reviews.filter(r => 
      r.flow_type === 'high_rating_gamification'
    ).length;
    
    const completedAnyTask = gamificationReviews.length;
    
    const completedAllTasks = gamificationReviews.filter(review => {
      if (!Array.isArray(review.gamification_steps_completed)) return false;
      
      // Count Google review + all social tasks
      const totalPossibleTasks = tasks.length + 1;
      return review.gamification_steps_completed.length >= totalPossibleTasks;
    }).length;
    
    return {
      totalHighRatingReviews,
      completedAnyTask,
      completedAllTasks,
      conversionRate: totalHighRatingReviews > 0 
        ? Math.round((completedAnyTask / totalHighRatingReviews) * 100) 
        : 0,
      completionRate: completedAnyTask > 0 
        ? Math.round((completedAllTasks / completedAnyTask) * 100) 
        : 0,
      topTask: taskStats.length > 0 ? taskStats[0] : null
    };
  }, [reviews, gamificationReviews, tasks, taskStats]);

  // Get chart colors based on color scheme
  const getChartColors = () => {
    switch (colorScheme) {
      case 'amber': return ['#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f'];
      case 'emerald': return ['#10b981', '#059669', '#047857', '#065f46', '#064e3b'];
      case 'rose': return ['#f43f5e', '#e11d48', '#be123c', '#9f1239', '#881337'];
      case 'bw': return ['#1f2937', '#374151', '#4b5563', '#6b7280', '#9ca3af'];
      default: return ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'];
    }
  };

  // Get chart data based on view mode
  const chartData = taskStats.map(stat => ({
    name: stat.name,
    value: viewMode === 'count' ? stat.count : stat.percentage
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 tracking-tight">
          Analitika gejmifikacije
        </h3>
        
        <ChartControls 
          chartType={chartType}
          viewMode={viewMode}
          setChartType={setChartType}
          setViewMode={setViewMode}
          colorScheme={colorScheme}
        />
      </div>

      {/* Conversion metrics cards */}
      <ConversionMetricsCards 
        metrics={conversionMetrics}
        colorScheme={colorScheme}
      />

      {/* Chart or empty state */}
      {gamificationReviews.length > 0 ? (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <TaskChart 
            data={chartData}
            chartType={chartType}
            viewMode={viewMode}
            colors={getChartColors()}
            colorScheme={colorScheme}
          />
        </div>
      ) : (
        <NoGamificationData />
      )}

      {/* Task completion table */}
      <TaskCompletionTable 
        taskStats={taskStats}
        colorScheme={colorScheme}
      />
    </div>
  );
};

export default GamificationAnalytics;