'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Camera, Sparkles, Scan, CheckCircle2, Wand2 } from 'lucide-react'
import Image from 'next/image'

interface VirtualTryOnProps {
  isOpen: boolean
  onClose: () => void
  productImages: string[]
  productTitle: string
}

type Step = 'upload' | 'processing' | 'result'

export default function VirtualTryOn({ isOpen, onClose, productImages, productTitle }: VirtualTryOnProps) {
  const [step, setStep] = useState<Step>('upload')
  const [progress, setProgress] = useState(0)
  const [userImage, setUserImage] = useState<string | null>(null)
  const [outputImages, setOutputImages] = useState<string[]>([])
  const [statusMessage, setStatusMessage] = useState("Initializing AI Engine...")
  
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setStep('upload')
      setProgress(0)
      setUserImage(null)
    }
  }, [isOpen])

  const startAIProcessing = async (base64Image: string) => {
    setStep('processing')
    setProgress(5)
    setStatusMessage("Uploading images to AI cluster...")
    
    try {
      const res = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userImage: base64Image,
          productImage: productImages[0] // Primary product image
        })
      })
      const prediction = await res.json()
      
      if (prediction.error) throw new Error(prediction.error)
      
      setProgress(25)
      setStatusMessage("Starting IDM-VTON prediction...")
      
      // Poll for status
      const interval = setInterval(async () => {
        const statusRes = await fetch(`/api/try-on/status?id=${prediction.id}`)
        const statusData = await statusRes.json()
        
        if (statusData.status === 'succeeded') {
          clearInterval(interval)
          setProgress(100)
          setStatusMessage("Try-On Complete!")
          
          // Replicate sometimes returns a single string or an array. We handle both.
          const out = Array.isArray(statusData.output) ? statusData.output : [statusData.output]
          setOutputImages(out)
          setTimeout(() => setStep('result'), 800)
        } else if (statusData.status === 'failed') {
          clearInterval(interval)
          alert("AI Generation failed. Please try again.")
          setStep('upload')
        } else {
          // Increment progress slightly while waiting
          setProgress(p => Math.min(p + 2, 95))
          setStatusMessage("AI is rendering your custom fit... this takes about 15 seconds.")
        }
      }, 2000)

    } catch (err) {
      console.error(err)
      alert("Failed to start AI generation.")
      setStep('upload')
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setUserImage(base64)
        startAIProcessing(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Cinematic Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-[#0A0A0A] rounded-[2rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center z-20 bg-gradient-to-b from-[#0A0A0A] to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                <Wand2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-white font-serif font-black text-xl tracking-wide">AI Try-On Studio</h2>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">{productTitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative mt-16 overflow-y-auto">
            
            {/* Step 1: Upload */}
            {step === 'upload' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-2xl text-center"
              >
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 text-white mb-6">
                    <Scan className="w-10 h-10 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 font-serif">See Yourself in This Dress</h3>
                  <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto mb-2">Upload a clear, front-facing picture of your face and our AI will generate 4 stunning angles of you wearing the dress.</p>
                </div>

                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />

                <div className="w-full max-w-sm mx-auto">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative w-full h-40 rounded-2xl border-2 border-dashed border-white/20 hover:border-[#D4AF37] bg-[#141414] hover:bg-[#1A1A1A] transition-all flex flex-col items-center justify-center gap-4 overflow-hidden shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Upload className="w-10 h-10 text-gray-300 group-hover:text-[#D4AF37] transition-colors" />
                    <span className="text-sm font-bold text-white uppercase tracking-wider">Select Photo from Device</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Processing */}
            {step === 'processing' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md text-center flex flex-col items-center"
              >
                <div className="relative w-48 h-64 mb-8 rounded-2xl overflow-hidden border border-white/20">
                  {/* Silhouette Placeholder or User Image */}
                  {userImage ? (
                    <img src={userImage} className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black" />
                  )}
                  
                  {/* Scanning Animation */}
                  <motion.div 
                    animate={{ y: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-1 bg-[#D4AF37] shadow-[0_0_20px_5px_rgba(212,175,55,0.5)] z-10"
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-[#D4AF37] animate-pulse opacity-50" />
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white mb-2 tracking-wide font-serif">Tailoring Your Fit...</h3>
                <p className="text-gray-400 mb-8 text-sm">
                  {statusMessage}
                </p>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-yellow-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-[#D4AF37] font-bold mt-3 text-xl">{progress}%</div>
              </motion.div>
            )}

            {/* Step 3: Result */}
            {step === 'result' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full h-full flex flex-col items-center justify-center"
              >
                <div className="flex items-center gap-2 mb-6 text-green-400 bg-green-400/10 px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Try-On Complete</span>
                </div>

                <div className="w-full max-w-3xl flex-1 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full">
                    {outputImages.map((img, i) => (
                      <div key={i} className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-white/20 shadow-2xl group bg-[#0A0A0A]">
                        <img 
                          src={img} 
                          alt={`Generated AI Output ${i+1}`}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        
                        {/* Simulation Indicator - Mocking Face Swap */}
                        {userImage && (
                          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#D4AF37] overflow-hidden shadow-lg opacity-80 mix-blend-luminosity">
                            <img src={userImage} className="w-full h-full object-cover" />
                          </div>
                        )}

                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                          <span className="text-[9px] sm:text-[10px] text-white font-bold uppercase tracking-widest">Angle {i+1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex gap-3 sm:gap-4 w-full max-w-xl">
                  <button 
                    onClick={() => setStep('upload')}
                    className="flex-1 py-3.5 rounded-xl border border-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-white/5 transition-colors"
                  >
                    Retake Photo
                  </button>
                  <button 
                    onClick={onClose}
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-black font-black text-xs sm:text-sm uppercase tracking-wider hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(212,175,55,0.3)] flex justify-center items-center gap-2"
                  >
                    Download Portfolio
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
