"use client"

import { useState } from "react"
import { Users, UserPlus, Shield, Calendar, Mail, Phone, MoreVertical } from "lucide-react"

export function ProfessionalTeamBuilder() {
  const [activeTab, setActiveTab] = useState("roster")

  const teamMembers = [
    { id: 1, name: "Hamza Ali", role: "Second Shooter", type: "Full-Time", status: "Available", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" },
    { id: 2, name: "Sarah Khan", role: "Video Editor", type: "Freelancer", status: "Busy", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
    { id: 3, name: "Bilal Ahmed", role: "Drone Operator", type: "Contractor", status: "Available", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
    { id: 4, name: "Zainab Malik", role: "Lighting Assistant", type: "Daily Wager", status: "Available", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Team Builder</h1>
          <p className="text-slate-500 font-medium">Manage your crew, assign roles, and invite freelancers for events.</p>
        </div>
        <button className="px-5 py-2.5 bg-[#0F5B3E] text-white font-bold rounded-xl flex items-center gap-2 hover:bg-[#0a422c] transition-all shadow-sm">
          <UserPlus className="w-5 h-5" />
          Invite Member
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {[
          { id: "roster", label: "Team Roster" },
          { id: "assignments", label: "Event Assignments" },
          { id: "daily-wagers", label: "Daily Wagers & Rates" },
          { id: "permissions", label: "Roles & Permissions" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 font-bold text-sm border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-[#0F5B3E] text-[#0F5B3E]"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex gap-2">
            <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-[#0F5B3E]">
              <option>All Employment Types</option>
              <option>Full-Time</option>
              <option>Freelancer</option>
              <option>Daily Wager</option>
            </select>
          </div>
          <div className="text-sm text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{teamMembers.length}</strong> active members
          </div>
        </div>

        {/* Team List */}
        <div className="divide-y divide-slate-100">
          {teamMembers.map(member => (
            <div key={member.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                <div>
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    {member.name}
                    {member.type === "Full-Time" && <Shield className="w-3.5 h-3.5 text-[#C9A227]" />}
                  </h4>
                  <p className="text-sm text-slate-500 font-medium">{member.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-4 text-slate-400">
                  <button className="hover:text-[#0F5B3E] transition-colors"><Mail className="w-4.5 h-4.5" /></button>
                  <button className="hover:text-[#0F5B3E] transition-colors"><Phone className="w-4.5 h-4.5" /></button>
                  <button className="hover:text-[#0F5B3E] transition-colors"><Calendar className="w-4.5 h-4.5" /></button>
                </div>

                <div className="w-32">
                  <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                    {member.type}
                  </span>
                </div>

                <div className="w-24">
                  <span className={`text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1.5 w-max ${
                    member.status === "Available" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${member.status === "Available" ? "bg-emerald-500" : "bg-amber-500"}`} />
                    {member.status}
                  </span>
                </div>

                <button className="text-slate-400 hover:text-slate-900">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
