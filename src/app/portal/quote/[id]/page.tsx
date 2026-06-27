"use client"

import { useState, use, useEffect } from "react"
import { getQuotation, updateQuotation } from "@/lib/mock-db"
import { Check, MessageSquare, Download, Calendar, MapPin, Receipt, Loader2 } from "lucide-react"
import Confetti from "react-confetti"

export default function ClientQuotationPortal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  const [quotation, setQuotation] = useState<any>(null)
  const [isAccepting, setIsAccepting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    const q = getQuotation(id)
    if (q) setQuotation(q)
  }, [id])

  if (!quotation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="w-8 h-8 animate-spin text-[#4F46E5]" />
      </div>
    )
  }

  const handleAccept = () => {
    setIsAccepting(true)
    setTimeout(() => {
      updateQuotation(id, { status: "Approved" })
      setQuotation({ ...quotation, status: "Approved" })
      setShowConfetti(true)
      setIsAccepting(false)
    }, 1000)
  }

  const handleNegotiate = () => {
    const message = `Hi Creative Studio, I am reviewing quotation ${quotation.id} and I would like to request some changes: `
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:py-12">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />}
      
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#4F46E5] text-white rounded-2xl flex items-center justify-center font-black text-2xl mx-auto mb-4 shadow-xl shadow-indigo-500/20">NX</div>
          <h1 className="text-[24px] font-black text-[#111827]">Creative Studio</h1>
          <p className="text-[14px] text-[#6B7280]">Quotation for {quotation.event}</p>
        </div>

        {quotation.status === "Approved" && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center animate-in fade-in slide-in-from-bottom-4">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/30">
              <Check className="w-6 h-6" />
            </div>
            <h2 className="text-[18px] font-black text-emerald-900">Quotation Approved!</h2>
            <p className="text-[13px] text-emerald-700 mt-1">Thank you! We will generate your invoice and contact you shortly with the next steps.</p>
          </div>
        )}

        {/* Quotation Document */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 border border-[#E5E7EB]">
          
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-[#F3F4F6] pb-8 mb-8">
            <div>
              <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest mb-1">Prepared For</div>
              <div className="text-[18px] font-black text-[#111827]">{quotation.client}</div>
              <div className="flex items-center gap-4 mt-3">
                <span className="flex items-center gap-1.5 text-[12px] font-bold text-[#6B7280] bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-[#E5E7EB]">
                  <Calendar className="w-3.5 h-3.5" /> {quotation.date}
                </span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest mb-1">Quote Reference</div>
              <div className="text-[18px] font-black text-[#4F46E5]">{quotation.id}</div>
              <button className="flex items-center gap-1.5 text-[12px] font-bold text-[#6B7280] hover:text-[#111827] mt-3 sm:ml-auto">
                <Download className="w-3.5 h-3.5" /> Download PDF
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[14px] font-black text-[#111827] mb-4">Investment Summary</h3>
            {quotation.items.map((item: any, i: number) => (
              <div key={i} className="flex flex-col sm:flex-row justify-between p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] gap-4">
                <div>
                  <div className="text-[14px] font-black text-[#111827]">{item.name}</div>
                  <div className="text-[12px] text-[#6B7280] mt-1">{item.desc}</div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-[14px] font-black text-[#111827]">₨{(item.price * item.qty).toLocaleString()}</div>
                  {item.qty > 1 && <div className="text-[10px] text-[#9CA3AF] mt-0.5">Qty: {item.qty}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-[#F3F4F6] pt-6 flex justify-end">
            <div className="w-full sm:w-64 space-y-3">
              <div className="flex justify-between text-[13px] text-[#6B7280]">
                <span>Subtotal</span>
                <span>₨{(quotation.subtotal || quotation.items.reduce((s: number, i: any) => s + (i.price * i.qty), 0)).toLocaleString()}</span>
              </div>
              
              {quotation.discount > 0 && (
                <div className="flex justify-between text-[13px] text-[#22C55E] font-bold">
                  <span>Discount</span>
                  <span>- ₨{quotation.discount.toLocaleString()}</span>
                </div>
              )}
              
              {quotation.tax > 0 && (
                <div className="flex justify-between text-[13px] text-[#F59E0B] font-bold">
                  <span>Tax</span>
                  <span>+ ₨{quotation.tax.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-[16px] font-black text-[#111827] bg-indigo-50 p-4 rounded-xl text-indigo-900 border border-indigo-100 mt-2">
                <span>Total Investment</span>
                <span>₨{quotation.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          {/* Contract Details */}
          {(quotation.deliverables || quotation.paymentSteps || quotation.terms) && (
            <div className="mt-12 pt-10 border-t border-[#F3F4F6] grid grid-cols-1 md:grid-cols-3 gap-6">
              {quotation.deliverables && (
                <div>
                  <h4 className="text-[11px] font-black text-[#9CA3AF] uppercase tracking-widest mb-3">Expected Deliverables</h4>
                  <div className="text-[13px] text-[#4B5563] whitespace-pre-wrap leading-relaxed">
                    {quotation.deliverables}
                  </div>
                </div>
              )}
              {quotation.paymentSteps && (
                <div>
                  <h4 className="text-[11px] font-black text-[#9CA3AF] uppercase tracking-widest mb-3">Payment Milestones</h4>
                  <div className="text-[13px] text-[#4B5563] whitespace-pre-wrap leading-relaxed">
                    {quotation.paymentSteps}
                  </div>
                </div>
              )}
              {quotation.terms && (
                <div>
                  <h4 className="text-[11px] font-black text-[#9CA3AF] uppercase tracking-widest mb-3">Terms & Conditions</h4>
                  <div className="text-[13px] text-[#4B5563] whitespace-pre-wrap leading-relaxed">
                    {quotation.terms}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Panel */}
        {quotation.status !== "Approved" && (
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/5 border border-[#E5E7EB] flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleAccept}
              disabled={isAccepting}
              className="flex-1 px-6 py-4 bg-[#4F46E5] text-white rounded-2xl text-[14px] font-black flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
            >
              {isAccepting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
              {isAccepting ? "Approving..." : "Accept & Proceed"}
            </button>
            <button 
              onClick={handleNegotiate}
              className="flex-1 px-6 py-4 bg-[#F8FAFC] text-[#374151] rounded-2xl text-[14px] font-black flex items-center justify-center gap-2 hover:bg-gray-100 transition-all border border-[#E5E7EB]"
            >
              <MessageSquare className="w-5 h-5 text-[#9CA3AF]" /> Request Changes
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
