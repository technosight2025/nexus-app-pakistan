"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Music, CheckCircle2, Clock, Smartphone, Volume2, Sparkles, Heart } from 'lucide-react';

export function V5Invitations() {
  const [rsvpState, setRsvpState] = useState<'none' | 'submitting' | 'confirmed'>('none');
  const [musicPlaying, setMusicPlaying] = useState(true);

  const triggerRsvp = () => {
    if (rsvpState !== 'none') return;
    setRsvpState('submitting');
    setTimeout(() => {
      setRsvpState('confirmed');
    }, 1500);
  };

  return (
    <section className="py-24 bg-[#0F5B3E] overflow-hidden text-white relative">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A227]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-5 max-w-xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#C9A227] text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Invitations
            </div>
            
            <h2 className="text-[36px] md:text-[48px] font-extrabold tracking-tight leading-[1.1]">
              Invitations That Feel Like A Journey.
            </h2>
            <p className="text-lg text-emerald-100/90 font-light leading-relaxed">
              Replace static cards with beautiful, responsive wedding websites. Enrich with premium backing music, live itinerary mapping, and instant dashboard synchronization.
            </p>

            <div className="space-y-6 pt-4">
              {[
                { icon: Music, title: "Ambient Audio Integration", desc: "Embed custom instrumental tunes that autoplay as guests view your invite." },
                { icon: CheckCircle2, title: "Instant 1-Click RSVPs", desc: "No more tracking text messages. Guests respond directly; lists update instantly." },
                { icon: Clock, title: "Dynamic Schedule Timeline", desc: "Share locations, timings, and map coordinates for Baraat, Valima, and Mehndi." },
                { icon: Smartphone, title: "Optimized for Mobile Screens", desc: "Flawless performance on local Pakistani mobile networks (3G/4G/5G)." }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                    <feature.icon className="w-5 h-5 text-[#C9A227]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-white">{feature.title}</h4>
                    <p className="text-emerald-100/75 text-sm font-light mt-0.5 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Interactive Smartphone Mockup */}
          <div className="lg:col-span-7 flex justify-center items-center perspective-1000 relative">
             
             {/* Phone Container shadow ring */}
             <div className="absolute w-[330px] h-[630px] bg-[#C9A227]/10 blur-3xl rounded-[50px] pointer-events-none" />

             {/* Phone frame */}
             <motion.div 
               initial={{ rotateY: -12, rotateX: 6, scale: 0.95 }}
               whileInView={{ rotateY: 0, rotateX: 0, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="w-[310px] h-[610px] bg-black rounded-[46px] p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-white/15 relative overflow-hidden"
             >
                {/* Speaker Grill & Camera notch */}
                <div className="absolute top-2.5 inset-x-0 h-5 flex justify-center z-30">
                  <div className="w-24 h-4 bg-black rounded-full" />
                </div>

                {/* Smartphone Screen Area */}
                <div className="w-full h-full bg-[#FAF7F2] rounded-[38px] overflow-hidden relative flex flex-col justify-between p-6 pt-10 text-[#1F2937] font-sans selection:bg-[#0F5B3E]/10">
                   
                   {/* Top Audio Player Status Bar */}
                   <div className="flex justify-between items-center w-full bg-white/70 backdrop-blur-sm border border-gray-100/60 p-2.5 rounded-2xl shadow-sm">
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-3.5 h-3.5 text-[#0F5B3E]" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest truncate max-w-[120px]">
                          Jashn-e-Bahaar (Flute)
                        </span>
                      </div>
                      
                      {/* Interactive audio visualizer (moving bars) */}
                      <div className="flex gap-0.5 items-end h-3 cursor-pointer" onClick={() => setMusicPlaying(!musicPlaying)}>
                        {[1, 2, 3, 4, 5].map(b => (
                          <motion.div 
                            key={b}
                            animate={musicPlaying ? { height: [4, 12, 4] } : { height: 4 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: b * 0.15 }}
                            className="w-0.5 bg-[#0F5B3E] rounded-full"
                          />
                        ))}
                      </div>
                   </div>

                   {/* Calligraphic Invite Details */}
                   <div className="flex-1 flex flex-col items-center justify-center text-center my-6">
                      <div className="w-16 h-16 rounded-full border border-[#C9A227]/40 flex items-center justify-center text-2xl bg-white shadow-sm relative mb-4">
                        💍
                        <div className="absolute -inset-1 border border-[#C9A227]/25 rounded-full scale-105 pointer-events-none" />
                      </div>
                      
                      <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#C9A227] uppercase">
                        SHUBH VIVAHA
                      </span>

                      {/* Main Serif Couple Initials */}
                      <h3 className="font-serif text-3xl text-[#0F5B3E] mt-3 mb-1.5 flex items-center gap-2 font-light">
                        Zahra <Heart className="w-4 h-4 text-[#D9467A] fill-[#D9467A]" /> Ali
                      </h3>

                      <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-1 mb-8">
                        Save The Date
                      </p>

                      <div className="w-full space-y-3">
                         <div className="bg-white/80 border border-gray-200/50 rounded-2xl p-3.5 shadow-sm text-left">
                            <span className="text-[9px] font-bold text-[#D9467A] tracking-wider uppercase block">Baraat Banquet</span>
                            <p className="font-bold text-xs text-[#1F2937] mt-0.5">Saturday, Oct 24 • 7:30 PM</p>
                            <span className="text-[10px] text-gray-400 block mt-1">Garrison Golf Club, Lahore</span>
                         </div>
                         <div className="bg-white/80 border border-gray-200/50 rounded-2xl p-3.5 shadow-sm text-left">
                            <span className="text-[9px] font-bold text-[#0F5B3E] tracking-wider uppercase block">Valima Reception</span>
                            <p className="font-bold text-xs text-[#1F2937] mt-0.5">Sunday, Oct 25 • 1:30 PM</p>
                            <span className="text-[10px] text-gray-400 block mt-1">Royal Palm Marquee, Lahore</span>
                         </div>
                      </div>
                   </div>

                   {/* RSVP Button / Status Form */}
                   <div className="w-full pt-4 border-t border-gray-200/60">
                     <AnimatePresence mode="wait">
                       {rsvpState === 'none' && (
                         <motion.button 
                           key="rsvp-btn"
                           onClick={triggerRsvp}
                           whileTap={{ scale: 0.98 }}
                           className="w-full py-3.5 bg-[#0F5B3E] hover:bg-[#0F5B3E]/95 text-white rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-md transition-all flex items-center justify-center gap-2"
                         >
                           RSVP Now
                         </motion.button>
                       )}

                       {rsvpState === 'submitting' && (
                         <motion.div 
                           key="rsvp-loader"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           className="w-full py-3.5 bg-gray-100 text-gray-400 rounded-xl text-xs font-bold uppercase tracking-[0.2em] text-center"
                         >
                           Submitting RSVP...
                         </motion.div>
                       )}

                       {rsvpState === 'confirmed' && (
                         <motion.div 
                           key="rsvp-success"
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           className="w-full py-3 bg-[#EAF7F2] text-[#0F5B3E] border border-emerald-200 rounded-xl text-xs font-bold text-center flex flex-col items-center justify-center p-2.5 shadow-sm"
                         >
                           <div className="flex items-center gap-1.5 font-extrabold tracking-wider uppercase">
                             <CheckCircle2 className="w-4 h-4 text-[#0F5B3E]" />
                             RSVP Confirmed
                           </div>
                           <span className="text-[9px] text-emerald-800/80 font-medium mt-1">Dashboard updated: 2 Guests attending</span>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>

                </div>
             </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}
