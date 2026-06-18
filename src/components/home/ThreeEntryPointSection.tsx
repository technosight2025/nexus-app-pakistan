"use client"
import React from 'react';
import Link from 'next/link';
import { Calendar, Users, Store, ArrowRight, Check } from 'lucide-react';

export function ThreeEntryPointSection() {
  const cards = [
    {
      title: "Plan Your Event",
      badge: "For Hosts & Customers",
      badgeBg: "bg-[#E6F0EC] text-[#0F5B3E]",
      icon: Calendar,
      iconBg: "bg-[#E6F0EC] text-[#0F5B3E]",
      desc: "Set up your private dashboard. Track budgets, design custom bilingual wedding cards, build digital menus, and organize schedules all in one unified workspace.",
      link: "/create-event",
      btnText: "Start Planning",
      btnBg: "bg-[#0F5B3E] hover:bg-[#0d4d34] text-white",
      hoverRing: "hover:ring-2 hover:ring-[#0F5B3E]/30",
      features: [
        "Interactive Budget Controller",
        "Urdu & English Digital Invites",
        "Collaborative Moodboards & Timelines"
      ]
    },
    {
      title: "Find Professionals",
      badge: "Marketplace Directory",
      badgeBg: "bg-[#FDF6E2] text-[#B8860B]",
      icon: Users,
      iconBg: "bg-[#FDF6E2] text-[#B8860B]",
      desc: "Explore Pakistan's premium network of wedding halls, wedding photographers, bridal salons, and caterers. View verified ratings, live availability, and request quotes.",
      link: "/explore",
      btnText: "Explore",
      btnBg: "bg-[#D4AF37] hover:bg-[#c29d2f] text-white",
      hoverRing: "hover:ring-2 hover:ring-[#D4AF37]/30",
      features: [
        "Live Availability Calendars",
        "Direct Quotations & Contracts",
        "100% Verified Customer Reviews"
      ]
    },
    {
      title: "Grow Your Business",
      badge: "Merchant Operating Suite",
      badgeBg: "bg-[#F3F4F6] text-[#1F2937]",
      icon: Store,
      iconBg: "bg-[#F3F4F6] text-[#1F2937]",
      desc: "Power your venue, creative photography studio, restaurant, or planning business. Manage calendar bookings, dispatch workforce, log ledgers, and deploy lobby displays.",
      link: "/business",
      btnText: "Grow Your Brand",
      btnBg: "bg-[#1F2937] hover:bg-black text-white",
      hoverRing: "hover:ring-2 hover:ring-[#1F2937]/30",
      features: [
        "Event Ledger Bookkeeping & CRM",
        "Smart Digital Lobby Screen Network",
        "Automated Invoicing & Quotes Builder"
      ]
    }
  ];

  return (
    <section className="py-16 bg-[#FAF7F2]/50 border-t border-[#ECE7DF] relative">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FDF8F0] opacity-50 blur-3xl rounded-full -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E6F0EC] opacity-30 blur-3xl rounded-full -z-10 pointer-events-none" />

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-[700] tracking-[0.15em] text-[#0F5B3E] uppercase bg-[#E6F0EC] px-3.5 py-1.5 rounded-full inline-block mb-4">
            Core Portals
          </span>
          <h2 className="text-[32px] sm:text-[38px] font-[700] text-[#1F2937] font-serif tracking-tight mb-4">
            Plan, Discover, or Run Your Business
          </h2>
          <p className="text-[15px] text-[#4B5563] max-w-[620px] mx-auto leading-relaxed">
            Select one of our three core entries to begin planning your dream event, hiring elite professionals, or operating your service business.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={idx}
                className={`bg-white border border-[#ECE7DF] rounded-[24px] p-8 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(15,91,62,0.04)] hover:-translate-y-1.5 ${card.hoverRing} transition-all duration-300 group`}
              >
                <div>
                  {/* Badge & Icon Row */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-[10px] font-[700] tracking-wider uppercase px-2.5 py-1.5 rounded-lg ${card.badgeBg}`}>
                      {card.badge}
                    </span>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-[22px] font-[700] text-[#1F2937] mb-3 font-serif leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-[13.5px] text-[#6B7280] mb-6 leading-relaxed min-h-[80px]">
                    {card.desc}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="border-t border-[#E5E7EB] pt-5 mb-8">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] block mb-3.5">
                      Included Capabilities:
                    </span>
                    <ul className="space-y-3">
                      {card.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-[12.5px] text-[#374151] font-[500]">
                          <div className="w-4 h-4 rounded-full bg-[#E6F0EC] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-[#0F5B3E]" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Action Button */}
                <div>
                  <Link href={card.link} className="block w-full">
                    <button className={`w-full py-3.5 rounded-xl font-bold text-[13px] tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all duration-300 ${card.btnBg}`}>
                      <span>{card.btnText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
