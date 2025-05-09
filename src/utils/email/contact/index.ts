import sendEmail from '../core/sendEmail';
import { logEmailSent } from '../core/logging';
import { getContactConfirmationEmailTemplate } from './templates';

/**
 * Send a contact form confirmation email
 * @param email Recipient email address
 * @param name Customer name
 * @param message Original message from contact form
 * @returns Success status
 */
export const sendContactConfirmationEmail = async (
  email: string,
  name: string,
  message: string
): Promise<boolean> => {
  try {
    // Get email template
    const { subject, html } = getContactConfirmationEmailTemplate(name, message);
    
    // Send email
    const success = await sendEmail(email, subject, html);
    
    if (success) {
      // Log email sent
      await logEmailSent(
        email,
        subject,
        html,
        'contact_confirmation_email',
        undefined,
        undefined,
        { name, messageLength: message.length }
      );
    }
    
    return success;
  } catch (error) {
    console.error('Error sending contact confirmation email:', error);
    return false;
  }
}

export default sendContactConfirmationEmail;