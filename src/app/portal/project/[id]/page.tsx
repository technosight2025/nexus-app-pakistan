"use client"

import { useState, use, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getQuotation, updateQuotation } from "@/lib/mock-db"
import { Check, MessageSquare, Download, Calendar, MapPin, Loader2, Lock, Unlock, Clock, FileText, ChevronRight, ShieldAlert, UserPlus } from "lucide-react"
import Confetti from "react-confetti"
import NexusChat from "@/components/NexusChat"

export default function SecureProjectPortal({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  
  const [quotation, setQuotation] = useState<any>(null)
  
  // Security State
  const [isLocked, setIsLocked] = useState(true)
  const [pinEntry, setPinEntry] = useState("")
  const [pinError, setPinError] = useState(false)
  const [isGuest, setIsGuest] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  
  // Dashboard State
  const [activeTab, setActiveTab] = useState<"quotation" | "timeline" | "chat">("quotation")
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

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For test quotations without PINs, allow "0000" or just bypass if null
    if (quotation.pin === pinEntry || (quotation.pin === null && pinEntry === "0000")) {
      setIsLocked(false)
      setPinError(false)
      
      // Log client view if not already approved
      if (quotation.status !== "Approved") {
        const history = quotation.actionHistory || [];
        const newAction = {
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          action: "Client Viewed Portal",
          description: "Client accessed the secure project portal."
        };
        updateQuotation(id, { actionHistory: [...history, newAction] });
        setQuotation((prev: any) => ({ ...prev, actionHistory: [...(prev.actionHistory || []), newAction] }));
      }
    } else {
      setPinError(true)
      setTimeout(() => setPinError(false), 2000)
    }
  }

  const handleAccept = () => {
    if (isGuest) {
      setShowAuthModal(true)
      return
    }

    setIsAccepting(true)
    setTimeout(() => {
      const history = quotation.actionHistory || [];
      const newAction = {
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        action: "Quotation Approved",
        description: "Client approved the quotation & terms."
      };
      
      updateQuotation(id, { status: "Approved", actionHistory: [...history, newAction] })
      setQuotation({ ...quotation, status: "Approved", actionHistory: [...history, newAction] })
      setShowConfetti(true)
      setIsAccepting(false)
    }, 1000)
  }

  const handleNegotiate = () => {
    setActiveTab("chat")
  }

  // --- LOCKED STATE ---
  if (isLocked) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl shadow-black/5 border border-[#E5E7EB] text-center">
          <div className="w-16 h-16 bg-[#F3F4F6] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-[#4F46E5]" />
          </div>
          <h1 className="text-2xl font-black text-[#111827] mb-2">Secure Portal Access</h1>
          <p className="text-sm text-[#6B7280] mb-8">
            Please enter the 4-digit PIN sent to you by Creative Studio to access project {id}.
          </p>
          
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input 
                type="text" 
                maxLength={4}
                value={pinEntry}
                onChange={(e) => setPinEntry(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                className={`w-full text-center tracking-[1em] text-2xl font-black rounded-2xl p-4 border focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 ${pinError ? 'border-red-500 bg-red-50 text-red-900' : 'border-[#E5E7EB] bg-[#F8FAFC]'}`}
                autoFocus
              />
              {pinError && <p className="text-red-500 text-xs font-bold mt-2">Incorrect PIN. Please try again.</p>}
            </div>
            <button 
              type="submit" 
              disabled={pinEntry.length < 4}
              className="w-full py-4 bg-[#111827] text-white rounded-2xl text-sm font-black hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" /> Unlock Project
            </button>
          </form>
        </div>
      </div>
    )
  }

  // --- UNLOCKED STATE ---
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />}
      
      {/* Dashboard Header */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40">
        {/* Security Banner */}
        {isGuest && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 sm:px-6">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-1.5 rounded-lg shrink-0">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-xs sm:text-sm text-amber-800 font-medium">
                  <span className="font-bold">Guest Mode:</span> Register or Log In to permanently secure your project data, timeline, and chat history.
                </p>
              </div>
              <div className="shrink-0 flex gap-2">
                <button onClick={() => router.push('/sign-in')} className="text-xs font-bold text-amber-700 hover:text-amber-900 transition-colors px-2 py-1">Log In</button>
                <button onClick={() => router.push('/sign-up')} className="text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition-colors px-3 py-1.5 rounded-lg shadow-sm">Register</button>
              </div>
            </div>
          </div>
        )}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#4F46E5] text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-500/20">NX</div>
              <div>
                <h1 className="text-xl font-black text-[#111827]">{quotation.client}</h1>
                <p className="text-sm text-[#6B7280]">Project: {quotation.event} • Ref: {id}</p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest self-start md:self-auto ${
              quotation.status === "Approved" || quotation.status === "Invoiced" 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {quotation.status}
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex gap-6 overflow-x-auto no-scrollbar border-t border-[#F3F4F6]">
            {[
              { id: "quotation", label: "Quotation & Contract", icon: FileText },
              { id: "timeline", label: "Project Timeline", icon: Clock },
              { id: "chat", label: "Live Discussion", icon: MessageSquare }
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                    isActive ? 'border-[#4F46E5] text-[#4F46E5]' : 'border-transparent text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        
        {/* --- TAB: QUOTATION --- */}
        {activeTab === "quotation" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            {quotation.status === "Approved" && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/30">
                  <Check className="w-6 h-6" />
                </div>
                <h2 className="text-[18px] font-black text-emerald-900">Quotation Approved!</h2>
                <p className="text-[13px] text-emerald-700 mt-1">Thank you! We will generate your invoice and contact you shortly with the next steps.</p>
              </div>
            )}

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
            {quotation.status !== "Approved" && quotation.status !== "Invoiced" && (
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
                  <MessageSquare className="w-5 h-5 text-[#9CA3AF]" /> Discuss / Request Changes
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- TAB: TIMELINE --- */}
        {activeTab === "timeline" && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 border border-[#E5E7EB]">
              <h3 className="text-lg font-black text-[#111827] mb-8">Project Timeline</h3>
              <div className="relative border-l-2 border-[#F3F4F6] ml-4 space-y-8">
                {quotation.actionHistory?.map((action: any, i: number) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute w-4 h-4 bg-[#4F46E5] rounded-full -left-[9px] top-1 border-4 border-white"></div>
                    <div className="text-xs font-bold text-[#4F46E5] mb-1">{action.date}</div>
                    <div className="text-sm font-black text-[#111827]">{action.action}</div>
                    <div className="text-sm text-[#6B7280] mt-1">{action.description}</div>
                  </div>
                ))}
                {!quotation.actionHistory?.length && (
                  <div className="text-sm text-[#6B7280] italic">No history recorded yet.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: CHAT --- */}
        {activeTab === "chat" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 h-[600px] flex">
            {/* Wrapper to allow NexusChat to take full height */}
            <div className="w-full h-full bg-white rounded-3xl shadow-xl shadow-black/5 border border-[#E5E7EB] overflow-hidden">
               <NexusChat bookingId={id} senderType="host" senderName={quotation.client} />
            </div>
          </div>
        )}

      </div>

      {/* Auth Gate Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-[#E5E7EB] animate-in zoom-in-95">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-center text-[#111827] mb-2">Secure Your Contract</h2>
            <p className="text-center text-[#6B7280] text-sm mb-8">
              To legally sign this quotation and protect your project data, please create an account or log in.
            </p>
            
            <div className="space-y-3">
              <button 
                onClick={() => router.push('/sign-up')}
                className="w-full py-4 bg-[#4F46E5] text-white rounded-2xl text-sm font-black hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
              >
                <UserPlus className="w-5 h-5" /> Create Client Account
              </button>
              <button 
                onClick={() => router.push('/sign-in')}
                className="w-full py-4 bg-[#F8FAFC] text-[#374151] rounded-2xl text-sm font-black hover:bg-gray-100 transition-colors border border-[#E5E7EB]"
              >
                Already have an account? Log In
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => setShowAuthModal(false)}
                className="text-xs font-bold text-[#9CA3AF] hover:text-[#6B7280]"
              >
                Cancel and return to quotation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
