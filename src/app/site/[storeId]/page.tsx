import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { MotionDiv } from '@/components/layout/MotionWrapper'

export const revalidate = 0 // Dynamic page

const formatPKR = (n: number) =>
  'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(n);

// Fallback default theme if none specified/found
const DEFAULT_CONFIG = {
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
  layoutType: "hero_immersive",
  category: "venue",
  bgGradient: "bg-gradient-to-br from-slate-50 to-white",
  textGradient: "none",
  glassEffect: false,
  buttonStyle: "pill",
  cardStyle: "elevated",
  animationStyle: "fade-up"
}

export default async function VendorStorefront({ params, searchParams }: { params: Promise<{ storeId: string }>, searchParams: Promise<{ themeId?: string }> }) {
  const resolvedParams = await params
  const storeId = resolvedParams.storeId
  const resolvedSearchParams = await searchParams
  const themeId = resolvedSearchParams.themeId

  const supabase = await createClient()

  // 1. Fetch Vendor/Organization
  const { data: org } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', storeId)
    .single()

  let vendorName = "Vendor Store"
  
  if (org) {
    vendorName = org.name
  } else {
    // If not found in organizations, try branches
    const { data: branch } = await supabase
      .from('branches')
      .select('*')
      .eq('id', storeId)
      .single()
    
    if (branch) {
      vendorName = branch.name
    } else {
      vendorName = "Nexus Partner Store"
    }
  }

  // 2. Fetch Live Products
  const { data: productsData } = await supabase
    .from('products')
    .select('*')
    .eq('organization_id', storeId)
    .eq('is_active', true)
    .eq('show_on_public_profile', true)
    .order('name')

  const products = productsData || []

  // Extract features from product types
  const featuresSet = new Set(products.map((p: any) => p.type).filter(Boolean))
  const features = Array.from(featuresSet).map(type => {
    return {
      title: `Premium ${String(type).charAt(0).toUpperCase() + String(type).slice(1)}s`,
      desc: `Explore our high quality ${type} offerings.`
    }
  })
  
  if (features.length === 0) {
    features.push({ title: "Premium Quality", desc: "Crafted with the finest materials." })
    features.push({ title: "Fast Delivery", desc: "Get it when you need it." })
    features.push({ title: "24/7 Support", desc: "We're always here to help." })
  }

  // 3. Fetch Theme Configuration
  let config = { ...DEFAULT_CONFIG }
  
  // Resolve which theme ID to load. URL param takes precedence, then org settings, then fallback.
  let resolvedThemeId = themeId
  
  if (!resolvedThemeId && org && org.settings) {
    const settings = org.settings as Record<string, any>
    if (settings.active_theme_id) {
      resolvedThemeId = settings.active_theme_id
    }
  }

  if (resolvedThemeId) {
    const { data: theme } = await supabase.from('themes').select('config').eq('id', resolvedThemeId).single()
    if (theme && theme.config) {
      config = { ...config, ...theme.config }
    }
  } else {
    // Grab the latest theme as a default to show the dynamic styling
    const { data: theme } = await supabase.from('themes').select('config').order('created_at', { ascending: false }).limit(1).single()
    if (theme && theme.config) {
      config = { ...config, ...theme.config }
    }
  }

  const { layoutType, category } = config

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

  // Hero Renderer
  const renderHeroSection = () => {
    if (layoutType === 'split_screen') {
      return (
        <section className={`w-full overflow-hidden min-h-[500px] flex flex-col md:flex-row items-center ${getCardClass()}`}>
          <div className="w-full md:w-1/2 p-12 flex flex-col justify-center items-start text-left space-y-6 relative z-10">
             <MotionDiv delay={0.1} animationStyle={config.animationStyle}>
               <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${config.accentBg} ${config.accentText}`}>
                 {category?.toUpperCase() || 'PREMIUM'}
               </span>
             </MotionDiv>
             <MotionDiv delay={0.2} animationStyle={config.animationStyle}>
               <h2 className={getHeadingClass("text-5xl md:text-6xl")}>
                 {vendorName}
               </h2>
             </MotionDiv>
             <MotionDiv delay={0.3} animationStyle={config.animationStyle}>
               <p className={`text-lg font-medium ${config.textSecondary} max-w-sm`}>
                 Welcome to our official storefront. Explore our premium selection crafted for perfection.
               </p>
             </MotionDiv>
             <MotionDiv delay={0.4} animationStyle={config.animationStyle} className="pt-2">
               <button className={getButtonClass()}>
                 Explore Services
               </button>
             </MotionDiv>
          </div>
          <MotionDiv delay={0.2} animationStyle={config.animationStyle} className="w-full md:w-1/2 h-full min-h-[400px] relative">
             <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover absolute inset-0" alt="Hero" />
             <div className={`absolute inset-0 bg-gradient-to-r from-[${config.bgContent?.includes('#') ? config.bgContent.replace('bg-','') : 'white'}] to-transparent opacity-30`} />
          </MotionDiv>
        </section>
      )
    }

    if (layoutType === 'gallery_grid') {
      return (
        <section className="w-full space-y-8">
          <MotionDiv delay={0.1} animationStyle={config.animationStyle} className="text-center max-w-2xl mx-auto space-y-4 px-4 pt-12">
            <h2 className={getHeadingClass("text-5xl md:text-7xl")}>
              {vendorName}
            </h2>
            <p className={`text-xl font-medium ${config.textSecondary}`}>
              Welcome to our official storefront. We bring your vision to life.
            </p>
          </MotionDiv>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            <MotionDiv delay={0.2} animationStyle={config.animationStyle} className={`col-span-2 row-span-2 aspect-square ${config.borderRadius} overflow-hidden ${config.shadowStyle}`}>
              <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Gallery" />
            </MotionDiv>
            <MotionDiv delay={0.3} animationStyle={config.animationStyle} className={`aspect-square ${config.borderRadius} overflow-hidden ${config.shadowStyle}`}>
              <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Gallery" />
            </MotionDiv>
            <MotionDiv delay={0.4} animationStyle={config.animationStyle} className={`aspect-square ${config.borderRadius} overflow-hidden ${config.shadowStyle}`}>
              <img src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Gallery" />
            </MotionDiv>
            <MotionDiv delay={0.5} animationStyle={config.animationStyle} className={`col-span-2 aspect-[2/1] ${config.borderRadius} overflow-hidden ${config.shadowStyle}`}>
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
          <MotionDiv delay={0.1} animationStyle={config.animationStyle}>
            <span className={`inline-block px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest ${config.accentBg} ${config.accentText}`}>
              {category?.toUpperCase() || 'PORTFOLIO'}
            </span>
          </MotionDiv>
          <MotionDiv delay={0.2} animationStyle={config.animationStyle}>
            <h2 className={getHeadingClass("text-5xl md:text-7xl")}>
              {vendorName}
            </h2>
          </MotionDiv>
          <MotionDiv delay={0.3} animationStyle={config.animationStyle}>
            <p className={`text-xl md:text-2xl font-medium ${config.textSecondary} max-w-2xl mx-auto`}>
              Welcome to our official storefront. Explore our premium selection crafted for perfection.
            </p>
          </MotionDiv>
          <MotionDiv delay={0.4} animationStyle={config.animationStyle} className="pt-8 flex gap-4 justify-center">
            <button className={getButtonClass()}>
              Explore Collection
            </button>
          </MotionDiv>
        </div>
      </section>
    )
  }

  return (
    <div className={`min-h-screen ${finalBgClass} ${config.fontFamily} transition-colors duration-500`}>
      
      {/* 🌟 HEADER 🌟 */}
      <header className={`px-6 md:px-12 py-6 flex items-center justify-between ${config.textPrimary} border-b ${config.borderStyle} ${config.glassEffect ? 'bg-white/40 backdrop-blur-xl' : config.bgContent} sticky top-0 z-50`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 ${config.borderRadius} bg-current opacity-10`} />
          <h1 className="font-black text-2xl tracking-tight">{vendorName}</h1>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold opacity-80">
          <span className="hover:opacity-100 cursor-pointer">Home</span>
          <span className="hover:opacity-100 cursor-pointer">Catalog</span>
          <span className="hover:opacity-100 cursor-pointer">About</span>
          <span className="hover:opacity-100 cursor-pointer">Contact</span>
        </nav>
        <div className={getButtonClass()}>
          Book Now
        </div>
      </header>

      {/* 🌟 MAIN CONTENT 🌟 */}
      <main className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-16 pb-32">
        
        {/* Dynamic Hero Section */}
        {renderHeroSection()}

        {/* Dynamic Features from product types */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.slice(0, 3).map((feature, i) => (
            <MotionDiv key={i} delay={0.1 * i} animationStyle={config.animationStyle} className={`p-10 text-center space-y-4 hover:-translate-y-1 ${getCardClass()}`}>
              <div className={`w-16 h-16 mx-auto ${config.borderRadius} ${config.accentBg} flex items-center justify-center`}>
                <Sparkles className={`w-8 h-8 ${config.accentText}`} />
              </div>
              <h3 className={`text-xl font-black ${config.textPrimary}`}>{feature.title}</h3>
              <p className={`text-base ${config.textSecondary}`}>{feature.desc}</p>
            </MotionDiv>
          ))}
        </section>

        {/* Live Products Grid */}
        <section>
          <MotionDiv delay={0.1} animationStyle={config.animationStyle} className="flex items-center justify-between mb-10 px-4">
            <h3 className={getHeadingClass("text-3xl md:text-4xl")}>Featured Services</h3>
            <span className={`text-base font-bold ${config.textSecondary} cursor-pointer hover:underline`}>View All</span>
          </MotionDiv>
          
          {products.length === 0 ? (
            <div className={`w-full p-16 text-center ${config.bgContent} ${config.borderRadius} ${config.borderStyle}`}>
              <h4 className={`text-2xl font-black ${config.textPrimary}`}>No products available</h4>
              <p className={`text-lg mt-2 ${config.textSecondary}`}>This vendor has not published any public products yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product: any, i: number) => (
                <MotionDiv key={product.id} delay={0.1 * i} animationStyle={config.animationStyle} className={`group flex flex-col overflow-hidden cursor-pointer hover:-translate-y-1 ${getCardClass()}`}>
                  <div className="aspect-[4/5] bg-slate-200 relative overflow-hidden">
                    <img src={`https://picsum.photos/seed/${product.id}/600/800`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                    {product.promo_badge && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-rose-600 shadow-sm">
                        {product.promo_badge}
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className={`text-lg font-black leading-tight ${config.textPrimary}`}>{product.name}</h4>
                    </div>
                    {product.description && (
                      <p className={`text-sm font-medium ${config.textSecondary} line-clamp-2 leading-relaxed flex-1`}>{product.description}</p>
                    )}
                    <div className={`mt-2 text-2xl font-black ${config.accentText}`}>
                      {formatPKR(product.unit_price)}
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          )}
        </section>

      </main>
      
      {/* 🌟 FOOTER 🌟 */}
      <footer className={`py-12 text-center ${config.textSecondary} font-medium border-t ${config.borderStyle} ${config.glassEffect ? 'bg-white/20 backdrop-blur-sm' : ''}`}>
        <p>© {new Date().getFullYear()} {vendorName}. Powered by Nexus.</p>
      </footer>
    </div>
  )
}
