import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, PlusCircle, MinusCircle } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ 
  question, 
  answer, 
  isOpen, 
  onClick, 
  index 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-white rounded-xl shadow-lg border border-gray-100/80 overflow-hidden transition-all duration-500 ${isOpen ? 'shadow-xl' : 'hover:shadow-xl'}`}
    >
      <button 
        onClick={onClick}
        className="flex justify-between items-center w-full p-5 sm:p-6 text-left transition-colors duration-300 group"
        aria-expanded={isOpen}
      >
        <h3 className={`font-bold text-sm sm:text-lg transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-gray-800 group-hover:text-blue-600'}`}>
          {question}
        </h3>
        <div className={`ml-4 flex-shrink-0 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? (
            <MinusCircle className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
          ) : (
            <PlusCircle className="h-4 w-4 sm:h-6 sm:w-6 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
          )}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-5 sm:p-6 pt-0 text-gray-600 bg-gradient-to-b from-white to-blue-50/30">
              <div className="border-t border-gray-100 pt-4">
                <p className="leading-relaxed text-xs sm:text-sm md:text-base">{answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQItem;