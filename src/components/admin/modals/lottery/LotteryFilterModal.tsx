import React, { useState } from 'react';
import { Filter, Check, Search, Calendar, Building2, Trophy, X } from 'lucide-react';
import Modal from '../../../shared/Modal';
import Button from '../../../shared/Button';
import { useTranslations } from '../../../../hooks/useTranslations';

interface Company {
  id: string;
  name: string;
}

interface LotteryFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    searchTerm: string;
    filterWinner: boolean | null;
    filterCompany: string | null;
    filterDateFrom: Date | null;
    filterDateTo: Date | null;
  }) => void;
  initialFilters: {
    searchTerm: string;
    filterWinner: boolean | null;
    filterCompany: string | null;
    filterDateFrom: Date | null;
    filterDateTo: Date | null;
  };
  companies: Company[];
}

/**
 * Modal for filtering lottery entries
 */
const LotteryFilterModal: React.FC<LotteryFilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters,
  companies
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.lottery || {};
  
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm);
  const [filterWinner, setFilterWinner] = useState<boolean | null>(initialFilters.filterWinner);
  const [filterCompany, setFilterCompany] = useState<string | null>(initialFilters.filterCompany);
  const [filterDateFrom, setFilterDateFrom] = useState<Date | null>(initialFilters.filterDateFrom);
  const [filterDateTo, setFilterDateTo] = useState<Date | null>(initialFilters.filterDateTo);

  const handleApply = () => {
    onApplyFilters({
      searchTerm,
      filterWinner,
      filterCompany,
      filterDateFrom,
      filterDateTo
    });
    onClose();
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterWinner(null);
    setFilterCompany(null);
    setFilterDateFrom(null);
    setFilterDateTo(null);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    return new Date(dateString);
  };

  return (
    <Modal
      title={t?.filterEntries || 'Filter Lottery Entries'}
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      footer={
        <div className="flex justify-between w-full">
          <Button 
            variant="secondary" 
            onClick={handleClearFilters}
            leftIcon={<X className="h-4 w-4" />}
          >
            {t?.clearFilters || 'Clear Filters'}
          </Button>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose}>
              {t?.cancel || 'Cancel'}
            </Button>
            <Button 
              variant="primary" 
              onClick={handleApply}
              leftIcon={<Check className="h-4 w-4" />}
            >
              {t?.applyFilters || 'Apply Filters'}
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Search className="h-4 w-4 text-gray-500" />
            <span>{t?.search || 'Search'}</span>
          </label>
          <input
            type="text"
            placeholder={t?.searchPlaceholder || "Search by email, phone, or ID..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Winner filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-gray-500" />
            <span>{t?.winnerStatus || 'Winner Status'}</span>
          </label>
          <select
            value={filterWinner === null ? 'all' : filterWinner ? 'winners' : 'non-winners'}
            onChange={(e) => {
              const value = e.target.value;
              setFilterWinner(value === 'all' ? null : value === 'winners');
            }}
            className="input-field"
          >
            <option value="all">{t?.filterAll || 'All'}</option>
            <option value="winners">{t?.filterWinners || 'Winners'}</option>
            <option value="non-winners">{t?.filterNonWinners || 'Non-Winners'}</option>
          </select>
        </div>

        {/* Company filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-gray-500" />
            <span>{t?.company || 'Company'}</span>
          </label>
          <select
            value={filterCompany || 'all'}
            onChange={(e) => {
              const value = e.target.value;
              setFilterCompany(value === 'all' ? null : value);
            }}
            className="input-field"
          >
            <option value="all">{t?.filterCompany || 'All Companies'}</option>
            {companies.map((company) => (
              <option key={company?.id} value={company?.id}>
                {company?.name || 'Unknown Company'}
              </option>
            ))}
          </select>
        </div>

        {/* Date range filter */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>{t?.dateFrom || 'Date From'}</span>
            </label>
            <input
              type="date"
              value={formatDate(filterDateFrom)}
              onChange={(e) => setFilterDateFrom(parseDate(e.target.value))}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>{t?.dateTo || 'Date To'}</span>
            </label>
            <input
              type="date"
              value={formatDate(filterDateTo)}
              onChange={(e) => setFilterDateTo(parseDate(e.target.value))}
              className="input-field"
            />
          </div>
        </div>

        {/* Active filters summary */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span>{t?.activeFilters || 'Active Filters'}</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center gap-1">
                <Search className="h-3 w-3" />
                <span>{`"${searchTerm}"`}</span>
              </span>
            )}
            {filterWinner !== null && (
              <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs flex items-center gap-1">
                <Trophy className="h-3 w-3" />
                <span>{filterWinner ? t?.filterWinners : t?.filterNonWinners}</span>
              </span>
            )}
            {filterCompany && (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                <span>{companies.find(c => c.id === filterCompany)?.name || filterCompany}</span>
              </span>
            )}
            {filterDateFrom && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{`${t?.from || 'From'}: ${formatDate(filterDateFrom)}`}</span>
              </span>
            )}
            {filterDateTo && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{`${t?.to || 'To'}: ${formatDate(filterDateTo)}`}</span>
              </span>
            )}
            {!searchTerm && filterWinner === null && !filterCompany && !filterDateFrom && !filterDateTo && (
              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                {t?.noActiveFilters || 'No active filters'}
              </span>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LotteryFilterModal;