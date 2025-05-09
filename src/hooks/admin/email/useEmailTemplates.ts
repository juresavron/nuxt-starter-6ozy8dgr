import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';

/**
 * Hook for managing email templates
 */
export const useEmailTemplates = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Fetches all email templates
   */
  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('email_templates')
        .select('*')
        .order('name');

      if (fetchError) {
        throw fetchError;
      }

      setTemplates(data || []);
    } catch (err) {
      console.error('Error fetching email templates:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch email templates');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Updates an existing email template
   */
  const updateTemplate = useCallback(async (id: string, templateData: any) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const { error: updateError } = await supabase
        .from('email_templates')
        .update({
          subject: templateData.subject,
          html_content: templateData.html_content,
          text_content: templateData.text_content,
          variables: templateData.variables
        })
        .eq('id', id);

      if (updateError) {
        throw updateError;
      }

      await fetchTemplates();
      return true;
    } catch (err) {
      console.error('Error updating email template:', err);
      setError(err instanceof Error ? err.message : 'Failed to update email template');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [fetchTemplates]);

  /**
   * Tests sending an email template
   */
  const testTemplate = useCallback(async (templateName: string, testEmail: string, variables: Record<string, any> = {}) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Call edge function to test email template
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase configuration is missing');
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/test-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateName,
          testEmail,
          variables
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to test email template');
      }

      return { success: true, data: result };
    } catch (err) {
      console.error('Error testing email template:', err);
      setError(err instanceof Error ? err.message : 'Failed to test email template');
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // Fetch templates on mount
  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return {
    templates,
    loading,
    error,
    editingTemplate,
    isSubmitting,
    fetchTemplates,
    updateTemplate,
    testTemplate,
    setEditingTemplate
  };
};

export default useEmailTemplates;