import React from 'react';
import { motion } from 'framer-motion';
import FAQItem from './FAQItem';

interface FAQListProps {
  items: Array<{
    question: string;
    answer: string;
  }>;
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
}

const FAQList: React.FC<FAQListProps> = ({ 
  items, 
  openIndex, 
  setOpenIndex 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  return (
    <motion.div 
      className="space-y-5"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {items.map((item, index) => (
        <FAQItem 
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={index === openIndex}
          onClick={() => setOpenIndex(index === openIndex ? null : index)}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default FAQList;