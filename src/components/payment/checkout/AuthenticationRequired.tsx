import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
import Card from '../../shared/Card';
import Button from '../../shared/Button';
import { useTranslations } from '../../../hooks/useTranslations';

interface AuthenticationRequiredProps {
  productId?: string;
  isYearly?: boolean;
}

/**
 * Authentication required component for the checkout page
 * Shown when a user tries to checkout without being logged in
 */
const AuthenticationRequired: React.FC<AuthenticationRequiredProps> = ({
  productId,
  isYearly = false
}) => {
  const navigate = useNavigate();
  const translations = useTranslations();
  const t = translations?.landing?.pricing;

  const returnPath = productId 
    ? `/checkout/${productId}${isYearly ? '-yearly' : ''}` 
    : '/pricing';

  const handleLogin = () => {
    navigate('/login', { 
      state: { 
        returnTo: returnPath,
        message: t?.loginToContinuePurchase || 'Za nadaljevanje nakupa se morate prijaviti.'
      }
    });
  };

  const handleSignup = () => {
    navigate('/signup', { 
      state: { 
        returnTo: returnPath
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 border-blue-100 overflow-hidden">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-blue-600" style={{ fill: 'rgba(219, 234, 254, 0.5)' }} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {t?.authRequired || 'Potrebna je prijava'}
              </h2>
              <p className="text-gray-600">
                {t?.loginToContinuePurchase || 'Za nadaljevanje nakupa se morate prijaviti ali registrirati'}
              </p>
            </div>
            
            <div className="space-y-4">
              <Button
                variant="primary"
                onClick={handleLogin}
                className="w-full py-3 text-base bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                {t?.login || 'Prijava'}
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleSignup}
                className="w-full py-3 text-base"
              >
                {t?.signup || 'Ustvari račun'}
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-6 text-center">
              {t?.loginSecurityMessage || 'Vaš račun nam omogoča, da vam zagotovimo varno izkušnjo nakupa in dostop do vaših nakupov.'}
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthenticationRequired;