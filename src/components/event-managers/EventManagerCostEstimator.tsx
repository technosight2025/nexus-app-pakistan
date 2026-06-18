"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sliders, Clipboard, HelpCircle, X, CheckCircle, Sparkles } from "lucide-react"

export function EventManagerCostEstimator() {
  const [guestScale, setGuestScale] = useState("medium")
  const [eventType, setEventType] = useState("wedding")
  
  const [decorDesign, setDecorDesign] = useState(true)
  const [vendorMatch, setVendorMatch] = useState(true)
  const [rsvpControl, setRsvpControl] = useState(false)
  const [liveCoordination, setLiveCoordination] = useState(false)

  const [estFee, setEstFee] = useState(0)
  const [managersDispatched, setManagersDispatched] = useState(1)
  
  const [isReserving, setIsReserving] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    let base = 60000 // base planning fee
    
    // Scale multiplier
    let scaleMultiplier = 1.0
    let staffCount = 1
    
    if (guestScale === "small") {
      scaleMultiplier = 0.8
      staffCount = 1
    } else if (guestScale === "medium") {
      scaleMultiplier = 1.2
      staffCount = 2
    } else if (guestScale === "large") {
      scaleMultiplier = 1.8
      staffCount = 4
    } else if (guestScale === "massive") {
      scaleMultiplier = 2.5
      staffCount = 6
    }
    
    // Event type modifier
    let typeModifier = 1.0
    if (eventType === "corporate") typeModifier = 1.3
    if (eventType === "wedding") typeModifier = 1.2
    if (eventType === "party") typeModifier = 0.8

    let calc = base * scaleMultiplier * typeModifier

    // Module additions
    if (decorDesign) calc += 40000
    if (vendorMatch) calc += 30000
    if (rsvpControl) calc += 25000
    if (liveCoordination) {
      calc += 40000
      staffCount += 1 // extra on-site runner
    }

    setEstFee(calc)
    setManagersDispatched(staffCount)
  }, [guestScale, eventType, decorDesign, vendorMatch, rsvpControl, liveCoordination])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setIsReserving(false)
      setFormSubmitted(false)
      setName("")
      setEmail("")
      setPhone("")
      setDate("")
    }, 2500)
  }

  return (
    <section className="py-16 bg-white border-b border-outline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-3">
            <Sliders className="w-4 h-4" /> Planning Tool
          </div>
          <h2 className="text-3xl font-black text-foreground tracking-tight mb-2">
            Event Management Fee Estimator
          </h2>
          <p className="text-muted-foreground font-medium">
            Build your operational package, scale guest count, and view recommended onsite manager count.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Guest Scale */}
            <div className="bg-slate-50 border border-outline rounded-2xl p-5">
              <label className="text-sm font-black text-foreground block mb-3">1. Event Scale (Guest Count)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "small", label: "Under 150 guests" },
                  { id: "medium", label: "150 - 400 guests" },
                  { id: "large", label: "400 - 800 guests" },
                  { id: "massive", label: "800+ guests" }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGuestScale(item.id)}
                    className={`py-3 px-2 rounded-xl border font-bold text-xs transition-all ${
                      guestScale === item.id
                        ? "border-primary bg-primary text-white"
                        : "border-outline bg-white hover:bg-slate-50 text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Event Type */}
            <div className="bg-slate-50 border border-outline rounded-2xl p-5">
              <label className="text-sm font-black text-foreground block mb-3">2. Choose Event Type</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "wedding", label: "Wedding / Shadi" },
                  { id: "corporate", label: "Corporate Event" },
                  { id: "party", label: "Private Dinner / Party" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setEventType(item.id)}
                    className={`py-3 px-2 rounded-xl border font-bold text-xs transition-all ${
                      eventType === item.id
                        ? "border-primary bg-primary text-white"
                        : "border-outline bg-white hover:bg-slate-50 text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Planning Modules */}
            <div className="bg-slate-50 border border-outline rounded-2xl p-5">
              <label className="text-sm font-black text-foreground block mb-3">3. Management Services Needed</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 bg-white border border-outline rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={decorDesign}
                    onChange={(e) => setDecorDesign(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <div>
                    <span className="text-xs font-bold text-foreground block">3D Mood Boards & Stage Theme Design (+Rs: 40k)</span>
                    <span className="text-[10px] font-medium text-muted-foreground">We layout digital renders of pathways, stage lighting, and floral scales.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-white border border-outline rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={vendorMatch}
                    onChange={(e) => setVendorMatch(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <div>
                    <span className="text-xs font-bold text-foreground block">Vendor Negotiation & Matching (+Rs: 30k)</span>
                    <span className="text-[10px] font-medium text-muted-foreground">Contracting food caterers, sound system crews, and photographers.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-white border border-outline rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={rsvpControl}
                    onChange={(e) => setRsvpControl(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <div>
                    <span className="text-xs font-bold text-foreground block">Digital RSVP Tracking & Welcome Desk (+Rs: 25k)</span>
                    <span className="text-[10px] font-medium text-muted-foreground">Coordination team calls guests, generates QR check-ins, and manages reception.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-white border border-outline rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={liveCoordination}
                    onChange={(e) => setLiveCoordination(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <div>
                    <span className="text-xs font-bold text-foreground block">Live Runsheet & Backstage Coordination (+Rs: 40k)</span>
                    <span className="text-[10px] font-medium text-muted-foreground">Enforces wedding timeline cue times, coordination of bridal walk entries, and food timing.</span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Cost Breakdown & Action (5 cols) */}
          <div className="lg:col-span-5 bg-card rounded-3xl border border-outline p-6 lg:p-8 flex flex-col justify-between h-full min-h-[420px]">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Estimated Management Fee</span>
              <div className="font-black text-primary text-4xl mb-6">
                PKR {estFee.toLocaleString()}
              </div>

              <div className="space-y-4 pt-4 border-t border-outline">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Operational Dispatch Details</span>
                <div className="space-y-2.5 text-xs font-semibold text-foreground">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Event Profile:</span>
                    <span className="capitalize">{eventType} Planning</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Coordinators Dispatched:</span>
                    <span>{managersDispatched} On-Site {managersDispatched === 1 ? "Manager" : "Managers"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Planning Phase:</span>
                    <span>Starts 4 weeks before event day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RSVP Tracking:</span>
                    <span>{rsvpControl ? "Included (Active Call list)" : "Excluded"}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsReserving(true)}
              className="mt-8 w-full bg-primary hover:bg-primary/95 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-none flex items-center justify-center gap-2"
            >
              <Clipboard className="w-4 h-4" /> Request Concept Pitch
            </button>
          </div>

        </div>
      </div>

      {/* Modal Application Form */}
      <AnimatePresence>
        {isReserving && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-outline w-full max-w-lg p-6 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            >
              <button
                onClick={() => setIsReserving(false)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors border border-outline bg-slate-50"
              >
                <X className="w-4 h-4" />
              </button>

              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="w-16 h-16 text-primary mb-4 animate-bounce" />
                  <h3 className="text-xl font-black text-foreground mb-2">Proposal Requested!</h3>
                  <p className="text-sm font-medium text-muted-foreground max-w-xs">
                    Your concept pitch request has been registered. Proposal reference: <strong>PRP-EV-9284</strong>. Our directors will call you in 12 hours.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-primary">
                    <Sparkles className="w-4 h-4" /> Routing criteria to local planners...
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">
                      Request Concept Pitch & Renders
                    </span>
                    <h3 className="font-bold text-lg text-foreground leading-tight">
                      Custom Planning Proposal
                    </h3>
                    <p className="text-xs text-muted-foreground font-semibold mt-1">
                      Estimated Fee: PKR {estFee.toLocaleString()} • {managersDispatched} onsite staff
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">Contact Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Umar Khalid"
                        className="w-full px-3 py-2 border border-outline rounded-xl text-sm font-medium focus:ring-1 focus:ring-primary outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-foreground block mb-1">Email</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="umar@gmail.com"
                          className="w-full px-3 py-2 border border-outline rounded-xl text-sm font-medium focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-foreground block mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0300-1234567"
                          className="w-full px-3 py-2 border border-outline rounded-xl text-sm font-medium focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">Target Event Date</label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 border border-outline rounded-xl text-sm font-medium focus:ring-1 focus:ring-primary outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setIsReserving(false)}
                      className="flex-1 py-3 border border-outline rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-primary hover:bg-primary/95 text-white rounded-xl text-sm font-bold shadow-sm transition-colors"
                    >
                      Request Pitch
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
