import React, { useEffect } from 'react';

interface ThankYouConfettiProps {
  isHighRating: boolean;
  showConfetti: boolean;
  colorScheme?: string;
}

const ThankYouConfetti: React.FC<ThankYouConfettiProps> = ({
  isHighRating,
  showConfetti,
  colorScheme = 'indigo'
}) => {
  // This component is intentionally left empty as confetti is disabled
  // We're keeping the component for future implementation
  return null;
};

export default ThankYouConfetti;