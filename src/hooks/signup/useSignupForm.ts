import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useFormValidation } from '../useFormValidation';

export const useSignupForm = (returnTo: string = '/admin') => {
  const navigate = useNavigate();
  const { validateRegistrationForm } = useFormValidation();
  
  // Form state
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Authentication
    email: '',
    password: '',
    confirmPassword: '',
    
    // Step 2 - Personal info
    firstName: '',
    lastName: '',
    phone: '',
    companyName: '',
    
    // Step 3 - Address
    streetAddress: '',
    city: '',
    postalCode: '',
    country: 'Slovenia',
  });
  
  // Other state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Step controls
  const goToNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const goToPrevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };
  
  // Step validation
  const validateCurrentStep = () => {
    setError(null);
    
    if (currentStep === 1) {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError('Vsa polja so obvezna.');
        return false;
      }
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError('Vnesite veljaven e-poštni naslov.');
        return false;
      }
      
      if (formData.password.length < 8) {
        setError('Geslo mora vsebovati vsaj 8 znakov.');
        return false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Gesli se ne ujemata.');
        return false;
      }
    } 
    else if (currentStep === 2) {
      if (!formData.firstName || !formData.lastName || !formData.phone) {
        setError('Ime, priimek in telefon so obvezni podatki.');
        return false;
      }
    }
    
    return true;
  };
  
  // Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Client-side validation
      const validation = validateRegistrationForm({
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone
      });

      if (!validation.success) {
        setError(validation.error);
        setIsSubmitting(false);
        return;
      }
      
      // Validate GDPR consent
      if (!gdprConsent) {
        setError('Prosimo, da sprejmete politiko zasebnosti');
        setIsSubmitting(false);
        return;
      }

      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            company_name: formData.companyName,
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.user) {
        // Store shipping address in a separate profile table
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            user_id: data.user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            company_name: formData.companyName,
            street_address: formData.streetAddress,
            city: formData.city,
            postal_code: formData.postalCode,
            country: formData.country
          });
        
        if (profileError) {
          console.error('Error creating user profile:', profileError);
        }
        
        setSubmitted(true);
        
        // Redirect to login after a delay
        setTimeout(() => {
          navigate('/login', { state: { returnTo } });
        }, 5000);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err instanceof Error ? err.message : 'Failed to sign up');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    formData,
    isSubmitting,
    error,
    gdprConsent,
    submitted,
    setGdprConsent,
    handleChange,
    goToNextStep,
    goToPrevStep,
    handleSubmit
  };
};

export default useSignupForm;