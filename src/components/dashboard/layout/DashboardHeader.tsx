'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { OrganizationSwitcher } from './OrganizationSwitcher';
import { BranchSwitcher } from './BranchSwitcher';
import { DashboardQuickActions } from './DashboardQuickActions';
import { DashboardNotifications } from './DashboardNotifications';

export function DashboardHeader() {
  return (
    <header className="h-16 border-b border-[#E6E2DA] bg-[#FFFFFF] flex items-center justify-between px-4 lg:px-8 z-10 sticky top-0">
      <div className="flex items-center gap-4 flex-1">
        {/* Global Search */}
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5E6460]" size={16} />
          <input 
            type="text" 
            placeholder="Search leads, bookings, contacts..." 
            className="w-full h-9 pl-9 pr-4 bg-[#FAF7F2] border border-[#E6E2DA] rounded-md text-sm focus:outline-none focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <OrganizationSwitcher />
        <BranchSwitcher />
        <DashboardQuickActions />
        <DashboardNotifications />

        {/* User Profile */}
        <div className="w-8 h-8 rounded-full bg-[#E6F0EC] border border-[#0F5B3E]/20 flex items-center justify-center text-[#0F5B3E] font-bold text-sm ml-2 cursor-pointer">
          AR
        </div>
      </div>
    </header>
  );
}
