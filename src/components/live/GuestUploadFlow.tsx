"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, Image as ImageIcon, CheckCircle2, Loader2, Sparkles } from "lucide-react"

export function GuestUploadFlow({ eventCode }: { eventCode: string }) {
  const [isUploading, setIsUploading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      await uploadFile(file)
    }
  }

  const uploadFile = async (file: File) => {
    setIsUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', 'Guest Upload')

      // Simulate a network delay for UX
      await new Promise(resolve => setTimeout(resolve, 1500))

      const res = await fetch('/api/memories/upload', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        setIsSuccess(true)
        setTimeout(() => {
          setIsSuccess(false)
        }, 3000)
      } else {
        alert("Upload failed. Please try again.")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload error. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-poppins relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-64 bg-[#0A3B2A] rounded-b-[40px] z-0 shadow-lg">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-md w-full mx-auto px-6 pt-12 pb-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white mb-10"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-md mb-4 border border-white/20 shadow-inner">
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2 leading-tight">Share Your Memories</h1>
          <p className="text-white/80 text-sm font-medium">Event: {eventCode.toUpperCase()}</p>
        </motion.div>

        {/* Main Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[32px] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 flex-1 flex flex-col justify-center relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-500 mb-2">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Uploaded!</h2>
                <p className="text-slate-500 text-sm">Thank you for sharing this memory. It has been sent to the host.</p>
              </motion.div>
            ) : isUploading ? (
              <motion.div 
                key="uploading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center justify-center text-center space-y-6"
              >
                <Loader2 className="w-12 h-12 text-[#0A3B2A] animate-spin" />
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Uploading Magic...</h2>
                  <p className="text-slate-400 text-sm mt-1">Please wait a moment</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="upload-buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 w-full"
              >
                <input 
                  type="file" 
                  accept="image/*,video/*" 
                  capture="environment" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileChange}
                />
                
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full relative group bg-[#0A3B2A] text-white p-6 rounded-[24px] flex flex-col items-center justify-center gap-3 hover:bg-[#155E45] transition-all shadow-md active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-white/10 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Camera className="w-10 h-10 text-yellow-500" />
                  <span className="font-bold text-lg">Take Photo</span>
                </button>

                <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-slate-100"></div>
                  <span className="flex-shrink-0 mx-4 text-slate-300 text-xs font-bold uppercase tracking-widest">or</span>
                  <div className="flex-grow border-t border-slate-100"></div>
                </div>

                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*,video/*" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    onChange={handleFileChange}
                  />
                  <button className="w-full bg-slate-50 border-2 border-dashed border-slate-200 text-slate-600 p-5 rounded-[24px] flex flex-col items-center justify-center gap-2 hover:bg-slate-100 hover:border-slate-300 transition-all active:scale-[0.98]">
                    <ImageIcon className="w-8 h-8 text-slate-400" />
                    <span className="font-bold text-sm">Choose from Gallery</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" /> Powered by Nexus OS
          </span>
        </div>
      </div>
    </div>
  )
}
