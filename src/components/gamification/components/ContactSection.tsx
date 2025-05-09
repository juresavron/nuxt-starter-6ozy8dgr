import React, { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { useTranslations } from '../../../hooks/useTranslations';
import GdprConsent from './GdprConsent';
import { cn } from '../../../utils/cn';

interface ContactSectionProps {
  onSubmit: (data: { email: string; phone: string }) => void;
  colorScheme?: string;
  isSubmitting?: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  onSubmit,
  colorScheme = 'indigo',
  isSubmitting = false
}) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const translations = useTranslations();
  const t = translations?.gamification?.form || {};

  // Get button style based on color scheme
  const getButtonStyle = (scheme: string) => 
    scheme === 'amber' ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' :
    scheme === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600' :
    scheme === 'rose' ? 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600' :
    scheme === 'bw' ? 'bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950' :
    'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous error
    setError(null);
    
    // Validate both email and phone are provided
    if (!email.trim()) {
      setError(t.error?.invalidEmail || 'Please enter a valid email address');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      setError(t.error?.invalidEmail || 'Please enter a valid email address');
      return;
    }
    
    // Validate phone number is provided
    if (!phone.trim()) {
      setError(t.error?.contactRequired || 'Please provide both email and phone number');
      return;
    }
    
    // Validate phone format (simple check for length)
    if (phone.trim().length < 8) {
      setError(t.error?.invalidPhone || 'Please enter a valid phone number');
      return;
    }
    
    try {
      // Submit both email and phone
      onSubmit({ email, phone });
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError(t.error?.submitFailed || 'Failed to submit. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 mb-4 bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-center">
        {t.contactInfo || 'Leave your contact information to receive your reward'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Email field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gray-500" />
              {t.email || 'Email'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "w-full py-3 px-4 border rounded-lg shadow-sm focus:ring-2 focus:outline-none",
                colorScheme === 'amber' ? 'focus:ring-amber-500 focus:border-amber-500' :
                colorScheme === 'emerald' ? 'focus:ring-emerald-500 focus:border-emerald-500' :
                colorScheme === 'rose' ? 'focus:ring-rose-500 focus:border-rose-500' :
                colorScheme === 'bw' ? 'focus:ring-gray-700 focus:border-gray-700' :
                'focus:ring-indigo-500 focus:border-indigo-500'
              )}
              placeholder={t.emailPlaceholder || "your@email.com"}
              required
            />
          </div>
          
          {/* Phone field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-500" />
              {t.phone || 'Phone'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={cn(
                "w-full py-3 px-4 border rounded-lg shadow-sm focus:ring-2 focus:outline-none",
                colorScheme === 'amber' ? 'focus:ring-amber-500 focus:border-amber-500' :
                colorScheme === 'emerald' ? 'focus:ring-emerald-500 focus:border-emerald-500' :
                colorScheme === 'rose' ? 'focus:ring-rose-500 focus:border-rose-500' :
                colorScheme === 'bw' ? 'focus:ring-gray-700 focus:border-gray-700' :
                'focus:ring-indigo-500 focus:border-indigo-500'
              )}
              placeholder={t.phonePlaceholder || "Your phone number"}
              required
            />
          </div>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        {/* GDPR Consent */}
        <GdprConsent />
        
        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-4 text-sm sm:text-base font-medium text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
            getButtonStyle(colorScheme)
          )}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{t.sending || 'Sending...'}</span>
            </>
          ) : (
            <span>{t.submitButton || 'Complete and receive rewards'}</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactSection;