'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type TenantContextType = {
  activeOrganizationId: string | null;
  setActiveOrganizationId: (id: string | null) => void;
  activeBranchId: string | null;
  setActiveBranchId: (id: string | null) => void;
  isLoading: boolean;
};

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [activeOrganizationId, setActiveOrganizationId] = useState<string | null>(null);
  const [activeBranchId, setActiveBranchId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // In a real app, this would fetch from a database or cookies
  // For Phase 1 layout design, we mock the initialization
  useEffect(() => {
    const storedOrg = localStorage.getItem('nexus_active_org');
    const storedBranch = localStorage.getItem('nexus_active_branch');
    if (storedOrg) setActiveOrganizationId(storedOrg);
    if (storedBranch) setActiveBranchId(storedBranch);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (activeOrganizationId) {
      localStorage.setItem('nexus_active_org', activeOrganizationId);
    } else {
      localStorage.removeItem('nexus_active_org');
    }
  }, [activeOrganizationId]);

  useEffect(() => {
    if (activeBranchId) {
      localStorage.setItem('nexus_active_branch', activeBranchId);
    } else {
      localStorage.removeItem('nexus_active_branch');
    }
  }, [activeBranchId]);

  return (
    <TenantContext.Provider
      value={{
        activeOrganizationId,
        setActiveOrganizationId,
        activeBranchId,
        setActiveBranchId,
        isLoading,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
