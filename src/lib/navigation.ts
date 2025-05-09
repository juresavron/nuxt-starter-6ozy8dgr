/**
 * Navigation utility functions
 */

/**
 * Navigates to the admin panel
 */
export const navigateToAdmin = (): void => {
  window.location.href = '/admin';
};

/**
 * Navigates to the login page
 */
export const navigateToLogin = (): void => {
  window.location.href = '/login';
};

/**
 * Navigates to the home page
 */
export const navigateToHome = (): void => {
  window.location.href = '/home';
};

/**
 * Navigates to a specific URL
 * @param url URL to navigate to
 */
export const navigateTo = (url: string): void => {
  window.location.href = url;
};