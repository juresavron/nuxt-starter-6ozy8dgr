/**
 * Get coupon SMS template
 * @param companyName Company name
 * @param couponCode Coupon code
 * @param discount Formatted discount (e.g. "10%" or "5€")
 * @returns SMS message content
 */
export const getCouponSMSTemplate = (
  companyName: string,
  couponCode: string,
  discount: string
): string => {
  return `Hvala za vašo oceno! Vaš kupon za ${discount} popust pri ${companyName} je: ${couponCode}. Uporabite ga ob naslednjem obisku.`;
};

export default getCouponSMSTemplate;