"use client";

import React from 'react';
import Link from 'next/link';
import { NexusLogo } from '@/components/layout/NexusLogo';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#FAF9F6] border-t border-[#E6E2DA] pt-20 pb-10 text-xs font-light text-slate-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-6 gap-8 mb-16 text-left">
        
        {/* Brand Summary Column */}
        <div className="md:col-span-2 space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <NexusLogo iconColor="text-[#047857]" textColor="text-[#1E1B4B]" iconSize={32} />
          </Link>
          <p className="text-[#1E1B4B]/70 text-xs font-medium leading-relaxed max-w-xs">
            The modern operating system for Pakistan's creative production industry. Empowering professionals and clients inside a secure, unified ecosystem.
          </p>
          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[9px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#047857]" /> Verified Security Audits
          </div>
        </div>

        {/* Directory Columns */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase text-[#1E1B4B] tracking-[0.2em] font-sans">
            Marketplace
          </h4>
          <ul className="space-y-2.5 font-medium">
            <li><Link href="/explore?focus=studios" className="text-slate-400 hover:text-[#047857]">Photographers</Link></li>
            <li><Link href="/explore?focus=studios" className="text-slate-400 hover:text-[#047857]">Videographers</Link></li>
            <li><Link href="/explore?focus=studios" className="text-slate-400 hover:text-[#047857]">Makeup Artists</Link></li>
            <li><Link href="/explore" className="text-slate-400 hover:text-[#047857]">Decorator Studios</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase text-[#1E1B4B] tracking-[0.2em] font-sans">
            Ecosystem
          </h4>
          <ul className="space-y-2.5 font-medium">
            <li><Link href="/business" className="text-slate-400 hover:text-[#047857]">Business Hub</Link></li>
            <li><Link href="/memories" className="text-slate-400 hover:text-[#047857]">Event Memories</Link></li>
            <li><Link href="/explore?focus=rentals" className="text-slate-400 hover:text-[#047857]">Rentals Directory</Link></li>
            <li><Link href="/explore?focus=venues" className="text-slate-400 hover:text-[#047857]">Search Venues</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase text-[#1E1B4B] tracking-[0.2em] font-sans">
            Company
          </h4>
          <ul className="space-y-2.5 font-medium">
            <li><Link href="/pricing" className="text-slate-400 hover:text-[#047857]">Pricing Plans</Link></li>
            <li><Link href="/about" className="text-slate-400 hover:text-[#047857]">About Us</Link></li>
            <li><Link href="/careers" className="text-slate-400 hover:text-[#047857]">Careers</Link></li>
            <li><Link href="/contact" className="text-slate-400 hover:text-[#047857]">Contact Support</Link></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase text-[#1E1B4B] tracking-[0.2em] font-sans">
            Newsletter
          </h4>
          <p className="text-slate-400 text-[11px] font-medium leading-relaxed">
            Get platform updates, feature releases, and local industry news.
          </p>
          <div className="flex bg-white border border-[#E6E2DA] rounded-xl p-1 shadow-xs">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="bg-transparent border-none outline-hidden text-[#1E1B4B] text-[11px] px-2.5 py-1.5 flex-grow font-semibold placeholder-slate-400" 
            />
            <button className="bg-[#047857] hover:bg-[#035f44] text-white p-2 rounded-lg cursor-pointer">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-[#E6E2DA] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-400">
        <span>NEXUS CREATIVE OS © 2026. ALL RIGHTS RESERVED. // LAHORE, PAKISTAN</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-[#1E1B4B]">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#1E1B4B]">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
