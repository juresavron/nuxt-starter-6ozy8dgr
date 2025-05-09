/**
 * Types for pricing packages and features
 */

export interface PricingPackage {
  id?: string;
  title: string;
  price: string | number;
  monthlyFee?: string | number;
  yearlyPrice?: string | number;
  description: string;
  features: string[];
  highlight?: boolean;
  mode?: 'payment' | 'subscription';
}

export interface PricingFeature {
  name: string;
  values: string[];
}

export interface AddOn {
  title: string;
  price: string | number;
  description?: string;
}