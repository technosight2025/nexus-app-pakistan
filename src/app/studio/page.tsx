"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Zap, Calendar, Users, FileText, Camera, UploadCloud, Eye,
  Truck, Heart, ArrowRight, ArrowUpRight, ArrowDownRight,
  Plus, Search, Phone, Shield, Sparkles, CheckCircle2,
  DollarSign, Package, Bot, Briefcase, ChevronRight
} from "lucide-react"

// Quick Actions across the workflow
const QUICK_ACTIONS = [
  { label: "New Lead", icon: Plus, href: "/studio/leads", color: "bg-amber-500", phase: "Lead Phase" },
  { label: "Send Quote", icon: FileText, href: "/studio/quotations", color: "bg-sky-500", phase: "Sales Phase" },
  { label: "Assign Team", icon: Users, href: "/studio/projects", color: "bg-violet-500", phase: "Pre-Production" },
  { label: "Upload Media", icon: UploadCloud, href: "/studio/media", color: "bg-indigo-500", phase: "Production" },
  { label: "Send for Review", icon: Eye, href: "/studio/pipeline", color: "bg-rose-500", phase: "Review" },
  { label: "Deliver Assets", icon: Truck, href: "/studio/deliveries", color: "bg-emerald-500", phase: "Delivery" },
]

// The 7 Core Phases of the Business Workflow
const WORKFLOW_PHASES = [
  { id: "lead",       label: "Lead Phase",       count: 14, icon: Phone,       color: "text-amber-500",   bg: "bg-amber-50 dark:bg-amber-500/10",   border: "border-amber-200 dark:border-amber-500/20" },
  { id: "sales",      label: "Sales Phase",      count: 8,  icon: DollarSign,  color: "text-sky-500",     bg: "bg-sky-50 dark:bg-sky-500/10",       border: "border-sky-200 dark:border-sky-500/20" },
  { id: "preprod",    label: "Pre-Production",   count: 12, icon: Briefcase,   color: "text-violet-500",  bg: "bg-violet-50 dark:bg-violet-500/10", border: "border-violet-200 dark:border-violet-500/20" },
  { id: "production", label: "Production",       count: 3,  icon: Camera,      color: "text-indigo-500",  bg: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-200 dark:border-indigo-500/20" },
  { id: "review",     label: "Review",           count: 5,  icon: Eye,         color: "text-rose-500",    bg: "bg-rose-50 dark:bg-rose-500/10",     border: "border-rose-200 dark:border-rose-500/20" },
  { id: "delivery",   label: "Delivery",         count: 7,  icon: Package,     color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-200 dark:border-emerald-500/20" },
  { id: "post",       label: "Post-Project",     count: 2,  icon: Heart,       color: "text-teal-500",    bg: "bg-teal-50 dark:bg-teal-500/10",     border: "border-teal-200 dark:border-teal-500/20" },
]

// Active Bookings tracing through the pipeline
const ACTIVE_PIPELINE = [
  { id: "L-001",   client: "Ahmed & Sana",   event: "Wedding",       stage: "Stage 2: Lead Qualification", phase: "lead",       value: "₨500K", initials: "A", color: "bg-amber-500" },
  { id: "QT-0198", client: "Malik Family",   event: "Engagement",    stage: "Stage 5: Client Approval",    phase: "sales",      value: "₨65K",  initials: "M", color: "bg-sky-500" },
  { id: "PRJ-084", client: "Sara Imran",     event: "Bridal Shoot",  stage: "Stage 8: Team Assignment",    phase: "preprod",    value: "₨45K",  initials: "S", color: "bg-violet-500" },
  { id: "BK-1024", client: "Ayesha & Hamza", event: "Walima",        stage: "Stage 11: Event Day",         phase: "production", value: "₨120K", initials: "A", color: "bg-indigo-500" },
  { id: "BK-1025", client: "TechCorp",       event: "Corporate Gala",stage: "Stage 15: Client Review",     phase: "review",     value: "₨300K", initials: "T", color: "bg-rose-500" },
  { id: "BK-1021", client: "Zara & Omar",    event: "Nikah",         stage: "Stage 18: Final Payment",     phase: "delivery",   value: "₨55K",  initials: "Z", color: "bg-emerald-500" },
]

export default function StudioDashboard() {
  const router = useRouter()

  return (
    <div className="space-y-5 md:space-y-6 pb-24 max-w-7xl mx-auto">

      {/* ────────────────────────────────────────────────
          COMMAND CENTER BANNER
      ──────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5 md:p-6 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#4F46E5] opacity-[0.03] dark:opacity-[0.05] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-[#22C55E] opacity-[0.03] dark:opacity-[0.05] rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#4F46E5] shadow-lg shadow-[#4F46E5]/20 flex items-center justify-center text-white font-black text-xl shrink-0">
              C
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[20px] font-black text-[#111827] dark:text-white">Creative Studio OS</h1>
                <span className="text-[10px] font-black text-[#4F46E5] bg-[#EEF2FF] dark:bg-indigo-500/20 px-2 py-0.5 rounded-full">PRO</span>
              </div>
              <p className="text-[12px] font-medium text-[#6B7280] dark:text-gray-400 mt-1">
                Your 20-stage business pipeline is running smoothly. You have <strong className="text-[#111827] dark:text-white">14 new leads</strong> and <strong className="text-[#22C55E]">₨4.2M</strong> in YTD revenue.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button onClick={() => router.push("/studio/ai")} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] text-white rounded-xl text-[11px] font-black hover:opacity-90 transition-opacity cursor-pointer shadow-sm">
              <Sparkles className="w-4 h-4" /> Ask AI Assistant
            </button>
            <button onClick={() => router.push("/studio/pipeline")} className="flex items-center gap-2 px-4 py-2.5 bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 text-[#374151] dark:text-gray-300 rounded-xl text-[11px] font-black hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer shadow-sm">
              <Zap className="w-4 h-4 text-[#F59E0B]" /> View Pipeline
            </button>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────
          QUICK PIPELINE WORKFLOW (THE 7 PHASES)
      ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {WORKFLOW_PHASES.map((phase, idx) => (
          <div key={phase.id} onClick={() => router.push("/studio/workflow")} className={`bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-4 cursor-pointer hover:-translate-y-1 transition-all hover:shadow-md group relative overflow-hidden`}>
            {/* Progress connecting line for desktop */}
            {idx < 6 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[2px] bg-[#E5E7EB] dark:bg-white/10 z-0" />
            )}
            <div className="relative z-10 flex flex-col items-center text-center gap-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${phase.bg} group-hover:scale-110 transition-transform`}>
                <phase.icon className={`w-5 h-5 ${phase.color}`} />
              </div>
              <div>
                <div className="text-[20px] font-black text-[#111827] dark:text-white leading-tight">{phase.count}</div>
                <div className="text-[8px] font-black text-[#9CA3AF] uppercase tracking-widest mt-1 px-1">{phase.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ────────────────────────────────────────────────
          CORE OVERVIEW WIDGETS
      ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 md:gap-6">
        
        {/* Active Pipeline Feed */}
        <div className="xl:col-span-2 bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F3F4F6] dark:border-white/5">
            <h3 className="text-[14px] font-black text-[#111827] dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#F59E0B]" /> Live Pipeline Feed
            </h3>
            <button onClick={() => router.push("/studio/pipeline")} className="text-[10px] font-black text-[#4F46E5] hover:underline cursor-pointer">Open Kanban →</button>
          </div>
          <div className="p-2 space-y-1 overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <tbody>
                {ACTIVE_PIPELINE.map(job => (
                  <tr key={job.id} onClick={() => router.push(`/studio/bookings/${job.id}`)} className="group cursor-pointer">
                    <td className="p-3 rounded-l-xl group-hover:bg-[#F8FAFC] dark:group-hover:bg-white/3 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl ${job.color} text-white text-[10px] font-black flex items-center justify-center shrink-0 shadow-sm`}>{job.initials}</div>
                        <div>
                          <div className="text-[12px] font-bold text-[#111827] dark:text-white leading-tight">{job.client}</div>
                          <div className="text-[9px] text-[#9CA3AF] mt-0.5">{job.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 group-hover:bg-[#F8FAFC] dark:group-hover:bg-white/3 transition-colors">
                      <div className="text-[11px] font-semibold text-[#374151] dark:text-gray-300">{job.event}</div>
                    </td>
                    <td className="p-3 group-hover:bg-[#F8FAFC] dark:group-hover:bg-white/3 transition-colors">
                      {(() => {
                        const phaseData = WORKFLOW_PHASES.find(p => p.id === job.phase)
                        return (
                          <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[9px] font-black ${phaseData?.bg} ${phaseData?.color}`}>
                            <div className={`w-1.5 h-1.5 rounded-full bg-current ${job.phase === 'production' ? 'animate-pulse' : ''}`} />
                            {job.stage}
                          </div>
                        )
                      })()}
                    </td>
                    <td className="p-3 text-right rounded-r-xl group-hover:bg-[#F8FAFC] dark:group-hover:bg-white/3 transition-colors">
                      <div className="text-[11px] font-black text-[#111827] dark:text-white">{job.value}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Action Hub */}
        <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl flex flex-col">
          <div className="px-5 py-4 border-b border-[#F3F4F6] dark:border-white/5">
            <h3 className="text-[14px] font-black text-[#111827] dark:text-white">Workflow Actions</h3>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3 flex-1 content-start">
            {QUICK_ACTIONS.map(action => (
              <button
                key={action.label}
                onClick={() => router.push(action.href)}
                className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-[#E5E7EB] dark:border-white/8 hover:border-[#4F46E5]/40 hover:shadow-sm hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-all cursor-pointer group"
              >
                <div className={`w-8 h-8 rounded-xl ${action.color} text-white flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-4 h-4" />
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-black text-[#111827] dark:text-white leading-tight">{action.label}</div>
                  <div className="text-[8px] text-[#9CA3AF] mt-0.5">{action.phase}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────
          METRICS & SYSTEM HEALTH
      ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] rounded-2xl p-5 text-white relative overflow-hidden">
          <DollarSign className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10" />
          <div className="relative z-10">
            <div className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1">Monthly Revenue</div>
            <div className="text-[28px] font-black">₨4,250,000</div>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="bg-white/20 text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-md">
                <ArrowUpRight className="w-3 h-3" /> 12.5% vs last month
              </div>
            </div>
            <button onClick={() => router.push("/studio/reports")} className="mt-4 text-[10px] font-black text-white hover:underline flex items-center gap-1 cursor-pointer">
              View Financial Reports <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] mb-1">Automations Executed</div>
          <div className="text-[28px] font-black text-[#111827] dark:text-white flex items-center gap-2">
            842 <Bot className="w-5 h-5 text-[#22C55E]" />
          </div>
          <div className="text-[11px] font-semibold text-[#6B7280] dark:text-gray-400 mt-2">
            <strong className="text-[#111827] dark:text-white">18 hours</strong> saved this month through automated emails and task assignments.
          </div>
          <button onClick={() => router.push("/studio/automation")} className="mt-4 text-[10px] font-black text-[#4F46E5] hover:underline flex items-center gap-1 cursor-pointer">
            Manage Rules <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] mb-1">Media Storage</div>
          <div className="text-[28px] font-black text-[#111827] dark:text-white flex items-center gap-2">
            48.2 GB
          </div>
          <div className="mt-3 h-1.5 bg-[#E5E7EB] dark:bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] rounded-full w-[24%]" />
          </div>
          <div className="text-[10px] text-[#9CA3AF] mt-2 flex justify-between">
            <span>24% of 200 GB Used</span>
            <span className="font-bold text-[#111827] dark:text-white">Syncing...</span>
          </div>
          <button onClick={() => router.push("/studio/media")} className="mt-4 text-[10px] font-black text-[#4F46E5] hover:underline flex items-center gap-1 cursor-pointer">
            Open Media Library <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}
