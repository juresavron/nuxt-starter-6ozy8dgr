import React, { useState } from 'react';
import { useBlogPosts } from '../../../hooks/useBlogPosts';
import { useWindowSize } from 'react-use';
import { useAdminStore } from '../../../hooks/admin/store';
import { useTranslations } from '../../../hooks/useTranslations';
import { BlogPosts as BlogPostsComponent } from './blog';
import LoadingSpinner from '../../shared/LoadingSpinner';
import ErrorAlert from '../../shared/ErrorAlert';
import { ErrorSeverity } from '../../../utils/errorHandler';

interface BlogPostsProps {
  posts?: any[];
  onAddPost: () => void;
  onEditPost: (post: any) => Promise<any>;
  onDeletePost: (postId: string) => Promise<boolean>;
  onTogglePublish: (postId: string, published: boolean) => void;
}

/**
 * Blog posts section of the admin panel
 */
const BlogPosts: React.FC<BlogPostsProps> = ({
  posts = [],
  onAddPost,
  onEditPost,
  onDeletePost,
  onTogglePublish,
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 640;
  const translations = useTranslations();
  const { isSuperAdmin } = useAdminStore();
  const {
    loading,
    error,
  } = useBlogPosts();

  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);

  // Handle post deletion
  const handleDelete = async (postId: string) => {
    try {
      setDeleteError(null);
      return await onDeletePost(postId);
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete post');
      return false;
    }
  };

  // Handle publish status toggle
  const handleTogglePublish = async (postId: string, currentlyPublished: boolean) => {
    try {
      setPublishError(null);
      await onTogglePublish(postId, !currentlyPublished);
    } catch (err) {
      setPublishError(err instanceof Error ? err.message : 'Failed to update publish status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] py-12">
        <LoadingSpinner size="lg" color="indigo" />
        <p className="ml-4 text-gray-600">Loading blog posts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {error && (
        <ErrorAlert
          message={error}
          severity={ErrorSeverity.ERROR}
        />
      )}

      {deleteError && (
        <ErrorAlert
          message={deleteError}
          onDismiss={() => setDeleteError(null)}
          severity={ErrorSeverity.ERROR}
        />
      )}

      {publishError && (
        <ErrorAlert
          message={publishError}
          onDismiss={() => setPublishError(null)}
          severity={ErrorSeverity.ERROR}
        />
      )}

      <BlogPostsComponent
        posts={posts}
        onAddPost={onAddPost}
        onEditPost={onEditPost}
        onDeletePost={handleDelete}
        onTogglePublish={handleTogglePublish}
      />
    </div>
  );
};

export default React.memo(BlogPosts);