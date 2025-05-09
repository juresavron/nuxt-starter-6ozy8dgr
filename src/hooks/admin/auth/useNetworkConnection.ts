import { useCallback } from 'react';
import { supabase } from '../../../lib/supabase';

/**
 * Hook for checking network connection with retries
 * @returns Functions for network connection checks
 */
export const useNetworkConnection = () => {
  /**
   * Checks network connectivity with exponential backoff retries
   * @param maxRetries Maximum number of retry attempts
   * @param initialDelay Initial delay in ms before first retry
   * @returns Promise resolving to boolean indicating connectivity
   */
  const checkNetworkConnection = useCallback(async (maxRetries = 5, initialDelay = 3000): Promise<boolean> => {
    let isNetworkAvailable = false;
    let networkCheckAttempts = 0;
    
    console.log('useNetworkConnection: Starting network connectivity check with', {
      maxRetries,
      initialDelay
    });

    // First check navigator.onLine property
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      console.warn('useNetworkConnection: Browser reports offline status');
      return false;
    }

    while (!isNetworkAvailable && networkCheckAttempts < maxRetries) {
      try {
        console.log(`useNetworkConnection: Network check attempt ${networkCheckAttempts + 1}/${maxRetries}`);
        
        // Try multiple connectivity check methods
        let connectivityChecked = false;
        
        // Method 1: Try a simple OPTIONS request to Supabase URL
        try {
          const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
          if (supabaseUrl) {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            
            const response = await fetch(`${supabaseUrl}/auth/v1/`, {
              method: 'OPTIONS',
              headers: { 'Accept': 'application/json' },
              signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok || response.status === 204) {
              console.log('useNetworkConnection: Supabase OPTIONS request succeeded');
              isNetworkAvailable = true;
              connectivityChecked = true;
            }
          }
        } catch (optionsError) {
          console.warn('useNetworkConnection: Supabase OPTIONS request failed, trying alternate method', optionsError);
        }
        
        // Method 2: Try a public health check endpoint if available
        if (!connectivityChecked) {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            
            // Try a reliable public endpoint that allows CORS
            const response = await fetch('https://www.cloudflare.com/cdn-cgi/trace', {
              method: 'GET',
              signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
              console.log('useNetworkConnection: Public connectivity check succeeded');
              isNetworkAvailable = true;
              connectivityChecked = true;
            }
          } catch (publicCheckError) {
            console.warn('useNetworkConnection: Public connectivity check failed', publicCheckError);
          }
        }
        
        // Method 3: As last resort, try a simple Supabase query
        if (!connectivityChecked) {
          try {
            const { error } = await supabase
              .from('companies')
              .select('count')
              .limit(1)
              .maybeSingle();
            
            if (!error) {
              console.log('useNetworkConnection: Supabase query check succeeded');
              isNetworkAvailable = true;
            } else {
              throw new Error(`Supabase query failed: ${error.message}`);
            }
          } catch (supabaseError) {
            console.warn('useNetworkConnection: Supabase query check failed', supabaseError);
            throw supabaseError; // Rethrow to trigger retry logic
          }
        }

      } catch (error) {
        networkCheckAttempts++;
        console.warn(`useNetworkConnection: Network check attempt ${networkCheckAttempts}/${maxRetries} failed`, error);
        
        if (networkCheckAttempts < maxRetries) {
          // Exponential backoff with jitter for more reliable retries
          const jitter = Math.random() * 1000;
          const delay = Math.pow(2, networkCheckAttempts) * initialDelay + jitter;
          console.log(`useNetworkConnection: Retrying in ${Math.round(delay/1000)}s...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    console.log(`useNetworkConnection: Network check ${isNetworkAvailable ? 'succeeded' : 'failed'} after ${networkCheckAttempts} attempts`);
    return isNetworkAvailable;
  }, []);

  return { checkNetworkConnection };
};

export default useNetworkConnection;