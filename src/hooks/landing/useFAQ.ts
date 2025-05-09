import { useState, useMemo } from 'react';
import { useClientSide } from '../useClientSide';
import { useTranslations } from '../useTranslations';
import { useLanguageStore } from '../useLanguageStore';

/**
 * Hook for FAQ section
 * @returns FAQ section state and data
 */
export const useFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const translations = useTranslations();
  const isClient = useClientSide();
  const { language } = useLanguageStore();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Custom FAQ items with more relevant questions and answers
  const faqItems = useMemo(() => {
    // Try to get FAQ items from translations
    if (translations?.landing?.faq?.items) {
      return translations.landing.faq.items;
    }
    
    // Fallback to custom items if translations are not available
    return [
      {
        question: language === 'en' ? 'How does the system handle different ratings?' : 
                  language === 'it' ? 'Come gestisce il sistema le diverse valutazioni?' : 
                  'Kako sistem obravnava različne ocene?',
        answer: language === 'en' ? 'Our system intelligently directs customers based on their satisfaction level. For 5-star ratings, customers are immediately offered gamification tasks where they can follow your social media and receive rewards. For 4-star ratings, we collect specific feedback about areas for improvement while still directing them to gamification. For 1-3 star ratings, we collect detailed internal feedback, allowing you to address issues privately before they become public negative reviews. This approach protects your online reputation while gathering valuable insights.' :
                language === 'it' ? 'Il nostro sistema indirizza intelligentemente i clienti in base al loro livello di soddisfazione. Per le valutazioni a 5 stelle, ai clienti vengono immediatamente offerte attività di gamification dove possono seguire i tuoi social media e ricevere premi. Per le valutazioni a 4 stelle, raccogliamo feedback specifici sulle aree di miglioramento mentre li indirizziamo comunque alla gamification. Per le valutazioni da 1 a 3 stelle, raccogliamo feedback interni dettagliati, permettendoti di affrontare i problemi privatamente prima che diventino recensioni negative pubbliche. Questo approccio protegge la tua reputazione online raccogliendo al contempo preziosi spunti.' :
                'Naš sistem pametno usmerja stranke glede na njihovo stopnjo zadovoljstva. Pri 5-zvezdičnih ocenah strankam takoj ponudimo naloge gejmifikacije, kjer lahko sledijo vašim družbenim omrežjem in prejmejo nagrade. Pri 4-zvezdičnih ocenah zbiramo specifične povratne informacije o področjih za izboljšave, medtem ko jih še vedno usmerjamo na gejmifikacijo. Pri ocenah 1-3 zbiramo podrobne interne povratne informacije, kar vam omogoča, da težave rešite zasebno, preden postanejo javne negativne ocene. Ta pristop ščiti vaš spletni ugled, hkrati pa zbira dragocene vpoglede.'
      },
      {
        question: language === 'en' ? 'Can customers tell they are not on Google directly?' :
                  language === 'it' ? 'I clienti possono capire che non sono direttamente su Google?' : 
                  'Ali stranke vedo, da niso neposredno na Googlu?',
        answer: language === 'en' ? 'Yes, our system is completely transparent. Customers can see they are on the ocenagor.si platform, which intelligently directs them to Google based on their rating. This transparency maintains trust while optimizing your review profile.' :
                language === 'it' ? 'Sì, il nostro sistema è completamente trasparente. I clienti possono vedere che si trovano sulla piattaforma ocenagor.si, che li indirizza intelligentemente a Google in base alla loro valutazione. Questa trasparenza mantiene la fiducia ottimizzando al contempo il tuo profilo di recensioni.' :
                'Da, naš sistem je popolnoma transparenten. Stranke lahko vidijo, da so na platformi ocenagor.si, ki jih pametno usmerja na Google glede na njihovo oceno. Ta transparentnost ohranja zaupanje, hkrati pa optimizira vaš profil ocen.'
      },
      {
        question: language === 'en' ? 'Can I try the system before purchasing?' :
                  language === 'it' ? 'Posso provare il sistema prima dell\'acquisto?' : 
                  'Ali lahko preizkusim sistem pred nakupom?',
        answer: language === 'en' ? 'Absolutely! We offer a free demo version where you can test the entire review process and all features before making a decision.' :
                language === 'it' ? 'Assolutamente! Offriamo una versione demo gratuita dove puoi testare l\'intero processo di recensione e tutte le funzionalità prima di prendere una decisione.' :
                'Absolutno! Ponujamo brezplačno demo verzijo, kjer lahko preizkusite celoten proces ocenjevanja in vse funkcije, preden se odločite.'
      },
      {
        question: language === 'en' ? 'How quickly can I start using the system?' :
                  language === 'it' ? 'Quanto velocemente posso iniziare a usare il sistema?' : 
                  'Kako hitro lahko začnem uporabljati sistem?',
        answer: language === 'en' ? 'You can start immediately! After registration, we prepare your QR code and/or NFC card that you can begin using within minutes.' :
                language === 'it' ? 'Puoi iniziare immediatamente! Dopo la registrazione, prepariamo il tuo codice QR e/o la tua carta NFC che puoi iniziare a utilizzare in pochi minuti.' :
                'Začnete lahko takoj! Po registraciji pripravimo vašo QR kodo in/ali NFC kartico, ki jo lahko začnete uporabljati v nekaj minutah.'
      },
      {
        question: language === 'en' ? 'How does the system prevent negative reviews?' : 
                 language === 'it' ? 'Come fa il sistema a prevenire le recensioni negative?' : 
                 'Kako sistem preprečuje negativne ocene?',
        answer: language === 'en' ? 'Our system identifies dissatisfied customers (1-3 star ratings) and directs them to an internal feedback form instead of Google. This allows you to address their concerns privately before they become public negative reviews. You receive immediate notifications about negative feedback so you can take action quickly.' : 
               language === 'it' ? 'Il nostro sistema identifica i clienti insoddisfatti (valutazioni da 1 a 3 stelle) e li indirizza a un modulo di feedback interno anziché a Google. Questo ti permette di affrontare le loro preoccupazioni in privato prima che diventino recensioni negative pubbliche. Ricevi notifiche immediate sui feedback negativi in modo da poter agire rapidamente.' : 
               'Naš sistem prepozna nezadovoljne stranke (ocene 1-3 zvezdice) in jih namesto na Google usmeri na interni obrazec za povratne informacije. To vam omogoča, da njihove težave rešite zasebno, preden postanejo javne negativne ocene. O negativnih povratnih informacijah prejmete takojšnja obvestila, da lahko hitro ukrepate.'
      },
      {
        question: language === 'en' ? 'How does the gamification system help gain more followers?' : 
                 language === 'it' ? 'Come fa il sistema di gamification ad aiutare a ottenere più follower?' : 
                 'Kako sistem gejmifikacije pomaga pridobiti več sledilcev?',
        answer: language === 'en' ? 'After leaving a positive review, customers are offered a gamification experience where they can complete simple tasks like following your social media accounts. In exchange, they receive rewards that you define (discounts, free products, etc.). This creates a win-win situation where customers get rewards and you gain followers.' : 
               language === 'it' ? 'Dopo aver lasciato una recensione positiva, ai clienti viene offerta un\'esperienza di gamification dove possono completare semplici attività come seguire i tuoi account sui social media. In cambio, ricevono premi che tu definisci (sconti, prodotti gratuiti, ecc.). Questo crea una situazione vantaggiosa per tutti dove i clienti ottengono premi e tu guadagni follower.' : 
               'Po oddaji pozitivne ocene strankam ponudimo izkušnjo gejmifikacije, kjer lahko opravijo preproste naloge, kot je sledenje vašim računom na družbenih omrežjih. V zameno prejmejo nagrade, ki jih določite (popusti, brezplačni izdelki itd.). To ustvarja situacijo, kjer vsi pridobijo - stranke dobijo nagrade, vi pa sledilce.'
      },
      {
        question: language === 'en' ? 'Is the system GDPR compliant?' : 
                 language === 'it' ? 'Il sistema è conforme al GDPR?' : 
                 'Ali je sistem skladen z GDPR?',
        answer: language === 'en' ? 'Yes, our system is fully GDPR compliant. We only collect customer data with explicit consent, provide clear information about how the data will be used, and implement all necessary security measures to protect personal information. You can also easily export or delete customer data as required by GDPR regulations.' : 
               language === 'it' ? 'Sì, il nostro sistema è completamente conforme al GDPR. Raccogliamo i dati dei clienti solo con consenso esplicito, forniamo informazioni chiare su come i dati verranno utilizzati e implementiamo tutte le misure di sicurezza necessarie per proteggere le informazioni personali. Puoi anche esportare o eliminare facilmente i dati dei clienti come richiesto dalle normative GDPR.' : 
               'Da, naš sistem je popolnoma skladen z GDPR. Podatke strank zbiramo samo z izrecnim soglasjem, zagotavljamo jasne informacije o tem, kako bodo podatki uporabljeni, in izvajamo vse potrebne varnostne ukrepe za zaščito osebnih podatkov. Podatke strank lahko tudi enostavno izvozite ali izbrišete, kot to zahtevajo predpisi GDPR.'
      }
    ];
  }, [translations, language]);
  
  return {
    openIndex,
    setOpenIndex,
    translations,
    faqItems,
    containerVariants,
    itemVariants,
    isClient
  };
};

export default useFAQ;