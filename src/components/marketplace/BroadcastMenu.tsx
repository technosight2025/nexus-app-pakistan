"use client"

import { useState } from "react"
import { Tv, Type, RefreshCw, CheckCircle } from "lucide-react"

export function BroadcastMenu() {
  const [synced, setSynced] = useState(true)
  const [signageCount, setSignageCount] = useState(4)

  const handleSync = () => {
    setSynced(false)
    setTimeout(() => {
      setSynced(true)
    }, 1200)
  }

  return (
    <section className="space-y-4">
      <h2 className="font-sans text-xl font-bold text-foreground">Bespoke Menu Builder</h2>
      
      <div className="bg-surface rounded-2xl overflow-hidden border border-border shadow-sm">
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-muted border-b border-border flex justify-between items-center">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
            HARDWARE CLOUD BROADCASTING
          </span>
        </div>

        {/* Display Content */}
        <div className="p-6 relative">
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <p className="text-[10px] tracking-widest text-secondary font-bold uppercase">
                THE GRAND RECEPTION
              </p>
              <h3 className="text-xl font-bold text-primary font-sans">
                Artisan Kebab Platter
              </h3>
              <p className="text-xs text-muted-foreground italic font-sans">
                Served with mint chutney &amp; glazed pomegranate
              </p>
              <p className="text-accent font-bold text-base mt-2">$18.50</p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-dashed border-border hover:bg-muted/30 transition-all group">
                <Type className="w-4 h-4 text-primary mb-1.5 transition-transform group-hover:scale-110" />
                <span className="text-[10px] font-bold text-foreground">Change Type</span>
              </button>
              <button 
                onClick={handleSync}
                disabled={!synced}
                className="flex flex-col items-center justify-center p-3 rounded-lg border border-dashed border-border hover:bg-muted/30 transition-all group disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 text-primary mb-1.5 ${!synced ? "animate-spin" : "transition-transform group-hover:rotate-180"}`} />
                <span className="text-[10px] font-bold text-foreground">
                  {synced ? "Sync Devices" : "Syncing..."}
                </span>
              </button>
            </div>
          </div>

          {/* Sync status active ping */}
          <div className="absolute right-4 top-4 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </div>
        </div>
      </div>

      {/* Broadcaster Alert banner */}
      <div className="flex items-center gap-3 p-4 bg-primary text-white rounded-xl shadow-sm border border-primary/20">
        <Tv className="w-5 h-5 text-accent flex-shrink-0" />
        <p className="text-xs leading-normal">
          Currently broadcasting menu to <span className="font-bold text-accent">{signageCount} HD Venue Signage</span> units in Main Reception Hall.
        </p>
      </div>
    </section>
  )
}
