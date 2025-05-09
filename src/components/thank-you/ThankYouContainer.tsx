import React from 'react';

interface ThankYouContainerProps {
  children: React.ReactNode;
}

const ThankYouContainer: React.FC<ThankYouContainerProps> = ({
  children
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/90 via-white to-gray-50/90 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl -z-10"></div>
      <div className="w-full max-w-md mx-auto relative">
        {children}
      </div>
    </div>
  );
};

export default ThankYouContainer;