import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from './Button';
import { Loader2, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface CheckoutFormProps {
  amount: number;
  currency?: string;
  description?: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
  buttonText?: string;
  colorScheme?: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  amount,
  currency = 'eur',
  description = 'Payment',
  onSuccess,
  onError,
  buttonText = 'Pay Now',
  colorScheme = 'blue'
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Get button style based on color scheme
  const getButtonStyle = (scheme: string) => 
    scheme === 'amber' ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' :
    scheme === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600' :
    scheme === 'rose' ? 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600' :
    scheme === 'bw' ? 'bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950' :
    'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700';

  // Create payment intent when component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            amount,
            currency,
            description
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create payment intent');
        }
        
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error('Error creating payment intent:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize payment');
        if (onError) onError(err instanceof Error ? err.message : 'Failed to initialize payment');
      } finally {
        setLoading(false);
      }
    };
    
    createPaymentIntent();
  }, [amount, currency, description, onError]);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements || !clientSecret) {
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error('Card element not found');
      }
      
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        }
      });
      
      if (stripeError) {
        throw new Error(stripeError.message || 'Payment failed');
      }
      
      if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
        if (onSuccess) onSuccess(paymentIntent.id);
      } else {
        throw new Error(`Payment status: ${paymentIntent.status}`);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Payment failed');
      if (onError) onError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Element */}
      <div className="p-4 border border-gray-200 rounded-lg bg-white">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
          className="p-2 border border-gray-200 rounded-md"
        />
      </div>
      
      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-red-700 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      {/* Success message */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-100 rounded-lg text-green-700 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
          <span>Payment successful!</span>
        </div>
      )}
      
      {/* Submit button */}
      <button
        type="submit"
        disabled={!stripe || loading || success}
        className={cn(
          "w-full flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
          getButtonStyle(colorScheme)
        )}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : success ? (
          <>
            <CheckCircle className="h-5 w-5" />
            <span>Payment Completed</span>
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5" />
            <span>{buttonText}</span>
          </>
        )}
      </button>
      
      {/* Secure payment notice */}
      <div className="text-center text-xs text-gray-500">
        <p>Secure payment powered by Stripe</p>
        <p>Your card information is encrypted and secure</p>
      </div>
    </form>
  );
};

interface StripeCheckoutProps extends CheckoutFormProps {
  title?: string;
  subtitle?: string;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  title = 'Complete Your Payment',
  subtitle = 'Enter your card details to process your payment securely',
  ...props
}) => {
  return (
    <div className="max-w-md mx-auto">
      {title && (
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      
      <Elements stripe={stripePromise}>
        <CheckoutForm {...props} />
      </Elements>
    </div>
  );
};

export default StripeCheckout;