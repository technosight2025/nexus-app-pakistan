"use client"
import { motion } from "framer-motion"
import { 
  MessageSquare, FileText, CalendarCheck, 
  Users, MapPin, Package, Camera, Video, 
  BarChart3, Bot, CreditCard, MonitorPlay,
  Briefcase, Boxes, Image as ImageIcon, CheckCircle2, Building2
} from "lucide-react"

const MODULES = [
  {
    id: "communication",
    title: "Unified Communication Hub",
    description: "Tired of managing inquiries across 5 different WhatsApp numbers? NEXUS brings all your leads, conversations, and follow-ups into a single, unified inbox.",
    icon: MessageSquare,
    color: "blue",
    features: [
      "Centralized Lead Inbox",
      "Customer Timeline History",
      "Automated Follow-up Tracking",
      "Team Assignment Routing"
    ],
    imageAlt: "Communication Dashboard UI"
  },
  {
    id: "quotations",
    title: "Smart Quotation Engine",
    description: "Stop calculating manual quotes on Excel. Build dynamic packages with add-ons, generate branded PDFs, and collect secure e-signatures in seconds.",
    icon: FileText,
    color: "emerald",
    features: [
      "Dynamic Package Builder",
      "Real-time Profit Margin Calculation",
      "One-click PDF Generation",
      "Online Approval Workflow"
    ],
    imageAlt: "Quotation Engine UI"
  },
  {
    id: "venue",
    title: "Venue & Asset Management",
    description: "Say goodbye to double bookings and lost equipment. Lock halls in real-time and track your expensive assets with QR deployment logs.",
    icon: Building2,
    color: "purple",
    features: [
      "Live Availability Calendar",
      "Booking Conflict Detection",
      "QR Asset Tracking",
      "Digital Signage Integration"
    ],
    imageAlt: "Venue Calendar UI"
  },
  {
    id: "workforce",
    title: "Workforce & Daily Wagers",
    description: "The industry runs on temporary labor. Track your waiters, decorators, and security staff with GPS check-ins and automated daily wage calculation.",
    icon: Users,
    color: "orange",
    features: [
      "Daily Wager Profiles",
      "GPS Shift Check-In",
      "Live Field Deployment Tracking",
      "Payroll & Performance Tracking"
    ],
    imageAlt: "Workforce Map UI"
  },
  {
    id: "creative",
    title: "Creative Approval Portals",
    description: "Photographers and videographers waste hours via Google Drive. Use our dedicated portal for photo shortlisting, time-based video comments, and final delivery.",
    icon: Camera,
    color: "rose",
    features: [
      "Client Photo Shortlisting",
      "Time-Based Video Comments",
      "AI Face Grouping",
      "NEXUS Memories Archive"
    ],
    imageAlt: "Photo Selection UI"
  }
]

const COLOR_STYLES: Record<string, { bg: string, text: string, border: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" },
  orange: { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-200" },
  rose: { bg: "bg-rose-100", text: "text-rose-600", border: "border-rose-200" }
}

export function ModuleDeepDive() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6">
            The Anatomy of the OS
          </h2>
          <p className="text-xl text-slate-600 font-medium">
            Explore the specialized modules built to solve the most painful operational bottlenecks in the Pakistani event industry.
          </p>
        </div>

        <div className="space-y-32">
          {MODULES.map((module, idx) => {
            const isReversed = idx % 2 !== 0
            const colors = COLOR_STYLES[module.color]

            return (
              <div key={module.id} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Content Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="flex-1 space-y-8"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${colors.bg} ${colors.text} mb-6`}>
                    <module.icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{module.title}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">{module.description}</p>
                  
                  <ul className="space-y-4">
                    {module.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-slate-800 font-medium">
                        <CheckCircle2 className={`w-6 h-6 ${colors.text} flex-shrink-0`} />
                        <span className="text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Image/Mockup Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-1 w-full"
                >
                  <div className={`aspect-square md:aspect-[4/3] rounded-xl ${colors.bg} ${colors.border} border-2 relative overflow-hidden flex items-center justify-center shadow-xl group`}>
                    {/* Placeholder for actual dashboard UI images */}
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-sm group-hover:bg-transparent transition-colors duration-500 z-10" />
                    
                    <div className="relative z-20 text-center p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm group-hover:scale-105 transition-transform duration-500">
                      <module.icon className={`w-16 h-16 mx-auto mb-4 ${colors.text}`} />
                      <h4 className="text-xl font-bold text-slate-900">{module.imageAlt} Preview</h4>
                      <p className="text-slate-500 mt-2 text-sm">Interactive dashboard visualization</p>
                    </div>

                    {/* Decorative abstract shapes */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/30 rounded-full blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/5 rounded-full blur-2xl" />
                  </div>
                </motion.div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
