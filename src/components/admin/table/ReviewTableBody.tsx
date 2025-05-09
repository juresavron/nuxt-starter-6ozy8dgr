import React from 'react';
import ReviewRow from './ReviewRow';
import { EmptyState, LoadingState } from './ReviewTableComponents';
import type { Database } from '../../../types/database';
import type { SocialTask } from '../modals/SocialTasksSection';

// Maximum number of reviews to render at once to prevent performance issues
const MAX_VISIBLE_REVIEWS = 50;

type Review = Database['public']['Tables']['reviews']['Row'];
type Company = Database['public']['Tables']['companies']['Row'];

interface ReviewTableBodyProps {
  reviews: Review[];
  companies: Company[] | undefined;
  tasks: SocialTask[] | undefined;
  loading: boolean;
  searchTerm: string;
  paginatedReviews: Review[];
  hideCompanyColumn?: boolean;
}

/**
 * Table body component for the reviews table
 */
const ReviewTableBody: React.FC<ReviewTableBodyProps> = ({
  reviews,
  companies,
  tasks,
  loading,
  searchTerm,
  paginatedReviews,
  hideCompanyColumn = false
}) => {
  // Debug: Log the props received
  React.useEffect(() => {
    console.log('ReviewTableBody: Received props', {
      reviewsCount: reviews?.length || 0,
      companiesCount: companies?.length || 0,
      tasksCount: tasks?.length || 0,
      loading,
      searchTerm,
      paginatedReviewsCount: paginatedReviews?.length || 0
    });
    
    // Check if reviews array is valid
    if (!Array.isArray(reviews)) {
      console.error('ReviewTableBody: reviews is not an array:', reviews);
    } else if (reviews.length === 0) {
      console.warn('ReviewTableBody: reviews array is empty');
    }
    
    // Check if paginatedReviews array is valid
    if (!Array.isArray(paginatedReviews)) {
      console.error('ReviewTableBody: paginatedReviews is not an array:', paginatedReviews);
    } else if (paginatedReviews.length === 0) {
      console.warn('ReviewTableBody: paginatedReviews array is empty');
    } else {
      // Log the first review to check its structure
      console.log('ReviewTableBody: First paginated review:', paginatedReviews[0]);
    }
    
    // Check if reviews array is valid
    if (!Array.isArray(reviews)) {
      console.error('ReviewTableBody: reviews is not an array:', reviews);
    } else if (reviews.length === 0) {
      console.warn('ReviewTableBody: reviews array is empty');
    }
    
    // Check if paginatedReviews array is valid
    if (!Array.isArray(paginatedReviews)) {
      console.error('ReviewTableBody: paginatedReviews is not an array:', paginatedReviews);
    } else if (paginatedReviews.length === 0) {
      console.warn('ReviewTableBody: paginatedReviews array is empty');
    } else {
      // Log the first review to check its structure
      console.log('ReviewTableBody: First paginated review:', paginatedReviews[0]);
    }
  }, [reviews, companies, tasks, loading, searchTerm, paginatedReviews]);

  if (loading) {
    console.log('ReviewTableBody: Showing loading state');
    return <LoadingState />;
  }

  // Safety check for reviews array
  if (!Array.isArray(paginatedReviews) || paginatedReviews.length === 0) {
    console.log('ReviewTableBody: No paginated reviews to display');
    return <EmptyState />;
  }
  
  // Limit the number of reviews to render to prevent performance issues
  const visibleReviews = paginatedReviews.slice(0, MAX_VISIBLE_REVIEWS);
  const hasMoreReviews = paginatedReviews.length > MAX_VISIBLE_REVIEWS;

  console.log('ReviewTableBody: Rendering reviews', {
    visibleReviewsCount: visibleReviews.length,
    hasMoreReviews,
    totalPaginatedReviews: paginatedReviews.length
  });
  
  return (
    <>
      {visibleReviews.map((review) => {
        if (!review) {
          console.warn('ReviewTableBody: Encountered null or undefined review');
          return null;
        }
        
        // Check if review has required properties
        if (!review.id || !review.company_id) {
          console.warn('ReviewTableBody: Review missing required properties:', review);
          return null;
        }
        
        return (
          <ReviewRow
            key={review.id}
            review={review}
            companies={companies}
            tasks={tasks}
            hideCompanyColumn={hideCompanyColumn}
          />
        );
      })}
      {hasMoreReviews && (
        <tr>
          <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
            Showing {MAX_VISIBLE_REVIEWS} of {paginatedReviews.length} reviews. Use search or filters to narrow results.
          </td>
        </tr>
      )}
      {visibleReviews.length === 0 && (
        <tr>
          <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
            No reviews to display. Try changing your filters.
          </td>
        </tr>
      )}
    </>
  );
};

export default React.memo(ReviewTableBody);