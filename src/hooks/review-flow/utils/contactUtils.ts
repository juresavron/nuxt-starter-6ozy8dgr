import { updateContactInfo, verifyContactUpdate } from '../../../utils/reviews/contactUpdate';

/**
 * Updates contact information for a review and verifies the update
 * @param reviewId Review ID to update
 * @param email Email address
 * @param phone Phone number
 * @returns Object with success status and error message if any
 */
export const updateAndVerifyContact = async (
  reviewId: string,
  email?: string | null,
  phone?: string | null
): Promise<{ success: boolean; error?: string; data?: any }> => {
  try {
    // Update contact information
    const updateResult = await updateContactInfo(reviewId, email, phone);
    
    if (!updateResult.success) {
      return updateResult;
    }
    
    // Verify the update was successful
    const verificationData = await verifyContactUpdate(reviewId);
    
    if (!verificationData) {
      return { 
        success: false, 
        error: 'Failed to verify contact information update' 
      };
    }
    
    return { 
      success: true, 
      data: verificationData 
    };
  } catch (err) {
    console.error('Error in updateAndVerifyContact:', err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'Failed to update and verify contact information' 
    };
  }
};

/**
 * Formats contact information for display or logging
 * @param email Email address
 * @param phone Phone number
 * @returns Formatted contact info string
 */
export const formatContactInfo = (email?: string | null, phone?: string | null): string => {
  const parts = [];
  
  if (email) {
    // Mask email for privacy in logs
    const maskedEmail = maskEmail(email);
    parts.push(`Email: ${maskedEmail}`);
  }
  
  if (phone) {
    // Mask phone for privacy in logs
    const maskedPhone = maskPhone(phone);
    parts.push(`Phone: ${maskedPhone}`);
  }
  
  return parts.join(', ') || 'No contact info provided';
};

/**
 * Masks an email address for privacy in logs
 * @param email Email address to mask
 * @returns Masked email
 */
export const maskEmail = (email: string): string => {
  if (!email) return '';
  
  const [username, domain] = email.split('@');
  
  if (!username || !domain) return email;
  
  const maskedUsername = username.length > 3
    ? `${username.substring(0, 3)}...`
    : username;
    
  return `${maskedUsername}@${domain}`;
};

/**
 * Masks a phone number for privacy in logs
 * @param phone Phone number to mask
 * @returns Masked phone number
 */
export const maskPhone = (phone: string): string => {
  if (!phone) return '';
  
  const digits = phone.replace(/\D/g, '');
  
  if (digits.length <= 4) return phone;
  
  const lastFour = digits.slice(-4);
  const maskedDigits = digits.slice(0, -4).replace(/./g, '*');
  
  return `${maskedDigits}${lastFour}`;
};