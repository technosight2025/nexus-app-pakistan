'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDashboard } from '@/contexts/DashboardContext';
import { DASHBOARD_NAV } from '@/config/navigation.config';
import { ModuleSwitcher } from './ModuleSwitcher';

export function DashboardSidebar() {
  const pathname = usePathname();
  const { role, activeModules } = useDashboard();

  // Filter navigation based on RBAC & Modules
  const filteredNav = DASHBOARD_NAV.filter(item => {
    if (item.requiredRoles && role && !item.requiredRoles.includes(role)) return false;
    if (item.requiredModules && !item.requiredModules.some(m => activeModules.includes(m))) return false;
    return true;
  });

  return (
    <aside className="hidden md:flex flex-col h-screen bg-[#FAF7F2] border-r border-[#E6E2DA] transition-all duration-300 w-20 hover:w-64 group z-40 relative">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-[#E6E2DA] bg-[#FFFFFF] overflow-hidden shrink-0">
        <Link href="/dashboard" className="flex items-center gap-4 min-w-[200px]">
          <div className="w-8 h-8 bg-[#0F5B3E] rounded flex items-center justify-center text-white font-black text-lg shrink-0">
            N
          </div>
          <span className="font-black text-xl tracking-tight text-[#1D1C17] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">NEXUS</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 overflow-x-hidden custom-scrollbar">
        {filteredNav.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-3 py-2 rounded-md text-sm font-bold transition-colors min-w-[200px] ${
                isActive 
                  ? 'bg-[#E6F0EC] text-[#0F5B3E]' 
                  : 'text-[#5E6460] hover:bg-[#FFFFFF] hover:text-[#1D1C17]'
              }`}
            >
              <Icon size={18} className={`shrink-0 ${isActive ? 'text-[#0F5B3E]' : 'text-[#5E6460]'}`} />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="overflow-hidden min-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity">
        <ModuleSwitcher />
      </div>
    </aside>
  );
}
