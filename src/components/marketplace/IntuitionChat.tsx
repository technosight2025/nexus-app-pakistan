"use client"

import { useState, useRef, useEffect } from "react"
import { Sparkles, X, Send, Bot, User } from "lucide-react"

interface Message {
  sender: "bot" | "user"
  text: string
}

export function IntuitionChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Greetings! How may I assist your festive strategy today?",
    },
  ])
  const [inputVal, setInputVal] = useState("")
  const chatEndRef = useRef<HTMLDivElement>(null)

  const handleSend = (text: string) => {
    if (!text.trim()) return

    setMessages((prev) => [...prev, { sender: "user", text }])
    setInputVal("")

    // Simulated Bot response
    setTimeout(() => {
      let reply = "I'm analyzing your request relative to local Pakistani vendor capacity..."
      if (text.toLowerCase().includes("quote")) {
        reply = "Drafting a proforma quote. Venue + Decor is estimated at 40%, Catering at 30% of your cap."
      } else if (text.toLowerCase().includes("rsvp")) {
        reply = "RSVP completion analytics suggest a 92% attendance rate for corporate events in Islamabad this month."
      }
      setMessages((prev) => [...prev, { sender: "bot", text: reply }])
    }, 1000)
  }

  // Scroll to bottom when messages list updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3">
      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="w-80 h-96 bg-surface rounded-2xl shadow-lg border border-border overflow-hidden flex flex-col animate-slideUp">
          {/* Header */}
          <div className="bg-primary px-4 py-3 text-white flex justify-between items-center border-b border-primary/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="font-bold text-xs tracking-wide">Nexus AI Intuition</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-muted/30">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white ${
                    msg.sender === "user" ? "bg-secondary" : "bg-primary"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <Bot className="w-3.5 h-3.5" />
                  )}
                </div>
                <div
                  className={`p-2.5 rounded-xl text-xs leading-relaxed font-sans ${
                    msg.sender === "user"
                      ? "bg-secondary text-white rounded-tr-none"
                      : "bg-surface text-foreground border border-border rounded-tl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts & Form Input */}
          <div className="p-3 bg-surface border-t border-border space-y-2">
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => handleSend("Draft a vendor quote...")}
                className="text-[9px] bg-secondary-container hover:bg-secondary/10 text-secondary border border-secondary/20 px-2 py-1 rounded-full font-semibold transition-colors"
              >
                Draft a vendor quote...
              </button>
              <button
                onClick={() => handleSend("Analyze RSVP patterns...")}
                className="text-[9px] bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 px-2 py-1 rounded-full font-semibold transition-colors"
              >
                Analyze RSVP...
              </button>
            </div>
            
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend(inputVal)
              }}
              className="flex gap-1.5 pt-1"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Inquire with AI..."
                className="flex-1 text-xs px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-foreground"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/95 text-white p-2 rounded-lg flex items-center justify-center transition-colors active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary hover:bg-primary/95 text-accent rounded-full shadow-lg flex items-center justify-center border border-accent/30 relative transition-transform hover:scale-105 active:scale-95"
      >
        <Sparkles className="w-6 h-6 text-accent" />
        <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-secondary rounded-full border-2 border-surface animate-bounce" />
      </button>
    </div>
  )
}
