"use client"

import { useState } from "react"
import {
  Zap, Plus, Mail, MessageCircle, FileText, Calendar, Clock,
  ArrowRight, Play, Pause, Settings, CheckCircle2
} from "lucide-react"

const WORKFLOWS = [
  { id: 1, name: "Auto-Reply to New Leads", trigger: "New Inquiry via Marketplace", action: "Send WhatsApp & Email greeting", status: "active", runs: 142, icon: Zap, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
  { id: 2, name: "Contract Reminder", trigger: "Contract Pending > 48h", action: "Send WhatsApp nudge", status: "active", runs: 58, icon: Clock, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
  { id: 3, name: "Post-Event Survey", trigger: "Project marked Delivered", action: "Send Email feedback form", status: "inactive", runs: 0, icon: Mail, color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-500/10" },
  { id: 4, name: "Create Project Folders", trigger: "Contract Signed", action: "Create Drive Folders & Notify Team", status: "active", runs: 89, icon: FileText, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
]

export default function AutomationPage() {
  const stats = {
    active: WORKFLOWS.filter(w => w.status === "active").length,
    runs: WORKFLOWS.reduce((a, b) => a + b.runs, 0),
    saved: "18h",
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] md:text-[26px] font-black text-[#111827] dark:text-white">Automations</h1>
          <p className="text-[12px] text-[#9CA3AF] mt-0.5">Save time with triggered workflows and auto-responses</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#4F46E5] text-white rounded-xl text-[11px] font-black hover:bg-indigo-700 transition-all cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" /> Create Workflow
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Active Workflows", value: stats.active, color: "text-[#4F46E5]", bg: "bg-[#EEF2FF] dark:bg-indigo-500/10" },
          { label: "Total Runs (30d)", value: stats.runs, color: "text-[#22C55E]", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
          { label: "Time Saved", value: stats.saved, color: "text-[#F59E0B]", bg: "bg-amber-50 dark:bg-amber-500/10" },
          { label: "Failed Runs", value: 0, color: "text-[#6B7280]", bg: "bg-[#F8FAFC] dark:bg-white/5" },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4`}>
            <div className={`text-[22px] font-black ${s.color}`}>{s.value}</div>
            <div className="text-[9px] font-black text-[#9CA3AF] uppercase tracking-widest mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Workflows List */}
      <div className="space-y-3">
        {WORKFLOWS.map(w => (
          <div key={w.id} className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-[#4F46E5]/30">
            <div className="flex items-start sm:items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${w.bg}`}>
                <w.icon className={`w-5 h-5 ${w.color}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-[13px] font-bold text-[#111827] dark:text-white">{w.name}</h3>
                  {w.status === "active" ? (
                    <span className="flex items-center gap-1 text-[8px] font-black px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 uppercase"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active</span>
                  ) : (
                    <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400 uppercase">Inactive</span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 text-[10px]">
                  <div className="flex items-center gap-1 text-[#6B7280] dark:text-gray-400 bg-[#F8FAFC] dark:bg-white/5 px-2 py-1 rounded-md">
                    <span className="font-black text-[#374151] dark:text-gray-300">IF:</span> {w.trigger}
                  </div>
                  <ArrowRight className="hidden sm:block w-3 h-3 text-[#9CA3AF]" />
                  <div className="flex items-center gap-1 text-[#6B7280] dark:text-gray-400 bg-[#F8FAFC] dark:bg-white/5 px-2 py-1 rounded-md">
                    <span className="font-black text-[#374151] dark:text-gray-300">THEN:</span> {w.action}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-[#F3F4F6] dark:border-white/5">
              <div className="text-[10px] text-[#9CA3AF] text-left sm:text-right">
                <div className="font-black text-[#374151] dark:text-gray-300">{w.runs}</div>
                <div>Runs (30d)</div>
              </div>
              <div className="flex items-center gap-1">
                <button className={`p-2 rounded-lg transition-colors cursor-pointer ${w.status === "active" ? "bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400"}`}>
                  {w.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button className="p-2 rounded-lg text-[#9CA3AF] hover:text-[#4F46E5] hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-colors cursor-pointer">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
