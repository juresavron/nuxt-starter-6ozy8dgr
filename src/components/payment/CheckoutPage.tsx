import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams, useSearchParams } from 'react-router-dom';
import ErrorAlert from '../shared/ErrorAlert';
import { useClientSide } from '../../hooks/useClientSide';
import { useCheckout } from '../../hooks/useCheckout';
import { useTranslations } from '../../hooks/useTranslations';
import { stripeProducts } from '../../stripe-config';
import { ErrorSeverity } from '../../utils/errorHandler';
import Card from '../shared/Card';
import Button from '../shared/Button';
import ProductDetails from './checkout/ProductDetails';
import CheckoutSummary from './checkout/CheckoutSummary';
import LoadingSpinner from '../shared/LoadingSpinner';
import { ArrowLeft, Shield, Calendar, Building2, CreditCard, ArrowRight } from 'lucide-react';

const CheckoutPage = () => {
  const isClient = useClientSide();
  const navigate = useNavigate();
  const translations = useTranslations();
  
  // Get hooks data
  const {
    product,
    displayPrice,
    isYearly,
    loading,
    error,
    userEmail,
    isAuthenticated,
    authChecking,
    checkoutLoading,
    handleBackToPricing,
    handleCheckout
  } = useCheckout();
  
  const t = translations?.landing?.pricing;

  // If loading or checking authentication, show loading spinner
  if (loading || authChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" color="blue" />
        <p className="mt-4 text-gray-600 animate-pulse">{t?.loadingCheckout || 'Loading...'}</p>
      </div>
    );
  }

  // If error or product not found, show error message
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4">
        <div className="max-w-md mx-auto">
          <Card className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowLeft className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t?.checkoutError || 'Checkout Error'}</h2>
              <p className="text-gray-600 mb-6">{error || t?.productNotFound || 'The selected package could not be found.'}</p>
            </div>
            <Button 
              variant="primary" 
              onClick={handleBackToPricing}
              className="w-full py-3"
            >
              {t?.backToPricing || 'Back to Pricing'}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // If not authenticated, show login required message
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 px-4">
        <div className="max-w-md mx-auto">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-blue-600" /> 
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {t?.authRequired || "Authentication Required"}
            </h3>
            <p className="text-gray-600 mb-6">
              {t?.loginToContinuePurchase || "Please log in to continue with your purchase"}
            </p>
            
            <div className="space-y-4">
              <Button
                variant="primary"
                onClick={() => {
                  const packageId = useParams().packageId;
                  navigate("/login", {
                    state: { 
                      returnTo: packageId ? `/checkout/${packageId}${isYearly ? "-yearly" : ""}` : "/pricing",
                      message: t?.loginToContinuePurchase || "Please log in to continue with your purchase."
                    }
                  });
                }}
                className="w-full py-3 text-base bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                {t?.login || "Login"}
              </Button>
              
              <Button 
                variant="secondary"
                onClick={() => {
                  const packageId = useParams().packageId;
                  navigate("/signup", { 
                    state: { returnTo: packageId ? `/checkout/${packageId}${isYearly ? "-yearly" : ""}` : "/pricing" } 
                  });
                }}
                className="w-full py-3 text-base"
              >
                {t?.signup || "Create Account"}
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-6 text-center">
              {t?.loginSecurityMessage || "Your account allows us to provide you with a secure purchase experience and access to your purchases."}
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="secondary" 
          size="sm"
          onClick={handleBackToPricing}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          className="hover:shadow-md transition-all duration-300 border-blue-100 mb-8"
        >
          {t?.backToPricing || 'Back to Pricing'}
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 mb-3">
            {t?.checkout || 'Checkout'}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {`${t?.completeYourPurchase || 'Complete your purchase of'} ${product.name}.`}
          </p>
        </div>

        {/* Background gradient info panel */}
        <div className="bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50 p-6 rounded-xl mb-8 border border-blue-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-5 w-5 text-blue-600" style={{ fill: "rgba(219, 234, 254, 0.5)" }} />
            <h3 className="font-medium text-blue-700">{t?.secureCheckout || 'Secure Checkout'}</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-lg border border-blue-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">{t?.loggedInAs || 'Logged in as'}: </span>
                  <span className="text-blue-600">{userEmail}</span>
                </p>
              </div>
            </div>
            
            <div className="inline-block px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-100 ml-auto">
              {isYearly ? (t?.yearlyBilling || 'Yearly billing') : (t?.monthlyBilling || 'Monthly billing')}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column: Product details */}
          <div className="lg:col-span-7">
            <ProductDetails 
              product={product} 
              isYearly={isYearly} 
              t={t}
            />
          </div>
          
          {/* Right column: Order summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-6">
              <CheckoutSummary
                productName={product.name}
                price={displayPrice}
                isSubscription={product.mode === 'subscription'}
                isYearly={isYearly}
                onCheckout={handleCheckout}
                isLoading={checkoutLoading}
                packageText={t?.package || 'Package'}
                priceText={t?.price || 'Price'}
                billingText={t?.billing || 'Billing'}
                monthlyText={t?.monthly || 'Monthly'}
                yearlyText={t?.yearly || 'Yearly'}
                totalText={t?.total || 'Total'}
                checkoutButtonText={t?.proceedToCheckout || 'Proceed to Checkout'}
                termsText={t?.termsNotice || 'By proceeding, you agree to our Terms of Service and Privacy Policy. Your payment will be securely processed through the Stripe payment system.'}
              />
              
              <div className="mt-4 bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <h3 className="text-sm font-medium text-gray-600 mb-4">
                  {t?.securePaymentWith || "Secure payment with"}
                </h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center">
                    <Shield className="h-6 w-6 text-green-500 mb-2" style={{ fill: "rgba(220, 252, 231, 0.5)" }} />
                    <span className="text-xs text-gray-600">{t?.securePayment || "Secure payment"}</span>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <Calendar className="h-6 w-6 text-blue-500 mb-2" style={{ fill: "rgba(219, 234, 254, 0.5)" }} />
                    <span className="text-xs text-gray-600">{t?.moneyBackGuarantee || "14-day money back"}</span>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <Building2 className="h-6 w-6 text-purple-500 mb-2" style={{ fill: "rgba(237, 233, 254, 0.5)" }} />
                    <span className="text-xs text-gray-600">{t?.support24h || "Technical support"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">
            {t?.acceptedPaymentMethods || "Accepted payment methods"}
          </p>
          
          <div className="flex justify-center items-center space-x-6">
            <span className="text-gray-400 text-sm">Visa</span>
            <span className="text-gray-400 text-sm">Mastercard</span>
            <span className="text-gray-400 text-sm">American Express</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;