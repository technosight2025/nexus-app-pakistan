"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { 
  Sparkles, Camera, Paintbrush, ChefHat, Music, Star, Plus, 
  MapPin, Phone, CheckCircle, ChevronDown, Heart
} from "lucide-react"

export default function VenueVendorsPage() {
  const [vendors, setVendors] = useState([
    { name: "Tariq Royal Caterers", category: "Catering", rating: 4.9, completed: 142, phone: "+92 300 1234567", status: "Approved Partner", icon: ChefHat },
    { name: "Roseate Events & Decor", category: "Decoration", rating: 4.8, completed: 96, phone: "+92 321 9876543", status: "Approved Partner", icon: Paintbrush },
    { name: "Fahad Photography Pro", category: "Photography", rating: 4.7, completed: 118, phone: "+92 333 4445556", status: "Preferred Vendor", icon: Camera },
    { name: "Lahore DJ Beats & Lights", category: "Sound & Light", rating: 4.6, completed: 85, phone: "+92 312 7778889", status: "Preferred Vendor", icon: Music },
  ])

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-left">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" /> Approved Vendor Network
          </h1>
          <p className="text-gray-500 mt-1 text-[13px] font-medium">
            Manage your partner directory. Track event ratings, recommend contractors to clients, and log completed events.
          </p>
        </div>
        
        <button className="px-4 py-2 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl font-bold text-[12px] transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-3.5 h-3.5" /> Approved Vendor
        </button>
      </div>

      {/* Grid of vendors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {vendors.map((vendor, idx) => (
          <Card key={idx} className="p-0 border border-gray-100 bg-white rounded-[24px] shadow-sm overflow-hidden flex flex-col justify-between h-[230px]">
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div className="w-9 h-9 bg-[#FAF8F5] border border-gray-100 rounded-xl flex items-center justify-center text-[#0F5B3E] shrink-0">
                    <vendor.icon className="w-5 h-5 text-[#0F5B3E]" />
                  </div>
                  <span className="text-[9.5px] font-extrabold text-[#0F5B3E] bg-[#E6F0EC] px-2 py-0.5 rounded-full uppercase">
                    {vendor.status}
                  </span>
                </div>

                <h3 className="text-[13px] font-black text-gray-950 mt-3">{vendor.name}</h3>
                <span className="text-[10px] text-gray-400 font-bold block mt-0.5">{vendor.category}</span>
              </div>

              {/* Stats */}
              <div className="flex gap-4 text-[11px] font-bold text-gray-600 mt-4">
                <span className="flex items-center gap-1 text-amber-600">
                  <Star className="w-4 h-4 fill-current text-amber-500" /> {vendor.rating}
                </span>
                <span className="text-gray-400">•</span>
                <span>{vendor.completed} Events done</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-3 bg-[#FAF8F5] border-t border-gray-100 grid grid-cols-2 gap-2 text-[10.5px] font-bold">
              <a 
                href={`tel:${vendor.phone}`}
                className="py-1.5 bg-white hover:bg-gray-50 border border-[#ECE7DF] rounded-xl text-gray-700 text-center flex items-center justify-center gap-1 transition-colors"
              >
                Call Vendor
              </a>
              <button className="py-1.5 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl text-center flex items-center justify-center gap-1 transition-all shadow-xs">
                Recommend Client
              </button>
            </div>
          </Card>
        ))}
      </div>

    </div>
  )
}
