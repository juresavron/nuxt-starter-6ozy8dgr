import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useConfirmDelete } from '../useConfirmDelete';
import { useTranslations } from '../useTranslations';

/**
 * Hook for managing admin users
 * @returns Admin management functions and state
 */
export const useAdminManagement = () => {
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  
  const { confirmDelete } = useConfirmDelete();
  const translations = useTranslations();
  const t = translations?.app?.admins || {};

  /**
   * Fetches all admin users
   */
  const fetchAdminUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('admin_users')
        .select('*')
        .order('email');
        
      if (fetchError) throw fetchError;
      
      setAdminUsers(data || []);
    } catch (err) {
      console.error('Error fetching admin users:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch admin users');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Deletes an admin user
   */
  const handleDeleteAdmin = useCallback(async (admin: any) => {
    try {
      const confirmed = await confirmDelete({
        title: t?.deleteAdmin || 'Delete Admin',
        message: t?.deleteConfirm || 'Are you sure you want to delete this admin?',
        confirmText: t?.deleteAdmin || 'Delete',
        cancelText: 'Cancel'
      });
      
      if (!confirmed) return;
      
      setLoading(true);
      setError(null);
      
      const { error: deleteError } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', admin.id);
        
      if (deleteError) throw deleteError;
      
      // Refresh admin users
      await fetchAdminUsers();
    } catch (err) {
      console.error('Error deleting admin:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete admin');
    } finally {
      setLoading(false);
    }
  }, [confirmDelete, fetchAdminUsers, t]);

  /**
   * Toggles superadmin status for an admin user
   */
  const handleToggleSuperadmin = useCallback(async (admin: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ is_superadmin: !admin.is_superadmin })
        .eq('id', admin.id);
        
      if (updateError) throw updateError;
      
      // Refresh admin users
      await fetchAdminUsers();
    } catch (err) {
      console.error('Error toggling superadmin status:', err);
      setError(err instanceof Error ? err.message : 'Failed to update admin');
    } finally {
      setLoading(false);
    }
  }, [fetchAdminUsers]);

  /**
   * Opens the company assignment modal for an admin
   */
  const handleAssignCompanies = useCallback((admin: any) => {
    setSelectedAdmin(admin);
    setShowAssignModal(true);
  }, []);

  // Fetch admin users on mount
  useEffect(() => {
    fetchAdminUsers();
  }, [fetchAdminUsers]);

  return {
    adminUsers,
    loading,
    error,
    showAddModal,
    setShowAddModal,
    selectedAdmin,
    setSelectedAdmin,
    showAssignModal,
    setShowAssignModal,
    fetchAdminUsers,
    handleDeleteAdmin,
    handleToggleSuperadmin,
    handleAssignCompanies,
    setError
  };
};

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

export default useAdminManagement;