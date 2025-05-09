/**
 * Utility for prefetching routes and resources
 */

import { preloadRoute } from './lazyLoad';

/**
 * Prefetches routes based on user navigation patterns
 * @param currentRoute Current route path
 */
export function prefetchLikelyRoutes(currentRoute: string): void {
  // Define likely next routes based on current route
  const likelyNextRoutes: Record<string, string[]> = {
    '/': ['/login', '/review'],
    '/domov': ['/login', '/review'],
    '/login': ['/admin'],
    '/admin': ['/admin/companies'],
    '/review': ['/thank-you', '/gamification'],
    '/gamification': ['/thank-you']
  };
  
  // Get likely next routes for current route
  const routesToPrefetch = likelyNextRoutes[currentRoute] || [];
  
  // Prefetch each route
  routesToPrefetch.forEach(route => {
    preloadRoute(route);
  });
}

/**
 * Prefetches resources for visible links on the page
 */
export function prefetchVisibleLinks(): void {
  // Use Intersection Observer to detect visible links
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const link = entry.target as HTMLAnchorElement;
        const href = link.getAttribute('href');
        
        // Only prefetch internal links
        if (href && href.startsWith('/') && !href.startsWith('//')) {
          preloadRoute(href);
        }
        
        // Stop observing once prefetched
        observer.unobserve(link);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe all links on the page
  document.querySelectorAll('a[href^="/"]').forEach(link => {
    observer.observe(link);
  });
}

/**
 * Initializes prefetching based on user interaction
 */
export function initPrefetching(): void {
  // Prefetch on user interaction (idle)
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      prefetchVisibleLinks();
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      prefetchVisibleLinks();
    }, 2000);
  }
  
  // Prefetch on mouse hover
  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    
    if (link) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith('//')) {
        preloadRoute(href);
      }
    }
  });
}