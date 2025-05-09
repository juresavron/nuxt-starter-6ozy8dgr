import { useCallback } from 'react';
import { useCompanyForm } from './useCompanyForm';
import { useCompanyOperations } from './useCompanyOperations';
import type { Database } from '../../../types/database';

type Company = Database['public']['Tables']['companies']['Row'];

/**
 * Hook for managing company operations
 * Combines form state and CRUD operations
 * @param onSuccess Callback to run after successful operation
 * @param fetchData Function to fetch data
 * @param showAddCompany Whether the add company modal is shown
 * @param setShowAddCompany Function to set show add company modal
 * @param showEditCompany Whether the edit company modal is shown
 * @param setShowEditCompany Function to set show edit company modal
 * @returns Company management functions and state
 */
export const useCompanyManagement = (
  onSuccess: () => void,
  fetchData: () => Promise<void>,
  showAddCompany?: boolean,
  setShowAddCompany?: (show: boolean) => void,
  showEditCompany?: boolean,
  setShowEditCompany?: (show: boolean) => void
) => {
  // Use the company form hook for form state management
  const {
    newCompany,
    editingCompany,
    formError,
    editError,
    addingCompany,
    editingCompanyStatus,
    setNewCompany,
    setEditingCompany,
    setFormError,
    setEditError,
    setAddingCompany,
    setEditingCompanyStatus,
    handleCompanyChange,
    handleEditingCompanyChange,
    handleNewCompanyColorChange,
    handleEditingCompanyColorChange,
    // Social task handlers
    addSocialTask,
    removeSocialTask,
    updateSocialTask,
    handleEditAddTask,
    handleEditRemoveTask,
    handleEditUpdateTask,
    // Logo handlers
    handleNewCompanyLogoChange,
    handleEditingCompanyLogoChange,
    validateNewCompany,
    validateEditingCompany,
    clearStoredData,
    resetNewCompany
  } = useCompanyForm(showAddCompany, showEditCompany);

  // Use the company operations hook for CRUD operations
  const {
    handleAddCompanyOperation,
    handleEditSubmitOperation,
    prepareEditCompany
  } = useCompanyOperations(
    onSuccess,
    setAddingCompany,
    setEditingCompanyStatus,
    setFormError,
    setEditError,
    setShowAddCompany,
    setShowEditCompany,
    clearStoredData,
    resetNewCompany
  );

  // Wrapper functions that combine validation with operations
  const handleAddCompany = useCallback((e: React.FormEvent) => {
    console.log('Adding company with data:', newCompany);
    const isValid = validateNewCompany();
    return handleAddCompanyOperation(e, newCompany, isValid);
  }, [newCompany, validateNewCompany, handleAddCompanyOperation]);

  const handleEditSubmit = useCallback((e: React.FormEvent) => {
    console.log('Submitting edit with data:', editingCompany);
    const isValid = validateEditingCompany();
    return handleEditSubmitOperation(e, editingCompany, isValid);
  }, [editingCompany, validateEditingCompany, handleEditSubmitOperation]);

  const handleEditCompany = useCallback((company: Company, companyTasks: { platform: string; url: string }[]) => {
    console.log('Preparing company for editing:', company.name);
    console.log('Company tasks:', companyTasks);
    // Clear any previous editing data first
    localStorage.removeItem('editingCompanyData');
    
    // Create a fresh edit data object
    const editData = prepareEditCompany(company, companyTasks);
    
    // Store the fresh data in localStorage
    localStorage.setItem('editingCompanyData', JSON.stringify(editData));
    
    // Set the editing company state with the fresh data
    setEditingCompany(editData);
    
    return editData;
  }, [prepareEditCompany, setEditingCompany]);

  return {
    // Form state
    newCompany,
    editingCompany,
    formError,
    editError,
    addingCompany,
    editingCompanyStatus,
    
    // Form handlers
    handleCompanyChange,
    handleEditingCompanyChange,
    handleNewCompanyColorChange,
    handleEditingCompanyColorChange,
    
    // Social task handlers
    addSocialTask,
    removeSocialTask,
    updateSocialTask,
    handleEditAddTask,
    handleEditRemoveTask,
    handleEditUpdateTask,
    
    // Logo handlers
    handleNewCompanyLogoChange,
    handleEditingCompanyLogoChange,
    
    // CRUD operations
    handleAddCompany,
    handleEditSubmit,
    handleEditCompany
  };
};

export default useCompanyManagement;