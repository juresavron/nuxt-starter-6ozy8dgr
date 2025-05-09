import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import ErrorAlert from '../../shared/ErrorAlert';
import { useConfirmDelete } from '../../../hooks/useConfirmDelete';
import { useTranslations } from '../../../hooks/useTranslations';

// Import modular components
import {
  ContactHeader,
  ContactList,
  ContactEmptyState,
  ContactLoadingState,
  ContactRequest
} from './contact';

/**
 * Contact Requests section of the admin panel
 * Shows all contact form submissions
 */
const ContactRequests: React.FC = () => {
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  
  const { confirmDelete } = useConfirmDelete();
  const translations = useTranslations();
  const t = translations?.app?.admin?.contacts || {};

  // Fetch contact requests
  const fetchContactRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('contact_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setContactRequests(data || []);
    } catch (err) {
      console.error('Error fetching contact requests:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch contact requests');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Fetch data on mount
  useEffect(() => {
    fetchContactRequests();
  }, [fetchContactRequests]);

  // Refresh data
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchContactRequests();
  }, [fetchContactRequests]);

  // Delete contact request
  const handleDelete = useCallback(async (id: string) => {
    const confirmed = await confirmDelete({
      title: t?.delete || 'Delete Contact Request',
      message: t?.deleteConfirm || 'Are you sure you want to delete this contact request? This action cannot be undone.',
      confirmText: t?.delete || 'Yes, Delete',
      cancelText: 'Cancel'
    });
    
    if (!confirmed) return;
    
    try {
      setError(null);
      
      const { error: deleteError } = await supabase
        .from('contact_requests')
        .delete()
        .eq('id', id);
        
      if (deleteError) throw deleteError;
      
      // Refresh data
      fetchContactRequests();
    } catch (err) {
      console.error('Error deleting contact request:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete contact request');
    }
  }, [confirmDelete, fetchContactRequests, t]);

  // Mark as handled
  const handleMarkAsHandled = useCallback(async (id: string) => {
    try {
      setError(null);
      
      const { error: updateError } = await supabase
        .from('contact_requests')
        .update({ status: 'handled' })
        .eq('id', id);
        
      if (updateError) throw updateError;
      
      // Refresh data
      fetchContactRequests();
    } catch (err) {
      console.error('Error updating contact request:', err);
      setError(err instanceof Error ? err.message : 'Failed to update contact request');
    }
  }, [fetchContactRequests]);

  // Show loading state
  if (loading && contactRequests.length === 0) {
    return <ContactLoadingState />;
  }

  return (
    <div className="space-y-6 pb-20">
      <ContactHeader 
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />

      {error && (
        <ErrorAlert
          message={error}
          severity="error"
          onDismiss={() => setError(null)}
        />
      )}

      {contactRequests.length === 0 ? (
        <ContactEmptyState />
      ) : (
        <ContactList
          contacts={contactRequests}
          onDelete={handleDelete}
          onMarkAsHandled={handleMarkAsHandled}
        />
      )}
    </div>
  );
};

export default React.memo(ContactRequests);