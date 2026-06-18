"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calculator, ChefHat, Users, SunSnow, Flame, Info, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DaigCalculator() {
  const [guests, setGuests] = useState(300)
  const [season, setSeason] = useState<'summer' | 'winter'>('winter')
  const [menuType, setMenuType] = useState<'biryani_only' | 'qorma_biryani' | 'full_course'>('full_course')
  const [isCalculating, setIsCalculating] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleCalculate = () => {
    setIsCalculating(true)
    setResults(null)
    
    // Simulate AI thinking
    setTimeout(() => {
      // Basic Catering Math for Pakistani Weddings
      const consumptionFactor = season === 'winter' ? 1.15 : 0.95 // People eat more meat in winter
      const adjustedGuests = guests * consumptionFactor

      let daigsBiryani = 0;
      let daigsQorma = 0;
      let naans = 0;
      let sweetKg = 0;
      let drinks = 0;

      if (menuType === 'biryani_only') {
        daigsBiryani = Math.ceil(adjustedGuests / 35); // 1 Daig serves ~35
        sweetKg = Math.ceil(adjustedGuests / 7); // 1 KG serves ~7
      } else if (menuType === 'qorma_biryani') {
        daigsBiryani = Math.ceil((adjustedGuests * 0.6) / 35); // 60% eat biryani
        daigsQorma = Math.ceil((adjustedGuests * 0.4) / 40); // 40% eat qorma
        naans = Math.ceil(adjustedGuests * 0.4 * 2.5); // 2.5 naans per qorma eater
        sweetKg = Math.ceil(adjustedGuests / 7);
      } else { // full_course
        daigsBiryani = Math.ceil((adjustedGuests * 0.5) / 35); 
        daigsQorma = Math.ceil((adjustedGuests * 0.7) / 40); // Most eat qorma in full course
        naans = Math.ceil(adjustedGuests * 0.7 * 2); 
        sweetKg = Math.ceil(adjustedGuests / 6); // More dessert eaten in full course
      }

      drinks = season === 'summer' ? Math.ceil(guests * 1.5) : Math.ceil(guests * 0.8)

      // Costs (Mock)
      const costBiryani = daigsBiryani * 15000;
      const costQorma = daigsQorma * 18000;
      const costNaans = naans * 25;
      const costSweet = sweetKg * 1200;
      const totalCost = costBiryani + costQorma + costNaans + costSweet;

      setResults({
        daigsBiryani,
        daigsQorma,
        naans,
        sweetKg,
        drinks,
        totalCost,
      })
      setIsCalculating(false)
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-red-700 font-bold mb-4 text-xs tracking-wider">
          <ChefHat className="w-4 h-4" /> AI CATERING
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Daig & Menu Calculator</h1>
        <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
          Never under-order or waste food again. Tell us your guest count and menu, and our AI will calculate exactly how many Daigs, Naans, and Desserts you need based on the season.
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 md:p-10 shadow-xl border border-slate-100 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Controls Panel */}
          <div className="space-y-8">
            <div>
              <label className="flex items-center justify-between font-bold text-slate-900 mb-4">
                <span className="flex items-center gap-2"><Users className="w-5 h-5 text-slate-400" /> Total Guests</span>
                <span className="text-2xl text-red-600">{guests}</span>
              </label>
              <input 
                type="range" min="50" max="2000" step="50" value={guests} 
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-bold text-slate-900 mb-4">
                <SunSnow className="w-5 h-5 text-slate-400" /> Event Season
              </label>
              <div className="flex gap-4">
                <button 
                  onClick={() => setSeason('winter')}
                  className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${season === 'winter' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                >
                  <span className="text-2xl">❄️</span>
                  <span className="font-bold text-sm">Winter (Nov-Feb)</span>
                </button>
                <button 
                  onClick={() => setSeason('summer')}
                  className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${season === 'summer' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                >
                  <span className="text-2xl">☀️</span>
                  <span className="font-bold text-sm">Summer (Mar-Oct)</span>
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 font-bold text-slate-900 mb-4">
                <Flame className="w-5 h-5 text-slate-400" /> Menu Complexity
              </label>
              <div className="space-y-3">
                {[
                  { id: 'biryani_only', label: 'Biryani / Pulao Only', desc: 'Single dish, usually for Mehndi' },
                  { id: 'qorma_biryani', label: 'Qorma & Biryani', desc: 'Standard Baraat/Valima menu' },
                  { id: 'full_course', label: 'Full Course (Karahi, Qorma, Rice)', desc: 'Extravagant spread' },
                ].map(opt => (
                  <button 
                    key={opt.id} onClick={() => setMenuType(opt.id as any)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${menuType === opt.id ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <div>
                      <h4 className={`font-bold ${menuType === opt.id ? 'text-red-700' : 'text-slate-700'}`}>{opt.label}</h4>
                      <p className={`text-xs font-medium mt-1 ${menuType === opt.id ? 'text-red-500/80' : 'text-slate-500'}`}>{opt.desc}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${menuType === opt.id ? 'border-red-500' : 'border-slate-300'}`}>
                      {menuType === opt.id && <div className="w-3 h-3 rounded-full bg-red-500" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleCalculate} disabled={isCalculating}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl py-7 text-lg font-bold shadow-xl shadow-slate-900/20"
            >
              {isCalculating ? (
                <span className="flex items-center"><Calculator className="w-5 h-5 mr-2 animate-spin" /> Calculating Requirements...</span>
              ) : (
                <span className="flex items-center">Calculate Now <ArrowRight className="w-5 h-5 ml-2" /></span>
              )}
            </Button>
          </div>

          {/* Results Panel */}
          <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border-2 border-slate-100 flex flex-col">
            {!results ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                <ChefHat className="w-16 h-16 text-slate-300" />
                <p className="font-medium text-slate-500 max-w-[200px]">Adjust settings and click calculate to see your exact catering requirements.</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold mb-6 bg-emerald-50 w-fit px-3 py-1 rounded-full text-sm">
                    <CheckCircle2 className="w-4 h-4" /> AI Optimized for {season}
                  </div>

                  <h3 className="font-black text-slate-900 text-xl mb-6">Shopping List</h3>

                  <div className="space-y-4 flex-grow">
                    {results.daigsBiryani > 0 && (
                      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-xl">🍚</div>
                          <div>
                            <h4 className="font-bold text-slate-900">Biryani / Pulao</h4>
                            <p className="text-xs text-slate-500 font-medium">10kg meat per Daig</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-black text-orange-600">{results.daigsBiryani}</span>
                          <span className="text-sm font-bold text-slate-500 ml-1">Daigs</span>
                        </div>
                      </div>
                    )}

                    {results.daigsQorma > 0 && (
                      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-xl">🍲</div>
                          <div>
                            <h4 className="font-bold text-slate-900">Qorma / Karahi</h4>
                            <p className="text-xs text-slate-500 font-medium">10kg meat per Daig</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-black text-red-600">{results.daigsQorma}</span>
                          <span className="text-sm font-bold text-slate-500 ml-1">Daigs</span>
                        </div>
                      </div>
                    )}

                    {results.naans > 0 && (
                      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">🫓</div>
                          <h4 className="font-bold text-slate-900">Naan / Taftan</h4>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-black text-amber-600">{results.naans.toLocaleString()}</span>
                          <span className="text-sm font-bold text-slate-500 ml-1">Pcs</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-xl">🍨</div>
                        <h4 className="font-bold text-slate-900">Dessert (Halwa/Kheer)</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-pink-600">{results.sweetKg}</span>
                        <span className="text-sm font-bold text-slate-500 ml-1">KGs</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t-2 border-slate-200 border-dashed">
                    <p className="text-sm font-bold text-slate-500 mb-1">Estimated Food Cost</p>
                    <h3 className="text-3xl font-black text-slate-900">Rs {results.totalCost.toLocaleString()}</h3>
                    
                    <Button className="w-full mt-6 bg-red-50 hover:bg-red-100 text-red-700 border-2 border-red-200 rounded-xl font-bold">
                      Find Local Caterers
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
