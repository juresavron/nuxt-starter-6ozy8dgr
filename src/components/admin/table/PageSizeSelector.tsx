import React, { useCallback } from 'react';
import { useWindowSize } from 'react-use';

interface PageSizeSelectorProps {
  pageSize: number;
  options: number[];
  onChange: (value: number) => void;
}

// Memoize the PageSizeSelector component to prevent unnecessary re-renders
const PageSizeSelector = React.memo(function PageSizeSelector({ pageSize, options = [25, 50, 100], onChange }: PageSizeSelectorProps) {
  const { width } = useWindowSize();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  
  // Ensure pageSize is a valid option, or default to the first option 
  const validPageSize = options && Array.isArray(options) && options.includes(pageSize) ? pageSize : (options && Array.isArray(options) && options.length > 0 ? options[0] : 25);
  
  return (
    <div className="flex items-center">
      <select
        value={validPageSize}
        onChange={(e) => {
          const newSize = Number(e.target.value);
          onChange(newSize);
        }}
        className="px-2 py-1.5 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
      >
        {(Array.isArray(options) ? options : [25, 50, 100]).map((size) => (
          <option key={size} value={size}>
            {isMobile || isTablet ? `${size}` : `${size} / stran`}
          </option>
        ))}
      </select>
    </div>
  );
});

PageSizeSelector.displayName = 'PageSizeSelector';

export default PageSizeSelector;