import React from 'react';
import { useWindowSize } from 'react-use';
import { useAdminStore } from '../../../../hooks/admin/store';
import { ChevronLeft, ChevronRight, ListFilter } from 'lucide-react';
import Pagination from '../../../admin/table/Pagination';
import Button from '../../../shared/Button';

interface ReviewTableFooterProps {
  totalItems: number;
  loading: boolean;
}

/**
 * Footer component for the reviews table with pagination
 */
const ReviewTableFooter: React.FC<ReviewTableFooterProps> = ({ 
  totalItems, 
  loading 
}) => {
  const { pagination, setCurrentPage, setPageSize } = useAdminStore();
  const { width } = useWindowSize();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  
  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(totalItems / pagination.itemsPerPage));
  
  // Skip rendering if loading or no items
  if (loading || totalItems === 0) {
    return null;
  }
  
  // Calculate pagination range
  const start = Math.min(totalItems, (pagination.currentPage - 1) * pagination.itemsPerPage + 1);
  const end = Math.min(totalItems, pagination.currentPage * pagination.itemsPerPage);
  
  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = isMobile ? 3 : isTablet ? 5 : 7;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate middle pages
      let startPage = Math.max(2, pagination.currentPage - 1);
      let endPage = Math.min(totalPages - 1, pagination.currentPage + 1);
      
      // Adjust if at the beginning or end
      if (pagination.currentPage <= 2) {
        endPage = Math.min(totalPages - 1, 4);
      } else if (pagination.currentPage >= totalPages - 1) {
        startPage = Math.max(2, totalPages - 3);
      }
      
      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 bg-white border-t border-gray-200 gap-4">
      {/* Items per page and info */}
      <div className="flex items-center w-full sm:w-auto justify-between sm:justify-start gap-3 bg-blue-50/30 px-3 py-1.5 rounded-lg border border-blue-100/50">
        <ListFilter className="h-4 w-4 text-blue-500" style={{ fill: "rgba(219, 234, 254, 0.3)" }} />
        <select
          value={pagination.itemsPerPage}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="px-2 py-1.5 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
        >
          {pagination.pageSizeOptions.map(size => (
            <option key={size} value={size}>
              {isMobile || isTablet ? `${size}` : `${size} / stran`}
            </option>
          ))}
        </select>
        
        <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
          {isMobile ? `${start}-${end} / ${totalItems}` : 
           isTablet ? `${start}-${end} od ${totalItems}` :
           `Prikazano ${start}-${end} od ${totalItems} vnosov`}
        </span>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Previous button */}
        <Button
          onClick={() => setCurrentPage(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          variant="secondary"
          size="sm" 
          leftIcon={isMobile || isTablet ? <ChevronLeft className="h-4 w-4" style={{ fill: 'rgba(219, 234, 254, 0.3)' }} /> : undefined}
        >
          {!isMobile && !isTablet && (
            <span>Prejšnja</span>
          )}
        </Button>
        
        {/* Page numbers */}
        {getPageNumbers().map((pageNum, idx) => (
          <Button
            key={idx}
            onClick={() => typeof pageNum === 'number' ? setCurrentPage(pageNum) : null}
            disabled={pageNum === '...'}
            variant={pageNum === pagination.currentPage ? 'primary' : 'secondary'}
            size="sm"
            className={pageNum === '...' ? "cursor-default" : ""}
          >
            {pageNum}
          </Button>
        ))}
        
        {/* Next button */}
        <Button
          onClick={() => setCurrentPage(pagination.currentPage + 1)}
          disabled={pagination.currentPage === totalPages}
          variant="secondary"
          size="sm" 
          rightIcon={isMobile || isTablet ? <ChevronRight className="h-4 w-4" style={{ fill: 'rgba(219, 234, 254, 0.3)' }} /> : undefined}
        >
          {!isMobile && !isTablet && (
            <span>Naslednja</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(ReviewTableFooter);