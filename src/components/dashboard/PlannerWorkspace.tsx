"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CalendarDays, Wallet, Users, CheckSquare, Plus, MoreVertical, Heart, 
  Sparkles, Gift, MapPin, Calendar, Trash2, Smartphone, Volume2, Music,
  ArrowRight, Search, Activity, Circle, CheckCircle2, IndianRupee, BellRing, Info, AlertCircle,
  ShoppingBag, QrCode, X, CheckCircle, User, Camera, MessageSquare, Phone, Video, Mic, MicOff, VideoOff, PhoneOff, Send
} from "lucide-react"
import Link from "next/link"
import { CreativeTabs } from "@/components/marketplace/CreativeTabs"
import { useLanguage } from "@/contexts/LanguageContext"

// Types
interface BudgetItem {
  id: number;
  name: string;
  allocated: number;
  spent: number;
  paymentMethod: "Raast" | "Cash";
  status: "Paid" | "Partial" | "Unpaid";
}

interface Quotation {
  id: number;
  vendorName: string;
  category: "Venue" | "Catering" | "Photography" | "Decor";
  price: number;
  details: string;
  status: "Pending" | "Approved" | "Declined";
}

interface Invoice {
  id: number;
  vendorName: string;
  item: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Unpaid";
  paymentMethod?: "Raast" | "Cash";
}

interface WeddingProfile {
  brideName: string;
  groomName: string;
  weddingDate: string;
  location: string;
  monogramInitials: string;
  accentTheme: "emerald" | "gulabi" | "midnight" | "saffron";
}

interface MemoryItem {
  id: number;
  url: string;
  title: string;
  description: string;
  likes: number;
  commentsCount: number;
  date: string;
}

interface Message {
  id: number;
  sender: "Host" | "Planner" | "System";
  text: string;
  time: string;
}

interface ActiveCall {
  type: "voice" | "video";
  status: "ringing" | "connected" | "disconnected";
  timer: number;
  isMuted?: boolean;
  isVideoOff?: boolean;
}

const DEFAULT_PROFILE: WeddingProfile = {
  brideName: "Sarah Ahmed",
  groomName: "Ahmed Ali",
  weddingDate: "2026-10-15",
  location: "Islamabad, Pakistan",
  monogramInitials: "SA",
  accentTheme: "emerald"
}

const DEFAULT_MEMORIES: MemoryItem[] = [
  { id: 301, url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600", title: "Venue Selection Day", description: "First visit to the crystal pavilion hall, absolutely breathtaking architecture!", likes: 24, commentsCount: 5, date: "June 01, 2026" },
  { id: 302, url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=600", title: "Theme Moodboard Selected", description: "Going with Royal Emerald and gold accents, fits the classic aesthetic.", likes: 42, commentsCount: 8, date: "June 05, 2026" }
]

const DEFAULT_MESSAGES: Message[] = [
  { id: 401, sender: "Planner", text: "Assalam-o-Alaikum Sarah & Ahmed! I've loaded your default wedding workspace. How can I assist you today?", time: "2:30 PM" },
  { id: 402, sender: "Host", text: "Walaikum Assalam Farhan! We've updated our budget limit and approved the videographer quote.", time: "2:35 PM" },
  { id: 403, sender: "Planner", text: "That is perfect! I saw the system synced it to your budget ledger automatically. Let me know when you are ready to review catering options.", time: "2:36 PM" }
]

const DEFAULT_QUOTATIONS: Quotation[] = [
  { id: 101, vendorName: "The Crystal Pavilion Hall", category: "Venue", price: 1500000, details: "Full Hall Booking with Basic Decor setup", status: "Pending" },
  { id: 102, vendorName: "Shahi Catering Services", category: "Catering", price: 800000, details: "Menu A: Biryani, Korma, 15 Daigs, Soft drinks", status: "Approved" },
  { id: 103, vendorName: "NEXUS Studio Videography", category: "Photography", price: 250000, details: "Candid film, 2 Photographers, Drone shots, Album", status: "Approved" },
  { id: 104, vendorName: "Crystal Florals & Decor", category: "Decor", price: 500000, details: "Imperial Rose Theme, Stage Setup & Entryway", status: "Pending" }
]

const DEFAULT_INVOICES: Invoice[] = [
  { id: 201, vendorName: "NEXUS Studio Videography", item: "20% Booking Advance", amount: 50000, dueDate: "June 15, 2026", status: "Paid", paymentMethod: "Raast" },
  { id: 202, vendorName: "Shahi Catering Services", item: "50% Catering Deposit", amount: 400000, dueDate: "June 25, 2026", status: "Unpaid" },
  { id: 203, vendorName: "The Crystal Pavilion Hall", item: "Venue Booking Deposit", amount: 500000, dueDate: "July 01, 2026", status: "Unpaid" }
]

const VENDORS_MARKETPLACE = [
  { id: 1, name: "The Crystal Pavilion Hall", category: "Venue", rating: 4.9, cost: "1,500,000", image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600", desc: "Elite glass pavilion structure with dynamic lighting in Islamabad." },
  { id: 2, name: "Shahi Catering Services", category: "Catering", rating: 4.9, cost: "800,000", image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=600", desc: "Authentic Pakistani wedding feast specialists, famous for Daig Biryani." },
  { id: 3, name: "NEXUS Studio Videography", category: "Photography", rating: 4.8, cost: "250,000", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600", desc: "Cinematic visual storytellers with elite drone and candid captures." },
  { id: 4, name: "Crystal Florals & Decor", category: "Decor", rating: 5.0, cost: "500,000", image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=600", desc: "Exquisite rose stage backdrops, fresh floral arches, and tablescapes." }
]

// Mock Data
const MOCK_TASKS = [
  { id: 1, title: "Book Grand Ballroom Venue", date: "Jan 15", category: "Priority", completed: true },
  { id: 2, title: "Finalize Catering Menu & Daig Count", date: "Feb 10", category: "Food", completed: false },
  { id: 3, title: "Pay Photographer Advance Deposit", date: "Feb 20", category: "Payment", completed: false },
  { id: 4, title: "Send Dynamic Digital Invites to Guest List", date: "Mar 01", category: "Guests", completed: false },
]

const MOCK_UPDATES = [
  { id: 1, text: "Saba Appi updated RSVP response to Attending", time: "5 mins ago", icon: "✨" },
  { id: 2, text: "New invitation link generated for Uncle Tariq", time: "1 hr ago", icon: "📩" },
  { id: 3, text: "Advance payment recorded for Floral Decorator", time: "3 hrs ago", icon: "💰" }
]

const TABS = [
  { id: "Overview", label: "Overview", icon: Sparkles },
  { id: "Digital Invites", label: "Digital Invites", icon: Gift },
  { id: "Guests", label: "Guest Ledger", icon: Users },
  { id: "Budget", label: "Budget Planner", icon: Wallet },
  { id: "Marketplace", label: "Marketplace Hub", icon: ShoppingBag },
  { id: "Profile", label: "Profile Maker", icon: User },
  { id: "Memories", label: "Memories Wall", icon: Camera },
  { id: "Comms", label: "Comms Centre", icon: MessageSquare },
  { id: "Tasks", label: "Task Board", icon: CheckSquare }
]

const PROFILE_TRANSLATIONS = {
  en: {
    profileTitle: "Wedding Profile Maker",
    profileSubtitle: "Configure couple details, date, location, and generate your bespoke monogram.",
    brideName: "Bride's Name",
    groomName: "Groom's Name",
    weddingDate: "Wedding Date",
    location: "Location / City",
    initials: "Monogram Initials (Max 3 chars)",
    accentTheme: "Bespoke Accent Theme",
    saveBtn: "Save Profile Settings",
    monogramPreview: "Live Monogram Emblem Preview",
    profileSavedToast: "Wedding profile details updated successfully! Monograms synced."
  },
  ru: {
    profileTitle: "Wedding Profile Maker",
    profileSubtitle: "Dulha, dulhan ke naam, shadi ki tareekh, aur custom monogram set krain.",
    brideName: "Dulhan Ka Naam",
    groomName: "Dulha Ka Naam",
    weddingDate: "Shadi Ki Tareekh",
    location: "Jagah / Shehar",
    initials: "Monogram Initials (Max 3 chars)",
    accentTheme: "Theme Accent Colour",
    saveBtn: "Settings Save Krain",
    monogramPreview: "Live Monogram Emblem Preview",
    profileSavedToast: "Wedding profile details kamyabi se save ho gaein! Monogram sync ho gya."
  }
}

const MEMORIES_TRANSLATIONS = {
  en: {
    wallTitle: "Memories Wall & Gallery",
    wallSubtitle: "Safeguard and capture wedding video highlights, candid photos, and event files.",
    addPhotoHeader: "Upload Wedding Highlight",
    photoUrlLabel: "Preset Image Highlight",
    titleLabel: "Moment Title",
    descLabel: "Caption / Description",
    uploadBtn: "Post to Memories Wall",
    likesLabel: "Likes",
    commentsLabel: "Comments",
    photoPlaceholder: "e.g. Catering Setup, Stage Arch, Engagement Ceremony",
    memoryAddedToast: "New wedding moment posted to your Memories Wall!"
  },
  ru: {
    wallTitle: "Memories Wall & Gallery",
    wallSubtitle: "Shadi ki videos, photos aur deegar documents ko is wall par share krain.",
    addPhotoHeader: "Naya Moment Upload Krain",
    photoUrlLabel: "Preset Image Highlight",
    titleLabel: "Moment Ka Naam",
    descLabel: "Details / Caption",
    uploadBtn: "Memories Wall Par Post Krain",
    likesLabel: "Likes",
    commentsLabel: "Comments",
    photoPlaceholder: "Jaise ke: Rings Exchange, Mehendi Decor, Stage Entrance",
    memoryAddedToast: "Naya moment kamyabi se Memories Wall par post ho gya hai!"
  }
}

const COMMS_TRANSLATIONS = {
  en: {
    commsTitle: "Communications Hub",
    commsSubtitle: "Chat with Farhan Khan, your personal advisor, or trigger instant voice/video calls.",
    chatHeader: "Advisory Chat Console",
    chatPlaceholder: "Type a message to Farhan...",
    sendBtn: "Send",
    startVoiceCall: "Start Voice Call",
    startVideoCall: "Start Video Call",
    ringing: "Ringing...",
    connected: "Connected",
    hangupBtn: "Hang Up",
    mutedText: "Muted",
    videoOffText: "Video Off",
    plannerStatus: "Farhan Khan (Senior Planner)"
  },
  ru: {
    commsTitle: "Communications Hub",
    commsSubtitle: "Personal advisor Farhan Khan se chat krain, ya instant voice/video call start krain.",
    chatHeader: "Advisory Chat Console",
    chatPlaceholder: "Farhan ko paigham likhain...",
    sendBtn: "Bhejin",
    startVoiceCall: "Voice Call Krain",
    startVideoCall: "Video Call Krain",
    ringing: "Ghanti ja rahi hai...",
    connected: "Connected",
    hangupBtn: "Call Band Krain",
    mutedText: "Mic Band",
    videoOffText: "Video Band",
    plannerStatus: "Farhan Khan (Senior Planner)"
  }
}

const MARKETPLACE_TRANSLATIONS = {
  en: {
    hubTitle: "NEXUS Elite Marketplace & Payments",
    hubSubtitle: "Connect with verified partners, manage incoming quotations, and execute direct payments.",
    filterAll: "All categories",
    filterVenue: "Venues",
    filterCatering: "Catering",
    filterPhotography: "Photography",
    filterDecor: "Decor & Stages",
    vendorsTitle: "Partner Directory",
    costLabel: "Est. Cost:",
    ratingLabel: "Rating:",
    requestQuoteBtn: "Request Custom Quote",
    quoteRequested: "Quote Request Sent!",
    quotesSection: "Received Quotations",
    invoicesSection: "Invoices & Digital Payments",
    approveBtn: "Approve Quote",
    declineBtn: "Decline",
    payBtn: "Pay Now",
    invoicePaid: "Paid",
    invoiceUnpaid: "Unpaid",
    amountLabel: "Amount",
    dueDateLabel: "Due Date",
    paymentModalTitle: "Digital Payments Gateway (Raast)",
    paymentModalDesc: "Scan the QR code or transfer the amount to the Raast ID details below.",
    raastIdLabel: "NEXUS Raast ID (IBAN):",
    confirmPaymentBtn: "Confirm Payment",
    cancelBtn: "Cancel",
    quoteSuccessToast: "Quote requested from {vendor}! They will send a customized proposal.",
    quoteApprovedToast: "Quote approved! Added to Invoices and Budget Planner allocation.",
    paymentSuccessToast: "Payment of {amount} for {vendor} confirmed! Updated invoices and Budget spent."
  },
  ru: {
    hubTitle: "NEXUS Elite Marketplace & Payments",
    hubSubtitle: "Elite partners se connect krain, proposals receive krain aur direct digital payments krain.",
    filterAll: "Tamam categories",
    filterVenue: "Venues / Hall",
    filterCatering: "Catering / Daig",
    filterPhotography: "Photography / Video",
    filterDecor: "Decor & Stages",
    vendorsTitle: "Elite Partners Directory",
    costLabel: "Takhmeenan Cost:",
    ratingLabel: "Rating:",
    requestQuoteBtn: "Quotation Mangwain",
    quoteRequested: "Request Bhej Di Gae!",
    quotesSection: "Received Proposals / Quotations",
    invoicesSection: "Invoices Aur Digital Payments",
    approveBtn: "Approve Krain",
    declineBtn: "Radd Krain",
    payBtn: "Pay Krain",
    invoicePaid: "Paid / Ada Shuda",
    invoiceUnpaid: "Unpaid / Baqaia",
    amountLabel: "Raqam",
    dueDateLabel: "Tareekh",
    paymentModalTitle: "Digital Payments Gateway (Raast)",
    paymentModalDesc: "Niche diye gaye QR Code ko scan krain ya account details par raqam transfer krain.",
    raastIdLabel: "NEXUS Raast ID (IBAN):",
    confirmPaymentBtn: "Payment Confirm Krain",
    cancelBtn: "Wapas",
    quoteSuccessToast: "{vendor} se quotation request bhej di gae hai! Wo jald proposal bhejein ge.",
    quoteApprovedToast: "Quotation approve ho chuki hai! Budget aur Invoices me add kar di gae.",
    paymentSuccessToast: "{vendor} ko {amount} ki payment confirm ho chuki hai! Invoices aur Budget kharch update ho gaye."
  }
}

const BUDGET_TRANSLATIONS = {
  en: {
    totalBudget: "Total Budget Limit",
    allocated: "Total Allocated",
    spent: "Total Spent",
    remaining: "Remaining Balance",
    overAllocationWarning: "Warning: Sum of item allocations ({allocated}) exceeds your Total Budget ({total}) by {diff}!",
    addItemHeader: "Add Expense Category",
    categoryName: "Category Name",
    allocatedAmount: "Allocated Amount",
    spentAmount: "Spent Amount",
    paymentMethod: "Payment Method",
    paymentStatus: "Payment Status",
    addBtn: "Add Expense Item",
    deleteBtn: "Delete",
    nameLabel: "Category / Expense Description",
    ledgerTitle: "Itemized Budget Ledger",
    methodLabel: "Method",
    statusLabel: "Status",
    allocationPlaceholder: "e.g. Catering, Stage Decor, Bridal Wear",
  },
  ru: {
    totalBudget: "Kul Budget Allocation",
    allocated: "Kul Allocated",
    spent: "Kul Kharch",
    remaining: "Baqaia Balance",
    overAllocationWarning: "Warning: Allocated items ka sum ({allocated}) aap ke kul budget ({total}) se {diff} zayada ho chuka hai!",
    addItemHeader: "Naya Kharch Add Krain",
    categoryName: "Kharch ki category ka naam",
    allocatedAmount: "Allocated Raqam",
    spentAmount: "Kharch ki gae Raqam",
    paymentMethod: "Payment ka Tareeqa",
    paymentStatus: "Payment Status",
    addBtn: "Kharch Add Krain",
    deleteBtn: "Hataen",
    nameLabel: "Category / Kharch Tafseel",
    ledgerTitle: "Itemized Budget Ledger",
    methodLabel: "Tareeqa",
    statusLabel: "Status",
    allocationPlaceholder: "Jaise ke Catering, Stage Decor, Dulha Attire",
  }
}

const DEFAULT_BUDGET_ITEMS: BudgetItem[] = [
  { id: 1, name: "Banquet Hall Rental & Catering", allocated: 1500000, spent: 800000, paymentMethod: "Raast", status: "Partial" },
  { id: 2, name: "Cinematography & Candid Photography", allocated: 250000, spent: 50000, paymentMethod: "Cash", status: "Partial" },
  { id: 3, name: "Decorations, Stage Setup & Visuals", allocated: 500000, spent: 350000, paymentMethod: "Raast", status: "Paid" },
]

export function PlannerWorkspace() {
  const [activeTab, setActiveTab] = useState("Overview")
  const { isRomanUrdu, setIsRomanUrdu } = useLanguage()

  // Real-time Guest list state pulled from CRM local storage
  const [guests, setGuests] = useState<{ id: any; name: string; count: number; status: string; side?: string }[]>([
    { id: 1, name: "Ali Raza & Family", count: 4, side: "Groom", status: "Attending" },
    { id: 2, name: "Sarah Ahmed", count: 1, side: "Bride", status: "Attending" },
    { id: 3, name: "Uncle Tariq", count: 2, side: "Groom", status: "Pending" },
    { id: 4, name: "Fatima Noor", count: 1, side: "Bride", status: "Declined" },
  ])

  // Stateful interactive budget variables
  const [totalBudget, setTotalBudget] = useState<number>(3000000)
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(DEFAULT_BUDGET_ITEMS)

  // Local Form state for creating custom budget expenses
  const [newItemName, setNewItemName] = useState("")
  const [newItemAllocated, setNewItemAllocated] = useState("")
  const [newItemSpent, setNewItemSpent] = useState("")
  const [newItemMethod, setNewItemMethod] = useState<"Raast" | "Cash">("Raast")
  const [newItemStatus, setNewItemStatus] = useState<"Paid" | "Partial" | "Unpaid">("Unpaid")

  // Marketplace states
  const [quotations, setQuotations] = useState<Quotation[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All")
  const [paymentModalInvoice, setPaymentModalInvoice] = useState<Invoice | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Profile Maker, Memories & Comms States
  const [weddingProfile, setWeddingProfile] = useState<WeddingProfile>(DEFAULT_PROFILE)
  const [memories, setMemories] = useState<MemoryItem[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null)

  // Memories Form states
  const [newMemoryTitle, setNewMemoryTitle] = useState("")
  const [newMemoryDesc, setNewMemoryDesc] = useState("")
  const [newMemoryUrl, setNewMemoryUrl] = useState("https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600")

  // Chat Form states
  const [newChatMessage, setNewChatMessage] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load CRM Guest List
      const storedGuests = localStorage.getItem("nexus_crm_guest_list")
      if (storedGuests) {
        try {
          setGuests(JSON.parse(storedGuests))
        } catch (e) {
          console.error(e)
        }
      }

      // Load total budget
      const storedTotal = localStorage.getItem("nexus_crm_total_budget")
      if (storedTotal) {
        const parsed = parseInt(storedTotal)
        if (!isNaN(parsed)) {
          setTotalBudget(parsed)
        }
      }

      // Load budget items
      const storedItems = localStorage.getItem("nexus_crm_budget_list")
      if (storedItems) {
        try {
          setBudgetItems(JSON.parse(storedItems))
        } catch (e) {
          console.error(e)
        }
      }

      // Load quotations
      const storedQuotes = localStorage.getItem("nexus_crm_quotations")
      if (storedQuotes) {
        try {
          setQuotations(JSON.parse(storedQuotes))
        } catch (e) {
          console.error(e)
          setQuotations(DEFAULT_QUOTATIONS)
        }
      } else {
        setQuotations(DEFAULT_QUOTATIONS)
        localStorage.setItem("nexus_crm_quotations", JSON.stringify(DEFAULT_QUOTATIONS))
      }

      // Load invoices
      const storedInvoices = localStorage.getItem("nexus_crm_invoices")
      if (storedInvoices) {
        try {
          setInvoices(JSON.parse(storedInvoices))
        } catch (e) {
          console.error(e)
          setInvoices(DEFAULT_INVOICES)
        }
      } else {
        setInvoices(DEFAULT_INVOICES)
        localStorage.setItem("nexus_crm_invoices", JSON.stringify(DEFAULT_INVOICES))
      }

      // Load Profile
      const storedProfile = localStorage.getItem("nexus_crm_wedding_profile")
      if (storedProfile) {
        try {
          setWeddingProfile(JSON.parse(storedProfile))
        } catch (e) {
          console.error(e)
          setWeddingProfile(DEFAULT_PROFILE)
        }
      } else {
        setWeddingProfile(DEFAULT_PROFILE)
        localStorage.setItem("nexus_crm_wedding_profile", JSON.stringify(DEFAULT_PROFILE))
      }

      // Load Memories Wall
      const storedMemories = localStorage.getItem("nexus_crm_memories_wall")
      if (storedMemories) {
        try {
          setMemories(JSON.parse(storedMemories))
        } catch (e) {
          console.error(e)
          setMemories(DEFAULT_MEMORIES)
        }
      } else {
        setMemories(DEFAULT_MEMORIES)
        localStorage.setItem("nexus_crm_memories_wall", JSON.stringify(DEFAULT_MEMORIES))
      }

      // Load Chat Messages
      const storedMessages = localStorage.getItem("nexus_crm_chat_messages")
      if (storedMessages) {
        try {
          setMessages(JSON.parse(storedMessages))
        } catch (e) {
          console.error(e)
          setMessages(DEFAULT_MESSAGES)
        }
      } else {
        setMessages(DEFAULT_MESSAGES)
        localStorage.setItem("nexus_crm_chat_messages", JSON.stringify(DEFAULT_MESSAGES))
      }
    }
  }, [])

  // Call active timer effect hook
  useEffect(() => {
    if (!activeCall) return
    let interval: any = null

    if (activeCall.status === "ringing") {
      interval = setTimeout(() => {
        setActiveCall(prev => prev ? { ...prev, status: "connected" } : null)
      }, 2000)
      return () => clearTimeout(interval)
    }

    if (activeCall.status === "connected") {
      interval = setInterval(() => {
        setActiveCall(prev => prev ? { ...prev, timer: prev.timer + 1 } : null)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [activeCall?.status])

  // --- Utility functions ---
  const formatPKR = (num: number) => {
    return "PKR " + new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(num)
  }

  const saveBudgetToStorage = (updatedTotal: number, updatedItems: BudgetItem[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nexus_crm_total_budget", String(updatedTotal))
      localStorage.setItem("nexus_crm_budget_list", JSON.stringify(updatedItems))
    }
  }

  // --- Dynamic Calculations ---
  const attendingCount = guests
    .filter(g => g.status.toLowerCase() === "attending" || g.status.toLowerCase() === "accept")
    .reduce((acc, curr) => acc + (curr.count || 1), 0)

  const pendingCount = guests
    .filter(g => g.status.toLowerCase() === "pending" || g.status.toLowerCase() === "none")
    .reduce((acc, curr) => acc + (curr.count || 1), 0)

  const declinedCount = guests
    .filter(g => g.status.toLowerCase() === "declined" || g.status.toLowerCase() === "regret")
    .reduce((acc, curr) => acc + (curr.count || 1), 0)

  // Real-time itemized budget calculations
  const totalAllocatedSum = budgetItems.reduce((acc, curr) => acc + curr.allocated, 0)
  const totalSpentSum = budgetItems.reduce((acc, curr) => acc + curr.spent, 0)
  const remainingBalance = totalBudget - totalSpentSum
  const isOverAllocated = totalAllocatedSum > totalBudget

  // --- Event Handlers ---
  const handleUpdateTotalBudget = (val: number) => {
    setTotalBudget(val)
    saveBudgetToStorage(val, budgetItems)
  }

  const handleAddBudgetItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItemName.trim()) return

    const allocatedNum = parseInt(newItemAllocated) || 0
    const spentNum = parseInt(newItemSpent) || 0

    const newItem: BudgetItem = {
      id: Date.now(),
      name: newItemName,
      allocated: allocatedNum,
      spent: spentNum,
      paymentMethod: newItemMethod,
      status: newItemStatus
    }

    const updated = [...budgetItems, newItem]
    setBudgetItems(updated)
    saveBudgetToStorage(totalBudget, updated)

    // Reset Form
    setNewItemName("")
    setNewItemAllocated("")
    setNewItemSpent("")
    setNewItemMethod("Raast")
    setNewItemStatus("Unpaid")
  }

  const handleDeleteBudgetItem = (id: number) => {
    const updated = budgetItems.filter(item => item.id !== id)
    setBudgetItems(updated)
    saveBudgetToStorage(totalBudget, updated)
  }

  // --- Marketplace & Financial Sync Handlers ---
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 4000)
  }

  const saveQuotationsToStorage = (updatedQuotes: Quotation[]) => {
    setQuotations(updatedQuotes)
    if (typeof window !== "undefined") {
      localStorage.setItem("nexus_crm_quotations", JSON.stringify(updatedQuotes))
    }
  }

  const saveInvoicesToStorage = (updatedInvoices: Invoice[]) => {
    setInvoices(updatedInvoices)
    if (typeof window !== "undefined") {
      localStorage.setItem("nexus_crm_invoices", JSON.stringify(updatedInvoices))
    }
  }

  const handleRequestQuote = (vendorName: string, category: string, priceText: string) => {
    const priceVal = parseInt(priceText.replace(/,/g, "")) || 300000
    
    if (quotations.some(q => q.vendorName === vendorName && q.status === "Pending")) {
      const activeDict = isRomanUrdu ? MARKETPLACE_TRANSLATIONS.ru : MARKETPLACE_TRANSLATIONS.en
      showToast(activeDict.quoteRequested)
      return
    }

    const newQuote: Quotation = {
      id: Date.now(),
      vendorName,
      category: category as any,
      price: priceVal,
      details: `Custom quote request for ${category} services`,
      status: "Pending"
    }

    const updated = [...quotations, newQuote]
    saveQuotationsToStorage(updated)

    const activeDict = isRomanUrdu ? MARKETPLACE_TRANSLATIONS.ru : MARKETPLACE_TRANSLATIONS.en
    showToast(activeDict.quoteSuccessToast.replace("{vendor}", vendorName))
  }

  const handleApproveQuote = (id: number) => {
    const quote = quotations.find(q => q.id === id)
    if (!quote) return

    const updatedQuotes = quotations.map(q => q.id === id ? { ...q, status: "Approved" as const } : q)
    saveQuotationsToStorage(updatedQuotes)

    const newInvoice: Invoice = {
      id: Date.now() + 1,
      vendorName: quote.vendorName,
      item: `${quote.category} Booking Deposit`,
      amount: Math.round(quote.price * 0.5),
      dueDate: "July 15, 2026",
      status: "Unpaid"
    }
    const updatedInvoices = [...invoices, newInvoice]
    saveInvoicesToStorage(updatedInvoices)

    const budgetName = `${quote.vendorName} (${quote.category})`
    const exists = budgetItems.some(item => item.name.toLowerCase() === budgetName.toLowerCase())
    if (!exists) {
      const newBudgetItem: BudgetItem = {
        id: Date.now() + 2,
        name: budgetName,
        allocated: quote.price,
        spent: 0,
        paymentMethod: "Raast",
        status: "Unpaid"
      }
      const updatedBudget = [...budgetItems, newBudgetItem]
      setBudgetItems(updatedBudget)
      saveBudgetToStorage(totalBudget, updatedBudget)
    }

    const activeDict = isRomanUrdu ? MARKETPLACE_TRANSLATIONS.ru : MARKETPLACE_TRANSLATIONS.en
    showToast(activeDict.quoteApprovedToast)
  }

  const handleDeclineQuote = (id: number) => {
    const updated = quotations.map(q => q.id === id ? { ...q, status: "Declined" as const } : q)
    saveQuotationsToStorage(updated)
  }

  const handleConfirmPayment = () => {
    if (!paymentModalInvoice) return

    const updatedInvoices = invoices.map(inv => 
      inv.id === paymentModalInvoice.id 
        ? { ...inv, status: "Paid" as const, paymentMethod: "Raast" as const } 
        : inv
    )
    saveInvoicesToStorage(updatedInvoices)

    const targetVendor = paymentModalInvoice.vendorName
    const amountPaid = paymentModalInvoice.amount

    const updatedBudget = budgetItems.map(item => {
      if (item.name.toLowerCase().includes(targetVendor.toLowerCase())) {
        const newSpent = Math.min(item.allocated, item.spent + amountPaid)
        const newStatus = newSpent >= item.allocated ? "Paid" : (newSpent > 0 ? "Partial" : "Unpaid")
        return {
          ...item,
          spent: newSpent,
          status: newStatus as any
        }
      }
      return item
    })

    setBudgetItems(updatedBudget)
    saveBudgetToStorage(totalBudget, updatedBudget)

    const activeDict = isRomanUrdu ? MARKETPLACE_TRANSLATIONS.ru : MARKETPLACE_TRANSLATIONS.en
    showToast(activeDict.paymentSuccessToast
      .replace("{amount}", formatPKR(amountPaid))
      .replace("{vendor}", targetVendor)
    )

    setPaymentModalInvoice(null)
  }

  // --- Profile, Memories, and Call Event Handlers ---
  const saveProfileToStorage = (updatedProfile: WeddingProfile) => {
    setWeddingProfile(updatedProfile)
    if (typeof window !== "undefined") {
      localStorage.setItem("nexus_crm_wedding_profile", JSON.stringify(updatedProfile))
    }
  }

  const saveMemoriesToStorage = (updatedMemories: MemoryItem[]) => {
    setMemories(updatedMemories)
    if (typeof window !== "undefined") {
      localStorage.setItem("nexus_crm_memories_wall", JSON.stringify(updatedMemories))
    }
  }

  const saveMessagesToStorage = (updatedMessages: Message[]) => {
    setMessages(updatedMessages)
    if (typeof window !== "undefined") {
      localStorage.setItem("nexus_crm_chat_messages", JSON.stringify(updatedMessages))
    }
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    saveProfileToStorage(weddingProfile)
    const activeDict = isRomanUrdu ? PROFILE_TRANSLATIONS.ru : PROFILE_TRANSLATIONS.en
    showToast(activeDict.profileSavedToast)
  }

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMemoryTitle.trim()) return

    const newMemory: MemoryItem = {
      id: Date.now(),
      url: newMemoryUrl,
      title: newMemoryTitle,
      description: newMemoryDesc,
      likes: 0,
      commentsCount: 0,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    }

    const updated = [newMemory, ...memories]
    saveMemoriesToStorage(updated)

    setNewMemoryTitle("")
    setNewMemoryDesc("")
    setNewMemoryUrl("https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600")

    const activeDict = isRomanUrdu ? MEMORIES_TRANSLATIONS.ru : MEMORIES_TRANSLATIONS.en
    showToast(activeDict.memoryAddedToast)
  }

  const handleLikeMemory = (id: number) => {
    const updated = memories.map(m => m.id === id ? { ...m, likes: m.likes + 1 } : m)
    saveMemoriesToStorage(updated)
  }

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newChatMessage.trim()) return

    const timeString = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    const userMsg: Message = {
      id: Date.now(),
      sender: "Host",
      text: newChatMessage,
      time: timeString
    }

    const updated = [...messages, userMsg]
    saveMessagesToStorage(updated)
    setNewChatMessage("")

    setTimeout(() => {
      const responses = isRomanUrdu ? [
        "Aap ka paigham mil gaya hai. Main budget details aur digital card verify kar raha hoon.",
        "Bilkul! Main vendor se baat kar ke aap ko update karta hoon.",
        "Mubarak ho! Sab setup bohot pyara lag raha hai. Main abhi check karta hoon."
      ] : [
        "I have received your message. I am currently cross-referencing your budget allocations.",
        "Understood. Let me contact the vendor immediately and get back to you.",
        "Excellent! Everything is lining up beautifully. Let me check the guests roster."
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      const replyTime = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
      const replyMsg: Message = {
        id: Date.now() + 1,
        sender: "Planner",
        text: randomResponse,
        time: replyTime
      }
      
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("nexus_crm_chat_messages")
        let currentMsgs = stored ? JSON.parse(stored) : []
        const newTrail = [...currentMsgs, replyMsg]
        saveMessagesToStorage(newTrail)
      }
    }, 1500)
  }

  const handleStartCall = (type: "voice" | "video") => {
    const callObj: ActiveCall = {
      type,
      status: "ringing",
      timer: 0,
      isMuted: false,
      isVideoOff: false
    }
    setActiveCall(callObj)
  }

  // --- Views Renderer ---

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. Quick Progress Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
        
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-rose-100/60 shadow-lg shadow-rose-950/5 flex items-center gap-4 hover:shadow-xl hover:scale-[1.01] transition-all">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 font-serif italic text-lg font-bold">💍</div>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#5E6460] block">Days Remaining</span>
            <span className="text-xl font-black text-rose-950">132 Days</span>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-rose-100/60 shadow-lg shadow-rose-950/5 flex items-center gap-4 hover:shadow-xl hover:scale-[1.01] transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 text-lg">🌸</div>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#5E6460] block">Attending Guests</span>
            <span className="text-xl font-black text-emerald-950">{attendingCount} Confirmed</span>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-rose-100/60 shadow-lg shadow-rose-950/5 flex items-center gap-4 hover:shadow-xl hover:scale-[1.01] transition-all">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 text-lg">💰</div>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#5E6460] block">Budget Used</span>
            <span className="text-xl font-black text-amber-950">
              {(totalSpentSum / 1000000).toFixed(2)}M / {(totalBudget / 1000000).toFixed(1)}M
            </span>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-rose-100/60 shadow-lg shadow-rose-950/5 flex items-center gap-4 hover:shadow-xl hover:scale-[1.01] transition-all">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 text-lg">📌</div>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#5E6460] block">Pending Tasks</span>
            <span className="text-xl font-black text-purple-950">3 Checklists</span>
          </div>
        </div>

      </div>

      {/* 2. Main Workspace Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Summary Card Details (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white/95 rounded-3xl p-6 border border-rose-100/70 shadow-lg shadow-rose-950/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-rose-50 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex justify-between items-center border-b border-rose-50 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">💖</span>
                <h3 className="font-serif italic font-bold text-lg text-rose-950">Planning Summary</h3>
              </div>
              <span className="text-[9px] bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                {weddingProfile.brideName} & {weddingProfile.groomName}
              </span>
            </div>

            <p className="text-xs text-[#5E6460] leading-relaxed mb-6 font-medium">
              Congratulations on your upcoming celebration! Plan your days, configure custom invites, and track guest RSVPs with NEXUS.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
              <div className="bg-rose-50/40 border border-rose-100/40 p-4 rounded-2xl text-center">
                <span className="block text-2xl font-black text-rose-950">{attendingCount}</span>
                <span className="text-[9px] text-[#5E6460] font-bold uppercase tracking-widest block mt-1">Confirmed</span>
              </div>
              <div className="bg-amber-50/40 border border-amber-100/40 p-4 rounded-2xl text-center">
                <span className="block text-2xl font-black text-amber-700">{pendingCount}</span>
                <span className="text-[9px] text-[#5E6460] font-bold uppercase tracking-widest block mt-1">Pending</span>
              </div>
              <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl text-center">
                <span className="block text-2xl font-black text-slate-700">{declinedCount}</span>
                <span className="text-[9px] text-[#5E6460] font-bold uppercase tracking-widest block mt-1">Declined</span>
              </div>
            </div>

            <button 
              onClick={() => setActiveTab("Digital Invites")}
              className="w-full bg-[#7D1D3F] hover:bg-[#63142F] text-white py-3 rounded-2xl text-xs font-bold transition-all shadow-md mt-4 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Configure Digital Invitations
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Real-time CRM Sync Logs */}
          <div className="bg-white/95 rounded-3xl p-6 border border-rose-100/70 shadow-lg shadow-rose-950/5">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-rose-500 animate-pulse" />
              <h3 className="font-serif italic font-bold text-md text-rose-950">Real-time Guest Sync CRM Logs</h3>
            </div>
            
            <div className="space-y-3">
              {MOCK_UPDATES.map((update) => (
                <div key={update.id} className="flex gap-3 items-center text-xs font-medium border-b border-rose-50 pb-2.5 last:border-0 last:pb-0">
                  <span className="text-lg bg-rose-50 rounded-lg p-1">{update.icon}</span>
                  <div className="flex-1 leading-tight">
                    <p className="text-rose-950 font-bold">{update.text}</p>
                    <span className="text-[9px] text-slate-400 block mt-0.5">{update.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Quick Tools Grid (5 columns) */}
        <div className="lg:col-span-5 space-y-6 w-full">
          
          <div className="bg-white/95 rounded-3xl p-6 border border-rose-100/70 shadow-lg shadow-rose-950/5">
            <h3 className="font-serif italic font-bold text-md text-rose-950 mb-4 flex items-center gap-1.5">
              <span>🛠️</span> Integrated Wedding Tools
            </h3>

            <div className="grid grid-cols-2 gap-3.5">
              
              <Link href="/tools/mehndi-designer" className="bg-[#FFF7F9] border border-rose-100/70 hover:border-rose-300 p-3.5 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between items-start text-left min-h-[110px]">
                <span className="text-lg mb-2">✨</span>
                <div>
                  <h4 className="text-xs font-extrabold text-rose-950 block">Mehndi Designer</h4>
                  <span className="text-[8px] text-[#5E6460] mt-0.5 block leading-tight font-semibold">AI Henna Preview</span>
                </div>
              </Link>

              <Link href="/tools/shaadi-beats" className="bg-[#FFF9F5] border border-amber-100/70 hover:border-amber-300 p-3.5 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between items-start text-left min-h-[110px]">
                <span className="text-lg mb-2">🥁</span>
                <div>
                  <h4 className="text-xs font-extrabold text-amber-950 block">Shaadi Beats</h4>
                  <span className="text-[8px] text-[#5E6460] mt-0.5 block leading-tight font-semibold">Dholki Playlist</span>
                </div>
              </Link>

              <Link href="/dashboard/planner/salami" className="bg-[#F5FFF9] border border-emerald-100/70 hover:border-emerald-300 p-3.5 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between items-start text-left min-h-[110px]">
                <span className="text-lg mb-2">✉️</span>
                <div>
                  <h4 className="text-xs font-extrabold text-emerald-950 block">Salami Tracker</h4>
                  <span className="text-[8px] text-[#5E6460] mt-0.5 block leading-tight font-semibold">Digital Ledgers</span>
                </div>
              </Link>

              <Link href="/tools/daig-calculator" className="bg-[#FFF5F5] border border-red-100/70 hover:border-red-300 p-3.5 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between items-start text-left min-h-[110px]">
                <span className="text-lg mb-2">🍲</span>
                <div>
                  <h4 className="text-xs font-extrabold text-red-950 block">Daig Calculator</h4>
                  <span className="text-[8px] text-[#5E6460] mt-0.5 block leading-tight font-semibold">AI Food Estimations</span>
                </div>
              </Link>

              <Link href="/tools/baraat-tracker" className="bg-[#F5F9FF] border border-blue-100/70 hover:border-blue-300 p-3.5 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between items-start text-left min-h-[110px] col-span-2">
                <div className="flex justify-between items-center w-full">
                  <span className="text-lg">🚗</span>
                  <span className="text-[7px] bg-blue-100 text-blue-800 font-extrabold uppercase px-1.5 py-0.5 rounded">Live Map</span>
                </div>
                <div className="mt-2">
                  <h4 className="text-xs font-extrabold text-blue-950 block">Baraat Arrival Live GPS Tracker</h4>
                  <span className="text-[8px] text-[#5E6460] mt-0.5 block leading-tight font-semibold">Share dynamic location status directly on guest cards</span>
                </div>
              </Link>

            </div>
          </div>

        </div>

      </div>

    </div>
  )

  const renderGuests = () => (
    <div className="bg-white/95 rounded-3xl border border-rose-100/70 shadow-lg shadow-rose-950/5 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 border-b border-rose-100/50 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-rose-50/20 gap-4">
        <div>
          <h3 className="font-serif italic font-bold text-lg text-rose-950">Guest Ledger Management</h3>
          <p className="text-[10px] text-slate-500 font-medium">B2C Invite RSVPs automatically sync to this B2B Host guest list ledger</p>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Link href="/invite/sarah-ahmed-valima" target="_blank" className="flex-1 sm:flex-none">
            <button className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 px-4 py-2.5 rounded-xl border border-rose-200 font-bold text-xs transition-all cursor-pointer">
              ✨ Invite Live View
            </button>
          </Link>
          <button className="flex-1 sm:flex-none bg-[#7D1D3F] hover:bg-[#63142F] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer">
            <Plus className="w-4 h-4"/> Add Guest
          </button>
        </div>
      </div>

      {/* List controls */}
      <div className="p-4 bg-slate-50/50 border-b border-rose-100/20 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1.5 sm:pb-0">
          {["All", "Attending", "Pending", "Declined"].map((st) => (
            <button
              key={st}
              className="px-3.5 py-1.5 bg-white border border-rose-100/60 hover:bg-rose-50/30 rounded-lg text-[10px] font-extrabold text-[#5E6460] transition-colors cursor-pointer"
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search mehmaan list..." 
            className="w-full bg-white border border-rose-100/60 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500/25"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="text-[10px] text-rose-950/70 uppercase bg-rose-50/30 font-bold border-b border-rose-100/30">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Side / Party</th>
              <th className="px-6 py-4">+1s</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rose-50/30 font-sans">
            {guests.map((guest, i) => (
              <tr key={i} className="hover:bg-rose-50/10 transition-colors">
                <td className="px-6 py-4 font-bold text-rose-950">{guest.name}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border ${
                    guest.status.toLowerCase() === "attending" || guest.status.toLowerCase() === "accept" 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                      : guest.status.toLowerCase() === "pending" || guest.status.toLowerCase() === "none" 
                      ? "bg-amber-50 text-amber-700 border-amber-200" 
                      : "bg-rose-50 text-rose-700 border-rose-200"
                  }`}>
                    {guest.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-slate-600">{guest.side || "Groom"}</td>
                <td className="px-6 py-4 font-bold text-[#5E6460]">{guest.count > 1 ? `+${guest.count - 1}` : '—'}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[#5E6460]/40 hover:text-rose-950 p-1.5"><MoreVertical className="w-4 h-4"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderTasks = () => (
    <div className="bg-white/95 rounded-3xl border border-rose-100/70 shadow-lg shadow-rose-950/5 p-6 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-serif italic font-bold text-lg text-rose-950">To-Do Checklist</h3>
          <p className="text-[10px] text-slate-500 font-medium">Keep track of priority arrangements, payments, and catering timelines</p>
        </div>
        <button className="text-rose-700 font-bold text-xs bg-rose-50 hover:bg-rose-100/60 px-4 py-2.5 rounded-xl border border-rose-100 transition-colors cursor-pointer">
          Add Task
        </button>
      </div>

      <div className="space-y-3">
        {MOCK_TASKS.map(task => (
          <div key={task.id} className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${task.completed ? "border-rose-100/40 bg-rose-50/10" : "border-rose-100/60 hover:border-rose-300 bg-white"}`}>
            <div className="flex items-center gap-4">
              <button className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors border-2 cursor-pointer ${task.completed ? "bg-rose-500 text-white border-rose-500" : "border-rose-200"}`}>
                {task.completed && <CheckSquare className="w-4 h-4 text-white"/>}
              </button>
              <div>
                <p className={`font-bold text-xs sm:text-sm ${task.completed ? "text-slate-400 line-through" : "text-rose-950"}`}>{task.title}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-[9px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-bold uppercase">Due: {task.date}</span>
                  <span className="text-[9px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold uppercase">{task.category}</span>
                </div>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-700 p-1"><MoreVertical className="w-4 h-4"/></button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderBudget = () => {
    const activeDict = isRomanUrdu ? BUDGET_TRANSLATIONS.ru : BUDGET_TRANSLATIONS.en

    // Dynamically replace warning placeholders
    const getWarningMessage = () => {
      const diffVal = totalAllocatedSum - totalBudget
      return activeDict.overAllocationWarning
        .replace("{allocated}", formatPKR(totalAllocatedSum))
        .replace("{total}", formatPKR(totalBudget))
        .replace("{diff}", formatPKR(diffVal))
    }

    return (
      <div className="bg-white/95 rounded-3xl border border-rose-100/70 shadow-lg shadow-rose-950/5 p-6 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
        
        {/* Total Budget Allocation limit editor */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-rose-50 pb-4">
          <div className="space-y-1 text-left">
            <h3 className="font-serif italic font-bold text-lg text-rose-950">{activeDict.totalBudget}</h3>
            <p className="text-[10px] text-slate-500 font-medium">Edit the total allocated ceiling for your wedding expenses</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-rose-900 uppercase">PKR:</span>
            <input 
              type="number"
              value={totalBudget}
              onChange={(e) => handleUpdateTotalBudget(parseInt(e.target.value) || 0)}
              className="bg-white border-2 border-rose-100 focus:border-rose-300 rounded-xl px-4 py-2 text-xs text-rose-950 font-bold outline-none w-full sm:w-48 shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Over Allocation Warning alert banner */}
        {isOverAllocated && (
          <div className="bg-rose-50 border-2 border-rose-200 text-rose-800 p-4 rounded-2xl text-xs font-bold leading-relaxed flex items-start gap-2.5 shadow-sm text-left">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <p>{getWarningMessage()}</p>
          </div>
        )}

        {/* Dynamic calculation summary status grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="bg-rose-50/20 p-5 rounded-2xl border border-rose-100 text-left">
            <p className="text-[10px] font-bold text-rose-800 uppercase tracking-widest mb-1">{activeDict.allocated}</p>
            <p className="text-xl font-black text-rose-950">{formatPKR(totalAllocatedSum)}</p>
          </div>
          <div className="bg-emerald-50/20 p-5 rounded-2xl border border-emerald-100 text-left">
            <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest mb-1">{activeDict.spent}</p>
            <p className="text-xl font-black text-[#0F5B3E]">{formatPKR(totalSpentSum)}</p>
          </div>
          <div className="bg-amber-50/20 p-5 rounded-2xl border border-amber-100 text-left">
            <p className="text-[10px] font-bold text-amber-800 uppercase tracking-widest mb-1">{activeDict.remaining}</p>
            <p className={`text-xl font-black ${remainingBalance < 0 ? "text-rose-600" : "text-amber-700"}`}>
              {formatPKR(remainingBalance)}
            </p>
          </div>
        </div>

        {/* Overall progress gauge line */}
        <div className="space-y-2 text-left font-sans">
          <div className="flex justify-between text-xs font-bold text-slate-600">
            <span>Spent vs Allocation Progress Ratio</span>
            <span>{totalBudget > 0 ? Math.round((totalSpentSum / totalBudget) * 100) : 0}%</span>
          </div>
          <div className="w-full h-3 bg-rose-50 border border-rose-100/40 rounded-full overflow-hidden relative">
            {/* Allocation Ratio Bar */}
            <div 
              className="absolute top-0 bottom-0 left-0 bg-rose-200/50 rounded-full" 
              style={{ width: `${Math.min(100, totalBudget > 0 ? (totalAllocatedSum / totalBudget) * 100 : 0)}%` }} 
            />
            {/* Spent Ratio Bar */}
            <div 
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-rose-500 to-[#7D1D3F] rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, totalBudget > 0 ? (totalSpentSum / totalBudget) * 100 : 0)}%` }} 
            />
          </div>
          <span className="text-[9px] text-slate-400 block leading-tight">Darker bar indicates spent balance; lighter backdrop indicates allocated category funds.</span>
        </div>

        {/* Form area: Add expense item details */}
        <form onSubmit={handleAddBudgetItem} className="bg-rose-50/10 border-2 border-rose-100/50 rounded-3xl p-5 space-y-4 text-left">
          <h4 className="font-serif italic font-bold text-md text-rose-950 flex items-center gap-1">
            <Plus className="w-4 h-4 text-[#7D1D3F]" />
            {activeDict.addItemHeader}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5 text-xs font-bold">
            
            <div className="md:col-span-2 space-y-1.5">
              <span className="text-[#5E6460] block">{activeDict.categoryName}</span>
              <input 
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder={activeDict.allocationPlaceholder}
                className="w-full bg-white border border-rose-100 rounded-xl px-3.5 py-2.5 font-semibold placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <span className="text-[#5E6460] block">{activeDict.allocatedAmount}</span>
              <input 
                type="number"
                value={newItemAllocated}
                onChange={(e) => setNewItemAllocated(e.target.value)}
                placeholder="e.g. 500000"
                className="w-full bg-white border border-rose-100 rounded-xl px-3.5 py-2.5 font-semibold placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <span className="text-[#5E6460] block">{activeDict.spentAmount}</span>
              <input 
                type="number"
                value={newItemSpent}
                onChange={(e) => setNewItemSpent(e.target.value)}
                placeholder="e.g. 300000"
                className="w-full bg-white border border-rose-100 rounded-xl px-3.5 py-2.5 font-semibold placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <span className="text-[#5E6460] block">{activeDict.paymentMethod}</span>
              <select 
                value={newItemMethod}
                onChange={(e) => setNewItemMethod(e.target.value as any)}
                className="w-full bg-white border border-rose-100 rounded-xl px-3 py-2.5 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="Raast">Raast (IBAN)</option>
                <option value="Cash">Cash on Site</option>
              </select>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#5E6460]">{activeDict.paymentStatus}:</span>
              <div className="flex gap-2">
                {(["Paid", "Partial", "Unpaid"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setNewItemStatus(st)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-extrabold tracking-wider border transition-all cursor-pointer ${
                      newItemStatus === st 
                        ? "bg-[#7D1D3F] border-[#7D1D3F] text-white" 
                        : "bg-white border-rose-100 text-rose-900/60"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              disabled={!newItemName.trim()}
              className="bg-[#0F5B3E] hover:bg-[#0A422D] text-white disabled:opacity-50 disabled:hover:bg-[#0F5B3E] font-bold text-xs py-2.5 px-5 rounded-xl transition-all shadow-md cursor-pointer select-none"
            >
              {activeDict.addBtn}
            </button>
          </div>

        </form>

        {/* Itemized Budget Ledger table list */}
        <div className="space-y-3">
          <h4 className="font-serif italic font-bold text-md text-rose-950 text-left">{activeDict.ledgerTitle}</h4>
          
          <div className="overflow-x-auto rounded-3xl border border-rose-100/60 shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="text-[10px] text-rose-950/70 uppercase bg-rose-50/30 font-bold border-b border-rose-100/30">
                <tr>
                  <th className="px-6 py-4">{activeDict.nameLabel}</th>
                  <th className="px-6 py-4">Allocated</th>
                  <th className="px-6 py-4">Spent</th>
                  <th className="px-6 py-4">{activeDict.methodLabel}</th>
                  <th className="px-6 py-4">{activeDict.statusLabel}</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-50/20 font-sans">
                {budgetItems.map((item) => (
                  <tr key={item.id} className="hover:bg-rose-50/10 transition-colors">
                    <td className="px-6 py-4 font-bold text-rose-950">{item.name}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{formatPKR(item.allocated)}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{formatPKR(item.spent)}</td>
                    <td className="px-6 py-4">
                      <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-black uppercase">
                        {item.paymentMethod}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${
                        item.status === "Paid" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                          : item.status === "Partial" 
                          ? "bg-amber-50 text-amber-700 border-amber-200" 
                          : "bg-rose-50 text-rose-700 border-rose-200"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDeleteBudgetItem(item.id)}
                        className="text-rose-900/40 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                        title={activeDict.deleteBtn}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    )
  }

  const renderMarketplace = () => {
    const activeDict = isRomanUrdu ? MARKETPLACE_TRANSLATIONS.ru : MARKETPLACE_TRANSLATIONS.en
    const categories = ["All", "Venue", "Catering", "Photography", "Decor"]

    const filteredVendors = selectedCategoryFilter === "All"
      ? VENDORS_MARKETPLACE
      : VENDORS_MARKETPLACE.filter(v => v.category.toLowerCase() === selectedCategoryFilter.toLowerCase())

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
        
        <div className="bg-white/95 rounded-3xl p-6 border border-rose-100/70 shadow-lg shadow-rose-950/5 text-left font-sans">
          <div className="space-y-1">
            <h3 className="font-serif italic font-bold text-lg text-rose-950">{activeDict.hubTitle}</h3>
            <p className="text-xs text-[#5E6460] leading-relaxed font-medium">
              {activeDict.hubSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-rose-50">
            {categories.map((cat) => {
              const labelMap = {
                All: activeDict.filterAll,
                Venue: activeDict.filterVenue,
                Catering: activeDict.filterCatering,
                Photography: activeDict.filterPhotography,
                Decor: activeDict.filterDecor
              }
              const label = labelMap[cat as keyof typeof labelMap] || cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategoryFilter === cat 
                      ? "bg-[#7D1D3F] text-white shadow-sm" 
                      : "bg-rose-50/50 hover:bg-rose-50 text-rose-900/60 border border-rose-100/30"
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white/95 rounded-3xl p-6 border border-rose-100/70 shadow-lg shadow-rose-950/5 text-left font-sans">
              <h4 className="font-serif italic font-bold text-md text-rose-950 mb-4">{activeDict.vendorsTitle}</h4>
              
              <div className="space-y-4">
                {filteredVendors.map((vendor) => {
                  const hasPending = quotations.some(q => q.vendorName === vendor.name && q.status === "Pending")
                  const hasApproved = quotations.some(q => q.vendorName === vendor.name && q.status === "Approved")
                  return (
                    <div key={vendor.id} className="bg-rose-50/10 border border-rose-100/40 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:shadow-md transition-shadow">
                      <img 
                        src={vendor.image} 
                        alt={vendor.name}
                        className="w-full sm:w-24 h-20 object-cover rounded-xl border border-rose-100/30 shadow-sm"
                      />
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <h5 className="font-bold text-xs sm:text-sm text-rose-950">{vendor.name}</h5>
                          <span className="text-[9px] bg-rose-100/60 text-rose-800 px-2 py-0.5 rounded font-black uppercase">
                            {vendor.category}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-tight font-medium">{vendor.desc}</p>
                        
                        <div className="flex items-center gap-3 pt-2 text-[10px] font-bold text-[#5E6460]">
                          <span>{activeDict.ratingLabel} <span className="text-amber-500">★ {vendor.rating}</span></span>
                          <span>{activeDict.costLabel} <span className="text-rose-950 font-black">{formatPKR(parseInt(vendor.cost.replace(/,/g, "")))}</span></span>
                        </div>
                      </div>

                      <div className="w-full sm:w-auto self-stretch sm:self-auto flex items-end sm:items-center">
                        <button
                          disabled={hasPending || hasApproved}
                          onClick={() => handleRequestQuote(vendor.name, vendor.category, vendor.cost)}
                          className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-[10px] transition-all cursor-pointer text-center select-none shadow-sm ${
                            hasApproved 
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : hasPending
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-[#7D1D3F] hover:bg-[#63142F] text-white"
                          }`}
                        >
                          {hasApproved 
                            ? "Connected"
                            : hasPending 
                            ? activeDict.quoteRequested 
                            : activeDict.requestQuoteBtn}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white/95 rounded-3xl p-6 border border-rose-100/70 shadow-lg shadow-rose-950/5 text-left font-sans">
              <h4 className="font-serif italic font-bold text-md text-rose-950 mb-4">{activeDict.quotesSection}</h4>
              
              <div className="space-y-3">
                {quotations.map((quote) => (
                  <div key={quote.id} className="border border-rose-100/40 rounded-xl p-3.5 space-y-3 bg-white hover:border-rose-200 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-bold text-xs text-rose-950">{quote.vendorName}</h5>
                        <span className="text-[9px] text-[#5E6460] font-bold block">{quote.details}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                        quote.status === "Approved" 
                          ? "bg-emerald-50 text-emerald-700" 
                          : quote.status === "Declined" 
                          ? "bg-rose-50 text-rose-700" 
                          : "bg-amber-50 text-amber-700"
                      }`}>
                        {quote.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-rose-50/50">
                      <span className="text-[10px] font-black text-rose-950">{formatPKR(quote.price)}</span>
                      
                      {quote.status === "Pending" && (
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleApproveQuote(quote.id)}
                            className="bg-[#0F5B3E] hover:bg-[#0A422D] text-white px-2.5 py-1.5 rounded-lg text-[9px] font-bold transition-all cursor-pointer"
                          >
                            {activeDict.approveBtn}
                          </button>
                          <button
                            onClick={() => handleDeclineQuote(quote.id)}
                            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-2.5 py-1.5 rounded-lg text-[9px] font-bold transition-all cursor-pointer"
                          >
                            {activeDict.declineBtn}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/95 rounded-3xl p-6 border border-rose-100/70 shadow-lg shadow-rose-950/5 text-left font-sans">
              <h4 className="font-serif italic font-bold text-md text-rose-950 mb-4">{activeDict.invoicesSection}</h4>
              
              <div className="space-y-3">
                {invoices.map((inv) => (
                  <div key={inv.id} className="border border-rose-100/40 rounded-xl p-3.5 space-y-2 bg-white flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <h5 className="font-bold text-xs text-rose-950">{inv.vendorName}</h5>
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${
                          inv.status === "Paid" 
                            ? "bg-emerald-50 text-emerald-700" 
                            : "bg-rose-50 text-rose-700"
                        }`}>
                          {inv.status === "Paid" ? activeDict.invoicePaid : activeDict.invoiceUnpaid}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-bold leading-none">{inv.item}</p>
                      <span className="text-[8px] text-slate-400 block mt-0.5">{activeDict.dueDateLabel}: {inv.dueDate}</span>
                    </div>

                    <div className="text-right space-y-2">
                      <span className="block font-black text-xs text-rose-950">{formatPKR(inv.amount)}</span>
                      {inv.status === "Unpaid" && (
                        <button
                          onClick={() => setPaymentModalInvoice(inv)}
                          className="bg-[#0F5B3E] hover:bg-[#0A422D] text-white px-3 py-1.5 rounded-lg text-[9px] font-bold transition-all cursor-pointer shadow-sm select-none"
                        >
                          {activeDict.payBtn}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    )
  }

  const renderProfileMaker = () => {
    const activeDict = isRomanUrdu ? PROFILE_TRANSLATIONS.ru : PROFILE_TRANSLATIONS.en
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
        <div className="bg-white/95 rounded-3xl p-6 border border-rose-100/70 shadow-lg shadow-rose-950/5 text-left font-sans">
          <div className="space-y-1">
            <h3 className="font-serif italic font-bold text-lg text-rose-950">{activeDict.profileTitle}</h3>
            <p className="text-xs text-[#5E6460] leading-relaxed font-medium">
              {activeDict.profileSubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <form onSubmit={handleSaveProfile} className="lg:col-span-7 bg-white/95 rounded-3xl p-6 border border-rose-100/70 shadow-lg shadow-rose-950/5 text-left font-sans space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-xs font-bold text-[#5E6460]">
                <label className="block">{activeDict.brideName}</label>
                <input
                  type="text"
                  value={weddingProfile.brideName}
                  onChange={(e) => setWeddingProfile({ ...weddingProfile, brideName: e.target.value })}
                  className="w-full bg-slate-50 border border-rose-100 rounded-xl px-3.5 py-2.5 font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500/25"
                  required
                />
              </div>

              <div className="space-y-1.5 text-xs font-bold text-[#5E6460]">
                <label className="block">{activeDict.groomName}</label>
                <input
                  type="text"
                  value={weddingProfile.groomName}
                  onChange={(e) => setWeddingProfile({ ...weddingProfile, groomName: e.target.value })}
                  className="w-full bg-slate-50 border border-rose-100 rounded-xl px-3.5 py-2.5 font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500/25"
                  required
                />
              </div>

              <div className="space-y-1.5 text-xs font-bold text-[#5E6460]">
                <label className="block">{activeDict.weddingDate}</label>
                <input
                  type="date"
                  value={weddingProfile.weddingDate}
                  onChange={(e) => setWeddingProfile({ ...weddingProfile, weddingDate: e.target.value })}
                  className="w-full bg-slate-50 border border-rose-100 rounded-xl px-3.5 py-2.5 font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500/25"
                  required
                />
              </div>

              <div className="space-y-1.5 text-xs font-bold text-[#5E6460]">
                <label className="block">{activeDict.location}</label>
                <input
                  type="text"
                  value={weddingProfile.location}
                  onChange={(e) => setWeddingProfile({ ...weddingProfile, location: e.target.value })}
                  className="w-full bg-slate-50 border border-rose-100 rounded-xl px-3.5 py-2.5 font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500/25"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5 text-xs font-bold text-[#5E6460]">
                <label className="block">{activeDict.initials}</label>
                <input
                  type="text"
                  maxLength={3}
                  value={weddingProfile.monogramInitials}
                  onChange={(e) => setWeddingProfile({ ...weddingProfile, monogramInitials: e.target.value.toUpperCase() })}
                  className="w-full bg-slate-50 border border-rose-100 rounded-xl px-3.5 py-2.5 font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500/25"
                  required
                />
              </div>

              <div className="space-y-1.5 text-xs font-bold text-[#5E6460]">
                <label className="block">{activeDict.accentTheme}</label>
                <select
                  value={weddingProfile.accentTheme}
                  onChange={(e) => setWeddingProfile({ ...weddingProfile, accentTheme: e.target.value as any })}
                  className="w-full bg-slate-50 border border-rose-100 rounded-xl px-3 py-2.5 font-semibold focus:outline-none focus:ring-1 focus:ring-rose-500/25 cursor-pointer"
                >
                  <option value="emerald">Royal Emerald & Gold</option>
                  <option value="gulabi">Rose Pink & Champagne</option>
                  <option value="midnight">Midnight Blue & Silver</option>
                  <option value="saffron">Golden Saffron & Cream</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-rose-50 flex justify-end">
              <button
                type="submit"
                className="bg-[#0F5B3E] hover:bg-[#0A422D] text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-all shadow-md cursor-pointer select-none"
              >
                {activeDict.saveBtn}
              </button>
            </div>
          </form>

          <div className="lg:col-span-5 bg-white/95 rounded-3xl p-6 border border-rose-100/70 shadow-lg shadow-rose-950/5 text-center font-sans space-y-6">
            <h4 className="font-serif italic font-bold text-md text-rose-950">{activeDict.monogramPreview}</h4>
            
            <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-tr from-[#4A0E17]/5 via-[#7D1D3F]/5 to-[#0A3D2A]/5 rounded-2xl border border-rose-100/50 shadow-inner relative overflow-hidden min-h-[260px]">
              <div className="absolute inset-4 border border-amber-300/40 rounded-xl pointer-events-none" />
              
              <div className="w-24 h-24 rounded-full border-4 border-double border-amber-400/80 flex items-center justify-center bg-white shadow-md z-10 transform hover:scale-105 transition-transform duration-300">
                <span className="text-3xl font-serif italic font-black text-amber-600 tracking-tighter">
                  {weddingProfile.monogramInitials || "SA"}
                </span>
              </div>

              <h5 className="font-serif italic font-bold text-lg text-rose-950 mt-6 z-10 leading-snug">
                {weddingProfile.brideName || "Sarah"} &amp; {weddingProfile.groomName || "Ahmed"}
              </h5>

              <div className="space-y-1 mt-2 z-10 text-[10px] text-[#5E6460] font-bold uppercase tracking-wider">
                <p className="flex items-center justify-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-500" />
                  {weddingProfile.weddingDate || "2026-10-15"}
                </p>
                <p className="flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-500" />
                  {weddingProfile.location || "Islamabad, Pakistan"}
                </p>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 font-medium leading-relaxed">
              This digital monogram emblem will update your guest invitations, header banners, and dynamic B2C RSVP interfaces instantly.
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderMemoriesWall = () => {
    const activeDict = isRomanUrdu ? MEMORIES_TRANSLATIONS.ru : MEMORIES_TRANSLATIONS.en
    const PRESETS = [
      { name: "Pavilion Venue", url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600" },
      { name: "Gold Stage Decor", url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=600" },
      { name: "Catering Festivities", url: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=600" },
      { name: "Rings Exchange", url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600" }
    ]

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
        <div className="bg-white/95 rounded-3xl p-6 border border-rose-100/70 shadow-lg shadow-rose-950/5 text-left font-sans">
          <div className="space-y-1">
            <h3 className="font-serif italic font-bold text-lg text-rose-950">{activeDict.wallTitle}</h3>
            <p className="text-xs text-[#5E6460] leading-relaxed font-medium">
              {activeDict.wallSubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <form onSubmit={handleAddMemory} className="lg:col-span-5 bg-white/95 rounded-3xl p-6 border border-rose-100/70 shadow-lg shadow-rose-950/5 text-left font-sans space-y-4">
            <h4 className="font-serif italic font-bold text-md text-rose-950">{activeDict.addPhotoHeader}</h4>

            <div className="space-y-1.5 text-xs font-bold text-[#5E6460]">
              <label className="block">{activeDict.titleLabel}</label>
              <input
                type="text"
                placeholder={activeDict.photoPlaceholder}
                value={newMemoryTitle}
                onChange={(e) => setNewMemoryTitle(e.target.value)}
                className="w-full bg-slate-50 border border-rose-100 rounded-xl px-3.5 py-2.5 font-semibold placeholder:text-slate-400 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1.5 text-xs font-bold text-[#5E6460]">
              <label className="block">{activeDict.descLabel}</label>
              <textarea
                rows={2}
                value={newMemoryDesc}
                onChange={(e) => setNewMemoryDesc(e.target.value)}
                className="w-full bg-slate-50 border border-rose-100 rounded-xl px-3.5 py-2 font-semibold placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            <div className="space-y-2 text-xs font-bold text-[#5E6460]">
              <label className="block">{activeDict.photoUrlLabel}</label>
              <div className="grid grid-cols-2 gap-2">
                {PRESETS.map((preset) => {
                  const isSelected = newMemoryUrl === preset.url
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setNewMemoryUrl(preset.url)}
                      className={`relative rounded-xl overflow-hidden border-2 h-14 transition-all cursor-pointer ${
                        isSelected ? "border-[#7D1D3F]" : "border-rose-100/50 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/45 flex items-center justify-center text-[8px] font-black text-white p-1 text-center">
                        {preset.name}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!newMemoryTitle.trim()}
                className="w-full bg-[#0F5B3E] hover:bg-[#0A422D] disabled:opacity-50 disabled:hover:bg-[#0F5B3E] text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md cursor-pointer select-none text-center"
              >
                {activeDict.uploadBtn}
              </button>
            </div>
          </form>

          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {memories.map((item) => (
                <div key={item.id} className="bg-white/95 rounded-3xl border border-rose-100/60 shadow-md overflow-hidden flex flex-col font-sans hover:shadow-lg transition-shadow">
                  <div className="h-40 relative">
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 right-2.5 bg-black/55 backdrop-blur-md px-2 py-0.5 rounded text-[8px] text-white font-bold">
                      {item.date}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2 text-left">
                    <div className="space-y-1">
                      <h5 className="font-bold text-xs text-rose-950 leading-snug">{item.title}</h5>
                      <p className="text-[10px] text-slate-500 leading-tight font-medium line-clamp-2">{item.description}</p>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-rose-50/50">
                      <button
                        type="button"
                        onClick={() => handleLikeMemory(item.id)}
                        className="flex items-center gap-1 text-[10px] font-extrabold text-[#7D1D3F] hover:bg-rose-50/50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 fill-[#7D1D3F]" />
                        <span>{item.likes} {activeDict.likesLabel}</span>
                      </button>

                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{item.commentsCount} {activeDict.commentsLabel}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderCommsCenter = () => {
    const activeDict = isRomanUrdu ? COMMS_TRANSLATIONS.ru : COMMS_TRANSLATIONS.en
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
        <div className="bg-white/95 rounded-3xl p-6 border border-rose-100/70 shadow-lg shadow-rose-950/5 text-left font-sans">
          <div className="space-y-1">
            <h3 className="font-serif italic font-bold text-lg text-rose-950">{activeDict.commsTitle}</h3>
            <p className="text-xs text-[#5E6460] leading-relaxed font-medium">
              {activeDict.commsSubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-4 bg-white/95 rounded-3xl p-6 border border-rose-100/70 shadow-lg shadow-rose-950/5 flex flex-col justify-between text-center font-sans space-y-6">
            <div className="space-y-4 flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-2 border-amber-300 overflow-hidden shadow-md">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300" alt="Farhan Khan" className="w-full h-full object-cover" />
                </div>
                <span className="absolute bottom-0.5 right-0.5 w-4.5 h-4.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
              </div>

              <div>
                <h4 className="font-serif italic font-bold text-md text-rose-950">Farhan Khan</h4>
                <p className="text-[10px] text-[#5E6460] font-black uppercase tracking-wider mt-0.5">{activeDict.plannerStatus}</p>
                <span className="inline-flex px-2 py-0.5 mt-2 bg-emerald-50 text-emerald-700 text-[8px] font-black uppercase rounded">
                  Available Now
                </span>
              </div>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-rose-50">
              <button
                type="button"
                onClick={() => handleStartCall("voice")}
                className="w-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                {activeDict.startVoiceCall}
              </button>

              <button
                type="button"
                onClick={() => handleStartCall("video")}
                className="w-full bg-[#7D1D3F] hover:bg-[#63142F] text-white font-bold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Video className="w-4 h-4" />
                {activeDict.startVideoCall}
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white/95 rounded-3xl border border-rose-100/70 shadow-lg shadow-rose-950/5 flex flex-col overflow-hidden min-h-[420px] font-sans">
            <div className="px-6 py-4 border-b border-rose-50 bg-rose-50/20 flex justify-between items-center text-left">
              <div className="space-y-0.5">
                <h4 className="font-serif italic font-bold text-sm text-rose-950">{activeDict.chatHeader}</h4>
                <span className="text-[8px] text-slate-400 font-bold block uppercase tracking-wide">Syncs dynamically with your planning settings</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[300px] bg-slate-50/20 text-left">
              {messages.map((msg) => {
                const isHost = msg.sender === "Host"
                return (
                  <div key={msg.id} className={`flex flex-col ${isHost ? "items-end" : "items-start"}`}>
                    <div className="flex items-center gap-1.5 mb-1 text-[9px] font-bold text-slate-400">
                      <span>{msg.sender === "Host" ? "You" : "Farhan"}</span>
                      <span>•</span>
                      <span>{msg.time}</span>
                    </div>

                    <div className={`max-w-md rounded-2xl px-4 py-2.5 text-xs font-medium leading-relaxed shadow-sm ${
                      isHost 
                        ? "bg-gradient-to-br from-[#7D1D3F] to-[#511026] text-white rounded-tr-none" 
                        : "bg-white border border-rose-100 text-rose-950 rounded-tl-none"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                )
              })}
            </div>

            <form onSubmit={handleSendChatMessage} className="p-4 border-t border-rose-50 bg-white flex gap-2">
              <input
                type="text"
                value={newChatMessage}
                onChange={(e) => setNewChatMessage(e.target.value)}
                placeholder={activeDict.chatPlaceholder}
                className="flex-1 bg-slate-50 border border-rose-100 rounded-xl px-4 py-2.5 text-xs font-semibold placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!newChatMessage.trim()}
                className="bg-[#0F5B3E] hover:bg-[#0A422D] disabled:opacity-50 disabled:hover:bg-[#0F5B3E] text-white p-2.5 rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center shrink-0 select-none"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFF7F9] pb-24 relative overflow-hidden">
      
      {/* Decorative layout ambient gradients */}
      <div className="absolute top-96 left-10 w-96 h-96 bg-rose-100/70 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-amber-100/50 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Sparkle animations */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-28 left-[12%] w-3 h-3 bg-amber-300 rounded-full animate-pulse" />
        <div className="absolute top-52 right-[20%] w-4 h-4 bg-rose-300 rounded-full animate-bounce" />
        <div className="absolute top-96 left-[35%] w-2 h-2 bg-yellow-200 rounded-full animate-ping" />
      </div>

      {/* Floating Header Banner - Named 'Wedding Planner' */}
      <div className="bg-gradient-to-br from-[#4A0E17] via-[#7D1D3F] to-[#0A3D2A] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-rose-400/20 shadow-md">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm">
              <Heart className="w-4 h-4 text-rose-300 fill-rose-300 animate-pulse" />
              NEXUS Wedding Ecosystem
            </span>
            
            <h1 className="text-5xl md:text-6xl font-serif italic tracking-tight text-white leading-none">
              Wedding Planner
            </h1>
            <p className="text-xs text-rose-200/80 font-bold uppercase tracking-widest pl-1">
              {weddingProfile.brideName} & {weddingProfile.groomName}&apos;s Big Day Workspace
            </p>
          </div>
          
          {/* Responsive Timer Box */}
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            {[ 
              { label: isRomanUrdu ? "Mah" : "Months", val: "04" }, 
              { label: isRomanUrdu ? "Din" : "Days", val: "12" }, 
              { label: isRomanUrdu ? "Ghantay" : "Hours", val: "08" } 
            ].map(time => (
              <div key={time.label} className="bg-white/10 backdrop-blur-md border border-white/25 rounded-2xl w-20 h-20 flex flex-col items-center justify-center shadow-lg transform hover:scale-102 transition-transform">
                <span className="text-2xl font-black text-amber-200">{time.val}</span>
                <span className="text-[9px] uppercase tracking-wider text-white/80 font-black">{time.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Panel Content with Custom Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          
          {/* Tabs Navigation */}
          <div className="bg-white rounded-2xl shadow-md border border-rose-100/60 p-1.5 inline-flex flex-wrap gap-1 w-full md:w-auto">
            {TABS.map(tab => {
              const TabIcon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isActive 
                      ? "bg-[#7D1D3F] text-white shadow-sm font-black" 
                      : "text-rose-900/60 hover:bg-rose-50/50 hover:text-rose-950 font-semibold"
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Roman Urdu Language Toggle Pill */}
          <div className="bg-white border border-rose-100/60 p-1.5 rounded-2xl flex items-center gap-1 shadow-md w-max self-end md:self-auto">
            <span className="text-[9px] text-rose-950 font-bold uppercase tracking-widest px-2.5">
              Urdu Mode:
            </span>
            <button
              onClick={() => setIsRomanUrdu(false)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${!isRomanUrdu ? "bg-[#7D1D3F] text-white shadow-sm" : "text-rose-950/60 hover:text-rose-950"}`}
            >
              Off
            </button>
            <button
              onClick={() => setIsRomanUrdu(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${isRomanUrdu ? "bg-[#7D1D3F] text-white shadow-sm" : "text-rose-950/60 hover:text-rose-950"}`}
            >
              On
            </button>
          </div>
          
        </div>

        {/* Dynamic Views Content Container */}
        <div className="min-h-[500px]">
          {activeTab === "Overview" && renderOverview()}
          {activeTab === "Digital Invites" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CreativeTabs isRomanUrdu={isRomanUrdu} />
            </div>
          )}
          {activeTab === "Guests" && renderGuests()}
          {activeTab === "Tasks" && renderTasks()}
          {activeTab === "Budget" && renderBudget()}
          {activeTab === "Marketplace" && renderMarketplace()}
          {activeTab === "Profile" && renderProfileMaker()}
          {activeTab === "Memories" && renderMemoriesWall()}
          {activeTab === "Comms" && renderCommsCenter()}
        </div>
        
      </div>

      {/* Dynamic Toast System */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[150] bg-slate-900 border border-slate-800 text-white font-sans text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 max-w-sm"
          >
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Payment Gateway Modal (Raast) */}
      <AnimatePresence>
        {paymentModalInvoice && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPaymentModalInvoice(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl border border-rose-100 shadow-2xl p-6 w-full max-w-md relative z-10 font-sans text-left space-y-6"
            >
              <div className="flex justify-between items-start border-b border-rose-50 pb-4">
                <div className="space-y-1">
                  <h3 className="font-serif italic font-bold text-lg text-rose-950">
                    {(isRomanUrdu ? MARKETPLACE_TRANSLATIONS.ru : MARKETPLACE_TRANSLATIONS.en).paymentModalTitle}
                  </h3>
                  <p className="text-[10px] text-slate-500 leading-snug">
                    {(isRomanUrdu ? MARKETPLACE_TRANSLATIONS.ru : MARKETPLACE_TRANSLATIONS.en).paymentModalDesc}
                  </p>
                </div>
                <button 
                  onClick={() => setPaymentModalInvoice(null)}
                  className="text-[#5E6460] hover:text-rose-950 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-rose-50/20 border border-rose-100/40 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500">Recipient Vendor:</span>
                  <span className="text-rose-950">{paymentModalInvoice.vendorName}</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500">Billing Line:</span>
                  <span className="text-slate-700">{paymentModalInvoice.item}</span>
                </div>
                <div className="flex justify-between text-xs font-bold border-t border-rose-50/50 pt-2 mt-2">
                  <span className="text-rose-800 uppercase tracking-widest text-[10px]">Total Transfer:</span>
                  <span className="text-sm font-black text-rose-950">{formatPKR(paymentModalInvoice.amount)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-36 h-36 bg-slate-50 border-2 border-slate-200 rounded-2xl p-2 flex items-center justify-center relative group">
                    <QrCode className="w-full h-full text-slate-800" />
                    <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] font-black text-[#0F5B3E] transition-opacity cursor-default uppercase tracking-wider">
                      Raast Scan
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <span className="text-[#5E6460] font-bold uppercase tracking-wider text-[9px] block">
                    {(isRomanUrdu ? MARKETPLACE_TRANSLATIONS.ru : MARKETPLACE_TRANSLATIONS.en).raastIdLabel}
                  </span>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center font-mono text-[10px] font-bold text-slate-800">
                    <span>PK92RST03001234567</span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-sans font-black uppercase">
                      Raast Pay
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleConfirmPayment}
                  className="flex-1 bg-[#0F5B3E] hover:bg-[#0A422D] text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer select-none"
                >
                  {(isRomanUrdu ? MARKETPLACE_TRANSLATIONS.ru : MARKETPLACE_TRANSLATIONS.en).confirmPaymentBtn}
                </button>
                <button
                  onClick={() => setPaymentModalInvoice(null)}
                  className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer"
                >
                  {(isRomanUrdu ? MARKETPLACE_TRANSLATIONS.ru : MARKETPLACE_TRANSLATIONS.en).cancelBtn}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Voice/Video Call Simulator Modal */}
      <AnimatePresence>
        {activeCall && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl p-6 w-full max-w-sm relative z-10 font-sans text-center space-y-6 overflow-hidden"
            >
              <div className="absolute -top-20 -left-20 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex justify-center">
                <span className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-slate-300">
                  {activeCall.type === "video" ? (
                    <>
                      <Video className="w-3 h-3 text-[#7D1D3F]" />
                      Video Call Sim
                    </>
                  ) : (
                    <>
                      <Phone className="w-3 h-3 text-emerald-400" />
                      Voice Call Sim
                    </>
                  )}
                </span>
              </div>

              <div className="flex flex-col items-center space-y-4 py-4 relative">
                <div className="relative">
                  {activeCall.status === "ringing" && (
                    <>
                      <span className="absolute inset-0 rounded-full bg-rose-500/30 border border-rose-500/50 scale-125 animate-ping" />
                      <span className="absolute inset-0 rounded-full bg-amber-400/20 scale-150 animate-pulse" />
                    </>
                  )}

                  <div className="w-24 h-24 rounded-full border-4 border-slate-800 overflow-hidden shadow-lg relative z-10">
                    {activeCall.type === "video" && !activeCall.isVideoOff && activeCall.status === "connected" ? (
                      <div className="w-full h-full bg-slate-950 relative">
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300"
                          alt="Farhan"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-1 right-1 w-8 h-8 rounded border border-white/30 overflow-hidden bg-slate-800">
                          <div className="w-full h-full bg-[#7D1D3F]/40 flex items-center justify-center text-[6px] font-bold">Self</div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300"
                        alt="Farhan"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-1 z-10">
                  <h3 className="font-serif italic font-bold text-lg text-white">Farhan Khan</h3>
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                    {activeCall.status === "ringing"
                      ? (isRomanUrdu ? COMMS_TRANSLATIONS.ru.ringing : COMMS_TRANSLATIONS.en.ringing)
                      : (isRomanUrdu ? COMMS_TRANSLATIONS.ru.connected : COMMS_TRANSLATIONS.en.connected)}
                  </p>
                </div>

                {activeCall.status === "connected" && (
                  <div className="text-2xl font-mono font-black text-amber-200 mt-2 z-10">
                    {(() => {
                      const m = Math.floor(activeCall.timer / 60)
                      const s = activeCall.timer % 60
                      return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
                    })()}
                  </div>
                )}
              </div>

              <div className="flex justify-center items-center gap-4 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveCall({ ...activeCall, isMuted: !activeCall.isMuted })}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border cursor-pointer ${
                    activeCall.isMuted
                      ? "bg-[#7D1D3F] border-[#7D1D3F] text-white"
                      : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300"
                  }`}
                  title={isRomanUrdu ? COMMS_TRANSLATIONS.ru.mutedText : COMMS_TRANSLATIONS.en.mutedText}
                >
                  {activeCall.isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCall(null)}
                  className="w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all text-white shadow-lg shadow-red-900/30 scale-110 hover:scale-115 cursor-pointer flex shrink-0 justify-center items-center"
                  title={isRomanUrdu ? COMMS_TRANSLATIONS.ru.hangupBtn : COMMS_TRANSLATIONS.en.hangupBtn}
                >
                  <PhoneOff className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  disabled={activeCall.type !== "video"}
                  onClick={() => setActiveCall({ ...activeCall, isVideoOff: !activeCall.isVideoOff })}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border ${
                    activeCall.type !== "video"
                      ? "opacity-30 cursor-not-allowed bg-slate-800 border-slate-700 text-slate-500"
                      : activeCall.isVideoOff
                      ? "bg-[#7D1D3F] border-[#7D1D3F] text-white cursor-pointer"
                      : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300 cursor-pointer"
                  }`}
                  title={isRomanUrdu ? COMMS_TRANSLATIONS.ru.videoOffText : COMMS_TRANSLATIONS.en.videoOffText}
                >
                  {activeCall.isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                </button>
              </div>

              {(activeCall.isMuted || activeCall.isVideoOff) && (
                <div className="flex justify-center gap-2 text-[9px] font-black uppercase tracking-wider text-[#7D1D3F] pt-2">
                  {activeCall.isMuted && <span>{isRomanUrdu ? COMMS_TRANSLATIONS.ru.mutedText : COMMS_TRANSLATIONS.en.mutedText}</span>}
                  {activeCall.isMuted && activeCall.isVideoOff && <span>•</span>}
                  {activeCall.isVideoOff && <span>{isRomanUrdu ? COMMS_TRANSLATIONS.ru.videoOffText : COMMS_TRANSLATIONS.en.videoOffText}</span>}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
