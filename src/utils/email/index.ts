import { sendThankYouEmail } from './thank-you';
import { sendCouponEmail } from './coupon';
import { sendGoogleReviewEmail } from './google';
import { sendReviewReminderEmail } from './review';
import { sendContactConfirmationEmail } from './contact';
import { logEmailSent } from './core/logging';

export {
  sendThankYouEmail,
  sendCouponEmail,
  sendGoogleReviewEmail,
  sendReviewReminderEmail,
  sendContactConfirmationEmail,
  logEmailSent
};

/**
 * Main email utility functions
 * This file exports all email-related functions from various modules
 */