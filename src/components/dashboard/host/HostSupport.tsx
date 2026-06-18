"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LifeBuoy, Search, MessageSquare, FileText, ChevronRight, 
  Plus, Clock, CheckCircle2, AlertCircle, Send
} from "lucide-react"

export function HostSupport() {
  const [activeTab, setActiveTab] = useState<'tickets' | 'kb'>('tickets')

  const TICKETS = [
    { id: "TKT-1042", subject: "Vendor Payment Issue", status: "In Progress", priority: "High", lastUpdated: "2 hours ago" },
    { id: "TKT-1041", subject: "Update Guest Limit", status: "Resolved", priority: "Medium", lastUpdated: "Yesterday" },
    { id: "TKT-1039", subject: "Refund Policy Query", status: "Closed", priority: "Low", lastUpdated: "Last week" }
  ]

  const KB_ARTICLES = [
    { title: "How to process vendor payments", category: "Payments", reads: "1.2k" },
    { title: "Understanding the refund policy", category: "Policies", reads: "3.4k" },
    { title: "Adding a co-host to your event", category: "Account", reads: "856" },
    { title: "Exporting your final guest list", category: "Guests", reads: "2.1k" }
  ]

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* 🌟 Header 🌟 */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-br from-[#4D96FF]/90 to-[#6EC1E4]/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] text-white shadow-[0_8px_32px_rgba(77,150,255,0.2)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute inset-0 shadow-[inset_0_1px_rgba(255,255,255,0.4)] rounded-[2.5rem] pointer-events-none" />
        
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-white/20 p-2 rounded-xl border border-white/20">
              <LifeBuoy className="w-6 h-6 text-white" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/80">NEXUS Help Center</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">How can we help you today?</h1>
        </div>

        <div className="relative z-10 w-full md:w-96 group">
          <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-2xl shadow-[inset_0_1px_rgba(255,255,255,0.3)] border border-white/30" />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 group-focus-within:text-white transition-colors z-10" />
          <input 
            type="text" 
            placeholder="Search articles, guides, or FAQs..."
            className="relative z-10 w-full pl-12 pr-4 py-3.5 bg-transparent text-sm font-medium text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white/40 rounded-2xl"
          />
        </div>
      </motion.div>

      {/* 🌟 Quick Actions & Navigation 🌟 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex bg-white/60 backdrop-blur-md p-1 rounded-xl border border-white shadow-sm w-fit">
          <button 
            onClick={() => setActiveTab('tickets')}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'tickets' ? 'bg-white shadow-sm text-[#4D96FF]' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <MessageSquare className="w-4 h-4" /> My Tickets
          </button>
          <button 
            onClick={() => setActiveTab('kb')}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'kb' ? 'bg-white shadow-sm text-[#4D96FF]' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <FileText className="w-4 h-4" /> Knowledge Base
          </button>
        </div>

        <button className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8B] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_4px_16px_rgba(255,107,107,0.3)] border border-white/20 hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus className="w-4 h-4" /> Raise New Ticket
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'tickets' ? (
          <motion.div 
            key="tickets"
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Ticket List */}
            <div className="lg:col-span-2 space-y-4">
              {TICKETS.map((ticket, i) => (
                <div key={i} className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white shadow-sm p-5 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden">
                  <div className="absolute inset-0 shadow-[inset_0_1px_rgba(255,255,255,0.8)] pointer-events-none rounded-2xl" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white shadow-sm
                        ${ticket.status === 'Resolved' || ticket.status === 'Closed' ? 'bg-[#6BCB77]/10 text-[#6BCB77]' : 'bg-[#FFD93D]/10 text-[#D4A000]'}
                      `}>
                        {ticket.status === 'Resolved' || ticket.status === 'Closed' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-slate-400">{ticket.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border shadow-sm
                            ${ticket.priority === 'High' ? 'bg-[#FF6B6B]/10 text-[#FF6B6B] border-[#FF6B6B]/20' : 
                              ticket.priority === 'Medium' ? 'bg-[#4D96FF]/10 text-[#4D96FF] border-[#4D96FF]/20' : 
                              'bg-slate-100 text-slate-500 border-slate-200'}
                          `}>
                            {ticket.priority} Priority
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-800 group-hover:text-[#4D96FF] transition-colors">{ticket.subject}</h3>
                        <p className="text-xs font-medium text-slate-500 mt-1">Last updated {ticket.lastUpdated}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`text-[11px] font-bold uppercase tracking-widest
                        ${ticket.status === 'Resolved' || ticket.status === 'Closed' ? 'text-[#6BCB77]' : 'text-[#D4A000]'}
                      `}>
                        {ticket.status}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Chat Widget Area */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white shadow-sm flex flex-col overflow-hidden h-[400px]">
              <div className="p-5 border-b border-white/50 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#6BCB77] animate-pulse" />
                    Live Chat Support
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-500">Typically replies in 5 mins</p>
                </div>
              </div>
              
              <div className="flex-1 p-5 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-[#4D96FF]/10 rounded-full flex items-center justify-center mb-4 border border-[#4D96FF]/20 shadow-sm">
                  <MessageSquare className="w-8 h-8 text-[#4D96FF]" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">Need urgent help?</h4>
                <p className="text-xs font-medium text-slate-500 px-4">Start a live chat with our event concierge team.</p>
              </div>

              <div className="p-4 bg-white/50 border-t border-white/50">
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-sm">
                  Start Chat <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="kb"
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {KB_ARTICLES.map((article, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-md rounded-2xl border border-white shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group relative">
                <div className="absolute inset-0 shadow-[inset_0_1px_rgba(255,255,255,0.8)] pointer-events-none rounded-2xl" />
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-4 border border-white shadow-sm group-hover:bg-[#4D96FF]/10 group-hover:text-[#4D96FF] transition-colors">
                  <FileText className="w-5 h-5 text-slate-400 group-hover:text-[#4D96FF]" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{article.category}</span>
                <h3 className="text-sm font-bold text-slate-800 mt-1 mb-3 group-hover:text-[#4D96FF] transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>
                <p className="text-[11px] font-medium text-slate-500">{article.reads} reads</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
