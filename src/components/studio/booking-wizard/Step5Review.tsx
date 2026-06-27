import { User, CalendarDays, Users, DollarSign, FileText, Edit2 } from "lucide-react"
import type { BookingFormData } from "./types"

interface Step5Props {
  data: BookingFormData
  onJumpTo: (step: number) => void
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  "wedding": "Wedding", "engagement": "Engagement", "mehndi": "Mehndi",
  "corporate": "Corporate Event", "birthday": "Birthday Party",
  "bridal-shoot": "Bridal Shoot", "product-launch": "Product Launch", "other": "Other",
}

const TEAM_NAMES: Record<string, string> = {
  U: "Usman Raza", A: "Aisha Noor", F: "Faisal Khan",
  K: "Kamran Ali", S: "Sara Tariq", Z: "Zain Ahmed",
}

function SectionCard({
  title, icon: Icon, step, onEdit, children,
}: {
  title: string; icon: React.ElementType; step: number; onEdit: (step: number) => void; children: React.ReactNode
}) {
  return (
    <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#F3F4F6] dark:border-white/5 bg-[#F8FAFC] dark:bg-white/3">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-[#4F46E5]" />
          <span className="text-[11px] font-black text-[#111827] dark:text-white uppercase tracking-widest">{title}</span>
        </div>
        <button
          onClick={() => onEdit(step)}
          className="flex items-center gap-1 text-[10px] font-black text-[#4F46E5] hover:underline cursor-pointer"
        >
          <Edit2 className="w-3 h-3" /> Edit
        </button>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5 border-b border-[#F9FAFB] dark:border-white/3 last:border-0">
      <span className="text-[11px] text-[#9CA3AF] font-semibold shrink-0">{label}</span>
      <span className="text-[12px] font-bold text-[#111827] dark:text-white text-right">{value || "—"}</span>
    </div>
  )
}

export default function Step5Review({ data, onJumpTo }: Step5Props) {
  const clientName = data.clientMode === "existing"
    ? data.selectedClient?.name || "—"
    : data.newClient?.name || "—"

  const selectedServices = data.services.filter(s => s.selected)
  const total = Number(data.totalAmount) || 0
  const advance = Number(data.advanceAmount) || 0
  const balance = total - advance

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[20px] md:text-[24px] font-black text-[#111827] dark:text-white">Review & Confirm</h2>
        <p className="text-[13px] text-[#6B7280] dark:text-gray-400 mt-1">Check all details before creating the booking.</p>
      </div>

      {/* Client */}
      <SectionCard title="Client" icon={User} step={1} onEdit={onJumpTo}>
        <Row label="Name" value={clientName} />
        {data.clientMode === "existing" && data.selectedClient && (
          <>
            <Row label="Type" value={data.selectedClient.type} />
            <Row label="City" value={data.selectedClient.city} />
            <Row label="Phone" value={data.selectedClient.phone} />
          </>
        )}
        {data.clientMode === "new" && (
          <>
            <Row label="Type" value={data.newClient?.type || "—"} />
            <Row label="Phone" value={data.newClient?.phone || "—"} />
            <Row label="Email" value={data.newClient?.email || "—"} />
            <Row label="City" value={data.newClient?.city || "—"} />
          </>
        )}
      </SectionCard>

      {/* Event */}
      <SectionCard title="Event Details" icon={CalendarDays} step={2} onEdit={onJumpTo}>
        <Row label="Event Type" value={EVENT_TYPE_LABELS[data.eventType] || data.eventType || "—"} />
        <Row label="Date" value={data.eventDate ? new Date(data.eventDate).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" }) : "—"} />
        <Row label="Shift" value={data.shift || "—"} />
        <Row label="Guest Count" value={data.guestCount || "—"} />
        <Row label="Venue" value={[data.venueName, data.venueCity].filter(Boolean).join(", ") || "—"} />
      </SectionCard>

      {/* Team & Services */}
      <SectionCard title="Team & Services" icon={Users} step={3} onEdit={onJumpTo}>
        <Row
          label="Team"
          value={(data.teamMembers || []).map(id => TEAM_NAMES[id] || id).join(", ") || "—"}
        />
        {selectedServices.length > 0 && (
          <div className="pt-2">
            <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest mb-2">Services</div>
            <div className="space-y-1.5">
              {selectedServices.map(s => (
                <div key={s.id} className="flex justify-between">
                  <span className="text-[12px] text-[#374151] dark:text-gray-300">{s.name}</span>
                  <span className="text-[12px] font-black text-[#4F46E5]">₨{Number(s.price || s.defaultPrice).toLocaleString()}</span>
                </div>
              ))}
              {(data.customServices || []).map(cs => (
                <div key={cs.id} className="flex justify-between">
                  <span className="text-[12px] text-[#374151] dark:text-gray-300">{cs.name}</span>
                  <span className="text-[12px] font-black text-[#4F46E5]">₨{Number(cs.price || 0).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionCard>

      {/* Pricing */}
      <SectionCard title="Pricing" icon={DollarSign} step={4} onEdit={onJumpTo}>
        <Row label="Package" value={(data.packageName || "—").charAt(0).toUpperCase() + (data.packageName || "").slice(1)} />
        <Row label="Total Amount" value={total > 0 ? `₨${total.toLocaleString()}` : "—"} />
        <Row label="Advance Paid" value={advance > 0 ? `₨${advance.toLocaleString()}` : "—"} />
        <Row label="Balance Due" value={balance > 0 ? `₨${balance.toLocaleString()}` : "—"} />
        {data.paymentDueDate && <Row label="Due Date" value={new Date(data.paymentDueDate).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })} />}
        {data.notes && <Row label="Notes" value={data.notes} />}
      </SectionCard>

      {/* Confirmation box */}
      <div className="bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-900/20 dark:to-[#111118] border border-[#4F46E5]/20 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#4F46E5] flex items-center justify-center shrink-0 mt-0.5">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-[13px] font-black text-[#111827] dark:text-white">Ready to create this booking?</div>
            <div className="text-[11px] text-[#6B7280] dark:text-gray-400 mt-1">
              Clicking <strong>Confirm Booking</strong> will add this booking to your dashboard. You can edit it at any time from the Bookings page.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
