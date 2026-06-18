"use client"

import React, { useState } from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { MegaFooter } from "@/components/layout/MegaFooter"
import { WatchMemoriesDemo } from "@/components/memories/WatchMemoriesDemo"
import { motion, AnimatePresence } from "framer-motion"
import {
  Camera,
  QrCode,
  Share2,
  Tv,
  Heart,
  Music,
  Mic,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  X,
  PlayCircle
} from "lucide-react"
import Link from "next/link"

export default function MemoriesPortalPage() {
  const [activeTab, setActiveTab] = useState<"upload" | "stream" | "guestbook">("upload")
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const tabs = {
    upload: {
      title: "Scan, Upload, Share",
      tagline: "No mobile application download required.",
      desc: "Guests scan a personalized table QR code, choose photos from their library, and upload directly to your private secure gallery in 2 seconds. Compatible with all iOS and Android devices.",
      icon: QrCode,
      metrics: ["2 Sec Upload Time", "Unlimited Guests", "Full HD Retention"],
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop"
    },
    stream: {
      title: "Live Marquee Slideshows",
      tagline: "Broadcast the laughter live.",
      desc: "Connect your guests' uploads directly to your venue signage screens using Displays OS. Photos appear live on the marquee screens in real-time, under secure admin moderation filters.",
      icon: Tv,
      metrics: ["Real-Time Sync", "Admin Content Filtering", "Multi-Screen Support"],
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200&auto=format&fit=crop"
    },
    guestbook: {
      title: "Rich Audio Guestbooks",
      tagline: "Archiving vocal emotions.",
      desc: "Go beyond text. Guests can record short audio wishes, dholki greetings, and upload selfie memories directly. Relive the ambient wedding noise and laughter decades later.",
      icon: Mic,
      metrics: ["HD Voice Notes", "Sentiment Archives", "Instant Couple Access"],
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
    }
  }

  return (
    <PublicLayout>
      <div className="bg-[#FAF7F2] min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden relative">
        {/* Modals & Toasts */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -20, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -20, x: "-50%" }}
              className="fixed top-24 left-1/2 z-[100] bg-[#0A3B2A] text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold text-sm"
            >
              <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
              {toastMessage}
            </motion.div>
          )}

          {showDemoModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <WatchMemoriesDemo onClose={() => setShowDemoModal(false)} />
            </motion.div>
          )}

          {showCreateModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative"
              >
                <button onClick={() => setShowCreateModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
                
                <h3 className="text-2xl font-black text-slate-900 mb-2">Create Gallery</h3>
                <p className="text-sm text-slate-500 font-medium mb-6">Setup your private event gallery to start receiving guest uploads.</p>
                
                <div className="space-y-4 mb-8">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block">Event Name</label>
                    <input type="text" placeholder="e.g. Ali & Fatima's Walima" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-[#0F5B3E]/20 focus:border-[#0F5B3E] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block">Event Date</label>
                    <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-[#0F5B3E]/20 focus:border-[#0F5B3E] outline-none transition-all" />
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setShowCreateModal(false)
                    showToast("Event Gallery created successfully! Redirecting...")
                  }}
                  className="w-full py-4 bg-[#0F5B3E] text-white font-bold rounded-xl shadow-lg hover:bg-[#0d4d34] transition-colors"
                >
                  Generate Private Gallery
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background blobs */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#0F5B3E]/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Hero Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white border border-[#0F5B3E]/10 text-[#0F5B3E] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              NEXUS Memories OS
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-[#1A1A1A] tracking-tight leading-[1.1] mb-6">
              Preserve Every Smile from <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F5B3E] to-[#D4AF37]">
                Your Special Day
              </span>
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto font-medium">
              Collect guest snapshots, traditional music clips, and audio greetings into a unified, secure portal—ready to beam directly onto venue displays.
            </p>
            
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={() => setShowDemoModal(true)}
                className="px-8 py-4 bg-[#0F5B3E] text-white font-bold rounded-xl shadow-lg hover:bg-[#0d4d34] transition-all flex items-center justify-center gap-2"
              >
                Watch Memories Demo <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="px-8 py-4 bg-white border border-[#E6E2DA] text-[#1A1A1A] font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
              >
                Create Event Gallery
              </button>
            </div>
          </div>

          {/* Interactive Feature Slider */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-[#E6E2DA] shadow-sm mb-24 relative">
            <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-[#E6E2DA] pb-6">
              {[
                { id: "upload", label: "Candid QR Uploads", icon: QrCode },
                { id: "stream", label: "Marquee Live Stream", icon: Tv },
                { id: "guestbook", label: "Audio Guestbooks", icon: Mic },
              ].map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as "upload" | "stream" | "guestbook")}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                      isActive
                        ? "bg-[#0F5B3E] text-white shadow-md"
                        : "text-[#6B7280] hover:text-[#0F5B3E]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
                  {tabs[activeTab].tagline}
                </span>
                <h3 className="text-3xl font-black text-[#1A1A1A]">
                  {tabs[activeTab].title}
                </h3>
                <p className="text-base text-[#6B7280] leading-relaxed font-medium">
                  {tabs[activeTab].desc}
                </p>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  {tabs[activeTab].metrics.map((metric, i) => (
                    <div key={i} className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E6E2DA] text-center">
                      <span className="text-[11px] font-bold text-[#0F5B3E] block">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white shadow-lg group">
                  <img
                    src={tabs[activeTab].image}
                    alt={tabs[activeTab].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>

          {/* Value Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "QR Code Generators",
                desc: "Export beautiful table printouts customized with the couple's monogram and scanning guidelines.",
                icon: QrCode
              },
              {
                title: "Moderated Control Panel",
                desc: "Review and moderate photos client-side before they broadcast onto screens, filter duplicates automatically.",
                icon: Camera
              },
              {
                title: "Traditional Dholki Audio",
                desc: "Capture authentic voices wishing the couple Mubarak, archived for playback on future anniversaries.",
                icon: Mic
              }
            ].map((feat, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-[#E6E2DA] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-[#0F5B3E]/5 flex items-center justify-center mb-6">
                  <feat.icon className="w-6 h-6 text-[#0F5B3E]" />
                </div>
                <h4 className="text-lg font-bold text-[#1A1A1A] mb-3">{feat.title}</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed font-medium">{feat.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
      <MegaFooter />
    </PublicLayout>
  )
}
