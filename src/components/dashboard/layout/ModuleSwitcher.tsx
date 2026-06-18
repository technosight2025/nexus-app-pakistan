'use client';

import React from 'react';
import { Building2 } from 'lucide-react';

export function ModuleSwitcher() {
  return (
    <div className="p-4 border-t border-[#E6E2DA] bg-[#FFFFFF]">
      <button className="w-full flex items-center justify-between px-3 py-2 border border-[#E6E2DA] rounded-md bg-[#FAF7F2] hover:bg-[#E6E2DA]/50 transition-colors">
        <div className="flex items-center gap-2">
          <Building2 size={16} className="text-[#0F5B3E]" />
          <span className="text-xs font-bold text-[#1D1C17]">App Modules</span>
        </div>
      </button>
    </div>
  );
}
