import { AdminState } from './types';

/**
 * Initial state for the admin store
 */
export const initialState: AdminState = {
  // UI state
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
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    pageSizeOptions: [10, 20, 50, 100],
    totalItems: 0
  },
  
  // Role-based access control
  isSuperAdmin: false,
  assignedCompanyIds: [],
  
  // Data
  companies: [],
  reviews: [],
  tasks: [],
  blogPosts: [],
  subscriptions: [],
  emailLogs: [],
  smsLogs: [],
  
  // Status
  loading: true,
  error: null
};