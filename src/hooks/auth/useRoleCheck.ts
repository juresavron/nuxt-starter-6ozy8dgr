import { supabase } from '../../lib/supabase';
import { handleRefreshTokenError } from '../../lib/supabase/auth';
import type { UserRole } from './types';

// Log levels for better visibility in console
const LOG_LEVELS = {
  INFO: '🔑 INFO',
  WARN: '⚠️ WARNING',
  ERROR: '🔴 ERROR',
  SUCCESS: '✅ SUCCESS',
  DEBUG: '🔍 DEBUG'
};

/**
 * Checks the user's role (admin, company owner, etc.)
 * @param userId User ID to check
 * @param setUserRole Function to set user role
 * @param setError Function to set error
 * @param silent Whether to log errors
 * @returns Promise that resolves when role check is complete
 */
export const checkUserRole = async (
  userId: string,
  setUserRole: (role: UserRole) => void,
  setError: (error: string | null) => void,
  silent: boolean = false
): Promise<void> => {
  try {
    // First check browser online status
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      throw new Error('You appear to be offline. Please check your internet connection and try again.');
    }

    if (!silent) {
      console.log(`${LOG_LEVELS.INFO} checkUserRole: Checking role for user ${userId}`);
    }
    
    // Add retry logic for network errors
    const maxRetries = 5;
    let retryCount = 0;
    let lastError = null;

    while (retryCount < maxRetries) {
      try {
        if (!silent && retryCount > 0) {
          console.log(`${LOG_LEVELS.INFO} checkUserRole: Retry attempt ${retryCount}/${maxRetries}`);
        }
        
        // Create AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort();
        }, 30000); // 30 second timeout

        try {
          // Check if user is an admin
          if (!silent) {
            console.log(`${LOG_LEVELS.DEBUG} checkUserRole: Querying admin_users table for user ${userId}`);
          }
          
          const { data: adminData, error: adminError } = await supabase
            .from('admin_users')
            .select('id, is_superadmin')
            .eq('id', userId)
            .single()
            .abortSignal(controller.signal);

          if (!silent) {
            console.log(`${LOG_LEVELS.DEBUG} checkUserRole: Admin query result:`, {
              hasData: !!adminData,
              isAdmin: !!adminData?.id,
              isSuperAdmin: !!adminData?.is_superadmin,
              error: adminError ? adminError.message : 'none'
            });
          }
            
          if (adminError) {
            // Only throw error for network-related issues
            if (adminError.message && (
              adminError.message.includes('Failed to fetch') || 
              adminError.message.includes('Network error') ||
              adminError.message.includes('timeout') ||
              adminError.message.includes('Unable to connect')
            )) {
              if (!silent) {
                console.error(`${LOG_LEVELS.ERROR} checkUserRole: Network error querying admin status:`, adminError.message);
              }
              throw new Error('Network error: Unable to connect to Supabase. Please check your network connection and try again.');
            }
            
            // For PGRST116 (no rows) or other non-network errors, treat as non-admin
            if (!silent) {
              console.log(`${LOG_LEVELS.INFO} checkUserRole: User is not an admin (${adminError.message})`);
            }
            
            setUserRole({
              isAdmin: false,
              isCompanyOwner: false,
              ownedCompanyIds: [],
              isSuperAdmin: false
            });
            return;
          }
          
          const isAdmin = !!adminData?.id;
          const isSuperAdmin = isAdmin ? !!adminData?.is_superadmin : false;
          
          if (!silent) {
            console.log(`${LOG_LEVELS.INFO} checkUserRole: User role determined:`, {
              isAdmin,
              isSuperAdmin
            });
          }
          
          // Fetch assigned company IDs for regular admins
          let assignedCompanyIds: string[] = [];
          if (isAdmin && !isSuperAdmin) {
            if (!silent) {
              console.log(`${LOG_LEVELS.DEBUG} checkUserRole: Fetching company assignments for regular admin`);
            }
            
            const { data: companyAssignments, error: companyError } = await supabase
              .from('company_admins')
              .select('company_id')
              .eq('admin_id', userId)
              .abortSignal(controller.signal);

            if (!silent) {
              console.log(`${LOG_LEVELS.DEBUG} checkUserRole: Company assignments query result:`, {
                hasData: !!companyAssignments,
                count: companyAssignments?.length || 0,
                error: companyError ? companyError.message : 'none'
              });
            }
              
            if (companyError) {
              // Only throw for network errors
              if (companyError.message && (
                companyError.message.includes('Failed to fetch') || 
                companyError.message.includes('Network error') ||
                companyError.message.includes('timeout') ||
                companyError.message.includes('Unable to connect')
              )) {
                if (!silent) {
                  console.error(`${LOG_LEVELS.ERROR} checkUserRole: Network error fetching company assignments:`, companyError.message);
                }
                throw new Error('Network error: Unable to connect to Supabase. Please check your network connection and try again.');
              }
              // For other errors, continue with empty assignments
              if (!silent) {
                console.log(`${LOG_LEVELS.WARN} checkUserRole: Error fetching company assignments, continuing with empty list: ${companyError.message}`);
              }
            } else {
              assignedCompanyIds = (companyAssignments || []).map(assignment => assignment.company_id);
              
              if (!silent) {
                console.log(`${LOG_LEVELS.INFO} checkUserRole: Fetched ${assignedCompanyIds.length} assigned companies`);
              }
            }
          }
          
          // Set user role
          setUserRole({
            isAdmin,
            isCompanyOwner: false,
            ownedCompanyIds: assignedCompanyIds,
            isSuperAdmin: isAdmin ? !!adminData?.is_superadmin : false
          });
          
          if (!silent) {
            console.log(`${LOG_LEVELS.SUCCESS} checkUserRole: Role check complete`, { 
              isAdmin, 
              isSuperAdmin,
              assignedCompanies: assignedCompanyIds.length
            });
          }
          
          // Success, exit retry loop
          return;
        } finally {
          clearTimeout(timeoutId);
        }
      } catch (error) {
        lastError = error;
        
        // Only retry on network errors
        if (error.message && (
          error.message.includes('Failed to fetch') || 
          error.message.includes('Network error') ||
          error.message.includes('timeout') ||
          error.message.includes('Unable to connect')
        )) {
          retryCount++;
          if (!silent) {
            console.warn(`${LOG_LEVELS.WARN} checkUserRole: Network error, retrying (${retryCount}/${maxRetries})...`);
          }
          
          if (retryCount < maxRetries) {
            // Exponential backoff with jitter
            const baseDelay = 3000;
            const jitter = Math.random() * 500;
            const delay = (baseDelay * Math.pow(2, retryCount)) + jitter;
            if (!silent) {
              console.log(`${LOG_LEVELS.INFO} checkUserRole: Waiting ${Math.round(delay/1000)}s before retry ${retryCount}`);
            }
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        } else {
          // Non-network error, don't retry
          if (!silent) {
            console.error(`${LOG_LEVELS.ERROR} checkUserRole: Non-network error, not retrying:`, error.message);
          }
          break;
        }
      }
    }
    
    // If we've exhausted retries or encountered a non-network error
    if (lastError) {
      if (!silent) {
        console.error(`${LOG_LEVELS.ERROR} checkUserRole: Error after ${retryCount} retries:`, lastError.message);
      }
      throw lastError;
    }
  } catch (err) {
    if (!silent) {
      console.error(`${LOG_LEVELS.ERROR} checkUserRole: Error checking user role:`, err);
    }
    // Provide a more user-friendly error message for network issues
    if (err instanceof Error) {
      if (err.message.includes('Network error') || 
          err.message.includes('Failed to fetch') ||
          err.message.includes('timeout') ||
          err.message.includes('Unable to connect')) {
        if (!silent) {
          console.error(`${LOG_LEVELS.ERROR} checkUserRole: Network error:`, err.message);
        }
        setError(
          'Network error: Unable to connect to the server. Please check:\n\n' +
          '1. Your internet connection\n' +
          '2. That you\'re logged in\n' +
          '3. Try refreshing the page\n\n' +
          'If the problem persists, please contact support.'
        );
      } else if (err.message.includes('JWT') ||
                err.message.includes('auth') ||
                err.message.includes('session') ||
                err.message.includes('token')) {
        if (!silent) {
          console.error(`${LOG_LEVELS.ERROR} checkUserRole: Auth error, handling refresh token error:`, err.message);
        }
        setError('Your session has expired. Please log in again.');
        handleRefreshTokenError();
      } else {
        setError(err.message);
      }
    } else {
      setError('Failed to check user role. Please try refreshing the page.');
    }
  }
};

/**
 * Hook for checking user roles
 * @param userId User ID to check
 * @param setError Function to set error
 * @param silent Whether to log errors
 * @returns Promise that resolves with user role
 */
export const useRoleCheck = () => {
  return { checkUserRole };
};