import { supabase } from './index';
import { navigateToAdmin } from '../navigation';

/**
 * Handles refresh token errors by signing out the user and redirecting to login
 * @returns Promise that resolves when the user is signed out
 */
export const handleRefreshTokenError = async (): Promise<void> => {
  console.warn('Handling refresh token error - signing out user');
  
  try {
    // Clear browser storage to ensure no stale tokens remain
    localStorage.removeItem('sb-ggyupkyysczuzhvmijvt-auth-token');
    localStorage.removeItem('supabase.auth.token');
    sessionStorage.removeItem('sb-ggyupkyysczuzhvmijvt-auth-token');
    
    // Clear any other potential auth-related items
    const authItemKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('supabase') || key.includes('sb-'))) {
        authItemKeys.push(key);
      }
    }
    
    authItemKeys.forEach(key => localStorage.removeItem(key));
    
    // Sign out with Supabase (may not work if token is already invalid)
    try {
      await supabase.auth.signOut();
      console.log('Successfully signed out user');
    } catch (signOutErr) {
      console.error('Error during sign out:', signOutErr);
      // Continue with redirect even if signOut fails
    }
    
    // Redirect to login page
    console.log('Redirecting to login page after token error');
    window.location.href = '/login';
  } catch (err) {
    console.error('Error handling refresh token error:', err);
    window.location.href = '/login';
  }
};

/**
 * Signs in with email and password
 * @param email User email
 * @param password User password
 * @returns Auth response
 */
export const signInWithEmail = async (email: string, password: string) => {
  try {
    console.log('Signing in user with email (redacted for privacy)');
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('Sign in error:', error.message);
      throw error;
    }
    
    console.log('User signed in successfully');
    
    // Redirect to admin panel after successful login
    window.location.href = '/admin';
    
    return data;
  } catch (err) {
    console.error('Error during sign in:', err);
    throw err;
  }
};

/**
 * Signs up a new user with email and password
 * @param email User email
 * @param password User password
 * @param metadata Additional user metadata
 * @returns Auth response
 */
export const signUpWithEmail = async (email: string, password: string, metadata?: { [key: string]: any }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata || {}
      }
    });
    
    if (error) {
      console.error('Sign up error:', error.message);
      throw error;
    }
    
    return data;
  } catch (err) {
    console.error('Error during sign up:', err);
    throw err;
  }
};

/**
 * Signs out the current user
 * @returns Promise that resolves when the user is signed out
 */
export const signOut = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Sign out error:', error.message);
      throw error;
    }
  } catch (err) {
    console.error('Error during sign out:', err);
    throw err;
  }
};

/**
 * Retrieves the current user session
 * @returns User session or null if not authenticated
 */
export const getCurrentSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      if (error.message?.includes('Invalid Refresh Token') || 
          error.message?.includes('refresh_token_not_found')) {
        await handleRefreshTokenError();
      }
      console.error('Get session error:', error.message);
      throw error;
    }
    
    return data.session;
  } catch (err) {
    console.error('Error getting current session:', err);
    return null;
  }
};

/**
 * Retrieves the current user
 * @returns User or null if not authenticated
 */
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      if (error.message?.includes('Invalid Refresh Token') || 
          error.message?.includes('refresh_token_not_found')) {
        await handleRefreshTokenError();
      }
      console.error('Get user error:', error.message);
      throw error;
    }
    
    return data.user;
  } catch (err) {
    console.error('Error getting current user:', err);
    return null;
  }
};

/**
 * Sends a password reset email
 * @param email User email
 * @returns Auth response
 */
export const resetPassword = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    
    if (error) {
      console.error('Password reset error:', error.message);
      throw error;
    }
    
    return data;
  } catch (err) {
    console.error('Error sending password reset:', err);
    throw err;
  }
};

/**
 * Updates user password
 * @param password New password
 * @returns Auth response
 */
export const updatePassword = async (password: string) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password
    });
    
    if (error) {
      console.error('Update password error:', error.message);
      throw error;
    }
    
    return data;
  } catch (err) {
    console.error('Error updating password:', err);
    throw err;
  }
};