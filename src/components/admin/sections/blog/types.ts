import type { BlogPost, BlogPostFormData } from '../../../../types/blog';

export interface BlogPostsProps {
  posts?: BlogPost[];
  onAddPost: () => void;
  onEditPost: (post: BlogPost) => Promise<any>;
  onDeletePost: (postId: string) => Promise<boolean>;
  onTogglePublish: (postId: string, published: boolean) => void;
}

export interface BlogPostItemProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (postId: string) => void;
  onTogglePublish: (postId: string, published: boolean) => void;
  isSuperAdmin: boolean;
  isMobile: boolean;
}

export interface BlogHeaderProps {
  onAddPost: () => void;
  isSuperAdmin: boolean;
  isMobile: boolean;
  title: string;
}

export interface BlogEmptyStateProps {
  onAddPost: () => void;
  isSuperAdmin: boolean;
}

export interface BlogPostsListProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (postId: string) => void;
  onTogglePublish: (postId: string, published: boolean) => void;
  isSuperAdmin: boolean;
  isMobile: boolean;
}

export interface AddBlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export interface EditBlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BlogPostFormData) => Promise<void>;
  post: BlogPost;
  isSubmitting?: boolean;
  error?: string | null;
}

export interface BlogModalsProps {
  showAddBlogModal: boolean;
  setShowAddBlogModal: (show: boolean) => void;
  showEditBlogModal: boolean;
  setShowEditBlogModal: (show: boolean) => void;
  editingBlogPost: BlogPost | null;
  setEditingBlogPost: (post: BlogPost | null) => void;
  fetchData: () => Promise<void>;
}