"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Heart, Play, Pause, Volume2, Sparkles, CheckCircle2, X, Check,
  MapPin, Calendar, Smartphone, Info, Award
} from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

// Complete guest page translations dictionary
const TRANSLATIONS = {
  en: {
    waxPrompt: "Click Wax Seal to Open",
    tapToOpen: "TAP WAX SEAL TO DECRYPT INVITATION",
    monogram: "NEXUS",
    initials: "NEXUS",
    guestLabel: "Dearest Guest",
    rsvpTitle: "Will you grace us with your presence?",
    rsvpYes: "Yes, I will attend",
    rsvpNo: "Regretfully Decline",
    rsvpAcceptFeedback: "Mubarak! Your RSVP has been registered and synchronized to the Host's CRM Guest List.",
    rsvpDeclineFeedback: "Thank you for letting us know. You will be missed! (CRM OS Synced)",
    melodyLabel: "Melody Track:",
    voiceLabel: "AI Announcement:",
    closePreview: "Close Invitation",
    eventIntro: "Together with their families, we request the honor of your presence at our",
    conceptTitle: "AI-Envisioned Event Aesthetics",
    changeRsvp: "Change RSVP Response",
    poweredBy: "Powered by NEXUS Immersive Suite",
    viewMap: "View Venue Map",
    scheduleHeader: "Celebration Schedule",
    defaultMessage: "You are cordially invited to grace our special day with your presence. Your arrival is our greatest blessing."
  },
  ru: {
    waxPrompt: "Kholne Ke Liye Wax Seal Dabain",
    tapToOpen: "INVITATION DEKHNE KE LIYE WAX SEAL DABAIN",
    monogram: "NEXUS",
    initials: "NEXUS",
    guestLabel: "Moazzaz Mehmaan",
    rsvpTitle: "Kya aap humari khushi me shareek hon ge?",
    rsvpYes: "Ji Haan, Zaroor Aao Ga",
    rsvpNo: "Hazir Nahi Ho Sako Ga",
    rsvpAcceptFeedback: "Mubarak Ho! Aap ka response Host ke CRM OS Guest List me update ho chuka hai.",
    rsvpDeclineFeedback: "Paigham bhejne ka shukriya. Hum aap ko bohot miss krain ge! (CRM OS Synced)",
    melodyLabel: "Melody Dhun:",
    voiceLabel: "Vocal Toast:",
    closePreview: "Close Invitation",
    eventIntro: "Apne khandan ke sath, hum aap ko dil se shirkat ki dawat dete hain is taqreeb par:",
    conceptTitle: "AI Decor Aesthetics Plan",
    changeRsvp: "RSVP Change Krain",
    poweredBy: "Powered by NEXUS Immersive Suite",
    viewMap: "Map Par Jagah Dekhain",
    scheduleHeader: "Taqreeb Schedule",
    defaultMessage: "Aap ko humari is khushi ke mauqe par dil se dawat di jati hai. Aap ki tashreef aawari humare liye baais-e-musarrat hogi."
  }
}

// Equalizer wave heights
const WAVE_BARS = [3, 6, 8, 4, 9, 5, 7, 3, 6, 4]

// Category Specific Tones and Presets Map
const CATEGORIES_TONES = {
  wedding: {
    toneTitle: "Royal & Poetic",
    fontClass: "font-serif",
    introTextEn: "Together with their families, we invite you to celebrate the wedding ceremony of",
    introTextRu: "Apne khandan ke sath, hum aap ko dil ki gehraiyon se shadi ki taqreeb me dawat dete hain:",
    bgUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200", // Luxury Wedding Venue
    particle: "❀" // Roses
  },
  corporate: {
    toneTitle: "Professional & Precise",
    fontClass: "font-sans",
    introTextEn: "You are cordially invited to join our strategic executives summit and network panel of",
    introTextRu: "Aap ko corporate executive network summit aur briefing panel me shirkat ki dawat hai:",
    bgUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200", // Tech Conference Scene
    particle: "✦" // Stars
  },
  convocation: {
    toneTitle: "Inspiring & Celebratory",
    fontClass: "font-serif",
    introTextEn: "Celebrate academic excellence and join the honors degree presentation ceremony of",
    introTextRu: "Academic kamyabi ka jashan manain aur graduation honours degrees distribution me shirkat krain:",
    bgUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200", // Graduation Hall
    particle: "★" // Graduation Star
  },
  festival: {
    toneTitle: "Vibrant & Festive",
    fontClass: "font-mono",
    introTextEn: "Get ready to witness the grand cultural art fest, bazaar, and closing live concert of",
    introTextRu: "Tashreef laein shandar cultural art fest, food bazaar, aur live performance concert me:",
    bgUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200", // Live concert light show
    particle: "✿" // Marigolds
  }
}

// 8 Event Display names
const EVENT_DISPLAY = {
  wedding: { en: "Wedding Ceremony", ru: "Wedding / Shadi" },
  corporate: { en: "Corporate Summit", ru: "Corporate Summit / Company" },
  convocation: { en: "Convocation Ceremony", ru: "Convocation / Degree" },
  festival: { en: "Cultural Art Festival", ru: "Cultural Festival / Mela" }
}

export function DigitalInvite() {
  const searchParams = useSearchParams()

  // Dynamic state query parsing
  const rawName = searchParams.get("name") || ""
  const rawEvent = searchParams.get("event") || "wedding"
  const rawTheme = searchParams.get("theme") || "emerald"
  const rawMusic = searchParams.get("music") || "shehnai"
  const rawVoice = searchParams.get("voice") || "royal"
  const rawMsg = searchParams.get("msg") || ""
  const rawPrompt = searchParams.get("prompt") || ""
  const rawDaysParam = searchParams.get("days") || ""

  // Local Language State
  const { isRomanUrdu, setIsRomanUrdu } = useLanguage()
  const t = isRomanUrdu ? TRANSLATIONS.ru : TRANSLATIONS.en

  // Immersive Playback & Modal states
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVoicePlaying, setIsVoicePlaying] = useState(false)
  const [rsvpState, setRsvpState] = useState<"none" | "yes" | "no">("none")

  // Multi-day timeline parsing logic
  const [timelineDays, setTimelineDays] = useState<{ id: number; title: string; date: string; time: string; venue: string; mapUrl: string }[]>([])

  // Parse days from query or fallback to defaults
  useEffect(() => {
    if (rawDaysParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(rawDaysParam))
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTimelineDays(parsed)
          return
        }
      } catch (e) {
        console.error("Failed to parse event days parameters:", e)
      }
    }

    // Default Multi-day fallback matching the event category
    if (rawEvent === "wedding") {
      setTimelineDays([
        { id: 1, title: "Day 1 (Mehndi Ceremony)", date: "Oct 14, 2026", time: "7:00 PM", venue: "The Crystal Pavilion, Islamabad", mapUrl: "https://maps.google.com" },
        { id: 2, title: "Day 2 (Barat Feast)", date: "Oct 15, 2026", time: "7:30 PM", venue: "The Royal Ballroom, Islamabad", mapUrl: "https://maps.google.com" },
        { id: 3, title: "Day 3 (Walima Reception)", date: "Oct 16, 2026", time: "8:00 PM", venue: "The Rosewood Botanicals, Islamabad", mapUrl: "https://maps.google.com" }
      ])
    } else if (rawEvent === "corporate") {
      setTimelineDays([
        { id: 1, title: "Day 1 (Tech Keynotes)", date: "Nov 10, 2026", time: "9:00 AM", venue: "Marriott Grand Ballroom, Islamabad", mapUrl: "https://maps.google.com" },
        { id: 2, title: "Day 2 (VIP Hackathon)", date: "Nov 11, 2026", time: "10:00 AM", venue: "Nexus Tech Sandbox, Rawalpindi", mapUrl: "https://maps.google.com" }
      ])
    } else if (rawEvent === "convocation") {
      setTimelineDays([
        { id: 1, title: "Graduation Ceremony", date: "Dec 05, 2026", time: "10:30 AM", venue: "NUST Convocation Hall, Islamabad", mapUrl: "https://maps.google.com" }
      ])
    } else if (rawEvent === "festival") {
      setTimelineDays([
        { id: 1, title: "Day 1 (Opening Concert)", date: "Feb 20, 2026", time: "6:00 PM", venue: "F-9 Park Arena, Islamabad", mapUrl: "https://maps.google.com" },
        { id: 2, title: "Day 2 (Food & Art Bazaar)", date: "Feb 21, 2026", time: "2:00 PM", venue: "F-9 Park Plaza, Islamabad", mapUrl: "https://maps.google.com" }
      ])
    }
  }, [rawDaysParam, rawEvent])

  // Particles
  const [particles, setParticles] = useState<{ id: number; left: number; delay: number; duration: number }[]>([])

  useEffect(() => {
    if (isEnvelopeOpened) {
      const list = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4
      }))
      setParticles(list)
    } else {
      setParticles([])
    }
  }, [isEnvelopeOpened])

  // Category tone and theme presets
  const activeToneObj = CATEGORIES_TONES[rawEvent as keyof typeof CATEGORIES_TONES] || CATEGORIES_TONES.wedding
  
  const getThemeStyles = (style: string) => {
    switch (style) {
      case "gulabi":
        return {
          cardBg: "bg-gradient-to-br from-rose-950 via-[#701a35] to-rose-900",
          borderColor: "border-amber-400/40",
          accentText: "text-amber-400",
          pillBg: "bg-rose-500/10 text-rose-300 border-rose-400/20",
          envelopeBg: "bg-[#7c1d3c]",
          waxBg: "bg-[#D97706] shadow-[#D97706]/40",
          themeName: isRomanUrdu ? "Gulabi Shehnai" : "Gulabi Shehnai"
        }
      case "midnight":
        return {
          cardBg: "bg-gradient-to-br from-indigo-950 via-[#1b1c4b] to-slate-950",
          borderColor: "border-slate-300/40",
          accentText: "text-indigo-200",
          pillBg: "bg-indigo-500/10 text-indigo-300 border-indigo-400/20",
          envelopeBg: "bg-[#1b1d40]",
          waxBg: "bg-[#475569] shadow-[#475569]/40",
          themeName: isRomanUrdu ? "Midnight Sitar" : "Midnight Sitar"
        }
      case "saffron":
        return {
          cardBg: "bg-gradient-to-br from-amber-950 via-[#633c02] to-amber-900",
          borderColor: "border-amber-400/60",
          accentText: "text-amber-400",
          pillBg: "bg-amber-500/10 text-amber-200 border-amber-400/30",
          envelopeBg: "bg-[#4c2d03]",
          waxBg: "bg-[#EA580C] shadow-[#EA580C]/40",
          themeName: isRomanUrdu ? "Shahi Saffron" : "Royal Saffron"
        }
      case "emerald":
      default:
        return {
          cardBg: "bg-gradient-to-br from-emerald-950 via-[#0a3a28] to-emerald-900",
          borderColor: "border-[#C9A227]/40",
          accentText: "text-[#C9A227]",
          pillBg: "bg-[#C9A227]/10 text-[#C9A227] border-[#C9A227]/20",
          envelopeBg: "bg-[#093524]",
          waxBg: "bg-[#B45309] shadow-[#B45309]/40",
          themeName: isRomanUrdu ? "Shahi Emerald" : "Royal Emerald"
        }
    }
  }

  const themeConfig = getThemeStyles(rawTheme)
  const eventName = EVENT_DISPLAY[rawEvent as keyof typeof EVENT_DISPLAY] || EVENT_DISPLAY.wedding

  const trackDisplayMap = {
    shehnai: isRomanUrdu ? "Traditional Shehnai Dhun" : "Traditional Shehnai",
    rabab: isRomanUrdu ? "Soft Rabab Tune" : "Acoustic Rabab",
    flute: isRomanUrdu ? "Sweet Flute Melody" : "Romantic Flute",
    qawwali: isRomanUrdu ? "Sufi Qawwali Beat" : "Sufi Qawwali Beat",
    instrumental: isRomanUrdu ? "Modern Instrumental Sitar" : "Modern Sitar Instrumental"
  }

  const getVoiceToastText = (tone: string) => {
    switch (tone) {
      case "joyful":
        return isRomanUrdu 
          ? "Suno suno! Khushiyon ki dhol baj chuki hai, shadi ka mela saj chuka hai, aap ki dawat lazmi hai!" 
          : "Hear ye! The dhol beats are calling and the celebratory drums are roaring. Your attendance is mandatory!"
      case "poetic":
        return isRomanUrdu 
          ? "Zikr-e-shaadi par bulaya hai aap ko, apni mehfil ka chiragh banaya hai aap ko..." 
          : "Under the canopy of stars, we invite you to be the shining light of our special night..."
      case "royal":
      default:
        return isRomanUrdu 
          ? "Assalam-o-Alaikum, moazzaz mehmaan. Hum aap ko humari shadi me shirkat ki dil se dawat dete hain." 
          : "Assalam-o-Alaikum, honored guest. We cordially invite you to celebrate this royal occasion with us."
    }
  }

  // RSVP Trigger updates B2B CRM Guest List in Local Storage
  const handleRsvpStatusSubmit = (status: "yes" | "no") => {
    setRsvpState(status)

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nexus_crm_guest_list")
      let guestList = []
      if (stored) {
        try {
          guestList = JSON.parse(stored)
        } catch (e) {
          console.error(e)
        }
      }

      // Check if guest already exists
      const visitorName = rawName || "Online Guest"
      const existingIdx = guestList.findIndex((g: any) => g.name.toLowerCase() === visitorName.toLowerCase())

      const statusString = status === "yes" ? "Attending" : "Declined"

      if (existingIdx >= 0) {
        guestList[existingIdx].status = statusString
        guestList[existingIdx].count = 1
      } else {
        guestList.push({
          id: Date.now(),
          name: visitorName,
          count: 1,
          side: rawEvent === "wedding" ? "Groom" : "Invite Link",
          status: statusString
        })
      }

      localStorage.setItem("nexus_crm_guest_list", JSON.stringify(guestList))
    }
  }

  const defaultMsgText = isRomanUrdu ? TRANSLATIONS.ru.defaultMessage : TRANSLATIONS.en.defaultMessage

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans select-none">
      
      {/* Immersive Theme Background image behind */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-102 blur-sm transition-all duration-700" 
          style={{ backgroundImage: `url(${activeToneObj.bgUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      {/* Local Language Switcher Toggle Pill */}
      <div className="absolute top-4 right-4 z-[110]">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-1 rounded-xl flex items-center gap-1 shadow-sm text-xs font-bold text-white">
          <button
            onClick={() => setIsRomanUrdu(false)}
            className={`px-3 py-1.5 rounded-lg transition-all ${!isRomanUrdu ? "bg-amber-500 text-slate-950" : "text-white/60 hover:text-white"}`}
          >
            English
          </button>
          <button
            onClick={() => setIsRomanUrdu(true)}
            className={`px-3 py-1.5 rounded-lg transition-all ${isRomanUrdu ? "bg-amber-500 text-slate-950" : "text-white/60 hover:text-white"}`}
          >
            Roman Urdu
          </button>
        </div>
      </div>

      {/* Floating particles falling */}
      {isEnvelopeOpened && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute text-amber-200/50 text-xl pointer-events-none"
              style={{ left: `${p.left}%` }}
              initial={{ y: -50, rotate: 0, opacity: 0 }}
              animate={{ 
                y: "105vh", 
                rotate: 360, 
                opacity: [0, 1, 1, 0] 
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {activeToneObj.particle}
            </motion.div>
          ))}
        </div>
      )}

      {/* Invitation Wrapper */}
      <div className="w-full max-w-lg relative z-10 py-6">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: CLOSED ENVELOPE EXT SURFACE */}
          {!isEnvelopeOpened ? (
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={`w-full ${themeConfig.envelopeBg} border-2 ${themeConfig.borderColor} rounded-3xl p-8 min-h-[490px] flex flex-col justify-between items-center text-center shadow-2xl relative overflow-hidden text-white`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/10 pointer-events-none" />
              
              <div className="space-y-2 mt-4">
                <span className="text-[9px] tracking-widest font-extrabold text-white/40 uppercase block">
                  NEXUS IMMERSIVE SUITE • {activeToneObj.toneTitle}
                </span>
                <h2 className="font-serif italic text-2.5xl text-white">
                  {isRomanUrdu ? "Dawat-e-Taqreeb" : "The Invitation Ceremony"}
                </h2>
                <span className="text-[10px] bg-white/10 px-3 py-1 rounded-full font-bold uppercase tracking-wider text-amber-200 mt-2 block w-max mx-auto border border-white/5">
                  {isRomanUrdu ? eventName.ru : eventName.en}
                </span>
              </div>

              {/* Pulsing wax seal */}
              <div className="flex flex-col items-center gap-3 my-6">
                <motion.button
                  onClick={() => {
                    setIsEnvelopeOpened(true)
                    setIsPlaying(true)
                    setIsVoicePlaying(true)
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className={`w-24 h-24 rounded-full ${themeConfig.waxBg} border-4 border-amber-300/40 flex items-center justify-center relative cursor-pointer outline-none shadow-lg`}
                >
                  <span className="text-white font-serif font-black text-2xl tracking-tighter">
                    {themeConfig.themeName.substring(0, 1)}
                  </span>
                  <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-25" />
                  <div className="absolute -bottom-6 w-4 h-12 bg-red-800/80 skew-x-12 -z-10 rounded-b" />
                  <div className="absolute -bottom-6 w-4 h-12 bg-red-800/80 -skew-x-12 -z-10 rounded-b ml-4" />
                </motion.button>
                
                <span className="text-[10px] tracking-widest font-extrabold text-amber-200/90 uppercase mt-4 block">
                  {t.tapToOpen}
                </span>
              </div>

              {/* Recipient details */}
              <div className="w-full border-t border-white/10 pt-4 mt-2">
                <span className="text-[9px] uppercase tracking-widest font-bold text-white/40 block">
                  {t.guestLabel}
                </span>
                <span className="font-bold text-xl text-white">
                  {rawName ? rawName : isRomanUrdu ? "Moazzaz Mehmaan" : "Honored Guest"}
                </span>
              </div>
            </motion.div>
          ) : (
            
            // STEP 2: OPENED SCROLL PAGE WITH DAYS SCHEDULE & CRM RSVP SYNCS
            <motion.div
              key="open-scroll"
              initial={{ opacity: 0, scale: 0.92, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 100 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`w-full ${themeConfig.cardBg} border-4 ${themeConfig.borderColor} rounded-3xl p-6 md:p-8 min-h-[580px] flex flex-col justify-between shadow-2xl relative text-white text-center font-sans overflow-hidden`}
            >
              <div className="absolute top-3 inset-x-3 bottom-3 border border-white/10 rounded-2xl pointer-events-none" />
              
              {/* Monogram crest */}
              <div className="space-y-4 pt-2">
                <div className={`w-12 h-12 rounded-full border-2 ${themeConfig.borderColor} mx-auto flex items-center justify-center bg-white/5`}>
                  <span className="font-serif italic font-extrabold text-[#C9A227]">
                    {t.initials}
                  </span>
                </div>
                
                <p className={`${activeToneObj.fontClass} italic text-xs text-white/70 max-w-sm mx-auto leading-relaxed px-4`}>
                  "{isRomanUrdu ? activeToneObj.introTextRu : activeToneObj.introTextEn}"
                </p>
              </div>

              {/* Dynamic AI aesthetic decor prompt */}
              {rawPrompt && (
                <div className="bg-black/30 border border-white/10 rounded-2xl p-3 my-2 text-left space-y-1 font-sans">
                  <span className="text-[8px] uppercase font-bold text-purple-300 tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-purple-300" />
                    {t.conceptTitle}
                  </span>
                  <p className="text-[10px] text-white/90 leading-tight italic">
                    "{rawPrompt}"
                  </p>
                </div>
              )}

              {/* Calligraphy message card */}
              <div className="my-2 space-y-3 px-2">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-white/50 block">
                    {t.guestLabel}
                  </span>
                  <span className="font-bold text-lg block text-white uppercase tracking-wider">
                    {rawName ? rawName : isRomanUrdu ? "Moazzaz Mehmaan" : "Honored Guest"}
                  </span>
                  <p className="text-xs leading-relaxed text-white/80 italic font-serif">
                    "{rawMsg ? rawMsg : defaultMsgText}"
                  </p>
                </div>
              </div>

              {/* MULTI-DAY ITINERARY TIMELINE DISPLAY */}
              <div className="space-y-2 max-h-44 overflow-y-auto pr-1 my-2 bg-black/20 border border-white/10 p-3.5 rounded-2xl text-left">
                <span className="text-[9px] uppercase font-bold text-amber-300 tracking-wider block mb-2 border-b border-white/10 pb-1 flex items-center gap-1.5 font-sans">
                  <Calendar className="w-3.5 h-3.5" />
                  {t.scheduleHeader}
                </span>

                <div className="space-y-3 text-[11px] font-sans">
                  {timelineDays.map((day, idx) => (
                    <div key={day.id || idx} className="relative pl-4 border-l border-white/20 pb-2 last:pb-0">
                      {/* Timeline Dot */}
                      <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-[#C9A227] border-2 border-slate-900" />
                      
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h5 className="font-extrabold text-white leading-tight">
                            {day.title || `Day ${idx + 1}`}
                          </h5>
                          <span className="text-[9px] text-[#C9A227] font-bold block mt-0.5 leading-none">
                            {day.date} • {day.time}
                          </span>
                          <span className="text-[10px] text-white/80 block mt-1 leading-snug">
                            📍 {day.venue || "Venue Location"}
                          </span>
                        </div>

                        {day.mapUrl && (
                          <a
                            href={day.mapUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 transition-colors flex items-center justify-center"
                            title={t.viewMap}
                          >
                            <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DUAL AUDIO SUB-PANEL: Voice Over + Music */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-3 space-y-2.5 my-2">
                
                {/* Voice announce */}
                <div className="flex items-start gap-2.5 text-left border-b border-white/10 pb-2">
                  <button
                    onClick={() => setIsVoicePlaying(!isVoicePlaying)}
                    className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border transition-all ${
                      isVoicePlaying ? "bg-[#C9A227] border-[#C9A227] text-slate-900" : "bg-white/5 border-white/10 text-white"
                    }`}
                  >
                    {isVoicePlaying ? (
                      <Pause className="w-3 h-3 text-slate-900 fill-slate-900" />
                    ) : (
                      <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                    )}
                  </button>
                  
                  <div className="leading-tight font-sans">
                    <span className="text-[8px] text-white/50 uppercase font-bold tracking-widest block">
                      {t.voiceLabel} ({rawVoice})
                    </span>
                    <span className="text-[10px] italic text-amber-200 block leading-tight mt-0.5">
                      "{getVoiceToastText(rawVoice)}"
                    </span>
                  </div>
                </div>

                {/* Music controls */}
                <div className="flex items-center justify-between pt-1">
                  <div className="text-left flex items-center gap-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/20 border border-white/10 flex items-center justify-center"
                    >
                      {isPlaying ? (
                        <Pause className="w-3 h-3 text-white fill-white" />
                      ) : (
                        <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                      )}
                    </button>
                    
                    <div className="leading-none">
                      <span className="text-[7px] text-white/50 block uppercase font-bold tracking-widest">
                        {t.melodyLabel}
                      </span>
                      <span className={`text-[9px] font-bold block ${themeConfig.accentText}`}>
                        {trackDisplayMap[rawMusic as keyof typeof trackDisplayMap] || trackDisplayMap.shehnai}
                      </span>
                    </div>
                  </div>

                  {/* Equalizer waves */}
                  {isPlaying && (
                    <div className="flex items-end gap-0.5 h-3">
                      {WAVE_BARS.map((height, i) => (
                        <motion.div
                          key={i}
                          className="w-0.5 bg-white rounded-full"
                          animate={{
                            height: [3, height + 3, 3],
                          }}
                          transition={{
                            duration: 0.6 + i * 0.05,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* Call to Action RSVP Syncs to CRM OS */}
              <div className="space-y-4">
                <div className="bg-black/20 border border-white/10 rounded-xl p-3.5 space-y-2.5">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-amber-200 block">
                    {t.rsvpTitle}
                  </span>
                  
                  <AnimatePresence mode="wait">
                    {rsvpState === "none" ? (
                      <motion.div
                        key="rsvp-buttons"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-2 gap-3"
                      >
                        <button
                          onClick={() => handleRsvpStatusSubmit("yes")}
                          className="bg-white hover:bg-slate-100 text-slate-900 font-bold py-1.5 rounded-xl text-xs transition-all active:scale-95 animate-pulse"
                        >
                          {t.rsvpYes}
                        </button>
                        <button
                          onClick={() => handleRsvpStatusSubmit("no")}
                          className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-1.5 rounded-xl text-xs transition-all active:scale-95"
                        >
                          {t.rsvpNo}
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="rsvp-feedback"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-semibold py-1 leading-snug"
                      >
                        <div className="flex items-center justify-center gap-1.5 text-amber-300">
                          <CheckCircle2 className="w-4 h-4 fill-amber-300 text-slate-900" />
                          <span>
                            {rsvpState === "yes" ? t.rsvpAcceptFeedback : t.rsvpDeclineFeedback}
                          </span>
                        </div>
                        <button
                          onClick={() => setRsvpState("none")}
                          className="text-[8px] text-white/40 uppercase font-bold tracking-widest mt-1.5 hover:text-white/80 hover:underline outline-none"
                        >
                          {t.changeRsvp}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer Brand Logo */}
                <div className="text-[9px] text-white/30 font-bold tracking-widest uppercase flex items-center justify-center gap-1">
                  <span>{t.poweredBy}</span>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}
