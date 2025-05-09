import { useState, useCallback, useEffect } from 'react';
import { useLogoUpload } from '../../useLogoUpload';
import type { SocialTask } from '../../../components/admin/modals/SocialTasksSection';

/**
 * Hook for managing company form state
 * @param showAddCompany Whether the add company modal is shown
 * @param showEditCompany Whether the edit company modal is shown
 * @returns Company form state and handlers
 */
export const useCompanyForm = (
  showAddCompany?: boolean,
  showEditCompany?: boolean
) => {
  // Form state
  const [newCompany, setNewCompany] = useState({
    name: '',
    google_link: '',
    logo_url: '',
    color_scheme: 'indigo',
    gift_description: '',
    industry_id: null as string | null,
    feedback_options: [] as string[],
    coupon_type: 'coupon' as 'coupon' | 'lottery' | 'none',
    lottery_drawing_frequency: 'monthly' as string,
    lottery_drawing_day: 1 as number,
    social_tasks: [{ platform: '', url: '' }] as SocialTask[]
  });
  
  const [editingCompany, setEditingCompany] = useState<any>(null);
  
  // Error state
  const [formError, setFormError] = useState('');
  const [editError, setEditError] = useState('');
  
  // Loading state
  const [addingCompany, setAddingCompany] = useState(false);
  const [editingCompanyStatus, setEditingCompanyStatus] = useState(false);
  
  // Logo upload hook
  const { uploadLogo } = useLogoUpload();
  
  // Color scheme options
  const colorSchemes = [
    { id: 'indigo', name: 'Indigo', primary: 'from-indigo-500 to-purple-500', secondary: 'bg-indigo-50' },
    { id: 'emerald', name: 'Emerald', primary: 'from-emerald-500 to-teal-500', secondary: 'bg-emerald-50' },
    { id: 'amber', name: 'Amber', primary: 'from-amber-500 to-orange-500', secondary: 'bg-amber-50' },
    { id: 'rose', name: 'Rose', primary: 'from-rose-500 to-pink-500', secondary: 'bg-rose-50' },
    { id: 'bw', name: 'Black & White', primary: 'from-gray-700 to-gray-900', secondary: 'bg-gray-100' }
  ];
  
  // Load stored data when modals open/close
  useEffect(() => {
    if (showAddCompany) {
      const storedData = localStorage.getItem('newCompanyData');
      if (storedData) {
        try {
          setNewCompany(JSON.parse(storedData));
        } catch (e) {
          console.error('Failed to parse stored company data:', e);
          localStorage.removeItem('newCompanyData');
        }
      }
    }
    
    if (showEditCompany) {
      const storedData = localStorage.getItem('editingCompanyData');
      if (storedData) {
        try {
          setEditingCompany(JSON.parse(storedData));
        } catch (e) {
          console.error('Failed to parse stored editing company data:', e);
          localStorage.removeItem('editingCompanyData');
        }
      }
    }
  }, [showAddCompany, showEditCompany]);
  
  // Store form data in localStorage when it changes
  useEffect(() => {
    if (showAddCompany) {
      localStorage.setItem('newCompanyData', JSON.stringify(newCompany));
    }
    
    if (showEditCompany && editingCompany) {
      localStorage.setItem('editingCompanyData', JSON.stringify(editingCompany));
    }
  }, [newCompany, editingCompany, showAddCompany, showEditCompany]);
  
  // Form field change handlers
  const handleCompanyChange = useCallback((field: string, value: any) => {
    setNewCompany(prev => ({ ...prev, [field]: value }));
  }, []);
  
  const handleEditingCompanyChange = useCallback((field: string, value: any) => {
    setEditingCompany(prev => ({ ...prev, [field]: value }));
  }, []);
  
  // Color scheme change handlers
  const handleNewCompanyColorChange = useCallback((color: string) => {
    setNewCompany(prev => ({ ...prev, color_scheme: color }));
  }, []);
  
  const handleEditingCompanyColorChange = useCallback((color: string) => {
    setEditingCompany(prev => ({ ...prev, color_scheme: color }));
  }, []);
  
  // Logo upload handlers
  const handleNewCompanyLogoChange = useCallback(async (file: File) => {
    try {
      const result = await uploadLogo(file);
      if (result.url) {
        setNewCompany(prev => ({ ...prev, logo_url: result.url }));
      } else if (result.error) {
        setFormError(result.error);
      }
    } catch (error) {
      setFormError('Failed to upload logo');
    }
  }, [uploadLogo]);
  
  const handleEditingCompanyLogoChange = useCallback(async (file: File) => {
    try {
      const result = await uploadLogo(file);
      if (result.url) {
        setEditingCompany(prev => ({ ...prev, logo_url: result.url }));
      } else if (result.error) {
        setEditError(result.error);
      }
    } catch (error) {
      setEditError('Failed to upload logo');
    }
  }, [uploadLogo]);
  
  // Social task handlers
  const addSocialTask = useCallback(() => {
    setNewCompany(prev => ({
      ...prev,
      social_tasks: [...prev.social_tasks, { platform: '', url: '' }]
    }));
  }, []);
  
  const removeSocialTask = useCallback((index: number) => {
    setNewCompany(prev => ({
      ...prev,
      social_tasks: prev.social_tasks.filter((_, i) => i !== index)
    }));
  }, []);
  
  const updateSocialTask = useCallback((index: number, field: 'platform' | 'url', value: string) => {
    setNewCompany(prev => ({
      ...prev,
      social_tasks: prev.social_tasks.map((task, i) => 
        i === index ? { ...task, [field]: value } : task
      )
    }));
  }, []);
  
  // Edit social task handlers
  const handleEditAddTask = useCallback(() => {
    setEditingCompany(prev => ({
      ...prev,
      social_tasks: [...(prev.social_tasks || []), { platform: '', url: '' }]
    }));
  }, []);
  
  const handleEditRemoveTask = useCallback((index: number) => {
    setEditingCompany(prev => ({
      ...prev,
      social_tasks: prev.social_tasks.filter((_, i) => i !== index)
    }));
  }, []);
  
  const handleEditUpdateTask = useCallback((index: number, field: 'platform' | 'url', value: string) => {
    setEditingCompany(prev => ({
      ...prev,
      social_tasks: prev.social_tasks.map((task, i) => 
        i === index ? { ...task, [field]: value } : task
      )
    }));
  }, []);
  
  // Form validation
  const validateNewCompany = useCallback(() => {
    if (!newCompany.name.trim()) {
      setFormError('Company name is required');
      return false;
    }
    
    if (!newCompany.google_link.trim()) {
      setFormError('Google link is required');
      return false;
    }
    
    // Validate social tasks
    const validTasks = newCompany.social_tasks.filter(task => 
      task.platform.trim() && task.url.trim()
    );
    
    const invalidTasks = newCompany.social_tasks.filter(task => 
      (task.platform.trim() && !task.url.trim()) || (!task.platform.trim() && task.url.trim())
    );
    
    if (invalidTasks.length > 0) {
      setFormError('All social tasks must have both platform and URL');
      return false;
    }
    
    return true;
  }, [newCompany]);
  
  const validateEditingCompany = useCallback(() => {
    if (!editingCompany?.name?.trim()) {
      setEditError('Company name is required');
      return false;
    }
    
    if (!editingCompany?.google_link?.trim()) {
      setEditError('Google link is required');
      return false;
    }
    
    // Validate social tasks
    if (editingCompany?.social_tasks) {
      const validTasks = editingCompany.social_tasks.filter((task: SocialTask) => 
        task.platform.trim() && task.url.trim()
      );
      
      const invalidTasks = editingCompany.social_tasks.filter((task: SocialTask) => 
        (task.platform.trim() && !task.url.trim()) || (!task.platform.trim() && task.url.trim())
      );
      
      if (invalidTasks.length > 0) {
        setEditError('All social tasks must have both platform and URL');
        return false;
      }
    }
    
    return true;
  }, [editingCompany]);
  
  // Clear stored data
  const clearStoredData = useCallback(() => {
    localStorage.removeItem('newCompanyData');
    localStorage.removeItem('editingCompanyData');
  }, []);
  
  // Reset new company form
  const resetNewCompany = useCallback(() => {
    setNewCompany({
      name: '',
      google_link: '',
      logo_url: '',
      color_scheme: 'indigo',
      gift_description: '',
      industry_id: null,
      feedback_options: [],
      coupon_type: 'coupon',
      lottery_drawing_frequency: 'monthly',
      lottery_drawing_day: 1,
      social_tasks: [{ platform: '', url: '' }]
    });
  }, []);

  return {
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
    addSocialTask,
    removeSocialTask,
    updateSocialTask,
    handleEditAddTask,
    handleEditRemoveTask,
    handleEditUpdateTask,
    handleNewCompanyLogoChange,
    handleEditingCompanyLogoChange,
    validateNewCompany,
    validateEditingCompany,
    clearStoredData,
    resetNewCompany,
    colorSchemes
  };
};

export default useCompanyForm;