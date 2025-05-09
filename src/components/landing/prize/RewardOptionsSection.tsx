import React from 'react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import RewardOption from './RewardOption';
import ProtectionNote from './ProtectionNote';
import { cn } from '../../../utils/cn';

const RewardOptionsSection: React.FC = () => {
  const { language } = useLanguageStore();
  
  // Define reward options data
  const rewardOptions = [
    {
      title: language === 'en' ? 'Coupon for Every Review' : 
             language === 'it' ? 'Coupon per Ogni Recensione' : 
             'Kupon za vsako oceno',
      description: language === 'en' ? 'Offer an immediate reward for every customer who leaves feedback, regardless of rating. Great for maximizing participation and customer goodwill.' :
                   language === 'it' ? 'Offri una ricompensa immediata per ogni cliente che lascia un feedback, indipendentemente dal voto. Ottimo per massimizzare la partecipazione e la benevolenza del cliente.' :
                   'Ponudite takojšnjo nagrado vsaki stranki, ki pusti povratne informacije, ne glede na oceno. Odlično za povečanje sodelovanja in dobre volje strank.',
      icon: '🎁',
      gradient: 'from-blue-500 to-indigo-600',
      features: [
        language === 'en' ? 'Immediate gratification for customers' : 
        language === 'it' ? 'Gratificazione immediata per i clienti' : 
        'Takojšnje zadovoljstvo za stranke',
        
        language === 'en' ? 'Customizable discount amount and type' : 
        language === 'it' ? 'Importo e tipo di sconto personalizzabili' : 
        'Prilagodljiva višina in vrsta popusta',
        
        language === 'en' ? 'Encourages customer return visits' : 
        language === 'it' ? 'Incoraggia i clienti a tornare' : 
        'Spodbuja ponovne obiske strank'
      ]
    },
    {
      title: language === 'en' ? 'Lottery System' : 
             language === 'it' ? 'Sistema di Lotteria' : 
             'Sistem žrebanja',
      description: language === 'en' ? 'Create excitement with periodic prize drawings. All review participants enter a lottery with winners drawn on a schedule you set. Perfect for higher-value rewards.' :
                   language === 'it' ? 'Crea entusiasmo con estrazioni periodiche di premi. Tutti i partecipanti alle recensioni partecipano a una lotteria con vincitori estratti secondo un programma da te impostato. Perfetto per premi di valore più alto.' :
                   'Ustvarite vznemirjenje s periodičnimi žrebanji nagrad. Vsi sodelujoči v ocenjevanju sodelujejo v žrebanju z zmagovalci, izžrebanimi po razporedu, ki ga nastavite. Popolno za nagrade višje vrednosti.',
      icon: '🎲',
      gradient: 'from-purple-500 to-indigo-600',
      features: [
        language === 'en' ? 'Configurable drawing frequency (daily, weekly, monthly)' : 
        language === 'it' ? 'Frequenza di estrazione configurabile (giornaliera, settimanale, mensile)' : 
        'Nastavljiva pogostost žrebanja (dnevno, tedensko, mesečno)',
        
        language === 'en' ? 'Great for higher-value rewards and promotions' : 
        language === 'it' ? 'Ideale per premi e promozioni di valore più elevato' : 
        'Odlično za nagrade in promocije višje vrednosti',
        
        language === 'en' ? 'Automatic winner selection and notification' : 
        language === 'it' ? 'Selezione e notifica automatica dei vincitori' : 
        'Avtomatska izbira in obveščanje zmagovalcev'
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className={cn(
        "bg-gradient-to-br from-white to-blue-50/30 p-8 sm:p-10 rounded-2xl shadow-xl",
        "border border-blue-100/40 mb-12 relative overflow-hidden"
      )}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600"></div>
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl"></div>
      <div className="absolute -left-16 -bottom-16 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl"></div>
      
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl sm:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-8"
      >
        {language === 'en' ? 'Flexible Reward Options' : 
         language === 'it' ? 'Opzioni di Ricompensa Flessibili' : 
         'Prilagodljive možnosti nagrad'}
      </motion.h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {rewardOptions.map((option, index) => (
          <RewardOption 
            key={index}
            title={option.title}
            description={option.description}
            features={option.features}
            icon={option.icon}
            gradient={option.gradient}
            index={index}
          />
        ))}
      </div>
      
      <ProtectionNote />
    </motion.div>
  );
};

export default RewardOptionsSection;