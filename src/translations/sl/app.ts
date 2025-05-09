// Slovenian translations for app-related content
import { blog } from './app.blog';

export const app = {
  name: 'ocenagor.si',
  title: 'Izboljšajte svoj ugled na spletu',
  description: 'Sistem za upravljanje spletnega ugleda in ocen strank',
  error: {
    title: 'Nekaj je šlo narobe',
    message: 'Prosimo, osvežite stran in poskusite ponovno.',
    retry: 'Poskusi ponovno',
    back: 'Nazaj na pregled'
  },
  notFound: {
    title: 'Stran ni najdena',
    message: 'Oprostite, strani, ki ste jo iskali, ni mogoče najti.',
    backHome: 'Nazaj na domačo stran',
    tryAgain: 'Poskusite znova'
  },
  secureCheckout: 'Varen nakup',
  loginToContinuePurchase: 'Prijavite se za nadaljevanje nakupa',
  description: 'Pomagamo podjetjem izboljšati njihov spletni ugled s strateškim upravljanjem ocen in optimizacijo povratnih informacij strank.',
  companyIdRequired: 'Prosimo, vnesite ID podjetja',
  invalidCompanyId: 'Neveljaven ID podjetja',
  companyNotFound: 'Podjetje ni bilo najdeno',
  companyIdNotFound: 'Podjetje ni bilo najdeno',
  companyIdNotFoundMessage: 'Podjetje s tem ID-jem ne obstaja v naši bazi. Prosimo, preverite povezavo in poskusite ponovno.',
  checkCompanyId: 'Prosimo, preverite ID podjetja in poskusite ponovno.',
  provideValidId: 'Prosimo, vnesite veljaven ID podjetja.',
  errorLoadingCompany: 'Napaka pri nalaganju podatkov o podjetju',
  admin: {
    overview: {
      title: 'Pregled'
    },
    companies: {
      title: 'Podjetja'
    },
    blog,
    contacts: {
      title: 'Kontaktna sporočila',
      noRequests: 'Ni kontaktnih sporočil',
      refresh: 'Osveži',
      refreshing: 'Osveževanje...',
      delete: 'Izbriši',
      deleteConfirm: 'Ali ste prepričani, da želite izbrisati to kontaktno sporočilo?',
      markAsHandled: 'Označi kot obravnavano',
      reply: 'Odgovori',
      status: {
        new: 'Novo',
        handled: 'Obravnavano'
      }
    },
    monitoring: {
      title: 'Nadzor sistema'
    },
    admins: {
      title: 'Upravljanje administratorjev',
      addAdmin: 'Dodaj administratorja',
      deleteAdmin: 'Izbriši administratorja',
      deleteConfirm: 'Ali ste prepričani, da želite izbrisati tega administratorja?',
      assignCompanies: 'Dodeli podjetja',
      refresh: 'Osveži',
      refreshing: 'Osveževanje...',
      email: 'E-pošta',
      role: 'Vloga',
      admin: 'Admin',
      superadmin: 'Superadmin',
      created: 'Ustvarjeno',
      actions: 'Dejanja',
      noAdminsFound: 'Ni najdenih administratorjev',
      loading: 'Nalaganje...'
    },
    addCompany: 'Dodaj podjetje',
    signOut: 'Odjava',
    signOutShort: 'Odjava',
    coupons: {
      title: 'Kuponi',
      refresh: 'Osveži',
      refreshing: 'Osveževanje...',
      noCoupons: 'Ni najdenih kuponov',
      markAsUsed: 'Označi kot uporabljen',
      markAsUnused: 'Označi kot neuporabljen',
      copy: 'Kopiraj',
      copied: 'Kopirano!',
      export: 'Izvozi CSV',
      search: 'Išči kupone...',
      filterAll: 'Vsi',
      filterUsed: 'Uporabljeni',
      filterUnused: 'Neuporabljeni',
      filterCompany: 'Vsa podjetja',
      couponCode: 'Koda kupona',
      company: 'Podjetje',
      discount: 'Popust',
      status: 'Status',
      created: 'Ustvarjeno',
      expires: 'Poteče',
      contact: 'Kontakt',
      actions: 'Dejanja',
      used: 'Uporabljen',
      unused: 'Neuporabljen',
      expired: 'Potekel',
      percentage: 'odstotek',
      fixed: 'EUR',
      loading: 'Nalaganje kuponov...'
    },
    communications: {
      title: 'Komunikacije',
      email: 'E-pošta',
      sms: 'SMS',
      refresh: 'Osveži',
      refreshing: 'Osveževanje...',
      loading: 'Nalaganje...',
      noEmails: 'Ni najdenih e-poštnih sporočil',
      noEmailsMessage: 'Ni poslanih e-poštnih sporočil.',
      noSMS: 'Ni najdenih SMS sporočil',
      noSMSMessage: 'Ni poslanih SMS sporočil.',
      recipient: 'Prejemnik',
      company: 'Podjetje',
      emailType: 'Tip e-pošte',
      message: 'Sporočilo',
      smsMessage: 'SMS sporočilo',
      delivered: 'Dostavljeno',
      failed: 'Neuspešno',
      pending: 'V obdelavi'
    },
    lottery: {
      title: 'Žrebanje',
      refresh: 'Osveži',
      refreshing: 'Osveževanje...',
      noEntries: 'Ni najdenih vnosov za žrebanje',
      markAsWinner: 'Označi kot zmagovalca',
      markAsClaimed: 'Označi kot prevzeto',
      draw: 'Izvedi žrebanje',
      search: 'Išči vnose...',
      filterAll: 'Vsi',
      filterWinners: 'Zmagovalci',
      filterNonWinners: 'Nezmagovalci',
      filterCompany: 'Vsa podjetja',
      entryDate: 'Datum vnosa',
      company: 'Podjetje',
      contact: 'Kontakt',
      status: 'Status',
      actions: 'Dejanja',
      winner: 'Zmagovalec',
      notWinner: 'Ni izbran',
      claimed: 'Prevzeto',
      notClaimed: 'Ni prevzeto',
      loading: 'Nalaganje vnosov za žrebanje...',
      drawWinner: 'Izvedi žrebanje',
      drawWinnerConfirm: 'Ali ste prepričani, da želite izvesti žrebanje? Tega dejanja ni mogoče razveljaviti.',
      drawWinnerSuccess: 'Zmagovalec je bil uspešno izbran!',
      drawing: 'Žrebanje...',
      confirmDraw: 'Potrdi žrebanje',
      drawingInProgress: 'Žrebanje v teku...',
      drawForCompany: 'Izvedi žrebanje za podjetje',
      drawWinnerWarning: {
        title: 'Pomembne informacije',
        message: 'To dejanje bo naključno izbralo zmagovalca med vsemi upravičenimi vnosi za to podjetje. Tega dejanja ni mogoče razveljaviti.'
      },
      drawingFrequency: {
        daily: 'Dnevno',
        weekly: 'Tedensko',
        monthly: 'Mesečno'
      },
      nextDrawing: 'Naslednje žrebanje:'
    },
    subscriptions: {
      title: 'Upravljanje naročnin',
      noSubscriptions: 'Ni aktivnih naročnin',
      noSubscriptionsAdmin: 'V sistemu še ni aktivnih naročnin.',
      refresh: 'Osveži',
      refreshing: 'Osveževanje...',
      adminEmail: 'E-pošta administratorja',
      subscriptionStatus: 'Status naročnine',
      periodEnd: 'Konec obdobja',
      autoRenewal: 'Samodejno podaljšanje',
      actions: 'Dejanja',
      cancel: 'Prekliči',
      cancelImmediate: 'Prekliči takoj',
      cancelAtPeriod: 'Prekliči ob koncu obdobja',
      keepSubscription: 'Ohrani naročnino',
      confirmCancellation: 'Potrdi preklic',
      cancelling: 'Preklicevanje...',
      cancelReason: 'Razlog za preklic (neobvezno)',
      cancelReasonPlaceholder: 'Prosimo, povejte nam, zakaj preklicujete...',
      cancelWarning: {
        title: 'Pomembne informacije',
        message: 'Dostop do vseh funkcij se bo nadaljeval do konca trenutnega obračunskega obdobja.'
      },
      cancelImmediateWarning: {
        title: 'Opozorilo: Takojšnji preklic',
        message: 'To dejanje ne more biti razveljavljeno. Uporabnik bo takoj izgubil dostop in povračilo ne bo izdano.'
      },
      yes: 'Da',
      no: 'Ne (preklic ob koncu obdobja)',
      na: 'N/A',
      superadmin: 'Superadmin',
      active: 'Aktivna',
      canceled: 'Preklicana',
      trial: 'Poskusno obdobje',
      pastDue: 'Zapadla plačila',
      notStarted: 'Ni začeta',
      paymentMethod: 'Način plačila',
      currentPeriod: 'Trenutno obdobje',
      manageSubscription: 'Upravljaj naročnino',
      viewPricingPlans: 'Ogled paketov',
      noActiveSubscription: 'Ni aktivne naročnine',
      noSubscriptionMessage: 'Trenutno nimate aktivne naročnine.',
      superadminAccount: 'Superadmin račun',
      fullAccess: 'Kot superadmin imate dostop do vseh funkcij brez naročnine.',
      upgradeSubscription: 'Nadgradi paket',
      needSuperadminPrivileges: 'Za dostop do tega razdelka potrebujete superadmin pravice.',
      yourSubscription: 'Vaša naročnina',
      manage: 'Upravljaj',
      loading: 'Nalaganje naročnin...',
      processingCancellation: 'Obdelava preklica...',
      contactSupport: 'Kontaktirajte podporo',
      renewalDate: 'Datum obnovitve',
      subscriptionInfo: 'Informacije o naročnini',
      paymentDetails: 'Podrobnosti plačila',
      billingAddress: 'Naslov za račun',
      paymentHistory: 'Zgodovina plačil',
      currentUsage: 'Trenutna poraba',
      planDetails: 'Podrobnosti paketa',
      updatePlan: 'Posodobi paket',
      changePlan: 'Spremeni paket',
      currentUser: 'Vi'
    },
    stats: {
      averageRating: 'Povprečna ocena',
      totalReviews: 'Skupaj ocen',
      totalCompanies: 'Skupaj podjetij',
      conversionRate: 'Stopnja konverzije',
      increase: 'povišanje',
      decrease: 'znižanje',
      title: 'Statistika',
      period: 'v izbranem obdobju',
      completedOf: '{completed} od {total} ocen',
      contactInfo: 'Kontaktni podatki',
      withEmail: 'Z e-pošto',
      withPhone: 'S telefonom',
      contactRate: 'Stopnja kontaktov',
      timeMetrics: 'Časovne metrike',
      today: 'Danes',
      yesterday: 'Včeraj',
      thisWeek: 'Ta teden',
      completionMetrics: 'Metrike uspešnosti',
      completedReviews: 'Zaključene ocene',
      googleRedirects: 'Google preusmeritve',
      redirectRate: 'Stopnja preusmeritev',
      ratingDistribution: 'Porazdelitev ocen',
      highRatings: 'Visoke ocene (4-5)',
      lowRatings: 'Nizke ocene (1-3)',
      totalReviewsInPeriod: 'Skupaj ocen v obdobju',
      noReviewsInRange: 'Ni ocen v izbranem obdobju'
    },
    reviews: {
      title: 'Ocene',
      date: 'Datum',
      rating: 'Ocena',
      company: 'Podjetje',
      contact: 'Kontakt',
      comment: 'Komentar',
      tasks: 'Naloge',
      completed: 'Zaključeno',
      loading: 'Nalaganje...',
      noReviews: 'Ni najdenih ocen',
      search: 'Išči ocene...',
      allCompanies: 'Vsa podjetja'
    },
    company: {
      name: 'Ime podjetja',
      googleLink: 'Google povezava',
      statistics: 'Statistika podjetja',
      id: 'ID podjetja',
      reviewLink: 'Povezava za oceno',
      created: 'Ustvarjeno',
      back: 'Nazaj na podjetja',
      viewOnGoogle: 'Ogled na Google',
      exportCsv: 'Izvozi CSV',
      ratingDistribution: 'Porazdelitev ocen',
      recentReviews: 'Zadnje ocene',
      averageRating: 'Povprečna ocena',
      totalReviews: 'Skupno število ocen',
      conversionRate: 'Stopnja konverzije',
      createdAt: 'Ustvarjeno',
      dropOffAnalysis: 'Analiza osipa',
      dropOffPoints: 'Točke osipa',
      flowAnalysis: 'Analiza tokov',
      highRatingFlow: 'Tok visokih ocen (4-5★)',
      lowRatingFlow: 'Tok nizkih ocen (1-3★)',
      completionRate: 'Stopnja zaključka',
      dropOffRate: 'Stopnja osipa',
      googleRedirects: 'Google preusmeritve',
      edit: 'Uredi',
      delete: 'Izbriši',
      deleteTitle: 'Izbriši podjetje',
      deleteConfirm: 'Ali ste prepričani, da želite izbrisati to podjetje? Tega dejanja ni mogoče razveljaviti.',
      deleteConfirmMessage: 'To dejanje ni mogoče razveljaviti.',
      deleteConfirmButton: 'Da, izbriši',
      deleteCancelButton: 'Prekliči',
      addCompany: 'Dodaj podjetje',
      editTitle: 'Uredi podjetje',
      editCompanyInfo: 'Podatki o podjetju',
      colorScheme: 'Barvna shema',
      colorSchemes: {
        indigo: 'Indigo',
        emerald: 'Smaragdna',
        amber: 'Jantarna',
        rose: 'Roza',
        bw: 'Črno-bela'
      },
      logo: {
        title: 'Logotip',
        upload: 'Naloži logotip',
        requirements: 'PNG, JPG ali WebP do 2MB'
      },
      gift: {
        title: 'Darilo za oceno',
        description: 'Opis darila, ki ga bo stranka prejela po oddani oceni (prikazano v zahvalnem e-mailu)',
        placeholder: 'npr. 10% popust pri naslednjem obisku'
      },
      lottery: {
        title: 'Loterija namesto kuponov',
        description: 'Če je omogočeno, stranke ne prejmejo kupona takoj, ampak sodelujejo v žrebanju za nagrade'
      },
      form: {
        name: 'Ime podjetja',
        namePlaceholder: 'Vnesite ime podjetja',
        googleLink: 'Google povezava',
        googleLinkPlaceholder: 'https://g.page/...',
        logo: 'Logotip',
        logoRequirements: 'URL do logotipa podjetja',
        industry: 'Industrija',
        selectIndustry: 'Izberi industrijo',
        loadingIndustries: 'Nalaganje industrij...',
        industryDescription: 'Izbira industrije omogoča prikaz specifičnih povratnih informacij za vašo panogo',
        feedbackOptions: 'Možnosti povratnih informacij (1-3 zvezdice)',
        midRatingFeedbackOptions: 'Možnosti povratnih informacij (4 zvezdice)',
        loadingFeedbackOptions: 'Nalaganje možnosti povratnih informacij...',
        noFeedbackOptions: 'Za to industrijo ni najdenih možnosti povratnih informacij',
        feedbackOptionsDescription: 'Izbrane možnosti bodo prikazane strankam, ki pustijo nizke ocene',
        midRatingFeedbackOptionsDescription: 'Te možnosti bodo prikazane strankam, ki pustijo 4 zvezdice',
        selectFeedbackOptions: 'Izberite povratne informacije',
        colorScheme: 'Barvna shema',
        cancel: 'Prekliči',
        save: 'Shrani spremembe',
        saving: 'Shranjevanje...',
        add: 'Dodaj podjetje',
        adding: 'Dodajanje...',
        description: 'Ustvarite novo podjetje z izpolnitvijo spodnjega obrazca.',
        editDescription: 'Uredite podatke o podjetju spodaj.',
        nameRequired: 'Ime podjetja je obvezno',
        googleLinkRequired: 'Google povezava je obvezna',
        lottery: {
          title: 'Loterija namesto kuponov',
          description: 'Če je omogočeno, stranke ne prejmejo kupona takoj, ampak sodelujejo v žrebanju za nagrade'
        },
        couponType: {
          title: 'Vrsta nagrade',
          coupon: {
            title: 'Kupon za vsako oceno',
            description: 'Stranka prejme kupon po oddani oceni'
          },
          lottery: {
            title: 'Žrebanje',
            description: 'Stranka sodeluje v žrebanju za nagrade'
          },
          none: {
            title: 'Brez nagrad',
            description: 'Stranka ne prejme nagrade in ne potrebuje vnesti kontaktnih podatkov'
          }
        },
        socialTasks: {
          title: 'Družbena omrežja',
          add: 'Dodaj družbeno omrežje',
          platform: 'Platforma',
          platformPlaceholder: 'Ime platforme (npr. Instagram, Facebook)',
          url: 'URL',
          urlPlaceholder: 'https://...',
          remove: 'Odstrani'
        }
      },
      socialTasks: {
        title: 'Družbena omrežja',
        noTasks: 'Ni dodanih družbenih omrežij',
        add: 'Dodaj družbeno omrežje',
        platform: 'Platforma',
        platformPlaceholder: 'Ime platforme',
        url: 'URL',
        urlPlaceholder: 'https://...',
        remove: 'Odstrani'
      },
      notifications: {
        title: 'Obvestila',
        description: 'Konfigurirajte, katera obvestila se pošiljajo strankam',
        sms: {
          title: 'SMS obvestila',
          description: 'Konfigurirajte, katera SMS sporočila se pošiljajo strankam',
          coupon: {
            label: 'Pošlji SMS s kodo kupona po oceni',
            description: 'Stranka bo prejela SMS s kodo kupona po oddaji ocene'
          },
          google: {
            label: 'Pošlji SMS s povezavo za Google oceno',
            description: 'Stranka bo prejela SMS s povezavo za oddajo ocene na Googlu'
          },
          sendAfter: 'Pošlji po',
          minutes: 'minutah'
        },
        email: {
          title: 'E-poštna obvestila',
          description: 'Konfigurirajte, katera e-poštna sporočila se pošiljajo strankam',
          thankYou: {
            label: 'Pošlji zahvalno e-pošto po oceni',
            description: 'Stranka bo prejela zahvalno e-pošto po oddaji ocene'
          },
          coupon: {
            label: 'Pošlji e-pošto s kodo kupona',
            description: 'Stranka bo prejela e-pošto s kodo kupona'
          },
          reviewReminder: {
            label: 'Pošlji opomnik za oceno',
            description: 'Pošlji opomnik po e-pošti, če stranka ni zaključila ocene'
          },
          googleReview: {
            label: 'Pošlji e-pošto za Google oceno',
            description: 'Pošlji e-pošto s prošnjo, da stranka odda oceno na Googlu'
          },
          sendAfter: 'Pošlji po',
          minutes: 'minutah'
        }
      },
      actions: 'Dejanja',
      editAction: 'Uredi',
      deleteAction: 'Izbriši'
    }
  }
};