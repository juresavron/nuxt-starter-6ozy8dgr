import { useState, useEffect, useCallback } from 'react';
import { useAuthInitialization } from './useAuthInitialization';

/**
 * Primary hook for admin authentication initialization
 * @param isClient Whether we're running in browser context
 * @param fetchData Function to fetch data after successful authentication
 * @returns Auth initialization state and functions
 */
export const useAdminAuthInitializer = (
  isClient: boolean,
  fetchData: () => Promise<void>
) => {
  // Track if initialization has completed
  const [initialized, setInitialized] = useState(false);
  
  // Use the core auth initialization hook
  const { initAuth, initializationComplete } = useAuthInitialization(isClient, fetchData);
  
  // Update local state when core initialization completes
  useEffect(() => {
    if (initializationComplete) {
      setInitialized(true);
    }
  }, [initializationComplete]);

  return {
    initAuth,
    initialized
  };
};

export default useAdminAuthInitializer;