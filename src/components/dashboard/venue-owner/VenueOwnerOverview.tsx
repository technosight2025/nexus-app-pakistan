"use client"

import { Users, Banknote, TrendingUp, Calendar, Percent } from "lucide-react"

interface LeadsBreakdown {
  total: number
  newCount: number
  activeCount: number
  convertedCount: number
}

interface VenueOwnerOverviewProps {
  leadsBreakdown: LeadsBreakdown
  monthlyRevenue: string
  conversionRate: number
  upcomingEvents: number
  occupancyRate: number
}

export function VenueOwnerOverview({
  leadsBreakdown,
  monthlyRevenue,
  conversionRate,
  upcomingEvents,
  occupancyRate
}: VenueOwnerOverviewProps) {
  return (
    <div className="grid grid-cols-12 gap-4">
      
      {/* 1. Leads Card (Takes 4 cols in 12-column layout) */}
      <div className="col-span-12 md:col-span-4 bg-white border border-[#E6E2DA] rounded-[16px] p-5 shadow-none flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Leads</p>
            <h3 className="text-3xl font-black tracking-tight text-[#1D1C17] mt-1">
              {leadsBreakdown.total}
            </h3>
          </div>
          <div className="p-2 rounded-xl bg-slate-100 text-slate-600">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Sub-KPI grid for Leads (New, Active, Converted) */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-2 text-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase">New</p>
            <p className="text-sm font-black text-blue-700">{leadsBreakdown.newCount}</p>
          </div>
          <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-2 text-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase">Active</p>
            <p className="text-sm font-black text-amber-700">{leadsBreakdown.activeCount}</p>
          </div>
          <div className="bg-[#E6F0EC]/50 border border-[#0F5B3E]/10 rounded-lg p-2 text-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase">Won</p>
            <p className="text-sm font-black text-[#0F5B3E]">{leadsBreakdown.convertedCount}</p>
          </div>
        </div>
      </div>

      {/* 2. Monthly Revenue Card (Takes 2 cols) */}
      <div className="col-span-12 sm:col-span-6 md:col-span-2 bg-white border border-[#E6E2DA] rounded-[16px] p-5 shadow-none flex flex-col justify-between min-h-[140px]">
        <div className="flex justify-between items-start">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Revenue (Monthly)</p>
          <div className="p-2 rounded-xl bg-[#E6F0EC] text-[#0F5B3E]">
            <Banknote className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-black tracking-tight text-[#1D1C17]">{monthlyRevenue}</h3>
          <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase tracking-wider">▲ 12% trend</p>
        </div>
      </div>

      {/* 3. Conversion Rate Card (Takes 2 cols) */}
      <div className="col-span-12 sm:col-span-6 md:col-span-2 bg-white border border-[#E6E2DA] rounded-[16px] p-5 shadow-none flex flex-col justify-between min-h-[140px]">
        <div className="flex justify-between items-start">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Conversion</p>
          <div className="p-2 rounded-xl bg-[#FCEEF3] text-[#D9467A]">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-black tracking-tight text-[#1D1C17]">{conversionRate}%</h3>
          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Target: 25%</p>
        </div>
      </div>

      {/* 4. Upcoming Events Card (Takes 2 cols) */}
      <div className="col-span-12 sm:col-span-6 md:col-span-2 bg-white border border-[#E6E2DA] rounded-[16px] p-5 shadow-none flex flex-col justify-between min-h-[140px]">
        <div className="flex justify-between items-start">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Events</p>
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
            <Calendar className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-black tracking-tight text-[#1D1C17]">{upcomingEvents}</h3>
          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Scheduled</p>
        </div>
      </div>

      {/* 5. Occupancy Card (Takes 2 cols) */}
      <div className="col-span-12 sm:col-span-6 md:col-span-2 bg-white border border-[#E6E2DA] rounded-[16px] p-5 shadow-none flex flex-col justify-between min-h-[140px]">
        <div className="flex justify-between items-start">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Occupancy</p>
          <div className="p-2 rounded-xl bg-amber-50 text-[#C9A227]">
            <Percent className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-black tracking-tight text-[#1D1C17]">{occupancyRate}%</h3>
          <p className="text-[10px] font-bold text-[#0F5B3E] mt-1 uppercase tracking-wider">Capacity utilization</p>
        </div>
      </div>

    </div>
  )
}
export default VenueOwnerOverview;
