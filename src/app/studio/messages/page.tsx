"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Search, Plus, Phone, Video, MoreVertical, Loader2, MessageSquare } from "lucide-react"
import { getQuotations } from "@/lib/mock-db"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import NexusChat from "@/components/NexusChat"

export default function MessagesPage() {
  const [conversations, setConversations] = useState<any[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Load all non-draft quotations as potential conversations
    const quotes = getQuotations().filter((q: any) => q.status !== "Draft")
    setConversations(quotes)
    if (quotes.length > 0) {
      setActiveId(quotes[0].id)
    }
    setLoading(false)
  }, [])

  const activeQuote = conversations.find(c => c.id === activeId)

  return (
    <div className="flex-1 flex flex-col min-h-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
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
        <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
          <DialogTrigger asChild>
            <button className="px-5 py-2.5 bg-[#0A3B2A] dark:bg-cyan-600 text-white rounded-full font-bold text-sm hover:bg-[#0F5B3E] dark:hover:bg-cyan-500 transition-colors shadow-lg flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Message
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-none shadow-2xl">
            <DialogHeader className="p-6 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/10 pb-4">
              <DialogTitle className="text-xl font-black">Start New Message</DialogTitle>
            </DialogHeader>
            <div className="p-4 border-b border-slate-100 dark:border-white/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search contacts..." 
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 dark:focus:ring-cyan-500/30 text-sm"
                />
              </div>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {conversations
                .filter(c => c.client.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((conv) => (
                <div 
                  key={`new-msg-${conv.id}`} 
                  onClick={() => {
                    setActiveId(conv.id);
                    setIsNewMessageOpen(false);
                    setSearchQuery("");
                  }}
                  className="p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border-b border-slate-50 dark:border-white/5 last:border-0"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white ${conv.color || 'bg-indigo-500'}`}>
                    {conv.initials || conv.client.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{conv.client}</h4>
                    <p className="text-xs text-gray-500">{conv.event}</p>
                  </div>
                </div>
              ))}
              {conversations.filter(c => c.client.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                <div className="p-8 text-center text-gray-500 text-sm">
                  No contacts found.
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Chat Interface */}
      <Card className="flex-1 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] overflow-hidden dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 flex flex-row min-h-0 p-0 gap-0">
        
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
            {loading ? (
              <div className="p-6 flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            ) : conversations.length === 0 ? (
               <div className="p-6 text-center text-sm text-gray-500">
                 No active client conversations.
               </div>
            ) : (
              conversations.map((conv) => (
                <div 
                  key={conv.id} 
                  onClick={() => setActiveId(conv.id)}
                  className={`p-4 flex items-center gap-4 cursor-pointer transition-colors border-l-4 ${
                    activeId === conv.id 
                      ? 'bg-gray-50 dark:bg-white/10 border-[#0A3B2A] dark:border-cyan-500' 
                      : 'border-transparent hover:bg-gray-50/50 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white ${conv.color || 'bg-indigo-500'}`}>
                      {conv.initials || conv.client.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className={`font-bold truncate ${activeId === conv.id ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                        {conv.client}
                      </h4>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className={`text-xs truncate text-gray-500 dark:text-gray-400`}>
                        {conv.event} • {conv.id}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full bg-white dark:bg-transparent overflow-hidden relative">
          {activeQuote ? (
               <NexusChat 
                 key={activeQuote.id}
                 bookingId={activeQuote.id} 
                 senderType="studio_admin" 
                 senderName="Creative Studio" 
               />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 h-full">
              <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>

      </Card>
    </div>
  )
}
