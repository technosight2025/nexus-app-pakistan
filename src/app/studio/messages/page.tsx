"use client"

import { Card } from "@/components/ui/card"
import { Search, Plus, Send, Phone, Video, MoreVertical, Paperclip, Smile } from "lucide-react"

export default function MessagesPage() {
  const conversations = [
    {
      id: 1,
      name: "Ahmed & Sana",
      avatar: "A",
      lastMessage: "Thank you! The album looks amazing.",
      time: "10:42 AM",
      unread: 0,
      active: true,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
    },
    {
      id: 2,
      name: "TechCorp Events",
      avatar: "T",
      lastMessage: "Can we schedule a call for tomorrow?",
      time: "Yesterday",
      unread: 2,
      active: false,
      color: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400"
    },
    {
      id: 3,
      name: "Hassan Family",
      avatar: "H",
      lastMessage: "Are the raw files available?",
      time: "Monday",
      unread: 0,
      active: false,
      color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
    },
    {
      id: 4,
      name: "Studio Team",
      avatar: "S",
      lastMessage: "Zoya: I'll edit the highlight reel today.",
      time: "Monday",
      unread: 5,
      active: false,
      color: "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400"
    }
  ]

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 mb-8">
        <div>
          <h1 className="text-3xl font-black font-poppins text-gray-900 dark:text-white tracking-tight">
            Messages
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Communicate with clients and team members in real-time.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-[#0A3B2A] dark:bg-cyan-600 text-white rounded-full font-bold text-sm hover:bg-[#0F5B3E] dark:hover:bg-cyan-500 transition-colors shadow-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Message
        </button>
      </div>

      {/* Chat Interface */}
      <Card className="flex-1 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] overflow-hidden dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 flex min-h-0">
        
        {/* Conversations Sidebar */}
        <div className="w-80 border-r border-gray-100 dark:border-white/10 flex flex-col shrink-0 bg-white/50 dark:bg-transparent hidden lg:flex">
          <div className="p-4 border-b border-gray-100 dark:border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 dark:focus:ring-cyan-500/30 text-sm"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {conversations.map((conv) => (
              <div 
                key={conv.id} 
                className={`p-4 flex items-center gap-4 cursor-pointer transition-colors border-l-4 ${
                  conv.active 
                    ? 'bg-gray-50 dark:bg-white/10 border-[#0A3B2A] dark:border-cyan-500' 
                    : 'border-transparent hover:bg-gray-50/50 dark:hover:bg-white/5'
                }`}
              >
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${conv.color}`}>
                    {conv.avatar}
                  </div>
                  {conv.active && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-[#050505] rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className={`font-bold truncate ${conv.active ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {conv.name}
                    </h4>
                    <span className="text-[10px] font-bold text-gray-400 shrink-0 ml-2">{conv.time}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className={`text-xs truncate ${conv.unread > 0 ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                      {conv.lastMessage}
                    </p>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-[#0A3B2A] dark:bg-cyan-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-lg shadow-cyan-500/20">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-transparent">
          
          {/* Chat Header */}
          <div className="h-[72px] border-b border-gray-100 dark:border-white/10 flex items-center justify-between px-6 shrink-0 bg-white/50 dark:bg-transparent">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold">
                A
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Ahmed & Sana</h3>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors hidden sm:flex">
                <Phone className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors hidden sm:flex">
                <Video className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 flex flex-col justify-end">
            
            <div className="flex items-center justify-center">
              <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Today
              </span>
            </div>

            <div className="flex gap-4 max-w-[85%] sm:max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 items-center justify-center font-bold text-xs shrink-0 mt-auto hidden sm:flex">
                A
              </div>
              <div>
                <div className="bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-200 p-4 rounded-2xl rounded-bl-none text-sm shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                  Hi team! We just reviewed the final video highlights and we absolutely love them! 😍
                </div>
                <p className="text-[10px] text-gray-400 font-medium mt-1.5 ml-1">10:30 AM</p>
              </div>
            </div>

            <div className="flex gap-4 max-w-[85%] sm:max-w-[80%] ml-auto justify-end">
              <div className="flex flex-col items-end">
                <div className="bg-[#0A3B2A] dark:bg-cyan-600 text-white p-4 rounded-2xl rounded-br-none text-sm shadow-md dark:shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                  That's fantastic to hear! It was a pleasure covering your big day. Let us know when you'd like to schedule the photobook selection.
                </div>
                <p className="text-[10px] text-gray-400 font-medium mt-1.5 mr-1">10:35 AM • Read</p>
              </div>
            </div>

            <div className="flex gap-4 max-w-[85%] sm:max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 items-center justify-center font-bold text-xs shrink-0 mt-auto hidden sm:flex">
                A
              </div>
              <div>
                <div className="bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-200 p-4 rounded-2xl rounded-bl-none text-sm shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                  Thank you! The album looks amazing. We will finalize the pictures by this weekend.
                </div>
                <p className="text-[10px] text-gray-400 font-medium mt-1.5 ml-1">10:42 AM</p>
              </div>
            </div>

          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-100 dark:border-white/10 shrink-0 bg-white/50 dark:bg-transparent">
            <div className="flex items-end gap-2 sm:gap-3 bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-[#0A3B2A]/20 dark:focus-within:ring-cyan-500/30 transition-all">
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors shrink-0">
                <Paperclip className="w-5 h-5" />
              </button>
              <textarea 
                placeholder="Type your message..." 
                className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 resize-none max-h-32 min-h-[44px] py-3 text-sm text-gray-900 dark:text-white"
                rows={1}
              ></textarea>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors shrink-0 hidden sm:block">
                <Smile className="w-5 h-5" />
              </button>
              <button className="w-11 h-11 bg-[#0A3B2A] dark:bg-cyan-600 hover:bg-[#0F5B3E] dark:hover:bg-cyan-500 text-white rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-md">
                <Send className="w-4 h-4 sm:ml-0.5" />
              </button>
            </div>
          </div>

        </div>

      </Card>
    </div>
  )
}
