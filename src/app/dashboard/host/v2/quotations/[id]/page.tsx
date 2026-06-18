"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2, PenTool, MessageCircle, XCircle, Sparkles, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const QUOTES = [
  {
    id: 1,
    vendorName: "Zubeda Mehndi Arts",
    service: "Full Bridal & 15 Relatives",
    price: "PKR 25,000",
    status: "Pending Approval",
    statusColor: "text-[#B45309] bg-[#FEF3C7]",
    image: "https://images.unsplash.com/photo-1596450514735-111a2fe02935?q=80&w=150",
    quoteNumber: "QT-2027-014",
    date: "10 Jun 2026",
    validUntil: "24 Jun 2026",
    address: "142 M.M. Alam Road, Gulberg III, Lahore",
    phone: "+92 300 1234567",
    email: "bookings@zubedamehndi.com",
    lineItems: [
      { description: "Bridal Mehndi (Hands to Elbows, Feet)", qty: 1, unit: "20,000", total: "20,000" },
      { description: "Relative Mehndi (Basic Design)", qty: 15, unit: "300", total: "4,500" },
      { description: "Travel Surcharge (DHA)", qty: 1, unit: "500", total: "500" }
    ],
    subtotal: "25,000",
    tax: "0",
    total: "25,000"
  },
  {
    id: 2,
    vendorName: "Indus Flavors",
    service: "Mughlai Fusion Menu",
    price: "PKR 2.5k/head",
    status: "Revised Quote",
    statusColor: "text-[#047857] bg-[#D1FAE5]",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=150",
    quoteNumber: "IF-26-892",
    date: "11 Jun 2026",
    validUntil: "25 Jun 2026",
    address: "Plot 12, Phase 5, DHA, Lahore",
    phone: "+92 321 7654321",
    email: "events@indusflavors.pk",
    lineItems: [
      { description: "Mughlai Fusion Menu per head", qty: 285, unit: "2,500", total: "712,500" },
      { description: "Premium Cutlery & Crockery", qty: 285, unit: "0 (Incl)", total: "0" },
      { description: "Live BBQ Station Setup", qty: 1, unit: "15,000", total: "15,000" }
    ],
    subtotal: "727,500",
    tax: "116,400",
    total: "843,900"
  }
]

export default function QuotationDetail() {
  const params = useParams()
  const router = useRouter()
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [activeModal, setActiveModal] = useState<"approve" | "negotiate" | "decline" | null>(null)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  
  const quoteId = params.id as string
  const [quotes, setQuotes] = useState(QUOTES)
  const selectedQuote = quotes.find(q => q.quoteNumber === quoteId) || quotes[0]

  useEffect(() => {
    const saved = localStorage.getItem('nexus_host_quotes')
    if (saved) {
      setQuotes(JSON.parse(saved))
    }

    // Trigger AI Assistant after document opens
    const timer = setTimeout(() => setShowAIAssistant(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  const aiSuggestion = selectedQuote.quoteNumber === "QT-2027-014" 
    ? {
        text: "I noticed a Travel Surcharge of PKR 500. Since the event is local, you might want to negotiate this out.",
        actionLabel: "Draft Negotiation",
        action: () => setActiveModal("negotiate")
      }
    : {
        text: "This quote aligns perfectly with your target budget of PKR 2.5k/head. I recommend approving this before their calendar fills up.",
        actionLabel: "Review & Sign",
        action: () => setActiveModal("approve")
      }

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleQuoteAction = (action: string, vendor: string, newStatus: string, newColor: string) => {
    showToast(`${action} sent to ${vendor}`)
    
    // Update local storage
    const updatedQuotes = quotes.map(q => 
      q.quoteNumber === selectedQuote.quoteNumber 
        ? { ...q, status: newStatus, statusColor: newColor } 
        : q
    )
    setQuotes(updatedQuotes)
    localStorage.setItem('nexus_host_quotes', JSON.stringify(updatedQuotes))

    setTimeout(() => {
      router.push("/dashboard/host/v2")
    }, 1500)
  }

  if (!selectedQuote) return null

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] md:h-screen bg-[#EFEBE4]">
      
      {/* 🌟 Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-8 left-1/2 z-[100] bg-[#0A3B2A] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-bold text-sm"
          >
            <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌟 Action Modals */}
      <AnimatePresence>
        {activeModal === "approve" && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <PenTool className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Digital Signature</h3>
              </div>
              <p className="text-sm text-slate-500 mb-6 ml-13">By signing, you agree to the terms and authorize the advance payment.</p>
              
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-dashed border-slate-300 mb-6">
                <input 
                  type="text" 
                  placeholder="Type your full name to sign..." 
                  className="w-full bg-transparent border-b-2 border-slate-300 focus:border-[#0A3B2A] outline-none px-2 py-3 text-slate-900 text-2xl font-medium placeholder:text-xl font-serif text-center" 
                />
              </div>

              <div className="flex justify-end gap-3">
                <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
                <button onClick={() => { setActiveModal(null); handleQuoteAction("Contract Approved & Signed", selectedQuote.vendorName, "Approved", "text-[#047857] bg-[#D1FAE5]") }} className="px-6 py-2 bg-[#0A3B2A] hover:bg-[#0A3B2A]/90 text-white font-bold rounded-xl transition-colors">Approve & Sign</button>
              </div>
            </motion.div>
          </div>
        )}

        {activeModal === "negotiate" && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Negotiate Quote</h3>
              </div>
              <p className="text-sm text-slate-500 mb-4 ml-13">Send a message to {selectedQuote.vendorName} to request changes to pricing or line items.</p>
              <textarea rows={4} placeholder="E.g. Can we remove the travel surcharge?" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium mb-6 resize-none focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100" />
              <div className="flex justify-end gap-3">
                <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
                <button onClick={() => { setActiveModal(null); handleQuoteAction("Negotiation request", selectedQuote.vendorName, "In Negotiation", "text-blue-700 bg-blue-100") }} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">Send Message</button>
              </div>
            </motion.div>
          </div>
        )}

        {activeModal === "decline" && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Decline Quotation</h3>
              </div>
              <p className="text-sm text-slate-500 mb-4 ml-13">Are you sure you want to decline this quote from {selectedQuote.vendorName}?</p>
              <textarea rows={2} placeholder="Optional: Leave a feedback note for the vendor..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium mb-6 resize-none focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100" />
              <div className="flex justify-end gap-3">
                <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
                <button onClick={() => { setActiveModal(null); handleQuoteAction("Quotation Declined", selectedQuote.vendorName, "Declined", "text-red-700 bg-red-100") }} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors">Decline Quote</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🌟 Nexus AI Assistant Suggestion */}
      <AnimatePresence>
        {showAIAssistant && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 z-[100] w-[340px] bg-white rounded-2xl shadow-2xl border border-indigo-100 overflow-hidden"
          >
            <div className="bg-indigo-600 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="w-4 h-4" />
                <span className="font-bold text-sm">Nexus AI Assistant</span>
              </div>
              <button onClick={() => setShowAIAssistant(false)} className="text-indigo-200 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 border-t-4 border-[#EFEBE4]">
              <p className="text-sm text-slate-700 leading-relaxed font-medium mb-4">
                {aiSuggestion.text}
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => { setShowAIAssistant(false); aiSuggestion.action() }}
                  className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold py-2.5 rounded-xl transition-colors text-xs"
                >
                  {aiSuggestion.actionLabel}
                </button>
                <button 
                  onClick={() => setShowAIAssistant(false)}
                  className="px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-2.5 rounded-xl transition-colors text-xs"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between gap-4 shrink-0 shadow-sm z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-bold text-slate-900 hidden md:block">Quotation Overview</h2>
            <p className="text-xs text-slate-500 hidden md:block">{selectedQuote.vendorName} • {selectedQuote.quoteNumber}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3 justify-end">
          <button 
            onClick={() => setActiveModal("decline")}
            className="px-4 py-2.5 md:px-5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-colors text-[13px] md:text-sm shadow-sm"
          >
            Decline
          </button>
          <button 
            onClick={() => setActiveModal("negotiate")}
            className="px-4 py-2.5 md:px-5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-colors text-[13px] md:text-sm shadow-sm"
          >
            Negotiate <span className="hidden md:inline">(Message)</span>
          </button>
          <button 
            onClick={() => setActiveModal("approve")}
            className="px-5 py-2.5 md:px-6 bg-[#0A3B2A] hover:bg-[#0A3B2A]/90 text-white font-bold rounded-xl transition-colors text-[13px] md:text-sm shadow-md flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 hidden sm:block" /> Approved <span className="hidden md:inline">(Signature)</span>
          </button>
        </div>
      </div>

      {/* Paper Document Container (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-10 flex justify-center w-full pb-24">
        <div className="bg-white w-full max-w-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-200 p-8 md:p-14 relative my-auto">
          
          {/* Watermark Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
            <img src={selectedQuote.image} className="w-[500px] h-[500px] object-cover rounded-full grayscale" alt="watermark" />
          </div>

          {/* Letterhead Header */}
          <div className="flex flex-col md:flex-row justify-between items-start border-b-4 border-slate-800 pb-8 mb-10 relative z-10 gap-6">
            <div className="flex gap-6 items-center">
              <img src={selectedQuote.image} alt="Logo" className="w-24 h-24 rounded-full object-cover border-2 border-slate-100 shadow-sm" />
              <div>
                <h2 className="text-[28px] md:text-[36px] font-black font-poppins text-slate-900 tracking-tight leading-none mb-2">{selectedQuote.vendorName}</h2>
                <p className="text-[13px] text-slate-500 font-medium">{selectedQuote.address}</p>
                <p className="text-[13px] text-slate-500 font-medium">{selectedQuote.phone} <span className="mx-2 text-slate-300">•</span> {selectedQuote.email}</p>
              </div>
            </div>
            <div className="w-full md:w-auto bg-slate-50 md:bg-transparent p-5 md:p-0 rounded-xl">
              <h1 className="text-3xl font-black text-slate-300 uppercase tracking-widest mb-3 md:mb-4 md:text-right">Quotation</h1>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[12px] text-slate-600 md:text-right">
                <span className="font-bold text-slate-400 uppercase tracking-widest">Quote No:</span> <span className="font-bold text-slate-800">{selectedQuote.quoteNumber}</span>
                <span className="font-bold text-slate-400 uppercase tracking-widest">Date:</span> <span className="font-medium">{selectedQuote.date}</span>
                <span className="font-bold text-slate-400 uppercase tracking-widest">Valid Until:</span> <span className="font-medium">{selectedQuote.validUntil}</span>
              </div>
            </div>
          </div>

          {/* Client Details */}
          <div className="mb-12 relative z-10 flex flex-col md:flex-row gap-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="flex-1">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-200 pb-2">Prepared For:</h3>
              <p className="font-bold text-slate-900 text-[16px] mt-3">Assalam-o-Alaikum, Zoya</p>
              <p className="text-[14px] text-slate-600 font-medium mt-1">Malik-Khan Wedding</p>
            </div>
            <div className="flex-1">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-200 pb-2">Event Overview:</h3>
              <div className="mt-3 space-y-2">
                <p className="text-[14px] text-slate-600 font-medium"><span className="font-bold text-slate-800 w-20 inline-block">Date:</span> 14 Days from today</p>
                <p className="text-[14px] text-slate-600 font-medium"><span className="font-bold text-slate-800 w-20 inline-block">Guests:</span> 285 Confirmed</p>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="mb-12 relative z-10 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#FAF8F5] text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px]">Description</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-center w-20">Qty</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-right w-32">Unit (PKR)</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-right w-40">Total (PKR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedQuote.lineItems.map((item: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-5 px-6 text-slate-800 font-medium">{item.description}</td>
                    <td className="py-5 px-6 text-center text-slate-600">{item.qty}</td>
                    <td className="py-5 px-6 text-right text-slate-600">{item.unit}</td>
                    <td className="py-5 px-6 text-right font-bold text-slate-800">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end relative z-10 mb-16">
            <div className="w-full md:w-80 space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
              <div className="flex justify-between text-[14px] text-slate-600 font-medium">
                <span>Subtotal:</span>
                <span>{selectedQuote.subtotal}</span>
              </div>
              <div className="flex justify-between text-[14px] text-slate-600 font-medium pb-4 border-b border-slate-200">
                <span>Tax (GST):</span>
                <span>{selectedQuote.tax}</span>
              </div>
              <div className="flex justify-between text-2xl font-black font-poppins text-[#0A3B2A] pt-2">
                <span>Grand Total:</span>
                <span>{selectedQuote.total}</span>
              </div>
            </div>
          </div>

          {/* Terms & Footer */}
          <div className="pt-8 border-t-2 border-slate-100 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div className="max-w-md">
              <p className="text-[12px] font-bold text-slate-800 uppercase tracking-widest mb-3">Terms & Conditions:</p>
              <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
                1. 50% advance payment required to confirm the booking.<br/>
                2. Quotation is valid for 14 days from the date of issue.<br/>
                3. Cancellation within 7 days of the event will result in forfeiture of advance.
              </p>
            </div>
            <div className="text-center w-full md:w-auto mt-8 md:mt-0">
              <div className="w-full md:w-48 h-px bg-slate-300 mb-3"></div>
              <p className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">Authorized Signatory</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
