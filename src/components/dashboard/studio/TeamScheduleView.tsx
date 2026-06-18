"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Briefcase, Plus, Search, Calendar as CalendarIcon, 
  MapPin, Clock, Users, Camera, Video, Plane, Edit3,
  UserPlus, UserMinus, CheckCircle2, AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"

type TeamRole = "Lead Photographer" | "Photographer" | "Videographer" | "Drone Operator" | "Assistant" | "Editor"
type Status = "Available" | "On Shoot" | "Editing" | "Off"

interface TeamMember {
  id: string
  name: string
  role: TeamRole
  status: Status
  avatar: string
}

interface RequiredRole {
  id: string
  role: TeamRole
  assignedTo: string | null // null means unassigned
}

interface ShootAssignment {
  id: string
  title: string
  clientName: string
  date: string
  time: string
  location: string
  requiredRoles: RequiredRole[]
}

const TEAM_MEMBERS: TeamMember[] = [
  { id: "M1", name: "Ahmed Khan", role: "Lead Photographer", status: "Available", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80&auto=format&fit=crop" },
  { id: "M2", name: "Sara Ahmed", role: "Photographer", status: "On Shoot", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop" },
  { id: "M3", name: "Zain Ali", role: "Videographer", status: "Available", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop" },
  { id: "M4", name: "Omar Tariq", role: "Drone Operator", status: "Off", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&auto=format&fit=crop" },
  { id: "M5", name: "Aisha Malik", role: "Editor", status: "Editing", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&auto=format&fit=crop" },
  { id: "M6", name: "Bilal", role: "Assistant", status: "Available", avatar: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=100&q=80&auto=format&fit=crop" },
]

const INITIAL_SHOOTS: ShootAssignment[] = [
  {
    id: "SH-001",
    title: "Ali & Sara Wedding",
    clientName: "Ali Raza",
    date: "Oct 15, 2023",
    time: "4:00 PM - 11:00 PM",
    location: "Pearl Continental, Lahore",
    requiredRoles: [
      { id: "R1", role: "Lead Photographer", assignedTo: "M1" }, // Ahmed
      { id: "R2", role: "Photographer", assignedTo: null },
      { id: "R3", role: "Videographer", assignedTo: "M3" }, // Zain
      { id: "R4", role: "Drone Operator", assignedTo: null },
      { id: "R5", role: "Assistant", assignedTo: null },
    ]
  },
  {
    id: "SH-002",
    title: "TechCorp Gala",
    clientName: "TechCorp Inc.",
    date: "Oct 20, 2023",
    time: "7:00 PM - 10:00 PM",
    location: "Expo Center",
    requiredRoles: [
      { id: "R6", role: "Videographer", assignedTo: null },
      { id: "R7", role: "Assistant", assignedTo: null },
    ]
  }
]

export function TeamScheduleView() {
  const [shoots, setShoots] = useState<ShootAssignment[]>(INITIAL_SHOOTS)
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusColor = (status: Status) => {
    switch(status) {
      case "Available": return "bg-emerald-500"
      case "On Shoot": return "bg-rose-500"
      case "Editing": return "bg-amber-500"
      case "Off": return "bg-slate-300"
      default: return "bg-slate-300"
    }
  }

  const getRoleIcon = (role: TeamRole) => {
    switch(role) {
      case "Lead Photographer": 
      case "Photographer": return <Camera className="w-4 h-4" />
      case "Videographer": return <Video className="w-4 h-4" />
      case "Drone Operator": return <Plane className="w-4 h-4" />
      case "Editor": return <Edit3 className="w-4 h-4" />
      case "Assistant": return <Users className="w-4 h-4" />
    }
  }

  // Handle mock assignment
  const handleAssign = (shootId: string, roleId: string) => {
    // Mock assigning "Ahmed Khan" (M1) if available, just to show interaction
    // In a real app, this would open a dropdown of available members for that role
    setShoots(shoots.map(shoot => {
      if (shoot.id === shootId) {
        return {
          ...shoot,
          requiredRoles: shoot.requiredRoles.map(r => {
            if (r.id === roleId) {
              return { ...r, assignedTo: r.assignedTo ? null : "M1" } // Toggle assignment
            }
            return r
          })
        }
      }
      return shoot
    }))
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-800 text-white relative overflow-hidden shrink-0 mb-6 mx-4 sm:mx-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-black flex items-center gap-2 tracking-tight">
            <Briefcase className="w-8 h-8 text-indigo-400" /> Team Schedule
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-2 max-w-xl">Manage your studio roster, track availability, and assign shooters to upcoming events to avoid conflicts.</p>
        </div>
        
        <div className="flex gap-2 relative z-10">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl">
            Add Member
          </Button>
          <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl shadow-md font-bold shrink-0">
            <Plus className="w-4 h-4 mr-2" /> New Assignment
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden gap-6 mx-4 sm:mx-0 flex-col lg:flex-row">
        
        {/* Left Pane: Team Roster */}
        <div className="w-full lg:w-80 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col shrink-0 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
            <h2 className="font-black text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" /> Team Roster
            </h2>
            <span className="text-xs font-bold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200">
              {TEAM_MEMBERS.length} Total
            </span>
          </div>
          
          <div className="p-4 border-b border-slate-100 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search team..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium shadow-sm bg-slate-50"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
            {TEAM_MEMBERS.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase())).map(member => (
              <div key={member.id} className="p-3 rounded-2xl hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm group-hover:border-indigo-100 transition-colors">
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${getStatusColor(member.status)}`} title={member.status} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{member.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-0.5">
                    {getRoleIcon(member.role)} {member.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Pane: Timeline / Assignments Canvas */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
            <div>
              <h2 className="font-black text-slate-900 text-lg">Upcoming Shoots</h2>
              <p className="text-sm font-medium text-slate-500">Assign staff to fulfill required roles.</p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl border-slate-200 bg-white font-bold text-slate-600 shadow-sm">
                This Week
              </Button>
              <Button variant="outline" className="rounded-xl border-slate-200 bg-white font-bold text-slate-600 shadow-sm">
                October
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar bg-slate-50/50">
            {shoots.map(shoot => {
              const assignedCount = shoot.requiredRoles.filter(r => r.assignedTo !== null).length
              const totalRoles = shoot.requiredRoles.length
              const isFullyAssigned = assignedCount === totalRoles

              return (
                <div key={shoot.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row group transition-all hover:border-indigo-200 hover:shadow-md">
                  
                  {/* Shoot Details Info */}
                  <div className="p-6 lg:w-[400px] border-b lg:border-b-0 lg:border-r border-slate-100 bg-white flex flex-col justify-between shrink-0">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-black text-slate-900 text-xl group-hover:text-primary transition-colors">{shoot.title}</h3>
                        {isFullyAssigned ? (
                          <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                            <CheckCircle2 className="w-3 h-3" /> Fully Staffed
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 bg-rose-50 text-rose-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                            <AlertCircle className="w-3 h-3" /> Needs Staff
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                          <CalendarIcon className="w-4 h-4 text-slate-400" /> {shoot.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                          <Clock className="w-4 h-4 text-slate-400" /> {shoot.time}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                          <MapPin className="w-4 h-4 text-slate-400" /> {shoot.location}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Staffing Progress</p>
                      <div className="flex items-center gap-3">
                        <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${isFullyAssigned ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                            style={{ width: `${(assignedCount / totalRoles) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600">{assignedCount} / {totalRoles}</span>
                      </div>
                    </div>
                  </div>

                  {/* Required Roles / Assignment Slots */}
                  <div className="p-6 flex-1 bg-slate-50/50">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Required Crew ({totalRoles})</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                      {shoot.requiredRoles.map(reqRole => {
                        const assignedMember = reqRole.assignedTo ? TEAM_MEMBERS.find(m => m.id === reqRole.assignedTo) : null

                        return (
                          <div 
                            key={reqRole.id}
                            className={`p-3 rounded-2xl border transition-all flex flex-col gap-3 ${
                              assignedMember 
                                ? "bg-white border-slate-200 shadow-sm" 
                                : "bg-white border-dashed border-rose-200 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer"
                            }`}
                            onClick={() => !assignedMember && handleAssign(shoot.id, reqRole.id)} // Click to assign mock
                          >
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                              <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                {getRoleIcon(reqRole.role)}
                              </span>
                              {reqRole.role}
                            </div>

                            {assignedMember ? (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <img src={assignedMember.avatar} alt={assignedMember.name} className="w-8 h-8 rounded-full border border-slate-200 object-cover" />
                                  <span className="font-bold text-sm text-slate-900">{assignedMember.name}</span>
                                </div>
                                <Button 
                                  variant="ghost" size="icon" 
                                  onClick={(e) => { e.stopPropagation(); handleAssign(shoot.id, reqRole.id) }} // Unassign mock
                                  className="h-6 w-6 rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                                >
                                  <UserMinus className="w-3 h-3" />
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-indigo-500 font-bold text-sm h-8">
                                <UserPlus className="w-4 h-4" /> Assign Member
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                </div>
              )
            })}
          </div>

        </div>

      </div>
    </div>
  )
}
