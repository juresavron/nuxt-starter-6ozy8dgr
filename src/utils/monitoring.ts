// This file now contains only necessary stubs for compatibility
// All monitoring functionality has been disabled

/**
 * Initialize Sentry (disabled)
 */
export const initSentry = () => {};

/**
 * Track performance metrics (disabled)
 */
export const trackPerformance = (_name: string, _data?: Record<string, any>) => {
  return {
    finish: () => {},
  };
};

/**
 * Report errors (disabled)
 */
export const reportError = (_error: Error, _context?: Record<string, any>) => {};

/**
 * Performance monitoring for API calls
 * Simple logging implementation that doesn't depend on external services
 */
export const monitorApiCall = async <T>(name: string, apiCall: () => Promise<T>): Promise<T> => {
  console.log(`API Call: ${name} - started`);
  const startTime = performance.now();
  
  try {
    const result = await apiCall();
    const duration = performance.now() - startTime;
    console.log(`API Call: ${name} - completed in ${duration.toFixed(2)}ms`);
    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    console.error(`API Call: ${name} - failed after ${duration.toFixed(2)}ms`, error);
    throw error;
  }
};

/**
 * Component performance monitoring HOC (disabled)
 */
export const withPerformanceMonitoring = <P extends object>(Component: React.ComponentType<P>) => {
  return Component;
};

/**
 * Set up real user monitoring (disabled)
 */
export const setupRealUserMonitoring = () => {};