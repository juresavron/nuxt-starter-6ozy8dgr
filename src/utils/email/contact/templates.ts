/**
 * Get contact form confirmation email template
 * @param name Customer name
 * @param message Original message from contact form
 * @returns Email subject and HTML content
 */
export const getContactConfirmationEmailTemplate = (
  name: string,
  message: string
): { subject: string; html: string } => {
  return {
    subject: `Potrditev prejema vašega sporočila`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #3b82f6; margin-bottom: 10px;">Prejeli smo vaše sporočilo</h1>
          <p style="color: #4b5563; font-size: 16px;">Hvala za vaše sporočilo, ${name}!</p>
        </div>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="font-size: 16px; color: #1f2937; margin-bottom: 15px;">
            Prejeli smo vaše sporočilo in vam bomo odgovorili v najkrajšem možnem času.
          </p>
          <p style="font-size: 16px; color: #1f2937; margin-bottom: 15px;">
            Za referenco, tukaj je kopija vašega sporočila:
          </p>
          <div style="background-color: white; padding: 15px; border-radius: 6px; border: 1px solid #e5e7eb; margin-top: 10px;">
            <p style="color: #4b5563; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
            Če imate kakršna koli dodatna vprašanja, nas lahko kontaktirate neposredno na info@ocenagor.si.
          </p>
          <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
            Lep pozdrav,
          </p>
          <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
            Ekipa ocenagor.si
          </p>
        </div>
        
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px;">
            To sporočilo ste prejeli, ker ste izpolnili kontaktni obrazec na naši spletni strani.
          </p>
        </div>
      </div>
    `
  };
};

export default getContactConfirmationEmailTemplate;