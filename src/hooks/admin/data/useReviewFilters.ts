import React from 'react';
import { useMemo, useCallback } from 'react';
import { useAdminStore } from '../store';
import { getDateFromRange } from '../../../utils/date';
import type { Database } from '../../../types/database';

// Maximum number of reviews to process at once to prevent performance issues
const MAX_REVIEWS = 1000;

type Review = Database['public']['Tables']['reviews']['Row'];

/**
 * Hook for filtering and sorting reviews
 * Separates review filtering logic from the main admin panel hook
 */
export const useReviewFilters = (reviews: Review[], activeTab: string) => {
  const { 
    searchTerm, 
    sortConfig, 
    dateRange, 
    customDateRange,
    companies,
    pagination
  } = useAdminStore();

  // Memoize date filtering function
  const filterByDate = useCallback((review: Review) => {
    const [startDate, endDate] = getDateFromRange(dateRange, customDateRange);
    if (!review || !review.created_at) return false;
    const reviewDate = new Date(review.created_at);
    return reviewDate >= startDate && reviewDate <= endDate;
  }, [dateRange, customDateRange]);

  // Memoize search filtering function
  const filterBySearch = useCallback((review: Review) => {
    if (!searchTerm || !review || !review.company_id) return true;
    
    const searchLower = searchTerm.toLowerCase();
    const company = companies?.find(c => c.id === review.company_id);
    
    return (
      company?.name.toLowerCase().includes(searchLower) ||
      review.email?.toLowerCase().includes(searchLower) ||
      review.phone?.toLowerCase().includes(searchLower) ||
      review.comment?.toLowerCase().includes(searchLower) ||
      review.feedback_options?.some(option => 
        option.toLowerCase().includes(searchLower)
      )
    );
  }, [searchTerm, companies]);

  // Filter reviews by date range
  const dateFilteredReviews = useMemo(() => {
    // Skip date filtering for companies tab or if reviews is not an array
    if (activeTab === 'companies' || !Array.isArray(reviews)) {
      console.log('useReviewFilters: Skipping date filtering', { 
        activeTab, 
        isReviewsArray: Array.isArray(reviews) 
      });
      return [];
    }
    
    // Limit the number of reviews to process to prevent performance issues
    const limitedReviews = reviews.slice(0, MAX_REVIEWS);
    
    const filtered = limitedReviews.filter(review => {
      if (!review) return false;
      return filterByDate(review);
    });
    
    console.log('useReviewFilters: Date filtered reviews', { 
      before: limitedReviews.length, 
      after: filtered.length,
      dateRange,
      startDate: getDateFromRange(dateRange, customDateRange)[0].toISOString(),
      endDate: getDateFromRange(dateRange, customDateRange)[1].toISOString()
    });
    
    return filtered;
  }, [reviews, activeTab, filterByDate]);

  // Filter reviews by search term
  const searchFilteredReviews = useMemo(() => {
    if (!Array.isArray(dateFilteredReviews)) {
      console.log('useReviewFilters: dateFilteredReviews is not an array');
      return [];
    }
    
    const filtered = dateFilteredReviews.filter(review => {
      if (!review) return false;
      return filterBySearch(review);
    });
    
    console.log('useReviewFilters: Search filtered reviews', { 
      before: dateFilteredReviews.length, 
      after: filtered.length,
      searchTerm: searchTerm || '(none)'
    });
    
    return filtered;
  }, [dateFilteredReviews, filterBySearch]);

  // Sort filtered reviews
  const sortedReviews = useMemo(() => {
    if (!Array.isArray(searchFilteredReviews)) return [];
    
    const sorted = [...searchFilteredReviews].sort((a, b) => {
      const key = sortConfig.key as keyof Review;
      const aValue = a[key];
      const bValue = b[key];

      if (!aValue && !bValue) return 0;
      if (!aValue) return 1;
      if (!bValue) return -1;

      const comparison = 
        typeof aValue === 'string' && typeof bValue === 'string'
          ? aValue.localeCompare(bValue)
          : (aValue < bValue ? -1 : aValue > bValue ? 1 : 0);
          
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  }, [searchFilteredReviews, sortConfig]);

  // Paginate sorted reviews
  const paginatedReviews = useMemo(() => {
    if (!Array.isArray(sortedReviews)) return [];
    
    const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const end = start + pagination.itemsPerPage;
    
    // Ensure we don't go out of bounds
    if (start >= sortedReviews.length) {
      return sortedReviews.slice(0, pagination.itemsPerPage);
    }
    
    return sortedReviews.slice(start, Math.min(end, sortedReviews.length));
  }, [sortedReviews, pagination.currentPage, pagination.itemsPerPage]);

  return {
    filteredReviews: sortedReviews,
    paginatedReviews,
    searchTerm,
    sortConfig
  };
};

export default useReviewFilters;