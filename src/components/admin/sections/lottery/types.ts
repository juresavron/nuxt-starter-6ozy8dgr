/**
 * Types for lottery entries components
 */

export interface LotteryEntry {
  id: string;
  company_id: string;
  review_id: string;
  email: string | null;
  phone: string | null;
  entry_date: string;
  is_winner: boolean;
  won_at: string | null;
  prize_claimed: boolean;
  prize_claimed_at: string | null;
}

export interface Company {
  id: string;
  name: string;
  coupon_type: string;
  lottery_drawing_frequency?: string;
  lottery_drawing_day?: number;
  next_drawing_date?: string;
  last_drawing_date?: string;
}

export interface LotteryTranslations {
  title?: string;
  noEntries?: string;
  refresh?: string;
  refreshing?: string;
  search?: string;
  filterAll?: string;
  filterWinners?: string;
  filterNonWinners?: string;
  filterCompany?: string;
  export?: string;
  entryDate?: string;
  company?: string;
  contact?: string;
  status?: string;
  actions?: string;
  winner?: string;
  notWinner?: string;
  claimed?: string;
  notClaimed?: string;
  loading?: string;
  drawWinner?: string;
  drawWinnerConfirm?: string;
  drawWinnerSuccess?: string;
  drawing?: string;
  confirmDraw?: string;
  drawingInProgress?: string;
  drawForCompany?: string;
  markAsWinner?: string;
  markAsClaimed?: string;
  nextDrawing?: string;
  drawWinnerWarning?: {
    title?: string;
    message?: string;
  };
  drawingFrequency?: {
    daily?: string;
    weekly?: string;
    monthly?: string;
  };
}