'use client';

import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Send, DollarSign, Camera, MessageSquare, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  sender_type: 'host' | 'photographer' | 'admin';
  sender_name: string;
  message: string;
}

export default function NexusStudioPortal() {
  // 1. پے منٹ میٹرکس اسٹیٹ
  const [payments, setPayments] = useState({
    preWeddingTotal: 100000,
    preWeddingPaid: 100000,
    preWeddingStatus: 'paid',
    postWeddingTotal: 150000,
    postWeddingPaid: 50000,
    postWeddingStatus: 'partial',
    highResUnlocked: false // اگر پوسٹ ویڈنگ فل پیڈ نہیں ہوگی تو لاک رہے گا
  });

  // 2. لائیو کمیونیکیشن اسٹیٹ
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender_type: 'photographer', sender_name: 'Zain (Studio Lead)', message: 'السلام علیکم! میں نے پری ویڈنگ شوٹ کی واٹر مارکڈ تصاویر اپلوڈ کر دی ہیں۔ چیک کر لیں۔' },
    { sender_type: 'host', sender_name: 'Muhammad Shafiq', message: 'ویسلام، تصاویر بہت زبردست ہیں۔ پوسٹ ویڈنگ البم کا کام کب تک شروع ہوگا؟' }
  ]);
  const [typedMessage, setTypedMessage] = useState('');

  // 3. تصاویر کا ڈیٹا بیس (Watermarked vs High-Res)
  const [images, setImages] = useState([
    { id: 'img-pre', phase: 'Pre-Wedding', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400', locked: false },
    { id: 'img-post', phase: 'Post-Wedding', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400', locked: true }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;
    
    // لائیو میسج ایڈ کرنا (یہ سپابیس ریئل ٹائم کے ذریعے سنک ہوگا)
    setMessages(prev => [...prev, {
      sender_type: 'host',
      sender_name: 'Muhammad Shafiq',
      message: typedMessage
    }]);
    setTypedMessage('');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 font-sans pb-10">
      {/* Header */}
      <header className="bg-[#0F5B3E] text-[#FAF7F2] p-4 shadow-md sticky top-0 z-50 border-b border-[#D4AF37]/30 flex justify-between items-center">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Nexus Media &amp; Finance Matrix</span>
          <h1 className="text-base font-black">STUDIO WORKSPACE</h1>
        </div>
        <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-bold border border-white/20">
          <Camera className="w-3 h-3 text-[#D4AF37]" /> Nexus Studio
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 mt-6 space-y-6">

        {/* BLOCK 1: Payment Control Center */}
        <div className="bg-white/80 backdrop-blur-md border border-white p-5 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#0F5B3E]" /> Payment Ledger Breakdown
          </h3>

          <div className="space-y-3">
            {/* Pre-Wedding Phase */}
            <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
              <div>
                <p className="text-xs font-bold text-slate-800">Pre-Wedding Shoot</p>
                <p className="text-[10px] text-slate-400">Total: Rs. {payments.preWeddingTotal.toLocaleString()}</p>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-lg flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Fully Paid
              </span>
            </div>

            {/* Post-Wedding Phase */}
            <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
              <div>
                <p className="text-xs font-bold text-slate-800">Post-Wedding / Event Album</p>
                <p className="text-[10px] text-slate-400">Paid: Rs. {payments.postWeddingPaid.toLocaleString()} / Rs. {payments.postWeddingTotal.toLocaleString()}</p>
              </div>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-lg">
                Pending Rs. {(payments.postWeddingTotal - payments.postWeddingPaid).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* BLOCK 2: Media Poster & Image Delivery Grid */}
        <div className="bg-white/80 backdrop-blur-md border border-white p-5 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#0F5B3E]" /> Shot Deliverables
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {images.map((img) => (
              <div key={img.id} className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <img src={img.url} alt={img.phase} className="w-full aspect-[4/5] object-cover" />
                
                {/* Overlay layer if locked */}
                {img.locked && !payments.highResUnlocked && (
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-2">
                    <Lock className="w-6 h-6 text-[#D4AF37] mb-1 animate-bounce" />
                    <p className="text-[10px] text-white font-bold uppercase tracking-wider">Post-Wedding Locked</p>
                    <p className="text-[8px] text-slate-300 px-1">Clear remaining balance to unlock High-Res originals</p>
                  </div>
                )}

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 p-2 text-[10px] text-white flex justify-between items-center">
                  <span className="font-bold">{img.phase}</span>
                  {!img.locked ? <Unlock className="w-3 h-3 text-emerald-400" /> : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BLOCK 3: لائیو مواصلاتی نظام (The Modern Communication Grid) */}
        <div className="bg-white/80 backdrop-blur-md border border-white rounded-2xl shadow-sm overflow-hidden flex flex-col h-[350px]">
          <div className="bg-[#0F5B3E]/5 border-b border-slate-200/60 p-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#0F5B3E]" />
            <span className="text-xs font-black text-[#0F5B3E] uppercase tracking-wider">Studio Live Discussion Room</span>
          </div>

          {/* Chat Messages Scrolling Box */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF7F2]/30">
            {messages.map((msg, index) => {
              const isHost = msg.sender_type === 'host';
              return (
                <div key={index} className={`flex flex-col ${isHost ? 'items-end' : 'items-start'}`}>
                  <span className="text-[9px] text-slate-400 font-bold px-1 mb-0.5">{msg.sender_name}</span>
                  <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs font-medium shadow-sm ${
                    isHost 
                      ? 'bg-[#0F5B3E] text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/60'
                  }`}>
                    {msg.message}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Chat Controller */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              placeholder="تصویر، مینو یا ادائیگی کے متعلق لکھیں..." 
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:border-[#0F5B3E]"
            />
            <button type="submit" className="bg-[#0F5B3E] text-white p-2.5 rounded-xl hover:bg-[#0b432e] transition-all">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </main>
    </div>
  );
}
