import React from 'react';
import { CheckCircle } from 'lucide-react';

interface RegistrationSuccessProps {
  message?: string;
}

const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({ 
  message = 'Prosimo, preverite svoj e-poštni nabiralnik za potrditev računa.' 
}) => {
  return (
    <div className="mt-8 p-4 bg-green-50 border border-green-100 rounded-lg text-green-700 animate-fade-in">
      <div className="flex flex-col items-center">
        <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
        <h3 className="font-medium text-lg mb-2">Registracija uspešna!</h3>
        <p>{message}</p>
        <p className="mt-4">Kmalu boste preusmerjeni na stran za prijavo...</p>
      </div>
    </div>
  );
};

export default RegistrationSuccess;