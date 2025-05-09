import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import { useWindowSize } from 'react-use';
import { cn } from '../../../utils/cn';
import IconWrapper from '../shared/IconWrapper';
import type { LucideIcon } from 'lucide-react';

interface MotivationContentProps {
  translations: any;
}

interface MotivationCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  index: number;
  isMobile: boolean;
}

const MotivationContent: React.FC<MotivationContentProps> = ({ translations }) => {
  const { language } = useLanguageStore();
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  // Get translated text with fallbacks
  const motivationTitle = translations?.landing?.motivation?.motivationTitle || 
    (language === 'en' ? 'Customers Need Motivation to Leave Reviews' : 
     language === 'it' ? 'I Clienti Hanno Bisogno di Motivazione per Lasciare Recensioni' : 
     'Stranke potrebujejo motivacijo za oddajo ocen');
     
  const motivationText = translations?.landing?.motivation?.motivationText || 
    (language === 'en' ? 'Research shows that customers are rarely motivated to leave reviews without incentives. Most satisfied customers simply move on with their day, while dissatisfied customers are more likely to share negative experiences.' : 
     language === 'it' ? 'Le ricerche mostrano che i clienti sono raramente motivati a lasciare recensioni senza incentivi. La maggior parte dei clienti soddisfatti semplicemente prosegue con la propria giornata, mentre i clienti insoddisfatti sono più propensi a condividere esperienze negative.' : 
     'Raziskave kažejo, da stranke redko oddajo ocene brez spodbude. Večina zadovoljnih strank preprosto nadaljuje s svojim dnem, medtem ko nezadovoljne stranke pogosteje delijo negativne izkušnje.');
     
  const guidelinesTitle = translations?.landing?.motivation?.guidelinesTitle || 
    (language === 'en' ? 'Google\'s Review Guidelines' : 
     language === 'it' ? 'Linee Guida di Google per le Recensioni' : 
     'Googlove smernice za ocene');
     
  const guidelinesText = translations?.landing?.motivation?.guidelinesText || 
    (language === 'en' ? 'Google prohibits directly incentivizing reviews with rewards or discounts. Businesses cannot offer rewards specifically in exchange for Google reviews, as this violates their terms of service and can result in penalties.' : 
     language === 'it' ? 'Google vieta di incentivare direttamente le recensioni con premi o sconti. Le aziende non possono offrire ricompense specificamente in cambio di recensioni su Google, poiché ciò viola i loro termini di servizio e può comportare penalità.' : 
     'Google prepoveduje neposredno spodbujanje ocen z nagradami ali popusti. Podjetja ne smejo ponujati nagrad posebej v zameno za Google ocene, saj to krši njihove pogoje uporabe in lahko privede do kazni.');
     
  const solutionTitle = translations?.landing?.motivation?.solutionTitle || 
    (language === 'en' ? 'Our Compliant Solution' : 
     language === 'it' ? 'La Nostra Soluzione Conforme' : 
     'Naša skladna rešitev');
     
  const solutionText = translations?.landing?.motivation?.solutionText || 
    (language === 'en' ? 'Our system collects internal reviews first, then sends personalized follow-up messages encouraging Google reviews. This approach is fully compliant with Google\'s guidelines because rewards are given for internal feedback, not directly for Google reviews.' : 
     language === 'it' ? 'Il nostro sistema raccoglie prima recensioni interne, poi invia messaggi di follow-up personalizzati che incoraggiano le recensioni su Google. Questo approccio è pienamente conforme alle linee guida di Google perché le ricompense vengono date per feedback interno, non direttamente per le recensioni su Google.' : 
     'Naš sistem najprej zbira interne ocene, nato pošlje personalizirana sporočila, ki spodbujajo Google ocene. Ta pristop je popolnoma skladen z Googlovimi smernicami, saj so nagrade podeljene za interne povratne informacije, ne neposredno za Google ocene.');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <MotivationCard 
        icon={ThumbsUp}
        title={motivationTitle}
        description={motivationText}
        color="from-blue-500 to-indigo-600"
        index={0}
        isMobile={isMobile}
      />
      
      <MotivationCard 
        icon={AlertTriangle}
        title={guidelinesTitle}
        description={guidelinesText}
        color="from-amber-500 to-orange-600"
        index={1}
        isMobile={isMobile}
      />
      
      <MotivationCard 
        icon={CheckCircle2}
        title={solutionTitle}
        description={solutionText}
        color="from-emerald-500 to-teal-600"
        index={2}
        isMobile={isMobile}
      />
    </div>
  );
};

const MotivationCard: React.FC<MotivationCardProps> = ({
  icon: Icon,
  title,
  description,
  color,
  index,
  isMobile
}) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: 0.2 + index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.01] border border-blue-100/40 h-full ios-optimized"
    >
      <IconWrapper 
        icon={Icon}
        size={isMobile ? 'mobile-md' : 'lg'}
        gradient={color}
        rotate="left"
        className="mb-5"
      />

      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
};

export default MotivationContent;