import { useCallback } from 'react';
import { translations } from '../translations/sl';

interface ConfirmDialogOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

/**
 * Hook for confirmation dialogs
 * @returns Functions for showing confirmation dialogs
 */
export const useConfirmDelete = () => {
  /**
   * Shows a confirmation dialog with the given options
   * @param options Dialog options
   * @returns Promise that resolves to true if confirmed, false otherwise
   */
  const confirmDelete = useCallback(async (options: ConfirmDialogOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      try {
        console.log('Showing confirmation dialog with options:', options);
        const confirmed = window.confirm(options.message);
        console.log('User response:', confirmed);
        resolve(confirmed);
      } catch (error) {
        console.error('Error in confirmation dialog:', error);
        resolve(false);
      }
    });
  }, []);
  
  /**
   * Shows a simple confirmation dialog with the given message
   * @param message Confirmation message
   * @returns Promise that resolves to true if confirmed, false otherwise
   */
  const confirm = useCallback(async (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const confirmed = window.confirm(message);
      resolve(confirmed);
    });
  }, []);

  return { confirmDelete, confirm };
};