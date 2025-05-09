import * as React from 'react';
import { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { translations } from '../../../../translations/sl';
import { useAdminStore } from "../../../../hooks/admin/store";
import { getDateFromRange } from '../../../../utils/date';
import MainStats from './MainStats';
import ContactStats from './ContactStats';
import CompletionMetrics from './CompletionMetrics';
import RatingDistribution from './RatingDistribution';
import Card from '../../../shared/Card';
import { Star, CheckCircle, Mail } from 'lucide-react';
import { useTranslations } from '../../../../hooks/useTranslations';
import { useWindowSize } from 'react-use';
import type { Database } from '../../../../types/database';

type Review = Database['public']['Tables']['reviews']['Row'];

interface StatsProps {
  totalReviews: number;
  averageRating: number;
  totalCompanies: number;
  conversionRate: number;
  reviews: Review[];
}

/**
 * Enhanced Stats component showing key metrics with animations
 */
const Stats: React.FC<StatsProps> = ({ 
  totalReviews, 
  averageRating, 
  totalCompanies, 
  conversionRate, 
  reviews 
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const { dateRange, customDateRange } = useAdminStore();
  const translationsHook = useTranslations();

  // Filter reviews by date range
  const filteredReviews = useMemo(() => {
    const [startDate, endDate] = getDateFromRange(dateRange, customDateRange);
    return Array.isArray(reviews) ? reviews.filter(review => {
      if (!review || !review.created_at) return false;
      const reviewDate = new Date(review.created_at);
      return reviewDate >= startDate && reviewDate <= endDate;
    }) : [];
  }, [reviews, dateRange, customDateRange]);

  // Calculate additional metrics
  const metrics = useMemo(() => {
    const withEmail = filteredReviews.filter(r => r.email).length;
    const withPhone = filteredReviews.filter(r => r.phone).length;
    const withContact = filteredReviews.filter(r => r.email || r.phone).length;
    const contactRate = filteredReviews.length > 0 ? (withContact / filteredReviews.length) * 100 : 0;
    const completed = filteredReviews.filter(r => r.completed_at).length;
    const completionRate = filteredReviews.length > 0 ? (completed / filteredReviews.length) * 100 : 0;
    const redirected = filteredReviews.filter(r => r.redirected_to_google_at).length;
    const redirectRate = filteredReviews.length > 0 ? (redirected / filteredReviews.length) * 100 : 0;

    const ratingCounts = [0, 0, 0, 0, 0];
    filteredReviews.forEach(r => {
      if (r.rating >= 1 && r.rating <= 5) {
        ratingCounts[r.rating - 1]++;
      }
    });

    const highRatings = filteredReviews.filter(r => r.rating >= 4).length;
    const lowRatings = filteredReviews.filter(r => r.rating <= 3).length;
    const highRatingPercentage = filteredReviews.length > 0 ? (highRatings / filteredReviews.length) * 100 : 0;

    const highRatingFlow = filteredReviews.filter(r => r.flow_type === 'high_rating_gamification').length;
    const lowRatingFlow = filteredReviews.filter(r => r.flow_type === 'low_rating').length;

    return {
      withEmail,
      withPhone,
      withContact, 
      contactRate,
      completed,
      completionRate,
      redirected,
      redirectRate,
      ratingCounts,
      highRatings,
      lowRatings,
      highRatingPercentage,
      highRatingFlow,
      lowRatingFlow,
    };
  }, [filteredReviews]);
  
  const completedReviews = useMemo(() => {
    return filteredReviews.filter(r => r.completed_at).length;
  }, [filteredReviews]);

  // Responsive layouts
  const cardColumns = isMobile ? "grid-cols-1" : 
                     isTablet ? "grid-cols-1 sm:grid-cols-2" : 
                     "grid-cols-1 md:grid-cols-2";

  return (
    <div className="space-y-8">
      {/* Main Stats */}
      <MainStats
        totalReviews={totalReviews}
        averageRating={averageRating}
        totalCompanies={totalCompanies}
        conversionRate={metrics.completionRate}
        completedReviews={metrics.completed}
        totalFilteredReviews={filteredReviews.length}
      />

      {/* Additional Stats */}
      <div className={`grid ${cardColumns} gap-6 mb-6`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} 
          transition={{ duration: 0.5, delay: 0.3 }} 
        >
          <Card>
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                  <Mail className="h-5 w-5" style={{ fill: 'rgba(237, 233, 254, 0.7)' }} />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">{translationsHook?.app?.admin?.stats?.contactInfo || 'Kontaktni podatki'}</h3>
              </div>
              
              <div className="space-y-4">
                <ContactStats 
                  withEmail={metrics.withEmail}
                  withPhone={metrics.withPhone}
                  contactRate={metrics.contactRate}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} 
          transition={{ duration: 0.5, delay: 0.4 }} 
        >
          <Card>
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                  <CheckCircle className="h-5 w-5" style={{ fill: 'rgba(209, 250, 229, 0.7)' }} />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">{translationsHook?.app?.admin?.stats?.completionMetrics || 'Metrike uspešnosti'}</h3>
              </div>
              
              <div className="space-y-4">
                <CompletionMetrics
                  completed={metrics.completed}
                  redirected={metrics.redirected}
                  redirectRate={metrics.redirectRate}
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Rating Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} 
        transition={{ duration: 0.5 }}
      >
        <Card>
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                  <Star className="h-5 w-5" style={{ fill: 'rgba(254, 243, 199, 0.7)' }} />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">{translationsHook?.app?.admin?.stats?.ratingDistribution || 'Porazdelitev ocen'}</h3>
              </div>
            
            <div className="space-y-3">
              <RatingDistribution reviews={filteredReviews} />
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default React.memo(Stats);