import { supabase } from '../../../../lib/supabase';
import { retryWithBackoff } from '../utils';
import type { Database } from '../../../../types/database';

type Review = Database['public']['Tables']['reviews']['Row'];

/**
 * Fetch reviews from Supabase in batches with improved retry logic
 * @param isSuperAdmin Whether the current user is a superadmin
 * @param assignedCompanyIds Company IDs assigned to the current user
 * @returns Array of reviews
 */
export async function fetchReviews(
  isSuperAdmin: boolean,
  assignedCompanyIds: string[]
): Promise<Review[]> {
  // First check browser online status
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    throw new Error('You appear to be offline. Please check your internet connection and try again.');
  }

  const allReviews: Review[] = [];
  console.log('reviewFetcher: Starting to fetch reviews in batches');
  
  try {
    let offset = 0;
    const batchSize = 1000;

    while (true) {
      console.log(`reviewFetcher: Fetching reviews batch: offset=${offset}, limit=${batchSize}`);
      
      try {
        // Create AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort();
        }, 30000); // 30 second timeout per batch

        const batch = await retryWithBackoff(async () => {
          try {
            let reviewsQuery = supabase
              .from('reviews')
              .select('*')
              .order('created_at', { ascending: false })
              .range(offset, offset + batchSize - 1)
              .abortSignal(controller.signal);

            if (!isSuperAdmin && assignedCompanyIds.length > 0) {
              reviewsQuery = reviewsQuery.in('company_id', assignedCompanyIds);
            }
            
            const { data, error } = await reviewsQuery;

            if (error) {
              // Add more informative error message for network-related errors
              if (error.message && (
                error.message.includes('Failed to fetch') || 
                error.message.includes('Network error') ||
                error.message.includes('timeout') ||
                error.message.includes('Unable to connect')
              )) {
                console.error('reviewFetcher: Network error while fetching reviews:', error);
                throw new Error(
                  'Network error: Unable to connect to the server. Please check:\n\n' +
                  '1. Your internet connection\n' +
                  '2. That you\'re logged in\n' +
                  '3. Try refreshing the page\n\n' +
                  'If the problem persists, please contact support.'
                );
              }
              
              console.error('reviewFetcher: Error fetching reviews batch:', error);
              throw error;
            }
            
            return data || [];
          } finally {
            clearTimeout(timeoutId);
          }
        }, 5, 3000); // 5 retries, starting at 3 second delay
        
        if (!batch || batch.length === 0) {
          console.log('reviewFetcher: No more reviews to fetch');
          break;
        }

        console.log(`reviewFetcher: Received batch with ${batch.length} reviews`);
        allReviews.push(...batch);
        
        if (batch.length < batchSize) {
          console.log('reviewFetcher: Last batch is smaller than batch size, stopping');
          break;
        }
        
        offset += batchSize;
      } catch (error) {
        console.error('reviewFetcher: Error in batch fetching:', error);
        // If this is not a JWT or auth error (which we don't want to retry),
        // then we'll add the error message to the log and continue with what we have
        if (!error.message?.includes('JWT') && 
            !error.message?.includes('auth') &&
            !error.message?.includes('session') &&
            !error.message?.includes('token')) {
          console.warn('reviewFetcher: Continuing with partial results due to error:', error.message);
          break; // Continue with what we have so far
        } else {
          // For auth errors, we need to rethrow to trigger proper auth handling
          throw error;
        }
      }
    }
  } catch (error) {
    // If we're seeing network errors, provide a more helpful message
    if (error.message?.includes('Failed to fetch') || 
        error.message?.includes('Network error') ||
        error.message?.includes('timeout') ||
        error.message?.includes('Unable to connect')) {
      throw new Error(
        'Network error: Unable to connect to the server. Please check:\n\n' +
        '1. Your internet connection\n' +
        '2. That you\'re logged in\n' +
        '3. Try refreshing the page\n\n' +
        'If the problem persists, please contact support.'
      );
    }
    
    // Rethrow other errors
    throw error;
  }
  
  console.log(`reviewFetcher: Total reviews fetched: ${allReviews.length}`);
  return allReviews;
}