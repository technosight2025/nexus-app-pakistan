"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { 
  QrCode, Mail, Users, BarChart3, Plus, Download, Share2, 
  Send, CheckCircle2, Clock, XCircle, Search, Sparkles, AlertCircle
} from "lucide-react"

export default function InvitationsOSPage() {
  const [activeTab, setActiveTab] = useState<"builder" | "rsvp" | "whatsapp">("builder")
  
  // Custom Card Builder States
  const [groomName, setGroomName] = useState("Ahmed Raza")
  const [brideName, setBrideName] = useState("Fatima Ali")
  const [eventDate, setEventDate] = useState("2026-10-15")
  const [venueHall, setVenueHall] = useState("Royal Garden Banquet")
  const [cardTheme, setCardTheme] = useState<"gold" | "emerald" | "crimson">("gold")
  const [calligraphyFont, setCalligraphyFont] = useState("serif")

  // Mock RSVP data
  const [rsvps, setRsvps] = useState([
    { id: "R-901", name: "Kamran Khan", phone: "+92 300 1234567", count: 4, meal: "Mutton Pulao", status: "attending" },
    { id: "R-902", name: "Dr. Asma Bilal", phone: "+92 312 9876543", count: 2, meal: "Chicken Korma", status: "attending" },
    { id: "R-903", name: "Zia-ur-Rehman", phone: "+92 333 4567890", count: 5, meal: "Mutton Pulao", status: "tentative" },
    { id: "R-904", name: "Yousuf Adil", phone: "+92 321 8887776", count: 0, meal: "None", status: "declined" },
    { id: "R-905", name: "Mariam Usman", phone: "+92 345 5556667", count: 3, meal: "Vegetarian", status: "attending" }
  ])

  // Mock Broadcast Logs
  const broadcastStats = {
    totalSent: 350,
    delivered: 342,
    read: 298,
    replied: 215
  }

  const [searchTerm, setSearchTerm] = useState("")

  const filteredRsvps = rsvps.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.phone.includes(searchTerm)
  )

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-left">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#ECE7DF] pb-5">
        <div>
          <h1 className="text-2xl font-black text-gray-950 tracking-tight flex items-center gap-2">
            Invitations OS <QrCode className="w-6 h-6 text-[#0F5B3E]" />
          </h1>
          <p className="text-[12.5px] text-gray-500 mt-1 font-semibold">
            Design premium digital cards, coordinate guest RSVPs, and manage automated WhatsApp invitations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-1.5 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white rounded-[10px] text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
            <Plus className="w-3.5 h-3.5" /> Create New Campaign
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex overflow-x-auto pb-1 bg-white border border-[#ECE7DF] rounded-[14px] p-1 gap-1 shrink-0 scrollbar-none">
        <button 
          onClick={() => setActiveTab("builder")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "builder" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Card Builder Mockup
        </button>
        <button 
          onClick={() => setActiveTab("rsvp")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "rsvp" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          RSVP Tracker
        </button>
        <button 
          onClick={() => setActiveTab("whatsapp")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "whatsapp" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          WhatsApp Broadcast
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "builder" && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* Controls Panel */}
          <Card className="lg:col-span-2 p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm space-y-4">
            <h3 className="text-[13px] font-black text-gray-950 uppercase tracking-wider border-b border-gray-100 pb-2">Customization Panel</h3>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[9.5px] font-extrabold text-gray-400 uppercase">Groom Name</label>
                <input 
                  type="text" 
                  value={groomName} 
                  onChange={e => setGroomName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-800 focus:outline-none focus:border-[#0F5B3E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9.5px] font-extrabold text-gray-400 uppercase">Bride Name</label>
                <input 
                  type="text" 
                  value={brideName} 
                  onChange={e => setBrideName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-800 focus:outline-none focus:border-[#0F5B3E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9.5px] font-extrabold text-gray-400 uppercase">Event Date</label>
                <input 
                  type="date" 
                  value={eventDate} 
                  onChange={e => setEventDate(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-800 focus:outline-none focus:border-[#0F5B3E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9.5px] font-extrabold text-gray-400 uppercase">Banquet Hall</label>
                <select 
                  value={venueHall} 
                  onChange={e => setVenueHall(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-800 focus:outline-none focus:border-[#0F5B3E]"
                >
                  <option>Royal Garden Banquet</option>
                  <option>Shalimar Gardens</option>
                  <option>Serena Hall</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9.5px] font-extrabold text-gray-400 uppercase block">Card Theme Aesthetic</label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => setCardTheme("gold")}
                    className={`py-2 rounded-xl text-[11px] font-bold border transition-all ${
                      cardTheme === "gold" ? "border-[#C9A227] bg-[#FAF8F5] text-[#b08e20]" : "border-[#ECE7DF] hover:bg-gray-50 text-gray-500"
                    }`}
                  >
                    Warm Gold
                  </button>
                  <button 
                    onClick={() => setCardTheme("emerald")}
                    className={`py-2 rounded-xl text-[11px] font-bold border transition-all ${
                      cardTheme === "emerald" ? "border-[#0F5B3E] bg-[#E6F0EC] text-[#0F5B3E]" : "border-[#ECE7DF] hover:bg-gray-50 text-gray-500"
                    }`}
                  >
                    Emerald Green
                  </button>
                  <button 
                    onClick={() => setCardTheme("crimson")}
                    className={`py-2 rounded-xl text-[11px] font-bold border transition-all ${
                      cardTheme === "crimson" ? "border-[#D9467A] bg-rose-50 text-[#D9467A]" : "border-[#ECE7DF] hover:bg-gray-50 text-gray-500"
                    }`}
                  >
                    Velvet Rose
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9.5px] font-extrabold text-gray-400 uppercase">Calligraphy Font</label>
                <select 
                  value={calligraphyFont} 
                  onChange={e => setCalligraphyFont(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-800 focus:outline-none focus:border-[#0F5B3E]"
                >
                  <option value="serif">Traditional Nastaliq Serif</option>
                  <option value="sans">Modern Minimal Sans</option>
                  <option value="cursive">Elegant Script Cursive</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
              <button className="py-2.5 bg-white border border-[#ECE7DF] hover:bg-gray-50 text-gray-750 font-bold text-[11px] rounded-xl flex items-center justify-center gap-1.5 shadow-2xs">
                <Download className="w-4 h-4" /> Download PDF
              </button>
              <button className="py-2.5 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white font-bold text-[11px] rounded-xl flex items-center justify-center gap-1.5 shadow-sm">
                <Share2 className="w-4 h-4" /> Share Template
              </button>
            </div>
          </Card>

          {/* Designer Preview Area */}
          <Card className="lg:col-span-3 p-6 bg-[#FAF7F2] border border-[#ECE7DF] rounded-[24px] flex items-center justify-center min-h-[420px]">
            {/* The Wedding Card Visual Preview */}
            <div className={`w-full max-w-sm aspect-[4/5] rounded-3xl border-4 p-8 flex flex-col justify-between items-center text-center shadow-lg relative overflow-hidden transition-all duration-300 ${
              cardTheme === "gold" 
                ? "bg-white border-[#C9A227] text-gray-800" 
                : cardTheme === "emerald"
                ? "bg-[#FAFDFB] border-[#0F5B3E] text-gray-800"
                : "bg-rose-50/50 border-[#D9467A] text-gray-800"
            }`}>
              
              {/* Traditional Ornamental Mandala graphic border (pure CSS/inline SVG) */}
              <div className="absolute inset-4 border border-dashed opacity-20 pointer-events-none rounded-2xl" style={{ borderColor: cardTheme === "gold" ? "#C9A227" : cardTheme === "emerald" ? "#0F5B3E" : "#D9467A" }} />
              
              {/* Corner Ornaments */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l opacity-40" style={{ borderColor: cardTheme === "gold" ? "#C9A227" : cardTheme === "emerald" ? "#0F5B3E" : "#D9467A" }} />
              <div className="absolute top-4 right-4 w-6 h-6 border-t border-r opacity-40" style={{ borderColor: cardTheme === "gold" ? "#C9A227" : cardTheme === "emerald" ? "#0F5B3E" : "#D9467A" }} />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l opacity-40" style={{ borderColor: cardTheme === "gold" ? "#C9A227" : cardTheme === "emerald" ? "#0F5B3E" : "#D9467A" }} />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r opacity-40" style={{ borderColor: cardTheme === "gold" ? "#C9A227" : cardTheme === "emerald" ? "#0F5B3E" : "#D9467A" }} />

              {/* Invitation Heading Calligraphy placeholder */}
              <div className="space-y-1.5 z-10">
                <span className="text-[10px] tracking-widest font-extrabold uppercase" style={{ color: cardTheme === "gold" ? "#C9A227" : cardTheme === "emerald" ? "#0F5B3E" : "#D9467A" }}>
                  Bismillah-ir-Rahman-ir-Rahim
                </span>
                <h2 className="text-xl font-bold tracking-wide mt-2">You are Cordially Invited to</h2>
                <p className="text-[11px] text-gray-450 font-bold">The Celebration of Marriage of</p>
              </div>

              {/* Names Renders */}
              <div className="space-y-4 my-6 z-10">
                <h1 className={`text-2xl font-black leading-none ${
                  calligraphyFont === "serif" ? "font-serif italic" : calligraphyFont === "cursive" ? "font-mono" : "font-sans uppercase tracking-wider"
                }`} style={{ color: cardTheme === "gold" ? "#C9A227" : cardTheme === "emerald" ? "#0F5B3E" : "#D9467A" }}>
                  {groomName}
                </h1>
                <span className="text-[12px] font-semibold text-gray-400 block">&</span>
                <h1 className={`text-2xl font-black leading-none ${
                  calligraphyFont === "serif" ? "font-serif italic" : calligraphyFont === "cursive" ? "font-mono" : "font-sans uppercase tracking-wider"
                }`} style={{ color: cardTheme === "gold" ? "#C9A227" : cardTheme === "emerald" ? "#0F5B3E" : "#D9467A" }}>
                  {brideName}
                </h1>
              </div>

              {/* Event particulars */}
              <div className="space-y-2 z-10">
                <div className="flex items-center gap-1 justify-center text-[11.5px] font-extrabold text-gray-800">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cardTheme === "gold" ? "#C9A227" : cardTheme === "emerald" ? "#0F5B3E" : "#D9467A" }} />
                  {new Date(eventDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <p className="text-[10.5px] font-semibold text-gray-500">{venueHall}</p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="p-1.5 bg-white border border-gray-150 rounded-lg shadow-sm">
                    <QrCode className="w-12 h-12 text-gray-900" />
                  </div>
                  <span className="text-[8px] text-gray-400 font-extrabold block text-left leading-tight max-w-[80px]">
                    Scan QR Code<br />at Entrance for Guest Entry
                  </span>
                </div>
              </div>

            </div>
          </Card>

        </div>
      )}

      {/* Tab 2: RSVP Tracker */}
      {activeTab === "rsvp" && (
        <Card className="p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4.5">
            <h3 className="text-[13.5px] font-black text-gray-950 uppercase tracking-wider">Guest RSVP Registry</h3>
            
            {/* Roster toolbar search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search guest name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0F5B3E]"
              />
            </div>
          </div>

          <div className="overflow-x-auto text-left">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-[#ECE7DF] text-[10px] text-gray-400 font-extrabold uppercase">
                  <th className="pb-3.5 pl-2">Guest ID</th>
                  <th className="pb-3.5">Guest Name</th>
                  <th className="pb-3.5">Mobile Contact</th>
                  <th className="pb-3.5">Meal Selection</th>
                  <th className="pb-3.5 text-center">Invited Count</th>
                  <th className="pb-3.5 text-right pr-2">Response Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-[11.5px] font-semibold text-gray-700">
                {filteredRsvps.map(rsvp => (
                  <tr key={rsvp.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-gray-400">{rsvp.id}</td>
                    <td className="py-3.5 font-black text-gray-900">{rsvp.name}</td>
                    <td className="py-3.5 text-gray-400">{rsvp.phone}</td>
                    <td className="py-3.5">{rsvp.meal}</td>
                    <td className="py-3.5 text-center font-bold text-gray-850">{rsvp.count || "-"}</td>
                    <td className="py-3.5 text-right pr-2">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[8.5px] font-extrabold uppercase ${
                        rsvp.status === "attending" 
                          ? "bg-emerald-50 text-[#0F5B3E]" 
                          : rsvp.status === "tentative"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-rose-50 text-rose-700"
                      }`}>
                        {rsvp.status === "attending" && <CheckCircle2 className="w-3 h-3" />}
                        {rsvp.status === "tentative" && <Clock className="w-3 h-3" />}
                        {rsvp.status === "declined" && <XCircle className="w-3 h-3" />}
                        {rsvp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab 3: WhatsApp Broadcast Campaigns */}
      {activeTab === "whatsapp" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          
          {/* Main Campaign controls */}
          <Card className="lg:col-span-2 p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm flex flex-col justify-between min-h-[360px]">
            <div>
              <h3 className="text-[13.5px] font-black text-gray-950 uppercase tracking-wider">WhatsApp Broadcast Console</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Push invitations with entrance QR codes directly to guest numbers</p>
              
              <div className="space-y-4 mt-6">
                <div className="p-3.5 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                  <div className="text-[11px] text-amber-900 leading-relaxed font-semibold">
                    You have <span className="font-extrabold">135 pending invitations</span> that haven't been sent. Send them via your connected WhatsApp business API.
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9.5px] font-extrabold text-gray-400 uppercase">Invitation Message Template</label>
                  <select className="w-full px-3 py-2 border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-800 focus:outline-none focus:border-[#0F5B3E]">
                    <option>Wedding Invitation Card + Entrance QR (Traditional Gold)</option>
                    <option>RSVP Reminder Campaign (Attending / Decline quick buttons)</option>
                    <option>Location Directions & Ceremony Schedule Details</option>
                  </select>
                </div>
              </div>
            </div>

            <button className="w-full py-2.5 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl font-bold text-[11.5px] transition-all flex items-center justify-center gap-1.5 shadow-sm mt-6">
              <Send className="w-4 h-4" /> Trigger WhatsApp Broadcast Campaign (135 Guests)
            </button>
          </Card>

          {/* Delivery Statistics */}
          <Card className="p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm flex flex-col justify-between min-h-[360px]">
            <div>
              <h3 className="text-[13.5px] font-black text-gray-950 uppercase tracking-wider">Campaign Analytics</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Real-time WhatsApp delivery funnel</p>

              <div className="space-y-4.5 mt-6">
                <div className="space-y-1 text-[11px] font-bold text-gray-500">
                  <div className="flex justify-between">
                    <span>Sent Invitations:</span>
                    <span className="text-gray-950 font-black">{broadcastStats.totalSent}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: "100%" }} />
                  </div>
                </div>

                <div className="space-y-1 text-[11px] font-bold text-gray-500 border-t border-gray-100 pt-3">
                  <div className="flex justify-between">
                    <span>Delivered (Double Tick):</span>
                    <span className="text-gray-950 font-black">{broadcastStats.delivered} <span className="text-[10px] text-gray-400 font-bold">({Math.round((broadcastStats.delivered / broadcastStats.totalSent) * 100)}%)</span></span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${(broadcastStats.delivered / broadcastStats.totalSent) * 100}%` }} />
                  </div>
                </div>

                <div className="space-y-1 text-[11px] font-bold text-gray-500 border-t border-gray-100 pt-3">
                  <div className="flex justify-between">
                    <span>Read (Blue Ticks):</span>
                    <span className="text-gray-950 font-black">{broadcastStats.read} <span className="text-[10px] text-gray-400 font-bold">({Math.round((broadcastStats.read / broadcastStats.totalSent) * 100)}%)</span></span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${(broadcastStats.read / broadcastStats.totalSent) * 100}%` }} />
                  </div>
                </div>

                <div className="space-y-1 text-[11px] font-bold text-gray-500 border-t border-gray-100 pt-3">
                  <div className="flex justify-between">
                    <span>RSVP Replies Received:</span>
                    <span className="text-gray-950 font-black">{broadcastStats.replied} <span className="text-[10px] text-gray-400 font-bold">({Math.round((broadcastStats.replied / broadcastStats.totalSent) * 100)}%)</span></span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#0F5B3E] h-full rounded-full" style={{ width: `${(broadcastStats.replied / broadcastStats.totalSent) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3.5 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-[#0F5B3E] uppercase tracking-wider leading-none">
              <span>API Status: Connected & Active</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Synchronized</span>
            </div>
          </Card>

        </div>
      )}

    </div>
  )
}
