'use client';

import React from 'react';
import { useDashboard } from '@/contexts/DashboardContext';

export function BranchSwitcher() {
  const { branchId } = useDashboard();

  return (
    <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 border border-[#E6E2DA] rounded-md bg-[#FAF7F2] cursor-pointer hover:bg-[#E6E2DA]/50 transition-colors">
      <span className="text-[10px] font-bold text-[#5E6460] uppercase tracking-wider">Branch</span>
      <span className="text-xs font-bold text-[#1D1C17]">{branchId ? 'Headquarters' : 'Select Branch'}</span>
    </div>
  );
}
