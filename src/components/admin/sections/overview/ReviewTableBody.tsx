import React from 'react';
import ReviewRow from './ReviewRow';

// Maximum number of reviews to render at once to prevent performance issues
const MAX_VISIBLE_REVIEWS = 50;

interface ReviewTableBodyProps {
  reviews: any[];
  companies: any[];
  tasks: any[];
  loading: boolean;
  paginatedReviews: any[];
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
  paginatedReviews,
  hideCompanyColumn = false
}) => {
  // Debug: Log the props received
  React.useEffect(() => {
    console.log('ReviewTableBody: Received props', {
      reviewsCount: Array.isArray(reviews) ? reviews.length : 0,
      companiesCount: Array.isArray(companies) ? companies.length : 0,
      tasksCount: Array.isArray(tasks) ? tasks.length : 0,
      loading,
      paginatedReviewsCount: Array.isArray(paginatedReviews) ? paginatedReviews.length : 0
    });
    
    // Check if reviews array is valid
    if (!Array.isArray(paginatedReviews)) {
      console.error('ReviewTableBody: paginatedReviews is not an array:', paginatedReviews);
    } else if (paginatedReviews.length === 0) {
      console.warn('ReviewTableBody: paginatedReviews array is empty', { 
        filteredReviewsLength: Array.isArray(reviews) ? reviews.length : 0 
      });
    } else {
      // Log the first review to check its structure
      console.log('ReviewTableBody: First paginated review:', paginatedReviews[0]);
      
      // Log rating distribution
      const ratingCounts = paginatedReviews.reduce((acc, review) => {
        if (!review) return acc;
        const rating = review.rating || 0;
        acc[rating] = (acc[rating] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);
      
      console.log('ReviewTableBody: Rating distribution in paginated reviews:', ratingCounts);
    }
    
  }, [reviews, companies, tasks, loading, paginatedReviews]);

  // Loading state
  if (loading) {
    return (
      <tr>
        <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
          Loading...
        </td>
      </tr>
    );
  }

  // Empty state
  if (!Array.isArray(paginatedReviews) || paginatedReviews.length === 0) {
    return (
      <tr>
        <td colSpan={hideCompanyColumn ? 7 : 8} className="px-4 py-8 text-center text-gray-500">
          No reviews found
        </td>
      </tr>
    );
  }
  
  // Limit the number of reviews to render to prevent performance issues
  const visibleReviews = paginatedReviews.slice(0, MAX_VISIBLE_REVIEWS);
  const hasMoreReviews = paginatedReviews.length > MAX_VISIBLE_REVIEWS;
  
  return (
    <>
      {visibleReviews.map((review) => (
        <ReviewRow
          key={review.id}
          review={review}
          companies={companies}
          tasks={tasks}
          hideCompanyColumn={hideCompanyColumn}
        />
      ))}
      
      {hasMoreReviews && (
        <tr>
          <td colSpan={hideCompanyColumn ? 7 : 8} className="px-4 py-4 text-center text-gray-500">
            Showing {MAX_VISIBLE_REVIEWS} of {paginatedReviews.length} reviews. Use search or filters to narrow results.
          </td>
        </tr>
      )}
    </>
  );
};

export default React.memo(ReviewTableBody);