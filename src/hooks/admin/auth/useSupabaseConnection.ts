import { useCallback } from 'react';
import { supabase } from '../../../lib/supabase';

/**
 * Hook for testing Supabase connection
 * @returns Functions for testing Supabase connection
 */
export const useSupabaseConnection = () => {
  /**
   * Tests Supabase connection with retries and timeout
   * @returns Promise resolving to connection test result
   */
  const testSupabaseConnection = useCallback(async () => {
    try {
      console.log('useSupabaseConnection: Testing Supabase connection...');
      
      // First check if we have the required environment variables
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        console.error('useSupabaseConnection: Missing Supabase configuration:', {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseAnonKey
        });
        return {
          success: false,
          error: new Error('Supabase configuration is missing. Please check your environment variables.')
        };
      }
      
      // Use AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.warn('useSupabaseConnection: Connection test timeout - aborting operation after 20 seconds');
        controller.abort('Connection test timeout after 20 seconds');
      }, 20000); // Reduced timeout to 20 seconds
      
      // Add retry logic for connection test
      const maxRetries = 3; // Reduced max retries
      let retryCount = 0;
      let lastError = null;

      while (retryCount < maxRetries) {
        try {
          console.log(`useSupabaseConnection: Connection test attempt ${retryCount + 1}/${maxRetries}`);
          
          // Try a more reliable and simpler query first
          const result = await supabase
            .from('companies')
            .select('count')
            .limit(1)
            .abortSignal(controller.signal);
          
          clearTimeout(timeoutId);
          
          if (!result.error) {
            console.log('useSupabaseConnection: Connection test successful', result);
            return { success: true, data: result.data };
          }
          
          console.warn('useSupabaseConnection: Connection failed with error:', result.error);
          lastError = result.error;
          
          // Check for specific error types to give better feedback
          if (result.error.message?.includes('Failed to fetch') || 
              result.error.message?.includes('NetworkError')) {
            console.error('useSupabaseConnection: Network error detected');
          } else if (result.error.message?.includes('JWT')) {
            console.error('useSupabaseConnection: Authentication error detected');
          } else if (result.error.code === '42P01') {
            console.error('useSupabaseConnection: Table not found error - schema may be incorrect');
          }
          
          retryCount++;
          
          if (retryCount < maxRetries) {
            // Exponential backoff with jitter: 2s, 4s, 8s
            const baseDelay = 2000; // Reduced base delay
            const jitter = Math.random() * 500;
            const delay = (baseDelay * Math.pow(2, retryCount)) + jitter;
            console.log(`useSupabaseConnection: Retrying in ${Math.round(delay/1000)}s...`);
            await new Promise(resolve => 
              setTimeout(resolve, delay)
            );
          }
        } catch (e) {
          console.error('useSupabaseConnection: Error during connection test:', e);
          lastError = e;
          retryCount++;
          
          if (retryCount < maxRetries) {
            const baseDelay = 2000;
            const jitter = Math.random() * 500;
            const delay = (baseDelay * Math.pow(2, retryCount)) + jitter;
            console.log(`useSupabaseConnection: Retrying in ${Math.round(delay/1000)}s...`);
            await new Promise(resolve => 
              setTimeout(resolve, delay)
            );
          }
        }
      }

      if (lastError) {
        console.error('useSupabaseConnection: All connection test attempts failed');
        
        // Analyze the error to provide more specific error messages
        let errorMessage = 'Unable to connect to the server. Please check your network connection and try again.';
        
        if (lastError.message) {
          if (lastError.message.includes('Failed to fetch') || lastError.message.includes('NetworkError')) {
            errorMessage = 'Network error: Unable to connect to Supabase. Check your network connection and CORS settings.';
          } else if (lastError.message.includes('JWT') || lastError.message.includes('auth')) {
            errorMessage = 'Authentication error: Your session may have expired. Please try logging in again.';
          } else if (lastError.message.includes('timeout')) {
            errorMessage = 'Connection timeout: The server took too long to respond. Please try again later.';
          } else if (lastError.message.includes('permission')) {
            errorMessage = 'Permission error: You don\'t have access to this resource. Please check your permissions.';
          } else if (lastError.message.includes('not found') || lastError.code === '42P01') {
            errorMessage = 'Schema error: The required database tables could not be found. Please check your database schema.';
          }
        }
        
        return { 
          success: false, 
          error: new Error(errorMessage),
          details: lastError.message || 'No additional error details available'
        };
      }
      
      return { 
        success: false,
        error: new Error('Connection test failed for unknown reasons')
      };
    } catch (err) {
      console.error('useSupabaseConnection: Unexpected error during connection test:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err : new Error('Unknown error during connection test')
      };
    }
  }, []);

  return { testSupabaseConnection };
};

export default useSupabaseConnection;