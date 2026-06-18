"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X, Send, Bot, User, Paperclip, ChevronDown, CheckCircle2 } from "lucide-react"

type Message = {
  id: string
  sender: "ai" | "user"
  text: string
  time: string
}

export function NexusAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hello Zoya! I'm your Nexus Planning Assistant. Your Walima budget is looking tight, and you have 15 pending RSVPs. How can I help you today?",
      time: "10:00 AM"
    }
  ])

  const suggestions = [
    "Draft a negotiation message for Caterer",
    "Review my remaining budget",
    "Generate a follow-up for pending RSVPs",
    "Suggest timeline adjustments for Mehndi"
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, isOpen])

  const handleSend = (text: string) => {
    if (!text.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, newMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: getAIResponse(text),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (userText: string) => {
    const lower = userText.toLowerCase()
    if (lower.includes("negotiation") || lower.includes("caterer")) {
      return "Here is a drafted message for the caterer:\n\n'Hi [Name], we are very excited about your menu proposal. However, our budget for catering is strictly set at PKR 500,000. Is there any flexibility to adjust the package to meet this target without compromising quality? Let me know.'\n\nWould you like me to send this to their inbox?"
    }
    if (lower.includes("budget")) {
      return "You have spent 65% of your total budget. The remaining PKR 800,000 should ideally cover Photography and Decor. I notice your Decor quotes are exceeding the allocated amount by 10%. Shall I look for alternative vendors?"
    }
    if (lower.includes("rsvp")) {
      return "I can draft a polite reminder. 'Dear [Guest], we are finalizing our numbers for the upcoming celebration and would love to know if you can make it. Please let us know by [Date].' I can bulk send this via the Invitation Hub if you approve."
    }
    return "I'm analyzing that for you now. Is there any specific vendor or event you'd like me to focus on while I compile this information?"
  }

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 lg:bottom-10 right-6 lg:right-10 w-16 h-16 bg-[#0A3B2A] rounded-full shadow-[0_8px_30px_rgba(10,59,42,0.3)] flex items-center justify-center text-white hover:scale-105 hover:shadow-[0_10px_40px_rgba(10,59,42,0.4)] transition-all z-50 group border-2 border-white/10 overflow-hidden"
          >
            {/* Pulsing background effect */}
            <div className="absolute inset-0 bg-yellow-500/20 animate-ping rounded-full"></div>
            <Sparkles className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Slide-out Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] sm:hidden"
            />
            
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 right-0 w-full sm:w-[400px] bg-[#FAF8F5] shadow-2xl z-[101] flex flex-col border-l border-[#E8E2D5]"
            >
              {/* Header */}
              <div className="bg-[#0A3B2A] text-white p-5 flex items-center justify-between shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-lg leading-tight">Nexus AI</h3>
                    <p className="text-white/70 text-[11px] font-medium tracking-widest uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Online
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="relative z-10 w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-white/80 hover:text-white"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                    <div className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                        msg.sender === "user" ? "bg-[#0A3B2A] text-white" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      
                      {/* Bubble */}
                      <div className="flex flex-col gap-1">
                        <div className={`p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                          msg.sender === "user" 
                            ? "bg-[#0A3B2A] text-white rounded-tr-none" 
                            : "bg-white text-slate-700 border border-slate-100 rounded-tl-none whitespace-pre-wrap"
                        }`}>
                          {msg.text}
                        </div>
                        <span className={`text-[10px] font-medium text-slate-400 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex flex-col items-start">
                    <div className="flex gap-3 max-w-[85%]">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm">
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-[#E8E2D5] shrink-0">
                
                {/* Suggestions */}
                {messages.length < 3 && !isTyping && (
                  <div className="flex overflow-x-auto gap-2 pb-3 mb-1 no-scrollbar">
                    {suggestions.map((sug, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleSend(sug)}
                        className="whitespace-nowrap px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-[#0A3B2A] hover:text-white hover:border-[#0A3B2A] transition-colors"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2 bg-[#FAF8F5] p-1.5 rounded-full border border-[#E8E2D5] focus-within:border-[#0A3B2A] focus-within:ring-1 focus-within:ring-[#0A3B2A] transition-all shadow-inner">
                  <button className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors shrink-0">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                    placeholder="Ask Nexus anything..."
                    className="flex-1 bg-transparent border-none focus:outline-none text-[13px] font-medium text-slate-700 px-2 placeholder:text-slate-400"
                  />
                  <button 
                    onClick={() => handleSend(input)}
                    disabled={!input.trim()}
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      input.trim() ? "bg-[#0A3B2A] text-white hover:bg-[#155E45]" : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center mt-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3" /> Powered by Nexus Intelligence
                  </span>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
