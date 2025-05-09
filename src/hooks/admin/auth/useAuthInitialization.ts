import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../auth/useAuth';
import { useAdminStore } from '../store';
import { checkUserRole } from '../../auth/useRoleCheck';
import { useNetworkConnection } from './useNetworkConnection';
import { useSupabaseConnection } from './useSupabaseConnection';

// Log levels for better visibility in console
const LOG_LEVELS = {
  INFO: '🔑 INFO',
  WARN: '⚠️ WARNING',
  ERROR: '🔴 ERROR',
  SUCCESS: '✅ SUCCESS',
  DEBUG: '🔍 DEBUG'
};

/**
 * Hook for handling admin authentication initialization process
 * @param isClient Whether we're running in browser context
 * @param fetchData Function to fetch data after auth initialization
 * @returns Auth initialization state and functions
 */
export const useAuthInitialization = (
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

  /**
   * Initializes authentication
   * @returns Promise that resolves when auth initialization is complete
   */
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

export default useAuthInitialization;