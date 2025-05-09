import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useLanguageStore } from '../../../hooks/useLanguageStore';

const ProtectionCard: React.FC = () => {
  const { language } = useLanguageStore();
  
  const noteText = language === 'en' 
    ? 'Our system collects internal ratings without forcing customers to leave public reviews. This ensures honest feedback while protecting your online reputation from potential negative public ratings.' 
    : language === 'it' 
    ? 'Il nostro sistema raccoglie valutazioni interne senza forzare i clienti a lasciare recensioni pubbliche. Questo assicura un feedback onesto proteggendo allo stesso tempo la tua reputazione online da potenziali valutazioni pubbliche negative.' 
    : 'Naš sistem zbira interne ocene, ne da bi stranke silil v javne ocene. Tako zagotavlja iskrene povratne informacije in hkrati ščiti vaš spletni ugled pred morebitnimi negativnimi javnimi ocenami.';

  const titleText = language === 'en' 
    ? 'No External Rating Pressure' 
    : language === 'it' 
    ? 'Nessuna Pressione di Valutazione Esterna' 
    : 'Brez zunanjega pritiska na oceno';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl border-l-4 border-yellow-400 shadow-md relative overflow-hidden"
      whileHover={{ 
        boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05)'
      }}
    >
      {/* Decorative elements */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-yellow-100/30 rounded-full blur-2xl"></div>
      <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-amber-100/30 rounded-full blur-2xl"></div>
      
      <div className="flex items-start gap-4 relative z-10">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-md mt-1">
          <Shield className="h-6 w-6 text-white" />
        </div>
        
        <div className="flex-1">
          <h4 className="font-bold text-lg text-yellow-800 mb-2">
            {titleText}
          </h4>
          
          <p className="text-sm text-yellow-700 leading-relaxed">
            {noteText}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProtectionCard;