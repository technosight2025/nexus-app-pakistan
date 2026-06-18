"use client"
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { 
  Users, 
  Calendar, 
  MapPin, 
  Briefcase, 
  Mail, 
  Image as ImageIcon, 
  Tv, 
  Settings,
  Sparkles
} from 'lucide-react';

export function V5EcosystemFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const steps = [
    { 
      id: 'customers', 
      label: 'CUSTOMERS', 
      title: 'Seamless Discovery',
      desc: 'Browse, review, and hire top-rated venues and professionals across Pakistan.',
      icon: Users, 
      color: 'bg-emerald-50 text-[#0F5B3E] border-[#0F5B3E]/10' 
    },
    { 
      id: 'events', 
      label: 'EVENTS', 
      title: 'Digital Event Hub',
      desc: 'Host customized details, track budgets, and compile schedules on a personal dashboard.',
      icon: Calendar, 
      color: 'bg-blue-50 text-blue-600 border-blue-100' 
    },
    { 
      id: 'venues', 
      label: 'VENUES', 
      title: 'Instant Venue Booking',
      desc: 'Check availability calendar, choose menu packages, and book online.',
      icon: MapPin, 
      color: 'bg-amber-50 text-[#C9A227] border-amber-100' 
    },
    { 
      id: 'vendors', 
      label: 'VENDORS', 
      title: 'Curated Vendors',
      desc: 'Connect with catering, decorators, makeup artists, and photography studios.',
      icon: Briefcase, 
      color: 'bg-purple-50 text-purple-600 border-purple-100' 
    },
    { 
      id: 'invitations', 
      label: 'INVITATIONS', 
      title: 'e-Invitations & RSVP',
      desc: 'Send dynamic digital invitations with maps, music, and instant guest RSVPs.',
      icon: Mail, 
      color: 'bg-pink-50 text-[#D9467A] border-pink-100' 
    },
    { 
      id: 'memories', 
      label: 'MEMORIES', 
      title: 'Shared Albums',
      desc: 'Allow guests to upload photos to a centralized media hub instantly.',
      icon: ImageIcon, 
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100' 
    },
    { 
      id: 'displays', 
      label: 'DISPLAYS', 
      title: 'Smart TV Signage',
      desc: 'Cast welcome panels and live photo updates directly to screens in the venue.',
      icon: Tv, 
      color: 'bg-cyan-50 text-cyan-600 border-cyan-100' 
    },
    { 
      id: 'ops', 
      label: 'BUSINESS OPERATIONS', 
      title: 'Unified Management',
      desc: 'Staff scheduling, invoicing, CRM, and automated lead tracking for businesses.',
      icon: Settings, 
      color: 'bg-gray-100 text-gray-800 border-gray-200' 
    },
  ];

  // SVG tracer properties
  const pathLength = useTransform(scrollYProgress, [0, 0.95], [0, 1]);

  return (
    <section className="py-32 bg-white relative overflow-hidden" ref={containerRef}>
      {/* Background aesthetics */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#0F5B3E]/5 to-[#C9A227]/5 blur-3xl rounded-full opacity-60 pointer-events-none" />

      <Container>
        <div className="max-w-4xl mx-auto text-center mb-28">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F5B3E]/10 text-[#0F5B3E] text-xs font-bold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Ecosystem Integration
          </div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold text-[#1F2937] tracking-tight mb-6">
            The Flow of Event Experience
          </h2>
          <p className="text-lg md:text-xl text-[#6B7280] font-light max-w-2xl mx-auto leading-relaxed">
            One cohesive data engine linking customers, venues, vendors, guests, screens, and back-office management.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-5xl mx-auto min-h-[1000px]">
          
          {/* Central Animated SVG lines (Dual-trace layout) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-4 hidden md:block">
            {/* Background trace line */}
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="6 6" />
            </svg>

            {/* Glowing animated line 1 (Nexus Emerald) */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <motion.path 
                d="M 8 0 L 8 4000" 
                fill="none" 
                stroke="#0F5B3E" 
                strokeWidth="4" 
                strokeLinecap="round"
                style={{ pathLength }} 
              />
            </svg>

            {/* Glowing animated line 2 (Festive Rose) - shifted slightly */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <motion.path 
                d="M 8 0 L 8 4000" 
                fill="none" 
                stroke="#D9467A" 
                strokeWidth="2" 
                strokeLinecap="round"
                style={{ pathLength }} 
              />
            </svg>
          </div>

          {/* Timeline steps */}
          <div className="space-y-12 md:space-y-16 relative">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const StepIcon = step.icon;

              return (
                <div key={step.id} className="flex flex-col md:flex-row items-center justify-between md:odd:flex-row-reverse">
                  {/* Left Column (Card) */}
                  <div className="w-full md:w-[45%] flex justify-center md:justify-end md:odd:justify-start">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8 border border-gray-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                    >
                      {/* Subtly colored backdrop card glow */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-100/10 to-transparent blur-xl pointer-events-none" />

                      {/* Header with step number & tag */}
                      <div className="flex justify-between items-center mb-5">
                        <span className="text-[10px] font-extrabold tracking-widest text-[#0F5B3E] uppercase bg-[#0F5B3E]/10 px-2.5 py-1 rounded-full">
                          Step 0{index + 1}
                        </span>
                        <span className="text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">
                          {step.label}
                        </span>
                      </div>

                      {/* Title & Icon */}
                      <div className="flex items-start gap-4 mb-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 shadow-sm ${step.color}`}>
                          <StepIcon className="w-5.5 h-5.5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#1F2937] text-lg md:text-xl group-hover:text-[#0F5B3E] transition-colors">{step.title}</h3>
                          <p className="text-gray-500 text-sm font-light mt-1.5 leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Middle Spacer (for line connector alignment on desktop) */}
                  <div className="relative z-10 my-4 md:my-0 flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-[#FAF7F2] shadow-md">
                    <div className="w-4 h-4 rounded-full bg-[#0F5B3E] animate-pulse" />
                  </div>

                  {/* Right Column (Spacer element to keep layout aligned) */}
                  <div className="w-full md:w-[45%] hidden md:block" />
                </div>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}
