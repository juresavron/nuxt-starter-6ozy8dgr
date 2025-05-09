import React from 'react';
import { useTranslations } from '../../../../../hooks/useTranslations';
import BlogTitleField from './BlogTitleField';
import BlogAuthorField from './BlogAuthorField';
import BlogContentField from './BlogContentField';
import BlogExcerptField from './BlogExcerptField';
import CoverImageField from './CoverImageField';
import PublishedToggle from './PublishedToggle';
import type { BlogPostFormData } from '../../../../../types/blog';

interface BlogFormProps {
  formData: BlogPostFormData;
  onChange: (field: string, value: any) => void;
  isSubmitting: boolean;
}

/**
 * Reusable form component for blog posts
 */
const BlogForm: React.FC<BlogFormProps> = ({
  formData,
  onChange,
  isSubmitting
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.blog?.formFields || {};

  return (
    <>
      <BlogTitleField 
        title={formData.title}
        onChange={(value) => onChange('title', value)}
        placeholder={t.titlePlaceholder || 'Enter post title'}
        label={t.title || 'Title'}
        disabled={isSubmitting}
      />

      <BlogAuthorField 
        author={formData.author}
        onChange={(value) => onChange('author', value)}
        placeholder={t.authorPlaceholder || 'Enter author name'}
        label={t.author || 'Author'}
        disabled={isSubmitting}
      />

      <BlogContentField 
        content={formData.content}
        onChange={(value) => onChange('content', value)}
        placeholder={t.contentPlaceholder || 'Write your blog post content here...'}
        label={t.content || 'Content'}
        disabled={isSubmitting}
      />

      <BlogExcerptField 
        excerpt={formData.excerpt}
        onChange={(value) => onChange('excerpt', value)}
        placeholder={t.excerptPlaceholder || 'Enter a short excerpt or summary of the post...'}
        label={t.excerpt || 'Excerpt (optional)'}
        disabled={isSubmitting}
      />

      <CoverImageField 
        coverImage={formData.cover_image}
        onChange={(value) => onChange('cover_image', value)}
        placeholder={t.coverImagePlaceholder || 'https://images.unsplash.com/photo-...'}
        label={t.coverImage || 'Cover Image URL (optional)'}
        disabled={isSubmitting}
      />
      
      <PublishedToggle 
        published={formData.published}
        onChange={(checked) => onChange('published', checked)}
        label={t.published || 'Published'}
        disabled={isSubmitting}
      />
    </>
  );
};

export default BlogForm;