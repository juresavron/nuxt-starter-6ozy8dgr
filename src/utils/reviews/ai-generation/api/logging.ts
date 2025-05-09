/**
 * Functions for logging communications
 */

interface LogCommunicationParams {
  type: 'email' | 'sms';
  recipient: string;
  subject?: string;
  content: string;
  communicationType: string;
  status: string;
  company_id?: string;
  review_id?: string;
  error_message?: string;
  metadata?: Record<string, any>;
}

/**
 * Logs a communication (email or SMS) to the database
 * @param params Communication parameters
 * @returns Success status
 */
export async function logCommunication(params: LogCommunicationParams): Promise<boolean> {
  try {
    // Call the log-communication edge function
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/log-communication`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error logging communication:', errorData.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error logging communication:', error);
    return false;
  }
}