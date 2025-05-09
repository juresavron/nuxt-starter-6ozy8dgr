import React from 'react';
import { Mail, Lock } from 'lucide-react';
import Button from '../../shared/Button';

interface Step1FormProps {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
}

const Step1Form: React.FC<Step1FormProps> = ({ formData, onChange, onNext }) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Ustvarite svoj račun</h3>
    
      <div>
        <label className="block text-sm font-medium text-gray-700">
          E-poštni naslov
        </label>
        <div className="mt-1 relative"> 
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="input-field pl-10"
            placeholder="Vnesite svoj e-poštni naslov" 
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Geslo
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            className="input-field pl-10"
            placeholder="Ustvarite geslo"
            required
            minLength={8}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Geslo mora vsebovati vsaj 8 znakov
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Potrdite geslo
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={onChange}
            className="input-field pl-10"
            placeholder="Potrdite svoje geslo"
            required
          />
        </div>
      </div>
    
      <div className="pt-4">
        <Button variant="primary" onClick={onNext} className="w-full">
          Nadaljuj
        </Button>
      </div>
    </div>
  );
};

export default Step1Form;