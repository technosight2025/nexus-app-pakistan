"use client"

import { useState } from "react"
import { Search, Phone, Video, MoreVertical, Paperclip, Send, Sparkles, Store, Users, UserCircle2, ShieldCheck, CheckCircle2 } from "lucide-react"

type ChatUser = {
  id: string
  name: string
  role: "Vendor" | "Guest" | "Team"
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
}

type Message = {
  id: string
  senderId: string
  text: string
  time: string
  status: "sent" | "delivered" | "read"
}

export function CommunicationHub() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Vendors" | "Guests" | "Team">("All")
  
  const [contacts, setContacts] = useState<ChatUser[]>([
    { id: "1", name: "Luxe Decorators", role: "Vendor", avatar: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=150", lastMessage: "We can confirm the floral arrangements.", time: "10:30 AM", unread: 2, online: true },
    { id: "2", name: "Zara Sheikh (Bride)", role: "Team", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150", lastMessage: "Did you talk to the caterer?", time: "09:15 AM", unread: 0, online: true },
    { id: "3", name: "Royal Catering", role: "Vendor", avatar: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=150", lastMessage: "I'll send the updated menu tonight.", time: "Yesterday", unread: 0, online: false },
    { id: "4", name: "Omar Farooq", role: "Guest", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150", lastMessage: "Looking forward to it!", time: "Tuesday", unread: 0, online: false },
  ])

  const [activeChatId, setActiveChatId] = useState<string>("1")
  
  const activeUser = contacts.find(c => c.id === activeChatId)

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    "1": [
      { id: "m1", senderId: "1", text: "Hi Zoya, regarding the stage decor, we recommend adding some extra fairy lights for the Baraat.", time: "10:00 AM", status: "read" },
      { id: "m2", senderId: "me", text: "That sounds good. How much would the extra lights cost?", time: "10:05 AM", status: "read" },
      { id: "m3", senderId: "1", text: "It would be an additional PKR 15,000.", time: "10:28 AM", status: "read" },
      { id: "m4", senderId: "1", text: "We can confirm the floral arrangements once you approve.", time: "10:30 AM", status: "delivered" },
    ],
    "2": [
      { id: "m1", senderId: "2", text: "Hey! Did you talk to the caterer about the dessert options?", time: "09:15 AM", status: "read" }
    ]
  })

  const [input, setInput] = useState("")

  const filteredContacts = activeFilter === "All" ? contacts : contacts.filter(c => c.role === activeFilter.substring(0, activeFilter.length - 1) || c.role === activeFilter)

  const handleSend = () => {
    if (!input.trim() || !activeChatId) return

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    }

    setMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage]
    }))
    
    setInput("")
  }

  const handleAIDraft = () => {
    setInput("Hi Luxe Decorators, PKR 15,000 for the extra lights works for us. Please proceed and confirm the floral arrangements as well. Thank you!")
  }

  return (
    <div className="flex h-screen bg-[#FAF8F5] pt-0">
      
      {/* Left Sidebar - Chat List */}
      <div className="w-full md:w-[350px] lg:w-[400px] border-r border-[#E8E2D5] bg-white flex flex-col shrink-0">
        
        {/* Header */}
        <div className="p-4 border-b border-[#E8E2D5] shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-black font-poppins text-[#0A3B2A]">Messages</h1>
            <button className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#0A3B2A] transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search conversations..."
              className="w-full bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl pl-10 pr-4 py-2.5 text-[13px] font-medium focus:outline-none focus:border-[#0A3B2A]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto gap-2 p-3 border-b border-[#E8E2D5] no-scrollbar shrink-0">
          {["All", "Vendors", "Guests", "Team"].map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter as any)}
              className={`px-4 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-colors ${
                activeFilter === filter 
                  ? "bg-[#0A3B2A] text-white" 
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map(contact => (
            <div 
              key={contact.id} 
              onClick={() => setActiveChatId(contact.id)}
              className={`flex items-start gap-3 p-4 border-b border-slate-50 cursor-pointer transition-colors ${
                activeChatId === contact.id ? "bg-[#FAF8F5] relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#0A3B2A]" : "hover:bg-slate-50"
              }`}
            >
              <div className="relative shrink-0">
                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[14px] font-bold text-[#1A1A1A] truncate pr-2">{contact.name}</h3>
                  <span className="text-[10px] font-medium text-slate-400 shrink-0">{contact.time}</span>
                </div>
                <div className="flex items-center gap-1.5 mb-1">
                  {contact.role === "Vendor" && <Store className="w-3 h-3 text-blue-500" />}
                  {contact.role === "Team" && <ShieldCheck className="w-3 h-3 text-purple-500" />}
                  {contact.role === "Guest" && <Users className="w-3 h-3 text-slate-400" />}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{contact.role}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className={`text-[13px] truncate pr-2 ${contact.unread > 0 ? "text-[#1A1A1A] font-bold" : "text-slate-500"}`}>
                    {contact.lastMessage}
                  </p>
                  {contact.unread > 0 && (
                    <div className="w-5 h-5 rounded-full bg-[#BE185D] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {contact.unread}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Pane - Chat View */}
      {activeUser ? (
        <div className="flex-1 flex flex-col bg-[#FAF8F5] relative">
          
          {/* Chat Header */}
          <div className="h-[72px] bg-white border-b border-[#E8E2D5] px-6 flex items-center justify-between shrink-0 shadow-sm z-10">
            <div className="flex items-center gap-4">
              <img src={activeUser.avatar} alt={activeUser.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h2 className="text-[15px] font-bold text-[#1A1A1A]">{activeUser.name}</h2>
                <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                  {activeUser.online ? (
                    <><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online now</>
                  ) : "Last seen recently"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-[#0A3B2A] transition-colors">
                <Phone className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-[#0A3B2A] transition-colors">
                <Video className="w-4 h-4" />
              </button>
              <div className="w-px h-6 bg-slate-200 mx-1"></div>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-[#0A3B2A] transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="text-center mb-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 bg-white px-4 py-1 rounded-full border border-slate-100">
                Today
              </span>
            </div>

            {(messages[activeChatId] || []).map((msg) => {
              const isMe = msg.senderId === "me"
              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                  <div className={`flex gap-3 max-w-[70%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                    {!isMe && (
                      <img src={activeUser.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover shrink-0 mt-auto" />
                    )}
                    <div className="flex flex-col gap-1">
                      <div className={`px-5 py-3.5 rounded-[20px] text-[14px] leading-relaxed shadow-sm ${
                        isMe 
                          ? "bg-[#0A3B2A] text-white rounded-br-sm" 
                          : "bg-white text-slate-700 border border-slate-100 rounded-bl-sm"
                      }`}>
                        {msg.text}
                      </div>
                      <div className={`flex items-center gap-1 text-[10px] font-medium text-slate-400 ${isMe ? "justify-end" : "justify-start"}`}>
                        {msg.time}
                        {isMe && (
                          <span className={msg.status === "read" ? "text-blue-500" : ""}>
                            {msg.status === "sent" ? "✓" : "✓✓"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-[#E8E2D5] shrink-0">
            {activeChatId === "1" && (
              <div className="flex justify-start mb-3 ml-2">
                <button 
                  onClick={handleAIDraft}
                  className="flex items-center gap-2 bg-[#FAF8F5] border border-yellow-500/30 text-yellow-700 px-4 py-2 rounded-xl text-[12px] font-bold hover:bg-yellow-50 hover:border-yellow-500/50 transition-colors shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Ask Nexus to draft a reply
                </button>
              </div>
            )}
            
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#0A3B2A] hover:border-[#0A3B2A] transition-colors shrink-0">
                <Paperclip className="w-4 h-4" />
              </button>
              <div className="flex-1 bg-[#FAF8F5] border border-slate-200 rounded-[20px] px-4 py-2 flex items-end focus-within:border-[#0A3B2A] focus-within:ring-1 focus-within:ring-[#0A3B2A] transition-all">
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-transparent border-none focus:outline-none text-[14px] text-slate-700 resize-none max-h-32 min-h-[24px] py-1"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                />
              </div>
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  input.trim() 
                    ? "bg-[#BE185D] text-white shadow-md hover:bg-[#BE185D]/90 hover:scale-105" 
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                <Send className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>

        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-[#FAF8F5] text-slate-400">
          <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
          <h2 className="text-xl font-bold font-poppins text-slate-500 mb-2">Your Inbox</h2>
          <p className="text-[14px]">Select a conversation to start messaging</p>
        </div>
      )}
    </div>
  )
}

function MessageSquare(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
