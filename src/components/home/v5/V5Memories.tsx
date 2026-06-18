import React from 'react';
import { Container } from '@/components/ui/Container';
import { Heart, ImageIcon, Video, Mic, Sparkles, Plus, Play } from 'lucide-react';

export function V5Memories() {
  const uploaders = [
    { name: "Ahmed", desc: "Uploaded 4 images", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" },
    { name: "Mariam", desc: "Left a voice note", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" }
  ];

  return (
    <section className="py-24 bg-[#FAF7F2] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Descriptive text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F5B3E]/10 text-[#0F5B3E] text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Shared Memories
            </div>
            
            <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#1F2937] tracking-tight leading-[1.1]">
              Every Cherished Moment, Preserved In High Def.
            </h2>
            
            <p className="text-lg text-[#6B7280] font-light leading-relaxed">
              No more collecting low-quality photos over WhatsApp. Nexus automatically hosts a digital vault where guests can instantly snap, upload, and comment during your events.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { title: "Voice Notes", sub: "Guest audio wishes", icon: Mic, color: "text-emerald-600 bg-emerald-50" },
                { title: "HD Albums", sub: "Original quality", icon: ImageIcon, color: "text-blue-600 bg-blue-50" },
                { title: "Video Reels", sub: "Cinematic moments", icon: Video, color: "text-purple-600 bg-purple-50" },
                { title: "Greetings", sub: "Guestbook logs", icon: Heart, color: "text-pink-600 bg-pink-50" }
              ].map((box, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-gray-200/50 shadow-sm flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${box.color}`}>
                    <box.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#1F2937]">{box.title}</h4>
                    <span className="text-[10px] text-gray-400 font-medium">{box.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual polaroid / guest card stack */}
          <div className="lg:col-span-7 relative flex justify-center items-center h-[500px]">
            {/* Background elements */}
            <div className="absolute w-[450px] h-[450px] bg-gradient-to-tr from-[#D9467A]/5 to-[#0F5B3E]/5 blur-3xl rounded-full pointer-events-none" />

            {/* Polaroid image 1 (Decor setup) */}
            <div className="absolute w-[240px] bg-white p-3 pb-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-200/40 -rotate-6 -translate-x-12 -translate-y-8 z-10 hover:rotate-0 transition-transform duration-300">
              <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-3">
                <img 
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=300" 
                  alt="Floral setup"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <img src={uploaders[0].img} alt="" className="w-5 h-5 rounded-full object-cover" />
                <span className="text-[10px] font-bold text-[#1F2937]">Ahmed: "Beautiful stage details!"</span>
              </div>
            </div>

            {/* Polaroid image 2 (Couple hand details/decor) */}
            <div className="absolute w-[220px] bg-white p-3 pb-8 rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.06)] border border-gray-200/40 rotate-6 translate-x-16 translate-y-12 z-20 hover:rotate-0 transition-transform duration-300">
              <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-3">
                <img 
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=300" 
                  alt="Wedding decor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#D9467A] flex items-center justify-center text-[10px] text-white">❤️</div>
                <span className="text-[10px] font-bold text-[#1F2937]">Mariam: "Mubarak!"</span>
              </div>
            </div>

            {/* Audio Guestbook Voice note player */}
            <div className="absolute top-8 right-4 w-[280px] bg-white p-4 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-gray-200/50 z-30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0F5B3E] flex items-center justify-center text-white cursor-pointer hover:bg-[#0F5B3E]/90 transition-colors">
                <Play className="w-4 h-4 fill-white" />
              </div>
              
              <div className="flex-1 space-y-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-[#1F2937]">Voice Wish - Mariam</span>
                  <span className="text-gray-400 font-medium">0:12</span>
                </div>
                {/* Audio Wave columns */}
                <div className="flex gap-0.5 items-center h-5">
                  {[3, 6, 2, 8, 4, 7, 5, 2, 6, 4, 9, 3, 5, 2, 7, 3, 5].map((h, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 rounded-full ${i < 8 ? 'bg-[#0F5B3E]' : 'bg-gray-200'}`} 
                      style={{ height: `${h * 1.8 + 2}px` }} 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating text comment notification */}
            <div className="absolute bottom-6 left-2 w-[280px] bg-white p-3.5 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.05)] border border-gray-100 z-30 flex items-start gap-2.5">
              <span className="text-xl">🎉</span>
              <div className="flex-1">
                <p className="text-[10px] font-extrabold text-gray-400 uppercase">GUEST MESSAGE</p>
                <p className="text-xs font-semibold text-[#1F2937] mt-0.5 italic">
                  "Mashallah, such a beautifully organized event! Everything was perfect."
                </p>
                <span className="text-[9px] text-[#0F5B3E] font-bold mt-1 block">— Uncle Humayun</span>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
