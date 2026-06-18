"use client"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, LayoutTemplate, Send, CheckCircle2, Bot, Check, Building2, Paintbrush } from "lucide-react"
import { useOrganization } from "@/app/context/OrganizationContext"
import { useAuth } from "@/app/context/AuthContext"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

const MOCK_CONTENT = {
  heroTitle: "Signature Collections",
  heroSubtitle: "Explore our premium selection crafted for perfection. We bring your vision to life.",
  features: [
    { title: "Premium Quality", desc: "Crafted with the finest materials." },
    { title: "Fast Delivery", desc: "Get it when you need it." },
    { title: "24/7 Support", desc: "We're always here to help." }
  ],
  products: [
    { name: "Signature Package", price: "Rs. 150,000" },
    { name: "Premium Setup", price: "Rs. 250,000" },
    { name: "Elite Experience", price: "Rs. 350,000" }
  ]
}

const DEFAULT_THEMES = [
  {
    themeName: "Classic Elegance",
    fontFamily: "font-serif",
    bgMain: "bg-[#111111]",
    bgContent: "bg-[#1A1A1A]",
    textPrimary: "text-white",
    textSecondary: "text-[#C9A227]",
    accentBg: "bg-[#C9A227]",
    accentText: "text-black",
    btnPrimary: "bg-[#C9A227] text-black hover:bg-[#A8851B]",
    borderRadius: "rounded-none",
    shadowStyle: "shadow-2xl",
    borderStyle: "border border-[#C9A227]/30",
    bgGradient: "bg-gradient-to-b from-[#111111] to-[#1A1A1A]",
    textGradient: "bg-gradient-to-r from-[#C9A227] to-[#FFF0B3]",
    glassEffect: false,
    buttonStyle: "sharp",
    cardStyle: "flat",
    animationStyle: "fade-up"
  },
  {
    themeName: "Midnight Bloom",
    fontFamily: "font-sans",
    bgMain: "bg-rose-50",
    bgContent: "bg-white",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-500",
    accentBg: "bg-rose-100",
    accentText: "text-rose-700",
    btnPrimary: "bg-rose-600 text-white hover:bg-rose-700",
    borderRadius: "rounded-2xl",
    shadowStyle: "shadow-lg",
    borderStyle: "border border-rose-100",
    bgGradient: "bg-gradient-to-br from-white via-rose-50 to-rose-100",
    textGradient: "none",
    glassEffect: true,
    buttonStyle: "pill",
    cardStyle: "glass",
    animationStyle: "scale-in"
  },
  {
    themeName: "Ethereal Whisper",
    fontFamily: "font-sans",
    bgMain: "bg-black",
    bgContent: "bg-white/5",
    textPrimary: "text-white",
    textSecondary: "text-gray-400",
    accentBg: "bg-blue-600",
    accentText: "text-white",
    btnPrimary: "bg-white text-black hover:bg-gray-200",
    borderRadius: "rounded-xl",
    shadowStyle: "shadow-2xl",
    borderStyle: "border border-white/10",
    bgGradient: "bg-gradient-to-br from-slate-900 to-black",
    textGradient: "bg-gradient-to-r from-blue-400 to-purple-500",
    glassEffect: true,
    buttonStyle: "ghost",
    cardStyle: "glass",
    animationStyle: "slide-right"
  }
]

export default function AIStorefrontMaker() {
  const { organization, refreshOrganization } = useOrganization()
  const { refreshProfile } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  
  const mockOrgFallback = {
    id: "zardozi-mock-001",
    name: "Zardozi Lehnga Boutique",
    slug: "zardozi-boutique",
    type: "apparel"
  }
  const currentOrg = organization || mockOrgFallback
  
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [applying, setApplying] = useState(false)
  const [themes, setThemes] = useState<any[]>(DEFAULT_THEMES)
  const [activeThemeIndex, setActiveThemeIndex] = useState(0)

  // Pre-fill prompt if org exists
  useEffect(() => {
    if (currentOrg && !prompt) {
      setPrompt(`A beautiful, modern theme for ${currentOrg.name}. We are a ${currentOrg.type}. Make it luxurious and trustworthy.`)
    }
  }, [currentOrg])

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    try {
      const res = await fetch("/api/business/storefront/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      })
      const data = await res.json()
      if (data.themes) {
        setThemes(data.themes)
        setActiveThemeIndex(0)
      } else {
        alert(data.error || "Failed to generate themes")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async () => {
    if (!currentOrg) return alert("No organization found. Please select a workspace.")
    if (themes.length === 0) return

    setApplying(true)
    const selectedTheme = themes[activeThemeIndex]

    try {
      const res = await fetch("/api/business/storefront/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          themeConfig: selectedTheme,
          organization_id: currentOrg.id,
          clerk_id: user?.id,
          user_name: user?.fullName || currentOrg.name,
          user_email: user?.primaryEmailAddress?.emailAddress
        })
      })
      const data = await res.json()
      if (data.success) {
        alert("Theme successfully applied to your storefront!")
        // If a new organization was created for this user, refresh their context!
        if (data.organization_id && data.organization_id !== currentOrg.id) {
          await refreshProfile()
          await refreshOrganization()
          router.push(`/site/${data.organization_id}?themeId=${data.themeId}`)
        } else {
          router.push(`/site/${currentOrg.slug || currentOrg.id}?themeId=${data.themeId}`)
        }
      } else {
        alert(data.error || "Failed to apply theme")
      }
    } catch (err) {
      console.error(err)
      alert("Error applying theme.")
    } finally {
      setApplying(false)
    }
  }

  const activeTheme = themes[activeThemeIndex]

  // Dynamic Theme Helpers
  const finalBgClass = activeTheme?.bgGradient && activeTheme.bgGradient !== 'none' ? activeTheme.bgGradient : activeTheme?.bgMain || 'bg-white'
  
  const getButtonClass = () => {
    if (!activeTheme) return ""
    let base = `px-6 py-3 text-sm font-bold transition-all duration-300 cursor-pointer `
    if (activeTheme.buttonStyle === 'pill') base += 'rounded-full '
    if (activeTheme.buttonStyle === 'sharp') base += 'rounded-none '
    if (activeTheme.buttonStyle === 'neumorphic') base += `rounded-xl ${activeTheme.shadowStyle} hover:shadow-inner `
    if (activeTheme.buttonStyle === 'ghost') base += `rounded-md border-2 bg-transparent hover:bg-black hover:text-white `
    return base + activeTheme.btnPrimary
  }

  const getCardClass = () => {
    if (!activeTheme) return ""
    let base = `${activeTheme.borderRadius} ${activeTheme.borderStyle} transition-all duration-500 `
    if (activeTheme.cardStyle === 'elevated') base += `${activeTheme.bgContent} ${activeTheme.shadowStyle} `
    if (activeTheme.cardStyle === 'flat') base += `${activeTheme.bgContent} shadow-none `
    if (activeTheme.cardStyle === 'glass') base += `bg-white/40 backdrop-blur-xl border-white/50 shadow-2xl `
    else if (activeTheme.glassEffect) base += `bg-white/80 backdrop-blur-lg `
    return base
  }

  const getHeadingClass = (baseSize: string) => {
    if (!activeTheme) return ""
    let base = `${baseSize} font-black tracking-tight leading-tight `
    if (activeTheme.textGradient && activeTheme.textGradient !== 'none') {
      base += `${activeTheme.textGradient} bg-clip-text text-transparent `
    } else {
      base += activeTheme.textPrimary
    }
    return base
  }

  const MotionDiv = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
    if (!activeTheme || activeTheme.animationStyle === 'none') return <div className={className}>{children}</div>
    
    let initial = { opacity: 0, y: 0, scale: 1, x: 0 }
    let animate = { opacity: 1, y: 0, scale: 1, x: 0 }
    
    if (activeTheme.animationStyle === 'fade-up') initial.y = 30
    if (activeTheme.animationStyle === 'scale-in') initial.scale = 0.9
    if (activeTheme.animationStyle === 'slide-right') initial.x = -30

    return (
      <motion.div
        key={activeTheme.themeName} // Force re-render of animation when theme changes
        initial={initial}
        animate={animate}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32">
      {/* Header Panel */}
      <div className="bg-[#1D1C17] text-white rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C9A227] rounded-full blur-[100px] opacity-10 -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-xl z-10 space-y-3">
          <div className="flex items-center gap-3 text-[#C9A227]">
            <LayoutTemplate className="w-6 h-6" />
            <h1 className="text-2xl font-serif font-bold">AI Storefront Maker</h1>
          </div>
          <p className="text-white/70">Choose from our signature themes below, or type a custom prompt to let AI generate entirely new options! Select your favorite and hit publish.</p>
        </div>
        
        <div className="w-full md:w-auto flex-1 max-w-xl relative z-10 flex gap-2">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="e.g. Royal Palace Banquet, elegant and luxurious gold theme..." 
            className="flex-1 px-5 py-4 rounded-xl text-[#1D1C17] font-medium outline-none focus:ring-4 focus:ring-[#C9A227]/30 transition-shadow bg-white/90"
            disabled={loading}
          />
          <button 
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="px-6 py-4 bg-[#C9A227] text-black font-bold rounded-xl hover:bg-[#b08d22] transition-colors disabled:opacity-50 flex items-center gap-2 shrink-0"
          >
            {loading ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Bot className="w-5 h-5" />}
            Generate
          </button>
        </div>
      </div>

      {themes.length === 0 && !loading && (
        <div className="h-[400px] border-2 border-dashed border-[#E6E2DA] rounded-3xl flex flex-col items-center justify-center text-[#5E6460] space-y-4">
          <Paintbrush className="w-12 h-12 text-[#E6E2DA]" />
          <p className="font-medium">Enter a prompt above to generate your custom themes.</p>
        </div>
      )}

      {loading && (
        <div className="h-[400px] border border-[#E6E2DA] rounded-3xl flex flex-col items-center justify-center text-[#1D1C17] space-y-6 bg-white">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#FDF8EA] rounded-full" />
            <div className="w-20 h-20 border-4 border-[#C9A227] rounded-full border-t-transparent animate-spin absolute inset-0" />
            <Bot className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C9A227] animate-pulse" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-1">AI is designing your storefronts...</h3>
            <p className="text-sm text-[#5E6460]">Mixing colors, setting up layouts, and applying magic.</p>
          </div>
        </div>
      )}

      {themes.length > 0 && !loading && (
        <div className="space-y-6">
          
          {/* Tabs & Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-[#E6E2DA] shadow-sm">
            <div className="flex overflow-x-auto no-scrollbar w-full md:w-auto">
              {themes.map((theme, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThemeIndex(i)}
                  className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                    activeThemeIndex === i 
                      ? 'bg-[#1D1C17] text-white shadow-md' 
                      : 'text-[#5E6460] hover:bg-[#FAF7F2]'
                  }`}
                >
                  Option {i + 1}: {theme.themeName}
                </button>
              ))}
            </div>
            <button 
              onClick={handleApply}
              disabled={applying}
              className="w-full md:w-auto px-8 py-3 bg-[#0F5B3E] hover:bg-green-800 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
            >
              {applying ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
              Publish "{themes[activeThemeIndex].themeName}"
            </button>
          </div>

          {/* Live Preview Container */}
          <div className={`w-full h-[800px] rounded-3xl overflow-y-auto border border-[#E6E2DA] shadow-2xl relative ${finalBgClass} ${activeTheme?.fontFamily}`}>
            <AnimatePresence mode="wait">
              {activeTheme && (
                <motion.div
                  key={activeTheme.themeName}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <header className={`px-6 md:px-12 py-6 flex items-center justify-between ${activeTheme.textPrimary} border-b ${activeTheme.borderStyle} ${activeTheme.glassEffect ? 'bg-white/40 backdrop-blur-xl' : activeTheme.bgContent} sticky top-0 z-50`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 ${activeTheme.borderRadius} bg-current opacity-10 flex items-center justify-center`}>
                        <Building2 className="w-5 h-5 opacity-50" />
                      </div>
                      <h1 className="font-black text-xl tracking-tight">{currentOrg?.name || "Your Brand"}</h1>
                    </div>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-bold opacity-80">
                      <span className="hover:opacity-100 cursor-pointer">Collections</span>
                      <span className="hover:opacity-100 cursor-pointer">About</span>
                      <span className="hover:opacity-100 cursor-pointer">Contact</span>
                    </nav>
                    <div className={getButtonClass()}>
                      Book Now
                    </div>
                  </header>

                  <main className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-16 pb-32">
                    
                    {/* Hero Section */}
                    <section className={`w-full p-12 md:p-24 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[500px] ${getCardClass()}`}>
                      <div className="absolute inset-0 z-0">
                        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-10" alt="Background" />
                      </div>
                      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                        <MotionDiv delay={0.1}>
                          <span className={`inline-block px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest ${activeTheme.accentBg} ${activeTheme.accentText}`}>
                            {currentOrg?.type || "Boutique"} PORTFOLIO
                          </span>
                        </MotionDiv>
                        <MotionDiv delay={0.2}>
                          <h2 className={getHeadingClass("text-5xl md:text-7xl")}>
                            {MOCK_CONTENT.heroTitle}
                          </h2>
                        </MotionDiv>
                        <MotionDiv delay={0.3}>
                          <p className={`text-xl md:text-2xl font-medium ${activeTheme.textSecondary} max-w-2xl mx-auto`}>
                            {MOCK_CONTENT.heroSubtitle}
                          </p>
                        </MotionDiv>
                        <MotionDiv delay={0.4} className="pt-8 flex gap-4 justify-center">
                          <button className={getButtonClass()}>
                            Explore Collection
                          </button>
                        </MotionDiv>
                      </div>
                    </section>

                    {/* Features */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {MOCK_CONTENT.features.map((feature, i) => (
                        <MotionDiv key={i} delay={0.1 * i} className={`p-10 text-center space-y-4 hover:-translate-y-1 ${getCardClass()}`}>
                          <div className={`w-16 h-16 mx-auto ${activeTheme.borderRadius} ${activeTheme.accentBg} flex items-center justify-center`}>
                            <Sparkles className={`w-8 h-8 ${activeTheme.accentText}`} />
                          </div>
                          <h3 className={`text-xl font-black ${activeTheme.textPrimary}`}>{feature.title}</h3>
                          <p className={`text-base ${activeTheme.textSecondary}`}>{feature.desc}</p>
                        </MotionDiv>
                      ))}
                    </section>

                    {/* Products Grid */}
                    <section>
                      <MotionDiv delay={0.1} className="flex items-center justify-between mb-10 px-4">
                        <h3 className={getHeadingClass("text-3xl md:text-4xl")}>Signature Items</h3>
                        <span className={`text-base font-bold ${activeTheme.textSecondary} cursor-pointer hover:underline`}>View All</span>
                      </MotionDiv>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {MOCK_CONTENT.products.map((item, i) => (
                          <MotionDiv key={i} delay={0.1 * i} className={`group flex flex-col overflow-hidden cursor-pointer hover:-translate-y-1 ${getCardClass()}`}>
                            <div className="aspect-[4/5] bg-slate-200 relative overflow-hidden">
                              <img src={`https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop&sig=${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Product" />
                            </div>
                            <div className="p-6 flex flex-col gap-2">
                              <h4 className={`text-xl font-black ${activeTheme.textPrimary}`}>{item.name}</h4>
                              <p className={`text-sm font-medium ${activeTheme.textSecondary}`}>Premium quality and exceptional details.</p>
                              <div className={`mt-4 text-2xl font-black ${activeTheme.accentText}`}>{item.price}</div>
                            </div>
                          </MotionDiv>
                        ))}
                      </div>
                    </section>
                  </main>
                  
                  <footer className={`py-12 text-center ${activeTheme.textSecondary} font-medium border-t ${activeTheme.borderStyle} ${activeTheme.glassEffect ? 'bg-white/20 backdrop-blur-sm' : ''}`}>
                    <p>© {new Date().getFullYear()} {currentOrg?.name || "Your Brand"}. Powered by Nexus.</p>
                  </footer>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      )}
    </div>
  )
}
