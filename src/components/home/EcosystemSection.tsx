"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CustomersIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.5-2c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-.53 0-1.04.09-1.5.24V18h3.35c-.86-1.12-1.35-2.51-1.35-4 0-.17.02-.33.04-.5-.17-.03-.35-.05-.54-.05z"/>
  </svg>
);

const EventsIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z M16.53 11.06L15.47 10l-4.88 4.88-2.12-2.12-1.06 1.06L10.59 17l5.94-5.94z"/>
  </svg>
);

const VenuesIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17 11V3H7v4H3v14h8v-4h2v4h8V11h-4zM7 19H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 8h-2v-2h2v2zm0-4h-2V9h2v2z"/>
  </svg>
);

const VendorsIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    <path d="M12 3a5 5 0 00-5 5v2h2V8a3 3 0 016 0v2h2V8a5 5 0 00-5-5z" />
  </svg>
);

const InvitationsIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const MemoriesIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
  </svg>
);

const DisplaysIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/>
  </svg>
);

const BusinessIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M7.5 21H2V9h5.5v12zm7.25-18h-5.5v18h5.5V3zM22 11h-5.5v10H22V11z"/>
  </svg>
);

const BottomLoop = () => (
  <svg className="absolute top-[56px] left-[28px] overflow-visible z-0 pointer-events-none" width="756" height="50">
    {/* Main Path */}
    <path d="M 0,22 Q 0,42 12,42 H 744 Q 756,42 756,32 V 22" fill="none" stroke="#A39E93" strokeWidth="1.5" strokeDasharray="3,3" />

    {/* Branch up to Events */}
    <path d="M 126,42 V 22" fill="none" stroke="#A39E93" strokeWidth="1.5" strokeDasharray="3,3" />

    {/* Arrowhead pointing UP */}
    <polygon points="123,24 126,18 129,24" fill="#A39E93" />
    <polygon points="753,24 756,18 759,24" fill="#A39E93" />
  </svg>
);

const Node = ({ 
  icon: Icon, 
  label, 
  isFirst, 
  desc, 
  isHovered, 
  onHoverStart, 
  onHoverEnd 
}: { 
  icon: any, 
  label: string, 
  isFirst?: boolean, 
  desc: string, 
  isHovered: boolean, 
  onHoverStart: () => void, 
  onHoverEnd: () => void 
}) => (
  <div 
    className="relative flex flex-col items-center shrink-0 w-[56px] z-10 cursor-pointer"
    onMouseEnter={onHoverStart}
    onMouseLeave={onHoverEnd}
  >
    {/* Tooltip Overlay */}
    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute bottom-[75px] left-1/2 -translate-x-1/2 bg-[#0F5B3E] text-white text-[11px] font-bold px-3 py-2 rounded-xl shadow-xl z-50 w-48 text-center border border-white/10 pointer-events-none"
        >
          <span className="relative z-10 block">{desc}</span>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#0F5B3E] rotate-45 -mt-1.5" />
        </motion.div>
      )}
    </AnimatePresence>

    {/* Circle Container */}
    <div 
      className={`w-[56px] h-[56px] rounded-full flex items-center justify-center shrink-0 relative z-10 transition-all duration-300 ${
        isHovered 
          ? 'bg-[#0F5B3E] text-white border-transparent scale-110 shadow-lg shadow-[#0F5B3E]/15' 
          : 'bg-[#FFFDF9] text-[#0F5B3E] border border-[#E5DDD2]'
      }`}
    >
      <Icon className={`w-[24px] h-[24px] transition-colors duration-300 ${isHovered ? 'text-white' : 'text-[#0F5B3E]'}`} />
    </div>

    {/* Label */}
    <span className={`absolute top-[62px] left-1/2 -translate-x-1/2 text-[12px] font-[700] text-center w-[120px] leading-[1.2] whitespace-pre-line z-10 transition-colors duration-300 ${
      isHovered ? 'text-[#0F5B3E]' : 'text-[#1F2937]'
    }`}>
      {label}
    </span>
    {isFirst && <BottomLoop />}
  </div>
);

const Connector = () => (
  <div className="w-[70px] relative flex items-center shrink-0 h-[56px] z-0">
    <div className="w-full border-t-[2px] border-dotted border-[#A39E93]"></div>
    <div className="absolute right-0 w-0 h-0 border-y-[4px] border-y-transparent border-l-[5px] border-l-[#A39E93]"></div>
  </div>
);

export default function EcosystemSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const steps = [
    { icon: CustomersIcon, label: 'Customers', desc: "Configure your guest lists, budget tracker, and planner checklists." },
    { icon: EventsIcon, label: 'Events', desc: "Coordinate dynamic schedules, milestones, and shared event boards." },
    { icon: VenuesIcon, label: 'Venues', desc: "Search banquets, check live slot dates, and book instantly." },
    { icon: VendorsIcon, label: 'Vendors', desc: "Hire verified wedding photography, makeup, decor, and caterer teams." },
    { icon: InvitationsIcon, label: 'Invitations', desc: "Dispatch digital cards and track guest RSVPs live." },
    { icon: MemoriesIcon, label: 'Memories', desc: "Shared cloud gallery where guests upload event media." },
    { icon: DisplaysIcon, label: 'Displays', desc: "Broadcast live photos and digital menus to lobby display screens." },
    { icon: BusinessIcon, label: 'Business\nOperations', desc: "Secure escrow deposits, quotes builder, and bookkeeping ledger." },
  ];

  return (
    <section className="w-full bg-white px-4 py-12 overflow-hidden border-b border-[#ECE7DF]/30">
      <div className="ecosystem w-full h-auto lg:h-[210px] bg-[#FAF7F2] border border-[#ECE7DF] rounded-[24px] px-[20px] lg:px-[28px] py-[24px] flex flex-col lg:grid lg:grid-cols-[240px_1fr] overflow-hidden lg:overflow-visible max-w-[1280px] mx-auto gap-8 lg:gap-0">

        {/* Left Panel */}
        <div className="left-panel lg:w-[240px] flex flex-col justify-center h-full shrink-0">
          <h2 className="text-[26px] font-[700] leading-[1.1] text-[#0F5B3E] font-serif tracking-tight mb-2">
            A Connected Celebration
          </h2>
          <p className="text-[13px] text-[#4B5563] leading-snug font-[500] mb-3.5">
            From booking your hall to guests sharing photos — Nexus syncs your wedding in real-time.
          </p>
          <Link href="/create-event">
            <button className="w-[145px] h-[36px] bg-[#0F5B3E] rounded-[8px] text-[12px] text-white font-[700] flex items-center justify-center shrink-0 hover:bg-[#0d4d34] transition-all gap-1.5 shadow-xs cursor-pointer mb-4 lg:mb-0">
              Start Planning <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
            </button>
          </Link>
        </div>

        {/* Interactive Flow Panel */}
        <div className="flow-panel w-full overflow-x-auto pb-6 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex items-start gap-0 h-full pl-[16px] lg:pl-[48px] overflow-visible relative min-w-max pt-5 lg:pt-[28px]">
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <Node 
                  icon={step.icon} 
                  label={step.label} 
                  isFirst={i === 0} 
                  desc={step.desc}
                  isHovered={hoveredIndex === i}
                  onHoverStart={() => setHoveredIndex(i)}
                  onHoverEnd={() => setHoveredIndex(null)}
                />
                {i < steps.length - 1 && <Connector />}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
