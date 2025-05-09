/**
 * Utility functions for lottery entries in the review flow
 */
import { supabase } from '../../../lib/supabase';

/**
 * Creates a lottery entry for a review
 * @param companyId Company ID
 * @param reviewId Review ID
 * @param email Customer email
 * @param phone Customer phone
 * @returns Success status and entry ID if successful
 */
export const createLotteryEntry = async (
  companyId?: string,
  reviewId?: string | null,
  email?: string,
  phone?: string
): Promise<{ success: boolean; entryId?: string; error?: string }> => {
  try {
    console.log('🎲 createLotteryEntry: Starting lottery entry creation', {
      companyId,
      reviewId,
      hasEmail: !!email,
      hasPhone: !!phone,
      timestamp: new Date().toISOString()
    });

    if (!companyId || !reviewId) {
      console.error('🚨 createLotteryEntry: Missing required parameters', {
        companyId,
        reviewId,
        timestamp: new Date().toISOString()
      });
      return { success: false, error: 'Missing required parameters' };
    }

    // First check if an entry already exists for this review
    const { data: existingEntry, error: checkError } = await supabase
      .from('lottery_entries')
      .select('id')
      .eq('review_id', reviewId)
      .maybeSingle();

    if (checkError) {
      console.error('🚨 createLotteryEntry: Error checking for existing entry', {
        error: checkError.message,
        code: checkError.code,
        details: checkError.details,
        timestamp: new Date().toISOString()
      });
      return { success: false, error: checkError.message };
    }

    // If entry already exists, update it instead of creating a new one
    if (existingEntry) {
      console.log('🎲 createLotteryEntry: Entry already exists, updating', {
        entryId: existingEntry.id,
        reviewId,
        timestamp: new Date().toISOString()
      });

      const { error: updateError } = await supabase
        .from('lottery_entries')
        .update({
          email: email || null,
          phone: phone || null,
          entry_date: new Date().toISOString()
        })
        .eq('id', existingEntry.id);

      if (updateError) {
        console.error('🚨 createLotteryEntry: Error updating lottery entry', {
          error: updateError.message,
          code: updateError.code,
          details: updateError.details,
          timestamp: new Date().toISOString()
        });
        return { success: false, error: updateError.message };
      }

      console.log('✅ createLotteryEntry: Lottery entry updated successfully', {
        entryId: existingEntry.id,
        timestamp: new Date().toISOString()
      });

      return { success: true, entryId: existingEntry.id };
    }

    console.log('🎲 createLotteryEntry: Creating new lottery entry', {
      companyId,
      reviewId,
      hasEmail: !!email,
      hasPhone: !!phone,
      timestamp: new Date().toISOString()
    });

    // Create lottery entry in database
    const { data: entry, error } = await supabase
      .from('lottery_entries')
      .insert({
        company_id: companyId,
        review_id: reviewId,
        email: email || null,
        phone: phone || null,
        entry_date: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('🚨 createLotteryEntry: Error creating lottery entry', {
        error: error.message,
        code: error.code,
        details: error.details,
        timestamp: new Date().toISOString()
      });
      return { success: false, error: error.message };
    }

    console.log('✅ createLotteryEntry: Lottery entry created successfully', {
      entryId: entry.id,
      timestamp: new Date().toISOString()
    });

    return { success: true, entryId: entry.id };
  } catch (error) {
    console.error('🚨 createLotteryEntry: Exception during creation', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create lottery entry' 
    };
  }
};

/**
 * Verifies if a lottery entry exists for a review
 * @param reviewId Review ID to check
 * @returns Boolean indicating if entry exists
 */
export const verifyLotteryEntry = async (reviewId: string): Promise<boolean> => {
  try {
    if (!reviewId) return false;

    const { data, error } = await supabase
      .from('lottery_entries')
      .select('id')
      .eq('review_id', reviewId)
      .maybeSingle();

    if (error) {
      console.error('🚨 verifyLotteryEntry: Error verifying lottery entry', {
        error: error.message,
        reviewId,
        timestamp: new Date().toISOString()
      });
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('🚨 verifyLotteryEntry: Exception during verification', {
      error: error instanceof Error ? error.message : 'Unknown error',
      reviewId,
      timestamp: new Date().toISOString()
    });
    return false;
  }
};