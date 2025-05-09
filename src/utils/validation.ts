/**
 * Validation utility functions
 */

/**
 * Checks if a string is a valid UUID
 * @param str String to check
 * @returns Boolean indicating if string is a valid UUID
 */
export const isValidUUID = (str: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

/**
 * Validates email format
 * @param email Email address to validate
 * @returns Boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number format
 * @param phone Phone number to validate
 * @returns Boolean indicating if phone is valid
 */
export const isValidPhone = (phone: string): boolean => {
  // Allow various phone formats with optional country code
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  const normalizedPhone = phone.replace(/\s/g, '');
  return phoneRegex.test(normalizedPhone);
};

/**
 * Checks if an array is non-empty
 * @param arr Array to check
 * @returns Boolean indicating if array is non-empty
 */
export const isNonEmptyArray = <T>(arr: T[] | null | undefined): arr is T[] => {
  return Array.isArray(arr) && arr.length > 0;
};

/**
 * Truncates text to a specified length and adds ellipsis if needed
 * @param text Text to truncate
 * @param maxLength Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Validates a URL
 * @param url URL to validate
 * @returns Boolean indicating if URL is valid
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Checks if a value is defined (not null or undefined)
 * @param value Value to check
 * @returns Boolean indicating if value is defined
 */
export const isDefined = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

/**
 * Checks if a string is empty or whitespace only
 * @param str String to check
 * @returns Boolean indicating if string is empty
 */
export const isEmpty = (str: string | null | undefined): boolean => {
  return !str || str.trim() === '';
};

/**
 * Sanitizes a string for safe display
 * @param str String to sanitize
 * @returns Sanitized string
 */
export const sanitizeString = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Validates a password
 * @param password Password to validate
 * @returns Boolean indicating if password is valid
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

/**
 * Validates that two passwords match
 * @param password Password
 * @param confirmPassword Confirmation password
 * @returns Boolean indicating if passwords match
 */
export const passwordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

/**
 * Validates a username
 * @param username Username to validate
 * @returns Boolean indicating if username is valid
 */
export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

/**
 * Formats a phone number for display
 * @param phone Phone number to format
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  // Simple formatting - can be expanded based on requirements
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};

/**
 * Formats a currency value
 * @param value Value to format
 * @param currency Currency code
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, currency: string = 'EUR'): string => {
  return new Intl.NumberFormat('sl-SI', {
    style: 'currency',
    currency
  }).format(value);
};