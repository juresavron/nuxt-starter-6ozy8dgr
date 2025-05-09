import { StateCreator } from 'zustand';
import { AdminStore } from '../types';

/**
 * Pagination-related state and actions
 */
export const createPaginationSlice: StateCreator<AdminStore, [], [], Pick<AdminStore, 
  'pagination' | 'setPagination' | 'setCurrentPage' | 'setPageSize'
>> = (set) => ({
  // State
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    pageSizeOptions: [10, 20, 50, 100],
    totalItems: 0
  },
  
  // Actions
  setPagination: (pagination) => {
    set(state => { 
      const itemsPerPage = pagination.itemsPerPage !== undefined 
        ? pagination.itemsPerPage 
        : state.pagination.itemsPerPage;
      
      const totalItems = pagination.totalItems !== undefined
        ? pagination.totalItems
        : state.pagination.totalItems;
      
      const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
      
      const currentPage = pagination.currentPage !== undefined
        ? Math.min(pagination.currentPage, totalPages || 1)
        : state.pagination.currentPage;

      return {
        pagination: {
          ...state.pagination,
          ...pagination,
          currentPage,
          itemsPerPage,
          totalItems
        }
      };
    });
  },
  
  setCurrentPage: (currentPage) => {
    console.log('adminStore: Setting current page', { currentPage });
    set(state => ({
      pagination: { ...state.pagination, currentPage }
    }));
  },
  
  setPageSize: (itemsPerPage) => {
    console.log('adminStore: Setting page size', { itemsPerPage });
    set(state => ({
      pagination: { ...state.pagination, itemsPerPage }
    }));
  },
});