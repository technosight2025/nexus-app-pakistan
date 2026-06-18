"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { 
  Calendar, 
  Bell, 
  ShieldCheck, 
  PlayCircle, 
  ArrowRight, 
  Check, 
  Users, 
  Tv, 
  CloudUpload, 
  TrendingUp, 
  Search,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export function V5Hero() {
  const [lang, setLang] = useState<'en' | 'ur'>('en');

  const content = {
    en: {
      pill: "The Modern Standard",
      title: "Pakistan's Event & Business",
      titleAccent: "Operating System.",
      subtitle: "Plan events. Run businesses. Manage venues. Preserve memories. Power experiences. One unified platform built for the future of Pakistani hospitality.",
      btnPrimary: "Start Your Event",
      btnSecondary: "Grow Your Business",
      btnDemo: "Watch Demo",
      enterprise: "Enterprise Grade",
      certified: "ISO 27001 Certified"
    },
    ur: {
      pill: "Jadeed Tareen Nizaam",
      title: "Pakistan ka Event aur Karobar ka",
      titleAccent: "Operating System.",
      subtitle: "Events plan karein. Business chalayein. Venues manage karein. Yaadein mehfooz karein. Aik hi platform par jo Pakistani hospitality ke mustaqbil ke liye bana hai.",
      btnPrimary: "Event Shuru Karein",
      btnSecondary: "Karobar Barhayein",
      btnDemo: "Demo Dekhein",
      enterprise: "Aala Martaba",
      certified: "ISO 27001 Tasdeeq Shuda"
    }
  };

  const activeContent = content[lang];

  return (
    <section className="relative pt-12 pb-24 overflow-hidden bg-[#FAF7F2]">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#0F5B3E]/5 to-[#D9467A]/5 blur-3xl opacity-60 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#C9A227]/5 to-[#0F5B3E]/5 blur-3xl opacity-40 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <Container>
        {/* Language Selection Bar */}
        <div className="flex justify-start mb-8 relative z-20">
          <div className="bg-white/80 backdrop-blur-sm p-1 rounded-full border border-gray-200/80 shadow-sm flex items-center gap-1">
            <button 
              onClick={() => setLang('en')} 
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${lang === 'en' ? 'bg-[#0F5B3E] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#1F2937]'}`}
            >
              English
            </button>
            <button 
              onClick={() => setLang('ur')} 
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${lang === 'ur' ? 'bg-[#0F5B3E] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#1F2937]'}`}
            >
              Roman Urdu
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy */}
          <div className="lg:col-span-5 space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F5B3E]/10 border border-[#0F5B3E]/20 text-[#0F5B3E] text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              {activeContent.pill}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={lang}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h1 className="text-[42px] leading-[1.08] md:text-[56px] lg:text-[60px] font-extrabold text-[#1F2937] tracking-tight">
                  {activeContent.title} <span className="text-[#0F5B3E] block lg:inline">{activeContent.titleAccent}</span>
                </h1>
                
                <p className="text-lg md:text-xl text-[#6B7280] font-light leading-relaxed max-w-lg">
                  {activeContent.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button className="bg-[#0F5B3E] hover:bg-[#0F5B3E]/95 text-white font-bold px-8 py-4 rounded-xl shadow-[0_8px_30px_rgba(15,91,62,0.25)] hover:shadow-[0_8px_30px_rgba(15,91,62,0.35)] transition-all duration-300 flex items-center justify-center gap-2 group">
                {activeContent.btnPrimary}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="bg-white text-[#1F2937] border border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 font-bold px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center">
                {activeContent.btnSecondary}
              </button>

              <button className="text-[#6B7280] hover:text-[#1F2937] font-semibold px-4 py-4 flex items-center justify-center gap-2 transition-colors duration-300">
                <PlayCircle className="w-5 h-5 text-[#0F5B3E]" />
                {activeContent.btnDemo}
              </button>
            </motion.div>
            
            {/* Trust Marks */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.6, delay: 0.4 }}
               className="pt-6 border-t border-gray-200/60 flex items-center gap-6 text-sm text-[#6B7280] font-medium"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0F5B3E]" /> 
                {activeContent.enterprise}
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0F5B3E]" /> 
                {activeContent.certified}
              </span>
            </motion.div>
          </div>

          {/* Right Column: Live SaaS-Grade Dashboard Mockup */}
          <div className="lg:col-span-7 relative h-[650px] w-full max-w-[820px] mx-auto hidden md:block perspective-1000">
            <motion.div
              initial={{ opacity: 0, rotateY: 8, rotateX: 6, scale: 0.95 }}
              animate={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="absolute inset-0 bg-white rounded-[24px] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-200/50 overflow-hidden flex"
            >
              {/* Dashboard Sidebar */}
              <div className="w-[220px] bg-[#FAF9F6] border-r border-gray-200/60 p-5 flex flex-col justify-between">
                <div>
                  {/* Brand logo in mock */}
                  <div className="flex items-center gap-2.5 mb-8">
                    <div className="w-7 h-7 rounded-lg bg-[#0F5B3E] flex items-center justify-center text-white font-extrabold text-sm">N</div>
                    <span className="font-bold text-xs tracking-wider text-[#1F2937] uppercase">NEXUS OPERATING SYSTEM</span>
                  </div>

                  <div className="space-y-1">
                    {[
                      { label: "Dashboard", active: true },
                      { label: "Bookings & Venues", active: false },
                      { label: "e-Invitations", active: false },
                      { label: "Shared Albums", active: false },
                      { label: "Smart Displays", active: false },
                      { label: "Business CRM", active: false }
                    ].map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`h-9 rounded-lg flex items-center px-3 gap-2.5 cursor-pointer text-xs font-semibold transition-all ${
                          item.active 
                            ? 'bg-white shadow-sm border border-gray-200/60 text-[#0F5B3E]' 
                            : 'text-[#6B7280] hover:text-[#1F2937] hover:bg-gray-100/50'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${item.active ? 'bg-[#0F5B3E]' : 'bg-transparent'}`} />
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated connection status */}
                <div className="bg-emerald-50/60 border border-emerald-100 p-3 rounded-xl flex items-center gap-2.5">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-bold text-[#0F5B3E]">Live Connection Active</span>
                </div>
              </div>
              
              {/* Dashboard Main Area */}
              <div className="flex-1 p-6 bg-white flex flex-col gap-6 overflow-y-auto">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input 
                      type="text" 
                      placeholder="Search event id, bookings..." 
                      className="bg-[#FAF9F6] border border-gray-200/50 rounded-lg pl-9 pr-4 py-1.5 text-xs w-48 focus:outline-none"
                      disabled
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center cursor-pointer">
                      <Bell className="w-4 h-4 text-gray-500" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-[#D9467A] rounded-full" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#0F5B3E]/10 border border-[#0F5B3E]/20 flex items-center justify-center font-bold text-xs text-[#0F5B3E]">
                      PK
                    </div>
                  </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { title: "RSVPs Received", val: "84%", trend: "+12% this week", color: "text-[#0F5B3E]" },
                    { title: "Smart Signage Status", val: "3 Active", trend: "0 offline", color: "text-[#C9A227]" },
                    { title: "Live Uploads", val: "1,248", trend: "15.4 GB stored", color: "text-[#D9467A]" }
                  ].map((stat, i) => (
                    <div key={i} className="rounded-xl border border-gray-100 bg-[#FAF9F6]/50 p-3.5 flex flex-col justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.title}</span>
                      <div className="mt-2">
                        <span className={`text-xl font-extrabold ${stat.color}`}>{stat.val}</span>
                        <p className="text-[9px] text-gray-400 font-medium mt-0.5">{stat.trend}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Widgets Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                  
                  {/* Countdown Card Widget */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-bold tracking-widest text-[#D9467A] uppercase bg-[#D9467A]/5 px-2 py-0.5 rounded-full">Shaadi Ceremony</span>
                        <h4 className="font-extrabold text-sm text-[#1F2937] mt-1.5">Aisha & Bilal's Wedding</h4>
                      </div>
                      <span className="text-[10px] font-bold text-[#0F5B3E] bg-[#0F5B3E]/10 px-2.5 py-1 rounded-lg">In 2 Days</span>
                    </div>

                    <div className="my-3 flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>Saturday, 2:00 PM • Royal Palm Marquee</span>
                    </div>

                    {/* RSVP Status Bar */}
                    <div className="space-y-1.5 pt-2 border-t border-gray-100">
                      <div className="flex justify-between text-[10px] font-bold text-gray-500">
                        <span>450 Accepted</span>
                        <span>500 Total Guests</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0F5B3E] rounded-full" style={{ width: '90%' }} />
                      </div>
                    </div>
                  </div>

                  {/* Upload Progress Album Widget */}
                  <div className="rounded-2xl border border-gray-100 bg-[#FAF9F6]/50 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[#0F5B3E]">
                        <CloudUpload className="w-4.5 h-4.5" />
                        <span className="text-xs font-bold uppercase tracking-wider">Shared Memories Vault</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">Guests are live-uploading snaps from the Mehndi ceremony.</p>
                    </div>

                    <div className="mt-3 bg-white p-2.5 rounded-xl border border-gray-100 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm">📸</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between text-[9px] font-bold text-gray-600 mb-1">
                          <span className="truncate">Mehndi_Stage_HQ.jpg</span>
                          <span>84%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#D9467A] rounded-full" style={{ width: '84%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live CRM activities & Signage */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:col-span-2 space-y-3">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Live Activity Feed</h4>
                    
                    <div className="space-y-2.5">
                      {[
                        { time: "Just now", desc: "Interactive Wayfinding: Welcome sign updated for Main Hall TV.", badge: "Signage", badgeBg: "bg-amber-50 text-amber-700" },
                        { time: "4 mins ago", desc: "Invoice Generated: Rs 2.4M estimate sent to Humayun K.", badge: "Quotation OS", badgeBg: "bg-emerald-50 text-emerald-700" },
                        { time: "12 mins ago", desc: "Aisha & Bilal: 12 new guest RSVPs confirmed.", badge: "Invitations", badgeBg: "bg-pink-50 text-[#D9467A]" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-start gap-4 text-xs">
                          <div className="flex items-start gap-2 min-w-0">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold shrink-0 ${item.badgeBg}`}>{item.badge}</span>
                            <p className="text-gray-600 truncate">{item.desc}</p>
                          </div>
                          <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
            
            {/* Live revenue floating bubble */}
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -right-6 top-1/4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4.5 z-20"
            >
              <div className="w-11 h-11 rounded-xl bg-[#C9A227]/15 flex items-center justify-center border border-[#C9A227]/25 text-[#C9A227]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-0.5">Live Revenue Managed</p>
                <p className="text-lg font-extrabold text-[#1F2937]">Rs 8.4M</p>
              </div>
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}
