import { useState, useCallback } from 'react';
import { useBlogActions } from './useBlogActions';
import { useFormValidation } from '../../useFormValidation';
import type { BlogPost, BlogPostFormData } from '../../../types/blog';

/**
 * Hook for managing blog posts
 * @param onRefresh Callback to refresh data after operations
 * @returns Blog management functions and state
 */
export const useBlogManagement = (onRefresh: () => Promise<void>) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { validateBlogPostForm } = useFormValidation();
  
  // Use blog actions hook
  const {
    loading,
    error,
    editingPost,
    setEditingPost,
    createPost,
    updatePost,
    deletePost,
    togglePublish,
    setError
  } = useBlogActions(onRefresh);
  
  /**
   * Handles adding a new blog post
   */
  const handleAddBlogPost = useCallback(() => {
    setShowAddModal(true);
  }, []);
  
  /**
   * Handles blog post creation
   */
  const handleBlogPostCreated = useCallback(async () => {
    setShowAddModal(false);
    await onRefresh();
  }, [onRefresh]);
  
  /**
   * Handles editing an existing blog post
   */
  const handleEditBlogPost = useCallback(async (post: BlogPost) => {
    try {
      setEditingPost(post);
      setShowEditModal(true);
      return post;
    } catch (error) {
      console.error('Error editing post:', error);
      throw error;
    }
  }, [setEditingPost]);
  
  /**
   * Handles deleting a blog post
   */
  const handleDeletePost = useCallback(async (postId: string) => {
    try {
      await deletePost(postId);
      return true;
    } catch (err) {
      console.error('Error deleting post:', err);
      return false;
    }
  }, [deletePost]);
  
  /**
   * Handles toggling a blog post's published status
   */
  const handleTogglePublish = useCallback(async (postId: string, published: boolean) => {
    try {
      await togglePublish(postId, published);
    } catch (err) {
      console.error('Error toggling publish status:', err);
    }
  }, [togglePublish]);
  
  /**
   * Handles submitting an edited blog post
   */
  const handleEditSubmit = useCallback(async (formData: BlogPostFormData) => {
    try {
      if (!editingPost?.id) {
        throw new Error('No post ID for editing');
      }
      
      // Validate form data
      const validation = validateBlogPostForm(formData);
      if (!validation.success) {
        setError(validation.error || 'Invalid form data');
        return;
      }
      
      await updatePost(editingPost.id, formData);
      setShowEditModal(false);
      setEditingPost(null);
    } catch (err) {
      console.error('Error updating blog post:', err);
      setError(err instanceof Error ? err.message : 'Failed to update blog post');
    }
  }, [editingPost, updatePost, validateBlogPostForm, setError]);

  return {
    // State
    loading,
    error,
    editingPost,
    showAddModal,
    showEditModal,
    
    // Actions
    setShowAddModal,
    setShowEditModal,
    setEditingPost,
    handleAddBlogPost,
    handleBlogPostCreated,
    handleEditBlogPost,
    handleDeletePost,
    handleTogglePublish,
    handleEditSubmit
  };
};

export default useBlogManagement;