"use client"

import { useState, useRef } from "react"
import {
  Sparkles, Send, Plus, Copy, RefreshCw, ThumbsUp, ThumbsDown,
  FileText, Mail, MessageCircle, DollarSign, Calendar, Users,
  BarChart3, AlertTriangle, Zap, ChevronRight, Bot
} from "lucide-react"

const QUICK_ACTIONS = [
  { id: "quotation",  label: "Generate Quotation",   icon: FileText,     color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-500/10", prompt: "Generate a professional quotation for a wedding photography package including photography, videography, and drone footage for 500 guests in Lahore on November 15, 2026. Include itemized services, taxes, and payment schedule." },
  { id: "email",      label: "Draft Client Email",    icon: Mail,         color: "text-sky-500",    bg: "bg-sky-50 dark:bg-sky-500/10",       prompt: "Write a professional follow-up email to a client named Ayesha who inquired about wedding photography. The event is November 15, 2026. Tone should be warm and professional." },
  { id: "whatsapp",   label: "WhatsApp Message",      icon: MessageCircle,color: "text-emerald-500",bg: "bg-emerald-50 dark:bg-emerald-500/10",prompt: "Write a friendly WhatsApp message to confirm a consultation meeting with Ahmed & Sana for their wedding photography discussion. Meeting is tomorrow at 3 PM at our studio." },
  { id: "timeline",   label: "Build Project Timeline",icon: Calendar,     color: "text-amber-500",  bg: "bg-amber-50 dark:bg-amber-500/10",   prompt: "Create a detailed production timeline for a wedding photography project. Event date: Jul 5, 2025. Include pre-event planning, event day schedule, post-production phases, and delivery milestones." },
  { id: "budget",     label: "Estimate Budget",       icon: DollarSign,   color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10",  prompt: "Estimate a realistic budget breakdown for a full-day wedding photography and videography project including team salaries, equipment costs, editing costs, and profit margin." },
  { id: "tasks",      label: "Assign Team Tasks",     icon: Users,        color: "text-rose-500",   bg: "bg-rose-50 dark:bg-rose-500/10",     prompt: "Create a task assignment plan for a 3-person photography team (Usman - Lead, Aisha - Co-photographer, Faisal - Videographer) for a walima event on July 5." },
  { id: "report",     label: "Business Report",       icon: BarChart3,    color: "text-teal-500",   bg: "bg-teal-50 dark:bg-teal-500/10",     prompt: "Analyze the following studio performance: 8 bookings this month, ₨720,000 revenue, 85% advance collection rate, 3 pending deliveries. Provide insights and recommendations." },
  { id: "risk",       label: "Risk Assessment",       icon: AlertTriangle,color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10",  prompt: "Assess potential risks for an outdoor wedding event in July in Lahore including weather, equipment failure, traffic, and client communication issues. Provide mitigation strategies." },
]

const EXAMPLE_CONVERSATIONS = [
  {
    role: "assistant" as const,
    content: "Hello! I'm your Nexus AI Studio Assistant. I can help you with quotations, contracts, emails, timelines, budget estimates, and business insights. What would you like to work on today?",
  }
]

type Message = { role: "user" | "assistant"; content: string }



export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(EXAMPLE_CONVERSATIONS)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = async (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { role: "user", content: text }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to communicate with AI')
      }
      
      setMessages(prev => [...prev, { role: "assistant", content: data.response }])
    } catch (error: any) {
      setMessages(prev => [...prev, { role: "assistant", content: `Error: ${error.message}. Please check your GEMINI_API_KEY.` }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="space-y-5 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] flex items-center justify-center shrink-0">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-[22px] md:text-[26px] font-black text-[#111827] dark:text-white">AI Studio Assistant</h1>
          <p className="text-[12px] text-[#9CA3AF] mt-0.5">Powered by Nexus AI · Generate quotations, emails, timelines, and insights</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5">
        <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest mb-4">Quick Actions</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {QUICK_ACTIONS.map(action => (
            <button
              key={action.id}
              onClick={() => sendMessage(action.prompt)}
              className={`flex flex-col items-start gap-2 p-3.5 rounded-2xl border border-[#E5E7EB] dark:border-white/8 hover:border-[#4F46E5]/40 hover:shadow-sm cursor-pointer transition-all text-left group`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${action.bg}`}>
                <action.icon className={`w-4 h-4 ${action.color}`} />
              </div>
              <span className="text-[10px] font-black text-[#374151] dark:text-gray-300 leading-tight group-hover:text-[#4F46E5] transition-colors">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl overflow-hidden flex flex-col">
        {/* Chat messages */}
        <div className="flex-1 p-5 space-y-4 max-h-[500px] overflow-y-auto">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${msg.role === "assistant" ? "bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6]" : "bg-[#F8FAFC] dark:bg-white/8 border border-[#E5E7EB] dark:border-white/10"}`}>
                {msg.role === "assistant"
                  ? <Sparkles className="w-4 h-4 text-white" />
                  : <span className="text-[10px] font-black text-[#374151] dark:text-gray-300">U</span>
                }
              </div>

              {/* Bubble */}
              <div className={`flex-1 max-w-[80%] ${msg.role === "user" ? "flex justify-end" : ""}`}>
                <div className={`px-4 py-3 rounded-2xl text-[12px] leading-relaxed whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-[#4F46E5] text-white rounded-tr-sm"
                    : "bg-[#F8FAFC] dark:bg-white/5 text-[#374151] dark:text-gray-300 rounded-tl-sm"
                }`}>
                  {msg.content}
                </div>
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 mt-1.5 ml-1">
                    <button className="p-1 text-[#9CA3AF] hover:text-[#22C55E] cursor-pointer transition-colors"><ThumbsUp className="w-3 h-3" /></button>
                    <button className="p-1 text-[#9CA3AF] hover:text-[#EF4444] cursor-pointer transition-colors"><ThumbsDown className="w-3 h-3" /></button>
                    <button className="p-1 text-[#9CA3AF] hover:text-[#4F46E5] cursor-pointer transition-colors"><Copy className="w-3 h-3" /></button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="px-4 py-3 bg-[#F8FAFC] dark:bg-white/5 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                {[0,1,2].map(i => (
                  <span key={i} className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-[#F3F4F6] dark:border-white/5 p-4">
          <div className="flex items-end gap-3">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input) } }}
              placeholder="Ask anything… e.g. 'Write a quotation for a Mehndi shoot' or 'What are my top revenue sources?'"
              rows={2}
              className="flex-1 px-4 py-3 text-[12px] font-semibold bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all resize-none"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-xl bg-[#4F46E5] hover:bg-indigo-700 text-white flex items-center justify-center shrink-0 cursor-pointer transition-colors disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="text-[9px] text-[#9CA3AF] mt-2 text-center">Press Enter to send · Shift+Enter for new line</div>
        </div>
      </div>
    </div>
  )
}
