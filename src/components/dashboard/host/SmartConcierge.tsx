"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X, Send, Bot, User, Loader2 } from "lucide-react"

export function SmartConcierge() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your NEXUS AI Event Concierge. Need help generating a timeline, drafting vendor messages, or managing your budget?" }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    setMessages(prev => [...prev, { role: "user", content: input }])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I can certainly help with that! Let me analyze your current budget and vendor contracts to provide a personalized recommendation." 
      }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#4D96FF] to-[#6EC1E4] text-white flex items-center justify-center shadow-[0_8px_32px_rgba(77,150,255,0.4)] border border-white/20 z-50 transition-all ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[600px] max-h-[80vh] bg-white/80 backdrop-blur-2xl rounded-3xl border border-white shadow-[0_20px_60px_rgba(0,0,0,0.1)] z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#4D96FF] to-[#6EC1E4] p-4 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/20 backdrop-blur-sm">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">NEXUS Concierge</h3>
                  <p className="text-[10px] font-medium text-white/80 uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> AI Assistant Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm
                    ${msg.role === 'user' ? 'bg-slate-100 border-white text-slate-600' : 'bg-[#4D96FF]/10 border-[#4D96FF]/20 text-[#4D96FF]'}
                  `}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[75%] text-sm shadow-sm border border-white/50
                    ${msg.role === 'user' ? 'bg-slate-800 text-white rounded-tr-sm' : 'bg-white/90 text-slate-700 rounded-tl-sm'}
                  `}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-[#4D96FF]/10 border border-[#4D96FF]/20 text-[#4D96FF] shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/90 rounded-tl-sm border border-white/50 shadow-sm flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-[#4D96FF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-[#4D96FF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-[#4D96FF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/50 border-t border-white/50 backdrop-blur-md shrink-0">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything about your event..."
                  className="w-full bg-white border border-white shadow-sm rounded-xl py-3 pl-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-[#4D96FF]/20 text-slate-700"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#4D96FF] text-white flex items-center justify-center hover:bg-[#3b82f6] transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
                <button onClick={() => setInput("Draft an email to my caterer")} className="shrink-0 px-3 py-1.5 bg-white border border-white shadow-sm rounded-lg text-[10px] font-semibold text-slate-500 hover:text-[#4D96FF] transition-colors">
                  Draft email to caterer
                </button>
                <button onClick={() => setInput("How is my budget looking?")} className="shrink-0 px-3 py-1.5 bg-white border border-white shadow-sm rounded-lg text-[10px] font-semibold text-slate-500 hover:text-[#4D96FF] transition-colors">
                  Analyze budget
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
