import { supabase } from '../../lib/supabase';
import { handleRefreshTokenError } from '../../lib/supabase';

/**
 * Updates review contact information in the database
 * @param reviewId - Review ID to update
 * @param email - Email address (optional)
 * @param phone - Phone number (optional)
 * @returns Object containing success status and error message if applicable
 */
export const updateContactInfo = async (
  reviewId: string,
  email?: string | null,
  phone?: string | null
): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('updateContactInfo: Updating contact info for review', { 
      reviewId, 
      hasEmail: !!email, 
      hasPhone: !!phone,
      timestamp: new Date().toISOString()
    });
    
    // Prepare update data - only include fields that are provided
    const updateData: Record<string, any> = {};
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    
    // No fields to update
    if (Object.keys(updateData).length === 0) {
      console.log('updateContactInfo: No contact info to update');
      return { success: true };
    }
    
    // Update review
    const { error } = await supabase
      .from('reviews')
      .update(updateData)
      .eq('id', reviewId);
      
    // Check for errors
    if (error) {
      console.error('updateContactInfo: Error updating contact info:', error);
      
      // Handle authentication errors
      if (isAuthError(error)) {
        console.error('updateContactInfo: Authentication error detected');
        await handleRefreshTokenError();
        return { 
          success: false, 
          error: 'Session expired or invalid. Please log in again.' 
        };
      }
      
      return { 
        success: false, 
        error: error.message 
      };
    }
    
    console.log('updateContactInfo: Successfully updated contact info for review', { reviewId });
    return { success: true };
  } catch (err) {
    console.error('updateContactInfo: Exception during update:', err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'Unknown error during contact update' 
    };
  }
};

/**
 * Verifies that a contact update was successful by fetching the review
 * @param reviewId - Review ID to verify
 * @returns Review data or null if verification failed
 */
export const verifyContactUpdate = async (reviewId: string): Promise<any | null> => {
  try {
    console.log('verifyContactUpdate: Verifying contact update for review', { reviewId });
    
    // Fetch the updated review
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('id', reviewId)
      .single();
      
    // Check for errors
    if (error) {
      console.error('verifyContactUpdate: Error verifying contact update:', error);
      
      // Handle authentication errors
      if (isAuthError(error)) {
        console.error('verifyContactUpdate: Authentication error detected');
        await handleRefreshTokenError();
      }
      
      return null;
    }
    
    console.log('verifyContactUpdate: Successfully verified contact update', { 
      reviewId,
      hasEmail: !!data?.email,
      hasPhone: !!data?.phone
    });
    
    return data;
  } catch (err) {
    console.error('verifyContactUpdate: Exception during verification:', err);
    return null;
  }
};

/**
 * Updates contact information for a review and verifies the update
 * @param reviewId - Review ID to update
 * @param email - Email address (optional)
 * @param phone - Phone number (optional)
 * @returns Object with success status, error message if any, and data if successful
 */
export const updateAndVerifyContact = async (
  reviewId: string,
  email?: string | null,
  phone?: string | null
): Promise<{ success: boolean; error?: string; data?: any }> => {
  try {
    console.log('updateAndVerifyContact: Starting contact update and verification', {
      reviewId,
      hasEmail: !!email,
      hasPhone: !!phone,
      timestamp: new Date().toISOString()
    });
    
    // Update contact information
    const updateResult = await updateContactInfo(reviewId, email, phone);
    
    if (!updateResult.success) {
      console.error('updateAndVerifyContact: Update failed', { 
        error: updateResult.error,
        reviewId,
        timestamp: new Date().toISOString()
      });
      return updateResult;
    }
    
    // Verify the update was successful
    const verificationData = await verifyContactUpdate(reviewId);
    
    if (!verificationData) {
      console.error('updateAndVerifyContact: Verification failed', { 
        reviewId,
        timestamp: new Date().toISOString() 
      });
      return { 
        success: false, 
        error: 'Failed to verify contact information update' 
      };
    }
    
    console.log('updateAndVerifyContact: Success', { 
      reviewId,
      hasEmailData: !!verificationData.email,
      hasPhoneData: !!verificationData.phone,
      timestamp: new Date().toISOString()
    });
    
    return { 
      success: true, 
      data: verificationData 
    };
  } catch (err) {
    console.error('updateAndVerifyContact: Exception during operation', { 
      error: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined,
      reviewId,
      timestamp: new Date().toISOString()
    });
    
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'Failed to update and verify contact information' 
    };
  }
};

/**
 * Helper function to check if an error is authentication-related
 * @param error - Error object from Supabase
 * @returns Boolean indicating if it's an auth error
 */
function isAuthError(error: any): boolean {
  if (!error) return false;
  
  return (
    // Check for specific error codes
    error.code === 'PGRST301' || 
    error.code === '42501' ||
    
    // Check for auth-related messages
    (error.message && (
      error.message.includes('JWT') ||
      error.message.includes('token') ||
      error.message.includes('auth') ||
      error.message.includes('session') ||
      error.message.includes('expired') ||
      error.message.includes('invalid')
    ))
  );
}