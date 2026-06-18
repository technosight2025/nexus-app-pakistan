'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DASHBOARD_NAVIGATION } from '@/config/navigation';
import { OrganizationSwitcher } from './OrganizationSwitcher';
import { BranchSwitcher } from './BranchSwitcher';
import { X } from 'lucide-react';

const MOCK_USER_ROLE = 'owner';
const MOCK_ACTIVE_MODULES = ['crm', 'venue_management'];

export function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-[#1D1C17]/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <aside className="relative flex-1 max-w-xs w-full bg-[#FAF7F2] h-full flex flex-col overflow-y-auto transform transition-transform shadow-2xl">
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#E6E2DA]">
          <div className="flex items-center">
            <span className="font-bold text-xl tracking-tight text-[#1D1C17]">NEXUS</span>
            <span className="ml-2 text-[10px] uppercase font-bold tracking-widest text-[#D9467A] bg-[#D9467A]/10 px-2 py-0.5 rounded-full">OS</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#5E6460] hover:bg-[#E6E2DA]/50 rounded-lg focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 border-b border-[#E6E2DA]">
          <OrganizationSwitcher />
          <BranchSwitcher />
        </div>

        <div className="flex-1 py-4 px-3 space-y-6">
          {DASHBOARD_NAVIGATION.map((group, i) => {
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
                          onClick={onClose}
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
      </aside>
    </div>
  );
}
