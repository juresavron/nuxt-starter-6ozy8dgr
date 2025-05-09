/**
 * Utility functions for lazy loading components and resources
 */

import { lazy } from 'react';

/**
 * Enhanced lazy loading with better error handling and retry logic
 * @param factory Function that imports the component
 * @param retries Number of retries on failure
 * @returns Lazy loaded component
 */
export function lazyWithRetry(factory: () => Promise<any>, retries: number = 3) {
  return lazy(async () => {
    let lastError: Error | null = null;
    
    for (let i = 0; i < retries; i++) {
      try {
        return await factory();
      } catch (err) {
        lastError = err as Error;
        console.warn(`Failed to load module, retrying (${i + 1}/${retries})...`, err);
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
      }
    }
    
    // All retries failed
    console.error('Failed to load module after multiple retries', lastError);
    throw lastError;
  });
}

/**
 * Preloads a component to improve perceived performance
 * @param factory Function that imports the component
 */
export function preloadComponent(factory: () => Promise<any>): void {
  factory().catch(err => {
    console.warn('Preloading component failed:', err);
  });
}

/**
 * Preloads an image to improve perceived performance
 * @param src Image source URL
 */
export function preloadImage(src: string): void {
  const img = new Image();
  img.src = src;
}

/**
 * Preloads critical resources for a specific route
 * @param route Route path
 */
export function preloadRoute(route: string): void {
  switch (route) {
    case '/':
    case '/domov':
      // Preload landing page hero image
      preloadImage('https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=2000&h=1000&q=80');
      break;
    case '/admin':
      // Preload admin components
      preloadComponent(() => import('../components/admin/AdminPanel'));
      preloadComponent(() => import('../components/admin/Overview'));
      break;
    case '/review':
      // Preload review components
      preloadComponent(() => import('../components/ReviewFunnel'));
      break;
    default:
      break;
  }
}