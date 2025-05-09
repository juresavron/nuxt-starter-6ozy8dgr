import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth';
import { supabase } from '../../lib/supabase';
import LoadingSpinner from '../shared/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, userRole, loading: authLoading, setUser, setUserRole, setError } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      console.log('ProtectedRoute: Checking authentication...');
      
      try {
        // Get the current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('ProtectedRoute: Session error', sessionError);
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }
        
        // If no session, not authorized
        if (!sessionData.session) {
          console.log('ProtectedRoute: No user found, redirecting to login');
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }

        // Set the user in auth state if not already set
        if (!user) {
          setUser(sessionData.session.user);
        }
        
        // Check if user is an admin
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('id, is_superadmin')
          .eq('id', sessionData.session.user.id)
          .single();

        if (adminError) {
          console.error('ProtectedRoute: Error fetching admin status', adminError);
          
          // Check if the error is because the user is not in the admin_users table
          if (adminError.code === 'PGRST116') {
            console.log('ProtectedRoute: User is not an admin');
            setIsAuthorized(false);
          } else {
            // Handle other errors
            setError(adminError.message);
          }
          
          setIsLoading(false);
          return;
        }
        
        if (adminData) {
          // User is an admin, update role
          setUserRole({
            isAdmin: true,
            isSuperAdmin: adminData.is_superadmin,
            isCompanyOwner: false,
            ownedCompanyIds: []
          });
          
          // If user is admin, they are authorized
          console.log('ProtectedRoute: User is authorized as admin');
          setIsAuthorized(true);
          
          // If the user is an admin, fetch assigned companies
          if (!adminData.is_superadmin) {
            const { data: companyData, error: companyError } = await supabase
              .from('company_admins')
              .select('company_id')
              .eq('admin_id', sessionData.session.user.id);
              
            if (!companyError && companyData) {
              const companyIds = companyData.map(item => item.company_id);
              setUserRole(prev => ({
                ...prev,
                ownedCompanyIds: companyIds
              }));
            }
          }
        } else {
          // User is not an admin
          console.log('ProtectedRoute: User is not an admin');
          setIsAuthorized(false);
        }
      } catch (err) {
        console.error('ProtectedRoute: Error checking authentication', err);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [user, setUser, setUserRole, setError]);

  // Show loading spinner while checking authentication
  if (isLoading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <LoadingSpinner size="lg" color="blue" />
          <p className="mt-4 text-gray-600">Preverjanje dostopa...</p>
        </div>
      </div>
    );
  }

  // If not authorized, redirect to login
  if (!isAuthorized) {
    console.log('ProtectedRoute: Not authorized, redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  // User is authorized, render children
  return <>{children}</>;
};

export default ProtectedRoute;