import React, { useCallback } from 'react';
import { Search } from 'lucide-react';
import { translations } from '@/translations/sl';
import { useWindowSize } from 'react-use';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

// Memoize the SearchBar component to prevent unnecessary re-renders
const SearchBar = React.memo(function SearchBar({ value, onChange }: SearchBarProps) {
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  return (
  <div className="relative flex-1">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    <input
      type="text"
      placeholder={isMobile ? "Išči..." : (translations?.app?.admin?.reviews?.search || "Search reviews...")}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="pl-10 pr-4 py-2.5 sm:py-3 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 hover:bg-white transition-all duration-300 text-sm sm:text-base"
    />
  </div>
  );
});

export default SearchBar;