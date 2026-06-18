// src/app/layout/MainLayout.tsx
"use client";

import React, { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { useResponsive } from "../hooks/useResponsive";
import { usePathname } from "next/navigation";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isDesktop } = useResponsive();
  const pathname = usePathname();

  const isDashboardOrAuth = pathname?.startsWith('/dashboard') || 
                            pathname?.startsWith('/login') || 
                            pathname?.startsWith('/signup') || 
                            pathname?.startsWith('/forgot-password') || 
                            pathname?.startsWith('/reset-password');

  if (isDashboardOrAuth) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

