import type { BookingFormData } from "./types"

const PACKAGES = [
  {
    id: "basic",
    name: "Basic",
    badge: "",
    color: "border-[#E5E7EB] dark:border-white/8",
    activeColor: "border-[#4F46E5] bg-[#EEF2FF] dark:bg-indigo-500/10",
    price: 45000,
    features: ["4-hour coverage", "1 photographer", "200 edited photos", "Online gallery"],
  },
  {
    id: "standard",
    name: "Standard",
    badge: "Popular",
    color: "border-[#E5E7EB] dark:border-white/8",
    activeColor: "border-[#4F46E5] bg-[#EEF2FF] dark:bg-indigo-500/10",
    price: 85000,
    features: ["8-hour coverage", "2 photographers", "500 edited photos", "1 highlight video reel", "Online gallery + USB"],
  },
  {
    id: "premium",
    name: "Premium",
    badge: "Best Value",
    color: "border-[#E5E7EB] dark:border-white/8",
    activeColor: "border-[#4F46E5] bg-[#EEF2FF] dark:bg-indigo-500/10",
    price: 150000,
    features: ["Full-day coverage", "3-person team", "Unlimited photos", "Cinematic film", "Drone footage", "Printed album"],
  },
  {
    id: "custom",
    name: "Custom",
    badge: "",
    color: "border-dashed border-[#D1D5DB] dark:border-white/10",
    activeColor: "border-[#4F46E5] bg-[#EEF2FF] dark:bg-indigo-500/10",
    price: 0,
    features: ["Tailored package", "You set the price", "Flexible terms"],
  },
]

interface Step4Props {
  data: BookingFormData
  onChange: (updates: Partial<BookingFormData>) => void
}

const inputCls = "w-full px-4 py-2.5 text-[13px] font-semibold bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
const labelCls = "text-[10px] font-black text-[#6B7280] dark:text-gray-400 uppercase tracking-widest"

export default function Step4Pricing({ data, onChange }: Step4Props) {
  const total = Number(data.totalAmount) || 0
  const advance = Number(data.advanceAmount) || 0
  const balance = total - advance

  const selectPackage = (pkg: typeof PACKAGES[0]) => {
    onChange({
      packageName: pkg.id,
      totalAmount: pkg.price > 0 ? String(pkg.price) : data.totalAmount,
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[20px] md:text-[24px] font-black text-[#111827] dark:text-white">Package & Pricing</h2>
        <p className="text-[13px] text-[#6B7280] dark:text-gray-400 mt-1">Choose a package and set payment terms.</p>
      </div>

      {/* Package Cards */}
      <div className="space-y-2">
        <label className={labelCls}>Select Package *</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PACKAGES.map(pkg => {
            const isActive = data.packageName === pkg.id
            return (
              <div
                key={pkg.id}
                onClick={() => selectPackage(pkg)}
                className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  isActive ? pkg.activeColor : `${pkg.color} bg-white dark:bg-[#111118] hover:border-[#4F46E5]/40 hover:shadow-sm`
                }`}
              >
                {pkg.badge && (
                  <span className="absolute top-3 right-3 text-[8px] font-black text-[#4F46E5] bg-[#EEF2FF] px-1.5 py-0.5 rounded-full uppercase tracking-widest">
                    {pkg.badge}
                  </span>
                )}
                <div className="flex items-baseline gap-1 mb-3">
                  <span className={`text-[17px] font-black ${isActive ? "text-[#4F46E5]" : "text-[#111827] dark:text-white"}`}>{pkg.name}</span>
                  {pkg.price > 0 && (
                    <span className="text-[12px] font-bold text-[#9CA3AF] ml-2">₨{pkg.price.toLocaleString()}</span>
                  )}
                </div>
                <ul className="space-y-1">
                  {pkg.features.map(f => (
                    <li key={f} className="text-[11px] text-[#6B7280] dark:text-gray-400 flex items-center gap-1.5">
                      <span className={`w-1 h-1 rounded-full shrink-0 ${isActive ? "bg-[#4F46E5]" : "bg-[#9CA3AF]"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* Pricing Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className={labelCls}>Total Amount (₨) *</label>
          <input
            type="number"
            value={data.totalAmount}
            onChange={e => onChange({ totalAmount: e.target.value })}
            placeholder="e.g. 120000"
            className={inputCls}
          />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Advance Payment (₨) *</label>
          <input
            type="number"
            value={data.advanceAmount}
            onChange={e => onChange({ advanceAmount: e.target.value })}
            placeholder="e.g. 50000"
            className={inputCls}
          />
        </div>
      </div>

      {/* Balance Summary */}
      {(total > 0 || advance > 0) && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total", value: `₨${total.toLocaleString()}`, color: "text-[#111827] dark:text-white" },
            { label: "Advance", value: `₨${advance.toLocaleString()}`, color: "text-[#22C55E]" },
            { label: "Balance Due", value: `₨${balance.toLocaleString()}`, color: balance > 0 ? "text-[#F59E0B]" : "text-[#22C55E]" },
          ].map(item => (
            <div key={item.label} className="bg-[#F8FAFC] dark:bg-white/3 rounded-xl p-3 text-center border border-[#E5E7EB] dark:border-white/8">
              <div className={`text-[15px] font-black ${item.color}`}>{item.value}</div>
              <div className="text-[9px] font-black text-[#9CA3AF] uppercase tracking-widest mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Due Date */}
      <div className="space-y-1.5">
        <label className={labelCls}>Balance Payment Due Date</label>
        <input
          type="date"
          value={data.paymentDueDate}
          onChange={e => onChange({ paymentDueDate: e.target.value })}
          className={inputCls}
        />
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <label className={labelCls}>Internal Notes</label>
        <textarea
          value={data.notes}
          onChange={e => onChange({ notes: e.target.value })}
          rows={3}
          placeholder="Special instructions, client preferences, or internal reminders…"
          className="w-full px-4 py-3 text-[13px] font-semibold bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all resize-none"
        />
      </div>
    </div>
  )
}
