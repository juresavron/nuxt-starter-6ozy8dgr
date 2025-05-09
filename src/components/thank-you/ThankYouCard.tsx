import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Card from '../shared/Card';
import { cn } from '../../utils/cn';

interface ThankYouCardProps {
  colorScheme: string;
  isHighRating: boolean;
  rating: number;
  company: any;
  translations: any;
}

// Header component
const ThankYouHeader: React.FC<{
  isHighRating: boolean;
  colorScheme: string;
  translations: any;
}> = ({ isHighRating, colorScheme, translations }) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 leading-tight text-gray-800"
    >
      {isHighRating 
        ? translations?.thankYou?.highRating?.title || 'Hvala za vašo odlično oceno!' 
        : translations?.thankYou?.lowRating?.title || 'Hvala za vaše mnenje'}
    </motion.h1>
  );
};

// Rating stars component
const RatingStars: React.FC<{
  rating: number;
  colorScheme: string;
}> = ({ rating, colorScheme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="flex justify-center gap-2 sm:gap-3 mb-6"
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <motion.div
          key={value}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 + 0.1 * value, duration: 0.5, type: "spring", stiffness: 200, damping: 15 }}
          className="transform transition-all duration-300 hover:scale-110"
        >
          <Star
            className={cn(
              "h-8 w-8 sm:h-10 sm:w-10 transition-all duration-300",
              value <= rating 
                ? colorScheme === 'amber' ? "text-amber-400 fill-amber-400" :
                  colorScheme === 'emerald' ? "text-emerald-400 fill-emerald-400" :
                  colorScheme === 'rose' ? "text-rose-400 fill-rose-400" :
                  colorScheme === 'bw' ? "text-gray-700 fill-gray-700" :
                  "text-indigo-400 fill-indigo-400"
                : "text-gray-300"
            )}
            strokeWidth={1.5}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

// Message component
const ThankYouMessage: React.FC<{
  isHighRating: boolean;
  companyName: string;
  translations: any;
  colorScheme: string;
}> = ({ isHighRating, companyName, translations, colorScheme }) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="text-sm sm:text-base text-gray-600 max-w-xs mx-auto mb-16 sm:mb-24 leading-relaxed"
    >
      {isHighRating
        ? (translations?.thankYou?.highRating?.message || "Pri podjetju %s smo navdušeni nad vašo oceno! 🎉 Vaše mnenje nam veliko pomeni in nas motivira, da smo vsak dan še boljši. Hvala, da ste si vzeli čas in delili svojo izkušnjo z nami!").replace("%s", companyName)
        : (translations?.thankYou?.lowRating?.message || "Pri podjetju %s cenimo vaše iskreno mnenje. Vaše povratne informacije nam bodo pomagale izboljšati našo storitev. Obljubimo, da bomo storili vse, kar je v naši moči, da bo vaša naslednja izkušnja boljša.").replace("%s", companyName)
      }
    </motion.p>
  );
};

const ThankYouCard: React.FC<ThankYouCardProps> = ({
  colorScheme,
  isHighRating,
  rating,
  company,
  translations
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        colorScheme={colorScheme}
        gradient={false}
        className="text-center space-y-6 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border-2 rounded-2xl overflow-visible backdrop-blur-sm w-full"
      >
        <ThankYouHeader 
          isHighRating={isHighRating} 
          colorScheme={colorScheme} 
          translations={translations} 
        />
        <RatingStars 
          rating={rating} 
          colorScheme={colorScheme} 
        />
        <ThankYouMessage 
          isHighRating={isHighRating} 
          companyName={company?.name || ""} 
          translations={translations} 
          colorScheme={colorScheme} 
        />
      </Card>
    </motion.div>
  );
};

export default ThankYouCard;