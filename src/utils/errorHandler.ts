/**
 * Utility for handling and logging errors
 */

// Error severity levels
export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

/**
 * Logs an error to the console and optionally to a backend service
 * @param error The error object
 * @param context Additional context for the error
 * @param severity Error severity level
 */
export const logError = async (
  error: Error | string,
  context: Record<string, any> = {},
  severity: ErrorSeverity = ErrorSeverity.ERROR
): Promise<void> => {
  // Normalize the error to a string
  const errorMessage = error instanceof Error ? error.message : error;
  const errorStack = error instanceof Error ? error.stack : undefined;
  const errorType = error instanceof Error ? error.name : 'UnknownError';
  
  // Log to console based on severity
  switch (severity) {
    case ErrorSeverity.INFO:
      console.info(`[INFO] ${errorMessage}`, context);
      break;
    case ErrorSeverity.WARNING:
      console.warn(`[WARN] ${errorMessage}`, context);
      break;
    case ErrorSeverity.CRITICAL:
      console.error(`[CRITICAL] ${errorMessage}`, context);
      break;
    default:
      console.error(`[ERROR] ${errorMessage}`, context);
  }
  
  // Log to backend if available
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseAnonKey) {
      const response = await fetch(`${supabaseUrl}/functions/v1/log-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          type: 'error',
          data: {
            type: errorType,
            severity,
            message: errorMessage,
            stack: errorStack,
            context,
            path: window.location.pathname,
            timestamp: new Date().toISOString()
          }
        })
      });
      
      if (!response.ok) {
        console.warn('Failed to log error to backend');
      }
    }
  } catch (e) {
    // Don't throw errors from the error handler
    console.warn('Error logging to backend:', e);
  }
};

/**
 * Formats an error for display to users
 * @param error The error object or message
 * @param fallback Fallback message if error is empty
 * @returns Formatted error message
 */
export const formatErrorMessage = (
  error: Error | string | null | undefined,
  fallback: string = 'An unexpected error occurred'
): string => {
  if (!error) return fallback;
  
  const message = error instanceof Error ? error.message : error;
  
  // Remove technical details for user-facing messages
  return message
    .replace(/Error: /g, '')
    .replace(/^\w+Error: /g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/\(.*?\)/g, '')
    .trim() || fallback;
};

export default {
  ErrorSeverity,
  logError,
  formatErrorMessage
};