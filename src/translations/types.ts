/**
 * Types for translation system
 */

// Import necessary feedback types
import { feedbackOptions as enFeedbackOptions } from './en/feedbackOptions';
import { feedbackOptions as slFeedbackOptions } from './sl/feedbackOptions';
import { feedbackOptions as itFeedbackOptions } from './it/feedbackOptions';

export type FeedbackOptionsTranslations = typeof enFeedbackOptions;

export interface TranslationIndexes {
  feedbackOptions: {
    en: typeof enFeedbackOptions;
    sl: typeof slFeedbackOptions;
    it: typeof itFeedbackOptions;
  }
}

export interface LandingTranslations {
  navigation: {
    home: string;
    benefits: string;
    nfc: string;
    howItWorks: string;
    howToStart: string;
    pricing: string;
    contact: string;
    blog: string;
    login: string;
    signup: string;
    account: string;
    adminPanel: string;
    logOut: string;
  };
  hero: {
    title: string;
    subtitle: string;
    features: {
      noContract: string;
      trial: string;
      support: string;
    };
    cta: {
      main: string;
      secondary: string;
    };
  };
  benefits: {
    title: string;
    subtitle: string;
    items: {
      ratings: {
        title: string;
        description: string;
        features: string[];
      };
      protection: {
        title: string;
        description: string;
        features: string[];
      };
      contacts: {
        title: string;
        description: string;
        features: string[];
      };
    };
  };
  nfcShowcase: {
    title: string;
    subtitle: string;
    features: Array<{
      title: string;
      description: string;
    }>;
    productsTitle: string;
    productsSubtitle: string;
    cta: string;
  };
  howToStart: {
    title: string;
    subtitle: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
    cta: string;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    highRating: {
      title: string;
      description: string;
      steps: string[];
    };
    lowRating: {
      title: string;
      description: string;
      steps: string[];
    };
  };
  valueProposition: {
    title: string;
    subtitle: string;
    description: string;
    stats: {
      rating: {
        title: string;
        description: string;
      };
      reviews: {
        title: string;
        description: string;
      };
      prevention: {
        title: string;
        description: string;
      };
      customers: {
        title: string;
        description: string;
      };
    };
  };
  testimonials: {
    title: string;
    subtitle: string;
  };
  gamification: {
    title: string;
    subtitle: string;
    description: string;
    features: {
      easy: string;
      followers: string;
      rewards: string;
    };
    cta: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    monthly: string;
    yearly: string;
    yearDiscount: string;
    popular: string;
    features: string;
    package: string;
    price: string;
    billing: string;
    total: string;
    addOns: string;
    compare: string;
    cta: string;
    contactUs: string;
    pricingTable: string;
    loginToContinue: string;
    loginToContinuePurchase: string;
    featureComparison: string;
    checkoutError: string;
    invalidPackage: string;
    loadError: string;
    selectPackage: string;
    login: string;
    signup: string;
    checkout: string;
    completeYourPurchase: string;
    backToPricing: string;
    secureCheckout: string;
    loggedInAs: string;
    monthlyBilling: string;
    yearlyBilling: string;
    packageIncludes: string;
    monthlySubscription: string;
    yearlySubscription: string;
    proceedToCheckout: string;
    processing: string;
    securePaymentInfo: string;
    termsNotice: string;
    acceptedPaymentMethods: string;
    securePaymentWith: string;
    moneyBackGuarantee: string;
    support24h: string;
    paymentSuccess: string;
    thankYouMessage: string;
    orderSummary: string;
    amount: string;
    paymentStatus: string;
    orderDate: string;
    processingOrder: string;
    orderReference: string;
    confirmationEmail: string;
    returnHome: string;
    viewDashboard: string;
    orderID: string;
    paymentMethod: string;
    loadingCheckout: string;
    checkoutError: string;
    productNotFound: string;
    authRequired: string;
    loginSecurityMessage: string;
    retrying: string;
    retry: string;
    dashboard: string;
    processingYourOrder: string;
    processingOrderMessage: string;
    checkStatus: string;
    checkingStatus: string;
    errorLoadingOrder: string;
    noCheckoutSession: string;
    processingPayment: string;
    loadingDetails: string;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      company: string;
      message: string;
      gdprConsent: string;
      gdprLink: string;
      gdprSubmit: string;
      submitButton: string;
      sending: string;
      required: string;
      success: {
        title: string;
        message: string;
      };
      error: {
        title: string;
        message: string;
        submitError: string;
        gdprRequired: string;
      };
    };
    contactInfo: {
      title: string;
      email: string;
      phone: string;
      address: string;
    };
  };
  footer: {
    company: string;
    about: string;
    contact: string;
    pricing: string;
    blog: string;
    legal: string;
    terms: string;
    privacy: string;
    gdpr: string;
    industries: string;
    beauty: string;
    restaurants: string;
    automotive: string;
    healthcare: string;
    realestate: string;
    links: string;
    copyright: string;
    poweredBy: string;
    addressLine1: string;
    addressLine2: string;
  };
}

export interface AppTranslations {
  name: string;
  error: {
    title: string;
    message: string;
    back: string;
    retry: string;
  };
  auth: {
    signIn: string;
    signOut: string;
    sessionExpired: string;
    loginRequired: string;
  };
  payment: {
    checkoutFailed: string;
  };
  loading: string;
  placeholder: string;
  copyright: string;
  companyIdNotFound: string;
  companyIdNotFoundMessage: string;
  admin: {
    admins: {
      title: string;
    };
    blog: {
      title: string;
      addPost: string;
      editPost: string;
      published: string;
      draft: string;
      live: string;
      formFields: {
        title: string;
        content: string;
        excerpt: string;
        author: string;
        coverImage: string;
        published: string;
        titlePlaceholder: string;
        contentPlaceholder: string;
        excerptPlaceholder: string;
        authorPlaceholder: string;
        coverImagePlaceholder: string;
        create: string;
        creating: string;
        save: string;
        saving: string;
      };
    };
    companies: {
      title: string;
    };
    contacts: {
      title: string;
      delete: string;
      refresh: string;
      refreshing: string;
      noRequests: string;
      reply: string;
      markAsHandled: string;
      deleteConfirm: string;
    };
    overview: {
      title: string;
    };
    signOut: string;
    addCompany: string;
    placeholder: string;
    company: {
      editTitle: string;
      back: string;
      viewOnGoogle: string;
      reviewLink: string;
      id: string;
      statistics: string;
      socialTasks: {
        title: string;
        noTasks: string;
      };
      ratingDistribution: string;
      deleteTitle: string;
      deleteConfirm: string;
      deleteConfirmMessage: string;
      deleteConfirmButton: string;
      deleteCancelButton: string;
      form: {
        description: string;
        editDescription: string;
        cancel: string;
        save: string;
        saving: string;
        add: string;
        adding: string;
      };
    };
    reviews: {
      title: string;
      date: string;
      rating: string;
      company: string;
      contact: string;
      comment: string;
      tasks: string;
      search: string;
      loading: string;
      noReviews: string;
      noReviewsInRange: string;
    };
    stats: {
      averageRating: string;
      totalReviews: string;
      totalCompanies: string;
      conversionRate: string;
      period: string;
      completedOf: string;
      contactInfo: string;
      completionMetrics: string;
      ratingDistribution: string;
      withEmail: string;
      withPhone: string;
      contactRate: string;
      completedReviews: string;
      googleRedirects: string;
      redirectRate: string;
      totalReviewsInPeriod: string;
    };
    subscriptions: {
      noActiveSubscription: string;
      noSubscriptionMessage: string;
      yourSubscription: string;
      manageSubscription: string;
      superadminAccount: string;
      superadmin: string;
      fullAccess: string;
      viewPricingPlans: string;
      currentPeriod: string;
      autoRenewal: string;
      yes: string;
      no: string;
      paymentMethod: string;
      active: string;
      trial: string;
      pastDue: string;
      canceled: string;
      notStarted: string;
    };
  };
}

export interface ReviewTranslations {
  title: string;
  subtitle: string;
  quickProcess: string;
  giftDescription: string;
  issues: {
    title: string;
    longWaitTimes: string;
    poorCommunication: string;
    qualityConcerns: string;
    staffAttitude: string;
    priceIssues: string;
    technicalProblems: string;
  };
  form: {
    contactInfo: string;
    email: string;
    phone: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    comments: string;
    commentsPlaceholder: string;
    gdprSubmit: string;
    gdprLink: string;
    submitButton: string;
    sending: string;
    error: {
      contactRequired: string;
      invalidEmail: string;
      invalidPhone: string;
      submitFailed: string;
    };
  };
}

export interface GamificationTranslations {
  title: {
    five_stars: string;
    four_stars: string;
  };
  subtitle: {
    five_stars: string;
    four_stars: string;
  };
  progress: string;
  tasks: {
    title: string;
    startTask: string;
    completed: string;
    allCompleted: string;
    google: string;
    followInstagram: string;
    followFacebook: string;
    followTiktok: string;
  };
  form: {
    contactInfo: string;
    email: string;
    phone: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    gdprSubmit: string;
    gdprLink: string;
    submitButton: string;
    sending: string;
    error: {
      contactRequired: string;
      invalidEmail: string;
      submitFailed: string;
    };
  };
}

export interface ThankYouTranslations {
  highRating: {
    title: string;
    message: string;
    shareWithFriends: string;
  };
  lowRating: {
    title: string;
    message: string;
  };
}

export interface Translations {
  app: AppTranslations;
  landing: LandingTranslations;
  review: ReviewTranslations;
  gamification: GamificationTranslations;
  thankYou: ThankYouTranslations;
  translation?: {
    feedbackOptions: Record<string, string>;
    errors?: Record<string, string>;
    industries?: Record<string, string>;
  };
}