/**
 * Functions for error handling in Supabase operations
 */

/**
 * Formats a Supabase error message for display
 * @param error Error object
 * @returns Formatted error message
 */
export const formatSupabaseErrorMessage = (error: any): string => {
  if (!error) return 'An unknown error occurred';
  
  // Handle Supabase specific errors
  if (error.code) {
    switch (error.code) {
      case 'PGRST116':
        return 'No records were found matching your query';
      case 'PGRST104':
        return 'Invalid query parameter';
      case '23505':
        return 'A record with this information already exists';
      case '23503':
        return 'This operation references a record that does not exist';
      case '42P01':
        return 'Table does not exist';
      case 'P0001':
        return error.message || 'Database constraint violation';
      // Auth specific error codes
      case 'auth-insufficient-permissions':
        return 'You do not have permission to perform this action';
      case 'auth-invalid-token':
        return 'Your session has expired. Please sign in again.';
      case 'auth-invalid-credentials':
        return 'Invalid login credentials';
      default:
        // If we have a message, use it
        if (error.message) {
          return error.message;
        }
    }
  }
  
  // Handle plain error message strings
  if (typeof error === 'string') {
    return error;
  }
  
  // Handle standard Error objects
  if (error.message) {
    return error.message;
  }
  
  // Fallback
  return 'An unexpected error occurred';
};

/**
 * Determines if an error is a Supabase authentication error
 * @param error Error object
 * @returns Boolean indicating if it's an auth error
 */
export const isAuthError = (error: any): boolean => {
  if (!error) return false;
  
  // Check for specific auth error codes
  if (error.code) {
    return [
      'auth-invalid-token',
      'auth-insufficient-permissions',
      'auth-invalid-credentials',
      '401',
      '403'
    ].includes(error.code);
  }
  
  // Check error message for auth-related keywords
  if (error.message) {
    const message = error.message.toLowerCase();
    return (
      message.includes('jwt') ||
      message.includes('token') ||
      message.includes('auth') ||
      message.includes('session') ||
      message.includes('permission') ||
      message.includes('unauthorized') ||
      message.includes('login') ||
      message.includes('sign in')
    );
  }
  
  return false;
};

/**
 * Determines if an error is a network connectivity issue
 * @param error Error object
 * @returns Boolean indicating if it's a network error
 */
export const isNetworkError = (error: any): boolean => {
  if (!error) return false;
  
  if (error.message) {
    const message = error.message.toLowerCase();
    return (
      message.includes('network') ||
      message.includes('connection') ||
      message.includes('offline') ||
      message.includes('fetch') ||
      message.includes('timeout') ||
      message.includes('aborted')
    );
  }
  
  return false;
};