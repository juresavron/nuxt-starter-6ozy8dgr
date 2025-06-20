import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Award } from 'lucide-react';

/**
 * Image component for the Gamification section
 */
const GamificationImage: React.FC = () => {
  return (
    <div className="relative">
      <div className="relative bg-white p-6 rounded-xl shadow-xl border border-blue-100 overflow-hidden">
        {/* Phone mockup */}
        <div className="relative mx-auto w-full max-w-[320px] aspect-[9/16] bg-gray-900 rounded-[2rem] border-[14px] border-gray-800 shadow-lg overflow-hidden">
          {/* Screen content */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Gejmifikacija</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm">4.8/5</span>
                  <Star className="h-4 w-4 fill-yellow-400" />
                </div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-700">Napredek</span>
                <span className="text-xs font-bold text-blue-600">2/3</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "66%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
            
            {/* Tasks */}
            <div className="p-4 space-y-3">
              <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" style={{ fill: 'rgba(255, 255, 255, 0.5)' }} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Google ocena</div>
                    <div className="text-xs text-gray-500">Opravljeno</div>
                  </div>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500" style={{ fill: 'rgba(220, 252, 231, 0.5)' }} />
              </div>
              
              <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="currentColor"/>
                      </svg>
                    </motion.div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Instagram</div>
                    <div className="text-xs text-gray-500">Sledi nam</div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                >
                  Sledi
                </motion.button>
              </div>
              
              <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor"/>
                      </svg>
                    </motion.div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Facebook</div>
                    <div className="text-xs text-gray-500">Sledi nam</div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                >
                  Sledi
                </motion.button>
              </div>
            </div>
            
            {/* Reward */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <motion.div 
                className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-lg shadow-lg text-white"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Award className="h-6 w-6 text-white" style={{ fill: 'rgba(255, 255, 255, 0.5)' }} />
                  <h4 className="text-base font-bold">Vaša nagrada</h4>
                </div>
                <p className="text-sm text-white/90 mb-3">10% popust pri naslednjem obisku</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-white text-blue-600 rounded-lg text-sm font-medium"
                >
                  Prevzemi nagrado
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center shadow-md"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
        </motion.div>
        
        <motion.div 
          className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shadow-md"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Award className="h-6 w-6 text-green-500 fill-green-100" />
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(GamificationImage);