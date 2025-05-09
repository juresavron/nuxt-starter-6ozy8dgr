/**
 * Type definitions for lottery modals
 */

export interface LotteryDrawProps {
  companyId: string;
  companyName: string;
  isDrawing: boolean;
}

export interface ModalHeaderProps {
  title: string;
  icon?: React.ReactNode;
  description?: string;
}

export interface ModalContentProps {
  children: React.ReactNode;
}

export interface ModalFooterProps {
  onCancel: () => void;
  onConfirm: () => void;
  cancelText: string;
  confirmText: string;
  isLoading: boolean;
  loadingText?: string;
}

export interface WarningMessageProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

export interface LoadingIndicatorProps {
  message: string;
  color?: string;
}

export interface LotteryWinner {
  id: string;
  company_id: string;
  review_id: string;
  email: string | null;
  phone: string | null;
  is_winner: boolean;
  won_at: string | null;
  prize_claimed: boolean;
  prize_claimed_at: string | null;
  entry_date: string;
  coupon?: {
    coupon_code: string;
    discount_amount: number;
    discount_type: string;
    expires_at: string | null;
  };
}

export interface LotteryFilterOptions {
  searchTerm: string;
  filterWinner: boolean | null;
  filterCompany: string | null;
  filterDateFrom: Date | null;
  filterDateTo: Date | null;
}

export interface ExportOptions {
  format: 'csv' | 'json';
  includeAll: boolean;
  dateRange: [Date | null, Date | null];
}

export interface Company {
  id: string;
  name: string;
  coupon_type?: string;
  lottery_drawing_frequency?: string;
  lottery_drawing_day?: number;
  next_drawing_date?: string;
  last_drawing_date?: string;
}