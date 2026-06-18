"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  MapPin,
  Camera,
  Star,
  Users,
  Briefcase,
  Music,
  LayoutTemplate,
  Coffee,
  LayoutGrid,
  Wallet,
  MonitorPlay,
  QrCode,
  Sliders,
  Bot,
  Sparkles,
  ArrowRight,
  Mail,
  Calendar,
  Gift,
  Coins,
  Image as ImageIcon,
  Share2,
  Download,
  Calculator,
  Clock,
  Settings,
  Tv
} from "lucide-react"

// COMMON DROP-DOWN CLASSES FOR PERFECT BALANCING
const LIGHT_MENU_CLASSES = "absolute top-full left-0 right-0 mx-auto w-[820px] mt-2.5 bg-white rounded-3xl p-5 md:p-6 z-50 flex gap-5 md:gap-6 shadow-[0_25px_50px_-12px_rgba(5,46,32,0.1)] border border-[#ECE7DF]"
const DARK_MENU_CLASSES = "absolute top-full left-0 right-0 mx-auto w-[820px] mt-2.5 bg-[#1D1C17] text-white rounded-3xl p-5 md:p-6 z-50 flex gap-5 md:gap-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] border border-white/10"

// ==========================================
// 1. MARKETPLACE MEGA MENU
// ==========================================
export function ExploreMegaMenu({ useDarkText = true, textColor = "" }: { useDarkText?: boolean; textColor?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  let timeoutId: NodeJS.Timeout

  const handleMouseEnter = () => {
    clearTimeout(timeoutId)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => setIsOpen(false), 200)
  }

  return (
    <div
      className="static" // Changed from relative to static to allow absolute alignment with relative <header>
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href="/explore"
        className={`flex items-center gap-1 text-xs xl:text-sm font-semibold transition-colors py-2 relative group ${textColor ? textColor : (useDarkText ? "text-[#052E20]/80 hover:text-[#052E20]" : "text-white/80 hover:text-white")
          }`}
      >
        Explore
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        <span className={`absolute bottom-1 left-0 w-0 h-[2px] transition-all group-hover:w-full ${textColor ? "bg-[#1E1B4B]" : (useDarkText ? "bg-[#052E20]" : "bg-white")
          }`}></span>
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={LIGHT_MENU_CLASSES}
          >
            {/* Column 1: Venues */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[#052E20] border-b border-gray-100 pb-2">
                <MapPin className="w-4 h-4" />
                <h3 className="font-bold text-sm tracking-wide">Venues</h3>
              </div>
              <ul className="space-y-3">
                <li><Link href="/explore?category=halls" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Banquet Halls</Link></li>
                <li><Link href="/explore?category=marquees" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Marquees</Link></li>
                <li><Link href="/explore?category=farmhouses" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Farmhouses</Link></li>
                <li><Link href="/explore?category=lawns" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Outdoor Lawns</Link></li>
                <li><Link href="/explore?category=stages" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Traditional Stages</Link></li>
              </ul>
            </div>

            {/* Column 2: Vendors */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[#052E20] border-b border-gray-100 pb-2">
                <Briefcase className="w-4 h-4" />
                <h3 className="font-bold text-sm tracking-wide">Vendors</h3>
              </div>
              <ul className="space-y-3">
                <li><Link href="/explore?category=suits" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Lehnga & Suits</Link></li>
                <li><Link href="/explore?category=cars" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Luxury Cars</Link></li>
                <li><Link href="/explore?category=catering" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Kitchens & Catering</Link></li>
              </ul>
            </div>

            {/* Column 3: Creative Professionals */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[#052E20] border-b border-gray-100 pb-2">
                <Camera className="w-4 h-4" />
                <h3 className="font-bold text-sm tracking-wide">Professionals</h3>
              </div>
              <ul className="space-y-3">
                <li><Link href="/explore?category=studios" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Photo Studios</Link></li>
                <li><Link href="/explore?category=salons" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Bridal Salons</Link></li>
              </ul>
            </div>

            {/* Column 4: Featured Highlight */}
            <div className="flex-1 bg-[#052E20]/5 rounded-2xl p-5 border border-[#052E20]/10 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-extrabold rounded-full mb-3 uppercase tracking-wider">Featured Venue</span>
                <h4 className="font-bold text-[#052E20] text-sm mb-1">Green Meadows</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Lahore's premier private sanctuary for luxury boutique events and serene family escapes.</p>
              </div>
              <Link href="/venues/green-meadows-farmhouse" className="mt-4 text-xs font-bold text-[#052E20] hover:underline flex items-center gap-1 font-semibold">
                View Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ==========================================
// 2. BUSINESS OS MEGA MENU
// ==========================================
export function BusinessOSMegaMenu({ useDarkText = true }: { useDarkText?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  let timeoutId: NodeJS.Timeout

  const handleMouseEnter = () => {
    clearTimeout(timeoutId)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => setIsOpen(false), 200)
  }

  return (
    <div
      className="static" // Anchors absolute position directly to relative <header>
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href="/business"
        className={`flex items-center gap-1 text-xs xl:text-sm font-semibold transition-colors py-2 relative group ${useDarkText ? "text-[#052E20]/80 hover:text-[#052E20]" : "text-white/80 hover:text-white"
          }`}
      >
        Business OS
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        <span className={`absolute bottom-1 left-0 w-0 h-[2px] transition-all group-hover:w-full ${useDarkText ? "bg-[#052E20]" : "bg-white"
          }`}></span>
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={DARK_MENU_CLASSES}
          >
            {/* Column 1: Core Operations */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[#C9A227] border-b border-white/10 pb-2">
                <LayoutGrid className="w-4 h-4" />
                <h3 className="font-bold text-sm tracking-wide">Core OS</h3>
              </div>
              <ul className="space-y-3">
                <li><Link href="/business/dashboard" className="text-sm text-white/70 hover:text-[#C9A227] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#C9A227] transition-colors"></span>Global Dashboard</Link></li>
                <li><Link href="/business/leads" className="text-sm text-white/70 hover:text-[#C9A227] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#C9A227] transition-colors"></span>CRM & Leads</Link></li>
                <li><Link href="/business/team" className="text-sm text-white/70 hover:text-[#C9A227] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#C9A227] transition-colors"></span>Team OS</Link></li>
                <li><Link href="/business/settings" className="text-sm text-white/70 hover:text-[#C9A227] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#C9A227] transition-colors"></span>OS Settings</Link></li>
              </ul>
            </div>

            {/* Column 2: Media & Interactive */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[#C9A227] border-b border-white/10 pb-2">
                <MonitorPlay className="w-4 h-4" />
                <h3 className="font-bold text-sm tracking-wide">Creative Suite</h3>
              </div>
              <ul className="space-y-3">
                <li><Link href="/business/memories" className="text-sm text-white/70 hover:text-[#C9A227] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#C9A227] transition-colors"></span>Memories Pro</Link></li>
                <li><Link href="/business/invitations" className="text-sm text-white/70 hover:text-[#C9A227] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#C9A227] transition-colors"></span>Invitations Pro</Link></li>
                <li><Link href="/business/displays" className="text-sm text-white/70 hover:text-[#C9A227] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#C9A227] transition-colors"></span>Displays OS</Link></li>
              </ul>
            </div>

            {/* Column 3: Finance & Logistics */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[#C9A227] border-b border-white/10 pb-2">
                <Wallet className="w-4 h-4" />
                <h3 className="font-bold text-sm tracking-wide">Finance & Gear</h3>
              </div>
              <ul className="space-y-3">
                <li><Link href="/business/accounting" className="text-sm text-white/70 hover:text-[#C9A227] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#C9A227] transition-colors"></span>Accounting Pro</Link></li>
                <li><Link href="/business/rental" className="text-sm text-white/70 hover:text-[#C9A227] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#C9A227] transition-colors"></span>Rental OS</Link></li>
                <li><Link href="/business/tools" className="text-sm text-white/70 hover:text-[#C9A227] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#C9A227] transition-colors"></span>App Store</Link></li>
              </ul>
            </div>

            {/* Column 4: Featured Highlight */}
            <div className="flex-1 bg-white/5 rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-[#C9A227]/20 text-[#C9A227] text-[10px] font-extrabold rounded-full mb-3 uppercase tracking-wider">AI Powered</span>
                <h4 className="font-bold text-white text-sm mb-1">AI Studio Assistant</h4>
                <p className="text-xs text-white/50 leading-relaxed font-medium">Generate quotes, write briefs, and analyze financials in Roman Urdu & English.</p>
              </div>
              <Link href="/business/ai_assistant" className="mt-4 text-xs font-bold text-[#C9A227] hover:underline hover:text-white flex items-center gap-1 transition-colors group font-semibold">
                Open Assistant <Sparkles className="w-3.5 h-3.5 text-[#C9A227] group-hover:animate-pulse" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ==========================================
// 3. INVITATIONS MEGA MENU
// ==========================================
export function InvitationsMegaMenu({ useDarkText = true }: { useDarkText?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  let timeoutId: NodeJS.Timeout

  const handleMouseEnter = () => {
    clearTimeout(timeoutId)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => setIsOpen(false), 200)
  }

  return (
    <div
      className="static" // Anchors absolute position directly to relative <header>
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href="/invite"
        className={`flex items-center gap-1 text-xs xl:text-sm font-semibold transition-colors py-2 relative group ${useDarkText ? "text-[#052E20]/80 hover:text-[#052E20]" : "text-white/80 hover:text-white"
          }`}
      >
        Invitations
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        <span className={`absolute bottom-1 left-0 w-0 h-[2px] transition-all group-hover:w-full ${useDarkText ? "bg-[#052E20]" : "bg-white"
          }`}></span>
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={LIGHT_MENU_CLASSES}
          >
            {/* Column 1: Card Designers */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[#052E20] border-b border-gray-100 pb-2">
                <Mail className="w-4 h-4 text-[#052E20]" />
                <h3 className="font-bold text-sm tracking-wide">E-Cards</h3>
              </div>
              <ul className="space-y-3">
                <li><Link href="/invite" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Card Designer</Link></li>
                <li><Link href="/invite" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Traditional Themes</Link></li>
                <li><Link href="/invite" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Video Invitations</Link></li>
              </ul>
            </div>

            {/* Column 2: RSVPs & Entrance */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[#052E20] border-b border-gray-100 pb-2">
                <Calendar className="w-4 h-4 text-[#052E20]" />
                <h3 className="font-bold text-sm tracking-wide">RSVP & Gates</h3>
              </div>
              <ul className="space-y-3">
                <li><Link href="/invite/dashboard" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Guest RSVPs</Link></li>
                <li><Link href="/invite/dashboard" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Seating Plans</Link></li>
                <li><Link href="/invite/dashboard" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>QR Gate Passes</Link></li>
              </ul>
            </div>

            {/* Column 3: Salami Envelope */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[#052E20] border-b border-gray-100 pb-2">
                <Gift className="w-4 h-4 text-[#052E20]" />
                <h3 className="font-bold text-sm tracking-wide">Digital Registry</h3>
              </div>
              <ul className="space-y-3">
                <li><Link href="/invite/dashboard" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Salami Envelopes</Link></li>
                <li><Link href="/invite/dashboard" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Shadi Gift Registry</Link></li>
              </ul>
            </div>

            {/* Column 4: Featured Preview */}
            <div className="flex-1 bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-[#0F5B3E]/10 text-[#0F5B3E] text-[10px] font-extrabold rounded-full mb-3 uppercase tracking-wider">Royal Collection</span>
                <h4 className="font-bold text-[#052E20] text-sm mb-1">Shehnai Gold Theme</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">Handcrafted royal gold textures and animations for premium Pakistani weddings.</p>
              </div>
              <Link href="/invite/demo-guest-view" target="_blank" className="mt-4 text-xs font-bold text-[#0F5B3E] hover:underline flex items-center gap-1 font-semibold">
                Open Guest Preview <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ==========================================
// 4. MEMORIES MEGA MENU
// ==========================================
export function MemoriesMegaMenu({ useDarkText = true }: { useDarkText?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  let timeoutId: NodeJS.Timeout

  const handleMouseEnter = () => {
    clearTimeout(timeoutId)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => setIsOpen(false), 200)
  }

  return (
    <div
      className="static" // Anchors absolute position directly to relative <header>
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href="/memories"
        className={`flex items-center gap-1 text-xs xl:text-sm font-semibold transition-colors py-2 relative group ${useDarkText ? "text-[#052E20]/80 hover:text-[#052E20]" : "text-white/80 hover:text-white"
          }`}
      >
        Memories
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        <span className={`absolute bottom-1 left-0 w-0 h-[2px] transition-all group-hover:w-full ${useDarkText ? "bg-[#052E20]" : "bg-white"
          }`}></span>
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={LIGHT_MENU_CLASSES}
          >
            {/* Column 1: Client Delivery */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[#052E20] border-b border-gray-100 pb-2">
                <ImageIcon className="w-4 h-4 text-[#052E20]" />
                <h3 className="font-bold text-sm tracking-wide">Galleries</h3>
              </div>
              <ul className="space-y-3">
                <li><Link href="/memories" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Client Photo Books</Link></li>
                <li><Link href="/memories" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Shared Photo Albums</Link></li>
              </ul>
            </div>

            {/* Column 2: Guest Sharing */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[#052E20] border-b border-gray-100 pb-2">
                <Share2 className="w-4 h-4 text-[#052E20]" />
                <h3 className="font-bold text-sm tracking-wide">Guest Sharing</h3>
              </div>
              <ul className="space-y-3">
                <li><Link href="/memories" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Live Guest Uploads</Link></li>
                <li><Link href="/memories" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>QR Photo Cards</Link></li>
              </ul>
            </div>

            {/* Column 3: Admin & CDNs */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[#052E20] border-b border-gray-100 pb-2">
                <Download className="w-4 h-4 text-[#052E20]" />
                <h3 className="font-bold text-sm tracking-wide">CDNs</h3>
              </div>
              <ul className="space-y-3">
                <li><Link href="/memories" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>High-Res Delivery CDN</Link></li>
                <li><Link href="/memories" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Live Slideshow Loop</Link></li>
              </ul>
            </div>

            {/* Column 4: Featured Preview */}
            <div className="flex-1 bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-[#0F5B3E]/10 text-[#0F5B3E] text-[10px] font-extrabold rounded-full mb-3 uppercase tracking-wider">Heritage Feature</span>
                <h4 className="font-bold text-[#052E20] text-sm mb-1">Lahore Fort Shoot</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">Public showcase album documenting dynamic wedding portraits in Lahore heritage sites.</p>
              </div>
              <Link href="/memories" className="mt-4 text-xs font-bold text-[#0F5B3E] hover:underline flex items-center gap-1 font-semibold">
                Explore Album <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ==========================================
// 5. TOOLS MEGA MENU
// ==========================================
export function ToolsMegaMenu({ useDarkText = true }: { useDarkText?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  let timeoutId: NodeJS.Timeout

  const handleMouseEnter = () => {
    clearTimeout(timeoutId)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => setIsOpen(false), 200)
  }

  return (
    <div
      className="static" // Anchors absolute position directly to relative <header>
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href="/tools"
        className={`flex items-center gap-1 text-xs xl:text-sm font-semibold transition-colors py-2 relative group ${useDarkText ? "text-[#052E20]/80 hover:text-[#052E20]" : "text-white/80 hover:text-white"
          }`}
      >
        Tools
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        <span className={`absolute bottom-1 left-0 w-0 h-[2px] transition-all group-hover:w-full ${useDarkText ? "bg-[#052E20]" : "bg-white"
          }`}></span>
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={LIGHT_MENU_CLASSES}
          >
            {/* Column 1: Planning Tools */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[#052E20] border-b border-gray-100 pb-2">
                <Calculator className="w-4 h-4 text-[#052E20]" />
                <h3 className="font-bold text-sm tracking-wide">Calculators</h3>
              </div>
              <ul className="space-y-3">
                <li><Link href="/tools/daig-calculator" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Daig Calculator</Link></li>
                <li><Link href="/tools/jahaiz-tracker" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Jahaiz Dowry Tracker</Link></li>
                <li><Link href="/tools/shaadi-beats" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Shaadi Beats Playlist</Link></li>
              </ul>
            </div>

            {/* Column 2: Event Trackers */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[#052E20] border-b border-gray-100 pb-2">
                <Clock className="w-4 h-4 text-[#052E20]" />
                <h3 className="font-bold text-sm tracking-wide">Interactive</h3>
              </div>
              <ul className="space-y-3">
                <li><Link href="/tools/baraat-tracker" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Baraat Procession Tracker</Link></li>
                <li><Link href="/tools/mehndi-designer" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Mehndi Designer Tool</Link></li>
              </ul>
            </div>

            {/* Column 3: B2B SaaS Store */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[#052E20] border-b border-gray-100 pb-2">
                <LayoutGrid className="w-4 h-4 text-[#052E20]" />
                <h3 className="font-bold text-sm tracking-wide">SaaS Apps</h3>
              </div>
              <ul className="space-y-3">
                <li><Link href="/tools" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>App Marketplace Home</Link></li>
                <li><Link href="/tools" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Event Timeline OS</Link></li>
                <li><Link href="/tools" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Family Task Allocator</Link></li>
              </ul>
            </div>

            {/* Column 4: Featured App */}
            <div className="flex-1 bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-extrabold rounded-full mb-3 uppercase tracking-wider">Live tracking</span>
                <h4 className="font-bold text-[#052E20] text-sm mb-1">Baraat Live Tracker</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">Let guests track the groom's caravan in real-time. Avoid delays, coordinate arrival.</p>
              </div>
              <Link href="/tools/baraat-tracker" className="mt-4 text-xs font-bold text-[#052E20] hover:underline flex items-center gap-1 font-semibold">
                Launch Tracker <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ==========================================
// 6. DISPLAYS MEGA MENU
// ==========================================
export function DisplaysMegaMenu({ useDarkText = true }: { useDarkText?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  let timeoutId: NodeJS.Timeout

  const handleMouseEnter = () => {
    clearTimeout(timeoutId)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => setIsOpen(false), 200)
  }

  return (
    <div
      className="static" // Anchors absolute position directly to relative <header>
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href="/displays"
        className={`flex items-center gap-1 text-xs xl:text-sm font-semibold transition-colors py-2 relative group ${useDarkText ? "text-[#052E20]/80 hover:text-[#052E20]" : "text-white/80 hover:text-white"
          }`}
      >
        Displays
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        <span className={`absolute bottom-1 left-0 w-0 h-[2px] transition-all group-hover:w-full ${useDarkText ? "bg-[#052E20]" : "bg-white"
          }`}></span>
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={LIGHT_MENU_CLASSES}
          >
            {/* Column 1: Cloud Broadcast */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[#052E20] border-b border-gray-100 pb-2">
                <Tv className="w-4 h-4 text-[#052E20]" />
                <h3 className="font-bold text-sm tracking-wide">Broadcasting</h3>
              </div>
              <ul className="space-y-3">
                <li><Link href="/displays" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Welcome Loop Board</Link></li>
                <li><Link href="/displays" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Candid Slideshows</Link></li>
                <li><Link href="/displays" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Event Agendas Loop</Link></li>
              </ul>
            </div>

            {/* Column 2: Wayfinding */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[#052E20] border-b border-gray-100 pb-2">
                <MapPin className="w-4 h-4 text-[#052E20]" />
                <h3 className="font-bold text-sm tracking-wide">Wayfinding</h3>
              </div>
              <ul className="space-y-3">
                <li><Link href="/displays" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Lawn Map Screens</Link></li>
                <li><Link href="/displays" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Direction Boards</Link></li>
                <li><Link href="/displays" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Valet & Parking Feeds</Link></li>
              </ul>
            </div>

            {/* Column 3: Players Setup */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[#052E20] border-b border-gray-100 pb-2">
                <Settings className="w-4 h-4 text-[#052E20]" />
                <h3 className="font-bold text-sm tracking-wide">TV Players</h3>
              </div>
              <ul className="space-y-3">
                <li><Link href="/displays" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Android TV Player</Link></li>
                <li><Link href="/displays" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Projector Cast OS</Link></li>
                <li><Link href="/displays" className="text-sm text-gray-600 hover:text-[#052E20] hover:font-medium transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#052E20] transition-colors"></span>Signage Pair Codes</Link></li>
              </ul>
            </div>

            {/* Column 4: Featured Signage */}
            <div className="flex-1 bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-rose-100 text-rose-800 text-[10px] font-extrabold rounded-full mb-3 uppercase tracking-wider">Signage OS</span>
                <h4 className="font-bold text-[#052E20] text-sm mb-1">Smart Marquee Signage</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">Turn ordinary marquee TV screens and projectors into cloud-controlled signage instantly.</p>
              </div>
              <Link href="/displays" className="mt-4 text-xs font-bold text-[#052E20] hover:underline flex items-center gap-1 font-semibold">
                Register Screens <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
