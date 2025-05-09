import { useState, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { handleRefreshTokenError } from '../../lib/supabase';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Hook for processing payments and creating checkout sessions
 * @returns Payment processing functions and state
 */
export const usePaymentProcess = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Creates a checkout session with Stripe
   * @param productKey Stripe product key
   * @param isYearly Whether to use yearly pricing
   */
  const createCheckoutSession = useCallback(async (
    productKey: string,
    isYearly: boolean = false
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Creating checkout session for ${isYearly ? 'yearly' : 'monthly'} product:`, productKey);
      
      // Check authentication before proceeding
      let session;
      try {
        // Get the current session
        const { data, error } = await supabase.auth.getSession();
        
        if (error || !data.session) {
          console.error('Session validation failed:', error);
          // Force redirect to login
          redirectToLogin();
          throw new Error('Failed to authenticate user');
        }
        
        session = data.session;
      } catch (authError) {
        console.error('Authentication failed:', authError);
        redirectToLogin();
        throw new Error('Failed to authenticate user');
      }
      
      // Call the Stripe checkout edge function
      console.log('Calling Stripe checkout edge function...');
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY
        },
        body: JSON.stringify({
          price_id: productKey,
          success_url: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/pricing`,
          mode: 'subscription',
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to create checkout session';
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          console.error('Failed to parse error response:', e);
        }
        
        // Handle 401 errors (token expired)
        if (response.status === 401) {
          await handleRefreshTokenError(`/checkout/${productKey}`);
          return;
        }
        
        throw new Error(errorMessage);
      }

      // Parse the response
      const responseData = await response.json();
      const { url, sessionId } = responseData;
      
      if (!url) {
        throw new Error('No checkout URL returned from Stripe');
      }

      // Store the session ID
      if (sessionId) {
        setSessionId(sessionId);
        // Store in session storage for recovery after redirect
        sessionStorage.setItem('stripe_checkout_session_id', sessionId);
        sessionStorage.setItem('stripe_checkout_product', productKey);
      }

      console.log('Redirecting to Stripe checkout URL');
      window.location.href = url;
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during checkout');
      
      // Handle authentication errors
      if (err instanceof Error && 
          (err.message.includes('Failed to authenticate user') || 
          err.message.toLowerCase().includes('session expired') ||
          err.message.toLowerCase().includes('log in') ||
          err.message.toLowerCase().includes('auth'))) {
        redirectToLogin();
      }
    } finally {
      setLoading(false);
    }
  }, [navigate, location]);

  /**
   * Redirects to login with return path
   */
  const redirectToLogin = useCallback(() => {
    const currentPath = location.pathname;
    console.log('Authentication error, redirecting to login with return path:', currentPath);
    navigate('/login', { 
      state: { 
        returnTo: currentPath,
        message: 'Please log in to continue with your purchase.'
      }
    });
  }, [navigate, location]);

  /**
   * Recovers a checkout session from storage
   * @returns The recovered session information
   */
  const recoverCheckoutSession = useCallback(() => {
    const storedSessionId = sessionStorage.getItem('stripe_checkout_session_id');
    const storedProduct = sessionStorage.getItem('stripe_checkout_product');
    
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
    
    return {
      sessionId: storedSessionId,
      product: storedProduct
    };
  }, []);

  /**
   * Clears checkout session data
   */
  const clearCheckoutSession = useCallback(() => {
    sessionStorage.removeItem('stripe_checkout_session_id');
    sessionStorage.removeItem('stripe_checkout_product');
    setSessionId(null);
  }, []);

  return {
    loading,
    error,
    sessionId,
    createCheckoutSession,
    recoverCheckoutSession,
    clearCheckoutSession,
    setError
  };
};