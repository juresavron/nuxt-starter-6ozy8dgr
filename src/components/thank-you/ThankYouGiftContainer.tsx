import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ThankYouGiftContainerProps {
  colorScheme: string;
  company: any;
  translations: any;
}

const ThankYouGiftContainer: React.FC<ThankYouGiftContainerProps> = ({
  colorScheme,
  company,
  translations
}) => {
  // Skip rendering if no coupon type or it's set to 'none'
  if (!company?.coupon_type || company.coupon_type === 'none') {
    return null;
  }

  // Determine if this is a lottery or coupon
  const isLottery = company.coupon_type === 'lottery';
  
  // Choose appropriate icon and title based on coupon type
  const giftIcon = isLottery ? '🎲' : '🎁';
  const giftTitle = isLottery 
    ? (translations?.thankYou?.lotteryTitle || 'Sodelujete v žrebanju') 
    : (translations?.thankYou?.giftTitle || 'Vaše darilo');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
      whileHover={{ scale: 1.03 }}
      className={cn(
        "p-5 sm:p-6 rounded-xl border-2 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-all duration-300 relative z-10 backdrop-blur-sm overflow-hidden w-full bg-white",
        "border-gray-100",
        colorScheme === 'amber' ? "text-amber-700" :
        colorScheme === 'emerald' ? "text-emerald-700" :
        colorScheme === 'rose' ? "text-rose-700" :
        colorScheme === 'bw' ? "text-gray-700" :
        "text-indigo-700"
      )}
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full blur-2xl -z-10"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-indigo-100/20 to-blue-100/20 rounded-full blur-2xl -z-10"></div>
      
      <div className={cn(
        "w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 shadow-md transform hover:scale-110 transition-all duration-300 animate-pulse-subtle",
        colorScheme === 'amber' ? "bg-gradient-to-br from-amber-400 to-amber-500" :
        colorScheme === 'emerald' ? "bg-gradient-to-br from-emerald-400 to-emerald-500" :
        colorScheme === 'rose' ? "bg-gradient-to-br from-rose-400 to-rose-500" :
        colorScheme === 'bw' ? "bg-gradient-to-br from-gray-600 to-gray-700" :
        "bg-gradient-to-br from-indigo-400 to-indigo-500"
      )}>
        <span className="text-3xl text-white">{giftIcon}</span>
      </div>
      
      <div className="space-y-3 w-full">
        <motion.h3
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
          className="font-bold text-lg sm:text-xl mb-2 text-gray-800"
        >
          {giftTitle}
        </motion.h3>
        
        <div className={cn(
          "text-lg sm:text-2xl font-extrabold py-3 px-4 rounded-lg shadow-sm transform hover:scale-[1.02] transition-all duration-300 w-full bg-white",
          colorScheme === 'amber' ? "text-amber-800" :
          colorScheme === 'emerald' ? "text-emerald-800" :
          colorScheme === 'rose' ? "text-rose-800" :
          colorScheme === 'bw' ? "text-gray-800" :
          "text-indigo-800"
        )}>
          {isLottery 
            ? (translations?.thankYou?.lotteryInfo || "Žrebanje poteka enkrat mesečno. Zmagovalce obvestimo po e-pošti ali SMS-u.") 
            : (company?.gift_description || translations?.thankYou?.defaultGift || "10% popust")}
        </div>
      </div>
    </motion.div>
  );
};

export default ThankYouGiftContainer;