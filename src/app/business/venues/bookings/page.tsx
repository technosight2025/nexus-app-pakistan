"use client"

import React, { Suspense, useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { 
  Inbox, CheckCircle, AlertCircle, ListOrdered, XCircle, 
  Calendar, Search, Plus, Filter, ArrowUpRight, Check, X, 
  Trash2, Mail, Phone, CalendarDays, Clock, FileText, ChevronRight
} from "lucide-react"

function BookingsDashboardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tabParam = searchParams.get("tab") || "requests"
  
  const [activeTab, setActiveTab] = useState<string>("requests")
  const [searchTerm, setSearchTerm] = useState("")

  // Sync state with URL parameter
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    router.push(`/business/venues/bookings?tab=${tab}`)
  }

  // Requests state
  const [requests, setRequests] = useState([
    { id: "REQ-101", customer: "Imran Siddiqui", type: "Wedding", date: "2026-12-18", hall: "Grand Ballroom", guests: 500, package: "Premium Mutton", dateAdded: "2 hours ago" },
    { id: "REQ-102", customer: "Hina Farooq", type: "Mehndi", date: "2026-12-20", hall: "Royal Garden Lawn", guests: 350, package: "Standard Chicken", dateAdded: "1 day ago" },
    { id: "REQ-103", customer: "Kamran Shah", type: "Corporate AGM", date: "2026-12-22", hall: "Serena Hall", guests: 150, package: "High Tea Gold", dateAdded: "2 days ago" }
  ])

  // Confirmed bookings state
  const [confirmed, setConfirmed] = useState([
    { id: "BKG-201", eventName: "Ahmed & Fatima Wedding", date: "2026-10-15", hall: "Royal Garden Banquet", guests: 600, deposit: "Rs. 1,50,000", totalAmount: "Rs. 6,50,000", contact: "+92 300 4832941" },
    { id: "BKG-202", eventName: "Saad Walima Ceremony", date: "2026-11-02", hall: "Serena Hall", guests: 400, deposit: "Rs. 1,00,000", totalAmount: "Rs. 4,20,000", contact: "+92 321 9998822" },
    { id: "BKG-203", eventName: "Mariam Birthday Dinner", date: "2026-11-10", hall: "Royal Garden Lawn", guests: 200, deposit: "Rs. 50,000", totalAmount: "Rs. 1,80,000", contact: "+92 333 5556677" }
  ])

  // Tentative holds state
  const [tentative, setTentative] = useState([
    { id: "TEN-301", customer: "Zara Mehndi Reservation", date: "2026-10-12", hall: "Royal Garden Lawn", quoteAmount: "Rs. 2,40,000", expiresHours: 6, contact: "+92 312 4443322" },
    { id: "TEN-302", customer: "Faisal Reception Banquet", date: "2026-11-18", hall: "Grand Ballroom", quoteAmount: "Rs. 3,80,000", expiresHours: 22, contact: "+92 345 6789012" }
  ])

  // Waiting conflict list state
  const [waiting, setWaiting] = useState([
    { id: "WAI-401", customer: "Bilal Walima Inquiry", date: "2026-10-15", hall: "Royal Garden Banquet", rank: 1, conflictWith: "Ahmed & Fatima Wedding (Confirmed)" },
    { id: "WAI-402", customer: "Sania Bridal Shower", date: "2026-11-02", hall: "Serena Hall", rank: 2, conflictWith: "Saad Walima Ceremony (Confirmed)" }
  ])

  // Cancelled registry state
  const [cancelled, setCancelled] = useState([
    { id: "CAN-501", customer: "Ali Birthday Bash", date: "2026-05-10", reason: "Event date rescheduled to next year", refundStatus: "Fully Refunded (Rs. 20,000)" },
    { id: "CAN-502", customer: "Zainab Corporate Brunch", date: "2026-05-24", reason: "Venue size requirements changed", refundStatus: "No Refund (Hold Deposit Kept)" }
  ])

  // Quick Action: Approve Request
  const handleApproveRequest = (reqId: string) => {
    const req = requests.find(r => r.id === reqId)
    if (req) {
      // Move to Confirmed
      const newBkg = {
        id: `BKG-${Math.floor(100 + Math.random() * 900)}`,
        eventName: `${req.customer} ${req.type}`,
        date: req.date,
        hall: req.hall,
        guests: req.guests,
        deposit: "Rs. 50,000 (Pending Cash)",
        totalAmount: "Rs. 3,00,000",
        contact: "+92 300 0000000"
      }
      setConfirmed([newBkg, ...confirmed])
      setRequests(requests.filter(r => r.id !== reqId))
      alert(`Request ${reqId} has been promoted to a Confirmed Booking!`)
    }
  }

  // Quick Action: Move request to Tentative Hold
  const handleHoldRequest = (reqId: string) => {
    const req = requests.find(r => r.id === reqId)
    if (req) {
      const newHold = {
        id: `TEN-${Math.floor(100 + Math.random() * 900)}`,
        customer: `${req.customer} ${req.type} Hold`,
        date: req.date,
        hall: req.hall,
        quoteAmount: "Rs. 2,50,000",
        expiresHours: 48,
        contact: "+92 300 0000000"
      }
      setTentative([newHold, ...tentative])
      setRequests(requests.filter(r => r.id !== reqId))
      alert(`Request ${reqId} has been placed under a Tentative Hold (48-hour deadline).`)
    }
  }

  // Quick Action: Decline Request
  const handleDeclineRequest = (reqId: string) => {
    const req = requests.find(r => r.id === reqId)
    if (req && confirm(`Are you sure you want to decline the request from ${req.customer}?`)) {
      const newCancel = {
        id: `CAN-${Math.floor(100 + Math.random() * 900)}`,
        customer: `${req.customer} (${req.type})`,
        date: req.date,
        reason: "Decline by Venue Admin",
        refundStatus: "No Refund Applicable"
      }
      setCancelled([newCancel, ...cancelled])
      setRequests(requests.filter(r => r.id !== reqId))
    }
  }

  // Counters
  const countStats = {
    requests: requests.length,
    confirmed: confirmed.length,
    tentative: tentative.length,
    waiting: waiting.length
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-left">
      
      {/* Page Title & Counters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#ECE7DF] pb-5">
        <div>
          <h1 className="text-2xl font-black text-gray-950 tracking-tight flex items-center gap-2">
            Bookings OS <Calendar className="w-6 h-6 text-[#0F5B3E]" />
          </h1>
          <p className="text-[12.5px] text-gray-500 mt-1 font-semibold">
            Track inquiries, confirm guest slots, configure tentative holds, and organize waiting conflict listings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-1.5 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white rounded-[10px] text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
            <Plus className="w-3.5 h-3.5" /> Book New Event
          </button>
        </div>
      </div>

      {/* Counters row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          onClick={() => handleTabChange("requests")}
          className={`p-4 bg-white border rounded-2xl flex items-center justify-between shadow-2xs cursor-pointer hover:shadow-xs transition-all ${
            activeTab === "requests" ? "border-[#0F5B3E] ring-1 ring-[#0F5B3E]/20 bg-[#E6F0EC]/10" : "border-[#ECE7DF]"
          }`}
        >
          <div>
            <span className="text-[9.5px] font-extrabold text-gray-400 uppercase tracking-wider block">Inquiries</span>
            <span className="text-2xl font-black text-gray-900 mt-1 block leading-none">{countStats.requests}</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Inbox className="w-4.5 h-4.5" />
          </div>
        </div>

        <div 
          onClick={() => handleTabChange("confirmed")}
          className={`p-4 bg-white border rounded-2xl flex items-center justify-between shadow-2xs cursor-pointer hover:shadow-xs transition-all ${
            activeTab === "confirmed" ? "border-[#0F5B3E] ring-1 ring-[#0F5B3E]/20 bg-[#E6F0EC]/10" : "border-[#ECE7DF]"
          }`}
        >
          <div>
            <span className="text-[9.5px] font-extrabold text-gray-400 uppercase tracking-wider block">Confirmed</span>
            <span className="text-2xl font-black text-[#0F5B3E] mt-1 block leading-none">{countStats.confirmed}</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0F5B3E] flex items-center justify-center shrink-0">
            <CheckCircle className="w-4.5 h-4.5" />
          </div>
        </div>

        <div 
          onClick={() => handleTabChange("tentative")}
          className={`p-4 bg-white border rounded-2xl flex items-center justify-between shadow-2xs cursor-pointer hover:shadow-xs transition-all ${
            activeTab === "tentative" ? "border-[#0F5B3E] ring-1 ring-[#0F5B3E]/20 bg-[#E6F0EC]/10" : "border-[#ECE7DF]"
          }`}
        >
          <div>
            <span className="text-[9.5px] font-extrabold text-gray-400 uppercase tracking-wider block">Holds</span>
            <span className="text-2xl font-black text-amber-600 mt-1 block leading-none">{countStats.tentative}</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <AlertCircle className="w-4.5 h-4.5" />
          </div>
        </div>

        <div 
          onClick={() => handleTabChange("waiting")}
          className={`p-4 bg-white border rounded-2xl flex items-center justify-between shadow-2xs cursor-pointer hover:shadow-xs transition-all ${
            activeTab === "waiting" ? "border-[#0F5B3E] ring-1 ring-[#0F5B3E]/20 bg-[#E6F0EC]/10" : "border-[#ECE7DF]"
          }`}
        >
          <div>
            <span className="text-[9.5px] font-extrabold text-gray-400 uppercase tracking-wider block">Conflicts</span>
            <span className="text-2xl font-black text-rose-500 mt-1 block leading-none">{countStats.waiting}</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <ListOrdered className="w-4.5 h-4.5" />
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex overflow-x-auto pb-1 bg-white border border-[#ECE7DF] rounded-[14px] p-1 gap-1 shrink-0 scrollbar-none">
        <button 
          onClick={() => handleTabChange("requests")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "requests" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Requests ({requests.length})
        </button>
        <button 
          onClick={() => handleTabChange("confirmed")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "confirmed" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Confirmed ({confirmed.length})
        </button>
        <button 
          onClick={() => handleTabChange("tentative")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "tentative" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Tentative Holds ({tentative.length})
        </button>
        <button 
          onClick={() => handleTabChange("waiting")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "waiting" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Waiting List ({waiting.length})
        </button>
        <button 
          onClick={() => handleTabChange("cancelled")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "cancelled" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Cancelled ({cancelled.length})
        </button>
      </div>

      {/* Main card */}
      <Card className="p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm">
        
        {/* Tab 1: Requests */}
        {activeTab === "requests" && (
          <div className="space-y-4">
            <h3 className="text-[13px] font-black text-gray-950 uppercase tracking-wider border-b border-gray-100 pb-2">Pending Inquiries</h3>
            
            {requests.length === 0 ? (
              <p className="text-sm text-gray-500 py-6 text-center">No pending requests found.</p>
            ) : (
              <div className="space-y-4">
                {requests.map(req => (
                  <div key={req.id} className="p-4 bg-[#FAF8F5] border border-[#ECE7DF]/55 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9.5px] font-extrabold text-[#0f5b3e] uppercase bg-[#E6F0EC] px-1.5 py-0.5 rounded">{req.id}</span>
                        <h4 className="text-[13px] font-black text-gray-950">{req.customer}</h4>
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold">
                        Requested: <span className="text-gray-800">{req.type}</span> • Date: <span className="text-gray-800">{req.date}</span> • Area: <span className="text-gray-800">{req.hall}</span>
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold">
                        Guests: <span className="text-gray-800">{req.guests} pax</span> • Catering: <span className="text-gray-800">{req.package}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-[9.5px] font-extrabold text-gray-400 mr-2 hidden lg:inline-block">Received {req.dateAdded}</span>
                      <button 
                        onClick={() => handleDeclineRequest(req.id)}
                        className="p-2 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        title="Decline Inquiry"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleHoldRequest(req.id)}
                        className="px-3.5 py-2 border border-amber-300 hover:bg-amber-50/50 text-amber-700 font-bold text-[11px] rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <Clock className="w-3.5 h-3.5" /> Place Hold
                      </button>
                      <button 
                        onClick={() => handleApproveRequest(req.id)}
                        className="px-3.5 py-2 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white font-bold text-[11px] rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" /> Confirm Slot
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Confirmed */}
        {activeTab === "confirmed" && (
          <div className="space-y-4">
            <h3 className="text-[13px] font-black text-gray-950 uppercase tracking-wider border-b border-gray-100 pb-2">Confirmed Bookings</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[750px]">
                <thead>
                  <tr className="border-b border-[#ECE7DF] text-[9.5px] text-gray-400 font-extrabold uppercase">
                    <th className="pb-3 pl-2">Booking ID</th>
                    <th className="pb-3">Event Name</th>
                    <th className="pb-3">Hall Area</th>
                    <th className="pb-3">Event Date</th>
                    <th className="pb-3 text-center">Guest Count</th>
                    <th className="pb-3 text-right">Advance Deposit</th>
                    <th className="pb-3 text-right pr-2">Workspace</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-[11.5px] font-semibold text-gray-700">
                  {confirmed.map(bkg => (
                    <tr key={bkg.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3.5 pl-2 font-bold text-gray-400">{bkg.id}</td>
                      <td className="py-3.5 font-black text-gray-900">{bkg.eventName}</td>
                      <td className="py-3.5 text-gray-400">{bkg.hall}</td>
                      <td className="py-3.5 text-gray-550">{bkg.date}</td>
                      <td className="py-3.5 text-center font-bold text-gray-850">{bkg.guests} pax</td>
                      <td className="py-3.5 text-right font-black text-emerald-700">{bkg.deposit}</td>
                      <td className="py-3.5 text-right pr-2">
                        <button className="px-3 py-1 bg-white border border-[#ECE7DF] hover:bg-gray-50 rounded-lg text-[10.5px] font-bold text-gray-700 flex items-center gap-1.5 ml-auto shadow-2xs">
                          Launch Workspace <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Tentative Holds */}
        {activeTab === "tentative" && (
          <div className="space-y-4">
            <h3 className="text-[13px] font-black text-gray-950 uppercase tracking-wider border-b border-gray-100 pb-2">Active Holds</h3>
            
            <div className="space-y-4">
              {tentative.map(hold => (
                <div key={hold.id} className="p-4 bg-white border border-[#ECE7DF]/55 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9.5px] font-extrabold text-amber-700 uppercase bg-amber-50 px-1.5 py-0.5 rounded">{hold.id}</span>
                      <h4 className="text-[13px] font-black text-gray-950">{hold.customer}</h4>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold">
                      Date Reserved: <span className="text-gray-800">{hold.date}</span> • Hall: <span className="text-gray-800">{hold.hall}</span> • Quote Value: <span className="text-gray-800">{hold.quoteAmount}</span>
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold">
                      Contact: <span className="text-gray-850">{hold.contact}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4.5 justify-end">
                    <div className="text-right">
                      <span className="text-[8.5px] font-extrabold text-rose-500 uppercase block">Hold Expiration</span>
                      <span className="text-[11.5px] font-black text-rose-600 block mt-0.5 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> Expires in {hold.expiresHours} hours
                      </span>
                    </div>

                    <button className="px-3.5 py-2 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white font-bold text-[11px] rounded-xl flex items-center gap-1 shadow-sm">
                      <FileText className="w-3.5 h-3.5" /> Approve Payment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Waiting List Conflicts */}
        {activeTab === "waiting" && (
          <div className="space-y-4">
            <h3 className="text-[13px] font-black text-gray-950 uppercase tracking-wider border-b border-gray-100 pb-2">Waiting list Queues</h3>
            
            <div className="space-y-4">
              {waiting.map(wai => (
                <div key={wai.id} className="p-4 bg-rose-50/20 border border-rose-100/50 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9.5px] font-extrabold text-rose-800 uppercase bg-rose-50 px-1.5 py-0.5 rounded">Queue Rank #{wai.rank}</span>
                      <h4 className="text-[13px] font-black text-gray-950">{wai.customer}</h4>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold">
                      Requested Date: <span className="text-gray-800">{wai.date}</span> • Hall: <span className="text-gray-800">{wai.hall}</span>
                    </p>
                    <p className="text-[10.5px] text-rose-700 font-bold flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-500" /> Conflict: {wai.conflictWith}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="px-3.5 py-2 border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold text-[11px] rounded-xl transition-all shadow-2xs">
                      Decline & Release
                    </button>
                    <button className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] rounded-xl transition-all shadow-sm">
                      Offer Alt Date
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Cancelled Bookings */}
        {activeTab === "cancelled" && (
          <div className="space-y-4">
            <h3 className="text-[13px] font-black text-gray-950 uppercase tracking-wider border-b border-gray-100 pb-2">Cancelled Bookings</h3>
            
            <div className="overflow-x-auto text-left">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-[#ECE7DF] text-[9.5px] text-gray-400 font-extrabold uppercase">
                    <th className="pb-3 pl-2">ID</th>
                    <th className="pb-3">Customer Event</th>
                    <th className="pb-3">Event Date</th>
                    <th className="pb-3">Reason for Cancellation</th>
                    <th className="pb-3 text-right pr-2">Refund Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-[11.5px] font-semibold text-gray-700">
                  {cancelled.map(can => (
                    <tr key={can.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3.5 pl-2 font-bold text-gray-400">{can.id}</td>
                      <td className="py-3.5 font-black text-gray-950">{can.customer}</td>
                      <td className="py-3.5 text-gray-550">{can.date}</td>
                      <td className="py-3.5 text-gray-400 font-medium">{can.reason}</td>
                      <td className="py-3.5 text-right pr-2 font-bold text-rose-600">{can.refundStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </Card>

    </div>
  )
}

export default function BookingsOSPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 rounded-full border-2 border-[#0F5B3E] border-t-transparent animate-spin" />
      </div>
    }>
      <BookingsDashboardContent />
    </Suspense>
  )
}
