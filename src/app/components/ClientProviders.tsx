"use client";

import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { AuthProvider } from "@/app/context/AuthContext";
import { OrganizationProvider } from "@/app/context/OrganizationContext";
import { PermissionProvider } from "@/app/context/PermissionContext";
import { NexusEcosystemProvider } from "@/app/context/NexusEcosystemContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";

/**
 * ClientProviders
 * Wraps the entire app with all client-side context providers.
 * Order: Clerk (outermost) → Auth → Organization → Permission → NexusEcosystem → Language → Favorites
 */
export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      signInUrl="/sign-in"
      signUpUrl="/register"
    >
      <AuthProvider>
        <OrganizationProvider>
          <PermissionProvider>
            <NexusEcosystemProvider>
              <LanguageProvider>
                <FavoritesProvider>
                  {children}
                </FavoritesProvider>
              </LanguageProvider>
            </NexusEcosystemProvider>
          </PermissionProvider>
        </OrganizationProvider>
      </AuthProvider>
    </ClerkProvider>
  );
}
