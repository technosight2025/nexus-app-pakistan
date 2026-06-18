"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { 
  Sparkles, Heart, Bot, Smartphone, 
  Wallet, ChefHat, Navigation, ShoppingBag, 
  Music, Building2, Camera, Palette, Utensils,
  Car, MonitorPlay, Armchair, Search, MapPin, Calendar, Users as UsersIcon
} from "lucide-react"

const B2C_SERVICES = [
  {
    id: "daig",
    title: "AI Daig Calculator",
    icon: ChefHat,
    href: "/tools/daig-calculator",
    color: "bg-red-100 text-red-600 border-red-200",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "salami",
    title: "Digital Salami Tracker",
    icon: Wallet,
    href: "/dashboard/planner/salami",
    color: "bg-emerald-100 text-emerald-600 border-emerald-200",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "jahaiz",
    title: "Smart Jahaiz Registry",
    icon: ShoppingBag,
    href: "/tools/jahaiz-tracker",
    color: "bg-purple-100 text-purple-600 border-purple-200",
    image: "https://images.unsplash.com/photo-1606403212882-9908cfba2a31?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "baraat",
    title: "Live Baraat Tracker",
    icon: Navigation,
    href: "/tools/baraat-tracker",
    color: "bg-blue-100 text-blue-600 border-blue-200",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "mehndi",
    title: "AI Mehndi Designer",
    icon: Sparkles,
    href: "/tools/mehndi-designer",
    color: "bg-orange-100 text-orange-600 border-orange-200",
    image: "https://images.unsplash.com/photo-1598424915655-b4618e7b3992?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "beats",
    title: "Shaadi Beats Playlist",
    icon: Music,
    href: "/tools/shaadi-beats",
    color: "bg-pink-100 text-pink-600 border-pink-200",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800"
  }
]

const CATEGORIES = [
  { name: "Wedding Venues", icon: Building2, count: "500+", color: "bg-emerald-50 text-emerald-600" },
  { name: "Photographers", icon: Camera, count: "1.2k+", color: "bg-blue-50 text-blue-600" },
  { name: "Videographers", icon: MonitorPlay, count: "800+", color: "bg-purple-50 text-purple-600" },
  { name: "Decorators", icon: Palette, count: "400+", color: "bg-pink-50 text-pink-600" },
  { name: "Caterers", icon: Utensils, count: "600+", color: "bg-orange-50 text-orange-600" },
  { name: "DJs & Sound", icon: Music, count: "300+", color: "bg-indigo-50 text-indigo-600" },
]

const METRICS = [
  { label: "Happy Couples", value: "15k+", color: "text-pink-500" },
  { label: "5-Star Vendors", value: "450+", color: "text-yellow-500" },
  { label: "Guests Hosted", value: "2.5M", color: "text-blue-500" },
]

export function BentoHomeLayout() {
  return (
    <div className="w-full bg-[#f8f9fa] py-8 md:py-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* The 12-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* TILE 1: Hero & Search (Span 8 cols, 2 rows) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-1 md:col-span-6 lg:col-span-8 lg:row-span-2 relative rounded-3xl overflow-hidden bg-white shadow-sm border border-border group"
          >
            {/* Background image & gradient */}
            <div className="absolute inset-0 z-0">
              <Image 
                src="/images/pakistani_bride_makeup.png" 
                alt="Hero Background" 
                fill 
                className="object-cover opacity-30 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
            </div>
            
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 text-primary font-bold text-sm mb-6 w-fit">
                <Sparkles className="w-4 h-4" />
                Plan Something Amazing <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tighter leading-[1.1] mb-4 max-w-2xl">
                Your Dream Event, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Planned Joyfully.</span>
              </h1>
              <p className="text-lg text-muted-foreground font-medium mb-8 max-w-xl">
                Discover breathtaking venues, connect with top-tier vendors, and manage your bookings effortlessly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10 w-fit">
                <Link href="/ai-planner">
                  <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-2xl bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1">
                    <Bot className="w-5 h-5 mr-2 animate-pulse" /> Plan with AI
                  </Button>
                </Link>
                <Link href="/search">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold rounded-2xl border-2 hover:bg-slate-50 transition-all hover:-translate-y-1">
                    Explore Market
                  </Button>
                </Link>
              </div>

              {/* Mini Search Bar */}
              <div className="bg-white rounded-2xl shadow-lg border border-border p-2 flex items-center gap-2 max-w-2xl">
                <div className="flex-1 flex items-center gap-2 px-4 h-12 bg-slate-50 rounded-xl">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <input type="text" placeholder="Search venues, photographers..." className="bg-transparent w-full outline-none font-medium" />
                </div>
                <Button className="h-12 px-6 rounded-xl font-bold">Find</Button>
              </div>
            </div>
          </motion.div>

          {/* TILE 2: Mobile App Promo (Span 4 cols, 1 row) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="col-span-1 md:col-span-3 lg:col-span-4 rounded-3xl bg-slate-900 text-white p-8 relative overflow-hidden flex flex-col justify-between group shadow-sm border border-slate-800"
          >
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-colors" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-4">
                <Smartphone className="w-4 h-4" /> Coming Soon
              </div>
              <h3 className="text-3xl font-black mb-3">Manage on the Go.</h3>
              <p className="text-slate-400 font-medium mb-6">The Nexus App gives you complete control in your pocket.</p>
            </div>
            
            <div className="relative z-10 flex gap-3">
              <button className="bg-white text-slate-900 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors">App Store</button>
              <button className="bg-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-white/20 transition-colors">Google Play</button>
            </div>
          </motion.div>

          {/* TILE 3: Success Metrics (Span 4 cols, 1 row) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-1 md:col-span-3 lg:col-span-4 rounded-3xl bg-gradient-to-br from-primary to-rose-500 p-8 text-white relative overflow-hidden shadow-sm flex flex-col justify-center"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="grid grid-cols-2 gap-4 relative z-10">
              {METRICS.map((metric, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl font-black mb-1">{metric.value}</div>
                  <div className="text-sm font-medium text-white/80">{metric.label}</div>
                </div>
              ))}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 flex items-center justify-center">
                <span className="font-bold">Join Now →</span>
              </div>
            </div>
          </motion.div>

          {/* TILE 4: Event Planning Tools (Span 12 cols, 1 row) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-1 md:col-span-6 lg:col-span-12 rounded-3xl bg-white border border-border shadow-sm p-6 lg:p-8 flex flex-col justify-center"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-foreground flex items-center gap-2">
                Event Planning Tools <span className="text-sm font-bold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">My Nexus</span>
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {B2C_SERVICES.map((service, idx) => (
                <Link href={service.href} key={service.id} className="block group h-full">
                  <div className="bg-slate-50 rounded-2xl border border-outline shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden hover:border-primary/40 relative">
                    <div className="absolute top-2 right-2 z-20 w-8 h-8 rounded-lg flex items-center justify-center bg-white/95 backdrop-blur-sm shadow-sm">
                      <service.icon className={`w-4 h-4 ${service.color.split(' ').find(c => c.startsWith('text-'))}`} />
                    </div>
                    <div className="relative h-24 w-full overflow-hidden shrink-0">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="p-4 flex flex-col flex-1 justify-center bg-white">
                      <h4 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors leading-tight">{service.title}</h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* TILE 5: Top Categories (Span 8 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="col-span-1 md:col-span-6 lg:col-span-8 rounded-3xl bg-white border border-border shadow-sm p-6 lg:p-8"
          >
             <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-foreground">Top Categories</h3>
              <Link href="/categories" className="text-primary font-bold text-sm hover:underline">View All →</Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {CATEGORIES.map((cat, i) => {
                const Icon = cat.icon
                return (
                  <Link href="/categories" key={cat.name} className="group">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-outline hover:border-primary/30 transition-all hover:bg-white hover:shadow-sm">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${cat.color} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{cat.name}</div>
                        <div className="text-xs text-muted-foreground font-medium">{cat.count} listings</div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </motion.div>

          {/* TILE 6: Vendor Business Promo (Span 4 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="col-span-1 md:col-span-6 lg:col-span-4 rounded-3xl bg-emerald-900 p-8 text-white relative overflow-hidden shadow-sm group border border-emerald-800"
          >
            <div className="absolute inset-0 z-0">
              <Image 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" 
                alt="Business Background" 
                fill 
                className="object-cover opacity-20 group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900 via-emerald-900/80 to-transparent" />
            </div>
            
            <div className="relative z-10 h-full flex flex-col justify-end">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-white/20">
                <Building2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-3xl font-black mb-3">For Vendors</h3>
              <p className="text-emerald-100/80 font-medium mb-6">Grow your business with our Vendor OS. Manage leads, bookings, and team all in one place.</p>
              <Link href="/business">
                <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl h-12 shadow-lg hover:-translate-y-1 transition-all">
                  Explore Vendor OS
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
