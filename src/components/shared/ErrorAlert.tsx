import * as React from 'react';
import { useEffect } from 'react';
import { XCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { ErrorSeverity } from '../../utils/errorHandler';

interface ErrorAlertProps {
  message: string;
  severity?: ErrorSeverity;
  onDismiss?: () => void;
  className?: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  severity = ErrorSeverity.ERROR,
  onDismiss,
  className = ''
}) => {
  if (!message) return null;

  // Define styles based on severity
  const styles = {
    [ErrorSeverity.INFO]: {
      container: 'bg-blue-50 border-blue-200 text-blue-700', 
      icon: <Info className="h-5 w-5 text-blue-400" style={{ fill: 'rgba(219, 234, 254, 0.5)' }} />,
    },
    [ErrorSeverity.WARNING]: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      icon: <AlertTriangle className="h-5 w-5 text-yellow-400" style={{ fill: 'rgba(254, 249, 195, 0.5)' }} />,
    },
    [ErrorSeverity.ERROR]: {
      container: 'bg-red-50 border-red-200 text-red-700',
      icon: <XCircle className="h-5 w-5 text-red-400" style={{ fill: 'rgba(254, 226, 226, 0.5)' }} />,
    },
    [ErrorSeverity.CRITICAL]: {
      container: 'bg-red-100 border-red-300 text-red-800',
      icon: <XCircle className="h-5 w-5 text-red-500" style={{ fill: 'rgba(254, 202, 202, 0.5)' }} />,
    },
  };

  const { container, icon } = styles[severity];

  return (
    <div className={`p-4 rounded-lg border ${container} ${className} animate-fade-in`} role="alert">
      <div className="flex items-start">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onDismiss && (
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 hover:bg-red-200 hover:text-red-800 transition-colors"
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            <span className="sr-only">Dismiss</span>
            <XCircle className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(ErrorAlert);