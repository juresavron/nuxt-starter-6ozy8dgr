import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Award, TrendingUp } from 'lucide-react';
import { cn } from '../../../../../utils/cn';

interface ConversionMetricsProps {
  metrics: {
    totalHighRatingReviews: number;
    completedAnyTask: number;
    completedAllTasks: number;
    conversionRate: number;
    completionRate: number;
  };
  colorScheme?: string;
}

/**
 * Displays conversion metrics cards for gamification
 */
const ConversionMetricsCards: React.FC<ConversionMetricsProps> = ({
  metrics,
  colorScheme = 'blue'
}) => {
  // Get background color for stats cards
  const getStatBgColor = (index: number) => {
    switch (colorScheme) {
      case 'amber':
        return index === 0 ? 'bg-amber-50' : index === 1 ? 'bg-amber-50/70' : 'bg-amber-50/50';
      case 'emerald':
        return index === 0 ? 'bg-emerald-50' : index === 1 ? 'bg-emerald-50/70' : 'bg-emerald-50/50';
      case 'rose':
        return index === 0 ? 'bg-rose-50' : index === 1 ? 'bg-rose-50/70' : 'bg-rose-50/50';
      case 'bw':
        return index === 0 ? 'bg-gray-100' : index === 1 ? 'bg-gray-100/70' : 'bg-gray-100/50';
      default:
        return index === 0 ? 'bg-blue-50' : index === 1 ? 'bg-blue-50/70' : 'bg-blue-50/50';
    }
  };

  // Get icon color for stats cards
  const getIconColor = (index: number) => {
    switch (colorScheme) {
      case 'amber':
        return index === 0 ? 'text-amber-600' : index === 1 ? 'text-amber-500' : 'text-amber-400';
      case 'emerald':
        return index === 0 ? 'text-emerald-600' : index === 1 ? 'text-emerald-500' : 'text-emerald-400';
      case 'rose':
        return index === 0 ? 'text-rose-600' : index === 1 ? 'text-rose-500' : 'text-rose-400';
      case 'bw':
        return index === 0 ? 'text-gray-800' : index === 1 ? 'text-gray-700' : 'text-gray-600';
      default:
        return index === 0 ? 'text-blue-600' : index === 1 ? 'text-blue-500' : 'text-blue-400';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "p-4 rounded-lg border shadow-sm",
          getStatBgColor(0)
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            getIconColor(0)
          )}>
            <Share2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Konverzija gejmifikacije</p>
            <p className="text-xl font-semibold text-gray-900">{metrics.conversionRate}%</p>
            <p className="text-xs text-gray-500">
              {metrics.completedAnyTask} od {metrics.totalHighRatingReviews} visokih ocen
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className={cn(
          "p-4 rounded-lg border shadow-sm",
          getStatBgColor(1)
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            getIconColor(1)
          )}>
            <Award className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Stopnja dokončanja nalog</p>
            <p className="text-xl font-semibold text-gray-900">{metrics.completionRate}%</p>
            <p className="text-xs text-gray-500">
              {metrics.completedAllTasks} dokončanih vseh nalog
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className={cn(
          "p-4 rounded-lg border shadow-sm",
          getStatBgColor(2)
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            getIconColor(2)
          )}>
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Najbolj priljubljena naloga</p>
            <p className="text-xl font-semibold text-gray-900">
              {metrics.topTask?.name || 'Ni podatkov'}
            </p>
            <p className="text-xs text-gray-500">
              {metrics.topTask 
                ? `${metrics.topTask.count} dokončanj (${metrics.topTask.percentage}%)` 
                : 'Ni podatkov'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConversionMetricsCards;