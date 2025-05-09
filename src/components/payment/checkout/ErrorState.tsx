import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from '../../shared/Button';

interface ErrorStateProps {
  errorMessage: string;
  buttonText: string;
  onButtonClick: () => void;
}

/**
 * Error state component for the checkout page
 * Shows error message and back button
 */
const ErrorState: React.FC<ErrorStateProps> = ({
  errorMessage,
  buttonText,
  onButtonClick
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 border border-red-100 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-10 w-10 text-red-600" style={{ fill: 'rgba(254, 226, 226, 0.5)' }} />
          </div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700 mb-3">Error</h1>
          <p className="text-gray-600 leading-relaxed">{errorMessage}</p>
        </div>
        
        <Button
          variant="primary"
          onClick={onButtonClick}
          className="w-full py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ErrorState;