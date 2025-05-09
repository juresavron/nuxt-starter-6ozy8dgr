/**
 * Export all authentication initialization hooks
 */

// Named exports for individual hooks
export { useNetworkConnection } from './useNetworkConnection';
export { useSupabaseConnection } from './useSupabaseConnection';

// Export default hook under a named alias
export { default as useAuthInitialization } from './useAuthInitialization';
export { default as useAdminAuthInitializer } from './useAdminAuthInitializer';