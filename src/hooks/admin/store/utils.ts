import { supabase } from '../../../lib/supabase';

/**
 * Check if the browser is online
 * @returns boolean indicating if the browser is online
 */
const isOnline = (): boolean => {
  return typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true; // Assume online if we can't detect
};

/**
 * Check network connectivity with retries
 */
export const checkNetworkConnection = async (maxRetries = 3, initialDelay = 2000): Promise<boolean> => {
  // First check if the browser reports being offline
  if (!isOnline()) {
    console.warn('Browser reports offline status');
    return false;
  }
  
  let retryCount = 0;
  
  while (retryCount < maxRetries) {
    try {
      // Test connection by making a lightweight query
      const { error } = await supabase
        .from('companies')
        .select('count')
        .limit(1)
        .single();
      
      if (!error) {
        return true;
      }
      
      console.warn(`Network check attempt ${retryCount + 1} failed:`, error);
      retryCount++;
      
      if (retryCount < maxRetries) {
        // Exponential backoff with jitter
        const delay = initialDelay * Math.pow(2, retryCount) * (0.9 + Math.random() * 0.2);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (err) {
      console.error(`Network check attempt ${retryCount + 1} error:`, err);
      retryCount++;
      
      if (retryCount < maxRetries) {
        const delay = initialDelay * Math.pow(2, retryCount) * (0.9 + Math.random() * 0.2);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  return false;
};

/**
 * Retry a function with exponential backoff
 */
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries = 5, // Increased from 3 to 5
  initialDelay = 2000
): Promise<T> => {
  // Check network connectivity first
  if (!isOnline()) {
    throw new Error(
      'You appear to be offline. Please check your internet connection and try again.'
    );
  }
  
  let retryCount = 0;
  let lastError: Error | null = null;

  while (retryCount < maxRetries) {
    try {
      return await fn();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error('Unknown error during retry');
      
      // Don't retry auth errors
      if (lastError.message.includes('Session expired') || 
          lastError.message.includes('Please log in') ||
          lastError.message.includes('auth') ||
          lastError.message.includes('JWT') ||
          lastError.message.includes('token')) {
        console.warn('Not retrying auth error:', lastError.message);
        throw lastError;
      }
      
      retryCount++;
      
      if (retryCount < maxRetries) {
        // Exponential backoff with jitter
        const delay = initialDelay * Math.pow(2, retryCount) * (0.9 + Math.random() * 0.2);
        console.warn(`Retrying operation after error (${retryCount}/${maxRetries}): ${lastError.message}`);
        
        // Add more helpful error messaging for network errors
        if (lastError.message.includes('Failed to fetch') || 
            lastError.message.includes('Network error') ||
            lastError.message.includes('timeout')) {
          console.warn('Network connectivity issue detected, waiting before retry');
        }
        
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // If we've exhausted retries, add more helpful context to the error message
  if (lastError) {
    if (lastError.message.includes('Failed to fetch') || 
        lastError.message.includes('Network error') ||
        lastError.message.includes('timeout')) {
      throw new Error(
        'Network error: Unable to connect to the server. Please check:\n\n' +
        '1. Your internet connection\n' +
        '2. That you\'re logged in\n' +
        '3. Try refreshing the page\n\n' +
        'If the problem persists, please contact support.'
      );
    }
  }

  throw lastError || new Error('Operation failed after multiple retries');
};