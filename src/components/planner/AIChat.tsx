"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Send, Bot, User, Calculator, CheckSquare, CalendarDays, Languages, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

type MessageRole = "user" | "ai"
type MessageType = "text" | "quote" | "checklist" | "vendors"

interface Message {
  id: string
  role: MessageRole
  type: MessageType
  content?: string
}

export function AIChat() {
  const { isRomanUrdu, setIsRomanUrdu } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      type: "text",
      content: "Hi! I'm your Nexus Virtual Planner ✨. Tell me about your dream event (e.g., 'I want a luxury Mehndi in Lahore for 500 guests under 3 million PKR')."
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

    const userMsg: Message = { id: Date.now().toString(), role: "user", type: "text", content: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking and building the plan
    setTimeout(() => {
      setIsTyping(false)
      const introMsg: Message = {
        id: Date.now().toString() + "_1",
        role: "ai",
        type: "text",
        content: "That sounds magical! ✨ I've analyzed our marketplace and put together a comprehensive plan for your 500-guest luxury Mehndi in Lahore."
      }
      const quoteMsg: Message = { id: Date.now().toString() + "_2", role: "ai", type: "quote" }
      const vendorMsg: Message = { id: Date.now().toString() + "_3", role: "ai", type: "vendors" }
      const checklistMsg: Message = { id: Date.now().toString() + "_4", role: "ai", type: "checklist" }

      setMessages(prev => [...prev, introMsg, quoteMsg, vendorMsg, checklistMsg])
    }, 2500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // --- Render Helpers for Structured Messages ---

  const renderQuote = () => (
    <div className="bg-[#121212] rounded-2xl p-6 shadow-md border border-white/10 mt-2 w-full max-w-sm text-white">
      <h4 className="font-bold flex items-center gap-2 mb-4 text-[#C5A059]"><Calculator className="w-5 h-5" /> {isRomanUrdu ? "Andaza Budget" : "Estimated Budget"}</h4>
      <div className="space-y-3 text-sm text-white/80">
        <div className="flex justify-between"><span>{isRomanUrdu ? "Venue aur Catering (500 log)" : "Venue & Catering (500x)"}</span><span className="font-bold text-white">PKR 1.25M</span></div>
        <div className="flex justify-between"><span>{isRomanUrdu ? "Phool aur Decor" : "Lavish Floral Decor"}</span><span className="font-bold text-white">PKR 500k</span></div>
        <div className="flex justify-between"><span>{isRomanUrdu ? "Premium Photo aur Video" : "Premium Photo & Video"}</span><span className="font-bold text-white">PKR 250k</span></div>
        <div className="flex justify-between"><span>{isRomanUrdu ? "DJ aur Sound System" : "DJ & Sound"}</span><span className="font-bold text-white">PKR 50k</span></div>
        <div className="pt-3 border-t border-white/10 flex justify-between font-black text-lg">
          <span className="text-white">{isRomanUrdu ? "Kul Andaza" : "Total Estimate"}</span><span className="text-[#C5A059]">PKR 2.05M</span>
        </div>
      </div>
      <button className="w-full mt-4 bg-[#C5A059] text-black font-bold py-2.5 rounded-xl hover:bg-[#b08e4e] transition-colors cursor-pointer text-xs uppercase tracking-widest font-mono">
        {isRomanUrdu ? "Quote Builder mein tabdeel karain" : "Customize in Quote Builder"}
      </button>
    </div>
  )

  const renderVendors = () => (
    <div className="mt-2 w-full max-w-sm">
      <h4 className="font-bold flex items-center gap-2 mb-3 text-[#C5A059]"><Sparkles className="w-5 h-5" /> {isRomanUrdu ? "Tajaweez Karda Vendors" : "Recommended Vendors"}</h4>
      <div className="space-y-3">
        <div className="bg-[#121212] rounded-2xl border border-white/5 overflow-hidden shadow-md hover:border-white/10 transition-all cursor-pointer">
          <div className="h-32 w-full relative">
            <Image src="/images/pakistani_bride_makeup.png" alt="Venue" fill className="object-cover" />
          </div>
          <div className="p-4">
            <h4 className="font-bold text-white text-sm">The Royal Palm</h4>
            <p className="text-xs text-[#C5A059] font-semibold">{isRomanUrdu ? "PKR 500k se shuru" : "From PKR 500k"}</p>
          </div>
        </div>
        <div className="bg-[#121212] rounded-2xl border border-white/5 overflow-hidden shadow-md hover:border-white/10 transition-all cursor-pointer">
          <div className="h-32 w-full relative">
            <Image src="/images/pakistani_mehndi_hands.png" alt="Photographer" fill className="object-cover" />
          </div>
          <div className="p-4">
            <h4 className="font-bold text-white text-sm">Maha&apos;s Photography</h4>
            <p className="text-xs text-[#C5A059] font-semibold">{isRomanUrdu ? "PKR 150k se shuru" : "From PKR 150k"}</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderChecklist = () => (
    <div className="bg-[#0f0f0f] rounded-2xl p-6 border border-white/10 mt-2 w-full max-w-sm text-white">
      <h4 className="font-bold flex items-center gap-2 mb-4 text-[#C5A059]"><CheckSquare className="w-5 h-5" /> {isRomanUrdu ? "Agla Iqdam" : "Next Steps"}</h4>
      <ul className="space-y-3 text-sm text-white/70">
        <li className="flex items-start gap-2"><CalendarDays className="w-4 h-4 mt-0.5 text-[#C5A059] shrink-0" /> {isRomanUrdu ? "Date pakki karne ke liye The Royal Palm book karain." : "Book The Royal Palm to secure the date."}</li>
        <li className="flex items-start gap-2"><CalendarDays className="w-4 h-4 mt-0.5 text-[#C5A059] shrink-0" /> {isRomanUrdu ? "Decor vendor ke saath floral theme finalize karain." : "Finalize floral theme with decor vendor."}</li>
        <li className="flex items-start gap-2"><CalendarDays className="w-4 h-4 mt-0.5 text-[#C5A059] shrink-0" /> {isRomanUrdu ? "Photographer ke saath event se pehle meeting tay karain." : "Schedule pre-event meeting with Photographer."}</li>
      </ul>
    </div>
  )

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-4xl mx-auto w-full bg-[#050505] text-white">

      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-[#0f0f0f]/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-xl border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center cursor-pointer text-white/80">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C5A059] to-[#b08e4e] flex items-center justify-center text-black shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-white">Nexus AI Planner</h2>
            <p className="text-xs text-white/60 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> {isRomanUrdu ? "Online aur madad ke liye tayyar" : "Online and ready to magic"}
            </p>
          </div>
        </div>

        {/* English / Urdu Toggle Button */}
        <button
          onClick={() => setIsRomanUrdu(!isRomanUrdu)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black tracking-wider uppercase rounded-full transition-all border border-[#C5A059]/20 text-[#C5A059] hover:bg-[#C5A059]/5 bg-[#C5A059]/5 cursor-pointer select-none"
          title={isRomanUrdu ? "Switch to English" : "Urdu mein tabdeel karain"}
        >
          <Languages className="w-3.5 h-3.5" />
          <span>{isRomanUrdu ? "Urdu" : "EN"}</span>
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar bg-[#070707] border-x border-white/5">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>

                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-white/10 text-white/80" : "bg-[#C5A059] text-black font-bold"}`}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                {msg.type === "text" && (
                  <div className={`p-4 rounded-2xl ${msg.role === "user" ? "bg-[#C5A059] text-black rounded-br-sm font-semibold" : "bg-[#0f0f0f] border border-white/10 rounded-bl-sm text-white/95"}`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.id === "1"
                        ? (isRomanUrdu
                            ? "Assalam-o-Alaikum! Main aapka Nexus Virtual Planner hoon ✨. Apne khwaboon ke event ke baare mein batayein (jaise, 'Mujhe Lahore mein 500 mehmaano ke liye 3 million PKR ke andar aik luxury Mehndi chahiye')."
                            : msg.content)
                        : (msg.content?.startsWith("That sounds magical!")
                            ? (isRomanUrdu
                                ? "Yeh toh zabardast hoga! ✨ Maine hamari market ke mutabiq aapke Lahore mein 500 mehmaano ke liye luxury Mehndi ka aik andaza plan banaya hai."
                                : msg.content)
                            : msg.content)
                      }
                    </p>
                  </div>
                )}

                {msg.type === "quote" && renderQuote()}
                {msg.type === "vendors" && renderVendors()}
                {msg.type === "checklist" && renderChecklist()}

              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-[#C5A059] text-black flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#0f0f0f] border border-white/10 p-4 rounded-2xl rounded-bl-sm flex gap-1">
                <motion.div className="w-2 h-2 bg-[#C5A059]/40 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                <motion.div className="w-2 h-2 bg-[#C5A059]/60 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                <motion.div className="w-2 h-2 bg-[#C5A059] rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap gap-2 px-4 py-3 justify-center bg-[#070707] border-t border-white/5 font-sans">
        {[
          {
            label: isRomanUrdu ? "Mehndi Plan (Lahore)" : "Mehndi Plan (Lahore)",
            text: isRomanUrdu 
              ? "Mujhe Lahore mein 500 mehmaano ke liye luxury Mehndi plan karni hai." 
              : "I want to plan a luxury Mehndi in Lahore for 500 guests."
          },
          {
            label: isRomanUrdu ? "Daig Ka Andaza" : "Catering Daigs",
            text: isRomanUrdu 
              ? "400 logo ke liye kitni catering daig chahiye hongi?" 
              : "How many catering daigs do I need for 400 guests?"
          },
          {
            label: isRomanUrdu ? "Salami Setup" : "Salami Ledger",
            text: isRomanUrdu 
              ? "Mehmaano ke salami tohfay ke liye digital Salami ledger kaise set karain?" 
              : "How do I set up a digital Salami ledger for guest cash gifts?"
          },
          {
            label: isRomanUrdu ? "Baraat GPS" : "Baraat Caravan GPS",
            text: isRomanUrdu 
              ? "Mehmaano ke liye Baraat caravan GPS track kaise chalayein?" 
              : "How do I configure the Baraat caravan GPS tracking for guests?"
          }
        ].map((s, idx) => (
          <button
            key={idx}
            onClick={() => setInput(s.text)}
            className="text-[10px] font-bold tracking-wider uppercase px-3.5 py-2 rounded-full border border-white/10 hover:border-[#C5A059] bg-[#0f0f0f] text-white/80 hover:text-white cursor-pointer transition-all duration-300 active:scale-95 shadow-sm font-mono"
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#0f0f0f] border-t border-white/10">
        <div className="relative flex items-center bg-[#050505] rounded-full border border-white/10 shadow-inner focus-within:ring-2 focus-within:ring-[#C5A059]/20 transition-all overflow-hidden p-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isRomanUrdu ? "Apni event ki tafseelat yahan likhain..." : "Type your event details here..."}
            className="flex-1 bg-transparent px-4 py-3 outline-none text-sm font-medium text-white placeholder-white/30"
            disabled={isTyping}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-full bg-[#C5A059] text-black flex items-center justify-center hover:bg-[#b08e4e] disabled:opacity-40 disabled:hover:bg-[#C5A059] transition-colors flex-shrink-0 mr-1 cursor-pointer font-bold"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
        <p className="text-center text-xs text-white/40 mt-2">
          {isRomanUrdu 
            ? "Nexus AI Planner galti kar sakta hai. Baraye meharbani vendors se keemat ki tasdeeq karain." 
            : "Nexus AI Planner can make mistakes. Please verify pricing with vendors."
          }
        </p>
      </div>

    </div>
  )
}
