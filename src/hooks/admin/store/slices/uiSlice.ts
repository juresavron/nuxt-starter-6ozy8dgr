import { StateCreator } from 'zustand';
import { AdminStore } from '../types';

/**
 * UI-related state and actions
 */
export const createUiSlice: StateCreator<AdminStore, [], [], Pick<AdminStore, 
  'activeTab' | 'searchTerm' | 'dateRange' | 'customDateRange' | 'sortConfig' |
  'setActiveTab' | 'setSearchTerm' | 'setDateRange' | 'setCustomDateRange' | 'setSortConfig'
>> = (set) => ({
  // State
  activeTab: 'overview',
  searchTerm: '',
  dateRange: '30d',
  customDateRange: {
    startDate: (() => {
      const date = new Date();
      date.setDate(date.getDate() - 30);
      date.setHours(0, 0, 0, 0);
      return date;
    })(),
    endDate: new Date()
  },
  sortConfig: {
    key: 'created_at',
    direction: 'desc'
  },
  
  // Actions
  setActiveTab: (activeTab) => set({ activeTab }),
  
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  
  setDateRange: (dateRange) => set({ dateRange }),
  
  setCustomDateRange: (startDate, endDate) => {
    console.log('adminStore: Setting custom date range', {
      startDate: startDate?.toISOString().split('T')[0] || 'invalid date',
      endDate: endDate?.toISOString().split('T')[0] || 'invalid date',
      duration: startDate && endDate ? 
        Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) : 
        'unknown'
    });
    set({ 
      customDateRange: { 
        startDate: new Date(startDate), 
        endDate: new Date(endDate) 
      },
      dateRange: 'custom'
    });
  },
  
  setSortConfig: (sortConfig) => set({ sortConfig }),
});