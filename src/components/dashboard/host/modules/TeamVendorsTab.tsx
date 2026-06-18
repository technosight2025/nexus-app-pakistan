"use client"

import { useState, useEffect } from "react"
import { Users, Search, Plus, Star, MapPin, CheckCircle2, AlertCircle, Sparkles } from "lucide-react"
import { getHostEventVendors } from "@/app/actions/host/events"

const theme = {
  primary: "#0F5B3E",
  accent: "#D4AF37",
  bg: "#FDF8F0",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#E11D48",
  cardShadow: "0 4px 12px rgba(0,0,0,0.05)",
  goldShadow: "0 8px 24px rgba(212,175,55,0.15)"
}

export function TeamVendorsTab({ eventId }: { eventId?: string }) {
  const [team, setTeam] = useState<any[]>([])

  const MOCK_TEAM = [
    { role: "Photographer", name: "Nexus Studios", status: "Booked", rating: 4.9, price: "Rs 120k", type: "booked", img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=200" },
    { role: "Venue (Barat)", name: "Grand Taj Marquee", status: "Booked", rating: 4.8, price: "Rs 450k", type: "booked", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=200" },
    { role: "Decorator", name: "Royal Aesthetics", status: "Pending Quote", rating: 4.7, price: "TBD", type: "pending", img: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=200" }
  ]

  const MISSING_ROLES = ["Caterer", "Makeup Artist", "DJ / Sound"]

  useEffect(() => {
    async function loadTeam() {
      if (!eventId) {
        setTeam(MOCK_TEAM)
        return
      }
      try {
        const { data } = await getHostEventVendors(eventId)
        if (data && data.length > 0) {
          const mapped = data.map((v: any) => ({
            role: v.role_title,
            name: v.organizations?.name || "Unknown Vendor",
            status: v.status === 'booked' ? 'Booked' : 'Pending Quote',
            rating: 5.0, // Mock for now until reviews are implemented
            price: v.contract_amount ? `Rs ${v.contract_amount.toLocaleString()}` : "TBD",
            type: v.status?.toLowerCase() || 'pending',
            img: v.organizations?.logo_url || "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=200"
          }))
          setTeam(mapped)
        } else {
          setTeam(MOCK_TEAM)
        }
      } catch (err) {
        setTeam(MOCK_TEAM)
      }
    }
    loadTeam()
  }, [eventId])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-inter pb-24">
      
      {/* Team Builder List */}
      <div className="lg:col-span-2 space-y-6">
        <div 
          className="relative bg-white/90 backdrop-blur-md border border-gray-100 p-6 md:p-8 overflow-hidden"
          style={{ borderRadius: '24px', boxShadow: theme.cardShadow }}
        >
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h2 className="text-2xl font-bold font-poppins text-[#1A1A1A] tracking-tight mb-1">Event Team</h2>
              <p className="text-sm text-gray-500 font-medium">The creators behind your special day</p>
            </div>
            <button 
              className="bg-white hover:bg-gray-50 border border-gray-200 text-[#0F5B3E] font-bold py-2.5 px-5 flex items-center gap-2 transition-colors shadow-sm"
              style={{ borderRadius: '12px' }}
            >
              <Search className="w-4 h-4" />
              Discover Vendors
            </button>
          </div>

          <div className="space-y-3 relative z-10">
            {team.map((vendor, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white border border-gray-100 p-4 hover:border-[#D4AF37]/50 transition-all duration-300 flex items-center gap-4 cursor-pointer hover:-translate-y-1"
                style={{ borderRadius: '16px', boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}
              >
                <img src={vendor.img} alt={vendor.name} className="relative w-16 h-16 object-cover shadow-sm group-hover:scale-105 transition-transform duration-500" style={{ borderRadius: '12px' }} />
                
                <div className="relative flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{vendor.role}</span>
                    {vendor.type === 'booked' ? (
                      <span className="bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 shadow-sm text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Booked</span>
                    ) : (
                      <span className="bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20 shadow-sm text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Pending</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold font-poppins text-[#1A1A1A] truncate group-hover:text-[#0F5B3E] transition-colors">{vendor.name}</h3>
                </div>
                
                <div className="relative text-right hidden sm:block">
                  <div className="flex items-center justify-end gap-1.5 text-sm font-bold text-gray-700 mb-1">
                    <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                    {vendor.rating}
                  </div>
                  <div className="text-[11px] font-bold text-[#0F5B3E] bg-[#0F5B3E]/5 px-2.5 py-1 rounded-md border border-[#0F5B3E]/10">{vendor.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Missing Roles */}
      <div className="space-y-6">
        <div 
          className="relative bg-white/90 backdrop-blur-md border border-gray-100 p-6 overflow-hidden group"
          style={{ borderRadius: '24px', boxShadow: theme.cardShadow }}
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-[40px] pointer-events-none" />
          
          <h3 className="text-lg font-bold font-poppins text-[#1A1A1A] mb-1 relative z-20 flex items-center gap-2">
            Missing Roles <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </h3>
          <p className="text-xs text-gray-500 font-medium mb-6 relative z-20">Based on your event type</p>
          
          <div className="space-y-3 relative z-20">
            {MISSING_ROLES.map((role, i) => (
              <div 
                key={i} 
                className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 hover:bg-white hover:border-[#D4AF37]/30 transition-all cursor-pointer group/role hover:-translate-y-0.5"
                style={{ borderRadius: '16px', boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}
              >
                <span className="text-sm font-bold text-gray-700">{role}</span>
                <button className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-400 group-hover/role:bg-[#0F5B3E] group-hover/role:border-[#0F5B3E] group-hover/role:text-white transition-all flex items-center justify-center shadow-sm">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
