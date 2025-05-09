import React from 'react';
import { motion } from 'framer-motion';
import { Overview, Companies, BlogPosts, ContactRequests, AdminManagement, Subscriptions, Coupons, LotteryEntries } from '../sections';
import { useAdminStore } from "../../../hooks/admin/store";
import { isNonEmptyArray } from '../../../utils/validation';
import Communications from '../sections/Communications';
import { useWindowSize } from 'react-use';

interface AdminContentProps {
  activeTab: 'overview' | 'companies' | 'blog' | 'contacts' | 'admins' | 'subscriptions' | 'coupons' | 'lottery' | 'communications';
  showAddCompany: boolean;
  setShowAddCompany: (show: boolean) => void;
  showEditCompany: boolean;
  setShowEditCompany: (show: boolean) => void;
  filteredData: {
    companies: any[];
    reviews: any[];
    tasks: any[];
    blogPosts: any[]; 
    subscriptions: any[];
    emailLogs?: any[];
    smsLogs?: any[];
  };
  reviewFilters: any;
  companyManagement: {
    editingCompany: any;
    setEditingCompany: (company: any) => void;
    handleEditCompany: (company: any) => void;
  };
  handleDeleteCompany: (companyId: string) => Promise<void>;
  blogManagement: any;
}

/**
 * Content component for the admin panel
 * Renders the appropriate section based on the active tab
 */
const AdminContent: React.FC<AdminContentProps> = ({
  activeTab,
  showAddCompany,
  setShowAddCompany,
  showEditCompany,
  setShowEditCompany,
  filteredData,
  reviewFilters,
  companyManagement,
  handleDeleteCompany,
  blogManagement
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const { companies = [], reviews = [], tasks = [], blogPosts = [], subscriptions = [], emailLogs = [], smsLogs = [] } = filteredData;
  const { isSuperAdmin, assignedCompanyIds } = useAdminStore();
  
  // Calculate stats for overview
  const stats = {
    totalCompanies: companies?.length || 0,
    totalReviews: reviews?.length || 0,
    averageRating: reviews?.length > 0 
      ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length 
      : 0,
    conversionRate: reviews?.length > 0
      ? (reviews.filter(r => r.completed_at).length / reviews.length) * 100
      : 0
  };

  // Add a motion.div wrapper to animate content changes
  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-[300px] pb-20"
    >
      {activeTab === 'overview' ? (
        <Overview
          stats={stats}
          reviews={reviews}
          companies={companies}
          tasks={tasks}
        />
      ) : activeTab === 'companies' ? (
        <Companies
          companies={companies}
          tasks={tasks}
          reviews={reviews}
          onEditCompany={companyManagement.handleEditCompany}
          onDeleteCompany={handleDeleteCompany}
          onAddCompany={() => setShowAddCompany(true)}
        />
      ) : activeTab === 'blog' && isSuperAdmin ? (
        <BlogPosts
          posts={blogPosts}
          onAddPost={blogManagement?.handleAddBlogPost}
          onEditPost={blogManagement?.handleEditBlogPost}
          onDeletePost={blogManagement?.handleDeletePost}
          onTogglePublish={blogManagement?.handleTogglePublish}
        />
      ) : activeTab === 'subscriptions' && isSuperAdmin ? (
        <Subscriptions />
      ) : activeTab === 'coupons' ? (
        <Coupons />
      ) : activeTab === 'lottery' ? (
        <LotteryEntries />
      ) : activeTab === 'subscriptions' ? (
        <Subscriptions />
      ) : activeTab === 'communications' ? (
        <Communications />
      ) : activeTab === 'contacts' && isSuperAdmin ? (
        <ContactRequests />
      ) : (
        <AdminManagement />
      )}
    </motion.div>
  );
};

export default AdminContent;