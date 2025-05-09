import * as React from 'react';
import { useTranslations } from '../../hooks/useTranslations';

const ReviewFooter: React.FC = () => {
  const translations = useTranslations();

  return (
    <footer className="mt-8 pt-4 border-t border-gray-100 text-center">
      <div className="flex flex-col items-center gap-3">
        <a
          href="https://ocenagor.si"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-indigo-500 transition-colors group"
        >
          <span>Powered by</span>
          <span className="font-medium hover:underline">ocenagor.si</span>
        </a>
      </div>
    </footer>
  );
};

export default React.memo(ReviewFooter);