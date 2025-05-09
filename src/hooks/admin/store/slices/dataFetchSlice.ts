import { StateCreator } from 'zustand';
import { AdminStore } from '../types';
import { checkNetworkConnection } from '../utils';
import { 
  fetchCompanies, 
  deleteCompany as deleteCompanyFn,
  fetchReviews, 
  fetchTasks, 
  fetchBlogPosts, 
  fetchSubscriptions,
  fetchEmailLogs,
  fetchSmsLogs
} from '../fetchers';

/**
 * Data fetching actions with improved error handling and retries
 */
export const createDataFetchSlice: StateCreator<AdminStore, [], [], Pick<AdminStore, 'fetchData' | 'deleteCompany'>> = 
  (set, get) => ({
    fetchData: async () => {
      const state = get();

      // ✅ Fix: If admin has no assigned companies, exit early and stop loading loop
      if (!state.isSuperAdmin && state.assignedCompanyIds.length === 0) {
        console.log('🚫 Admin has no assigned companies – skipping fetch');
        set({
          companies: [],
          reviews: [],
          tasks: [],
          blogPosts: [],
          subscriptions: [],
          loading: false
        });
        return;
      }

      set({ loading: true, error: null });
      
      try {
        // Enhanced network connectivity check with retries
        let isNetworkAvailable = false;
        let networkCheckAttempts = 0;
        const maxNetworkCheckAttempts = 5; // Increased from 3 to 5

        while (!isNetworkAvailable && networkCheckAttempts < maxNetworkCheckAttempts) {
          isNetworkAvailable = await checkNetworkConnection(3, 3000); // Increased initial delay
          if (!isNetworkAvailable) {
            networkCheckAttempts++;
            if (networkCheckAttempts < maxNetworkCheckAttempts) {
              // Exponential backoff with longer initial delay
              await new Promise(resolve => setTimeout(resolve, Math.pow(2, networkCheckAttempts) * 3000));
            }
          }
        }

        if (!isNetworkAvailable) {
          throw new Error(
            'Unable to connect to the server. Please check:\n\n' +
            '1. Your internet connection\n' +
            '2. That you\'re logged in\n' +
            '3. Try refreshing the page\n\n' +
            'If the problem persists, please contact support.'
          );
        }

        console.log('adminStore: Fetching data', {
          supabaseUrl: import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Not set',
          supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Not set'
        });

        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
          throw new Error('Configuration error: Supabase credentials are missing. Please check your environment variables.');
        }
        
        // Fetch companies with retry
        const companiesData = await fetchCompanies(state.isSuperAdmin, state.assignedCompanyIds);
        console.log('adminStore: Successfully fetched companies:', companiesData?.length || 0);
        
        // Fetch reviews in batches with retry
        const allReviews = await fetchReviews(state.isSuperAdmin, state.assignedCompanyIds);
        console.log(`adminStore: Total reviews fetched: ${allReviews.length}`);
        
        // Fetch social tasks with retry
        const tasksData = await fetchTasks(state.isSuperAdmin, state.assignedCompanyIds);
        console.log('adminStore: Successfully fetched social tasks:', tasksData?.length || 0);
        
        // Fetch blog posts with retry
        const blogData = await fetchBlogPosts();
        console.log('adminStore: Successfully fetched blog posts:', blogData?.length || 0);
        
        // Fetch subscriptions with retry
        const subscriptionsData = await fetchSubscriptions();
        
        // Fetch email logs with retry
        const emailLogsData = await fetchEmailLogs(state.isSuperAdmin, state.assignedCompanyIds);
        console.log('adminStore: Successfully fetched email logs:', emailLogsData?.length || 0);
        
        // Fetch SMS logs with retry
        const smsLogsData = await fetchSmsLogs(state.isSuperAdmin, state.assignedCompanyIds);
        console.log('adminStore: Successfully fetched SMS logs:', smsLogsData?.length || 0);

        // Update state with fetched data
        set({
          companies: companiesData || [],
          reviews: allReviews,
          tasks: tasksData || [],
          blogPosts: blogData || [],
          subscriptions: subscriptionsData || [],
          emailLogs: emailLogsData || [],
          smsLogs: smsLogsData || [],
          loading: false
        });
        
        console.log('adminStore: Data fetched successfully', {
          companies: companiesData?.length || 0,
          reviews: allReviews.length,
          tasks: tasksData?.length || 0,
          blogPosts: blogData?.length || 0,
          subscriptions: subscriptionsData?.length || 0,
          emailLogs: emailLogsData?.length || 0,
          smsLogs: smsLogsData?.length || 0
        });
      } catch (err) {
        console.error('adminStore: Error fetching admin data:', err);
        
        let errorMessage = 'An unexpected error occurred while fetching data';
        
        if (err instanceof Error) {
          if (err.message.includes('Network error') || err.message.includes('Unable to connect')) {
            errorMessage = err.message;
          } else if (err.message.includes('Configuration error')) {
            errorMessage = err.message;
          } else if (err.message.includes('Failed to fetch')) {
            errorMessage = 'Unable to connect to the server. Please check your network connection and try again.';
          } else if (err.message.includes('JWT') || err.message.includes('auth')) {
            errorMessage = 'Your session has expired. Please log in again.';
          } else if (err.message.includes('permission')) {
            errorMessage = 'You do not have permission to access this data.';
          } else if (err.message.includes('timeout')) {
            errorMessage = 'Request timeout: The server took too long to respond. Please try again later.';
          } else {
            errorMessage = err.message;
          }
        }
        
        set({ 
          error: errorMessage,
          loading: false
        });
      }
    },
    
    /**
     * Deletes a company and updates the state without refetching all data
     * @param companyId Company ID to delete
     */
    deleteCompany: async (companyId: string) => {
      set({ loading: true, error: null });
      
      try {
        // Delete company from database
        await deleteCompanyFn(companyId);
        
        // Update state by filtering out the deleted company
        set(state => ({
          companies: state.companies.filter(company => company.id !== companyId),
          // Also filter out related tasks
          tasks: state.tasks.filter(task => task.company_id !== companyId),
          // Also filter out related reviews
          reviews: state.reviews.filter(review => review.company_id !== companyId),
          loading: false
        }));
        
        console.log(`adminStore: Company ${companyId} deleted successfully`);
      } catch (err) {
        console.error('adminStore: Error deleting company:', err);
        set({ 
          error: err instanceof Error ? err.message : 'Failed to delete company',
          loading: false
        });
      }
    }
  });