import React from 'react';
import { Pencil, Trash2, Share2 } from 'lucide-react';
import { useTranslations } from '../../../../hooks/useTranslations';
import { formatDate } from '../../../../utils/date';
import type { BlogPostItemProps } from './types';

/**
 * Component for displaying a single blog post item in the list
 */
const BlogPostItem: React.FC<BlogPostItemProps> = ({
  post,
  onEdit,
  onDelete,
  onTogglePublish,
  isSuperAdmin,
  isMobile
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.blog;

  return (
    <li className="border-b border-gray-100 last:border-b-0">
      <div className="px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">
              {post.title}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              {post.author} • {formatDate(post.created_at)}
            </p>
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => onTogglePublish(post.id, post.published)}
              className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium ${
                post.published
                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
              }`}
            >
              {post.published 
                ? (isMobile 
                    ? t?.live || 'Live' 
                    : t?.published || 'Published') 
                : t?.draft || 'Draft'}
            </button>
            
            <button
              onClick={() => onEdit(post)}                    
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-label="Edit post"
              title={t?.editPost || "Edit post"}
            >
              <Pencil className="h-5 w-5 text-blue-500" />
            </button>
            
            <button
              onClick={() => isSuperAdmin && onDelete(post.id)}
              className="p-1 rounded-full text-red-400 hover:text-red-500 hover:bg-red-50"
              disabled={!isSuperAdmin}
              aria-label="Delete post"
              title={t?.deletePost || "Delete post"}
            >
              <Trash2 className="h-5 w-5" />
            </button>
            
            {post.published && (
              <a
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                aria-label="View post"
                title={t?.viewPost || "View post"}
              >
                <Share2 className="h-5 w-5 text-emerald-500" />
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default BlogPostItem;