import { useMemo } from 'react';
import { useBlogPosts } from '../useBlogPosts'; 
import { useTranslations } from '../useTranslations';
import { useClientSide } from '../useClientSide';
import { formatDate } from '../../utils/date';

/**
 * Hook for blog section
 * @returns Blog section data and state
 */
export const useBlog = () => {
  const isClient = useClientSide();
  const translations = useTranslations();
  const { posts = [], loading, error } = useBlogPosts();
  
  // Filter published posts
  const publishedPosts = useMemo(() => 
    posts?.filter(post => post.published) || [], 
    [posts]
  );
  
  // Format date function
  const formatPostDate = useMemo(() => 
    (date: string) => formatDate(date),
    []
  );
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return {
    isClient,
    translations,
    posts,
    publishedPosts,
    loading,
    error,
    formatPostDate,
    containerVariants,
    itemVariants,
    hasPosts: publishedPosts.length > 0
  };
};