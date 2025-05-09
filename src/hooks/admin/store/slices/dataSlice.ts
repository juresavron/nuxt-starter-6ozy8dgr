import { StateCreator } from 'zustand';
import { AdminStore } from '../types';

/**
 * Data-related state and actions
 */
export const createDataSlice: StateCreator<AdminStore, [], [], Pick<AdminStore, 
  'companies' | 'reviews' | 'tasks' | 'blogPosts' | 'subscriptions' |
  'setCompanies' | 'setReviews' | 'setTasks' | 'setBlogPosts' | 'setSubscriptions'
>> = (set) => ({
  // State
  companies: [],
  reviews: [],
  tasks: [],
  blogPosts: [],
  subscriptions: [],
  emailLogs: [],
  smsLogs: [],
  
  // Actions
  setCompanies: (companies) => set({ companies }),
  
  setReviews: (reviews) => {
    console.log('adminStore: Setting reviews', { count: reviews?.length || 0 });
    set({ reviews });
  },
  
  setTasks: (tasks) => set({ tasks }),
  
  setBlogPosts: (posts) => {
    console.log('adminStore: Setting blog posts', { count: posts?.length || 0 });
    set({ blogPosts: posts });
  },
  
  setSubscriptions: (subscriptions) => {
    console.log('adminStore: Setting subscriptions', { count: subscriptions?.length || 0 });
    set({ subscriptions });
  },
  
  setEmailLogs: (emailLogs) => {
    console.log('adminStore: Setting email logs', { count: emailLogs?.length || 0 });
    set({ emailLogs });
  },
  
  setSmsLogs: (smsLogs) => {
    console.log('adminStore: Setting SMS logs', { count: smsLogs?.length || 0 });
    set({ smsLogs });
  },
});