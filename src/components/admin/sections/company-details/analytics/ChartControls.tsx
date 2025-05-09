import React from 'react';
import { BarChart2, PieChart as PieChartIcon } from 'lucide-react';
import { cn } from '../../../../../utils/cn';

interface ChartControlsProps {
  chartType: 'bar' | 'pie';
  viewMode: 'count' | 'percentage';
  setChartType: (type: 'bar' | 'pie') => void;
  setViewMode: (mode: 'count' | 'percentage') => void;
  colorScheme?: string;
}

/**
 * Controls for switching between chart types and view modes
 */
const ChartControls: React.FC<ChartControlsProps> = ({
  chartType,
  viewMode,
  setChartType,
  setViewMode,
  colorScheme = 'blue'
}) => {
  // Get background and text color classes based on color scheme
  const getActiveClass = (isActive: boolean) => {
    if (!isActive) return 'text-gray-500 hover:text-gray-700';
    
    switch (colorScheme) {
      case 'amber': return 'bg-amber-100 text-amber-700';
      case 'emerald': return 'bg-emerald-100 text-emerald-700';
      case 'rose': return 'bg-rose-100 text-rose-700';
      case 'bw': return 'bg-gray-200 text-gray-800';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Chart type controls */}
      <div className="flex p-1 bg-gray-100 rounded-lg">
        <button
          onClick={() => setChartType('bar')}
          className={cn(
            "p-1.5 rounded-md transition-colors",
            getActiveClass(chartType === 'bar')
          )}
          aria-label="Bar chart"
        >
          <BarChart2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => setChartType('pie')}
          className={cn(
            "p-1.5 rounded-md transition-colors",
            getActiveClass(chartType === 'pie')
          )}
          aria-label="Pie chart"
        >
          <PieChartIcon className="h-4 w-4" />
        </button>
      </div>
      
      {/* View mode controls */}
      <div className="flex p-1 bg-gray-100 rounded-lg">
        <button
          onClick={() => setViewMode('count')}
          className={cn(
            "px-2 py-1 text-xs font-medium rounded-md transition-colors",
            getActiveClass(viewMode === 'count')
          )}
        >
          Število
        </button>
        <button
          onClick={() => setViewMode('percentage')}
          className={cn(
            "px-2 py-1 text-xs font-medium rounded-md transition-colors",
            getActiveClass(viewMode === 'percentage')
          )}
        >
          Odstotek
        </button>
      </div>
    </div>
  );
};

export default ChartControls;