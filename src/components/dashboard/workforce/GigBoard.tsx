"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, MapPin, CalendarDays, DollarSign, Users, Plus, Search, Filter, ShieldCheck } from "lucide-react"

const MY_GIGS = [
  { id: "GIG-01", title: "Drone Operator Needed for Mehndi", date: "Oct 12, 2026", location: "DHA Lahore", pay: "₨ 15,000", status: "Active", applicants: 4 },
  { id: "GIG-02", title: "2 Waiters for VIP Setup", date: "Nov 5, 2026", location: "Bahria Town", pay: "₨ 5,000/each", status: "Filled", applicants: 12 },
  { id: "GIG-03", title: "Female Photographer (Cover)", date: "Dec 1, 2026", location: "Gulberg", pay: "₨ 20,000", status: "Active", applicants: 1 },
]

export function GigBoard() {
  const [activeTab, setActiveTab] = useState<'my-gigs' | 'browse'>('my-gigs')

  return (
    <div className="space-y-6">
      
      {/* 🌟 Header 🌟 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-teal-500" /> B2B Gig Board
          </h1>
          <p className="text-slate-500 font-medium mt-1">Hire freelance professionals for your events on demand.</p>
        </div>
        
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" /> Post a Gig
        </button>
      </div>

      {/* 🌟 Tabs 🌟 */}
      <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm w-max">
        <button 
          onClick={() => setActiveTab('my-gigs')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'my-gigs' ? 'bg-teal-50 text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
        >
          My Posted Gigs
        </button>
        <button 
          onClick={() => setActiveTab('browse')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'browse' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
        >
          Browse Freelancers
        </button>
      </div>

      {activeTab === 'my-gigs' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {MY_GIGS.map((gig) => (
              <div key={gig.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-teal-600 transition-colors">{gig.title}</h3>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${gig.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                      {gig.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
                    <div className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4 text-slate-400" /> {gig.date}</div>
                    <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> {gig.location}</div>
                    <div className="flex items-center gap-1.5 font-bold text-slate-900"><DollarSign className="w-4 h-4 text-teal-500" /> {gig.pay}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                  <div className="text-center">
                    <p className="text-3xl font-black text-slate-900">{gig.applicants}</p>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Applicants</p>
                  </div>
                  <button className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'browse' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-[250px]">
              <div className="relative w-full max-w-sm">
                <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search freelancers by skill..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all font-medium" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                <Filter className="w-4 h-4" /> Filter Skills
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mock Freelancer Cards */}
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-20 h-20 bg-slate-200 rounded-full mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-emerald-400 opacity-20"></div>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-1">Freelancer Name</h3>
                <p className="text-sm font-medium text-teal-600 mb-3">Drone Operator • Editor</p>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-full mb-4">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Identity Verified
                </div>
                <div className="w-full h-px bg-slate-100 mb-4" />
                <div className="flex items-center justify-around w-full">
                  <div>
                    <p className="text-lg font-black text-slate-900">4.9</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rating</p>
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-900">12</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Gigs Done</p>
                  </div>
                </div>
                <button className="w-full mt-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors text-sm">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

    </div>
  )
}
