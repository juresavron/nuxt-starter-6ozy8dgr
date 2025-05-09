import React from 'react';
import Card from '../../shared/Card';
import ErrorAlert from '../../shared/ErrorAlert';
import { ErrorSeverity } from '../../../utils/errorHandler';

// Import hooks
import { 
  useCouponData, 
  useCouponActions, 
  useCouponFilters,
  useCouponUtils
} from '../../../hooks/admin/coupons';

// Import components
import {
  CouponHeader,
  CouponFilters,
  CouponTable,
  CouponEmptyState,
  CouponLoadingState
} from './coupons';

/**
 * Coupons section of the admin panel
 * Shows all coupons and allows marking them as used
 */
const Coupons: React.FC = () => {
  console.log('Rendering Coupons component');
  
  // Use coupon data hook
  const {
    coupons,
    companies,
    loading,
    error,
    refreshing,
    initialized,
    setError,
    fetchData
  } = useCouponData();
  
  // Log the state for debugging
  React.useEffect(() => {
    console.log('Coupons component state:', {
      couponsCount: coupons?.length || 0,
      companiesCount: companies?.length || 0,
      loading,
      error,
      refreshing,
      initialized
    });
  }, [coupons, companies, loading, error, refreshing, initialized]);
  
  // Use coupon filters hook
  const {
    searchTerm,
    setSearchTerm,
    filterUsed,
    setFilterUsed,
    filterCompany,
    setFilterCompany,
    copied,
    filteredCoupons,
    handleCopy,
    handleExport
  } = useCouponFilters(coupons, companies);
  
  // Use coupon actions hook
  const {
    handleToggleUsed
  } = useCouponActions(fetchData);
  
  // Use coupon utils hook
  const {
    isExpired,
    getCompanyName,
    formatDiscount
  } = useCouponUtils();

  // Fetch data on mount
  React.useEffect(() => {
    console.log('Coupons: Initial data fetch');
    fetchData().catch(err => {
      console.error('Error fetching coupon data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch coupon data');
    });
  }, [fetchData, setError]);

  // Show loading state
  if ((loading && !initialized) || (loading && coupons.length === 0)) {
    console.log('Coupons: Showing loading state');
    return <CouponLoadingState />;
  }

  return (
    <div className="space-y-6 pb-20">
      <CouponHeader 
        onRefresh={() => fetchData()} 
        refreshing={refreshing} 
      />

      {error && (
        <ErrorAlert
          message={error}
          severity={ErrorSeverity.ERROR}
          onDismiss={() => setError(null)}
        />
      )}

      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50/30">
          <CouponFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterUsed={filterUsed}
            setFilterUsed={setFilterUsed}
            filterCompany={filterCompany}
            setFilterCompany={setFilterCompany}
            companies={companies}
            onExport={handleExport}
            filteredCouponsLength={filteredCoupons.length}
          />
        </div>
        
        {filteredCoupons.length === 0 ? (
          <div className="p-6">
            <CouponEmptyState />
          </div>
        ) : (
          <CouponTable
            coupons={filteredCoupons}
            companies={companies}
            loading={loading}
            copied={copied}
            handleCopy={handleCopy}
            handleToggleUsed={handleToggleUsed}
            isExpired={isExpired}
            getCompanyName={(companyId) => getCompanyName(companyId, companies)}
            formatDiscount={formatDiscount}
          />
        )}
      </Card>
    </div>
  );
};

export default React.memo(Coupons);