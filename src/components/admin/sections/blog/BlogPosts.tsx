import React, { useState, useEffect } from 'react';
import { useAdminStore } from '../../../../hooks/admin/store';
import { useBlogManagement } from '../../../../hooks/admin/blog';
import { useTranslations } from '../../../../hooks/useTranslations';
import { Plus, Edit, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react';
import { formatDate } from '../../../../utils/date';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import ErrorAlert from '../../../shared/ErrorAlert';
import { ErrorSeverity } from '../../../../utils/errorHandler';
import { useConfirmDelete } from '../../../../hooks/useConfirmDelete';
import BlogEmptyState from './BlogEmptyState';
import BlogPostsList from './BlogPostsList';

// Import modals from the modals directory
import AddBlogPostModal from '../../modals/blog/AddBlogPostModal';
import EditBlogPostModal from '../../modals/blog/EditBlogPostModal';

const BlogPosts: React.FC = () => {
  const { blogPosts, loading, error, fetchData } = useAdminStore();
  const translations = useTranslations();
  const t = translations?.app?.admin?.blog || {};
  const { confirmDelete } = useConfirmDelete();
  
  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Blog management hooks
  const {
    editingPost,
    setEditingPost,
    handleAddBlogPost,
    handleBlogPostCreated,
    handleEditBlogPost,
    handleEditSubmit,
    handleDeletePost,
    handleTogglePublish
  } = useBlogManagement(fetchData);
  
  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  // Handle delete confirmation
  const handleConfirmDelete = async (postId: string) => {
    const confirmed = await confirmDelete({
      title: t.deleteTitle || 'Delete Blog Post',
      message: t.deleteConfirm || 'Are you sure you want to delete this blog post? This action cannot be undone.',
      confirmText: t.deleteButton || 'Delete',
      cancelText: 'Cancel'
    });
    
    if (confirmed) {
      await handleDeletePost(postId);
    }
  };
  
  // Render loading state
  if (loading && !blogPosts.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className="p-4">
        <ErrorAlert 
          message={error} 
          severity={ErrorSeverity.ERROR} 
        />
      </div>
    );
  }
  
  // Render empty state
  if (!blogPosts.length) {
    return (
      <BlogEmptyState 
        onAddPost={() => setShowAddModal(true)} 
      />
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {t.title || 'Blog Posts'}
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>{t.addShort || 'Add'}</span>
        </button>
      </div>
      
      {/* Blog posts list */}
      <BlogPostsList 
        blogPosts={blogPosts}
        onEdit={async (post) => {
          const editData = await handleEditBlogPost(post);
          if (editData) {
            setShowEditModal(true);
          }
        }}
        onDelete={handleConfirmDelete}
        onTogglePublish={handleTogglePublish}
      />
      
      {/* Modals */}
      <AddBlogPostModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onBlogCreated={handleBlogPostCreated}
      />
      
      {editingPost && (
        <EditBlogPostModal 
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingPost(null);
          }}
          post={editingPost}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default BlogPosts;