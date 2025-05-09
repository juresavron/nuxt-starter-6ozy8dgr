import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { handleRefreshTokenError } from '../../lib/supabase';

/**
 * Hook for checking authentication status during checkout
 * @returns Authentication state and user information
 */
export const useAuthCheck = (packageId?: string | null) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      setAuthChecking(true);
      try {
        console.log('Checking authentication status...');
        const { data, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Session error:', sessionError);
          redirectToLogin('Authentication error occurred. Please log in again.');
          return;
        }

        if (!data?.session) {
          console.log('No session found, redirecting to login');
          redirectToLogin('Please log in to continue with your purchase.');
          return;
        }

        // Validate the token by making an authenticated request
        try {
          const { error: userError } = await supabase.auth.getUser();
          if (userError) {
            console.error('Token validation failed:', userError);
            if (userError.message.includes('JWT') || 
                userError.message.includes('token') || 
                userError.message.includes('session')) {
              // This is likely a token validation error, handle it specially
              await handleRefreshTokenError(`/checkout/${packageId}`);
              return;
            }
            redirectToLogin('Your session has expired. Please log in again.');
            return;
          }
        } catch (tokenError) {
          console.error('Token validation error:', tokenError);
          await handleRefreshTokenError(`/checkout/${packageId}`);
          return;
        }

        console.log('User authenticated:', data.session.user.email);
        setIsAuthenticated(true);
        setUserEmail(data.session.user.email);
      } catch (err) {
        console.error('Authentication check failed:', err);
        setAuthError('Authentication error occurred');
        redirectToLogin('Please log in to continue with your purchase.');
      } finally {
        setAuthChecking(false);
      }
    };

    const redirectToLogin = (message: string) => {
      navigate('/login', {
        state: {
          returnTo: `/checkout/${packageId}`,
          message: message
        }
      });
    };

    checkAuth();
  }, [packageId, navigate, location]);

  return {
    isAuthenticated,
    userEmail,
    authChecking,
    authError,
    setAuthError
  };
};