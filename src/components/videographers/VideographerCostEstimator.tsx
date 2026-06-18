"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sliders, Camera, HelpCircle, X, CheckCircle, Sparkles } from "lucide-react"

export function VideographerCostEstimator() {
  const [days, setDays] = useState(1)
  const [shooters, setShooters] = useState(1)
  const [drone, setDrone] = useState("none")
  const [editPackage, setEditPackage] = useState("raw")
  const [estimatedCost, setEstimatedCost] = useState(0)
  
  const [isReserving, setIsReserving] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    // Pricing calculation logic
    let basePrice = 80000 // 1 day base
    
    // Day multiplier
    let dayMultiplier = 1.0
    if (days === 2) dayMultiplier = 1.7
    if (days >= 3) dayMultiplier = 2.4
    
    let calc = basePrice * dayMultiplier
    
    // Shooters additions
    const additionalShooters = shooters - 1
    calc += (additionalShooters * 25000 * days)

    // Drone additions
    if (drone === "standard") calc += 25000
    if (drone === "fpv") calc += 45000

    // Editing additions
    if (editPackage === "cinematic") calc += 35000
    if (editPackage === "both") calc += 55000

    setEstimatedCost(calc)
  }, [days, shooters, drone, editPackage])

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
            <Sliders className="w-4 h-4" /> Interactive Tool
          </div>
          <h2 className="text-3xl font-black text-foreground tracking-tight mb-2">
            Wedding Videography Cost Estimator
          </h2>
          <p className="text-muted-foreground font-medium">
            Tweak package variables to calculate immediate cost estimation and crew requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Days */}
            <div className="bg-slate-50 border border-outline rounded-2xl p-5">
              <label className="text-sm font-black text-foreground block mb-3">1. Number of Event Days</label>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDays(d)}
                    className={`py-3 rounded-xl border font-bold text-sm transition-all ${
                      days === d
                        ? "border-primary bg-primary text-white"
                        : "border-outline bg-white hover:bg-slate-50 text-foreground"
                    }`}
                  >
                    {d} {d === 1 ? "Day" : "Days"}
                  </button>
                ))}
              </div>
            </div>

            {/* Shooters */}
            <div className="bg-slate-50 border border-outline rounded-2xl p-5">
              <label className="text-sm font-black text-foreground block mb-3">2. Number of Shooters (Per Day)</label>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((s) => (
                  <button
                    key={s}
                    onClick={() => setShooters(s)}
                    className={`py-3 rounded-xl border font-bold text-sm transition-all ${
                      shooters === s
                        ? "border-primary bg-primary text-white"
                        : "border-outline bg-white hover:bg-slate-50 text-foreground"
                    }`}
                  >
                    {s} {s === 1 ? "Shooter" : "Shooters"}
                  </button>
                ))}
              </div>
            </div>

            {/* Drone Option */}
            <div className="bg-slate-50 border border-outline rounded-2xl p-5">
              <label className="text-sm font-black text-foreground block mb-3">3. Aerial Drone Coverage</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "none", label: "No Drone" },
                  { id: "standard", label: "Standard Drone" },
                  { id: "fpv", label: "FPV Action Drone" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDrone(item.id)}
                    className={`py-3 px-2 rounded-xl border font-bold text-xs transition-all ${
                      drone === item.id
                        ? "border-primary bg-primary text-white"
                        : "border-outline bg-white hover:bg-slate-50 text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Editing Deliverable */}
            <div className="bg-slate-50 border border-outline rounded-2xl p-5">
              <label className="text-sm font-black text-foreground block mb-3">4. Editing & Post-Production Deliverables</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "raw", label: "Raw Footage Only" },
                  { id: "cinematic", label: "3-Min Cinematic Highlight" },
                  { id: "both", label: "Highlight + Full Cut" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setEditPackage(item.id)}
                    className={`py-3 px-2 rounded-xl border font-bold text-xs transition-all ${
                      editPackage === item.id
                        ? "border-primary bg-primary text-white"
                        : "border-outline bg-white hover:bg-slate-50 text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Cost Breakdown & Action (5 cols) */}
          <div className="lg:col-span-5 bg-card rounded-3xl border border-outline p-6 lg:p-8 flex flex-col justify-between h-full min-h-[420px]">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Estimated Package Quote</span>
              <div className="font-black text-primary text-4xl mb-6">
                PKR {estimatedCost.toLocaleString()}
              </div>

              <div className="space-y-4 pt-4 border-t border-outline">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Crew & Deliverables Summary</span>
                <div className="space-y-2.5 text-xs font-semibold text-foreground">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shoot Days:</span>
                    <span>{days} {days === 1 ? "Day" : "Days"} Shoot</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Filmmaker Crew:</span>
                    <span>{shooters} {shooters === 1 ? "Director" : "Operators"} {drone !== "none" && "+ 1 Pilot"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Drone Status:</span>
                    <span className="capitalize">{drone === "none" ? "Excluded" : `${drone} drone`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Post-Production:</span>
                    <span>{editPackage === "raw" ? "Raw Clips Hand-off" : editPackage === "cinematic" ? "Cinematic Video Cut" : "Highlight + Full length clips"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected Delivery:</span>
                    <span>{editPackage === "raw" ? "7 days (Drive sync)" : "3-4 Weeks (Physical Drive)"}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsReserving(true)}
              className="mt-8 w-full bg-primary hover:bg-primary/95 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-none flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" /> Request Studio Slots
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
                  <h3 className="text-xl font-black text-foreground mb-2">Quote Request Sent!</h3>
                  <p className="text-sm font-medium text-muted-foreground max-w-xs">
                    Your package estimation has been forwarded to matching local studios. Estimated Quote reference code: <strong>EST-VD-4938</strong>.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-primary">
                    <Sparkles className="w-4 h-4" /> Routing request to top shooters...
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">
                      Request Videographer Slots
                    </span>
                    <h3 className="font-bold text-lg text-foreground leading-tight">
                      Custom Cinematic Package
                    </h3>
                    <p className="text-xs text-muted-foreground font-semibold mt-1">
                      Estimated Cost: PKR {estimatedCost.toLocaleString()} • {days} Days ({shooters} Shooters)
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nadeem Malik"
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
                          placeholder="nadeem@gmail.com"
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
                          placeholder="0321-1234567"
                          className="w-full px-3 py-2 border border-outline rounded-xl text-sm font-medium focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">Tentative Event Date</label>
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
                      Submit Request
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
