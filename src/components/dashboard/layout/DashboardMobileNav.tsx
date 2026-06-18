'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MOBILE_BOTTOM_NAV } from '@/config/navigation.config';

export function DashboardMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#FFFFFF] border-t border-[#E6E2DA] flex items-center justify-around px-2 z-50 safe-area-pb">
      {MOBILE_BOTTOM_NAV.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive ? 'text-[#0F5B3E]' : 'text-[#5E6460] hover:text-[#1D1C17]'
            }`}
          >
            <Icon size={20} className={isActive ? 'fill-[#0F5B3E]/10' : ''} />
            <span className="text-[10px] font-bold">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
