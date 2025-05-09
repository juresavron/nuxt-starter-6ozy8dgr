import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from "../../hooks/admin/store";
import { useAuth } from '../../hooks/auth/useAuth';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import AdminAuthInitializer from './AdminAuthInitializer';
import AdminLoadingState from './admin-components/AdminLoadingState';
import ErrorAlert from '../shared/ErrorAlert';
import { ErrorSeverity } from '../../utils/errorHandler';
import { supabase } from '../../lib/supabase';
import CompanyModal from './modals/company/CompanyModal';

// Import sidebar and content components
import AdminSidebar from './navigation/AdminSidebar';
import AdminContent from './admin-components/AdminContent';

const AdminPanel: React.FC = () => {
  const isClient = typeof window !== 'undefined';
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'companies' | 'blog' | 'contacts' | 'admins' | 'subscriptions' | 'coupons' | 'lottery' | 'communications'>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#blog') {
      return 'blog';
    }
    if (typeof window !== 'undefined' && window.location.hash === '#subscriptions') {
      return 'subscriptions';
    }
    if (typeof window !== 'undefined' && window.location.hash === '#coupons') {
      return 'coupons';
    }
    if (typeof window !== 'undefined' && window.location.hash === '#lottery') {
      return 'lottery';
    }
    if (typeof window !== 'undefined' && window.location.hash === '#communications') {
      return 'communications';
    }
    return 'overview';
  });

  const [showAddCompany, setShowAddCompany] = useState(false); 
  const [showEditCompany, setShowEditCompany] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Default to collapsed on mobile and tablet
    return window.innerWidth < 1024;
  });

  // Listen for window resize events to auto-collapse sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const {
    companies, 
    reviews, 
    tasks, 
    blogPosts,
    subscriptions,
    emailLogs,
    smsLogs,
    loading, 
    error,
    fetchData, 
    setError,
    isSuperAdmin,
    assignedCompanyIds,
    deleteCompany
  } = isClient ? useAdminStore() : {
    companies: [],
    reviews: [],
    tasks: [],
    blogPosts: [],
    subscriptions: [],
    emailLogs: [],
    smsLogs: [],
    loading: true,
    error: null,
    fetchData: () => Promise.resolve(),
    setError: () => {},
    isSuperAdmin: false,
    assignedCompanyIds: [],
    deleteCompany: () => Promise.resolve()
  };

  const { userRole } = useAuth();
  const { addPost, editPost, deletePost, togglePublish } = useBlogPosts();

  const memoizedFetchData = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (activeTab === 'blog' && !isSuperAdmin) {
      setActiveTab('overview');
    }
    if (typeof window !== 'undefined') {
      window.location.hash = activeTab;
    }
  }, [activeTab, isSuperAdmin]);

  useEffect(() => {
    if (isClient && typeof fetchData === 'function') {
      const testConnection = async () => {
        try {
          setConnectionError(null);
          const { error } = await supabase.from('companies').select('count').limit(1);
          if (error) {
            setConnectionError(`Connection error: ${error.message}`);
            return false;
          }
          return true;
        } catch (err) {
          setConnectionError(`Connection error: ${err instanceof Error ? err.message : 'Unknown error'}`);
          return false;
        }
      };
      testConnection().then(success => {
        if (success) {
          memoizedFetchData().catch(err => {
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
          });
        }
      });
    }
  }, [memoizedFetchData, isClient, setError]);

  const handleSignOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/home';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign out');
    }
  }, [navigate, setError]);

  const handleAddCompany = useCallback(() => {
    setShowAddCompany(true);
  }, []);

  const handleEditCompany = useCallback((company: any) => {
    const companyTasks = tasks.filter(t => t.company_id === company.id);
    console.log('Editing company:', company.name);
    console.log('Company tasks:', companyTasks);
    setEditingCompany({
      ...company,
      social_tasks: companyTasks.length > 0 ? companyTasks : [{ platform: '', url: '' }]
    });
    setShowEditCompany(true);
  }, [tasks]);

  const handleDeleteCompany = useCallback(async (companyId: string) => {
    try {
      await deleteCompany(companyId);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete company');
      return false;
    }
  }, [deleteCompany, setError]);

  const [showAddBlogModal, setShowAddBlogModal] = useState(false);
  const [showEditBlogModal, setShowEditBlogModal] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState<any | null>(null);

  const handleAddBlogPost = useCallback(() => {
    setShowAddBlogModal(true);
  }, []);

  const handleEditBlogPost = useCallback(async (post: any) => {
    try {
      setEditingBlogPost(post);
      setShowEditBlogModal(true); 
      return await editPost(post.id, post);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to edit blog post');
      return null;
    }
  }, [editPost, setError]);

  const handleDeleteBlogPost = useCallback(async (postId: string) => {
    try {
      await deletePost(postId);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete blog post');
      return false;
    }
  }, [deletePost, setError]);

  const handleTogglePublish = useCallback(async (postId: string, published: boolean) => {
    try {
      await togglePublish(postId, published);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update publish status');
    }
  }, [togglePublish, setError]);

  const handleCompanyFormSuccess = useCallback(() => {
    fetchData();
    setShowAddCompany(false);
    setShowEditCompany(false);
  }, [fetchData]);

  if (!isClient) return <AdminLoadingState />;
  if (loading && companies.length === 0) return <AdminLoadingState />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left Sidebar */}
      <AdminSidebar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSignOut={handleSignOut}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        {connectionError && (
          <div className="p-4">
            <ErrorAlert 
              message={connectionError} 
              severity={ErrorSeverity.ERROR} 
              onDismiss={() => setConnectionError(null)}
            />
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )}

        {isClient && !connectionError && (
          <AdminAuthInitializer isClient={isClient} fetchData={memoizedFetchData} />
        )}

        {isClient && !connectionError && (
          <div className="flex-1 p-4 lg:p-6">
            {error && (
              <ErrorAlert 
                message={error} 
                severity={ErrorSeverity.ERROR} 
                onDismiss={() => setError(null)}
                className="mb-6"
              />
            )}
            
            <AdminContent
              activeTab={activeTab}
              showAddCompany={showAddCompany}
              setShowAddCompany={setShowAddCompany}
              showEditCompany={showEditCompany}
              setShowEditCompany={setShowEditCompany}
              filteredData={{ companies, reviews, tasks, blogPosts, subscriptions, emailLogs, smsLogs }}
              reviewFilters={{}}
              companyManagement={{ 
                editingCompany, 
                setEditingCompany, 
                handleEditCompany 
              }}
              handleDeleteCompany={handleDeleteCompany}
              blogManagement={{
                showAddBlogModal,
                setShowAddBlogModal,
                showEditBlogModal,
                setShowEditBlogModal,
                editingBlogPost,
                setEditingBlogPost,
                handleAddBlogPost,
                handleEditBlogPost,
                handleDeleteBlogPost,
                handleTogglePublish
              }}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddCompany && (
        <CompanyModal
          isOpen={showAddCompany}
          onClose={() => setShowAddCompany(false)}
          mode="add"
          onSuccess={handleCompanyFormSuccess}
        />
      )}

      {showEditCompany && editingCompany && (
        <CompanyModal
          isOpen={showEditCompany}
          onClose={() => setShowEditCompany(false)}
          mode="edit"
          company={editingCompany}
          onSuccess={handleCompanyFormSuccess}
        />
      )}
    </div>
  );
};

export default AdminPanel;