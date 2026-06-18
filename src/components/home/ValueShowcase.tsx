"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  Users, Building2, ChevronLeft, ChevronRight, 
  CheckCircle2, ArrowRight, ShieldCheck, Sparkles,
  Layers, Palette, BarChart3
} from "lucide-react"

interface FeatureItem {
  title: string;
  desc: string;
}

interface Slide {
  title: string;
  tagline: string;
  description: string;
  features: FeatureItem[];
  image: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
}

const hostSlides: Slide[] = [
  {
    title: "Stress-Free Planning",
    tagline: "Interactive Milestone Tracking",
    description: "Orchestrate your event step-by-step. Keep alignment on key dates, confirm vendor bookings, and monitor checklist items in real time.",
    features: [
      { title: "Visual Timeline", desc: "Interactive progress bar showing completed event milestones." },
      { title: "Action Reminders", desc: "Stay informed on upcoming payment schedules and vendor selections." },
      { title: "Collaborative Plan", desc: "Share milestone updates instantly with coordinators and family." }
    ],
    image: "/images/pakistani_wedding_venue.png",
    ctaText: "Get Started",
    ctaHref: "/sign-up?redirect_url=/portal",
    secondaryCtaText: "Customer Login",
    secondaryCtaHref: "/sign-in?redirect_url=/portal"
  },
  {
    title: "Stress-Free Planning",
    tagline: "Collaborative Media Proofing",
    description: "Access your memories seamlessly. Review galleries, select favorites, leave time-stamped video comments, and download final high-res files.",
    features: [
      { title: "Image Proofing", desc: "Select favorite photographs and organize them into curated albums." },
      { title: "Video Timestamps", desc: "Leave frame-by-frame review comments for your cinematic highlight video." },
      { title: "Direct CDN Downloads", desc: "High-speed secure downloads of digital photos directly from cloud storage." }
    ],
    image: "/images/pakistani_wedding_couple.png",
    ctaText: "Get Started",
    ctaHref: "/sign-up?redirect_url=/portal",
    secondaryCtaText: "Customer Login",
    secondaryCtaHref: "/sign-in?redirect_url=/portal"
  },
  {
    title: "Stress-Free Planning",
    tagline: "Secure Invoicing & Payments",
    description: "Clear and transparent financial records. Check itemized quotations, sign secure contracts, and settle balances directly.",
    features: [
      { title: "Smart Quotes", desc: "Review transparent, detailed price estimates from venues and vendors." },
      { title: "Salami Tracker", desc: "Manage digital salamies and cash gift records inside your host portal." },
      { title: "Installment Schedules", desc: "Track billing installments and clear pending invoices securely." }
    ],
    image: "/images/pakistani_mehndi_hands.png",
    ctaText: "Get Started",
    ctaHref: "/sign-up?redirect_url=/portal",
    secondaryCtaText: "Customer Login",
    secondaryCtaHref: "/sign-in?redirect_url=/portal"
  }
]

const businessSlides: Slide[] = [
  {
    title: "Revenue Growth",
    tagline: "CRM & Lead Pipeline",
    description: "Streamline client acquisition. Auto-capture incoming leads, track sales conversations, and ensure you never miss a client follow-up.",
    features: [
      { title: "Lead Inflow", desc: "Direct capture of client inquiries from search pages and custom landing forms." },
      { title: "Pipeline Tracking", desc: "Visual pipeline dashboard showing active deals and calculated values." },
      { title: "Conversion Engine", desc: "Automate follow-up prompts to nurture inquiries into confirmed bookings." }
    ],
    image: "/images/pakistani_bride_makeup.png",
    ctaText: "Register Business",
    ctaHref: "/sign-up?redirect_url=/dashboard",
    secondaryCtaText: "Business Login",
    secondaryCtaHref: "/sign-in?redirect_url=/dashboard"
  },
  {
    title: "Revenue Growth",
    tagline: "Smart Quotation Builder",
    description: "Construct professional estimations in seconds. Itemize packages, configure taxes, and sync online client agreements.",
    features: [
      { title: "Itemized Builder", desc: "Select services from a catalog to automatically compile professional invoices." },
      { title: "Secure E-Signatures", desc: "Attach custom terms of service and lock in digital signatures instantly." },
      { title: "Automated Reminders", desc: "Automate system prompts for installment due dates and outstanding bills." }
    ],
    image: "/images/mehndi_bridal.png",
    ctaText: "Register Business",
    ctaHref: "/sign-up?redirect_url=/dashboard",
    secondaryCtaText: "Business Login",
    secondaryCtaHref: "/sign-in?redirect_url=/dashboard"
  },
  {
    title: "Revenue Growth",
    tagline: "Workforce & Sync Dispatch",
    description: "Keep your on-site team perfectly coordinated. Dispatch field staff, assign task checklists, and manage booking occupancy calendar sync.",
    features: [
      { title: "Resource Scheduling", desc: "Track crew availability and dispatch technicians or photographers to active events." },
      { title: "Mobile Task Checklists", desc: "Field staff update task statuses directly from mobile check-in interfaces." },
      { title: "Booking Collision Guards", desc: "Lock out double-bookings automatically inside the shared dashboard calendar." }
    ],
    image: "/images/mehndi_arabic.png",
    ctaText: "Register Business",
    ctaHref: "/sign-up?redirect_url=/dashboard",
    secondaryCtaText: "Business Login",
    secondaryCtaHref: "/sign-in?redirect_url=/dashboard"
  }
]

export function ValueShowcase() {
  const { isSignedIn, isLoaded } = useUser()
  const [activeTab, setActiveTab] = useState<"host" | "business">("host")
  const [slideIndex, setSlideIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")

  const slides = activeTab === "host" ? hostSlides : businessSlides

  // Auto cycle slides
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection("right")
      setSlideIndex((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length, activeTab])

  const handleTabChange = (tab: "host" | "business") => {
    if (tab === activeTab) return
    setActiveTab(tab)
    setSlideIndex(0)
    setDirection(tab === "business" ? "right" : "left")
  }

  const nextSlide = () => {
    setDirection("right")
    setSlideIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setDirection("left")
    setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Animation variants
  const slideVariants = {
    enter: (dir: "left" | "right") => ({
      x: dir === "right" ? 120 : -120,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 260, damping: 28 },
        opacity: { duration: 0.25 }
      }
    },
    exit: (dir: "left" | "right") => ({
      x: dir === "right" ? -120 : 120,
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 260, damping: 28 },
        opacity: { duration: 0.25 }
      }
    })
  }

  const currentSlide = slides[slideIndex]

  return (
    <div className="w-full bg-card rounded-2xl border border-outline shadow-sm p-6 md:p-8 lg:p-12 relative overflow-hidden">
      {/* Decorative details */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.015] mix-blend-overlay pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Tab Switcher */}
      <div className="relative z-10 flex justify-center mb-8 md:mb-10">
        <div className="bg-muted p-1 rounded-xl flex gap-1 w-full max-w-md border border-outline relative">
          <motion.div 
            className="absolute top-1 bottom-1 bg-white rounded-lg border border-outline shadow-sm pointer-events-none"
            layoutId="activeShowcaseHighlight"
            initial={false}
            animate={{
              left: activeTab === "host" ? "4px" : "50%",
              width: "calc(50% - 4px)"
            }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />

          <button
            onClick={() => handleTabChange("host")}
            className={`flex-1 py-3 text-sm font-bold rounded-lg relative z-10 transition-colors flex items-center justify-center gap-2 ${
              activeTab === "host" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Event Host View</span>
          </button>

          <button
            onClick={() => handleTabChange("business")}
            className={`flex-1 py-3 text-sm font-bold rounded-lg relative z-10 transition-colors flex items-center justify-center gap-2 ${
              activeTab === "business" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span>Business Owner View</span>
          </button>
        </div>
      </div>

      {/* Interactive Sub-Carousel Display */}
      <div className="relative min-h-[460px] md:min-h-[430px] lg:min-h-[400px] z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${activeTab}-${slideIndex}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Value Content Section (Left side) */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs uppercase tracking-widest mb-6 w-max border border-outline">
                {activeTab === "host" ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> {currentSlide.title}
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" /> {currentSlide.title}
                  </>
                )}
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-4 text-foreground">
                {currentSlide.tagline}
              </h2>

              <p className="text-base text-muted-foreground mb-8 font-medium leading-relaxed max-w-lg">
                {currentSlide.description}
              </p>

              {/* Sub-features list */}
              <div className="space-y-4 mb-8">
                {currentSlide.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 border border-primary/10">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{feature.title}</p>
                      <p className="text-xs text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controls & Pagination Indicators */}
              <div className="flex items-center gap-4 mb-8">
                <button 
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-outline flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm bg-white shrink-0"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </button>
                
                <div className="flex gap-1.5">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSlideIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        slideIndex === idx ? "bg-primary w-6" : "bg-slate-200 w-2"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button 
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-outline flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm bg-white shrink-0"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>

              {/* Dynamic Authentication CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                {!isLoaded ? (
                  <div className="h-12 w-48 bg-slate-100 rounded-xl animate-pulse" />
                ) : isSignedIn ? (
                  <>
                    <Link href={activeTab === "host" ? "/portal" : "/dashboard"} className="w-full sm:w-auto">
                      <Button className="h-12 px-8 text-sm font-bold bg-[#0F5B3E] hover:bg-[#0c4931] text-white shadow-sm transition-all rounded-xl w-full flex items-center justify-center gap-2">
                        {activeTab === "host" ? "Go to Customer Portal" : "Go to Vendor Dashboard"} <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href={activeTab === "host" ? "/explore" : "/business"} className="w-full sm:w-auto">
                      <Button variant="outline" className="h-12 px-8 text-sm font-bold border-outline hover:bg-slate-50 transition-all rounded-xl w-full text-foreground">
                        {activeTab === "host" ? "Explore" : "Explore Solutions"}
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href={currentSlide.ctaHref} className="w-full sm:w-auto">
                      <Button className="h-12 px-8 text-sm font-bold bg-[#0F5B3E] hover:bg-[#0c4931] text-white shadow-sm transition-all rounded-xl w-full flex items-center justify-center gap-2">
                        {currentSlide.ctaText} <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href={currentSlide.secondaryCtaHref} className="w-full sm:w-auto">
                      <Button variant="outline" className="h-12 px-8 text-sm font-bold border-outline hover:bg-slate-50 transition-all rounded-xl w-full text-foreground">
                        {currentSlide.secondaryCtaText}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Split Screen Media Section (Right side) */}
            <div className="lg:col-span-6 flex items-center justify-center w-full">
              <div className="relative w-full aspect-[4/3] rounded-2xl border border-outline bg-muted overflow-hidden shadow-sm">
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.tagline}
                  fill
                  sizes="(max-w-768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
