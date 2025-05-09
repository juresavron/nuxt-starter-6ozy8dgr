import React from 'react';
import { motion } from 'framer-motion';
import { useConfirmDelete } from '../../../hooks/useConfirmDelete';
import { Plus, Building2 } from 'lucide-react';
import { translations } from '../../../translations/sl';
import Button from '../../shared/Button';
import CompaniesTable from './companies/CompaniesTable';
import { useAdminStore } from '../../../hooks/admin/store';
import LoadingSpinner from '../../shared/LoadingSpinner';

interface CompaniesProps {
  companies: any[];
  tasks: any[];
  reviews: any[];
  loading?: boolean;
  onEditCompany: (company: any) => void;
  onDeleteCompany: (companyId: string) => Promise<void>;
  onAddCompany?: () => void;
}

/**
 * Companies section of the admin panel
 */
const Companies: React.FC<CompaniesProps> = ({
  companies = [],
  tasks = [],
  reviews = [],
  loading = false,
  onEditCompany,
  onDeleteCompany,
  onAddCompany
}) => {
  const { confirmDelete } = useConfirmDelete();
  const { isSuperAdmin } = useAdminStore();

  // Show loading spinner while fetching
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] py-12">
        <LoadingSpinner size="lg" color="indigo" />
        <p className="ml-4 text-gray-600">Loading companies...</p>
      </div>
    );
  }

  // Show empty state if no companies found
  if (!loading && companies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] text-center text-gray-500">
        <p className="text-lg font-medium">No companies found</p>
        <p className="text-sm mt-1">Once you add a company, it will appear here.</p>
        {isSuperAdmin && onAddCompany && (
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={onAddCompany}
            className="mt-4"
          >
            Add Company
          </Button>
        )}
      </div>
    );
  }

  // Get reviews for a company
  const getCompanyReviews = (companyId: string) => {
    return reviews.filter(review => review.company_id === companyId);
  };

  // Handle company deletion
  const handleDelete = async (companyId: string) => {
    const confirmed = await confirmDelete({
      title: translations.app.admin.company.deleteTitle,
      message: translations.app.admin.company.deleteConfirmMessage || translations.app.admin.company.deleteConfirm,
      confirmText: translations.app.admin.company.deleteConfirmButton,
      cancelText: translations.app.admin.company.deleteCancelButton
    });

    if (confirmed) {
      await onDeleteCompany(companyId);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 flex items-center gap-2">
            <Building2 className="h-6 w-6 text-blue-600" />
            <span>{translations.app.admin.companies.title}</span>
          </h2>
          {/* Only show Add Company button if user is a superadmin */}
          {isSuperAdmin && onAddCompany && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={onAddCompany}
            >
              {translations.app.admin.addCompany}
            </Button>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <CompaniesTable
            companies={companies}
            tasks={tasks}
            getCompanyReviews={getCompanyReviews}
            onEdit={company => {
              console.log('Edit button clicked for company:', company.name);
              onEditCompany(company);
            }}
            onDelete={handleDelete}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(Companies);