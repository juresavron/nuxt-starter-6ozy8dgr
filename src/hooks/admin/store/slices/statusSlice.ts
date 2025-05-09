import { StateCreator } from 'zustand';
import { AdminStore } from '../types';

/**
 * Status-related state and actions
 */
export const createStatusSlice: StateCreator<AdminStore, [], [], Pick<AdminStore, 
  'loading' | 'error' | 'setLoading' | 'setError'
>> = (set) => ({
  // State
  loading: true,
  error: null,
  
  // Actions
  setLoading: (loading) => {
    console.log('adminStore: Setting loading state', { loading });
    set({ loading });
  },
  
  setError: (error) => {
    console.log('adminStore: Setting error state', { error: error ? 'Error exists' : 'No error' });
    set({ error });
  },
});