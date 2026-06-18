'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { DashboardMobileNav } from './DashboardMobileNav';
import { CustomerSidebar } from '@/components/layout/CustomerSidebar';

export function DashboardLayout({ 
  children,
  initialVendorId,
  vendorCategory
}: { 
  children: React.ReactNode;
  initialVendorId?: string | null;
  vendorCategory?: string | null;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isCustomerRoute = pathname?.startsWith('/dashboard/host');
  const isHostV2Route = pathname?.startsWith('/dashboard/host/v2');
  const isPlannerRoute = pathname?.startsWith('/dashboard/planner');
  const isVendorRoute = pathname?.startsWith('/dashboard/vendor');
  const isRentalsRoute = pathname?.startsWith('/dashboard/rentals');

  // Force redirect rentals vendors to their dashboard if they are lost in the Venue layout
  // But never redirect if we're already on a customer/host route — those are separate user types
  useEffect(() => {
    if (vendorCategory === 'rentals' || vendorCategory === 'Rental & Wardrobe') {
      if (!isRentalsRoute && !isCustomerRoute) {
        router.replace('/dashboard/rentals');
      }
    }
  }, [vendorCategory, isRentalsRoute, isCustomerRoute, router]);

  // Vendor has its own full layout (VenueDashboardLayout), skip the parent shell
  if (isVendorRoute) {
    return <>{children}</>;
  }

  // Rentals has its own full layout (RentalsDashboardLayout), skip the parent shell
  if (isRentalsRoute) {
    return <>{children}</>;
  }

  // Host V2 has its own fully self-contained layout — bypass this parent shell entirely
  if (isHostV2Route) {
    return <>{children}</>;
  }

  if (isCustomerRoute || isPlannerRoute) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <div className="flex-1 flex flex-col transition-all duration-300">
          <main className="flex-1 p-6 md:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    );
  }

  return (
    <DashboardProvider initialOrganizationId={initialVendorId}>
      <div className="flex h-screen overflow-hidden bg-[#FAF7F2] text-[#1D1C17] font-sans">
        {/* Sidebar (Desktop) */}
        <DashboardSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
          {/* Header */}
          <DashboardHeader />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
            {children}
          </main>

          {/* Mobile Navigation (Bottom) */}
          <DashboardMobileNav />
        </div>
      </div>
    </DashboardProvider>
  );
}
