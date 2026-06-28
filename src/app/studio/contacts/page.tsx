"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Plus, Search, Star, Phone, Mail, MessageSquare,
  Calendar, DollarSign, MoreVertical, Filter, Users,
  TrendingUp, Heart, Clock, Briefcase, Home
} from "lucide-react"
import { getContacts } from "@/lib/mock-db"

const STATUS_STYLES: Record<string, string> = {
  "Active": "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  "Pending": "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  "Lead": "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
  "Inactive": "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400",
}

export default function CRMPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const CONTACTS = getContacts()
  const [selectedContact, setSelectedContact] = useState<ReturnType<typeof getContacts>[0] | null>(null)

  const filters = ["All", "Clients", "Vendors", "Freelancers", "Leads", "VIP"]

  const filtered = CONTACTS.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
    
    // Custom filter logic
    let matchesFilter = false
    if (filter === "All") matchesFilter = true
    else if (filter === "Clients") matchesFilter = ["Bride", "Groom", "Corporate", "Client"].includes(c.type)
    else if (filter === "Vendors") matchesFilter = c.type === "Vendor"
    else if (filter === "Freelancers") matchesFilter = c.type === "Freelancer"
    else if (filter === "Leads") matchesFilter = c.status === "Lead"
    else if (filter === "VIP") matchesFilter = c.tags.includes("VIP")
    
    return matchesSearch && matchesFilter
  })

  const totalRevenue = CONTACTS.filter(c => !["Vendor", "Freelancer"].includes(c.type)).reduce((s, c) => s + c.totalValue, 0)
  const totalContacts = CONTACTS.length

  return (
    <div className="space-y-5 md:space-y-6">

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: "Total Contacts", value: totalContacts, color: "text-[#4F46E5]", bg: "bg-[#EEF2FF] dark:bg-indigo-500/10" },
          { label: "Clients", value: CONTACTS.filter(c => !["Vendor", "Freelancer"].includes(c.type)).length, color: "text-[#22C55E]", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
          { label: "Vendors & Pros", value: CONTACTS.filter(c => ["Vendor", "Freelancer"].includes(c.type)).length, color: "text-[#F59E0B]", bg: "bg-amber-50 dark:bg-amber-500/10" },
          { label: "Client LTV", value: `₨${(totalRevenue/1000).toFixed(0)}k`, color: "text-[#0EA5E9]", bg: "bg-sky-50 dark:bg-sky-500/10" },
        ].map(c => (
          <div key={c.label} className={`${c.bg} rounded-xl md:rounded-2xl p-4 md:p-5`}>
            <div className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] mb-1">{c.label}</div>
            <div className={`text-[22px] font-black ${c.color} leading-none`}>{c.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* LEFT: Client list */}
        <div className="xl:col-span-2 space-y-4">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search contacts..."
                className="w-full pl-9 pr-4 py-2 text-[12px] font-semibold bg-white dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black transition-all cursor-pointer ${
                    filter === f ? "bg-[#4F46E5] text-white" : "bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 text-[#9CA3AF] hover:bg-[#EEF2FF] hover:text-[#4F46E5] hover:border-[#4F46E5]"
                  }`}
                >
                  {f}
                </button>
              ))}
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4F46E5] text-white rounded-xl text-[9px] font-black hover:bg-indigo-700 transition-all cursor-pointer">
                <Plus className="w-3 h-3" /> Add Contact
              </button>
            </div>
          </div>

          {/* Client Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {filtered.map(contact => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`bg-white dark:bg-[#111118] border rounded-2xl p-5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all ${
                  selectedContact?.id === contact.id 
                    ? "border-[#4F46E5] ring-2 ring-[#4F46E5]/20" 
                    : "border-[#E5E7EB] dark:border-white/8"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl ${contact.color} text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm`}>
                      {contact.initials}
                    </div>
                    <div>
                      <div className="text-[13px] font-black text-[#111827] dark:text-white">{contact.name}</div>
                      <div className="text-[10px] text-[#9CA3AF]">{contact.type} · {contact.city}</div>
                    </div>
                  </div>
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${STATUS_STYLES[contact.status] || STATUS_STYLES['Active']}`}>{contact.status}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {contact.tags.map(tag => (
                    <span key={tag} className="text-[8px] font-black text-[#4F46E5] bg-[#EEF2FF] dark:bg-indigo-500/10 px-1.5 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#F3F4F6] dark:border-white/5">
                  <div className="text-center">
                    <div className="text-[13px] font-black text-[#111827] dark:text-white">{contact.bookings}</div>
                    <div className="text-[8px] text-[#9CA3AF] font-black uppercase">{["Vendor", "Freelancer"].includes(contact.type) ? "Jobs" : "Bookings"}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] font-black text-[#22C55E]">₨{(contact.totalValue/1000).toFixed(0)}k</div>
                    <div className="text-[8px] text-[#9CA3AF] font-black uppercase">{["Vendor", "Freelancer"].includes(contact.type) ? "Payout" : "Value"}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[12px] text-amber-500">{"★".repeat(contact.rating || 0)}{!contact.rating && <span className="text-[#9CA3AF] text-[9px]">No rating</span>}</div>
                    <div className="text-[8px] text-[#9CA3AF] font-black uppercase">Rating</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Client Detail Panel */}
        <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl overflow-hidden xl:sticky xl:top-[80px] h-fit">
          {!selectedContact ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-6">
              <Users className="w-10 h-10 text-[#E5E7EB] dark:text-white/10 mb-3" />
              <div className="text-[12px] font-bold text-[#9CA3AF]">Select a contact to view their profile</div>
            </div>
          ) : (
            <>
              {/* Profile Header */}
              <div className="bg-gradient-to-br from-[#EEF2FF] to-white dark:from-indigo-900/20 dark:to-[#111118] p-5 border-b border-[#E5E7EB] dark:border-white/8">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${selectedContact.color} text-white font-black text-base flex items-center justify-center shadow-sm`}>
                      {selectedContact.initials}
                    </div>
                    <div>
                      <div className="text-[14px] font-black text-[#111827] dark:text-white">{selectedContact.name}</div>
                      <div className="text-[10px] text-[#9CA3AF]">{selectedContact.type} · {selectedContact.city}</div>
                      <div className="text-[9px] text-[#9CA3AF]">Added {selectedContact.joined}</div>
                    </div>
                  </div>
                  <button className="text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer"><MoreVertical className="w-4 h-4" /></button>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#4F46E5] text-white rounded-xl text-[10px] font-black hover:bg-indigo-700 transition-colors cursor-pointer">
                    <MessageSquare className="w-3.5 h-3.5" /> Message
                  </button>
                  <button className="w-9 h-9 border border-[#E5E7EB] dark:border-white/10 rounded-xl flex items-center justify-center text-[#9CA3AF] hover:bg-[#EEF2FF] hover:text-[#4F46E5] transition-colors cursor-pointer">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 border border-[#E5E7EB] dark:border-white/10 rounded-xl flex items-center justify-center text-[#9CA3AF] hover:bg-[#EEF2FF] hover:text-[#4F46E5] transition-colors cursor-pointer">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-px bg-[#E5E7EB] dark:bg-white/8">
                {[
                  { label: ["Vendor", "Freelancer"].includes(selectedContact.type) ? "Jobs" : "Bookings", value: selectedContact.bookings },
                  { label: ["Vendor", "Freelancer"].includes(selectedContact.type) ? "Payout" : "Value", value: `₨${(selectedContact.totalValue/1000).toFixed(0)}k` },
                  { label: "Rating", value: selectedContact.rating ? `${selectedContact.rating}★` : "N/A" },
                ].map(s => (
                  <div key={s.label} className="bg-white dark:bg-[#111118] text-center py-3">
                    <div className="text-[16px] font-black text-[#111827] dark:text-white">{s.value}</div>
                    <div className="text-[8px] font-black text-[#9CA3AF] uppercase">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div className="p-4 border-b border-[#F3F4F6] dark:border-white/5 space-y-2">
                <div className="text-[9px] font-black text-[#9CA3AF] uppercase tracking-widest mb-2">Contact Info</div>
                <div className="flex items-center gap-2 text-[11px] text-[#374151] dark:text-gray-300">
                  <Mail className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" /> {selectedContact.email}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#374151] dark:text-gray-300">
                  <Phone className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" /> {selectedContact.phone}
                </div>
                {selectedContact.homeAddress && (
                  <div className="flex items-start gap-2 text-[11px] text-[#374151] dark:text-gray-300 pt-1">
                    <Home className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0 mt-0.5" /> {selectedContact.homeAddress}
                  </div>
                )}
                {selectedContact.businessAddress && (
                  <div className="flex items-start gap-2 text-[11px] text-[#374151] dark:text-gray-300 pt-1">
                    <Briefcase className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0 mt-0.5" /> {selectedContact.businessAddress}
                  </div>
                )}
              </div>

              {/* Activity Timeline */}
              <div className="p-4">
                <div className="text-[9px] font-black text-[#9CA3AF] uppercase tracking-widest mb-3">Activity Timeline</div>
                <div className="space-y-3">
                  {selectedContact.timeline.map((t, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-[#4F46E5]" />
                        {i < selectedContact.timeline.length - 1 && <div className="w-px h-6 bg-[#E5E7EB] dark:bg-white/10 mx-auto mt-0.5" />}
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-[#111827] dark:text-white leading-tight">{t.event}</div>
                        <div className="text-[9px] text-[#9CA3AF] mt-0.5">{t.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
