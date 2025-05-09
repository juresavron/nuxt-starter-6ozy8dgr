import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Share2, Gift } from 'lucide-react';
import { useTranslations } from '../../../hooks/useTranslations';
import { useLanguageStore } from '../../../hooks/useLanguageStore';

/**
 * Content component for the Gamification section with feature explanations
 */
const GamificationContent: React.FC = () => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const t = translations?.landing?.gamification;

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-gray-600 leading-relaxed mb-8">
        {language === 'en' 
          ? 'Gamification is the process of adding game elements to non-gaming contexts, such as review collection. With our system, after submitting a review, customers get the opportunity to complete additional tasks and receive rewards, which increases their engagement and brings you additional benefits. You can configure exactly which platforms you want customers to follow.'
          : language === 'it'
            ? 'La gamification è il processo di aggiungere elementi di gioco a contesti non di gioco, come la raccolta di recensioni. Con il nostro sistema, dopo aver inviato una recensione, i clienti hanno l\'opportunità di completare attività aggiuntive e ricevere premi, aumentando il loro coinvolgimento e portando vantaggi aggiuntivi. Puoi configurare esattamente quali piattaforme desideri che i clienti seguano.'
            : 'Gejmifikacija je proces dodajanja elementov igre v neigralniške kontekste, kot je zbiranje ocen. Z našim sistemom stranke po oddaji ocene dobijo priložnost, da opravijo dodatne naloge in prejmejo nagrade, kar povečuje njihovo vključenost in vam prinaša dodatne koristi. Sami lahko nastavite točno katera družbena omrežja želite, da vam stranke sledijo.'}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureItem
          icon={Smartphone}
          title={t?.features[0]?.title || 'Easy to Use'}
          description={t?.features[0]?.description || 'After submitting a review on Google, the customer gets access to the gamification system where they can complete additional tasks with one touch.'}
          color="from-blue-500 to-indigo-600"
        />
        
        <FeatureItem
          icon={Share2}
          title={t?.features[1]?.title || 'More Followers'}
          description={t?.features[1]?.description || 'Customers can follow your social media and thus increase your follower base.'}
          color="from-amber-500 to-orange-600"
        />
        
        <FeatureItem
          icon={Gift}
          title={t?.features[2]?.title || 'Rewards for Customers'}
          description={t?.features[2]?.description || 'For each completed task, the customer receives a reward that they can redeem at their next visit.'}
          color="from-emerald-500 to-teal-600"
        />
      </div>
    </motion.div>
  );
};

// Feature item component for improved organization and reusability
const FeatureItem: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}> = ({ icon: Icon, title, description, color }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100/80 transform hover:scale-[1.02]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-md transform -rotate-6 hover:rotate-0 transition-transform duration-300 mb-4 ios-optimized`}>
        <Icon className="h-7 w-7 text-white" />
      </div>
      <h4 className="text-lg font-semibold text-gray-900 mb-3">{title}</h4>
      <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
    </motion.div>
  );
};

export default React.memo(GamificationContent);