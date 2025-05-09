/**
 * Get Google review email template
 * @param companyName Company name
 * @param googleLink Google review link
 * @returns Email subject and HTML content
 */
export const getGoogleReviewEmailTemplate = (
  companyName: string,
  googleLink: string
): { subject: string; html: string } => {
  return {
    subject: `Delite svoje mnenje o ${companyName} na Google`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #3b82f6; margin-bottom: 10px;">Vaše mnenje šteje!</h1>
          <p style="color: #4b5563; font-size: 16px;">Hvala, da ste si vzeli čas za oceno podjetja ${companyName}.</p>
        </div>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="font-size: 16px; color: #1f2937; margin-bottom: 15px;">
            Bi nam lahko pomagali še korak naprej?
          </p>
          <p style="font-size: 16px; color: #1f2937; margin-bottom: 15px;">
            Vaše mnenje na Google bi nam zelo pomagalo, da dosežemo več strank in izboljšamo naše storitve.
          </p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="${googleLink}" style="display: inline-block; background-color: #4285F4; color: white; font-weight: bold; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px;">Ocenite nas na Google</a>
          </div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
            Potrebujete le minuto časa, vaša ocena pa nam bo zelo pomagala.
          </p>
          <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
            Hvala za vašo podporo!
          </p>
          <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
            Ekipa ${companyName}
          </p>
        </div>
        
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px;">
            To sporočilo ste prejeli, ker ste ob oddaji ocene posredovali svoj e-poštni naslov.
          </p>
        </div>
      </div>
    `
  };
};

export default getGoogleReviewEmailTemplate;