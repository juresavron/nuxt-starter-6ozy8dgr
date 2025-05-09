import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, CheckCircle, ShoppingBag } from 'lucide-react';
import Card from '../../shared/Card';
import { cn } from '../../../utils/cn';
import { useTranslations } from '../../../hooks/useTranslations';

interface OrderDetailsProps {
  orderDetails: any;
  summaryTitle: string;
  amountLabel: string;
  statusLabel: string;
  dateLabel: string;
  processingMessage: string;
}

/**
 * Order details component for the success page
 * Shows order summary with amount, status, and date
 */
const OrderDetails: React.FC<OrderDetailsProps> = ({
  orderDetails,
  summaryTitle,
  amountLabel,
  statusLabel,
  dateLabel,
  processingMessage
}) => {
  const translations = useTranslations();
  const t = translations?.landing?.pricing;
  
  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('sl-SI', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2
    }).format(amount / 100);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sl-SI', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-10"
    >
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-blue-100/40 overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-blue-600" style={{ fill: 'rgba(219, 234, 254, 0.5)' }} />
            </div>
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">{summaryTitle}</h2>
          </div>
          
          {orderDetails ? (
            <div className="space-y-6">
              {/* Amount */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{amountLabel}:</span>
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                  {formatCurrency(orderDetails.amount_total, orderDetails.currency)}
                </span>
              </div>
              
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{statusLabel}:</span>
                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <CheckCircle className="h-4 w-4" style={{ fill: 'rgba(220, 252, 231, 0.5)' }} />
                  <span className="capitalize">{orderDetails.payment_status === 'paid' ? 'plačano' : orderDetails.payment_status}</span>
                </div>
              </div>
              
              {/* Date */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{dateLabel}:</span>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span>{formatDate(orderDetails.created_at)}</span>
                </div>
              </div>

              {/* Additional order details */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="h-5 w-5 text-blue-600" style={{ fill: 'rgba(219, 234, 254, 0.5)' }} />
                  <h3 className="font-medium text-gray-800">{t?.paymentDetails || 'Podatki o plačilu'}</h3>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t?.paymentMethod || 'Način plačila'}:</span>
                    <span className="text-gray-700">Kreditna kartica</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t?.orderID || 'ID naročila'}:</span>
                    <span className="text-gray-700 font-mono">{orderDetails.id}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-600 italic">
                {processingMessage}
              </p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default OrderDetails;