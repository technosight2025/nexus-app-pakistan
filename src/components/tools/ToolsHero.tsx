"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Calendar, Image, FileText, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export function ToolsHero() {
  const activeTools = [
    { name: 'Guest Manager', icon: Calendar, color: 'text-[#0F5B3E]', bg: 'bg-[#E6F0EC]' },
    { name: 'Budget Planner', icon: FileText, color: 'text-[#D9467A]', bg: 'bg-[#FDF0F4]' },
    { name: 'Venue Dashboard', icon: CheckCircle2, color: 'text-[#C9A227]', bg: 'bg-[#FDF8EA]' },
    { name: 'Leads Pipeline', icon: Plus, color: 'text-indigo-600', bg: 'bg-indigo-50' }
  ];

  return (
    <div className="w-full bg-[#FAF7F2] pt-32 pb-16 px-4 md:px-8 border-b border-[#E6E2DA]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Hero Content */}
        <div className="lg:col-span-12 flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-[#1D1C17] tracking-tight mb-4"
          >
            Your Event & Business <span className="text-[#0F5B3E]">Toolkit</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#5E6460] font-medium max-w-2xl mx-auto mb-8"
          >
            Activate powerful apps and modules to manage every part of your event or business.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative w-full max-w-xl mx-auto mb-16"
          >
            <input 
              type="text" 
              placeholder="Search tools, apps, workflows, templates..."
              className="w-full bg-white border border-[#E6E2DA] rounded-full pl-14 pr-6 py-4 text-[#1D1C17] text-lg font-medium shadow-sm focus:outline-none focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E] transition-all"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#5E6460]" />
          </motion.div>
        </div>

        {/* Bottom Split: Quick Actions & Active Tools */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E6E2DA] shadow-sm">
          <h3 className="font-bold text-[#1D1C17] mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#0F5B3E]" />
            Quick Actions
          </h3>
          <div className="flex flex-col gap-2">
            <Link href="/create-event" className="w-full px-4 py-3 bg-[#FAF7F2] hover:bg-[#E6F0EC] text-[#1D1C17] hover:text-[#0F5B3E] font-semibold rounded-xl transition-colors flex items-center gap-3">
              <Calendar className="w-4 h-4" /> Create Event
            </Link>
            <Link href="/invite" className="w-full px-4 py-3 bg-[#FAF7F2] hover:bg-[#E6F0EC] text-[#1D1C17] hover:text-[#0F5B3E] font-semibold rounded-xl transition-colors flex items-center gap-3">
              <FileText className="w-4 h-4" /> Create Invitation
            </Link>
            <button className="w-full px-4 py-3 bg-[#FAF7F2] hover:bg-[#E6F0EC] text-[#1D1C17] hover:text-[#0F5B3E] font-semibold rounded-xl transition-colors flex items-center gap-3">
              <Image className="w-4 h-4" /> Upload Memories
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#E6E2DA] shadow-sm overflow-hidden">
          <h3 className="font-bold text-[#1D1C17] mb-4">My Active Tools</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {activeTools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div key={idx} className="min-w-[160px] p-4 rounded-2xl border border-[#E6E2DA] hover:border-[#0F5B3E] transition-colors cursor-pointer group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${tool.bg}`}>
                    <Icon className={`w-5 h-5 ${tool.color}`} />
                  </div>
                  <p className="font-bold text-[#1D1C17] text-sm group-hover:text-[#0F5B3E] transition-colors">{tool.name}</p>
                  <p className="text-xs text-[#5E6460] mt-1">Ready</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
