import React, { useEffect } from 'react';
import { Share2, CheckCircle, ExternalLink, Globe, Link2, Wifi } from 'lucide-react';
import { useAdminStore } from '../../../../hooks/admin/store';
import { getDateFromRange } from '../../../../utils/date';
import { useTranslations } from '../../../../hooks/useTranslations';
import type { Database } from '../../../../types/database';
import { motion } from 'framer-motion';
import { cn } from '../../../../utils/cn';

type SocialTask = Database['public']['Tables']['social_tasks']['Row'];
type Review = Database['public']['Tables']['reviews']['Row'];

interface CompanyMetricsProps {
  companyTasks: SocialTask[];
  reviews?: Review[];
}

const CompanyMetrics: React.FC<CompanyMetricsProps> = ({
  companyTasks = [],
  reviews = []
}) => {
  const { dateRange, customDateRange } = useAdminStore();
  const translations = useTranslations();
  const [startDate, endDate] = getDateFromRange(dateRange, customDateRange);
  
  // Debug log to check what tasks are being passed
  useEffect(() => {
    console.log('CompanyMetrics: Received tasks:', companyTasks);
  }, [companyTasks]);
  
  // Calculate conversion rate
  const filteredReviews = React.useMemo(() => {
    return reviews.filter(review => {
      if (!review || !review.created_at) return false;
      const reviewDate = new Date(review.created_at);
      return reviewDate >= startDate && reviewDate <= endDate;
    });
  }, [reviews, startDate, endDate]);
  
  const totalReviews = Array.isArray(filteredReviews) ? filteredReviews.length : 0;
  const completedReviews = Array.isArray(filteredReviews) ? filteredReviews.filter(r => r && r.completed_at).length : 0;
  const conversionRate = totalReviews > 0 ? (completedReviews / totalReviews) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 tracking-tight">{translations.app.admin.company.socialTasks?.title || 'Družbena omrežja'}</h3>
      </div>
      
      <div className="space-y-4">
        {companyTasks.length > 0 ? (
          <>
            {companyTasks.map((task, index) => (
              <motion.a
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                href={task.url} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-300 group hover:scale-[1.02] transform"
              >
                <div className={`w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  index % 4 === 0 ? 'bg-gradient-to-br from-purple-500/10 to-indigo-600/10 group-hover:from-purple-500/20 group-hover:to-indigo-600/20' :
                  index % 4 === 1 ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 group-hover:from-amber-500/20 group-hover:to-orange-500/20' :
                  index % 4 === 2 ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 group-hover:from-emerald-500/20 group-hover:to-teal-500/20' :
                  'bg-gradient-to-br from-rose-500/10 to-pink-500/10 group-hover:from-rose-500/20 group-hover:to-pink-500/20'
                }`}>
                  <Link2 className={`h-5 w-5 ${
                    index % 4 === 0 ? 'text-purple-600' :
                    index % 4 === 1 ? 'text-amber-600' :
                    index % 4 === 2 ? 'text-emerald-600' :
                    'text-rose-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium text-gray-900 group-hover:text-blue-700 transition-colors">{task.platform}</span>
                    <div className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                      <Share2 className="h-3 w-3" />
                      <span>Deli</span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 truncate">{task.url}</p>
                </div>
                <ExternalLink className={`h-5 w-5 text-gray-400 transition-colors ${
                  index % 4 === 0 ? 'group-hover:text-purple-600' :
                  index % 4 === 1 ? 'group-hover:text-amber-600' :
                  index % 4 === 2 ? 'group-hover:text-emerald-600' :
                  'group-hover:text-rose-600'
                }`} />
              </motion.a>
            ))}
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center py-10 bg-gray-50/50 rounded-xl border border-gray-100 hover:border-blue-100 transition-colors"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              <Share2 className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-base text-gray-500">
              {translations.app.admin.company.socialTasks?.noTasks || 'Ni dodanih družbenih omrežij'}
            </p>
          </motion.div>
        )}
      </div>
      
      {/* Conversion metrics */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 tracking-tight">{translations?.app?.admin?.stats?.completionMetrics || 'Metrike uspešnosti'}</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:bg-gray-50/80 border border-gray-100 hover:border-emerald-100"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">{translations?.app?.admin?.stats?.completedReviews || 'Completed Reviews'}</span>
              <span className="text-sm font-semibold text-emerald-600">{completedReviews}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-emerald-500 h-2 rounded-full"
                style={{ width: `${totalReviews > 0 ? (completedReviews / totalReviews) * 100 : 0}%` }}
              ></div>
            </div>
            <div className="mt-1 text-xs text-gray-500 text-right font-medium">{totalReviews > 0 ? Math.round((completedReviews / totalReviews) * 100) : 0}%</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:bg-gray-50/80 border border-gray-100 hover:border-amber-100"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">{translations?.app?.admin?.stats?.conversionRate || 'Conversion Rate'}</span>
              <span className="text-sm font-semibold text-amber-600">{Math.round(conversionRate)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-amber-500 h-2 rounded-full"
                style={{ width: `${conversionRate}%` }}
              ></div>
            </div>
            <div className="mt-1 text-xs text-gray-500 text-right font-medium">{completedReviews} of {totalReviews}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CompanyMetrics;