"use client"
import { motion } from "framer-motion"
import { Building2, Camera, Utensils, Paintbrush, ArrowRight } from "lucide-react"

const AUDIENCES = [
  {
    role: "Eliminate Double-Bookings & Secure Your Revenue",
    icon: Building2,
    benefits: [
      "Prevent double bookings automatically",
      "Manage hall maintenance schedules",
      "Control digital signage in lobbies",
      "Track daily wager security & waiters"
    ],
    color: "bg-emerald-500",
    bgLight: "bg-emerald-50"
  },
  {
    role: "Streamline Photo Proofing & Media Deliveries",
    icon: Camera,
    benefits: [
      "Client photo selection portal",
      "Time-based video review workflow",
      "Camera & lens inventory tracking",
      "Automated advance payment reminders"
    ],
    color: "bg-blue-500",
    bgLight: "bg-blue-50"
  },
  {
    role: "Maximize Profit Margins with Precision Costing",
    icon: Utensils,
    benefits: [
      "Dynamic per-head quotation engine",
      "Stock & inventory management",
      "Event-day kitchen staff tracking",
      "Real-time profit margin analysis"
    ],
    color: "bg-orange-500",
    bgLight: "bg-orange-50"
  },
  {
    role: "Track Floral & Furniture Assets with Visual Moodboards",
    icon: Paintbrush,
    benefits: [
      "Flower & furniture asset tracking",
      "Visual moodboard approvals",
      "Setup crew GPS check-in",
      "Vendor sub-contracting CRM"
    ],
    color: "bg-purple-500",
    bgLight: "bg-purple-50"
  }
]

export function TargetAudienceGrid() {
  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-6">Built for Your Profession</h2>
          <p className="text-xl text-slate-600 font-medium">
            Generic CRM tools don't work for the event industry. NEXUS is tailored to the exact workflows of Pakistani event professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AUDIENCES.map((aud, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group flex flex-col h-full"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 ${aud.color} shadow-lg`}>
                <aud.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-6 leading-snug">{aud.role}</h3>
              
              <ul className="space-y-4 mb-8 flex-1">
                {aud.benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${aud.color}`} />
                    {benefit}
                  </li>
                ))}
              </ul>
              
              <button className="text-sm font-bold text-slate-900 flex items-center gap-2 group-hover:text-primary transition-colors mt-auto min-h-[44px] py-2 cursor-pointer">
                See Features <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
