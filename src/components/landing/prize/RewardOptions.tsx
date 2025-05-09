import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Ticket } from 'lucide-react';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import RewardCard from './RewardCard';

const RewardOptions: React.FC = () => {
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
      icon: Gift,
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
      icon: Ticket,
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {rewardOptions.map((option, index) => (
        <RewardCard 
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
  );
};

export default RewardOptions;