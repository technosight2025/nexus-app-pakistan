"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Music, Sparkles, Send, Play, Pause, Copy, Check, 
  Smartphone, Share2, ArrowRight, QrCode, RefreshCw, Volume2, X,
  MapPin, Calendar, Plus, Trash2, Shield, Info, VolumeX
} from "lucide-react"

interface CreativeTabsProps {
  isRomanUrdu?: boolean
}

// Complete localized translations dictionary for categories and builder UI
const TRANSLATIONS = {
  en: {
    cardTitle: "NEXUS Immersive Digital Invitation Suite",
    cardSubtitle: "Design multi-day musical invitations that dynamically adapt to the event category's aesthetic and tone.",
    guestNameLabel: "Guest Name",
    guestNamePlaceholder: "e.g. Sarah Ahmed, Uncle Tariq, Dean Robert",
    contactLabel: "WhatsApp Number",
    contactPlaceholder: "e.g. +92 300 1234567",
    eventLabel: "Event Category & Tone Integration",
    daysHeader: "Configure Event Days (Multi-Day Logic)",
    addDayBtn: "Add Event Day",
    dayTitleLabel: "Day Title",
    dayDateLabel: "Date",
    dayTimeLabel: "Time",
    dayVenueLabel: "Venue",
    dayMapLabel: "Google Maps Location Link",
    aiPromptLabel: "AI Aesthetic Decor Prompt (Describe your dream event visual theme)",
    aiPromptPlaceholder: "e.g. Warm candles, yellow marigolds, fairy lights hanging from banyan trees...",
    aiBtn: "AI Magic Styling",
    musicLabel: "Background Melody",
    voiceLabel: "AI Voice-Over Announcement Tone",
    messageLabel: "Calligraphy Greeting / Sub-headline Note",
    messagePlaceholder: "Write a personalized greeting note...",
    defaultMessage: "You are cordially invited to grace our special day with your presence. Your arrival is our greatest blessing.",
    previewLabel: "Live Immersive Preview",
    playHint: "Click to preview melody",
    playingText: "Now Playing:",
    voiceText: "Voice Over:",
    sendBtn: "Generate Invite & Register CRM Lead",
    sendingTitle: "Bundling Interactive Suite",
    successTitle: "Mubarak! Invitation Generated & CRM Synchronized!",
    successSubtitle: "Your dynamic digital invitation is live. The guest response system is connected to your B2B CRM OS.",
    successDetails: "Selected Category:",
    successMelody: "Melody Track:",
    assignedPlanner: "Your Assigned Personal Planner Specialist:",
    copyBtn: "Copy Invitation Link",
    copiedText: "Copied!",
    openWaBtn: "Connect with Planner",
    resetBtn: "Design Another Invitation",
    tabs: {
      invites: "Invitations",
      memory: "Memory Vault"
    },
    memoryVault: {
      uploadedToday: "124 New Memories Uploaded Today",
      desc: "Safeguard and capture wedding video highlights, candidate photos, and event files in a secure cloud space."
    },
    envelope: {
      sealPrompt: "Click Wax Seal to Unveil",
      tapToOpen: "TAP WAX SEAL TO DECRYPT INVITATION",
      initials: "NEXUS",
      calligraphyIntro: "We request the honor of your presence to celebrate the auspicious occasion of our",
      guestLabel: "Honored Guest",
      rsvpTitle: "Will you grace us with your presence?",
      rsvpYes: "Yes, I will attend",
      rsvpNo: "Regretfully Decline",
      rsvpAcceptFeedback: "Thank you for your RSVP! Your response has been automatically synchronized to the Host's CRM OS Guest List.",
      rsvpDeclineFeedback: "Thank you for letting us know. You will be missed in our celebrations! (Synced with CRM OS)",
      closeBtn: "Close Immersive Preview"
    }
  },
  ru: {
    cardTitle: "NEXUS Immersive Digital Invitation Suite",
    cardSubtitle: "Multi-day musical invitations design krain jo event category ke tone aur theme ke mutabiq tabdeel hoti hain.",
    guestNameLabel: "Mehmaan Ka Naam",
    guestNamePlaceholder: "Jaise ke Sarah Ahmed, Uncle Tariq, Dean Robert",
    contactLabel: "WhatsApp Number",
    contactPlaceholder: "Jaise ke +92 300 1234567",
    eventLabel: "Event Category Aur Tone Ka Intikhab",
    daysHeader: "Taqreeb Ke Din Configure Krain (Multi-Day)",
    addDayBtn: "Naya Din Add Krain",
    dayTitleLabel: "Day Title",
    dayDateLabel: "Date / Tareekh",
    dayTimeLabel: "Time / Waqt",
    dayVenueLabel: "Venue / Jagah",
    dayMapLabel: "Google Maps Location Link",
    aiPromptLabel: "AI Se Apni Decor Visualise Krain",
    aiPromptPlaceholder: "Jaise ke: Peeli lights, marigold phoolon ki larriyan, aur khubsoorat stage design...",
    aiBtn: "AI Magic Style Lagain",
    musicLabel: "Background Melody Dhun",
    voiceLabel: "AI Voice-Over Announcement Tone",
    messageLabel: "Calligraphy Greeting Paigham",
    messagePlaceholder: "Aik pyara sa dawat nama likhain...",
    defaultMessage: "Aap ko humari is khushi ke mauqe par dil se dawat di jati hai. Aap ki tashreef aawari humare liye baais-e-musarrat hogi.",
    previewLabel: "Live Immersive Preview",
    playHint: "Dhun sunne ke liye click krain",
    playingText: "Abhi chal rahi hai:",
    voiceText: "Vocal Announcement:",
    sendBtn: "Invite Share Krain & CRM List Sync Krain",
    sendingTitle: "Interactive Suite Tayar Ho Raha Hai",
    successTitle: "Mubarak Ho! Invitation Generated & CRM Guest List Sync!",
    successSubtitle: "Aap ka digital invitation link live ho gya hai aur guest responses host ke B2B CRM OS Guest List se sync ho chuke hain.",
    successDetails: "Event Category:",
    successMelody: "Selected Dhun:",
    assignedPlanner: "Aap Ke Personal Planner Specialist:",
    copyBtn: "Invite Link Copy Krain",
    copiedText: "Copy Ho Gya!",
    openWaBtn: "Planner Se Baat Krain",
    resetBtn: "Ek Aur Invite Bhejin",
    tabs: {
      invites: "Invitations",
      memory: "Memory Vault"
    },
    memoryVault: {
      uploadedToday: "Aaj 124 Nayi Memories Upload Ki Gaein",
      desc: "Shaadi ki videos, photos aur deegar documents ko mehfooz cloud space me save krain."
    },
    envelope: {
      sealPrompt: "Kholne Ke Liye Wax Seal Dabain",
      tapToOpen: "INVITATION DEKHNE KE LIYE WAX SEAL DABAIN",
      initials: "NEXUS",
      calligraphyIntro: "Hum aap ko dil ki gehraiyon se shirkat ki dawat dete hain is mutabarrak taqreeb par:",
      guestLabel: "Moazzaz Mehmaan",
      rsvpTitle: "Kya aap humari khushi me shareek hon ge?",
      rsvpYes: "Ji Haan, Zaroor Aao Ga",
      rsvpNo: "Hazir Nahi Ho Sako Ga",
      rsvpAcceptFeedback: "Aap ke response ka shukriya! Aap ka RSVP automatically Host ke CRM OS Guest List me update ho chuka hai.",
      rsvpDeclineFeedback: "Paigham bhejne ka shukriya. Hum aap ko bohot miss krain ge! (CRM OS Updated)",
      closeBtn: "Preview Band Krain"
    }
  }
}

// 4 Custom Event Categories (Wedding, Corporate, Convocation, Festival)
const EVENT_CATEGORIES = [
  { id: "wedding", nameEn: "Wedding", nameRu: "Wedding / Shadi", emoji: "💍", tone: "Royal / Poetic" },
  { id: "corporate", nameEn: "Corporate", nameRu: "Corporate / Company", emoji: "🏢", tone: "Professional / Precise" },
  { id: "convocation", nameEn: "Convocation", nameRu: "Convocation / Degree", emoji: "🎓", tone: "Inspiring / Celebratory" },
  { id: "festival", nameEn: "Festival", nameRu: "Festival / Mela", emoji: "🎪", tone: "Vibrant / Festive" }
]

const WAVE_BARS = [3, 6, 8, 4, 9, 5, 7, 3, 6, 4]

export function CreativeTabs({ isRomanUrdu = false }: CreativeTabsProps) {
  const [activeTab, setActiveTab] = useState<"invites" | "memory">("invites")
  const t = isRomanUrdu ? TRANSLATIONS.ru : TRANSLATIONS.en

  // Form states
  const [guestName, setGuestName] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [selectedEvent, setSelectedEvent] = useState("wedding")
  const [aiAestheticPrompt, setAiAestheticPrompt] = useState("")
  const [themeStyle, setThemeStyle] = useState<"emerald" | "gulabi" | "midnight" | "saffron">("emerald")
  const [musicTrack, setMusicTrack] = useState<"shehnai" | "rabab" | "flute" | "qawwali" | "instrumental">("shehnai")
  const [voiceTone, setVoiceTone] = useState<"royal" | "joyful" | "poetic">("royal")
  const [customMessage, setCustomMessage] = useState("")

  // Multi-Day Logic Array State
  const [eventDays, setEventDays] = useState<{ id: number; title: string; date: string; time: string; venue: string; mapUrl: string }[]>([
    { id: 1, title: "Day 1 (Ceremony)", date: "Oct 15, 2026", time: "7:30 PM", venue: "The Crystal Pavilion, Islamabad", mapUrl: "https://maps.google.com" }
  ])

  // Immersive Modal & Audio States
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVoicePlaying, setIsVoicePlaying] = useState(false)
  const [isFullscreenPreviewOpen, setIsFullscreenPreviewOpen] = useState(false)
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false)
  const [rsvpState, setRsvpState] = useState<"none" | "yes" | "no">("none")

  // Animation Step States
  const [isAiGenerating, setIsAiGenerating] = useState(false)
  const [aiGenStep, setAiGenStep] = useState(0)
  const [isSending, setIsSending] = useState(false)
  const [sendingStep, setSendingStep] = useState(0)
  const [sendSuccess, setSendSuccess] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  // Floating Particles
  const [particles, setParticles] = useState<{ id: number; left: number; delay: number; duration: number }[]>([])

  // Load particles
  useEffect(() => {
    if (isFullscreenPreviewOpen && isEnvelopeOpened) {
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
  }, [isFullscreenPreviewOpen, isEnvelopeOpened])

  // Setup prompt auto-presets based on event choice
  useEffect(() => {
    if (selectedEvent === "wedding") {
      setAiAestheticPrompt(isRomanUrdu ? "Safaid gulab aur crystal chandeliers se saji shahi stage" : "White roses stage background with grand crystal chandeliers and gold accents")
      setThemeStyle("emerald")
      setEventDays([
        { id: 1, title: "Day 1 (Mehndi Ceremony)", date: "Oct 14, 2026", time: "7:00 PM", venue: "The Crystal Pavilion, Islamabad", mapUrl: "https://maps.google.com" },
        { id: 2, title: "Day 2 (Barat Feast)", date: "Oct 15, 2026", time: "7:30 PM", venue: "The Royal Ballroom, Islamabad", mapUrl: "https://maps.google.com" },
        { id: 3, title: "Day 3 (Walima Reception)", date: "Oct 16, 2026", time: "8:00 PM", venue: "The Rosewood Botanicals, Islamabad", mapUrl: "https://maps.google.com" }
      ])
    } else if (selectedEvent === "corporate") {
      setAiAestheticPrompt(isRomanUrdu ? "Sleek glass podium aur blue tech background visuals" : "Sleek glass podium with glowing neon blue conference backdrop and clean branding logos")
      setThemeStyle("midnight")
      setEventDays([
        { id: 1, title: "Day 1 (Tech Keynotes)", date: "Nov 10, 2026", time: "9:00 AM", venue: "Marriott Grand Ballroom, Islamabad", mapUrl: "https://maps.google.com" },
        { id: 2, title: "Day 2 (VIP Hackathon)", date: "Nov 11, 2026", time: "10:00 AM", venue: "Nexus Tech Sandbox, Rawalpindi", mapUrl: "https://maps.google.com" }
      ])
    } else if (selectedEvent === "convocation") {
      setAiAestheticPrompt(isRomanUrdu ? "Shahi academic stage aur graduation frames" : "Traditional wooden podium with navy blue academic banners and hanging brass laurels")
      setThemeStyle("emerald")
      setEventDays([
        { id: 1, title: "Graduation Ceremony", date: "Dec 05, 2026", time: "10:30 AM", venue: "NUST Convocation Hall, Islamabad", mapUrl: "https://maps.google.com" }
      ])
    } else if (selectedEvent === "festival") {
      setAiAestheticPrompt(isRomanUrdu ? "Colorful concert lights aur cultural canopy design" : "Vibrant multi-colored spotlight arrays with festival canopy drapes and street lamps")
      setThemeStyle("saffron")
      setEventDays([
        { id: 1, title: "Day 1 (Opening Concert)", date: "Feb 20, 2026", time: "6:00 PM", venue: "F-9 Park Arena, Islamabad", mapUrl: "https://maps.google.com" },
        { id: 2, title: "Day 2 (Food & Art Bazaar)", date: "Feb 21, 2026", time: "2:00 PM", venue: "F-9 Park Plaza, Islamabad", mapUrl: "https://maps.google.com" }
      ])
    }
  }, [selectedEvent, isRomanUrdu])

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

  const getParticleGlyph = () => {
    if (selectedEvent === "festival") {
      return "✿" // Marigolds
    } else if (selectedEvent === "corporate") {
      return "✦" // Stars
    } else if (selectedEvent === "convocation") {
      return "★" // Academic star
    } else {
      return "❀" // Roses
    }
  }

  // AI Prompt generator steps
  const handleAiGenerate = () => {
    setIsAiGenerating(true)
    setAiGenStep(0)
  }

  useEffect(() => {
    if (!isAiGenerating) return
    const timer = setInterval(() => {
      setAiGenStep((prev) => {
        if (prev >= 2) {
          clearInterval(timer)
          setTimeout(() => {
            setIsAiGenerating(false)
            const promptLower = aiAestheticPrompt.toLowerCase()
            if (promptLower.includes("marigold") || promptLower.includes("yellow") || promptLower.includes("peeli") || promptLower.includes("orange")) {
              setThemeStyle("saffron")
            } else if (promptLower.includes("neon") || promptLower.includes("blue") || promptLower.includes("midnight") || promptLower.includes("corporate")) {
              setThemeStyle("midnight")
            } else if (promptLower.includes("pink") || promptLower.includes("rose") || promptLower.includes("gulabi") || promptLower.includes("crimson")) {
              setThemeStyle("gulabi")
            } else {
              setThemeStyle("emerald")
            }
          }, 800)
          return prev
        }
        return prev + 1
      })
    }, 600)
    return () => clearInterval(timer)
  }, [isAiGenerating, aiAestheticPrompt])

  // Add/Delete day handlers
  const handleAddDay = () => {
    const nextId = eventDays.length > 0 ? Math.max(...eventDays.map(d => d.id)) + 1 : 1
    setEventDays([
      ...eventDays,
      { id: nextId, title: `Day ${nextId} (Event)`, date: "", time: "", venue: "", mapUrl: "https://maps.google.com" }
    ])
  }

  const handleDeleteDay = (id: number) => {
    if (eventDays.length <= 1) return
    setEventDays(eventDays.filter(day => day.id !== id))
  }

  const handleUpdateDayField = (id: number, field: keyof typeof eventDays[0], value: string) => {
    setEventDays(eventDays.map(day => day.id === id ? { ...day, [field]: value } : day))
  }

  // Lead capture register sequence
  const handleSendInvite = () => {
    if (!guestName.trim()) {
      alert(isRomanUrdu ? "Meherbani farma kar guest ka naam likhain!" : "Please enter a guest name!")
      return
    }
    setIsSending(true)
    setSendingStep(0)
  }

  const sendingStepsList = isRomanUrdu ? [
    "Invitation link banaya ja raha hai...",
    "Audio track set kiya ja raha hai...",
    "WhatsApp package tayar ho raha hai..."
  ] : [
    "Generating secure invitation link...",
    "Syncing background audio track...",
    "Bundling digital card asset for WhatsApp..."
  ]

  useEffect(() => {
    if (!isSending) return
    const timer = setInterval(() => {
      setSendingStep((prev) => {
        if (prev >= 2) {
          clearInterval(timer)
          setTimeout(() => {
            setIsSending(false)
            setSendSuccess(true)
          }, 800)
          return prev
        }
        return prev + 1
      })
    }, 950)
    return () => clearInterval(timer)
  }, [isSending])

  const handleCopyLink = () => {
    setIsCopied(true)
    const daysParam = encodeURIComponent(JSON.stringify(eventDays))
    const link = `http://localhost:3000/invite/view?name=${encodeURIComponent(guestName)}&event=${selectedEvent}&theme=${themeStyle}&music=${musicTrack}&voice=${voiceTone}&msg=${encodeURIComponent(customMessage)}&prompt=${encodeURIComponent(aiAestheticPrompt)}&days=${daysParam}`
    navigator.clipboard.writeText(link)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const getThemeStyles = (style: typeof themeStyle) => {
    switch (style) {
      case "gulabi":
        return {
          cardBg: "bg-gradient-to-br from-rose-950 via-[#701a35] to-rose-900",
          borderColor: "border-amber-400/40",
          accentText: "text-amber-400",
          pillBg: "bg-rose-500/10 text-rose-300 border-rose-400/20",
          themeName: isRomanUrdu ? "Gulabi Shehnai" : "Gulabi Shehnai",
          envelopeBg: "bg-[#7c1d3c]",
          waxBg: "bg-[#D97706] shadow-[#D97706]/40",
          crestColor: "text-amber-300"
        }
      case "midnight":
        return {
          cardBg: "bg-gradient-to-br from-indigo-950 via-[#1b1c4b] to-slate-950",
          borderColor: "border-slate-300/40",
          accentText: "text-indigo-200",
          pillBg: "bg-indigo-500/10 text-indigo-300 border-indigo-400/20",
          themeName: isRomanUrdu ? "Midnight Sitar" : "Midnight Sitar",
          envelopeBg: "bg-[#1b1d40]",
          waxBg: "bg-[#475569] shadow-[#475569]/40",
          crestColor: "text-indigo-200"
        }
      case "saffron":
        return {
          cardBg: "bg-gradient-to-br from-amber-950 via-[#633c02] to-amber-900",
          borderColor: "border-amber-400/60",
          accentText: "text-amber-400",
          pillBg: "bg-amber-500/10 text-amber-200 border-amber-400/30",
          themeName: isRomanUrdu ? "Shahi Saffron" : "Royal Saffron",
          envelopeBg: "bg-[#4c2d03]",
          waxBg: "bg-[#EA580C] shadow-[#EA580C]/40",
          crestColor: "text-amber-300"
        }
      case "emerald":
      default:
        return {
          cardBg: "bg-gradient-to-br from-emerald-950 via-[#0a3a28] to-emerald-900",
          borderColor: "border-[#C9A227]/40",
          accentText: "text-[#C9A227]",
          pillBg: "bg-[#C9A227]/10 text-[#C9A227] border-[#C9A227]/20",
          themeName: isRomanUrdu ? "Shahi Emerald" : "Royal Emerald",
          envelopeBg: "bg-[#093524]",
          waxBg: "bg-[#B45309] shadow-[#B45309]/40",
          crestColor: "text-[#C9A227]"
        }
    }
  }

  const handleReset = () => {
    setGuestName("")
    setContactNumber("")
    setCustomMessage("")
    setAiAestheticPrompt("")
    setSendSuccess(false)
    setIsPlaying(false)
    setIsVoicePlaying(false)
    setRsvpState("none")
    setIsEnvelopeOpened(false)
    setIsFullscreenPreviewOpen(false)
  }

  const getInvitationLink = () => {
    const daysParam = encodeURIComponent(JSON.stringify(eventDays))
    return `http://localhost:3000/invite/view?name=${encodeURIComponent(guestName)}&event=${selectedEvent}&theme=${themeStyle}&music=${musicTrack}&voice=${voiceTone}&msg=${encodeURIComponent(customMessage)}&prompt=${encodeURIComponent(aiAestheticPrompt)}&days=${daysParam}`
  }

  const themeConfig = getThemeStyles(themeStyle)
  const currentCategoryObj = EVENT_CATEGORIES.find(c => c.id === selectedEvent) || EVENT_CATEGORIES[0]

  return (
    <section className="space-y-6 bg-surface border border-border p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden">
      
      {/* Visual background ambient gradient */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4 relative z-10">
        <div className="space-y-1 text-left">
          <div className="inline-flex items-center gap-1 bg-[#0F5B3E]/10 border border-[#0F5B3E]/20 text-[#0F5B3E] font-bold text-[10px] tracking-widest px-2.5 py-0.5 rounded-md uppercase">
            <Sparkles className="w-3 h-3 fill-[#0F5B3E]" />
            NEXUS Immersive Suite
          </div>
          <h2 className="font-sans text-xl font-bold text-foreground">
            {isRomanUrdu ? "Interactive Digital Invitation System" : "Dynamic Digital Invitation Generator"}
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-muted p-1 rounded-xl border border-border w-full sm:w-max">
          <button
            onClick={() => setActiveTab("invites")}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === "invites"
                ? "bg-surface text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.tabs.invites}
          </button>
          <button
            onClick={() => setActiveTab("memory")}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === "memory"
                ? "bg-surface text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.tabs.memory}
          </button>
        </div>
      </div>

      {/* Main Panel Content */}
      {activeTab === "invites" && (
        <div className="animate-fadeIn relative z-10">
          
          <AnimatePresence mode="wait">
            
            {/* GIG LEAD SYNCHRONIZED SUCCESS DASHBOARD */}
            {sendSuccess ? (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="max-w-2xl mx-auto py-4 space-y-6 text-center"
              >
                {/* Success details */}
                <div className="space-y-2">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#0F5B3E]/10 border border-[#0F5B3E]/30 flex items-center justify-center text-[#0F5B3E]">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h3 className="text-xl font-black text-foreground font-sans">
                    {t.successTitle}
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-lg mx-auto">
                    {t.successSubtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-muted p-5 rounded-2xl border border-border text-left items-stretch">
                  
                  {/* Summary (7 Columns) */}
                  <div className="md:col-span-7 flex flex-col justify-between space-y-4 font-sans">
                    <div className="space-y-3">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">
                        Live Invitation Summary
                      </span>
                      
                      <div className="space-y-2">
                        <div className="text-xs">
                          <span className="text-muted-foreground font-bold">Recipient Guest:</span>{" "}
                          <span className="font-bold text-foreground">{guestName}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-muted-foreground font-bold">{t.successDetails}</span>{" "}
                          <span className="font-bold text-[#0F5B3E] uppercase">{selectedEvent} ({currentCategoryObj.tone})</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-muted-foreground font-bold">Configured Days:</span>{" "}
                          <span className="font-bold text-slate-700">{eventDays.length} Event Days</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-muted-foreground font-bold">Aesthetics Vision:</span>{" "}
                          <span className="italic text-slate-600 block pl-2 border-l-2 border-border mt-0.5 leading-snug text-[10px]">
                            "{aiAestheticPrompt || "N/A"}"
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleCopyLink}
                        className="flex-1 bg-background border border-border text-foreground hover:bg-muted font-bold py-2 px-3 rounded-xl text-[10px] flex items-center justify-center gap-1 transition-all active:scale-[0.98]"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#0F5B3E]" />
                            {t.copiedText}
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                            {t.copyBtn}
                          </>
                        )}
                      </button>

                      <a
                        href={`https://wa.me/${contactNumber.replace(/[^0-9]/g, "") || "923001234567"}?text=${encodeURIComponent(
                          `Assalam-o-Alaikum! Open your dynamic digital invitation here: ${getInvitationLink()}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-white hover:bg-slate-100 border border-[#0F5B3E] text-[#0F5B3E] font-bold py-2 px-3 rounded-xl text-[10px] flex items-center justify-center gap-1 transition-all"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        Share Invite Link
                      </a>
                    </div>
                  </div>

                  {/* Specialist planner card (5 Columns) */}
                  <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-5 flex flex-col justify-between items-center text-center">
                    <div className="space-y-3 w-full">
                      <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">
                        {t.assignedPlanner}
                      </span>
                      
                      <div className="bg-background border border-border p-3 rounded-xl flex items-center gap-3 text-left w-full">
                        <div className="w-9 h-9 rounded-full bg-[#0F5B3E]/10 border border-[#0F5B3E]/20 flex items-center justify-center text-[#0F5B3E] font-extrabold text-sm">
                          FK
                        </div>
                        <div className="leading-tight font-sans">
                          <span className="font-extrabold text-xs text-foreground block">
                            Farhan Khan
                          </span>
                          <span className="text-[9px] text-[#5E6460] block mt-0.5">
                            Senior Specialist Advisor
                          </span>
                          <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold uppercase inline-block mt-0.5">
                            Active Sync
                          </span>
                        </div>
                      </div>
                      <p className="text-[9px] text-muted-foreground leading-snug">
                        Farhan has received your AI Decor plan. Any RSVP confirm response submitted by your guests will immediately update your CRM Dashboard in real-time.
                      </p>
                    </div>

                    <a
                      href="https://wa.me/923001234567?text=Hi%20Farhan,%20I%20just%20generated%20a%20Dynamic%20Invitation%20on%20NEXUS.%20Let's%20discuss%20my%20CRM%20Guest%20List!"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-[#0F5B3E] hover:bg-[#0A422D] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all mt-3"
                    >
                      {t.openWaBtn}
                    </a>
                  </div>

                </div>

                <button
                  onClick={handleReset}
                  className="text-xs font-bold text-[#5E6460] hover:text-foreground flex items-center justify-center gap-1.5 mx-auto hover:underline pt-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {t.resetBtn}
                </button>
              </motion.div>
            ) : isSending ? (
              
              // SENDING STEP SEQUENCE
              <motion.div
                key="sending-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center space-y-6 max-w-sm mx-auto"
              >
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-[#0F5B3E]/10 rounded-full animate-pulse" />
                  <div className="absolute inset-0 border-4 border-t-[#0F5B3E] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                  <Send className="w-5 h-5 text-[#0F5B3E]" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-foreground font-sans">
                    {t.sendingTitle}...
                  </h4>
                  
                  <div className="h-6 overflow-hidden relative w-full">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={sendingStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-xs text-muted-foreground font-sans absolute inset-0 text-center"
                      >
                        {sendingStepsList[sendingStep]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex gap-2 justify-center">
                  {[0, 1, 2].map((step) => (
                    <div
                      key={step}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        sendingStep >= step ? "bg-[#0F5B3E] scale-110" : "bg-[#E6E2DA]"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              
              // INTERACTIVE BUILDER FORM
              <motion.div
                key="builder-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2 text-left"
              >
                
                {/* COLUMN 1: FORM INPUTS (7 Columns) */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Description Header */}
                  <div className="space-y-1">
                    <h3 className="font-sans text-md font-bold text-[#1D1C17]">
                      {t.cardTitle}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t.cardSubtitle}
                    </p>
                  </div>

                  <div className="space-y-5">
                    
                    {/* Category Selector with Tone highlights */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-[#5E6460]">
                        {t.eventLabel}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {EVENT_CATEGORIES.map((ev) => (
                          <button
                            key={ev.id}
                            type="button"
                            onClick={() => setSelectedEvent(ev.id)}
                            className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                              selectedEvent === ev.id
                                ? "border-[#0F5B3E] bg-[#0F5B3E]/5 text-primary scale-102 font-bold"
                                : "border-border hover:border-slate-300 text-muted-foreground bg-background"
                            }`}
                          >
                            <span className="text-xl mb-1">{ev.emoji}</span>
                            <span className="text-[10px] tracking-tight leading-none">
                              {isRomanUrdu ? ev.nameRu : ev.nameEn}
                            </span>
                            <span className="text-[7px] text-[#5E6460] mt-1 uppercase font-bold block scale-95 opacity-80 leading-none">
                              {ev.tone.split(" ")[0]}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Guest Name & Contact */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-[#5E6460]">
                          {t.guestNameLabel} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder={t.guestNamePlaceholder}
                          className="w-full bg-background border border-border focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E]/20 rounded-xl px-4 py-2.5 text-xs text-foreground font-semibold placeholder:text-muted-foreground outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-[#5E6460]">
                          {t.contactLabel}
                        </label>
                        <input
                          type="text"
                          value={contactNumber}
                          onChange={(e) => setContactNumber(e.target.value)}
                          placeholder={t.contactPlaceholder}
                          className="w-full bg-background border border-border focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E]/20 rounded-xl px-4 py-2.5 text-xs text-foreground font-semibold placeholder:text-muted-foreground outline-none"
                        />
                      </div>
                    </div>

                    {/* MULTI-DAY CONFIGURATION MODULE */}
                    <div className="space-y-3 bg-[#5E6460]/5 border border-[#5E6460]/10 p-4 rounded-xl">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] uppercase font-black tracking-wider text-[#1D1C17]">
                          {t.daysHeader}
                        </label>
                        <button
                          type="button"
                          onClick={handleAddDay}
                          className="bg-[#0F5B3E] text-white hover:bg-[#0A422D] font-bold text-[9px] px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all active:scale-95 shadow-sm"
                        >
                          <Plus className="w-3 h-3" />
                          {t.addDayBtn}
                        </button>
                      </div>

                      {/* Day fields list */}
                      <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                        {eventDays.map((day, idx) => (
                          <div key={day.id} className="bg-background border border-border rounded-lg p-3 space-y-2 relative shadow-sm">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                              <span className="text-[10px] font-bold text-slate-800">
                                Day {idx + 1} Configuration
                              </span>
                              
                              <button
                                type="button"
                                disabled={eventDays.length <= 1}
                                onClick={() => handleDeleteDay(day.id)}
                                className="text-red-500 hover:text-red-700 disabled:opacity-30 p-1 rounded hover:bg-red-50"
                                title="Delete Day"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Inputs row 1 (Title + Date) */}
                            <div className="grid grid-cols-2 gap-2 text-[10px]">
                              <div>
                                <span className="text-[#5E6460] font-bold block mb-1">{t.dayTitleLabel}</span>
                                <input
                                  type="text"
                                  value={day.title}
                                  onChange={(e) => handleUpdateDayField(day.id, "title", e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none text-xs font-semibold text-foreground"
                                />
                              </div>
                              <div>
                                <span className="text-[#5E6460] font-bold block mb-1">{t.dayDateLabel}</span>
                                <input
                                  type="text"
                                  value={day.date}
                                  onChange={(e) => handleUpdateDayField(day.id, "date", e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none text-xs font-semibold text-foreground"
                                />
                              </div>
                            </div>

                            {/* Inputs row 2 (Time + Venue) */}
                            <div className="grid grid-cols-3 gap-2 text-[10px]">
                              <div>
                                <span className="text-[#5E6460] font-bold block mb-1">{t.dayTimeLabel}</span>
                                <input
                                  type="text"
                                  value={day.time}
                                  onChange={(e) => handleUpdateDayField(day.id, "time", e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none text-xs font-semibold text-foreground"
                                />
                              </div>
                              <div className="col-span-2">
                                <span className="text-[#5E6460] font-bold block mb-1">{t.dayVenueLabel}</span>
                                <input
                                  type="text"
                                  value={day.venue}
                                  onChange={(e) => handleUpdateDayField(day.id, "venue", e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none text-xs font-semibold text-foreground"
                                />
                              </div>
                            </div>

                            {/* Google Map URL */}
                            <div className="text-[10px]">
                              <span className="text-[#5E6460] font-bold block mb-1">{t.dayMapLabel}</span>
                              <input
                                type="text"
                                value={day.mapUrl}
                                onChange={(e) => handleUpdateDayField(day.id, "mapUrl", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none text-[10px] font-semibold text-foreground"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Prompt visualizer */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-[#5E6460]">
                          {t.aiPromptLabel}
                        </label>
                        <span className="text-[8px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                          NEXUS AI
                        </span>
                      </div>
                      
                      <div className="relative">
                        <textarea
                          rows={2}
                          value={aiAestheticPrompt}
                          onChange={(e) => setAiAestheticPrompt(e.target.value)}
                          placeholder={t.aiPromptPlaceholder}
                          className="w-full bg-background border border-border focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 rounded-xl pl-4 pr-32 py-2.5 text-xs text-foreground font-semibold placeholder:text-muted-foreground outline-none transition-all resize-none"
                        />
                        
                        <button
                          type="button"
                          onClick={handleAiGenerate}
                          disabled={isAiGenerating}
                          className="absolute right-2.5 bottom-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-[10px] px-3 py-1.5 rounded-lg active:scale-95 transition-all shadow-sm flex items-center gap-1 select-none"
                        >
                          {isAiGenerating ? (
                            <>
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3 h-3 fill-white" />
                              {t.aiBtn}
                            </>
                          )}
                        </button>
                      </div>

                      {/* AI steps */}
                      {isAiGenerating && (
                        <div className="text-[10px] text-purple-600 font-bold flex items-center gap-2 mt-1 animate-pulse">
                          <span>✦</span>
                          <span>
                            {isRomanUrdu ? [
                              "Aesthetic specifications check ki ja rahi hain...",
                              "NEXUS templates override select ho rahi hain...",
                              "Themes dynamically active ho rahi hain..."
                            ][aiGenStep] : [
                              "Parsing event design parameters...",
                              "Synthesizing customized branding assets...",
                              "Overriding theme visualization layouts..."
                            ][aiGenStep]}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Melody + Announcer selections */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-[#5E6460]">
                          {t.musicLabel}
                        </label>
                        <select
                          value={musicTrack}
                          onChange={(e) => setMusicTrack(e.target.value as any)}
                          className="w-full bg-background border border-border focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E]/20 rounded-xl px-3 py-2.5 text-xs text-foreground font-semibold outline-none transition-all"
                        >
                          <option value="shehnai">{isRomanUrdu ? "Traditional Shehnai Dhun" : "Traditional Shehnai"}</option>
                          <option value="rabab">{isRomanUrdu ? "Acoustic Rabab Dhun" : "Acoustic Rabab"}</option>
                          <option value="flute">{isRomanUrdu ? "Romantic Flute Dhun" : "Romantic Flute"}</option>
                          <option value="qawwali">{isRomanUrdu ? "Sufi Qawwali Beat" : "Sufi Qawwali Beat"}</option>
                          <option value="instrumental">{isRomanUrdu ? "Modern Sitar Instrumental" : "Modern Instrumental Sitar"}</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-[#5E6460]">
                          {t.voiceLabel}
                        </label>
                        <select
                          value={voiceTone}
                          onChange={(e) => setVoiceTone(e.target.value as any)}
                          className="w-full bg-background border border-border focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E]/20 rounded-xl px-3 py-2.5 text-xs text-foreground font-semibold outline-none transition-all"
                        >
                          <option value="royal">{isRomanUrdu ? "Warm Royal Voice (Announcement)" : "Warm Royal Voice"}</option>
                          <option value="joyful">{isRomanUrdu ? "Festive Celebration Voice (Announcement)" : "Festive Joyful Voice"}</option>
                          <option value="poetic">{isRomanUrdu ? "Poetic Ghazal Voice (Announcement)" : "Soft Poetic Voice"}</option>
                        </select>
                      </div>

                    </div>

                    {/* Calligraphy greeting message */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-[#5E6460]">
                        {t.messageLabel}
                      </label>
                      <textarea
                        rows={2}
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        placeholder={t.messagePlaceholder}
                        className="w-full bg-background border border-border focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E]/20 rounded-xl px-4 py-2 text-xs text-foreground font-semibold placeholder:text-muted-foreground outline-none resize-none transition-all"
                      />
                    </div>

                    <button
                      onClick={handleSendInvite}
                      disabled={!guestName.trim() || isAiGenerating}
                      className="w-full bg-[#0F5B3E] hover:bg-[#0A422D] text-white active:scale-[0.98] disabled:opacity-55 disabled:hover:bg-[#0F5B3E] disabled:active:scale-100 font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm select-none"
                    >
                      <Send className="w-4 h-4" />
                      {t.sendBtn}
                    </button>

                  </div>
                </div>

                {/* COLUMN 2: CLOSED ENVELOPE PREVIEW WITH WAX SEAL (5 Columns) */}
                <div className="lg:col-span-5 space-y-3 w-full">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#5E6460]">
                    {t.previewLabel}
                  </div>

                  <div 
                    onClick={() => {
                      setIsFullscreenPreviewOpen(true)
                      setIsEnvelopeOpened(false)
                    }}
                    className={`relative ${themeConfig.envelopeBg} border-2 ${themeConfig.borderColor} rounded-2xl p-6 min-h-[440px] flex flex-col justify-between items-center overflow-hidden text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] cursor-pointer transition-all duration-300 group select-none`}
                  >
                    <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-white/20" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-white/20" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-white/20" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-white/20" />

                    <div className="absolute top-0 inset-x-0 h-40 bg-black/10 border-b border-white/5 clip-path-flap" />

                    {/* Title */}
                    <div className="relative z-10 text-center space-y-1 mt-6">
                      <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded font-bold uppercase tracking-widest text-[#C9A227] inline-block">
                        {currentCategoryObj.tone.split(" ")[0]} Style
                      </span>
                      <h4 className="font-serif italic text-lg text-white/95 mt-2">
                        {isRomanUrdu ? "Dynamic Preview" : "NEXUS Dynamic System"}
                      </h4>
                    </div>

                    {/* Wax Seal Button */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-16 h-16 rounded-full ${themeConfig.waxBg} border-4 border-amber-300/40 flex items-center justify-center cursor-pointer relative z-20 shadow-md`}
                      >
                        <span className="text-white font-serif font-black text-sm select-none tracking-tighter">
                          {themeConfig.themeName.substring(0, 1)}
                        </span>
                        <div className="absolute inset-1 rounded-full border border-white/10" />
                        <div className="absolute -bottom-4 w-3 h-8 bg-red-800/80 skew-x-12 -z-10 rounded-b animate-pulse" />
                        <div className="absolute -bottom-4 w-3 h-8 bg-red-800/80 -skew-x-12 -z-10 rounded-b ml-3 animate-pulse" />
                      </motion.div>
                      
                      <span className="text-[9px] font-bold uppercase tracking-widest text-amber-200/90 animate-pulse mt-2">
                        {t.envelope.sealPrompt}
                      </span>
                    </div>

                    {/* Category overlay tags */}
                    <div className="relative z-10 w-full flex justify-between items-center text-[9px] text-white/50 uppercase tracking-widest font-bold border-t border-white/10 pt-3">
                      <span>Event: {selectedEvent}</span>
                      <span>Days: {eventDays.length}</span>
                    </div>

                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* FULL SCREEN IMMERSIVE PREVIEW OVERLAY MODAL */}
          <AnimatePresence>
            {isFullscreenPreviewOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto select-none"
              >
                {/* Particle stream */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                  {particles.map((p) => (
                    <motion.div
                      key={p.id}
                      className="absolute text-rose-300/45 text-xl pointer-events-none select-none"
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
                      {getParticleGlyph()}
                    </motion.div>
                  ))}
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsFullscreenPreviewOpen(false)}
                  className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-all outline-none"
                  title="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-full max-w-lg mx-auto relative z-10 py-4">
                  <AnimatePresence mode="wait">
                    
                    {/* WAX SEAL MODAL INTRO */}
                    {!isEnvelopeOpened ? (
                      <motion.div
                        key="closed-envelope"
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className={`w-full ${themeConfig.envelopeBg} border-2 ${themeConfig.borderColor} rounded-3xl p-8 min-h-[480px] flex flex-col justify-between items-center text-center shadow-2xl relative overflow-hidden text-white`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/10 pointer-events-none" />
                        
                        <div className="space-y-2 mt-4">
                          <span className="text-[10px] tracking-widest font-extrabold text-white/50 uppercase block">
                            {currentCategoryObj.tone} Experience
                          </span>
                          <h2 className="font-serif italic text-2xl text-white">
                            {isRomanUrdu ? "Dawat-e-Taqreeb" : "The Invitation Ceremony"}
                          </h2>
                          <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-amber-200 mt-2 block w-max mx-auto">
                            {selectedEvent}
                          </span>
                        </div>

                        {/* Wax Seal Click Trigger */}
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
                            {t.envelope.tapToOpen}
                          </span>
                        </div>

                        {/* Guest name */}
                        <div className="w-full border-t border-white/10 pt-4 mt-2">
                          <span className="text-[9px] uppercase tracking-widest font-bold text-white/40 block">
                            {t.envelope.guestLabel}
                          </span>
                          <span className="font-bold text-lg text-white">
                            {guestName.trim() ? guestName : "Dearest Guest"}
                          </span>
                        </div>
                      </motion.div>
                    ) : (
                      
                      // OPENED IMMERSIVE MULTI-DAY TIMELINE SCROLL
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
                              {t.envelope.initials}
                            </span>
                          </div>
                          
                          <p className="font-serif italic text-xs text-white/70 max-w-sm mx-auto leading-relaxed px-4">
                            "{t.envelope.calligraphyIntro} {selectedEvent.toUpperCase()}"
                          </p>
                        </div>

                        {/* Guest customized greeting */}
                        <div className="my-3 space-y-3 px-2">
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                            <span className="text-[9px] uppercase tracking-widest font-bold text-white/50 block">
                              {t.envelope.guestLabel}
                            </span>
                            <span className="font-bold text-lg block text-white uppercase tracking-wider">
                              {guestName.trim() ? guestName : "Dearest Guest"}
                            </span>
                            <p className="text-xs leading-relaxed text-white/80 italic font-serif">
                              "{customMessage.trim() ? customMessage : t.defaultMessage}"
                            </p>
                          </div>
                        </div>

                        {/* MULTI-DAY ITINERARY TIMELINE LIST */}
                        <div className="space-y-2 max-h-44 overflow-y-auto pr-1 my-2 bg-black/20 border border-white/10 p-3.5 rounded-2xl text-left">
                          <span className="text-[9px] uppercase font-bold text-amber-300 tracking-wider block mb-2 border-b border-white/10 pb-1 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            Event Schedule Details
                          </span>

                          <div className="space-y-3 text-[11px] font-sans">
                            {eventDays.map((day, idx) => (
                              <div key={day.id} className="relative pl-4 border-l border-white/20 pb-2 last:pb-0">
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
                                      📍 {day.venue || "Venue Details"}
                                    </span>
                                  </div>

                                  <a
                                    href={day.mapUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 transition-colors flex items-center justify-center"
                                    title="View Google Map Location"
                                  >
                                    <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* DUAL AUDIO SUB-PANEL: Voice Over + Music synced */}
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-3 space-y-2.5 my-2">
                          
                          {/* AI Voice Over toast line */}
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
                                {t.voiceText} ({voiceTone})
                              </span>
                              <span className="text-[10px] italic text-amber-200 block leading-tight mt-0.5">
                                "{getVoiceToastText(voiceTone)}"
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
                                  {t.playingText}
                                </span>
                                <span className={`text-[9px] font-bold block ${themeConfig.accentText}`}>
                                  {trackDisplayMap[musicTrack]}
                                </span>
                              </div>
                            </div>

                            {/* Equalizer Wave bars */}
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

                        {/* Interactive RSVPs (Syncd with CRM message) */}
                        <div className="space-y-4">
                          <div className="bg-black/20 border border-white/10 rounded-xl p-3.5 space-y-2.5">
                            <span className="text-[9px] uppercase tracking-wider font-extrabold text-amber-200 block">
                              {t.envelope.rsvpTitle}
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
                                    onClick={() => setRsvpState("yes")}
                                    className="bg-white hover:bg-slate-100 text-slate-900 font-bold py-1.5 rounded-xl text-xs transition-all active:scale-95 animate-pulse"
                                  >
                                    {t.envelope.rsvpYes}
                                  </button>
                                  <button
                                    onClick={() => setRsvpState("no")}
                                    className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-1.5 rounded-xl text-xs transition-all active:scale-95"
                                  >
                                    {t.envelope.rsvpNo}
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
                                    <Sparkles className="w-4 h-4 fill-amber-300 animate-pulse" />
                                    <span>
                                      {rsvpState === "yes" ? t.envelope.rsvpAcceptFeedback : t.envelope.rsvpDeclineFeedback}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => setRsvpState("none")}
                                    className="text-[8px] text-white/40 uppercase font-bold tracking-widest mt-1.5 hover:text-white/80 hover:underline outline-none"
                                  >
                                    Change RSVP
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Close button */}
                          <button
                            onClick={() => setIsFullscreenPreviewOpen(false)}
                            className="w-full border border-white/15 hover:bg-white/5 text-white/85 font-bold py-2 rounded-xl text-xs transition-all active:scale-[0.98]"
                          >
                            {t.envelope.closeBtn}
                          </button>
                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}

      {/* Tab B: Memory Vault Overview */}
      {activeTab === "memory" && (
        <div className="space-y-6 animate-fadeIn text-left">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-7 grid grid-cols-3 gap-2">
              <div className="h-28 rounded-xl overflow-hidden shadow-sm border border-border">
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  alt="Pakistani Couple Candid"
                  src="/images/pakistani_wedding_couple.png"
                />
              </div>
              <div className="h-28 rounded-xl overflow-hidden shadow-sm border border-border">
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  alt="Mehndi Hands Art"
                  src="/images/pakistani_mehndi_hands.png"
                />
              </div>
              <div className="h-28 rounded-xl overflow-hidden shadow-sm border border-border">
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  alt="Grand Ballroom Hall"
                  src="/images/pakistani_wedding_venue.png"
                />
              </div>
            </div>

            <div className="md:col-span-5 space-y-4 font-sans">
              <div className="space-y-1.5">
                <h4 className="font-bold text-foreground text-sm">
                  {isRomanUrdu ? "Mehfooz Cloud Storage" : "Private Media Sandboxing"}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t.memoryVault.desc}
                </p>
              </div>

              <div className="bg-[#0F5B3E]/5 border border-[#0F5B3E]/10 p-3.5 rounded-xl text-left">
                <p className="text-[#0F5B3E] font-bold text-xs flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#C9A227] fill-[#C9A227]" />
                  {t.memoryVault.uploadedToday}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  )
}
