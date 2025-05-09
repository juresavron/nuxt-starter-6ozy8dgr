/**
 * Get coupon email template
 * @param companyName Company name
 * @param couponCode Coupon code
 * @param discount Formatted discount (e.g. "10%" or "5€")
 * @param expiresAt Optional expiration date
 * @returns Email subject and HTML content
 */
export const getCouponEmailTemplate = (
  companyName: string,
  couponCode: string,
  discount: string,
  expiresAt?: string
): { subject: string; html: string } => {
  // Format expiration date
  const expirationText = expiresAt 
    ? `Ta kupon poteče ${new Date(expiresAt).toLocaleDateString('sl-SI')}.`
    : 'Ta kupon nima datuma poteka.';

  return {
    subject: `Vaš ${discount} kupon za popust pri ${companyName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #3b82f6; margin-bottom: 10px;">Vaš kupon za popust</h1>
          <p style="color: #4b5563; font-size: 16px;">Hvala za vaše povratne informacije!</p>
        </div>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
          <p style="font-size: 14px; color: #6b7280; margin-bottom: 10px;">Vaša koda za popust:</p>
          <div style="background-color: white; padding: 15px; border-radius: 6px; border: 1px dashed #d1d5db; margin-bottom: 15px;">
            <p style="font-family: monospace; font-size: 24px; font-weight: bold; color: #1f2937; margin: 0;">${couponCode}</p>
          </div>
          <p style="font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 5px;">
            ${discount} POPUSTA
          </p>
          <p style="font-size: 14px; color: #6b7280;">
            pri ${companyName}
          </p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
            Ob vašem naslednjem obisku pri ${companyName} predložite to kodo za popust.
            ${expirationText}
          </p>
        </div>
        
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px;">
            To sporočilo ste prejeli, ker ste ob oddaji ocene posredovali svoj e-poštni naslov.
            Če imate kakršna koli vprašanja, se obrnite neposredno na ${companyName}.
          </p>
        </div>
      </div>
    `
  };
};

export default getCouponEmailTemplate;