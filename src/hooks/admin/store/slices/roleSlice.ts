import { StateCreator } from 'zustand';
import { AdminStore } from '../types';
import { supabase } from '../../../../lib/supabase';
import { retryWithBackoff } from '../utils';

/**
 * Role-based access control state and actions
 */
export const createRoleSlice: StateCreator<AdminStore, [], [], Pick<AdminStore, 
  'isSuperAdmin' | 'assignedCompanyIds' | 'setIsSuperAdmin' | 'setAssignedCompanyIds' | 'saveCompanyAssignments'
>> = (set) => ({
  // State
  isSuperAdmin: false,
  assignedCompanyIds: [],
  
  // Actions
  setIsSuperAdmin: (isSuperAdmin) => set({ isSuperAdmin }),
  
  setAssignedCompanyIds: (assignedCompanyIds) => set({ assignedCompanyIds }),
  
  saveCompanyAssignments: async (adminId: string, companyAssignments: Record<string, boolean>) => {
    set({ loading: true, error: null });
    try {
      console.log('adminStore: Saving company assignments', { adminId, assignmentsCount: Object.keys(companyAssignments).length });
      
      await retryWithBackoff(async () => {
        // Delete existing assignments for the admin
        const { error: deleteError } = await supabase
          .from('company_admins')
          .delete()
          .eq('admin_id', adminId);
          
        if (deleteError) throw deleteError;
        
        // Insert new assignments
        const assignmentsToInsert = Object.entries(companyAssignments)
          .filter(([_, isAssigned]) => isAssigned)
          .map(([companyId, _]) => ({ 
            admin_id: adminId, 
            company_id: companyId 
          }));
        
        if (assignmentsToInsert.length > 0) {
          const { error: insertError } = await supabase
            .from('company_admins')
            .insert(assignmentsToInsert);
            
          if (insertError) throw insertError;
        }
      });
      
      console.log('adminStore: Company assignments saved successfully');
    } catch (err) {
      console.error('adminStore: Error saving company assignments:', err);
      set({ error: err instanceof Error ? err.message : 'Failed to save company assignments' });
    } finally {
      set({ loading: false });
    }
  },
});