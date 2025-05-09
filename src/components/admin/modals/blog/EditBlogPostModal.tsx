import React, { useState, useEffect } from 'react';
import Modal from '../../../shared/Modal';
import Button from '../../../shared/Button';
import ErrorAlert from '../../../shared/ErrorAlert';
import { ErrorSeverity } from '../../../../utils/errorHandler';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { useTranslations } from '../../../../hooks/useTranslations';
import BlogForm from './form/BlogForm';
import type { BlogPost, BlogPostFormData } from '../../../../types/blog';

interface EditBlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BlogPostFormData) => Promise<void>;
  post: BlogPost;
  isSubmitting?: boolean;
  error?: string | null;
}

/**
 * Modal for editing an existing blog post
 */
const EditBlogPostModal: React.FC<EditBlogPostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  post,
  isSubmitting = false,
  error = null
}) => {
  const { validateBlogPostForm } = useFormValidation();
  const translations = useTranslations();
  
  // Form state
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: '',
    content: '',
    author: '',
    excerpt: '',
    published: false,
    cover_image: ''
  });
  
  const [localError, setLocalError] = useState<string | null>(null);

  // Initialize form data when post changes
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        content: post.content || '',
        author: post.author || '',
        excerpt: post.excerpt || '',
        published: post.published || false,
        cover_image: post.cover_image || ''
      });
    }
  }, [post]);

  if (!isOpen) return null;

  // Handle form field changes
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    
    try {
      // Client-side validation
      const validation = validateBlogPostForm(formData);
      if (!validation.success) {
        setLocalError(validation.error);
        return;
      }
      
      await onSubmit({
        ...formData,
        id: post.id // Make sure to include the post ID
      });
      
      // Close modal after successful submission
      onClose();
    } catch (err) {
      // Error is handled by the parent component
      setLocalError(err instanceof Error ? err.message : translations?.app?.admin?.blog?.error?.updateFailed || 'Failed to update blog post');
    }
  };

  const displayError = localError || error;
  const t = translations?.app?.admin?.blog?.formFields || {};

  return (
    <Modal
      title={translations?.app?.admin?.blog?.editPost || 'Edit Post'}
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            {translations?.app?.admin?.company?.form?.cancel || 'Cancel'}
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            {isSubmitting 
              ? t.saving || 'Saving...' 
              : t.save || 'Save Changes'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <BlogForm 
          formData={formData}
          onChange={handleChange}
          isSubmitting={isSubmitting}
        />

        {displayError && (
          <ErrorAlert 
            message={displayError} 
            severity={ErrorSeverity.ERROR}
          />
        )}
      </form>
    </Modal>
  );
};

export default React.memo(EditBlogPostModal);