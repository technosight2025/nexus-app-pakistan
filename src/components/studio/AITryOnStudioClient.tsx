"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { Upload, Sparkles, Camera, Scan, ChevronLeft, Download, RefreshCw, X, Heart, Maximize2 } from 'lucide-react'
import Link from 'next/link'
import Lightbox from "yet-another-react-lightbox"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/styles.css"

interface WardrobeItem {
  id: string;
  title: string;
  category: string;
  image: string;
  price?: string | number;
}

// --- Mock Data ---
const WARDROBE: WardrobeItem[] = [
  {
    id: "crimson-bridal-set",
    title: "Crimson Bridal Set",
    category: "Bridal Wear",
    image: "/images/wardrobe/1.png"
  },
  {
    id: "emerald-sherwani",
    title: "Emerald Velvet Sherwani",
    category: "Groom Wear",
    image: "/images/wardrobe/2.png"
  },
  {
    id: "gold-lehnga",
    title: "Regal Gold Lehnga",
    category: "Bridal Wear",
    image: "/images/wardrobe/3.png"
  },
  {
    id: "pastel-gown",
    title: "Pastel Walima Gown",
    category: "Bridal Wear",
    image: "/images/wardrobe/4.png"
  }
]

type AppState = 'idle' | 'preview' | 'processing' | 'result'
type HistoryItem = { product: WardrobeItem, images: string[] }

export default function AITryOnStudioClient() {
  const searchParams = useSearchParams()
  const customId = searchParams.get('id')
  const customTitle = searchParams.get('product')
  const customImage = searchParams.get('image')
  const customPrice = searchParams.get('price')

  const [dbItem, setDbItem] = useState<any>(null)

  useEffect(() => {
    if (customId) {
      // Fetch the specific item from the API
      fetch("/api/rentals/outfits")
        .then(r => r.json())
        .then((data: any[]) => {
          if (Array.isArray(data)) {
            const match = data.find(o => o.id === customId)
            if (match) setDbItem(match)
          }
        })
        .catch(() => {})
    }
  }, [customId])

  const dynamicWardrobe = React.useMemo(() => {
    const w = [...WARDROBE];
    
    // 1. Add DB item if fetched via ID
    if (dbItem && !w.find(x => x.id === dbItem.id)) {
      w.unshift({
        id: dbItem.id,
        title: dbItem.name,
        category: dbItem.tag,
        image: dbItem.image_url || "/images/wardrobe/1.png",
        price: dbItem.price
      })
    } 
    // 2. Fallback to URL params if no ID (for legacy routes)
    else if (customTitle && customImage) {
      if (!w.find(x => x.image === customImage)) {
        w.unshift({
          id: 'custom-vendor-item',
          title: customTitle,
          category: 'Vendor Selection',
          image: customImage,
          price: customPrice || undefined
        })
      }
    }
    return w;
  }, [customTitle, customImage, customPrice, dbItem])

  const [appState, setAppState] = useState<AppState>('idle')
  const [userImageBase64, setUserImageBase64] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<WardrobeItem | null>(null)
  
  const [progress, setProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState("")
  const [outputImages, setOutputImages] = useState<string[]>([])
  
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const MAX_WIDTH = 800
          const MAX_HEIGHT = 800
          let width = img.width
          let height = img.height

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width
              width = MAX_WIDTH
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height
              height = MAX_HEIGHT
            }
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, width, height)
          
          // Compress to JPEG with 0.8 quality
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
          setUserImageBase64(dataUrl)
        }
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProductClick = (product: WardrobeItem) => {
    setSelectedProduct(product)
    setAppState('preview')
  }

  useEffect(() => {
    if (appState === 'idle' && !selectedProduct) {
      if (customId && dbItem) {
        const item = dynamicWardrobe.find(x => x.id === dbItem.id)
        if (item) {
          setSelectedProduct(item)
          setAppState('preview')
        }
      } else if (customTitle && customImage) {
        const item = dynamicWardrobe.find(x => x.image === customImage)
        if (item) {
          setSelectedProduct(item)
          setAppState('preview')
        }
      }
    }
  }, [customId, dbItem, customTitle, customImage, dynamicWardrobe, appState, selectedProduct])

  const startAIProcessing = async (product: WardrobeItem, base64Image: string) => {
    setAppState('processing')
    setProgress(5)
    setStatusMessage("Uploading images to AI cluster...")
    
    try {
      const res = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userImage: base64Image,
          productImage: product.image
        })
      })
      const prediction = await res.json()
      
      if (prediction.error) {
        throw new Error(prediction.details || prediction.error)
      }
      
      setProgress(25)
      setStatusMessage(`Fitting ${product.title} to your profile...`)
      
      // Poll for status
      const interval = setInterval(async () => {
        const statusRes = await fetch(`/api/try-on/status?id=${prediction.id}`)
        const statusData = await statusRes.json()
        
        if (statusData.status === 'succeeded') {
          clearInterval(interval)
          setProgress(100)
          setStatusMessage("Try-On Complete!")
          
          const out = Array.isArray(statusData.output) ? statusData.output : [statusData.output]
          setOutputImages(out)
          
          // Save to history
          setHistory(prev => [{ product, images: out }, ...prev])
          
          setTimeout(() => setAppState('result'), 800)
        } else if (statusData.status === 'failed') {
          clearInterval(interval)
          alert("AI Generation failed: " + (statusData.error || "Unknown error"))
          setAppState('idle')
        } else {
          setProgress(p => Math.min(p + 2, 95))
          setStatusMessage("AI is rendering your custom fit... this takes about 15 seconds.")
        }
      }, 2000)

    } catch (err: any) {
      console.error(err)
      alert("AI Error: " + (err.message || "Failed to start generation"))
      setAppState('idle')
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col md:flex-row overflow-hidden font-sans text-white">
      
      {/* LEFT PANEL: PROFILE & WARDROBE */}
      <div className="w-full md:w-[400px] lg:w-[450px] bg-[#111] border-r border-white/10 flex flex-col h-screen shrink-0 overflow-y-auto">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 sticky top-0 bg-[#111]/90 backdrop-blur-md z-20 flex items-center gap-4">
          <Link href="/marketplace" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-serif font-black text-xl text-white tracking-wide">AI Studio</h1>
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Nexus Marketplace</p>
          </div>
        </div>

        {/* Persistent Face Profile */}
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">1. Your Profile</h2>
          
          {!userImageBase64 ? (
            <div className="w-full bg-[#1A1A1A] rounded-2xl border-2 border-dashed border-white/20 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <Scan className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">Upload Your Face</h3>
              <p className="text-xs text-gray-500 mb-4 max-w-[200px]">For best results, upload a clear, front-facing photo.</p>
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors"
              >
                Choose Photo
              </button>
            </div>
          ) : (
            <div className="relative w-32 h-32 mx-auto rounded-full shadow-[0_0_20px_rgba(212,175,55,0.15)] overflow-hidden border-2 border-[#D4AF37]/50 group">
              <img src={userImageBase64} alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                <span className="text-white font-bold text-[10px] uppercase tracking-wider">Change</span>
              </div>
            </div>
          )}
        </div>

        {/* Wardrobe */}
        <div className="p-6 flex-1">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">2. The Wardrobe</h2>
          <div className="grid grid-cols-2 gap-4">
            {dynamicWardrobe.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleProductClick(item)}
                className={`group cursor-pointer relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all ${selectedProduct?.id === item.id ? 'border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-transparent'}`}
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3">
                  <span className="text-[9px] text-[#D4AF37] font-bold uppercase tracking-widest mb-1">{item.category}</span>
                  <span className="text-xs font-bold text-white leading-tight">{item.title}</span>
                </div>
                
                {/* Try On Overlay */}
                <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity ${selectedProduct?.id === item.id ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                  <span className="bg-white text-black px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">Preview</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: MAGIC CANVAS */}
      <div className="flex-1 bg-[#050505] relative flex flex-col h-screen overflow-y-auto">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-black to-black opacity-50 pointer-events-none" />

        <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10 min-h-0">
          
          <AnimatePresence mode="wait">
            
            {/* IDLE STATE */}
            {appState === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="text-center max-w-md"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-transparent border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-[#D4AF37]" />
                </div>
                <h2 className="text-4xl font-serif font-black text-white mb-4">The Magic Canvas</h2>
                <p className="text-gray-400 text-lg">
                  {!userImageBase64 
                    ? "Upload your profile picture on the left to begin your personalized fitting journey."
                    : "Select any item from the wardrobe to instantly see yourself wearing it."}
                </p>
              </motion.div>
            )}

            {/* PREVIEW STATE */}
            {appState === 'preview' && selectedProduct && (
              <motion.div 
                key="preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-5xl flex flex-col items-center justify-center h-full"
              >
                <div className="text-center mb-6">
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-white mb-2">{selectedProduct.title}</h2>
                  <p className="text-gray-400 text-sm uppercase tracking-widest">Original Product Image</p>
                </div>

                <div className="w-full mb-8 flex justify-center">
                  <div 
                    className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl group bg-[#111] cursor-pointer h-[55vh] min-h-[300px] max-h-[600px] aspect-[3/4]"
                    onClick={() => setFullScreenImage(selectedProduct.image)}
                  >
                    <img 
                      src={selectedProduct.image} 
                      alt="Original Product"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                        <Maximize2 className="w-4 h-4" /> View Full Screen
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      if (!userImageBase64) {
                        alert("Please upload your face photo first on the left panel!");
                        return;
                      }
                      startAIProcessing(selectedProduct, userImageBase64);
                    }}
                    className="px-10 py-4 rounded-xl bg-[#D4AF37] text-black font-black text-sm uppercase tracking-wider hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" /> Start AI Face Swap
                  </button>
                </div>
              </motion.div>
            )}

            {/* PROCESSING STATE */}
            {appState === 'processing' && (
              <motion.div 
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-md text-center"
              >
                <div className="relative w-48 h-64 mx-auto mb-12 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                  {selectedProduct && <img src={selectedProduct.image} className="w-full h-full object-cover opacity-30" />}
                  
                  {/* Scanning Laser Effect */}
                  <motion.div 
                    animate={{ y: ['0%', '100%', '0%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 top-0 h-1 bg-[#D4AF37] shadow-[0_0_15px_#D4AF37]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-[#D4AF37] animate-pulse" />
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white mb-2 tracking-wide font-serif">Tailoring Your Fit...</h3>
                <p className="text-[#D4AF37] mb-8 text-sm font-medium">{statusMessage}</p>

                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-yellow-300"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            )}

            {/* RESULT STATE */}
            {appState === 'result' && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-5xl flex flex-col items-center justify-center h-full"
              >
                <div className="text-center mb-6">
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-white mb-2">{selectedProduct?.title}</h2>
                  <p className="text-gray-400 text-sm uppercase tracking-widest">
                    {outputImages.length > 1 ? `${outputImages.length} AI-Generated Angles` : "AI-Generated Custom Fit"}
                  </p>
                </div>

                <div className={`w-full mb-8 ${outputImages.length === 1 ? 'flex justify-center' : 'grid grid-cols-2 lg:grid-cols-4 gap-4'}`}>
                  {outputImages.map((img, i) => (
                    <div 
                      key={i} 
                      className={`relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl group bg-[#111] cursor-pointer ${outputImages.length === 1 ? 'h-[55vh] min-h-[300px] max-h-[600px] aspect-[3/4]' : 'aspect-[3/4]'}`}
                      onClick={() => setFullScreenImage(img)}
                    >
                      <img 
                        src={img} 
                        alt={`Generated Angle ${i+1}`}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {userImageBase64 && (
                        <div className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-[#D4AF37] overflow-hidden shadow-lg opacity-90 mix-blend-luminosity bg-black">
                          <img src={userImageBase64} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                          <Maximize2 className="w-4 h-4" /> View Full Screen
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setAppState('idle')} className="px-8 py-3 rounded-xl border border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/5 transition-colors flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" /> Try Another
                  </button>
                  <button className="px-8 py-3 rounded-xl bg-[#D4AF37] text-black font-black text-sm uppercase tracking-wider hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center gap-2">
                    <Heart className="w-4 h-4 fill-black" /> Save to Wishlist
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Lookbook History Ribbon */}
        {history.length > 0 && (
          <div className="border-t border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl p-4 sticky bottom-0 z-20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Your Lookbook</span>
              <span className="text-[10px] text-gray-500">{history.length} Saved Looks</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {history.map((h, idx) => (
                <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/20 shrink-0 cursor-pointer hover:border-[#D4AF37] transition-colors" onClick={() => { setOutputImages(h.images); setSelectedProduct(h.product); setAppState('result'); }}>
                  <img src={h.images[0]} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* FULL SCREEN MODAL WITH PREMIUM ZOOM */}
      <Lightbox
        open={!!fullScreenImage}
        close={() => setFullScreenImage(null)}
        slides={[{ src: fullScreenImage || "" }]}
        plugins={[Zoom]}
        carousel={{ finite: true }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        zoom={{
          maxZoomPixelRatio: 5,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.95)", backdropFilter: "blur(12px)" } }}
      />
    </div>
  )
}
