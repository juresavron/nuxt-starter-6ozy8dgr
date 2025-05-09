import React, { useState, useEffect } from 'react';
import Modal from '../../../shared/Modal';
import Button from '../../../shared/Button';
import { useTranslations } from '../../../../hooks/useTranslations';
import CompanyForm from './form/CompanyForm';
import SocialTasksSection from './form/SocialTasksSection';
import type { SocialTask } from './form/SocialTasksSection';
import { supabase } from '../../../../lib/supabase';
import TabNavigation from './form/TabNavigation';

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  company?: any;
  onSuccess?: () => void;
}

const CompanyModal: React.FC<CompanyModalProps> = ({
  isOpen,
  onClose,
  mode,
  company,
  onSuccess
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.company?.form || {};
  
  const [companyData, setCompanyData] = useState({
    id: '',
    name: '',
    google_link: '',
    logo_url: '',
    color_scheme: 'indigo',
    gift_description: '',
    industry_id: null as string | null,
    feedback_options: [] as string[],
    mid_rating_feedback_options: [] as string[],
    coupon_type: 'coupon' as 'coupon' | 'lottery' | 'none',
    lottery_drawing_frequency: 'monthly' as string,
    lottery_drawing_day: 1 as number,
    send_coupon_sms: false,
    send_coupon_sms_delay: 0,
    send_google_sms: false,
    send_google_sms_delay: 0,
    send_thank_you_email: true,
    send_thank_you_email_delay: 0,
    send_coupon_email: true,
    send_coupon_email_delay: 0,
    send_review_reminder_email: false,
    send_review_reminder_email_delay: 60,
    send_google_review_email: false,
    send_google_review_email_delay: 0,
    social_tasks: [{ platform: '', url: '' }] as SocialTask[]
  });
  
  const [activeTab, setActiveTab] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form with company data when in edit mode
  useEffect(() => {
    if (mode === 'edit' && company) {
      setCompanyData({
        id: company.id || '',
        name: company.name || '',
        google_link: company.google_link || '',
        logo_url: company.logo_url || '',
        color_scheme: company.color_scheme || 'indigo',
        gift_description: company.gift_description || '',
        industry_id: company.industry_id || null,
        feedback_options: company.feedback_options || [],
        mid_rating_feedback_options: company.mid_rating_feedback_options || [],
        coupon_type: company.coupon_type || 'coupon',
        lottery_drawing_frequency: company.lottery_drawing_frequency || 'monthly',
        lottery_drawing_day: company.lottery_drawing_day || 1,
        send_coupon_sms: company.send_coupon_sms || false,
        send_coupon_sms_delay: company.send_coupon_sms_delay || 0,
        send_google_sms: company.send_google_sms || false,
        send_google_sms_delay: company.send_google_sms_delay || 0,
        send_thank_you_email: company.send_thank_you_email !== false, // Default to true
        send_thank_you_email_delay: company.send_thank_you_email_delay || 0,
        send_coupon_email: company.send_coupon_email !== false, // Default to true
        send_coupon_email_delay: company.send_coupon_email_delay || 0,
        send_review_reminder_email: company.send_review_reminder_email || false,
        send_review_reminder_email_delay: company.send_review_reminder_email_delay || 60,
        send_google_review_email: company.send_google_review_email || false,
        send_google_review_email_delay: company.send_google_review_email_delay || 0,
        social_tasks: Array.isArray(company.social_tasks) && company.social_tasks.length > 0 
          ? company.social_tasks 
          : [{ platform: '', url: '' }]
      });
    } else {
      // Reset form for add mode
      setCompanyData({
        id: '',
        name: '',
        google_link: '',
        logo_url: '',
        color_scheme: 'indigo',
        gift_description: '',
        industry_id: null,
        feedback_options: [],
        mid_rating_feedback_options: [],
        coupon_type: 'coupon',
        lottery_drawing_frequency: 'monthly',
        lottery_drawing_day: 1,
        send_coupon_sms: false,
        send_coupon_sms_delay: 0,
        send_google_sms: false,
        send_google_sms_delay: 0,
        send_thank_you_email: true,
        send_thank_you_email_delay: 0,
        send_coupon_email: true,
        send_coupon_email_delay: 0,
        send_review_reminder_email: false,
        send_review_reminder_email_delay: 60,
        send_google_review_email: false,
        send_google_review_email_delay: 0,
        social_tasks: [{ platform: '', url: '' }]
      });
    }
  }, [mode, company, isOpen]);

  // Handle form field changes
  const handleChange = (field: string, value: any) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
  };

  // Handle social tasks
  const handleSocialTasks = {
    add: () => {
      setCompanyData(prev => ({
        ...prev,
        social_tasks: [...prev.social_tasks, { platform: '', url: '' }]
      }));
    },
    remove: (index: number) => {
      setCompanyData(prev => ({
        ...prev,
        social_tasks: prev.social_tasks.filter((_, i) => i !== index)
      }));
    },
    update: (index: number, field: 'platform' | 'url', value: string) => {
      setCompanyData(prev => ({
        ...prev,
        social_tasks: prev.social_tasks.map((task, i) => 
          i === index ? { ...task, [field]: value } : task
        )
      }));
    }
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Validate form
      if (!companyData.name.trim()) {
        throw new Error('Ime podjetja je obvezno');
      }
      
      if (!companyData.google_link.trim()) {
        throw new Error('Google povezava je obvezna');
      }
      
      if (mode === 'add') {
        // Insert company
        const { data: companyResult, error: companyError } = await supabase
          .from('companies')
          .insert({
            name: companyData.name.trim(),
            google_link: companyData.google_link.trim(),
            logo_url: companyData.logo_url || null,
            color_scheme: companyData.color_scheme,
            gift_description: companyData.gift_description?.trim() || null,
            industry_id: companyData.industry_id,
            feedback_options: companyData.feedback_options || null,
            mid_rating_feedback_options: companyData.mid_rating_feedback_options || null,
            coupon_type: companyData.coupon_type || 'coupon',
            lottery_drawing_frequency: companyData.lottery_drawing_frequency || 'monthly',
            lottery_drawing_day: companyData.lottery_drawing_day || 1,
            send_coupon_sms: companyData.send_coupon_sms || false,
            send_coupon_sms_delay: companyData.send_coupon_sms_delay || 0,
            send_google_sms: companyData.send_google_sms || false,
            send_google_sms_delay: companyData.send_google_sms_delay || 0,
            send_thank_you_email: companyData.send_thank_you_email,
            send_thank_you_email_delay: companyData.send_thank_you_email_delay || 0,
            send_coupon_email: companyData.send_coupon_email,
            send_coupon_email_delay: companyData.send_coupon_email_delay || 0,
            send_review_reminder_email: companyData.send_review_reminder_email,
            send_review_reminder_email_delay: companyData.send_review_reminder_email_delay || 60,
            send_google_review_email: companyData.send_google_review_email,
            send_google_review_email_delay: companyData.send_google_review_email_delay || 0
          })
          .select()
          .single();
          
        if (companyError) throw companyError;
        
        if (!companyResult) {
          throw new Error('Dodajanje podjetja ni uspelo');
        }
        
        // Insert social tasks
        const validTasks = companyData.social_tasks.filter(task => 
          task.platform.trim() && task.url.trim()
        );
        
        if (validTasks.length > 0) {
          const tasksToInsert = validTasks.map(task => ({
            company_id: companyResult.id,
            platform: task.platform.trim(),
            url: task.url.trim()
          }));
          
          const { error: tasksError } = await supabase
            .from('social_tasks')
            .insert(tasksToInsert);
            
          if (tasksError) throw tasksError;
        }
      } else {
        // Update company
        const { error: companyError } = await supabase
          .from('companies')
          .update({
            name: companyData.name.trim(),
            google_link: companyData.google_link.trim(),
            logo_url: companyData.logo_url || null,
            color_scheme: companyData.color_scheme,
            gift_description: companyData.gift_description?.trim() || null,
            industry_id: companyData.industry_id,
            feedback_options: companyData.feedback_options || null,
            mid_rating_feedback_options: companyData.mid_rating_feedback_options || null,
            coupon_type: companyData.coupon_type || 'coupon',
            lottery_drawing_frequency: companyData.lottery_drawing_frequency || 'monthly',
            lottery_drawing_day: companyData.lottery_drawing_day || 1,
            send_coupon_sms: companyData.send_coupon_sms || false,
            send_coupon_sms_delay: companyData.send_coupon_sms_delay || 0,
            send_google_sms: companyData.send_google_sms || false,
            send_google_sms_delay: companyData.send_google_sms_delay || 0,
            send_thank_you_email: companyData.send_thank_you_email,
            send_thank_you_email_delay: companyData.send_thank_you_email_delay || 0,
            send_coupon_email: companyData.send_coupon_email,
            send_coupon_email_delay: companyData.send_coupon_email_delay || 0,
            send_review_reminder_email: companyData.send_review_reminder_email,
            send_review_reminder_email_delay: companyData.send_review_reminder_email_delay || 60,
            send_google_review_email: companyData.send_google_review_email,
            send_google_review_email_delay: companyData.send_google_review_email_delay || 0
          })
          .eq('id', companyData.id);
          
        if (companyError) throw companyError;
        
        // Delete existing social tasks
        const { error: deleteError } = await supabase
          .from('social_tasks')
          .delete()
          .eq('company_id', companyData.id);
          
        if (deleteError) throw deleteError;
        
        // Insert new social tasks
        const validTasks = companyData.social_tasks.filter(task => 
          task.platform.trim() && task.url.trim()
        );
        
        if (validTasks.length > 0) {
          const tasksToInsert = validTasks.map(task => ({
            company_id: companyData.id,
            platform: task.platform.trim(),
            url: task.url.trim()
          }));
          
          const { error: tasksError } = await supabase
            .from('social_tasks')
            .insert(tasksToInsert);
            
          if (tasksError) throw tasksError;
        }
      }
      
      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
      
      // Close modal
      onClose();
      
    } catch (err) {
      console.error(`Napaka pri ${mode === 'add' ? 'dodajanju' : 'posodabljanju'} podjetja:`, err);
      setError(err instanceof Error ? err.message : `Napaka pri ${mode === 'add' ? 'dodajanju' : 'posodabljanju'} podjetja`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const modalTitle = mode === 'add' ? (t.add || "Dodaj podjetje") : (t.editTitle || "Uredi podjetje");
  const submitButtonText = mode === 'add' 
    ? (isSubmitting ? (t.adding || "Dodajanje...") : (t.add || "Dodaj podjetje"))
    : (isSubmitting ? (t.saving || "Shranjevanje...") : (t.save || "Shrani spremembe"));

  // Define tabs
  const tabs = [
    { id: 'basic', label: 'Osnovni podatki' },
    { id: 'industry', label: 'Industrija in povratne informacije' },
    { id: 'rewards', label: 'Nagrade' },
    { id: 'notifications', label: 'Obvestila' },
    { id: 'social', label: 'Družbena omrežja' }
  ];

  return (
    <Modal
      title={modalTitle}
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            {t.cancel || "Prekliči"}
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            {submitButtonText}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          {mode === 'add' 
            ? (t.description || "Ustvarite novo podjetje z izpolnitvijo spodnjega obrazca.")
            : (t.editDescription || "Uredite podatke o podjetju spodaj.")}
        </p>
        
        {/* Tab navigation */}
        <TabNavigation 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        {/* Form content based on active tab */}
        <div className="border-t border-gray-200 pt-6">
          <CompanyForm
            companyData={companyData}
            handleChange={handleChange}
            formError={error}
            isSubmitting={isSubmitting}
            activeTab={activeTab}
            handleSocialTasks={handleSocialTasks}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CompanyModal;