'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, Loader2, User } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ChatProps {
  bookingId: string;
  senderType: 'host' | 'studio_admin' | 'venue_admin';
  senderName: string;
}

export default function NexusChat({ bookingId, senderType, senderName }: ChatProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat automatically on new streams
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    async function hydrateChatHistory() {
      try {
        const { data, error } = await supabase
          .from('nexus_live_communications')
          .select('*')
          .eq('booking_id', bookingId)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setMessages(data || []);
      } catch (err) {
        console.error('Failed to sync message streams:', err);
      } finally {
        setLoading(false);
        setTimeout(scrollToBottom, 50);
      }
    }

    hydrateChatHistory();

    // 🚀 LIVE WEBSOCKET LINK: Listen for messages sent from the alternative portal
    const chatChannel = supabase
      .channel(`chat-room-${bookingId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'nexus_live_communications', 
        filter: `booking_id=eq.${bookingId}` 
      }, (payload) => {
        setMessages((prev) => {
          // Prevent duplicates if optimistic UI already injected it
          if (prev.some(msg => msg.id === payload.new.id)) return prev;
          return [...prev, payload.new];
        });
        setTimeout(scrollToBottom, 50);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(chatChannel);
    };
  }, [bookingId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageText = newMessage.trim();
    setNewMessage('');

    // Optimistic UI Object to render instantly on sender screen
    const optimisticId = crypto.randomUUID();
    const optimisticMsg = {
      id: optimisticId,
      booking_id: bookingId,
      sender_type: senderType,
      sender_name: senderName,
      message: messageText,
      created_at: new Date().toISOString()
    };

    setMessages((prev) => [...prev, optimisticMsg]);
    setTimeout(scrollToBottom, 50);

    try {
      const { error } = await supabase
        .from('nexus_live_communications')
        .insert({
          booking_id: bookingId,
          sender_type: senderType,
          sender_name: senderName,
          message: messageText
        });

      if (error) throw error;
    } catch (err) {
      console.error('Failed to commit message to remote node:', err);
      // Remove optimistic message if transaction fails
      setMessages((prev) => prev.filter(msg => msg.id !== optimisticId));
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-xs text-slate-400 font-bold flex items-center justify-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-[#0F5B3E]" /> Loading Sync Feed...
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[450px]">
      
      {/* Chat Sub-Header */}
      <div className="bg-slate-50 border-b border-slate-100 p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#0F5B3E]" />
          <span className="text-xs font-black text-slate-700 tracking-tight uppercase">Live Discussion Hub</span>
        </div>
        <span className="text-[10px] bg-[#0F5B3E]/10 text-[#0F5B3E] font-black px-2 py-0.5 rounded-full uppercase">
          Realtime
        </span>
      </div>

      {/* Message History Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF7F2]/30">
        {messages.map((msg) => {
          const isMe = msg.sender_type === senderType;
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <span className="text-[9px] text-slate-400 font-bold mb-0.5 px-1">
                {msg.sender_name} • {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs font-medium shadow-sm leading-relaxed ${
                isMe 
                  ? 'bg-[#0F5B3E] text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
              }`}>
                {msg.message}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Action Strip */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-white flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message to instantly sync across portals..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:border-[#0F5B3E] transition-all"
        />
        <button 
          type="submit" 
          className="bg-[#0F5B3E] hover:bg-[#0a3f2b] text-white p-2 rounded-xl shadow-sm transition-all flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
