import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

interface GamificationState {
  companyId: string | null;
  reviewId: string | null;
  rating: number | null;
  companyName: string;
  colorScheme: string;
  giftDescription: string | null;
  loading: boolean;
  error: string | null;
  hasRequiredParams: () => boolean;
}

export const useGamificationState = (): GamificationState => {
  const [searchParams] = useSearchParams();
  const [companyName, setCompanyName] = useState('');
  const [colorScheme, setColorScheme] = useState('blue');
  const [giftDescription, setGiftDescription] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get required parameters from URL
  const companyId = searchParams.get('companyId');
  const reviewId = searchParams.get('reviewId');
  const rating = searchParams.get('rating') ? parseInt(searchParams.get('rating')!) : null;

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!companyId || !reviewId) {
        setError('Missing required information. Please check the link.');
        setLoading(false);
        return;
      }

      try {
        const { data: company, error } = await supabase
          .from('companies')
          .select('name, color_scheme, gift_description')
          .eq('id', companyId)
          .single();

        if (error) throw error;

        if (company) {
          setCompanyName(company.name);
          setColorScheme(company.color_scheme || 'blue');
          setGiftDescription(company.gift_description);
        }
      } catch (err) {
        console.error('Error fetching company data:', err);
        setError('Failed to load company data');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [companyId, reviewId]);

  const hasRequiredParams = () => {
    return Boolean(companyId && reviewId && rating && rating >= 1 && rating <= 5);
  };

  return {
    companyId,
    reviewId,
    rating,
    companyName,
    colorScheme,
    giftDescription,
    loading,
    error,
    hasRequiredParams
  };
};

export default useGamificationState;