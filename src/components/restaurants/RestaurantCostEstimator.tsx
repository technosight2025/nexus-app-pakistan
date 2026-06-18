"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sliders, Calendar, HelpCircle, X, CheckCircle, Sparkles, Building } from "lucide-react"

export function RestaurantCostEstimator() {
  const [guests, setGuests] = useState(50)
  const [spaceType, setSpaceType] = useState("lounge")
  const [projectorRig, setProjectorRig] = useState(false)
  const [soundSystem, setSoundSystem] = useState(false)
  const [themeDecor, setThemeDecor] = useState(false)
  const [mocktailTower, setMocktailTower] = useState(false)
  
  const [perHeadPrice, setPerHeadPrice] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const [isBooking, setIsBooking] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    let perHead = 3500 // default VIP Lounge
    
    if (spaceType === "lounge") perHead = 3500
    if (spaceType === "rooftop") perHead = 4200
    if (spaceType === "hall") perHead = 3000
    if (spaceType === "buffet") perHead = 2600

    if (themeDecor) perHead += 400
    if (mocktailTower) perHead += 250

    let flatFees = 0
    if (projectorRig) flatFees += 8000
    if (soundSystem) flatFees += 12000

    setPerHeadPrice(perHead)
    setTotalCost((perHead * guests) + flatFees)
  }, [guests, spaceType, projectorRig, soundSystem, themeDecor, mocktailTower])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setIsBooking(false)
      setFormSubmitted(false)
      setName("")
      setEmail("")
      setPhone("")
      setDate("")
    }, 2500)
  }

  const getSpaceName = (id: string) => {
    if (id === "lounge") return "Private VIP Lounge"
    if (id === "rooftop") return "Skyline Rooftop Deck"
    if (id === "hall") return "Mini Banquet Hall"
    if (id === "buffet") return "Traditional Buffet Hall"
    return ""
  }

  return (
    <section className="py-16 bg-white border-b border-outline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-3">
            <Sliders className="w-4 h-4" /> Space Estimator
          </div>
          <h2 className="text-3xl font-black text-foreground tracking-tight mb-2">
            Restaurant Dining Cost Calculator
          </h2>
          <p className="text-muted-foreground font-medium">
            Customize guest count, dining spaces, and AV equipment to get real-time price estimations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Guest Count */}
            <div className="bg-slate-50 border border-outline rounded-2xl p-5">
              <label className="text-sm font-black text-foreground block mb-3">1. Number of Guests ({guests} guests)</label>
              <div className="flex gap-2 flex-wrap">
                {[15, 30, 50, 100, 150, 250].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGuests(g)}
                    className={`flex-1 min-w-[60px] py-2.5 rounded-xl border font-bold text-sm transition-all ${
                      guests === g
                        ? "border-primary bg-primary text-white"
                        : "border-outline bg-white hover:bg-slate-50 text-foreground"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="10"
                max="350"
                step="5"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full mt-4 accent-primary"
              />
            </div>

            {/* Space Types */}
            <div className="bg-slate-50 border border-outline rounded-2xl p-5">
              <label className="text-sm font-black text-foreground block mb-3">2. Choose Dining Space Type</label>
              <div className="space-y-3">
                {[
                  { id: "lounge", name: "Private VIP Lounge", desc: "Premium secluded setting, customized elegant decor, and dedicated steward service.", rate: "Rs: 3,500 / head" },
                  { id: "rooftop", name: "Skyline Rooftop Deck", desc: "Scenic open-air seating overlooking citylines, heaters/fans, and live charcoal grill setups.", rate: "Rs: 4,200 / head" },
                  { id: "hall", name: "Mini Banquet Hall", desc: "Spacious private dining hall with formal stage partition and built-in screen support.", rate: "Rs: 3,000 / head" },
                  { id: "buffet", name: "Traditional Buffet Space", desc: "Casual high-capacity buffet seating arrangement with standard ambient music systems.", rate: "Rs: 2,600 / head" }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSpaceType(item.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-start gap-4 ${
                      spaceType === item.id
                        ? "border-primary bg-primary/5"
                        : "border-outline bg-white hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{item.name}</h4>
                      <p className="text-xs text-muted-foreground font-medium mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                    <span className="font-black text-primary text-sm shrink-0 whitespace-nowrap">{item.rate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AV Equipment & Customizations */}
            <div className="bg-slate-50 border border-outline rounded-2xl p-5">
              <label className="text-sm font-black text-foreground block mb-3">3. Interactive Add-ons & Tech Rigs</label>
              <div className="space-y-2.5">
                <label className="flex items-center gap-3 p-3 bg-white border border-outline rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={projectorRig}
                    onChange={(e) => setProjectorRig(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <div>
                    <span className="text-xs font-bold text-foreground block">Gourmet Screen & HD Projector Setup (+Rs: 8,000 flat)</span>
                    <span className="text-[10px] font-medium text-muted-foreground">HDMI-ready projection systems for slide projections, slideshows, or speeches.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-white border border-outline rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={soundSystem}
                    onChange={(e) => setSoundSystem(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <div>
                    <span className="text-xs font-bold text-foreground block">Professional Audio System & Wireless Mics (+Rs: 12,000 flat)</span>
                    <span className="text-[10px] font-medium text-muted-foreground">Twin speakers, mixer board, and two hand-held mics for toasts/presentations.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-white border border-outline rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={themeDecor}
                    onChange={(e) => setThemeDecor(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <div>
                    <span className="text-xs font-bold text-foreground block">Floral Table Runners & Personalized Place Cards (+Rs: 400/head)</span>
                    <span className="text-[10px] font-medium text-muted-foreground">Themed tables customized with fresh local roses/jasmines and calligraphy cards.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-white border border-outline rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={mocktailTower}
                    onChange={(e) => setMocktailTower(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <div>
                    <span className="text-xs font-bold text-foreground block">Mocktail Welcoming Fountain Tower (+Rs: 250/head)</span>
                    <span className="text-[10px] font-medium text-muted-foreground">Ice-cold flavored coolers (Mint Margaritas, Blue Lagoon) served at reception.</span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Cost Breakdown & Action (5 cols) */}
          <div className="lg:col-span-5 bg-card rounded-3xl border border-outline p-6 lg:p-8 flex flex-col justify-between h-full min-h-[420px]">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Base Head Rate</span>
              <div className="font-black text-primary text-3xl mb-1">
                PKR {perHeadPrice.toLocaleString()} <span className="text-sm font-semibold text-muted-foreground">/ head</span>
              </div>
              <div className="text-xs font-semibold text-muted-foreground mb-6">
                Calculated for {guests} guests
              </div>

              <div className="space-y-4 pt-4 border-t border-outline">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Event Dining Budget</span>
                  <span className="text-xs font-bold text-primary">Pre-tax Estimate</span>
                </div>
                <div className="font-black text-foreground text-3xl mb-6">
                  PKR {totalCost.toLocaleString()}
                </div>

                <div className="space-y-2.5 text-xs font-semibold text-foreground">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dining Area:</span>
                    <span>{getSpaceName(spaceType)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dedicated Stewards:</span>
                    <span>{Math.max(1, Math.ceil(guests / 12))} private stewards</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Exclusive Booking:</span>
                    <span>3 Hours Private Lounge Window</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Visual/Audio Hardware:</span>
                    <span>{projectorRig || soundSystem ? "Equipment Included" : "None Selected"}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsBooking(true)}
              className="mt-8 w-full bg-primary hover:bg-primary/95 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-none flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Reserve Tour & Locked Menu
            </button>
          </div>

        </div>
      </div>

      {/* Modal Booking Form */}
      <AnimatePresence>
        {isBooking && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-outline w-full max-w-lg p-6 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            >
              <button
                onClick={() => setIsBooking(false)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors border border-outline bg-slate-50"
              >
                <X className="w-4 h-4" />
              </button>

              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="w-16 h-16 text-primary mb-4 animate-bounce" />
                  <h3 className="text-xl font-black text-foreground mb-2">Dining Space Reserved!</h3>
                  <p className="text-sm font-medium text-muted-foreground max-w-xs">
                    Your site tour request for {guests} guests in the <strong>{getSpaceName(spaceType)}</strong> has been received. Ticket ID: <strong>RES-DK-4829</strong>. Sent info to <strong>{email}</strong>.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-primary">
                    <Sparkles className="w-4 h-4" /> Contacting private event manager...
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">
                      Private Lounge Reservation
                    </span>
                    <h3 className="font-bold text-lg text-foreground leading-tight">
                      Confirm Dining Space Details
                    </h3>
                    <p className="text-xs text-muted-foreground font-semibold mt-1">
                      Selected: {getSpaceName(spaceType)} • Guests: {guests}
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
                        placeholder="Nabil Hassan"
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
                          placeholder="nabil@outlook.com"
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
                          placeholder="0300-9876543"
                          className="w-full px-3 py-2 border border-outline rounded-xl text-sm font-medium focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">Event / Dinner Date</label>
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
                      onClick={() => setIsBooking(false)}
                      className="flex-1 py-3 border border-outline rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-primary hover:bg-primary/95 text-white rounded-xl text-sm font-bold shadow-sm transition-colors"
                    >
                      Reserve Dining Space
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
