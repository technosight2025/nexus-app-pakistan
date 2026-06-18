"use client"

import { useState } from "react"
import { Sparkles, DollarSign } from "lucide-react"

export function BudgetArchitect() {
  const [budget, setBudget] = useState(50000)

  // Calculations based on standard weights
  const venueVal = Math.round(budget * 0.4)
  const caterVal = Math.round(budget * 0.3)
  const techVal = Math.round(budget * 0.3)

  return (
    <section className="bg-muted/50 rounded-2xl p-6 md:p-8 border border-border space-y-6">
      <div className="space-y-1">
        <h2 className="font-sans text-xl font-bold text-foreground">Budget Architect</h2>
        <p className="text-xs text-muted-foreground">
          Intelligent fund allocation for your multi-day celebration.
        </p>
      </div>

      <div className="space-y-6">
        {/* Slider Input */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <label className="text-sm font-bold text-foreground flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-primary" />
              Total Budget Cap
            </label>
            <span className="text-lg font-bold text-secondary">
              ${budget.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="10000"
            max="100000"
            step="5000"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
            <span>$10,000</span>
            <span>$50,000</span>
            <span>$100,000</span>
          </div>
        </div>

        {/* Calculated Splits */}
        <div className="space-y-3">
          {/* Venue Split */}
          <div className="bg-surface p-4 rounded-xl flex justify-between items-center border border-border shadow-sm">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-primary rounded-full" />
              <div>
                <span className="text-xs font-bold block text-foreground">Venue &amp; Decor</span>
                <span className="text-[10px] text-muted-foreground block">40% Target Weight</span>
              </div>
            </div>
            <span className="font-bold text-primary text-sm">${venueVal.toLocaleString()}</span>
          </div>

          {/* Catering Split */}
          <div className="bg-surface p-4 rounded-xl flex justify-between items-center border border-border shadow-sm">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-secondary rounded-full" />
              <div>
                <span className="text-xs font-bold block text-foreground">Gourmet Catering</span>
                <span className="text-[10px] text-muted-foreground block">30% Target Weight</span>
              </div>
            </div>
            <span className="font-bold text-primary text-sm">${caterVal.toLocaleString()}</span>
          </div>

          {/* Digital/Tech Split */}
          <div className="bg-surface p-4 rounded-xl flex justify-between items-center border border-border shadow-sm">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-accent rounded-full" />
              <div>
                <span className="text-xs font-bold block text-foreground">Digital &amp; Tech</span>
                <span className="text-[10px] text-muted-foreground block">30% Target Weight</span>
              </div>
            </div>
            <span className="font-bold text-primary text-sm">${techVal.toLocaleString()}</span>
          </div>
        </div>

        {/* Recommendation Tip */}
        <div className="bg-accent/10 p-4 rounded-xl border border-accent/20 flex gap-3 items-start">
          <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-xs text-foreground/80 leading-relaxed font-sans">
            <span className="font-bold text-foreground block mb-0.5">Automated Recommendation:</span> 
            {budget < 30000 
              ? "For budgets under $30,000, consider optimizing Venue expenses to 35% to secure premium culinary catering."
              : budget > 75000
              ? "With a luxury scale cap, we recommend allocating an extra 5% to Digital Displays for immersive LED walkthrough screens."
              : "Your allocation matches the recommended Pakistani premium venue density ratio. All systems are green."
            }
          </p>
        </div>
      </div>
    </section>
  )
}
