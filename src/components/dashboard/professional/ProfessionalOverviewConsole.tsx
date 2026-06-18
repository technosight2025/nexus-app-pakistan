"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  TrendingUp, Calendar, CheckSquare, Wallet, 
  ArrowUpRight, Bot, Star, Activity, Clock 
} from "lucide-react"

export function ProfessionalOverviewConsole() {
  const [chatInput, setChatInput] = useState("")
  const [aiMessage, setAiMessage] = useState("I am analyzing your booking pipeline. You have 3 pending inquiries for next month. Would you like me to draft quotations?")

  const metrics = [
    { title: "Monthly Revenue", value: "Rs. 450,000", change: "+12.5%", icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Upcoming Shoots", value: "8", change: "Next 14 days", icon: Calendar, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Pending Deliverables", value: "3", change: "2 due today", icon: CheckSquare, color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Profile Views", value: "1,245", change: "+45% this week", icon: Activity, color: "text-purple-600", bg: "bg-purple-100" },
  ]

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    setAiMessage("Analyzing your request... Generating proposal templates based on your standard packages.")
    setChatInput("")
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Welcome back, Ali!</h1>
          <p className="text-slate-500 font-medium">Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:border-[#C9A227] hover:text-[#C9A227] transition-all">
            Share Profile
          </button>
          <button className="px-5 py-2.5 bg-[#0F5B3E] text-white font-bold rounded-xl shadow-sm hover:bg-[#0a422c] transition-all">
            New Quotation
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl ${metric.bg} flex items-center justify-center`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                {metric.change} <ArrowUpRight className="w-3 h-3 ml-1" />
              </span>
            </div>
            <h3 className="text-slate-500 font-medium text-sm mb-1">{metric.title}</h3>
            <p className="text-2xl font-black text-slate-900">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Upcoming & Tasks */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Upcoming Schedule */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">Upcoming Projects</h2>
              <button className="text-sm font-bold text-[#0F5B3E]">View Calendar</button>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { name: "Fatima & Bilal Wedding", type: "Cinematography", date: "Oct 24", time: "5:00 PM", status: "Confirmed" },
                { name: "Zainab Corporate Event", type: "Photography", date: "Oct 28", time: "9:00 AM", status: "Pending Contract" },
                { name: "Brand Shoot - Sapphire", type: "Creative Direction", date: "Nov 02", time: "10:00 AM", status: "Confirmed" }
              ].map((project, idx) => (
                <div key={idx} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex flex-col items-center justify-center text-[#0F5B3E]">
                      <span className="text-xs font-bold uppercase">{project.date.split(' ')[0]}</span>
                      <span className="text-lg font-black">{project.date.split(' ')[1]}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-0.5">{project.name}</h4>
                      <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" /> {project.time} • {project.type}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    project.status === "Confirmed" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {project.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column - AI Assistant */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-b from-[#0F5B3E] to-slate-900 rounded-3xl p-1 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A227]/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3" />
            
            <div className="bg-slate-900/40 backdrop-blur-md rounded-[22px] p-6 h-full border border-white/10 relative z-10 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#C9A227]" />
                </div>
                <div>
                  <h3 className="text-white font-bold">NEXUS AI Assistant</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Professional OS</p>
                </div>
              </div>

              <div className="flex-1 bg-black/20 rounded-2xl p-4 mb-4 border border-white/5">
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  {aiMessage}
                </p>
              </div>

              <form onSubmit={handleAiSubmit} className="relative mt-auto">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask for forecasts or templates..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C9A227]/50 transition-colors"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#C9A227] text-slate-900 rounded-lg hover:bg-[#b08d22] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
