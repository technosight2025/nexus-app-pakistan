"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Sparkles, Calendar, Check, Mail, Phone, DollarSign, Image as ImageIcon, Heart } from 'lucide-react';

export function V5SolutionsBento() {
  return (
    <section className="py-24 bg-[#FAF7F2]">
      <Container>
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F5B3E]/10 text-[#0F5B3E] text-xs font-bold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Roles & Workflows
          </div>
          <h2 className="text-[32px] md:text-[44px] font-extrabold text-[#1F2937] tracking-tight">
            Built For Every Participant.
          </h2>
          <p className="text-lg text-[#6B7280] font-light mt-4">
            Tailored digital interfaces replacing paper legers, chaotic WhatsApp groups, and spreadsheets.
          </p>
        </div>

        {/* 12-Column Responsive Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Card 1: For Customers (B2C) - 6 Columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 bg-white rounded-[32px] p-8 md:p-10 border border-gray-200/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden relative"
          >
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#0F5B3E] uppercase bg-[#0F5B3E]/10 px-2.5 py-1 rounded-full">Customers</span>
              <h3 className="text-2xl font-bold tracking-tight text-[#1F2937] mt-4 mb-3">Discovery & Invitations</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed max-w-sm mb-6">
                Discover local vendors, send elegant calligraphic invites, receive RSVPs, and preserve guest photos in a digital vault.
              </p>
            </div>

            {/* Visual element: Envelope Mockup */}
            <div className="mt-4 bg-[#FAF9F6] border border-gray-200/50 rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden">
              <div className="w-12 h-12 bg-[#D9467A]/10 rounded-xl flex items-center justify-center text-[#D9467A]">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">INVITATION SENT</span>
                <p className="font-extrabold text-sm text-[#1F2937] truncate mt-0.5">Zahra & Ali's Valima</p>
              </div>
              <div className="bg-emerald-50 text-[#0F5B3E] px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap">
                340 RSVPs In
              </div>
            </div>
          </motion.div>

          {/* Card 2: For Businesses (Vendors) - 6 Columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 bg-[#0F5B3E] text-white rounded-[32px] p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group overflow-hidden relative"
          >
            <div>
              <span className="text-[10px] font-bold tracking-widest text-emerald-200 bg-white/10 px-2.5 py-1 rounded-full">Businesses</span>
              <h3 className="text-2xl font-bold tracking-tight mt-4 mb-3">CRM & Quotations OS</h3>
              <p className="text-sm text-emerald-100/80 leading-relaxed max-w-sm mb-6">
                Convert event queries into clients. Build professional digital quotations, track payments, and dispatch invoices instantly.
              </p>
            </div>

            {/* Visual element: CRM Pipeline/Invoice Stage */}
            <div className="mt-4 bg-white/10 rounded-2xl p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-emerald-200">Quotation ID #N-482</span>
                <span className="text-[#C9A227]">Pending Salami Deposit</span>
              </div>
              <div className="h-0.5 bg-white/15 w-full my-1" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-white/95">Grand Valima Catering Plan</span>
                <span className="text-base font-extrabold text-[#C9A227]">Rs 1,850,000</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: For Venues - 4 Columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 bg-white rounded-[32px] p-8 border border-gray-200/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
          >
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#C9A227] uppercase bg-[#C9A227]/10 px-2.5 py-1 rounded-full">Venues</span>
              <h3 className="text-xl font-bold tracking-tight text-[#1F2937] mt-4 mb-2">Calendar Bookings</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-6">
                Organize halls, avoid double-bookings, and dispatch welcoming signage schedules.
              </p>
            </div>

            {/* Visual element: Calendar Grid */}
            <div className="bg-[#FAF9F6] border border-gray-200/50 rounded-xl p-3 grid grid-cols-7 gap-1.5 text-center text-[10px] font-bold">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i} className="text-gray-400">{d}</span>)}
              {Array.from({ length: 14 }).map((_, i) => {
                const day = i + 12;
                const isBooked = day === 17 || day === 18 || day === 24 || day === 25;
                return (
                  <span 
                    key={i} 
                    className={`p-1.5 rounded-md ${isBooked ? 'bg-[#0F5B3E] text-white' : 'bg-white border border-gray-200/50 text-gray-700'}`}
                  >
                    {day}
                  </span>
                );
              })}
            </div>
          </motion.div>

          {/* Card 4: For Studios (Photographers) - 4 Columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-4 bg-[#FAF7F2] rounded-[32px] p-8 border border-gray-200/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
          >
            <div>
              <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-2.5 py-1 rounded-full font-sans">Studios</span>
              <h3 className="text-xl font-bold tracking-tight text-[#1F2937] mt-4 mb-2">Photo Selection OS</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-6">
                Deliver files, support interactive photo ratings, and collaborate on layout logs.
              </p>
            </div>

            {/* Visual element: Photo Grid with Approvals */}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-square bg-white rounded-lg border border-gray-200/80 overflow-hidden relative flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-gray-300" />
                  <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] text-white">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 5: For Restaurants & Event Planners - 4 Columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4 bg-[#1F2937] text-white rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
          >
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#D9467A] uppercase bg-[#D9467A]/15 px-2.5 py-1 rounded-full font-sans">Banquets & Planners</span>
              <h3 className="text-xl font-bold tracking-tight mt-4 mb-2">Banquets & Planners</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Configure food menus, coordinate tables, manage staff shifts, and review budget limits.
              </p>
            </div>

            {/* Visual element: Menu progress/Budget */}
            <div className="bg-white/10 rounded-xl p-3.5 space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-gray-300">Staff Shift Allocation</span>
                <span className="text-emerald-400">100% Scheduled</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: '100%' }} />
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
