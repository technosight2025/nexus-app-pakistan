"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Mail, Smartphone, QrCode, MessageCircle, Send, X, FileText, Heart } from "lucide-react"

const theme = {
  primary: "#0F5B3E",
  accent: "#D4AF37",
  bg: "#FDF8F0",
  success: "#10B981",
  whatsapp: "#25D366"
}

const INVITE_DESIGNS = [
  { id: 1, name: "Royal Gold Elegance", type: "Digital PDF", sent: 120, img: "https://images.unsplash.com/photo-1538356111053-748a48e1acb8?q=80&w=400" },
  { id: 2, name: "Emerald Minimalist", type: "WhatsApp Link", sent: 350, img: "https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?q=80&w=400" }
]

export function DigitalInvitations() {
  const [showWATemplate, setShowWATemplate] = useState(false)
  const [waMessage, setWaMessage] = useState("Salam [Guest Name]!\n\nWe are absolutely delighted to invite you to the wedding of Ahmed & Fatima.\n\nDate: Aug 20, 2026\nVenue: Grand Taj Marquee\n\nPlease find your secure digital pass and seating assignment below. Looking forward to celebrating with you!\n\n[Digital Pass Link]")

  const handleSendWA = () => {
    alert("Triggering Nexus WhatsApp Webhooks to 350 pending guests...")
    setShowWATemplate(false)
  }

  return (
    <div className="space-y-6 pb-24 font-inter">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/80 backdrop-blur-md p-6 rounded-[24px] border border-gray-100 shadow-sm">
        <div>
          <h3 className="text-xl font-bold font-poppins text-[#1A1A1A]">Digital Invitations & Comms</h3>
          <p className="text-sm font-medium text-gray-500">Create, send, and track stunning e-invites over WhatsApp.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowWATemplate(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#25D366] hover:bg-[#25D366]/10 text-[#25D366] font-bold shadow-sm transition-colors shrink-0"
            style={{ borderRadius: '12px' }}
          >
            <MessageCircle className="w-4 h-4" /> WA Blaster
          </button>
          <button 
            className="flex items-center gap-2 px-5 py-2.5 text-white font-bold transition-all active:scale-95 shadow-md hover:bg-[#1A7A54] shrink-0"
            style={{ borderRadius: '12px', backgroundColor: theme.primary }}
          >
            <Plus className="w-4 h-4" /> Design New Invite
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INVITE_DESIGNS.map((design) => (
          <div 
            key={design.id} 
            className="bg-white border border-gray-100 rounded-[24px] p-5 overflow-hidden relative group transition-all duration-300"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(212,175,55,0.15)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"
            }}
          >
            
            <div className="aspect-[4/5] rounded-[16px] bg-gray-100 mb-5 overflow-hidden border border-gray-200 relative">
              <img src={design.img} alt={design.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#0F5B3E]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                <button 
                  className="px-5 py-2.5 rounded-xl bg-white text-[#0F5B3E] font-bold text-sm shadow-xl hover:bg-gray-50 transition-colors"
                >
                  Edit Design
                </button>
              </div>
            </div>

            <div className="space-y-1 mb-5">
              <h4 className="text-lg font-bold font-poppins text-[#1A1A1A]">{design.name}</h4>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{design.type} • <span style={{ color: theme.primary }}>{design.sent} Sent</span></p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button className="py-2.5 flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-colors">
                <Mail className="w-4 h-4" /> Email
              </button>
              <button 
                onClick={() => setShowWATemplate(true)}
                className="py-2.5 flex items-center justify-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl text-xs font-bold text-[#128C7E] hover:bg-[#25D366]/20 transition-colors"
              >
                <Smartphone className="w-4 h-4" /> WA
              </button>
              <button className="py-2.5 flex items-center justify-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl text-xs font-bold text-[#B89020] hover:bg-[#D4AF37]/20 transition-colors">
                <QrCode className="w-4 h-4" /> QR
              </button>
            </div>
          </div>
        ))}

        {/* Create New Card Placeholder */}
        <div 
          className="border-[3px] border-dashed border-gray-200 rounded-[24px] flex flex-col items-center justify-center min-h-[450px] bg-white/50 hover:bg-gray-50 hover:border-[#D4AF37]/50 transition-colors cursor-pointer group"
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}>
            <Plus className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold font-poppins text-[#1A1A1A] mb-1">New Template</h4>
          <p className="text-sm font-medium text-gray-500">Start from scratch or use a preset</p>
        </div>
      </div>

      {/* 📱 WhatsApp Template Editor Modal */}
      <AnimatePresence>
        {showWATemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="bg-white shadow-2xl overflow-hidden w-full max-w-2xl flex flex-col md:flex-row"
              style={{ borderRadius: '32px' }}
            >
              {/* Left Panel: Editor */}
              <div className="p-6 md:p-8 flex-1 border-b md:border-b-0 md:border-r border-gray-100 bg-[#FDF8F0]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold font-poppins text-[#1A1A1A] flex items-center gap-2">
                    <MessageCircle className="w-6 h-6 text-[#25D366]" /> WA Campaign
                  </h3>
                  <button onClick={() => setShowWATemplate(false)} className="md:hidden w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 shadow-sm">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message Template</label>
                    <textarea 
                      value={waMessage}
                      onChange={(e) => setWaMessage(e.target.value)}
                      className="w-full h-48 p-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#25D366]/20 focus:border-[#25D366] outline-none resize-none shadow-inner"
                    />
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 cursor-pointer hover:border-[#D4AF37] transition-colors">[Guest Name]</span>
                    <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 cursor-pointer hover:border-[#D4AF37] transition-colors">[Digital Pass Link]</span>
                    <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 cursor-pointer hover:border-[#D4AF37] transition-colors">[RSVP Link]</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-600">Sending to <strong style={{ color: theme.primary }}>350</strong> guests</span>
                  <button 
                    onClick={handleSendWA}
                    className="px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Blast Message
                  </button>
                </div>
              </div>

              {/* Right Panel: Phone Preview */}
              <div className="w-full md:w-72 bg-gray-50 p-8 flex flex-col items-center justify-center relative">
                <button onClick={() => setShowWATemplate(false)} className="hidden md:flex absolute top-4 right-4 w-8 h-8 rounded-full bg-white items-center justify-center text-gray-500 shadow-sm hover:bg-gray-100 transition-colors">
                  <X className="w-4 h-4" />
                </button>
                
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Preview</h4>
                
                <div className="w-full max-w-[240px] h-[480px] bg-white rounded-[32px] border-8 border-gray-200 shadow-xl overflow-hidden relative flex flex-col">
                  {/* Phone Header */}
                  <div className="bg-[#075E54] px-4 py-3 text-white flex items-center gap-3 shadow-md z-10">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Heart className="w-4 h-4 fill-white text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold leading-tight">Ahmed & Fatima</p>
                      <p className="text-[10px] opacity-80">Business Account</p>
                    </div>
                  </div>
                  
                  {/* Chat Area */}
                  <div className="flex-1 bg-[#E5DDD5] p-3 overflow-y-auto relative">
                    {/* Chat Bubble */}
                    <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[90%] relative mb-2">
                      <p className="text-xs text-gray-800 whitespace-pre-wrap">{waMessage.replace('[Guest Name]', 'Ali Khan').replace('[Digital Pass Link]', 'https://nexus.pk/pass/xyz')}</p>
                      <p className="text-[9px] text-gray-400 text-right mt-1">10:42 AM</p>
                    </div>
                    
                    {/* Link Preview Mock */}
                    {waMessage.includes('[Digital Pass Link]') && (
                      <div className="bg-white rounded-lg p-0 shadow-sm max-w-[90%] overflow-hidden">
                        <div className="h-24 bg-gray-200 relative overflow-hidden">
                           <img src="https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?q=80&w=200" className="w-full h-full object-cover" alt="preview" />
                        </div>
                        <div className="p-2 bg-[#F0F2F5]">
                          <p className="text-xs font-bold text-gray-800 truncate">Your Royal Invitation Pass</p>
                          <p className="text-[10px] text-gray-500">nexus.pk</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
