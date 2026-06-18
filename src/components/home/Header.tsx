import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { NexusLogo } from '@/components/layout/NexusLogo';

export default function Header() {
  return (
    <header className="w-full bg-[#FAF7F2] h-[80px] flex items-center border-b border-transparent">
      <div className="max-w-[1280px] mx-auto w-full px-6 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center">
          <NexusLogo iconColor="text-[#0F5B3E]" textColor="text-[#1F2937]" iconSize={30} />
        </Link>


        {/* Center: Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-[14px] font-medium text-[#1F2937] border-b-2 border-[#1F2937] pb-1">
            Home
          </Link>
          <button className="flex items-center gap-1.5 text-[14px] font-medium text-[#4B5563] hover:text-[#1F2937] transition-colors pb-1">
            Solutions <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button className="flex items-center gap-1.5 text-[14px] font-medium text-[#4B5563] hover:text-[#1F2937] transition-colors pb-1">
            Marketplace <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <Link href="/invite" className="text-[14px] font-medium text-[#4B5563] hover:text-[#1F2937] transition-colors pb-1">
            Invitations
          </Link>
          <Link href="/memories" className="text-[14px] font-medium text-[#4B5563] hover:text-[#1F2937] transition-colors pb-1">
            Memories
          </Link>
          <Link href="/displays" className="text-[14px] font-medium text-[#4B5563] hover:text-[#1F2937] transition-colors pb-1">
            Displays
          </Link>
          <Link href="/pricing" className="text-[14px] font-medium text-[#4B5563] hover:text-[#1F2937] transition-colors pb-1">
            Pricing
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Link 
            href="/login" 
            className="px-6 py-2 text-[14px] font-semibold text-[#1F2937] bg-white border border-[#E5E7EB] rounded-full hover:bg-gray-50 transition-colors"
          >
            Log In
          </Link>
          <Link 
            href="/register" 
            className="px-6 py-2 text-[14px] font-semibold text-white bg-[#0F5B3E] rounded-full hover:bg-[#0d4d34] transition-colors"
          >
            Get Started
          </Link>
        </div>

      </div>
    </header>
  );
}
