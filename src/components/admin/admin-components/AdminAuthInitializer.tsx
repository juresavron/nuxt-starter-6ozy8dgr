import React, { useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../hooks/auth/useAuth';
import { useAdminStore } from '../../../hooks/admin/store';
import { checkUserRole } from '../../../hooks/auth/useRoleCheck';

// Enhanced debug function to check Supabase connection with increased timeout
const debugSupabaseConnection = async () => {
  try {
    console.log('AdminAuthInitializer: Testing Supabase connection...');
    
    // Use AbortController for timeout with increased duration
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.warn('Connection test timeout - aborting operation');
      controller.abort('Connection test timeout after 120 seconds');
    }, 120000); // Increased to 120 second timeout for connection test
    
    let data, error;
    try {
      // Add retry logic for connection test
      const maxRetries = 5; // Increased from 3 to 5
      let retryCount = 0;
      let lastError = null;

      while (retryCount < maxRetries) {
        try {
          const result = await supabase
            .from('companies')
            .select('count')
            .limit(1)
            .abortSignal(controller.signal);
          
          data = result.data;
          error = result.error;
          
          if (!error) break; // Success, exit retry loop
          
          lastError = error;
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
        error = lastError;
      }
    } finally {
      clearTimeout(timeoutId);
    }
    
    if (error) {
      console.error('AdminAuthInitializer: Supabase connection test failed:', error);
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
    
    console.log('AdminAuthInitializer: Supabase connection test successful:', data);
    return { success: true, data };
  } catch (err) {
    console.error('AdminAuthInitializer: Supabase connection test error:', err);
    return { 
      success: false, 
      error: err instanceof Error ? err : new Error('Unknown error during connection test')
    };
  }
};

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

  useEffect(() => {
    if (isClient) {
      console.log('AdminAuthInitializer: Checking auth status');
      
      let initTimeout: NodeJS.Timeout;
      
      const initAuth = async () => {
        try {
          console.log('useAuth: Starting auth initialization');
          setLoading(true);
          setAuthInitialized(false);
          
          // Test Supabase connection first with retries
          const connectionTest = await debugSupabaseConnection();
          if (!connectionTest.success) {
            throw connectionTest.error;
          }
          
          const { data, error: sessionError } = await supabase.auth.getSession();
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
      }, 120000); // Increased to 120 seconds timeout for the entire auth process
      
      initAuth().finally(() => {
        clearTimeout(initTimeout);
      });
      
      return () => {
        clearTimeout(initTimeout);
      };
    }
  }, [isClient, setUser, setUserRole, setLoading, setAuthInitialized, setError, userRole, fetchData, setIsSuperAdmin, setAssignedCompanyIds]);

  return null;
};

export default AdminAuthInitializer;