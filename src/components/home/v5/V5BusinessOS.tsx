import React from 'react';
import { Container } from '@/components/ui/Container';
import { 
  Building2, 
  Camera, 
  Utensils, 
  Users, 
  FileText, 
  Monitor, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export function V5BusinessOS() {
  const modules = [
    { 
      title: "Venue OS", 
      desc: "Manage multiple halls, live calendar bookings, pricing packages, and digital welcome signs.",
      icon: Building2,
      metric: "3 Halls Connected",
      color: "from-blue-500/10 to-indigo-500/10"
    },
    { 
      title: "Studio OS", 
      desc: "Automate client photo deliveries, album selection portals, and image ratings.",
      icon: Camera,
      metric: "Instant Photo Selection",
      color: "from-purple-500/10 to-pink-500/10"
    },
    { 
      title: "Restaurant OS", 
      desc: "Coordinate banquet menu choices, caterer staffing, raw material logs, and plate counts.",
      icon: Utensils,
      metric: "Menu Planner Included",
      color: "from-amber-500/10 to-orange-500/10"
    },
    { 
      title: "Workforce OS", 
      desc: "Coordinate floor managers, valet staff, security details, and server shifts seamlessly.",
      icon: Users,
      metric: "Live Shift Tracker",
      color: "from-emerald-500/10 to-teal-500/10"
    },
    { 
      title: "CRM OS", 
      desc: "Log lead inquiries, configure automated digital estimates, and send payment reminders.",
      icon: FileText,
      metric: "94% Inquiry Close Rate",
      color: "from-cyan-500/10 to-sky-500/10"
    },
    { 
      title: "Display OS", 
      desc: "Broadcast slideshows, menus, and greeting lists directly to hall TVs from your phone.",
      icon: Monitor,
      metric: "Auto-cast Active",
      color: "from-rose-500/10 to-red-500/10"
    }
  ];

  return (
    <section className="py-24 bg-[#0F5B3E] text-white relative overflow-hidden">
      {/* Visual background circles */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A227]/10 blur-[100px] rounded-full pointer-events-none" />

      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#C9A227] text-xs font-bold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Nexus Suite
          </div>
          <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-tight leading-[1.1]">
            Run Your Entire Business On NEXUS
          </h2>
          <p className="text-lg text-emerald-100/80 font-light mt-4 leading-relaxed">
            A unified management backend replacing legacy ledgers, spreadsheets, and manual client follow-ups.
          </p>
        </div>

        {/* Dashboard Grid Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((mod, i) => {
            const ModIcon = mod.icon;

            return (
              <div 
                key={i} 
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300 group cursor-pointer flex flex-col justify-between h-76 relative"
              >
                <div>
                  {/* Icon with gradient badge */}
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center mb-6 text-white group-hover:scale-105 transition-transform">
                    <ModIcon className="w-5.5 h-5.5" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-1.5">
                    {mod.title}
                  </h3>
                  
                  <p className="text-emerald-100/70 text-xs leading-relaxed font-light mb-6">
                    {mod.desc}
                  </p>
                </div>

                {/* Footer details (metrics and explore) */}
                <div className="flex justify-between items-center pt-4 border-t border-white/15">
                  <span className="text-[10px] font-bold text-[#C9A227] tracking-wider uppercase">
                    {mod.metric}
                  </span>
                  
                  <div className="text-white hover:text-[#C9A227] transition-colors flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                    <span>Manage</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
