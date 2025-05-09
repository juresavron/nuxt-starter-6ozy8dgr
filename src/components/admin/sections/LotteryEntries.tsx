import React, { useEffect } from 'react';
import Card from '../../shared/Card';
import ErrorAlert from '../../shared/ErrorAlert';
import { useAdminStore } from '../../../hooks/admin/store';
import { useTranslations } from '../../../hooks/useTranslations';

// Import hooks
import { 
  useLotteryData, 
  useLotteryActions, 
  useLotteryFilters,
  useLotteryUtils
} from '../../../hooks/admin/lottery';

// Import components
import {
  LotteryHeader,
  LotteryFilters,
  LotteryTable,
  LotteryEmptyState,
  LotteryLoadingState,
  DrawLotteryModal
} from './lottery';

/**
 * Lottery Entries section of the admin panel
 * Shows all lottery entries and allows drawing winners
 */
const LotteryEntries: React.FC = () => {
  const { isSuperAdmin, assignedCompanyIds } = useAdminStore();
  const translations = useTranslations();
  
  // Use lottery data hook
  const {
    lotteryEntries,
    companies,
    loading,
    error,
    refreshing,
    initialized,
    fetchData,
    setError
  } = useLotteryData(isSuperAdmin);
  
  // Log the state for debugging
  React.useEffect(() => {
    console.log('LotteryEntries component state:', {
      entriesCount: lotteryEntries?.length || 0,
      companiesCount: companies?.length || 0,
      loading,
      error,
      refreshing,
      initialized
    });
  }, [lotteryEntries, companies, loading, error, refreshing, initialized]);
  
  // Use lottery filters hook
  const {
    searchTerm,
    setSearchTerm,
    filterWinner,
    setFilterWinner,
    filterCompany,
    setFilterCompany,
    filteredEntries,
    handleExport
  } = useLotteryFilters(lotteryEntries, companies);
  
  // Use lottery actions hook
  const {
    isDrawing,
    drawingCompany,
    showDrawModal,
    selectedCompany,
    setShowDrawModal,
    setSelectedCompany,
    handleMarkAsClaimed,
    openDrawModal,
    handleDrawWinnerForCompany
  } = useLotteryActions(fetchData);
  
  // Use lottery utils hook
  const {
    getNextDrawingDate,
    formatDrawingFrequency
  } = useLotteryUtils();

  // Fetch data on mount
  useEffect(() => {
    console.log('LotteryEntries: Initial data fetch');
    fetchData().catch(err => {
      console.error('Error fetching lottery data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch lottery data');
    });
  }, [fetchData, setError]);

  // Handle global draw winner
  const handleDrawWinner = async () => {
    // Show company selection dialog for drawing
    if (companies && companies.length > 0) {
      const lotteryCompanies = companies.filter(c => c.coupon_type === 'lottery');
      
      if (lotteryCompanies.length === 0) {
        alert('No companies with lottery enabled are available.');
        return;
      }
      
      const companyOptions = lotteryCompanies
        .map(c => `${c.name} (ID: ${c.id})`)
        .join('\n');
      
      const companyId = prompt(
        `Select a company to draw a winner for:\n\n${companyOptions}\n\nEnter company ID:`,
        lotteryCompanies[0].id
      );
      
      if (companyId) {
        const company = companies.find(c => c.id === companyId);
        if (company) {
          openDrawModal(company);
        } else {
          alert('Invalid company ID. Please try again.');
        }
      }
    } else {
      alert('No companies available for drawing.');
    }
  };

  // Show loading state
  if ((loading && !initialized) || (loading && lotteryEntries.length === 0)) {
    console.log('LotteryEntries: Showing loading state');
    return <LotteryLoadingState />;
  }

  return (
    <div className="space-y-6 pb-20">
      <LotteryHeader 
        onRefresh={() => fetchData()} 
        onDrawWinner={handleDrawWinner}
        refreshing={refreshing}
      />

      {error && (
        <ErrorAlert
          message={error}
          severity="error"
          onDismiss={() => setError(null)}
        />
      )}

      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50/30">
          <LotteryFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterWinner={filterWinner}
            setFilterWinner={setFilterWinner}
            filterCompany={filterCompany}
            setFilterCompany={setFilterCompany}
            companies={companies}
            onExport={handleExport}
            filteredEntriesLength={filteredEntries.length}
          />
        </div>
        
        {filteredEntries.length === 0 ? (
          <div className="p-6">
            <LotteryEmptyState />
          </div>
        ) : (
          <LotteryTable
            entries={filteredEntries}
            companies={companies}
            onMarkAsClaimed={handleMarkAsClaimed}
            openDrawModal={openDrawModal}
          />
        )}
      </Card>
      
      {/* Draw Lottery Modal */}
      <DrawLotteryModal
        isOpen={showDrawModal}
        onClose={() => {
          setShowDrawModal(false);
          setSelectedCompany(null);
        }}
        company={selectedCompany}
        isDrawing={isDrawing && drawingCompany === selectedCompany?.id}
        onDrawWinner={handleDrawWinnerForCompany}
        error={error}
        setError={setError}
      />
    </div>
  );
};

export default React.memo(LotteryEntries);