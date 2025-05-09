import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../../../lib/supabase';
import { useAdminStore } from '../../../../hooks/admin/store';
import { useClientSide } from '../../../../hooks/useClientSide';
import CompanyHeader from './CompanyHeader';
import CompanyStats from './CompanyStats';
import CompanyMetrics from './CompanyMetrics';
import GamificationAnalytics from './GamificationAnalytics';
import RatingDistribution from './RatingDistribution';
import DateRangeSelector from '../overview/DateRangeSelector';
import ReviewsTable from '../overview/ReviewsTable';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import ErrorAlert from '../../../shared/ErrorAlert';
import { ErrorSeverity } from '../../../../utils/errorHandler';
import { useTranslations } from '../../../../hooks/useTranslations';
import type { Database } from '../../../../types/database';
import Card from '../../../shared/Card';
import { motion, AnimatePresence } from 'framer-motion';

type Company = Database['public']['Tables']['companies']['Row'];
type Review = Database['public']['Tables']['reviews']['Row'];
type SocialTask = Database['public']['Tables']['social_tasks']['Row'];

const CompanyDetails: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  const isClient = useClientSide();
  const { dateRange, customDateRange, searchTerm, setSearchTerm, sortConfig, setSortConfig } = useAdminStore();
  const translations = useTranslations();
  
  // Get date range for filtering
  const [startDate, endDate] = React.useMemo(() => {
    const now = new Date();
    let start = new Date(now);
    let end = new Date(now);
    end.setHours(23, 59, 59, 999);
    
    if (dateRange === 'custom' && customDateRange) {
      start = new Date(customDateRange.startDate);
      start.setHours(0, 0, 0, 0);
      end = new Date(customDateRange.endDate);
      end.setHours(23, 59, 59, 999);
    } else if (dateRange === '1d') {
      start.setDate(now.getDate() - 1);
    } else if (dateRange === '7d') {
      start.setDate(now.getDate() - 7);
    } else if (dateRange === '30d') {
      start.setDate(now.getDate() - 30);
    } else if (dateRange === '6m') {
      start.setMonth(now.getMonth() - 6);
    } else if (dateRange === 'all') {
      start = new Date(0); // Beginning of time
    }
    
    start.setHours(0, 0, 0, 0);
    return [start, end];
  }, [dateRange, customDateRange]);
  
  const [company, setCompany] = useState<Company | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tasks, setTasks] = useState<SocialTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use a ref to track if data has already been fetched to prevent duplicate fetches
  const dataFetchedRef = React.useRef(false);

  // Fetch company data
  const fetchCompanyData = useCallback(async () => {
    if (!companyId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('CompanyDetails: Starting data fetch for company ID:', companyId);
      
      // Fetch company
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', companyId)
        .single();
        
      if (companyError) {
        console.error('CompanyDetails: Error fetching company:', companyError);
        throw companyError;
      }
      
      console.log('CompanyDetails: Successfully fetched company:', companyData?.name);
      
      // Fetch reviews
      let reviewsQuery = supabase
        .from('reviews')
        .select('*');
      
      // Apply company filter
      reviewsQuery = reviewsQuery.eq('company_id', companyId);
      
      // Apply date range filters
      reviewsQuery = reviewsQuery.gte('created_at', startDate.toISOString());
      reviewsQuery = reviewsQuery.lte('created_at', endDate.toISOString());
      
      // Apply sorting
      reviewsQuery = reviewsQuery.order('created_at', { ascending: false });
      
      const { data: reviewsData, error: reviewsError } = await reviewsQuery;
        
      if (reviewsError) {
        console.error('CompanyDetails: Error fetching reviews:', reviewsError);
        throw reviewsError;
      }
      
      console.log('CompanyDetails: Successfully fetched reviews:', reviewsData?.length || 0);
      
      // Fetch social tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from('social_tasks')
        .select('*')
        .eq('company_id', companyId);
        
      if (tasksError) {
        console.error('CompanyDetails: Error fetching social tasks:', tasksError);
        throw tasksError;
      }
      
      console.log('CompanyDetails: Successfully fetched social tasks:', tasksData?.length || 0);
      
      // Update state
      setCompany(companyData);
      setReviews(Array.isArray(reviewsData) ? reviewsData.filter(r => r !== null) : []);
      setTasks(tasksData || []);
      
      console.log('CompanyDetails: Fetched data', {
        company: companyData?.name,
        reviewsCount: reviewsData?.length || 0,
        tasksCount: tasksData?.length || 0
      });
    } catch (err) {
      console.error('CompanyDetails: Error fetching company data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch company data');
    } finally {
      setLoading(false);
    }
  }, [companyId, startDate, endDate]);

  // Fetch data only on mount and when date range changes
  useEffect(() => {
    if (!isClient) return;
  
    // Only fetch data once on initial mount
    if (!dataFetchedRef.current) {
      dataFetchedRef.current = true; // Mark that we've fetched data
      
      console.log('CompanyDetails: Fetching data on mount with date range', {
        dateRange,
        customDateRange: customDateRange ? {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0]
        } : null
      });
      
      fetchCompanyData();
    }
  }, [isClient, fetchCompanyData]); // Keep dependencies minimal for initial fetch
  
  // Re-fetch when date range changes
  useEffect(() => {
    if (isClient && dataFetchedRef.current) {
      console.log('CompanyDetails: Re-fetching data due to date range change', {
        dateRange,
        customDateRange: customDateRange ? {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0]
        } : null
      });
      fetchCompanyData();
    }
  }, [dateRange, customDateRange, isClient, fetchCompanyData]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <LoadingSpinner size="lg" color="indigo" />
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ErrorAlert 
            message={error || 'Company not found'} 
            severity={ErrorSeverity.ERROR}
            onDismiss={() => navigate('/admin')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/90 via-white to-blue-50/90">
      <CompanyHeader 
        company={company}
        reviews={reviews}
        loading={loading}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-sm py-4 px-4 -mx-4 mb-6 border-b border-gray-100 shadow-sm">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DateRangeSelector />
          </motion.div>
        </div>
        
        <AnimatePresence>
          <div className="space-y-8">
            {/* Main Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }} 
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Rating Distribution - Full Width */}
              <div className="lg:col-span-12">
                <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-blue-100/40">
                  <div className="p-6">
                    <RatingDistribution reviews={reviews} showDateSelector={false} />
                  </div>
                </Card>
              </div>

              {/* Stats and Metrics - Two Columns */}
              <div className="lg:col-span-6">
                <Card className="shadow-md hover:shadow-lg transition-all duration-300 h-full border-blue-100/40">
                  <div className="p-6">
                    <CompanyStats reviews={reviews} />
                  </div>
                </Card>
              </div>
              
              <div className="lg:col-span-6">
                <Card className="shadow-md hover:shadow-lg transition-all duration-300 h-full border-blue-100/40">
                  <div className="p-6">
                    <CompanyMetrics companyTasks={tasks} reviews={reviews} />
                  </div>
                </Card>
              </div>
            </motion.div>
            
            {/* Gamification Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-12 mt-6"
            >
              <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-blue-100/40">
                <div className="p-6">
                  <GamificationAnalytics 
                    reviews={reviews} 
                    tasks={tasks} 
                    colorScheme={company?.color_scheme}
                  />
                </div>
              </Card>
            </motion.div>
            
            {/* Reviews Table - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-gray-100/80">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50/30">
                  <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    {translations?.app?.admin?.reviews?.title || 'Reviews'}
                  </h3>
                </div>
                <ReviewsTable 
                  reviews={reviews}
                  companies={[company].filter(Boolean)}
                  tasks={tasks}
                  loading={loading}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  sortConfig={sortConfig}
                  setSortConfig={setSortConfig}
                  hideCompanyColumn={true}
                  hideHeader={true}
                />
              </Card>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CompanyDetails;