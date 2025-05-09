import React from 'react';
import { Trophy, Calendar, Mail, Phone, Link, ExternalLink } from 'lucide-react';
import Modal from '../../../shared/Modal';
import Button from '../../../shared/Button';
import { formatDate } from '../../../../utils/date';
import { useTranslations } from '../../../../hooks/useTranslations';

interface LotteryWinner {
  id: string;
  company_id: string;
  review_id: string;
  email: string | null;
  phone: string | null;
  is_winner: boolean;
  won_at: string | null;
  prize_claimed: boolean;
  prize_claimed_at: string | null;
  coupon?: {
    coupon_code: string;
    discount_amount: number;
    discount_type: string;
    expires_at: string | null;
  };
}

interface LotteryWinnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  winner: LotteryWinner | null;
  onMarkAsClaimed: (entryId: string) => Promise<void>;
  isProcessing: boolean;
  companyName: string;
}

/**
 * Modal for viewing lottery winner details
 */
const LotteryWinnerModal: React.FC<LotteryWinnerModalProps> = ({
  isOpen,
  onClose,
  winner,
  onMarkAsClaimed,
  isProcessing,
  companyName
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.lottery || {};
  
  if (!winner) return null;

  const handleMarkAsClaimed = async () => {
    await onMarkAsClaimed(winner.id);
    onClose();
  };

  return (
    <Modal
      title={t?.winnerDetails || 'Lottery Winner Details'}
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      footer={
        <div className="flex justify-end gap-3">
          <Button 
            variant="secondary" 
            onClick={onClose}
            leftIcon={<Link className="h-4 w-4" />}
          >
            {t?.close || 'Close'}
          </Button>
          {!winner.prize_claimed && (
            <Button 
              variant="primary" 
              onClick={handleMarkAsClaimed}
              isLoading={isProcessing}
              leftIcon={<Trophy className="h-4 w-4" />}
            >
              {t?.markAsClaimed || 'Mark as Claimed'}
            </Button>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        {/* Winner badge */}
        <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center mb-3">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-amber-800 mb-1">{t?.winnerTitle || 'Lottery Winner'}</h3>
          <p className="text-amber-600">{companyName}</p>
          {winner.won_at && (
            <div className="flex items-center justify-center gap-1 mt-2 text-xs text-amber-600">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(winner.won_at)}</span>
            </div>
          )}
        </div>
        
        {/* Contact information */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">{t?.contactInformation || 'Contact Information'}</h4>
          <div className="space-y-2">
            {winner.email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">{winner.email}</span>
              </div>
            )}
            {winner.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">{winner.phone}</span>
              </div>
            )}
            {!winner.email && !winner.phone && (
              <p className="text-sm text-gray-500 italic">{t?.noContactInfo || 'No contact information available'}</p>
            )}
          </div>
        </div>
        
        {/* Coupon details */}
        {winner.coupon && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="text-sm font-medium text-blue-700 mb-3">{t?.couponDetails || 'Coupon Details'}</h4>
            <div className="bg-white p-3 rounded-md border border-blue-200 flex items-center justify-between mb-3">
              <div className="font-mono font-medium text-blue-800">{winner.coupon.coupon_code}</div>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<ExternalLink className="h-3 w-3" />}
                className="text-xs"
                onClick={() => navigator.clipboard.writeText(winner.coupon.coupon_code)}
              >
                {t?.copy || 'Copy'}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-xs">
                <span className="text-blue-500 block">{t?.discount || 'Discount'}</span>
                <span className="font-medium text-blue-700">
                  {winner.coupon.discount_amount}
                  {winner.coupon.discount_type === 'percentage' ? '%' : '€'}
                </span>
              </div>
              {winner.coupon.expires_at && (
                <div className="text-xs">
                  <span className="text-blue-500 block">{t?.expires || 'Expires'}</span>
                  <span className="font-medium text-blue-700">{formatDate(winner.coupon.expires_at)}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Prize status */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">{t?.prizeStatus || 'Prize Status'}</h4>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${winner.prize_claimed ? 'bg-green-500' : 'bg-amber-500'}`}></div>
            <span className="text-sm text-gray-700">
              {winner.prize_claimed 
                ? `${t?.claimed || 'Claimed'} ${winner.prize_claimed_at ? `(${formatDate(winner.prize_claimed_at)})` : ''}`
                : t?.notClaimed || 'Not Claimed'}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LotteryWinnerModal;