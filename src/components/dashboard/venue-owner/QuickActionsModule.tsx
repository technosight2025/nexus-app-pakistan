"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, MessageSquare, FileText, X, Sparkles, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Lead } from "./LeadsPipelineModule"

interface QuickActionsModuleProps {
  selectedLead: Lead | null
  onAddLead: (lead: {
    name: string
    type: string
    date: string
    value: string
    guests: number
    source: "Website" | "Instagram" | "WhatsApp" | "Walk-in"
    phone: string
  }) => void
  copyTemplateMessage: (type: "visit" | "quote") => void
}

export default function QuickActionsModule({
  selectedLead,
  onAddLead,
  copyTemplateMessage
}: QuickActionsModuleProps) {
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false)
  const [form, setForm] = useState({
    name: "",
    type: "Wedding",
    date: "",
    value: "",
    guests: 300,
    source: "Instagram" as const,
    phone: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.date || !form.value) return
    onAddLead(form)
    setIsAddLeadOpen(false)
    setForm({
      name: "",
      type: "Wedding",
      date: "",
      value: "",
      guests: 300,
      source: "Instagram",
      phone: ""
    })
  }

  return (
    <div className="bg-white rounded-[16px] border border-[#E6E2DA] p-6 shadow-sm space-y-4">
      <h3 className="font-bold text-slate-900 text-sm">Quick Actions Console</h3>
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => setIsAddLeadOpen(true)}
          className="w-full justify-start text-xs h-9 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-800 font-bold border border-[#E6E2DA] rounded-[12px] shadow-none"
        >
          <Plus className="w-3.5 h-3.5 mr-2 text-[#0F5B3E]" /> New Lead
        </Button>

        {selectedLead ? (
          <>
            <Button
              variant="outline"
              onClick={() => copyTemplateMessage("visit")}
              className="w-full justify-start text-xs h-9 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-800 font-bold border border-[#E6E2DA] rounded-[12px]"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-2 text-[#0F5B3E]" /> Invite Visit
            </Button>
            <Button
              variant="outline"
              onClick={() => copyTemplateMessage("quote")}
              className="w-full justify-start text-xs h-9 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-800 font-bold border border-[#E6E2DA] rounded-[12px]"
            >
              <FileText className="w-3.5 h-3.5 mr-2 text-[#D9467A]" /> Send Proposal
            </Button>
          </>
        ) : (
          <div className="col-span-2 text-center py-2 text-slate-400 text-xs">
            Select a CRM lead to enable message templates
          </div>
        )}
      </div>

      {/* Add Lead Dialog Modal */}
      <AnimatePresence>
        {isAddLeadOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[16px] border border-[#E6E2DA] p-6 max-w-md w-full shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center pb-2 border-b border-[#E6E2DA]">
                <h3 className="font-bold text-lg text-[#1D1C17] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#0F5B3E]" /> New CRM Lead Entry
                </h3>
                <button onClick={() => setIsAddLeadOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Lead Client Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha Siddique"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-[12px] border border-[#E6E2DA] focus:outline-none focus:ring-2 focus:ring-[#0F5B3E]/20 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Event Category</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full h-10 px-3 rounded-[12px] border border-[#E6E2DA] focus:outline-none focus:ring-2 focus:ring-[#0F5B3E]/20 text-sm bg-white"
                    >
                      <option>Wedding</option>
                      <option>Mehndi</option>
                      <option>Valima</option>
                      <option>Corporate</option>
                      <option>Birthday</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Acquisition Source</label>
                    <select
                      value={form.source}
                      onChange={(e) => setForm({ ...form, source: e.target.value as any })}
                      className="w-full h-10 px-3 rounded-[12px] border border-[#E6E2DA] focus:outline-none focus:ring-2 focus:ring-[#0F5B3E]/20 text-sm bg-white"
                    >
                      <option>Instagram</option>
                      <option>WhatsApp</option>
                      <option>Website</option>
                      <option>Walk-in</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Event Date</label>
                    <input
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full h-10 px-3 rounded-[12px] border border-[#E6E2DA] focus:outline-none focus:ring-2 focus:ring-[#0F5B3E]/20 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Est. Budget Value</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1.2M or 800k"
                      value={form.value}
                      onChange={(e) => setForm({ ...form, value: e.target.value })}
                      className="w-full h-10 px-3 rounded-[12px] border border-[#E6E2DA] focus:outline-none focus:ring-2 focus:ring-[#0F5B3E]/20 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Guest Count</label>
                    <input
                      type="number"
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: parseInt(e.target.value) })}
                      className="w-full h-10 px-3 rounded-[12px] border border-[#E6E2DA] focus:outline-none focus:ring-2 focus:ring-[#0F5B3E]/20 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Phone Number</label>
                    <input
                      type="text"
                      placeholder="e.g. +92 300 1234567"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full h-10 px-3 rounded-[12px] border border-[#E6E2DA] focus:outline-none focus:ring-2 focus:ring-[#0F5B3E]/20 text-sm"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddLeadOpen(false)}
                    className="flex-1 border-[#E6E2DA] text-slate-700 font-bold rounded-[12px] h-10"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-[#0F5B3E] hover:bg-[#0F5B3E]/90 text-white font-bold rounded-[12px] h-10 cursor-pointer"
                  >
                    Register Lead
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
