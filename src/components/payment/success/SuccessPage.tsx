import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, AlertCircle, Home, ShoppingBag } from 'lucide-react';
import { useTranslations } from '../../../hooks/useTranslations';
import { usePaymentSuccess } from '../../../hooks/usePaymentSuccess';
import LoadingSpinner from '../../shared/LoadingSpinner';
import SuccessHeader from './SuccessHeader';
import OrderDetails from './OrderDetails';
import SuccessFooter from './SuccessFooter';
import Button from '../../shared/Button';
import Card from '../../shared/Card';

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
        <div className="flex flex-col items-center text-center max-w-md px-4">
          <LoadingSpinner size="lg" color="blue" />
          <h2 className="mt-6 text-xl font-semibold text-gray-900">
            {t?.processingPayment || 'Obdelujemo vaše plačilo'}
          </h2>
          <p className="mt-2 text-gray-600">
            {t?.loadingDetails || 'Pridobivamo podrobnosti vašega naročila. To bo trajalo le trenutek...'}
          </p>
        </div>
      </div>
    );
  }

  // Show error state with retry button
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4">
        <div className="max-w-lg mx-auto">
          <Card className="p-8 border-red-100">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {t?.errorLoadingOrder || 'Napaka pri nalaganju naročila'}
              </h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  onClick={handleRetry}
                  isLoading={refreshing}
                  leftIcon={<RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />}
                  className="w-full sm:w-auto"
                >
                  {refreshing ? t?.retrying || 'Poskušamo znova...' : t?.retry || 'Poskusi znova'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => window.location.href = '/admin'}
                  className="w-full sm:w-auto"
                >
                  {t?.dashboard || 'Pojdi na nadzorno ploščo'}
                </Button>
              </div>
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
          title={t?.paymentSuccess || 'Plačilo uspešno!'}
          message={t?.thankYouMessage || 'Hvala za vaš nakup. Vaše plačilo je bilo uspešno obdelano.'}
          sessionId={sessionId}
          referenceLabel={t?.orderReference || 'Referenčna številka naročila'}
        />
        
        <OrderDetails
          orderDetails={orderDetails}
          summaryTitle={t?.orderSummary || 'Povzetek naročila'}
          amountLabel={t?.amount || 'Znesek'}
          statusLabel={t?.paymentStatus || 'Status'}
          dateLabel={t?.orderDate || 'Datum naročila'}
          processingMessage={t?.processingOrder || 'Vaše naročilo se obdeluje. Kmalu boste prejeli potrditveni e-mail.'}
        />
        
        {!orderDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <Card className="p-6 border-blue-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {t?.processingYourOrder || 'Obdelujemo vaše naročilo'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t?.processingOrderMessage || 
                     'Vaše plačilo je bilo uspešno, vendar še obdelujemo podrobnosti vašega naročila. To običajno traja le nekaj trenutkov.'}
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleRetry}
                    isLoading={refreshing}
                    leftIcon={<RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />}
                  >
                    {refreshing ? t?.checkingStatus || 'Preverjanje...' : t?.checkStatus || 'Preveri status'}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
        
        <SuccessFooter
          confirmationMessage={t?.confirmationEmail || 'Poslali smo vam potrditveno e-pošto s podrobnostmi vašega naročila. Naša ekipa vas bo kmalu kontaktirala za nastavitev vašega računa.'}
          homeButtonText={t?.returnHome || 'Nazaj na domačo stran'}
          dashboardButtonText={t?.viewDashboard || 'Nadzorna plošča'}
        />
      </div>
    </div>
  );
};

export default SuccessPage;