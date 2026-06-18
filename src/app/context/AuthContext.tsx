'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { createClient } from '@/lib/supabase/client';
import type { UserProfile, UserRole } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface AuthContextType {
  profile: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser();
  const { signOut: clerkSignOut } = useClerk();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const isDemoMode = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.includes('REPLACE') ?? true;

  const fetchProfile = useCallback(async (userId: string, email: string, name: string, metadata: any) => {
    if (isDemoMode) {
      setProfile({
        id: userId,
        organizationId: 'mock-org-001',
        role: 'owner',
        fullName: name || 'Demo Owner',
        email: email || 'demo@nexus.pk',
        avatarUrl: null,
        isActive: true,
      });
      setProfileLoading(false);
      return;
    }

    const orgIdFromClerk = metadata?.organization_id as string || 'org_mock_vendor';
    const roleFromClerk = (metadata?.role as UserRole) || 'owner';

    try {
      setProfile({
        id: userId,
        organizationId: orgIdFromClerk,
        role: roleFromClerk,
        fullName: name || 'New User',
        email: email || '',
        avatarUrl: null,
        isActive: true,
      });
      setProfileLoading(false);
    } catch {
      setProfile({
        id: userId,
        organizationId: 'org_mock_vendor',
        role: 'owner',
        fullName: name || 'New User',
        email: email || '',
        avatarUrl: null,
        isActive: true,
      });
    }
    setProfileLoading(false);
  }, [isDemoMode]);

  const refreshProfile = useCallback(async () => {
    if (clerkUser) {
      await fetchProfile(
        clerkUser.id,
        clerkUser.primaryEmailAddress?.emailAddress ?? '',
        clerkUser.fullName ?? '',
        clerkUser.publicMetadata
      );
    }
  }, [clerkUser, fetchProfile]);

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn && clerkUser) {
      fetchProfile(
        clerkUser.id,
        clerkUser.primaryEmailAddress?.emailAddress ?? '',
        clerkUser.fullName ?? '',
        clerkUser.publicMetadata
      );
    } else {
      setProfile(null);
      setProfileLoading(false);
    }
  }, [isLoaded, isSignedIn, clerkUser, fetchProfile]);

  const signOut = useCallback(async () => {
    await clerkSignOut();
    setProfile(null);
  }, [clerkSignOut]);

  const loading = !isLoaded || profileLoading;

  return (
    <AuthContext.Provider
      value={{
        profile,
        loading,
        isAuthenticated: isDemoMode ? true : !!isSignedIn,
        isDemoMode,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
