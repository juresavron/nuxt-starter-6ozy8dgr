import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Copy, Ticket } from 'lucide-react';
import Button from '../../../shared/Button';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import { formatDate } from '../../../../utils/date';
import { useTranslations } from '../../../../hooks/useTranslations';
import type { Coupon, Company } from './types';

interface CouponTableProps {
  coupons: Coupon[];
  companies: Company[];
  loading: boolean;
  copied: string | null;
  handleCopy: (code: string) => void;
  handleToggleUsed: (couponId: string, currentStatus: boolean) => Promise<void>;
  isExpired: (coupon: Coupon) => boolean;
  getCompanyName: (companyId: string) => string;
  formatDiscount: (amount: number, type: 'percentage' | 'fixed') => string;
}

/**
 * Table component for displaying coupons
 */
const CouponTable: React.FC<CouponTableProps> = ({
  coupons,
  companies,
  loading,
  copied,
  handleCopy,
  handleToggleUsed,
  isExpired,
  getCompanyName,
  formatDiscount
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.coupons || {};
  
  React.useEffect(() => {
    console.log('CouponTable: Rendering with', {
      couponsCount: coupons?.length || 0,
      loading,
      copied
    });
  }, [coupons, loading, copied]);
  
  if (loading) {
    console.log('CouponTable: Showing loading spinner');
    return (
      <div className="flex justify-center items-center p-12">
        <LoadingSpinner size="lg" color="blue" />
        <p className="ml-4 text-gray-500">{t?.loading || 'Loading coupons...'}</p>
      </div>
    );
  }
  
  if (!Array.isArray(coupons) || coupons.length === 0) {
    console.log('CouponTable: No coupons to display');
    return (
      <div className="p-12 text-center text-gray-500">
        <Ticket className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>{t?.noCoupons || 'No coupons found'}</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t?.couponCode || 'Coupon Code'}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t?.company || 'Company'}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t?.discount || 'Discount'}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t?.status || 'Status'}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t?.created || 'Created'}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t?.expires || 'Expires'}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t?.contact || 'Contact'}
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t?.actions || 'Actions'}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {coupons.map((coupon) => (
            <motion.tr 
              key={coupon.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="hover:bg-gray-50"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="font-mono font-medium text-gray-900">{coupon.coupon_code}</span>
                  <button
                    onClick={() => handleCopy(coupon.coupon_code)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    title={t?.copy || 'Copy'}
                  >
                    {copied === coupon.coupon_code ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-900">{getCompanyName(coupon.company_id)}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-medium text-gray-900">
                  {formatDiscount(coupon.discount_amount, coupon.discount_type)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {isExpired(coupon) ? (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    {t?.expired || 'Expired'}
                  </span>
                ) : coupon.is_used ? (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {t?.used || 'Used'}
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {t?.unused || 'Unused'}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                  {formatDate(coupon.created_at)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-500">
                  {coupon.expires_at ? (
                    <>
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      {formatDate(coupon.expires_at)}
                    </>
                  ) : (
                    'Never'
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-500">
                  {coupon.email || coupon.phone || 'N/A'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <Button
                  variant={coupon.is_used ? "secondary" : "primary"}
                  size="sm"
                  onClick={() => handleToggleUsed(coupon.id, coupon.is_used)}
                  disabled={isExpired(coupon)}
                >
                  {coupon.is_used ? t?.markAsUnused || 'Mark as Unused' : t?.markAsUsed || 'Mark as Used'}
                </Button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(CouponTable);