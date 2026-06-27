"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Camera, Utensils, Sparkles, 
  ArrowRight, Check, CheckCircle2, MessageSquare, 
  FileText, Calendar, Users 
} from 'lucide-react';

interface ConsoleTab {
  id: string;
  name: string;
  headline: string;
  description: string;
  icon: any;
  benefits: string[];
  color: string;
}

const TABS: ConsoleTab[] = [
  {
    id: 'venues',
    name: 'Marquees & Venues',
    headline: 'Eliminate Double-Bookings & Secure Your Revenue',
    description: 'Lock booking slots in real-time, detect scheduling conflicts automatically, and run daily wagers payroll from a unified dashboard.',
    icon: Building2,
    benefits: [
      'Automatic date-conflict locks',
      'Digital signage control in lobbies',
      'Daily wagers & waiters check-in logs',
      'Integrated hall maintenance trackers'
    ],
    color: 'emerald'
  },
  {
    id: 'caterers',
    name: 'Catering & Pakwans',
    headline: 'Maximize Profit Margins with Precision Costing',
    description: 'Calculate per-head menu pricing dynamically, track raw inventory depletion, and monitor kitchen wagers from one cost control console.',
    icon: Utensils,
    benefits: [
      'Dynamic per-head quotation builder',
      'Real-time raw ingredient tracking',
      'Automated gross-margin calculation',
      'Kitchen team scheduling & shifts'
    ],
    color: 'orange'
  },
  {
    id: 'studios',
    name: 'Studios & Media',
    headline: 'Streamline Photo Proofing & Media Deliveries',
    description: 'Provide clients with high-speed web proofing, time-coded video review tools, and automate payment milestone notifications.',
    icon: Camera,
    benefits: [
      'Client photo shortlisting dashboard',
      'Time-based video feedback timeline',
      'Camera & gear rental inventory',
      'Auto-triggered deposit reminders'
    ],
    color: 'blue'
  },
  {
    id: 'decorators',
    name: 'Floral & Decor',
    headline: 'Track Floral & Furniture Assets with Moodboards',
    description: 'Organize high-value floral structures, verify setup crew check-in locations via GPS, and build custom visual moodboards for client approvals.',
    icon: Sparkles,
    benefits: [
      'Flower & furniture asset registry',
      'Collaborative moodboard sharing',
      'Setup crew check-in tracking',
      'Sub-contracting proposal managers'
    ],
    color: 'purple'
  }
];

export function BusinessConsole() {
  const [activeTabId, setActiveTabId] = useState<string>('venues');
  const activeTab = TABS.find(t => t.id === activeTabId) || TABS[0];

  const getTabStyles = (color: string) => {
    switch (color) {
      case 'emerald': return { text: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', accent: 'bg-emerald-500' };
      case 'orange': return { text: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/25', accent: 'bg-orange-500' };
      case 'blue': return { text: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/25', accent: 'bg-blue-500' };
      default: return { text: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/25', accent: 'bg-purple-500' };
    }
  };

  const activeStyles = getTabStyles(activeTab.color);

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-[1300px] mx-auto px-6">
        
        {/* Navigation Tabs Selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-16 border-b border-slate-200/60 pb-8">
          {TABS.map((tab) => {
            const isActive = tab.id === activeTabId;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-white text-slate-550 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Unified Dashboard Console Grid */}
        <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-8 text-left">
              <span className={`inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${activeStyles.bg} ${activeStyles.text} ${activeStyles.border} border`}>
                Enterprise Feature Panel
              </span>
              
              <h3 className="text-3xl md:text-4xl font-serif font-black text-slate-950 leading-tight">
                {activeTab.headline}
              </h3>
              
              <p className="text-slate-650 text-sm leading-relaxed text-slate-600">
                {activeTab.description}
              </p>

              {/* Value benefits list */}
              <ul className="space-y-4 pt-2">
                {activeTab.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-800 font-medium text-sm">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${activeStyles.text}`} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* touch friendly Action Trigger */}
              <div className="pt-4">
                <a 
                  href="https://wa.me/923001234567?text=Hi%20Nexus%20Business%20Team,%20I'd%20like%20to%20request%20a%20demo."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-950 hover:underline min-h-[44px] py-2"
                >
                  Book Setup Walkthrough <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Interactive Dashboard Simulation Column */}
            <div className="lg:col-span-6 w-full">
              <div className="aspect-square md:aspect-[4/3] rounded-[2rem] bg-slate-950 border border-white/10 relative overflow-hidden p-6 shadow-2xl flex flex-col justify-between text-neutral-200">
                {/* Header Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="font-mono text-[9px] text-slate-400 ml-2">NEXUS Business Engine • active</span>
                  </div>
                  <span className="font-mono text-[9px] text-[#E6C594] uppercase tracking-wider">Live Panel</span>
                </div>

                {/* Dashboard Previews */}
                <div className="flex-1 overflow-hidden relative flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full flex flex-col justify-center"
                    >
                      {activeTab.id === 'venues' && (
                        <div className="bg-slate-900 rounded-xl p-3 border border-white/5 space-y-3">
                          <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-2 text-slate-400">
                            <span>Availability Calendar • Oct 2026</span>
                            <span className="text-red-400 font-bold uppercase tracking-wider text-[8px]">Conflict Alert Auto-Lock</span>
                          </div>
                          <div className="grid grid-cols-7 gap-1.5 text-center text-[9px] font-mono text-slate-500">
                            {['M','T','W','T','F','S','S'].map((day, dIdx) => <span key={dIdx}>{day}</span>)}
                            {Array.from({ length: 14 }).map((_, dayIdx) => {
                              const dayNum = dayIdx + 12;
                              const isBooked = dayNum === 16 || dayNum === 17 || dayNum === 24;
                              return (
                                <div 
                                  key={dayIdx} 
                                  className={`py-1.5 rounded-md border flex flex-col items-center justify-center font-bold ${
                                    isBooked 
                                      ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                                      : 'bg-white/5 border-white/5 text-slate-300'
                                  }`}
                                >
                                  <span>{dayNum}</span>
                                  {isBooked && <span className="text-[5px] uppercase tracking-tighter text-red-500 font-black">Booked</span>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {activeTab.id === 'caterers' && (
                        <div className="bg-slate-900 rounded-xl p-4 border border-white/5 space-y-3">
                          <div className="flex justify-between items-center text-[11px] border-b border-white/5 pb-2 text-slate-400">
                            <span>Quotation Draft #8920</span>
                            <span className="text-[#E6C594] font-mono">Rs. 845,000</span>
                          </div>
                          <div className="space-y-1.5 text-xs text-slate-300">
                            <div className="flex justify-between py-1 border-b border-white/5">
                              <span>Banquet Hall Booking</span>
                              <span className="font-mono text-white">Rs. 450,000</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-white/5">
                              <span>Desi Catering Setup (300 heads)</span>
                              <span className="font-mono text-white">Rs. 240,000</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-white/5">
                              <span>Floral Moodboard Decor</span>
                              <span className="font-mono text-white">Rs. 155,000</span>
                            </div>
                          </div>
                          <div className="pt-2 flex justify-between items-center">
                            <span className="text-[10px] text-[#E6C594] font-bold uppercase tracking-wider">Estimated Profit: 34.2%</span>
                            <span className="bg-[#E6C594] text-slate-950 font-bold px-3 py-1 rounded text-[9px] uppercase">Generate PDF</span>
                          </div>
                        </div>
                      )}

                      {activeTab.id === 'studios' && (
                        <div className="bg-slate-900 rounded-xl p-3 border border-white/5 space-y-3">
                          <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-2 text-slate-400">
                            <span>Client Photo Selection • Wedding ID #104</span>
                            <span className="text-slate-300 font-bold">240 / 600 Selected</span>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {[
                              "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=150",
                              "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=150",
                              "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=150",
                              "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=150"
                            ].map((img, i) => (
                              <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-white/15">
                                <img src={img} className="w-full h-full object-cover" alt="" />
                                <div className="absolute top-1 right-1 bg-emerald-500 rounded-full p-0.5 text-white">
                                  <Check className="w-2.5 h-2.5 stroke-2" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeTab.id === 'decorators' && (
                        <div className="bg-slate-900 rounded-xl p-4 border border-white/5 space-y-3">
                          <div className="flex justify-between items-center text-[11px] border-b border-white/5 pb-2 text-slate-400">
                            <span>Inbound WhatsApp Inquiries</span>
                            <span className="text-emerald-500 font-bold">• 4 New Leads</span>
                          </div>
                          <div className="space-y-2">
                            <div className="p-2 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between text-xs text-white">
                              <div>
                                <span className="font-bold block text-left">Siddiqui Family (Baraat)</span>
                                <span className="text-[10px] text-slate-400 block text-left">"Looking for menu pricing..."</span>
                              </div>
                              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] rounded-md font-bold uppercase">Assign</span>
                            </div>
                            <div className="p-2 bg-white/5 border border-white/5 rounded-lg flex items-center justify-between text-xs text-white">
                              <div>
                                <span className="font-bold block text-left">Bilal & Ayesha (Mehndi)</span>
                                <span className="text-[10px] text-slate-400 block text-left">"Sent quotation proposal..."</span>
                              </div>
                              <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] rounded-md font-bold uppercase">Follow Up</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer bar */}
                <div className="shrink-0 pt-3 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-slate-500">
                  <span>Interactive Console View</span>
                  <span className="text-slate-450 font-bold uppercase">Touch Friendly</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
