import type { Database } from '../../../types/database';
import type { BlogPost } from '../../../types/blog';

export type Company = Database['public']['Tables']['companies']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
export type SocialTask = Database['public']['Tables']['social_tasks']['Row'];

export type ActiveTab = 'overview' | 'companies' | 'blog' | 'contacts' | 'admins' | 'subscriptions';

export interface DateRangeState {
  dateRange: string;
  customDateRange: {
    startDate: Date;
    endDate: Date;
  };
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  pageSizeOptions: number[];
  totalItems: number;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface AdminState {
  // UI state
  activeTab: ActiveTab;
  searchTerm: string;
  dateRange: string;
  customDateRange: {
    startDate: Date;
    endDate: Date;
  };
  sortConfig: SortConfig;
  pagination: PaginationState;
  
  // Role-based access control
  isSuperAdmin: boolean;
  assignedCompanyIds: string[];
  
  // Data
  companies: Company[];
  reviews: Review[];
  tasks: SocialTask[];
  blogPosts: BlogPost[];
  subscriptions: any[];
  emailLogs: any[];
  smsLogs: any[];
  
  // Status
  loading: boolean;
  error: string | null;
}

export interface AdminActions {
  // Role-based access control
  setIsSuperAdmin: (isSuperAdmin: boolean) => void;
  setAssignedCompanyIds: (companyIds: string[]) => void;
  saveCompanyAssignments: (adminId: string, companyAssignments: Record<string, boolean>) => Promise<void>;
  
  // UI state actions
  setActiveTab: (tab: ActiveTab) => void;
  setSearchTerm: (term: string) => void;
  setDateRange: (range: string) => void;
  setCustomDateRange: (startDate: Date, endDate: Date) => void;
  setSortConfig: (config: SortConfig) => void;
  
  // Data actions
  setCompanies: (companies: Company[]) => void;
  setReviews: (reviews: Review[]) => void;
  setTasks: (tasks: SocialTask[]) => void;
  setBlogPosts: (posts: BlogPost[]) => void;
  setSubscriptions: (subscriptions: any[]) => void;
  setEmailLogs: (emailLogs: any[]) => void;
  setSmsLogs: (smsLogs: any[]) => void;
  
  // Pagination actions
  setPagination: (pagination: Partial<PaginationState>) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  
  // Status actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Data fetching
  fetchData: () => Promise<void>;
  
  // Data mutations
  deleteCompany: (companyId: string) => Promise<void>;
  
  // Reset
  reset: () => void;
}

export type AdminStore = AdminState & AdminActions;