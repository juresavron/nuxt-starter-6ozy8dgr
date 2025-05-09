import { useState, useCallback } from 'react';
import { supabase } from '../../lib/supabase';

/**
 * Hook for adding a new admin user
 * @param onSuccess Callback function to run after successful addition
 * @returns Functions and state for adding an admin
 */
export const useAddAdmin = (onSuccess: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  /**
   * Adds a new admin user
   * @param email Email of the new admin
   */
  const addAdmin = async (email: string) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      // First, check if the user exists in auth system
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();
        
      if (userError) {
        throw new Error('User with this email does not exist in the system.');
      }
      
      // Check if user is already an admin
      const { data: existingAdmin, error: existingAdminError } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', email)
        .maybeSingle();
        
      if (existingAdmin) {
        throw new Error('This user is already an admin.');
      }
      
      // Add user to admin_users table
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert({
          id: userData.id,
          email: email,
          is_superadmin: false
        });
        
      if (insertError) throw insertError;
      
      // Call success callback
      onSuccess();
    } catch (err) {
      console.error('Error adding admin:', err);
      setError(err instanceof Error ? err.message : 'Failed to add admin');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    addAdmin,
    isSubmitting,
    error,
    setError
  };
};

export default useAddAdmin;