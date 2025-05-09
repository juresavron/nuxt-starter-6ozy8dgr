import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { stripeProducts } from '../../stripe-config';
import type { StripeProduct } from '../../types/checkout';

/**
 * Hook for fetching product data for checkout
 * @returns Product data and loading state
 */
export const useProductData = () => {
  const { packageId } = useParams<{ packageId?: string }>();
  const [product, setProduct] = useState<StripeProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false);

  /**
   * Loads product data based on package ID
   */
  const loadProduct = useCallback(() => {
    setLoading(true);
    setError(null);
    
    try {
      if (!packageId) {
        throw new Error('No package selected');
      }

      console.log('Loading product data for package:', packageId);
      
      // Check if this is a yearly package selection
      let productKey = packageId;
      let yearly = false;
      
      if (packageId.includes('-yearly')) {
        yearly = true;
        productKey = packageId.replace('-yearly', '');
        setIsYearly(true);
      }
      
      // Try to find the product by key
      let foundProduct = stripeProducts[productKey as keyof typeof stripeProducts];
      
      if (!foundProduct) {
        throw new Error(`Invalid package selected: ${packageId}`);
      }
      
      setProduct(foundProduct);
    } catch (err) {
      console.error('Error loading package:', err);
      setError(err instanceof Error ? err.message : 'Failed to load package details');
    } finally {
      setLoading(false);
    }
  }, [packageId]);

  // Load product data on mount or when packageId changes
  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  return {
    product,
    loading,
    error,
    isYearly,
    setProduct,
    setError,
    loadProduct
  };
};