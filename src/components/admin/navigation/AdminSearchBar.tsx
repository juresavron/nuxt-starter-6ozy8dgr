import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useAdminStore } from '../../../hooks/admin/store';

/**
 * Search bar component for admin panel
 */
const AdminSearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useAdminStore();
  const [localSearch, setLocalSearch] = useState(searchTerm);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(localSearch);
  };
  
  const clearSearch = () => {
    setLocalSearch('');
    setSearchTerm('');
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search across companies, reviews, users..."
          className="w-full rounded-md border border-gray-200 bg-white py-2 pl-10 pr-10 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
        {localSearch && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              type="button"
              onClick={clearSearch}
              className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default AdminSearchBar;