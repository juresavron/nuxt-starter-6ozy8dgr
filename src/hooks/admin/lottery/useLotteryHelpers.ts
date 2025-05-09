import { useCallback } from 'react';
import { saveAs } from 'file-saver';
import { useTranslations } from '../../useTranslations';
import type { Company, LotteryWinner } from '../../../components/admin/modals/lottery/types';

/**
 * Hook providing helper functions for lottery-related operations
 * @returns Utility functions for lottery operations
 */
export const useLotteryHelpers = () => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.lottery || {};

  /**
   * Formats a lottery drawing frequency to display text
   * @param company Company with lottery configuration
   * @returns Formatted frequency text
   */
  const formatDrawingFrequency = useCallback((company: Company | null) => {
    if (!company) return '';
    
    const frequency = company.lottery_drawing_frequency;
    const day = company.lottery_drawing_day;
    
    if (!frequency || !day) return '';
    
    const freqMap = {
      daily: t?.drawingFrequency?.daily || 'Daily',
      weekly: t?.drawingFrequency?.weekly || 'Weekly',
      monthly: t?.drawingFrequency?.monthly || 'Monthly'
    };
    
    if (frequency === 'daily') {
      return freqMap.daily;
    } else if (frequency === 'weekly') {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return `${freqMap.weekly} (${days[day]})`;
    } else if (frequency === 'monthly') {
      return `${freqMap.monthly} (${day}.)`;
    }
    
    return '';
  }, [t]);

  /**
   * Calculate the next drawing date for a company
   * @param companyId Company ID
   * @param companies Array of companies
   * @returns Next drawing date or null
   */
  const getNextDrawingDate = useCallback((companyId: string, companies: Company[]) => {
    if (!companyId || !companies || !Array.isArray(companies)) return null;
    
    const company = companies.find(c => c?.id === companyId);
    return company?.next_drawing_date ? new Date(company.next_drawing_date) : null;
  }, []);

  /**
   * Export lottery entries to CSV or JSON
   * @param entries Lottery entries to export
   * @param format Export format (csv or json)
   * @param companies Companies for lookup
   */
  const exportEntries = useCallback((
    entries: LotteryWinner[],
    format: 'csv' | 'json' = 'csv',
    companies: Company[] = []
  ) => {
    if (!Array.isArray(entries) || entries.length === 0) {
      console.warn('No entries to export');
      return;
    }
    
    const getCompanyName = (companyId: string): string => {
      const company = companies.find(c => c?.id === companyId);
      return company?.name || 'Unknown Company';
    };
    
    const formatDate = (date: string | null): string => {
      if (!date) return 'N/A';
      return new Date(date).toLocaleDateString();
    };
    
    if (format === 'csv') {
      // Create CSV content
      const headers = ['Entry Date', 'Company', 'Email', 'Phone', 'Status', 'Won At', 'Claimed'];
      const rows = entries.map(entry => [
        formatDate(entry.entry_date),
        getCompanyName(entry.company_id),
        entry.email || 'N/A',
        entry.phone || 'N/A',
        entry.is_winner ? 'Winner' : 'Not Selected',
        formatDate(entry.won_at),
        entry.prize_claimed ? 'Yes' : 'No'
      ]);
      
      // Combine headers and rows
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, `lottery_entries_${new Date().toISOString().split('T')[0]}.csv`);
    } else {
      // Create JSON content with formatted data
      const jsonData = entries.map(entry => ({
        id: entry.id,
        company: getCompanyName(entry.company_id),
        email: entry.email,
        phone: entry.phone,
        entryDate: entry.entry_date,
        isWinner: entry.is_winner,
        wonAt: entry.won_at,
        prizeClaimed: entry.prize_claimed,
        prizeClaimedAt: entry.prize_claimed_at
      }));
      
      // Create and download file
      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      saveAs(blob, `lottery_entries_${new Date().toISOString().split('T')[0]}.json`);
    }
    
    console.log(`Exported ${entries.length} entries as ${format.toUpperCase()}`);
  }, []);

  return {
    formatDrawingFrequency,
    getNextDrawingDate,
    exportEntries
  };
};

export default useLotteryHelpers;