/**
 * Get thank you SMS template based on rating
 * @param companyName Company name
 * @param rating Review rating (1-5)
 * @returns SMS message content
 */
export const getThankYouSMSTemplate = (
  companyName: string,
  rating: number
): string => {
  // Determine template based on rating
  if (rating >= 4) {
    // High rating template (4-5 stars)
    return `Hvala za vašo odlično oceno podjetja ${companyName}! Vaše mnenje nam veliko pomeni. Veselimo se vašega ponovnega obiska!`;
  } else {
    // Low rating template (1-3 stars)
    return `Hvala za vaše povratne informacije o podjetju ${companyName}. Vaše mnenje nam pomaga, da se izboljšamo. Obljubimo, da bomo naredili vse za boljšo izkušnjo.`;
  }
};

export default getThankYouSMSTemplate;