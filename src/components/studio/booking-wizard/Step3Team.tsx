import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import type { BookingFormData, ServiceItem, CustomServiceItem } from "./types"

const TEAM_MEMBERS = [
  { id: "U", name: "Usman Raza", role: "Lead Photographer", color: "bg-indigo-500" },
  { id: "A", name: "Aisha Noor", role: "Co-Photographer", color: "bg-rose-500" },
  { id: "F", name: "Faisal Khan", role: "Videographer", color: "bg-amber-500" },
  { id: "K", name: "Kamran Ali", role: "Drone Pilot", color: "bg-emerald-500" },
  { id: "S", name: "Sara Tariq", role: "Photo Editor", color: "bg-sky-500" },
  { id: "Z", name: "Zain Ahmed", role: "Assistant", color: "bg-purple-500" },
]

interface Step3Props {
  data: BookingFormData
  onChange: (updates: Partial<BookingFormData>) => void
}

export default function Step3Team({ data, onChange }: Step3Props) {
  const [newServiceName, setNewServiceName] = useState("")
  const [newServicePrice, setNewServicePrice] = useState("")

  const toggleTeam = (id: string) => {
    const current = data.teamMembers || []
    const updated = current.includes(id) ? current.filter(m => m !== id) : [...current, id]
    onChange({ teamMembers: updated })
  }

  const toggleService = (id: string) => {
    const updated = data.services.map(s =>
      s.id === id ? { ...s, selected: !s.selected } : s
    )
    onChange({ services: updated })
  }

  const updateServicePrice = (id: string, price: string) => {
    const updated = data.services.map(s =>
      s.id === id ? { ...s, price } : s
    )
    onChange({ services: updated })
  }

  const addCustomService = () => {
    if (!newServiceName.trim()) return
    const custom: CustomServiceItem = {
      id: `custom-${Date.now()}`,
      name: newServiceName.trim(),
      price: newServicePrice,
    }
    onChange({ customServices: [...(data.customServices || []), custom] })
    setNewServiceName("")
    setNewServicePrice("")
  }

  const removeCustomService = (id: string) => {
    onChange({ customServices: data.customServices.filter(s => s.id !== id) })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[20px] md:text-[24px] font-black text-[#111827] dark:text-white">Team & Services</h2>
        <p className="text-[13px] text-[#6B7280] dark:text-gray-400 mt-1">Assign team members and select what's included.</p>
      </div>

      {/* Team Assignment */}
      <div className="space-y-3">
        <label className="text-[10px] font-black text-[#6B7280] dark:text-gray-400 uppercase tracking-widest">Assign Team *</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TEAM_MEMBERS.map(member => {
            const isSelected = (data.teamMembers || []).includes(member.id)
            return (
              <div
                key={member.id}
                onClick={() => toggleTeam(member.id)}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? "border-[#4F46E5] bg-[#EEF2FF] dark:bg-indigo-500/10"
                    : "border-[#E5E7EB] dark:border-white/8 bg-white dark:bg-[#111118] hover:border-[#4F46E5]/40"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl ${member.color} text-white text-[11px] font-black flex items-center justify-center shrink-0`}>
                  {member.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold text-[#111827] dark:text-white">{member.name}</div>
                  <div className="text-[10px] text-[#9CA3AF]">{member.role}</div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  isSelected ? "bg-[#4F46E5] border-[#4F46E5]" : "border-[#D1D5DB] dark:border-white/20"
                }`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Services */}
      <div className="space-y-3">
        <label className="text-[10px] font-black text-[#6B7280] dark:text-gray-400 uppercase tracking-widest">Services Included *</label>
        <div className="space-y-2">
          {data.services.map(service => (
            <div
              key={service.id}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                service.selected
                  ? "border-[#4F46E5] bg-[#EEF2FF] dark:bg-indigo-500/10"
                  : "border-[#E5E7EB] dark:border-white/8 bg-white dark:bg-[#111118]"
              }`}
            >
              <div
                onClick={() => toggleService(service.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 cursor-pointer transition-all ${
                  service.selected ? "bg-[#4F46E5] border-[#4F46E5]" : "border-[#D1D5DB] dark:border-white/20"
                }`}
              >
                {service.selected && <div className="w-2.5 h-0.5 bg-white rounded-full" style={{ transform: "rotate(45deg) translateY(-2px)" }} />}
              </div>
              <span
                onClick={() => toggleService(service.id)}
                className={`flex-1 text-[13px] font-semibold cursor-pointer ${
                  service.selected ? "text-[#4F46E5]" : "text-[#374151] dark:text-gray-300"
                }`}
              >
                {service.name}
              </span>
              {service.selected && (
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-[11px] text-[#9CA3AF]">₨</span>
                  <input
                    type="number"
                    value={service.price}
                    onChange={e => updateServicePrice(service.id, e.target.value)}
                    placeholder={String(service.defaultPrice)}
                    className="w-24 px-2 py-1 text-[12px] font-bold bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-lg text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Custom Services */}
      <div className="space-y-3">
        <label className="text-[10px] font-black text-[#6B7280] dark:text-gray-400 uppercase tracking-widest">Custom Add-ons</label>

        {(data.customServices || []).map(cs => (
          <div key={cs.id} className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-white/3 border border-[#E5E7EB] dark:border-white/8">
            <span className="flex-1 text-[12px] font-semibold text-[#374151] dark:text-gray-300">{cs.name}</span>
            <span className="text-[12px] font-black text-[#22C55E]">₨{Number(cs.price || 0).toLocaleString()}</span>
            <button onClick={() => removeCustomService(cs.id)} className="text-[#9CA3AF] hover:text-[#EF4444] cursor-pointer transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        <div className="flex items-center gap-2">
          <input
            value={newServiceName}
            onChange={e => setNewServiceName(e.target.value)}
            placeholder="Service name…"
            className="flex-1 px-3 py-2.5 text-[12px] font-semibold bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
            onKeyDown={e => e.key === "Enter" && addCustomService()}
          />
          <input
            type="number"
            value={newServicePrice}
            onChange={e => setNewServicePrice(e.target.value)}
            placeholder="₨ Price"
            className="w-28 px-3 py-2.5 text-[12px] font-semibold bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
          />
          <button
            onClick={addCustomService}
            className="w-10 h-10 rounded-xl bg-[#4F46E5] hover:bg-indigo-700 text-white flex items-center justify-center shrink-0 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
