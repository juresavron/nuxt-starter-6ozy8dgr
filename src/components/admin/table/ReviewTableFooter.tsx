import React from 'react';
import Pagination from './Pagination';
import { useAdminStore } from '../../../store/adminStore';

interface ReviewTableFooterProps {
  totalItems: number;
  loading: boolean;
}

/**
 * Footer component for the reviews table with pagination
 */
const ReviewTableFooter: React.FC<ReviewTableFooterProps> = ({ totalItems, loading }) => {
  const { pagination, setCurrentPage, setPageSize } = useAdminStore();
  
  // Calculate total pages based on current items per page
  const totalPages = Math.max(1, Math.ceil(totalItems / pagination.itemsPerPage));
  
  if (loading || totalItems === 0) {
    return null;
  }
  
  return (
    <Pagination
      currentPage={pagination.currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      totalItems={totalItems}
      itemsPerPage={pagination.itemsPerPage}
      onPageSizeChange={setPageSize}
      pageSizeOptions={pagination.pageSizeOptions || [25, 50, 100]}
    />
  );
};

export default React.memo(ReviewTableFooter);