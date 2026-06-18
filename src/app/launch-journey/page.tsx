"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { X, Compass, Brain, FolderHeart, Home, ArrowRight } from "lucide-react"

export default function LaunchJourneyPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleContinue = () => {
    // Lead user into signup, which directs them to the client onboarding checklist
    router.push("/sign-up?redirect_url=/onboarding")
  }

  // Animation configuration for cards fade-in
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } },
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between select-none">
      
      {/* 1. TOP APP BAR */}
      <header className="bg-surface border-b border-border w-full sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4 max-w-[1200px] mx-auto">
          <button 
            onClick={() => router.push("/marketplace")}
            className="text-primary hover:opacity-85 transition-opacity"
            aria-label="Back to Marketplace"
          >
            <X className="w-6 h-6" />
          </button>
          <h1 className="font-sans text-2xl font-bold text-primary tracking-tight">
            Nexus
          </h1>
          <div className="w-6" /> {/* Balance spacer */}
        </div>

        {/* Progress Indicator */}
        <div className="w-full bg-muted h-1 overflow-hidden">
          <motion.div 
            className="bg-primary h-full"
            initial={{ width: 0 }}
            animate={{ width: "33%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="max-w-[1200px] mx-auto px-6 py-2 flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <span>Step 1 of 3</span>
          <span className="text-primary">33% Complete</span>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 max-w-[600px] mx-auto px-6 pt-6 pb-32 space-y-8 flex flex-col items-center">
        
        {/* Hero Illustration */}
        <section className="flex flex-col items-center text-center space-y-6">
          <div className="relative w-64 h-64 md:w-72 md:h-72">
            <div 
              className="w-full h-full overflow-hidden shadow-sm border-4 border-surface bg-muted transition-all duration-300"
              style={{ borderRadius: "60% 40% 70% 30% / 30% 60% 40% 70%" }}
            >
              <img 
                alt="Joyful family gathering" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACq9tjE11yBrfWWEeiDcQU9LSmKeR05QipPdEK-ZUjuHhI3y3tz6gF5eGXnOZMF_d0wjyGK6De109zuhHYxxK3SqVlld9L8xwBqbvrSujIeUYnEW0TCzb3s5R7EzPBBjeZ1Zi7hHJ2hNXD7dUP4iOKlnvI0RjNs6arUQb0Zd_8nhR0pdgryaJ5Zkl2C-R5Ac374HKEzCRfgWumuxt1ztKN87WHrxEuNtWyTxaK5WVt_1y-lRn_5nrxoUtIyYOCXo-RYRE9MtK-GSG_"
              />
            </div>
            {/* Blurry gold accent background glow */}
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-accent opacity-20 rounded-full blur-xl -z-10" />
          </div>

          <div className="space-y-2">
            <h2 className="font-sans text-3xl font-extrabold text-primary tracking-tight">
              Welcome to Your Legacy
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Join 50,000+ families crafting moments of joy and harmony.
            </p>
          </div>
        </section>

        {/* Feature Cards Grid List */}
        {mounted && (
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-full space-y-4"
          >
            {/* Card 1 */}
            <motion.div 
              variants={cardVariants}
              className="bg-surface p-5 rounded-2xl border border-border border-l-4 border-l-primary flex items-start gap-4 shadow-sm"
            >
              <div className="p-2.5 bg-primary-container text-primary rounded-xl shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-primary font-sans">
                  Marketplace Discovery
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Connect with elite vendors curated for your unique cultural heritage.
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              variants={cardVariants}
              className="bg-surface p-5 rounded-2xl border border-border border-l-4 border-l-accent flex items-start gap-4 shadow-sm"
            >
              <div className="p-2.5 bg-accent/10 text-accent rounded-xl shrink-0">
                <Brain className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-primary font-sans">
                  AI Harmony Coach
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Navigate complex family dynamics with grace and personalized AI guidance.
                </p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              variants={cardVariants}
              className="bg-surface p-5 rounded-2xl border border-border border-l-4 border-l-secondary flex items-start gap-4 shadow-sm"
            >
              <div className="p-2.5 bg-secondary-container text-secondary rounded-xl shrink-0">
                <FolderHeart className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-primary font-sans">
                  Legacy Vault
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Secure your family's heritage, stories, and precious assets forever.
                </p>
              </div>
            </motion.div>
          </motion.section>
        )}

        {/* Action Controls */}
        <div className="w-full pt-4 space-y-4 text-center">
          <button
            onClick={handleContinue}
            className="w-full bg-primary hover:bg-primary/95 text-white font-sans text-sm font-bold py-4 rounded-xl shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Continue Journey
            <ArrowRight className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
            Step into a world of curated excellence.
          </span>
        </div>

      </main>

      {/* 3. FIXED BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 bg-surface border-t border-border z-50 rounded-t-2xl shadow-sm">
        <Link 
          href="/"
          className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors px-4 py-1"
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link 
          href="/marketplace"
          className="flex flex-col items-center justify-center text-primary bg-primary-container rounded-full px-5 py-1.5 transition-colors"
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">Marketplace</span>
        </Link>
        <Link 
          href="/onboarding"
          className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors px-4 py-1"
        >
          <Brain className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold">Coach</span>
        </Link>
        <Link 
          href="/portal"
          className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors px-4 py-1"
        >
          <FolderHeart className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold">Vault</span>
        </Link>
      </nav>

    </div>
  )
}
