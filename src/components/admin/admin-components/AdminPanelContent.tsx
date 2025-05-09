import React from 'react';
import AdminHeader from '../AdminHeader';
import AdminContent from './AdminContent';
import AdminPanelModals from './AdminPanelModals';
import ErrorAlert from '../../shared/ErrorAlert';

interface AdminPanelContentProps {
  activeTab: 'overview' | 'companies' | 'blog' | 'contacts' | 'admins' | 'subscriptions';
  setActiveTab: (tab: 'overview' | 'companies' | 'blog' | 'contacts' | 'admins' | 'subscriptions') => void;
  handleSignOut: () => void;
  canAddCompany: boolean;
  handleAddCompany: (() => void) | undefined;
  showAddCompany: boolean;
  setShowAddCompany: (show: boolean) => void;
  showEditCompany: boolean;
  setShowEditCompany: (show: boolean) => void;
  filteredData: any;
  reviewFilters: any;
  companyManagement: any;
  handleDeleteCompany: (companyId: string) => Promise<void>;
  blogManagement: any;
  fetchData: () => Promise<void>;
  error: string | null;
}

/**
 * Main content component for the admin panel
 * Handles rendering the header, content, and modals
 */
const AdminPanelContent: React.FC<AdminPanelContentProps> = ({
  activeTab,
  setActiveTab,
  handleSignOut,
  canAddCompany,
  handleAddCompany,
  showAddCompany,
  setShowAddCompany,
  showEditCompany,
  setShowEditCompany,
  filteredData,
  reviewFilters,
  companyManagement,
  handleDeleteCompany,
  blogManagement,
  fetchData,
  error
}) => {
  return (
    <>
      <AdminHeader
        onSignOut={handleSignOut}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="mb-6">
            <ErrorAlert 
              message={error} 
              severity="error" 
              onDismiss={() => {}} 
            />
          </div>
        )}
        
        <AdminContent
          activeTab={activeTab}
          showAddCompany={showAddCompany}
          setShowAddCompany={setShowAddCompany}
          showEditCompany={showEditCompany}
          setShowEditCompany={setShowEditCompany}
          filteredData={filteredData}
          reviewFilters={reviewFilters}
          companyManagement={companyManagement}
          handleDeleteCompany={handleDeleteCompany}
          blogManagement={blogManagement}
        />
      </div>

      <AdminPanelModals
        showAddCompany={showAddCompany}
        setShowAddCompany={setShowAddCompany}
        showEditCompany={showEditCompany}
        setShowEditCompany={setShowEditCompany}
        companyManagement={companyManagement}
        blogManagement={blogManagement}
        fetchData={fetchData}
      />
    </>
  );
};

export default React.memo(AdminPanelContent);