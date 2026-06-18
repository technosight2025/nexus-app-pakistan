"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, CheckCircle2, MonitorSmartphone, LayoutTemplate, Store, Crown, Palette, Eye } from "lucide-react"
import { selectWebsiteTheme } from "@/app/actions/theme"
import { useRouter } from "next/navigation"
import Image from "next/image"

const ICON_MAP: Record<string, any> = {
  LayoutTemplate,
  Crown,
  Palette,
  Store,
  Sparkles
}

export default function ThemeMarketplacePage() {
  const [themes, setThemes] = useState<any[]>([])
  const [fetchingThemes, setFetchingThemes] = useState(true)
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  React.useEffect(() => {
    fetch("/api/admin/themes")
      .then(res => res.json())
      .then(data => {
        if (data.themes) setThemes(data.themes)
        setFetchingThemes(false)
      })
      .catch(err => {
        console.error("Error fetching themes:", err)
        setFetchingThemes(false)
      })
  }, [])

  const handleSelectTheme = async (themeId: string) => {
    setSelectedTheme(themeId)
    setLoading(true)
    
    try {
      const res = await selectWebsiteTheme(themeId)
      if (res.success) {
        // Redirect to the dashboard root where the button will now say "View Public Page"
        router.push("/dashboard/rentals")
      } else {
        alert("Failed to set theme: " + res.error)
        setLoading(false)
      }
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 font-bold text-sm mb-4">
            <Sparkles className="w-4 h-4" /> Theme Marketplace
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Create Your Website</h1>
          <p className="text-slate-500 font-medium mt-3 max-w-2xl text-lg">
            Choose a stunning template for your public storefront. You can change your theme at any time.
          </p>
        </div>
      </div>

      {/* Grid */}
      {fetchingThemes ? (
        <div className="py-20 text-center text-slate-400 font-bold animate-pulse">Loading amazing themes...</div>
      ) : themes.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm max-w-2xl mx-auto">
          <Palette className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-black text-slate-900 mb-2">No Themes Available</h3>
          <p className="text-slate-500 mb-6">The marketplace is currently empty. Check back soon for new premium templates!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, idx) => {
            const IconComponent = ICON_MAP[theme.icon] || LayoutTemplate
            return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={theme.id}
            className={`relative bg-white rounded-3xl border-2 overflow-hidden flex flex-col transition-all ${selectedTheme === theme.id ? 'border-rose-500 shadow-xl ring-4 ring-rose-500/10' : 'border-slate-200 hover:border-slate-300 hover:shadow-lg'}`}
          >
            {/* Preview Image */}
            <div className="h-48 relative bg-slate-100 overflow-hidden">
              {theme.preview_image ? (
                <img src={theme.preview_image} alt={theme.name} className="object-cover w-full h-full" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-300"><LayoutTemplate className="w-10 h-10" /></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider backdrop-blur-md border ${theme.type === 'free' ? 'bg-emerald-500/80 border-emerald-400 text-white' : 'bg-amber-500/80 border-amber-400 text-white'}`}>
                  {theme.price}
                </span>
                <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 hover:bg-white/40 transition-colors">
                  <MonitorSmartphone className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${theme.type === 'free' ? 'bg-slate-100' : 'bg-amber-50'}`}>
                  <IconComponent className={`w-5 h-5 ${theme.type === 'free' ? 'text-slate-600' : 'text-amber-600'}`} />
                </div>
                <h3 className="text-xl font-black text-slate-900">{theme.name}</h3>
              </div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 flex-1">
                {theme.description}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => window.open(`/vendors/demo?theme=${theme.id}`, '_blank')}
                  className="h-12 px-6 rounded-xl font-bold text-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" /> Demo
                </button>
                <button 
                  onClick={() => handleSelectTheme(theme.id)}
                  disabled={loading}
                  className={`flex-1 h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${selectedTheme === theme.id ? 'bg-rose-500 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {loading && selectedTheme === theme.id ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : selectedTheme === theme.id ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Selected
                    </>
                  ) : (
                    "Select Theme"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
          )}
        )}
      </div>
      )}
      
    </div>
  )
}
