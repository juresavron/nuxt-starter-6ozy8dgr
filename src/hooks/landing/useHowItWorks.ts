import { useMemo } from 'react';
import { useClientSide } from '../useClientSide';
import { useTranslations } from '../useTranslations';
import { useLanguageStore } from '../useLanguageStore';
import { Smartphone, Star, Send, CheckCircle, MessageSquare, Award } from 'lucide-react';

/**
 * Hook for how it works section
 * @returns How it works section data
 */
export const useHowItWorks = () => {
  const isClient = useClientSide();
  const translations = useTranslations();
  const { language } = useLanguageStore();
  
  // Define steps for high rating flow (5 stars)
  const highRatingFlow = useMemo(() => [
    {
      icon: Smartphone,
      title: language === 'en' ? 'NFC Scanning' : language === 'it' ? 'Scansione NFC' : 'Skeniranje NFC',
      description: language === 'en' ? 'Customer scans NFC card or QR code at your location.' : language === 'it' ? 'Il cliente scansiona la carta NFC o il codice QR presso la tua sede.' : 'Stranka skenira NFC kartico ali QR kodo na vaši lokaciji.',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Star,
      title: language === 'en' ? '5-Star Rating' : language === 'it' ? 'Valutazione 5 stelle' : '5-zvezdična ocena',
      description: language === 'en' ? 'Customer gives a 5-star rating. The system recognizes excellent satisfaction.' : language === 'it' ? 'Il cliente dà una valutazione a 5 stelle. Il sistema riconosce l\'eccellente soddisfazione.' : 'Stranka da 5-zvezdično oceno. Sistem prepozna odlično zadovoljstvo.',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: Send,
      title: language === 'en' ? 'Direct to Gamification' : language === 'it' ? 'Diretto alla Gamification' : 'Direktno na gejmifikacijo',
      description: language === 'en' ? 'Customer is immediately directed to gamification to complete social media tasks.' : language === 'it' ? 'Il cliente viene immediatamente indirizzato alla gamification per completare le attività sui social media.' : 'Stranka je takoj usmerjena na gejmifikacijo za opravljanje nalog na družbenih omrežjih.',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: CheckCircle,
      title: language === 'en' ? 'AI Follow-up' : language === 'it' ? 'Follow-up con AI' : 'AI sporočila',
      description: language === 'en' ? 'Our AI sends personalized email and SMS messages to encourage Google review completion.' : language === 'it' ? 'La nostra AI invia messaggi email e SMS personalizzati per incoraggiare il completamento della recensione su Google.' : 'Naša AI pošlje personalizirana e-poštna in SMS sporočila za spodbudo k dokončanju Google ocene.',
      color: 'from-rose-500 to-pink-600'
    }
  ], [language]);

  // Define steps for mid rating flow (4 stars)
  const midRatingFlow = useMemo(() => [
    {
      icon: Smartphone,
      title: language === 'en' ? 'NFC Scanning' : language === 'it' ? 'Scansione NFC' : 'Skeniranje NFC',
      description: language === 'en' ? 'Customer scans NFC card or QR code at your location.' : language === 'it' ? 'Il cliente scansiona la carta NFC o il codice QR presso la tua sede.' : 'Stranka skenira NFC kartico ali QR kodo na vaši lokaciji.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Star,
      title: language === 'en' ? '4-Star Rating' : language === 'it' ? 'Valutazione 4 stelle' : '4-zvezdična ocena',
      description: language === 'en' ? 'Customer gives a 4-star rating, indicating general satisfaction with some areas for improvement.' : language === 'it' ? 'Il cliente dà una valutazione di 4 stelle, indicando soddisfazione generale con alcune aree di miglioramento.' : 'Stranka da 4-zvezdično oceno, kar kaže na splošno zadovoljstvo z nekaj prostora za izboljšave.',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: MessageSquare,
      title: language === 'en' ? 'Feedback Collection' : language === 'it' ? 'Raccolta Feedback' : 'Zbiranje povratnih informacij',
      description: language === 'en' ? 'Customer provides specific feedback about areas for improvement while still being mostly satisfied.' : language === 'it' ? 'Il cliente fornisce feedback specifici sulle aree di miglioramento pur essendo complessivamente soddisfatto.' : 'Stranka poda specifične povratne informacije o področjih za izboljšave, čeprav je večinoma zadovoljna.',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Award,
      title: language === 'en' ? 'Gamification' : language === 'it' ? 'Gamification' : 'Gejmifikacija',
      description: language === 'en' ? 'Customer is directed to gamification to follow on social media and receives rewards.' : language === 'it' ? 'Il cliente viene indirizzato alla gamification per seguire sui social media e riceve premi.' : 'Stranka je usmerjena na gejmifikacijo za sledenje na družbenih omrežjih in prejme nagrade.',
      color: 'from-rose-500 to-pink-600'
    },
    {
      icon: CheckCircle,
      title: language === 'en' ? 'AI Follow-up' : language === 'it' ? 'Follow-up con AI' : 'AI sporočila',
      description: language === 'en' ? 'AI generates personalized messages to acknowledge feedback and encourage Google review completion.' : language === 'it' ? 'L\'AI genera messaggi personalizzati per riconoscere il feedback e incoraggiare il completamento della recensione su Google.' : 'AI ustvari personalizirana sporočila za potrditev povratnih informacij in spodbudi k dokončanju Google ocene.',
      color: 'from-blue-500 to-indigo-600'
    }
  ], [language]);
  
  // Define steps for low rating flow (1-3 stars)
  const lowRatingFlow = useMemo(() => [
    {
      icon: Smartphone,
      title: language === 'en' ? 'NFC Scanning' : language === 'it' ? 'Scansione NFC' : 'Skeniranje NFC',
      description: language === 'en' ? 'Customer scans NFC card or QR code at your location.' : language === 'it' ? 'Il cliente scansiona la carta NFC o il codice QR presso la tua sede.' : 'Stranka skenira NFC kartico ali QR kodo na vaši lokaciji.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Star,
      title: language === 'en' ? 'Low Rating (1-3 Stars)' : language === 'it' ? 'Valutazione Bassa (1-3 Stelle)' : 'Nizka ocena (1-3 zvezdice)',
      description: language === 'en' ? 'Customer gives a 1-3 star rating. The system recognizes customer dissatisfaction.' : language === 'it' ? 'Il cliente dà una valutazione di 1-3 stelle. Il sistema riconosce l\'insoddisfazione del cliente.' : 'Stranka da 1-3 zvezdično oceno. Sistem prepozna nezadovoljstvo stranke.',
      color: 'from-red-500 to-orange-600'
    },
    {
      icon: MessageSquare,
      title: language === 'en' ? 'Detailed Feedback' : language === 'it' ? 'Feedback Dettagliato' : 'Podrobne povratne informacije',
      description: language === 'en' ? 'Dissatisfied customer provides more detailed feedback for improvements, helping you enhance your service.' : language === 'it' ? 'Il cliente insoddisfatto fornisce feedback più dettagliati per miglioramenti, aiutandoti a migliorare il tuo servizio.' : 'Nezadovoljna stranka poda podrobnejše povratne informacije za izboljšave, kar vam pomaga izboljšati vašo storitev.',
      color: 'from-amber-500 to-yellow-600'
    },
    {
      icon: MessageSquare,
      title: language === 'en' ? 'AI Follow-up' : language === 'it' ? 'Follow-up con AI' : 'AI sporočila',
      description: language === 'en' ? 'AI generates personalized messages to address concerns and potentially turn a negative experience into a positive one.' : language === 'it' ? 'L\'AI genera messaggi personalizzati per affrontare le preoccupazioni e potenzialmente trasformare un\'esperienza negativa in una positiva.' : 'AI ustvari personalizirana sporočila za obravnavo pomislekov in potencialno preoblikovanje negativne izkušnje v pozitivno.',
      color: 'from-blue-500 to-indigo-600'
    }
  ], [language]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return {
    translations,
    isClient,
    highRatingFlow,
    midRatingFlow,
    lowRatingFlow,
    containerVariants,
    itemVariants
  };
};

// Export both as named and default export
export default useHowItWorks;