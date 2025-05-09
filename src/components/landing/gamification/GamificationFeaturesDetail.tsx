import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Share2, Gift } from 'lucide-react';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import { cn } from '../../../utils/cn';
import { useWindowSize } from 'react-use';
import IconWrapper from '../shared/IconWrapper';

interface FeatureDetailProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  index: number;
  isMobile?: boolean;
}

const FeatureDetail: React.FC<FeatureDetailProps> = ({
  icon: Icon,
  title,
  description,
  color,
  index,
  isMobile = false
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{
        y: -8,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-lg transition-all duration-500 transform hover:scale-[1.03] border-2 border-gray-100/80 h-full"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-3 sm:gap-5 relative z-10">
        <IconWrapper 
          icon={Icon}
          size={isMobile ? 'mobile-md' : 'lg'}
          gradient={color}
          rotate="left"
          className="flex-shrink-0"
        />
        
        <div className="flex-1">
          <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{title}</h4>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full bg-gradient-to-br from-transparent to-blue-50/30 -z-0"></div>
      <div className="absolute top-0 left-0 w-20 h-20 rounded-br-full bg-gradient-to-tl from-transparent to-blue-50/20 -z-0"></div>
    </motion.div>
  );
};

const GamificationFeaturesDetail: React.FC = () => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const t = translations?.landing?.gamification;
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  // Define features with their icons and descriptions
  const features = [
    {
      icon: Smartphone,
      title: t?.features[0]?.title || "Preprosta uporaba",
      description: t?.features[0]?.description || "Stranka po oddaji ocene na Googlu dobi dostop do sistema gejmifikacije, kjer lahko opravi dodatne naloge z enim dotikom. Sami lahko nastavite katera družbena omrežja želite vključiti.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Share2,
      title: t?.features[1]?.title || "Več sledilcev",
      description: t?.features[1]?.description || "Stranke lahko sledijo vašim družbenim omrežjem (Instagram, Facebook, TikTok, LinkedIn, TripAdvisor, Pinterest, YouTube) in tako povečate svojo bazo sledilcev. Izberete lahko platforme, ki so za vaše podjetje najpomembnejše.",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: Gift,
      title: t?.features[2]?.title || "Nagrade za stranke",
      description: t?.features[2]?.description || "Za vsako opravljeno nalogo stranka prejme nagrado, ki jo lahko izkoristi pri naslednjem obisku (popusti, brezplačne storitve). Sami določate, kakšne nagrade boste ponudili za vsako opravljeno dejanje.",
      color: "from-emerald-500 to-teal-600"
    }
  ];
  
  return (
    <div className="my-8 sm:my-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6 sm:mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium shadow-md mb-3 sm:mb-4 bg-blue-50 border border-blue-100">
          <span className="text-lg">🎮</span>
          <span className="text-blue-700">
            {language === 'en' 
              ? 'Business Benefits' 
              : language === 'it' 
                ? 'Vantaggi per il business'
                : 'Poslovne prednosti'}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-2 sm:mb-3">
          {language === 'en' 
            ? 'How Gamification Helps Your Business' 
            : language === 'it' 
              ? 'Come la gamification aiuta la tua attività'
              : 'Kako gejmifikacija pomaga vašemu podjetju?'}
        </h3>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-indigo-50/20 rounded-xl -z-10 transform -rotate-1"></div>
        
        {features.map((feature, index) => (
          <FeatureDetail
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            color={feature.color}
            index={index}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(GamificationFeaturesDetail);