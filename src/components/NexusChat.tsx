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

  const loadMessages = () => {
    try {
      const data = localStorage.getItem(storageKey);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
          return;
        }
      }
    } catch (e) {
      console.error("Corrupted chat data, resetting", e);
    }
    
    // Default initial message if empty or corrupted
    const initMsg = {
      id: Math.random().toString(36).substring(2, 15),
      booking_id: bookingId,
      sender_type: 'system',
      sender_name: 'Nexus System',
      message: 'Project portal communication established. Messages are synced locally.',
      created_at: new Date().toISOString()
    };
    localStorage.setItem(storageKey, JSON.stringify([initMsg]));
    setMessages([initMsg]);
  };

  useEffect(() => {
    loadMessages();
    setLoading(false);
    setTimeout(scrollToBottom, 50);

    // Cross-tab synchronization
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
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [bookingId]);

  const saveMessage = (textOrDataUrl: string) => {
    const newMsg = {
      id: Math.random().toString(36).substring(2, 15),
      booking_id: bookingId,
      sender_type: senderType,
      sender_name: senderName,
      message: textOrDataUrl,
      created_at: new Date().toISOString()
    };

    // Ensure we are working with an array
    const currentMessages = Array.isArray(messages) ? messages : [];
    const updated = [...currentMessages, newMsg];
    setMessages(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setTimeout(scrollToBottom, 50);
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
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex-1 flex flex-col min-h-0 h-full w-full relative">
      
      {/* Chat Sub-Header */}
      <div className="bg-slate-50 border-b border-slate-100 p-3.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#0F5B3E]" />
          <span className="text-xs font-black text-slate-700 tracking-tight uppercase">Live Discussion Hub</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full uppercase">
            Sync Active
          </span>
        </div>
      </div>

      {/* Message History Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF7F2]/30 min-h-0">
        {Array.isArray(messages) && messages.map((msg, index) => {
          if (!msg) return null;
          const isMe = msg.sender_type === senderType;
          const messageText = typeof msg.message === 'string' ? msg.message : JSON.stringify(msg.message || '');
          const isAudio = messageText.startsWith('data:audio');
          const isSystem = msg.sender_type === 'system';

          if (isSystem) {
             return (
               <div key={msg.id || index} className="flex justify-center my-2">
                 <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{messageText}</span>
               </div>
             )
          }

          return (
            <div key={msg.id || index} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <span className="text-[9px] text-slate-400 font-bold mb-0.5 px-1">
                {msg.sender_name || 'User'} • {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
              </span>
              <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs font-medium shadow-sm leading-relaxed ${
                isMe 
                  ? 'bg-[#0F5B3E] text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
              }`}>
                {isAudio ? (
                  <audio controls src={messageText} className="h-8 w-48 sm:w-64 outline-none" />
                ) : (
                  messageText
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Action Strip */}
      <div className="p-3 border-t border-slate-100 bg-white shrink-0">
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
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:border-[#0F5B3E] transition-all"
            />
            
            {newMessage.trim() ? (
              <button 
                type="submit" 
                className="bg-[#0F5B3E] hover:bg-[#0a3f2b] text-white p-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <button 
                type="button" 
                onClick={startRecording}
                className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-2.5 rounded-xl transition-all flex items-center justify-center border border-slate-200"
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
