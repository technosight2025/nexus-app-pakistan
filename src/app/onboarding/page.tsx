"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser, useClerk } from '@clerk/nextjs'
import { Store, Phone, ChevronDown, ArrowRight, CheckCircle2 } from 'lucide-react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

export default function OnboardingPage() {
  const router = useRouter()
  const { width, height } = useWindowSize()
  const { isLoaded, user } = useUser()
  const { setActive } = useClerk()
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [status, setStatus] = useState<"form" | "cooking" | "welcome">("form")
  const [cookingText, setCookingText] = useState("Securing your profile...")

  const [form, setForm] = useState({
    businessName: "",
    phone: "",
    category: ""
  })

  const categoryMap: Record<string, string> = {
    "rentals": "Rentals & Wardrobe",
    "photography": "Photography & Videography",
    "venues": "Venues & Banquets",
    "salon": "Salon, Makeup & Beauty",
    "planners": "Event Planners & Decor",
    "catering": "Catering & Food Services",
    "jewelry": "Jewelry & Accessories",
    "printing": "Invitations & Print Media",
    "transportation": "Transportation",
    "entertainment": "Music & Entertainment"
  };

  // Prefill business name from Google name if available
  useEffect(() => {
    if (isLoaded && user && !form.businessName) {
      setForm(prev => ({
        ...prev,
        businessName: user.fullName || ""
      }))
    }
  }, [isLoaded, user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    
    setLoading(true)
    setError("")

    try {
      const syncRes = await fetch("/api/auth/vendor-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,
          businessName: form.businessName,
          category: form.category,
          phone: form.phone,
          email: user.primaryEmailAddress?.emailAddress || ""
        })
      })

      if (!syncRes.ok) {
        const errData = await syncRes.json()
        throw new Error(errData.error || "Failed to sync vendor data")
      }

      setStatus("cooking")
      
      const textInterval = setInterval(() => {
        setCookingText(prev => 
          prev === "Securing your profile..." ? "Setting up your dashboard..." : 
          prev === "Setting up your dashboard..." ? "Connecting to Nexus AI..." : 
          "Finalizing your empire..."
        )
      }, 1200)

      setTimeout(() => {
        clearInterval(textInterval)
        setStatus("welcome")
      }, 3500)

    } catch (err: any) {
      console.error(err)
      setError(err.message || "Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  if (!isLoaded) return null

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4 sm:p-8 font-poppins relative overflow-hidden">
      
      {status === "welcome" && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.15}
            colors={['#0A3B2A', '#C5A880', '#115e45', '#D4AF37', '#ffffff']}
          />
        </div>
      )}

      <div className="w-full max-w-md relative min-h-[400px]">
        {/* STATE: Cooking Animation */}
        {status === "cooking" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500 text-center">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-[#0A3B2A] rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-3 h-3 bg-[#C5A880] rounded-full animate-pulse"></span>
              </div>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Almost ready...</h2>
            <p className="text-slate-500 font-medium animate-pulse">{cookingText}</p>
          </div>
        )}

        {/* STATE: Warm Welcome */}
        {status === "welcome" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-[#0A3B2A] to-[#0d4f38] rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-[#0A3B2A]/30">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
              Welcome to Nexus.
            </h2>
            <p className="text-slate-500 font-medium text-lg mb-10 max-w-[280px]">
              Your empire, <span className="font-bold text-[#0A3B2A]">{form.businessName}</span>, has been successfully created.
            </p>
            <button 
              onClick={() => router.push("/app-store")}
              className="w-full bg-[#0A3B2A] hover:bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl shadow-[#0A3B2A]/20 transition-all hover:-translate-y-1 active:translate-y-0 group flex items-center justify-center gap-3"
            >
              Enter Your World
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* STATE: Form */}
        {status === "form" && (
          <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 animate-in fade-in duration-500">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-black text-slate-900 mb-2">Complete Profile</h1>
              <p className="text-slate-500 font-medium">Just a few more details to set up your workspace.</p>
            </div>

            {error && (
              <div className="p-3 mb-6 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Business Name</label>
                <div className="relative">
                  <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    required
                    type="text" 
                    placeholder="Zardozi Boutique"
                    value={form.businessName}
                    onChange={e => setForm({...form, businessName: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Business Type</label>
                <div className="relative">
                  <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
                  
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full pl-12 pr-10 py-3 rounded-xl border ${isDropdownOpen ? 'border-[#0A3B2A] ring-2 ring-[#0A3B2A]/20' : 'border-slate-200'} bg-white text-sm font-bold focus:outline-none transition-all cursor-pointer flex items-center ${!form.category ? 'text-slate-400 font-medium' : 'text-slate-700'}`}
                  >
                    {form.category ? categoryMap[form.category] : "Select Business Type"}
                  </div>
                  
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  
                  {isDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] z-50 overflow-hidden max-h-64 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                        {[
                          { id: "rentals", label: "Rentals & Wardrobe" },
                          { id: "photography", label: "Photography & Videography" },
                          { id: "venues", label: "Venues & Banquets" },
                          { id: "salon", label: "Salon, Makeup & Beauty" },
                          { id: "planners", label: "Event Planners & Decor" },
                          { id: "catering", label: "Catering & Food Services" },
                          { id: "jewelry", label: "Jewelry & Accessories" },
                          { id: "printing", label: "Invitations & Print Media" },
                          { id: "transportation", label: "Transportation" },
                          { id: "entertainment", label: "Music & Entertainment" }
                        ].map((cat) => (
                          <div 
                            key={cat.id}
                            onClick={() => {
                              setForm({...form, category: cat.id})
                              setIsDropdownOpen(false)
                            }}
                            className={`px-4 py-3 text-sm cursor-pointer transition-colors ${form.category === cat.id ? 'bg-[#0A3B2A]/5 text-[#0A3B2A] font-bold' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}
                          >
                            {cat.label}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    required
                    type="tel" 
                    placeholder="0300 1234567"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading || !form.category}
                className="w-full mt-6 bg-[#0A3B2A] hover:bg-[#06291d] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#0A3B2A]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Completing Profile..." : "Complete Setup"}
                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
