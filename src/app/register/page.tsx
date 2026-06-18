"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useClerk } from '@clerk/nextjs'
import { useSignUp, useSignIn } from '@clerk/nextjs/legacy'
import { Store, Mail, Phone, Lock, ChevronDown, CheckCircle2, ArrowRight, ShieldCheck, User } from 'lucide-react'
import Link from 'next/link'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

export default function RegisterPage() {
  const router = useRouter()
  const { width, height } = useWindowSize()
  const { isLoaded, signUp, setActive } = useSignUp()
  const { signIn } = useSignIn()
  const { isSignedIn } = useAuth()
  const clerk = useClerk()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  // Clerk & UI Flow State
  const [registrationStatus, setRegistrationStatus] = useState<"form" | "verifying" | "cooking" | "welcome">("form")
  const [code, setCode] = useState("")
  const [cookingText, setCookingText] = useState("Securing your profile...")

  useEffect(() => {
    // If somehow a user lands here while signed in, sign them out
    if (isSignedIn) {
      clerk.signOut()
    }
  }, [isSignedIn, clerk])

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    phone: "",
    password: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signUp) {
      setError(`Authentication system is not ready. (signUp missing). Please refresh the page.`);
      return;
    }
    
    setLoading(true)
    setError("")

    try {
      const response: any = await signUp.create({
        emailAddress: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
      })

      // Clerk v7 returns error objects instead of throwing them for some API errors
      if (response && response.error) {
        throw response.error;
      }
      
      // 2. Prepare email verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
      
      // 3. Switch UI to verification mode
      setRegistrationStatus("verifying")
    } catch (err: any) {
      console.log("Clerk SignUp Error:", err)
      
      // Detailed error breakdown for the user
      let errorMsg = "Failed to create account. ";
      
      if (err.errors && err.errors.length > 0) {
        errorMsg = err.errors[0].longMessage || err.errors[0].message;
      } else if (err.message) {
        errorMsg = err.message;
      } else {
        errorMsg = JSON.stringify(err);
      }
      
      // If it says unverified session exists, they need to just verify it.
      if (errorMsg.includes("unverified")) {
        try {
          await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
          setRegistrationStatus("verifying")
          setLoading(false)
          return
        } catch (retryErr) {
          console.error("Retry prep error", retryErr)
        }
      }
      
      setError("Error: " + errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      const vanillaClerk = (window as any).Clerk;
      if (!vanillaClerk) throw new Error("Clerk is not loaded yet");
      
      await vanillaClerk.client.signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/onboarding",
      })
    } catch (err: any) {
      console.error("Google Auth Error:", err)
      let errorMsg = err.message || JSON.stringify(err);
      if (err.errors && err.errors.length > 0) {
        errorMsg = err.errors[0].longMessage || err.errors[0].message;
      }
      setError("Google Error: " + errorMsg)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signUp) {
      alert("Authentication system is missing.");
      return;
    }
    setLoading(true)
    setError("")

    try {
      // 1. Submit the OTP code to Clerk
      await signUp.attemptEmailAddressVerification({ code })

      // 2. Clerk v7 mutates the signUp object directly on success.
      // We verify the sign up is complete by checking for a session or user ID.
      if (!signUp.createdSessionId && !signUp.createdUserId && signUp.status !== "complete") {
        throw new Error("Verification failed: Session was not created.");
      }
      
      // Switch to cooking animation
      setRegistrationStatus("cooking")
        
        // Cycle cooking text for effect
        const textInterval = setInterval(() => {
          setCookingText(prev => 
            prev === "Securing your profile..." ? "Setting up your dashboard..." : 
            prev === "Setting up your dashboard..." ? "Connecting to Nexus AI..." : 
            "Finalizing your empire..."
          )
        }, 1200)

        // Sign out any old sessions completely
        await clerk.signOut()
        await setActive({ session: signUp.createdSessionId })

        // Get the definitive user ID from the active session or the signUp object
        const finalUserId = signUp.createdUserId || clerk.user?.id || clerk.session?.user?.id;
        
        if (!finalUserId) {
          throw new Error("Critical Error: Unable to determine User ID after verification. Please contact support.");
        }

        // 3. Sync custom vendor details to our database
        const syncRes = await fetch("/api/auth/vendor-sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clerkId: finalUserId,
            businessName: form.businessName,
            category: form.category,
            phone: form.phone,
            email: form.email
          })
        })

        if (!syncRes.ok) throw new Error("Failed to sync vendor data")

        // Ensure the cooking animation plays for at least 3.5 seconds total
        await new Promise(r => setTimeout(r, 2000))
        clearInterval(textInterval)

        // 4. Show Warm Welcome
        setRegistrationStatus("welcome")
    } catch (err: any) {
      console.error(err)
      let msg = err.errors?.[0]?.message || err.message;
      if (!msg) msg = JSON.stringify(err);
      setError("Verify Error: " + msg)
      setRegistrationStatus("verifying")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex pt-24 pb-12">
      {/* Left side branding */}
      <div className="hidden lg:flex flex-1 bg-[#0A3B2A] text-white flex-col justify-between p-10 relative overflow-hidden rounded-r-[3rem] shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C5A880]/20 blur-3xl rounded-full pointer-events-none" />
        
        <div>
          <div className="flex items-center gap-2 mb-12">
            <Store className="w-8 h-8 text-[#D4AF37]" />
            <span className="text-xl font-black tracking-widest uppercase">Nexus</span>
          </div>
          
          <h1 className="text-5xl font-serif leading-tight mb-6">
            Build your empire on the premier platform.
          </h1>
          <p className="text-lg text-white/80 max-w-md">
            Join thousands of high-end vendors managing their rentals, bookings, and customer experiences in one beautiful ecosystem.
          </p>
        </div>
        
        <div className="flex items-center gap-4 text-sm font-bold text-white/60">
          <span>Trusted by 5,000+ Vendors</span>
          <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span>
          <span>Enterprise Grade</span>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-6 relative">
        
        {/* Full Screen Confetti Overlay when Welcome screen is active */}
        {registrationStatus === "welcome" && (
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

        <div className="max-w-md w-full mx-auto relative min-h-[400px]">
          
          {/* STATE: Cooking Animation */}
          {registrationStatus === "cooking" && (
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
          {registrationStatus === "welcome" && (
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

          {/* STATE: Form & Verifying */}
          {(registrationStatus === "form" || registrationStatus === "verifying") && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-6 text-center lg:text-left">
                <h2 className="text-3xl font-black text-slate-900 mb-2">
                  {registrationStatus === "verifying" ? "Verify your email" : "Create your account"}
                </h2>
                <p className="text-slate-500 font-medium">
                  {registrationStatus === "verifying" 
                    ? "We sent a 6-digit code to your email. Enter it below to secure your account."
                    : "Start your 90-day free trial today. No credit card required."
                  }
                </p>
              </div>

              {error && (
                <div className="p-3 mb-6 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  {error}
                </div>
              )}

              {registrationStatus === "verifying" ? (
                <form onSubmit={handleVerify} className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Verification Code</label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        required
                        type="text" 
                        placeholder="123456"
                        maxLength={6}
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-white text-lg font-black tracking-[0.5em] text-center focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 transition-all"
                      />
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={handleVerify}
                    disabled={loading}
                    className="w-full mt-6 bg-[#0A3B2A] hover:bg-[#06291d] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#0A3B2A]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? "Verifying Securely..." : "Verify & Complete Account"}
                    {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </form>
              ) : (
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">First Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="text" 
                      name="firstName"
                      id="firstName"
                      autoComplete="given-name"
                      placeholder="Jane"
                      value={form.firstName}
                      onChange={e => setForm({...form, firstName: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="text" 
                      name="lastName"
                      id="lastName"
                      autoComplete="family-name"
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={e => setForm({...form, lastName: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Business Name</label>
                <div className="relative">
                  <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    required
                    type="text" 
                    name="businessName"
                    id="businessName"
                    autoComplete="organization"
                    placeholder="Zardozi Boutique"
                    value={form.businessName}
                    onChange={e => setForm({...form, businessName: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="email" 
                      name="email"
                      id="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="tel" 
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      placeholder="0300 1234567"
                      value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="password" 
                      name="password"
                      id="password"
                      autoComplete="new-password"
                      placeholder="••••••••"
                      minLength={8}
                      value={form.password}
                      onChange={e => setForm({...form, password: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Required by Clerk for custom flows to prevent bots */}
              <div id="clerk-captcha"></div>

              <button 
                type="submit"
                disabled={loading || !form.category}
                className="w-full mt-6 bg-[#0A3B2A] hover:bg-[#06291d] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#0A3B2A]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Preparing Account..." : "Continue to Verify"}
                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

              <div className="relative flex items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink-0 mx-4 text-xs font-bold text-slate-400 uppercase tracking-wider">OR</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Google SSO Button */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full bg-white hover:bg-slate-50 text-slate-700 py-3 rounded-xl font-bold border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </div>
          )}
        </div>
      )}

          {(registrationStatus === "form" || registrationStatus === "verifying") && (
            <p className="mt-8 text-center text-sm font-medium text-slate-500">
              Already have an account? <Link href="/login" className="text-[#0A3B2A] font-bold hover:underline">Log in</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
