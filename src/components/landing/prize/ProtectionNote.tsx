import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import { cn } from '../../../utils/cn';

const ProtectionNote: React.FC = () => {
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
      transition={{ duration: 0.5, delay: 0.7 }}
      className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50/30 rounded-xl border border-yellow-100/80 shadow-md relative overflow-hidden"
      whileHover={{ 
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-yellow-100/30 rounded-full blur-2xl"></div>
      <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-amber-100/30 rounded-full blur-2xl"></div>
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-md">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-bold text-lg text-yellow-800">
            {titleText}
          </h4>
        </div>
        
        <p className="text-sm text-yellow-700 leading-relaxed pl-2 border-l-2 border-yellow-300">
          {noteText}
        </p>
      </div>
    </motion.div>
  );
}

export default ProtectionNote;