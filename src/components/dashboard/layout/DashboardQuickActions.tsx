'use client';

import React from 'react';
import { Plus } from 'lucide-react';

export function DashboardQuickActions() {
  return (
    <button className="flex items-center gap-1 bg-[#0F5B3E] text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-[#0c4931] transition-colors">
      <Plus size={14} />
      <span className="hidden sm:inline">New</span>
    </button>
  );
}
