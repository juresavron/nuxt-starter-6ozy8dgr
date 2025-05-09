import { useState, useEffect } from 'react';
import { Star, Shield, Users, TrendingUp, CheckCircle2, Smartphone, Coffee, Car, Stethoscope, Home, Scissors, Building2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTranslations } from './useTranslations';
import { useLanguageStore } from './useLanguageStore';
import type { IndustryDetails } from '../types/industries';

/**
 * A simplified hook to generate industry data based on the slug
 * @param slug The industry slug from the URL
 * @returns Object containing industry data, loading state, and error
 */
export const useIndustryData = (slug?: string) => {
  const [industry, setIndustry] = useState<IndustryDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const translations = useTranslations();
  const { language } = useLanguageStore();

  useEffect(() => {
    // Early return if no slug provided
    if (!slug) {
      setLoading(false);
      setError('No industry slug provided');
      return;
    }

    const generateIndustryData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Normalize the slug
        const normalizedSlug = slug.toLowerCase();
        console.log('Generating industry data for:', normalizedSlug);

        // Create industry data based on slug
        // Get the appropriate icon based on industry slug
        const getIndustryIcon = (slug: string): LucideIcon => {
          switch(slug) {
            case 'lepota': return Scissors;
            case 'gostinstvo': return Coffee;
            case 'avtoservisi': return Car;
            case 'zdravje': return Stethoscope;
            case 'nepremicnine': return Home;
            case 'poslovne': return Building2;
            default: return Building2;
          }
        };

        // Get translated industry title
        const getIndustryTitle = (slug: string): string => {
          if (translations?.translation?.industries) {
            return translations.translation.industries[slug as keyof typeof translations.translation.industries] || 
                   slug.charAt(0).toUpperCase() + slug.slice(1);
          }
          return slug.charAt(0).toUpperCase() + slug.slice(1);
        };

        const industryTitle = getIndustryTitle(normalizedSlug);
        const industryIcon = getIndustryIcon(normalizedSlug);

        const industryData: IndustryDetails = {
          title: industryTitle,
          subtitle: language === 'en' 
            ? `Get higher Google ratings and more customers for your ${industryTitle.toLowerCase()} business`
            : language === 'it'
            ? `Ottieni valutazioni più alte su Google e più clienti per la tua attività di ${industryTitle.toLowerCase()}`
            : `Pridobite višje ocene na Googlu in več strank za vaše podjetje v panogi ${industryTitle.toLowerCase()}`,
          tags: [normalizedSlug, 
                 language === 'en' ? 'Google ratings' : language === 'it' ? 'Valutazioni Google' : 'Google ocene', 
                 language === 'en' ? 'Online reputation' : language === 'it' ? 'Reputazione online' : 'Spletni ugled', 
                 language === 'en' ? 'More customers' : language === 'it' ? 'Più clienti' : 'Več strank'],
          heroImage: `https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=2000&h=1000&q=80`,
          stats: [
            {
              icon: Star,
              value: '+127%',
              text: language === 'en' ? 'More Google reviews in first month' : 
                    language === 'it' ? 'Più recensioni Google nel primo mese' : 
                    'Več Google ocen v prvem mesecu'
            },
            {
              icon: TrendingUp,
              value: '4.8/5',
              text: language === 'en' ? 'Average rating on Google' : 
                    language === 'it' ? 'Valutazione media su Google' : 
                    'Povprečna ocena na Googlu'
            },
            {
              icon: Users,
              value: '+35%',
              text: language === 'en' ? 'More followers on social media' : 
                    language === 'it' ? 'Più follower sui social media' : 
                    'Več sledilcev na družbenih omrežjih'
            }
          ],
          benefits: [
            {
              icon: Star,
              title: language === 'en' ? 'Higher Google Ratings' : 
                     language === 'it' ? 'Valutazioni più alte su Google' : 
                     'Višje ocene na Googlu',
              description: language === 'en' ? 'Get more 5-star reviews and improve your online reputation' : 
                           language === 'it' ? 'Ottieni più recensioni a 5 stelle e migliora la tua reputazione online' : 
                           'Pridobite več 5-zvezdičnih ocen in izboljšajte svoj spletni ugled',
              features: [
                language === 'en' ? 'Smart routing of satisfied customers to Google' : 
                language === 'it' ? 'Instradamento intelligente dei clienti soddisfatti su Google' : 
                'Pametno usmerjanje zadovoljnih strank na Google',
                
                language === 'en' ? 'Prevention of negative public reviews' : 
                language === 'it' ? 'Prevenzione di recensioni pubbliche negative' : 
                'Preprečevanje negativnih javnih ocen',
                
                language === 'en' ? 'Higher average rating on Google' : 
                language === 'it' ? 'Valutazione media più alta su Google' : 
                'Višja povprečna ocena na Googlu'
              ]
            },
            {
              icon: Shield,
              title: language === 'en' ? 'Reputation Protection' : 
                     language === 'it' ? 'Protezione della reputazione' : 
                     'Zaščita ugleda',
              description: language === 'en' ? 'Prevent public negative reviews and resolve issues internally' : 
                           language === 'it' ? 'Previeni recensioni negative pubbliche e risolvi i problemi internamente' : 
                           'Preprečite javne negativne ocene in rešujte težave interno',
              features: [
                language === 'en' ? 'Capturing feedback from dissatisfied customers' : 
                language === 'it' ? 'Acquisizione di feedback da clienti insoddisfatti' : 
                'Zajemanje povratnih informacij nezadovoljnih strank',
                
                language === 'en' ? 'Opportunity to resolve issues before they become public' : 
                language === 'it' ? 'Possibilità di risolvere i problemi prima che diventino pubblici' : 
                'Možnost reševanja težav preden postanejo javne',
                
                language === 'en' ? 'Analytics of reasons for dissatisfaction' : 
                language === 'it' ? 'Analisi delle ragioni dell\'insoddisfazione' : 
                'Analitika razlogov za nezadovoljstvo'
              ]
            },
            {
              icon: Users,
              title: language === 'en' ? 'More Followers and Contacts' : 
                     language === 'it' ? 'Più follower e contatti' : 
                     'Več sledilcev in kontaktov',
              description: language === 'en' ? 'Gain new followers on social media and contact information' : 
                           language === 'it' ? 'Acquisisci nuovi follower sui social media e informazioni di contatto' : 
                           'Pridobite nove sledilce na družbenih omrežjih in kontaktne podatke',
              features: [
                language === 'en' ? 'Gamification for gaining followers' : 
                language === 'it' ? 'Gamification per acquisire follower' : 
                'Gejmifikacija za pridobivanje sledilcev',
                
                language === 'en' ? 'Capturing email addresses and phone numbers' : 
                language === 'it' ? 'Acquisizione di indirizzi email e numeri di telefono' : 
                'Zajem e-poštnih naslovov in telefonskih številk',
                
                language === 'en' ? 'Rewarding customers for participation' : 
                language === 'it' ? 'Premiare i clienti per la partecipazione' : 
                'Nagrajevanje strank za sodelovanje'
              ]
            }
          ],
          features: [
            {
              icon: Smartphone,
              title: language === 'en' ? 'Simple NFC Technology' : 
                     language === 'it' ? 'Semplice tecnologia NFC' : 
                     'Preprosta NFC tehnologija',
              description: language === 'en' ? 'Our NFC cards and stickers allow customers to submit a review in just 30 seconds with a single tap of their phone.' : 
                           language === 'it' ? 'Le nostre carte e adesivi NFC permettono ai clienti di inviare una recensione in soli 30 secondi con un solo tocco del loro telefono.' : 
                           'Naše NFC kartice in nalepke omogočajo strankam oddajo ocene v samo 30 sekundah z enim dotikom telefona.'
            },
            {
              icon: Star,
              title: language === 'en' ? 'Smart Review Routing' : 
                     language === 'it' ? 'Instradamento intelligente delle recensioni' : 
                     'Pametno usmerjanje ocen',
              description: language === 'en' ? 'Our system intelligently directs satisfied customers to Google while collecting feedback from dissatisfied customers internally.' : 
                           language === 'it' ? 'Il nostro sistema indirizza intelligentemente i clienti soddisfatti su Google mentre raccoglie internamente feedback dai clienti insoddisfatti.' : 
                           'Naš sistem pametno usmerja zadovoljne stranke na Google, medtem ko interno zbira povratne informacije nezadovoljnih strank.'
            },
            {
              icon: Shield,
              title: language === 'en' ? 'Reputation Protection' : 
                     language === 'it' ? 'Protezione della reputazione' : 
                     'Zaščita ugleda',
              description: language === 'en' ? 'Prevent negative public reviews by intercepting dissatisfied customers and resolving issues privately before they go public.' : 
                           language === 'it' ? 'Previeni recensioni negative pubbliche intercettando i clienti insoddisfatti e risolvendo i problemi privatamente prima che diventino pubblici.' : 
                           'Preprečite negativne javne ocene s prestrezanjem nezadovoljnih strank in reševanjem težav zasebno, preden postanejo javne.'
            },
            {
              icon: Users,
              title: language === 'en' ? 'Follower Acquisition' : 
                     language === 'it' ? 'Acquisizione di follower' : 
                     'Pridobivanje sledilcev',
              description: language === 'en' ? 'Turn happy customers into social media followers with our gamification system that rewards engagement.' : 
                           language === 'it' ? 'Trasforma clienti felici in follower sui social media con il nostro sistema di gamification che premia il coinvolgimento.' : 
                           'Spremenite zadovoljne stranke v sledilce na družbenih omrežjih z našim sistemom gejmifikacije, ki nagrajuje sodelovanje.'
            }
          ],
          ctaFeatures: language === 'en' ? [
            'Immediate system setup',
            'No long-term contracts',
            'Technical support and consulting',
            'Customization to your specific needs',
            'Free delivery of NFC components'
          ] : language === 'it' ? [
            'Installazione immediata del sistema',
            'Nessun contratto a lungo termine',
            'Supporto tecnico e consulenza',
            'Personalizzazione alle tue esigenze specifiche',
            'Consegna gratuita dei componenti NFC'
          ] : [
            'Takojšnja namestitev sistema',
            'Brez vezave in dolgoročnih pogodb',
            'Tehnična podpora in svetovanje',
            'Prilagoditev vašim specifičnim potrebam',
            'Brezplačna dostava NFC komponent'
          ],
          ctaTitle: language === 'en' 
            ? `Improve Your ${industryTitle} Business Today` 
            : language === 'it'
            ? `Migliora la tua attività di ${industryTitle} oggi`
            : `Izboljšajte svoje podjetje v panogi ${industryTitle} danes`,
          ctaDescription: language === 'en'
            ? "Start collecting more reviews and followers with our smart system tailored for your industry"
            : language === 'it'
            ? "Inizia a raccogliere più recensioni e follower con il nostro sistema intelligente su misura per il tuo settore"
            : "Začnite zbirati več ocen in sledilcev z našim pametnim sistemom, prilagojenim za vašo panogo",
          ctaImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=800&h=600&q=80',
          testimonials: language === 'en' ? [
            {
              quote: `In the first month of use, we got more Google reviews than in the entire previous year. The system is truly efficient and easy to use!`,
              author: "Thomas K.",
              role: "Owner",
              company: `${industryTitle} Studio`,
              location: "Ljubljana",
              rating: 5
            },
            {
              quote: "The best investment for our business. Customers are happy to leave a review, and we also gain new followers on social media.",
              author: "Anna P.",
              role: "Manager",
              company: `${industryTitle} Center`,
              location: "Maribor",
              rating: 5
            },
            {
              quote: "Since we started using ocenagor.si, our Google rating has increased from 4.2 to 4.8. The system intercepts dissatisfied customers and allows us to resolve issues internally.",
              author: "Mark B.",
              role: "Director",
              company: `${industryTitle} Pro`,
              location: "Celje",
              rating: 5
            }
          ] : language === 'it' ? [
            {
              quote: `Nel primo mese di utilizzo, abbiamo ricevuto più recensioni Google che in tutto l'anno precedente. Il sistema è davvero efficiente e facile da usare!`,
              author: "Tommaso K.",
              role: "Proprietario",
              company: `Studio ${industryTitle}`,
              location: "Ljubljana",
              rating: 5
            },
            {
              quote: "Il miglior investimento per la nostra attività. I clienti sono felici di lasciare una recensione, e otteniamo anche nuovi follower sui social media.",
              author: "Anna P.",
              role: "Manager",
              company: `Centro ${industryTitle}`,
              location: "Maribor",
              rating: 5
            },
            {
              quote: "Da quando abbiamo iniziato a usare ocenagor.si, la nostra valutazione su Google è aumentata da 4.2 a 4.8. Il sistema intercetta i clienti insoddisfatti e ci permette di risolvere i problemi internamente.",
              author: "Marco B.",
              role: "Direttore",
              company: `${industryTitle} Pro`,
              location: "Celje",
              rating: 5
            }
          ] : [
            {
              quote: `V prvem mesecu uporabe smo dobili več Google ocen kot v celem prejšnjem letu. Sistem je res učinkovit in preprost za uporabo!`,
              author: "Tomaž K.",
              role: "Lastnik",
              company: `${industryTitle} Studio`,
              location: "Ljubljana",
              rating: 5
            },
            {
              quote: "Najboljša investicija za naše podjetje. Stranke z veseljem pustijo oceno, mi pa dobimo tudi nove sledilce na družbenih omrežjih.",
              author: "Ana P.",
              role: "Vodja",
              company: `${industryTitle} Center`,
              location: "Maribor",
              rating: 5
            },
            {
              quote: "Odkar uporabljamo ocenagor.si, se je naš rating na Google dvignil iz 4.2 na 4.8. Sistem prestreže nezadovoljne stranke in nam omogoči, da rešimo težave interno.",
              author: "Marko B.",
              role: "Direktor",
              company: `${industryTitle} Pro`,
              location: "Celje",
              rating: 5
            }
          ]
        };

        // Set the industry data
        setIndustry(industryData);
        console.log('Industry data generated successfully');
      } catch (err) {
        console.error('Error generating industry data:', err);
        setError('Failed to generate industry data');
      } finally {
        setLoading(false);
      }
    };

    generateIndustryData();
  }, [slug, language, translations]);

  return { industry, loading, error };
};

export default useIndustryData;