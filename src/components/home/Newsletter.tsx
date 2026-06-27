"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Send, Sparkles, MessageCircle } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [whatsappOptIn, setWhatsappOptIn] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    // Simulate Supabase insert delay
    setTimeout(() => {
      setIsLoading(false)
      setSubscribed(true)
      setEmail('')
      setWhatsappNumber('')
      console.log('Saved subscriber to Supabase:', { email, whatsappOptIn, whatsappNumber })
    }, 1200)
  }

  return (
    <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 bg-[#FAF7F2] border-t border-slate-200/50">
      <div className="max-w-3xl mx-auto bg-white border border-slate-200/50 rounded-[2.5rem] p-8 md:p-14 shadow-sm text-center space-y-8 relative overflow-hidden">
        
        {/* Decorative corner glow */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#C5A880]/10 rounded-full blur-xl" />

        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C5A880]/15 text-[#C5A880] text-[9px] font-black uppercase tracking-widest rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> Weekly Dispatch
          </span>
          <h2 className="text-3xl font-black font-serif text-slate-900 tracking-tight">
            Stay Inspired
          </h2>
          <p className="text-slate-550 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Receive wedding inspiration, planning tips, exclusive offers, and new features.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!subscribed ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubscribe} 
              className="max-w-xl mx-auto space-y-6 text-left"
            >
              <div className="flex flex-col sm:flex-row bg-slate-50 border border-slate-200/60 rounded-[20px] p-1.5 shadow-2xs">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none outline-none text-slate-800 text-sm px-4 py-3 flex-grow placeholder-slate-400 font-medium" 
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#0F5B3E] hover:bg-[#0c4730] text-white px-6 py-3 rounded-[16px] font-black text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Opt-in Checkboxes */}
              <div className="space-y-3.5 pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={whatsappOptIn}
                    onChange={(e) => setWhatsappOptIn(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#0F5B3E] focus:ring-[#0F5B3E] cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-800 group-hover:text-slate-950 transition-colors">
                      WhatsApp updates (optional)
                    </span>
                    <p className="text-slate-400 mt-0.5 text-[11px]">
                      Receive automated checklists, venue pricing catalogs, and direct support notifications.
                    </p>
                  </div>
                </label>

                {whatsappOptIn && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-7"
                  >
                    <input 
                      type="tel"
                      required
                      placeholder="e.g. +92 300 1234567"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="w-full max-w-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none"
                    />
                  </motion.div>
                )}

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    defaultChecked
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#0F5B3E] focus:ring-[#0F5B3E] cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-800 group-hover:text-slate-950 transition-colors">
                      Weekly inspiration + vendor discounts
                    </span>
                    <p className="text-slate-400 mt-0.5 text-[11px]">
                      Curated color themes, Mayun & Baraat inspiration boards, and 10% off selected partner venues.
                    </p>
                  </div>
                </label>
              </div>
            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 flex flex-col items-center justify-center gap-4 text-center max-w-sm mx-auto"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-3xs">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 leading-tight">Welcome to the Club!</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Thank you for joining. We have sent the initial curated marquee pricing spreadsheet and budget template directly to your inbox.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
