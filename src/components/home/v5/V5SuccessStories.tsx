import React from 'react';
import { Container } from '@/components/ui/Container';
import { Quote, Sparkles } from 'lucide-react';

export function V5SuccessStories() {
  const stories = [
    { 
      role: "Managing Director", 
      company: "The Royal Palm Ballroom",
      location: "Lahore",
      metric: "40% Faster Bookings", 
      quote: "Nexus completely removed our reliance on manual paper ledgers. We can check hall availability, customize catering menus, and log client payments instantly.",
      avatar: "LP"
    },
    { 
      role: "Creative Director", 
      company: "Indigo Portrait Studios",
      location: "Karachi",
      metric: "Zero Lost Files", 
      quote: "Client photo delivery used to take weeks of coordination over USB drives. Now it takes days inside the select portal, and clients love the experience.",
      avatar: "IS"
    },
    { 
      role: "Host & Customer", 
      company: "Shaadi Host",
      location: "Islamabad",
      metric: "Seamless Planning", 
      quote: "We organized our entire family wedding using the Nexus guest dashboard. RSVPs, dietary menu preferences, and shared photo reels were updated live.",
      avatar: "ZH"
    }
  ];

  return (
    <section className="py-24 bg-[#FAF7F2] relative overflow-hidden">
      {/* Background design accents */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#D9467A]/5 blur-3xl rounded-full pointer-events-none" />

      <Container>
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F5B3E]/10 text-[#0F5B3E] text-xs font-bold tracking-wide uppercase mb-4 font-sans">
            <Sparkles className="w-3.5 h-3.5" />
            Ecosystem Case Studies
          </div>
          <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#1F2937] tracking-tight">
            Trusted Across The Network
          </h2>
          <p className="text-lg text-[#6B7280] font-light mt-4">
            Hear from leading banquet halls, creative studios, and family hosts scaling operations on Nexus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <div key={i} className="bg-white rounded-[32px] p-8 border border-gray-200/50 shadow-sm relative flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
              <Quote className="w-10 h-10 text-gray-100 absolute top-6 right-6" />
              
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F5B3E] bg-[#0F5B3E]/10 px-2.5 py-1 rounded-full">
                  {story.location} • {story.metric}
                </span>
                
                <p className="text-gray-500 text-sm italic font-light mt-8 mb-8 relative z-10 leading-relaxed">
                  "{story.quote}"
                </p>
              </div>

              {/* Client Profile details */}
              <div className="flex items-center gap-3.5 pt-6 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-gray-200/60 flex items-center justify-center font-extrabold text-xs text-[#0F5B3E]">
                  {story.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#1F2937]">{story.company}</h4>
                  <span className="text-[10px] text-gray-400 font-medium block mt-0.5">{story.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
