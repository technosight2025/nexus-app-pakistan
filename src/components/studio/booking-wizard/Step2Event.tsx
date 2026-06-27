import { CalendarDays, Building2, Users, Briefcase, Camera, Heart, Music, Star } from "lucide-react"
import type { BookingFormData } from "./types"

const EVENT_TYPES = [
  { id: "wedding", label: "Wedding", icon: Heart },
  { id: "engagement", label: "Engagement", icon: Star },
  { id: "mehndi", label: "Mehndi", icon: Music },
  { id: "corporate", label: "Corporate", icon: Briefcase },
  { id: "birthday", label: "Birthday", icon: Users },
  { id: "bridal-shoot", label: "Bridal Shoot", icon: Camera },
  { id: "product-launch", label: "Product Launch", icon: Building2 },
  { id: "other", label: "Other", icon: CalendarDays },
]

const SHIFTS = ["Baraat", "Walima", "Mehndi Night", "Full Day", "Half Day", "Custom"]

const CITIES = [
  "Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad",
  "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala"
]

interface Step2Props {
  data: BookingFormData
  onChange: (updates: Partial<BookingFormData>) => void
}

const inputCls = "w-full px-4 py-2.5 text-[13px] font-semibold bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
const labelCls = "text-[10px] font-black text-[#6B7280] dark:text-gray-400 uppercase tracking-widest"

export default function Step2Event({ data, onChange }: Step2Props) {
  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-[20px] md:text-[24px] font-black text-[#111827] dark:text-white">Event Details</h2>
        <p className="text-[13px] text-[#6B7280] dark:text-gray-400 mt-1">Tell us about the event type, date, and location.</p>
      </div>

      {/* Event Type Grid */}
      <div className="space-y-2">
        <label className={labelCls}>Event Type *</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {EVENT_TYPES.map(et => {
            const isActive = data.eventType === et.id
            return (
              <button
                key={et.id}
                onClick={() => onChange({ eventType: et.id })}
                className={`flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border-2 cursor-pointer transition-all ${
                  isActive
                    ? "border-[#4F46E5] bg-[#EEF2FF] dark:bg-indigo-500/10"
                    : "border-[#E5E7EB] dark:border-white/8 bg-white dark:bg-[#111118] hover:border-[#4F46E5]/40 hover:shadow-sm"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? "bg-[#4F46E5]" : "bg-[#F8FAFC] dark:bg-white/5"}`}>
                  <et.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-[#9CA3AF]"}`} />
                </div>
                <span className={`text-[11px] font-black ${isActive ? "text-[#4F46E5]" : "text-[#6B7280] dark:text-gray-400"}`}>{et.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Date + Shift */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className={labelCls}>Event Date *</label>
          <input
            type="date"
            value={data.eventDate}
            onChange={e => onChange({ eventDate: e.target.value })}
            className={inputCls}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="space-y-1.5">
          <label className={labelCls}>Shift / Occasion *</label>
          <select
            value={data.shift}
            onChange={e => onChange({ shift: e.target.value })}
            className={inputCls}
          >
            <option value="">Select shift…</option>
            {SHIFTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Guest Count */}
      <div className="space-y-1.5">
        <label className={labelCls}>Estimated Guest Count</label>
        <div className="flex flex-wrap gap-2">
          {["50-100", "100-200", "200-400", "400-600", "600-1000", "1000+"].map(r => (
            <button
              key={r}
              onClick={() => onChange({ guestCount: r })}
              className={`px-4 py-2 rounded-xl text-[11px] font-black cursor-pointer border transition-all ${
                data.guestCount === r
                  ? "bg-[#4F46E5] text-white border-[#4F46E5]"
                  : "bg-white dark:bg-[#111118] border-[#E5E7EB] dark:border-white/10 text-[#6B7280] hover:border-[#4F46E5] hover:text-[#4F46E5]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Venue */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className={labelCls}>Venue Name</label>
          <input
            type="text"
            value={data.venueName}
            onChange={e => onChange({ venueName: e.target.value })}
            placeholder="e.g. Pearl Continental Hotel"
            className={inputCls}
          />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Venue City *</label>
          <select
            value={data.venueCity}
            onChange={e => onChange({ venueCity: e.target.value })}
            className={inputCls}
          >
            <option value="">Select city…</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
    </div>
  )
}
