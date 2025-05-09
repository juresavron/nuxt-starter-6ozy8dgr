import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import { cn } from '../../../utils/cn';
import { useWindowSize } from 'react-use';

interface ReviewPlatformsProps {
  className?: string;
}

const ReviewPlatforms: React.FC<ReviewPlatformsProps> = ({ className = '' }) => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Custom platform icon components for non-Lucide icons
  const GoogleReview = () => (
    <div className="flex items-center justify-center h-full w-full">
      <img 
        src="https://ggyupkyysczuzhvmijvt.supabase.co/storage/v1/object/public/landing-page//google_icon_130924.png" 
        alt="Google Reviews" 
        className={cn("h-10 w-10 sm:h-13 sm:w-13 object-contain", isMobile && "h-8 w-8")}
        loading="lazy"
        decoding="async"
      />
    </div>
  );

  const Yelp = () => (
    <div className="flex items-center justify-center h-full w-full">
      <img 
        src="https://ggyupkyysczuzhvmijvt.supabase.co/storage/v1/object/public/landing-page//yelp_icon_130776.png" 
        alt="Yelp" 
        className={cn("h-10 w-10 sm:h-13 sm:w-13 object-contain", isMobile && "h-8 w-8")}
        loading="lazy"
        decoding="async"
      />
    </div>
  );

  const TripAdvisor = () => (
    <div className="flex items-center justify-center h-full w-full">
      <img 
        src="https://ggyupkyysczuzhvmijvt.supabase.co/storage/v1/object/public/landing-page//tripadvisor.jpg" 
        alt="TripAdvisor" 
        className={cn("h-10 w-10 sm:h-13 sm:w-13 object-contain rounded-full", isMobile && "h-8 w-8")}
        loading="lazy"
        decoding="async"
      />
    </div>
  );

  const Trustpilot = () => (
    <div className="flex items-center justify-center h-full w-full">
      <img 
        src="https://ggyupkyysczuzhvmijvt.supabase.co/storage/v1/object/public/landing-page//img.icons8.com.png" 
        alt="Trustpilot" 
        className={cn("h-10 w-10 sm:h-13 sm:w-13 object-contain", isMobile && "h-8 w-8")}
        loading="lazy"
        decoding="async"
      />
    </div>
  );

  const FacebookReview = () => (
    <div className="flex items-center justify-center h-full w-full">
      <img 
        src="https://ggyupkyysczuzhvmijvt.supabase.co/storage/v1/object/public/landing-page//facebook_icon_130940.png" 
        alt="Facebook Reviews" 
        className={cn("h-10 w-10 sm:h-13 sm:w-13 object-contain", isMobile && "h-8 w-8")}
        loading="lazy"
        decoding="async"
      />
    </div>
  );

  const allPlatforms = [
    { name: 'Google Reviews', icon: GoogleReview, color: 'white' },
    { name: 'Yelp', icon: Yelp, color: 'from-red-500 to-red-600' },
    { name: 'TripAdvisor', icon: TripAdvisor, color: 'green' },
    { name: 'Trustpilot', icon: Trustpilot, color: 'white' },
    { name: 'Facebook Reviews', icon: FacebookReview, color: 'from-blue-600 to-blue-700' }
  ];

  // Translations
  const title = language === 'en' 
    ? 'Supported Review Platforms'
    : language === 'it'
      ? 'Piattaforme di recensioni supportate'
      : 'Podprte platforme za ocene';
      
  const customizeText = language === 'en'
    ? 'Customize which platforms you want customers to review'
    : language === 'it'
      ? 'Personalizza quali piattaforme vuoi che i clienti recensiscano'
      : 'Prilagodite platforme, na katerih želite, da stranke oddajo ocene';

  return (
    <div className={cn(
      "p-5 sm:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl border-2 border-blue-50/80 transition-all duration-500 transform hover:scale-[1.02]",
      className
    )}>
      <div className="flex flex-col items-center mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 rounded-full text-blue-700 text-xs sm:text-sm font-medium mb-2 sm:mb-3">
          <span className="text-lg">⭐</span>
          <span>Review Platforms</span>
        </div>
        <h4 className="text-lg sm:text-xl font-bold text-center text-gray-900">
          {title}
        </h4>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-6 justify-items-center"
      >
        {allPlatforms.map((platform, index) => {
          // Add a slight delay based on index for staggered animation
          const itemDelay = 0.1 + (index * 0.05);
          
          return (
          <motion.div
            key={platform.name}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.15, 
              y: -8,
              transition: { 
                type: "spring", 
                stiffness: 300, 
                damping: 10,
                delay: 0 
              }
            }}
            className="flex flex-col items-center"
          >
            <div className={cn(
              "w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br", 
              platform.color,
              "flex items-center justify-center shadow-lg mb-2 transform -rotate-6 hover:rotate-0 transition-transform duration-500"
            )}>
              {React.createElement(platform.icon)}
            </div>
            <span className="text-xs font-medium text-gray-700 text-center leading-tight">{platform.name}</span>
          </motion.div>
        )})}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-6 p-4 sm:p-5 bg-blue-50/50 rounded-lg border border-blue-100/50 text-center"
      >
        <p className="text-sm sm:text-base text-blue-700 font-semibold mb-1 sm:mb-2">{customizeText}</p>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {language === 'en' 
            ? 'Any review platform can be integrated into the system to meet your specific business needs.' 
            : language === 'it' 
              ? 'Qualsiasi piattaforma di recensioni può essere integrata nel sistema per soddisfare le esigenze specifiche della tua attività.'
              : 'V sistem se lahko doda katerokoli ocenjevalno platformo glede na specifične potrebe vašega podjetja.'}
        </p>
      </motion.div>
    </div>
  );
};

export default React.memo(ReviewPlatforms);