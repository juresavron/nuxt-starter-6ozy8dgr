import { z } from 'zod';
import type { BlogPostFormData } from '../types/blog';

/**
 * Hook for form validation using Zod
 * @returns Validation functions for different form types
 */
export const useFormValidation = () => {
  /**
   * Validates contact form data
   * @param formData Contact form data
   * @returns Validation result
   */
  const validateContactForm = (formData: {
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    const schema = z.object({
      name: z.string().min(2, 'Name is required'),
      company: z.string().min(2, 'Company name is required'),
      email: z.string().email('Please enter a valid email address'),
      phone: z.string().optional(),
      message: z.string().min(10, 'Please enter a message (at least 10 characters)')
    });

    try {
      schema.parse(formData);
      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { 
          success: false, 
          error: error.errors[0].message 
        };
      }
      return { 
        success: false, 
        error: 'Validation failed' 
      };
    }
  };

  /**
   * Validates contact information (email or phone)
   * @param email Email address
   * @param phone Phone number
   * @returns Error message or null if valid
   */
  const validateContactInfo = (email: string, phone: string): string | null => {
    // Require at least one contact method
    if (!email.trim() && !phone.trim()) {
      return 'Please provide either email or phone number';
    }
    
    // Validate email if provided
    if (email.trim()) {
      const emailSchema = z.string().email('Please enter a valid email address');
      try {
        emailSchema.parse(email);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return error.errors[0].message;
        }
        return 'Invalid email format';
      }
    }
    
    return null;
  };

  /**
   * Validates review form data
   * @param data Review form data
   * @returns Validation result
   */
  const validateReviewForm = (data: {
    rating: number;
    feedback_options?: string[];
    comment?: string;
    email?: string;
    phone?: string;
  }) => {
    const schema = z.object({
      rating: z.number().min(1).max(5),
      feedback_options: z.array(z.string()).optional(),
      comment: z.string().optional(),
      email: z.string().email('Please enter a valid email address').optional().nullable(),
      phone: z.string().optional().nullable()
    });

    try {
      schema.parse(data);
      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { 
          success: false, 
          error: error.errors[0].message 
        };
      }
      return { 
        success: false, 
        error: 'Validation failed' 
      };
    }
  };

  /**
   * Validates gamification form data
   * @param data Gamification form data
   * @returns Validation result
   */
  const validateGamificationForm = (data: {
    email: string;
    phone: string;
  }) => {
    // Require at least one contact method
    if ((!data.email || !data.email.trim()) && (!data.phone || !data.phone.trim())) {
      return { 
        success: false, 
        error: 'Please provide either email or phone number' 
      };
    }
    
    // Validate email if provided
    if (data.email && data.email.trim()) {
      const emailSchema = z.string().email('Please enter a valid email address');
      try {
        emailSchema.parse(data.email);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return { 
            success: false, 
            error: error.errors[0].message 
          };
        }
        return { 
          success: false, 
          error: 'Invalid email format' 
        };
      }
    }
    
    return { success: true };
  };

  /**
   * Validates company form data
   * @param company Company form data
   * @returns Validation result
   */
  const validateCompanyForm = (company: any) => {
    if (!company.name?.trim()) {
      return { 
        success: false, 
        error: 'Company name is required' 
      };
    }
    
    if (!company.google_link?.trim()) {
      return { 
        success: false, 
        error: 'Google link is required' 
      };
    }
    
    // Validate social tasks if present
    if (company.social_tasks && Array.isArray(company.social_tasks)) {
      const invalidTasks = company.social_tasks.filter((task: any) => 
        (task.platform?.trim() && !task.url?.trim()) || 
        (!task.platform?.trim() && task.url?.trim())
      );
      
      if (invalidTasks.length > 0) {
        return { 
          success: false, 
          error: 'All social tasks must have both platform and URL' 
        };
      }
    }
    
    return { success: true };
  };

  /**
   * Validates blog post form data
   * @param data Blog post form data
   * @returns Validation result
   */
  const validateBlogPostForm = (data: BlogPostFormData) => {
    const schema = z.object({
      title: z.string().min(5, 'Title must be at least 5 characters'),
      content: z.string().min(50, 'Content must be at least 50 characters'),
      author: z.string().min(2, 'Author name is required'),
      excerpt: z.string().optional(),
      published: z.boolean().optional(),
      cover_image: z.string().url('Cover image must be a valid URL').optional().nullable()
    });

    try {
      schema.parse(data);
      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { 
          success: false, 
          error: error.errors[0].message 
        };
      }
      return { 
        success: false, 
        error: 'Validation failed' 
      };
    }
  };
  
  /**
   * Validates registration form data
   */
  const validateRegistrationForm = (data: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) => {
    const schema = z.object({
      email: z.string().email('Vnesite veljaven e-poštni naslov'),
      password: z.string().min(8, 'Geslo mora vsebovati vsaj 8 znakov'),
      confirmPassword: z.string(),
      firstName: z.string().min(2, 'Ime je obvezno').optional(),
      lastName: z.string().min(2, 'Priimek je obvezen').optional(),
      phone: z.string().min(5, 'Telefonska številka je obvezna').optional(),
    }).refine(data => data.password === data.confirmPassword, {
      message: 'Gesli se ne ujemata',
      path: ['confirmPassword']
    });

    try {
      schema.parse(data);
      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { 
          success: false, 
          error: error.errors[0].message 
        };
      }
      return { 
        success: false, 
        error: 'Validation failed' 
      };
    }
  };

  return {
    validateContactForm,
    validateContactInfo,
    validateReviewForm,
    validateGamificationForm,
    validateCompanyForm,
    validateBlogPostForm,
    validateRegistrationForm
  };
};