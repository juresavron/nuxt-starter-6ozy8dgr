/**
 * Types for AI-generated content
 */

/**
 * Request parameters for AI email generation
 */
export interface AIEmailGenerationRequest {
  companyName: string;
  rating: number;
  comment?: string;
  email: string;
  selectedIssues?: string[];
  emailType?: string;
  language?: string;
  giftDescription?: string;
}

/**
 * Request parameters for AI SMS generation
 */
export interface AISMSGenerationRequest {
  companyName: string;
  rating: number;
  phone: string;
  smsType: 'google_redirect' | 'coupon_code' | 'thank_you';
  comment?: string;
  selectedIssues?: string[];
  couponCode?: string;
  googleLink?: string;
  language?: string;
}

/**
 * Response from AI email generation
 */
export interface AIEmailGenerationResponse {
  success: boolean;
  subject: string;
  html: string;
  text: string;
  error?: string;
}

/**
 * Response from AI SMS generation
 */
export interface AISMSGenerationResponse {
  success: boolean;
  message: string;
  error?: string;
}