import React from 'react';
import { Filter } from 'lucide-react';

interface LotteryFiltersProps {
  filterWinner: boolean | null;
  setFilterWinner: (value: boolean | null) => void;
  filterCompany: string | null;
  setFilterCompany: (value: string | null) => void;
  companies: any[];
  translations?: any;
}

const LotteryFilters: React.FC<LotteryFiltersProps> = ({
  filterWinner,
  setFilterWinner,
  filterCompany,
  setFilterCompany,
  companies,
  translations
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {/* Winner filter */}
      <select
        value={filterWinner === null ? 'all' : filterWinner ? 'winner' : 'not-winner'}
        onChange={(e) => {
          const value = e.target.value;
          if (value === 'all') setFilterWinner(null);
          else if (value === 'winner') setFilterWinner(true);
          else setFilterWinner(false);
        }}
        className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="all">{translations?.filterAll || 'All'}</option>
        <option value="winner">{translations?.filterWinners || 'Winners'}</option>
        <option value="not-winner">{translations?.filterNonWinners || 'Non-Winners'}</option>
      </select>
      
      {/* Company filter */}
      <select
        value={filterCompany || ''}
        onChange={(e) => setFilterCompany(e.target.value || null)}
        className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">{translations?.filterCompany || 'All Companies'}</option>
        {companies.map(company => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LotteryFilters;