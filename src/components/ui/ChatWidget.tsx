import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

export function ChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: "Salam! Welcome to Nexus. I am your AI Event Concierge. How can I help you plan your event today?" }
  ])
  const [inputVal, setInputVal] = React.useState("")
  const chatEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputVal.trim()) return

    const userMsg = inputVal
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }])
    setInputVal("")

    // Simulated responses
    setTimeout(() => {
      let botResponse = "I can definitely help you with that. Would you like me to match you with top-rated wedding venues or photographers in your city?"
      const lowercase = userMsg.toLowerCase()
      if (lowercase.includes("venue") || lowercase.includes("marquee") || lowercase.includes("hall")) {
        botResponse = "We have 150+ verified marquees and banquets in Lahore, Karachi, and Islamabad. Shall I show you the category list?"
      } else if (lowercase.includes("photograph") || lowercase.includes("camera") || lowercase.includes("shoot")) {
        botResponse = "I can recommend photographers starting from PKR 40k/day. Let me know your city!"
      } else if (lowercase.includes("cater") || lowercase.includes("food") || lowercase.includes("daig")) {
        botResponse = "For catering, you can try our interactive portion calculator in the platform tools! Would you like me to guide you there?"
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }])
    }, 900)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expandable Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="w-80 sm:w-96 h-[450px] bg-white border border-[#E6E2DA] rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4 mr-0 sm:mr-2"
          >
            {/* Header */}
            <div className="bg-[#0F5B3E] text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#D4AF37]">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-black uppercase tracking-wider">AI Event Concierge</h4>
                  <span className="text-[10px] text-emerald-300 font-bold block">Online support</span>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FDF8F0]/50 no-scrollbar">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-start gap-2.5 max-w-[85%] text-xs font-medium leading-relaxed p-3 rounded-2xl text-left",
                    msg.sender === "bot"
                      ? "bg-white border border-[#E6E2DA] text-[#1A1A1A] mr-auto rounded-tl-xs"
                      : "bg-[#0F5B3E] text-white ml-auto rounded-tr-xs"
                  )}
                >
                  {msg.sender === "bot" && <Bot className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />}
                  <span>{msg.text}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Direct support options */}
            <div className="px-4 py-2 border-t border-[#E6E2DA] bg-slate-50 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg border border-[#E6E2DA] bg-white text-[10px] font-bold text-[#0F5B3E] whitespace-nowrap hover:bg-[#FAF7F2] flex items-center gap-1 shrink-0"
              >
                💬 WhatsApp Agent
              </a>
              <button 
                onClick={() => setMessages(prev => [...prev, { sender: "user", text: "Help me find a venue" }, { sender: "bot", text: "Certainly! What city are you planning your event in: Lahore, Karachi, or Islamabad?" }])}
                className="px-2.5 py-1.5 rounded-lg border border-[#E6E2DA] bg-white text-[10px] font-bold text-slate-700 whitespace-nowrap hover:bg-[#FAF7F2] shrink-0"
              >
                🏢 Find Venue
              </button>
              <button 
                onClick={() => setMessages(prev => [...prev, { sender: "user", text: "Portion Calculator" }, { sender: "bot", text: "Our Portions Calculator is in the tools section below. Try moving the guest count slider to see live Cauldrons estimates!" }])}
                className="px-2.5 py-1.5 rounded-lg border border-[#E6E2DA] bg-white text-[10px] font-bold text-slate-700 whitespace-nowrap hover:bg-[#FAF7F2] shrink-0"
              >
                🍲 Food Portions
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-[#E6E2DA] bg-white flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask AI planning concierge..."
                className="flex-1 px-4 py-2.5 text-xs font-semibold rounded-xl border border-[#E6E2DA] bg-[#FDF8F0]/30 outline-none focus:border-[#0F5B3E] placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="w-9 h-9 rounded-xl bg-[#0F5B3E] hover:bg-[#0b4730] disabled:opacity-40 text-white flex items-center justify-center shrink-0 cursor-pointer transition-colors"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Bubble */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[#0F5B3E] text-white flex items-center justify-center shadow-xl hover:shadow-[0_8px_24px_rgba(15,91,62,0.3)] transition-shadow duration-300 cursor-pointer border border-[#D4AF37]/25 relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="absolute top-[-5px] right-[-5px] w-2.5 h-2.5 bg-[#D4AF37] rounded-full border border-[#0F5B3E] animate-ping" />
              <span className="absolute top-[-5px] right-[-5px] w-2.5 h-2.5 bg-[#D4AF37] rounded-full border border-[#0F5B3E]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
