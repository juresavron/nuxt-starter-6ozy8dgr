import * as React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Users, TrendingUp, Award } from 'lucide-react';
import { useWindowSize } from 'react-use';

interface HeroStat {
  icon: string;
  value: string;
  text: string;
  gradient: string;
}

interface HeroStatsProps {
  stats: HeroStat[];
}

const HeroStats: React.FC<HeroStatsProps> = ({ stats }) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  
  // Don't render on mobile or tablet devices
  if (isMobile) {
    return null;
  }
  
  // Only render on desktop (1024px and above)
  const isDesktop = width >= 1024;
  
  // Don't render on tablet-sized screens
  if (!isDesktop) {
    return null;
  }
  
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8"
    >
      {stats.map((stat, index) => {
        // Get the icon component based on name
        let IconComponent;
        switch (stat.icon) {
          case 'Star': IconComponent = Star; break;
          case 'Shield': IconComponent = Shield; break;
          case 'Users': IconComponent = Users; break;
          case 'TrendingUp': IconComponent = TrendingUp; break;
          case 'Award': IconComponent = Award; break;
          default: IconComponent = Star;
        }
        
        // Determine gradient colors based on index
        const gradientClass = index === 0 ? 'from-amber-500 to-orange-600' : 
                             index === 1 ? 'from-blue-500 to-blue-700' : 
                             index === 2 ? 'from-green-500 to-emerald-600' : 
                             'from-purple-500 to-indigo-600';
        
        return (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-white/40 backdrop-blur-sm border border-white/40 rounded-xl p-5 transform transition-all duration-300 hover:shadow-blue-500/40 group flex items-center gap-4 shadow-lg"
          >
            <div className={`w-14 h-14 flex items-center justify-center rounded-lg bg-gradient-to-br ${gradientClass} transform -rotate-6 group-hover:rotate-0 transition-transform duration-300 shadow-md`}>
              <IconComponent className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-white drop-shadow-sm">{stat.value}</div>
              <div className="text-xs text-white/90">{stat.text}</div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default React.memo(HeroStats);