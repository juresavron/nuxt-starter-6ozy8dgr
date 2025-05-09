import React from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { useTranslations } from '../../hooks/useTranslations';
import { usePaymentSuccess } from '../../hooks/usePaymentSuccess';
import LoadingSpinner from '../shared/LoadingSpinner';
import SuccessHeader from './success/SuccessHeader';
import OrderDetails from './success/OrderDetails';
import SuccessFooter from './success/SuccessFooter';
import Button from '../shared/Button';
import Card from '../shared/Card';

const SuccessPage: React.FC = () => {
  const {
    sessionId,
    loading,
    refreshing,
    error,
    orderDetails,
    handleRetry
  } = usePaymentSuccess();
  
  const translations = useTranslations();
  const t = translations?.landing?.pricing;

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" color="blue" />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Order Details</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                onClick={handleRetry}
                isLoading={refreshing}
                leftIcon={<RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />}
              >
                {refreshing ? 'Retrying...' : 'Retry'}
              </Button>
              <Button
                variant="secondary"
                onClick={() => window.location.href = '/admin'}
              >
                Go to Dashboard
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <SuccessHeader
          title={translations?.landing?.pricing?.paymentSuccess || 'Payment Successful!'}
          message={translations?.landing?.pricing?.thankYouMessage || 'Thank you for your purchase. Your payment has been processed successfully.'}
          sessionId={sessionId}
          referenceLabel={translations?.landing?.pricing?.orderReference || 'Order Reference'}
        />
        
        <OrderDetails
          orderDetails={orderDetails}
          summaryTitle={translations?.landing?.pricing?.orderSummary || 'Order Summary'}
          amountLabel={translations?.landing?.pricing?.amount || 'Amount'}
          statusLabel={translations?.landing?.pricing?.paymentStatus || 'Status'}
          dateLabel={translations?.landing?.pricing?.orderDate || 'Order Date'}
          processingMessage={translations?.landing?.pricing?.processingOrder || 'Your order details are being processed. You\'ll receive a confirmation email shortly.'}
        />
        
        {!orderDetails && (
          <Card className="p-6 border-blue-100 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <RefreshCw className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Processing Your Order</h3>
                <p className="text-gray-600 mb-4">
                  Your payment was successful, but we're still processing your order details. This usually takes just a few moments.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleRetry}
                  isLoading={refreshing}
                  leftIcon={<RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />}
                >
                  {refreshing ? 'Checking...' : 'Check Status'}
                </Button>
              </div>
            </div>
          </Card>
        )}
        
        <SuccessFooter
          confirmationMessage={translations?.landing?.pricing?.confirmationEmail || 'We\'ve sent a confirmation email with your order details. Our team will contact you shortly to set up your account.'}
          homeButtonText={translations?.landing?.pricing?.returnHome || 'Return to Home'}
          dashboardButtonText={translations?.landing?.pricing?.viewDashboard || 'View Dashboard'}
        />
      </div>
    </div>
  );
};

export default SuccessPage;