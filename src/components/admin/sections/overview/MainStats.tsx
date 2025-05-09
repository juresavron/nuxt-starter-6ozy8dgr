import * as React from 'react';
import { Star, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { translations } from '../../../../translations/sl';
import StatCard from './StatCard';
import { useTranslations } from '../../../../hooks/useTranslations';
import type { Database } from '../../../../types/database';

type Review = Database['public']['Tables']['reviews']['Row'];

interface MainStatsProps {
  totalReviews: number;
  averageRating: number;
  totalCompanies: number;
  conversionRate: number;
  completedReviews: number;
  totalFilteredReviews: number;
}

const MainStats: React.FC<MainStatsProps> = ({
  totalReviews,
  averageRating,
  totalCompanies,
  conversionRate,
  completedReviews,
  totalFilteredReviews,
}) => {
  const translations = useTranslations();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Average Rating */}
      <StatCard
        icon={Star}
        title={translations.app.admin.stats.averageRating} 
        value={averageRating}
        decimals={1}
        colorScheme="amber"
        description={translations.app.admin.stats.period}
        delay={0}
      />

      {/* Total Reviews */}
      <StatCard
        icon={TrendingUp}
        title={translations.app.admin.stats.totalReviews}
        value={totalReviews}
        colorScheme="purple"
        description={translations.app.admin.stats.period}
        delay={0.1}
      />

      {/* Total Companies */}
      <StatCard
        icon={Users}
        title={translations.app.admin.stats.totalCompanies}
        value={totalCompanies}
        colorScheme="emerald"
        delay={0.2}
      />

      {/* Conversion Rate */}
      <StatCard
        icon={BarChart3}
        title={translations.app.admin.stats.conversionRate}
        value={conversionRate}
        suffix="%"
        colorScheme="rose"
        description={translations.app.admin.stats.completedOf
          .replace('{completed}', completedReviews.toString())
          .replace('{total}', totalFilteredReviews.toString())}
        delay={0.3}
      />
    </div>
  );
};

export default MainStats;