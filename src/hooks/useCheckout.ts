import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useClientSide } from './useClientSide';
import { getProductById } from '../stripe-config';
import { useTranslations } from './useTranslations';

export const useCheckout = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const translations = useTranslations();
  
  // State
  const [product, setProduct] = useState<any>(null);
  const [displayPrice, setDisplayPrice] = useState<string>('');
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!packageId) {
          throw new Error(translations?.landing?.pricing?.selectPackage || 'Please select a package');
        }

        // Check if yearly package
        let productId = packageId;
        let yearly = false;
        
        if (packageId.includes('-yearly')) {
          yearly = true;
          productId = packageId.replace('-yearly', '');
          setIsYearly(true);
        }
        
        // Get product from stripe config
        const selectedProduct = getProductById(productId);
        if (!selectedProduct) {
          throw new Error(translations?.landing?.pricing?.invalidPackage || `Invalid package selected: ${packageId}`);
        }
        
        setProduct(selectedProduct);
        setDisplayPrice(yearly && selectedProduct.yearlyPrice ? selectedProduct.yearlyPrice : selectedProduct.price);
      } catch (error) {
        console.error('Error loading product:', error);
        setError(error instanceof Error ? error.message : translations?.landing?.pricing?.loadError || 'Failed to load package details');
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [packageId, translations]);

  // Check auth status
  useEffect(() => {
    const checkAuth = async () => {
      setAuthChecking(true);
      try {
        const { data, error } = await supabase.auth.getSession();
        
        // Check for auth errors
        if (error) {
          if (error.message?.includes('Invalid Refresh Token') || 
              error.message?.includes('refresh_token_not_found')) {
            // Handle session expiration
            await handleRefreshTokenError();
            return;
          }
        }
        
        if (data.session) {
          setIsAuthenticated(true);
          setUserEmail(data.session.user?.email || null);
        } else {
          setIsAuthenticated(false);
          setUserEmail(null);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setIsAuthenticated(false);
        setUserEmail(null);
      } finally {
        setAuthChecking(false);
      }
    };
    
    checkAuth();
  }, []);

  // Load session ID from storage if available
  useEffect(() => {
    const storedSessionId = sessionStorage.getItem('stripe_checkout_session_id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, []);

  // Handle going back to pricing
  const handleBackToPricing = () => {
    navigate('/?section=pricing#pricing');
  };

  // Handle proceeding to checkout
  const handleCheckout = async () => {
    if (product?.priceId) {
      if (userEmail) {
        try {
          setCheckoutLoading(true);
          setError(null);
          
          // Get auth session
          const { data, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError || !data.session) {
            throw new Error(translations?.app?.auth?.sessionExpired || 'Your session has expired. Please log in again.');
          }
          
          // Determine which price ID to use based on yearly/monthly selection
          const priceId = isYearly && product.yearlyPriceId ? product.yearlyPriceId : product.priceId;
          
          // Create checkout session
          const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.session.access_token}`
            },
            body: JSON.stringify({
              price_id: priceId,
              success_url: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${window.location.origin}/pricing`,
              mode: product.mode
            })
          });
          
          if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.error || translations?.app?.payment?.checkoutFailed || 'Failed to create checkout session');
          }
          
          const result = await response.json();
          const { url, sessionId } = result;
          
          if (!url) {
            throw new Error(translations?.app?.payment?.checkoutFailed || 'No checkout URL returned from Stripe');
          }
          
          // Store session ID in session storage
          if (sessionId) {
            setSessionId(sessionId);
            sessionStorage.setItem('stripe_checkout_session_id', sessionId);
            sessionStorage.setItem('stripe_checkout_product', product.id);
          }
          
          window.location.href = url;
        } catch (error) {
          console.error('Checkout error:', error);
          setError(error instanceof Error ? error.message : translations?.app?.payment?.checkoutFailed || 'An error occurred during checkout');
          
          // Redirect to login if auth error
          if (error instanceof Error && (
            error.message.includes('session') || 
            error.message.includes('token') || 
            error.message.includes('auth')
          )) {
            navigate('/login', {
              state: { 
                returnTo: `/checkout/${packageId}`,
                message: translations?.app?.auth?.loginRequired || 'Please log in to continue.'
              }
            });
          }
        } finally {
          setCheckoutLoading(false);
        }
      } else {
        // Redirect to login if not authenticated
        navigate('/login', {
          state: { 
            returnTo: `/checkout/${packageId}`,
            message: translations?.landing?.pricing?.loginToContinue || 'Please log in to continue with your purchase.'
          }
        });
      }
    } else {
      setError(translations?.landing?.pricing?.checkoutError || 'Invalid product selection');
    }
  };

  return {
    product,
    displayPrice,
    isYearly,
    loading,
    error,
    userEmail,
    isAuthenticated,
    authChecking,
    checkoutLoading,
    sessionId,
    handleBackToPricing,
    handleCheckout
  };
};

// Helper function to handle refresh token errors
async function handleRefreshTokenError() {
  await supabase.auth.signOut();
  localStorage.clear();
  window.location.href = '/login';
}

export default useCheckout;