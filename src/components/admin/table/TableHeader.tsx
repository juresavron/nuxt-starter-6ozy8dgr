import React, { useCallback } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useWindowSize } from 'react-use';

interface TableHeaderProps {
  label: string;
  sortKey?: string;
  className?: string;
  sortConfig?: { key: string; direction: string };
  onSort?: (key: string) => void;
}

// Memoize the TableHeader component to prevent unnecessary re-renders
const TableHeader = React.memo(function TableHeader({ label, sortKey, className = '', sortConfig, onSort }: TableHeaderProps) {
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  return (
    <th
      className={`px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className} ${
        sortKey ? 'cursor-pointer hover:text-gray-700' : ''
      }`}
      onClick={() => {
        if (sortKey && onSort) {
          onSort(sortKey);
        }
      }}
    >
      <div className="flex items-center space-x-1">
        <span className="line-clamp-1">{label}</span>
        {sortKey && (
          <ArrowUpDown className={`h-3 w-3 sm:h-4 sm:w-4 ${
            sortConfig?.key === sortKey ? 'text-gray-700' : 'text-gray-400'
          }`} />
        )}
      </div>
    </th>
  );
});

export default TableHeader;