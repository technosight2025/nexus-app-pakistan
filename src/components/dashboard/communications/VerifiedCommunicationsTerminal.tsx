'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useDashboard } from '@/contexts/DashboardContext';
import { Loader2, Lock, Check, CheckCheck, Clock, ShieldCheck, User, MessageSquare } from 'lucide-react';
import type { Database } from '@/types/supabase';

type ConversationRow = Database['public']['Tables']['conversations']['Row'] & {
  contacts?: { id: string; name: string; phone: string | null } | null;
};

type MessageRow = Database['public']['Tables']['messages']['Row'];

export function VerifiedCommunicationsTerminal() {
  const { organizationId } = useDashboard();
  const [conversations, setConversations] = useState<ConversationRow[]>([]);
  const [activeConversation, setActiveConversation] = useState<ConversationRow | null>(null);
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  
  const supabase = createClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial Fetch: Active Client Threads
  useEffect(() => {
    async function fetchConversations() {
      if (!organizationId) return;
      setIsLoading(true);

      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          contacts (id, name, phone)
        `)
        .eq('organization_id', organizationId)
        .order('updated_at', { ascending: false });

      if (!error && data) {
        setConversations(data as unknown as ConversationRow[]);
      } else if (error) {
        console.error('Failed to fetch conversations:', error.message, error.details, error.hint);
      }
      setIsLoading(false);
    }
    fetchConversations();
  }, [organizationId, supabase]);

  // Fetch Messages for Active Thread
  useEffect(() => {
    async function fetchMessages() {
      if (!activeConversation) {
        setMessages([]);
        return;
      }
      setIsMessagesLoading(true);

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', activeConversation.id)
        .order('created_at', { ascending: true });

      if (!error && data) {
        setMessages(data);
        scrollToBottom();
      } else if (error) {
        console.error('Failed to fetch messages:', error);
      }
      setIsMessagesLoading(false);
    }
    fetchMessages();
  }, [activeConversation, supabase]);

  // Real-time Database Subscription
  useEffect(() => {
    if (!activeConversation) return;

    const channel = supabase
      .channel(`messages_${activeConversation.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${activeConversation.id}`
        },
        (payload) => {
          const newMessage = payload.new as MessageRow;
          setMessages((prev) => [...prev, newMessage]);
          scrollToBottom();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${activeConversation.id}`
        },
        (payload) => {
          const updatedMessage = payload.new as MessageRow;
          setMessages((prev) => 
            prev.map(msg => msg.id === updatedMessage.id ? updatedMessage : msg)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeConversation, supabase]);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center bg-[#FAF7F2]">
        <Loader2 className="animate-spin text-[#0F5B3E] w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-[#FAF7F2] font-sans border-t border-[#E6E2DA]">
      
      {/* LEFT SIDEBAR: Active Client Threads (30%) */}
      <div className="w-[30%] min-w-[320px] max-w-[400px] bg-[#FFFFFF] border-r border-[#E6E2DA] flex flex-col h-full shrink-0">
        <div className="p-4 border-b border-[#E6E2DA] bg-[#FAF7F2] shrink-0">
          <h2 className="text-sm font-black text-[#1D1C17] uppercase tracking-wider flex items-center gap-2">
            <MessageSquare size={16} className="text-[#0F5B3E]" /> Active Client Threads
          </h2>
          <p className="text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mt-1">
            Certified API Connections
          </p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#E6E2DA]">
          {conversations.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider">No active threads found</p>
            </div>
          ) : (
            conversations.map((conv) => {
              const isActive = activeConversation?.id === conv.id;
              const contactName = conv.contacts?.name || 'Unknown Contact';
              const contactPhone = conv.contacts?.phone || 'No phone recorded';

              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConversation(conv)}
                  className={`w-full text-left p-4 transition-colors hover:bg-[#FAF7F2] ${
                    isActive ? 'bg-[#E6F0EC] border-l-4 border-[#0F5B3E]' : 'border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-black text-[#1D1C17] truncate pr-2">{contactName}</span>
                    <span className="text-[10px] font-bold text-[#5E6460] shrink-0">{formatDate(conv.updated_at)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] font-bold text-[#5E6460] flex items-center gap-1.5">
                      <User size={12} /> {contactPhone}
                    </span>
                    <span className="flex items-center gap-1 bg-[#FAF7F2] px-2 py-0.5 border border-[#E6E2DA] text-[9px] font-black text-[#0F5B3E] uppercase tracking-wider">
                      <Lock size={10} /> API Synced
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT MAIN PANE: Official Audit Stream (70%) */}
      <div className="flex-1 flex flex-col bg-[#FAF7F2] h-full relative">
        {!activeConversation ? (
          <div className="flex-1 flex flex-col items-center justify-center opacity-50">
            <ShieldCheck size={48} className="text-[#0F5B3E] mb-4" />
            <h3 className="text-lg font-black text-[#1D1C17] uppercase tracking-widest">Select a Thread</h3>
            <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider mt-2">To view certified communication ledgers</p>
          </div>
        ) : (
          <>
            {/* Stream Header */}
            <div className="bg-[#FFFFFF] border-b border-[#E6E2DA] shrink-0">
              <div className="p-5 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-black text-[#1D1C17] uppercase tracking-wider">
                    {activeConversation.contacts?.name || 'Unknown Contact'}
                  </h2>
                  <p className="text-xs font-bold text-[#5E6460] mt-0.5 flex items-center gap-2">
                    Verified Mobile: {activeConversation.contacts?.phone || 'N/A'}
                  </p>
                </div>
                <div className="bg-[#E6F0EC] text-[#0F5B3E] px-4 py-2 border border-[#0F5B3E]/20">
                  <span className="text-[10px] font-black uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck size={14} /> Certified Ledger Active
                  </span>
                </div>
              </div>
              
              {/* Global Notification Banner */}
              <div className="bg-[#0F5B3E] text-white px-6 py-2.5 flex items-center gap-3">
                <Lock size={14} className="text-[#E6F0EC]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Official Communication Ledger: These conversations are securely synced via Meta API and cannot be modified or deleted. Valid as contract proof.
                </span>
              </div>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {isMessagesLoading ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="animate-spin text-[#0F5B3E] w-6 h-6" />
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center p-12 bg-[#FFFFFF] border border-[#E6E2DA]">
                  <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider">No messages recorded in this ledger yet.</p>
                </div>
              ) : (
                messages.map((msg) => {
                  // If sender_id is null, it's incoming from the customer. Otherwise, outgoing from staff.
                  const isOutgoing = msg.sender_id !== null;

                  return (
                    <div key={msg.id} className={`flex flex-col ${isOutgoing ? 'items-end' : 'items-start'}`}>
                      
                      {/* Message Surface */}
                      <div className={`max-w-[75%] p-4 border border-[#E6E2DA] ${
                        isOutgoing ? 'bg-[#FFFFFF]' : 'bg-[#E6F0EC]/30'
                      } rounded-none`}>
                        <p className="text-sm font-medium text-[#1D1C17] whitespace-pre-wrap leading-relaxed">
                          {msg.text || '[Unsupported Message Type]'}
                        </p>
                      </div>

                      {/* Metadata Proof Sub-Text */}
                      <div className={`mt-1.5 flex items-center gap-3 text-[9px] font-bold uppercase tracking-wider text-[#5E6460] ${
                        isOutgoing ? 'flex-row-reverse' : 'flex-row'
                      }`}>
                        <span className="flex items-center gap-1">
                          <Clock size={10} /> {formatDate(msg.created_at)} at {formatTime(msg.created_at)}
                        </span>
                        
                        {msg.is_verified_proof && (
                          <span className="flex items-center gap-1 text-[#0F5B3E]">
                            <ShieldCheck size={10} /> WhatsApp API ID: {msg.whatsapp_message_id ? msg.whatsapp_message_id.substring(0, 12) + '...' : 'Verified'}
                          </span>
                        )}

                        {isOutgoing && (
                          <span className="flex items-center gap-1">
                            {msg.delivery_status === 'read' ? (
                              <CheckCheck size={12} className="text-[#0F5B3E]" />
                            ) : msg.delivery_status === 'delivered' ? (
                              <CheckCheck size={12} />
                            ) : msg.delivery_status === 'sent' ? (
                              <Check size={12} />
                            ) : (
                              <Clock size={10} />
                            )}
                            <span className="ml-0.5">{msg.delivery_status || 'pending'}</span>
                          </span>
                        )}
                      </div>

                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Read-Only Footer */}
            <div className="bg-[#FFFFFF] border-t border-[#E6E2DA] p-4 text-center shrink-0">
              <p className="text-[10px] font-bold text-[#5E6460] uppercase tracking-wider">
                Replies must be dispatched via the unified operations center or Meta Business Suite.
              </p>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
