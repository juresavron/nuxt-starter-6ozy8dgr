import React, { useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/auth/useAuth';
import { useAdminStore } from '../../hooks/admin/store';
import { checkUserRole } from '../../hooks/auth/useRoleCheck';
import useNetworkConnection from '../../hooks/admin/auth/useNetworkConnection';
import useSupabaseConnection from '../../hooks/admin/auth/useSupabaseConnection';

interface AdminAuthInitializerProps {
  isClient: boolean;
  fetchData: () => Promise<void>;
}

const AdminAuthInitializer: React.FC<AdminAuthInitializerProps> = ({ isClient, fetchData }) => {
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

  useEffect(() => {
    if (isClient) {
      console.log('AdminAuthInitializer: Checking auth status');
      
      let initTimeout: NodeJS.Timeout;
      
      const initAuth = async () => {
        try {
          console.log('useAuth: Starting auth initialization');
          setLoading(true);
          setAuthInitialized(false);
          
          // Check if browser is online
          if (!navigator.onLine) {
            console.error('AdminAuthInitializer: Browser reports offline status');
            throw new Error('You appear to be offline. Please check your internet connection and try again.');
          }
          
          // Test network connectivity first
          console.log('AdminAuthInitializer: Testing network connectivity');
          const isNetworkAvailable = await checkNetworkConnection(5, 3000);
          if (!isNetworkAvailable) {
            console.error('AdminAuthInitializer: Network connectivity test failed');
            throw new Error(
              'Network error: Unable to connect to the server. Please check:\n\n' +
              '1. Your internet connection\n' +
              '2. That you\'re logged in\n' +
              '3. Try refreshing the page\n\n' +
              'If the problem persists, please contact support.'
            );
          }
          
          // Test Supabase connection with retries
          console.log('AdminAuthInitializer: Testing Supabase connection');
          const connectionTest = await testSupabaseConnection();
          if (!connectionTest.success) {
            console.error('AdminAuthInitializer: Supabase connection test failed:', connectionTest.error);
            throw connectionTest.error;
          }
          
          console.log('AdminAuthInitializer: Getting auth session');
          const { data, error: sessionError } = await supabase.auth.getSession();
          
          console.log('AdminAuthInitializer: Session retrieved:', {
            hasSession: !!data?.session,
            hasUser: !!data?.session?.user,
            error: sessionError ? `Error: ${sessionError.message}` : 'No error'
          });
          
          const session = data?.session;
          
          if (!session || !session.user || sessionError) {
            console.warn("useAuth: Invalid or expired session — forcing logout");
            localStorage.clear();
            sessionStorage.clear();
            await supabase.auth.signOut();
            setUser(null);
            setUserRole({ isAdmin: false, isCompanyOwner: false, ownedCompanyIds: [] });
            setAuthInitialized(true);
            setLoading(false);
            window.location.href = '/login';
            console.log('useAuth: No session, auth initialized');
            return;
          }
          
          const currentUser = session.user;
          setUser(currentUser);
          console.log('useAuth: User set', { id: currentUser.id, email: currentUser.email });
          
          if (currentUser?.id) {
            console.log('useAuth: Checking user role for', currentUser.email);
            await checkUserRole(
              currentUser.id, 
              setUserRole, 
              setError, 
              false
            );
            
            if (typeof fetchData === 'function') {
              console.log('AdminAuthInitializer: Auth initialized, fetching data');
              await fetchData();
            } else {
              console.warn('AdminAuthInitializer: fetchData is not a function');
            }
          }
          
          setLoading(false);
          setAuthInitialized(true);
          console.log('useAuth: Auth initialization complete');
          
          if (userRole) {
            setIsSuperAdmin(userRole.isSuperAdmin || false);
            setAssignedCompanyIds(userRole.ownedCompanyIds || []);
          }
        } catch (err) {
          console.error('useAuth: Error during initialization', err);
          setError(err instanceof Error ? err.message : 'Failed to initialize authentication');
          setLoading(false);
          setAuthInitialized(true);
          localStorage.clear();
          sessionStorage.clear();
          await supabase.auth.signOut();
          window.location.href = '/login';
        }
      };
      
      // Increased timeout for the entire initialization process
      initTimeout = setTimeout(() => {
        console.warn('Auth initialization timeout - forcing logout');
        setError(
          'Authentication initialization timed out. Please:\n\n' +
          '1. Check your internet connection\n' +
          '2. Clear your browser cache\n' +
          '3. Refresh the page\n\n' +
          'If the problem persists, please contact support.'
        );
        setLoading(false);
        setAuthInitialized(true);
        localStorage.clear();
        sessionStorage.clear();
        supabase.auth.signOut().then(() => {
          window.location.href = '/login';
        });
      }, 120000); // 120 seconds timeout for the entire auth process
      
      initAuth().finally(() => {
        clearTimeout(initTimeout);
      });
      
      return () => {
        clearTimeout(initTimeout);
      };
    }
  }, [isClient, setUser, setUserRole, setLoading, setAuthInitialized, setError, userRole, fetchData, setIsSuperAdmin, setAssignedCompanyIds, checkNetworkConnection, testSupabaseConnection]);

  return null;
};

export default AdminAuthInitializer;