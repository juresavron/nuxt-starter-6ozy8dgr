import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Star, Share2 } from 'lucide-react';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import { useTranslations } from '../../../hooks/useTranslations';
import CountUp from 'react-countup';
import { cn } from '../../../utils/cn';
import { useWindowSize } from 'react-use';
import IconWrapper from '../shared/IconWrapper';

/**
 * Statistics component for the Gamification section
 * Shows key metrics with animations for increased engagement
 */
const GamificationStatistics: React.FC = () => {
  const { language } = useLanguageStore();
  const translations = useTranslations();
  const { width } = useWindowSize();
  const isMobile = width < 640;

  // Get translations for stat labels
  const getStatLabel = (index: number) => {
    const labels = [
      {
        en: 'More Google reviews in the first month',
        it: 'Più recensioni Google nel primo mese',
        sl: 'Več Google ocen v prvem mesecu',
      },
      {
        en: 'More followers on social media',
        it: 'Più follower sui social media',
        sl: 'Več sledilcev na družbenih omrežjih',
      },
      {
        en: 'Gamification completion rate',
        it: 'Tasso di completamento della gamification',
        sl: 'Stopnja dokončanja gejmifikacije',
      },
    ];

    const label = labels[index];
    return language === 'en' ? label.en : language === 'it' ? label.it : label.sl;
  };

  return (
    <div className="mb-10 sm:mb-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 ios-optimized">
      <StatCard
        value="127"
        suffix="%"
        label={getStatLabel(0)}
        icon={Star}
        color="blue"
        delay={0.1}
        isMobile={isMobile}
      />

      <StatCard
        value="35"
        suffix="%"
        label={getStatLabel(1)}
        icon={Share2}
        color="indigo"
        delay={0.2}
        isMobile={isMobile}
      />

      <StatCard
        value="98"
        suffix="%"
        label={getStatLabel(2)}
        icon={TrendingUp}
        color="green"
        delay={0.3}
        isMobile={isMobile}
      />
    </div>
  );
};

// Animated stat card component
interface StatCardProps {
  value: string;
  label: string;
  suffix?: string;
  delay?: number;
  color?: 'blue' | 'indigo' | 'green' | 'amber';
  icon: React.ElementType;
  isMobile?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  suffix = '',
  delay = 0,
  color = 'blue',
  icon: Icon,
  isMobile = false,
}) => {
  // Define color classes based on the color prop
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    indigo: "from-indigo-500 to-indigo-600",
    green: "from-emerald-500 to-emerald-600",
    amber: "from-amber-500 to-amber-600"
  };

  const textColors = {
    blue: "text-blue-600",
    indigo: "text-indigo-600",
    green: "text-emerald-600",
    amber: "text-amber-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -8, 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      className="bg-white p-4 sm:p-6 rounded-xl shadow-lg transition-all duration-500 transform hover:scale-[1.03] border-2 border-blue-100/40 ios-optimized"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <IconWrapper 
          icon={Icon}
          size={isMobile ? 'mobile-md' : 'lg'}
          gradient={colorClasses[color]}
          rotate="left"
          className="flex-shrink-0"
        />

        <div>
          <div className="flex items-baseline">
            <CountUp 
              end={parseInt(value)} 
              duration={2.5} 
              separator="," 
              suffix={suffix} 
              delay={0.5} 
              className={cn(
                "text-lg sm:text-2xl md:text-3xl font-bold",
                textColors[color]
              )}
            />
          </div>
          <div className="text-[10px] sm:text-xs md:text-sm text-gray-600 mt-1 leading-tight">{label}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(GamificationStatistics);