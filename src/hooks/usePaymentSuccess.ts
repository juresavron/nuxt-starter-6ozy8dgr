import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { handleRefreshTokenError } from '../lib/supabase';

/**
 * Hook for handling payment success page
 * @returns Payment success state and functions
 */
export const usePaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get session ID from URL
  const sessionId = searchParams.get('session_id');
  
  // State
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  
  // Clear sessions
  useEffect(() => {
    if (sessionId) {
      sessionStorage.removeItem('stripe_checkout_session_id');
      sessionStorage.removeItem('stripe_checkout_product');
    }
  }, [sessionId]);

  /**
   * Initialize success page
   */
  const initSuccessPage = useCallback(async () => {
    if (!sessionId) {
      navigate('/', { replace: true });
      return;
    }
    
    setLoading(true);
    
    try {
      // Check authentication
      const { data, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Session error:', sessionError);
        // Handle refresh token errors
        if (sessionError.message?.includes('Invalid Refresh Token') || 
            sessionError.message?.includes('refresh_token_not_found')) {
          await handleRefreshTokenError();
          return;
        }
        throw new Error('Authentication error occurred');
      }

      if (!data?.session) {
        navigate('/login', {
          state: { returnTo: `/payment/success?session_id=${sessionId}` }
        });
        return;
      }

      // Fetch order details
      const orderData = await fetchOrderDetails();
      
      if (orderData) {
        console.log('Order details fetched successfully:', orderData);
        setOrderDetails(orderData);
      } else {
        console.log('Order details not found yet. Will retry automatically.');
        // Order might still be processing - we'll let the retry button handle this
      }
    } catch (err) {
      console.error('Error initializing success page:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while loading order details');
    } finally {
      setLoading(false);
    }
  }, [sessionId, navigate]);

  /**
   * Fetch order details from database
   */
  const fetchOrderDetails = useCallback(async () => {
    if (!sessionId) return null;
    
    try {
      // Check if we need to retry multiple times
      let retries = 3;
      let orderData = null;
      
      while (retries > 0 && !orderData) {
        const { data, error } = await supabase
          .from('stripe_orders')
          .select('*')
          .eq('checkout_session_id', sessionId)
          .maybeSingle();
        
        if (error) {
          console.error('Error fetching order:', error);
          throw error;
        }
        
        if (data) {
          orderData = data;
          break;
        }
        
        // Wait before retrying
        if (retries > 1) {
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
        
        retries--;
      }
      
      return orderData;
    } catch (err) {
      console.error('Error fetching order details:', err);
      return null;
    }
  }, [sessionId]);

  /**
   * Retry fetching order details
   */
  const handleRetry = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    
    try {
      const orderData = await fetchOrderDetails();
      
      if (orderData) {
        setOrderDetails(orderData);
      } else {
        setError('Order details not found. The payment may still be processing.');
      }
    } catch (err) {
      console.error('Error retrying order fetch:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch order details');
    } finally {
      setRefreshing(false);
    }
  }, [fetchOrderDetails]);

  // Initialize on mount
  useEffect(() => {
    initSuccessPage();
  }, [initSuccessPage]);

  return {
    sessionId,
    loading,
    refreshing,
    error,
    orderDetails,
    handleRetry
  };
};