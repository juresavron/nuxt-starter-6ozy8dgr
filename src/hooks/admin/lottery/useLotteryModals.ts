import { useState, useCallback } from 'react';
import { useTranslations } from '../../useTranslations';
import type { 
  LotteryWinner, 
  LotteryFilterOptions, 
  ExportOptions, 
  Company 
} from '../../../components/admin/modals/lottery/types';

/**
 * Hook for managing lottery modals state and actions
 * @returns State and handlers for lottery modals
 */
export const useLotteryModals = () => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.lottery || {};

  // Draw Modal
  const [showDrawModal, setShowDrawModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Winner Modal
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState<LotteryWinner | null>(null);
  const [isProcessingWinner, setIsProcessingWinner] = useState(false);

  // Filter Modal
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterOptions, setFilterOptions] = useState<LotteryFilterOptions>({
    searchTerm: '',
    filterWinner: null,
    filterCompany: null,
    filterDateFrom: null,
    filterDateTo: null
  });

  // Export Modal
  const [showExportModal, setShowExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Confirm Action Modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    title: string;
    message: string;
    confirmText: string;
    cancelText?: string;
    onConfirm: () => Promise<void>;
    type: 'warning' | 'success' | 'error';
  } | null>(null);
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  // Draw Modal handlers
  const openDrawModal = useCallback((company: Company) => {
    setSelectedCompany(company);
    setShowDrawModal(true);
  }, []);

  const closeDrawModal = useCallback(() => {
    setShowDrawModal(false);
    setSelectedCompany(null);
  }, []);

  // Winner Modal handlers
  const openWinnerModal = useCallback((winner: LotteryWinner) => {
    setSelectedWinner(winner);
    setShowWinnerModal(true);
  }, []);

  const closeWinnerModal = useCallback(() => {
    setShowWinnerModal(false);
    setSelectedWinner(null);
  }, []);

  // Filter Modal handlers
  const openFilterModal = useCallback(() => {
    setShowFilterModal(true);
  }, []);

  const closeFilterModal = useCallback(() => {
    setShowFilterModal(false);
  }, []);

  const applyFilters = useCallback((filters: LotteryFilterOptions) => {
    setFilterOptions(filters);
    setShowFilterModal(false);
  }, []);

  // Export Modal handlers
  const openExportModal = useCallback(() => {
    setShowExportModal(true);
  }, []);

  const closeExportModal = useCallback(() => {
    setShowExportModal(false);
  }, []);

  const handleExport = useCallback((exportOptions: ExportOptions) => {
    setIsExporting(true);
    // Export logic would go here
    setTimeout(() => {
      setIsExporting(false);
      setShowExportModal(false);
    }, 1000);
  }, []);

  // Confirm Action Modal handlers
  const openConfirmModal = useCallback((actionConfig: {
    title: string;
    message: string;
    confirmText: string;
    cancelText?: string;
    onConfirm: () => Promise<void>;
    type?: 'warning' | 'success' | 'error';
  }) => {
    setConfirmAction({
      ...actionConfig,
      type: actionConfig.type || 'warning'
    });
    setShowConfirmModal(true);
  }, []);

  const closeConfirmModal = useCallback(() => {
    setShowConfirmModal(false);
    setConfirmAction(null);
  }, []);

  const handleConfirmAction = useCallback(async () => {
    if (!confirmAction) return;
    
    setIsProcessingAction(true);
    try {
      await confirmAction.onConfirm();
      setShowConfirmModal(false);
    } catch (err) {
      console.error('Error processing confirmed action:', err);
    } finally {
      setIsProcessingAction(false);
    }
  }, [confirmAction]);

  return {
    // Draw Modal
    showDrawModal,
    selectedCompany,
    isDrawing,
    openDrawModal,
    closeDrawModal,
    setIsDrawing,
    
    // Winner Modal
    showWinnerModal,
    selectedWinner,
    isProcessingWinner,
    openWinnerModal,
    closeWinnerModal,
    setIsProcessingWinner,
    
    // Filter Modal
    showFilterModal,
    filterOptions,
    openFilterModal,
    closeFilterModal,
    applyFilters,
    
    // Export Modal
    showExportModal,
    isExporting,
    openExportModal,
    closeExportModal,
    handleExport,
    
    // Confirm Action Modal
    showConfirmModal,
    confirmAction,
    isProcessingAction,
    openConfirmModal,
    closeConfirmModal,
    handleConfirmAction
  };
};

export default useLotteryModals;