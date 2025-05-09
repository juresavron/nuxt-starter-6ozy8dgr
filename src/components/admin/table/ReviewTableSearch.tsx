import React from 'react';
import SearchBar from './SearchBar';

interface ReviewTableSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

/**
 * Search component for the reviews table
 */
const ReviewTableSearch: React.FC<ReviewTableSearchProps> = ({ 
  searchTerm, 
  onSearchChange 
}) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <SearchBar value={searchTerm} onChange={onSearchChange} />
      </div>
    </div>
  );
};

export default React.memo(ReviewTableSearch);