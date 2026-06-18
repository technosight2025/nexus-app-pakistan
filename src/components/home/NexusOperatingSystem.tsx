"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Building2, MessageSquare, FileText, CalendarCheck, 
  Users, MapPin, Package, Camera, Video, 
  BarChart3, Bot, CreditCard, MonitorPlay,
  Briefcase, Boxes, Image as ImageIcon, CheckCircle2, ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const OS_CATEGORIES = [
  { id: "sales", label: "Sales & Comm", icon: MessageSquare },
  { id: "operations", label: "Operations & HR", icon: Users },
  { id: "venue", label: "Venue & Assets", icon: Building2 },
  { id: "creative", label: "Creative Review", icon: Camera },
  { id: "intelligence", label: "Finance & AI", icon: BarChart3 }
]

const MODULES_DATA = {
  sales: [
    {
      title: "Unified Communication Hub",
      icon: MessageSquare,
      problem: "WhatsApp chaos: Lost inquiries, missed follow-ups, no history.",
      solution: "Centralized Lead Inbox, Customer Timeline, Team Assignment, and WhatsApp Integration.",
      color: "blue"
    },
    {
      title: "Smart Quotation Engine",
      icon: FileText,
      problem: "Manual Excel/Word quotes cause errors and delays.",
      solution: "Dynamic Package Builder, PDF Generation, Online Approval, and E-Signatures.",
      color: "emerald"
    },
    {
      title: "CRM & Lead Pipeline",
      icon: Briefcase,
      problem: "Hard to track which client is at which stage.",
      solution: "Visual Pipeline, Site Visit Tracking, and Opportunity Management.",
      color: "purple"
    }
  ],
  operations: [
    {
      title: "Daily Wager Management",
      icon: Users,
      problem: "Relying on temporary labor (waiters, setup crew) without proper tracking.",
      solution: "Worker Profiles, GPS Check-In, Shift Assignment, and Daily Wage Calculation.",
      color: "orange"
    },
    {
      title: "Field Operations Center",
      icon: MapPin,
      problem: "Owners lack visibility of staff deployment during live events.",
      solution: "Live Staff Tracking, Task Completion Tracking, and Deployment Status.",
      color: "rose"
    },
    {
      title: "Event-Day Coordination",
      icon: CalendarCheck,
      problem: "Teams rely entirely on personal calls during the event chaos.",
      solution: "Live Status Updates, Escalation Alerts, and Event Readiness Dashboard.",
      color: "blue"
    }
  ],
  venue: [
    {
      title: "Venue Management System",
      icon: Building2,
      problem: "Double booking halls and disjointed resource allocation.",
      solution: "Live Availability Calendar, Booking Locking, and Conflict Detection.",
      color: "emerald"
    },
    {
      title: "Asset & Inventory Tracking",
      icon: Package,
      problem: "Large financial losses due to missing cameras, speakers, or decor.",
      solution: "QR Tracking, Deployment Logs, Maintenance History, and Damage Reports.",
      color: "purple"
    },
    {
      title: "Digital Signage Ecosystem",
      icon: MonitorPlay,
      problem: "Manual management of welcome screens and hall directions.",
      solution: "Centralized control for Welcome Screens, Wayfinding, Menus, and Announcements.",
      color: "indigo"
    }
  ],
  creative: [
    {
      title: "Photo Selection Portal",
      icon: ImageIcon,
      problem: "Inefficient Google Drive/USB loops for photo selection.",
      solution: "Online Gallery, Favorites, Shortlisting, AI Face Grouping, and Approval Workflows.",
      color: "rose"
    },
    {
      title: "Video Review Workflow",
      icon: Video,
      problem: "Clients struggle to give precise feedback on event videos.",
      solution: "Draft Review, Version Tracking, and Time-Based Comments.",
      color: "orange"
    },
    {
      title: "NEXUS Memories Archive",
      icon: Boxes,
      problem: "No permanent, easily accessible archive for long-term storage.",
      solution: "Digital Albums, Guest Messages, QR Sharing, and Vendor Upload Portal.",
      color: "blue"
    }
  ],
  intelligence: [
    {
      title: "Payment Tracking Module",
      icon: CreditCard,
      problem: "Struggling to track advance payments, installments, and refunds.",
      solution: "Installment Plans, Balance Alerts, Due Date Notifications, and Receipts.",
      color: "emerald"
    },
    {
      title: "Business Analytics Platform",
      icon: BarChart3,
      problem: "Lack of insights into which service/vendor is most profitable.",
      solution: "Revenue Dashboards, Profitability Reports, and Staff Performance metrics.",
      color: "indigo"
    },
    {
      title: "AI Business Assistant",
      icon: Bot,
      problem: "Operations require constant manual monitoring and forecasting.",
      solution: "Automated Staff Shortage Alerts, Revenue Insights, and Lead Follow-up Reminders.",
      color: "primary"
    }
  ]
}

const COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-500 text-white shadow-blue-500/20 border-blue-600",
  emerald: "bg-emerald-500 text-white shadow-emerald-500/20 border-emerald-600",
  purple: "bg-purple-500 text-white shadow-purple-500/20 border-purple-600",
  orange: "bg-orange-500 text-white shadow-orange-500/20 border-orange-600",
  rose: "bg-rose-500 text-white shadow-rose-500/20 border-rose-600",
  indigo: "bg-indigo-500 text-white shadow-indigo-500/20 border-indigo-600",
  primary: "bg-primary text-white shadow-primary/20 border-primary"
}

const BG_MAP: Record<string, string> = {
  blue: "bg-blue-50",
  emerald: "bg-emerald-50",
  purple: "bg-purple-50",
  orange: "bg-orange-50",
  rose: "bg-rose-50",
  indigo: "bg-indigo-50",
  primary: "bg-primary/5"
}

const TEXT_MAP: Record<string, string> = {
  blue: "text-blue-600",
  emerald: "text-emerald-600",
  purple: "text-purple-600",
  orange: "text-orange-600",
  rose: "text-rose-600",
  indigo: "text-indigo-600",
  primary: "text-primary"
}

export function NexusOperatingSystem() {
  const [activeTab, setActiveTab] = useState("sales")

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Dynamic Backgrounds */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full filter blur-[120px] opacity-50 translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full filter blur-[100px] opacity-50 -translate-x-1/3 translate-y-1/4 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-slate-200 border border-white/20 font-bold mb-6 text-sm backdrop-blur-md"
          >
            <Building2 className="w-4 h-4 text-primary" />
            FOR INDUSTRY PROFESSIONALS
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight"
          >
            Pakistan's Event & Hospitality <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-yellow-400">Operating System</span>
          </motion.h2>
          <p className="text-lg md:text-xl text-slate-300 font-medium">
            NEXUS is not just a marketplace. We provide the complete backend infrastructure to automate, manage, and scale your event business.
          </p>
        </div>

        {/* Interactive OS Dashboard */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 md:p-8 shadow-lg">
          
          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2">
            {OS_CATEGORIES.map(category => {
              const isActive = activeTab === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm whitespace-nowrap transition-all flex-1 justify-center ${
                    isActive 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <category.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  {category.label}
                </button>
              )
            })}
          </div>

          {/* Module Content Area */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {(MODULES_DATA[activeTab as keyof typeof MODULES_DATA] || []).map((module, idx) => (
                  <div 
                    key={idx} 
                    className="bg-slate-900 border border-slate-700/50 rounded-3xl p-6 flex flex-col group hover:border-slate-600 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 filter blur-3xl rounded-full transition-opacity group-hover:opacity-20 ${COLOR_MAP[module.color]}`} />
                    
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg border ${COLOR_MAP[module.color]}`}>
                      <module.icon className="w-6 h-6" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4 pr-4">{module.title}</h3>
                    
                    <div className="flex-1 space-y-4">
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-rose-500/10">
                        <span className="block text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">Pain Point</span>
                        <p className="text-sm text-slate-300 font-medium">{module.problem}</p>
                      </div>
                      
                      <div className={`rounded-xl p-4 border border-white/5 bg-gradient-to-br from-white/5 to-transparent`}>
                        <span className={`block text-xs font-bold uppercase tracking-wider mb-1 ${TEXT_MAP[module.color]}`}>NEXUS Solution</span>
                        <p className="text-sm text-white font-medium flex items-start gap-2">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${TEXT_MAP[module.color]}`} />
                          {module.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-700/50 text-center">
            <Link href="/business">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full font-bold px-8 h-14">
                Explore All B2B Modules <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
