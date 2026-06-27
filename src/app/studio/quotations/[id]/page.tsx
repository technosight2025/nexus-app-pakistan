"use client"

import { useState, use, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, CheckCircle2, Download, Edit, Eye, 
  FileText, Send, Check, Receipt, ChevronRight
} from "lucide-react"

import { getQuotation, updateQuotation, createInvoice } from "@/lib/mock-db"
import NexusChat from "@/components/NexusChat"

const DEFAULT_QUOTE = {
  id: "QT-0000", client: "Walk-in Client", event: "Event Coverage", date: "TBD", total: 100000, status: "Draft", items: [
    { name: "Custom Package", desc: "Detailed services to be defined", qty: 1, price: 100000 }
  ]
}

export default function QuotationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  // React 19 unwrapping of params
  const { id } = use(params)
  
  const [quotation, setQuotation] = useState<any>(DEFAULT_QUOTE)
  const [isGenerating, setIsGenerating] = useState(false)

  // Load from local storage
  useEffect(() => {
    const q = getQuotation(id)
    if (q) setQuotation(q)
    else setQuotation({ ...DEFAULT_QUOTE, id })
  }, [id])

  const handleApprove = () => {
    const updated = { ...quotation, status: "Approved" }
    setQuotation(updated)
    updateQuotation(id, { status: "Approved" })
  }

  const handleSendWhatsApp = () => {
    // Generate PIN if it doesn't have one
    const generatedPin = quotation.pin || Math.floor(1000 + Math.random() * 9000).toString();
    
    // Add action to history
    const history = quotation.actionHistory || [];
    const newAction = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      action: "Portal Generated",
      description: "Secure project portal access sent to client."
    };

    updateQuotation(id, { 
      status: "Sent", 
      pin: generatedPin,
      actionHistory: [...history, newAction]
    })
    
    setQuotation((prev: any) => ({ 
      ...prev, 
      status: "Sent", 
      pin: generatedPin,
      actionHistory: [...(prev.actionHistory || []), newAction]
    }))
    
    // Construct WhatsApp message
    const baseUrl = window.location.origin
    const portalUrl = `${baseUrl}/portal/project/${id}`
    const message = `Hi ${quotation.client},%0A%0AWe have generated your secure Project Portal.%0A%0AYou can review your quotation, track timelines, and chat with our team here:%0A${portalUrl}%0A%0A*Your Access PIN:* ${generatedPin}%0A%0AThank you,%0ACreative Studio`
    
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }

  const handleGenerateInvoice = () => {
    setIsGenerating(true)
    setTimeout(() => {
      // Update quotation status to Invoiced
      updateQuotation(id, { status: "Invoiced" })
      
      // Create invoice in shared state
      const invoiceId = createInvoice(quotation)
      
      router.push(`/studio/finances/invoices/${invoiceId}?source=${quotation.id}`)
    }, 800)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Invoiced": return "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border-purple-200 dark:border-purple-500/20"
      case "Approved": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20"
      case "Sent": return "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400 border-sky-200 dark:border-sky-500/20"
      default: return "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300 border-gray-200 dark:border-white/10"
    }
  }

  // Stepper logic
  const STEPS = ["Draft", "Sent", "Approved", "Invoiced"]
  const currentStepIndex = STEPS.indexOf(quotation.status) !== -1 ? STEPS.indexOf(quotation.status) : 0

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      {/* Header & Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.push("/studio/quotations")}
          className="flex items-center gap-2 text-[12px] font-bold text-[#6B7280] hover:text-[#111827] dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Quotations
        </button>
        <div className={`px-3 py-1 rounded-full text-[10px] font-black border ${getStatusColor(quotation.status)}`}>
          {quotation.status.toUpperCase()}
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-black text-[#111827] dark:text-white">{quotation.id}</h1>
          <p className="text-[12px] text-[#6B7280] mt-0.5">{quotation.client} • {quotation.event}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button className="p-2 text-[#6B7280] hover:text-[#111827] dark:hover:text-white hover:bg-[#F8FAFC] dark:hover:bg-white/5 rounded-xl transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button 
            onClick={() => router.push(`/studio/quotations/${id}/edit`)}
            disabled={quotation.status === "Invoiced"}
            className="p-2 text-[#6B7280] hover:text-[#111827] dark:hover:text-white hover:bg-[#F8FAFC] dark:hover:bg-white/5 rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#6B7280]"
            title={quotation.status === "Invoiced" ? "Invoiced quotations cannot be edited." : "Edit Quotation"}
          >
            <Edit className="w-4 h-4" />
          </button>
          
          {(quotation.status === "Draft" || quotation.status === "Sent") && (
            <>
              <button 
                onClick={handleSendWhatsApp}
                className="px-4 py-2 bg-[#25D366]/10 text-[#25D366] dark:bg-[#25D366]/20 dark:text-[#25D366] rounded-xl text-[11px] font-black flex items-center gap-2 hover:bg-[#25D366]/20 transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> Send via WhatsApp
              </button>
              <button 
                onClick={handleApprove}
                className="px-4 py-2 bg-[#22C55E] text-white rounded-xl text-[11px] font-black flex items-center gap-2 hover:bg-emerald-600 transition-colors shadow-sm"
              >
                <Check className="w-3.5 h-3.5" /> Mark as Approved
              </button>
            </>
          )}

          {quotation.status === "Approved" && (
            <button 
              onClick={handleGenerateInvoice}
              disabled={isGenerating}
              className="px-4 py-2 bg-[#4F46E5] text-white rounded-xl text-[11px] font-black flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Receipt className="w-3.5 h-3.5" /> Create Invoice
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Status Stepper */}
      <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-2xl p-6 shadow-sm overflow-x-auto">
        <div className="min-w-[400px]">
          <div className="flex items-center justify-between w-full relative z-0">
            {STEPS.map((step, index) => {
              const isCompleted = index < currentStepIndex
              const isActive = index === currentStepIndex
              
              return (
                <div key={step} className="flex flex-col items-center relative flex-1">
                  {/* Connecting Line */}
                  {index !== 0 && (
                    <div className={`absolute left-[-50%] right-[50%] top-4 h-1 -z-10 ${isCompleted || isActive ? 'bg-[#4F46E5]' : 'bg-[#E5E7EB] dark:bg-white/10'}`} />
                  )}
                  
                  {/* Circle Indicator */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] z-10 transition-colors ${
                    isActive ? 'bg-[#4F46E5] text-white ring-4 ring-indigo-50 dark:ring-indigo-500/20 shadow-md' : 
                    isCompleted ? 'bg-[#4F46E5] text-white' : 
                    'bg-[#F3F4F6] text-[#9CA3AF] dark:bg-white/5 dark:text-gray-500 border border-[#E5E7EB] dark:border-white/10'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  
                  {/* Step Label */}
                  <span className={`text-[10px] font-black uppercase tracking-widest mt-3 transition-colors ${
                    isActive ? 'text-[#4F46E5]' : 
                    isCompleted ? 'text-[#111827] dark:text-white' : 
                    'text-[#9CA3AF] dark:text-gray-500'
                  }`}>
                    {step}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Document View */}
      <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-8 md:p-12">
          {/* Doc Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="w-12 h-12 bg-[#4F46E5] text-white rounded-xl flex items-center justify-center font-black text-xl mb-4">NX</div>
              <div className="text-[14px] font-black text-[#111827] dark:text-white">Creative Studio</div>
              <div className="text-[10px] text-[#6B7280] mt-1">123 Studio Lane, Lahore<br/>hello@creativestudio.pk<br/>+92 300 1234567</div>
            </div>
            <div className="text-right">
              <div className="text-[24px] font-black text-[#E5E7EB] dark:text-white/10 uppercase tracking-widest">Quotation</div>
              <div className="text-[12px] font-bold text-[#111827] dark:text-white mt-2">{quotation.id}</div>
              <div className="text-[10px] text-[#6B7280] mt-1">Date: {quotation.date}</div>
            </div>
          </div>

          {/* Client Info */}
          <div className="mb-12 border-l-2 border-[#4F46E5] pl-4">
            <div className="text-[9px] font-black text-[#9CA3AF] uppercase tracking-widest mb-1">Quote For</div>
            <div className="text-[14px] font-black text-[#111827] dark:text-white">{quotation.client}</div>
            <div className="text-[11px] text-[#6B7280] mt-0.5">{quotation.event}</div>
          </div>

          {/* Line Items */}
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#E5E7EB] dark:border-white/10">
                  <th className="text-left py-3 text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">Description</th>
                  <th className="text-center py-3 text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest w-16">Qty</th>
                  <th className="text-right py-3 text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest w-24">Price</th>
                  <th className="text-right py-3 text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest w-24">Total</th>
                </tr>
              </thead>
              <tbody>
                {quotation.items.map((item: any, i: number) => (
                  <tr key={i} className="border-b border-[#F3F4F6] dark:border-white/5">
                    <td className="py-4">
                      <div className="text-[12px] font-bold text-[#111827] dark:text-white">{item.name}</div>
                      <div className="text-[10px] text-[#6B7280] mt-0.5">{item.desc}</div>
                    </td>
                    <td className="py-4 text-center text-[12px] font-bold text-[#111827] dark:text-white">{item.qty}</td>
                    <td className="py-4 text-right text-[12px] font-bold text-[#111827] dark:text-white">₨{item.price.toLocaleString()}</td>
                    <td className="py-4 text-right text-[12px] font-black text-[#111827] dark:text-white">₨{(item.price * item.qty).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-3">
              <div className="flex justify-between text-[11px] text-[#6B7280]">
                <span>Subtotal</span>
                <span>₨{(quotation.subtotal || quotation.items.reduce((s: number, i: any) => s + (i.price * i.qty), 0)).toLocaleString()}</span>
              </div>
              
              {quotation.discount > 0 && (
                <div className="flex justify-between text-[11px] text-[#22C55E] font-bold">
                  <span>Discount</span>
                  <span>- ₨{quotation.discount.toLocaleString()}</span>
                </div>
              )}
              
              {quotation.tax > 0 && (
                <div className="flex justify-between text-[11px] text-[#F59E0B] font-bold">
                  <span>Tax</span>
                  <span>+ ₨{quotation.tax.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-[14px] font-black text-[#111827] dark:text-white pt-3 border-t border-[#E5E7EB] dark:border-white/10">
                <span>Total</span>
                <span className="text-[#4F46E5]">₨{quotation.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Contract Details */}
          {(quotation.deliverables || quotation.paymentSteps || quotation.terms) && (
            <div className="mt-16 pt-12 border-t-2 border-[#E5E7EB] dark:border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8">
              {quotation.deliverables && (
                <div>
                  <h4 className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest mb-3">Expected Deliverables</h4>
                  <div className="text-[11px] text-[#6B7280] dark:text-gray-400 whitespace-pre-wrap leading-relaxed">
                    {quotation.deliverables}
                  </div>
                </div>
              )}
              {quotation.paymentSteps && (
                <div>
                  <h4 className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest mb-3">Payment Milestones</h4>
                  <div className="text-[11px] text-[#6B7280] dark:text-gray-400 whitespace-pre-wrap leading-relaxed">
                    {quotation.paymentSteps}
                  </div>
                </div>
              )}
              {quotation.terms && (
                <div>
                  <h4 className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest mb-3">Terms & Conditions</h4>
                  <div className="text-[11px] text-[#6B7280] dark:text-gray-400 whitespace-pre-wrap leading-relaxed">
                    {quotation.terms}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-[#F8FAFC] dark:bg-white/5 p-6 text-center text-[10px] text-[#9CA3AF]">
          This quotation is valid for 14 days from the date of issue.
        </div>
      </div>

      {/* Live Discussion Hub */}
      {(quotation.status === "Sent" || quotation.status === "Approved" || quotation.status === "Invoiced") && (
        <div className="mt-12">
          <h2 className="text-[18px] font-black text-[#111827] dark:text-white mb-6">Client Discussion</h2>
          <div className="h-[600px]">
            <NexusChat 
              bookingId={id} 
              senderType="studio_admin" 
              senderName="Creative Studio" 
            />
          </div>
        </div>
      )}
    </div>
  )
}
