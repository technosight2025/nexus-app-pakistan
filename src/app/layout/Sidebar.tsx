// src/app/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { LayoutDashboard, ShoppingCart, BarChart, Image as ImageIcon, Settings, Bell, Rocket } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-56 bg-surface border-r border-outline hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-4 border-b border-outline bg-primary text-primary-foreground h-12 flex items-center justify-center">
        <Link href="/" className="font-bold text-lg tracking-tight flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5" />
          NEXUS
        </Link>
      </div>
      <nav className="p-2 space-y-1 flex-1">
        <Link href="/dashboard/vendor" className="w-full flex items-center gap-3 px-3 py-2 text-primary bg-primary-container rounded font-medium text-sm">
          <LayoutDashboard className="w-5 h-5" />
          Overview
        </Link>
        <Link href="/dashboard/vendor/portfolio" className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-background rounded font-medium text-sm">
          <ImageIcon className="w-5 h-5" />
          Portfolio
        </Link>
        <Link href="/dashboard/vendor/packages" className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-background rounded font-medium text-sm">
          <ShoppingCart className="w-5 h-5" />
          Packages
        </Link>
        <Link href="/dashboard/vendor/analytics" className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-background rounded font-medium text-sm">
          <BarChart className="w-5 h-5" />
          Analytics
        </Link>
        <Link href="/test" className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-background rounded font-medium text-sm">
          <Rocket className="w-5 h-5" />
          Test
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
