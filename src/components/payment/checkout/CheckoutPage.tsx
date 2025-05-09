import React from 'react';
import { ShieldCheck, CreditCard, Calendar, Building2, AlertTriangle } from 'lucide-react';
import { useCheckout } from '../../hooks/useCheckout';
import { useTranslations } from '../../hooks/useTranslations';
import { cn } from '../../utils/cn';
import Button from '../shared/Button';
import Card from '../shared/Card';
import LoadingSpinner from '../shared/LoadingSpinner';
import CheckoutSummary from './CheckoutSummary';
import ProductDetails from './ProductDetails';
import CheckoutLayout from './CheckoutLayout';
import AuthenticationRequired from './AuthenticationRequired';
import EnhancedPricingToggle from '../../components/pricing/EnhancedPricingToggle';

const CheckoutPage: React.FC = () => {
  const {
    product,
    displayPrice,
    isYearly,
    loading,
    error,
    userEmail,
    isAuthenticated,
    authChecking,
    handleBackToPricing,
    handleCheckout,
    checkoutLoading
  } = useCheckout();
  
  const translations = useTranslations();
  const t = translations?.landing?.pricing;

  // Handle loading state
  if (loading || authChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col items-center justify-center p-4">
        <LoadingSpinner size="lg" color="blue" />
        <p className="mt-4 text-gray-600 animate-pulse">{t?.loadingCheckout || 'Nalaganje...'}</p>
      </div>
    );
  }

  // Handle error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4">
        <div className="max-w-md mx-auto">
          <Card className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t?.checkoutError || 'Napaka pri nakupu'}
              </h2>
              <p className="text-gray-600">
                {error || t?.productNotFound || 'Izbranega paketa ni bilo mogoče najti.'}
              </p>
            </div>
            
            <Button
              variant="primary"
              onClick={handleBackToPricing}
              className="w-full py-3"
            >
              {t?.backToPricing || 'Nazaj na cenike'}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Handle authentication requirement
  if (!isAuthenticated) {
    return <AuthenticationRequired productId={product.id} isYearly={isYearly} />;
  }

  return (
    <CheckoutLayout
      title={t?.checkout || 'Nakup'}
      subtitle={`${t?.completeYourPurchase || 'Dokončajte nakup paketa'} ${product.name}.`}
      onBackClick={handleBackToPricing}
      backButtonText={t?.backToPricing || 'Nazaj na cenike'}
    >
      <div className="bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50 p-6 rounded-xl mb-8 border border-blue-100 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="h-5 w-5 text-blue-600" style={{ fill: 'rgba(219, 234, 254, 0.5)' }} />
          <h3 className="font-medium text-blue-700">{t?.secureCheckout || 'Varen nakup'}</h3>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-lg border border-blue-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">{t?.loggedInAs || 'Prijavljeni kot'}: </span>
                <span className="text-blue-600">{userEmail}</span>
              </p>
            </div>
          </div>
          
          <div className="inline-block px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-100 ml-auto">
            {isYearly ? t?.yearlyBilling || 'Letno plačilo' : t?.monthlyBilling || 'Mesečno plačilo'}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Product Information */}
        <div className="lg:col-span-7">
          <ProductDetails
            name={product.name}
            price={displayPrice}
            description={product.description}
            features={product.features}
            isSubscription={product.mode === 'subscription'}
            isYearly={isYearly}
            packageIncludesText={t?.packageIncludes || 'Paket vključuje'}
            monthlySubscriptionText={t?.monthlySubscription || 'Mesečna naročnina'}
            yearlySubscriptionText={t?.yearlySubscription || 'Letna naročnina'}
          />
        </div>

        {/* Order Summary and Checkout */}
        <div className="lg:col-span-5">
          <div className="sticky top-6">
            <CheckoutSummary
              productName={product.name}
              price={displayPrice}
              isSubscription={product.mode === 'subscription'}
              isYearly={isYearly}
              onCheckout={handleCheckout}
              isLoading={checkoutLoading}
              packageText={t?.package || 'Paket'}
              priceText={t?.price || 'Cena'}
              billingText={t?.billing || 'Obračun'}
              monthlyText={t?.monthly || 'Mesečno'}
              yearlyText={t?.yearly || 'Letno'}
              totalText={t?.total || 'Skupaj'}
              checkoutButtonText={t?.proceedToCheckout || 'Nadaljujte na plačilo'}
              termsText={t?.termsNotice || 'S potrditvijo se strinjate s splošnimi pogoji poslovanja in politiko zasebnosti. Vaše plačilo bo varno obdelano prek plačilnega sistema Stripe.'}
            />

            {/* Trust indicators */}
            <div className="mt-4 bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h3 className="text-sm font-medium text-gray-600 mb-4">{t?.securePaymentWith || 'Varno plačilo z'}</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center">
                  <ShieldCheck className="h-6 w-6 text-green-500 mb-2" style={{ fill: 'rgba(220, 252, 231, 0.5)' }} />
                  <span className="text-xs text-gray-600">{t?.securePayment || 'Varno plačilo'}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Calendar className="h-6 w-6 text-blue-500 mb-2" style={{ fill: 'rgba(219, 234, 254, 0.5)' }} />
                  <span className="text-xs text-gray-600">{t?.moneyBackGuarantee || '14-dnevno vračilo'}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Building2 className="h-6 w-6 text-purple-500 mb-2" style={{ fill: 'rgba(237, 233, 254, 0.5)' }} />
                  <span className="text-xs text-gray-600">{t?.support24h || 'Tehnična podpora'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment method logos */}
      <div className="mt-12 text-center">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">{t?.acceptedPaymentMethods || 'Sprejemamo plačilne metode'}</p>
        <div className="flex justify-center items-center space-x-6">
          <span className="text-gray-400 text-sm">Visa</span>
          <span className="text-gray-400 text-sm">Mastercard</span>
          <span className="text-gray-400 text-sm">American Express</span>
        </div>
      </div>
    </CheckoutLayout>
  );
};

export default CheckoutPage;