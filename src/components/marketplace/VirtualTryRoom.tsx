"use client"

import React, { useState } from 'react'
import { Camera, Upload, Sparkles, AlertCircle, RefreshCw, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface VirtualTryRoomProps {
  productImage: string
  productTitle: string
}

export function VirtualTryRoom({ productImage, productTitle }: VirtualTryRoomProps) {
  const [step, setStep] = useState<"upload" | "processing" | "result">("upload")
  const [progress, setProgress] = useState(0)

  const handleUpload = () => {
    setStep("processing")
    
    // Simulate AI processing
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      setProgress(currentProgress)
      
      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => setStep("result"), 400)
      }
    }, 150)
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden flex flex-col h-[600px]">
      <div className="bg-[#052E20] p-4 text-white flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-amber-400" />
        <h3 className="font-bold tracking-wide">Nexus Virtual Try-On</h3>
      </div>
      
      <div className="flex-1 p-6 flex flex-col items-center justify-center relative bg-gray-50/50">
        <AnimatePresence mode="wait">
          
          {step === "upload" && (
            <motion.div 
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center max-w-md w-full"
            >
              <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center gap-4 transition-colors hover:border-[#0F5B3E] hover:bg-[#0F5B3E]/5 group cursor-pointer" onClick={handleUpload}>
                <div className="w-16 h-16 rounded-full bg-[#0F5B3E]/10 flex items-center justify-center text-[#0F5B3E] group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold text-[#052E20] text-lg">Upload Your Photo</p>
                  <p className="text-sm text-gray-500 mt-1">For best results, use a full-body picture with good lighting.</p>
                </div>
                <button className="mt-4 bg-gray-100 text-gray-700 px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors">
                  <Camera className="w-4 h-4" /> Open Camera
                </button>
              </div>
              <div className="mt-6 flex items-start gap-2 text-xs text-gray-500 bg-blue-50/50 p-4 rounded-xl text-left border border-blue-100">
                <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <p>Your photos are securely processed entirely on device or instantly deleted after processing to ensure your privacy.</p>
              </div>
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col items-center gap-6 w-full max-w-sm"
            >
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="46" 
                    fill="none" 
                    stroke="#0F5B3E" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    strokeDasharray="289"
                    strokeDashoffset={289 - (289 * progress) / 100}
                    className="transition-all duration-300 ease-out"
                  />
                </svg>
                <Sparkles className="w-8 h-8 text-[#0F5B3E] animate-pulse" />
              </div>
              <div className="text-center">
                <h4 className="font-bold text-[#052E20] text-lg">Applying {productTitle}</h4>
                <p className="text-sm text-gray-500 font-medium mt-1">
                  {progress < 30 ? "Analyzing posture and measurements..." : progress < 70 ? "Fitting garment to silhouette..." : "Enhancing lighting and shadows..."}
                </p>
              </div>
            </motion.div>
          )}

          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full flex flex-col"
            >
              <div className="flex-1 relative bg-gray-100 rounded-2xl overflow-hidden mb-4">
                {/* Mocked Try-On Result using the product image as a placeholder for the "user wearing it" */}
                <img src={productImage} alt="Try-On Result" className="w-full h-full object-cover" />
                
                <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold text-[#052E20]">
                    <Check className="w-4 h-4 text-green-600" /> Perfect Match
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-auto shrink-0">
                <button 
                  onClick={() => { setStep("upload"); setProgress(0); }}
                  className="flex-1 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" /> Try Another Photo
                </button>
                <button className="flex-1 py-3 bg-[#0F5B3E] hover:bg-[#0A422C] text-white font-bold rounded-xl text-sm transition-colors shadow-md">
                  Download Result
                </button>
              </div>
            </motion.div>
          )}
          
        </AnimatePresence>
      </div>
    </div>
  )
}
