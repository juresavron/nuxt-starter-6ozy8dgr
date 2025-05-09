import { useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import type { SocialTask } from '../../../components/admin/modals/SocialTasksSection';
import type { Database } from '../../../types/database';

type Company = Database['public']['Tables']['companies']['Row'];

/**
 * Hook for company operations (create, update, delete)
 * @param onSuccess Callback to run after successful operation
 * @param setAddingCompany Function to set adding company state
 * @param setEditingCompanyStatus Function to set editing company state
 * @param setFormError Function to set form error
 * @param setEditError Function to set edit error
 * @param setShowAddCompany Function to set show add company modal
 * @param setShowEditCompany Function to set show edit company modal
 * @param clearStoredData Function to clear stored data
 * @param resetNewCompany Function to reset new company form
 * @returns Company operation functions
 */
export const useCompanyOperations = (
  onSuccess: () => void,
  setAddingCompany: (adding: boolean) => void,
  setEditingCompanyStatus: (editing: boolean) => void,
  setFormError: (error: string) => void,
  setEditError: (error: string) => void,
  setShowAddCompany?: (show: boolean) => void,
  setShowEditCompany?: (show: boolean) => void,
  clearStoredData?: () => void,
  resetNewCompany?: () => void
) => {
  /**
   * Handles adding a new company
   * @param e Form event
   * @param newCompany New company data
   * @param isValid Whether the form is valid
   */
  const handleAddCompanyOperation = useCallback(async (
    e: React.FormEvent,
    newCompany: any,
    isValid: boolean
  ) => {
    e.preventDefault();
    
    if (!isValid) {
      return;
    }
    
    setAddingCompany(true);
    setFormError('');
    
    try {
      // Insert company
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .insert({
          name: newCompany.name.trim(),
          google_link: newCompany.google_link.trim(),
          logo_url: newCompany.logo_url || null,
          color_scheme: newCompany.color_scheme,
          gift_description: newCompany.gift_description?.trim() || null,
          industry_id: newCompany.industry_id || null,
          feedback_options: newCompany.feedback_options || null,
          coupon_type: newCompany.coupon_type || 'coupon',
          lottery_drawing_frequency: newCompany.lottery_drawing_frequency || 'monthly',
          lottery_drawing_day: newCompany.lottery_drawing_day || 1
        })
        .select()
        .single();
        
      if (companyError) throw companyError;
      
      if (!companyData) {
        throw new Error('Failed to create company');
      }
      
      // Insert social tasks
      const validTasks = newCompany.social_tasks.filter((task: SocialTask) => 
        task.platform.trim() && task.url.trim()
      );
      
      if (validTasks.length > 0) {
        const tasksToInsert = validTasks.map((task: SocialTask) => ({
          company_id: companyData.id,
          platform: task.platform.trim(),
          url: task.url.trim()
        }));
        
        const { error: tasksError } = await supabase
          .from('social_tasks')
          .insert(tasksToInsert);
          
        if (tasksError) throw tasksError;
      }
      
      // Reset form and close modal
      if (resetNewCompany) resetNewCompany();
      if (clearStoredData) clearStoredData();
      if (setShowAddCompany) setShowAddCompany(false);
      
      // Call success callback
      onSuccess();
      
    } catch (err) {
      console.error('Error adding company:', err);
      setFormError(err instanceof Error ? err.message : 'Failed to add company');
    } finally {
      setAddingCompany(false);
    }
  }, [onSuccess, setAddingCompany, setFormError, setShowAddCompany, clearStoredData, resetNewCompany]);

  /**
   * Handles editing an existing company
   * @param e Form event
   * @param editingCompany Editing company data
   * @param isValid Whether the form is valid
   */
  const handleEditSubmitOperation = useCallback(async (
    e: React.FormEvent,
    editingCompany: any,
    isValid: boolean
  ) => {
    e.preventDefault();
    
    if (!isValid) {
      return;
    }
    
    setEditingCompanyStatus(true);
    setEditError('');
    
    try {
      // Update company
      const { error: companyError } = await supabase
        .from('companies')
        .update({
          name: editingCompany.name.trim(),
          google_link: editingCompany.google_link.trim(),
          logo_url: editingCompany.logo_url || null,
          color_scheme: editingCompany.color_scheme,
          gift_description: editingCompany.gift_description?.trim() || null,
          industry_id: editingCompany.industry_id,
          feedback_options: editingCompany.feedback_options || null,
          coupon_type: editingCompany.coupon_type || 'coupon',
          lottery_drawing_frequency: editingCompany.lottery_drawing_frequency || 'monthly',
          lottery_drawing_day: editingCompany.lottery_drawing_day || 1
        })
        .eq('id', editingCompany.id);
        
      if (companyError) throw companyError;
      
      // Delete existing social tasks
      const { error: deleteError } = await supabase
        .from('social_tasks')
        .delete()
        .eq('company_id', editingCompany.id);
        
      if (deleteError) throw deleteError;
      
      // Insert new social tasks
      const validTasks = editingCompany.social_tasks.filter((task: SocialTask) => 
        task.platform.trim() && task.url.trim()
      );
      
      if (validTasks.length > 0) {
        const tasksToInsert = validTasks.map((task: SocialTask) => ({
          company_id: editingCompany.id,
          platform: task.platform.trim(),
          url: task.url.trim()
        }));
        
        const { error: tasksError } = await supabase
          .from('social_tasks')
          .insert(tasksToInsert);
          
        if (tasksError) throw tasksError;
      }
      
      // Close modal and clear data
      if (clearStoredData) clearStoredData();
      if (setShowEditCompany) setShowEditCompany(false);
      
      // Call success callback
      onSuccess();
      
    } catch (err) {
      console.error('Error updating company:', err);
      setEditError(err instanceof Error ? err.message : 'Failed to update company');
    } finally {
      setEditingCompanyStatus(false);
    }
  }, [onSuccess, setEditingCompanyStatus, setEditError, setShowEditCompany, clearStoredData]);

  /**
   * Prepares company data for editing
   * @param company Company to edit
   * @param companyTasks Company tasks
   * @returns Prepared company data
   */
  const prepareEditCompany = useCallback((
    company: Company,
    companyTasks: SocialTask[]
  ) => {
    return {
      id: company.id,
      name: company.name,
      google_link: company.google_link,
      logo_url: company.logo_url || '',
      color_scheme: company.color_scheme || 'indigo',
      gift_description: company.gift_description || '',
      industry_id: company.industry_id || null,
      feedback_options: company.feedback_options || [],
      coupon_type: company.coupon_type || 'coupon',
      lottery_drawing_frequency: company.lottery_drawing_frequency || 'monthly',
      lottery_drawing_day: company.lottery_drawing_day || 1,
      social_tasks: companyTasks.length > 0 
        ? companyTasks 
        : [{ platform: '', url: '' }]
    };
  }, []);

  return {
    handleAddCompanyOperation,
    handleEditSubmitOperation,
    prepareEditCompany
  };
};

export default useCompanyOperations;