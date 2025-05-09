import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import { useWindowSize } from 'react-use';
import { cn } from '../../../utils/cn';

interface SocialPlatformsProps {
  className?: string;
}

const SocialPlatforms: React.FC<SocialPlatformsProps> = ({ className = '' }) => {
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

  // Custom image-based icons
  const Instagram = () => (
    <div className="flex items-center justify-center h-full w-full">
      <img 
        src="https://ggyupkyysczuzhvmijvt.supabase.co/storage/v1/object/public/landing-page//Instagram_icon.png" 
        alt="Instagram" 
        className={cn("h-10 w-10 sm:h-13 sm:w-13 object-contain", isMobile && "h-8 w-8")}
        loading="lazy"
        decoding="async"
      />
    </div>
  );

  const TikTok = () => (
    <div className="flex items-center justify-center h-full w-full">
      <img 
        src="https://ggyupkyysczuzhvmijvt.supabase.co/storage/v1/object/public/landing-page//0ead22ff1f236ac6f9187c98b47473d6.svg" 
        alt="TikTok" 
        className={cn("h-10 w-10 sm:h-13 sm:w-13 object-contain", isMobile && "h-8 w-8")}
        loading="lazy"
        decoding="async"
      />
    </div>
  );

  // More social media icons
  const Facebook = () => (
    <div className="flex items-center justify-center h-full w-full">
      <img 
        src="https://ggyupkyysczuzhvmijvt.supabase.co/storage/v1/object/public/landing-page//facebook_icon_130940.png" 
        alt="Facebook" 
        className={cn("h-10 w-10 sm:h-13 sm:w-13 object-contain", isMobile && "h-8 w-8")}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
  
  const Twitter = () => (
    <div className="flex items-center justify-center h-full w-full">
      <img 
        src="https://ggyupkyysczuzhvmijvt.supabase.co/storage/v1/object/public/landing-page//x-social-media-logo-icon.png" 
        alt="X (Twitter)" 
        className={cn("h-10 w-10 sm:h-13 sm:w-13 object-contain", isMobile && "h-8 w-8")}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
  
  const Linkedin = () => (
    <div className="flex items-center justify-center h-full w-full">
      <img 
        src="https://ggyupkyysczuzhvmijvt.supabase.co/storage/v1/object/public/landing-page//iconfinder-social-media-applications-14linkedin-4102586_113786.png" 
        alt="LinkedIn" 
        className={cn("h-10 w-10 sm:h-13 sm:w-13 object-contain", isMobile && "h-8 w-8")}
        loading="lazy"
        decoding="async"
      />
    </div>
  );

  const platforms = [
    { name: 'Instagram', Icon: Instagram, color: 'white' },
    { name: 'Facebook', Icon: Facebook, color: 'from-blue-600 to-blue-700' },
    { name: 'TikTok', Icon: TikTok, color: 'from-gray-800 to-black' },
    { name: 'Twitter', Icon: Twitter, color: 'white' },
    { name: 'LinkedIn', Icon: Linkedin, color: 'from-blue-700 to-blue-800' },
    { 
      name: language === 'en' ? 'Custom' : language === 'it' ? 'Personalizzato' : 'Po meri', 
      Icon: () => <Globe className={isMobile ? "h-5 w-5" : "h-6 w-6"} />, 
      color: 'from-violet-500 via-fuchsia-500 to-pink-500' 
    }
  ];

  // Translations
  const title = language === 'en' 
    ? 'Supported Social Media Platforms'
    : language === 'it'
      ? 'Piattaforme social supportate'
      : 'Podprte platforme družbenih omrežij';
      
  const customizeText = language === 'en'
    ? 'Customize which platforms you want customers to interact with'
    : language === 'it'
      ? 'Personalizza quali piattaforme vuoi che i clienti utilizzino'
      : 'Prilagodite platforme, s katerimi želite, da stranke interagirajo';

  return (
    <div className={cn(
      "p-5 sm:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl border-2 border-blue-50/80 transition-all duration-500 transform hover:scale-[1.02]",
      className
    )}>
      <div className="flex flex-col items-center mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 rounded-full text-blue-700 text-xs sm:text-sm font-medium mb-2 sm:mb-3">
          <span className="text-lg">🔗</span>
          <span>Social Media</span>
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
        className="grid grid-cols-3 sm:grid-cols-6 gap-6 justify-items-center"
      >
        {platforms.map((platform, index) => {
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
            transition={{
              delay: itemDelay,
              duration: 0.4
            }}
            className="flex flex-col items-center"
          >
            <div className={cn(
              `w-10 h-10 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center shadow-lg mb-2 sm:mb-3 transform -rotate-6 hover:rotate-0 transition-all duration-500`
            )}>
              {typeof platform.Icon === 'function' ? (
                <platform.Icon />
              ) : (
                platform.Icon
              )}
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">{platform.name}</span>
          </motion.div>
        )})}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-6 sm:mt-8 p-4 sm:p-5 bg-blue-50/50 rounded-lg border border-blue-100/50 text-center transform hover:scale-[1.02] transition-all duration-300"
      >
        <p className="text-sm sm:text-base text-blue-700 font-semibold mb-1 sm:mb-2">{customizeText}</p>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {language === 'en' 
            ? 'Any social media platform can be integrated into the system to meet your specific business needs.' 
            : language === 'it' 
              ? 'Qualsiasi piattaforma social può essere aggiunta al sistema per soddisfare le esigenze specifiche della tua attività.'
              : 'V sistem se lahko doda katerokoli družbeno omrežje glede na specifične potrebe vašega podjetja.'}
        </p>
      </motion.div>
    </div>
  );
};

export default React.memo(SocialPlatforms);