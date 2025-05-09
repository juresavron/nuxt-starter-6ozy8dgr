import { useState, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { useFormValidation } from '../useFormValidation';
import { useTranslations } from '../useTranslations';

/**
 * Hook for handling contact form submission
 * @returns Contact form state and functions
 */
export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  
  const { validateContactForm } = useFormValidation();
  const translations = useTranslations();
  
  // Handle form field changes
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);
  
  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError(null);
    setIsSubmitting(true);
    
    try {
      // Validate form data
      const validation = validateContactForm(formData);
      if (!validation.success) {
        setError(validation.error);
        return;
      }
      
      // Check GDPR consent
      if (!gdprConsent) {
        setError(translations?.contact?.form?.gdprRequired || 'Please accept the privacy policy');
        return;
      }
      
      // Submit to database
      const { error: submitError } = await supabase
        .from('contact_requests')
        .insert({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message
        });
        
      if (submitError) throw submitError;
      
      // Send notification email to admin
      try {
        await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            to: 'info@ocenagor.si',
            subject: `New Contact Request from ${formData.name}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>New Contact Request</h2>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Company:</strong> ${formData.company}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
                <h3>Message:</h3>
                <p>${formData.message.replace(/\n/g, '<br>')}</p>
              </div>
            `,
            from: 'contact@ocenagor.si'
          })
        });
      } catch (emailError) {
        console.error('Error sending notification email:', emailError);
        // Continue with success even if email fails
      }
      
      // Send confirmation email to user
      try {
        await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            to: formData.email,
            subject: 'Thank you for contacting ocenagor.si',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>Thank you for contacting us</h2>
                <p>Dear ${formData.name},</p>
                <p>We have received your message and will get back to you as soon as possible.</p>
                <p>Here's a copy of your message:</p>
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
                  <p>${formData.message.replace(/\n/g, '<br>')}</p>
                </div>
                <p>Best regards,<br>The ocenagor.si Team</p>
              </div>
            `,
            from: 'contact@ocenagor.si'
          })
        });
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Continue with success even if email fails
      }
      
      // Log communication
      try {
        await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/log-communication`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            type: 'email',
            recipient: formData.email,
            subject: 'Thank you for contacting ocenagor.si',
            content: 'Confirmation email for contact form submission',
            communicationType: 'contact_confirmation',
            status: 'sent'
          })
        });
      } catch (logError) {
        console.error('Error logging communication:', logError);
        // Continue with success even if logging fails
      }
      
      // Reset form and show success message
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: ''
      });
      setGdprConsent(false);
      setSuccess(true);
      
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError(translations?.contact?.form?.submitError || 'There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, gdprConsent, translations, validateContactForm]);
  
  return {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    error,
    success,
    gdprConsent,
    setGdprConsent,
    setSuccess
  };
};