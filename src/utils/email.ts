import { supabase } from '../lib/supabase';

/**
 * Main email utility file that exports all email-related functions
 */

// Email sending function
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  from: string = 'noreply@ocenagor.si'
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables');
    }
    
    const response = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({
        to,
        subject,
        html,
        from
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send email');
    }

    const data = await response.json();
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error sending email' 
    };
  }
}

// Log email to database
export async function logEmailSent(
  recipient: string,
  subject: string,
  content: string,
  templateName: string,
  companyId?: string,
  reviewId?: string,
  metadata?: Record<string, any>
): Promise<void> {
  try {
    await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/log-communication`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        type: 'email',
        recipient,
        subject,
        content,
        communicationType: templateName,
        status: 'sent',
        company_id: companyId,
        review_id: reviewId,
        metadata
      })
    });
  } catch (error) {
    console.error('Error logging email:', error);
  }
}

// Contact form notification email
export async function sendContactNotification(
  name: string,
  email: string,
  company: string,
  message: string,
  phone?: string
): Promise<{ success: boolean; error?: string }> {
  const subject = `New Contact Form Submission from ${name}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
      <h1 style="color: #3b82f6; margin-bottom: 20px;">New Contact Form Submission</h1>
      
      <div style="margin-bottom: 20px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Company:</strong> ${company}</p>
      </div>
      
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        <h2 style="color: #4b5563; font-size: 18px; margin-top: 0;">Message:</h2>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
      
      <p style="color: #6b7280; font-size: 14px;">This message was sent from the contact form on ocenagor.si</p>
    </div>
  `;

  // Send to admin email
  return await sendEmail('info@ocenagor.si', subject, html);
}

// Contact form confirmation email to the sender
export async function sendContactConfirmation(
  name: string,
  email: string
): Promise<{ success: boolean; error?: string }> {
  const subject = 'Thank you for contacting ocenagor.si';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
      <h1 style="color: #3b82f6; margin-bottom: 20px;">Thank You for Contacting Us</h1>
      
      <p>Hello ${name},</p>
      
      <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
      
      <p>In the meantime, feel free to explore our website for more information about our services.</p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        <p style="color: #6b7280; font-size: 14px;">Best regards,</p>
        <p style="color: #6b7280; font-size: 14px;">The ocenagor.si Team</p>
      </div>
    </div>
  `;

  return await sendEmail(email, subject, html);
}

// Review notification email
export async function sendReviewNotification(
  companyName: string,
  rating: number,
  comment: string,
  email: string
): Promise<{ success: boolean; error?: string }> {
  const subject = `Thank you for your review of ${companyName}`;
  
  // Create different content based on rating
  let content = '';
  if (rating >= 4) {
    content = `
      <p>Thank you for your positive review! We're thrilled that you had a great experience with ${companyName}.</p>
      <p>Your feedback helps us continue to provide excellent service to all our customers.</p>
    `;
  } else {
    content = `
      <p>Thank you for your feedback. We appreciate your honesty and will use your comments to improve our service.</p>
      <p>We're sorry your experience didn't meet your expectations and would love the opportunity to make things right.</p>
    `;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
      <h1 style="color: #3b82f6; margin-bottom: 20px;">Thank You for Your Review</h1>
      
      <p>Hello,</p>
      
      ${content}
      
      ${comment ? `
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #4b5563; font-size: 16px; margin-top: 0;">Your comment:</h3>
        <p style="white-space: pre-wrap;">${comment}</p>
      </div>
      ` : ''}
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        <p style="color: #6b7280; font-size: 14px;">Best regards,</p>
        <p style="color: #6b7280; font-size: 14px;">${companyName}</p>
      </div>
    </div>
  `;

  return await sendEmail(email, subject, html);
}

// Generate AI email content
export async function generateAIEmail(
  companyName: string,
  rating: number,
  comment?: string,
  selectedIssues?: string[],
  emailType?: string,
  language?: string,
  giftDescription?: string
): Promise<{ subject: string; html: string; text: string } | null> {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-ai-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        companyName,
        rating,
        comment,
        selectedIssues,
        emailType,
        language,
        giftDescription
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate email content');
    }

    const data = await response.json();
    return {
      subject: data.subject,
      html: data.html,
      text: data.text
    };
  } catch (error) {
    console.error('Error generating AI email:', error);
    return null;
  }
}

// Send coupon email
export async function sendCouponEmail(
  email: string,
  couponCode: string,
  companyName: string,
  discountAmount: number,
  discountType: 'percentage' | 'fixed',
  expiresAt?: string
): Promise<{ success: boolean; error?: string }> {
  // Format discount
  const discount = `${discountAmount}${discountType === 'percentage' ? '%' : '€'}`;
  
  // Format expiration date
  const expirationText = expiresAt 
    ? `This coupon expires on ${new Date(expiresAt).toLocaleDateString()}.`
    : 'This coupon has no expiration date.';

  // Create email content
  const subject = `Your ${discount} discount coupon from ${companyName}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #3b82f6; margin-bottom: 10px;">Your Discount Coupon</h1>
        <p style="color: #4b5563; font-size: 16px;">Thank you for your feedback!</p>
      </div>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
        <p style="font-size: 14px; color: #6b7280; margin-bottom: 10px;">Your coupon code:</p>
        <div style="background-color: white; padding: 15px; border-radius: 6px; border: 1px dashed #d1d5db; margin-bottom: 15px;">
          <p style="font-family: monospace; font-size: 24px; font-weight: bold; color: #1f2937; margin: 0;">${couponCode}</p>
        </div>
        <p style="font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 5px;">
          ${discount} OFF
        </p>
        <p style="font-size: 14px; color: #6b7280;">
          at ${companyName}
        </p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
          Present this coupon code during your next visit to ${companyName} to receive your discount.
          ${expirationText}
        </p>
      </div>
      
      <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
        <p style="color: #9ca3af; font-size: 12px;">
          This email was sent to you because you provided your email address when leaving a review.
          If you have any questions, please contact ${companyName} directly.
        </p>
      </div>
    </div>
  `;

  return await sendEmail(email, subject, html);
}

// Send SMS
export async function sendSMS(
  phone: string,
  message: string,
  companyId?: string,
  reviewId?: string,
  metadata?: Record<string, any>
): Promise<{ success: boolean; error?: string }> {
  try {
    // Log the SMS
    await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/log-communication`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        type: 'sms',
        recipient: phone,
        content: message,
        communicationType: 'sms',
        status: 'sent',
        company_id: companyId,
        review_id: reviewId,
        metadata
      })
    });

    // In a real implementation, you would call an SMS provider API here
    console.log(`SMS would be sent to ${phone}: ${message}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error sending SMS' 
    };
  }
}

// Generate AI SMS content
export async function generateAISMS(
  companyName: string,
  smsType: 'google_redirect' | 'coupon_code' | 'thank_you',
  options: {
    rating?: number;
    comment?: string;
    selectedIssues?: string[];
    couponCode?: string;
    googleLink?: string;
    language?: string;
  } = {}
): Promise<string | null> {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-ai-sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        companyName,
        smsType,
        rating: options.rating,
        comment: options.comment,
        selectedIssues: options.selectedIssues,
        couponCode: options.couponCode,
        googleLink: options.googleLink,
        language: options.language
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate SMS content');
    }

    const data = await response.json();
    return data.success ? data.message : null;
  } catch (error) {
    console.error('Error generating AI SMS:', error);
    return null;
  }
}