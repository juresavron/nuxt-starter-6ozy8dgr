import { useState, useCallback, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { handleRefreshTokenError } from '../../lib/supabase/auth';
import type { UserRole, AuthHook } from './types';
import { useNavigate } from 'react-router-dom';

/**
 * Hook for handling authentication
 * @returns Authentication state and functions
 */
export const useAuth = (): AuthHook => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole>({
    isAdmin: false,
    isCompanyOwner: false,
    ownedCompanyIds: [],
    isSuperAdmin: false,
  });
  const [authInitialized, setAuthInitialized] = useState(false);

  // 🔥 Hydrate user from Supabase on first load
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        console.warn('useAuth: No user session found:', error?.message);
      }
      setAuthInitialized(true);
    };

    fetchUser();
  }, []);

  // Sign in with email and password
  const signIn = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        if (data?.user) {
          setUser(data.user);

          const { data: adminData, error: adminError } = await supabase
            .from('admin_users')
            .select('id, is_superadmin')
            .eq('id', data.user.id)
            .single();

          if (adminError || !adminData) {
            setUserRole({
              ...userRole,
              isAdmin: false,
              isSuperAdmin: false,
            });
          } else {
            setUserRole({
              ...userRole,
              isAdmin: true,
              isSuperAdmin: !!adminData.is_superadmin,
            });
          }

          // Redirect to admin panel after successful login
          navigate('/admin');
          return true;
        }

        return false;
      } catch (err) {
        console.error('Sign in error:', err);
        setError(err instanceof Error ? err.message : 'Failed to sign in');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [userRole]
  );

  const signOut = useCallback(async () => {
    try {
      setLoading(true);

      await supabase.auth.signOut();

      setUser(null);
      setUserRole({
        isAdmin: false,
        isCompanyOwner: false,
        ownedCompanyIds: [],
        isSuperAdmin: false,
      });
    } catch (err) {
      console.error('Sign out error:', err);
      setError(err instanceof Error ? err.message : 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    setUser,
    loading,
    setLoading,
    error,
    setError,
    userRole,
    setUserRole,
    authInitialized,
    setAuthInitialized,
    signIn,
    signOut,
    clearError,
  };
};