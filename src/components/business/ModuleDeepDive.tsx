"use client"
import { motion } from "framer-motion"
import { 
  MessageSquare, FileText, CalendarCheck, 
  Users, MapPin, Package, Camera, Video, 
  BarChart3, Bot, CreditCard, MonitorPlay,
  Briefcase, Boxes, Image as ImageIcon, CheckCircle2, Building2, Check
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
                  <div className={`aspect-square md:aspect-[4/3] rounded-[2rem] bg-slate-950 border border-white/10 relative overflow-hidden p-6 shadow-2xl group flex flex-col justify-between`}>
                    {/* Mockup Dashboard Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        <span className="font-mono text-[10px] text-slate-400 ml-2">NEXUS Business Engine • active</span>
                      </div>
                      <span className="font-mono text-[9px] text-[#E6C594] uppercase tracking-wider">Live Panel</span>
                    </div>

                    {/* Simulated Dashboards Content based on module.id */}
                    <div className="flex-1 overflow-hidden relative flex flex-col justify-center">
                      {module.id === "communication" && (
                        <div className="bg-slate-900 rounded-xl p-4 border border-white/5 space-y-3">
                          <div className="flex justify-between items-center text-[11px] border-b border-white/5 pb-2 text-slate-400">
                            <span>Inbound WhatsApp Inquiries</span>
                            <span className="text-emerald-500 font-bold">• 4 New Leads</span>
                          </div>
                          <div className="space-y-2">
                            <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between text-xs text-white">
                              <div>
                                <span className="font-bold block text-left">Siddiqui Family (Baraat Request)</span>
                                <span className="text-[10px] text-slate-400 block text-left">"Looking for menu pricing..."</span>
                              </div>
                              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] rounded-md font-bold uppercase">Assign</span>
                            </div>
                            <div className="p-2.5 bg-white/5 border border-white/5 rounded-lg flex items-center justify-between text-xs text-white">
                              <div>
                                <span className="font-bold block text-left">Bilal & Ayesha (Mehndi)</span>
                                <span className="text-[10px] text-slate-400 block text-left">"Sent quotation proposal..."</span>
                              </div>
                              <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] rounded-md font-bold uppercase">Follow Up</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {module.id === "quotations" && (
                        <div className="bg-slate-900 rounded-xl p-4 border border-white/5 space-y-3">
                          <div className="flex justify-between items-center text-[11px] border-b border-white/5 pb-2 text-slate-400">
                            <span>Quotation Draft #8920</span>
                            <span className="text-[#E6C594] font-mono">Rs. 845,000</span>
                          </div>
                          <div className="space-y-1.5 text-xs text-slate-355 text-slate-300">
                            <div className="flex justify-between py-1 border-b border-white/5">
                              <span>Banquet Hall (Royal Palms)</span>
                              <span className="font-mono text-white">Rs. 450,000</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-white/5">
                              <span>Traditional Catering (300 heads)</span>
                              <span className="font-mono text-white">Rs. 240,000</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-white/5">
                              <span>Floral Theme Setup</span>
                              <span className="font-mono text-white">Rs. 155,000</span>
                            </div>
                          </div>
                          <div className="pt-2 flex justify-between items-center">
                            <span className="text-[10px] text-emerald-450 font-bold uppercase tracking-wider text-emerald-400">Estimated Profit: 34.2%</span>
                            <button className="bg-[#E6C594] text-slate-950 font-bold px-3 py-1 rounded text-[10px] uppercase">Generate PDF</button>
                          </div>
                        </div>
                      )}

                      {module.id === "venue" && (
                        <div className="bg-slate-900 rounded-xl p-3 border border-white/5 space-y-3">
                          <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-2 text-slate-400">
                            <span>Availability Calendar • Oct 2026</span>
                            <span className="text-red-400 font-bold uppercase tracking-wider text-[9px]">Conflict Alert Auto-Lock</span>
                          </div>
                          <div className="grid grid-cols-7 gap-1.5 text-center text-[9px] font-mono text-slate-500">
                            {['M','T','W','T','F','S','S'].map((day, dIdx) => <span key={dIdx}>{day}</span>)}
                            {Array.from({ length: 14 }).map((_, dayIdx) => {
                              const dayNum = dayIdx + 12
                              const isBooked = dayNum === 16 || dayNum === 17 || dayNum === 24
                              return (
                                <div 
                                  key={dayIdx} 
                                  className={`py-1.5 rounded-md border flex flex-col items-center justify-center font-bold ${
                                    isBooked 
                                      ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                                      : 'bg-white/5 border-white/5 text-slate-300'
                                  }`}
                                >
                                  <span>{dayNum}</span>
                                  {isBooked && <span className="text-[6px] uppercase tracking-tighter text-red-500 font-black">Booked</span>}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {module.id === "workforce" && (
                        <div className="bg-slate-900 rounded-xl p-4 border border-white/5 space-y-3">
                          <div className="flex justify-between items-center text-[11px] border-b border-white/5 pb-2 text-slate-400">
                            <span>Active Field Shift: Afternoon</span>
                            <span className="text-emerald-500 font-bold">14 Staff Present</span>
                          </div>
                          <div className="space-y-2">
                            <div className="p-2 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between text-[11px] text-white">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                <div className="text-left">
                                  <span className="font-bold block">Ahmed Khan (Supervisor)</span>
                                  <span className="text-[9px] text-slate-400 block">GPS Checked-in • Royal Palms Hall B</span>
                                </div>
                              </div>
                              <span className="font-mono text-slate-300">05:30 PM</span>
                            </div>
                            <div className="p-2 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between text-[11px] text-white">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
                                <div className="text-left">
                                  <span className="font-bold block">Kamran Shah (Catering Wager)</span>
                                  <span className="text-[9px] text-slate-400 block">GPS Active • 1.2km from Kitchen</span>
                                </div>
                              </div>
                              <span className="font-mono text-slate-300">06:15 PM</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {module.id === "creative" && (
                        <div className="bg-slate-900 rounded-xl p-3 border border-white/5 space-y-3">
                          <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-2 text-slate-400">
                            <span>Client Photo Selection • Wedding ID #104</span>
                            <span className="text-slate-300 font-bold">240 / 600 Selected</span>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {[
                              "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=150",
                              "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=150",
                              "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=150",
                              "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=150"
                            ].map((img, i) => (
                              <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-white/15">
                                <img src={img} className="w-full h-full object-cover" alt="" />
                                <div className="absolute top-1 right-1 bg-[#FF385C] rounded-full p-0.5 text-white">
                                  <Check className="w-2.5 h-2.5 stroke-2" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer badge */}
                    <div className="shrink-0 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-500">
                      <span>{module.imageAlt}</span>
                      <span className="text-slate-400 font-bold">Touch Friendly Dashboard view</span>
                    </div>

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
