"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Smartphone,
  Tv,
  Mic,
  Camera,
  Play,
  Pause,
  Upload,
  CheckCircle,
  Sparkles,
  Volume2,
  Trash2,
  Sliders,
  Bell,
  Heart,
  Music,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Check
} from "lucide-react"

// Types
interface PhotoItem {
  id: string
  url: string
  guestName: string
  timestamp: string
  status: "pending" | "approved" | "rejected"
  caption?: string
}

interface AudioWish {
  id: string
  guestName: string
  relationship: string
  duration: string
  timestamp: string
  status: "pending" | "approved"
  isPlaying?: boolean
}

interface WatchMemoriesDemoProps {
  onClose: () => void
}

const PRELOADED_PHOTOS = [
  {
    id: "p1",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop",
    guestName: "Zainab (Cousin)",
    timestamp: "10:15 PM",
    status: "approved" as const,
    caption: "The beautiful couple! Shadi Mubarak! ❤️"
  },
  {
    id: "p2",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
    guestName: "Hamza",
    timestamp: "10:18 PM",
    status: "approved" as const,
    caption: "Dholki dance squad on fire tonight! 🕺💃"
  },
  {
    id: "p3",
    url: "https://images.unsplash.com/photo-1610030469668-93535c17b6b3?q=80&w=600&auto=format&fit=crop",
    guestName: "Amina (Friend)",
    timestamp: "10:20 PM",
    status: "approved" as const,
    caption: "Mehndi details are so beautiful!"
  }
]

const GALLERY_SOURCE_PHOTOS = [
  { url: "https://images.unsplash.com/photo-1519225495810-7512c696505a?q=80&w=600&auto=format&fit=crop", caption: "Table decorations are stunning! ✨" },
  { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop", caption: "The beautiful bride! Gorgeous dress! 👑" },
  { url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600&auto=format&fit=crop", caption: "Grand sparkler exit! Absolute magic!" },
  { url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop", caption: "Selfie time with the family! Celebrating Zainab & Bilal!" }
]

export function WatchMemoriesDemo({ onClose }: WatchMemoriesDemoProps) {
  // Demo states
  const [guestName, setGuestName] = useState("Ayesha")
  const [guestCaption, setGuestCaption] = useState("")
  const [selectedSourcePhoto, setSelectedSourcePhoto] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  
  // Audio state
  const [isRecording, setIsRecording] = useState(false)
  const [recordTime, setRecordTime] = useState(0)
  
  // Pipeline queues
  const [approvedPhotos, setApprovedPhotos] = useState<PhotoItem[]>(PRELOADED_PHOTOS)
  const [pendingPhotos, setPendingPhotos] = useState<PhotoItem[]>([
    {
      id: "p_init",
      url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600&auto=format&fit=crop",
      guestName: "Babar (Groom's Friend)",
      timestamp: "10:22 PM",
      status: "pending",
      caption: "Mubarak ho Bilal bhai! Sparklers are lit! 🎇"
    }
  ])
  const [autoModerate, setAutoModerate] = useState(false)

  // Audio wishes queue
  const [audioWishes, setAudioWishes] = useState<AudioWish[]>([
    {
      id: "a1",
      guestName: "Dadi Jaan",
      relationship: "Grandmother",
      duration: "0:22",
      timestamp: "9:45 PM",
      status: "approved"
    },
    {
      id: "a2",
      guestName: "Cousin Zain",
      relationship: "Cousin",
      duration: "0:15",
      timestamp: "10:05 PM",
      status: "approved"
    }
  ])
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null)
  const [audioProgress, setAudioProgress] = useState(0)
  
  // Marquee Toast/Notifications
  const [marqueeNotification, setMarqueeNotification] = useState<string | null>(null)

  // Recording counter timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordTime((prev) => prev + 1)
      }, 1000)
    } else {
      setRecordTime(0)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  // Simulated audio player timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (activeAudioId) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setActiveAudioId(null)
            return 0
          }
          return prev + 5
        })
      }, 500)
    } else {
      setAudioProgress(0)
    }
    return () => clearInterval(interval)
  }, [activeAudioId])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s < 10 ? "0" : ""}${s}`
  }

  // Trigger marquee notification
  const triggerNotification = (text: string) => {
    setMarqueeNotification(text)
    setTimeout(() => {
      setMarqueeNotification(null)
    }, 4500)
  }

  // Simulated guest uploads photo
  const handleUploadPhoto = () => {
    if (!guestName.trim()) return
    setIsUploading(true)

    // Simulate 1.5s upload delay
    setTimeout(() => {
      const source = GALLERY_SOURCE_PHOTOS[selectedSourcePhoto]
      const newPhoto: PhotoItem = {
        id: `p_user_${Date.now()}`,
        url: source.url,
        guestName: guestName,
        timestamp: "Just Now",
        status: autoModerate ? "approved" : "pending",
        caption: guestCaption || source.caption
      }

      if (autoModerate) {
        setApprovedPhotos((prev) => [newPhoto, ...prev])
        triggerNotification(`✨ New photo shared by ${guestName}!`)
      } else {
        setPendingPhotos((prev) => [...prev, newPhoto])
      }

      setIsUploading(false)
      setGuestCaption("")
      // Rotate chosen photo to prevent exact duplicate uploads easily
      setSelectedSourcePhoto((prev) => (prev + 1) % GALLERY_SOURCE_PHOTOS.length)
    }, 1500)
  }

  // Simulated guest submits recorded wish
  const handleStopAndUploadVoice = () => {
    setIsRecording(false)
    const durationStr = formatTime(recordTime === 0 ? 8 : recordTime)
    
    const newAudio: AudioWish = {
      id: `a_user_${Date.now()}`,
      guestName: guestName,
      relationship: "Guest",
      duration: durationStr,
      timestamp: "Just Now",
      status: "approved" // direct to list for simplicity in demo
    }

    setAudioWishes((prev) => [newAudio, ...prev])
    triggerNotification(`🎙️ ${guestName} left a voicemail blessing!`)
  }

  // Moderator actions
  const approvePhoto = (id: string) => {
    const photoToApprove = pendingPhotos.find((p) => p.id === id)
    if (photoToApprove) {
      const updated = { ...photoToApprove, status: "approved" as const }
      setApprovedPhotos((prev) => [updated, ...prev])
      setPendingPhotos((prev) => prev.filter((p) => p.id !== id))
      triggerNotification(`✨ Photo by ${updated.guestName} approved for Screen!`)
    }
  }

  const rejectPhoto = (id: string) => {
    setPendingPhotos((prev) => prev.filter((p) => p.id !== id))
  }

  // Audio Play toggle
  const togglePlayAudio = (id: string) => {
    if (activeAudioId === id) {
      setActiveAudioId(null)
    } else {
      setActiveAudioId(id)
      setAudioProgress(0)
    }
  }

  return (
    <div className="w-full max-w-7xl bg-[#12141C] rounded-[2rem] border border-slate-800 text-white flex flex-col overflow-hidden max-h-[90vh] md:max-h-[85vh] shadow-2xl relative">
      
      {/* Header bar */}
      <div className="px-8 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#25D366] animate-pulse" />
          <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
            Nexus Memories <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest px-2 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20">Interactive Demo</span>
          </h2>
        </div>
        <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-full hover:scale-105 transition-all">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Simulation Viewport */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8">
        
        {/* Instructions/Introduction bar */}
        <div className="bg-[#0F5B3E]/10 border border-[#0F5B3E]/20 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-[#D4AF37] shrink-0" />
            <p className="text-xs lg:text-sm font-medium text-slate-300">
              <strong className="text-white">How to test:</strong> Type your name in the Guest App (left), pick an image, and click upload. See it arrive in the Moderation Queue (middle) and finally broadcast live on the Venue Marquee screen (right)!
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <span className="text-xs font-bold text-slate-400">Auto-Approve Screen Feed:</span>
            <button 
              onClick={() => setAutoModerate(!autoModerate)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${autoModerate ? "bg-[#0F5B3E]" : "bg-slate-700"}`}
            >
              <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${autoModerate ? "translate-x-6" : ""}`} />
            </button>
          </div>
        </div>

        {/* 3 Pane Simulator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* COLUMN 1: Simulated Guest Mobile View */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-[#D4AF37]" /> Step 1: Guest Web App
            </span>
            
            {/* Phone Body container */}
            <div className="w-full max-w-[320px] aspect-[9/19] rounded-[2.5rem] border-8 border-slate-700 bg-[#FAF7F2] text-slate-900 overflow-hidden shadow-2xl relative flex flex-col">
              
              {/* iPhone top notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-700 rounded-b-2xl z-20 flex items-center justify-center">
                <span className="w-12 h-1 bg-black/40 rounded-full" />
              </div>

              {/* Mock Status Bar */}
              <div className="px-6 pt-7 pb-2 flex justify-between items-center text-[10px] font-bold text-slate-500 select-none z-10 bg-white/70 backdrop-blur-sm">
                <span>10:24 PM</span>
                <div className="flex items-center gap-1.5">
                  <span>5G</span>
                  <div className="w-5 h-2.5 border border-slate-400 rounded-sm p-0.5 flex items-center">
                    <div className="w-full h-full bg-slate-500 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Mobile Web App Scrollable Page */}
              <div className="flex-1 overflow-y-auto px-4 pb-6 pt-2 space-y-4">
                <div className="text-center py-2 border-b border-[#0F5B3E]/10">
                  <span className="text-[10px] font-extrabold text-[#D4AF37] tracking-widest block uppercase">Welcome Guest</span>
                  <h3 className="text-sm font-black text-slate-900">Ali & Fatima's Wedding</h3>
                  <p className="text-[9px] font-bold text-slate-500">Scan & Share Your Highlights</p>
                </div>

                {/* Name Input */}
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-600 block">Your Name</label>
                  <input 
                    type="text" 
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="E.g. Ayesha" 
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none font-bold text-slate-900 focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E]/20"
                  />
                </div>

                {/* Selection of photos to upload */}
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-600 block">Select Photo to Upload</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {GALLERY_SOURCE_PHOTOS.map((photo, i) => (
                      <button 
                        key={i}
                        onClick={() => setSelectedSourcePhoto(i)}
                        className={`aspect-[4/3] rounded-lg overflow-hidden border-2 relative transition-all ${selectedSourcePhoto === i ? "border-[#0F5B3E] ring-2 ring-[#0F5B3E]/20 scale-95" : "border-transparent opacity-75 hover:opacity-100"}`}
                      >
                        <img src={photo.url} className="w-full h-full object-cover" alt="" />
                        {selectedSourcePhoto === i && (
                          <div className="absolute inset-0 bg-[#0F5B3E]/10 flex items-center justify-center">
                            <span className="p-0.5 rounded-full bg-[#0F5B3E] text-white">
                              <Check className="w-3 h-3" />
                            </span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Caption Input */}
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-600 block">Caption / Wishes (Optional)</label>
                  <input 
                    type="text" 
                    value={guestCaption}
                    onChange={(e) => setGuestCaption(e.target.value)}
                    placeholder="Write a sweet message..." 
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none font-medium text-slate-800"
                  />
                </div>

                {/* Send Button */}
                <button
                  disabled={isUploading || isRecording || !guestName.trim()}
                  onClick={handleUploadPhoto}
                  className="w-full py-2.5 bg-[#0F5B3E] hover:bg-[#0d4d34] disabled:bg-slate-300 text-white font-bold text-xs rounded-lg shadow-md transition-colors flex items-center justify-center gap-1.5"
                >
                  {isUploading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading Live...
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      Send to Wedding Screen
                    </>
                  )}
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-2 text-[8px] font-bold uppercase text-slate-400">OR</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                {/* Audio Guestbook section */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center space-y-2">
                  <span className="text-[9px] font-extrabold text-[#0F5B3E] uppercase tracking-wider block">🎙️ Audio Guestbook Wish</span>
                  
                  {isRecording ? (
                    <div className="space-y-2 py-1">
                      <div className="flex justify-center items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                        <span className="text-xs font-bold text-slate-700">Recording... {formatTime(recordTime)}</span>
                      </div>
                      
                      {/* Audio visualizer mockup */}
                      <div className="flex justify-center items-center gap-0.5 h-6">
                        {[...Array(10)].map((_, i) => (
                          <motion.span 
                            key={i} 
                            animate={{ height: [4, Math.random() * 20 + 4, 4] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.05 }}
                            className="w-1 bg-red-500 rounded-full"
                          />
                        ))}
                      </div>

                      <button 
                        onClick={handleStopAndUploadVoice}
                        className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] rounded-lg shadow transition-colors mx-auto block"
                      >
                        Stop & Submit Wish
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsRecording(true)}
                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Mic className="w-3.5 h-3.5 text-[#0F5B3E]" />
                      Record Vocal Mubarak Wish
                    </button>
                  )}
                </div>

              </div>

              {/* iPhone Home Indicator bar */}
              <div className="py-2.5 flex justify-center bg-[#FAF7F2]">
                <div className="w-24 h-1 bg-black/20 rounded-full" />
              </div>
            </div>
          </div>

          {/* COLUMN 2: Simulated Moderation Console */}
          <div className="lg:col-span-3 flex flex-col items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" /> Step 2: Moderation Dashboard
            </span>

            <div className="w-full bg-slate-900 rounded-3xl border border-slate-800 p-4 flex flex-col h-[400px] md:h-full lg:h-[480px]">
              {/* Dashboard Headers */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div>
                  <h4 className="text-xs font-extrabold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#0F5B3E]" /> Filter Queue
                  </h4>
                  <p className="text-[10px] text-slate-400">Host Approval Dashboard</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300">
                  {pendingPhotos.length} Pending
                </span>
              </div>

              {/* Moderation List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                <AnimatePresence initial={false}>
                  {pendingPhotos.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mb-2">
                        <CheckCircle className="w-5 h-5 text-slate-500" />
                      </div>
                      <p className="text-[11px] font-extrabold text-slate-300">Queue is Clear!</p>
                      <p className="text-[9px] text-slate-500 mt-1 max-w-[150px]">
                        Any new guest uploads will pop up here for approval. Try uploading one on the left phone.
                      </p>
                    </div>
                  ) : (
                    pendingPhotos.map((photo) => (
                      <motion.div 
                        key={photo.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="bg-slate-800/60 border border-slate-800 rounded-xl p-2.5 space-y-2 flex flex-col justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                            <img src={photo.url} className="w-full h-full object-cover" alt="" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-bold text-white truncate">{photo.guestName}</p>
                            <p className="text-[9px] text-slate-400 truncate">{photo.caption || "No message"}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-slate-800/40">
                          <button
                            onClick={() => rejectPhoto(photo.id)}
                            className="py-1 bg-red-950/40 hover:bg-red-900/40 border border-red-900/30 text-red-400 rounded-lg text-[9px] font-bold transition-colors flex items-center justify-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Decline
                          </button>
                          <button
                            onClick={() => approvePhoto(photo.id)}
                            className="py-1 bg-[#0F5B3E]/20 hover:bg-[#0F5B3E]/40 border border-[#0F5B3E]/30 text-[#25D366] rounded-lg text-[9px] font-bold transition-colors flex items-center justify-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" /> Approve
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Status footer */}
              <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center text-[9px] font-bold text-slate-400">
                <span className="flex items-center gap-1 text-[#25D366]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" /> Live sync active
                </span>
                <span>Active: 1 Event</span>
              </div>

            </div>
          </div>

          {/* COLUMN 3: Simulated Venue Marquee Screen */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
              <Tv className="w-3.5 h-3.5 text-[#D4AF37]" /> Step 3: Live Wedding Screen
            </span>

            {/* Marquee TV Frame */}
            <div className="w-full bg-black rounded-3xl border border-slate-700 p-3 shadow-2xl relative flex flex-col h-[400px] md:h-full lg:h-[480px]">
              
              {/* Grand ballroom projection screen overlay/wood effect */}
              <div className="flex-1 bg-slate-950 rounded-2xl overflow-hidden relative flex flex-col p-4 border border-slate-900 select-none">
                
                {/* Simulated wedding branding header */}
                <div className="text-center mb-4 z-10">
                  <span className="inline-block px-3 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[8px] font-extrabold tracking-widest uppercase">
                    Fatima & Bilal's Reception
                  </span>
                  <h3 className="text-xs lg:text-sm font-black text-slate-200 mt-1 flex items-center justify-center gap-1">
                    <Heart className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" /> Share your snaps live! Scan the Table QR
                  </h3>
                </div>

                {/* Grid view of approved photos scrolling / updating */}
                <div className="flex-1 overflow-y-auto space-y-3 relative grid grid-cols-2 gap-3 pb-8 pr-1 scrollbar-none">
                  <AnimatePresence initial={false}>
                    {approvedPhotos.map((photo, index) => (
                      <motion.div 
                        key={photo.id}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg p-2 flex flex-col relative group"
                      >
                        <div className="aspect-[4/3] rounded-lg overflow-hidden relative">
                          <img src={photo.url} className="w-full h-full object-cover" alt="" />
                          <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[8px] font-bold text-slate-200 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                            {photo.guestName}
                          </div>
                        </div>
                        {photo.caption && (
                          <p className="text-[9px] font-semibold text-slate-300 mt-1.5 line-clamp-2 italic">
                            "{photo.caption}"
                          </p>
                        )}
                        <span className="text-[7px] text-slate-500 font-bold self-end mt-1">{photo.timestamp}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Slide-in Marquee screen banner toast notifications */}
                <AnimatePresence>
                  {marqueeNotification && (
                    <motion.div 
                      initial={{ opacity: 0, y: 40, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, x: "-50%" }}
                      exit={{ opacity: 0, y: -20, x: "-50%" }}
                      className="absolute bottom-6 left-1/2 z-20 bg-gradient-to-r from-[#0F5B3E] to-[#D4AF37] text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 border border-white/20 text-[10px] font-bold whitespace-nowrap"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
                      {marqueeNotification}
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
              
              {/* Stand bases/Mock projector lines */}
              <div className="text-center py-1.5 text-[8px] font-extrabold tracking-widest text-slate-600">
                PROJECTOR FEED SCREEN 01 (STAGELIGHT FILTER)
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 4: Audio Guestbook Dashboard Mockup */}
        <div className="border-t border-slate-800 pt-8">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Mic className="w-5 h-5 text-[#D4AF37]" /> Vocal Memories (Audio Guestbook Player)
                </h3>
                <p className="text-xs text-slate-400">Play sweet voice calls and wedding greetings captured from guest phones.</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 flex items-center gap-2 text-xs font-bold text-slate-300">
                <Volume2 className="w-4 h-4 text-[#0F5B3E]" /> Simulated Playback Mode
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {audioWishes.map((wish) => {
                const isPlaying = activeAudioId === wish.id
                return (
                  <div 
                    key={wish.id}
                    className={`bg-slate-900/60 border rounded-2xl p-4 flex items-center justify-between gap-4 transition-all ${isPlaying ? "border-[#0F5B3E] shadow-[#0F5B3E]/5 shadow-lg" : "border-slate-800"}`}
                  >
                    <button 
                      onClick={() => togglePlayAudio(wish.id)}
                      className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-105 ${isPlaying ? "bg-[#0F5B3E] text-white" : "bg-slate-800 text-slate-200"}`}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current translate-x-0.5" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <h4 className="text-sm font-bold text-white truncate">{wish.guestName}</h4>
                        <span className="text-[9px] text-slate-400 font-bold">({wish.relationship})</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Left a wish • {wish.timestamp}</p>
                      
                      {/* Audio visualizer progress bar or dynamic visualizer */}
                      {isPlaying ? (
                        <div className="flex items-center gap-1 h-5 mt-2">
                          {[...Array(14)].map((_, i) => (
                            <motion.span 
                              key={i} 
                              animate={{ height: [4, Math.random() * 16 + 4, 4] }}
                              transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.03 }}
                              className="w-1 bg-[#0F5B3E] rounded-full"
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 h-5 mt-2">
                          {[...Array(14)].map((_, i) => (
                            <span 
                              key={i} 
                              className="w-1 h-1.5 bg-slate-800 rounded-full"
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    <span className="text-xs font-bold text-slate-500">{isPlaying ? `${Math.floor(audioProgress)}%` : wish.duration}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Footer / Interactive actions */}
      <div className="px-8 py-5 border-t border-slate-800 bg-slate-900/60 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs font-bold text-slate-400">
          Nexus Memories OS operates over localized low-latency websockets for instant venue updates.
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 font-bold text-xs rounded-xl transition-colors"
          >
            Exit Simulation
          </button>
          <button 
            onClick={() => {
              setAutoModerate(true)
              triggerNotification("✨ Auto-moderate turned ON! Upload away!")
            }}
            className="px-6 py-2.5 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5"
          >
            Enable Quick Live Uploads <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  )
}
