/**
 * Main hooks entry point
 * Re-exports all hooks for easy imports
 */

// Core hooks
export * from './core/useClientSide';
export * from './core/useLanguageStore';
export * from './core/useTranslations';
export * from './core/useFormValidation';

// Auth hooks
export * from './auth/useAuth';
export * from './auth/useRoleCheck';
export * from './auth/types';

// Feature-specific hooks
export * from './admin';
export * from './review-flow';
export * from './gamification';

// UI hooks
export * from './ui/useScrollLock';
export * from './ui/usePreventIOSSwipeBack';
export * from './ui/usePreventBackNavigation';

// Utility hooks
export * from './utils/useCompanyData';
export * from './utils/useConfirmDelete';
export * from './utils/useCompanyFeedbackOptions';
export * from './utils/useIndustryData';
export * from './utils/usePricing';
export * from './utils/useNavigation';