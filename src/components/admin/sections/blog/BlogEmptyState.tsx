import React from 'react';
import { useTranslations } from '../../../../hooks/useTranslations';
import { FileText, Plus } from 'lucide-react';

interface BlogEmptyStateProps {
  onAddPost: () => void;
}

const BlogEmptyState: React.FC<BlogEmptyStateProps> = ({ onAddPost }) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.blog || {};
  
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
        <FileText className="h-8 w-8 text-indigo-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {t.noPosts || 'No Blog Posts'}
      </h3>
      <p className="text-gray-500 text-center mb-6 max-w-md">
        {t.noPostsMessage || 'Create your first blog post to share with your audience.'}
      </p>
      <button
        onClick={onAddPost}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span>{t.addPost || 'Add Post'}</span>
      </button>
    </div>
  );
};

export default BlogEmptyState;