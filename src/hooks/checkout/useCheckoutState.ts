import { useState } from 'react';

/**
 * Hook for managing checkout state
 * @returns Checkout state and state setters
 */
export const useCheckoutState = (initialProduct: any = null) => {
  const [product, setProduct] = useState<any>(initialProduct);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false);

  /**
   * Clear checkout state
   */
  const clearState = () => {
    setError(null);
    setLoading(false);
    setSessionId(null);
  };

  return {
    product,
    error,
    loading,
    sessionId,
    isYearly,
    setProduct,
    setError,
    setLoading,
    setSessionId,
    setIsYearly,
    clearState
  };
};