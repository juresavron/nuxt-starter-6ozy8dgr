import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Award, Instagram, Facebook, ArrowRight, Gift } from 'lucide-react';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import { useTranslations } from '../../../hooks/useTranslations';
import { cn } from '../../../utils/cn';
import { useWindowSize } from 'react-use';

const GamificationExample: React.FC = () => {
  const { language } = useLanguageStore();
  const translations = useTranslations();
  const t = translations?.landing?.gamification;
  const { width } = useWindowSize();
  const isMobile = width < 640;

  // Get translated text with fallbacks
  const title = t?.exampleTitle || 
    (language === 'en' ? 'How Gamification Works in Practice' : 
     language === 'it' ? 'Come funziona la gamification in pratica' : 
     'Kako deluje gejmifikacija v praksi');

  const rewardText = t?.rewardText || 
    (language === 'en' ? 'Your Reward' : 
     language === 'it' ? 'Il tuo premio' : 
     'Vaša nagrada');

  const discountText = t?.discountText || 
    (language === 'en' ? '10% discount on your next visit' : 
     language === 'it' ? '10% di sconto sulla tua prossima visita' : 
     '10% popust pri naslednjem obisku');

  const claimText = t?.claimText || 
    (language === 'en' ? 'Claim Reward' : 
     language === 'it' ? 'Richiedi premio' : 
     'Prevzemi nagrado');

  const testAppButtonText = t?.testApplication || 
    (language === 'en' ? 'Test the Application' : 
     language === 'it' ? 'Prova l\'Applicazione' : 
     'Preizkusite aplikacijo');

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.5, 
          delay: 0.2,
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        className="bg-white p-5 sm:p-8 rounded-2xl shadow-xl border-2 border-blue-100/80 overflow-hidden relative mx-auto max-w-sm mb-6 sm:mb-8 hover:shadow-2xl transition-all duration-500"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50/50 rounded-full blur-3xl z-0"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-50/50 rounded-full blur-3xl z-0"></div>
        
        <h3 className="text-lg sm:text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-6 sm:mb-8 relative z-10">
          {title}
        </h3>

        <div className="relative bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-blue-100/40 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
          <div className="relative mx-auto w-full max-w-[240px] sm:max-w-[280px] aspect-[9/16] bg-gray-900 rounded-[2rem] border-[10px] border-gray-800 shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold">Gejmifikacija</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm">4.8/5</span>
                    <Star className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} fill-yellow-400 text-yellow-400`} />
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] sm:text-xs font-medium text-gray-700">Napredek</span>
                  <span className="text-[10px] sm:text-xs font-bold text-blue-600">2/3</span>
                </div>
                <div className="w-full h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "66%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>

              <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                {/* Google Task */}
                <div className="bg-white p-2 sm:p-3 rounded-lg border border-blue-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md`}>
                      <CheckCircle className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-white`} />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-gray-900">Google</div>
                      <div className="text-[10px] sm:text-xs text-gray-500">Opravljeno</div>
                    </div>
                  </div>
                  <CheckCircle className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-green-500`} />
                </div>

                {/* Instagram Task */}
                <div className="bg-white p-2 sm:p-3 rounded-lg border border-blue-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center shadow-md`}>
                      <Instagram className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-white`} />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-gray-900">Instagram</div>
                      <div className="text-[10px] sm:text-xs text-gray-500">Sledi nam</div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    Sledi
                  </motion.button>
                </div>

                {/* Facebook Task */}
                <div className="bg-white p-2 sm:p-3 rounded-lg border border-blue-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md`}>
                      <Facebook className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-white`} />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-gray-900">Facebook</div>
                      <div className="text-[10px] sm:text-xs text-gray-500">Sledi nam</div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    Sledi
                  </motion.button>
                </div>
              </div>

              {/* Reward Box */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <motion.div 
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 rounded-lg shadow-lg text-white"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 1, duration: 0.5, type: "spring" }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                    <Gift className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-white`} style={{ fill: 'rgba(255, 255, 255, 0.5)' }} />
                    <h4 className="text-sm sm:text-base font-bold">{rewardText}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-white/90 mb-2 sm:mb-3">{discountText}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-1.5 sm:py-2 bg-white text-blue-600 rounded-lg text-xs sm:text-sm font-medium"
                  >
                    {claimText}
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Test Application Button */}
      <motion.a 
        href="/review/856e9ce8-8382-4573-ae31-0c8b06d78ef3" 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.05, y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 mb-6 sm:mb-8 text-sm sm:text-base font-medium text-white rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <span>{testAppButtonText}</span>
        <ArrowRight className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} transition-transform duration-300 group-hover:translate-x-1`} />
      </motion.a>
    </div>
  );
};

export default React.memo(GamificationExample);