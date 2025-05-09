import React, { useState } from 'react';
import { Building2, ExternalLink, Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import ImageWithFallback from '../../../shared/ImageWithFallback';
import Button from '../../../shared/Button';
import CompanyReviews from './CompanyReviews';

interface CompaniesTableProps {
  companies: any[];
  tasks: any[];
  getCompanyReviews: (companyId: string) => any[];
  onEdit: (company: any) => void;
  onDelete: (companyId: string) => void;
}

/**
 * Table component for displaying companies
 */
const CompaniesTable: React.FC<CompaniesTableProps> = ({
  companies,
  tasks,
  getCompanyReviews,
  onEdit,
  onDelete,
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  
  const toggleRow = (companyId: string) => {
    setExpandedRow(expandedRow === companyId ? null : companyId);
  };

  if (isMobile) {
    return (
      <div className="divide-y divide-gray-200">
        {companies.map((company) => {
          const isExpanded = expandedRow === company.id;
          const companyReviews = getCompanyReviews(company.id);
          
          return (
            <div key={company.id} className="py-4">
              <div 
                className="flex items-center justify-between px-4 py-2 cursor-pointer"
                onClick={() => toggleRow(company.id)}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 mr-3">
                    {company.logo_url ? (
                      <ImageWithFallback 
                        src={company.logo_url} 
                        fallbackSrc="/icon-192.png"
                        alt={`${company.name} logo`}
                        className="h-10 w-10 rounded-lg object-contain border border-gray-200 p-1"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{company.name}</div>
                    <div className="text-xs text-gray-500">
                      {companyReviews.length} reviews
                    </div>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
              </div>
              
              {isExpanded && (
                <div className="mt-2 px-4">
                  <CompanyReviews companyReviews={companyReviews} />
                  
                  <div className="mt-3 flex flex-col gap-2">
                    <Button
                      as={Link}
                      to={`/admin/companies/${company.id}`}
                      variant="primary"
                      size="sm"
                      className="w-full"
                      leftIcon={<ExternalLink className="h-4 w-4" />}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onEdit(company)}
                      className="w-full"
                      leftIcon={<Pencil className="h-4 w-4" />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(company.id)}
                      className="w-full"
                      leftIcon={<Trash2 className="h-4 w-4" />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reviews
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {companies.map((company) => (
            <tr key={company.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 mr-4">
                    {company.logo_url ? (
                      <ImageWithFallback 
                        src={company.logo_url} 
                        fallbackSrc="/icon-192.png"
                        alt={`${company.name} logo`}
                        className="h-10 w-10 rounded-lg object-contain border border-gray-200 p-1"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                    )}
                  </div>
                  <Link 
                    to={`/admin/companies/${company.id}`}
                    className="flex items-center hover:text-indigo-600 transition-colors"
                  >
                    <div className="text-sm font-medium text-gray-900 hover:text-indigo-600">{company.name}</div>
                  </Link>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <CompanyReviews companyReviews={getCompanyReviews(company.id)} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <Button
                    as={Link}
                    to={`/admin/companies/${company.id}`}
                    variant="primary"
                    size="sm"
                    aria-label="View details"
                    leftIcon={<ExternalLink className="h-5 w-5" />}
                  >
                    
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(company)}
                    aria-label="Edit company"
                    leftIcon={<Pencil className="h-5 w-5 text-blue-600" />}
                  >
                    
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(company.id)}
                    aria-label="Delete company"
                    leftIcon={<Trash2 className="h-5 w-5 text-red-600" />}
                  >
                    
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(CompaniesTable);