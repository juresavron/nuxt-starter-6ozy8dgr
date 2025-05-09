import React from 'react';
import { BookOpen, Plus } from 'lucide-react';
import Button from '../../../shared/Button';
import type { BlogHeaderProps } from './types';

/**
 * Header component for the blog posts section
 */
const BlogHeader: React.FC<BlogHeaderProps> = ({
  onAddPost,
  isSuperAdmin,
  isMobile,
  title
}) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 flex items-center gap-2">
        <BookOpen className="h-6 w-6 text-blue-600" />
        <span>{title}</span>
      </h2>
      
      {/* Only superadmins can add blog posts */}
      {isSuperAdmin && (
        <Button
          onClick={onAddPost}
          variant="primary"
          size="sm"
          leftIcon={<Plus className="h-4 w-4" />}
        >
          {isMobile ? 'Dodaj' : title}
        </Button>
      )}
    </div>
  );
};

export default BlogHeader;

export { BlogHeader }