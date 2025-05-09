import { useCallback } from 'react';

/**
 * Hook for lottery utility functions
 * @returns Utility functions for lottery entries
 */
export const useLotteryUtils = () => {
  // Get next drawing date
  const getNextDrawingDate = useCallback((companyId: string, companies: any[] = []) => {
    if (!companyId || !Array.isArray(companies)) return null;
    
    const company = companies.find(c => c?.id === companyId);
    return company?.next_drawing_date ? new Date(company.next_drawing_date) : null;
  }, []);

  // Format drawing frequency
  const formatDrawingFrequency = useCallback((company: any, translations?: any) => {
    if (!company) return '';
    
    const t = translations?.app?.admin?.lottery?.drawingFrequency || {
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly'
    };
    
    const frequency = company.lottery_drawing_frequency;
    const day = company.lottery_drawing_day;
    
    if (frequency === 'daily') {
      return t.daily || 'Daily';
    } else if (frequency === 'weekly') {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return `${t.weekly || 'Weekly'} (${days[day]})`;
    } else if (frequency === 'monthly') {
      return `${t.monthly || 'Monthly'} (${day}.)`;
    }
    
    return '';
  }, []);

  return {
    getNextDrawingDate,
    formatDrawingFrequency
  };
};

export default useLotteryUtils;