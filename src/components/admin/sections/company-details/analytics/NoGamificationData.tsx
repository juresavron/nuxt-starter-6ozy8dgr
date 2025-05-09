import React from 'react';
import { Share2 } from 'lucide-react';

/**
 * Placeholder component shown when there's no gamification data available
 */
const NoGamificationData: React.FC = () => {
  return (
    <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
      <Share2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
      <h4 className="text-lg font-medium text-gray-700 mb-2">Ni podatkov o gejmifikaciji</h4>
      <p className="text-gray-500">
        Zaenkrat ni dokončanih nalog gejmifikacije. Podatki se bodo prikazali, ko bodo stranke začele uporabljati vaše naloge gejmifikacije.
      </p>
    </div>
  );
};

export default NoGamificationData;