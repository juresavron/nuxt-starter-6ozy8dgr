import * as React from 'react';
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/shared/ErrorBoundary';
import LoadingSpinner from './components/shared/LoadingSpinner';
import { useState, useEffect } from 'react';
import { useClientSide } from './hooks/useClientSide';
import { useLanguageStore } from './hooks/useLanguageStore';
import { supabase, handleRefreshTokenError } from './lib/supabase';
import { AlertTriangle } from 'lucide-react';
import LandingPage from './components/landing/LandingPage';

// Lazy load components with error boundaries
const AdminPanel = lazy(() => import('./components/admin/AdminPanel'));
const LoginForm = lazy(() => import('./components/auth/LoginForm'));
const SignupForm = lazy(() => import('./components/auth/SignupForm'));
const ProtectedRoute = lazy(() => import('./components/auth/ProtectedRoute'));
const CompanyDetails = lazy(() => import('./components/admin/sections/company-details/CompanyDetails'));
const ReviewFunnel = lazy(() => import('./components/review-flow/ReviewFlow'));
const Gamification = lazy(() => import('./components/gamification/Gamification'));
const ThankYou = lazy(() => import('./components/thank-you/ThankYou'));
const CheckoutPage = lazy(() => import('./components/payment/CheckoutPage'));
const SuccessPage = lazy(() => import('./components/payment/SuccessPage'));
const ManageSubscriptionPage = lazy(() => import('./components/payment/ManageSubscriptionPage'));
const IndustryPage = lazy(() => import('./components/industries/IndustryPage'));
const NotFound = lazy(() => import('./components/shared/NotFound'));
const Terms = lazy(() => import('./components/legal/Terms'));
const Privacy = lazy(() => import('./components/legal/Privacy'));
const GDPR = lazy(() => import('./components/legal/GDPR'));

const App: React.FC = () => {
  const isClient = useClientSide();
  const [isMounted, setIsMounted] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [retryInProgress, setRetryInProgress] = useState(false);
  
  useEffect(() => {
    if (isClient) {
      setIsMounted(true);
      
      // Check if user is already authenticated and redirect to admin panel if needed
      const checkAuthAndRedirect = async () => {
        try {
          const { data } = await supabase.auth.getSession();
          if (data.session && window.location.pathname === '/login') {
            window.location.href = '/admin';
          }
        } catch (err) {
          console.error('Error checking auth session for redirect:', err);
        }
      };
      
      checkAuthAndRedirect();
    }
  }, [isClient]);

  // Check authentication status
  useEffect(() => {
    if (!isClient) return;
    
    const checkSession = async () => {
      try {
        // Test connectivity before making auth call
        const isOnline = navigator.onLine;
        if (!isOnline) {
          setConnectionError('You appear to be offline. Please check your internet connection and try again.');
          return;
        }
        
        setRetryInProgress(true);
        console.log('App: Checking auth session');
        
        const { data, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.warn('App: Session error detected:', sessionError.message);
          
          // Handle token/auth errors
          if (sessionError.message?.includes('Invalid Refresh Token') || 
              sessionError.message?.includes('refresh_token_not_found') ||
              sessionError.message?.includes('JWT')) {
            console.warn('App: Invalid refresh token detected during initialization');
            await handleRefreshTokenError();
          }
          
          // Handle network errors
          else if (sessionError.message?.includes('Failed to fetch') || 
                  sessionError.message?.includes('Network error') ||
                  sessionError.message?.includes('unable to connect')) {
            console.warn('App: Network error detected:', sessionError.message);
            setConnectionError(
              'Unable to connect to Supabase. Please check your internet connection and try again.' +
              (retryCount > 0 ? ` (Retried ${retryCount} times)` : '')
            );
            
            // Retry up to 3 times with increasing delays
            if (retryCount < 3) {
              const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff: 1s, 2s, 4s
              console.log(`App: Retrying in ${delay/1000}s...`);
              setTimeout(() => {
                setRetryCount(count => count + 1);
                setRetryInProgress(false);
              }, delay);
              return;
            }
          } 
          // Other general errors
          else {
            console.error('App: Other session error:', sessionError.message);
            setConnectionError(`Error checking session: ${sessionError.message}`);
          }
        } else {
          // Session check succeeded, clear any previous connection errors
          setConnectionError(null);
          setRetryCount(0);
        }
        
        setRetryInProgress(false);
      } catch (err) {
        console.error('App: Error checking session:', err);
        
        // Classify error type for better user guidance
        if (err instanceof Error) {
          if (err.message.includes('Failed to fetch') || 
              err.message.includes('Network error') ||
              err.message.includes('Unable to connect')) {
            setConnectionError(
              'Network error: Unable to connect to the server. Please check your internet connection and try again. ' +
              'If the problem persists, contact support.'
            );
          } else if (err.message.includes('JWT') || 
                    err.message.includes('token') ||
                    err.message.includes('session')) {
            // Session-related errors should trigger refresh token handling
            await handleRefreshTokenError();
          } else {
            setConnectionError(`Unexpected error: ${err.message}`);
          }
        } else {
          setConnectionError('An unknown error occurred. Please refresh the page and try again.');
        }
        
        setRetryInProgress(false);
      }
    };
    
    checkSession();
  }, [isClient, retryCount]);

  // Show loading spinner during initial load
  if (!isClient || !isMounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Fallback texts in case translations are not available
  const fallbackTexts = {
    errorTitle: 'An error has occurred',
    errorDescription: 'We apologize for the inconvenience. Please try again.',
    refresh: 'Refresh Page',
    networkError: 'Connection Error',
    networkErrorDescription: 'Unable to connect to the server. Please check your internet connection and try again.',
    retrying: 'Retrying...',
  };

  // Show connection error screen
  if (connectionError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center flex-col gap-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {fallbackTexts.networkError}
        </h1>
        <p className="text-gray-600 max-w-md text-center">
          {connectionError}
        </p>
        <button
          onClick={() => {
            setRetryCount(0);
            window.location.reload();
          }}
          disabled={retryInProgress}
          className={`mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${
            retryInProgress ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {retryInProgress ? `${fallbackTexts.retrying} (${retryCount}/3)` : fallbackTexts.refresh}
        </button>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <ErrorBoundary
        onError={(error) => {
          console.error('App-level error caught:', error);
        }}
        fallback={(error) => (
          <div className="min-h-screen bg-white flex items-center justify-center flex-col gap-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {fallbackTexts.errorTitle}
            </h1>
            <p className="text-gray-600 max-w-md text-center">
              {fallbackTexts.errorDescription}
            </p>
            <div className="mt-4 p-4 bg-red-50 rounded-lg max-w-md">
              <p className="text-sm font-medium text-red-800">{error.message}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {fallbackTexts.refresh}
            </button>
          </div>
        )}
      >
        <Router>
          <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><LoadingSpinner /></div>}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<LandingPage />} />
              <Route path="/domov" element={<Navigate to="/home" />} />
              <Route path="/pridobite-visje-ocene-na-googlu" element={<Navigate to="/home" />} />
              <Route path="/visje-ocene-na-googlu" element={<Navigate to="/home" />} />
              <Route path="/google-ocene" element={<Navigate to="/home" />} />
              <Route path="/checkout/:packageId" element={<CheckoutPage />} />
              <Route path="/payment/success" element={<SuccessPage />} />
              <Route path="/login" element={
                <ErrorBoundary>
                  <LoginForm />
                </ErrorBoundary>
              } />
              <Route path="/signup" element={
                <ErrorBoundary>
                  <SignupForm />
                </ErrorBoundary>
              } />
              <Route
                path="/admin"
                element={(
                  <ErrorBoundary>
                    <ProtectedRoute>
                      <AdminPanel />
                    </ProtectedRoute>
                  </ErrorBoundary>
                )}
              />
              <Route
                path="/admin/*"
                element={(
                  <ErrorBoundary>
                    <ProtectedRoute>
                      <AdminPanel />
                    </ProtectedRoute>
                  </ErrorBoundary>
                )}
              />
              <Route
                path="/admin/companies/:companyId"
                element={(
                  <ErrorBoundary>
                    <ProtectedRoute>
                      <CompanyDetails />
                    </ProtectedRoute>
                  </ErrorBoundary>
                )}
              />
              <Route path="/review/:companyId" element={<ReviewFunnel />} />
              <Route path="/gamification" element={<Gamification />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/account/subscription" element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <ManageSubscriptionPage />
                  </ProtectedRoute>
                </ErrorBoundary>
              } />
              
              {/* Industry subpages */}
              <Route path="/industrije/:slug" element={<IndustryPage />} />
              
              {/* Legal pages */}
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/gdpr" element={<GDPR />} />
              
              {/* 404 page for any unmatched routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;