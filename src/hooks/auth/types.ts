/**
 * Types for authentication hooks
 */

export interface UserRole {
  isAdmin: boolean;
  isCompanyOwner: boolean;
  ownedCompanyIds: string[];
  isSuperAdmin?: boolean;
}

export interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
  userRole: UserRole;
  authInitialized: boolean;
}

export interface AuthActions {
  setUser: (user: any | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUserRole: (role: UserRole) => void;
  setAuthInitialized: (initialized: boolean) => void;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export type AuthHook = AuthState & AuthActions;