"use client"
import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Sparkles, Smartphone, Laptop, MonitorPlay, Bot, Send, Settings, Palette, LayoutTemplate, Tags, Wind, Layers, Type } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const CATEGORIES = [
  { id: 'venue', name: '🏰 Venue / Banquet' },
  { id: 'photographer', name: '📸 Photographer' },
  { id: 'caterer', name: '🍽️ Caterer' },
  { id: 'decorator', name: '✨ Decorator' },
  { id: 'apparel', name: '👗 Bridal Apparel' }
]

const LAYOUTS = [
  { id: 'hero_immersive', name: 'Immersive Hero' },
  { id: 'split_screen', name: 'Split Screen' },
  { id: 'gallery_grid', name: 'Gallery Grid' }
]

const CATEGORY_DEFAULTS: Record<string, string> = {
  venue: 'hero_immersive',
  photographer: 'gallery_grid',
  caterer: 'split_screen',
  decorator: 'gallery_grid',
  apparel: 'split_screen'
}

const PALETTES = [
  { 
    id: 'monochrome', name: 'Monochrome', 
    config: { bgMain: 'bg-slate-100', bgContent: 'bg-white', textPrimary: 'text-slate-900', textSecondary: 'text-slate-500', accentBg: 'bg-slate-900', accentText: 'text-white' },
    previewColors: ['#f8fafc', '#0f172a']
  },
  { 
    id: 'royal_gold', name: 'Royal Gold', 
    config: { bgMain: 'bg-[#0a0a0a]', bgContent: 'bg-[#111111]', textPrimary: 'text-amber-50', textSecondary: 'text-amber-200/60', accentBg: 'bg-[#D4AF37]', accentText: 'text-black' },
    previewColors: ['#0a0a0a', '#D4AF37']
  },
  {
    id: 'emerald_luxury', name: 'Emerald',
    config: { bgMain: 'bg-[#0F5B3E]/5', bgContent: 'bg-white', textPrimary: 'text-[#0F5B3E]', textSecondary: 'text-emerald-700/60', accentBg: 'bg-[#0F5B3E]', accentText: 'text-white' },
    previewColors: ['#0F5B3E', '#10b981']
  },
  {
    id: 'rose_blush', name: 'Rose Blush',
    config: { bgMain: 'bg-rose-50', bgContent: 'bg-white', textPrimary: 'text-rose-950', textSecondary: 'text-rose-700/60', accentBg: 'bg-rose-500', accentText: 'text-white' },
    previewColors: ['#fff1f2', '#f43f5e']
  }
]

export default function AdminThemeCreatorPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")
  const [error, setError] = useState("")
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [showConfig, setShowConfig] = useState(false)

  // New states for top controls
  const [category, setCategory] = useState("venue")
  const [layoutOption, setLayoutOption] = useState("hero_immersive")

  const [chatHistory, setChatHistory] = useState<{sender: 'user' | 'ai', text: string}[]>([
    { sender: 'ai', text: "Welcome to the AI Theme Machine! Use the controls above to pick a starting layout and palette, or just type your instructions here." }
  ])
  const chatEndRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({
    name: "",
    id: "",
    description: "",
    price: "Free",
    type: "free",
    preview_image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
  })

  const [config, setConfig] = useState({
    bgMain: "bg-slate-50",
    bgContent: "bg-white",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-500",
    accentBg: "bg-indigo-50",
    accentText: "text-indigo-600",
    btnPrimary: "bg-slate-900 hover:bg-black text-white",
    fontFamily: "font-sans",
    borderRadius: "rounded-2xl",
    shadowStyle: "shadow-xl",
    borderStyle: "border border-slate-200",
    bgGradient: "bg-gradient-to-br from-slate-50 to-white",
    textGradient: "none",
    glassEffect: false,
    buttonStyle: "pill",
    cardStyle: "elevated",
    animationStyle: "fade-up"
  })

  const [mockContent, setMockContent] = useState({
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
  })

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatHistory, aiLoading])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setForm({
      ...form,
      name: val,
      id: val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    })
  }

  const handleCategoryChange = (val: string) => {
    setCategory(val)
    const newLayout = CATEGORY_DEFAULTS[val]
    setLayoutOption(newLayout)
    setChatHistory(prev => [...prev, { sender: 'ai', text: `Switched category to ${val.toUpperCase()}. I've automatically selected the best layout structure: ${newLayout}.` }])
  }

  const applyPalette = (paletteId: string) => {
    const pal = PALETTES.find(p => p.id === paletteId)
    if (pal) {
      setConfig({ ...config, ...pal.config })
      setChatHistory(prev => [...prev, { sender: 'ai', text: `Applied the ${pal.name} color palette!` }])
    }
  }

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;
    const userText = aiPrompt
    setChatHistory(prev => [...prev, { sender: 'user', text: userText }])
    setAiPrompt("")
    setAiLoading(true)
    setError("")

    try {
      // We pass the current category and layout context to AI
      const promptContext = `[Context: Designing for category '${category}' using layout '${layoutOption} भी']\n${userText}`
      
      const res = await fetch("/api/admin/themes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: promptContext,
          currentConfig: config,
          currentMock: mockContent
        })
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || "Failed to generate theme")

      const newName = data.theme_name || form.name || "AI Theme"
      setForm({
        ...form,
        name: newName,
        id: form.id || newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        description: data.description || form.description
      })

      if (data.config) {
        setConfig({ ...config, ...data.config })
      }

      if (data.mockContent) {
        setMockContent(data.mockContent)
      }

      setChatHistory(prev => [...prev, { sender: 'ai', text: `I've updated the theme to match your request! Take a look at the live preview.` }])
    } catch (err: any) {
      console.error(err)
      setError(err.message)
      setChatHistory(prev => [...prev, { sender: 'ai', text: `Sorry, I encountered an error: ${err.message}` }])
    } finally {
      setAiLoading(false)
    }
  }

  const handleSave = async () => {
    if (!form.name || !form.id) {
      setError("Name and ID are required")
      return
    }
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/themes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          icon: "LayoutTemplate",
          config: { ...config, layoutType: layoutOption, category }
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to save theme")
      router.push("/admin/themes")
    } catch (err: any) {
      console.error(err)
      setError(err.message)
      setLoading(false)
    }
  }

  // Prepare Dynamic Wrappers and Classes
  const finalBgClass = config.bgGradient && config.bgGradient !== 'none' ? config.bgGradient : config.bgMain
  
  const getButtonClass = () => {
    let base = `px-6 py-3 text-sm font-bold transition-all duration-300 `
    if (config.buttonStyle === 'pill') base += 'rounded-full '
    if (config.buttonStyle === 'sharp') base += 'rounded-none '
    if (config.buttonStyle === 'neumorphic') base += `rounded-xl ${config.shadowStyle} hover:shadow-inner `
    if (config.buttonStyle === 'ghost') base += `rounded-md border-2 bg-transparent hover:bg-black hover:text-white `
    return base + config.btnPrimary
  }

  const getCardClass = () => {
    let base = `${config.borderRadius} ${config.borderStyle} transition-all duration-500 `
    if (config.cardStyle === 'elevated') base += `${config.bgContent} ${config.shadowStyle} `
    if (config.cardStyle === 'flat') base += `${config.bgContent} shadow-none `
    if (config.cardStyle === 'glass') base += `bg-white/40 backdrop-blur-xl border-white/50 shadow-2xl `
    else if (config.glassEffect) base += `bg-white/80 backdrop-blur-lg `
    return base
  }

  const getHeadingClass = (baseSize: string) => {
    let base = `${baseSize} font-black tracking-tight leading-tight `
    if (config.textGradient && config.textGradient !== 'none') {
      base += `${config.textGradient} bg-clip-text text-transparent `
    } else {
      base += config.textPrimary
    }
    return base
  }

  // Animation Wrapper
  const MotionDiv = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
    if (config.animationStyle === 'none') return <div className={className}>{children}</div>
    
    let initial = { opacity: 0, y: 0, scale: 1, x: 0 }
    let animate = { opacity: 1, y: 0, scale: 1, x: 0 }
    
    if (config.animationStyle === 'fade-up') initial.y = 30
    if (config.animationStyle === 'scale-in') initial.scale = 0.9
    if (config.animationStyle === 'slide-right') initial.x = -30

    return (
      <motion.div
        initial={initial}
        whileInView={animate}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  const renderHeroSection = () => {
    if (layoutOption === 'split_screen') {
      return (
        <section className={`w-full overflow-hidden min-h-[500px] flex flex-col md:flex-row items-center ${getCardClass()}`}>
          <div className="w-full md:w-1/2 p-12 flex flex-col justify-center items-start text-left space-y-6 relative z-10">
             <MotionDiv delay={0.1}>
               <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${config.accentBg} ${config.accentText}`}>
                 {category.toUpperCase()}
               </span>
             </MotionDiv>
             <MotionDiv delay={0.2}>
               <h2 className={getHeadingClass("text-4xl md:text-6xl")}>
                 {mockContent.heroTitle}
               </h2>
             </MotionDiv>
             <MotionDiv delay={0.3}>
               <p className={`text-lg font-medium ${config.textSecondary} max-w-sm`}>
                 {mockContent.heroSubtitle}
               </p>
             </MotionDiv>
             <MotionDiv delay={0.4} className="pt-2">
               <button className={getButtonClass()}>
                 Explore Services
               </button>
             </MotionDiv>
          </div>
          <MotionDiv delay={0.2} className="w-full md:w-1/2 h-full min-h-[400px] relative">
             <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover absolute inset-0" alt="Hero" />
             <div className={`absolute inset-0 bg-gradient-to-r from-[${config.bgContent?.includes('#') ? config.bgContent.replace('bg-','') : 'white'}] to-transparent opacity-30`} />
          </MotionDiv>
        </section>
      )
    }

    if (layoutOption === 'gallery_grid') {
      return (
        <section className="w-full space-y-8">
          <MotionDiv delay={0.1} className="text-center max-w-2xl mx-auto space-y-4 px-4 pt-12">
            <h2 className={getHeadingClass("text-5xl md:text-7xl")}>
              {mockContent.heroTitle}
            </h2>
            <p className={`text-xl font-medium ${config.textSecondary}`}>
              {mockContent.heroSubtitle}
            </p>
          </MotionDiv>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            <MotionDiv delay={0.2} className={`col-span-2 row-span-2 aspect-square ${config.borderRadius} overflow-hidden ${config.shadowStyle}`}>
              <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Gallery" />
            </MotionDiv>
            <MotionDiv delay={0.3} className={`aspect-square ${config.borderRadius} overflow-hidden ${config.shadowStyle}`}>
              <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Gallery" />
            </MotionDiv>
            <MotionDiv delay={0.4} className={`aspect-square ${config.borderRadius} overflow-hidden ${config.shadowStyle}`}>
              <img src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Gallery" />
            </MotionDiv>
            <MotionDiv delay={0.5} className={`col-span-2 aspect-[2/1] ${config.borderRadius} overflow-hidden ${config.shadowStyle}`}>
              <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Gallery" />
            </MotionDiv>
          </div>
        </section>
      )
    }

    return (
      <section className={`w-full p-12 md:p-24 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[500px] ${getCardClass()}`}>
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-10" alt="Background" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <MotionDiv delay={0.1}>
            <span className={`inline-block px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest ${config.accentBg} ${config.accentText}`}>
              {category.toUpperCase()}
            </span>
          </MotionDiv>
          <MotionDiv delay={0.2}>
            <h2 className={getHeadingClass("text-5xl md:text-7xl")}>
              {mockContent.heroTitle}
            </h2>
          </MotionDiv>
          <MotionDiv delay={0.3}>
            <p className={`text-xl md:text-2xl font-medium ${config.textSecondary} max-w-2xl mx-auto`}>
              {mockContent.heroSubtitle}
            </p>
          </MotionDiv>
          <MotionDiv delay={0.4} className="pt-8 flex gap-4 justify-center">
            <button className={getButtonClass()}>
              Explore Collection
            </button>
          </MotionDiv>
        </div>
      </section>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden font-sans">
      
      {/* 🌟 TOP NAVIGATION HEADER 🌟 */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-20">
        
        {/* Left: Back & Theme Details Inline */}
        <div className="flex items-center gap-6">
          <Link href="/admin/themes" className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
            <input 
              value={form.name} 
              onChange={handleNameChange} 
              placeholder="Untitled Theme"
              className="text-lg font-black text-slate-900 bg-transparent border-none outline-none placeholder:text-slate-300 w-48 focus:ring-0 p-0"
            />
            <input 
              value={form.description} 
              onChange={e => setForm({...form, description: e.target.value})} 
              placeholder="Add a brief description..."
              className="text-xs font-semibold text-slate-500 bg-transparent border-none outline-none placeholder:text-slate-300 w-64 focus:ring-0 p-0 hidden md:block"
            />
          </div>
        </div>

        {/* Middle: Viewport Toggles */}
        <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button onClick={() => setViewport('desktop')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewport === 'desktop' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            <MonitorPlay className="w-4 h-4" /> Desktop
          </button>
          <button onClick={() => setViewport('tablet')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewport === 'tablet' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            <Laptop className="w-4 h-4" /> Tablet
          </button>
          <button onClick={() => setViewport('mobile')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewport === 'mobile' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            <Smartphone className="w-4 h-4" /> Mobile
          </button>
        </div>

        {/* Right: Controls & Publish */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowConfig(!showConfig)} 
            className={`w-9 h-9 border rounded-xl flex items-center justify-center transition-colors ${showConfig ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
            title="Manual CSS Configuration"
          >
            <Settings className="w-4.5 h-4.5" />
          </button>
          <button onClick={handleSave} disabled={loading} className="bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-md disabled:opacity-50">
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            Publish Theme
          </button>
        </div>
      </header>

      {/* 🌟 MAIN WORKSPACE 🌟 */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* 🌟 LEFT: AI CHAT VIEW 🌟 */}
        <div className="w-[380px] bg-white border-r border-slate-200 flex flex-col shrink-0 relative z-10 shadow-xl">
          <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-[#0F5B3E] to-emerald-700 text-white flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-black text-sm">Theme Architect AI</h2>
              <p className="text-[10px] text-emerald-100 font-bold uppercase tracking-wider">Generative Engine Active</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FAF8F5]">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <span className="text-[9px] font-bold text-slate-400 uppercase mb-1">{msg.sender === 'user' ? 'You' : 'Architect AI'}</span>
                <div className={`p-3.5 rounded-2xl max-w-[85%] text-[13px] font-medium leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-[#0F5B3E] text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-200 shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {aiLoading && (
              <div className="flex flex-col items-start">
                <span className="text-[9px] font-bold text-slate-400 uppercase mb-1">Architect AI</span>
                <div className="p-4 rounded-2xl bg-white text-slate-500 rounded-tl-none border border-slate-200 shadow-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-slate-100 bg-white shrink-0">
            <div className="relative">
              <textarea 
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                placeholder="Type your design instructions..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-4 pr-14 text-[13px] font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F5B3E]/20 resize-none h-14"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleAIGenerate()
                  }
                }}
              />
              <button 
                onClick={handleAIGenerate}
                disabled={aiLoading || !aiPrompt.trim()}
                className="absolute right-1.5 top-1.5 bottom-1.5 w-11 bg-[#0F5B3E] text-white rounded-xl flex items-center justify-center hover:bg-[#0A3B2A] transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
            {error && (
              <p className="text-[10px] text-rose-500 font-bold mt-2">Error: {error}</p>
            )}
          </div>
        </div>

        {/* 🌟 RIGHT: WIDER PLAYGROUND (LIVE PREVIEW) 🌟 */}
        <div className="flex-1 overflow-auto bg-slate-100 p-4 md:p-12 flex justify-center items-start relative">
          
          {/* 🌟 FLOATING PLAYGROUND TOOLBAR 🌟 */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 bg-white/90 backdrop-blur shadow-lg border border-slate-200 px-4 py-2 rounded-2xl">
            
            {/* Category Select */}
            <div className="flex items-center gap-2">
              <Tags className="w-3.5 h-3.5 text-slate-400" />
              <select 
                value={category} 
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="bg-transparent border-none text-[11px] font-black text-slate-700 uppercase tracking-wide focus:ring-0 cursor-pointer outline-none"
              >
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="w-px h-5 bg-slate-200" />

            {/* Layout Select */}
            <div className="flex items-center gap-2">
              <LayoutTemplate className="w-3.5 h-3.5 text-slate-400" />
              <select 
                value={layoutOption} 
                onChange={(e) => setLayoutOption(e.target.value)}
                className="bg-transparent border-none text-[11px] font-black text-slate-700 uppercase tracking-wide focus:ring-0 cursor-pointer outline-none"
              >
                {LAYOUTS.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
            </div>

            <div className="w-px h-5 bg-slate-200" />

            {/* Palette Selection */}
            <div className="flex items-center gap-2">
              <Palette className="w-3.5 h-3.5 text-slate-400 mr-1" />
              {PALETTES.map(p => (
                <button
                  key={p.id}
                  onClick={() => applyPalette(p.id)}
                  title={p.name}
                  className="w-5 h-5 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform overflow-hidden flex"
                >
                  <div className="w-1/2 h-full" style={{ backgroundColor: p.previewColors[0] }} />
                  <div className="w-1/2 h-full" style={{ backgroundColor: p.previewColors[1] }} />
                </button>
              ))}
            </div>

          </div>

          {/* Conditional Manual Settings Panel */}
          {showConfig && (
            <div className="absolute top-4 right-4 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 overflow-hidden flex flex-col max-h-[90%]">
              <div className="p-4 border-b border-slate-100 bg-[#FAF8F5] flex justify-between items-center">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2"><Settings className="w-4 h-4 text-indigo-500"/> Manual Overrides</h3>
                <button onClick={() => setShowConfig(false)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>
              <div className="p-4 overflow-y-auto space-y-3">
                {Object.keys(config).map((key) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{key}</label>
                    <input 
                      type="text" 
                      value={String(config[key as keyof typeof config])} 
                      onChange={e => {
                        const val = e.target.value;
                        const originalValue = config[key as keyof typeof config];
                        setConfig({
                          ...config,
                          [key]: typeof originalValue === "boolean" ? val === "true" : val
                        });
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* The Iframe / Browser Mock */}
          <div className={`
            transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-top mt-16
            ${viewport === 'desktop' ? 'w-full max-w-[1200px]' : ''}
            ${viewport === 'tablet' ? 'w-[768px]' : ''}
            ${viewport === 'mobile' ? 'w-[375px]' : ''}
            bg-white rounded-[2rem] shadow-2xl border border-slate-200/50 overflow-hidden flex flex-col
          `}>
            
            {/* Browser Header Fake */}
            {viewport !== 'mobile' && (
              <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 gap-2 shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="mx-4 flex-1 h-6 bg-white border border-slate-200 rounded-md max-w-sm flex items-center px-3 text-[10px] text-slate-400 font-mono">{form.id || 'new-theme'}.nexus.app/preview</div>
              </div>
            )}
            
            {/* ── LIVE PREVIEW CANVAS ── */}
            <div className={`flex-1 transition-all duration-300 relative overflow-y-auto ${finalBgClass} ${config.fontFamily} rounded-tl-xl`}>
          
              <header className={`px-6 md:px-12 py-6 flex items-center justify-between ${config.textPrimary} border-b ${config.borderStyle} ${config.glassEffect ? 'bg-white/40 backdrop-blur-xl' : config.bgContent} sticky top-0 z-50`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${config.borderRadius} bg-current opacity-10`} />
                  <h1 className="font-black text-xl tracking-tight">{form.name || "Brand Name"}</h1>
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

              <main className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-16 pb-32">
                
                {renderHeroSection()}

                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {mockContent.features.map((feature, i) => (
                    <MotionDiv key={i} delay={0.1 * i} className={`p-10 text-center space-y-4 hover:-translate-y-1 ${getCardClass()}`}>
                      <div className={`w-16 h-16 mx-auto ${config.borderRadius} ${config.accentBg} flex items-center justify-center`}>
                        <Sparkles className={`w-8 h-8 ${config.accentText}`} />
                      </div>
                      <h3 className={`text-xl font-black ${config.textPrimary}`}>{feature.title}</h3>
                      <p className={`text-base ${config.textSecondary}`}>{feature.desc}</p>
                    </MotionDiv>
                  ))}
                </section>

                <section>
                  <MotionDiv delay={0.1} className="flex items-center justify-between mb-10 px-4">
                    <h3 className={getHeadingClass("text-3xl md:text-4xl")}>Signature Items</h3>
                    <span className={`text-base font-bold ${config.textSecondary} cursor-pointer hover:underline`}>View All</span>
                  </MotionDiv>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {mockContent.products.map((item, i) => (
                      <MotionDiv key={i} delay={0.1 * i} className={`group flex flex-col overflow-hidden cursor-pointer hover:-translate-y-1 ${getCardClass()}`}>
                        <div className="aspect-[4/5] bg-slate-200 relative overflow-hidden">
                          <img src={`https://images.unsplash.com/photo-[INSERT]?q=80&w=600&auto=format&fit=crop&sig=${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Product" />
                        </div>
                        <div className="p-6 flex flex-col gap-2">
                          <h4 className={`text-xl font-black ${config.textPrimary}`}>{item.name}</h4>
                          <p className={`text-sm font-medium ${config.textSecondary}`}>Premium quality and exceptional details.</p>
                          <div className={`mt-4 text-2xl font-black ${config.accentText}`}>{item.price}</div>
                        </div>
                      </MotionDiv>
                    ))}
                  </div>
                </section>

              </main>
              
              <footer className={`py-12 text-center ${config.textSecondary} font-medium border-t ${config.borderStyle} ${config.glassEffect ? 'bg-white/20 backdrop-blur-sm' : ''}`}>
                <p>© 2026 {form.name || "Brand Name"}. Powered by Nexus.</p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
