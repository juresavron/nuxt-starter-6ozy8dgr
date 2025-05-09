import React from 'react';
import { translations } from '../../../../translations/sl';
import { ArrowUpDown } from 'lucide-react';
import { cn } from '../../../../utils/cn';
import { useWindowSize } from 'react-use';

interface ReviewTableHeaderProps {
  sortConfig: { key: string; direction: string };
  onSort: (key: string) => void;
  hideCompanyColumn?: boolean;
}

/**
 * Header component for the reviews table
 */
const ReviewTableHeader: React.FC<ReviewTableHeaderProps> = ({ 
  sortConfig, 
  onSort,
  hideCompanyColumn = false 
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  
  // Header cell component
  const TableHeader = ({ label, sortKey }: { label: string; sortKey?: string }) => (
    <th
      className={cn(
        "px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap",
        sortKey ? 'cursor-pointer hover:text-gray-700' : ''
      )}
      onClick={() => {
        if (sortKey) {
          onSort(sortKey);
        }
      }}
    >
      <div className="flex items-center space-x-1">
        <span className="truncate max-w-[80px] sm:max-w-full">{label}</span>
        {sortKey && (
          <ArrowUpDown className={cn(
            "h-3 w-3 sm:h-4 sm:w-4 transition-colors",
            sortConfig?.key === sortKey ? 'text-gray-700' : 'text-gray-400'
          )} />
        )}
      </div>
    </th>
  );

  // On mobile, show only essential columns
  if (isMobile) {
    return (
      <tr className="border-b border-gray-200 bg-gray-50/50">
        <TableHeader
          label={translations.app.admin.reviews.date}
          sortKey="created_at"
        />
        <TableHeader
          label={translations.app.admin.reviews.rating}
          sortKey="rating"
        />
        {!hideCompanyColumn && <TableHeader label={translations.app.admin.reviews.company} />}
        <TableHeader label="Status" />
      </tr>
    );
  }

  return (
    <tr className="border-b border-gray-200 bg-gray-50/50">
      <TableHeader
        label={translations.app.admin.reviews.date}
        sortKey="created_at"
      />
      <TableHeader
        label={translations.app.admin.reviews.rating}
        sortKey="rating"
      />
      {!hideCompanyColumn && <TableHeader label={translations.app.admin.reviews.company} />}
      <TableHeader label={translations.app.admin.reviews.contact} />
      <TableHeader label="Feedback" />
      <TableHeader label={translations.app.admin.reviews.comment} />
      <TableHeader label="Status" />
      <TableHeader label={translations.app.admin.reviews.tasks} />
    </tr>
  );
};

export default React.memo(ReviewTableHeader);