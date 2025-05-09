import React from 'react';
import { Search, Building2 } from 'lucide-react';

interface CompanyFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  filteredCompaniesLength: number;
  assignedCount: number;
}

/**
 * Component for filtering companies
 */
const CompanyFilter: React.FC<CompanyFilterProps> = ({
  searchTerm,
  setSearchTerm,
  loading,
  filteredCompaniesLength,
  assignedCount
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-gray-500" />
          <span>Assign Companies</span>
        </div>
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          disabled={loading}
        />
      </div>
      <div className="flex justify-between items-center mb-2 mt-2">
        <span className="text-sm font-medium text-gray-700">
          {filteredCompaniesLength} companies found
        </span>
        <span className="text-sm font-medium text-indigo-600">
          {assignedCount} assigned
        </span>
      </div>
    </div>
  );
};

export default React.memo(CompanyFilter);