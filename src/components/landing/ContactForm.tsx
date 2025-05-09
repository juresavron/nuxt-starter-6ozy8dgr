import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, AlertTriangle } from 'lucide-react';
import { useContactForm } from "../../hooks/landing/useContactForm";
import { useLanguageStore } from "../../hooks/useLanguageStore";
import SectionBadge from './shared/SectionBadge';
import { useTranslations } from '../../hooks/useTranslations';
import ContactFormFields from './contact/ContactFormFields';
import ContactFormSuccess from './contact/ContactFormSuccess';
import ContactFormSubmit from './contact/ContactFormSubmit';
import ContactFormHeader from './contact/ContactFormHeader';

const ContactForm: React.FC<{ id?: string }> = ({ id = 'contact' }) => {
  const {
    formData,
    gdprConsent,
    setGdprConsent,
    isSubmitting,
    submitted,
    error,
    handleChange,
    handleSubmit
  } = useContactForm();
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  // Get contact form translations
  const contactTranslations = translations?.contact?.form;
  
  return (
    <section id={id} className="py-16 sm:py-20 bg-gradient-to-br from-gray-50/90 via-white to-gray-50/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto relative">
          {/* Section header */}
          <ContactFormHeader 
            title={translations?.contact?.title || translations?.landing?.contact?.title || "Kontaktirajte nas"}
            subtitle={translations?.contact?.description || translations?.landing?.contact?.description || "Pišite nam in odgovorili vam bomo v najkrajšem možnem času"}
          />

          {/* Form or success message */}
          {submitted ? (
            <ContactFormSuccess 
              title={contactTranslations?.success || translations?.contact?.form?.success || "Sporočilo poslano!"}
              message={contactTranslations?.successMessage || translations?.contact?.form?.successMessage || "Hvala za vaše sporočilo. Odgovorili bomo v najkrajšem možnem času."}
            />
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-5 sm:p-8 rounded-xl shadow-lg border border-blue-100/40 space-y-5 sm:space-y-6"
              onSubmit={handleSubmit}
            >
              <ContactFormFields
                formData={formData}
                onChange={handleChange}
                gdprConsent={gdprConsent}
                setGdprConsent={setGdprConsent}
                translations={{
                  messagePrompt: contactTranslations?.messagePrompt || translations?.contact?.form?.messagePrompt,
                  name: contactTranslations?.name || translations?.contact?.form?.name,
                  namePlaceholder: contactTranslations?.namePlaceholder || translations?.contact?.form?.namePlaceholder,
                  company: contactTranslations?.company || translations?.contact?.form?.company,
                  companyPlaceholder: contactTranslations?.companyPlaceholder || translations?.contact?.form?.companyPlaceholder,
                  email: contactTranslations?.email || translations?.contact?.form?.email,
                  emailPlaceholder: contactTranslations?.emailPlaceholder || translations?.contact?.form?.emailPlaceholder,
                  phone: contactTranslations?.phone || translations?.contact?.form?.phone,
                  phonePlaceholder: contactTranslations?.phonePlaceholder || translations?.contact?.form?.phonePlaceholder,
                  message: contactTranslations?.message || translations?.contact?.form?.message,
                  messagePlaceholder: contactTranslations?.messagePlaceholder || translations?.contact?.form?.messagePlaceholder,
                  gdprConsent: contactTranslations?.gdprConsent || translations?.contact?.form?.gdprConsent,
                  gdprLink: contactTranslations?.gdprLink || translations?.contact?.form?.gdprLink
                }}
              />

              {/* Error message */}
              {error && (
                <div className="p-3 sm:p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-2 sm:gap-3">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{error}</span>
                </div>
              )}

              {/* Submit button */}
              <div className="flex justify-center">
                <ContactFormSubmit 
                  isSubmitting={isSubmitting}
                  error={error}
                  submitText={contactTranslations?.submit || translations?.contact?.form?.submit || "Pošlji sporočilo"}
                  sendingText={contactTranslations?.sending || translations?.contact?.form?.sending || "Pošiljanje..."}
                />
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;