"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, ShieldCheck, CheckCircle2, Ruler, Phone, Mail, User, Plus, Edit2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MeasurementWizard } from '@/components/marketplace/MeasurementWizard'

interface ProductData {
  id: string
  title: string
  price: string
  images: string[]
  sizes: string[]
  vendorName: string
  vendorId: string
  categorySlug: string
}

const STANDARD_SIZE_MAP: Record<string, Record<string, string>> = {
  "S": { teera: "13.5", chati: "36", kamar: "32", ghair: "40", lambaai: "38", bazu: "20" },
  "M": { teera: "14.5", chati: "39", kamar: "34", ghair: "43", lambaai: "40", bazu: "21" },
  "L": { teera: "15.5", chati: "42", kamar: "37", ghair: "46", lambaai: "42", bazu: "22" },
  "XL": { teera: "16.5", chati: "45", kamar: "40", ghair: "49", lambaai: "44", bazu: "22.5" }
}

const MEASUREMENT_LABELS: Record<string, string> = {
  teera: "Shoulders (Teera)",
  chati: "Chest (Chati)",
  kamar: "Waist (Kamar)",
  ghair: "Hips (Ghair)",
  lambaai: "Length",
  bazu: "Sleeves"
}

export function InquireClient({ product }: { product: ProductData }) {
  const [step, setStep] = useState<"form" | "success">("form")
  const [showWizard, setShowWizard] = useState(false)
  
  const [measurementsObj, setMeasurementsObj] = useState<Record<string, string>>({
    teera: "", chati: "", kamar: "", ghair: "", lambaai: "", bazu: ""
  })

  const [wantsDelivery, setWantsDelivery] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventDate: "",
    returnDate: "",
    size: product.sizes[0] || "",
    notes: ""
  })

  // Initialize with the default selected size if it's a standard one
  React.useEffect(() => {
    if (formData.size && STANDARD_SIZE_MAP[formData.size]) {
      setMeasurementsObj(STANDARD_SIZE_MAP[formData.size])
    }
  }, [])

  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate measurements
    if (Object.values(measurementsObj).some(val => val.trim() === "")) {
      alert("Please ensure all 6 measurements are provided before submitting.")
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        productId: product.id,
        vendorId: product.vendorId,
        dates: {
          eventDate: formData.eventDate,
          returnDate: formData.returnDate,
        },
        measurements: {
          baseSize: formData.size,
          details: measurementsObj,
        },
        delivery: {
          wantsDelivery: wantsDelivery,
        },
        contact: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        },
        notes: formData.notes,
        totals: {
          basePrice: parseInt(product.price.replace(/,/g, '')) || 0,
          extraDaysFee: extraDays > 0 ? (parseInt(product.price.replace(/,/g, '')) || 0) * 0.10 * extraDays : 0,
          deliveryFee: wantsDelivery ? 2000 : 0,
          deposit: 15000
        }
      }

      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error('Failed to submit inquiry')
      }

      setStep("success")
    } catch (error) {
      console.error(error)
      alert("Something went wrong while sending your inquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (name === "size") {
      if (value === "Custom Fit") {
        setMeasurementsObj({ teera: "", chati: "", kamar: "", ghair: "", lambaai: "", bazu: "" })
        setShowWizard(true)
      } else if (STANDARD_SIZE_MAP[value]) {
        setMeasurementsObj(STANDARD_SIZE_MAP[value])
      }
    }
  }

  // Date and Billing Calculations
  const startDate = formData.eventDate ? new Date(formData.eventDate) : null
  const endDate = formData.returnDate ? new Date(formData.returnDate) : null
  
  let diffDays = 0
  let extraDays = 0
  const basePriceNum = parseInt(product.price.replace(/,/g, '')) || 0
  const extraPerDay = Math.round(basePriceNum * 0.10)
  let totalExtra = 0
  
  if (startDate && endDate) {
    const diffTime = endDate.getTime() - startDate.getTime()
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays > 5) {
      extraDays = diffDays - 5
      totalExtra = extraPerDay * extraDays
    }
  }
  
  const deliveryFee = wantsDelivery ? 2000 : 0
  const finalBill = basePriceNum + totalExtra + deliveryFee

  if (step === "success") {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white max-w-lg w-full rounded-3xl p-8 border border-gray-100 shadow-xl text-center flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-[#052E20] mb-2">Inquiry Sent!</h1>
          <p className="text-gray-500 font-medium mb-8">
            Your rental request for the <strong>{product.title}</strong> has been sent to {product.vendorName}. They will contact you shortly to confirm dates and arrange a fitting.
          </p>
          
          <Link 
            href={`/marketplace/${product.categorySlug}/${product.vendorId}`}
            className="w-full py-4 bg-[#052E20] hover:bg-black text-white font-bold rounded-xl text-sm tracking-wider uppercase transition-all"
          >
            Return to Vendor Profile
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Back Link */}
        <Link 
          href={`/marketplace/${product.categorySlug}/${product.vendorId}/product/${product.id}`} 
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#052E20] mb-8 transition-all hover:-translate-x-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Product
        </Link>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
          
          {/* Left Column: Order Summary */}
          <div className="lg:col-span-5 bg-gradient-to-b from-white to-[#FDFBF7] p-8 rounded-[2rem] border border-[#E8E1D5] shadow-xl shadow-[#052E20]/5 sticky top-24">
            <h2 className="text-xl font-black text-[#052E20] mb-8 pb-4 border-b border-[#E8E1D5]/50 font-serif tracking-wide">Your Inquiry Summary</h2>
            
            <div className="flex gap-5 mb-8 group">
              <div className="w-28 h-36 bg-gray-100 rounded-2xl overflow-hidden shrink-0 shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-500">
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1.5">{product.vendorName}</span>
                <h3 className="font-black text-2xl text-[#052E20] leading-tight mb-2 font-serif">{product.title}</h3>
                <div className="text-2xl font-black text-[#0F5B3E]">Rs. {basePriceNum.toLocaleString()}</div>
              </div>
            </div>

              {/* Event Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="group">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 group-hover:text-[#052E20] transition-colors">Event Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-[#052E20] transition-colors" />
                    <input 
                      type="date" 
                      name="eventDate"
                      required
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full pl-11 pr-3 py-3 bg-[#FDFBF7] border border-[#E8E1D5] rounded-xl text-sm font-bold text-[#052E20] focus:outline-none focus:border-[#0F5B3E] focus:ring-2 focus:ring-[#0F5B3E]/10 hover:border-[#0F5B3E]/50 transition-all shadow-sm"
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 group-hover:text-[#052E20] transition-colors">Return Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-[#052E20] transition-colors" />
                    <input 
                      type="date" 
                      name="returnDate"
                      required
                      value={formData.returnDate}
                      onChange={handleChange}
                      className="w-full pl-11 pr-3 py-3 bg-[#FDFBF7] border border-[#E8E1D5] rounded-xl text-sm font-bold text-[#052E20] focus:outline-none focus:border-[#0F5B3E] focus:ring-2 focus:ring-[#0F5B3E]/10 hover:border-[#0F5B3E]/50 transition-all shadow-sm"
                    />
                  </div>
                </div>
              </div>
              
              {/* Date Warnings */}
              {diffDays > 5 && (
                 <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-xs text-red-800 font-medium leading-relaxed mb-6">
                   <strong>⚠️ Extended Rental Notice:</strong> Your selected duration is {diffDays} days. Standard rentals are up to 5 days. You will be charged an estimated extra <strong>Rs. {extraPerDay.toLocaleString()} per day</strong> for the {extraDays} additional day(s). 
                 </div>
              )}
              {diffDays < 0 && (
                 <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-xs text-red-800 font-medium leading-relaxed mb-6">
                   <strong>⚠️ Invalid Dates:</strong> Return date cannot be earlier than the event date.
                 </div>
              )}

            <div className="bg-white rounded-2xl p-6 mb-8 border border-[#E8E1D5] shadow-sm">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-5 border-b border-gray-100 pb-3">Estimated Invoice Preview</h4>
              
              <div className="space-y-3 text-sm font-medium">
                <div className="flex justify-between text-gray-600">
                  <span>Base Rental (Up to 5 Days)</span>
                  <span>Rs. {basePriceNum.toLocaleString()}</span>
                </div>
                
                {extraDays > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Extended Rental ({extraDays} days)</span>
                    <span>+ Rs. {totalExtra.toLocaleString()}</span>
                  </div>
                )}

                {wantsDelivery && (
                  <div className="flex justify-between text-gray-600">
                    <span>Pick & Drop Service</span>
                    <span>+ Rs. {deliveryFee.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-[#0F5B3E]">
                  <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Dry Cleaning</span>
                  <span>Included</span>
                </div>
                
                <div className="flex justify-between text-[#0F5B3E]">
                  <span className="flex items-center gap-2"><Ruler className="w-4 h-4" /> Basic Alterations</span>
                  <span>Included</span>
                </div>
                
                <div className="flex justify-between text-gray-600 pt-3 border-t border-gray-200 mt-3">
                  <span className="flex items-center gap-2">Security Deposit <span className="text-[9px] bg-gray-200 px-1.5 py-0.5 rounded text-gray-600 uppercase tracking-wider font-bold">Refundable</span></span>
                  <span>Rs. 15,000</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end border-t border-gray-200 mt-4 pt-4">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Estimated Total Due</span>
                </div>
                <div className="text-2xl font-black text-[#052E20]">
                  Rs. {(finalBill + 15000).toLocaleString()}
                </div>
              </div>
              <div className="text-[10px] text-gray-400 mt-3 text-right">
                *Security deposit is refunded upon safe return.
              </div>
            </div>

            {/* Additional Services */}
            <div className="mb-6">
              <label className="flex items-start gap-4 p-5 border border-[#E8E1D5] rounded-2xl cursor-pointer hover:border-[#052E20]/50 hover:bg-[#FDFBF7] transition-all bg-white group shadow-sm">
                <div className="pt-0.5">
                  <input 
                    type="checkbox" 
                    checked={wantsDelivery} 
                    onChange={(e) => setWantsDelivery(e.target.checked)}
                    className="w-5 h-5 text-[#052E20] border-gray-300 rounded focus:ring-[#052E20]"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#052E20] group-hover:text-[#D4AF37] transition-colors">Home Pick & Drop Service (+ Rs. 2,000)</h4>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">We will safely deliver the dress to your doorstep and pick it up the day after your event.</p>
                </div>
              </label>
            </div>
            
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-xs text-blue-800 font-medium leading-relaxed mb-4">
              <strong>Note:</strong> You will only be charged after the vendor confirms availability and you finalize the rental agreement. No payment is required to submit this inquiry.
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-10 rounded-[2rem] border border-[#E8E1D5] shadow-xl shadow-[#052E20]/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            
            <h1 className="text-4xl font-black text-[#052E20] mb-3 font-serif relative z-10">Request to Rent</h1>
            <p className="text-gray-500 font-medium mb-10 text-lg relative z-10">Please provide your contact details and measurements.</p>

            <div className="space-y-8 relative z-10">

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 group">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 group-hover:text-[#052E20] transition-colors">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-[#052E20] transition-colors" />
                    <input 
                      type="text" 
                      name="name"
                      placeholder="e.g. Fatima Khan"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-[#FDFBF7] border border-[#E8E1D5] rounded-2xl text-sm font-bold text-[#052E20] focus:outline-none focus:border-[#0F5B3E] focus:ring-4 focus:ring-[#0F5B3E]/10 hover:border-[#0F5B3E]/50 transition-all shadow-sm"
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 group-hover:text-[#052E20] transition-colors">WhatsApp / Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-[#052E20] transition-colors" />
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="+92 300 1234567"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-[#FDFBF7] border border-[#E8E1D5] rounded-2xl text-sm font-bold text-[#052E20] focus:outline-none focus:border-[#0F5B3E] focus:ring-4 focus:ring-[#0F5B3E]/10 hover:border-[#0F5B3E]/50 transition-all shadow-sm"
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 group-hover:text-[#052E20] transition-colors">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-[#052E20] transition-colors" />
                    <input 
                      type="email" 
                      name="email"
                      placeholder="fatima@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-[#FDFBF7] border border-[#E8E1D5] rounded-2xl text-sm font-bold text-[#052E20] focus:outline-none focus:border-[#0F5B3E] focus:ring-4 focus:ring-[#0F5B3E]/10 hover:border-[#0F5B3E]/50 transition-all shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-[#E8E1D5] my-4" />

              {/* Sizing Details - Editable Grid */}
              <div className="bg-[#FDFBF7] border border-[#E8E1D5] rounded-3xl p-8 shadow-inner">
                <h3 className="text-lg font-black text-[#052E20] mb-6 flex items-center gap-3 font-serif">
                  <Ruler className="w-5 h-5 text-[#D4AF37]" /> Precision Sizing
                </h3>
                
                <div className="mb-8">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">1. Select Base Size</label>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map(s => (
                      <label 
                        key={s} 
                        className={`flex-1 min-w-[80px] cursor-pointer border-2 rounded-full text-center py-3 font-black text-sm transition-all duration-300 ${
                          formData.size === s 
                            ? 'border-[#052E20] bg-[#052E20] text-[#D4AF37] shadow-lg shadow-[#052E20]/20 scale-105' 
                            : 'border-[#E8E1D5] text-gray-400 hover:border-[#052E20]/30 hover:text-[#052E20] bg-white'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="size" 
                          value={s} 
                          checked={formData.size === s} 
                          onChange={handleChange} 
                          className="hidden" 
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">2. Fine-tune Measurements (Inches)</label>
                    <button 
                      type="button" 
                      onClick={() => setShowWizard(true)} 
                      className="text-[11px] font-bold text-[#052E20] hover:text-[#D4AF37] flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#E8E1D5] hover:border-[#D4AF37] transition-all"
                    >
                      <Ruler className="w-3.5 h-3.5" /> Visual Guide
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {Object.entries(MEASUREMENT_LABELS).map(([key, label]) => (
                      <div key={key} className="relative bg-white border border-[#E8E1D5] rounded-2xl focus-within:border-[#052E20] focus-within:ring-4 focus-within:ring-[#052E20]/10 transition-all overflow-hidden shadow-sm group">
                        <span className="absolute left-3 top-2.5 text-[8px] font-bold text-gray-400 uppercase tracking-wider select-none group-focus-within:text-[#052E20] transition-colors">{label}</span>
                        <input 
                          type="number"
                          step="0.5"
                          placeholder="0.0"
                          value={measurementsObj[key] || ""}
                          onChange={(e) => {
                            setMeasurementsObj(prev => ({ ...prev, [key]: e.target.value }))
                            if (formData.size !== "Custom Fit") {
                              setFormData(prev => ({ ...prev, size: "Custom Fit" }))
                            }
                          }}
                          className="w-full pt-7 pb-2.5 px-3 bg-transparent text-base font-black text-[#052E20] focus:outline-none"
                        />
                        <span className="absolute right-3 bottom-2.5 text-[10px] font-bold text-gray-300 pointer-events-none select-none">in</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <hr className="border-[#E8E1D5] my-4" />

              <div className="group">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 group-hover:text-[#052E20] transition-colors">Special Requests / Notes</label>
                <textarea 
                  name="notes"
                  rows={4}
                  placeholder="Any specific delivery instructions or alterations needed?"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full p-5 bg-[#FDFBF7] border border-[#E8E1D5] rounded-2xl text-sm font-bold text-[#052E20] focus:outline-none focus:border-[#0F5B3E] focus:ring-4 focus:ring-[#0F5B3E]/10 hover:border-[#0F5B3E]/50 transition-all resize-none shadow-sm"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-5 bg-gradient-to-r from-[#052E20] to-[#0A4730] hover:from-black hover:to-black disabled:from-gray-400 disabled:to-gray-500 text-[#D4AF37] disabled:text-gray-200 font-black rounded-2xl text-sm tracking-[0.2em] uppercase transition-all duration-500 shadow-xl shadow-[#052E20]/20 hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center gap-3 mt-6 group disabled:hover:translate-y-0 disabled:shadow-none"
              >
                {isSubmitting ? 'Sending Inquiry...' : 'Send Rental Inquiry'}
                {!isSubmitting && <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          </div>

        </form>
      </div>
      
      <AnimatePresence>
        {showWizard && (
          <MeasurementWizard 
            onClose={() => setShowWizard(false)}
            onComplete={(measurementsStr, rawValues) => {
              if (rawValues) {
                setMeasurementsObj(rawValues)
                if (formData.size !== "Custom Fit") {
                  setFormData(prev => ({ ...prev, size: "Custom Fit" }))
                }
              }
              setShowWizard(false)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
