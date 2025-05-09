import React from 'react';
import { useTranslations } from '../../../../hooks/useTranslations';
import { Edit, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react';
import { formatDate } from '../../../../utils/date';
import type { BlogPost } from '../../../../types/blog';

interface BlogPostsListProps {
  blogPosts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (postId: string) => void;
  onTogglePublish: (postId: string, published: boolean) => void;
}

const BlogPostsList: React.FC<BlogPostsListProps> = ({
  blogPosts,
  onEdit,
  onDelete,
  onTogglePublish
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.blog || {};
  
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogPosts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                    {post.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{post.author}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      post.published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {post.published ? (t.published || 'Published') : (t.draft || 'Draft')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(post.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onTogglePublish(post.id, !post.published)}
                      className={`p-1 rounded-md ${
                        post.published
                          ? 'text-yellow-600 hover:text-yellow-900 hover:bg-yellow-100'
                          : 'text-green-600 hover:text-green-900 hover:bg-green-100'
                      }`}
                      title={post.published ? 'Unpublish' : 'Publish'}
                    >
                      {post.published ? (
                        <XCircle className="h-5 w-5" />
                      ) : (
                        <CheckCircle className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={() => onEdit(post)}
                      className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-md"
                      title="Edit"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(post.id)}
                      className="p-1 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-md"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                    {post.published && (
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                        title="View"
                      >
                        <Eye className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogPostsList;