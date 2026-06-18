"use client"

import { motion } from "framer-motion"
import { Sparkles, TrendingUp } from "lucide-react"
import type { Lead } from "./LeadsPipelineModule"

interface RevenueSummaryModuleProps {
  leads: Lead[]
  wonValue: number
}

export default function RevenueSummaryModule({ leads, wonValue }: RevenueSummaryModuleProps) {
  // Funnel calculations
  const totalLeads = leads.length
  const wonLeadsCount = leads.filter((l) => l.status === "Won").length
  const conversionRate = totalLeads ? Math.round((wonLeadsCount / totalLeads) * 100) : 0

  // Channels count
  const channels = [
    { name: "Instagram", count: leads.filter((l) => l.source === "Instagram").length },
    { name: "WhatsApp", count: leads.filter((l) => l.source === "WhatsApp").length },
    { name: "Website", count: leads.filter((l) => l.source === "Website").length },
    { name: "Walk-in", count: leads.filter((l) => l.source === "Walk-in").length }
  ]
  const maxCount = Math.max(...channels.map((c) => c.count), 1)

  return (
    <div className="bg-white rounded-[16px] border border-[#E6E2DA] p-6 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#1D1C17]">Acquisition Channels & Funnel</h2>
          <p className="text-xs text-slate-500 font-medium">Visual breakdown of conversions and source performance</p>
        </div>
        <Sparkles className="w-5 h-5 text-[#D9467A]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source breakdown bars */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Channel efficiency</h3>
          <div className="space-y-3">
            {channels.map((ch) => {
              const pct = Math.round((ch.count / (totalLeads || 1)) * 100)
              return (
                <div key={ch.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>{ch.name}</span>
                    <span>{pct}% ({ch.count})</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      className="h-full bg-[#0F5B3E] rounded-full"
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* conversion target summary box */}
        <div className="bg-[#FAF7F2] rounded-[12px] p-5 border border-[#E6E2DA] flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F5B3E] bg-[#E6F0EC] px-2.5 py-1 rounded-full w-max">
              <TrendingUp className="w-3.5 h-3.5" /> High Performance
            </div>
            <h4 className="text-lg font-black mt-2 text-[#1D1C17]">Funnel Conversion Goal</h4>
            <p className="text-xs text-slate-500 font-medium">Goal is 25% booking confirmation on all registered leads.</p>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600">Current Conversion</span>
                <span className="text-[#0F5B3E]">{conversionRate}%</span>
              </div>
              <div className="h-2 w-full bg-white border border-[#E6E2DA] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0F5B3E] rounded-full"
                  style={{ width: `${Math.min((conversionRate / 25) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-3xl font-black text-[#0F5B3E]">
                {Math.round((conversionRate / 25) * 100)}%
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase">of target met</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
