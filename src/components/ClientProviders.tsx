"use client";

import { createContext, useContext, ReactNode } from "react";
import { AuthProvider } from "@/app/context/AuthContext";

type Permissions = {
  [key: string]: boolean;
};

const defaultPermissions: Permissions = {
  "test:read": true,
};

const PermissionContext = createContext<Permissions>(defaultPermissions);

export const PermissionProvider = ({
  children,
  permissions = defaultPermissions,
}: {
  children: ReactNode;
  permissions?: Permissions;
}) => {
  return (
    <PermissionContext.Provider value={permissions}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => useContext(PermissionContext);

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <PermissionProvider>{children}</PermissionProvider>
    </AuthProvider>
  );
}
