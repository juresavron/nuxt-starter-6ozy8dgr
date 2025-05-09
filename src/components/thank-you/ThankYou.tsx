import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThankYouShareButton from './ThankYouShareButton';
import ThankYouConfetti from './ThankYouConfetti';
import ThankYouLoading from './ThankYouLoading';
import ThankYouContainer from './ThankYouContainer';
import GiftNoteMessage from './GiftNoteMessage';
import ThankYouCard from './ThankYouCard';
import ThankYouGiftContainer from './ThankYouGiftContainer';
import { useTranslations } from '../../hooks/useTranslations';
import { useCompanyData } from '../../hooks/useCompanyData';

const ThankYou: React.FC = () => {
  const [searchParams] = useSearchParams();
  const translations = useTranslations();
  
  // Get parameters from URL
  const companyId = searchParams.get('companyId');
  const rating = parseInt(searchParams.get('rating') || '0', 10);
  
  // Fetch company data if companyId is provided
  const { company, loading } = useCompanyData(companyId || undefined);
  
  // State for confetti animation
  const [showConfetti, setShowConfetti] = useState(true);
  
  // Determine if this is a high rating (4-5) or low rating (1-3)
  const isHighRating = rating >= 4;
  
  // Get color scheme from company data
  const colorScheme = company?.color_scheme || 'indigo';
  
  // Hide confetti after 5 seconds
  useEffect(() => {
    if (showConfetti) {
      // Immediately set confetti to false to disable it
      setShowConfetti(false);
    }
  }, [showConfetti]);

  // Show loading spinner while fetching company data
  if (loading) {
    return <ThankYouLoading colorScheme={colorScheme} />;
  }

  return (
    <ThankYouContainer>
      {/* Confetti effect disabled */}
      <ThankYouConfetti 
        isHighRating={isHighRating} 
        showConfetti={showConfetti} 
        colorScheme={colorScheme}
      />

      {/* Main thank you card with rating */}
      <ThankYouCard
        colorScheme={colorScheme}
        isHighRating={isHighRating}
        rating={rating}
        company={company}
        translations={translations}
      />
      
      {/* Gift information card - only show for coupon or lottery types */}
      {company?.coupon_type !== 'none' && (
        <ThankYouGiftContainer
          colorScheme={colorScheme}
          company={company}
          translations={translations}
        />
      )}
      
      {/* Gift description message - separate from gift card */}
      {company?.coupon_type !== 'none' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="mt-4 w-full max-w-md mx-auto"
        >
          <GiftNoteMessage 
            message={company?.coupon_type === 'lottery' 
              ? (translations?.thankYou?.lotteryNote || 'Sodelujete v žrebanju za nagrado. Obvestilo o morebitnem dobitku boste prejeli na vaš e-poštni naslov ali telefonsko številko.') 
              : (translations?.thankYou?.giftNote || 'Darilo boste prejeli na vaš e-poštni naslov ali telefonsko številko.')} 
            colorScheme={colorScheme}
          />
        </motion.div>
      )}
      
      {/* Share button (only for high ratings) */}
      {isHighRating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-12 sm:mt-16 w-full max-w-md mx-auto"
        >
          <ThankYouShareButton 
            colorScheme={colorScheme} 
            translations={translations}
          />
        </motion.div>
      )}
    </ThankYouContainer>
  );
};

export default ThankYou;