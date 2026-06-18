"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MapPin, Calendar as CalendarIcon, Clock, Heart } from 'lucide-react';

export default function GuestViewPage() {
  const [rsvpState, setRsvpState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpState('submitting');
    setTimeout(() => {
      setRsvpState('success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#1D1C17] flex justify-center">
      <div className="w-full max-w-md bg-[#FAF7F2] min-h-screen relative shadow-2xl overflow-x-hidden">
        
        {/* Cinematic Hero */}
        <div className="relative h-[80vh] w-full">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544425884-d92ea407c0b0?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D1C17] via-black/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center pb-20">
            <span className="text-[#C9A227] tracking-widest text-xs font-bold uppercase mb-4">You are invited</span>
            <h1 className="text-5xl font-serif text-white leading-tight mb-2">
              Ali & Fatima
            </h1>
            <p className="text-white/90 font-light mt-4 mb-2 flex items-center gap-2 text-sm"><CalendarIcon className="w-4 h-4 text-[#C9A227]"/> Saturday, Dec 24, 2026</p>
            <p className="text-white/80 font-light flex items-center gap-2 text-sm"><MapPin className="w-4 h-4 text-[#C9A227]"/> Shalimar Gardens, Lahore</p>
          </div>

          <div className="absolute bottom-6 w-full text-center animate-bounce text-white/50 text-xs tracking-widest uppercase">
            Scroll to view
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-[#1D1C17] px-8 py-16 -mt-10 rounded-t-[3rem] relative z-10 border-t-4 border-[#C9A227]">
          <h2 className="text-3xl font-serif text-white text-center mb-12">Our Journey</h2>
          
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-2 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#C9A227] before:to-transparent">
            
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative flex group">
              <div className="w-4 h-4 rounded-full bg-[#C9A227] shrink-0 absolute -left-[7px] mt-1 shadow-[0_0_15px_rgba(201,162,39,0.8)]" />
              <div className="ml-8">
                <div className="font-bold text-[#C9A227] mb-1">How We Met</div>
                <div className="text-xs text-white/50 mb-2">Aug 15, 2024</div>
                <p className="text-white/80 text-sm leading-relaxed">A chance encounter at a mutual friend's dinner party that changed our lives forever.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative flex group">
              <div className="w-4 h-4 rounded-full bg-[#C9A227] shrink-0 absolute -left-[7px] mt-1 shadow-[0_0_15px_rgba(201,162,39,0.8)]" />
              <div className="ml-8">
                <div className="font-bold text-[#C9A227] mb-1">The Engagement</div>
                <div className="text-xs text-white/50 mb-2">Jun 20, 2025</div>
                <p className="text-white/80 text-sm leading-relaxed">A beautiful evening surrounded by our closest family and friends under the stars.</p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Schedule */}
        <div className="bg-[#FAF7F2] px-8 py-16">
           <h2 className="text-3xl font-serif text-[#1D1C17] text-center mb-10">Event Schedule</h2>
           <div className="space-y-6">
             <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm border border-[#E6E2DA]">
               <div className="w-12 h-12 rounded-full bg-[#E6F0EC] text-[#0F5B3E] flex items-center justify-center shrink-0">
                 <Clock className="w-5 h-5" />
               </div>
               <div>
                 <div className="font-bold text-[#1D1C17]">Guest Arrival & Welcome</div>
                 <div className="text-sm text-[#0F5B3E] font-bold mt-1">7:00 PM</div>
               </div>
             </div>
             <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm border border-[#E6E2DA]">
               <div className="w-12 h-12 rounded-full bg-[#FDF8EA] text-[#C9A227] flex items-center justify-center shrink-0">
                 <Heart className="w-5 h-5" />
               </div>
               <div>
                 <div className="font-bold text-[#1D1C17]">The Nikah Ceremony</div>
                 <div className="text-sm text-[#C9A227] font-bold mt-1">8:30 PM</div>
               </div>
             </div>
           </div>
        </div>

        {/* RSVP Form */}
        <div className="bg-white px-8 py-16" id="rsvp">
          <h2 className="text-3xl font-serif text-[#1D1C17] text-center mb-2">Will you join us?</h2>
          <p className="text-center text-[#5E6460] mb-8 text-sm">Kindly respond by Dec 1st, 2026</p>

          {rsvpState === 'success' ? (
             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#E6F0EC] p-8 rounded-3xl text-center border border-[#0F5B3E]/20">
               <div className="w-16 h-16 bg-[#0F5B3E] rounded-full flex items-center justify-center mx-auto mb-4">
                 <CheckCircle2 className="w-8 h-8 text-white" />
               </div>
               <h3 className="text-2xl font-serif text-[#0F5B3E] mb-2">RSVP Confirmed!</h3>
               <p className="text-[#0F5B3E]/80 text-sm">Thank you! Your response has been sent to the hosts. We look forward to seeing you.</p>
               <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="mt-6 text-[#0F5B3E] font-bold text-sm underline">Back to top</button>
             </motion.div>
          ) : (
            <form onSubmit={handleRSVP} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#1D1C17] mb-2">Full Name</label>
                <input required type="text" className="w-full bg-[#FAF7F2] border border-[#E6E2DA] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C9A227] transition-colors" placeholder="Enter your name" />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1D1C17] mb-2">Will you attend?</label>
                <div className="flex gap-4">
                  <label className="flex-1">
                    <input type="radio" name="attending" value="yes" className="peer hidden" required />
                    <div className="w-full py-3 text-center rounded-xl border border-[#E6E2DA] peer-checked:bg-[#0F5B3E] peer-checked:text-white peer-checked:border-[#0F5B3E] cursor-pointer transition-colors font-bold text-sm text-[#5E6460]">Joyfully Accepts</div>
                  </label>
                  <label className="flex-1">
                    <input type="radio" name="attending" value="no" className="peer hidden" required />
                    <div className="w-full py-3 text-center rounded-xl border border-[#E6E2DA] peer-checked:bg-[#1D1C17] peer-checked:text-white peer-checked:border-[#1D1C17] cursor-pointer transition-colors font-bold text-sm text-[#5E6460]">Regretfully Declines</div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1D1C17] mb-2">Number of Guests (including you)</label>
                <select className="w-full bg-[#FAF7F2] border border-[#E6E2DA] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C9A227] transition-colors appearance-none">
                  <option>1</option><option>2</option><option>3</option><option>4</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1D1C17] mb-2">Dietary Requirements</label>
                <textarea rows={2} className="w-full bg-[#FAF7F2] border border-[#E6E2DA] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C9A227] transition-colors" placeholder="e.g. Vegetarian, Nut Allergy" />
              </div>

              <button 
                type="submit" 
                disabled={rsvpState === 'submitting'}
                className="w-full py-4 bg-[#C9A227] hover:bg-[#B08D22] text-white font-bold rounded-xl flex items-center justify-center transition-all shadow-[0_10px_40px_-10px_rgba(201,162,39,0.8)] disabled:opacity-70 mt-4"
              >
                {rsvpState === 'submitting' ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : 'Send RSVP'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
