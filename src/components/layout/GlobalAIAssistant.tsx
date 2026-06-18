"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Send, Bot, User, Calculator, CheckSquare, CalendarDays, X, MessageSquareText } from "lucide-react"
import Image from "next/image"

type MessageRole = "user" | "ai"
type MessageType = "text" | "quote" | "checklist" | "vendors"

interface Message {
  id: string
  role: MessageRole
  type: MessageType
  content?: string
}

export default function GlobalAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      type: "text",
      content: "Hi! I'm your Nexus Virtual Planner ✨. Need help finding a venue or estimating a budget?"
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
  }, [messages, isTyping, isOpen])

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg: Message = { id: Date.now().toString(), role: "user", type: "text", content: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const introMsg: Message = {
        id: Date.now().toString() + "_1",
        role: "ai",
        type: "text",
        content: "I've analyzed our marketplace and found some great options for you!"
      }
      const vendorMsg: Message = { id: Date.now().toString() + "_3", role: "ai", type: "vendors" }

      setMessages(prev => [...prev, introMsg, vendorMsg])
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const renderVendors = () => (
    <div className="mt-2 w-full max-w-sm">
      <h4 className="font-bold flex items-center gap-2 mb-3 text-blue-600"><Sparkles className="w-4 h-4" /> Top Matches</h4>
      <div className="space-y-3">
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
          <div className="h-24 w-full relative">
            <Image src="/images/pakistani_wedding_venue.png" alt="Venue" fill className="object-cover" />
          </div>
          <div className="p-3">
            <h4 className="font-bold text-slate-900 text-xs">The Royal Palm</h4>
            <p className="text-[10px] text-slate-500 font-medium">From PKR 500k</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[90vw] sm:w-[400px] h-[550px] bg-white rounded-3xl shadow-2xl border border-outline flex flex-col overflow-hidden z-[100]"
          >
            {/* Header */}
            <div className="p-4 border-b border-outline bg-gradient-to-r from-primary to-orange-500 flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-sm">Nexus AI Assistant</h2>
                  <p className="text-[10px] opacity-80 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50/50">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[90%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-slate-200 text-slate-600" : "bg-primary text-white"}`}>
                        {msg.role === "user" ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                      </div>

                      {msg.type === "text" && (
                        <div className={`p-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-slate-900 text-white rounded-br-sm" : "bg-white border border-outline shadow-sm rounded-bl-sm text-slate-800"}`}>
                          <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      )}

                      {msg.type === "vendors" && renderVendors()}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                      <Bot className="w-3 h-3" />
                    </div>
                    <div className="bg-white border border-outline shadow-sm p-3 rounded-2xl rounded-bl-sm flex gap-1">
                      <motion.div className="w-1.5 h-1.5 bg-primary/40 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                      <motion.div className="w-1.5 h-1.5 bg-primary/60 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                      <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-outline">
              <div className="relative flex items-center bg-slate-100 rounded-full border border-slate-200 focus-within:border-primary/50 transition-all overflow-hidden p-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent px-3 py-2 outline-none text-sm font-medium"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 transition-colors flex-shrink-0"
                >
                  <Send className="w-3 h-3 ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-gradient-to-r from-primary to-orange-500 rounded-full shadow-lg flex items-center justify-center text-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquareText className="w-6 h-6" />}
      </motion.button>
    </>
  )
}
