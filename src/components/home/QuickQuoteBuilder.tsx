"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, ElementType } from "react"
import { Calculator, CheckCircle2, Building2, Utensils, Camera, Palette, Music, Sparkles, Calendar, Users, Car, Shield, ChevronRight, ChevronLeft } from "lucide-react"

// Types
type Addon = { id: string; name: string; price: number; isFixed?: boolean }
type Package = { id: string; name: string; price: number; desc: string; isFixed?: boolean }
type Category = {
  id: string
  title: string
  icon: ElementType
  emoji: string
  packages?: Package[]
  addons?: Addon[]
}

// Data Model
const STEPS = [
  { id: "details", title: "Event Details", icon: Calendar },
  { id: "venue", title: "Venue & Menu", icon: Building2 },
  { id: "photo", title: "Photography", icon: Camera },
  { id: "decor", title: "Decor", icon: Palette },
  { id: "extras", title: "Extras", icon: Music },
]

const CATEGORIES: Record<string, Category> = {
  venue: {
    id: "venue", title: "Venue & Menu", icon: Building2, emoji: "🏰",
    packages: [
      { id: "v_basic", name: "Standard (Chicken)", price: 2500, desc: "Chicken Qorma, Biryani, Naan, Salad, Dessert." },
      { id: "v_premium", name: "Premium (Mutton)", price: 4000, desc: "Mutton Qorma, Chicken Biryani, BBQ, Dessert." },
      { id: "v_royal", name: "Royal (Live BBQ)", price: 6000, desc: "Live BBQ stations, Mutton Joint, Soup, Premium Desserts." },
      { id: "v_space", name: "Venue Space Only", price: 300000, desc: "Rent the hall, bring your own caterer.", isFixed: true }
    ],
    addons: [
      { id: "v_heater", name: "Outdoor Heaters", price: 15000, isFixed: true },
      { id: "v_valet", name: "Valet Service", price: 20000, isFixed: true }
    ]
  },
  photo: {
    id: "photo", title: "Photography", icon: Camera, emoji: "📸",
    packages: [
      { id: "p_basic", name: "Standard Shoot", price: 50000, desc: "1 Photographer, 1 Videographer, 1 Album.", isFixed: true },
      { id: "p_cinematic", name: "Cinematic", price: 120000, desc: "2 Photographers, Cinematic Video, Drone.", isFixed: true },
      { id: "p_premium", name: "Premium Story", price: 250000, desc: "Full team, Same Day Edit, 3 Premium Albums.", isFixed: true },
    ]
  },
  decor: {
    id: "decor", title: "Decor", icon: Palette, emoji: "✨",
    packages: [
      { id: "d_minimal", name: "Minimalist", price: 80000, desc: "Elegant stage, basic lighting, standard chairs.", isFixed: true },
      { id: "d_floral", name: "Fresh Floral", price: 200000, desc: "Imported flowers, premium stage, walkway.", isFixed: true },
      { id: "d_lavish", name: "Lavish Royal", price: 500000, desc: "Custom theme, chandeliers, heavy floral ceilings.", isFixed: true },
    ]
  },
  extras: {
    id: "extras", title: "Entertainment & Extras", icon: Music, emoji: "🎵",
    addons: [
      { id: "e_dj", name: "DJ & Sound System", price: 40000, isFixed: true },
      { id: "e_qawwali", name: "Live Qawwali Band", price: 150000, isFixed: true },
      { id: "e_security", name: "Armed Security (x4)", price: 30000, isFixed: true },
      { id: "e_generator", name: "Backup Generator", price: 25000, isFixed: true },
    ]
  }
}

export function QuickQuoteBuilder() {
  const [currentStep, setCurrentStep] = useState(0)
  
  // State
  const [guests, setGuests] = useState(300)
  const [eventType, setEventType] = useState("Wedding")
  const [selectedPackages, setSelectedPackages] = useState<Record<string, string>>({
    venue: "v_premium",
    photo: "p_cinematic",
    decor: "d_floral"
  })
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])

  // Logic
  const handlePackageSelect = (categoryId: string, packageId: string) => {
    setSelectedPackages(prev => ({ ...prev, [categoryId]: packageId }))
  }

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => prev.includes(addonId) ? prev.filter(a => a !== addonId) : [...prev, addonId])
  }

  const getSubtotal = () => {
    let total = 0
    // Sum Packages
    Object.entries(selectedPackages).forEach(([catId, pkgId]) => {
      const cat = CATEGORIES[catId]
      const pkg = cat.packages?.find(p => p.id === pkgId)
      if (pkg) {
        total += pkg.isFixed ? pkg.price : pkg.price * guests
      }
    })
    // Sum Addons
    Object.values(CATEGORIES).forEach(cat => {
      cat.addons?.forEach(addon => {
        if (selectedAddons.includes(addon.id)) {
          total += addon.isFixed ? addon.price : addon.price * guests
        }
      })
    })
    return total
  }

  const subtotal = getSubtotal()
  const tax = subtotal * 0.16 // 16% GST
  const serviceCharge = subtotal * 0.10 // 10% Service
  const grandTotal = subtotal + tax + serviceCharge

  // Render Helpers
  const renderStepContent = () => {
    if (currentStep === 0) {
      return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
          <div>
            <h4 className="text-xl font-bold mb-4">What are we celebrating?</h4>
            <div className="flex gap-3">
              {["Wedding", "Corporate", "Birthday", "Other"].map(t => (
                <button 
                  key={t}
                  onClick={() => setEventType(t)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all border-2 ${eventType === t ? "border-primary bg-primary/10 text-primary" : "border-outline hover:border-primary/30"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4 flex justify-between">
              Guest Count
              <span className="text-primary">{guests} Guests</span>
            </h4>
            <input 
              type="range" min="50" max="1000" step="50"
              value={guests} onChange={(e) => setGuests(parseInt(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2 font-medium">
              <span>Intimate (50)</span>
              <span>Grand (1000)</span>
            </div>
          </div>
        </div>
      )
    }

    const stepData = STEPS[currentStep]
    const category = CATEGORIES[stepData.id]

    if (category) {
      return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500" key={category.id}>
          {category.packages && (
            <div>
              <h4 className="text-xl font-bold mb-4">Select a Package</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.packages.map(pkg => {
                  const isSelected = selectedPackages[category.id] === pkg.id
                  return (
                    <motion.div 
                      key={pkg.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => handlePackageSelect(category.id, pkg.id)}
                      className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all ${isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-outline hover:border-primary/30"}`}
                    >
                      {isSelected && <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-primary fill-primary/20" />}
                      <h5 className={`font-bold text-lg mb-1 ${isSelected ? "text-primary" : "text-foreground"}`}>{pkg.name}</h5>
                      <p className="text-sm font-black mb-2">
                        PKR {(pkg.price/1000).toFixed(1)}k {pkg.isFixed ? "" : <span className="text-xs font-medium text-muted-foreground">/guest</span>}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{pkg.desc}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          {category.addons && (
            <div>
              <h4 className="text-xl font-bold mb-4">Optional Add-ons</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.addons.map(addon => {
                  const isSelected = selectedAddons.includes(addon.id)
                  return (
                    <div 
                      key={addon.id} onClick={() => toggleAddon(addon.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? "border-primary bg-primary/5" : "border-outline hover:border-primary/30"}`}
                    >
                      <span className="font-bold text-sm">{addon.name}</span>
                      <span className="text-sm font-black text-muted-foreground">+{(addon.price/1000).toFixed(1)}k</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <section className="py-24 bg-[#FFFAFB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <Calculator className="w-8 h-8" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            Advanced Quote Builder
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Design your perfect event step-by-step and get an instant, highly realistic estimate including taxes and services.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Side: Wizard */}
          <div className="lg:col-span-7 bg-white rounded-xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-outline">
            
            {/* Stepper Navigation */}
            <div className="flex justify-between mb-10 relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
              {STEPS.map((step, idx) => {
                const Icon = step.icon
                const isActive = idx === currentStep
                const isPast = idx < currentStep
                return (
                  <button 
                    key={step.id} 
                    onClick={() => setCurrentStep(idx)}
                    className={`relative z-10 flex flex-col items-center gap-2 transition-all ${isActive ? "scale-110" : "opacity-60 hover:opacity-100"}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-colors duration-500 ${isActive || isPast ? "bg-primary text-white" : "bg-white border-2 border-outline text-muted-foreground"}`}>
                      {isPast ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span className={`text-xs font-bold hidden sm:block ${isActive ? "text-primary" : "text-muted-foreground"}`}>{step.title}</span>
                  </button>
                )
              })}
            </div>

            {/* Step Content */}
            <div className="min-h-[400px]">
              {renderStepContent()}
            </div>

            {/* Wizard Controls */}
            <div className="flex justify-between mt-8 pt-8 border-t border-outline">
              <button 
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="px-6 py-3 rounded-full font-bold text-muted-foreground hover:bg-slate-100 disabled:opacity-30 flex items-center gap-2 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
              <button 
                onClick={() => setCurrentStep(prev => Math.min(STEPS.length - 1, prev + 1))}
                disabled={currentStep === STEPS.length - 1}
                className="px-6 py-3 bg-foreground text-white rounded-full font-bold hover:bg-foreground/90 disabled:opacity-30 flex items-center gap-2 transition-colors"
              >
                Next Step <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Side: Live Receipt */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.2)] relative overflow-hidden">
              
              {/* Receipt Header */}
              <div className="flex items-center justify-between border-b border-white/20 pb-6 mb-6">
                <div>
                  <h3 className="font-black text-2xl tracking-tight">Quotation</h3>
                  <p className="text-white/60 text-sm">{eventType} • {guests} Guests</p>
                </div>
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </div>

              {/* Line Items */}
              <div className="space-y-4 mb-8 min-h-[200px]">
                <AnimatePresence mode="popLayout">
                  {Object.entries(selectedPackages).map(([catId, pkgId]) => {
                    const cat = CATEGORIES[catId]
                    const pkg = cat.packages?.find(p => p.id === pkgId)
                    if (!pkg) return null
                    const price = pkg.isFixed ? pkg.price : pkg.price * guests
                    return (
                      <motion.div 
                        key={pkg.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="flex justify-between items-start text-sm"
                      >
                        <div>
                          <span className="font-bold block">{cat.emoji} {cat.title}</span>
                          <span className="text-white/60 text-xs">{pkg.name} {pkg.isFixed ? "" : `(×${guests})`}</span>
                        </div>
                        <span className="font-bold text-right">PKR {(price).toLocaleString()}</span>
                      </motion.div>
                    )
                  })}
                  {selectedAddons.map(addonId => {
                    let addon: Addon | undefined
                    Object.values(CATEGORIES).forEach(c => {
                      const found = c.addons?.find(a => a.id === addonId)
                      if (found) addon = found
                    })
                    if (!addon) return null
                    const price = addon.isFixed ? addon.price : addon.price * guests
                    return (
                      <motion.div 
                        key={addon.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="flex justify-between items-start text-sm text-white/80"
                      >
                        <span className="font-medium">+ {addon.name}</span>
                        <span className="font-bold text-right">PKR {(price).toLocaleString()}</span>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              {/* Totals & Taxes */}
              <div className="space-y-3 pt-6 border-t border-white/20 mb-8">
                <div className="flex justify-between text-sm text-white/80">
                  <span>Subtotal</span>
                  <span>PKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-white/80">
                  <span>GST (16%)</span>
                  <span>PKR {tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-white/80">
                  <span>Service Charge (10%)</span>
                  <span>PKR {serviceCharge.toLocaleString()}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="pt-6 border-t-2 border-dashed border-white/40 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold">Grand Total</span>
                  <motion.span 
                    key={grandTotal} initial={{ scale: 1.1, color: "#fcd34d" }} animate={{ scale: 1, color: "#ffffff" }}
                    className="block text-3xl md:text-4xl font-black"
                  >
                    PKR {(grandTotal / 1000000).toFixed(2)}M
                  </motion.span>
                </div>
              </div>

              <button className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black text-lg transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                Download PDF
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
