import React from 'react';
import type { ModalContentProps } from './types';

/**
 * Content component for lottery modals
 */
const LotteryModalContent: React.FC<ModalContentProps> = ({
  children
}) => {
  return (
    <div className="space-y-4">
      {children}
    </div>
  );
};

export default LotteryModalContent;