import * as React from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import ContactFormHeader from './components/ContactFormHeader';
import ContactFormField from './components/ContactFormField';

interface ContactFormProps {
  email: string;
  phone: string;
  colorScheme?: string;
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
  error: string;
}

/**
 * Contact form component for collecting email and phone
 */
const ContactForm: React.FC<ContactFormProps> = ({
  email,
  phone,
  colorScheme = 'indigo',
  onEmailChange,
  onPhoneChange,
  error
}) => {
  const translations = useTranslations();

  // Log when component rerenders with updated values
  React.useEffect(() => {
    console.log('ContactForm: Rendering with values', { 
      email: email ? `${email.substring(0, 3)}...` : '(empty)', 
      phone: phone ? `${phone.substring(0, 3)}...` : '(empty)'
    });
  }, [email, phone]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 max-w-2xl mx-auto">
      <ContactFormHeader 
        title={translations?.review?.form?.contactInfo || 'Pustite svoje kontaktne podatke za povratne informacije'} 
        colorScheme={colorScheme} 
      />
      
      <ContactFormField
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder={translations?.review?.form?.emailPlaceholder || "vase.ime@email.com"}
        label={translations?.review?.form?.email || "E-poštni naslov"}
        colorScheme={colorScheme}
        required={true}
      />
      
      <ContactFormField
        type="phone"
        value={phone}
        onChange={onPhoneChange}
        placeholder={translations?.review?.form?.phonePlaceholder || "Vaša telefonska številka"}
        label={translations?.review?.form?.phone || "Telefonska številka"}
        colorScheme={colorScheme}
        required={true}
      />

      {error && (
        <div className="col-span-1 sm:col-span-2 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm font-medium">{error}</div>
      )}
    </div>
  );
};

export default React.memo(ContactForm);