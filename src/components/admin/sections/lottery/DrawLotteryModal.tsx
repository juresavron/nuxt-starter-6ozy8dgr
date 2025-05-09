import React from 'react';
import { X, AlertTriangle, Award } from 'lucide-react';
import { useTranslations } from '../../../../hooks/useTranslations';
import { cn } from '../../../../utils/cn';

interface DrawLotteryModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: { id: string; name: string } | null;
  isDrawing: boolean;
  onDrawWinner: () => Promise<void>;
  error: string | null;
  setError: (error: string | null) => void;
}

const DrawLotteryModal: React.FC<DrawLotteryModalProps> = ({
  isOpen,
  onClose,
  company,
  isDrawing,
  onDrawWinner,
  error,
  setError
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.lottery || {};
  
  if (!isOpen || !company) return null;
  
  const handleClose = () => {
    setError(null);
    onClose();
  };
  
  const handleDrawWinner = async () => {
    try {
      await onDrawWinner();
    } catch (err) {
      console.error('Error drawing winner:', err);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Header */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {t?.drawForCompany || 'Draw Winner for Company'}: {company.name}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {t?.drawWinnerWarning?.message || 'This action will randomly select a winner from all eligible entries for this company. This action cannot be undone.'}
                  </p>
                </div>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={handleClose}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            {/* Error message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {t?.drawWinnerError || 'Failed to draw a winner. Please try again.'}
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className={cn(
                "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm",
                isDrawing
                  ? "bg-yellow-400 cursor-not-allowed"
                  : "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500"
              )}
              onClick={handleDrawWinner}
              disabled={isDrawing}
            >
              {isDrawing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t?.drawing || 'Drawing...'}
                </>
              ) : (
                t?.confirmDraw || 'Confirm Drawing'
              )}
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleClose}
              disabled={isDrawing}
            >
              {t?.cancel || 'Cancel'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawLotteryModal;