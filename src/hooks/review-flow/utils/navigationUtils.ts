/**
 * Utility functions for navigation in the review flow
 */

/**
 * Redirects to thank you page
 * @param companyId Company ID for the URL
 * @param rating Rating for the URL
 * @param navigate React Router navigate function (optional)
 */
export const navigateToThankYou = (
  companyId?: string,
  rating?: number,
  navigate?: (path: string) => void
): void => {
  const url = `/thank-you?companyId=${companyId}&rating=${rating}`;
  console.log('navigateToThankYou: Navigating to thank you page', { url });
  
  if (navigate) {
    navigate(url);
  } else {
    // Fallback if navigate function is not provided
    window.location.href = url;
  }
};

/**
 * Redirects to gamification page
 * @param companyId Company ID for the URL
 * @param rating Rating for the URL
 * @param reviewId Review ID for the URL
 * @param navigate React Router navigate function (optional)
 */
export const navigateToGamification = (
  companyId?: string,
  rating?: number,
  reviewId?: string | null,
  navigate?: (path: string) => void
): void => {
  const url = `/gamification?companyId=${companyId}&rating=${rating}&reviewId=${reviewId}`;
  console.log('navigateToGamification: Navigating to gamification page', { url });
  
  if (navigate) {
    navigate(url);
  } else {
    // Fallback if navigate function is not provided
    window.location.href = url;
  }
};