'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@/lib/supabase/client';
import type { RoleId, ModuleId } from '@/config/navigation.config';

interface DashboardContextType {
  organizationId: string | null;
  organizationName: string;
  branchId: string | null;
  role: RoleId | null;
  activeModules: ModuleId[];
  isLoading: boolean;
  setOrganizationId: (id: string) => void;
  setBranchId: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ 
  children,
  initialOrganizationId
}: { 
  children: React.ReactNode;
  initialOrganizationId?: string | null;
}) {
  const { user: clerkUser } = useUser();
  const [organizationId, setOrganizationId] = useState<string | null>(initialOrganizationId || '11111111-1111-1111-1111-111111111111');
  const [organizationName, setOrganizationName] = useState<string>('Select Org');
  const [branchId, setBranchId] = useState<string | null>('22222222-2222-2222-2222-222222222222');
  const [role, setRole] = useState<RoleId | null>('owner');
  const [activeModules, setActiveModules] = useState<ModuleId[]>(['crm', 'venue_management']);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    if (clerkUser) {
      const metadata = clerkUser.publicMetadata as any;
      if (metadata.role) {
        setRole(metadata.role);
      }
      if (metadata.organizationId) {
        setOrganizationId(metadata.organizationId);
      }
    }
  }, [clerkUser]);

  useEffect(() => {
    async function fetchOrgName() {
      if (!organizationId || organizationId === '11111111-1111-1111-1111-111111111111') {
        setOrganizationName('Royal Palace'); // Default dummy
        return;
      }
      // Try to fetch from vendors table
      const { data } = await supabase.from('vendors').select('business_name').eq('id', organizationId).single();
      if (data?.business_name) {
        setOrganizationName(data.business_name);
      }
    }
    fetchOrgName();
  }, [organizationId, supabase]);

  return (
    <DashboardContext.Provider value={{
      organizationId,
      organizationName,
      branchId,
      role,
      activeModules,
      isLoading,
      setOrganizationId,
      setBranchId
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
