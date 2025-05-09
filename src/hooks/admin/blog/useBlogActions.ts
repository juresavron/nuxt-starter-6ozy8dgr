import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import type { BlogPost, BlogPostFormData } from '../../../types/blog';

/**
 * Hook for blog post CRUD operations
 * @param onRefresh Callback to refresh data after operations
 * @returns Blog post action functions and state
 */
export const useBlogActions = (onRefresh: () => Promise<void>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  /**
   * Creates a new blog post
   * @param data Blog post data
   * @returns Created blog post
   */
  const createPost = useCallback(async (data: BlogPostFormData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Generate slug from title
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      // Generate excerpt if not provided
      const excerpt = data.excerpt || data.content.substring(0, 160) + '...';
      
      const { data: newPost, error: createError } = await supabase
        .from('blog_posts')
        .insert({
          title: data.title.trim(),
          content: data.content.trim(),
          author: data.author.trim(),
          slug,
          excerpt: excerpt.trim(),
          published: Boolean(data.published),
          cover_image: data.cover_image?.trim() || null
        })
        .select()
        .single();

      if (createError) throw createError;
      
      // Refresh data
      await onRefresh();
      
      return newPost;
    } catch (err) {
      console.error('Error creating blog post:', err);
      setError(err instanceof Error ? err.message : 'Failed to create blog post');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [onRefresh]);

  /**
   * Updates an existing blog post
   * @param postId Blog post ID
   * @param data Updated blog post data
   * @returns Updated blog post
   */
  const updatePost = useCallback(async (postId: string, data: BlogPostFormData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Generate excerpt if not provided
      let excerpt = data.excerpt;
      if (!excerpt && data.content) {
        excerpt = data.content.substring(0, 160);
        if (data.content.length > 160) excerpt += '...';
      }
      
      const { data: updatedPost, error: updateError } = await supabase
        .from('blog_posts')
        .update({
          title: data.title.trim(),
          content: data.content.trim(),
          author: data.author.trim(),
          excerpt: excerpt ? excerpt.trim() : null,
          published: Boolean(data.published),
          cover_image: data.cover_image?.trim() || null
        })
        .eq('id', postId)
        .select()
        .single();

      if (updateError) throw updateError;
      
      // Refresh data
      await onRefresh();
      
      return updatedPost;
    } catch (err) {
      console.error('Error updating blog post:', err);
      setError(err instanceof Error ? err.message : 'Failed to update blog post');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [onRefresh]);

  /**
   * Deletes a blog post
   * @param postId Blog post ID
   * @returns Success status
   */
  const deletePost = useCallback(async (postId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { error: deleteError } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (deleteError) throw deleteError;
      
      // Refresh data
      await onRefresh();
      
      return true;
    } catch (err) {
      console.error('Error deleting blog post:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete blog post');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [onRefresh]);

  /**
   * Toggles a blog post's published status
   * @param postId Blog post ID
   * @param published New published status
   */
  const togglePublish = useCallback(async (postId: string, published: boolean) => {
    try {
      setLoading(true);
      setError(null);

      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({ published })
        .eq('id', postId);

      if (updateError) throw updateError;
      
      // Refresh data
      await onRefresh();
    } catch (err) {
      console.error('Error updating blog post publish status:', err);
      setError(err instanceof Error ? err.message : 'Failed to update blog post publish status');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [onRefresh]);

  return {
    loading,
    error,
    editingPost,
    setEditingPost,
    createPost,
    updatePost,
    deletePost,
    togglePublish,
    setError
  };
};

export default useBlogActions;