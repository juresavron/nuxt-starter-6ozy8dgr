import { useMemo } from 'react';
import { Gift, Settings, Star, CheckCircle2 } from 'lucide-react';
import { useTranslations } from '../../hooks/useTranslations';
import { useLanguageStore } from '../../hooks/useLanguageStore';
import type { LucideIcon } from 'lucide-react';

interface PrizeFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const usePrizeExplanation = () => {
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  // Get translations
  const t = translations?.prize;
  
  // Map icon strings to components
  const getIconComponent = (iconName: string): LucideIcon => {
    switch(iconName) {
      case 'Gift': return Gift;
      case 'Settings': return Settings;
      case 'Star': return Star;
      case 'CheckCircle2': return CheckCircle2;
      default: return Gift;
    }
  };
  
  // Process features with their icons
  const features = useMemo(() => {
    if (t?.features) {
      return t.features.map((feature: any) => ({
        icon: typeof feature.icon === 'string' ? getIconComponent(feature.icon) : feature.icon,
        title: feature.title,
        description: feature.description
      }));
    }
    
    // Fallback features if translations are missing
    return [
      {
        icon: Gift,
        title: language === 'en' ? 'Customizable Rewards' : 
               language === 'it' ? 'Premi Personalizzabili' : 
               'Prilagodljive nagrade',
        description: language === 'en' ? 'Set specific rewards for customers who complete reviews' : 
                     language === 'it' ? 'Imposta premi specifici per i clienti che completano le recensioni' : 
                     'Nastavite specifične nagrade za stranke, ki zaključijo ocene'
      },
      {
        icon: Settings,
        title: language === 'en' ? 'Easy Configuration' : 
               language === 'it' ? 'Configurazione Facile' : 
               'Enostavna konfiguracija',
        description: language === 'en' ? 'Configure rewards directly from your admin dashboard' : 
                     language === 'it' ? 'Configura i premi direttamente dalla tua dashboard di amministrazione' : 
                     'Konfigurirajte nagrade neposredno iz nadzorne plošče'
      },
      {
        icon: Star,
        title: language === 'en' ? 'Increase Engagement' : 
               language === 'it' ? 'Aumenta il Coinvolgimento' : 
               'Povečanje sodelovanja',
        description: language === 'en' ? 'Motivate more customers to leave feedback with incentives' : 
                     language === 'it' ? 'Motiva più clienti a lasciare feedback con incentivi' : 
                     'Z nagradami motivirajte več strank, da pustijo povratne informacije'
      },
      {
        icon: CheckCircle2,
        title: language === 'en' ? 'Higher Completion Rates' : 
               language === 'it' ? 'Tassi di Completamento Più Alti' : 
               'Višje stopnje zaključka',
        description: language === 'en' ? 'Increase review completion rates by offering rewards' : 
                     language === 'it' ? 'Aumenta i tassi di completamento delle recensioni offrendo premi' : 
                     'Povečajte stopnje zaključka ocen s ponudbo nagrad'
      }
    ];
  }, [t, language]);
  
  // Get section title with fallbacks
  const title = t?.title || (
    language === 'en' ? 'Reward Your Customers for Feedback' : 
    language === 'it' ? 'Premia i Tuoi Clienti per il Feedback' : 
    'Nagradite svoje stranke za povratne informacije'
  );
  
  // Get section subtitle with fallbacks
  const subtitle = t?.subtitle || (
    language === 'en' ? 'Customize the rewards offered to customers who complete reviews' : 
    language === 'it' ? 'Personalizza i premi offerti ai clienti che completano le recensioni' : 
    'Prilagodite nagrade, ki jih ponujate strankam, ki zaključijo ocene'
  );
  
  // Get badge text with fallbacks
  const badge = t?.badge || (
    language === 'en' ? 'Rewards System' : 
    language === 'it' ? 'Sistema di Premi' : 
    'Sistem nagrad'
  );
  
  // Get reward options
  const rewardOptions = t?.rewardOptions || {
    coupon: {
      title: language === 'en' ? 'Coupon for Every Review' : 
             language === 'it' ? 'Coupon per Ogni Recensione' : 
             'Kupon za vsako oceno',
      description: language === 'en' ? 'Offer an immediate reward for every customer who leaves feedback, regardless of rating.' :
                   language === 'it' ? 'Offri una ricompensa immediata per ogni cliente che lascia un feedback, indipendentemente dal voto.' :
                   'Ponudite takojšnjo nagrado vsaki stranki, ki pusti povratne informacije, ne glede na oceno.',
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
    lottery: {
      title: language === 'en' ? 'Lottery System' : 
             language === 'it' ? 'Sistema di Lotteria' : 
             'Sistem žrebanja',
      description: language === 'en' ? 'Create excitement with periodic prize drawings. All review participants enter a lottery with winners drawn on a schedule you set.' :
                   language === 'it' ? 'Crea entusiasmo con estrazioni periodiche di premi. Tutti i partecipanti alle recensioni partecipano a una lotteria con vincitori estratti secondo un programma da te impostato.' :
                   'Ustvarite vznemirjenje s periodičnimi žrebanji nagrad. Vsi sodelujoči v ocenjevanju sodelujejo v žrebanju z zmagovalci, izžrebanimi po razporedu, ki ga nastavite.',
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
  };
  
  // Get protection note
  const protection = t?.protection || {
    title: language === 'en' ? 'No External Rating Pressure' : 
           language === 'it' ? 'Nessuna Pressione di Valutazione Esterna' : 
           'Brez zunanjega pritiska na oceno',
    description: language === 'en' ? 'Our system collects internal ratings without forcing customers to leave public reviews. This ensures honest feedback while protecting your online reputation from potential negative public ratings.' : 
                 language === 'it' ? 'Il nostro sistema raccoglie valutazioni interne senza forzare i clienti a lasciare recensioni pubbliche. Questo assicura un feedback onesto proteggendo allo stesso tempo la tua reputazione online da potenziali valutazioni pubbliche negative.' : 
                 'Naš sistem zbira interne ocene, ne da bi stranke silil v javne ocene. Tako zagotavlja iskrene povratne informacije in hkrati ščiti vaš spletni ugled pred morebitnimi negativnimi javnimi ocenami.'
  };
  
  return {
    features,
    title,
    subtitle,
    badge,
    rewardOptions,
    protection
  };
};