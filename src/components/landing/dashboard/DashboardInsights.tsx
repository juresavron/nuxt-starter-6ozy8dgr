import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, Users, MessageSquare, LineChart, PieChart, BarChart } from 'lucide-react';
import { useLanguageStore } from '../../../hooks/useLanguageStore';
import { useTranslations } from '../../../hooks/useTranslations';
import { cn } from '../../../utils/cn';
import { useWindowSize } from 'react-use';
import IconWrapper from '../shared/IconWrapper';

const DashboardInsights: React.FC = () => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  const { width } = useWindowSize();
  const isMobile = width < 640;
  
  // Get translations with fallbacks
  const insightsTitle = translations?.landing?.dashboard?.title || 
    (language === 'en' ? 'Get a 360° View of Your Customer Experience' : 
     language === 'it' ? 'Ottieni una visione a 360° dell\'esperienza del cliente' : 
     'Pridobite 360° pogled na izkušnjo vaših strank');
    
  const insightsDescription = translations?.landing?.dashboard?.subtitle || 
    (language === 'en' ? 'Our dashboard transforms raw feedback into actionable business intelligence, giving you unprecedented visibility into customer sentiment and behavior.' :
     language === 'it' ? 'La nostra dashboard trasforma il feedback grezzo in business intelligence pratica, offrendoti una visibilità senza precedenti sul sentiment e sul comportamento dei clienti.' :
     'Naša nadzorna plošča pretvarja surove povratne informacije v uporabno poslovno inteligenco, kar vam daje neprimerljiv vpogled v razpoloženje in vedenje strank.');
  
  const dataDrivenDecisions = language === 'en' ? 'Data-Driven Decisions' : 
                             language === 'it' ? 'Decisioni basate sui dati' : 
                             'Odločitve na podlagi podatkov';
  
  const trackImprovement = language === 'en' ? 'Track Improvement' : 
                          language === 'it' ? 'Monitora i miglioramenti' : 
                          'Sledite izboljšavam';
  
  const customerSegmentation = language === 'en' ? 'Customer Segmentation' : 
                              language === 'it' ? 'Segmentazione dei clienti' : 
                              'Segmentacija strank';
  
  const visualizeData = language === 'en' 
    ? 'Visualize your data with beautiful, interactive charts and reports' 
    : language === 'it' 
    ? 'Visualizza i tuoi dati con grafici e report interattivi e bellissimi' 
    : 'Vizualizirajte svoje podatke z lepimi, interaktivnimi grafi in poročili';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-16"
    >
      <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100/80 transform hover:scale-[1.02]">
        <IconWrapper
          icon={BarChart}
          size={isMobile ? 'mobile-sm' : 'md'}
          gradient="from-blue-500 to-indigo-600"
          rotate="left"
          className="mb-4"
        />
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-3">
              {insightsTitle}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              {insightsDescription}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InsightCard 
              icon={BarChart2}
              title={dataDrivenDecisions}
              description={language === 'en' ? 'Make informed business decisions based on real customer feedback and sentiment analysis.' : language === 'it' ? 'Prendi decisioni aziendali informate basate su feedback reali dei clienti e analisi del sentiment.' : 'Sprejemajte informirane poslovne odločitve na podlagi resničnih povratnih informacij strank in analize razpoloženja.'}
              color="from-blue-500 to-indigo-600"
              index={0}
              isMobile={isMobile}
            />
            
            <InsightCard 
              icon={TrendingUp}
              title={trackImprovement}
              description={language === 'en' ? 'Monitor your progress over time with detailed analytics and trend visualization.' : language === 'it' ? 'Monitora i tuoi progressi nel tempo con analisi dettagliate e visualizzazione delle tendenze.' : 'Spremljajte svoj napredek skozi čas s podrobno analitiko in vizualizacijo trendov.'}
              color="from-emerald-500 to-teal-600"
              index={1}
              isMobile={isMobile}
            />
            
            <InsightCard 
              icon={Users}
              title={customerSegmentation}
              description={language === 'en' ? 'Understand different customer groups and their specific needs and preferences.' : language === 'it' ? 'Comprendi diversi gruppi di clienti e le loro esigenze e preferenze specifiche.' : 'Razumite različne skupine strank in njihove specifične potrebe in preference.'}
              color="from-amber-500 to-orange-600"
              index={2}
              isMobile={isMobile}
            />
          </div>
          
          <div className="mt-8 p-5 bg-blue-50/60 rounded-lg border border-blue-100/40 text-center">
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {[LineChart, PieChart, MessageSquare].map((Icon, i) => (
                <div 
                  key={i}
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center shadow-sm",
                    i === 0 ? "bg-blue-100 text-blue-600" :
                    i === 1 ? "bg-purple-100 text-purple-600" :
                    "bg-emerald-100 text-emerald-600"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
              ))}
            </div>
            <p className="text-sm text-blue-700 font-medium">
              {visualizeData}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface InsightCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  index: number;
  isMobile: boolean;
}

const InsightCard: React.FC<InsightCardProps> = ({
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
        delay: 0.3 + (index * 0.1),
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100/80 transform hover:scale-[1.02]"
    >
      <IconWrapper
        icon={Icon}
        size={isMobile ? 'mobile-sm' : 'md'}
        gradient={color}
        rotate="left"
        className="mb-4"
      />
      
      <h4 className="text-lg font-semibold text-gray-900 mb-3">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
};

export default DashboardInsights;