'use client';

import React from 'react';
import { Bell, Menu, Search } from 'lucide-react';

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="h-16 bg-[#FFFFFF] border-b border-[#E6E2DA] flex items-center justify-between px-4 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-[#5E6460] hover:bg-gray-50 rounded-lg focus:outline-none"
        >
          <Menu size={24} />
        </button>
        
        {/* Global Search - Mocked */}
        <div className="hidden sm:flex items-center bg-[#FAF7F2] border border-[#E6E2DA] rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-[#0F5B3E]/20 focus-within:border-[#0F5B3E] transition-all w-64 lg:w-96">
          <Search size={16} className="text-[#5E6460]" />
          <input 
            type="text" 
            placeholder="Search bookings, contacts, leads..." 
            className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full text-[#1D1C17] placeholder-[#5E6460]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 text-[#5E6460] hover:bg-gray-50 rounded-lg relative focus:outline-none">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D9467A] rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );
}
