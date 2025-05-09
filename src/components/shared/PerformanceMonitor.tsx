import React from 'react';

/**
 * Performance monitoring wrapper component
 * Currently a passthrough as monitoring is disabled
 */
const PerformanceMonitor: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default PerformanceMonitor;