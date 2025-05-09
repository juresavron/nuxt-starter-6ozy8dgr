/**
 * Types for communications components
 */

export interface EmailLog {
  id: string;
  recipient: string;
  subject: string;
  content: string;
  template_name: string;
  status: string;
  sent_at: string;
  company_id?: string;
  company_name?: string;
  metadata?: Record<string, any>;
}

export interface SMSLog {
  id: string;
  recipient: string;
  content: string;
  status: string;
  sent_at: string;
  company_id?: string;
  company_name?: string;
  metadata?: Record<string, any>;
}

export interface CommunicationsTranslations {
  title?: string;
  email?: string;
  sms?: string;
  refresh?: string;
  refreshing?: string;
  loading?: string;
  noEmails?: string;
  noEmailsMessage?: string;
  noSMS?: string;
  noSMSMessage?: string;
  recipient?: string;
  company?: string;
  emailType?: string;
  message?: string;
  smsMessage?: string;
  delivered?: string;
  failed?: string;
  pending?: string;
}