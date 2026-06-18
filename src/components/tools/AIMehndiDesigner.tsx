"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Image as ImageIcon, Download, Share2, Search, Heart, Loader2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const MEHNDI_STYLES = [
  { id: 'bridal', name: "Heavy Bridal", desc: "Full arms, intricate traditional patterns", img: "/images/mehndi_bridal.png" },
  { id: 'arabic', name: "Arabic Floral", desc: "Elegant, spaced out floral motifs", img: "/images/mehndi_arabic.png" },
  { id: 'minimalist', name: "Minimalist Modern", desc: "Delicate geometric & thin lines", img: "/images/mehndi_minimalist.png" },
]

export function AIMehndiDesigner() {
  const [selectedStyle, setSelectedStyle] = useState('bridal')
  const [placement, setPlacement] = useState('full')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImg, setGeneratedImg] = useState<string | null>(null)

  const handleGenerate = () => {
    setIsGenerating(true)
    setGeneratedImg(null)
    
    // Simulate AI generation delay
    setTimeout(() => {
      const styleObj = MEHNDI_STYLES.find(s => s.id === selectedStyle)
      setGeneratedImg(styleObj?.img || "/images/mehndi_bridal.png")
      setIsGenerating(false)
    }, 2500)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-100 text-pink-700 font-bold mb-4 text-xs tracking-wider">
          <Sparkles className="w-3 h-3" /> AI-POWERED DESIGN
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight">Virtual Mehndi Designer</h1>
        <p className="text-slate-600 font-medium">Visualize your dream henna design before booking your artist.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Panel (Left) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
              Select Style
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              {MEHNDI_STYLES.map(style => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                    selectedStyle === style.id 
                      ? 'border-primary bg-primary/5 shadow-sm' 
                      : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-16 h-16 rounded-xl relative overflow-hidden flex-shrink-0">
                    <Image src={style.img} alt={style.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className={`font-bold ${selectedStyle === style.id ? 'text-primary' : 'text-slate-900'}`}>{style.name}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-1">{style.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4 mt-8 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
              Placement
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Full Arms', 'Half Arms', 'Palms Only', 'Back of Hand', 'Feet'].map(p => {
                const id = p.toLowerCase().replace(/ /g, '-')
                return (
                  <button
                    key={id}
                    onClick={() => setPlacement(id)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                      placement === id 
                        ? 'bg-slate-900 border-slate-900 text-white' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {p}
                  </button>
                )
              })}
            </div>

            <div className="mt-10">
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 text-white rounded-2xl py-7 font-bold text-lg shadow-xl shadow-primary/20 transition-all group overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isGenerating ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />}
                  {isGenerating ? 'Generating Design...' : 'Generate Live Preview'}
                </span>
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay"></div>
              </Button>
            </div>
          </div>
        </div>

        {/* Live Preview Panel (Right) */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 rounded-xl p-4 md:p-8 shadow-lg relative overflow-hidden h-[600px] flex flex-col justify-between">
            {/* Ambient Background */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="relative z-10 flex justify-between items-center mb-4">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white text-sm font-medium flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${generatedImg ? 'bg-green-400' : 'bg-amber-400 animate-pulse'}`} />
                {generatedImg ? 'Preview Ready' : 'Awaiting Input'}
              </div>
              {generatedImg && (
                <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/10">
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="relative z-10 flex-1 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div 
                    key="generating"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center"
                  >
                    <div className="w-32 h-32 mx-auto relative mb-6">
                      <div className="absolute inset-0 border-4 border-white/20 rounded-full animate-ping" />
                      <div className="absolute inset-0 border-4 border-t-primary border-r-pink-500 border-b-transparent border-l-transparent rounded-full animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">AI is designing...</h3>
                    <p className="text-slate-400 font-medium">Crafting the perfect {MEHNDI_STYLES.find(s=>s.id===selectedStyle)?.name} pattern</p>
                  </motion.div>
                ) : generatedImg ? (
                  <motion.div
                    key="generated"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-white/10 group"
                  >
                    <Image src={generatedImg} alt="Generated Mehndi" fill className="object-cover" />
                    
                    {/* Scanner line effect that runs once */}
                    <motion.div 
                      initial={{ top: 0, opacity: 1 }}
                      animate={{ top: "100%", opacity: 0 }}
                      transition={{ duration: 1.5, ease: "linear" }}
                      className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_rgba(255,56,92,0.8)]"
                    />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <div className="w-24 h-24 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                      <ImageIcon className="w-8 h-8 text-slate-500" />
                    </div>
                    <p className="text-slate-400 font-medium max-w-xs mx-auto">
                      Select a style and placement on the left, then click generate to see your virtual preview.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions Toolbar */}
            <div className={`relative z-10 transition-all duration-500 ${generatedImg ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 bg-white hover:bg-slate-100 text-slate-900 rounded-xl py-6 font-bold">
                  <Heart className="w-4 h-4 mr-2" /> Save to Moodboard
                </Button>
                <Link href="/dashboard/planner?tab=vendors" className="flex-1">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 font-bold shadow-lg shadow-primary/20">
                    <Search className="w-4 h-4 mr-2" /> Find Mehndi Artists
                  </Button>
                </Link>
                <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-xl px-4">
                  <Download className="w-5 h-5" />
                </Button>
                <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-xl px-4">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
