/**
 * Types for checkout functionality
 */

/**
 * Stripe product information
 */
export interface StripeProduct {
  id: string;
  name: string;
  description: string;
  priceId: string;
  yearlyPriceId?: string;
  features: string[];
  price: string;
  yearlyPrice?: string;
  monthlyFee?: string;
  mode: 'payment' | 'subscription';
  currency: string;
}

/**
 * Checkout state
 */
export interface CheckoutState {
  product: StripeProduct | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}