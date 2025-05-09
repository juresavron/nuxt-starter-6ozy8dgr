import React, { useState } from 'react';
import { Download, FileText, CheckCircle, Calendar, X } from 'lucide-react';
import Modal from '../../../shared/Modal';
import Button from '../../../shared/Button';
import { useTranslations } from '../../../../hooks/useTranslations';

interface LotteryExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: 'csv' | 'json', includeAll: boolean, dateRange: [Date | null, Date | null]) => void;
  isExporting: boolean;
}

/**
 * Modal for configuring and triggering data export
 */
const LotteryExportModal: React.FC<LotteryExportModalProps> = ({
  isOpen,
  onClose,
  onExport,
  isExporting
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.lottery || {};
  
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');
  const [includeAll, setIncludeAll] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);

  const handleExport = () => {
    onExport(exportFormat, includeAll, [dateFrom, dateTo]);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <Modal
      title={t?.exportOptions || 'Export Options'}
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isExporting}>
            {t?.cancel || 'Cancel'}
          </Button>
          <Button 
            variant="primary" 
            onClick={handleExport}
            isLoading={isExporting}
            leftIcon={<Download className="h-4 w-4" />}
          >
            {isExporting ? (t?.exporting || 'Exporting...') : (t?.export || 'Export Data')}
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Export format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t?.exportFormat || 'Export Format'}
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                exportFormat === 'csv' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
              } cursor-pointer transition-colors`}>
                <FileText className={`h-8 w-8 mb-2 ${
                  exportFormat === 'csv' ? 'text-blue-500' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  exportFormat === 'csv' ? 'text-blue-700' : 'text-gray-700'
                }`}>CSV</span>
                <input
                  type="radio"
                  className="sr-only"
                  name="exportFormat"
                  value="csv"
                  checked={exportFormat === 'csv'}
                  onChange={() => setExportFormat('csv')}
                />
              </label>
            </div>
            <div className="flex-1">
              <label className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                exportFormat === 'json' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
              } cursor-pointer transition-colors`}>
                <FileText className={`h-8 w-8 mb-2 ${
                  exportFormat === 'json' ? 'text-blue-500' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  exportFormat === 'json' ? 'text-blue-700' : 'text-gray-700'
                }`}>JSON</span>
                <input
                  type="radio"
                  className="sr-only"
                  name="exportFormat"
                  value="json"
                  checked={exportFormat === 'json'}
                  onChange={() => setExportFormat('json')}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Include all data option */}
        <div className="flex items-center">
          <input
            id="includeAll"
            type="checkbox"
            checked={includeAll}
            onChange={(e) => setIncludeAll(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="includeAll" className="ml-2 block text-sm text-gray-900">
            {t?.includeAllData || 'Include all available data (overrides date range)'}
          </label>
        </div>

        {/* Date range */}
        <div className={`${includeAll ? 'opacity-50' : ''}`}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t?.dateRange || 'Date Range'}
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                {t?.from || 'From'}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={formatDate(dateFrom)}
                  onChange={(e) => setDateFrom(e.target.value ? new Date(e.target.value) : null)}
                  className="pl-10 input-field"
                  disabled={includeAll}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                {t?.to || 'To'}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={formatDate(dateTo)}
                  onChange={(e) => setDateTo(e.target.value ? new Date(e.target.value) : null)}
                  className="pl-10 input-field"
                  disabled={includeAll}
                  min={dateFrom ? formatDate(dateFrom) : ''}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Export summary */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            {t?.exportSummary || 'Export Summary'}
          </h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>{exportFormat === 'csv' ? 'CSV file with comma-separated values' : 'JSON file with structured data'}</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>{includeAll ? 'All available lottery entries' : 'Entries within specified date range'}</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>{t?.includesContactInfo || 'Includes contact information and status details'}</span>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default LotteryExportModal;