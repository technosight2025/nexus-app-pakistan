"use client"
import { motion } from "framer-motion"
import { 
  ArrowLeft, Mail, Phone, MapPin, CalendarDays, 
  Users, Banknote, FileText, CheckCircle2, MessageSquare, 
  Clock, Plus, MoreHorizontal, FileIcon, ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export function LeadDetailsView({ leadId }: { leadId: string }) {
  const [activeTab, setActiveTab] = useState("activity")

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      
      {/* Header / Breadcrumb */}
      <nav className="flex items-center text-xs font-bold text-slate-400 gap-2 mb-2">
        <Link href="/dashboard/vendor" className="hover:text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" /> Dashboard
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300" />
        <Link href="/dashboard/vendor" className="hover:text-primary transition-colors">
          Leads
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300" />
        <span className="text-slate-900">Ahmed Raza</span>
      </nav>

      {/* Main Toolbar */}
      <div className="bg-white rounded-2xl p-6 border border-border shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Ahmed Raza</h1>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md">New Lead</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Wedding Event • ID: {leadId}</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold">Lost</Button>
          <Link href="/dashboard/vendor/quotations/new">
            <Button variant="outline" className="w-full sm:w-auto border-border font-bold">
              <FileText className="w-4 h-4 mr-2" /> New Quote
            </Button>
          </Link>
          <Button className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
            <CheckCircle2 className="w-4 h-4 mr-2" /> Mark as Won
          </Button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Info Card */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-slate-50/50">
              <h2 className="font-bold text-slate-900 text-sm">Customer Info</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                  <span className="font-bold text-slate-500">AR</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Ahmed Raza</h3>
                  <p className="text-xs text-slate-500">Lahore, Pakistan</p>
                </div>
              </div>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-700 font-medium">+92 300 1234567</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-700 font-medium">ahmed.raza@example.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-slate-50/50 flex justify-between items-center">
              <h2 className="font-bold text-slate-900 text-sm">Event Details</h2>
              <Button variant="ghost" size="sm" className="h-6 text-xs text-primary font-bold">Edit</Button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <CalendarDays className="w-4 h-4" /> Date
                </div>
                <span className="font-bold text-slate-900 text-sm">Oct 15, 2026</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Users className="w-4 h-4" /> Guests
                </div>
                <span className="font-bold text-slate-900 text-sm">450 - 500</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <MapPin className="w-4 h-4" /> Space
                </div>
                <span className="font-bold text-slate-900 text-sm">Hall A (Grand)</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Banknote className="w-4 h-4" /> Est. Budget
                </div>
                <span className="font-black text-slate-900">PKR 1.2M</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Workspace */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-border shadow-sm min-h-[600px] flex flex-col overflow-hidden">
            
            {/* Tabs */}
            <div className="flex items-center border-b border-border px-2 pt-2 bg-slate-50/50">
              <button 
                onClick={() => setActiveTab("activity")}
                className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === "activity" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"}`}
              >
                Activity & Notes
              </button>
              <button 
                onClick={() => setActiveTab("quotes")}
                className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === "quotes" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"}`}
              >
                Quotations (1)
              </button>
              <button 
                onClick={() => setActiveTab("messages")}
                className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === "messages" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"}`}
              >
                Messages
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 flex-1 bg-slate-50/30">
              
              {activeTab === "activity" && (
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 bg-white border border-border rounded-xl p-4 shadow-sm">
                      <textarea 
                        className="w-full bg-transparent resize-none outline-none text-sm placeholder:text-slate-400" 
                        rows={2} 
                        placeholder="Log a call, note, or meeting..." 
                      />
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-slate-500"><Phone className="w-3 h-3 mr-1"/> Call</Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-slate-500"><CalendarDays className="w-3 h-3 mr-1"/> Meeting</Button>
                        </div>
                        <Button size="sm" className="h-8">Save Note</Button>
                      </div>
                    </div>
                  </div>

                  <div className="relative pl-5 space-y-6 before:absolute before:inset-y-0 before:left-[19px] before:w-[2px] before:bg-slate-200">
                    
                    <div className="relative">
                      <div className="absolute -left-[24px] bg-white border-2 border-primary w-3 h-3 rounded-full mt-1.5" />
                      <div className="bg-white border border-border rounded-xl p-4 shadow-sm ml-4">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-sm text-slate-900">Note added by You</span>
                          <span className="text-xs font-medium text-slate-400">2 hours ago</span>
                        </div>
                        <p className="text-sm text-slate-600">Client is very interested in the Grand Hall. Wants a food tasting session next week. Will confirm guest count by Monday.</p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[24px] bg-slate-200 border-2 border-white w-3 h-3 rounded-full mt-1.5" />
                      <div className="ml-4 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-sm text-slate-900">Lead Created</span>
                          <p className="text-xs text-slate-500">Via Web Form</p>
                        </div>
                        <span className="text-xs font-medium text-slate-400">Oct 05, 10:00 AM</span>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {activeTab === "quotes" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-900">Sent Quotations</h3>
                    <Button size="sm" variant="outline" className="h-8"><Plus className="w-4 h-4 mr-1"/> New Quote</Button>
                  </div>
                  
                  <div className="bg-white border border-border rounded-xl p-4 shadow-sm flex items-center justify-between group hover:border-primary/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                        <FileIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">Quote #QT-2026-089</h4>
                        <p className="text-xs text-slate-500">Sent on Oct 05 • Valid until Oct 12</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block font-black text-slate-900 text-sm">PKR 1,250,000</span>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Pending</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "messages" && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-2">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-900">No Messages Yet</h3>
                  <p className="text-sm text-slate-500 max-w-xs">Start a conversation with the client via WhatsApp or Email directly from here.</p>
                  <Button variant="outline" className="mt-4"><MessageSquare className="w-4 h-4 mr-2"/> Send Message</Button>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
