"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { 
  BarChart3, PieChart, TrendingUp, Star, Calendar, 
  ChevronDown, DollarSign, Users, Award, Percent
} from "lucide-react"

export default function VenueAnalyticsPage() {
  const [filterPeriod, setFilterPeriod] = useState("This Year")

  // Mock analytics stats
  const metrics = [
    { label: "Total Booked revenue", value: "Rs. 2,450,000", change: "↑ 18%", desc: "vs last year" },
    { label: "Average Booking value", value: "Rs. 480,000", change: "↑ 8%", desc: "from last quarter" },
    { label: "Lead Conversion Rate", value: "32.4%", change: "↑ 4.2%", desc: "conversion efficiency" },
    { label: "Customer Satisfaction", value: "4.9 / 5.0", change: "↑ 2%", desc: "based on 182 reviews" },
  ]

  const packages = [
    { rank: 1, name: "Premium Single Dish Wedding", bookings: 42, share: "45% of total" },
    { rank: 2, name: "Executive Corporate Banquet", bookings: 24, share: "26% of total" },
    { rank: 3, name: "Gold Stage Reception (Dec Peak)", bookings: 18, share: "19% of total" },
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-left">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#0F5B3E]" /> Analytics Desk & Reports
          </h1>
          <p className="text-gray-500 mt-1 text-[13px] font-medium">
            Monitor venue booking volumes, occupancy trends, average contract sizes, and lead conversion rates.
          </p>
        </div>
        
        <div className="relative">
          <select 
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-2 bg-white border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-700 focus:outline-none"
          >
            <option value="This Year">This Year (2025)</option>
            <option value="Last 6 Months">Last 6 Months</option>
            <option value="Last 30 Days">Last 30 Days</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Roster list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {metrics.map((m, idx) => (
          <Card key={idx} className="p-5 border border-gray-100 bg-white rounded-[24px] shadow-sm flex flex-col justify-between h-[130px]">
            <div>
              <span className="text-[9.5px] font-bold text-gray-400 uppercase tracking-wider block leading-none">{m.label}</span>
              <h3 className="text-[20px] font-black text-gray-900 mt-3.5 leading-none">{m.value}</h3>
            </div>
            <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 leading-none mt-1">
              <span>{m.change}</span>
              <span className="text-gray-400 font-semibold">{m.desc}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Occupancy and Popular Packages Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* Package Popularity list */}
        <Card className="lg:col-span-2 p-5 border border-gray-100 bg-white rounded-[24px] shadow-sm flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="text-[13.5px] font-black text-gray-900 uppercase tracking-wider mb-4">Popular Package conversion</h3>
            <div className="space-y-4">
              {packages.map((pkg) => (
                <div key={pkg.rank} className="flex justify-between items-center text-[11.5px] font-semibold text-gray-700">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#E6F0EC] text-[#0F5B3E] flex items-center justify-center font-black text-[11px]">
                      {pkg.rank}
                    </span>
                    <span className="text-gray-900 font-bold">{pkg.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <span>{pkg.bookings} Bookings</span>
                    <span className="text-emerald-600 font-bold">{pkg.share}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-50 flex justify-between items-center text-[10px] text-gray-400 font-bold">
            <span>Data synced: Real-time</span>
            <button className="text-[#0F5B3E] hover:underline">Download package PDF report</button>
          </div>
        </Card>

        {/* Occupancy Mini summary */}
        <Card className="p-5 border border-gray-100 bg-white rounded-[24px] shadow-sm flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="text-[13.5px] font-black text-gray-900 uppercase tracking-wider mb-4">Peak Seasonal Utilisation</h3>
            
            <div className="space-y-3.5 text-[11.5px] font-semibold text-gray-600">
              <div className="flex justify-between items-center">
                <span>Winter Season (Nov - Feb)</span>
                <span className="text-gray-950 font-bold">96% Occupancy</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '96%' }} />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span>Spring Season (Mar - Apr)</span>
                <span className="text-gray-950 font-bold">78% Occupancy</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#0F5B3E] rounded-full" style={{ width: '78%' }} />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span>Summer Season (May - Aug)</span>
                <span className="text-gray-950 font-bold">42% Occupancy</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '42%' }} />
              </div>
            </div>
          </div>
        </Card>
      </div>

    </div>
  )
}
