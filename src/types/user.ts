/**
 * User role information
 */
export interface UserRole {
  isAdmin: boolean;
  isCompanyOwner: boolean;
  ownedCompanyIds: string[];
  isSuperAdmin: boolean;
}

/**
 * User profile information
 */
export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
}

/**
 * User session information
 */
export interface UserSession {
  user: UserProfile;
  access_token: string;
  refresh_token: string;
  expires_at: number;
}