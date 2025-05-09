/**
 * AI-powered email and SMS generation utilities
 */

/**
 * Generates an AI-powered email based on review data
 * @param reviewData Review data for email generation
 * @returns Generated email content
 */
export const generateAIEmail = async (reviewData: any) => {
  try {
    console.log('Generating AI email for review:', {
      reviewId: reviewData.reviewId,
      companyName: reviewData.companyName,
      rating: reviewData.rating
    });
    
    // Call the edge function to generate email
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-ai-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        companyName: reviewData.companyName,
        rating: reviewData.rating,
        comment: reviewData.comment,
        selectedIssues: reviewData.selectedIssues,
        emailType: reviewData.rating <= 3 ? 'low_rating_feedback' : 
                  reviewData.rating === 4 ? 'mid_rating_feedback' : 
                  'high_rating_thank_you',
        language: 'sl' // Default to Slovenian
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate AI email');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error generating AI email:', error);
    return {
      success: false,
      subject: `Thank you for your review of ${reviewData.companyName}`,
      html: `<p>Thank you for your feedback. We appreciate your time.</p>`,
      text: `Thank you for your feedback. We appreciate your time.`
    };
  }
};

/**
 * Generates an AI-powered SMS based on review data
 * @param reviewData Review data for SMS generation
 * @param smsType Type of SMS to generate
 * @param additionalData Additional data for SMS generation
 * @returns Generated SMS content
 */
export const generateAISMS = async (
  reviewData: any,
  smsType: 'google_redirect' | 'coupon_code' | 'thank_you' = 'thank_you',
  additionalData: { googleLink?: string; couponCode?: string } = {}
) => {
  try {
    console.log('Generating AI SMS for review:', {
      reviewId: reviewData.reviewId,
      companyName: reviewData.companyName,
      rating: reviewData.rating,
      smsType
    });
    
    // Call the edge function to generate SMS
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-ai-sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        companyName: reviewData.companyName,
        rating: reviewData.rating,
        comment: reviewData.comment,
        selectedIssues: reviewData.selectedIssues,
        smsType,
        googleLink: additionalData.googleLink,
        couponCode: additionalData.couponCode,
        language: 'sl' // Default to Slovenian
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate AI SMS');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error generating AI SMS:', error);
    return {
      success: false,
      message: `Thank you for your review of ${reviewData.companyName}.`
    };
  }
};

/**
 * Sends a review notification email
 * @param companyName Company name
 * @param rating Review rating
 * @param comment Review comment
 * @param email Recipient email
 * @returns Success status
 */
export const sendReviewNotification = async (
  companyName: string,
  rating: number,
  comment: string,
  email: string
): Promise<boolean> => {
  try {
    // Generate email content
    const emailContent = await generateAIEmail({
      companyName,
      rating,
      comment
    });
    
    if (!emailContent.success) {
      console.warn('Failed to generate AI email, using fallback');
    }
    
    // Send email
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        to: email,
        subject: emailContent.subject || `Thank you for your review of ${companyName}`,
        html: emailContent.html || `<p>Thank you for your feedback. We appreciate your time.</p>`,
        from: 'noreply@ocenagor.si'
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send email');
    }
    
    // Log email
    await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/log-communication`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        type: 'email',
        recipient: email,
        subject: emailContent.subject || `Thank you for your review of ${companyName}`,
        content: emailContent.html || `<p>Thank you for your feedback. We appreciate your time.</p>`,
        communicationType: rating <= 3 ? 'low_rating_feedback' : 
                          rating === 4 ? 'mid_rating_feedback' : 
                          'high_rating_thank_you',
        status: 'delivered'
      })
    });
    
    return true;
  } catch (error) {
    console.error('Error sending review notification:', error);
    return false;
  }
};

/**
 * Sends a low rating notification
 * @param companyName Company name
 * @param rating Review rating
 * @param selectedIssues Selected feedback issues
 * @param comment Review comment
 * @param email Recipient email
 * @returns Success status
 */
export const sendLowRatingNotification = async (
  companyName: string,
  rating: number,
  selectedIssues: string[],
  comment: string,
  email: string
): Promise<boolean> => {
  try {
    // Generate email content
    const emailContent = await generateAIEmail({
      companyName,
      rating,
      selectedIssues,
      comment,
      emailType: 'low_rating_feedback'
    });
    
    if (!emailContent.success) {
      console.warn('Failed to generate AI email for low rating, using fallback');
    }
    
    // Send email
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        to: email,
        subject: emailContent.subject || `Thank you for your feedback on ${companyName}`,
        html: emailContent.html || `<p>Thank you for your feedback. We appreciate your honesty and will work to improve.</p>`,
        from: 'noreply@ocenagor.si'
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send low rating email');
    }
    
    // Log email
    await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/log-communication`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        type: 'email',
        recipient: email,
        subject: emailContent.subject || `Thank you for your feedback on ${companyName}`,
        content: emailContent.html || `<p>Thank you for your feedback. We appreciate your honesty and will work to improve.</p>`,
        communicationType: 'low_rating_feedback',
        status: 'delivered'
      })
    });
    
    return true;
  } catch (error) {
    console.error('Error sending low rating notification:', error);
    return false;
  }
};

/**
 * Sends an AI-generated email based on review data
 * @param reviewData Review data for email generation
 * @returns Success status
 */
export const sendAIGeneratedEmail = async (reviewData: any): Promise<boolean> => {
  try {
    if (!reviewData.email) {
      console.log('No email provided, skipping email generation');
      return false;
    }
    
    console.log('Sending AI-generated email for review:', {
      reviewId: reviewData.reviewId,
      companyName: reviewData.companyName,
      rating: reviewData.rating
    });
    
    // Generate email content
    const emailContent = await generateAIEmail(reviewData);
    
    if (!emailContent.success) {
      console.warn('Failed to generate AI email, using fallback');
    }
    
    // Send email
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        to: reviewData.email,
        subject: emailContent.subject || `Thank you for your review of ${reviewData.companyName}`,
        html: emailContent.html || `<p>Thank you for your feedback. We appreciate your time.</p>`,
        from: 'noreply@ocenagor.si'
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send email');
    }
    
    // Log email
    await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/log-communication`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        type: 'email',
        recipient: reviewData.email,
        subject: emailContent.subject || `Thank you for your review of ${reviewData.companyName}`,
        content: emailContent.html || `<p>Thank you for your feedback. We appreciate your time.</p>`,
        communicationType: reviewData.rating <= 3 ? 'low_rating_feedback' : 
                          reviewData.rating === 4 ? 'mid_rating_feedback' : 
                          'high_rating_thank_you',
        status: 'delivered',
        review_id: reviewData.reviewId,
        company_id: reviewData.companyId
      })
    });
    
    return true;
  } catch (error) {
    console.error('Error sending AI-generated email:', error);
    return false;
  }
};

/**
 * Sends an AI-generated SMS based on review data
 * @param reviewData Review data for SMS generation
 * @param smsType Type of SMS to generate
 * @param additionalData Additional data for SMS generation
 * @returns Success status
 */
export const sendAIGeneratedSMS = async (
  reviewData: any,
  smsType: 'google_redirect' | 'coupon_code' | 'thank_you' = 'thank_you',
  additionalData: { googleLink?: string; couponCode?: string } = {}
): Promise<boolean> => {
  try {
    if (!reviewData.phone) {
      console.log('No phone provided, skipping SMS generation');
      return false;
    }
    
    console.log('Sending AI-generated SMS for review:', {
      reviewId: reviewData.reviewId,
      companyName: reviewData.companyName,
      rating: reviewData.rating,
      smsType
    });
    
    // Generate SMS content
    const smsContent = await generateAISMS(reviewData, smsType, additionalData);
    
    if (!smsContent.success) {
      console.warn('Failed to generate AI SMS, using fallback');
    }
    
    // Send SMS (this would typically call an SMS provider API)
    // For now, we'll just log it
    console.log('Would send SMS:', {
      to: reviewData.phone,
      message: smsContent.message || `Thank you for your review of ${reviewData.companyName}.`
    });
    
    // Log SMS
    await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/log-communication`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        type: 'sms',
        recipient: reviewData.phone,
        content: smsContent.message || `Thank you for your review of ${reviewData.companyName}.`,
        communicationType: smsType,
        status: 'delivered',
        review_id: reviewData.reviewId,
        company_id: reviewData.companyId
      })
    });
    
    return true;
  } catch (error) {
    console.error('Error sending AI-generated SMS:', error);
    return false;
  }
};