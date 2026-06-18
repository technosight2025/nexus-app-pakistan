"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { 
  Building2, Users, Receipt, 
  Briefcase, Tv, Camera, Film, Wrench, 
  MapPin, Heart, Plus, Sparkles, Bot, Clock, Search,
  ArrowRight, ShieldCheck, Star, MessageSquare
} from "lucide-react"
import { MOCK_VENUES } from "@/components/search/MockData"
import { useUser } from "@clerk/nextjs"
import { ValueShowcase } from "./ValueShowcase"
import { PublicHero } from "./PublicHero"
import { CategoryGrid } from "./CategoryGrid"
import { TrendingVendors } from "./TrendingVendors"
import { InspirationGallery } from "./InspirationGallery"
import { Testimonials } from "./Testimonials"
import { HeritageHubSection } from "./HeritageHubSection"

const QUICK_ACTIONS = [
  { title: "Find Venue", desc: "Discover and book premium locations", icon: Building2, href: "/search?tab=venues" },
  { title: "Find Vendor", desc: "Hire top-rated event professionals", icon: Users, href: "/search?tab=vendors" },
  { title: "Request Quote", desc: "Get custom pricing from multiple vendors", icon: Receipt, href: "/dashboard/venue/quotations" },
]

const ECOSYSTEM_CARDS = [
  { title: "Memories", desc: "Store & share event media", icon: Heart },
  { title: "Media Studios", desc: "Hire photo & video teams", icon: Camera },
  { title: "Equipment", desc: "Rent tech & production gear", icon: Wrench },
  { title: "Freelancers", desc: "Hire daily staff & crew", icon: Briefcase },
]

const CATEGORIES = [
  "Photography", "Decorators", "Caterers", "Venues", 
  "Restaurants", "Event Managers", "Equipment Providers", "DJs & Sound"
]

export function IndustrialBentoHome() {
  const { isSignedIn } = useUser()
  const [activePersona, setActivePersona] = useState<'host' | 'vendor' | 'freelancer'>('host')

  return (
    <div className="w-full bg-background min-h-screen py-8 md:py-12 text-foreground font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* The 12-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 auto-rows-[minmax(120px,auto)]">
          
          {/* ================= ROW 1: ENTRANCE HERO ================= */}
          <div className="md:col-span-12">
            <PublicHero activePersona={activePersona} setActivePersona={setActivePersona} />
          </div>

          {activePersona === 'host' && (
            <>

          {/* ================= ROW 1.5: VALUE SHOWCASE ================= */}
          <div className="md:col-span-12 lg:row-span-2">
            <ValueShowcase />
          </div>

          {/* ================= ROW 1.5: SOCIAL PROOF ================= */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="md:col-span-12 py-6 flex flex-col items-center justify-center border border-outline bg-card/50 rounded-2xl shadow-[0_8px_24px_rgba(15,91,62,0.01)]"
          >
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-5">Trusted by Pakistan's Top Event Brands</p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 lg:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 w-full px-4">
              <div className="text-xl md:text-2xl font-black font-serif tracking-tighter">PEARL CONTINENTAL</div>
              <div className="text-xl md:text-2xl font-black tracking-widest uppercase">Avari</div>
              <div className="text-lg md:text-xl font-bold italic tracking-wider">Shiza Hassan</div>
              <div className="text-xl md:text-2xl font-medium tracking-widest">NISHAT</div>
              <div className="text-lg md:text-xl font-black uppercase tracking-widest text-center">Hanif Jewellers</div>
            </div>
          </motion.div>

          {/* ================= ROW 2: BUSINESS SOLUTIONS ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="md:col-span-12 bg-card rounded-2xl border border-outline shadow-[0_8px_24px_rgba(15,91,62,0.02)] p-8 lg:p-12 relative overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
              {/* Text Content */}
              <div className="lg:w-1/3 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6 w-max">
                  <ShieldCheck className="w-3 h-3" /> Enterprise Tools
                </div>
                <h3 className="text-3xl lg:text-4xl font-black mb-4 tracking-tight leading-[1.1] text-foreground">Run your entire event operation.</h3>
                <p className="text-muted-foreground text-base font-medium mb-8 leading-relaxed">
                  From the first inquiry to the final payout, Nexus handles the busywork so you can focus on delivering unforgettable experiences.
                </p>
                <Link href="/business">
                  <Button className="h-12 px-8 text-sm font-bold bg-foreground hover:bg-foreground/90 text-white shadow-sm rounded-xl w-full sm:w-max">
                    View All Vendor Features
                  </Button>
                </Link>
              </div>

              {/* The 3 Value Props */}
              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 w-full">
                {/* Prop 1 */}
                <div className="bg-slate-50 rounded-2xl p-6 lg:p-8 border border-outline group hover:border-primary/30 hover:bg-white transition-all shadow-sm hover:shadow-md">
                  <div className="w-12 h-12 rounded-xl bg-white border border-outline flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-black text-foreground mb-3 text-lg lg:text-xl leading-tight">Lead Management</h4>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Auto-capture inquiries from multiple channels, track client statuses, and never miss a follow-up with our smart CRM.
                  </p>
                </div>

                {/* Prop 2 */}
                <div className="bg-slate-50 rounded-2xl p-6 lg:p-8 border border-outline group hover:border-primary/30 hover:bg-white transition-all shadow-sm hover:shadow-md">
                  <div className="w-12 h-12 rounded-xl bg-white border border-outline flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1">
                    <Receipt className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-black text-foreground mb-3 text-lg lg:text-xl leading-tight">Smart Invoicing</h4>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Build beautiful, itemized quotations in seconds, automate payment reminders, and track your revenue securely.
                  </p>
                </div>

                {/* Prop 3 */}
                <div className="bg-slate-50 rounded-2xl p-6 lg:p-8 border border-outline group hover:border-primary/30 hover:bg-white transition-all shadow-sm hover:shadow-md">
                  <div className="w-12 h-12 rounded-xl bg-white border border-outline flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-black text-foreground mb-3 text-lg lg:text-xl leading-tight">Workforce Sync</h4>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Schedule your staff, assign day-of tasks, and coordinate your entire team seamlessly directly from the dashboard.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ================= ROW 3: QUICK ACTIONS & DISPLAYS ================= */}
          <div className="md:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            {/* Quick Actions (6 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
            >
              {QUICK_ACTIONS.map((action, i) => (
                <div 
                  key={action.title}
                  className={`bg-card rounded-2xl border border-outline shadow-[0_8px_24px_rgba(15,91,62,0.02)] p-6 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,91,62,0.06)] transition-all cursor-pointer group flex flex-col justify-between ${i === 2 ? 'sm:col-span-2' : ''}`}
                >
                  <Link href={action.href} className="block h-full">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-outline flex items-center justify-center mb-4 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
                        <action.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="font-bold text-lg text-foreground mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground font-medium">{action.desc}</p>
                    </div>
                    <div className="mt-4 flex items-center text-primary text-sm font-bold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                      Get Started <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </Link>
                </div>
              ))}
            </motion.div>

            {/* Heritage Vaults (6 cols) */}
            <div className="lg:col-span-6">
              <HeritageHubSection />
            </div>
          </div>

          {/* ================= ROW 4: FEATURED VENUES & ASSISTANT ================= */}
          <div className="md:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            {/* Featured Venues (8 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="lg:col-span-8 bg-card rounded-2xl border border-outline shadow-[0_8px_24px_rgba(15,91,62,0.02)] p-6 lg:p-8 flex flex-col group overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-xl lg:text-2xl text-foreground">Featured Venues</h3>
                <Link href="/search?tab=venues" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {MOCK_VENUES.slice(0, 2).map(venue => (
                  <div key={venue.id} className="relative rounded-xl overflow-hidden border border-outline h-[240px] group/venue cursor-pointer shadow-sm">
                    <Image src={venue.images[0]} alt={venue.name} fill className="object-cover group-hover/venue:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-1 text-xs font-bold mb-1 opacity-90">
                        <MapPin className="w-3 h-3" /> {venue.location}
                      </div>
                      <h4 className="font-black text-xl leading-tight mb-2">{venue.name}</h4>
                      <div className="flex justify-between items-center">
                        <div className="text-xs font-medium">From Rs: {(venue.pricePerHead || 0).toLocaleString()}</div>
                        <div className="flex items-center gap-1 text-xs font-bold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {venue.rating}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Assistant (4 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
              className="lg:col-span-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-[0_8px_32px_rgba(0,0,0,0.2)] p-6 lg:p-8 text-white relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/5">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Nexus Assistant</h3>
                    <p className="text-sm text-slate-400 font-medium">Powered by AI</p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer backdrop-blur-sm">
                    <p className="text-sm font-medium">"Find me a premium photographer under 150k in Lahore"</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer backdrop-blur-sm">
                    <p className="text-sm font-medium">"Suggest catering menus for 500 guests"</p>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center bg-white/10 rounded-xl border border-white/10 focus-within:border-white/30 transition-all p-1">
                <input
                  type="text"
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent px-3 py-2 outline-none text-sm font-medium text-white placeholder:text-slate-400 w-full"
                />
                <button className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0">
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* ================= ROW 4.5: TRENDING VENDORS ================= */}
          <div className="md:col-span-12">
            <TrendingVendors />
          </div>

          {/* ================= ROW 5: ECOSYSTEM & CATEGORIES ================= */}
          <div className="md:col-span-12 mt-12">
            <CategoryGrid />
          </div>

          {/* ================= ROW 6: INSPIRATION GALLERY ================= */}
          <div className="md:col-span-12 mt-12">
            <InspirationGallery />
          </div>

          {/* ================= ROW 7: TESTIMONIALS ================= */}
          <div className="md:col-span-12 mt-12">
            <Testimonials />
          </div>
          </>
          )}

          {activePersona === 'vendor' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-12 mt-12 mb-24 grid grid-cols-1 lg:grid-cols-2 bg-card rounded-[40px] border border-outline shadow-xl overflow-hidden group"
            >
              <div className="relative min-h-[400px] lg:min-h-[500px] overflow-hidden">
                <Image 
                  src="/images/vendor_dashboard_venue.png" 
                  alt="Elite Vendor Operations" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-16">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-6">
                  Showcase Your Venue to High-Net-Worth Clients.
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium mb-10 leading-relaxed">
                  Access full CRM, automated booking calendars, and zero-friction invoicing tools tailored for elite venues.
                </p>
                <Button className="h-14 px-10 text-base font-bold bg-[#0A3B2A] hover:bg-[#0A3B2A]/90 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all rounded-full w-max">
                  Apply for Vetted Status
                </Button>
              </div>
            </motion.div>
          )}

          {activePersona === 'freelancer' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-12 mt-12 mb-24 grid grid-cols-1 lg:grid-cols-2 bg-card rounded-[40px] border border-outline shadow-xl overflow-hidden group"
            >
              <div className="flex flex-col justify-center p-8 lg:p-16 order-2 lg:order-1">
                <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-rose-500" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-6">
                  Monetize Your Craft on Pakistan's Elite Heritage Marketplace.
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium mb-10 leading-relaxed">
                  Whether you are a master calligrapher, premium makeup artist, or independent stylist—get booked alongside premier brands.
                </p>
                <Button className="h-14 px-10 text-base font-bold bg-[#0A3B2A] hover:bg-[#0A3B2A]/90 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all rounded-full w-max">
                  Create Artisan Portfolio
                </Button>
              </div>
              <div className="relative min-h-[400px] lg:min-h-[500px] overflow-hidden order-1 lg:order-2">
                <Image 
                  src="/images/artisan_freelancer_elite.png" 
                  alt="Elite Artisans" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  )
}
