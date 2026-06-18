"use client"
import { useState } from "react"
import { Save, Bell, Lock, Store, Wallet, Phone } from "lucide-react"

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState("Zardozi Lehnga Boutique")
  const [location, setLocation] = useState("Gulberg III, Lahore")
  const [phone, setPhone] = useState("0300-1234567")
  const [whatsapp, setWhatsapp] = useState("0300-1234567")
  const [advance, setAdvance] = useState("50")
  const [notifications, setNotifications] = useState({ newBooking: true, payment: true, tryon: true, reminder: false })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black text-[#0A3B2A]">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your boutique preferences and account settings</p>
      </div>

      {/* Business Info */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#0A3B2A]/10 flex items-center justify-center"><Store className="w-4 h-4 text-[#0A3B2A]" /></div>
          <h3 className="text-sm font-black text-slate-900">Business Information</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: "Business Name", value: businessName, onChange: setBusinessName },
            { label: "Location / Address", value: location, onChange: setLocation },
          ].map((field, i) => (
            <div key={i}>
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">{field.label}</label>
              <input value={field.value} onChange={e => field.onChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#0A3B2A]/10 flex items-center justify-center"><Phone className="w-4 h-4 text-[#0A3B2A]" /></div>
          <h3 className="text-sm font-black text-slate-900">Contact Details</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Phone Number</label>
            <input value={phone} onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20" />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">WhatsApp Number</label>
            <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20" />
          </div>
        </div>
      </div>

      {/* Rental Policy */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#0A3B2A]/10 flex items-center justify-center"><Wallet className="w-4 h-4 text-[#0A3B2A]" /></div>
          <h3 className="text-sm font-black text-slate-900">Rental Policy</h3>
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Advance Payment Required (%)</label>
          <div className="flex items-center gap-3">
            <input type="range" min="0" max="100" step="5" value={advance} onChange={e => setAdvance(e.target.value)} className="flex-1 accent-[#0A3B2A]" />
            <span className="text-lg font-black text-[#0A3B2A] w-12 text-right">{advance}%</span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-2">Currently requiring {advance}% advance on booking confirmation.</p>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#0A3B2A]/10 flex items-center justify-center"><Bell className="w-4 h-4 text-[#0A3B2A]" /></div>
          <h3 className="text-sm font-black text-slate-900">Notifications</h3>
        </div>
        <div className="space-y-3">
          {[
            { key: "newBooking", label: "New Booking Requests", desc: "Alert when a customer confirms a rental" },
            { key: "payment", label: "Payment Received", desc: "Alert on advance and final payment receipt" },
            { key: "tryon", label: "AI Try-On Sessions", desc: "Daily digest of Try-On studio activity" },
            { key: "reminder", label: "Return Date Reminders", desc: "Remind customers 1 day before return" },
          ].map(n => (
            <div key={n.key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-bold text-slate-900">{n.label}</p>
                <p className="text-xs text-slate-400 font-medium">{n.desc}</p>
              </div>
              <button onClick={() => setNotifications(prev => ({ ...prev, [n.key]: !prev[n.key as keyof typeof prev] }))}
                className={`w-11 h-6 rounded-full transition-colors relative ${notifications[n.key as keyof typeof notifications] ? "bg-[#0A3B2A]" : "bg-slate-200"}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${notifications[n.key as keyof typeof notifications] ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button onClick={handleSave}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all ${
          saved ? "bg-emerald-600 text-white" : "bg-[#0A3B2A] text-white hover:bg-[#0A3B2A]/90"
        }`}>
        <Save className="w-4 h-4" />
        {saved ? "Saved!" : "Save Settings"}
      </button>
    </div>
  )
}
