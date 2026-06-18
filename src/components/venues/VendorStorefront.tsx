"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, X, CheckCircle2, ChevronRight, MapPin, Tag } from "lucide-react"
import Image from "next/image"

type Outfit = {
  id: string
  vendor_id: string
  name: string
  tag: string
  price: string
  image_url: string
  sizes: string[]
}

export function VendorStorefront({ vendorId, outfits }: { vendorId: string, outfits: Outfit[] }) {
  const [cart, setCart] = useState<Outfit[]>([])
  const [isBagOpen, setIsBagOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  
  // Checkout Form
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const addToCart = (outfit: Outfit) => {
    setCart(prev => [...prev, outfit])
    setIsBagOpen(true)
  }

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0)

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Submit each item as a separate booking
      for (const item of cart) {
        await fetch("/api/rentals/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            outfit_id: item.id,
            vendor_id: vendorId,
            customer_name: name,
            customer_phone: phone,
            start_date: date,
            end_date: date, // For rentals, start and end might differ, but we keep it simple for now
            payment_method: paymentMethod,
            total_price: item.price
          })
        })
      }
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        setIsCheckoutOpen(false)
        setIsBagOpen(false)
        setCart([])
      }, 3000)
    } catch (err) {
      alert("Error processing order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!outfits || outfits.length === 0) return null;

  return (
    <section className="mt-16 md:mt-24 space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#1A1A1A] font-heading flex items-center gap-3">
          <span className="w-6 h-0.5 bg-[#C2A378]" /> The Wardrobe Collection
        </h2>
        <button 
          onClick={() => setIsBagOpen(true)}
          className="relative flex items-center gap-2 px-5 py-2.5 bg-white border border-stone-200 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm hover:bg-stone-50 hover:border-stone-300 transition-all text-[#1A1A1A]"
        >
          <ShoppingBag className="w-4 h-4 text-[#C2A378]" />
          Bag
          {cart.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#0F5B3E] text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {outfits.map(outfit => (
          <div key={outfit.id} className="bg-white rounded-[2rem] border border-stone-200/60 shadow-sm overflow-hidden group hover:border-[#C2A378] hover:shadow-xl transition-all duration-500">
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-50">
              {outfit.image_url ? (
                <img src={outfit.image_url} alt={outfit.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-out" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-stone-300 font-semibold text-xs">No Image</div>
              )}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-[#1A1A1A] border border-stone-200/20 shadow-sm">
                {outfit.tag}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#1A1A1A] group-hover:text-[#0F5B3E] transition-colors line-clamp-1">{outfit.name}</h3>
                <p className="text-xs font-semibold text-stone-400 mt-1 uppercase tracking-wider">{outfit.sizes?.join(", ")}</p>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <span className="text-lg font-black text-[#1A1A1A]">₨ {Number(outfit.price).toLocaleString()}</span>
                <button 
                  onClick={() => addToCart(outfit)}
                  className="px-4 py-2.5 rounded-xl bg-stone-50 text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest hover:bg-[#0F5B3E] hover:text-white transition-all shadow-sm"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>      {/* Shopping Bag Drawer */}
      <AnimatePresence>
        {isBagOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => setIsBagOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#FDF8F0] z-50 flex flex-col shadow-2xl border-l border-stone-200">
              <div className="p-6 border-b border-stone-200/60 flex items-center justify-between bg-white">
                <h3 className="text-lg font-extrabold flex items-center gap-2 text-[#1A1A1A] font-heading"><ShoppingBag className="w-5 h-5 text-[#C2A378]" /> Your Bag</h3>
                <button onClick={() => setIsBagOpen(false)} className="p-2 hover:bg-stone-50 rounded-xl transition-colors"><X className="w-5 h-5 text-stone-500" /></button>
              </div>
 
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-stone-400">
                    <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                    <p className="font-bold text-sm uppercase tracking-widest text-stone-400">Your bag is empty.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex gap-4 bg-white p-4 rounded-2xl border border-stone-200/60 shadow-sm">
                        <div className="w-20 h-24 rounded-xl bg-stone-50 overflow-hidden shrink-0 border border-stone-100">
                          {item.image_url && <img src={item.image_url} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 py-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-sm text-[#1A1A1A] line-clamp-1">{item.name}</h4>
                            <p className="text-[10px] font-bold text-[#C2A378] uppercase tracking-widest mt-0.5">{item.tag}</p>
                          </div>
                          <p className="font-extrabold text-[#1A1A1A] text-sm">₨ {Number(item.price).toLocaleString()}</p>
                        </div>
                        <button onClick={() => removeFromCart(idx)} className="p-2 self-start hover:bg-rose-50 hover:text-rose-500 rounded-xl transition-colors text-stone-300">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
 
              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-stone-200/60 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-stone-400 text-xs uppercase tracking-widest">Subtotal</span>
                    <span className="text-2xl font-black text-[#1A1A1A]">₨ {totalPrice.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => { setIsBagOpen(false); setIsCheckoutOpen(true); }}
                    className="w-full h-14 rounded-xl bg-[#0F5B3E] hover:bg-[#0c4a32] text-white font-bold uppercase tracking-widest text-xs transition-colors shadow-lg shadow-[#0F5B3E]/10"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
 
      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden relative">
                
                {isSuccess ? (
                  <div className="p-12 text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-black mb-2">Order Confirmed!</h3>
                    <p className="text-slate-500 font-medium">The boutique will contact you shortly to confirm sizing and delivery details.</p>
                  </div>
                ) : (
                  <>
                    <div className="p-6 border-b border-stone-200/60 flex items-center justify-between">
                      <h3 className="text-lg font-extrabold text-[#1A1A1A] font-heading">Secure Checkout</h3>
                      <button onClick={() => setIsCheckoutOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-stone-50 transition-colors"><X className="w-4 h-4 text-stone-500" /></button>
                    </div>
 
                    <form onSubmit={handleCheckout} className="p-6 space-y-5">
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1.5 block">Full Name</label>
                          <input required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E] outline-none font-medium transition-all text-sm text-[#1A1A1A]" placeholder="e.g. Aisha Khan" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1.5 block">WhatsApp Number</label>
                          <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E] outline-none font-medium transition-all text-sm text-[#1A1A1A]" placeholder="03xx xxxxxxx" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1.5 block">Event Date</label>
                          <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E] outline-none font-medium transition-all text-sm text-[#1A1A1A]" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1.5 block">Payment Method</label>
                          <div className="grid grid-cols-2 gap-3">
                            {["Cash on Delivery", "Bank Transfer"].map(method => (
                              <button 
                                key={method} type="button" onClick={() => setPaymentMethod(method)}
                                className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${paymentMethod === method ? "border-[#0F5B3E] bg-[#0F5B3E] text-white" : "border-stone-200 text-stone-600 bg-white hover:border-stone-300"}`}
                              >
                                {method}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
 
                      <div className="pt-4 border-t border-stone-200/60">
                        <button disabled={isSubmitting} type="submit" className="w-full h-14 rounded-xl bg-[#0F5B3E] hover:bg-[#0c4a32] text-white font-bold uppercase tracking-widest text-xs transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-[#0F5B3E]/10">
                          {isSubmitting ? "Processing..." : `Confirm Order (₨ ${totalPrice.toLocaleString()})`}
                        </button>
                        <p className="text-center text-[10px] text-stone-400 mt-4 font-semibold uppercase tracking-wider">Standard Pakistani delivery times apply. Vendor will confirm details via WhatsApp.</p>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
