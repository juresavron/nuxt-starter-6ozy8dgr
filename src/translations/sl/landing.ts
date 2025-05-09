import { navigation } from './navigation';
import { hero } from './hero';
import { benefits } from './benefits';
import { howItWorks } from './howItWorks';
import { video } from './video';
import { howToStart } from './howToStart';
import { industries } from './industries';
import { community } from './community';
import { motivation } from './motivation';
import { socialProof } from './socialProof';
import { valueProposition } from './valueProposition';
import { nfc } from './nfc';
import { dashboard } from './dashboard';

export const landing = {
  hero,
  benefits,
  howItWorks,
  video,
  howToStart,
  motivation,
  industries,
  navigation,
  community,
  socialProof,
  valueProposition,
  dashboard,
  video,
  nfc,
  faq: {
    badge: "FAQ",
    title: "Pogosta vprašanja",
    subtitle: "Najdite odgovore na najpogostejša vprašanja o naši storitvi",
    contactText: "Imate še vprašanja? Tukaj smo, da vam pomagamo.",
    contactButton: "Kontaktirajte nas",
    items: [
      {
        question: "Ali stranke vedo, da niso neposredno na Googlu?",
        answer: "Da, naš sistem je popolnoma transparenten. Stranke lahko vidijo, da so na platformi ocenagor.si, ki jih pametno usmerja na Google glede na njihovo oceno. Ta transparentnost ohranja zaupanje, hkrati pa optimizira vaš profil ocen."
      },
      {
        question: "Ali lahko preizkusim sistem pred nakupom?",
        answer: "Absolutno! Ponujamo brezplačno demo verzijo, kjer lahko preizkusite celoten proces ocenjevanja in vse funkcije, preden se odločite."
      },
      {
        question: "Kako hitro lahko začnem uporabljati sistem?",
        answer: "Začnete lahko takoj! Po registraciji pripravimo vašo QR kodo in/ali NFC kartico, ki jo lahko začnete uporabljati v nekaj minutah."
      },
      {
        question: "Kako sistem preprečuje negativne ocene?",
        answer: "Sistem prepozna nezadovoljne stranke (1-3 zvezdice) in jih ne preusmeri na Google. Namesto tega zbira njihove povratne informacije interno, kar vam daje priložnost, da rešite težave, preden postanejo javne negativne ocene."
      },
      {
        question: "Kako sistem gejmifikacije pomaga pridobiti več sledilcev?",
        answer: "Ko stranka da 4 ali 5 zvezdic in je preusmerjena na Google, jo povabimo k opravljanju dodatnih nalog, kot je sledenje vašim računom na družbenih omrežjih. Za vsako opravljeno nalogo lahko ponudite nagrado, kar znatno poveča število vaših sledilcev."
      },
      {
        question: "Ali je sistem skladen z GDPR?",
        answer: "Da, naš sistem je popolnoma skladen z GDPR. Zbiramo samo podatke, ki so potrebni za zagotavljanje naše storitve, in zagotavljamo varnost in zasebnost vseh podatkov strank."
      },
      {
        question: "Ali lahko prilagodim dizajn strani za ocene?",
        answer: "Da, stran za ocene lahko prilagodite s svojim logotipom, barvami blagovne znamke in prilagojenimi sporočili. To zagotavlja dosledno izkušnjo blagovne znamke za vaše stranke skozi celoten proces ocenjevanja."
      }
    ]
  },
  
  pricing: {
    badge: 'Transparentni paketi',
    title: 'Preprosti, transparentni paketi',
    subtitle: 'Izberite paket, ki najbolj ustreza vašim potrebam',
    monthly: 'MESEČNO',
    yearly: 'LETNO',
    yearlySavings: 'Prihranite do 20%',
    compareFeatures: 'Primerjava funkcionalnosti',
    selectPlan: 'Izberi paket',
    functionality: 'Funkcionalnost',
    package: 'Paket',
    price: 'Cena',
    billing: 'Obračun',
    total: 'Skupaj',
    proceedToCheckout: 'Nadaljuj na blagajno',
    termsNotice: 'Z nadaljevanjem se strinjate z našimi Pogoji uporabe in Politiko zasebnosti. Vaše plačilo bo varno obdelano prek plačilnega sistema Stripe.',
    securePaymentInfo: 'Vaši podatki so varno šifrirani',
    acceptedPaymentMethods: 'Sprejeti načini plačila',
    numLocations: 'Število lokacij',
    nfcEquipment: 'Vključena NFC oprema',
    customReviewPage: 'Prilagojena ocenjevalna stran',
    gamification: 'Gejmifikacija',
    emailPhoneCapture: 'Zajem emaila / telefona',
    teamContacts: 'Ekipa kontaktira nezadovoljne stranke',
    employeeRating: 'Ocenjevanje zaposlenih (unikaten URL)',
    companyDashboard: 'Dashboard z rezultati podjetja',
    weeklyReport: 'Tedensko poročilo direktorju',
    reportsDataExport: 'Poročila in izvoz podatkov (CSV)',
    analytics: 'Analitika (odzivnost, trendi)',
    questionnaire: 'Vprašalnik o razlogih za nezadovoljstvo',
    whiteLabel: 'White-label (brez logotipa ocenagor.si)',
    integrations: 'Integracije (CRM, Mailchimp, Zapier)',
    onboardingSystem: 'Onboarding sistema',
    support: 'Podpora',
    teamContactsValue: {
      basic: 'Naša ekipa kontaktira',
      advanced: '+ poročilo po klicu'
    },
    employeeRatingValue: {
      basic: 'Povprečja po zaposlenih',
      advanced: '+ povezava s kadrovsko mapo'
    },
    dashboardValue: {
      basic: 'Osnovni',
      advanced: 'Napreden',
      custom: 'Prilagodljiv'
    }
  }
}