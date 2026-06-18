"use client";

import { AuthProvider } from "@/app/context/AuthContext";
import { PermissionProvider } from "@/app/context/PermissionContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PermissionProvider>{children}</PermissionProvider>
    </AuthProvider>
  );
}
