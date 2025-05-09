/**
 * Utility functions for validating review form data
 */

/**
 * Validates form data for review submission
 * @param email Email address
 * @param phone Phone number
 * @param validateContactInfo Function to validate contact info
 * @returns Error message or null if valid
 */
export const validateForm = (
  email: string,
  phone: string,
  validateContactInfo: (email: string, phone: string) => string | null
): string | null => {
  console.log('🔍 validateForm: Starting validation', { 
    emailProvided: !!email, 
    phoneProvided: !!phone,
    emailLength: email?.length || 0,
    phoneLength: phone?.length || 0,
    timestamp: new Date().toISOString()
  });
  
  // At least one contact method is required
  if (!email.trim() && !phone.trim()) {
    console.error('🚨 validateForm: No contact method provided', {
      timestamp: new Date().toISOString()
    });
    return 'Please provide either email or phone number';
  }
  
  // Validate email format if provided
  if (email.trim()) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      console.error('🚨 validateForm: Invalid email format', {
        timestamp: new Date().toISOString()
      });
      return 'Please enter a valid email address';
    }
  }
  
  // Validate phone format if provided
  if (phone.trim()) {
    const phoneRegex = /^[+]?[0-9\s()-]{8,15}$/;
    if (!phoneRegex.test(phone.trim())) {
      console.error('🚨 validateForm: Invalid phone format', {
        timestamp: new Date().toISOString()
      });
      return 'Please enter a valid phone number';
    }
  }
  
  console.log('✅ validateForm: Validation successful', {
    timestamp: new Date().toISOString()
  });
  
  return null;
};