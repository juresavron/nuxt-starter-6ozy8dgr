/**
 * Types for coupons components
 */

export interface Coupon {
  id: string;
  company_id: string;
  review_id: string;
  coupon_code: string;
  discount_amount: number;
  discount_type: 'percentage' | 'fixed';
  is_used: boolean;
  used_at: string | null;
  created_at: string;
  expires_at: string | null;
  email: string | null;
  phone: string | null;
}

export interface Company {
  id: string;
  name: string;
}

export interface CouponTranslations {
  title?: string;
  noCoupons?: string;
  refresh?: string;
  refreshing?: string;
  search?: string;
  filterAll?: string;
  filterUsed?: string;
  filterUnused?: string;
  filterCompany?: string;
  export?: string;
  couponCode?: string;
  company?: string;
  discount?: string;
  status?: string;
  created?: string;
  expires?: string;
  contact?: string;
  actions?: string;
  used?: string;
  unused?: string;
  expired?: string;
  markAsUsed?: string;
  markAsUnused?: string;
  copy?: string;
  copied?: string;
  loading?: string;
}