import { supabase } from './index';
import { handleRefreshTokenError } from './auth';
import type { PostgrestError } from '@supabase/supabase-js';

/**
 * Safely executes a Supabase query with error handling
 * @param queryFn Function that returns a Supabase query
 * @returns Query result or throws an error
 */
export const safeQuery = async <T>(
  queryFn: () => Promise<{ data: T | null; error: PostgrestError | null }>
): Promise<T> => {
  try {
    const { data, error } = await queryFn();
    
    if (error) {
      // Handle token errors
      if (error.message?.includes('JWT') || 
          error.message?.includes('token') ||
          error.message?.includes('auth') ||
          error.message?.includes('session')) {
        await handleRefreshTokenError();
      }
      
      console.error('Supabase query error:', error.message);
      throw error;
    }
    
    return data as T;
  } catch (err) {
    console.error('Error executing Supabase query:', err);
    throw err;
  }
};

/**
 * Generic fetch function with pagination
 * @param table Table name
 * @param options Query options
 * @returns Paginated data
 */
export const fetchPaginated = async <T>(
  table: string,
  options: {
    page?: number;
    pageSize?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
    filters?: Record<string, any>;
  } = {}
) => {
  const {
    page = 1,
    pageSize = 10,
    orderBy = 'created_at',
    orderDirection = 'desc',
    filters = {}
  } = options;

  try {
    let query = supabase
      .from(table)
      .select('*', { count: 'exact' });
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          query = query.in(key, value);
        } else {
          query = query.eq(key, value);
        }
      }
    });
    
    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    query = query
      .order(orderBy, { ascending: orderDirection === 'asc' })
      .range(from, to);
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error(`Error fetching ${table}:`, error);
      throw error;
    }
    
    return {
      data,
      pagination: {
        page,
        pageSize,
        total: count || 0,
        totalPages: count ? Math.ceil(count / pageSize) : 0
      }
    };
  } catch (err) {
    console.error(`Error in fetchPaginated for ${table}:`, err);
    throw err;
  }
};

/**
 * Generic create function
 * @param table Table name
 * @param data Data to insert
 * @returns Created record
 */
export const createRecord = async <T>(table: string, data: Partial<T>): Promise<T> => {
  return await safeQuery(async () => {
    return await supabase
      .from(table)
      .insert(data)
      .select()
      .single();
  });
};

/**
 * Generic update function
 * @param table Table name
 * @param id Record ID
 * @param data Data to update
 * @returns Updated record
 */
export const updateRecord = async <T>(
  table: string,
  id: string,
  data: Partial<T>
): Promise<T> => {
  return await safeQuery(async () => {
    return await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();
  });
};

/**
 * Generic delete function
 * @param table Table name
 * @param id Record ID
 * @returns Success status
 */
export const deleteRecord = async (
  table: string,
  id: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting from ${table}:`, error);
      throw error;
    }
    
    return true;
  } catch (err) {
    console.error(`Error in deleteRecord for ${table}:`, err);
    throw err;
  }
};

/**
 * Generic fetch by ID function
 * @param table Table name
 * @param id Record ID
 * @returns Record data
 */
export const fetchById = async <T>(table: string, id: string): Promise<T> => {
  return await safeQuery(async () => {
    return await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();
  });
};