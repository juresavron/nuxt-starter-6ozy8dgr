import * as React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Building2, Mail, Phone, MessageSquare } from 'lucide-react';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactFormFieldsProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  gdprConsent: boolean;
  setGdprConsent: (value: boolean) => void;
  translations?: {
    messagePrompt?: string;
    name?: string;
    namePlaceholder?: string;
    company?: string;
    companyPlaceholder?: string;
    email?: string;
    emailPlaceholder?: string;
    phone?: string;
    phonePlaceholder?: string;
    message?: string;
    messagePlaceholder?: string;
    gdprConsent?: string;
    gdprLink?: string;
  };
}

const ContactFormFields: React.FC<ContactFormFieldsProps> = ({
  formData,
  onChange,
  gdprConsent,
  setGdprConsent,
  translations
}) => {
  return (
    <>
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full text-sm font-medium border border-blue-100/50 shadow-sm hover:shadow-md transition-all duration-300 group">
          <span className="text-lg group-hover:scale-110 transition-transform duration-300">✉️</span>
          <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{translations?.messagePrompt || 'Pošljite nam sporočilo'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-blue-500" style={{ fill: 'rgba(219, 234, 254, 0.5)' }} />
              <span>{translations?.name || 'Ime in priimek'} *</span>
            </div>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={onChange}
            required
            className="input-field focus:ring-blue-500 focus:border-blue-500"
            placeholder={translations?.namePlaceholder || 'Vnesite svoje ime in priimek'}
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-purple-500" style={{ fill: 'rgba(237, 233, 254, 0.5)' }} />
              <span>{translations?.company || 'Podjetje'} *</span>
            </div>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={onChange}
            required
            className="input-field focus:ring-blue-500 focus:border-blue-500"
            placeholder={translations?.companyPlaceholder || 'Vnesite ime vašega podjetja'}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-green-500" style={{ fill: 'rgba(209, 250, 229, 0.5)' }} />
              <span>{translations?.email || 'E-poštni naslov'} *</span>
            </div>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            required
            className="input-field focus:ring-blue-500 focus:border-blue-500"
            placeholder={translations?.emailPlaceholder || 'Vnesite svoj e-poštni naslov'}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-amber-500" style={{ fill: 'rgba(254, 243, 199, 0.5)' }} />
              <span>{translations?.phone || 'Telefonska številka'}</span>
            </div>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={onChange}
            className="input-field focus:ring-blue-500 focus:border-blue-500"
            placeholder={translations?.phonePlaceholder || 'Vnesite svojo telefonsko številko'}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-pink-500" style={{ fill: 'rgba(252, 231, 243, 0.5)' }} />
            <span>{translations?.message || 'Sporočilo'} *</span>
          </div>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={onChange}
          required
          rows={5}
          className="input-field focus:ring-blue-500 focus:border-blue-500"
          placeholder={translations?.messagePlaceholder || 'Vnesite svoje sporočilo...'}
        />
      </div>

      <div className="flex items-start gap-2">
        <input
          id="gdpr-consent"
          type="checkbox"
          checked={gdprConsent}
          onChange={(e) => setGdprConsent(e.target.checked)}
          className="mt-1 cursor-pointer h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          required
        />
        <label htmlFor="gdpr-consent" className="text-sm text-gray-600 select-none">
          {translations?.gdprConsent || 'Strinjam se z obdelavo osebnih podatkov v skladu s'}{' '}
          <Link to="/privacy" className="text-blue-600 hover:text-blue-800 hover:underline">
            {translations?.gdprLink || 'politiko zasebnosti'}
          </Link>
        </label>
      </div>
    </>
  );
};

export default React.memo(ContactFormFields);