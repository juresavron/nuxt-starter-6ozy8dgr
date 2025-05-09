import React from 'react';
import { useAdminStore } from '../../../../hooks/admin/store';
import SearchBar from './SearchBar';
import ReviewTableHeader from './ReviewTableHeader';
import ReviewTableBody from './ReviewTableBody';
import ReviewTableFooter from './ReviewTableFooter';
import { motion } from 'framer-motion';
import { translations } from '../../../../translations/sl';
import { useWindowSize } from 'react-use';

interface ReviewsTableProps {
  reviews: any[];
  companies: any[];
  tasks: any[];
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortConfig: { key: string; direction: string };
  setSortConfig: (config: any) => void;
  hideCompanyColumn?: boolean;
  hideHeader?: boolean;
}

/**
 * Table component for displaying reviews
 */
const ReviewsTable: React.FC<ReviewsTableProps> = ({
  reviews = [],
  companies = [],
  tasks = [],
  loading = false,
  searchTerm = '',
  setSearchTerm,
  sortConfig,
  setSortConfig,
  hideCompanyColumn = false,
  hideHeader = false
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const { pagination } = useAdminStore();
  
  // Calculate paginated reviews
  const paginatedReviews = React.useMemo(() => {
    const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const end = start + pagination.itemsPerPage;
    return reviews.slice(start, Math.min(end, reviews.length));
  }, [reviews, pagination.currentPage, pagination.itemsPerPage]);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 sm:mb-20">
      {/* Header with title - only show if hideHeader is false */}
      {!hideHeader && (
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-50/30">
          <h3 className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">{translations.app.admin.reviews.title || 'Reviews'}</h3>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} {hideCompanyColumn ? 'in selected period' : 'total'}
          </p>
        </div>
      )}

      {/* Search bar */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      {/* Table - make it horizontally scrollable on mobile */}
      <div className="overflow-x-auto max-w-full">
        <div className={`min-w-full ${isMobile ? 'table-min-width-mobile' : ''}`}>
          <motion.table 
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          > 
            <thead>
              <ReviewTableHeader 
                sortConfig={sortConfig}
                onSort={setSortConfig}
                hideCompanyColumn={hideCompanyColumn}
              />
            </thead>
            <tbody>
              <ReviewTableBody
                reviews={reviews}
                companies={companies}
                tasks={tasks}
                loading={loading}
                paginatedReviews={paginatedReviews}
                searchTerm={searchTerm}
                hideCompanyColumn={hideCompanyColumn}
              />
            </tbody>
          </motion.table>
        </div>
      </div>
      
      {/* Pagination */}
      <ReviewTableFooter 
        totalItems={reviews.length}
        loading={loading} 
      />
    </div>
  );
};

export default React.memo(ReviewsTable);