import React from 'react';
import { User, Phone, Building2 } from 'lucide-react';
import Button from '../../shared/Button';

interface Step2FormProps {
  formData: {
    firstName: string;
    lastName: string;
    phone: string;
    companyName: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step2Form: React.FC<Step2FormProps> = ({ formData, onChange, onNext, onBack }) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Osebni podatki</h3>
    
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ime
          </label>
          <div className="mt-1 relative"> 
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onChange}
              className="input-field pl-10"
              placeholder="Ime" 
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Priimek
          </label>
          <div className="mt-1 relative"> 
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onChange}
              className="input-field pl-10"
              placeholder="Priimek" 
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Telefonska številka
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            className="input-field pl-10"
            placeholder="Telefonska številka"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ime podjetja (neobvezno)
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Building2 className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={onChange}
            className="input-field pl-10"
            placeholder="Ime vašega podjetja"
          />
        </div>
      </div>

      <div className="pt-4 flex gap-3">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Nazaj
        </Button>
        <Button variant="primary" onClick={onNext} className="flex-1">
          Nadaljuj
        </Button>
      </div>
    </div>
  );
};

export default Step2Form;