"use client"

import React, { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { 
  Plus, Users, MapPin, Settings, Edit, Trash2, Building2, 
  Map, Percent, Sliders, CheckCircle, Tag, Clock, Circle
} from "lucide-react"

function HallManagerContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "halls"

  const setTab = (tab: string) => {
    router.push(`/business/venues/halls?tab=${tab}`)
  }

  // Mock Halls
  const halls = [
    { 
      id: 1, 
      name: "Grand Marquee", 
      capacity: "1000 - 1500 Guests", 
      type: "Outdoor Marquee Setup", 
      price: "Rs. 500,000", 
      status: "Active",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=450" 
    },
    { 
      id: 2, 
      name: "Crystal Hall (A)", 
      capacity: "300 - 500 Guests", 
      type: "Indoor Banquet Hall", 
      price: "Rs. 250,000", 
      status: "Active",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=450" 
    },
    { 
      id: 3, 
      name: "Jasmine Hall (B)", 
      capacity: "200 - 300 Guests", 
      type: "Indoor Banquet Hall", 
      price: "Rs. 150,000", 
      status: "Maintenance",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=450" 
    },
  ]

  // Mock Capacity layouts
  const layouts = [
    { hall: "Grand Marquee", tables: 150, stageSize: "40ft x 20ft", danceFloor: "Active Setup", parking: "350 Cars limit" },
    { hall: "Crystal Hall (A)", tables: 50, stageSize: "24ft x 12ft", danceFloor: "Optional Layout", parking: "150 Cars limit" },
    { hall: "Jasmine Hall (B)", tables: 30, stageSize: "16ft x 8ft", danceFloor: "Not Available", parking: "80 Cars limit" },
  ]

  // Mock Peak/Off-peak pricing
  const rates = [
    { hall: "Grand Marquee", basePrice: "Rs. 500,000", peakPrice: "Rs. 650,000 (Dec - Jan)", offPeak: "Rs. 420,000 (Jun - Aug)", cateringMin: "Rs. 1,800/head" },
    { hall: "Crystal Hall (A)", basePrice: "Rs. 250,000", peakPrice: "Rs. 320,000 (Dec - Jan)", offPeak: "Rs. 200,000 (Jun - Aug)", cateringMin: "Rs. 1,600/head" },
    { hall: "Jasmine Hall (B)", basePrice: "Rs. 150,000", peakPrice: "Rs. 180,000 (Dec - Jan)", offPeak: "Rs. 120,000 (Jun - Aug)", cateringMin: "Rs. 1,400/head" },
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-left">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#0F5B3E]" /> Venue Space Configurator
          </h1>
          <p className="text-gray-500 mt-1 text-[13px] font-medium">
            Configure banquet halls, outdoor garden spaces, maximum capacities, pricing grids, and schedules.
          </p>
        </div>
        
        <button className="px-4 py-2 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl font-bold text-[12px] transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-3.5 h-3.5" /> Add New Space
        </button>
      </div>

      {/* Tab select menu */}
      <div className="flex overflow-x-auto pb-1 bg-white border border-[#ECE7DF] rounded-[14px] p-1 gap-1 shrink-0 scrollbar-none">
        <button 
          onClick={() => setTab("halls")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "halls" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Halls & Areas
        </button>
        <button 
          onClick={() => setTab("capacity")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "capacity" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Capacity Management
        </button>
        <button 
          onClick={() => setTab("pricing")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "pricing" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Pricing & Availability
        </button>
      </div>

      {/* Tab Views */}

      {/* Tab 1: Halls List */}
      {activeTab === "halls" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {halls.map((hall) => (
            <Card key={hall.id} className="p-0 border border-gray-100 bg-white overflow-hidden rounded-[20px] shadow-sm flex flex-col justify-between group">
              <div className="relative h-44 w-full overflow-hidden">
                <img src={hall.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={hall.name} />
                <span className={`absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider shadow-sm ${
                  hall.status === 'Active' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {hall.status}
                </span>
              </div>
              
              <div className="p-5 text-left flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[15px] font-black text-gray-900 leading-snug">{hall.name}</h3>
                  <p className="text-[11px] text-[#0F5B3E] font-bold mt-0.5">{hall.type}</p>
                  
                  <div className="space-y-2.5 my-4 text-[11.5px] font-semibold text-gray-600">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-gray-400"><Users className="w-4 h-4" /> Capacity</span>
                      <span className="text-gray-900 font-bold">{hall.capacity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-gray-400"><Tag className="w-4 h-4" /> Base Price</span>
                      <span className="text-gray-900 font-bold">{hall.price}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <button className="flex-1 py-2 border border-[#ECE7DF] hover:bg-gray-50 rounded-xl text-[11px] font-bold text-gray-700 transition-colors flex items-center justify-center gap-1">
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button className="flex-1 py-2 border border-[#ECE7DF] hover:bg-gray-50 rounded-xl text-[11px] font-bold text-gray-700 transition-colors flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Block Dates
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-100 text-gray-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab 2: Capacity layouts */}
      {activeTab === "capacity" && (
        <Card className="p-5 border border-gray-100 bg-white rounded-[20px] shadow-sm">
          <div className="overflow-x-auto text-left">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#ECE7DF] text-[10.5px] text-gray-400 font-extrabold uppercase">
                  <th className="pb-3.5 pl-2">Hall / space</th>
                  <th className="pb-3.5">Max Table count</th>
                  <th className="pb-3.5">Stage Dimension</th>
                  <th className="pb-3.5">Dance floor</th>
                  <th className="pb-3.5">Valet Parking limits</th>
                  <th className="pb-3.5 text-right pr-2">Capacity Check</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-[11.5px] font-semibold text-gray-700">
                {layouts.map((l, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-gray-900">{l.hall}</td>
                    <td className="py-3.5">{l.tables} round tables (10 seats/table)</td>
                    <td className="py-3.5">{l.stageSize}</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        l.danceFloor === "Active Setup" ? "bg-emerald-50 text-[#0F5B3E]" : "bg-gray-100 text-gray-500"
                      }`}>{l.danceFloor}</span>
                    </td>
                    <td className="py-3.5">{l.parking}</td>
                    <td className="py-3.5 text-right pr-2">
                      <button className="px-3 py-1 bg-white border border-[#ECE7DF] hover:bg-gray-50 rounded-xl text-[10px] font-bold text-[#0F5B3E]">
                        View layout map
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab 3: Pricing Rates */}
      {activeTab === "pricing" && (
        <Card className="p-5 border border-gray-100 bg-white rounded-[20px] shadow-sm">
          <div className="overflow-x-auto text-left">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#ECE7DF] text-[10.5px] text-gray-400 font-extrabold uppercase">
                  <th className="pb-3.5 pl-2">Hall</th>
                  <th className="pb-3.5">Base Hire Charge</th>
                  <th className="pb-3.5">Peak Season Rate</th>
                  <th className="pb-3.5">Off-Peak Season Rate</th>
                  <th className="pb-3.5">Catering Minimum Head-rate</th>
                  <th className="pb-3.5 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-[11.5px] font-semibold text-gray-700">
                {rates.map((r, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-gray-950">{r.hall}</td>
                    <td className="py-3.5 font-bold text-gray-900">{r.basePrice}</td>
                    <td className="py-3.5 text-rose-600 font-bold">{r.peakPrice}</td>
                    <td className="py-3.5 text-emerald-600 font-bold">{r.offPeak}</td>
                    <td className="py-3.5 font-bold text-gray-800">{r.cateringMin}</td>
                    <td className="py-3.5 text-right pr-2">
                      <button className="px-3 py-1 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl text-[10px] font-bold">
                        Edit Rates
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

    </div>
  )
}

export default function HallManagerPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-48">
        <span className="text-sm font-bold text-gray-400 animate-pulse">Loading Spaces Configurator...</span>
      </div>
    }>
      <HallManagerContent />
    </Suspense>
  )
}
