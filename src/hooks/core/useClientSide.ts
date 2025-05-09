import * as React from 'react';

/**
 * Hook to detect if we're running on the client side
 * Returns true if we're on the client, false during SSR
 */
export const useClientSide = (): boolean => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  return isClient;
};