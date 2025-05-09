import React, { useState } from 'react';
import { Calendar, X } from 'lucide-react';
import { useAdminStore } from '../../../../hooks/admin/store';
import { cn } from '../../../../utils/cn';
import { useWindowSize } from 'react-use';
import { useLocation } from 'react-router-dom';

const ranges = [
  { label: '1 dan', value: '1d' },
  { label: '7 dni', value: '7d' },
  { label: '30 dni', value: '30d' },
  { label: '6 mesecev', value: '6m' },
  { label: 'Vse', value: 'all' },
  { label: 'Po meri', value: 'custom' }
] as const;

/**
 * Date range selector component
 */
const DateRangeSelector: React.FC = () => {
  const location = useLocation();
  const { width } = useWindowSize();
  const isMobile = width < 640;
  const { dateRange, customDateRange, setDateRange, setCustomDateRange } = useAdminStore();
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Determine if we're on the company details page
  const isCompanyDetailsPage = location.pathname.includes('/admin/companies/');

  // Handle date range selection
  const handleRangeClick = (value: string) => {
    console.log('DateRangeSelector: Setting date range to', value);
    if (value === 'custom') {
      setShowDatePicker(true);
    } else {
      setDateRange(value);
      setShowDatePicker(false);
    }
  };

  // Format date for input
  const formatDateForInput = (date: Date | null): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  // Handle custom date range confirmation
  const handleConfirm = () => {
    setDateRange('custom'); // Ensure dateRange is set to 'custom'
    setShowDatePicker(false);
    console.log('DateRangeSelector: Custom date range confirmed', {
      startDate: customDateRange.startDate.toISOString().split('T')[0],
      endDate: customDateRange.endDate.toISOString().split('T')[0]
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className={`p-2 rounded-lg ${isCompanyDetailsPage ? 'bg-blue-100/50 text-blue-700' : 'bg-gray-100/50 text-gray-500'}`}>
        <Calendar className="h-4 w-4 text-blue-500" style={{ fill: 'rgba(219, 234, 254, 0.5)' }} />
      </div>
      <div className="flex gap-1 relative">
        {ranges.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => handleRangeClick(value)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 shadow-sm",
              dateRange === value
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100 border border-gray-100"
            )}
          > 
            {label}
          </button>
        ))}
        
        {showDatePicker && (
          <div className="absolute top-full mt-2 z-50">
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-gray-900">Izberi obdobje</h3>
                <button 
                  onClick={() => setShowDatePicker(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-2 items-center">
                  <input
                    type="date"
                    value={formatDateForInput(customDateRange.startDate)}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      if (!isNaN(date.getTime())) {
                         // Set time to start of day
                         date.setHours(0, 0, 0, 0);
                        setCustomDateRange(date, customDateRange.endDate);
                      }
                    }}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 hover:bg-white transition-colors"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="date"
                    value={formatDateForInput(customDateRange.endDate)}
                    min={formatDateForInput(customDateRange.startDate)}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      if (!isNaN(date.getTime())) {
                         // Set time to end of day
                         date.setHours(23, 59, 59, 999);
                        setCustomDateRange(customDateRange.startDate, date);
                      }
                    }}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 hover:bg-white transition-colors"
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDatePicker(false)} 
                    className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border border-gray-100"
                  >
                    Prekliči
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className="px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all shadow-sm"
                  >
                    Potrdi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(DateRangeSelector);