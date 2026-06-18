"use client"

import React, { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { 
  Search, Plus, Filter, Mail, Phone, Calendar, MessageSquare, 
  UserCheck, Users, BookOpen, Send, CheckCircle, Clock, 
  Trash2, MoreVertical, ShieldAlert, ArrowUpRight, Copy, Check
} from "lucide-react"

function CRMLeadsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "leads"

  const setTab = (tab: string) => {
    router.push(`/business/venues/leads?tab=${tab}`)
  }

  // Kanban Pipeline states
  const pipeline = [
    {
      id: "inquiry",
      title: "New Inquiries",
      color: "bg-blue-500",
      cards: [
        { id: "1", client: "Zainab Malik", type: "Valima Ceremony", date: "Dec 15, 2025", value: "Rs. 4,50,000", phone: "+92 300 1234567" },
        { id: "2", client: "Asif Mahmood", type: "Corporate Gala", date: "Jan 10, 2026", value: "Rs. 2,80,000", phone: "+92 321 9876543" }
      ]
    },
    {
      id: "followup",
      title: "Follow Up",
      color: "bg-amber-500",
      cards: [
        { id: "3", client: "Kamran Shah", type: "Mehndi Night", date: "Nov 20, 2025", value: "Rs. 3,20,000", phone: "+92 333 4445556" }
      ]
    },
    {
      id: "visit",
      title: "Visit Scheduled",
      color: "bg-purple-500",
      cards: [
        { id: "4", client: "Hassan Ali", type: "Wedding reception", date: "Oct 25, 2025", value: "Rs. 6,80,000", phone: "+92 312 7778889" }
      ]
    },
    {
      id: "negotiation",
      title: "Negotiation",
      color: "bg-rose-500",
      cards: [
        { id: "5", client: "Faisal Ghafoor", type: "Birthday Banquet", date: "Jul 15, 2025", value: "Rs. 1,50,000", phone: "+92 300 5556667" }
      ]
    },
    {
      id: "confirmed",
      title: "Won / Booked",
      color: "bg-emerald-500",
      cards: [
        { id: "6", client: "Ahmed & Fatima", type: "Wedding (Shadi)", date: "May 20, 2025", value: "Rs. 5,00,000", phone: "+92 315 9998887" }
      ]
    }
  ]

  // Customers data
  const customers = [
    { name: "Zafar Iqbal", email: "zafar.iqbal@yahoo.com", phone: "+92 300 8887771", events: 2, spent: "Rs. 8,50,000", status: "Premium Client" },
    { name: "Mariam Khan", email: "mariam.khan@gmail.com", phone: "+92 321 4443332", events: 1, spent: "Rs. 4,20,000", status: "Active" },
    { name: "Hamza Butt", email: "hamza@butt-textiles.com", phone: "+92 333 1112223", events: 3, spent: "Rs. 12,40,000", status: "Corporate Client" },
    { name: "Ayesha Bibi", email: "ayesha@shadiportal.pk", phone: "+92 315 5554449", events: 1, spent: "Rs. 3,50,000", status: "Active" }
  ]

  // Guest list RSVP responses
  const guests = [
    { name: "Tariq Mahmood", relation: "Groom's Uncle", rsvp: "Attending", guests: 4, table: "Table 12", dietary: "No Beef" },
    { name: "Shaheen Ara", relation: "Bride's Mother Friend", rsvp: "Attending", guests: 2, table: "Table 4", dietary: "Diabetic Meal" },
    { name: "Arsalan Riaz", relation: "Groom's Friend", rsvp: "Pending", guests: 1, table: "Table 18", dietary: "None" },
    { name: "Farooq Siddiqui", relation: "Corporate Guest", rsvp: "Declined", guests: 0, table: "N/A", dietary: "N/A" },
    { name: "Dr. Samina Jamil", relation: "Bride's Aunt", rsvp: "Attending", guests: 3, table: "Table 2", dietary: "Vegetarian" }
  ]

  // Pakistani WhatsApp template messages
  const communicationTemplates = [
    {
      title: "Quotation Details Follow-up",
      channel: "WhatsApp",
      text: "Salam. This is Usman from Royal Garden Banquet. We have prepared the custom quote for your event on Dec 15th. Base price starts from Rs. 2,50,000. Would you like to schedule a garden tour this weekend?"
    },
    {
      title: "Booking Advance Payout Reminder",
      channel: "WhatsApp & SMS",
      text: "Salam Alaikum. Friendly reminder from Royal Garden Banquet. To lock the dates for your wedding, a 20% booking advance payment is requested. Let us know if we can assist with online bank transfer."
    },
    {
      title: "Menu Selection Form Share",
      channel: "WhatsApp",
      text: "Dear Client, hope you are doing well. Please find the catering package selection checklist linked here. Please submit your chicken/mutton and dessert choices 7 days prior to the event."
    }
  ]

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-left">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-[#0F5B3E]" /> CRM & Customer Relations
          </h1>
          <p className="text-gray-500 mt-1 text-[13px] font-medium">
            Manage event inquiries, lead pipelines, client communications, and guest list RSVPs.
          </p>
        </div>
        
        <button className="px-4 py-2 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl font-bold text-[12px] transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-3.5 h-3.5" /> 
          {activeTab === "leads" && "Add Lead"}
          {activeTab === "customers" && "Register Customer"}
          {activeTab === "guests" && "Add Guest RSVP"}
          {activeTab === "chat" && "New Template Message"}
        </button>
      </div>

      {/* Tab select bar */}
      <div className="flex overflow-x-auto pb-1 bg-white border border-[#ECE7DF] rounded-[14px] p-1 gap-1 shrink-0 scrollbar-none">
        <button 
          onClick={() => setTab("leads")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "leads" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Leads Pipeline
        </button>
        <button 
          onClick={() => setTab("customers")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "customers" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Customers Directory
        </button>
        <button 
          onClick={() => setTab("guests")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "guests" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Guest Lists & RSVPs
        </button>
        <button 
          onClick={() => setTab("chat")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "chat" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Communication & Templates
        </button>
      </div>

      {/* Tab Views */}

      {/* Tab 1: Leads Kanban pipeline */}
      {activeTab === "leads" && (
        <div className="overflow-x-auto overflow-y-hidden pb-4 no-scrollbar">
          <div className="flex gap-5 min-w-max h-[calc(100vh-16rem)]">
            {pipeline.map((col) => (
              <div key={col.id} className="w-72 bg-[#FAF8F5]/80 border border-[#ECE7DF]/60 rounded-[20px] flex flex-col p-3 shadow-xs">
                
                {/* Column header */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3 pl-1 shrink-0 select-none">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                    <span className="text-[12px] font-black text-gray-900">{col.title}</span>
                    <span className="bg-gray-200/80 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                      {col.cards.length}
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                {/* Cards stack */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1.5 pb-2 scrollbar-none text-left">
                  {col.cards.map((card) => (
                    <div 
                      key={card.id} 
                      className="bg-white p-3.5 border border-[#ECE7DF] rounded-[16px] shadow-sm hover:border-[#0F5B3E]/40 hover:shadow-md transition-all group relative cursor-grab"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[9.5px] font-extrabold text-[#0F5B3E] bg-[#E6F0EC] px-2 py-0.5 rounded-md">
                          {card.type}
                        </span>
                        <button className="text-gray-300 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-[12.5px] font-black text-gray-950 mt-2.5">{card.client}</h4>
                      <p className="text-[11px] text-emerald-600 font-bold mt-1">{card.value}</p>

                      <div className="flex items-center gap-1.5 text-[9.5px] text-gray-400 font-bold mt-3 border-t border-gray-50 pt-2.5">
                        <Calendar className="w-3.5 h-3.5" /> <span>Target: {card.date}</span>
                      </div>

                      <div className="flex items-center gap-2 pt-2.5 mt-2.5 border-t border-gray-100 text-[10px] font-bold">
                        <a 
                          href={`https://wa.me/${card.phone.replace(/[^0-9]/g, "")}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex-1 py-1 bg-white hover:bg-gray-50 border border-[#ECE7DF] rounded-lg text-gray-600 flex items-center justify-center gap-1 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp
                        </a>
                        <a 
                          href={`tel:${card.phone}`}
                          className="flex-1 py-1 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-lg flex items-center justify-center gap-1 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-white" /> Call Client
                        </a>
                      </div>
                    </div>
                  ))}

                  {col.cards.length === 0 && (
                    <div className="py-12 border-2 border-dashed border-[#ECE7DF]/50 rounded-[16px] text-center flex items-center justify-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Drag leads here</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Customers directory */}
      {activeTab === "customers" && (
        <Card className="p-5 border border-gray-100 bg-white rounded-[20px] shadow-sm">
          <div className="overflow-x-auto text-left">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#ECE7DF] text-[10.5px] text-gray-400 font-extrabold uppercase">
                  <th className="pb-3.5 pl-2">Customer Profile</th>
                  <th className="pb-3.5">Email</th>
                  <th className="pb-3.5">Phone Number</th>
                  <th className="pb-3.5">Bookings Registered</th>
                  <th className="pb-3.5">Total Value Paid</th>
                  <th className="pb-3.5 text-right pr-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-[11.5px] font-semibold text-gray-700">
                {customers.map((c, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 pl-2">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{c.name}</span>
                        <span className="text-[9.5px] text-indigo-600 font-bold mt-0.5">{c.status}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-gray-500 font-medium">{c.email}</td>
                    <td className="py-3.5">{c.phone}</td>
                    <td className="py-3.5 font-bold text-center text-gray-600">{c.events} events</td>
                    <td className="py-3.5 font-bold text-[#0F5B3E]">{c.spent}</td>
                    <td className="py-3.5 text-right pr-2">
                      <button className="px-3 py-1 bg-white border border-[#ECE7DF] hover:bg-gray-50 rounded-xl text-[10px] font-bold text-gray-700">
                        View profile log
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab 3: Guest Lists RSVPs */}
      {activeTab === "guests" && (
        <Card className="p-5 border border-gray-100 bg-white rounded-[20px] shadow-sm">
          <div className="overflow-x-auto text-left">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#ECE7DF] text-[10.5px] text-gray-400 font-extrabold uppercase">
                  <th className="pb-3.5 pl-2">Guest Name</th>
                  <th className="pb-3.5">Relationship</th>
                  <th className="pb-3.5 text-center">RSVP status</th>
                  <th className="pb-3.5 text-center">Seats Booked</th>
                  <th className="pb-3.5">Assigned Table</th>
                  <th className="pb-3.5">Dietary Notes</th>
                  <th className="pb-3.5 text-right pr-2">Check-in Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-[11.5px] font-semibold text-gray-700">
                {guests.map((g, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-gray-900">{g.name}</td>
                    <td className="py-3.5 text-gray-400 font-bold">{g.relation}</td>
                    <td className="py-3.5 text-center">
                      <span className={`px-2 py-0.5 rounded text-[8.5px] font-extrabold uppercase ${
                        g.rsvp === "Attending" 
                          ? "bg-emerald-100 text-emerald-800" 
                          : g.rsvp === "Pending" 
                          ? "bg-amber-100 text-amber-800" 
                          : "bg-rose-100 text-rose-800"
                      }`}>{g.rsvp}</span>
                    </td>
                    <td className="py-3.5 text-center font-bold">{g.guests} Seats</td>
                    <td className="py-3.5 font-bold text-gray-600">{g.table}</td>
                    <td className="py-3.5 text-gray-500 font-semibold">{g.dietary}</td>
                    <td className="py-3.5 text-right pr-2">
                      <button className="px-2.5 py-0.5 rounded-lg bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white text-[9.5px] font-bold">
                        Check In
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab 4: Communication & WhatsApp Templates */}
      {activeTab === "chat" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {communicationTemplates.map((template, idx) => (
            <Card key={idx} className="p-5 border border-gray-100 bg-[#FAF8F5]/80 rounded-[20px] shadow-sm flex flex-col justify-between h-[230px] text-left">
              <div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <h3 className="text-[12px] font-black text-gray-900">{template.title}</h3>
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md">
                    {template.channel}
                  </span>
                </div>
                
                <p className="text-[11.5px] text-gray-500 mt-3.5 leading-relaxed font-semibold line-clamp-4">
                  "{template.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-[9.5px] text-gray-400 font-bold">Length: {template.text.length} chars</span>
                <button 
                  onClick={() => handleCopyText(template.text, idx)}
                  className="px-3.5 py-1 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white text-[10px] font-bold rounded-lg transition-all flex items-center gap-1"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy WhatsApp text
                    </>
                  )}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

    </div>
  )
}

export default function VenuesLeadsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-48">
        <span className="text-sm font-bold text-gray-400 animate-pulse">Loading CRM Dashboard...</span>
      </div>
    }>
      <CRMLeadsContent />
    </Suspense>
  )
}
