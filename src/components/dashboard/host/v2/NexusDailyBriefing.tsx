"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, CalendarHeart, AlertTriangle, Lightbulb, Bell, ArrowRight, CheckCircle2, Clock, Eye, Mail, CreditCard, X } from "lucide-react"
import { useRouter } from "next/navigation"

export function NexusDailyBriefing() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissing, setIsDismissing] = useState(false)
  const router = useRouter()

  // Track completed actions for each card
  const [completedActions, setCompletedActions] = useState<Record<string, string>>({})

  // Always show on mount for testing/demo purposes
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 500)
  }, [])

  const handleDismiss = () => {
    setIsDismissing(true)
    setTimeout(() => setIsVisible(false), 800)
  }

  const handleAction = (cardId: string, actionMsg: string, redirectUrl?: string) => {
    setCompletedActions(prev => ({ ...prev, [cardId]: actionMsg }))
    if (redirectUrl) {
      setTimeout(() => {
        handleDismiss()
        router.push(redirectUrl)
      }, 1000)
    }
  }

  // Greeting logic
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening"

  if (!isVisible && !isDismissing) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <>
        <motion.div 
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 bottom-0 w-full sm:w-[450px] z-[1000] bg-[#0A3B2A] flex flex-col p-6 overflow-y-auto shadow-2xl border-l border-white/10"
        >
          {/* Close Icon */}
          <button 
            onClick={handleDismiss}
            className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Ambient Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[50%] -right-[50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-[#0A3B2A]/0 to-transparent"
            />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
          </div>

          <div className="relative z-10 w-full flex flex-col h-full mt-8">
            
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 mb-4 relative">
                <div className="absolute inset-0 rounded-full border border-yellow-500/30 animate-ping"></div>
                <Sparkles className="w-6 h-6 text-yellow-500" />
              </div>
              <h1 className="text-3xl font-black font-poppins text-white tracking-tight mb-2">
                {greeting}, Zoya.
              </h1>
              <p className="text-base text-white/70 font-medium leading-tight">
                Here is your Nexus Intelligence Briefing.
              </p>
            </motion.div>

            {/* Grid of 4 Pillars */}
            <div className="grid grid-cols-1 gap-4 w-full mb-auto pb-8">
              
              {/* 1. Latest Story (Interactive) */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors flex flex-col h-[260px]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <CalendarHeart className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-poppins">Latest Update</h3>
                </div>
                
                {completedActions['story'] ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <p className="text-white font-bold">{completedActions['story']}</p>
                  </div>
                ) : (
                  <>
                    <p className="text-white/80 leading-relaxed text-[15px] flex-1">
                      A <strong className="text-white">new quotation</strong> has arrived from <strong className="text-white">Royal Catering</strong>. They have updated the dessert menu as requested.
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/10 flex gap-3">
                      <button 
                        onClick={() => handleAction('story', 'Opening Quotation...', '/dashboard/host/v2/vendor-hub')}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-2.5 text-[13px] font-bold transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" /> View Quotation
                      </button>
                      <button 
                        onClick={() => handleAction('story', 'Marked for later')}
                        className="px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[13px] font-bold transition-colors"
                      >
                        Later
                      </button>
                    </div>
                  </>
                )}
              </motion.div>

              {/* 2. Suggestions (Interactive) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors flex flex-col h-[260px]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-poppins">Nexus Suggests</h3>
                </div>
                
                {completedActions['suggest'] ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-12 h-12 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <p className="text-white font-bold">{completedActions['suggest']}</p>
                  </div>
                ) : (
                  <>
                    <p className="text-white/80 leading-relaxed text-[15px] flex-1">
                      It's time to finalize your Walima timeline. Would you like me to draft an email to your photographer to confirm the shoot schedule?
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/10 flex gap-3">
                      <button 
                        onClick={() => handleAction('suggest', 'Opening Messages...', '/dashboard/host/v2/messages')}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-yellow-950 rounded-xl py-2.5 text-[13px] font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20"
                      >
                        <Sparkles className="w-4 h-4" /> Draft Email
                      </button>
                      <button 
                        onClick={() => handleAction('suggest', 'Suggestion dismissed')}
                        className="w-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </motion.div>

              {/* 3. Reminders (Interactive) */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors flex flex-col h-[260px]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-poppins">Reminders</h3>
                </div>

                {completedActions['remind'] ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <p className="text-white font-bold">{completedActions['remind']}</p>
                  </div>
                ) : (
                  <>
                    <p className="text-white/80 leading-relaxed text-[15px] flex-1">
                      An advance payment of <strong className="text-white">PKR 50,000</strong> to Luxe Decorators is due tomorrow to secure the stage setup.
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/10 flex gap-3">
                      <button 
                        onClick={() => handleAction('remind', 'Routing to Budget Tracker...', '/dashboard/host/v2/budget')}
                        className="flex-1 bg-purple-500 hover:bg-purple-600 text-white rounded-xl py-2.5 text-[13px] font-bold transition-colors flex items-center justify-center gap-2"
                      >
                        <CreditCard className="w-4 h-4" /> Pay Now
                      </button>
                      <button 
                        onClick={() => handleAction('remind', 'Opening Messages...', '/dashboard/host/v2/messages')}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white rounded-xl py-2.5 text-[13px] font-bold transition-colors flex items-center justify-center gap-2"
                      >
                        <Mail className="w-4 h-4" /> Message
                      </button>
                    </div>
                  </>
                )}
              </motion.div>

              {/* 4. Warnings (Interactive) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors relative overflow-hidden flex flex-col h-[260px]"
              >
                {/* Subtle warning glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full pointer-events-none"></div>
                
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-poppins">Attention Needed</h3>
                </div>

                {completedActions['warn'] ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <p className="text-white font-bold">{completedActions['warn']}</p>
                  </div>
                ) : (
                  <>
                    <p className="text-white/80 leading-relaxed text-[15px] relative z-10 flex-1">
                      Your current decor quotations exceed your allocated sub-budget by <strong className="text-red-400">15%</strong>. Consider renegotiating.
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/10 flex gap-3 relative z-10">
                      <button 
                        onClick={() => handleAction('warn', 'Opening Messages...', '/dashboard/host/v2/messages')}
                        className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 rounded-xl py-2.5 text-[13px] font-bold transition-colors flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" /> Auto-Negotiate
                      </button>
                      <button 
                        onClick={() => handleAction('warn', 'Routing to Budget...', '/dashboard/host/v2/budget')}
                        className="px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[13px] font-bold transition-colors"
                      >
                        Review
                      </button>
                    </div>
                  </>
                )}
              </motion.div>

            </div>

            {/* Dismiss Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-6 text-center"
            >
              <button 
                onClick={handleDismiss}
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-white text-[#0A3B2A] rounded-xl font-bold text-[14px] hover:bg-yellow-50 transition-colors shadow-xl active:scale-95 duration-200"
              >
                Start My Day <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

          </div>
        </motion.div>
        
        {/* Optional Overlay to close on click outside (since it's a sidebar) */}
        {isVisible && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={handleDismiss}
             className="fixed inset-0 bg-black/40 z-[999] backdrop-blur-sm"
           />
        )}
        </>
      )}
    </AnimatePresence>
  )
}
