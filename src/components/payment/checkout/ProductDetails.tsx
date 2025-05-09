import React from 'react';
import { Card } from '../../shared/Card';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import { ProductHeader } from '../../landing/pricing';
import { PriceDisplay } from '../../landing/pricing';
import { FeatureList } from '../../landing/pricing';
import { SecurePayment } from '../../landing/pricing';

interface ProductDetailsProps {
  product: {
    name: string;
    price: string;
    yearlyPrice?: string;
    description: string;
    features: string[];
    mode: string;
  };
  isYearly: boolean;
  t?: any;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  product, 
  isYearly,
  t
}) => {
  const isSubscription = product.mode === 'subscription';
  
  return (
    <Card className="overflow-hidden border border-blue-100/80 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
      <div className="p-6 sm:p-8 space-y-6">
        <ProductHeader name={product.name} />
        
        <PriceDisplay
          price={isYearly && product.yearlyPrice ? product.yearlyPrice : product.price}
          isSubscription={isSubscription}
          isYearly={isYearly}
          monthlyText={t?.monthlySubscription || 'Monthly subscription'}
          yearlyText={t?.yearlySubscription || 'Yearly subscription'}
        />
        
        <div className="bg-blue-50/40 p-4 rounded-lg border border-blue-100/40">
          <p className="text-gray-700">{product.description}</p>
        </div>
        
        <FeatureList
          features={product.features}
          packageIncludesText={t?.packageIncludes || 'Package includes'}
          subscriptionTypeText={isSubscription ? 
            (isYearly ? (t?.yearlySubscription || 'Yearly subscription') : (t?.monthlySubscription || 'Monthly subscription')) : 
            'One-time payment'
          }
        />
        
        {isSubscription && (
          <SecurePayment variant="subscription" />
        )}
      </div>
    </Card>
  );
};

export default ProductDetails;