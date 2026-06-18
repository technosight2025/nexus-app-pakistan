"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Sparkles, Send, X, AlertTriangle, Lightbulb, 
  TrendingUp, Bot, User
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface NexusBusinessAIProps {
  isOpen: boolean;
  onClose: () => void;
}

type MessageRole = "user" | "ai"

interface Message {
  id: string
  role: MessageRole
  content: string
}

export function NexusBusinessAI({ isOpen, onClose }: NexusBusinessAIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "ai",
      content: "Hello! I'm your Nexus Business AI. How can I help you optimize your operations today?"
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(() => {
      setIsTyping(false)
      const aiResponse: Message = {
        id: Date.now().toString() + "_ai",
        role: "ai",
        content: `Based on your recent data, your projected revenue for next month is PKR 4.5M, which is a 12% increase! To secure this, I recommend following up with the 3 tentative bookings in your pipeline.`
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]"
          />

          {/* Panel */}
          <motion.div 
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-slate-50 shadow-2xl z-[70] flex flex-col border-l border-slate-200"
          >
            
            {/* Header */}
            <div className="p-5 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-black text-slate-900 text-lg leading-tight">Nexus Business AI</h2>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500">
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col">
              
              {/* Proactive Insights Feed */}
              <div className="p-5 space-y-4 shrink-0">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Live Insights</h3>
                
                {/* Warning Card */}
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-900 text-sm">Double Booking Risk</h4>
                    <p className="text-xs text-red-700/80 mt-1 leading-relaxed">You have two tentative inquiries for the "Royal Marquee" on June 15th. We recommend reaching out to secure a deposit.</p>
                  </div>
                </div>

                {/* Suggestion Card */}
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 text-sm">Follow-up Required</h4>
                    <p className="text-xs text-amber-700/80 mt-1 leading-relaxed">"Zara Khan" has not paid the advance for her Mehndi event in 3 days. <span className="font-bold underline cursor-pointer">Draft Reminder Email</span></p>
                  </div>
                </div>

                {/* Business Insight Card */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 text-sm">Revenue Up 15%</h4>
                    <p className="text-xs text-emerald-700/80 mt-1 leading-relaxed">Your "Platinum Wedding Package" is driving a 15% increase in revenue this month compared to last month.</p>
                  </div>
                </div>
              </div>

              {/* Chat Divider */}
              <div className="flex items-center gap-3 px-5 py-2 shrink-0">
                <div className="flex-1 h-px bg-slate-200"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ask AI</span>
                <div className="flex-1 h-px bg-slate-200"></div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-5 space-y-6">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[90%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      {/* Avatar */}
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-slate-200 text-slate-600" : "bg-indigo-500 text-white"}`}>
                        {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                      </div>

                      {/* Bubble */}
                      <div className={`p-3.5 rounded-2xl ${msg.role === "user" ? "bg-slate-900 text-white rounded-br-sm" : "bg-white border border-slate-200 shadow-sm rounded-bl-sm text-slate-700"}`}>
                        <p className="text-xs font-medium leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-white border border-slate-200 shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                      <motion.div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                      <motion.div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                      <motion.div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200 shrink-0">
              <div className="relative flex items-center bg-slate-50 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all p-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about revenue, bookings, staff..."
                  className="flex-1 bg-transparent px-3 py-2 outline-none text-xs font-medium text-slate-900"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
