"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, CreditCard, CheckCircle2, ChevronRight, Copy, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DigitalSalamiEnvelope() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<'amount' | 'payment' | 'success'>('amount')
  const [amount, setAmount] = useState('10000')

  return (
    <div className="relative max-w-md mx-auto">
      {/* Invite Context Wrapper */}
      <div className="bg-slate-900 rounded-xl p-8 text-center shadow-lg relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('/images/pakistani_wedding_venue.png')] bg-cover bg-center opacity-20 mix-blend-overlay pointer-events-none" />
        
        <div className="relative z-10 mb-8">
          <p className="text-orange-400 font-bold text-sm tracking-widest uppercase mb-2">Join us in celebrating</p>
          <h2 className="text-3xl font-black text-white font-serif mb-2">Ali & Fatima</h2>
          <p className="text-slate-400 text-sm">October 14th, 2026 • Lahore</p>
        </div>

        {!isOpen ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="relative z-10"
          >
            <button 
              onClick={() => setIsOpen(true)}
              className="w-full bg-gradient-to-br from-emerald-500 to-teal-700 p-8 rounded-3xl shadow-xl shadow-emerald-900/50 hover:-translate-y-2 transition-transform group border border-emerald-400/30"
            >
              <div className="w-16 h-16 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Send Digital Salami</h3>
              <p className="text-emerald-100 text-sm font-medium">Can&apos;t make it? Send your love and blessings directly via Raast or IBFT.</p>
              
              <div className="mt-6 flex items-center justify-center text-emerald-200 text-sm font-bold group-hover:text-white transition-colors">
                Open Envelope <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 relative z-10 text-left shadow-xl"
          >
            <AnimatePresence mode="wait">
              {step === 'amount' && (
                <motion.div key="amount" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="font-black text-slate-900 text-xl mb-4">Enter Amount</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['5000', '10000', '25000', '50000'].map(val => (
                      <button 
                        key={val}
                        onClick={() => setAmount(val)}
                        className={`px-4 py-2 rounded-xl font-bold text-sm border-2 transition-colors ${amount === val ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                      >
                        Rs {parseInt(val).toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="relative mb-6">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">Rs</span>
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl pl-12 pr-4 py-3 font-black text-lg text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <Button onClick={() => setStep('payment')} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-6 font-bold text-lg">
                    Proceed to Transfer
                  </Button>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="font-black text-slate-900 text-xl mb-4">Select Payment Method</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="p-4 border-2 border-emerald-600 bg-emerald-50 rounded-2xl relative cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-xs">R</div>
                        <h4 className="font-bold text-emerald-900">Raast ID</h4>
                      </div>
                      <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-emerald-200">
                        <span className="font-mono font-bold text-slate-700">0300 1234567</span>
                        <Copy className="w-4 h-4 text-slate-400 hover:text-emerald-600 cursor-pointer" />
                      </div>
                    </div>

                    <div className="p-4 border-2 border-slate-200 hover:border-slate-300 rounded-2xl cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-slate-500" />
                        <div>
                          <h4 className="font-bold text-slate-700">Bank Transfer (IBFT)</h4>
                          <p className="text-xs font-medium text-slate-500">Meezan Bank</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6 bg-slate-50 p-3 rounded-xl">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Funds go directly to the family's verified account.
                  </div>

                  <Button onClick={() => setStep('success')} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-6 font-bold text-lg">
                    I Have Transferred
                  </Button>
                  <button onClick={() => setStep('amount')} className="w-full mt-4 text-sm font-bold text-slate-500 hover:text-slate-700">Back</button>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="font-black text-slate-900 text-2xl mb-2">Thank You!</h3>
                  <p className="text-slate-600 font-medium mb-6">Your digital Salami of Rs {parseInt(amount).toLocaleString()} has been logged and sent to Ali & Fatima.</p>
                  <Button onClick={() => { setIsOpen(false); setStep('amount') }} variant="outline" className="w-full rounded-xl font-bold border-slate-200">
                    Close
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}
