"use client"

import { TrendingUp, Clock, Award, Wallet, ArrowUpRight } from "lucide-react"

export function MetricsPanel() {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-end">
        <h2 className="font-sans text-xl font-bold text-foreground">Enterprise Intelligence</h2>
        <span className="text-xs text-secondary font-bold tracking-wider uppercase flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          Real-time Sync
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CRM Lead Grid */}
        <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
              CRM LEAD FUNNEL
            </p>
            <div className="flex justify-between items-center mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">124</p>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold mt-1">Inquiries</p>
              </div>
              <div className="w-[1px] h-8 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary flex items-center justify-center gap-0.5">
                  <Clock className="w-4 h-4 text-secondary inline" />
                  ~2h
                </p>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold mt-1">Response</p>
              </div>
              <div className="w-[1px] h-8 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-accent flex items-center justify-center gap-0.5">
                  <Award className="w-4 h-4 text-accent inline" />
                  82%
                </p>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold mt-1">Conv. Rate</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-bold text-muted-foreground">
              <span>Leads Captured</span>
              <span>82 / 124 Approved</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden flex">
              <div className="h-full bg-primary" style={{ width: "45%" }} title="Negotiation (45%)" />
              <div className="h-full bg-secondary" style={{ width: "30%" }} title="Proposal (30%)" />
              <div className="h-full bg-accent" style={{ width: "15%" }} title="Lead Intake (15%)" />
            </div>
          </div>
        </div>

        {/* Accounting Matrix */}
        <div className="bg-primary text-white rounded-2xl p-6 border border-primary-container/20 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
          
          <div>
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-primary-container/80 uppercase tracking-widest">
                CASH FLOW MATRIX
              </p>
              <ArrowUpRight className="w-4 h-4 text-accent" />
            </div>
            <h3 className="text-3xl font-bold text-accent font-sans">$42,850.00</h3>
          </div>

          <div className="mt-6 space-y-3 pt-3 border-t border-white/10">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-white/70 flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-accent" />
                Pending Invoices
              </span>
              <span className="font-bold text-white">$12,400.00</span>
            </div>
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-white/70 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-accent" />
                Proforma Quotes
              </span>
              <span className="font-bold text-white">$8,210.00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
