"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, DollarSign, ListTodo, MessageSquare, LineChart, CheckCircle2, ChevronRight, Bell, Search, Sparkles } from 'lucide-react';

const TABS = [
  { id: 'bookings', label: 'Bookings', icon: CheckCircle2 },
  { id: 'crm', label: 'CRM', icon: Users },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'revenue', label: 'Revenue', icon: DollarSign },
  { id: 'projects', label: 'Projects', icon: ListTodo },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'analytics', label: 'Analytics', icon: LineChart }
];

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <section className="py-24 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] font-black uppercase text-[#047857] tracking-[0.25em] bg-emerald-50 px-4.5 py-1.5 rounded-full border border-emerald-100">
            BUSINESS WORKSPACE PREVIEW
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-[#1E1B4B] tracking-tight animate-fade-in">
            Run Your Entire Creative Business From One Dashboard
          </h2>
          <p className="text-[#1E1B4B]/60 text-sm md:text-base font-medium max-w-xl mx-auto">
            Get the full operational power of CRM, automated payouts, scheduling, client chat, and live metrics unified inside one premium SaaS workspace.
          </p>
        </div>

        {/* Dashboard Shell Grid */}
        <div className="bg-white border border-[#E6E2DA] rounded-[2.5rem] shadow-xl overflow-hidden min-h-[520px] flex flex-col md:flex-row">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-slate-50 border-r border-[#E6E2DA] p-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="flex items-center gap-3 border-b border-[#E6E2DA] pb-4">
                <div className="w-10 h-10 rounded-xl bg-[#047857]/10 flex items-center justify-center text-[#047857]">
                  <Sparkles className="w-5.5 h-5.5 fill-[#D97706] text-[#D97706]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#1E1B4B]">Zain Studios</div>
                  <div className="text-[10px] font-mono font-bold text-[#047857]">PRO PARTNER</div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-1">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                        isActive 
                          ? 'bg-[#1E1B4B] text-white shadow-sm' 
                          : 'text-[#1E1B4B]/70 hover:bg-slate-200/50'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-white" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Simulated Version Flag */}
            <div className="text-[10px] font-mono text-slate-400 mt-6 text-left">
              NEXUS CORE OS V5.2 // LHR
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow p-6 md:p-8 text-left bg-white flex flex-col justify-between">
            
            {/* Header Control */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl max-w-xs w-full">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <input 
                  type="text" 
                  disabled
                  placeholder="Search bookings, invoices..." 
                  className="bg-transparent text-[11px] font-semibold text-slate-400 outline-hidden w-full cursor-not-allowed" 
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bell className="w-4 h-4 text-[#1E1B4B]/80" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500" />
                </div>
                <div className="w-7 h-7 rounded-full bg-[#1E1B4B] text-white flex items-center justify-center text-[10px] font-black">
                  ZS
                </div>
              </div>
            </div>

            {/* Dynamic Viewports based on activeTab */}
            <div className="flex-grow flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  
                  {activeTab === 'bookings' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold font-heading text-[#1E1B4B]">Active Bookings</h3>
                        <span className="text-[10px] font-mono bg-emerald-50 text-[#047857] px-2 py-0.5 rounded-full font-bold border border-emerald-100">3 UPDATED</span>
                      </div>
                      <div className="border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">
                        {[
                          { name: 'Ayesha & Bilal Wedding', date: 'June 26, 2026', type: 'Photography', status: 'Confirmed', price: 'PKR 120,000' },
                          { name: 'Engro Corporate Gala', date: 'July 04, 2026', type: 'Videography', status: 'Pending Deposit', price: 'PKR 250,000' },
                          { name: 'Maria Bridal Couture Shoot', date: 'July 18, 2026', type: 'Complete Production', status: 'Confirmed', price: 'PKR 450,000' }
                        ].map((b, i) => (
                          <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors gap-2">
                            <div>
                              <div className="text-xs font-bold text-[#1E1B4B]">{b.name}</div>
                              <div className="text-[10px] text-slate-400 font-semibold">{b.type} · {b.date}</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold text-[#1E1B4B] font-mono">{b.price}</span>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                b.status === 'Confirmed' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                  : 'bg-amber-50 text-amber-600 border border-amber-100'
                              }`}>
                                {b.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'crm' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold font-heading text-[#1E1B4B]">Client Database</h3>
                        <span className="text-[10px] font-mono bg-[#1E1B4B]/5 text-[#1E1B4B] px-2.5 py-0.5 rounded-full font-bold">128 CONTACTS</span>
                      </div>
                      <div className="border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">
                        {[
                          { name: 'Tariq Mahmood', email: 'tariq@gmail.com', phone: '+92 300 4567891', city: 'Lahore', status: 'Active' },
                          { name: 'Ayesha Khan', email: 'ayesha@wedding.pk', phone: '+92 321 9876543', city: 'Karachi', status: 'Lead' },
                          { name: 'Bilal Siddiqui', email: 'bilal@engro.com', phone: '+92 333 1234567', city: 'Islamabad', status: 'Inactive' }
                        ].map((c, i) => (
                          <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-50/50 gap-2">
                            <div>
                              <div className="text-xs font-bold text-[#1E1B4B]">{c.name}</div>
                              <div className="text-[10px] text-slate-400 font-semibold">{c.email} · {c.phone}</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-semibold text-slate-500">{c.city}</span>
                              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                                c.status === 'Active' 
                                  ? 'bg-emerald-50 text-[#047857] border border-emerald-100' 
                                  : c.status === 'Lead' 
                                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-150' 
                                    : 'bg-slate-100 text-slate-500'
                              }`}>
                                {c.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'calendar' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold font-heading text-[#1E1B4B]">Live Reservation Slot Calendar</h3>
                      <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-[#1E1B4B]/50 border-b border-slate-100 pb-2">
                        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => <span key={d}>{d}</span>)}
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {[...Array(28)].map((_, i) => {
                          const dateNum = i + 1;
                          const isBooked = dateNum === 12 || dateNum === 18 || dateNum === 19 || dateNum === 26;
                          return (
                            <div 
                              key={i} 
                              className={`h-11 rounded-lg flex flex-col justify-between p-1.5 relative border transition-all ${
                                isBooked 
                                  ? 'bg-indigo-50 border-indigo-150 text-[#1E1B4B]' 
                                  : 'bg-slate-50/50 border-slate-100 hover:border-slate-400 text-slate-700'
                              }`}
                            >
                              <span className="text-[9px] font-bold">{dateNum}</span>
                              {isBooked && (
                                <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#D97706]" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {activeTab === 'revenue' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { label: 'MONTHLY REVENUE', val: 'PKR 1.25M', pct: '+12.4%' },
                          { label: 'ACTIVE INVOICES', val: '8 Invoices', pct: 'Pending' },
                          { label: 'COMMS PAID OUT', val: 'PKR 340,000', pct: 'Automated' }
                        ].map((s, idx) => (
                          <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-left">
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</div>
                            <div className="text-lg font-extrabold text-[#1E1B4B] font-mono mt-1">{s.val}</div>
                            <div className="text-[9px] text-[#047857] font-bold mt-1">{s.pct}</div>
                          </div>
                        ))}
                      </div>
                      <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 flex flex-col items-center justify-center min-h-[140px]">
                        <span className="text-xs text-slate-400 font-bold mb-2">Automated Revenue Splits & Cash Ledger Streams</span>
                        <div className="flex gap-1.5 items-end h-20 w-44">
                          {[30, 45, 60, 40, 80, 50, 95].map((h, idx) => (
                            <div key={idx} className="bg-[#047857] w-5 rounded-t-xs hover:bg-[#D97706] transition-colors" style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'projects' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold font-heading text-[#1E1B4B]">Project Checklist & Milestones</h3>
                      <div className="space-y-3.5">
                        {[
                          { title: 'Baraat Shoot Moodboard Prep', pct: 100, status: 'Completed' },
                          { title: 'Venue Walkthrough & Light Audit', pct: 60, status: 'In Progress' },
                          { title: 'Final Gallery Selection Upload', pct: 0, status: 'Not Started' }
                        ].map((p, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-bold text-[#1E1B4B]">{p.title}</span>
                              <span className="font-mono text-slate-400 font-bold">{p.pct}%</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#047857]" style={{ width: `${p.pct}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'messages' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold font-heading text-[#1E1B4B]">Client Chat Room</h3>
                      <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 max-h-56 overflow-y-auto space-y-4">
                        {[
                          { sender: 'Ayesha Khan', msg: 'Hi Zain, can we confirm the lighting details for the Barat stage backdrop?', time: '09:42 AM' },
                          { sender: 'Zain Studios', msg: 'Sure Ayesha, I will visit the venue to audit the setup tomorrow. Will update you on the timeline.', time: '09:45 AM' }
                        ].map((m, idx) => (
                          <div key={idx} className={`flex flex-col ${m.sender.includes('Zain') ? 'items-end' : 'items-start'}`}>
                            <span className="text-[9px] text-slate-400 font-bold mb-0.5">{m.sender} · {m.time}</span>
                            <div className={`p-3 rounded-2xl text-xs font-semibold max-w-xs ${
                              m.sender.includes('Zain') 
                                ? 'bg-[#1E1B4B] text-white rounded-tr-xs' 
                                : 'bg-white border border-slate-200 text-[#1E1B4B] rounded-tl-xs'
                            }`}>
                              {m.msg}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'analytics' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold font-heading text-[#1E1B4B]">Operational Performance Analytics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        {[
                          { metric: 'Conversion Rate', val: '8.4%', bg: 'bg-emerald-50 text-[#047857] border-emerald-100' },
                          { metric: 'Lead Response', val: '14 mins', bg: 'bg-indigo-50 text-indigo-700 border-indigo-150' },
                          { metric: 'Retention Score', val: '9.8 / 10', bg: 'bg-amber-50 text-amber-600 border-amber-100' },
                          { metric: 'Staff Utilization', val: '88.2%', bg: 'bg-purple-50 text-purple-750 border-purple-100' }
                        ].map((a, idx) => (
                          <div key={idx} className={`p-4.5 rounded-2xl border ${a.bg}`}>
                            <div className="text-[10px] font-bold uppercase tracking-wider">{a.metric}</div>
                            <div className="text-xl font-extrabold font-mono mt-1">{a.val}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Actions Summary */}
            <div className="border-t border-slate-100 pt-6 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold">
              <span className="text-slate-400">Manage client agreements, CRM leads, and reservation schedules seamlessly.</span>
              <button className="bg-[#047857] hover:bg-[#035f44] text-white px-5 py-2.5 rounded-full transition-all shrink-0 cursor-pointer">
                Launch Live Sandbox
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
