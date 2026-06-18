"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sliders, Flower, HelpCircle, X, CheckCircle, Sparkles } from "lucide-react"

export function DecoratorCostEstimator() {
  const [scale, setScale] = useState("medium")
  const [theme, setTheme] = useState("floral")
  const [walkwayArch, setWalkwayArch] = useState(false)
  const [dmxLights, setDmxLights] = useState(false)
  const [welcomeDecor, setWelcomeDecor] = useState(false)
  const [estimatedCost, setEstimatedCost] = useState(0)
  
  const [isReserving, setIsReserving] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    let basePrice = 100000 // 1 day base
    
    // Scale multiplier
    let scaleMultiplier = 1.0
    if (scale === "small") scaleMultiplier = 0.7
    if (scale === "medium") scaleMultiplier = 1.2
    if (scale === "large") scaleMultiplier = 1.8
    if (scale === "massive") scaleMultiplier = 2.5
    
    let calc = basePrice * scaleMultiplier
    
    // Theme pricing
    if (theme === "minimalist") calc += 20000
    if (theme === "floral") calc += 40000
    if (theme === "royal") calc += 60000
    if (theme === "crystals") calc += 80000

    // Addon modules
    if (walkwayArch) calc += 30000
    if (dmxLights) calc += 45000
    if (welcomeDecor) calc += 25000

    setEstimatedCost(calc)
  }, [scale, theme, walkwayArch, dmxLights, welcomeDecor])

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
            Wedding Decor Cost Estimator
          </h2>
          <p className="text-muted-foreground font-medium">
            Tweak setup variables to calculate immediate cost estimation and staging requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Guest Scale */}
            <div className="bg-slate-50 border border-outline rounded-2xl p-5">
              <label className="text-sm font-black text-foreground block mb-3">1. Event Scale (Stage Width & Guest Count)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "small", label: "Under 150 (24ft stage)" },
                  { id: "medium", label: "150-400 (32ft stage)" },
                  { id: "large", label: "400-800 (40ft stage)" },
                  { id: "massive", label: "800+ (60ft stage)" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setScale(item.id)}
                    className={`py-3 px-1 rounded-xl border font-bold text-[10px] transition-all ${
                      scale === item.id
                        ? "border-primary bg-primary text-white"
                        : "border-outline bg-white hover:bg-slate-50 text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Style */}
            <div className="bg-slate-50 border border-outline rounded-2xl p-5">
              <label className="text-sm font-black text-foreground block mb-3">2. Choose Stage Theme Style</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "traditional", label: "Mehndi Traditional" },
                  { id: "minimalist", label: "Modern Minimalist" },
                  { id: "floral", label: "Classic Floral" },
                  { id: "crystals", label: "Luxury Crystals" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTheme(item.id)}
                    className={`py-3 px-1 rounded-xl border font-bold text-[10px] transition-all ${
                      theme === item.id
                        ? "border-primary bg-primary text-white"
                        : "border-outline bg-white hover:bg-slate-50 text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Addon modules */}
            <div className="bg-slate-50 border border-outline rounded-2xl p-5">
              <label className="text-sm font-black text-foreground block mb-3">3. Walkway & Lighting Extras</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 bg-white border border-outline rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={walkwayArch}
                    onChange={(e) => setWalkwayArch(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <div>
                    <span className="text-xs font-bold text-foreground block">Pathway Floral Archway Tunnel (+Rs: 30k)</span>
                    <span className="text-[10px] font-medium text-muted-foreground">Creates a romantic 24ft floral ceiling structure for entrance path.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-white border border-outline rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={dmxLights}
                    onChange={(e) => setDmxLights(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <div>
                    <span className="text-xs font-bold text-foreground block">Wireless DMX Stage Lighting Grid (+Rs: 45k)</span>
                    <span className="text-[10px] font-medium text-muted-foreground">Includes moving head spot beams, hazers, and color washes synced with sound console.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-white border border-outline rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={welcomeDecor}
                    onChange={(e) => setWelcomeDecor(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <div>
                    <span className="text-xs font-bold text-foreground block">Custom Welcome Entrance Backdrops (+Rs: 25k)</span>
                    <span className="text-[10px] font-medium text-muted-foreground">Double board with floral cuts, guest seating sheets, and mirror stands.</span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Cost Breakdown & Action (5 cols) */}
          <div className="lg:col-span-5 bg-card rounded-3xl border border-outline p-6 lg:p-8 flex flex-col justify-between h-full min-h-[400px]">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Estimated Setup Quote</span>
              <div className="font-black text-primary text-4xl mb-6">
                PKR {estimatedCost.toLocaleString()}
              </div>

              <div className="space-y-4 pt-4 border-t border-outline">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Structural Details</span>
                <div className="space-y-2.5 text-xs font-semibold text-foreground">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stage Size:</span>
                    <span>{scale === "small" ? "24ft width" : scale === "medium" ? "32ft width" : scale === "large" ? "40ft width" : "60ft width"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Setup Window:</span>
                    <span>12 hours before call time (Standby)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">DMX Lighting:</span>
                    <span>{dmxLights ? "Grid Included (4x Spot, 8x Par)" : "Excluded"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">3D Renders:</span>
                    <span>Generated in 48h (Auto-shortlist)</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsReserving(true)}
              className="mt-8 w-full bg-primary hover:bg-primary/95 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-none flex items-center justify-center gap-2"
            >
              <Flower className="w-4 h-4" /> Request Concept Pitch
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
                    Your concept pitch request has been registered. Proposal reference: <strong>EST-DC-9284</strong>. Our designers will email your 3D models in 48 hours.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-primary">
                    <Sparkles className="w-4 h-4" /> Routing criteria to local decorators...
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">
                      Request Decor Concept Pitch
                    </span>
                    <h3 className="font-bold text-lg text-foreground leading-tight">
                      Custom Stage Proposal
                    </h3>
                    <p className="text-xs text-muted-foreground font-semibold mt-1">
                      Estimated Cost: PKR {estimatedCost.toLocaleString()} • Style: {theme}
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
                        placeholder="Zeeshan Ali"
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
                          placeholder="zeeshan@gmail.com"
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
                      <label className="text-xs font-bold text-foreground block mb-1">Event Date</label>
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
