import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { BlogPost, BlogPostFormData } from '../types/blog';
import { useAdminStore } from './admin/store';
import { useClientSide } from './useClientSide';

/**
 * Hook for fetching and managing blog posts
 * @returns Blog posts state and functions
 */
export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isClient = useClientSide();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  
  // Only use the admin store hook when on client side
  useEffect(() => {
    if (isClient) {
      try {
        const { isSuperAdmin: adminStatus } = useAdminStore.getState();
        setIsSuperAdmin(adminStatus);
      } catch (err) {
        console.error('Error accessing admin store:', err);
      }
    }
  }, [isClient]);

  /**
   * Fetches all blog posts
   */
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Adds a new blog post
   * @param data Blog post data
   * @returns Created blog post
   */
  const addPost = useCallback(async (data: BlogPostFormData) => {
    try {
      // Check if user is a superadmin
      if (!isSuperAdmin) {
        throw new Error('Only superadmins can add blog posts');
      }

      setIsSubmitting(true);
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

      // Refresh posts
      await fetchPosts();

      return newPost;
    } catch (err) {
      console.error('Error creating blog post:', err);
      setError(err instanceof Error ? err.message : 'Failed to create blog post');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [fetchPosts, isSuperAdmin]);

  /**
   * Updates an existing blog post
   * @param postId Blog post ID
   * @param data Updated blog post data
   * @returns Updated blog post
   */
  const editPost = useCallback(async (postId: string, data: BlogPostFormData) => {
    try {
      // Check if user is a superadmin
      if (!isSuperAdmin) {
        throw new Error('Only superadmins can edit blog posts');
      }

      setIsSubmitting(true);
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

      // Refresh posts
      await fetchPosts();

      return updatedPost;
    } catch (err) {
      console.error('Error updating blog post:', err);
      setError(err instanceof Error ? err.message : 'Failed to update blog post');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [fetchPosts, isSuperAdmin]);

  /**
   * Deletes a blog post
   * @param postId Blog post ID
   * @returns Success status
   */
  const deletePost = useCallback(async (postId: string) => {
    try {
      // Check if user is a superadmin
      if (!isSuperAdmin) {
        throw new Error('Only superadmins can delete blog posts');
      }

      setIsSubmitting(true);
      setError(null);

      const { error: deleteError } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (deleteError) throw deleteError;

      // Refresh posts
      await fetchPosts();

      return true;
    } catch (err) {
      console.error('Error deleting blog post:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete blog post');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [fetchPosts, isSuperAdmin]);

  /**
   * Toggles a blog post's published status
   * @param postId Blog post ID
   * @param published New published status
   */
  const togglePublish = useCallback(async (postId: string, published: boolean) => {
    try {
      // Check if user is a superadmin
      if (!isSuperAdmin) {
        throw new Error('Only superadmins can toggle blog post publish status');
      }

      setIsSubmitting(true);
      setError(null);

      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({ published })
        .eq('id', postId);

      if (updateError) throw updateError;

      // Refresh posts
      await fetchPosts();
    } catch (err) {
      console.error('Error updating blog post publish status:', err);
      setError(err instanceof Error ? err.message : 'Failed to update blog post publish status');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [fetchPosts, isSuperAdmin]);

  // Fetch posts on mount, but only on the client side
  useEffect(() => {
    if (isClient) {
      fetchPosts();
    }
  }, [fetchPosts, isClient]);

  return {
    posts,
    loading,
    error,
    isSubmitting,
    fetchPosts,
    addPost,
    editPost,
    deletePost,
    togglePublish
  };
};