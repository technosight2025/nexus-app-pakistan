// src/app/layout/MobileNav.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, LayoutDashboard, ShoppingCart, BarChart, Image as ImageIcon } from "lucide-react";

export default function MobileNav() {
  const [open, setOpen] = useState(true);

  // Simple slide‑over drawer for mobile navigation
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-surface shadow-lg transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-outline bg-primary text-primary-foreground">
          <Link href="/" className="font-bold text-lg flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5" />
            NEXUS
          </Link>
          <button onClick={() => setOpen(false)} className="text-white hover:opacity-80">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <Link
            href="/dashboard/vendor"
            className="flex items-center gap-3 px-3 py-2 text-primary bg-primary-container rounded"
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </Link>
          <Link
            href="/dashboard/vendor/portfolio"
            className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-background rounded"
          >
            <ImageIcon className="w-4 h-4" />
            Portfolio
          </Link>
          <Link
            href="/dashboard/vendor/packages"
            className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-background rounded"
          >
            <ShoppingCart className="w-4 h-4" />
            Packages
          </Link>
          <Link
            href="/dashboard/vendor/analytics"
            className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-background rounded"
          >
            <BarChart className="w-4 h-4" />
            Analytics
          </Link>
        </nav>
      </aside>
    </>
  );
}
