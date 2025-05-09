import React from 'react';
import { Star, TrendingUp, BarChart3, Users } from 'lucide-react';
import { translations } from '../../../../translations/sl';
import { useAdminStore } from '../../../../hooks/admin/store';
import { useTranslations } from '../../../../hooks/useTranslations';
import { getDateFromRange } from '../../../../utils/date';
import { motion } from 'framer-motion';
import type { Database } from '../../../../types/database';

type Review = Database['public']['Tables']['reviews']['Row'];

interface CompanyStatsProps {
  reviews: Review[];
}

const CompanyStats: React.FC<CompanyStatsProps> = ({ reviews }) => {
  const safeReviews = Array.isArray(reviews) ? reviews.filter(r => r !== null && r !== undefined) : [];
  const translationsHook = useTranslations();
  const { dateRange, customDateRange } = useAdminStore();
  
  // Get date range for filtering
  const [startDate, endDate] = getDateFromRange(dateRange, customDateRange);
  
  // Filter reviews by date range for accurate calculations
  const filteredReviews = React.useMemo(() => {
    return safeReviews.filter(r => {
      if (!r || !r.created_at) return false;
      const reviewDate = new Date(r.created_at);
      return reviewDate >= startDate && reviewDate <= endDate;
    });
  }, [safeReviews, startDate, endDate]);
  
  // Calculate active users with contact info
  const activeUsers = safeReviews.filter(r => {
    if (!r || !r.created_at) return false;
    const reviewDate = new Date(r.created_at);
    return reviewDate >= startDate && 
           reviewDate <= endDate && 
           (r.email || r.phone);
    }
  ).length;
  
  // Calculate completed reviews based on completed_at field
  const completedReviews = filteredReviews.filter(r => r.completed_at).length;
  
  // Calculate average rating
  const averageRating = filteredReviews.length > 0
    ? filteredReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / filteredReviews.length
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 tracking-tight">{translationsHook?.app?.admin?.company?.statistics || translations.app.admin.company.statistics}</h3>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <Star className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{translations.app.admin.stats.averageRating}</p>
              <p className="text-2xl font-semibold text-gray-900">{averageRating.toFixed(1)}</p>
              <p className="text-sm text-gray-500">
                {translationsHook?.app?.admin?.stats?.period || translations.app.admin.stats.period}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <TrendingUp className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{translations.app.admin.stats.totalReviews}</p>
              <p className="text-2xl font-semibold text-gray-900">{filteredReviews.length}</p>
              <p className="text-sm text-gray-500">
                {translationsHook?.app?.admin?.stats?.period || translations.app.admin.stats.period}
              </p>
            </div>
          </div>
        </motion.div>
      
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-md transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
              <BarChart3 className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{translations.app.admin.stats.conversionRate}</p>
              <p className="text-2xl font-semibold text-gray-900">
                {filteredReviews.length > 0 ? Math.round((completedReviews / filteredReviews.length) * 100) : 0}%
              </p>
              <p className="text-sm text-gray-500">
                {(translationsHook?.app?.admin?.stats?.completedOf || translations.app.admin.stats.completedOf)
                  .replace('{completed}', completedReviews.toString())
                  .replace('{total}', filteredReviews.length.toString())}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyStats;