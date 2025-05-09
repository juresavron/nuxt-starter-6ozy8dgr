import React from 'react';
import { format } from 'date-fns';
import { Check, X, Award, Gift, Calendar, MoreHorizontal } from 'lucide-react';
import { useTranslations } from '../../../../hooks/useTranslations';
import { cn } from '../../../../utils/cn';

interface LotteryTableProps {
  entries: any[];
  companies: any[];
  onMarkAsClaimed: (entryId: string) => Promise<void>;
  openDrawModal: (companyId: string, companyName: string) => void;
}

const LotteryTable: React.FC<LotteryTableProps> = ({
  entries,
  companies,
  onMarkAsClaimed,
  openDrawModal
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.lottery || {};

  // Get company name by ID
  const getCompanyName = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    return company?.name || 'Unknown Company';
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'dd.MM.yyyy HH:mm');
    } catch (e) {
      return 'Invalid date';
    }
  };

  // Get next drawing date for a company
  const getNextDrawingDate = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    return company?.next_drawing_date ? formatDate(company.next_drawing_date) : 'Not scheduled';
  };

  // Format drawing frequency
  const formatDrawingFrequency = (company: any) => {
    if (!company) return '';
    
    const frequency = company.lottery_drawing_frequency;
    const day = company.lottery_drawing_day;
    
    if (!frequency || !day) return '';
    
    const freqMap = {
      daily: t?.drawingFrequency?.daily || 'Daily',
      weekly: t?.drawingFrequency?.weekly || 'Weekly',
      monthly: t?.drawingFrequency?.monthly || 'Monthly'
    };
    
    if (frequency === 'daily') {
      return freqMap.daily;
    } else if (frequency === 'weekly') {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return `${freqMap.weekly} (${days[day]})`;
    } else if (frequency === 'monthly') {
      return `${freqMap.monthly} (${day}.)`;
    }
    
    return '';
  };

  // Group entries by company
  const entriesByCompany = entries.reduce((acc, entry) => {
    if (!acc[entry.company_id]) {
      acc[entry.company_id] = [];
    }
    acc[entry.company_id].push(entry);
    return acc;
  }, {});

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t?.entryDate || 'Entry Date'}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t?.company || 'Company'}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t?.contact || 'Contact'}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t?.status || 'Status'}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t?.actions || 'Actions'}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Object.keys(entriesByCompany).map(companyId => {
            const companyEntries = entriesByCompany[companyId];
            const company = companies.find(c => c.id === companyId);
            const companyName = getCompanyName(companyId);
            const nextDrawing = getNextDrawingDate(companyId);
            const drawingFrequency = formatDrawingFrequency(company);
            
            // Count winners and non-winners
            const winners = companyEntries.filter(entry => entry.is_winner).length;
            const totalEntries = companyEntries.length;
            
            return (
              <React.Fragment key={companyId}>
                {/* Company header row */}
                <tr className="bg-gray-50">
                  <td colSpan={5} className="px-6 py-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-gray-900">{companyName}</span>
                        <span className="ml-2 text-sm text-gray-500">
                          ({winners} {t?.winner || 'winners'} / {totalEntries} {t?.entries || 'entries'})
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{t?.nextDrawing || 'Next drawing'}: {nextDrawing}</span>
                        </div>
                        <button
                          onClick={() => openDrawModal(companyId, companyName)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <Award className="h-4 w-4 mr-1" />
                          {t?.draw || 'Draw'}
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                
                {/* Entry rows */}
                {companyEntries.map(entry => (
                  <tr key={entry.id} className={cn(
                    entry.is_winner ? 'bg-green-50' : 'hover:bg-gray-50'
                  )}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(entry.entry_date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {companyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.email || entry.phone || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {entry.is_winner ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            <Award className="h-3.5 w-3.5 mr-1" />
                            {t?.winner || 'Winner'}
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {t?.notWinner || 'Not selected'}
                          </span>
                        )}
                        
                        {entry.is_winner && (
                          <span className={cn(
                            "ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                            entry.prize_claimed 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-yellow-100 text-yellow-800"
                          )}>
                            {entry.prize_claimed 
                              ? <><Check className="h-3.5 w-3.5 mr-1" />{t?.claimed || 'Claimed'}</>
                              : <><X className="h-3.5 w-3.5 mr-1" />{t?.notClaimed || 'Not claimed'}</>
                            }
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.is_winner && !entry.prize_claimed && (
                        <button
                          onClick={() => onMarkAsClaimed(entry.id)}
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <Gift className="h-3.5 w-3.5 mr-1" />
                          {t?.markAsClaimed || 'Mark as claimed'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            );
          })}
          
          {Object.keys(entriesByCompany).length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                {t?.noEntries || 'No lottery entries found'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LotteryTable;