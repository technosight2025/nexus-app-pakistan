'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, Loader2, User, Mic, Square, Trash2 } from 'lucide-react';

interface ChatProps {
  bookingId: string;
  senderType: 'host' | 'studio_admin' | 'venue_admin';
  senderName: string;
}

export default function NexusChat({ bookingId, senderType, senderName }: ChatProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Audio Recording States
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const storageKey = `nexus_chat_${bookingId}`;

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = async () => {
    try {
      // 1. Attempt to fetch from Supabase
      const { fetchMessages } = await import('@/lib/supabase/chat');
      const data = await fetchMessages(bookingId);
      
      if (data && data.length > 0) {
        setMessages(data);
        return;
      }

      // 2. Fallback to LocalStorage if Supabase is empty (for backward compatibility during demo)
      const localData = localStorage.getItem(storageKey);
      if (localData) {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch (e) {
      console.error("Corrupted chat data, resetting", e);
    }
    
    // 3. Default initial message if empty
    const initMsg = {
      id: Math.random().toString(36).substring(2, 15),
      booking_id: bookingId,
      sender_type: 'system',
      sender_name: 'Nexus System',
      message: 'Project portal communication established. Messages are synced securely.',
      created_at: new Date().toISOString()
    };
    setMessages([initMsg]);
  };

  useEffect(() => {
    let isMounted = true;
    let cleanupSync: (() => void) | undefined;

    const initializeChat = async () => {
      await loadMessages();
      if (isMounted) setLoading(false);
      setTimeout(scrollToBottom, 50);

      // Start Realtime sync
      const { syncLiveDiscussion } = await import('@/lib/discussion/sync-live-discussion');
      cleanupSync = syncLiveDiscussion(bookingId);
    };

    initializeChat();

    // Listen to real-time events from Supabase
    const handleNewMessage = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.bookingId === bookingId) {
        const newMsg = customEvent.detail.message;
        setMessages((prev) => {
          // Avoid duplicates
          if (Array.isArray(prev) && prev.some(m => m.id === newMsg.id)) return prev;
          return [...(Array.isArray(prev) ? prev : []), newMsg];
        });
        setTimeout(scrollToBottom, 50);
      }
    };

    window.addEventListener('nexus:discussion:message', handleNewMessage);

    // Cross-tab synchronization (fallback for local storage mode)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setMessages(parsed);
            setTimeout(scrollToBottom, 50);
          }
        } catch (err) {
          // ignore corrupted cross-tab data
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      isMounted = false;
      window.removeEventListener('nexus:discussion:message', handleNewMessage);
      window.removeEventListener('storage', handleStorageChange);
      if (cleanupSync) cleanupSync();
    };
  }, [bookingId]);

  const saveMessage = async (textOrDataUrl: string) => {
    // Optimistic UI Update
    const optimisticMsg = {
      id: Math.random().toString(36).substring(2, 15),
      booking_id: bookingId,
      sender_type: senderType,
      sender_name: senderName,
      message: textOrDataUrl,
      created_at: new Date().toISOString(),
      status: 'sending'
    };

    const currentMessages = Array.isArray(messages) ? messages : [];
    const updated = [...currentMessages, optimisticMsg];
    setMessages(updated);
    setTimeout(scrollToBottom, 50);

    // Persist to Supabase
    try {
      const { insertMessage } = await import('@/lib/supabase/chat');
      const savedMsg = await insertMessage(bookingId, senderType, senderName, textOrDataUrl);
      
      if (savedMsg) {
        // Replace optimistic msg with real one from DB (to get correct UUID)
        setMessages((prev) => {
          const newArray = prev.map((m) => m.id === optimisticMsg.id ? { ...savedMsg, status: 'sent' } : m);
          localStorage.setItem(storageKey, JSON.stringify(newArray));
          return newArray;
        });
      } else {
        // Database failed, show error state
        setMessages((prev) => {
          const newArray = prev.map((m) => m.id === optimisticMsg.id ? { ...m, status: 'error' } : m);
          localStorage.setItem(storageKey, JSON.stringify(newArray));
          return newArray;
        });
      }
    } catch (err) {
      setMessages((prev) => {
        const newArray = prev.map((m) => m.id === optimisticMsg.id ? { ...m, status: 'error' } : m);
        localStorage.setItem(storageKey, JSON.stringify(newArray));
        return newArray;
      });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    saveMessage(newMessage.trim());
    setNewMessage('');
  };

  // --- AUDIO RECORDING ---
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        // Convert to Base64 Data URL to save in localStorage easily
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          saveMessage(base64data);
        };
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Microphone access denied or not available", err);
      alert("Microphone access is required to send audio messages.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const cancelRecording = () => {
     if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.onstop = () => {
        mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop());
      }; // Override onstop to do nothing
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-xs text-slate-400 font-bold flex items-center justify-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-[#0F5B3E]" /> Starting Live Chat...
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-transparent border border-slate-200 dark:border-none rounded-2xl dark:rounded-none shadow-sm dark:shadow-none overflow-hidden flex-1 flex flex-col min-h-0 h-full w-full relative">
      
      {/* Chat Sub-Header */}
      <div className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/10 p-3.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#0F5B3E] dark:text-cyan-400" />
          <span className="text-xs font-black text-slate-700 dark:text-white tracking-tight uppercase">Live Discussion Hub</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black px-2 py-0.5 rounded-full uppercase">
            Sync Active
          </span>
        </div>
      </div>

      {/* Message History Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF7F2]/30 dark:bg-transparent min-h-0">
        {Array.isArray(messages) && messages.map((msg, index) => {
          if (!msg) return null;
          const isMe = msg.sender_type === senderType;
          const messageText = typeof msg.message === 'string' ? msg.message : JSON.stringify(msg.message || '');
          const isAudio = messageText.startsWith('data:audio');
          const isSystem = msg.sender_type === 'system';

          if (isSystem) {
             return (
               <div key={msg.id || index} className="flex justify-center my-2">
                 <span className="text-[10px] font-bold text-slate-400 dark:text-slate-300 bg-slate-100 dark:bg-white/10 px-3 py-1 rounded-full">{messageText}</span>
               </div>
             )
          }

          return (
            <div key={msg.id || index} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold mb-0.5 px-1">
                {msg.sender_name || 'User'} • {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
              </span>
              <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs font-medium shadow-sm leading-relaxed ${
                isMe 
                  ? msg.status === 'error' ? 'bg-red-500 text-white rounded-tr-none' : 'bg-[#0F5B3E] dark:bg-cyan-600 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 rounded-tl-none'
              }`}>
                {isAudio ? (
                  <audio controls src={messageText} className="h-8 w-48 sm:w-64 outline-none" />
                ) : (
                  messageText
                )}
              </div>
              {isMe && msg.status === 'error' && (
                <span className="text-[9px] text-red-500 font-bold mt-1 px-1">
                  Failed to send - Check Database Connection
                </span>
              )}
              {isMe && msg.status === 'sending' && (
                <span className="text-[9px] text-slate-400 font-medium mt-1 px-1 flex items-center gap-1">
                  <Loader2 className="w-2 h-2 animate-spin" /> Sending...
                </span>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Action Strip */}
      <div className="p-3 border-t border-slate-100 dark:border-white/10 bg-white dark:bg-transparent shrink-0">
        {isRecording ? (
          <div className="flex items-center justify-between bg-red-50 border border-red-100 rounded-xl px-4 py-2">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-sm font-black text-red-600 font-mono tracking-widest">{formatTime(recordingTime)}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={cancelRecording} className="text-red-400 hover:text-red-600 p-2 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
              <button onClick={stopRecording} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 px-4 text-xs font-bold uppercase tracking-wider">
                <Square className="w-4 h-4" /> Send Audio
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:border-[#0F5B3E] dark:focus:border-cyan-500 transition-all dark:text-white"
            />
            
            {newMessage.trim() ? (
              <button 
                type="submit" 
                className="bg-[#0F5B3E] dark:bg-cyan-600 hover:bg-[#0a3f2b] dark:hover:bg-cyan-700 text-white p-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <button 
                type="button" 
                onClick={startRecording}
                className="bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 p-2.5 rounded-xl transition-all flex items-center justify-center border border-slate-200 dark:border-white/10"
                title="Send Voice Note"
              >
                <Mic className="w-4 h-4" />
              </button>
            )}
          </form>
        )}
      </div>

    </div>
  );
}
