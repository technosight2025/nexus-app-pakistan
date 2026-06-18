"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, CheckCircle2, ShieldCheck, Lock, AlertTriangle, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function BillingClient() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<"trial" | "expired" | "active" | "none" | null>(null)
  const [daysRemaining, setDaysRemaining] = useState(0)
  
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)

  useEffect(() => {
    fetch("/api/billing/status")
      .then(r => r.json())
      .then(data => {
        setStatus(data.status)
        setDaysRemaining(data.daysRemaining || 0)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSubscribe = () => {
    setIsCheckingOut(true)
    
    // Simulate Stripe Checkout & Backend Webhook processing
    setTimeout(() => {
      fetch("/api/billing/checkout", { method: "POST" })
        .then(() => {
          setCheckoutSuccess(true)
          setStatus("active")
          setTimeout(() => {
            router.push("/dashboard/rentals")
          }, 2000)
        })
    }, 2500)
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <CreditCard className="w-8 h-8 text-slate-300 mb-4" />
          <p className="text-slate-500 font-bold">Loading billing profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-slate-900 mb-2">Billing & Subscription</h1>
        <p className="text-slate-500 font-medium">Manage your Nexus Enterprise plan and payment methods.</p>
      </div>

      {checkoutSuccess ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-50 border border-emerald-100 rounded-3xl p-12 text-center shadow-lg">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-black text-emerald-900 mb-4">Payment Successful!</h2>
          <p className="text-emerald-700 font-medium max-w-md mx-auto mb-8">
            Your Nexus Rentals module is now fully activated. Thank you for subscribing!
          </p>
          <p className="text-sm font-bold text-emerald-600 animate-pulse">Redirecting to your dashboard...</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Main Status Panel */}
          <div className="md:col-span-8 space-y-6">
            {status === "expired" ? (
              <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Lock className="w-32 h-32 text-rose-500" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4 text-rose-600">
                    <AlertTriangle className="w-6 h-6" />
                    <span className="font-black uppercase tracking-wider text-sm">Trial Expired</span>
                  </div>
                  <h2 className="text-2xl font-black text-rose-900 mb-2">Your 90-Day Free Trial has ended.</h2>
                  <p className="text-rose-700 font-medium max-w-lg mb-8">
                    Your dashboard is currently locked. To regain access to your wardrobe, bookings, and the AI Try-On Studio, please upgrade to the standard plan.
                  </p>
                </div>
              </div>
            ) : status === "trial" ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Enterprise Trial</h2>
                    <p className="text-sm text-slate-500 font-medium mt-1">Full access to all rental modules.</p>
                  </div>
                  <div className="bg-[#D4AF37]/10 text-[#A07830] px-4 py-2 rounded-xl text-sm font-black uppercase tracking-widest">
                    {daysRemaining} Days Left
                  </div>
                </div>
                
                <div className="w-full bg-slate-100 rounded-full h-3 mb-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#D4AF37] to-[#A07830] h-3 rounded-full transition-all" 
                    style={{ width: `${((90 - daysRemaining) / 90) * 100}%` }}
                  />
                </div>
                <p className="text-xs font-bold text-slate-400 text-right">Day {90 - daysRemaining} of 90</p>
              </div>
            ) : status === "active" ? (
              <div className="bg-[#0A3B2A] text-white border border-[#0A3B2A] rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <ShieldCheck className="w-32 h-32 text-white" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4 text-[#D4AF37]">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-black uppercase tracking-wider text-sm">Active Subscription</span>
                  </div>
                  <h2 className="text-2xl font-serif mb-2">Nexus Enterprise Plan</h2>
                  <p className="text-white/80 font-medium max-w-lg mb-8">
                    Your account is fully active and in good standing. Next billing cycle is in 30 days.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 text-center text-slate-500 font-medium">
                No active subscription found. Please visit the App Store to install the Rentals module.
              </div>
            )}
          </div>

          {/* Checkout Panel */}
          {(status === "expired" || status === "trial") && (
            <div className="md:col-span-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl sticky top-24">
                <h3 className="font-black text-slate-900 mb-6">Upgrade to Standard</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between font-bold text-slate-600 text-sm">
                    <span>Rentals Module</span>
                    <span>Rs. 14,000/mo</span>
                  </div>
                  <div className="flex items-center justify-between font-bold text-slate-600 text-sm">
                    <span>AI Try-On Studio</span>
                    <span className="text-emerald-500">Included</span>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-black text-slate-900">
                    <span>Total Due Today</span>
                    <span className="text-xl">Rs. 14,000</span>
                  </div>
                </div>

                <button 
                  onClick={handleSubscribe}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-[#0A3B2A] hover:bg-black text-white rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" /> Pay & Subscribe
                    </>
                  )}
                </button>
                
                <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> Secure Stripe Checkout
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  )
}
