import { supabase } from './index';

/**
 * Uploads a file to Supabase Storage
 * @param bucket Bucket name
 * @param path Path within bucket
 * @param file File to upload
 * @param options Upload options
 * @returns Upload result with URL or error
 */
export const uploadFile = async (
  bucket: string,
  path: string,
  file: File,
  options: {
    upsert?: boolean;
    cacheControl?: string;
  } = {}
): Promise<{ url: string | null; error: Error | null }> => {
  try {
    // Create full file path including original file name
    const filePath = `${path}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    
    // Set default options
    const uploadOptions = {
      cacheControl: options.cacheControl || '3600',
      upsert: options.upsert !== undefined ? options.upsert : false
    };
    
    // Upload the file
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .upload(filePath, file, uploadOptions);
    
    if (error) {
      console.error('Storage upload error:', error);
      return { url: null, error };
    }
    
    // Get public URL
    const { data: urlData } = supabase
      .storage
      .from(bucket)
      .getPublicUrl(data.path);
    
    return { url: urlData.publicUrl, error: null };
  } catch (err) {
    console.error('Error uploading file:', err);
    return { url: null, error: err instanceof Error ? err : new Error('Unknown upload error') };
  }
};

/**
 * Deletes a file from Supabase Storage
 * @param bucket Bucket name
 * @param path Full path to file including filename
 * @returns Success status
 */
export const deleteFile = async (
  bucket: string,
  path: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .storage
      .from(bucket)
      .remove([path]);
    
    if (error) {
      console.error('Storage delete error:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error deleting file:', err);
    return false;
  }
};

/**
 * Lists files in a Supabase Storage bucket
 * @param bucket Bucket name
 * @param path Path within bucket
 * @returns List of files or null on error
 */
export const listFiles = async (
  bucket: string,
  path: string
) => {
  try {
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .list(path);
    
    if (error) {
      console.error('Storage list error:', error);
      return null;
    }
    
    return data;
  } catch (err) {
    console.error('Error listing files:', err);
    return null;
  }
};

/**
 * Gets a public URL for a file
 * @param bucket Bucket name
 * @param path Full path to file including filename
 * @returns Public URL string or null on error
 */
export const getPublicUrl = (
  bucket: string,
  path: string
): string | null => {
  try {
    const { data } = supabase
      .storage
      .from(bucket)
      .getPublicUrl(path);
    
    return data.publicUrl;
  } catch (err) {
    console.error('Error getting public URL:', err);
    return null;
  }
};

/**
 * Gets a signed URL for temporary access to a file
 * @param bucket Bucket name
 * @param path Full path to file including filename
 * @param expiresIn Expiry time in seconds (default: 60 minutes)
 * @returns Signed URL string or null on error
 */
export const getSignedUrl = async (
  bucket: string,
  path: string,
  expiresIn: number = 3600
): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);
    
    if (error) {
      console.error('Storage signed URL error:', error);
      return null;
    }
    
    return data.signedUrl;
  } catch (err) {
    console.error('Error getting signed URL:', err);
    return null;
  }
};