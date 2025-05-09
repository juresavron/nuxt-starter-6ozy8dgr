/**
 * Blog post type definitions
 */

/**
 * Blog post data from database
 */
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  author: string;
  cover_image?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Blog post form data for creating/editing
 */
export interface BlogPostFormData {
  id?: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  published?: boolean;
  cover_image?: string;
}