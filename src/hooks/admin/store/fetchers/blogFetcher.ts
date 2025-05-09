import { supabase } from '../../../../lib/supabase';
import { retryWithBackoff } from '../utils';
import type { BlogPost } from '../../../../types/blog';

/**
 * Fetch blog posts from Supabase with improved retry logic
 * @returns Array of blog posts
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  console.log('blogFetcher: Fetching blog posts');
  
  return await retryWithBackoff(async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('blogFetcher: Error fetching blog posts:', error);
      throw error;
    }
    
    console.log(`blogFetcher: Successfully fetched ${data?.length || 0} blog posts`);
    return data as BlogPost[] || [];
  }, 5, 3000); // Increased retries and initial delay
}