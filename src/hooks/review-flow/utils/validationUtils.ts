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
export const validateFormData = (
  email: string,
  phone: string,
  validateContactInfo: (email: string, phone: string) => string | null
): string | null => {
  console.log('🔍 validateFormData: Starting validation', { 
    emailProvided: !!email, 
    phoneProvided: !!phone,
    emailLength: email?.length || 0,
    phoneLength: phone?.length || 0,
    timestamp: new Date().toISOString()
  });
  
  // At least one contact method is required
  if (!email.trim() && !phone.trim()) {
    console.error('🚨 validateFormData: No contact method provided', {
      timestamp: new Date().toISOString()
    });
    return 'Please provide either email or phone number';
  }
  
  // Validate email format if provided
  if (email.trim()) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      console.error('🚨 validateFormData: Invalid email format', {
        timestamp: new Date().toISOString()
      });
      return 'Please enter a valid email address';
    }
  }
  
  // Validate phone format if provided
  if (phone.trim()) {
    // Simple phone validation - can be enhanced based on requirements
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    const normalizedPhone = phone.trim().replace(/\s/g, '');
    if (!phoneRegex.test(normalizedPhone)) {
      console.error('🚨 validateFormData: Invalid phone format', {
        timestamp: new Date().toISOString()
      });
      return 'Please enter a valid phone number';
    }
  }
  
  console.log('✅ validateFormData: Validation successful', {
    timestamp: new Date().toISOString()
  });
  
  return null;
};