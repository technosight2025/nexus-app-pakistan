"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { MonitorPlay, Navigation, UtensilsCrossed, Monitor, Sparkles, Tv, CheckCircle2 } from 'lucide-react';

export function V5Displays() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const displays = [
    { title: "Welcome Screens", icon: MonitorPlay },
    { title: "Wayfinding", icon: Navigation },
    { title: "Digital Menus", icon: UtensilsCrossed },
    { title: "Live Photo Cast", icon: Monitor }
  ];

  // Data for interactive Smart TV simulator
  const screenContents = [
    {
      id: "welcome",
      bgUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
      content: (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-6 text-white bg-black/40">
          <span className="text-[10px] font-extrabold tracking-[0.4em] text-[#C9A227] uppercase">WELCOME TO THE WEDDING OF</span>
          <h3 className="font-serif text-3xl md:text-5xl mt-4 mb-2 font-light">Zahra & Ali</h3>
          <div className="w-16 h-[1px] bg-[#C9A227] my-3" />
          <p className="text-xs tracking-widest font-sans font-medium text-gray-200">GARRISON MARQUEE, LAHORE</p>
        </div>
      )
    },
    {
      id: "wayfinding",
      bgUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800",
      content: (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-8 text-white bg-black/60">
          <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#C9A227] uppercase mb-6">EVENT WAYFINDING MAP</span>
          <div className="space-y-4 w-full max-w-sm text-left">
            <div className="flex justify-between items-center border-b border-white/20 pb-2">
              <span className="text-sm font-bold">Main Hall (Baraat)</span>
              <span className="text-xs text-[#C9A227] font-bold">← Left Corridor</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/20 pb-2">
              <span className="text-sm font-bold">Nikah Stage Garden</span>
              <span className="text-xs text-[#C9A227] font-bold">↑ Straight Ahead</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/20 pb-2">
              <span className="text-sm font-bold">Buffet & Dining Area</span>
              <span className="text-xs text-[#C9A227] font-bold">→ Right Pavilion</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "menu",
      bgUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
      content: (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-6 text-white bg-black/65">
          <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#C9A227] uppercase">TODAY'S SPECIAL BANQUET MENU</span>
          <h3 className="font-serif text-2xl mt-4 mb-5 text-[#C9A227]">Premium Course</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-xs max-w-md mx-auto font-medium">
            <div className="text-left">• Mutton Qorma Shahi</div>
            <div className="text-right">• Chicken Biryani Basmati</div>
            <div className="text-left">• Roghni Naan & Tandoori</div>
            <div className="text-right">• Fresh Salad & Raita</div>
            <div className="text-left">• Shahi Kheer & Garam Gulab Jamun</div>
            <div className="text-right">• Kashmiri Chai</div>
          </div>
        </div>
      )
    },
    {
      id: "photocast",
      bgUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
      content: (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-5 text-white bg-black/45">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-extrabold tracking-widest text-[#C9A227] uppercase">LIVE PHOTO CAST</span>
            <span className="text-[9px] bg-red-600 px-2 py-0.5 rounded-full font-bold animate-pulse">LIVE FEED</span>
          </div>
          
          <div className="my-auto text-center">
            <p className="text-xl font-bold tracking-tight">"Selfie at the stage setup!"</p>
            <span className="text-xs text-gray-300 font-bold block mt-1">— Uploaded by Ahmed</span>
          </div>

          <div className="text-[10px] text-gray-300 font-medium text-center">
            Scan invitation QR code to upload photos directly to this screen.
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-24 bg-white border-y border-gray-100 overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Details Section */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F5B3E]/10 text-[#0F5B3E] text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Smart Venue Displays
            </div>
            
            <h2 className="text-[32px] md:text-[44px] font-extrabold text-[#1F2937] tracking-tight leading-[1.1]">
              Turn Every Screen Into An Experience
            </h2>
            <p className="text-lg text-[#6B7280] font-light max-w-md">
              Publish welcome slides, buffet menus, wayfinding routes, and real-time social guest photo feeds directly to any Android smart TV inside your venue.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {displays.map((item, idx) => (
                <div 
                  key={item.title} 
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    activeTab === idx 
                      ? 'bg-white border-[#0F5B3E] shadow-md shadow-[#0F5B3E]/5 text-[#0F5B3E]' 
                      : 'bg-[#FAF7F2]/50 border-gray-200/50 hover:bg-gray-100/50 text-[#1F2937]'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${activeTab === idx ? 'bg-[#0F5B3E] text-white' : 'bg-white text-gray-500 border border-gray-200/60'}`}>
                    <item.icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="font-extrabold text-xs tracking-wider uppercase">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive TV Mockup Section */}
          <div className="flex-1 w-full max-w-[620px] relative">
             
             {/* TV frame wrapping content */}
             <div className="relative">
               {/* Outer TV Border */}
               <div className="aspect-[16/9] w-full bg-black rounded-[20px] p-2 md:p-3.5 shadow-2xl relative border-[4px] border-gray-800 overflow-hidden flex flex-col">
                  
                  {/* Inside Screen Content with background Unsplash image */}
                  <div className="w-full h-full rounded-lg relative overflow-hidden bg-gray-900 border border-white/5">
                     <AnimatePresence mode="wait">
                       <motion.div
                         key={activeTab}
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         transition={{ duration: 0.4 }}
                         className="absolute inset-0 bg-cover bg-center"
                         style={{ backgroundImage: `url(${screenContents[activeTab].bgUrl})` }}
                       >
                         {screenContents[activeTab].content}
                       </motion.div>
                     </AnimatePresence>
                  </div>
               </div>

               {/* TV Stand Base */}
               <div className="w-32 h-6 bg-gradient-to-b from-gray-700 to-gray-900 mx-auto -mt-[1px] relative z-10 rounded-b-xl border-t border-gray-600/30 shadow-md" />
               <div className="w-48 h-1 bg-gray-900 mx-auto rounded-full shadow-lg" />
             </div>

             {/* Little Cast Device notification */}
             <div className="absolute -bottom-4 right-4 bg-emerald-50 text-[#0F5B3E] text-[10px] font-bold border border-emerald-200/60 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Cast Device connected: Hall_TV_01
             </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
