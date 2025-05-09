import React from 'react';
import { Search, Download } from 'lucide-react';
import Button from '../../../shared/Button';
import { useTranslations } from '../../../../hooks/useTranslations';
import type { Company } from './types';

interface CouponFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterUsed: boolean | null;
  setFilterUsed: (value: boolean | null) => void;
  filterCompany: string | null;
  setFilterCompany: (value: string | null) => void;
  companies: Company[];
  onExport: () => void;
  filteredCouponsLength: number;
}

/**
 * Filters component for coupons
 */
const CouponFilters: React.FC<CouponFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filterUsed,
  setFilterUsed,
  filterCompany,
  setFilterCompany,
  companies,
  onExport,
  filteredCouponsLength
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.coupons || {};
  
  // Ensure companies is an array
  const safeCompanies = React.useMemo(() => {
    return Array.isArray(companies) ? companies : [];
  }, [companies]);
  
  React.useEffect(() => {
    console.log('CouponFilters: Rendering with', {
      companiesCount: safeCompanies.length,
      filteredCouponsLength
    });
  }, [safeCompanies.length, filteredCouponsLength]);
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder={t?.search || "Search coupons..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      {/* Filters */}
      <div className="flex gap-2">
        <select
          value={filterUsed === null ? 'all' : filterUsed ? 'used' : 'unused'}
          onChange={(e) => {
            const value = e.target.value;
            setFilterUsed(value === 'all' ? null : value === 'used');
          }}
          className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">{t?.filterAll || 'All'}</option>
          <option value="used">{t?.filterUsed || 'Used'}</option>
          <option value="unused">{t?.filterUnused || 'Unused'}</option>
        </select>
        
        <select
          value={filterCompany || 'all'}
          onChange={(e) => {
            const value = e.target.value;
            setFilterCompany(value === 'all' ? null : value);
          }}
          className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">{t?.filterCompany || 'All Companies'}</option>
          {safeCompanies.map((company) => (
            <option key={company?.id} value={company?.id}>
              {company?.name || 'Unknown Company'}
            </option>
          ))}
        </select>
        
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<Download className="h-4 w-4" />}
          onClick={onExport}
          disabled={filteredCouponsLength === 0}
        >
          {t?.export || 'Export CSV'}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(CouponFilters);