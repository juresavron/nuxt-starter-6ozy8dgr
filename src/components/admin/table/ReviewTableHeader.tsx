import React from 'react';
import { translations } from '../../../translations/sl';
import TableHeader from './TableHeader';
import type { Database } from '../../../types/database';

type Review = Database['public']['Tables']['reviews']['Row'];

interface ReviewTableHeaderProps {
  sortConfig: { key: string; direction: string };
  onSort: (key: keyof Review) => void;
  hideCompanyColumn?: boolean;
}

/**
 * Table header component for the reviews table
 */
const ReviewTableHeader: React.FC<ReviewTableHeaderProps> = ({ 
  sortConfig, 
  onSort,
  hideCompanyColumn = false 
}) => {
  return (
    <tr className="border-b border-gray-200 bg-gray-50/50">
      <TableHeader
        label={translations.app.admin.reviews.date}
        sortKey="created_at"
        sortConfig={sortConfig}
        onSort={onSort}
      />
      <TableHeader
        label={translations.app.admin.reviews.rating}
        sortKey="rating"
        sortConfig={sortConfig}
        onSort={onSort}
      />
      {!hideCompanyColumn && <TableHeader label={translations.app.admin.reviews.company} />}
      <TableHeader label={translations.app.admin.reviews.contact} />
      <TableHeader label="Izbrane težave" />
      <TableHeader label={translations.app.admin.reviews.comment} />
      <TableHeader label="Oddano" />
      <TableHeader label={translations.app.admin.reviews.tasks} />
    </tr>
  );
};

export default React.memo(ReviewTableHeader);