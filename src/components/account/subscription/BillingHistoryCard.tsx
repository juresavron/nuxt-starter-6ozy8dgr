import React from 'react';
import Card from '../../shared/Card';

interface BillingHistoryCardProps {
  title?: string;
  emptyMessage?: string;
}

const BillingHistoryCard: React.FC<BillingHistoryCardProps> = ({
  title = "Zgodovina plačil",
  emptyMessage = "Zgodovina plačil bo na voljo kmalu."
}) => {
  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{title}</h2>
        <div className="text-center text-gray-500 py-6">
          <p>{emptyMessage}</p>
        </div>
      </div>
    </Card>
  );
};

export default BillingHistoryCard;