/**
 * Get thank you email template based on rating
 * @param companyName Company name
 * @param rating Review rating (1-5)
 * @returns Email subject and HTML content
 */
export const getThankYouEmailTemplate = (
  companyName: string,
  rating: number
): { subject: string; html: string } => {
  // Determine template based on rating
  if (rating >= 4) {
    // High rating template (4-5 stars)
    return {
      subject: `Hvala za vašo odlično oceno podjetja ${companyName}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #3b82f6; margin-bottom: 10px;">Hvala za vašo odlično oceno!</h1>
            <p style="color: #4b5563; font-size: 16px;">Vaše mnenje nam veliko pomeni.</p>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="font-size: 16px; color: #1f2937; margin-bottom: 15px;">
              Pri podjetju ${companyName} smo navdušeni nad vašo oceno! 🎉
            </p>
            <p style="font-size: 16px; color: #1f2937; margin-bottom: 15px;">
              Vaše mnenje nam veliko pomaga in nas motivira, da smo vsak dan še boljši. Hvala, da ste si vzeli čas in delili svojo izkušnjo z nami!
            </p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
              Veselimo se vašega ponovnega obiska!
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
  } else {
    // Low rating template (1-3 stars)
    return {
      subject: `Hvala za vaše povratne informacije o podjetju ${companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #3b82f6; margin-bottom: 10px;">Hvala za vaše povratne informacije</h1>
            <p style="color: #4b5563; font-size: 16px;">Vaše mnenje nam pomaga, da se izboljšamo.</p>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="font-size: 16px; color: #1f2937; margin-bottom: 15px;">
              Pri podjetju ${companyName} cenimo vaše iskreno mnenje.
            </p>
            <p style="font-size: 16px; color: #1f2937; margin-bottom: 15px;">
              Vaše povratne informacije nam bodo pomagale izboljšati našo storitev. Obljubimo, da bomo naredili vse, da bo vaša naslednja izkušnja boljša.
            </p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
              Če želite, nas lahko kontaktirate neposredno za dodatne povratne informacije.
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
  }
};

export default getThankYouEmailTemplate;