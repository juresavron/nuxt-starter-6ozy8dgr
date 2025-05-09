import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useConfirmDelete } from '../../useConfirmDelete';
import { useTranslations } from '../../useTranslations';

/**
 * Hook for lottery-related actions
 * @param fetchData Function to refresh data after actions
 * @returns Lottery action functions and state
 */
export const useLotteryActions = (fetchData: () => Promise<void>) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingCompany, setDrawingCompany] = useState<string | null>(null);
  const [showDrawModal, setShowDrawModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<{ id: string; name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { confirmDelete } = useConfirmDelete();
  const translations = useTranslations();
  const t = translations?.app?.admin?.lottery || {};

  // Mark prize as claimed
  const handleMarkAsClaimed = useCallback(async (entryId: string) => {
    try {
      console.log(`Marking lottery prize for entry ${entryId} as claimed`);
      setError(null);
      
      const { error } = await supabase
        .from('lottery_entries')
        .update({
          prize_claimed: true,
          prize_claimed_at: new Date().toISOString()
        })
        .eq('id', entryId);
        
      if (error) {
        console.error('Error marking prize as claimed:', error);
        throw error;
      }
      
      // Refresh data
      await fetchData();
      console.log('Prize marked as claimed successfully');
    } catch (err) {
      console.error('Error marking prize as claimed:', err);
      setError(err instanceof Error ? err.message : 'Failed to mark prize as claimed');
    }
  }, [fetchData]);

  // Open draw modal
  const openDrawModal = useCallback((companyId: string, companyName: string) => {
    console.log(`Opening draw modal for company: ${companyName} (${companyId})`);
    setSelectedCompany({ id: companyId, name: companyName });
    setShowDrawModal(true);
  }, []);

  // Draw winner for company
  const handleDrawWinnerForCompany = useCallback(async (companyId: string) => {
    try {
      console.log(`Drawing winner for company ${companyId}`);
      setIsDrawing(true);
      setDrawingCompany(companyId);
      setError(null);
      
      // Call the draw-lottery-winners edge function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/draw-lottery-winners`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          company_id: companyId
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from draw-lottery-winners:', errorData);
        throw new Error(errorData.error || 'Failed to draw winner');
      }
      
      const result = await response.json();
      console.log('Draw winner result:', result);
      
      // Refresh data
      await fetchData();
      
      // Close modal
      setShowDrawModal(false);
      setSelectedCompany(null);
      console.log('Drawing completed successfully');
    } catch (err) {
      console.error('Error drawing winner for company:', err);
      setError(err instanceof Error ? err.message : 'Failed to draw a winner');
    } finally {
      setIsDrawing(false);
      setDrawingCompany(null);
    }
  }, [fetchData]);

  return {
    isDrawing,
    drawingCompany,
    showDrawModal,
    selectedCompany,
    error,
    setError,
    setShowDrawModal,
    setSelectedCompany,
    handleMarkAsClaimed,
    openDrawModal,
    handleDrawWinnerForCompany
  };
};

export default useLotteryActions;