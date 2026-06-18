"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, Send, Phone, Video, MoreVertical, CheckCheck, 
  Image as ImageIcon, Paperclip, Sparkles, Smile
} from "lucide-react"

export function HostMessages() {
  const [activeChat, setActiveChat] = useState<number>(1)

  const CONVERSATIONS = [
    {
      id: 1,
      name: "Nexus Support",
      role: "Concierge",
      lastMessage: "I've sent the updated quotes to your finances tab.",
      time: "Just now",
      unread: 2,
      online: true,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150",
      color: "from-[#FFD93D] to-[#FFC300]"
    },
    {
      id: 2,
      name: "Grand Taj Marquee",
      role: "Venue",
      lastMessage: "Yes, the hall will be available from 2 PM.",
      time: "10:30 AM",
      unread: 0,
      online: false,
      avatar: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=150",
      color: "from-[#FF6B6B] to-[#FF8E8B]"
    },
    {
      id: 3,
      name: "Royal Decorators",
      role: "Vendor",
      lastMessage: "We can do the floral arrangement in pink and white.",
      time: "Yesterday",
      unread: 0,
      online: true,
      avatar: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=150",
      color: "from-[#4D96FF] to-[#6EC1E4]"
    }
  ]

  const MESSAGES = [
    { id: 1, text: "Hi! Can you check if the photographer is available?", sender: "me", time: "10:15 AM" },
    { id: 2, text: "Hello Ahmed! Let me check that for you right away.", sender: "them", time: "10:17 AM" },
    { id: 3, text: "Great news, Nexus Studios has confirmed availability for the 20th. I've sent the updated quotes to your finances tab.", sender: "them", time: "10:20 AM" },
  ]

  const activeUser = CONVERSATIONS.find(c => c.id === activeChat)

  return (
    <div className="h-[calc(100vh-140px)] min-h-[600px] flex gap-6 max-w-[1400px] mx-auto animate-in fade-in duration-700">
      
      {/* 🌟 Left Sidebar: Chat List 🌟 */}
      <div className="w-[380px] hidden lg:flex flex-col relative bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-[0_8px_32px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_1px_rgba(255,255,255,0.8)] pointer-events-none z-10" />
        
        {/* Header */}
        <div className="p-8 pb-4 relative z-20">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-6">Messages</h2>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-md rounded-full shadow-[inset_0_1px_rgba(255,255,255,0.8)] border border-white" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#FF6B6B] transition-colors z-10" />
            <input 
              type="text" 
              placeholder="Search conversations..."
              className="relative z-10 w-full pl-10 pr-4 py-3.5 bg-transparent text-sm font-bold outline-none text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-[#FF6B6B]/20 rounded-full"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-2 relative z-20">
          {CONVERSATIONS.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`w-full text-left p-4 rounded-[1.5rem] transition-all duration-300 relative group overflow-hidden ${
                activeChat === chat.id 
                  ? "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-white" 
                  : "hover:bg-white/40 border border-transparent"
              }`}
            >
              {activeChat === chat.id && (
                <motion.div 
                  layoutId="activeChatBg"
                  className="absolute inset-0 bg-white shadow-[inset_0_1px_rgba(255,255,255,0.8)] rounded-[1.5rem]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <div className="relative z-10 flex items-center gap-4">
                <div className="relative">
                  <img src={chat.avatar} alt={chat.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#6BCB77] border-2 border-white rounded-full" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className={`text-base font-black truncate ${activeChat === chat.id ? 'text-slate-800' : 'text-slate-700'}`}>
                      {chat.name}
                    </h3>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${activeChat === chat.id ? 'text-[#FF6B6B]' : 'text-slate-400'}`}>
                      {chat.time}
                    </span>
                  </div>
                  <p className={`text-xs truncate ${chat.unread > 0 ? 'font-black text-slate-700' : 'font-bold text-slate-500'}`}>
                    {chat.lastMessage}
                  </p>
                </div>
                
                {chat.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8B] flex items-center justify-center text-[10px] font-black text-white shadow-sm">
                    {chat.unread}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 🌟 Main Chat Window 🌟 */}
      <div className="flex-1 relative bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-[0_8px_32px_rgba(0,0,0,0.03)] flex flex-col overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#FF6B6B]/10 to-[#FFD93D]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_1px_rgba(255,255,255,0.8)] pointer-events-none z-10" />

        {/* Chat Header */}
        <div className="h-[100px] border-b border-white/50 bg-white/40 flex items-center justify-between px-8 relative z-20 shrink-0">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img src={activeUser?.avatar} alt={activeUser?.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
              {activeUser?.online && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#6BCB77] border-2 border-white rounded-full" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800">{activeUser?.name}</h2>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mt-0.5">{activeUser?.role}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="w-12 h-12 rounded-full bg-white hover:bg-white/80 border border-white flex items-center justify-center text-slate-400 hover:text-[#4D96FF] transition-all shadow-sm">
              <Phone className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full bg-white hover:bg-white/80 border border-white flex items-center justify-center text-slate-400 hover:text-[#FFD93D] transition-all shadow-sm">
              <Video className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full bg-white hover:bg-white/80 border border-white flex items-center justify-center text-slate-400 hover:text-slate-800 transition-all shadow-sm">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-6 relative z-20">
          <div className="flex justify-center">
            <span className="bg-white/80 border border-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 shadow-sm">Today</span>
          </div>
          
          <AnimatePresence>
            {MESSAGES.map((msg, idx) => {
              const isMe = msg.sender === "me"
              return (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex flex-col gap-1.5 max-w-[70%] ${isMe ? "items-end" : "items-start"}`}>
                    <div className={`px-6 py-4 rounded-[1.5rem] shadow-sm relative ${
                      isMe 
                        ? "bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8B] text-white shadow-[0_4px_16px_rgba(255,107,107,0.2)] rounded-tr-sm" 
                        : "bg-white border border-white text-slate-700 rounded-tl-sm"
                    }`}>
                      <p className="text-[15px] font-medium leading-relaxed">{msg.text}</p>
                    </div>
                    <div className="flex items-center gap-2 px-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{msg.time}</span>
                      {isMe && <CheckCheck className="w-3.5 h-3.5 text-[#4D96FF]" />}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Chat Input */}
        <div className="p-6 bg-white/40 border-t border-white/50 relative z-20 shrink-0">
          <div className="flex items-center gap-4 bg-white rounded-full p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white">
            <button className="p-3 text-slate-400 hover:text-[#FFD93D] transition-colors rounded-full hover:bg-slate-50">
              <Smile className="w-5 h-5" />
            </button>
            <button className="p-3 text-slate-400 hover:text-[#4D96FF] transition-colors rounded-full hover:bg-slate-50">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="p-3 text-slate-400 hover:text-[#6BCB77] transition-colors rounded-full hover:bg-slate-50">
              <ImageIcon className="w-5 h-5" />
            </button>
            
            <input 
              type="text" 
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-none focus:outline-none text-slate-700 placeholder-slate-400 text-[15px] font-medium px-2"
            />
            
            <button className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8B] flex items-center justify-center text-white shadow-[0_4px_16px_rgba(255,107,107,0.3)] hover:scale-105 active:scale-95 transition-all group">
              <Send className="w-5 h-5 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}
