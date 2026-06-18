"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Calendar, Users, Briefcase, PartyPopper, Gift, ChevronLeft, ArrowRight, Loader2 } from "lucide-react"
import { createHostEvent } from "@/app/actions/host/events"
import Link from "next/link"

export default function NewEventPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    event_type: "Wedding",
    start_date: "",
    guest_count_expected: 100,
    total_budget: 1000000
  })

  const EVENT_TYPES = [
    { id: "Wedding", icon: PartyPopper, color: "text-[#FF6B6B]", bg: "bg-[#FF6B6B]/10", border: "border-[#FF6B6B]" },
    { id: "Corporate", icon: Briefcase, color: "text-[#4D96FF]", bg: "bg-[#4D96FF]/10", border: "border-[#4D96FF]" },
    { id: "Birthday", icon: Gift, color: "text-[#FFD93D]", bg: "bg-[#FFD93D]/20", border: "border-[#FFD93D]" },
  ]

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const { data, error } = await createHostEvent(formData)
      if (data) {
        router.push(`/dashboard/host/events/${data.id}`)
      } else {
        alert(`Failed to create event: ${error || 'Unknown error'}`)
        setIsSubmitting(false)
      }
    } catch (err: any) {
      alert(`Error creating event: ${err.message || 'Unknown error'}`)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 min-h-[80vh] flex flex-col justify-center">
      
      <div className="mb-8 flex items-center gap-4">
        <Link href="/dashboard/host" className="w-10 h-10 rounded-full bg-white border border-white shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Create New Event</h1>
          <p className="text-sm font-medium text-slate-500">Let's start planning something amazing</p>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-sm p-8 relative overflow-hidden">
        <div className="absolute inset-0 shadow-[inset_0_1px_rgba(255,255,255,0.8)] pointer-events-none" />
        
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 relative z-10">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">What type of event are you planning?</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {EVENT_TYPES.map((type) => (
                  <button 
                    key={type.id}
                    onClick={() => setFormData({ ...formData, event_type: type.id })}
                    className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-3 ${
                      formData.event_type === type.id ? `${type.bg} ${type.border} shadow-sm` : 'bg-white border-white shadow-sm text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <type.icon className={`w-8 h-8 ${formData.event_type === type.id ? type.color : 'text-slate-400'}`} />
                    <span className={`text-sm font-bold ${formData.event_type === type.id ? type.color : ''}`}>{type.id}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Give your event a name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Wedding of Ahmed & Fatima"
                className="w-full bg-white border border-white shadow-sm rounded-xl py-3 px-4 text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-[#FF6B6B]/20"
              />
            </div>

            <button 
              onClick={() => formData.name && setStep(2)}
              disabled={!formData.name}
              className="w-full bg-slate-800 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all hover:bg-slate-700 active:scale-[0.98]"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">When is it?</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="date" 
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full bg-white border border-white shadow-sm rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-[#FF6B6B]/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Expected Guests</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="number" 
                    value={formData.guest_count_expected}
                    onChange={(e) => setFormData({ ...formData, guest_count_expected: Number(e.target.value) })}
                    className="w-full bg-white border border-white shadow-sm rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-[#FF6B6B]/20"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Estimated Total Budget (PKR)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rs</span>
                <input 
                  type="number" 
                  value={formData.total_budget}
                  onChange={(e) => setFormData({ ...formData, total_budget: Number(e.target.value) })}
                  className="w-full bg-white border border-white shadow-sm rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-[#FF6B6B]/20"
                />
              </div>
              <p className="text-xs font-medium text-slate-500">Don't worry, you can adjust this later in the Finances tab.</p>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setStep(1)}
                className="px-6 py-3.5 bg-white border border-white shadow-sm rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.start_date}
                className="flex-1 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8B] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl shadow-[0_4px_16px_rgba(255,107,107,0.3)] flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Event"}
              </button>
            </div>
          </motion.div>
        )}
      </div>

    </div>
  )
}
