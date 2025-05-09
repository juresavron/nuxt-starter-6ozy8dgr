import React, { useEffect } from 'react';
import Stats from './overview/Stats';
import ReviewsTable from './overview/ReviewsTable';
import DateRangeSelector from './overview/DateRangeSelector';
import { useAdminStore } from '../../../hooks/admin/store';
import { motion } from 'framer-motion';
import { useAuth } from '../../../hooks/auth/useAuth';
import { getDateFromRange } from '../../../utils/date';
import { useWindowSize } from 'react-use';
import UserSubscriptionCard from './overview/UserSubscriptionCard';

interface OverviewProps {
  stats?: any;
  reviews?: any[];
  companies?: any[];
  tasks?: any[];
  loading?: boolean;
}

/**
 * Overview section of the admin panel
 * Shows key stats and recent reviews
 */
const Overview: React.FC<OverviewProps> = ({
  stats,
  reviews = [],
  companies = [],
  tasks = [],
  loading = false
}) => {
  const {
    dateRange,
    customDateRange,
    searchTerm,
    setSearchTerm,
    sortConfig,
    setSortConfig,
    isSuperAdmin
  } = useAdminStore();
  const { user } = useAuth();
  
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  // Filter reviews by date range
  const filteredReviews = React.useMemo(() => {
    const [startDate, endDate] = getDateFromRange(dateRange, customDateRange);
    return reviews.filter(review => {
      const reviewDate = new Date(review.created_at);
      return reviewDate >= startDate && reviewDate <= endDate;
    });
  }, [reviews, dateRange, customDateRange]);

  // Calculate filtered stats
  const filteredStats = React.useMemo(() => {
    const totalFilteredReviews = filteredReviews.length;
    const averageRating = totalFilteredReviews > 0 
      ? filteredReviews.reduce((sum, review) => sum + (review.rating || 0), 0) / totalFilteredReviews 
      : 0;
    const completedReviews = filteredReviews.filter(r => r.completed_at).length;
    const conversionRate = totalFilteredReviews > 0
      ? (completedReviews / totalFilteredReviews) * 100
      : 0;

    return {
      totalReviews: totalFilteredReviews,
      averageRating,
      totalCompanies: stats?.totalCompanies || 0,
      conversionRate
    };
  }, [filteredReviews, stats?.totalCompanies]);

  // Filter reviews by search term
  const searchFilteredReviews = React.useMemo(() => {
    if (!searchTerm) return filteredReviews;
    
    const searchLower = searchTerm.toLowerCase();
    return filteredReviews.filter(review => {
      const company = companies.find(c => c.id === review.company_id);
      
      return (
        company?.name.toLowerCase().includes(searchLower) ||
        review.email?.toLowerCase().includes(searchLower) ||
        review.phone?.toLowerCase().includes(searchLower) ||
        review.comment?.toLowerCase().includes(searchLower) ||
        review.feedback_options?.some(option => 
          option.toLowerCase().includes(searchLower)
        )
      );
    });
  }, [filteredReviews, searchTerm, companies]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <DateRangeSelector />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Stats 
            totalReviews={filteredStats.totalReviews}
            averageRating={filteredStats.averageRating}
            totalCompanies={filteredStats.totalCompanies}
            conversionRate={filteredStats.conversionRate}
            reviews={filteredReviews} 
          />
        </motion.div>

        {/* User Subscription Card - show for all admins */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <UserSubscriptionCard />
          </motion.div>
        )}

        {isMobile && (
          <motion.div
            key="mobile-date-selector"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <DateRangeSelector />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <ReviewsTable
            reviews={searchFilteredReviews}
            companies={companies}
            tasks={tasks}
            loading={loading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(Overview);