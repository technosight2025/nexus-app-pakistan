import { useState } from "react"
import { Search, Plus, User, Phone, Mail, MapPin, ChevronDown, Check, X } from "lucide-react"
import type { BookingFormData } from "./types"

const EXISTING_CLIENTS = [
  { id: "CL-001", name: "Ayesha Khan", type: "Bride", city: "Lahore", phone: "+92-300-1234567", email: "ayesha@gmail.com", initials: "AK", color: "bg-indigo-500" },
  { id: "CL-002", name: "Hassan Ali", type: "Groom", city: "Islamabad", phone: "+92-321-9876543", email: "hassan@hotmail.com", initials: "HA", color: "bg-emerald-500" },
  { id: "CL-003", name: "Sara Imran", type: "Client", city: "Karachi", phone: "+92-333-5551234", email: "sara.imran@corp.pk", initials: "SI", color: "bg-sky-500" },
  { id: "CL-004", name: "Farhan Malik", type: "Corporate", city: "Lahore", phone: "+92-300-7890123", email: "farhan@techcorp.pk", initials: "FM", color: "bg-amber-500" },
  { id: "CL-005", name: "Nadia Hussain", type: "Bride", city: "Faisalabad", phone: "+92-311-4445678", email: "nadia@gmail.com", initials: "NH", color: "bg-rose-500" },
  { id: "CL-006", name: "Bilal Khan", type: "Corporate", city: "Karachi", phone: "+92-321-2223344", email: "bilal@brand.pk", initials: "BK", color: "bg-cyan-500" },
]

const CLIENT_TYPES = ["Bride", "Groom", "Couple", "Corporate", "Family", "Individual"]

interface Step1Props {
  data: BookingFormData
  onChange: (updates: Partial<BookingFormData>) => void
}

export default function Step1Client({ data, onChange }: Step1Props) {
  const [search, setSearch] = useState("")
  const [showNewForm, setShowNewForm] = useState(data.clientMode === "new")

  const filtered = EXISTING_CLIENTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase())
  )

  const selectClient = (client: typeof EXISTING_CLIENTS[0]) => {
    onChange({
      clientMode: "existing",
      selectedClientId: client.id,
      selectedClient: client,
    })
    setShowNewForm(false)
  }

  const openNewForm = () => {
    onChange({ clientMode: "new", selectedClientId: null, selectedClient: null })
    setShowNewForm(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[20px] md:text-[24px] font-black text-[#111827] dark:text-white">Who is this booking for?</h2>
        <p className="text-[13px] text-[#6B7280] dark:text-gray-400 mt-1">Select an existing client or add a new one.</p>
      </div>

      {/* Search existing */}
      {!showNewForm && (
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search existing clients…"
              className="w-full pl-10 pr-4 py-3 text-[13px] font-semibold bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
            />
          </div>

          <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
            {filtered.map(client => {
              const isSelected = data.selectedClientId === client.id
              return (
                <div
                  key={client.id}
                  onClick={() => selectClient(client)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#4F46E5] bg-[#EEF2FF] dark:bg-indigo-500/10"
                      : "border-[#E5E7EB] dark:border-white/8 bg-white dark:bg-[#111118] hover:border-[#4F46E5]/40 hover:shadow-sm"
                  }`}
                >
                  <div className={`w-11 h-11 rounded-2xl ${client.color} text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm`}>
                    {client.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-bold text-[#111827] dark:text-white">{client.name}</div>
                    <div className="text-[11px] text-[#9CA3AF]">{client.type} · {client.city}</div>
                    <div className="text-[10px] text-[#9CA3AF] mt-0.5">{client.phone}</div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#4F46E5] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
              )
            })}
            {filtered.length === 0 && (
              <div className="text-center py-8 text-[13px] text-[#9CA3AF]">No clients found for "{search}"</div>
            )}
          </div>

          <button
            onClick={openNewForm}
            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-[#4F46E5]/30 rounded-2xl text-[13px] font-bold text-[#4F46E5] hover:bg-[#EEF2FF] dark:hover:bg-indigo-500/10 hover:border-[#4F46E5] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New Client
          </button>
        </div>
      )}

      {/* New Client Form */}
      {showNewForm && (
        <div className="bg-[#F8FAFC] dark:bg-white/3 border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-black text-[#4F46E5] uppercase tracking-widest">New Client</span>
            <button
              onClick={() => { setShowNewForm(false); onChange({ clientMode: "existing" }) }}
              className="text-[#9CA3AF] hover:text-[#374151] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Full Name *", key: "name", icon: User, placeholder: "e.g. Ayesha Khan", type: "text" },
              { label: "Phone *", key: "phone", icon: Phone, placeholder: "+92-300-0000000", type: "tel" },
              { label: "Email", key: "email", icon: Mail, placeholder: "client@email.com", type: "email" },
              { label: "City", key: "city", icon: MapPin, placeholder: "e.g. Lahore", type: "text" },
            ].map(field => (
              <div key={field.key} className="space-y-1.5">
                <label className="text-[10px] font-black text-[#6B7280] dark:text-gray-400 uppercase tracking-widest">{field.label}</label>
                <div className="relative">
                  <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                  <input
                    type={field.type}
                    value={data.newClient?.[field.key as keyof typeof data.newClient] || ""}
                    onChange={e => onChange({ newClient: { ...data.newClient, [field.key]: e.target.value } })}
                    placeholder={field.placeholder}
                    className="w-full pl-10 pr-4 py-2.5 text-[12px] font-semibold bg-white dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-[#6B7280] dark:text-gray-400 uppercase tracking-widest">Client Type</label>
            <div className="flex flex-wrap gap-2">
              {CLIENT_TYPES.map(t => (
                <button
                  key={t}
                  onClick={() => onChange({ newClient: { ...data.newClient, type: t } })}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black cursor-pointer transition-all border ${
                    data.newClient?.type === t
                      ? "bg-[#4F46E5] text-white border-[#4F46E5]"
                      : "bg-white dark:bg-white/5 border-[#E5E7EB] dark:border-white/10 text-[#6B7280] hover:border-[#4F46E5] hover:text-[#4F46E5]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
