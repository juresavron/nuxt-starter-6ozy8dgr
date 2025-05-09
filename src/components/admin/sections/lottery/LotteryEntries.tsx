import React, { useEffect, useState } from 'react';
import { useAdminStore } from '../../../../hooks/admin/store';
import { useLotteryData, useLotteryFilters, useLotteryActions } from '../../../../hooks/admin/lottery';
import LotteryHeader from './LotteryHeader';
import LotteryTable from './LotteryTable';
import LotteryFilters from './LotteryFilters';
import LotteryEmptyState from './LotteryEmptyState';
import LotteryLoadingState from './LotteryLoadingState';
import DrawLotteryModal from './DrawLotteryModal';

const LotteryEntries: React.FC = () => {
  const { isSuperAdmin } = useAdminStore();
  
  // Fetch lottery data
  const {
    lotteryEntries,
    companies,
    loading,
    error,
    refreshing,
    fetchData
  } = useLotteryData(isSuperAdmin);
  
  // Filtering and export
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
  
  // Lottery actions
  const {
    isDrawing,
    drawingCompany,
    showDrawModal,
    selectedCompany,
    error: actionError,
    setError,
    setShowDrawModal,
    setSelectedCompany,
    handleMarkAsClaimed,
    openDrawModal,
    handleDrawWinnerForCompany
  } = useLotteryActions(fetchData);
  
  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  // Handle refresh
  const handleRefresh = () => {
    fetchData();
  };
  
  // Render loading state
  if (loading && !refreshing) {
    return <LotteryLoadingState />;
  }
  
  // Render empty state
  if (!loading && filteredEntries.length === 0 && !searchTerm && !filterWinner && !filterCompany) {
    return <LotteryEmptyState onRefresh={handleRefresh} />;
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <LotteryHeader 
        onRefresh={handleRefresh} 
        refreshing={refreshing} 
        onExport={handleExport}
        error={error || actionError}
      />
      
      {/* Filters */}
      <LotteryFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterWinner={filterWinner}
        setFilterWinner={setFilterWinner}
        filterCompany={filterCompany}
        setFilterCompany={setFilterCompany}
        companies={companies}
      />
      
      {/* Table */}
      <LotteryTable 
        entries={filteredEntries} 
        companies={companies}
        onMarkAsClaimed={handleMarkAsClaimed}
        openDrawModal={openDrawModal}
      />
      
      {/* Draw Modal */}
      {showDrawModal && selectedCompany && (
        <DrawLotteryModal
          isOpen={showDrawModal}
          onClose={() => setShowDrawModal(false)}
          company={selectedCompany}
          isDrawing={isDrawing && drawingCompany === selectedCompany.id}
          onDrawWinner={() => handleDrawWinnerForCompany(selectedCompany.id)}
          error={actionError}
          setError={setError}
        />
      )}
    </div>
  );
};

export default LotteryEntries;