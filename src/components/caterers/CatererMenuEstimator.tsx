"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sliders, ChefHat, HelpCircle, X, CheckCircle, Sparkles } from "lucide-react"

export function CatererMenuEstimator() {
  const [guests, setGuests] = useState(200)
  const [tier, setTier] = useState("deluxe")
  const [waterDrinks, setWaterDrinks] = useState(false)
  const [liveJalebi, setLiveJalebi] = useState(false)
  const [premiumDessert, setPremiumDessert] = useState(false)
  
  const [perHeadPrice, setPerHeadPrice] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const [isReserving, setIsReserving] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    let perHead = 2200 // standard shadi default
    
    if (tier === "standard") perHead = 2200
    if (tier === "deluxe") perHead = 2800
    if (tier === "continental") perHead = 3500
    if (tier === "bbq") perHead = 3000

    if (waterDrinks) perHead += 150
    if (liveJalebi) perHead += 120
    if (premiumDessert) perHead += 250

    setPerHeadPrice(perHead)
    setTotalCost(perHead * guests)
  }, [guests, tier, waterDrinks, liveJalebi, premiumDessert])

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
            <Sliders className="w-4 h-4" /> Menu Tool
          </div>
          <h2 className="text-3xl font-black text-foreground tracking-tight mb-2">
            Interactive Catering Cost Calculator
          </h2>
          <p className="text-muted-foreground font-medium">
            Customize event menu tiers, add live station add-ons, and estimate per-head prices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Guest Count */}
            <div className="bg-slate-50 border border-outline rounded-2xl p-5">
              <label className="text-sm font-black text-foreground block mb-3">1. Estimated Guest Count ({guests} guests)</label>
              <div className="flex gap-2 flex-wrap">
                {[100, 200, 300, 500, 800].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGuests(g)}
                    className={`flex-1 min-w-[70px] py-2.5 rounded-xl border font-bold text-sm transition-all ${
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
                min="50"
                max="1500"
                step="25"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full mt-4 accent-primary"
              />
            </div>

            {/* Menu Tiers */}
            <div className="bg-slate-50 border border-outline rounded-2xl p-5">
              <label className="text-sm font-black text-foreground block mb-3">2. Choose Menu Tier</label>
              <div className="space-y-3">
                {[
                  { id: "standard", name: "Standard Traditional", desc: "1 Main (Chicken Korma), 1 Rice (Pulao), Taftan/Naan, Gajar ka Halwa, Drinks.", rate: "Rs: 2,200 / head" },
                  { id: "deluxe", name: "Deluxe Traditional", desc: "2 Mains (Mutton Korma, Kastori Boti), Zafrani Pulao, 2 Sweets (Zafrani Kheer, Live Jalebi), Roghni Naan, Drinks.", rate: "Rs: 2,800 / head" },
                  { id: "bbq", name: "Custom Live BBQ Station", desc: "Live grilled Seekh Kabab, Tikka Boti, Chicken Ghee Karahi, Roghni Naan, 1 Dessert, Cold Drinks.", rate: "Rs: 3,000 / head" },
                  { id: "continental", name: "Continental Fusion Buffet", desc: "Alfredo Pasta, Garlic Rice, Moroccan Chicken, Live Sushi Counter, Gourmet Salad Bar, Mocktail Tower, 2 Sweets.", rate: "Rs: 3,500 / head" }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setTier(item.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-start gap-4 ${
                      tier === item.id
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

            {/* Live Stations & Extras */}
            <div className="bg-slate-50 border border-outline rounded-2xl p-5">
              <label className="text-sm font-black text-foreground block mb-3">3. Interactive Add-ons (Per Head)</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 bg-white border border-outline rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={waterDrinks}
                    onChange={(e) => setWaterDrinks(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <div>
                    <span className="text-xs font-bold text-foreground block">Bottled Mineral Water & Diet Cans (+Rs: 150/head)</span>
                    <span className="text-[10px] font-medium text-muted-foreground">Standard packages only include standard glass soft drinks.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-white border border-outline rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={liveJalebi}
                    onChange={(e) => setLiveJalebi(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <div>
                    <span className="text-xs font-bold text-foreground block">Live Hot Crispy Jalebi Stall (+Rs: 120/head)</span>
                    <span className="text-[10px] font-medium text-muted-foreground">Fresh fryers operating live on event night.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-white border border-outline rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={premiumDessert}
                    onChange={(e) => setPremiumDessert(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <div>
                    <span className="text-xs font-bold text-foreground block">Premium Belgian Chocolate Fountain (+Rs: 250/head)</span>
                    <span className="text-[10px] font-medium text-muted-foreground">Comes with strawberry skewers, marshmallows, and wafers.</span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Cost Breakdown & Action (5 cols) */}
          <div className="lg:col-span-5 bg-card rounded-3xl border border-outline p-6 lg:p-8 flex flex-col justify-between h-full min-h-[420px]">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Estimated Head Rate</span>
              <div className="font-black text-primary text-3xl mb-1">
                PKR {perHeadPrice.toLocaleString()} <span className="text-sm font-semibold text-muted-foreground">/ head</span>
              </div>
              <div className="text-xs font-semibold text-muted-foreground mb-6">
                Calculated for {guests} guests
              </div>

              <div className="space-y-4 pt-4 border-t border-outline">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Food Budget</span>
                  <span className="text-xs font-bold text-primary">Pre-tax Estimate</span>
                </div>
                <div className="font-black text-foreground text-3xl mb-6">
                  PKR {totalCost.toLocaleString()}
                </div>

                <div className="space-y-2.5 text-xs font-semibold text-foreground">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Menu Selection:</span>
                    <span className="capitalize">{tier} Tier</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Catering Crew:</span>
                    <span>{Math.ceil(guests / 20)} service waiters + cooking crew</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prep Timeline:</span>
                    <span>Starts 18 hours before event call time</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Live Stations:</span>
                    <span>{liveJalebi ? "Live Jalebi Stall Included" : "None Selected"}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsReserving(true)}
              className="mt-8 w-full bg-primary hover:bg-primary/95 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-none flex items-center justify-center gap-2"
            >
              <ChefHat className="w-4 h-4" /> Book Complimentary Tasting
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
                  <h3 className="text-xl font-black text-foreground mb-2">Tasting Slot Reserved!</h3>
                  <p className="text-sm font-medium text-muted-foreground max-w-xs">
                    Your tasting invite for 4 guests has been generated. Confirmation Code: <strong>TST-CT-9238</strong>. Check your inbox at <strong>{email}</strong>.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-primary">
                    <Sparkles className="w-4 h-4" /> Sending directions to menu kitchen...
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">
                      Complimentary Menu Tasting
                    </span>
                    <h3 className="font-bold text-lg text-foreground leading-tight">
                      Taste Trial for 4 Guests
                    </h3>
                    <p className="text-xs text-muted-foreground font-semibold mt-1">
                      Menu Selected: {tier} tier • Guests: {guests}
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
                      <label className="text-xs font-bold text-foreground block mb-1">Target Shoot / Event Date</label>
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
                      Book Tasting
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
