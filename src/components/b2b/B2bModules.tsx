"use client"

import React from "react"
import { motion } from "framer-motion"
import { Target, FileText, Users, Monitor } from "lucide-react"

interface B2bModulesProps {
  isUrdu: boolean;
}

export function B2bModules({ isUrdu }: B2bModulesProps) {
  
  const modules = [
    {
      icon: Target,
      color: "text-[#0F5B3E] bg-[#0F5B3E]/10 border-[#0F5B3E]/20",
      title_en: "CRM Lead Pipeline",
      title_ur: "CRM Lead Pipeline",
      desc_en: "Capture inquiries dynamically from WhatsApp, Facebook, and Instagram. Record target dates, guest estimates, and track lead scores.",
      desc_ur: "WhatsApp, Facebook, aur Instagram se inquiries automatic collect krain. Dates, guest count, aur customer details record krain."
    },
    {
      icon: FileText,
      color: "text-[#C9A227] bg-[#C9A227]/10 border-[#C9A227]/20",
      title_en: "Proposals & Invoicing",
      title_ur: "Quotes & Invoicing",
      desc_en: "Generate professional line-item quotes with customized local tax configurations (PRA/SRB). Send secure digital payment links.",
      desc_ur: "Professional line-item bills aur quotes banain, jis me local taxes (PRA/SRB) shamil hon. Customers ko secure payment links send krain."
    },
    {
      icon: Users,
      color: "text-blue-600 bg-blue-50 border-blue-100",
      title_en: "Staff & Shift Logistics",
      title_ur: "Staff & Shift Logistics",
      desc_en: "Assign floor managers, catering wagers, decorators, and stage crew shifts. Track daily hours and payouts on one integrated sheet.",
      desc_ur: "Hall managers, waiters, aur stage decorators ki shifts lagain. Ek hi sheet par daily hours aur payouts ka hisab rkhain."
    },
    {
      icon: Monitor,
      color: "text-[#0F5B3E] bg-[#0F5B3E]/10 border-[#0F5B3E]/20",
      title_en: "Cloud Broadcaster Screens",
      title_ur: "Cloud Broadcaster Screens",
      desc_en: "Manage interactive LED signage display boards at marquee entrances. Push slot availability updates in real-time.",
      desc_ur: "Marquee ke main gate par lagi screens ko control krain. Booked slots aur booking details ko live display krain."
    }
  ]

  return (
    <section className="py-16 px-4 md:px-8 bg-[#FAF7F2] border-y border-[#E6E2DA] select-none">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header Text */}
        <div className="text-center space-y-3 max-w-xl mx-auto" dir="ltr">
          <h2 className="text-2xl md:text-3xl font-black text-[#1D1C17] uppercase tracking-wider">
            {isUrdu ? "Powerful Enterprise Modules" : "Enterprise Solutions Features"}
          </h2>
          <p className="text-xs md:text-sm text-[#5E6460] font-medium leading-relaxed font-sans">
            {isUrdu 
              ? "Pakistan ke event organizers aur halls ke liye behtareen operations management software." 
              : "Powering event organizers and venues across Pakistan with robust operational efficiency modules."
            }
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir="ltr">
          {modules.map((m, idx) => {
            const IconComponent = m.icon
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="p-6 bg-white border border-[#E6E2DA] rounded-2xl shadow-sm hover:shadow-md transition-all flex gap-4 text-left"
              >
                <div className={`p-3.5 rounded-xl border shrink-0 h-max ${m.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h4 className="text-sm font-black text-[#1D1C17] uppercase tracking-wider">
                    {isUrdu ? m.title_ur : m.title_en}
                  </h4>
                  <p className="text-[11px] text-[#5E6460] font-medium leading-relaxed font-sans">
                    {isUrdu ? m.desc_ur : m.desc_en}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
