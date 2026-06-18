// src/app/layout/Header.tsx
"use client";

import Link from "next/link";
import { Settings, Bell, User } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export default function Header() {
  // Mock user for demo; replace with real auth hook if needed
  const user = { name: "Demo User" };

  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white shadow-md">
      <Link href="/" className="flex items-center space-x-2">
        <Settings className="w-6 h-6" />
        <span className="text-xl font-bold">NEXUS Dashboard</span>
      </Link>
      <div className="flex items-center space-x-4">
        {/* Org switcher placeholder */}
        <select className="rounded bg-white bg-opacity-20 text-white focus:outline-none px-2 py-1">
          <option>Org A</option>
          <option>Org B</option>
        </select>
        <Bell className="w-5 h-5 cursor-pointer hover:opacity-80" />
        <User className="w-5 h-5 cursor-pointer hover:opacity-80" />
        <span className="ml-2 text-sm">{user.name}</span>
      </div>
    </header>
  );
}
