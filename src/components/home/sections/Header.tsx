"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { NexusLogo } from '@/components/layout/NexusLogo';
import { ExploreMegaMenu } from '@/components/layout/MegaMenu';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-[#FAF9F6] shadow-sm py-4' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 relative z-50">
          <NexusLogo iconColor="text-[#047857]" textColor="text-[#1E1B4B]" iconSize={32} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-[14px]">
          <Link href="/" className="text-[#1E1B4B] font-semibold transition-colors">
            Home
          </Link>
          <div className="relative group">
            <button className="flex items-center gap-1 text-[#1E1B4B]/80 hover:text-[#1E1B4B] transition-colors cursor-pointer">
              Solutions <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 font-semibold">
              <Link href="/business" className="block px-4 py-2 text-xs text-[#1E1B4B]/80 hover:bg-slate-50 hover:text-[#1E1B4B]">Business Hub</Link>
              <Link href="/events" className="block px-4 py-2 text-xs text-[#1E1B4B]/80 hover:bg-slate-50 hover:text-[#1E1B4B]">Event Management</Link>
              <Link href="/memories" className="block px-4 py-2 text-xs text-[#1E1B4B]/80 hover:bg-slate-50 hover:text-[#1E1B4B]">Event Memories</Link>
              <div className="h-[1px] bg-slate-100 my-1" />
              <Link href="/ai-planner" className="block px-4 py-2 text-xs text-[#D97706] hover:bg-amber-50">AI Shaadi Planner ✨</Link>
              <Link href="/#couples-hub" className="block px-4 py-2 text-xs text-[#047857] hover:bg-emerald-50">Couples Planning Suite ❤️</Link>
            </div>
          </div>
          <ExploreMegaMenu useDarkText={true} textColor="text-[#1E1B4B]/80 hover:text-[#1E1B4B]" />
          <Link href="/explore?focus=venues" className="text-[#1E1B4B]/80 hover:text-[#1E1B4B] transition-colors">
            Venues
          </Link>
          <Link href="/explore" className="text-[#1E1B4B]/80 hover:text-[#1E1B4B] transition-colors">
            Vendors
          </Link>
          <Link href="/explore?focus=studios" className="text-[#1E1B4B]/80 hover:text-[#1E1B4B] transition-colors">
            Professionals
          </Link>
          <Link href="/rentals" className="text-[#1E1B4B]/80 hover:text-[#1E1B4B] transition-colors">
            Rentals
          </Link>
          <Link href="/pricing" className="text-[#1E1B4B]/80 hover:text-[#1E1B4B] transition-colors">
            Pricing
          </Link>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-[14px] font-semibold text-[#1E1B4B] hover:text-[#1E1B4B]/80 transition-colors"
          >
            Log In
          </Link>
          <Link 
            href="/register" 
            className="inline-flex items-center gap-1 bg-[#047857] hover:bg-[#035f44] text-white text-[13px] font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-emerald-700/10 hover:shadow-emerald-700/20 transition-all duration-300"
          >
            Join Nexus <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#1E1B4B] relative z-50"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col justify-between p-8 pt-24 overflow-y-auto animate-in fade-in slide-in-from-top duration-300">
          <div className="space-y-6">
            <nav className="flex flex-col gap-6 text-[18px] font-semibold text-[#1E1B4B]">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#047857] transition-colors">
                Home
              </Link>
              <Link href="/ai-planner" onClick={() => setMobileMenuOpen(false)} className="text-[#D97706] hover:opacity-80 transition-all">
                AI Shaadi Planner ✨
              </Link>
              <Link href="/#couples-hub" onClick={() => setMobileMenuOpen(false)} className="text-[#047857] hover:opacity-80 transition-all">
                Couples Planning Suite ❤️
              </Link>
              <Link href="/business" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#047857] transition-colors">
                Business Hub
              </Link>
              <Link href="/explore" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#047857] transition-colors">
                Explore
              </Link>
              <Link href="/explore?focus=venues" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#047857] transition-colors">
                Venues
              </Link>
              <Link href="/explore" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#047857] transition-colors">
                Vendors
              </Link>
              <Link href="/explore?focus=studios" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#047857] transition-colors">
                Professionals
              </Link>
              <Link href="/rentals" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#047857] transition-colors">
                Rentals
              </Link>
              <Link href="/memories" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#047857] transition-colors">
                Event Memories
              </Link>
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#047857] transition-colors">
                Pricing
              </Link>
            </nav>
          </div>

          <div className="space-y-4 border-t border-slate-100 pt-6">
            <Link 
              href="/login" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center py-3 text-[15px] font-bold text-[#1E1B4B] border border-[#1E1B4B]/10 rounded-full hover:bg-slate-50 transition-all"
            >
              Log In
            </Link>
            <Link 
              href="/register" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center py-3 text-[15px] font-bold text-white bg-[#047857] rounded-full hover:bg-[#035f44] transition-all shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
