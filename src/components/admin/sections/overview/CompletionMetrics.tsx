import * as React from 'react';
import { CheckCircle } from 'lucide-react';
import { useTranslations } from '../../../../hooks/useTranslations';

interface CompletionMetricsProps {
  completed: number;
  redirected: number;
  redirectRate: number;
}

const CompletionMetrics: React.FC<CompletionMetricsProps> = ({
  completed,
  redirected,
  redirectRate
}) => {
  const translations = useTranslations();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{translations?.app?.admin?.stats?.completedReviews || 'Zaključene ocene'}</span>
        <span className="font-semibold text-blue-600">{completed}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{translations?.app?.admin?.stats?.googleRedirects || 'Google preusmeritve'}</span>
        <span className="font-semibold text-blue-600">{redirected}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{translations?.app?.admin?.stats?.redirectRate || 'Stopnja preusmeritev'}</span>
        <span className="font-semibold text-blue-600">{redirectRate.toFixed(1)}%</span>
      </div>
    </div>
  );
};

export default CompletionMetrics;