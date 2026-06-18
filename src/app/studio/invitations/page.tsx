"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { 
  QrCode, Mail, Users, FileText, CheckCircle, BarChart3,
  Calendar, Check, Plus, Edit3, Eye, Copy, ArrowUpRight,
  TrendingUp, ShieldCheck, Heart, AlertCircle
} from "lucide-react"

export default function InvitationsPage() {
  const [activeTab, setActiveTab] = useState<"builder" | "guests" | "scanner" | "analytics">("builder")
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  // Mock guest list
  const guests = [
    { id: "GST-201", name: "Zahid Qureshi", phone: "+92 300 1234567", rsvp: "Attending", guests: 3, checkin: "Yes", time: "08:15 PM" },
    { id: "GST-202", name: "Dr. Farhan Shah", phone: "+92 321 9876543", rsvp: "Attending", guests: 2, checkin: "No", time: "-" },
    { id: "GST-203", name: "Mariam Mukhtar", phone: "+92 333 4567890", rsvp: "Declined", guests: 0, checkin: "No", time: "-" },
    { id: "GST-204", name: "Aftab & Family", phone: "+92 345 5678901", rsvp: "Pending", guests: 5, checkin: "No", time: "-" }
  ]

  // Mock template options
  const templates = [
    { id: "TMP-1", name: "Emerald Royale", type: "Traditional Pakistani", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=200" },
    { id: "TMP-2", name: "Festive Crimson Floral", type: "Modern Vibrant", img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=200" },
    { id: "TMP-3", name: "Classic Gold Minimalist", type: "Clean & Elegant", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=200" }
  ]

  const handleCopyLink = (index: number) => {
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#ECE7DF] dark:border-white/10 pb-5">
        <div>
          <h1 className="text-[26px] font-black text-gray-950 dark:text-white leading-tight font-serif flex items-center gap-2">
            Invitations Pro <QrCode className="w-6 h-6 text-[#0F5B3E]" />
          </h1>
          <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1 font-semibold">
            Build responsive digital wedding invitations, track RSVPs, manage guest lists, and execute QR code guest check-ins.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button className="px-3.5 py-1.5 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white rounded-[10px] text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
            <Plus className="w-3.5 h-3.5" /> New Invitation
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-[12px] border border-transparent dark:border-white/10 w-fit">
        <button 
          onClick={() => setActiveTab("builder")}
          className={`px-4 py-1.5 rounded-[9px] text-[12px] font-bold transition-all ${
            activeTab === "builder" 
              ? "bg-white dark:bg-white/10 text-gray-950 dark:text-white shadow-xs" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
          }`}
        >
          Invitation Builder
        </button>
        <button 
          onClick={() => setActiveTab("guests")}
          className={`px-4 py-1.5 rounded-[9px] text-[12px] font-bold transition-all ${
            activeTab === "guests" 
              ? "bg-white dark:bg-white/10 text-gray-950 dark:text-white shadow-xs" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
          }`}
        >
          RSVP & Guest List
        </button>
        <button 
          onClick={() => setActiveTab("scanner")}
          className={`px-4 py-1.5 rounded-[9px] text-[12px] font-bold transition-all ${
            activeTab === "scanner" 
              ? "bg-white dark:bg-white/10 text-gray-950 dark:text-white shadow-xs" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
          }`}
        >
          QR Check-In Scanner
        </button>
        <button 
          onClick={() => setActiveTab("analytics")}
          className={`px-4 py-1.5 rounded-[9px] text-[12px] font-bold transition-all ${
            activeTab === "analytics" 
              ? "bg-white dark:bg-white/10 text-gray-950 dark:text-white shadow-xs" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
          }`}
        >
          Analytics
        </button>
      </div>

      {/* Tab contents */}
      {activeTab === "builder" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Card Details Editor */}
          <Card className="lg:col-span-2 p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-3">
              <h3 className="text-[13.5px] font-bold text-gray-950 dark:text-white">Active Invitation Card</h3>
              <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 rounded-lg">Active (RSVP Enabled)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 text-[11.5px] font-bold text-gray-700 dark:text-gray-300">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 uppercase">Event Title</span>
                <input type="text" defaultValue="Ayesha & Hamza Wedding" className="w-full px-3.5 py-2 bg-gray-50 dark:bg-white/5 border border-[#ECE7DF] dark:border-white/10 rounded-lg text-gray-950 dark:text-white focus:outline-none focus:ring-1.5 focus:ring-[#0F5B3E]" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 uppercase">Venue Location</span>
                <input type="text" defaultValue="Serena Hotel, Islamabad" className="w-full px-3.5 py-2 bg-gray-50 dark:bg-white/5 border border-[#ECE7DF] dark:border-white/10 rounded-lg text-gray-950 dark:text-white focus:outline-none focus:ring-1.5 focus:ring-[#0F5B3E]" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 uppercase">Event Date</span>
                <input type="text" defaultValue="May 25, 2025" className="w-full px-3.5 py-2 bg-gray-50 dark:bg-white/5 border border-[#ECE7DF] dark:border-white/10 rounded-lg text-gray-950 dark:text-white focus:outline-none focus:ring-1.5 focus:ring-[#0F5B3E]" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 uppercase">RSVP Deadline</span>
                <input type="text" defaultValue="May 18, 2025" className="w-full px-3.5 py-2 bg-gray-50 dark:bg-white/5 border border-[#ECE7DF] dark:border-white/10 rounded-lg text-gray-950 dark:text-white focus:outline-none focus:ring-1.5 focus:ring-[#0F5B3E]" />
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-white/5 text-[11px] font-bold">
              <span className="text-gray-400">Shareable Digital Card Link:</span>
              <div className="flex items-center gap-2">
                <code className="px-2.5 py-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[6px] text-gray-600 dark:text-gray-400 text-[10.5px]">https://nexus.pk/invite/ayesha-hamza</code>
                <button 
                  onClick={() => handleCopyLink(0)}
                  className="px-2.5 py-1 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg text-[10.5px]"
                >
                  {copiedIndex === 0 ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </div>
          </Card>

          {/* Templates Side Panel */}
          <Card className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs space-y-4">
            <h3 className="text-[13.5px] font-bold text-gray-950 dark:text-white">Card Templates</h3>
            
            <div className="space-y-3">
              {templates.map(tmp => (
                <div key={tmp.id} className="p-2 bg-gray-50 dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/5 rounded-xl flex items-center gap-3.5 cursor-pointer hover:border-[#0F5B3E]/50 transition-all">
                  <img src={tmp.img} className="w-14 h-14 rounded-lg object-cover border border-gray-200 dark:border-white/10" alt="Temp" />
                  <div className="text-left">
                    <h4 className="text-[11.5px] font-extrabold text-gray-950 dark:text-white leading-tight">{tmp.name}</h4>
                    <span className="text-[9.5px] text-gray-400 mt-0.5">{tmp.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === "guests" && (
        <Card className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs">
          <div className="flex items-center justify-between mb-4.5">
            <h3 className="text-[13.5px] font-bold text-gray-950 dark:text-white">RSVP Responses & Guest List</h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400">Sort by RSVP:</span>
              <select className="px-2 py-1 bg-white dark:bg-white/5 border border-[#ECE7DF] dark:border-white/10 rounded-lg text-[10.5px] font-bold text-gray-700 dark:text-gray-300">
                <option>All Responses</option>
                <option>Attending Only</option>
                <option>Declined Only</option>
                <option>Pending Only</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11.5px] font-semibold text-gray-700 dark:text-gray-300">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/5 text-gray-400 uppercase text-[9px] tracking-wider font-extrabold">
                  <th className="py-2.5 pb-2">Guest Identifier</th>
                  <th className="py-2.5 pb-2">Phone Number</th>
                  <th className="py-2.5 pb-2">RSVP Status</th>
                  <th className="py-2.5 pb-2 text-center">Add. Guests</th>
                  <th className="py-2.5 pb-2 text-right">Checked In</th>
                  <th className="py-2.5 pb-2 text-right">Check-In Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {guests.map(guest => (
                  <tr key={guest.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors">
                    <td className="py-3 font-bold text-gray-950 dark:text-white">{guest.name}</td>
                    <td className="py-3 text-gray-500 dark:text-gray-400">{guest.phone}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-[6px] text-[9.5px] font-bold ${
                        guest.rsvp === "Attending"
                          ? "text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : guest.rsvp === "Declined"
                          ? "text-rose-700 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400"
                          : "text-amber-700 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400"
                      }`}>
                        {guest.rsvp}
                      </span>
                    </td>
                    <td className="py-3 text-center">{guest.guests}</td>
                    <td className="py-3 text-right">
                      <span className={`inline-block px-2 py-0.5 rounded-[6px] text-[9.5px] font-bold ${
                        guest.checkin === "Yes" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-500"
                      }`}>
                        {guest.checkin === "Yes" ? "Checked In" : "Pending"}
                      </span>
                    </td>
                    <td className="py-3 text-right text-gray-400 dark:text-gray-500">{guest.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === "scanner" && (
        <Card className="p-6 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs max-w-lg mx-auto text-center space-y-5">
          <div className="w-12 h-12 rounded-full bg-[#0F5B3E]/10 text-[#0F5B3E] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-[15px] text-gray-950 dark:text-white">QR Code Check-In Scanner</h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Scan the QR code present on the guest invitation PDF card to verify their RSVP and record check-in status.</p>
          </div>

          <div className="p-8 bg-gray-50 dark:bg-black/30 border border-dashed border-gray-200 dark:border-white/10 rounded-2xl relative flex flex-col items-center justify-center gap-3">
            <div className="w-40 h-40 border-2 border-emerald-500 dark:border-emerald-400 rounded-xl relative overflow-hidden flex items-center justify-center">
              {/* Scan target box indicator */}
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <QrCode className="w-24 h-24 text-gray-300 dark:text-gray-600 opacity-60" />
            </div>
            <span className="text-[10px] text-gray-400 font-semibold">Simulating Camera Input...</span>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white rounded-lg text-xs font-bold transition-all">
              Choose Image File
            </button>
            <button className="flex-1 py-2 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white rounded-lg text-xs font-bold transition-all">
              Initialize Camera
            </button>
          </div>
        </Card>
      )}

      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs h-[300px] flex flex-col justify-between">
            <div>
              <h3 className="text-[13.5px] font-bold text-gray-950 dark:text-white">RSVP Confirmation Timeline</h3>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Visits vs confirmed RSVPs weekly</p>
            </div>

            <div className="relative w-full h-[160px] mt-4">
              <div className="absolute inset-x-0 bottom-6 top-2 flex flex-col justify-between">
                <div className="w-full border-t border-dashed border-gray-200 dark:border-white/10" />
                <div className="w-full border-t border-dashed border-gray-200 dark:border-white/10" />
                <div className="w-full border-t border-dashed border-gray-200 dark:border-white/10" />
              </div>

              {/* Bar charts simulation */}
              <div className="absolute inset-x-8 bottom-6 top-2 flex justify-around items-end">
                <div className="flex items-end gap-1 w-8">
                  <div className="w-3 bg-[#E11D48] rounded-t-sm" style={{ height: "45%" }} />
                  <div className="w-3 bg-[#0F5B3E] rounded-t-sm" style={{ height: "30%" }} />
                </div>
                <div className="flex items-end gap-1 w-8">
                  <div className="w-3 bg-[#E11D48] rounded-t-sm" style={{ height: "65%" }} />
                  <div className="w-3 bg-[#0F5B3E] rounded-t-sm" style={{ height: "55%" }} />
                </div>
                <div className="flex items-end gap-1 w-8">
                  <div className="w-3 bg-[#E11D48] rounded-t-sm" style={{ height: "85%" }} />
                  <div className="w-3 bg-[#0F5B3E] rounded-t-sm" style={{ height: "70%" }} />
                </div>
              </div>

              <div className="w-full flex justify-between text-[9px] font-bold text-gray-400 pl-8 absolute bottom-0">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs h-[300px] flex flex-col justify-between">
            <h3 className="text-[13.5px] font-bold text-gray-950 dark:text-white">Analytics Summary</h3>
            
            <div className="flex-1 flex flex-col justify-center gap-3 my-2">
              <div className="flex justify-between items-center text-[11px] font-bold">
                <span className="text-gray-500 dark:text-gray-400">Total Invitation Views</span>
                <span className="text-gray-950 dark:text-white">1,480 clicks</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-bold pt-2.5 border-t border-gray-100 dark:border-white/5">
                <span className="text-gray-500 dark:text-gray-400">RSVP Conversion Rate</span>
                <span className="text-[#0F5B3E] dark:text-emerald-400">82.5%</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-bold pt-2.5 border-t border-gray-100 dark:border-white/5">
                <span className="text-gray-500 dark:text-gray-400">Average guests per invite</span>
                <span className="text-gray-950 dark:text-white">3.2 guests</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-bold pt-2.5 border-t border-gray-100 dark:border-white/5">
                <span className="text-gray-500 dark:text-gray-400">Total Checked-In Guests</span>
                <span className="text-[#D9467A]">84 verified</span>
              </div>
            </div>

            <button className="w-full py-1.5 border border-[#ECE7DF] dark:border-white/10 rounded-[10px] text-[11px] font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 transition-colors">
              PDF Analytics Report
            </button>
          </Card>
        </div>
      )}

    </div>
  )
}
