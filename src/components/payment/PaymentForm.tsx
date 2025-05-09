import React, { useState } from 'react';
import StripeCheckout from '../shared/StripeCheckout';
import Card from '../shared/Card';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, Package } from 'lucide-react';

interface PaymentFormProps {
  packageName: string;
  amount: number;
  description?: string;
  features?: string[];
  colorScheme?: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  packageName,
  amount,
  description,
  features = [],
  colorScheme = 'blue',
  onSuccess,
  onError
}) => {
  const [paymentId, setPaymentId] = useState<string | null>(null);
  
  const handlePaymentSuccess = (id: string) => {
    setPaymentId(id);
    if (onSuccess) onSuccess(id);
  };
  
  const handlePaymentError = (error: string) => {
    if (onError) onError(error);
  };
  
  // Format amount for display (assuming amount is in cents)
  const formattedAmount = (amount / 100).toFixed(2);
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Package details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full">
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  colorScheme === 'amber' ? 'bg-amber-100 text-amber-600' :
                  colorScheme === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                  colorScheme === 'rose' ? 'bg-rose-100 text-rose-600' :
                  colorScheme === 'bw' ? 'bg-gray-100 text-gray-700' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <Package className="h-6 w-6" style={{ 
                    fill: colorScheme === 'amber' ? 'rgba(254, 243, 199, 0.5)' :
                    colorScheme === 'emerald' ? 'rgba(209, 250, 229, 0.5)' :
                    colorScheme === 'rose' ? 'rgba(254, 226, 226, 0.5)' :
                    colorScheme === 'bw' ? 'rgba(229, 231, 235, 0.5)' :
                    'rgba(219, 234, 254, 0.5)'
                  }} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{packageName}</h3>
                  <p className="text-2xl font-bold text-blue-600">{formattedAmount}€</p>
                </div>
              </div>
              
              {description && (
                <p className="text-gray-600">{description}</p>
              )}
              
              {features.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Package includes:</h4>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" style={{ fill: 'rgba(220, 252, 231, 0.5)' }} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {paymentId && (
                <div className="p-4 bg-green-50 border border-green-100 rounded-lg text-green-700">
                  <div className="flex items-center gap-2 font-medium mb-1">
                    <CheckCircle className="h-5 w-5" />
                    <span>Payment Successful!</span>
                  </div>
                  <p className="text-sm">Thank you for your purchase. Your payment has been processed successfully.</p>
                  <p className="text-xs mt-2">Payment ID: {paymentId}</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
        
        {/* Payment form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full">
            <div className="p-6">
              <StripeCheckout
                amount={amount}
                currency="eur"
                description={`Payment for ${packageName}`}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                buttonText="Complete Payment"
                colorScheme={colorScheme}
                title="Payment Details"
                subtitle="Enter your card information to complete your purchase"
              />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentForm;