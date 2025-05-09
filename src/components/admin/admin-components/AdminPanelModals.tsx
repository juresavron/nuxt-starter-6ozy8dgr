import React from 'react';
import CompanyModals from '../modals/CompanyModals';
import BlogModals from '../modals/BlogModals';

interface AdminPanelModalsProps {
  showAddCompany: boolean;
  setShowAddCompany: (show: boolean) => void;
  showEditCompany: boolean;
  setShowEditCompany: (show: boolean) => void;
  companyManagement: any;
  blogManagement: any;
  fetchData: () => Promise<void>;
}

/**
 * Component that manages all modals for the admin panel
 * Includes company modals and blog post modals
 */
const AdminPanelModals: React.FC<AdminPanelModalsProps> = ({
  showAddCompany,
  setShowAddCompany,
  showEditCompany,
  setShowEditCompany,
  companyManagement,
  blogManagement,
  fetchData
}) => {
  const { 
    showAddBlogModal, 
    setShowAddBlogModal, 
    showEditBlogModal, 
    setShowEditBlogModal,
    editingBlogPost,
    setEditingBlogPost
  } = blogManagement;

  return (
    <>
      <CompanyModals
        showAddCompany={showAddCompany}
        setShowAddCompany={setShowAddCompany}
        showEditCompany={showEditCompany}
        setShowEditCompany={setShowEditCompany}
        companyManagement={companyManagement}
      />

      {/* Blog Modals */}
      <BlogModals
        showAddBlogModal={showAddBlogModal}
        setShowAddBlogModal={setShowAddBlogModal}
        showEditBlogModal={showEditBlogModal}
        setShowEditBlogModal={setShowEditBlogModal}
        editingBlogPost={editingBlogPost}
        setEditingBlogPost={setEditingBlogPost}
        fetchData={fetchData}
      />
    </>
  );
};

export default React.memo(AdminPanelModals);