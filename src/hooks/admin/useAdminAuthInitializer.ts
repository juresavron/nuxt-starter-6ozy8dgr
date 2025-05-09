import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../auth/useAuth';
import { useAdminStore } from './store';
import { checkUserRole } from '../auth/useRoleCheck';

// Log levels for better visibility in console
const LOG_LEVELS = {
  INFO: '🔑 INFO',
  WARN: '⚠️ WARNING',
  ERROR: '🔴 ERROR',
  SUCCESS: '✅ SUCCESS',
  DEBUG: '🔍 DEBUG'
};

/**
 * Hook for checking network connection with retries
 */
export const useNetworkConnection = () => {
  const checkNetworkConnection = useCallback(async (maxRetries = 5, initialDelay = 3000) => {
    let isNetworkAvailable = false;
    let networkCheckAttempts = 0;

    while (!isNetworkAvailable && networkCheckAttempts < maxRetries) {
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          mode: 'no-cors', // This is just to detect connectivity, not to get actual data
        });
        
        isNetworkAvailable = true;
      } catch (error) {
        networkCheckAttempts++;
        console.warn(`${LOG_LEVELS.WARN} Network check attempt ${networkCheckAttempts}/${maxRetries} failed`);
        
        if (networkCheckAttempts < maxRetries) {
          // Exponential backoff with longer initial delay
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, networkCheckAttempts) * initialDelay));
        }
      }
    }

    return isNetworkAvailable;
  }, []);

  return { checkNetworkConnection };
};

/**
 * Hook for testing Supabase connection
 */
export const useSupabaseConnection = () => {
  const testSupabaseConnection = useCallback(async () => {
    try {
      console.log(`${LOG_LEVELS.INFO} Testing Supabase connection...`);
      
      // Use AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.warn(`${LOG_LEVELS.WARN} Connection test timeout - aborting operation after 60 seconds`);
        controller.abort('Connection test timeout after 60 seconds');
      }, 60000);
      
      // Add retry logic for connection test
      const maxRetries = 5;
      let retryCount = 0;
      let lastError = null;

      while (retryCount < maxRetries) {
        try {
          const result = await supabase
            .from('companies')
            .select('count')
            .limit(1)
            .abortSignal(controller.signal);
          
          clearTimeout(timeoutId);
          
          if (!result.error) {
            console.log(`${LOG_LEVELS.SUCCESS} Supabase connection test successful`);
            return { success: true, data: result.data };
          }
          
          lastError = result.error;
          retryCount++;
          
          if (retryCount < maxRetries) {
            // Exponential backoff with jitter: 3s, 6s, 12s, 24s, 48s
            const baseDelay = 3000;
            const jitter = Math.random() * 1000;
            await new Promise(resolve => 
              setTimeout(resolve, (baseDelay * Math.pow(2, retryCount)) + jitter)
            );
          }
        } catch (e) {
          lastError = e;
          retryCount++;
          
          if (retryCount < maxRetries) {
            const baseDelay = 3000;
            const jitter = Math.random() * 1000;
            await new Promise(resolve => 
              setTimeout(resolve, (baseDelay * Math.pow(2, retryCount)) + jitter)
            );
          }
        }
      }

      if (lastError) {
        console.error(`${LOG_LEVELS.ERROR} Supabase connection test failed:`, lastError);
        return { 
          success: false, 
          error: new Error(
            'Unable to connect to the server. Please check:\n\n' +
            '1. Your internet connection\n' +
            '2. That you\'re logged in\n' +
            '3. Try refreshing the page\n\n' +
            'If the problem persists, please contact support.'
          )
        };
      }
      
      return { success: true };
    } catch (err) {
      console.error(`${LOG_LEVELS.ERROR} Supabase connection test error:`, err);
      return { 
        success: false, 
        error: err instanceof Error ? err : new Error('Unknown error during connection test')
      };
    }
  }, []);

  return { testSupabaseConnection };
};

/**
 * Hook for admin auth initialization
 */
export const useAdminAuthInitializer = (
  isClient: boolean,
  fetchData: () => Promise<void>
) => {
  const [initializationComplete, setInitializationComplete] = useState(false);
  
  const { 
    setUser, 
    setUserRole, 
    setLoading, 
    setAuthInitialized, 
    setError,
    userRole
  } = useAuth();
  
  const { setIsSuperAdmin, setAssignedCompanyIds } = useAdminStore();
  const { checkNetworkConnection } = useNetworkConnection();
  const { testSupabaseConnection } = useSupabaseConnection();

  const initAuth = useCallback(async () => {
    if (!isClient) return;
    
    try {
      console.log(`${LOG_LEVELS.INFO} Starting auth initialization process`);
      setLoading(true);
      setAuthInitialized(false);
      
      // Check network connectivity first
      const isOnline = await checkNetworkConnection();
      if (!isOnline) {
        throw new Error('You appear to be offline. Please check your internet connection and try again.');
      }
      
      // Test Supabase connection with retries
      const connectionTest = await testSupabaseConnection();
      if (!connectionTest.success) {
        throw connectionTest.error;
      }
      
      // Get auth session
      console.log(`${LOG_LEVELS.INFO} Getting auth session`);
      const { data, error: sessionError } = await supabase.auth.getSession();
      const session = data?.session;
      
      console.log(`${LOG_LEVELS.DEBUG} Session data:`, {
        hasSession: !!session,
        hasUser: !!session?.user,
        expiresAt: session?.expires_at ? new Date(session.expires_at * 1000).toISOString() : 'N/A'
      });
      
      if (!session || !session.user || sessionError) {
        console.warn(`${LOG_LEVELS.WARN} No valid session found, forcing logout`);
        localStorage.clear();
        sessionStorage.clear();
        await supabase.auth.signOut();
        setUser(null);
        setUserRole({ isAdmin: false, isCompanyOwner: false, ownedCompanyIds: [] });
        setAuthInitialized(true);
        setLoading(false);
        window.location.href = '/login';
        return;
      }
      
      const currentUser = session.user;
      setUser(currentUser);
      console.log(`${LOG_LEVELS.INFO} User set:`, { 
        id: currentUser.id, 
        email: currentUser.email 
      });
      
      if (currentUser?.id) {
        console.log(`${LOG_LEVELS.INFO} Checking user role for ${currentUser.email}`);
        await checkUserRole(
          currentUser.id, 
          setUserRole, 
          setError, 
          false
        );
        
        if (typeof fetchData === 'function') {
          console.log(`${LOG_LEVELS.INFO} Fetching data after auth initialization`);
          await fetchData();
        }
      }
      
      setLoading(false);
      setAuthInitialized(true);
      console.log(`${LOG_LEVELS.SUCCESS} Auth initialization complete`);
      
      // Update admin store with role information
      if (userRole) {
        console.log(`${LOG_LEVELS.INFO} Setting admin store state`, {
          isSuperAdmin: userRole.isSuperAdmin || false,
          assignedCompanyIds: userRole.ownedCompanyIds?.length || 0
        });
        setIsSuperAdmin(userRole.isSuperAdmin || false);
        setAssignedCompanyIds(userRole.ownedCompanyIds || []);
      }
      
      setInitializationComplete(true);
    } catch (err) {
      console.error(`${LOG_LEVELS.ERROR} Error during auth initialization:`, err);
      console.error(`${LOG_LEVELS.ERROR} Error details:`, {
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : 'No stack trace'
      });
      
      setError(err instanceof Error ? err.message : 'Failed to initialize authentication');
      setLoading(false);
      setAuthInitialized(true);
      
      // Clean up and redirect
      localStorage.clear();
      sessionStorage.clear();
      await supabase.auth.signOut();
      window.location.href = '/login';
    }
  }, [
    isClient, checkNetworkConnection, testSupabaseConnection, 
    setUser, setUserRole, setLoading, setAuthInitialized, 
    setError, userRole, fetchData, setIsSuperAdmin, setAssignedCompanyIds
  ]);

  return {
    initAuth,
    initializationComplete,
  };
};

export default useAdminAuthInitializer;