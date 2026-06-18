'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DASHBOARD_NAVIGATION } from '@/config/navigation';
import { OrganizationSwitcher } from './OrganizationSwitcher';
import { BranchSwitcher } from './BranchSwitcher';

// Mocking user role and active modules for Phase 1 UI design
const MOCK_USER_ROLE = 'owner';
const MOCK_ACTIVE_MODULES = ['crm', 'venue_management'];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#FAF7F2] border-r border-[#E6E2DA] h-screen sticky top-0 overflow-y-auto">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-[#E6E2DA]">
        <span className="font-bold text-xl tracking-tight text-[#1D1C17]">NEXUS</span>
        <span className="ml-2 text-[10px] uppercase font-bold tracking-widest text-[#D9467A] bg-[#D9467A]/10 px-2 py-0.5 rounded-full">OS</span>
      </div>

      {/* Switchers */}
      <div className="p-4 border-b border-[#E6E2DA]">
        <OrganizationSwitcher />
        <BranchSwitcher />
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 px-3 space-y-6">
        {DASHBOARD_NAVIGATION.map((group, i) => {
          // Filter items based on mocked roles and modules
          const visibleItems = group.items.filter(item => {
            if (item.allowedRoles && !item.allowedRoles.includes(MOCK_USER_ROLE as any)) return false;
            if (item.requiredModule && !MOCK_ACTIVE_MODULES.includes(item.requiredModule)) return false;
            return true;
          });

          if (visibleItems.length === 0) return null;

          return (
            <div key={i}>
              <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-[#5E6460] mb-2">
                {group.title}
              </h3>
              <ul className="space-y-1">
                {visibleItems.map((item, j) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;
                  return (
                    <li key={j}>
                      <Link 
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive 
                            ? 'bg-[#0F5B3E] text-white' 
                            : 'text-[#1D1C17] hover:bg-[#E6E2DA]/50 hover:text-[#0F5B3E]'
                        }`}
                      >
                        <Icon size={18} className={isActive ? 'text-white' : 'text-[#5E6460]'} />
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Footer Area */}
      <div className="p-4 border-t border-[#E6E2DA]">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-[#C9A227] text-white flex items-center justify-center font-bold text-xs">
            AH
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#1D1C17] truncate">Ali Hassan</p>
            <p className="text-xs text-[#5E6460] truncate">Owner</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
