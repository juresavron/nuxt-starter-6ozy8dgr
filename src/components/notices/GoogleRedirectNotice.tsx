import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

interface GoogleRedirectNoticeProps {
  show: boolean;
  url: string | null;
  reviewId: string | null;
  companyId: string | undefined;
  rating: number;
}

const GoogleRedirectNotice: React.FC<GoogleRedirectNoticeProps> = ({
  show,
  url,
  reviewId,
  companyId,
  rating
}) => {
  const navigate = useNavigate();

  if (!show || !url) return null;

  const handleRedirect = async () => {
    if (reviewId) {
      await supabase
        .from('reviews')
        .update({
          google_redirect_type: 'manual',
          redirected_to_google_at: new Date().toISOString(),
          gamification_steps_completed: ['google_review']
        })
        .eq('id', reviewId);
    }
    navigate(`/gamification?companyId=${companyId}&rating=${rating}&reviewId=${reviewId}`);
  };

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mt-4 text-sm text-yellow-800 flex items-center gap-3 animate-fade-in">
      <div className="flex-1">
        Brskalnik je blokiral samodejno odpiranje Google strani. Prosimo, kliknite{' '}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleRedirect}
          className="font-medium text-blue-600 hover:text-blue-800 underline"
        >
          tukaj
        </a>
        {' '}za odpiranje Google strani in oddajo ocene.
      </div>
    </div>
  );
};

export default GoogleRedirectNotice;