import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { stripeProducts, getProductById } from '../stripe-config';

export function useStripeCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is authenticated
  const checkAuthentication = async () => {
    try {
      console.log('Checking authentication status...');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        throw new Error('Failed to authenticate user');
      }
      
      if (!session) {
        console.warn('No session found');
        throw new Error('Please log in to continue');
      }
      
      if (!session.user?.id) {
        console.warn('No user ID found in session');
        throw new Error('Invalid user session');
      }
      
      if (!session.access_token) {
        console.error('No valid access token found');
        throw new Error('Authentication token missing');
      }
      
      // Verify the token is still valid by making a lightweight auth check
      try {
        const { error: userError } = await supabase.auth.getUser(session.access_token);
        if (userError) {
          console.error('Token validation failed:', userError);
          throw new Error('Authentication session expired');
        }
      } catch (tokenError) {
        console.error('Token validation error:', tokenError);
        throw new Error('Authentication session expired');
      }
      
      console.log('Authentication successful, user ID:', session.user.id);
      return session;
    } catch (err) {
      console.error('Authentication check failed:', err);
      throw err;
    }
  };

  const createCheckoutSession = async (productKey: keyof typeof stripeProducts) => {
    try {
      setLoading(true);
      setError(null);
      setSessionId(null);
      console.log('Starting checkout process for product:', productKey);

      const product = stripeProducts[productKey];
      if (!product) {
        console.error('Invalid product selected:', productKey);
        throw new Error('Invalid product selected');
      }

      // Check authentication status
      let session;
      try {
        session = await checkAuthentication();
        console.log('Authentication successful, proceeding with checkout');
      } catch (authError) {
        console.error('Authentication failed:', authError);
        // Redirect to login if authentication fails
        const currentPath = location.pathname;
        navigate('/login', { 
          state: { 
            returnTo: currentPath,
            message: 'Please log in to continue with your purchase.'
          }
        });
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
          price_id: product.priceId,
          success_url: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/pricing`,
          mode: product.mode,
        }),
      });

      // Handle response errors
      let errorMessage = 'Failed to create checkout session';

      if (!response.ok) {
        console.error('Stripe checkout API error:', response.status);
        
        // Try to get error details from the response
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          console.error('Failed to parse error response:', e);
        }
        
        // If we get a 401, the token might have expired during the request
        if (response.status === 401) {
          // Force redirect to login
          const currentPath = location.pathname;
          navigate('/login', { 
            state: { 
              returnTo: currentPath,
              message: 'Your session has expired. Please log in again to continue with your purchase.'
            }
          });
          throw new Error('Authentication session expired');
        }
        
        throw new Error(errorMessage);
      }

      // Parse the response
      let responseData;
      try {
        responseData = await response.json();
      } catch (e) {
        console.error('Failed to parse response:', e);
        throw new Error('Invalid response from server');
      }
      
      const { url, sessionId } = responseData;
      if (!url) {
        console.error('No checkout URL returned from Stripe');
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
      
      // Always redirect to login for authentication errors
      if (err instanceof Error && 
          (err.message.includes('Failed to authenticate user') || 
           err.message.toLowerCase().includes('session expired') ||
           err.message.toLowerCase().includes('log in') ||
           err.message.toLowerCase().includes('auth'))) {
        const currentPath = location.pathname;
        console.log('Authentication error, redirecting to login with return path:', currentPath);
        navigate('/login', { 
          state: { 
            returnTo: currentPath,
            message: 'Please log in to continue with your purchase.'
          }
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Recover checkout session from storage
  const recoverCheckoutSession = () => {
    const storedSessionId = sessionStorage.getItem('stripe_checkout_session_id');
    const storedProduct = sessionStorage.getItem('stripe_checkout_product');
    
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
    
    return {
      sessionId: storedSessionId,
      product: storedProduct ? getProductById(storedProduct) : null
    };
  };

  // Clear checkout session data
  const clearCheckoutSession = () => {
    sessionStorage.removeItem('stripe_checkout_session_id');
    sessionStorage.removeItem('stripe_checkout_product');
    setSessionId(null);
  };

  return {
    createCheckoutSession,
    recoverCheckoutSession,
    clearCheckoutSession,
    loading,
    error,
    sessionId
  };
}