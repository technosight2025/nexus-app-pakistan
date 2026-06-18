"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Building2, Users, Receipt, Calendar, 
  ArrowRight, CheckCircle2, ChevronRight,
  Sparkles, Camera, MapPin, Inbox, Clock, ShieldCheck
} from "lucide-react"

type TabType = "b2c" | "b2b"

export function LandingSlider() {
  const { isSignedIn, isLoaded } = useUser()
  const [activeTab, setActiveTab] = useState<TabType>("b2c")
  const [direction, setDirection] = useState<"left" | "right">("right")

  const handleTabChange = (tab: TabType) => {
    if (tab === activeTab) return
    setDirection(tab === "b2b" ? "right" : "left")
    setActiveTab(tab)
  }

  // Animation variants for sliding content
  const slideVariants = {
    enter: (dir: "left" | "right") => ({
      x: dir === "right" ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (dir: "left" | "right") => ({
      x: dir === "right" ? -100 : 100,
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  }

  return (
    <div className="w-full bg-card rounded-2xl border border-outline shadow-sm p-6 md:p-8 lg:p-12 relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.015] mix-blend-overlay pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Segmented Switcher Controls */}
      <div className="relative z-10 flex justify-center mb-8 md:mb-12">
        <div className="bg-muted p-1 rounded-xl flex gap-1 w-full max-w-md border border-outline relative">
          {/* Animated background highlight block */}
          <motion.div 
            className="absolute top-1 bottom-1 bg-white rounded-lg border border-outline shadow-sm pointer-events-none"
            layoutId="activeHighlight"
            initial={false}
            animate={{
              left: activeTab === "b2c" ? "4px" : "50%",
              width: "calc(50% - 4px)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          />

          <button
            onClick={() => handleTabChange("b2c")}
            className={`flex-1 py-3 text-sm font-bold rounded-lg relative z-10 transition-colors flex items-center justify-center gap-2 ${
              activeTab === "b2c" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Plan an Event</span>
          </button>

          <button
            onClick={() => handleTabChange("b2b")}
            className={`flex-1 py-3 text-sm font-bold rounded-lg relative z-10 transition-colors flex items-center justify-center gap-2 ${
              activeTab === "b2b" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span>Grow Your Business</span>
          </button>
        </div>
      </div>

      {/* Slide Carousel Frame */}
      <div className="relative min-h-[460px] md:min-h-[420px] lg:min-h-[380px]">
        <AnimatePresence mode="wait" custom={direction}>
          {activeTab === "b2c" ? (
            <motion.div
              key="b2c-slide"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Heading & CTAs */}
              <div className="lg:col-span-6 flex flex-col justify-center text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs uppercase tracking-widest mb-6 w-max border border-outline">
                  <Sparkles className="w-3.5 h-3.5 text-primary" /> For Hosts & Clients
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-4 text-foreground">
                  The Customer Portal.<br/>
                  <span className="text-primary">Plan Your Event.</span>
                </h2>

                <p className="text-base text-muted-foreground mb-8 font-medium leading-relaxed max-w-lg">
                  Everything you need to orchestrate your event in one secure, collaborative space. Confirm vendors, approve media, track invoices, and see your progress in real-time.
                </p>

                {/* Bullet Features */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Interactive Milestone Tracker</p>
                      <p className="text-xs text-muted-foreground">Keep an eye on key deliverables from checklists to final payments.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Camera className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Secured Media proofing</p>
                      <p className="text-xs text-muted-foreground">Preview, favorite, comment, and download photos/videos from your studio.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Receipt className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Direct Quotations & Billing</p>
                      <p className="text-xs text-muted-foreground">Review itemized quotations from venues and vendors and clear payments.</p>
                    </div>
                  </div>
                </div>

                {/* Auth-sensitive Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  {!isLoaded ? (
                    <div className="h-12 w-48 bg-slate-100 rounded-xl animate-pulse" />
                  ) : isSignedIn ? (
                    <>
                      <Link href="/portal" className="w-full sm:w-auto">
                        <Button className="h-12 px-8 text-sm font-bold bg-[#0F5B3E] hover:bg-[#0c4931] text-white shadow-sm transition-all rounded-xl w-full flex items-center justify-center gap-2">
                          Go to Customer Portal <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href="/explore" className="w-full sm:w-auto">
                        <Button variant="outline" className="h-12 px-8 text-sm font-bold border-outline hover:bg-slate-50 transition-all rounded-xl w-full text-foreground">
                          Explore
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/sign-in?redirect_url=/portal" className="w-full sm:w-auto">
                        <Button className="h-12 px-8 text-sm font-bold bg-[#0F5B3E] hover:bg-[#0c4931] text-white shadow-sm transition-all rounded-xl w-full flex items-center justify-center gap-2">
                          Customer Login <ChevronRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href="/sign-up?redirect_url=/portal" className="w-full sm:w-auto">
                        <Button variant="outline" className="h-12 px-8 text-sm font-bold border-outline hover:bg-slate-50 transition-all rounded-xl w-full text-foreground">
                          Create Account
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Right Column: High-fidelity Visual Mockup */}
              <div className="lg:col-span-6 bg-slate-50 border border-outline rounded-2xl p-6 relative shadow-sm overflow-hidden select-none">
                <div className="absolute top-2 right-2 flex gap-1.5 z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                </div>
                
                {/* Header Profile Info */}
                <div className="flex items-center gap-3 border-b border-outline pb-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                    AH
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Welcome back, Ali</h4>
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Customer Portal Dashboard</p>
                  </div>
                  <span className="ml-auto px-2 py-0.5 rounded-md bg-secondary-container text-secondary text-[10px] font-black uppercase">
                    Active Event
                  </span>
                </div>

                {/* Milestone Progress Bar Mockup */}
                <div className="bg-white border border-outline rounded-xl p-4 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-foreground">Event Checklist Completion</span>
                    <span className="text-xs font-black text-primary">75% Complete</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-primary rounded-full" />
                  </div>
                  <div className="grid grid-cols-4 gap-1 mt-3">
                    <div className="h-1 bg-primary rounded-full" />
                    <div className="h-1 bg-primary rounded-full" />
                    <div className="h-1 bg-primary rounded-full" />
                    <div className="h-1 bg-slate-200 rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Media shortlisting preview mockup */}
                <div className="bg-white border border-outline rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-foreground">Recent Album Delivery</span>
                    <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 2 hours ago
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="aspect-video bg-slate-100 rounded-lg relative overflow-hidden flex items-center justify-center">
                      <Camera className="w-4 h-4 text-slate-400" />
                      <span className="absolute bottom-1 right-1 text-[8px] bg-black/60 text-white px-1 py-0.2 rounded font-mono">001.jpg</span>
                    </div>
                    <div className="aspect-video bg-slate-100 rounded-lg relative overflow-hidden flex items-center justify-center border border-primary/20">
                      <Camera className="w-4 h-4 text-primary" />
                      <span className="absolute bottom-1 right-1 text-[8px] bg-primary text-white px-1 py-0.2 rounded font-mono">002.jpg</span>
                      <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full" />
                    </div>
                    <div className="aspect-video bg-slate-100 rounded-lg relative overflow-hidden flex items-center justify-center">
                      <Camera className="w-4 h-4 text-slate-400" />
                      <span className="absolute bottom-1 right-1 text-[8px] bg-black/60 text-white px-1 py-0.2 rounded font-mono">003.jpg</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="b2b-slide"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Heading & CTAs */}
              <div className="lg:col-span-6 flex flex-col justify-center text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs uppercase tracking-widest mb-6 w-max border border-outline">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" /> For Vendors & Businesses
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-4 text-foreground">
                  The Vendor OS.<br/>
                  <span className="text-primary">Grow Your Business.</span>
                </h2>

                <p className="text-base text-muted-foreground mb-8 font-medium leading-relaxed max-w-lg">
                  A complete, professional SaaS operating system to run event businesses. Auto-capture leads, construct and dispatch invoices, sync calendars, and coordinate teams.
                </p>

                {/* Bullet Features */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">CRM & Lead Management</p>
                      <p className="text-xs text-muted-foreground">Capture client inquiries, track deal values, and organize communications.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Receipt className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Professional Quotation Builder</p>
                      <p className="text-xs text-muted-foreground">Build custom, itemized invoices in seconds and sync contract agreements.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Workforce Scheduling Grid</p>
                      <p className="text-xs text-muted-foreground">Coordinate shifts, assign tasks to daily staff, and check calendar booking status.</p>
                    </div>
                  </div>
                </div>

                {/* Auth-sensitive Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  {!isLoaded ? (
                    <div className="h-12 w-48 bg-slate-100 rounded-xl animate-pulse" />
                  ) : isSignedIn ? (
                    <>
                      <Link href="/dashboard" className="w-full sm:w-auto">
                        <Button className="h-12 px-8 text-sm font-bold bg-[#0F5B3E] hover:bg-[#0c4931] text-white shadow-sm transition-all rounded-xl w-full flex items-center justify-center gap-2">
                          Go to Vendor Dashboard <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href="/business" className="w-full sm:w-auto">
                        <Button variant="outline" className="h-12 px-8 text-sm font-bold border-outline hover:bg-slate-50 transition-all rounded-xl w-full text-foreground">
                          Explore Solutions
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/sign-up?redirect_url=/dashboard" className="w-full sm:w-auto">
                        <Button className="h-12 px-8 text-sm font-bold bg-[#0F5B3E] hover:bg-[#0c4931] text-white shadow-sm transition-all rounded-xl w-full flex items-center justify-center gap-2">
                          Register Business <ChevronRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href="/sign-in?redirect_url=/dashboard" className="w-full sm:w-auto">
                        <Button variant="outline" className="h-12 px-8 text-sm font-bold border-outline hover:bg-slate-50 transition-all rounded-xl w-full text-foreground">
                          Business Login
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Right Column: High-fidelity Visual Mockup */}
              <div className="lg:col-span-6 bg-slate-50 border border-outline rounded-2xl p-6 relative shadow-sm overflow-hidden select-none">
                <div className="absolute top-2 right-2 flex gap-1.5 z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                </div>
                
                {/* Header Profile Info */}
                <div className="flex items-center gap-3 border-b border-outline pb-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                    OS
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">NEXUS Business Engine</h4>
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Enterprise Management Suite</p>
                  </div>
                  <span className="ml-auto px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Connected
                  </span>
                </div>

                {/* Dashboard Metrics Cards */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white border border-outline rounded-xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Monthly Pipeline</span>
                    <h5 className="text-base font-black text-foreground mt-1">Rs: 1,840,000</h5>
                    <span className="text-[9px] font-bold text-emerald-600 block mt-1">+12.4% vs last month</span>
                  </div>
                  <div className="bg-white border border-outline rounded-xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Conversion Rate</span>
                    <h5 className="text-base font-black text-foreground mt-1">28.4%</h5>
                    <span className="text-[9px] font-bold text-emerald-600 block mt-1">8/22 inquiries converted</span>
                  </div>
                </div>

                {/* Lead Pipeline Item Mockup */}
                <div className="bg-white border border-outline rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-xs font-bold text-foreground">Recent Lead Activity</span>
                    <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">New Lead</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-outline flex items-center justify-center shrink-0">
                      <Inbox className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">Catering Request: 300 Pax</p>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> PC Hotel Lahore
                      </p>
                    </div>
                    <span className="text-xs font-black text-foreground">Rs. 450k</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
