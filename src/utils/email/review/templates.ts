/**
 * Get review reminder email template
 * @param companyName Company name
 * @param reviewLink Review link
 * @returns Email subject and HTML content
 */
export const getReviewReminderEmailTemplate = (
  companyName: string,
  reviewLink: string
): { subject: string; html: string } => {
  return {
    subject: `Dokončajte vašo oceno podjetja ${companyName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #3b82f6; margin-bottom: 10px;">Dokončajte vašo oceno</h1>
          <p style="color: #4b5563; font-size: 16px;">Opazili smo, da niste dokončali svoje ocene podjetja ${companyName}.</p>
        </div>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="font-size: 16px; color: #1f2937; margin-bottom: 15px;">
            Vaše mnenje nam je pomembno in pomaga pri izboljšanju naših storitev.
          </p>
          <p style="font-size: 16px; color: #1f2937; margin-bottom: 15px;">
            Prosimo, vzemite si trenutek in dokončajte svojo oceno.
          </p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="${reviewLink}" style="display: inline-block; background-color: #3b82f6; color: white; font-weight: bold; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px;">Dokončajte oceno</a>
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
            To sporočilo ste prejeli, ker ste začeli z oddajo ocene za podjetje ${companyName}.
            Če ne želite prejemati teh obvestil, preprosto ignorirajte to sporočilo.
          </p>
        </div>
      </div>
    `
  };
};

export default getReviewReminderEmailTemplate;