import { useState, useCallback, useMemo } from 'react';
import { saveAs } from 'file-saver';

/**
 * Hook for filtering and exporting lottery entries
 * @param lotteryEntries Array of lottery entries
 * @param companies Array of companies
 * @returns Filter state and functions
 */
export const useLotteryFilters = (lotteryEntries: any[], companies: any[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWinner, setFilterWinner] = useState<boolean | null>(null);
  const [filterCompany, setFilterCompany] = useState<string | null>(null);

  // Filter entries based on search term and filters
  const filteredEntries = useMemo(() => {
    if (!Array.isArray(lotteryEntries)) {
      console.warn('useLotteryFilters: lotteryEntries is not an array', lotteryEntries);
      return [];
    }
    
    const safeCompanies = Array.isArray(companies) ? companies : [];
    
    return lotteryEntries.filter(entry => {
      if (!entry) return false;
      
      // Apply search filter
      if (searchTerm) {
        const company = safeCompanies.find(c => c?.id === entry?.company_id)?.name || '';
        const searchLower = searchTerm.toLowerCase();
        
        if (
          !company.toLowerCase().includes(searchLower) &&
          !(entry?.email && entry.email.toLowerCase().includes(searchLower)) &&
          !(entry?.phone && entry.phone.toLowerCase().includes(searchLower)) &&
          !entry?.id.toLowerCase().includes(searchLower) &&
          !entry?.review_id.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }
      
      // Apply winner/non-winner filter
      if (filterWinner !== null && entry?.is_winner !== filterWinner) {
        return false;
      }
      
      // Apply company filter
      if (filterCompany && entry?.company_id !== filterCompany) {
        return false;
      }
      
      return true;
    });
  }, [lotteryEntries, companies, searchTerm, filterWinner, filterCompany]);

  // Export entries to CSV
  const handleExport = useCallback(() => {
    console.log('Exporting lottery entries to CSV');
    
    if (!Array.isArray(filteredEntries) || filteredEntries.length === 0) {
      console.warn('No entries to export');
      return;
    }
    
    const safeCompanies = Array.isArray(companies) ? companies : [];
    
    // Create CSV content
    const headers = ['Entry Date', 'Company', 'Email', 'Phone', 'Status', 'Won At', 'Claimed'];
    const rows = filteredEntries.map(entry => {
      const company = safeCompanies.find(c => c?.id === entry?.company_id)?.name || 'Unknown';
      const status = entry?.is_winner ? 'Winner' : 'Not Selected';
      const wonAt = entry?.won_at ? new Date(entry.won_at).toLocaleDateString() : 'N/A';
      const claimed = entry?.prize_claimed ? 'Yes' : 'No';
      
      return [
        new Date(entry.entry_date).toLocaleDateString(),
        company,
        entry.email || 'N/A',
        entry.phone || 'N/A',
        status,
        wonAt,
        claimed
      ];
    });
    
    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `lottery_entries_${new Date().toISOString().split('T')[0]}.csv`);
    console.log('CSV export complete');
  }, [filteredEntries, companies]);

  return {
    searchTerm,
    setSearchTerm,
    filterWinner,
    setFilterWinner,
    filterCompany,
    setFilterCompany,
    filteredEntries,
    handleExport
  };
};

export default useLotteryFilters;