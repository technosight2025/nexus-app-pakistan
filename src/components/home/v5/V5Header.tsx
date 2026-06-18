"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NexusLogo } from '@/components/layout/NexusLogo';

export function V5Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-gray-200/50 transition-all">
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <NexusLogo iconColor="text-[#0F5B3E]" textColor="text-[#0F5B3E]" iconSize={30} />
          </Link>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['Platform', 'Solutions', 'Marketplace', 'Company'].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#0F5B3E] transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-xs font-bold uppercase tracking-wider text-[#1F2937] hover:text-[#0F5B3E] transition-colors">
              Log in
            </Link>
            <Link 
              href="/signup" 
              className="text-xs font-bold uppercase tracking-wider bg-[#0F5B3E] text-white px-5 py-3 rounded-xl hover:bg-[#0F5B3E]/95 transition-colors shadow-sm"
            >
              Get Started
            </Link>
          </div>
          
          {/* Mobile Toggle Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#1F2937] p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#FAF7F2] border-b border-gray-200 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {['Platform', 'Solutions', 'Marketplace', 'Company'].map((item) => (
                <Link 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold uppercase tracking-wider text-gray-600 hover:text-[#0F5B3E] py-2"
                >
                  {item}
                </Link>
              ))}
              <div className="h-[1px] bg-gray-200 my-2" />
              <Link 
                href="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-wider text-[#1F2937] hover:text-[#0F5B3E] py-2"
              >
                Log in
              </Link>
              <Link 
                href="/signup" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 bg-[#0F5B3E] text-white rounded-xl text-xs font-bold uppercase tracking-widest text-center shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
