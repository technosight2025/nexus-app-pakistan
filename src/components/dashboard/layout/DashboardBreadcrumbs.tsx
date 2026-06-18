'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function DashboardBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <div className="flex items-center gap-2 text-xs font-medium text-[#5E6460] mb-6">
      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join('/')}`;
        const isLast = index === segments.length - 1;
        const formattedSegment = segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <React.Fragment key={path}>
            {index > 0 && <span>/</span>}
            {isLast ? (
              <span className="text-[#1D1C17] font-bold">{formattedSegment}</span>
            ) : (
              <Link href={path} className="hover:text-[#1D1C17] transition-colors">
                {formattedSegment}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
