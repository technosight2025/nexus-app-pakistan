"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Phone, Video, MoreVertical, Image as ImageIcon, Paperclip, CheckCheck, Smile } from "lucide-react"

// Mock Data
const CONVERSATIONS = [
  {
    id: "v1",
    name: "The Royal Palm Venue",
    role: "Venue Partner",
    avatar: "/images/pakistani_bride_makeup.png",
    lastMessage: "Yes, we can definitely accommodate 500 guests.",
    time: "10:42 AM",
    unread: 2,
    online: true,
  },
  {
    id: "v2",
    name: "Maha's Photography",
    role: "Photography",
    avatar: "/images/pakistani_wedding_venue.png",
    lastMessage: "I'll send over the updated package details.",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "v3",
    name: "Luxe Decorators",
    role: "Decor & Theme",
    avatar: "/images/pakistani_wedding_couple.png",
    lastMessage: "The floral arches are available in pink and white.",
    time: "Oct 1",
    unread: 0,
    online: true,
  }
]

const INITIAL_MESSAGES = [
  { id: 1, text: "Hi there! We are interested in booking The Royal Palm for our Valima on Oct 15th.", sender: "user", time: "10:30 AM" },
  { id: 2, text: "We have around 500 guests. Does your PKR 1.2M package cover the premium catering menu?", sender: "user", time: "10:31 AM" },
  { id: 3, text: "Hello Sarah! Congratulations on your upcoming wedding.", sender: "vendor", time: "10:35 AM" },
  { id: 4, text: "Yes, we can definitely accommodate 500 guests. The 1.2M package includes our Standard menu, but I can upgrade you to the Premium menu for an additional PKR 150k if you book by this week.", sender: "vendor", time: "10:38 AM" },
]

export function NexusChat() {
  const [activeChat, setActiveChat] = useState(CONVERSATIONS[0])
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [newMessage, setNewMessage] = useState("")
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const newMsg = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages([...messages, newMsg])
    setNewMessage("")

    // Mock vendor reply after 2 seconds
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "That sounds great! Let me prepare the final quote for you.",
        sender: "vendor",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
    }, 2000)
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans pt-16">
      {/* Sidebar: Conversations List */}
      <div className="w-full md:w-80 lg:w-96 bg-white border-r border-outline flex flex-col h-full hidden md:flex z-10 shadow-sm">
        <div className="p-4 border-b border-outline">
          <h2 className="text-xl font-black text-slate-900 mb-4">Messages</h2>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {CONVERSATIONS.map(chat => (
            <div 
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`flex items-start gap-3 p-4 cursor-pointer transition-colors border-b border-slate-50 ${activeChat.id === chat.id ? 'bg-primary/5' : 'hover:bg-slate-50'}`}
            >
              <div className="relative shrink-0">
                <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`font-bold truncate text-sm ${activeChat.id === chat.id ? 'text-primary' : 'text-slate-900'}`}>{chat.name}</h3>
                  <span className="text-xs font-medium text-slate-400 shrink-0">{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`text-xs truncate pr-2 ${chat.unread > 0 ? 'font-bold text-slate-800' : 'font-medium text-slate-500'}`}>
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-[#FAFAFA] relative">
        {/* Chat Header */}
        <div className="bg-white px-6 py-4 border-b border-outline flex justify-between items-center z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
              {activeChat.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>}
            </div>
            <div>
              <h2 className="font-bold text-slate-900">{activeChat.name}</h2>
              <p className="text-xs font-medium text-slate-500">{activeChat.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="text-center my-6">
            <span className="bg-white border border-slate-200 text-slate-400 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              Today
            </span>
          </div>
          
          {messages.map((msg, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[75%] md:max-w-[60%] px-5 py-3.5 shadow-sm text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-white rounded-2xl rounded-tr-sm' 
                    : 'bg-white border border-outline text-slate-800 rounded-2xl rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[10px] font-bold text-slate-400">{msg.time}</span>
                {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-blue-500" />}
              </div>
            </motion.div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="bg-white p-4 border-t border-outline">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-end gap-3">
            <div className="flex gap-1 shrink-0 pb-2">
              <button type="button" className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <button type="button" className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors hidden sm:flex">
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl flex items-end focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
              <textarea 
                rows={1}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-transparent px-4 py-3.5 text-sm focus:outline-none resize-none max-h-32"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <button type="button" className="w-10 h-10 shrink-0 m-1 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 transition-colors">
                <Smile className="w-5 h-5" />
              </button>
            </div>

            <button 
              type="submit" 
              disabled={!newMessage.trim()}
              className="w-12 h-12 shrink-0 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
