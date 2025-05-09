import React, { useEffect, useCallback } from 'react';
import PageSizeSelector from '@/components/admin/table/PageSizeSelector';
import { useWindowSize } from 'react-use';
import { ChevronLeft, ChevronRight, ListFilter } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  onPageSizeChange: (value: number) => void;
  pageSizeOptions: number[];
}

const DOTS = '...';

const Pagination = React.memo(function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  onPageSizeChange,
  pageSizeOptions
}: PaginationProps) {
  const { width } = useWindowSize();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  
  const safeCurrentPage = Number(currentPage) || 1;
  const safeItemsPerPage = Number(itemsPerPage) || 25;
  const safeTotalItems = Number(totalItems) || 0;
  const safeTotalPages = Number(totalPages) || 1;

  // Calculate visible page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = isMobile ? 3 : isTablet ? 5 : 7;
    
    if (safeTotalPages <= maxVisiblePages) {
      for (let i = 1; i <= safeTotalPages; i++) {
        pages.push(i);
      }
      return pages;
    }
    
    // Always show first page
    pages.push(1);
    
    // Calculate middle pages
    let startPage = Math.max(2, safeCurrentPage - Math.floor((maxVisiblePages - 3) / 2));
    let endPage = Math.min(safeTotalPages - 1, startPage + maxVisiblePages - 4);
    
    if (endPage - startPage < maxVisiblePages - 4) {
      startPage = Math.max(2, safeTotalPages - maxVisiblePages + 2);
    }
    
    // Add ellipsis if needed
    if (startPage > 2) {
      pages.push(DOTS);
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis if needed
    if (endPage < safeTotalPages - 1) {
      pages.push(DOTS);
    }
    
    // Always show last page
    if (safeTotalPages > 1) {
      pages.push(safeTotalPages);
    }
    
    return pages;
  };

  const start = safeTotalItems > 0 ? Math.min(safeTotalItems, (safeCurrentPage - 1) * safeItemsPerPage + 1) : 0;
  const end = Math.min(safeTotalItems, safeCurrentPage * safeItemsPerPage);

  // Ensure current page is valid
  useEffect(() => {
    if (safeCurrentPage > safeTotalPages && safeTotalPages > 0) {
      onPageChange(safeTotalPages);
    }
  }, [safeCurrentPage, safeTotalPages, onPageChange]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 bg-white border-t border-gray-200 gap-4">
      <div className="flex items-center w-full sm:w-auto justify-between sm:justify-start gap-3 bg-blue-50/30 px-3 py-1.5 rounded-lg border border-blue-100/50">
        <ListFilter className="h-4 w-4 text-blue-500" style={{ fill: 'rgba(219, 234, 254, 0.3)' }} />
        <select
          value={safeItemsPerPage}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="px-2 py-1.5 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {isMobile || isTablet ? `${size}` : `${size} / stran`}
            </option>
          ))}
        </select>
        <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
          {isMobile ? `${start}-${end} / ${safeTotalItems}` : 
           isTablet ? `${start}-${end} od ${safeTotalItems}` :
           `Prikazano ${start}-${end} od ${safeTotalItems} vnosov`}
        </span>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => onPageChange(safeCurrentPage - 1)}
          disabled={safeCurrentPage === 1}
          className={cn(
            "p-2 sm:px-3 sm:py-1 text-sm font-medium rounded-md transition-colors",
            "border focus:outline-none", 
            safeCurrentPage === 1 
              ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          )}
          aria-label="Prejšnja stran"
        >
          {isMobile || isTablet ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <span>Prejšnja</span>
          )}
        </button>
        
        {getPageNumbers().map((pageNum, idx) => (
          <button
            key={idx}
            onClick={() => typeof pageNum === 'number' ? onPageChange(pageNum) : null}
            disabled={pageNum === DOTS}
            className={cn(
              "px-3 py-1 text-sm font-medium rounded-md border",
              pageNum === DOTS 
                ? "cursor-default bg-white text-gray-400 border-gray-200"
                : pageNum === safeCurrentPage 
                  ? "bg-blue-600 text-white border-blue-600" 
                  : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
            )}
            aria-current={pageNum === safeCurrentPage ? "page" : undefined}
          >
            {pageNum}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(safeCurrentPage + 1)}
          disabled={safeCurrentPage === safeTotalPages}
          className={cn(
            "p-2 sm:px-3 sm:py-1 text-sm font-medium rounded-md transition-colors",
            "border focus:outline-none", 
            safeCurrentPage === safeTotalPages 
              ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200" 
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          )}
          aria-label="Naslednja stran"
        >
          {isMobile || isTablet ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <span>Naslednja</span>
          )}
        </button>
      </div>
    </div>
  );
});

export default Pagination;