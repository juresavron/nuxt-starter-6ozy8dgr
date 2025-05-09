import type { PricingPackage, AddOn } from '../types/pricing';

export const getPackages = (language: string): PricingPackage[] => [
  {
    title: language === 'en' ? 'Grow' : language === 'it' ? 'Crescita' : 'Grow',
    price: '39',
    yearlyPrice: '399',
    description: language === 'en'
      ? 'With gamification, multiple devices, monthly reports'
      : language === 'it'
      ? 'Con gamification, più dispositivi, report mensili'
      : 'Z gejmifikacijo, več napravami, mesečnimi poročili',
    features: language === 'en'
      ? [
          'Number of unique codes for multiple users or departments (at one location): Up to 3',
          'Included NFC equipment: Up to 5x cards/stickers/stands',
          'Company results dashboard: Basic',
          'Questionnaire about reasons for dissatisfaction: Industry-specific questionnaire',
          'Reports and data export (CSV): Included',
          'Analytics (responsiveness, trends): Advanced',
          'System onboarding: Guided setup'
        ]
      : language === 'it'
      ? [
          'Numero di sedi: Fino a 3',
          'Attrezzatura NFC inclusa: Fino a 5x carte/adesivi/supporti',
          'Dashboard con risultati aziendali: Base',
          'Report ed esportazione dati (CSV): Incluso',
          'Analisi (reattività, tendenze): Avanzata',
          'Onboarding del sistema: Configurazione guidata'
        ]
      : [
          'Število Unikatnih kod za več delavnih točk ali oddelkov na eni lokaciji: Do 3',
          'Vključena NFC oprema: Do 5x kartic/nalepk/stojal',
          'Dashboard z rezultati podjetja: Osnovni',
          'Vprašalnik o razlogih za nezadovoljstvo: Vprašalnik prilagojen vaši industriji',
          'Vrsta nagrade: Kupon za vsako oceno, žrebanje ali brez nagrad',
          'Poročila in izvoz podatkov (CSV): Vključeno',
          'Analitika (odzivnost, trendi): Osnovna',
          'Onboarding sistema: Vodena nastavitev'
        ],
    highlight: true
  },
  {
    title: language === 'en' ? 'Pro' : language === 'it' ? 'Pro' : 'Pro',
    price: '149',
    yearlyPrice: '799',
    description: language === 'en'
      ? 'For multiple locations, integrations, white-label'
      : language === 'it'
      ? 'Per più sedi, integrazioni, white-label'
      : 'Za več lokacij, integracije, white-label',
    features: language === 'en'
      ? [
          'Number of unique codes for multiple users or departments (at one location): Up to 5',
          'Included NFC equipment: Up to 10x cards/stickers/stands',
          'Team contacts dissatisfied customers',
          'Personalized design of physical components (cards, stands, bar stickers)',
          'Questionnaire about reasons for dissatisfaction: Custom questionnaire',
          'Company results dashboard: Advanced',
          'Reports and data export (CSV): Included',
          'White-label (no ocenagor.si logo)',
          'System onboarding: + consulting',
          'Support: Priority'
        ]
      : language === 'it'
      ? [
          'Numero di sedi: Fino a 5',
          'Attrezzatura NFC inclusa: Fino a 10x carte/adesivi/supporti',
          'Il team contatta i clienti insoddisfatti',
          'Design personalizzato dei componenti fisici (carte, supporti, adesivi)',
          'Dashboard con risultati aziendali: Avanzato',
          'Report ed esportazione dati (CSV): Incluso',
          'White-label (nessun logo ocenagor.si)',
          'Onboarding del sistema: + consulenza',
          'Supporto: Prioritario'
        ]
      : [
          'Število Unikatnih kod za več delavnih točk ali oddelkov na eni lokaciji: Do 5',
          'Vključena NFC oprema: Do 10x kartic/nalepk/stojal',
          'Ekipa kontaktira nezadovoljne stranke',
          'Vprašalnik o razlogih za nezadovoljstvo: Vprašalnik po meri',
          'Personaliziran dizajn fizičnih komponent (tablice,kartice,barska nalepka)',
          'Vrsta nagrade: Kupon za vsako oceno, žrebanje ali brez nagrad',
          'Dashboard z rezultati podjetja: Napreden', 
          'Poročila in izvoz podatkov (CSV): Vključeno',
          'White-label (brez logotipa ocenagor.si)',
          'Onboarding sistema: + svetovanje',
          'Podpora: Prednostna'
        ]
  }
];

export const getAddOns = (language: string): AddOn[] => [
  {
    title: language === 'en' 
      ? 'Additional NFC card'
      : language === 'it'
      ? 'Carta NFC aggiuntiva'
      : 'Dodatna NFC kartica',
    price: '29'
  },
  {
    title: language === 'en'
      ? 'Additional table sticker'
      : language === 'it'
      ? 'Adesivo da tavolo aggiuntivo'
      : 'Dodatna nalepka za mizo',
    price: '9'
  },
  {
    title: language === 'en'
      ? '5x stickers pack'
      : language === 'it'
      ? 'Pacchetto 5x adesivi'
      : 'Paket 5x nalepk',
    price: '39'
  },
  {
    title: language === 'en'
      ? '10x stickers pack'
      : language === 'it'
      ? 'Pacchetto 10x adesivi'
      : 'Paket 10x nalepk',
    price: '69'
  },
  {
    title: language === 'en'
      ? 'Custom setup (custom design, text)'
      : language === 'it'
      ? 'Setup personalizzato (design, testo)'
      : 'Setup po meri (custom dizajn, tekst)',
    price: '79'
  },
  {
    title: language === 'en'
      ? 'Physical mail delivery'
      : language === 'it'
      ? 'Consegna postale fisica'
      : 'Fizična dostava po pošti',
    price: '4.90'
  }
];