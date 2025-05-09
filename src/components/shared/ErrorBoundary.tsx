import * as React from 'react';
import { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import { translations } from '@/translations/sl';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error) => ReactNode);
  isAdminRoute?: boolean;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

const DefaultErrorFallback = React.memo(function DefaultErrorFallback({ 
  isAdminRoute, 
  error 
}: { 
  isAdminRoute?: boolean;
  error?: Error;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full transform scale-150" />
          <div className="relative w-16 h-16 mx-auto bg-red-100 rounded-xl flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {translations?.app?.error?.title || 'Something went wrong'}
        </h2>
        <p className="text-gray-600 mb-4">
          {translations?.app?.error?.message || 'Please refresh the page and try again.'}
        </p>
        {error && (
          <div className="mb-8 p-4 bg-red-50 rounded-lg text-left">
            <p className="text-sm font-medium text-red-800">{error.message}</p>
            {error.stack && (
              <details className="mt-2">
                <summary className="text-xs text-red-600 cursor-pointer">Show error details</summary>
                <pre className="mt-2 text-xs text-red-600 overflow-auto max-h-40 p-2 bg-red-50 rounded">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
            {translations?.app?.error?.retry || 'Try again'}
          </button>
          
          {isAdminRoute && (
            <Link
              to="/admin"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-blue-50 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              {translations?.app?.error?.back || 'Back to overview'}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
});

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
    errorInfo: undefined
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Just log to console in development
    console.error('React Error Boundary caught error:', error);
    console.error('Component stack:', errorInfo.componentStack);
    
    this.setState({ errorInfo });
    
    // Call onError prop if provided
    if (this.props.onError) this.props.onError(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // If fallback is a function, call it with the error
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error as Error);
      }
      
      // If fallback is a ReactNode, return it
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Otherwise, return the default error fallback
      return <DefaultErrorFallback isAdminRoute={this.props.isAdminRoute} error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;