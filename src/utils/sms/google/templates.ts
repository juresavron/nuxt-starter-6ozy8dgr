/**
 * Get Google review SMS template
 * @param companyName Company name
 * @param googleLink Google review link
 * @returns SMS message content
 */
export const getGoogleReviewSMSTemplate = (
  companyName: string,
  googleLink: string
): string => {
  return `Hvala za vašo oceno podjetja ${companyName}! Bi nam lahko pomagali še korak naprej? Delite svoje mnenje na Google: ${googleLink}`;
};

export default getGoogleReviewSMSTemplate;