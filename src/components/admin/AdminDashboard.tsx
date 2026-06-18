"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Users, MonitorPlay, Camera, Eye, X, ArrowRight, Wallet, QrCode, Sliders, Bot,
  Check, CheckCircle2, AlertCircle, Sparkles, AppWindow, Settings, Info, Server,
  Building2, UserCheck, CalendarDays, Bell, ListOrdered, Search, Package, Receipt,
  DollarSign, Clock, Wrench, ShieldAlert, User, Coins, Tv, Paintbrush, ChefHat, 
  BarChart3, PieChart, TrendingUp, Key, MessageSquareCode, Sparkle, Star, BookOpen,
  Map, Activity, Inbox, CheckSquare, Laptop, LayoutDashboard, Database, LogOut,
  HeartHandshake, Bed, Video, Film, Radio, Play, Send
} from "lucide-react"
import { Button } from "@/components/ui/button"

type SectionType = 
  | "overview" | "users" | "organizations" | "marketplace" 
  | "events" | "bookings" | "finance" | "apps" 
  | "displays" | "memories" | "invitations" | "ai_center" 
  | "support" | "security" | "analytics" | "settings"

export function AdminDashboard() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<SectionType>("overview")
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [commandInput, setCommandInput] = useState("")
  const [toast, setToast] = useState<string | null>(null)

  // Simulation pipeline stage
  const [simStage, setSimStage] = useState(0)
  const [simLogs, setSimLogs] = useState<{ time: string; text: string }[]>([])
  const [mounted, setMounted] = useState(false)

  // AI Assistant Chat state
  const [chatMessages, setChatMessages] = useState<{sender: 'ai' | 'user', text: string}[]>([
    { sender: 'ai', text: "Welcome to NEXUS Central AI. I can analyze platform analytics, run anomaly audits, or generate financial projections. Ask me anything." }
  ])
  const [chatInput, setChatInput] = useState("")
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  useEffect(() => {
    setMounted(true)
    setSimLogs([
      { time: new Date().toLocaleTimeString(), text: "System Ready. Idle state waiting for triggers." }
    ])
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const triggerToast = (msg: string) => {
    setToast(msg)
  }

  // Live Map Simulation Loop
  const runSimulationStep = () => {
    const stages = [
      { log: "📥 New Booking: Ayesha & Hamza wedding request received at Grand Hall.", desc: "Booking Received" },
      { log: "✅ Venue Confirmed: Deposit paid. Booking approved in Venue OS.", desc: "Venue Approved" },
      { log: "💌 Invitation Sent: Digital card generated and sent to 250 guests via WhatsApp.", desc: "Cards Sent" },
      { log: "📊 RSVP Received: 195 guests confirmed attendance via QR scanner.", desc: "RSVPs Tracked" },
      { log: "🎬 Event Started: Staff checked-in. Android TV loops started via Displays OS.", desc: "Event Live" },
      { log: "📸 Memories Uploaded: 482 photos uploaded via guest QR portal.", desc: "Memories Shared" }
    ]

    setSimStage(prev => {
      const next = (prev + 1) % (stages.length + 1)
      if (next === 0) {
        setSimLogs([{ time: new Date().toLocaleTimeString(), text: "System reset. Awaiting new triggers." }])
      } else {
        setSimLogs(curr => [...curr, { time: new Date().toLocaleTimeString(), text: stages[next - 1].log }])
      }
      return next
    })
  }

  // Ask AI Helper
  const askAICheck = (query: string) => {
    setChatMessages(prev => [...prev, { sender: 'user', text: query }])
    
    setTimeout(() => {
      let reply = ""
      if (query.includes("revenue forecast")) {
        reply = "### Financial Projection\n* **Expected Q3 MRR Growth**: +24.8% (driven by winter wedding block bookings).\n* **Projected Platform Fee Income**: Rs. 8,245,000.\n* **Recommendations**: Run targeted discounts for Displays OS activations in Lahore branch networks."
      } else if (query.includes("anomaly")) {
        reply = "### Security Audit & Anomaly Scans\n* **Status**: Clean. No access tokens leaks detected.\n* **Notice**: Spotting unusual login volume spike (+400%) from IP block `182.168.10.x` corresponding to peak check-ins at Serena Hall Islamabad. Flagged as normal operational activity."
      } else if (query.includes("risk")) {
        reply = "### Priority Risk Alarms\n* **Alert**: 2 accounts pending moderation flagged for duplicate CNIC uploads.\n* **Warning**: 1 Android TV screen in Rawalpindi branch reported offline for >1 hour."
      } else {
        reply = `Processing analysis query: "${query}". System records indicate healthy metrics. Total user registries stand at 12,405 with zero critical failures.`
      }
      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }])
    }, 1000)
  }

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    const txt = chatInput
    setChatInput("")
    askAICheck(txt)
  }

  // Command palette executions
  const runCommandPalette = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = commandInput.toLowerCase().trim()
    setCommandInput("")
    setIsCommandPaletteOpen(false)

    if (cmd.includes("suspend")) {
      triggerToast("User suspension log opened in Management panel.")
      setActiveSection("users")
    } else if (cmd.includes("credit") || cmd.includes("issue")) {
      triggerToast("Command executed: Issued Rs. 5,000 credit buffer to Royal Caterers.")
    } else if (cmd.includes("status") || cmd.includes("health")) {
      triggerToast("System check: All services online. Ping 12ms.")
      setActiveSection("overview")
    } else {
      triggerToast(`Command executed: "${cmd}"`)
    }
  }

  // Navigation config
  const navGroups = [
    {
      title: "Command Center",
      items: [
        { id: "overview", name: "Overview Desk", icon: LayoutDashboard },
        { id: "analytics", name: "BI & Growth Desk", icon: BarChart3 }
      ]
    },
    {
      title: "Core Registries",
      items: [
        { id: "users", name: "Users & Roles", icon: Users },
        { id: "organizations", name: "Organizations", icon: Building2 },
        { id: "marketplace", name: "Marketplace OS", icon: Search }
      ]
    },
    {
      title: "Workspaces OS",
      items: [
        { id: "events", name: "Events Desk", icon: Sparkle },
        { id: "bookings", name: "Bookings & GMV", icon: Star },
        { id: "finance", name: "Finance & Payouts", icon: Wallet }
      ]
    },
    {
      title: "Ecosystem Apps",
      items: [
        { id: "theme_maker", name: "AI Theme Machine", icon: Paintbrush, href: "/admin/themes/create" },
        { id: "apps", name: "App Store Admin", icon: AppWindow },
        { id: "displays", name: "Displays OS TV", icon: Tv },
        { id: "memories", name: "Memories Storage", icon: Camera },
        { id: "invitations", name: "Invitations RSVP", icon: QrCode }
      ]
    },
    {
      title: "Services & Safety",
      items: [
        { id: "ai_center", name: "AI Admin Center", icon: Bot },
        { id: "support", name: "Support Center", icon: Inbox },
        { id: "security", name: "Security OS", icon: ShieldAlert },
        { id: "settings", name: "Platform Settings", icon: Settings }
      ]
    }
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAF7F2] text-slate-800 font-sans relative">
      
      {/* 🌟 Toast Notification 🌟 */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#0F5B3E] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-[12px] font-bold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌟 Universal Command Palette Modal 🌟 */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCommandPaletteOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50"
            />
            <motion.div 
              initial={{ opacity: 0, y: -40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col border border-slate-200"
            >
              <form onSubmit={runCommandPalette} className="p-4 flex items-center gap-3 border-b border-slate-100 bg-[#FAF8F5]">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input 
                  type="text" 
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="Type an admin command... (e.g. 'suspend Royal Hall', 'issue credit')"
                  className="flex-1 bg-transparent text-slate-800 text-xs font-bold outline-none"
                  autoFocus
                />
                <button type="submit" className="text-[10px] font-black uppercase text-slate-400 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded">Enter</button>
              </form>
              <div className="p-4 space-y-2 text-left text-[11px] text-slate-500 font-semibold bg-white max-h-48 overflow-y-auto">
                <p className="text-[10px] uppercase font-black tracking-wider text-slate-400 mb-1">Common Commands</p>
                <div 
                  onClick={() => { setCommandInput("Check system health status"); }}
                  className="p-2 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center"
                >
                  <span>Check system health status</span>
                  <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-400">System</span>
                </div>
                <div 
                  onClick={() => { setCommandInput("Issue Rs. 5000 credit buffer to Royal Caterers"); }}
                  className="p-2 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center"
                >
                  <span>Issue Rs. 5,000 credit to vendor</span>
                  <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">Finance</span>
                </div>
                <div 
                  onClick={() => { setCommandInput("Suspend user account"); }}
                  className="p-2 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center"
                >
                  <span>Suspend user account</span>
                  <span className="text-[9px] bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded">Moderation</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 🌟 AI Admin Assistant Sliding Panel 🌟 */}
      <AnimatePresence>
        {isAIAssistantOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsAIAssistantOpen(false)}
              className="fixed inset-0 bg-slate-950/20 backdrop-blur-xs z-40"
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 150 }}
              className="fixed top-0 right-0 h-full w-96 bg-white border-l border-slate-200 z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-[#FAF8F5]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#E6F0EC] text-[#0F5B3E] flex items-center justify-center border border-[#0F5B3E]/10">
                    <Bot className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-black text-[13px] text-slate-900 leading-tight">NEXUS Admin AI</h3>
                    <p className="text-[9.5px] text-emerald-600 font-bold uppercase">Mission Helper OS</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAIAssistantOpen(false)}
                  className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[9px] font-bold text-slate-400 uppercase mb-1">{msg.sender === 'user' ? 'Admin' : 'Central AI'}</span>
                    <div className={`p-3.5 rounded-2xl max-w-[85%] text-left font-medium leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-[#0F5B3E] text-white rounded-tr-none' 
                        : 'bg-[#FAF8F5] text-slate-700 rounded-tl-none border border-slate-100'
                    }`}>
                      {msg.text.split("\n").map((line, idx) => (
                        <p key={idx} className={line.startsWith("*") ? "ml-3 list-item" : "mb-1"}>{line.replace(/^\*\s*/, "").replace(/\*\*/g, "")}</p>
                      ))}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Prompt shortcuts */}
              <div className="p-4 border-t border-slate-100 bg-[#FAF8F5]/50 space-y-1.5 text-left shrink-0">
                <p className="text-[9.5px] font-black uppercase text-slate-400 mb-1">Quick Analysis Actions</p>
                <button 
                  onClick={() => askAICheck("Generate revenue forecast report")}
                  className="w-full text-left p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-[10.5px] font-bold text-slate-700 flex items-center justify-between"
                >
                  <span>📊 Generate revenue forecast report</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button 
                  onClick={() => askAICheck("Run anomaly detection scan")}
                  className="w-full text-left p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-[10.5px] font-bold text-slate-700 flex items-center justify-between"
                >
                  <span>🛡️ Run anomaly detection scan</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button 
                  onClick={() => askAICheck("List top risk alarms")}
                  className="w-full text-left p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-[10.5px] font-bold text-slate-700 flex items-center justify-between"
                >
                  <span>⚠️ List top risk alarms</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* Input Footer */}
              <form onSubmit={handleSendChat} className="p-4 border-t border-slate-100 flex gap-2 shrink-0">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask the ecosystem helper AI..."
                  className="flex-1 h-9 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold outline-none focus:ring-2 focus:ring-[#0F5B3E]/20"
                />
                <button type="submit" className="w-9 h-9 rounded-xl bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white flex items-center justify-center transition-colors">
                  <Send className="w-4.5 h-4.5" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 🌟 Left Sidebar 🌟 */}
      <aside className="w-64 bg-slate-950 text-slate-300 flex flex-col h-screen shrink-0 border-r border-slate-800 select-none z-30">
        
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-900 shrink-0 text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0F5B3E] flex items-center justify-center text-white font-black text-[16px] border border-emerald-500/20 shadow-lg shadow-emerald-950/40">
              N
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-[16px] tracking-tight text-white">NEXUS ADMIN</span>
              <span className="text-[8.5px] font-extrabold text-[#D9467A] tracking-wider uppercase mt-1">Command Center</span>
            </div>
          </div>
        </div>

        {/* Categories & Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-5 space-y-5 scrollbar-none text-left">
          {navGroups.map((grp) => (
            <div key={grp.title} className="space-y-1">
              <span className="px-3 text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">{grp.title}</span>
              <div className="space-y-0.5">
                {grp.items.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.href) {
                          router.push(item.href)
                        } else {
                          setActiveSection(item.id as SectionType)
                        }
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[12px] font-bold transition-all ${
                        isActive 
                          ? "bg-[#0f5b3e]/20 text-[#34D399] border-l-2 border-[#34D399] shadow-sm font-black" 
                          : "text-slate-400 hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      <item.icon className={`w-4.5 h-4.5 ${isActive ? "text-[#34D399]" : "text-slate-500 group-hover:text-white"}`} />
                      {item.name}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Profile Footer */}
        <div className="p-4 border-t border-slate-900 bg-slate-950/60 shrink-0 text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D9467A] flex items-center justify-center text-white font-black text-xs">
              SA
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-black text-white truncate">Super Admin Root</p>
              <p className="text-[9px] font-bold text-slate-500 truncate">Platform Executive</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 🌟 Main Content Wrapper 🌟 */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-20">
          
          {/* Global Search & Palette shortcut */}
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <button 
              onClick={() => setIsCommandPaletteOpen(true)}
              className="w-full h-9 px-3 border border-slate-200 rounded-xl bg-[#FAF8F5] hover:bg-slate-50 transition-colors flex items-center gap-2.5 text-slate-400 text-xs font-semibold"
            >
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Type custom command...</span>
              <kbd className="ml-auto text-[9px] bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-sm text-slate-400 font-mono">⌘K</kbd>
            </button>
          </div>

          {/* Right Header Status */}
          <div className="flex items-center gap-4 shrink-0 select-none">
            
            {/* Health pill */}
            <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 px-2.5 py-1 rounded-xl text-[10px] font-black tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Ecosystem Active
            </div>

            {/* AI Assistant Toggle Button */}
            <button 
              onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
              className="relative w-9 h-9 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow hover:bg-slate-800 transition-colors"
              title="Launch Admin AI assistant"
            >
              <Bot className="w-4.5 h-4.5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#D9467A] rounded-full" />
            </button>

            {/* Alerts Bell */}
            <button 
              onClick={() => triggerToast("Global alerts checked: 0 warning violations.")}
              className="w-9 h-9 border border-slate-200 hover:bg-slate-50 transition-colors rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600"
            >
              <Bell className="w-4.5 h-4.5" />
            </button>
          </div>
        </header>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto bg-[#FAF7F2] p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-7xl mx-auto space-y-8"
            >
              {/* Render Sections */}
              
              {/* SECTION: OVERVIEW (Command Center) */}
              {activeSection === "overview" && (
                <div className="space-y-8 text-left">
                  
                  {/* Header */}
                  <div>
                    <h2 className="text-[22px] font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <Sparkles className="w-5.5 h-5.5 text-[#0F5B3E]" /> Platform Command Center
                    </h2>
                    <p className="text-[12px] text-slate-500 font-semibold mt-0.5">Real-time status metrics and execution center of the Pakistan Event Ecosystem.</p>
                  </div>

                  {/* Top KPI row */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#E6F0EC] text-[#0F5B3E] flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Total Users</p>
                        <p className="text-xl font-black text-slate-950 mt-0.5">12,405</p>
                      </div>
                    </div>
                    <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Active Orgs</p>
                        <p className="text-xl font-black text-slate-950 mt-0.5">842</p>
                      </div>
                    </div>
                    <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                        <Star className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Bookings Today</p>
                        <p className="text-xl font-black text-slate-950 mt-0.5">128</p>
                      </div>
                    </div>
                    <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Revenue Today</p>
                        <p className="text-xl font-black text-slate-950 mt-0.5">Rs. 82.5K</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Admin Tools */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-left">
                    <h3 className="font-black text-slate-900 text-sm mb-4">Super Admin Workspace Tools</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      <button 
                        onClick={() => triggerToast("Mock command: Organization creation prompt initialized.")}
                        className="p-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors flex items-center gap-2.5 text-xs font-bold text-slate-700"
                      >
                        <Building2 className="w-4.5 h-4.5 text-slate-400" /> Create Organization
                      </button>
                      <button 
                        onClick={() => triggerToast("Mock command: Issue system admin console user access.")}
                        className="p-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors flex items-center gap-2.5 text-xs font-bold text-slate-700"
                      >
                        <UserCheck className="w-4.5 h-4.5 text-slate-400" /> Create Admin Profile
                      </button>
                      <button 
                        onClick={() => triggerToast("Mock command: Broadcast messages pushed to 12,405 user numbers.")}
                        className="p-3 border border-slate-200 rounded-2xl hover:bg-[#FAF8F5] transition-colors flex items-center gap-2.5 text-xs font-bold text-slate-700"
                      >
                        <MessageSquareCode className="w-4.5 h-4.5 text-[#D9467A]" /> Send Broadcast Messages
                      </button>
                      <button 
                        onClick={() => triggerToast("Mock command: Force emergency systems lockout check completed. Lock safe.")}
                        className="p-3 border border-rose-200 bg-rose-50/50 hover:bg-rose-50 rounded-2xl transition-colors flex items-center gap-2.5 text-xs font-bold text-rose-700"
                      >
                        <ShieldAlert className="w-4.5 h-4.5 text-rose-600" /> Platform Lockout Audit
                      </button>
                    </div>
                  </div>

                  {/* Live Platform Map Simulation block */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Simulator Map (SVG animated nodes) */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs lg:col-span-2 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-black text-slate-900 text-sm">Live Ecosystem Process Map</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Visual stage monitor</p>
                          </div>
                          <button 
                            onClick={runSimulationStep}
                            className="px-3 py-1.5 rounded-lg bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white font-bold text-[10px] flex items-center gap-1 transition-colors"
                          >
                            <Play className="w-3.5 h-3.5" /> Next Step Simulation
                          </button>
                        </div>

                        {/* SVG Visual Node map */}
                        <div className="py-6 flex justify-around items-center relative min-h-[100px] border border-dashed border-slate-100 rounded-2xl bg-slate-50/30">
                          {/* Connection pipeline path */}
                          <div className="absolute top-1/2 -translate-y-1/2 left-[10%] right-[10%] h-1 bg-slate-100 -z-10" />
                          <div 
                            className="absolute top-1/2 -translate-y-1/2 left-[10%] h-1 bg-[#0F5B3E] -z-10 transition-all duration-500" 
                            style={{ width: `${(simStage / 6) * 80}%` }}
                          />

                          {[
                            { name: "Booking", icon: Inbox },
                            { name: "Venue OS", icon: Building2 },
                            { name: "Invites", icon: QrCode },
                            { name: "RSVPs", icon: Check },
                            { name: "Live TV", icon: Tv },
                            { name: "Memories", icon: Camera }
                          ].map((node, i) => {
                            const isPassed = simStage > i
                            const isCurrent = simStage === i + 1
                            return (
                              <div key={i} className="flex flex-col items-center gap-2">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                                  isCurrent 
                                    ? "bg-slate-900 border-transparent text-white ring-4 ring-slate-900/10 scale-110" 
                                    : (isPassed ? "bg-[#0F5B3E] border-transparent text-white" : "bg-white border-slate-200 text-slate-400")
                                }`}>
                                  <node.icon className="w-4 h-4" />
                                </div>
                                <span className={`text-[8px] font-black uppercase ${isCurrent ? "text-slate-950 font-black" : (isPassed ? "text-emerald-700" : "text-slate-400")}`}>{node.name}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Map status summary info */}
                      <div className="mt-4 p-3 bg-[#FAF8F5] rounded-xl border border-slate-100 flex items-center gap-3">
                        <Info className="w-4 h-4 text-[#0F5B3E] shrink-0" />
                        <p className="text-[10.5px] font-semibold text-slate-600 leading-normal">
                          Simulated pipeline illustrates transaction routing. Installed modules process transactions automatically.
                        </p>
                      </div>
                    </div>

                    {/* Live Activity Feed */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
                      <div>
                        <h3 className="font-black text-slate-900 text-sm mb-4">Platform Action Logs</h3>
                        <div className="space-y-3 max-h-[160px] overflow-y-auto">
                          {mounted && simLogs.map((log, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-[11px] leading-normal font-semibold text-slate-600 border-l border-slate-200 pl-3">
                              <span className="text-[8px] text-slate-400 font-bold block shrink-0 mt-0.5">[{log.time}]</span>
                              <p>{log.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block border-t border-slate-100 pt-3 mt-4">Platform Auto Logging Enabled</span>
                    </div>

                  </div>

                </div>
              )}

              {/* SECTION: USER MANAGEMENT */}
              {activeSection === "users" && (
                <div className="space-y-6 text-left">
                  <div>
                    <h2 className="text-[20px] font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <Users className="w-5.5 h-5.5 text-[#0F5B3E]" /> User Management & Moderation
                    </h2>
                    <p className="text-[12px] text-slate-500 font-semibold">Verify users, manage platform credentials, and run suspensions audits.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left: Pending Verifications queue */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs lg:col-span-2 space-y-4">
                      <h3 className="font-black text-slate-900 text-sm mb-2">Verification Moderation Desk</h3>
                      <div className="divide-y divide-slate-100">
                        {[
                          { id: "REQ-01", name: "Royal Gardens Banquet", category: "Venue", submitted: "2h ago" },
                          { id: "REQ-02", name: "Hamza Films & Photography", category: "Studio", submitted: "5h ago" },
                          { id: "REQ-03", name: "Lakeside Marquee Rawalpindi", category: "Venue", submitted: "1d ago" }
                        ].map(req => (
                          <div key={req.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2.5">
                                <h4 className="text-[13px] font-black text-slate-900">{req.name}</h4>
                                <span className="text-[8.5px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500 uppercase">{req.category}</span>
                              </div>
                              <p className="text-[10px] font-bold text-slate-400 mt-1">Submitted: {req.submitted} • ID: {req.id}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => triggerToast(`Verified ${req.name} successfully!`)}
                                className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition-colors"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => triggerToast(`Rejected and logged request ${req.id}.`)}
                                className="w-8 h-8 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Moderation Actions & stats */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                      <h3 className="font-black text-slate-900 text-sm">Moderation Actions Console</h3>
                      <div className="space-y-3">
                        <button 
                          onClick={() => triggerToast("Mock command: Suspended account credentials.")}
                          className="w-full p-3 border border-rose-200 hover:bg-rose-50 transition-colors rounded-xl text-left flex items-center gap-2.5 text-xs font-bold text-rose-700"
                        >
                          <ShieldAlert className="w-4.5 h-4.5" /> Suspend Workspace Credentials
                        </button>
                        <button 
                          onClick={() => triggerToast("Mock command: Assigned new role permissions.")}
                          className="w-full p-3 border border-slate-200 hover:bg-slate-50 transition-colors rounded-xl text-left flex items-center gap-2.5 text-xs font-bold text-slate-700"
                        >
                          <Key className="w-4.5 h-4.5 text-slate-400" /> Allocate Team Role Scopes
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* SECTION: ORGANIZATIONS */}
              {activeSection === "organizations" && (
                <div className="space-y-6 text-left">
                  <div>
                    <h2 className="text-[20px] font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <Building2 className="w-5.5 h-5.5 text-[#0F5B3E]" /> Organization Registry OS
                    </h2>
                    <p className="text-[12px] text-slate-500 font-semibold">Monitor company workspaces, branch distributions, and operational flags.</p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                    <h3 className="font-black text-slate-900 text-sm mb-4">Enterprise Organizations Listing</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs font-semibold text-slate-500">
                        <thead className="bg-[#FAF8F5] text-slate-400 uppercase text-[9px] font-black">
                          <tr>
                            <th className="p-3 text-left">Organization Name</th>
                            <th className="p-3 text-left">Branches</th>
                            <th className="p-3 text-left">Active Apps</th>
                            <th className="p-3 text-left">Subscription Status</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            { name: "Royal Palace Banquets Group", branches: "Lahore, Islamabad", apps: "displays, accounting", plan: "PRO (MRR Rs. 3,500)" },
                            { name: "Shaadi Beats Productions", branches: "Karachi Branch", apps: "rental, memories", plan: "FREE (Pay-per-use)" },
                            { name: "Lumina Studio Labs", branches: "Main Branch", apps: "accounting, workforce", plan: "PRO (MRR Rs. 2,700)" }
                          ].map((org, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                              <td className="p-3 text-slate-900 font-black">{org.name}</td>
                              <td className="p-3">{org.branches}</td>
                              <td className="p-3"><code className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">{org.apps}</code></td>
                              <td className="p-3"><span className="px-2.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-100 rounded-md text-[10px] font-bold">{org.plan}</span></td>
                              <td className="p-3 text-right">
                                <button 
                                  onClick={() => triggerToast(`Editing configuration for ${org.name}`)}
                                  className="text-[#0F5B3E] hover:underline text-[11px]"
                                >
                                  Configure OS
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: MARKETPLACE */}
              {activeSection === "marketplace" && (
                <div className="space-y-6 text-left">
                  <div>
                    <h2 className="text-[20px] font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <Search className="w-5.5 h-5.5 text-[#0F5B3E]" /> Marketplace OS Monitoring
                    </h2>
                    <p className="text-[12px] text-slate-500 font-semibold">Monitor public listings, vendor ratings, reviews feedback, and platform statistics.</p>
                  </div>

                  {/* Vendor category counts */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { name: "Venues", count: 184 },
                      { name: "Studios", count: 242 },
                      { name: "Caterers", count: 108 },
                      { name: "Decorators", count: 165 },
                      { name: "AI Assistants", count: 1240 }
                    ].map(cat => (
                      <div key={cat.name} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center">
                        <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">{cat.name}</span>
                        <p className="text-xl font-black text-slate-950 mt-1">{cat.count}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                    <h3 className="font-black text-slate-900 text-sm">Recent Listing Reviews Moderation</h3>
                    <div className="space-y-3">
                      {[
                        { reviewer: "Ahmad Malik", vendor: "Royal Garden Banquet", rating: "5.0 ★", text: "Amazing displays OS setup! Casted wedding loop photos directly to Android TV." },
                        { reviewer: "Kiran R.", vendor: "Maha's Photography Studio", rating: "4.5 ★", text: "Awesome guest memories upload. Setup was fast using invitation QR code." }
                      ].map((rev, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2.5">
                              <span className="font-black text-xs text-slate-900">{rev.reviewer}</span>
                              <span className="text-amber-600 font-bold text-[10px] bg-amber-50 px-1.5 py-0.5 rounded">{rev.rating}</span>
                              <span className="text-slate-400 text-[10px]">reviewed <strong>{rev.vendor}</strong></span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium mt-1">{rev.text}</p>
                          </div>
                          <button 
                            onClick={() => triggerToast("Review verified and approved.")}
                            className="text-[10.5px] font-bold text-[#0F5B3E] hover:underline"
                          >
                            Approve
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: FINANCE & PAYOUTS */}
              {activeSection === "finance" && (
                <div className="space-y-6 text-left">
                  <div>
                    <h2 className="text-[20px] font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <Wallet className="w-5.5 h-5.5 text-[#0F5B3E]" /> Revenue & Payouts Command Center
                    </h2>
                    <p className="text-[12px] text-slate-500 font-semibold">Global billing ledger, subscription metrics, marketplace commission, and payouts routing.</p>
                  </div>

                  {/* Revenue metrics chart visualization */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs lg:col-span-2">
                      <h3 className="font-black text-slate-900 text-sm mb-4">Platform Revenue Channels (Subscription vs Commissions)</h3>
                      
                      {/* Interactive SVG chart */}
                      <div className="h-48 w-full border border-slate-100 rounded-2xl bg-[#FAF8F5]/30 relative flex items-end p-4">
                        <svg className="absolute inset-0 w-full h-full p-2 overflow-visible" viewBox="0 0 500 150">
                          {/* Grid lines */}
                          <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                          <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                          <line x1="0" y1="40" x2="500" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                          
                          {/* Smooth lines */}
                          <path d="M 0 110 Q 100 80 200 90 T 400 40 T 500 20" fill="none" stroke="#0F5B3E" strokeWidth="3" />
                          <path d="M 0 130 Q 100 110 200 95 T 400 80 T 500 50" fill="none" stroke="#D9467A" strokeWidth="2.5" strokeDasharray="4" />
                        </svg>
                        <div className="absolute top-4 left-4 flex gap-4 text-[10px] font-bold">
                          <span className="flex items-center gap-1.5 text-[#0F5B3E]"><span className="w-2.5 h-2.5 bg-[#0F5B3E] rounded" /> Subscription Fees</span>
                          <span className="flex items-center gap-1.5 text-[#D9467A]"><span className="w-2.5 h-2.5 bg-[#D9467A] rounded" /> Commission Cut</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                      <h3 className="font-black text-slate-900 text-sm">Vendor Payouts Desk</h3>
                      <div className="space-y-2.5">
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center text-xs">
                          <div>
                            <p className="font-black text-slate-900">Royal Palace Banquet</p>
                            <p className="text-[10px] text-slate-400 font-bold">Accumulated: Rs. 245,000</p>
                          </div>
                          <button 
                            onClick={() => triggerToast("Payout processed successfully.")}
                            className="px-3 py-1.5 rounded-lg bg-[#0F5B3E] text-white hover:bg-[#0d4d34] font-bold text-[10px]"
                          >
                            Disburse
                          </button>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center text-xs">
                          <div>
                            <p className="font-black text-slate-900">Maha's Films Karachi</p>
                            <p className="text-[10px] text-slate-400 font-bold">Accumulated: Rs. 182,500</p>
                          </div>
                          <button 
                            onClick={() => triggerToast("Payout processed successfully.")}
                            className="px-3 py-1.5 rounded-lg bg-[#0F5B3E] text-white hover:bg-[#0d4d34] font-bold text-[10px]"
                          >
                            Disburse
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: APPS ECOSYSTEM */}
              {activeSection === "apps" && (
                <div className="space-y-6 text-left">
                  <div>
                    <h2 className="text-[20px] font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <AppWindow className="w-5.5 h-5.5 text-[#0F5B3E]" /> Ecosystem Application Controls
                    </h2>
                    <p className="text-[12px] text-slate-500 font-semibold">Configure feature flags, monitor licensing arrays, and manage active app installations.</p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                    <h3 className="font-black text-slate-900 text-sm mb-4">Live Platform App Licenses</h3>
                    <div className="space-y-4">
                      {[
                        { id: "accounting", name: "Accounting Pro", installs: 485, revenue: "Rs. 727,500/mo", status: "Active" },
                        { id: "displays", name: "Displays OS / Signage TV", installs: 312, revenue: "Rs. 624,000/mo", status: "Active" },
                        { id: "workforce", name: "HR & Workforce OS", installs: 295, revenue: "Rs. 354,000/mo", status: "Active" }
                      ].map((app, i) => (
                        <div key={i} className="p-4 border border-slate-100 rounded-2xl flex items-center justify-between text-xs hover:bg-[#FAF8F5]/30">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-slate-100 text-slate-700 flex items-center justify-center rounded-xl font-bold shrink-0">
                              {app.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-black text-slate-900">{app.name}</h4>
                              <p className="text-[10px] text-slate-400 font-bold">Active Installations: {app.installs}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-extrabold text-slate-700">{app.revenue}</span>
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-md text-[9px] font-bold uppercase">{app.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: DISPLAYS OS */}
              {activeSection === "displays" && (
                <div className="space-y-6 text-left">
                  <div>
                    <h2 className="text-[20px] font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <Tv className="w-5.5 h-5.5 text-[#0F5B3E]" /> Displays OS / Digital Signage Console
                    </h2>
                    <p className="text-[12px] text-slate-500 font-semibold">Monitor active Android TV hardware check-ins, published screen loops, and playlist scheduling.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs md:col-span-2">
                      <h3 className="font-black text-slate-900 text-sm mb-4">Active Signage Devices Control Console</h3>
                      <div className="space-y-3">
                        {[
                          { name: "Royal Garden TV Lobby", location: "Grand Hall", loop: "Ayesha & Hamza Wedding Loop", status: "Online", ping: "12ms" },
                          { name: "Serena Hall Islamabad Reception Screen", location: "Executive Reception", loop: "General Menu Display Screen", status: "Online", ping: "22ms" },
                          { name: "Lahore Banquets Foyer Signage", location: "Main Foyer", loop: "Offline - Waiting loop", status: "Offline", ping: "--" }
                        ].map((dev, i) => (
                          <div key={i} className="p-4 border border-slate-100 rounded-2xl flex items-center justify-between text-xs hover:bg-[#FAF8F5]/30">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-black text-slate-900">{dev.name}</h4>
                                <span className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded ${dev.status === "Online" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{dev.status}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-1">Location: {dev.location} • Current Loop: <strong>{dev.loop}</strong></p>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">{dev.ping}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                      <h3 className="font-black text-slate-900 text-sm">Signage Operations</h3>
                      <button 
                        onClick={() => triggerToast("Command: TV Loops hardware check broadcast.")}
                        className="w-full p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
                      >
                        Ping All Active Android TVs
                      </button>
                      <button 
                        onClick={() => triggerToast("Broadcast payload sent to active foyer signages.")}
                        className="w-full p-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all"
                      >
                        Push Global Emergency Display Alert
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: SUPPORT CENTER */}
              {activeSection === "support" && (
                <div className="space-y-6 text-left">
                  <div>
                    <h2 className="text-[20px] font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <Inbox className="w-5.5 h-5.5 text-[#0F5B3E]" /> Support Center Console
                    </h2>
                    <p className="text-[12px] text-slate-500 font-semibold">Track escalations, reply to operational support tickets, and simulate live workspace chat help.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs lg:col-span-2">
                      <h3 className="font-black text-slate-900 text-sm mb-4">Pending Escalated Tickets</h3>
                      <div className="divide-y divide-slate-100">
                        {[
                          { id: "TKT-492", user: "Kamran Ali (Banquet Manager)", subject: "Displays OS casting lag Rawalpindi", time: "10m ago" },
                          { id: "TKT-493", user: "Ayesha Ahmed (Studio Host)", subject: "Accounting invoice CSV export fail", time: "25m ago" }
                        ].map(tkt => (
                          <div key={tkt.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2.5">
                                <h4 className="text-[13px] font-black text-slate-900">{tkt.subject}</h4>
                                <span className="text-[8px] font-bold bg-amber-50 text-amber-700 border border-amber-100 px-1.5 py-0.5 rounded uppercase">{tkt.id}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 font-bold mt-1">From: {tkt.user} • {tkt.time}</p>
                            </div>
                            <button 
                              onClick={() => triggerToast(`Ticket ${tkt.id} assigned. Responding via email.`)}
                              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold text-[10px]"
                            >
                              Assign Help
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                      <h3 className="font-black text-slate-900 text-sm">Help Performance Desk</h3>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Average Reply Latency:</span>
                          <span className="font-black text-[#0F5B3E]">4.8 mins</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">CSAT Score:</span>
                          <span className="font-black text-amber-600">4.92 / 5.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Active Chats:</span>
                          <span className="font-black text-purple-700">12</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: SECURITY OS */}
              {activeSection === "security" && (
                <div className="space-y-6 text-left">
                  <div>
                    <h2 className="text-[20px] font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <ShieldAlert className="w-5.5 h-5.5 text-[#0F5B3E]" /> Platform Security OS
                    </h2>
                    <p className="text-[12px] text-slate-500 font-semibold">Monitor suspicious transaction behaviors, audit security events, and view active database logins.</p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                    <h3 className="font-black text-slate-900 text-sm mb-4">Security Logs & Spam Auditing</h3>
                    <div className="space-y-3">
                      {[
                        { time: "13:42:05", ip: "182.168.10.42", desc: " Islamabad admin credentials generated from Islamabad Foyer IP", risk: "Low Risk" },
                        { time: "13:21:05", ip: "39.52.88.190", desc: "Payout disburse requested for Rs. 245,000 to Royal Banquets", risk: "Requires verification" }
                      ].map((log, i) => (
                        <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between text-xs">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[9px] text-slate-400">[{log.time}]</span>
                              <p className="font-bold text-slate-800">{log.desc}</p>
                            </div>
                            <span className="text-[9.5px] text-slate-400 block mt-1">Origin IP Address: {log.ip}</span>
                          </div>
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded text-[9.5px] font-bold">{log.risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* FALLBACK PANEL (Settings, Bookings, Events, AI Center, memories, etc.) */}
              {![ "overview", "users", "organizations", "marketplace", "finance", "apps", "displays", "support", "security" ].includes(activeSection) && (
                <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-xs text-center space-y-4">
                  <Info className="w-10 h-10 text-slate-300 mx-auto" />
                  <h3 className="font-black text-slate-900 capitalize">NEXUS {activeSection.replace("_", " ")} OS Panel</h3>
                  <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
                    This advanced system panel holds the roadmap modules configuration details for the 40 unified workspace integrations.
                  </p>
                  <Button 
                    size="sm"
                    onClick={() => triggerToast(`Command: Automated test check completed for ${activeSection}.`)}
                    className="bg-[#0F5B3E] text-white hover:bg-[#0A3B2A] rounded-xl font-bold text-xs"
                  >
                    Run Service Integrity Test Check
                  </Button>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>

    </div>
  )
}
