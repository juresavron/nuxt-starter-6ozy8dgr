import React from 'react';
import { cn } from '../../../utils/cn';

interface Company {
  id: string;
  name: string;
}

interface CompanyListProps {
  filteredCompanies: Company[];
  companyAssignments: Record<string, boolean>;
  handleCompanyToggle: (companyId: string) => void;
  loading: boolean;
}

/**
 * Component for displaying and selecting companies
 */
const CompanyList: React.FC<CompanyListProps> = ({
  filteredCompanies,
  companyAssignments,
  handleCompanyToggle,
  loading
}) => {
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <div className="max-h-60 overflow-y-auto">
        {filteredCompanies.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredCompanies.map((company, index) => (
              <div 
                key={company.id} 
                className={cn(
                  "flex items-center p-3 hover:bg-gray-50 transition-colors",
                  companyAssignments[company.id] ? "bg-indigo-50" : ""
                )}
              >
                <input
                  type="checkbox"
                  id={`company-${company.id}`}
                  checked={!!companyAssignments[company.id]}
                  onChange={() => handleCompanyToggle(company.id)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  disabled={loading}
                />
                <label 
                  htmlFor={`company-${company.id}`}
                  className="ml-3 flex-1 text-sm text-gray-700 cursor-pointer"
                >
                  {company.name}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            No companies found
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(CompanyList);