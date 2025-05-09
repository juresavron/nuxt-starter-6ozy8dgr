import { createClient } from '@supabase/supabase-js';
import { handleRefreshTokenError } from './auth';
import type { Database } from '../../types/database';

// Initialize Supabase client with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables and print clear diagnostics
if (!supabaseUrl) {
  console.error('ERROR: Missing VITE_SUPABASE_URL environment variable');
} else {
  console.log(`Supabase URL detected: ${supabaseUrl.substring(0, 15)}...`);
}

if (!supabaseAnonKey) {
  console.error('ERROR: Missing VITE_SUPABASE_ANON_KEY environment variable');
} else {
  console.log('Supabase anon key detected:', !!supabaseAnonKey);
}

// Ensure URL is formatted correctly - remove trailing slashes
const formattedUrl = supabaseUrl ? supabaseUrl.replace(/\/$/, '') : '';

// Initialize the Supabase client with additional options for reliability
export const supabase = createClient<Database>(
  formattedUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'supabase-auth' // Specify explicit storage key
    },
    global: {
      headers: {
        'x-application-name': 'ocenagor-frontend'
      }
    },
    // Add better timeout and error handling
    realtime: {
      timeout: 30000 // 30 seconds
    },
    // Set cache to network-first strategy
    db: {
      schema: 'public'
    }
  }
);

// Log initialization status
console.log('Supabase client initialized');

// Set up auth state change listener for handling refresh token errors
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'TOKEN_REFRESHED') {
    console.log('Token refreshed successfully');
  }

  if (event === 'SIGNED_OUT') {
    console.log('User signed out');
    // Clear any application state if needed
  }

  if (event === 'SIGNED_IN') {
    console.log('User signed in');
  }
});

// Export supabase instance as default
export default supabase;

// Re-export other modules for convenience
export * from './auth';
export * from './data';