import React from 'react';
import { CheckCircle } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, index) => index + 1).map((step) => (
        <div key={step} className="flex items-center">
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep === step 
                ? 'bg-blue-600 text-white' 
                : currentStep > step 
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-400'
            } transition-all duration-300`}
          >
            {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
          </div>
          {step < totalSteps && (
            <div 
              className={`w-20 h-1 ${
                currentStep > step ? 'bg-green-500' : 'bg-gray-200'
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;