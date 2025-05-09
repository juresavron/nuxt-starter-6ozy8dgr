import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { initialState } from './initialState';
import { AdminStore } from './types';

// Import slices
import { createUiSlice } from './slices/uiSlice';
import { createPaginationSlice } from './slices/paginationSlice';
import { createDataSlice } from './slices/dataSlice';
import { createStatusSlice } from './slices/statusSlice';
import { createRoleSlice } from './slices/roleSlice';
import { createDataFetchSlice } from './slices/dataFetchSlice';

/**
 * Create admin store with persistence and dev tools
 */
export const useAdminStore = create<AdminStore>()(
  devtools(
    (...a) => ({
      // Combine all slices
      ...createUiSlice(...a),
      ...createPaginationSlice(...a),
      ...createDataSlice(...a),
      ...createStatusSlice(...a),
      ...createRoleSlice(...a),
      ...createDataFetchSlice(...a),
      
      // Reset function
      reset: () => a[0](initialState)
    }),
    { name: 'admin-store' }
  )
);

// Re-export types
export * from './types';