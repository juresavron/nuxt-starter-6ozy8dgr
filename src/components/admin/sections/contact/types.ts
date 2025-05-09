/**
 * Types for contact requests components
 */

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string;
  message: string;
  created_at: string;
  status: string | null;
}

export interface ContactTranslations {
  title?: string;
  noRequests?: string;
  refresh?: string;
  refreshing?: string;
  delete?: string;
  deleteConfirm?: string;
  markAsHandled?: string;
  reply?: string;
  status?: {
    new?: string;
    handled?: string;
  };
  loading?: string;
}