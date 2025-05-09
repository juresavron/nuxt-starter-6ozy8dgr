// English translations for app-related content
import { blog } from './app.blog';

export const app = {
  name: 'ocenagor.si',
  title: 'Improve Your Online Reputation',
  description: 'Smart review collection system for businesses',
  error: {
    title: 'Something went wrong',
    message: 'Please refresh the page and try again.',
    retry: 'Try again',
    back: 'Back to overview'
  },
  notFound: {
    title: 'Page Not Found',
    message: "Sorry, we couldn't find the page you're looking for.",
    backHome: 'Back to Home',
    tryAgain: 'Try Again'
  },
  secureCheckout: 'Secure Checkout',
  loginToContinuePurchase: 'Please log in to continue with your purchase.',
  description: 'We help businesses improve their online reputation through strategic review management and customer feedback optimization.',
  companyIdRequired: 'Please enter a company ID',
  invalidCompanyId: 'Invalid company ID',
  companyNotFound: 'Company not found',
  companyIdNotFound: 'Company not found',
  companyIdNotFoundMessage: 'The company with this ID does not exist in our database. Please check the link and try again.',
  checkCompanyId: 'Please check the company ID and try again.',
  provideValidId: 'Please provide a valid company ID.',
  errorLoadingCompany: 'Error loading company data',
  admin: {
    overview: {
      title: 'Overview'
    },
    companies: {
      title: 'Companies'
    },
    blog,
    contacts: {
      title: 'Contact Requests',
      noRequests: 'No contact requests yet',
      refresh: 'Refresh',
      refreshing: 'Refreshing...',
      delete: 'Delete',
      deleteConfirm: 'Are you sure you want to delete this contact request?',
      markAsHandled: 'Mark as Handled',
      reply: 'Reply',
      status: {
        new: 'New',
        handled: 'Handled'
      }
    },
    monitoring: {
      title: 'Monitoring',
      refresh: 'Refresh',
      refreshing: 'Refreshing...',
      stats: {
        systemStatus: 'System Status',
        avgResponseTime: 'Avg. Response Time',
        uptime: 'Uptime',
        errorRate: 'Error Rate'
      },
      errorTrends: 'Error Trends',
      systemHealth: 'System Health',
      recentErrorLogs: 'Recent Error Logs'
    },
    admins: {
      title: 'Admin Management',
      addAdmin: 'Add Admin',
      deleteAdmin: 'Delete Admin',
      deleteConfirm: 'Are you sure you want to delete this admin?',
      assignCompanies: 'Assign Companies',
      refresh: 'Refresh',
      refreshing: 'Refreshing...'
    },
    addCompany: 'Add company',
    signOut: 'Sign out',
    signOutShort: 'Sign out',
    coupons: {
      title: 'Coupons',
      refresh: 'Refresh',
      refreshing: 'Refreshing...',
      noCoupons: 'No coupons found',
      markAsUsed: 'Mark as Used',
      markAsUnused: 'Mark as Unused',
      copy: 'Copy',
      copied: 'Copied!',
      export: 'Export CSV',
      search: 'Search coupons...',
      filterAll: 'All',
      filterUsed: 'Used',
      filterUnused: 'Unused',
      filterCompany: 'All Companies',
      couponCode: 'Coupon Code',
      company: 'Company',
      discount: 'Discount',
      status: 'Status',
      created: 'Created',
      expires: 'Expires',
      contact: 'Contact',
      actions: 'Actions',
      used: 'Used',
      unused: 'Unused',
      expired: 'Expired',
      percentage: 'percentage',
      fixed: 'EUR',
      drawWinnerError: 'Failed to draw a winner. Please try again.',
      drawing: 'Drawing...',
      confirmDraw: 'Confirm Drawing',
      drawingInProgress: 'Drawing in progress...',
      drawForCompany: 'Draw Winner for Company',
      drawWinnerWarning: {
        title: 'Important Information',
        message: 'This action will randomly select a winner from all eligible entries for this company. This action cannot be undone.'
      }
    },
    communications: {
      title: 'Communications',
      email: 'Email',
      sms: 'SMS',
      refresh: 'Refresh',
      refreshing: 'Refreshing...',
      loading: 'Loading...',
      noEmails: 'No emails found',
      noEmailsMessage: 'No emails have been sent yet.',
      noSMS: 'No SMS messages found',
      noSMSMessage: 'No SMS messages have been sent yet.',
      recipient: 'Recipient',
      company: 'Company',
      emailType: 'Email Type',
      message: 'Message',
      smsMessage: 'SMS Message',
      delivered: 'Delivered',
      failed: 'Failed',
      pending: 'Pending'
    },
    subscriptions: {
      title: 'Subscription Management',
      noSubscriptions: 'No subscriptions found',
      noSubscriptionsAdmin: 'There are no active subscriptions in the system yet.',
      refresh: 'Refresh',
      refreshing: 'Refreshing...',
      adminEmail: 'Admin Email',
      subscriptionStatus: 'Subscription Status',
      periodEnd: 'Period End',
      autoRenewal: 'Auto Renewal',
      actions: 'Actions',
      cancel: 'Cancel',
      cancelImmediate: 'Cancel Now',
      cancelAtPeriod: 'Cancel at Period End',
      keepSubscription: 'Keep Subscription',
      confirmCancellation: 'Confirm Cancellation',
      cancelling: 'Cancelling...',
      cancelReason: 'Reason for cancellation (optional)',
      cancelReasonPlaceholder: 'Please tell us why you\'re cancelling...',
      cancelWarning: {
        title: 'Important Information',
        message: 'Access to all features will continue until the end of the current billing period.'
      },
      cancelImmediateWarning: {
        title: 'Warning: Immediate Cancellation',
        message: 'This action cannot be undone. The user will lose access immediately and no refund will be issued.'
      },
      yes: 'Yes',
      no: 'No (Cancels at period end)',
      na: 'N/A',
      superadmin: 'Superadmin',
      active: 'Active',
      trial: 'Trial',
      pastDue: 'Past Due',
      canceled: 'Canceled',
      notStarted: 'Not Started',
      paymentMethod: 'Payment Method',
      currentPeriod: 'Current Period',
      manageSubscription: 'Manage Subscription',
      viewPricingPlans: 'View Pricing Plans',
      noActiveSubscription: 'No Active Subscription',
      noSubscriptionMessage: 'You don\'t have an active subscription at the moment.',
      superadminAccount: 'Superadmin Account',
      fullAccess: 'As a superadmin, you have full access to all features without requiring a subscription.',
      upgradeSubscription: 'Upgrade Plan',
      needSuperadminPrivileges: 'You need superadmin privileges to access this section.',
      yourSubscription: 'Your Subscription',
      manage: 'Manage',
      loading: 'Loading subscriptions...',
      processingCancellation: 'Processing cancellation...',
      contactSupport: 'Contact Support',
      renewalDate: 'Renewal Date',
      subscriptionInfo: 'Subscription Information',
      paymentDetails: 'Payment Details',
      billingAddress: 'Billing Address',
      paymentHistory: 'Payment History',
      currentUsage: 'Current Usage',
      planDetails: 'Plan Details',
      updatePlan: 'Update Plan',
      changePlan: 'Change Plan',
      currentUser: 'You'
    },
    stats: {
      averageRating: 'Average rating',
      totalReviews: 'Total reviews',
      totalCompanies: 'Total companies',
      conversionRate: 'Conversion rate',
      increase: 'increase',
      decrease: 'decrease',
      title: 'Statistics',
      period: 'in selected period',
      completedOf: '{completed} of {total} reviews',
      contactInfo: 'Contact Information',
      withEmail: 'With Email',
      withPhone: 'With Phone',
      contactRate: 'Contact Rate',
      timeMetrics: 'Time Metrics',
      today: 'Today',
      yesterday: 'Yesterday',
      thisWeek: 'This Week',
      completionMetrics: 'Performance Metrics',
      completedReviews: 'Completed Reviews',
      googleRedirects: 'Google Redirects',
      redirectRate: 'Redirect Rate',
      ratingDistribution: 'Rating Distribution',
      highRatings: 'High Ratings (4-5)',
      lowRatings: 'Low Ratings (1-3)',
      totalReviewsInPeriod: 'Total reviews in period',
      noReviewsInRange: 'No reviews found in the selected date range'
    },
    reviews: {
      title: 'Reviews',
      date: 'Date',
      rating: 'Rating',
      company: 'Company',
      contact: 'Contact',
      comment: 'Comment',
      tasks: 'Tasks',
      completed: 'Completed',
      loading: 'Loading...',
      noReviews: 'No reviews found',
      search: 'Search reviews...',
      allCompanies: 'All Companies'
    },
    company: {
      name: 'Company Name',
      googleLink: 'Google Link',
      statistics: 'Company Statistics',
      id: 'Company ID',
      reviewLink: 'Review Link',
      created: 'Created',
      back: 'Back to Companies',
      viewOnGoogle: 'View on Google',
      exportCsv: 'Export CSV',
      ratingDistribution: 'Rating Distribution',
      recentReviews: 'Recent Reviews',
      averageRating: 'Average Rating',
      totalReviews: 'Total Reviews',
      conversionRate: 'Conversion Rate',
      createdAt: 'Created At',
      dropOffAnalysis: 'Drop-off Analysis',
      dropOffPoints: 'Drop-off Points',
      flowAnalysis: 'Flow Analysis',
      highRatingFlow: 'High Rating Flow (4-5★)',
      lowRatingFlow: 'Low Rating Flow (1-3★)',
      completionRate: 'Completion Rate',
      dropOffRate: 'Drop-off Rate',
      googleRedirects: 'Google Redirects',
      edit: 'Edit',
      delete: 'Delete',
      deleteTitle: 'Delete Company',
      deleteConfirm: 'Are you sure you want to delete this company? This action cannot be undone.',
      deleteConfirmMessage: 'This action cannot be undone.',
      deleteConfirmButton: 'Yes, Delete',
      deleteCancelButton: 'Cancel',
      editTitle: 'Edit Company',
      editCompanyInfo: 'Company Information',
      colorScheme: 'Color Scheme',
      colorSchemes: {
        indigo: 'Indigo',
        emerald: 'Emerald',
        amber: 'Amber',
        rose: 'Rose',
        bw: 'Black & White'
      },
      logo: {
        title: 'Logo',
        upload: 'Upload Logo',
        requirements: 'PNG, JPG or WebP up to 2MB'
      },
      gift: {
        title: 'Gift Description',
        description: 'Description of the gift the customer will receive after submitting a review (optional)',
        placeholder: 'e.g. 10% discount on your next visit'
      },
      form: {
        name: 'Company Name',
        namePlaceholder: 'Enter company name',
        googleLink: 'Google Link',
        googleLinkPlaceholder: 'https://g.page/...',
        logo: 'Logo URL',
        logoRequirements: 'URL to company logo',
        gift: {
          title: 'Gift Description',
          description: 'Description of the gift for reviews (optional)',
          placeholder: 'e.g. 10% discount on your next visit'
        },
        couponType: {
          title: 'Reward Type',
          description: 'Choose the type of reward that customers will receive after submitting a review',
          coupon: {
            title: 'Coupon for each review',
            description: 'Customer receives a coupon code after completing a review'
          },
          lottery: {
            title: 'Lottery drawing',
            description: 'Customers enter a drawing for prizes instead of receiving immediate coupons'
          },
          none: {
            title: 'No rewards',
            description: 'Do not collect contact information or provide rewards'
          }
        },
        cancel: 'Cancel',
        save: 'Save Changes',
        saving: 'Saving...',
        add: 'Add Company',
        adding: 'Adding...',
        editDescription: 'Edit company details below.',
        description: 'Create a new company by filling out the form below.'
      },
      actions: 'Actions',
      editAction: 'Edit',
      deleteAction: 'Delete',
      socialTasks: {
        title: 'Social Media',
        add: 'Add social media',
        platform: 'Platform',
        platformPlaceholder: 'Platform name',
        url: 'URL',
        urlPlaceholder: 'https://...',
        remove: 'Remove',
        noTasks: 'No social media added'
      },
      notifications: {
        title: 'Notifications',
        description: 'Configure which notifications are sent to customers',
        sms: {
          title: 'SMS Notifications',
          description: 'Configure which SMS messages are sent to customers',
          coupon: {
            label: 'Send SMS with coupon code after review',
            description: 'Customer will receive an SMS with their coupon code after submitting a review'
          },
          google: {
            label: 'Send SMS with Google review link',
            description: 'Customer will receive an SMS with a link to leave a Google review'
          },
          sendAfter: 'Send after',
          minutes: 'minutes'
        },
        email: {
          title: 'Email Notifications',
          description: 'Configure which emails are sent to customers',
          thankYou: {
            label: 'Send thank you email after review',
            description: 'Customer will receive a thank you email after submitting a review'
          },
          coupon: {
            label: 'Send email with coupon code',
            description: 'Customer will receive an email with their coupon code'
          },
          reviewReminder: {
            label: 'Send review reminder email',
            description: 'Send a reminder email if the customer hasn\'t completed their review'
          },
          googleReview: {
            label: 'Send Google review request email',
            description: 'Send an email asking the customer to leave a Google review'
          },
          sendAfter: 'Send after',
          minutes: 'minutes'
        }
      }
    }
  }
};