import React from 'react';
import { Home, Building2, MapPin } from 'lucide-react';
import Button from '../../shared/Button';
import { AlertCircle } from 'lucide-react';

interface Step3FormProps {
  formData: {
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  gdprConsent: boolean;
  setGdprConsent: (value: boolean) => void;
  isLoading: boolean;
  error: string | null;
}

const Step3Form: React.FC<Step3FormProps> = ({
  formData,
  onChange,
  onBack,
  onSubmit,
  gdprConsent,
  setGdprConsent,
  isLoading,
  error
}) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Naslov za dostavo</h3>
    
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Naslov
        </label>
        <div className="mt-1 relative"> 
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Home className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={onChange}
            className="input-field pl-10"
            placeholder="Ulica in hišna številka" 
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mesto
          </label>
          <div className="mt-1 relative"> 
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChange}
              className="input-field pl-10"
              placeholder="Mesto" 
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Poštna številka
          </label>
          <div className="mt-1 relative"> 
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={onChange}
              className="input-field pl-10"
              placeholder="Poštna številka" 
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Država
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <select
            name="country"
            value={formData.country}
            onChange={onChange}
            className="input-field pl-10"
            required
          >
            <option value="Slovenia">Slovenija</option>
            <option value="Croatia">Hrvaška</option>
            <option value="Austria">Avstrija</option>
            <option value="Italy">Italija</option>
            <option value="Hungary">Madžarska</option>
            <option value="Germany">Nemčija</option>
          </select>
        </div>
      </div>

      <div className="flex items-start mt-6">
        <div className="flex items-center h-5">
          <input
            id="gdpr-consent"
            type="checkbox"
            checked={gdprConsent}
            onChange={(e) => setGdprConsent(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            required
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="gdpr-consent" className="font-medium text-gray-700">
            Strinjam se z obdelavo osebnih podatkov
          </label>
          <p className="text-gray-500">
            Z registracijo se strinjate z obdelavo osebnih podatkov v skladu z{' '}
            <a href="/privacy" className="text-blue-600 hover:text-blue-500" target="_blank" rel="noopener noreferrer">
              politiko zasebnosti
            </a>.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-red-700 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="pt-4 flex gap-3">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Nazaj
        </Button>
        <Button 
          variant="primary" 
          type="submit"
          isLoading={isLoading}
          className="flex-1"
          onClick={onSubmit}
        >
          {isLoading ? 'Registracija...' : 'Zaključi registracijo'}
        </Button>
      </div>
    </div>
  );
};

export default Step3Form;