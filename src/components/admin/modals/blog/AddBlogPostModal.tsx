import React, { useState } from 'react';
import Modal from '../../../shared/Modal';
import Button from '../../../shared/Button';
import ErrorAlert from '../../../shared/ErrorAlert';
import { ErrorSeverity } from '../../../../utils/errorHandler';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { useBlogPosts } from '../../../../hooks/useBlogPosts';
import { useTranslations } from '../../../../hooks/useTranslations';
import BlogForm from './form/BlogForm';
import type { BlogPostFormData } from '../../../../types/blog';

interface AddBlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

/**
 * Modal for adding a new blog post
 */
const AddBlogPostModal: React.FC<AddBlogPostModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { validateBlogPostForm } = useFormValidation();
  const { addPost, isSubmitting, error: hookError } = useBlogPosts();
  const translations = useTranslations();
  
  // Form state
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: '',
    content: '',
    author: 'Admin',
    excerpt: '',
    published: false,
    cover_image: ''
  });
  
  const [localError, setLocalError] = useState<string | null>(null);

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
      
      // Check if addPost function is available
      if (!addPost) {
        setLocalError(translations?.app?.admin?.blog?.error?.unavailable || 'Blog post creation is not available at the moment. Please try again later.');
        return;
      }
      
      const result = await addPost(formData);
      
      if (result) {
        setFormData({
          title: '',
          content: '',
          author: 'Admin',
          excerpt: '',
          published: false,
          cover_image: ''
        });
        
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      console.error('Error creating blog post:', err);
      setLocalError(err instanceof Error ? err.message : translations?.app?.admin?.blog?.error?.createFailed || 'Failed to create blog post');
    }
  };

  const error = localError || hookError;
  const t = translations?.app?.admin?.blog?.formFields || {};

  return (
    <Modal
      title={translations?.app?.admin?.blog?.addPost || 'Add Post'}
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
              ? t.creating || 'Creating...' 
              : t.create || 'Create Post'}
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

        {error && (
          <ErrorAlert 
            message={error} 
            severity={ErrorSeverity.ERROR}
          />
        )}
      </form>
    </Modal>
  );
};

export default React.memo(AddBlogPostModal);