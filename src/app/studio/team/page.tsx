"use client"

import React, { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { 
  Search, Plus, Filter, Mail, Phone, MapPin, CheckCircle, 
  ShieldAlert, Users, Calendar as CalendarIcon, Clock, Check, 
  DollarSign, ExternalLink, UserCheck, UserX, UserPlus, XCircle, MoreVertical, QrCode
} from "lucide-react"

function TeamPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "employees"

  // Quick helper to switch tabs
  const setTab = (tab: string) => {
    router.push(`/studio/team?tab=${tab}`)
  }

  // Mock Data
  const employees = [
    {
      id: "EM-01",
      name: "Zoya Ali",
      role: "Studio Director & Owner",
      type: "Full-time",
      salary: "Rs. 150,000/mo",
      email: "zoya@studio.com",
      phone: "+92 300 1111111",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
    },
    {
      id: "EM-02",
      name: "Fahad Ahmed",
      role: "Senior Lead Photographer",
      type: "Full-time",
      salary: "Rs. 85,000/mo",
      email: "fahad@studio.com",
      phone: "+92 321 2222222",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150"
    },
    {
      id: "EM-03",
      name: "Alizeh Khan",
      role: "Senior Video Editor",
      type: "Full-time",
      salary: "Rs. 70,000/mo",
      email: "alizeh@studio.com",
      phone: "+92 300 4444444",
      status: "On Leave",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150"
    },
    {
      id: "EM-04",
      name: "Zain Malik",
      role: "Studio Administrator",
      type: "Full-time",
      salary: "Rs. 50,000/mo",
      email: "zain@studio.com",
      phone: "+92 312 9998887",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150"
    }
  ]

  const freelancers = [
    {
      id: "FL-01",
      name: "Mansoor Shah",
      role: "Cinematographer / Director",
      dayRate: "Rs. 15,000/day",
      specialization: "Sony FX3 / Cinematic lighting",
      email: "mansoor.shah@gmail.com",
      phone: "+92 333 3333333",
      status: "Available",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150"
    },
    {
      id: "FL-02",
      name: "Bilal Ahmed",
      role: "Drone Operator & Assistant",
      dayRate: "Rs. 18,000/day",
      specialization: "DJI Mavic 3 Pro / FPV Drone",
      email: "bilal.ahmed@gmail.com",
      phone: "+92 322 7776665",
      status: "Booked Today",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=150"
    },
    {
      id: "FL-03",
      name: "Sana Mirza",
      role: "Female Portrait Specialist",
      dayRate: "Rs. 20,000/day",
      specialization: "Fujifilm GFX / Editorial Portraits",
      email: "sana.mirza@gmail.com",
      phone: "+92 315 4443332",
      status: "Available",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150"
    },
    {
      id: "FL-04",
      name: "Hammad Butt",
      role: "Lighting Director",
      dayRate: "Rs. 12,000/day",
      specialization: "Aputure LED / Flash Sync setups",
      email: "hammad.butt@gmail.com",
      phone: "+92 345 8887776",
      status: "Available",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"
    }
  ]

  const wagers = [
    {
      id: "DW-01",
      name: "Arshad Masih",
      role: "Lead Lightboy & Grip",
      rate: "Rs. 3,500/shift",
      shifts: 12,
      unpaid: "Rs. 7,000",
      paid: "Rs. 35,000",
      phone: "+92 301 2221111",
      status: "On Shift"
    },
    {
      id: "DW-02",
      name: "Muhammad Rafique",
      role: "Assistant Second Camera",
      rate: "Rs. 5,000/shift",
      shifts: 8,
      unpaid: "Rs. 0",
      paid: "Rs. 40,000",
      phone: "+92 322 5556667",
      status: "Standby"
    },
    {
      id: "DW-03",
      name: "Sharafat Ali",
      role: "Boom Operator & Sound Crew",
      rate: "Rs. 4,000/shift",
      shifts: 6,
      unpaid: "Rs. 4,000",
      paid: "Rs. 20,000",
      phone: "+92 331 4445556",
      status: "Standby"
    },
    {
      id: "DW-04",
      name: "Kamran Butt",
      role: "Second Editor & Runner",
      rate: "Rs. 3,000/shift",
      shifts: 15,
      unpaid: "Rs. 6,000",
      paid: "Rs. 39,000",
      phone: "+92 300 8881112",
      status: "Off Duty"
    }
  ]

  const attendance = [
    {
      name: "Zoya Ali",
      role: "Studio Director",
      timeIn: "09:12 AM",
      timeOut: "--",
      status: "On Time",
      location: "Lahore HQ",
      verification: "Selfie Verified"
    },
    {
      name: "Fahad Ahmed",
      role: "Lead Photographer",
      timeIn: "09:30 AM",
      timeOut: "--",
      status: "On Time",
      location: "Lahore HQ",
      verification: "Selfie Verified"
    },
    {
      name: "Zain Malik",
      role: "Studio Admin",
      timeIn: "10:15 AM",
      timeOut: "--",
      status: "Late (15m)",
      location: "Lahore HQ",
      verification: "Selfie Verified"
    },
    {
      name: "Arshad Masih",
      role: "Lightboy / Daily Wager",
      timeIn: "08:45 AM",
      timeOut: "--",
      status: "On Time",
      location: "Gymkhana Event Site",
      verification: "Lead Verified"
    },
    {
      name: "Alizeh Khan",
      role: "Senior Editor",
      timeIn: "--",
      timeOut: "--",
      status: "On Leave",
      location: "Approved Medical",
      verification: "Admin Documented"
    }
  ]

  const schedules = [
    {
      id: "SCH-01",
      event: "Ayesha & Hamza Wedding (Shadi)",
      date: "June 15, 2026",
      time: "4:00 PM - 12:00 AM",
      venue: "Lahore Gymkhana Club",
      crew: [
        { name: "Fahad Ahmed", role: "Lead Shooter" },
        { name: "Mansoor Shah", role: "Cinematographer" },
        { name: "Bilal Ahmed", role: "Drone Operator" },
        { name: "Arshad Masih", role: "Lightboy" }
      ],
      status: "Confirmed"
    },
    {
      id: "SCH-02",
      event: "Ali Raza Corporate Event",
      date: "June 18, 2026",
      time: "9:00 AM - 6:00 PM",
      venue: "Marriott Hotel Karachi",
      crew: [
        { name: "Fahad Ahmed", role: "Lead Shooter" },
        { name: "Sana Mirza", role: "Portrait specialist" },
        { name: "Sharafat Ali", role: "Sound Crew" }
      ],
      status: "Confirmed"
    },
    {
      id: "SCH-03",
      event: "Zainab & Usman Pre-Wedding",
      date: "June 25, 2026",
      time: "2:00 PM - 7:00 PM",
      venue: "Margalla Hills, Islamabad",
      crew: [
        { name: "Fahad Ahmed", role: "Lead Shooter" },
        { name: "Sana Mirza", role: "Portrait specialist" }
      ],
      status: "Pending Crew Confirm"
    }
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-[#0F5B3E]" /> Team OS Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-[13px] font-medium">
            Manage your full-time staff, contract freelancers, wagers, attendance sheets, and event schedules.
          </p>
        </div>
        
        {/* Action Button */}
        <button className="px-4 py-2 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl font-bold text-[12px] transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-3.5 h-3.5" /> 
          {activeTab === "employees" && "Add Employee"}
          {activeTab === "freelancers" && "Register Freelancer"}
          {activeTab === "wagers" && "Add Daily Wager"}
          {activeTab === "attendance" && "Record Manual Attendance"}
          {activeTab === "scheduling" && "Schedule Event Shift"}
        </button>
      </div>

      {/* Tab Navigation Menu */}
      <div className="flex overflow-x-auto pb-1 bg-white dark:bg-white/5 border border-[#ECE7DF] dark:border-white/10 rounded-[14px] p-1 gap-1 shrink-0 scrollbar-none">
        <button 
          onClick={() => setTab("employees")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "employees" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
          }`}
        >
          Employees
        </button>
        <button 
          onClick={() => setTab("freelancers")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "freelancers" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
          }`}
        >
          Freelancers
        </button>
        <button 
          onClick={() => setTab("wagers")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "wagers" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
          }`}
        >
          Daily Wagers
        </button>
        <button 
          onClick={() => setTab("attendance")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "attendance" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
          }`}
        >
          Daily Attendance
        </button>
        <button 
          onClick={() => setTab("scheduling")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "scheduling" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
          }`}
        >
          Shift Scheduler
        </button>
      </div>

      {/* Tabs View Content */}

      {/* Tab 1: Employees */}
      {activeTab === "employees" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {employees.map((member) => (
              <Card key={member.id} className="p-0 border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden rounded-[16px] shadow-sm flex flex-col justify-between">
                <div className="p-5 text-center relative flex-1 flex flex-col justify-center">
                  <span className={`absolute top-3.5 right-3.5 px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase ${
                    member.status === 'Active' 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400' 
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400'
                  }`}>
                    {member.status}
                  </span>
                  
                  <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-[#ECE7DF] dark:border-white/10" />
                  <h3 className="text-[13px] font-black text-gray-950 dark:text-white leading-tight">{member.name}</h3>
                  <p className="text-[10.5px] font-bold text-[#0F5B3E] dark:text-emerald-400 mt-1">{member.role}</p>
                  
                  <div className="mt-3 inline-block">
                    <span className="px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400">
                      {member.type} • {member.salary}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-[#FAF8F5] dark:bg-black/20 border-t border-gray-50 dark:border-white/5 space-y-1.5 text-left text-[11px] text-gray-600 dark:text-gray-400 font-semibold">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <a href={`mailto:${member.email}`} className="hover:text-[#0F5B3E] truncate">{member.email}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>{member.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 divide-x divide-gray-100 dark:divide-white/10 border-t border-gray-100 dark:border-white/10">
                  <button className="py-2.5 text-[10.5px] font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    Edit Profile
                  </button>
                  <button className="py-2.5 text-[10.5px] font-bold text-[#0F5B3E] dark:text-emerald-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    Payroll Record
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Freelancers */}
      {activeTab === "freelancers" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {freelancers.map((member) => (
              <Card key={member.id} className="p-0 border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden rounded-[16px] shadow-sm flex flex-col justify-between">
                <div className="p-5 text-center relative flex-1 flex flex-col justify-center">
                  <span className={`absolute top-3.5 right-3.5 px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase ${
                    member.status === 'Available' 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400' 
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400'
                  }`}>
                    {member.status}
                  </span>
                  
                  <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-[#ECE7DF] dark:border-white/10" />
                  <h3 className="text-[13px] font-black text-gray-950 dark:text-white leading-tight">{member.name}</h3>
                  <p className="text-[10.5px] font-bold text-[#0F5B3E] dark:text-emerald-400 mt-1">{member.role}</p>
                  
                  <div className="mt-3 inline-block">
                    <span className="px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400">
                      {member.dayRate}
                    </span>
                  </div>

                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold mt-2.5 block truncate">
                    Specs: {member.specialization}
                  </p>
                </div>

                <div className="p-3.5 bg-[#FAF8F5] dark:bg-black/20 border-t border-gray-50 dark:border-white/5 space-y-1.5 text-left text-[11px] text-gray-600 dark:text-gray-400 font-semibold">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <a href={`mailto:${member.email}`} className="hover:text-[#0F5B3E] truncate">{member.email}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>{member.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 divide-x divide-gray-100 dark:divide-white/10 border-t border-gray-100 dark:border-white/10">
                  <button className="py-2.5 text-[10.5px] font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    Message
                  </button>
                  <button className="py-2.5 text-[10.5px] font-bold text-[#0F5B3E] dark:text-emerald-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    Assign Shift
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Daily Wagers */}
      {activeTab === "wagers" && (
        <Card className="p-5 border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 rounded-[16px] shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#ECE7DF] dark:border-white/10 text-[10.5px] text-gray-400 dark:text-gray-500 font-extrabold uppercase">
                  <th className="pb-3.5 pl-2">Name</th>
                  <th className="pb-3.5">Standard Rate</th>
                  <th className="pb-3.5 text-center">Shifts worked</th>
                  <th className="pb-3.5">Paid This Month</th>
                  <th className="pb-3.5">Pending Payout</th>
                  <th className="pb-3.5 text-center">Current Status</th>
                  <th className="pb-3.5 text-right pr-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-white/5 text-[11px] font-semibold text-gray-700 dark:text-gray-200">
                {wagers.map((worker) => (
                  <tr key={worker.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pl-2">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 dark:text-white">{worker.name}</span>
                        <span className="text-[9.5px] text-gray-400 font-medium">{worker.role} • {worker.phone}</span>
                      </div>
                    </td>
                    <td className="py-3 font-bold text-gray-900 dark:text-white">{worker.rate}</td>
                    <td className="py-3 text-center font-bold text-gray-500 dark:text-gray-400">{worker.shifts} shifts</td>
                    <td className="py-3 text-emerald-600 font-bold">{worker.paid}</td>
                    <td className="py-3 text-rose-600 font-bold">{worker.unpaid}</td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-md text-[8.5px] font-extrabold uppercase ${
                        worker.status === "On Shift" 
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20" 
                          : worker.status === "Standby" 
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-500/20" 
                          : "bg-gray-100 text-gray-600 dark:bg-white/10"
                      }`}>
                        {worker.status}
                      </span>
                    </td>
                    <td className="py-3 text-right pr-2">
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-2.5 py-1 text-[10px] font-bold text-[#0F5B3E] dark:text-emerald-400 border border-[#0F5B3E] dark:border-emerald-500/30 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-500/10">
                          Record Payout
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab 4: Daily Attendance */}
      {activeTab === "attendance" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Attendance Table */}
          <Card className="lg:col-span-2 p-5 border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 rounded-[16px] shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-[13px] font-bold text-gray-900 dark:text-white">Active Roll Call (Today)</h3>
              <span className="text-[10px] text-gray-400 font-bold">Saturday, June 13, 2026</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#ECE7DF] dark:border-white/10 text-[10px] text-gray-400 dark:text-gray-500 font-extrabold uppercase">
                    <th className="pb-3 pl-2">Name</th>
                    <th className="pb-3">Logged In</th>
                    <th className="pb-3">Logged Out</th>
                    <th className="pb-3">Gate Status</th>
                    <th className="pb-3">Location IP</th>
                    <th className="pb-3 text-right pr-2">Verify</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5 text-[11px] font-semibold text-gray-700 dark:text-gray-200">
                  {attendance.map((sheet, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 pl-2">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 dark:text-white">{sheet.name}</span>
                          <span className="text-[9.5px] text-gray-400 font-medium">{sheet.role}</span>
                        </div>
                      </td>
                      <td className="py-3.5">{sheet.timeIn}</td>
                      <td className="py-3.5">{sheet.timeOut}</td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded-md text-[8.5px] font-extrabold uppercase ${
                          sheet.status === "On Time" 
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20" 
                            : sheet.status.startsWith("Late") 
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-500/20" 
                            : "bg-rose-100 text-rose-800 dark:bg-rose-500/20"
                        }`}>
                          {sheet.status}
                        </span>
                      </td>
                      <td className="py-3.5 font-medium text-gray-500 dark:text-gray-400">{sheet.location}</td>
                      <td className="py-3.5 text-right pr-2">
                        <span className="text-[9.5px] text-emerald-600 dark:text-emerald-400 font-bold block">
                          {sheet.verification}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Quick Check-in Tracker Portal */}
          <Card className="p-5 border border-gray-100 dark:border-white/10 bg-[#FAF8F5] dark:bg-white/5 rounded-[16px] shadow-sm flex flex-col justify-between min-h-[300px]">
            <div className="space-y-4">
              <h3 className="text-[13px] font-bold text-gray-950 dark:text-white">QR Code Selfie Check-in</h3>
              <p className="text-[11px] text-gray-400 dark:text-gray-400 leading-relaxed font-semibold">
                Staff can scan this dynamic studio QR code using their phones to check in instantly with geolocation verification.
              </p>
              
              {/* QR Mockup */}
              <div className="w-32 h-32 bg-white p-2 border border-[#ECE7DF] rounded-xl mx-auto flex items-center justify-center relative shadow-sm">
                <QrCode className="w-full h-full text-gray-800" />
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-xl cursor-pointer">
                  <span className="text-[10px] text-white bg-black/80 px-2 py-1 rounded font-bold">Refresh Code</span>
                </div>
              </div>

              <div className="text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E6F0EC] dark:bg-emerald-500/10 text-[#0F5B3E] dark:text-emerald-400 text-[10.5px] font-extrabold rounded-lg">
                  <Clock className="w-3.5 h-3.5" /> Geo-Fencing Active (100m)
                </span>
              </div>
            </div>

            <button className="w-full py-2 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white font-bold rounded-xl text-[11px] transition-colors mt-4">
              Download Print Signage
            </button>
          </Card>
        </div>
      )}

      {/* Tab 5: Shift Scheduler */}
      {activeTab === "scheduling" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Shifts list */}
            <div className="lg:col-span-2 space-y-4">
              {schedules.map((shift) => (
                <Card key={shift.id} className="p-5 border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 rounded-[16px] shadow-sm space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <span className="text-[9px] font-extrabold text-[#0F5B3E] dark:text-emerald-400 uppercase tracking-widest bg-[#E6F0EC] dark:bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                        {shift.status}
                      </span>
                      <h3 className="text-[13.5px] font-black text-gray-950 dark:text-white mt-1.5">{shift.event}</h3>
                    </div>
                    <div className="flex flex-col text-left sm:text-right">
                      <span className="text-[11px] font-bold text-gray-900 dark:text-white flex items-center sm:justify-end gap-1">
                        <CalendarIcon className="w-3.5 h-3.5 text-gray-400" /> {shift.date}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold mt-0.5 flex items-center sm:justify-end gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" /> {shift.time}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] dark:bg-black/20 rounded-xl space-y-2">
                    <span className="text-[9.5px] text-gray-400 font-bold block uppercase tracking-wider">Assigned Roster ({shift.crew.length})</span>
                    <div className="flex flex-wrap gap-2">
                      {shift.crew.map((cr, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-white/5 border border-[#ECE7DF] dark:border-white/10 rounded-lg text-[10.5px] font-bold text-gray-700 dark:text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0F5B3E]" />
                          <span>{cr.name} <span className="text-[9px] text-gray-400 font-medium">({cr.role})</span></span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-1 text-[11px] font-bold">
                    <span className="text-gray-400 font-bold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" /> {shift.venue}
                    </span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 rounded-lg transition-colors">
                        Edit Crew
                      </button>
                      <button className="px-3 py-1 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-lg transition-colors">
                        Send Briefing
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Calendar representation mini sidebar */}
            <Card className="p-5 border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 rounded-[16px] shadow-sm space-y-4">
              <h3 className="text-[13px] font-bold text-gray-900 dark:text-white">June 2026 Calendar</h3>
              
              {/* Mini Calendar Grid */}
              <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase pb-2 border-b border-[#ECE7DF] dark:border-white/10">
                <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
              </div>
              <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-bold text-gray-700 dark:text-gray-300">
                {/* Blank days before June 1 */}
                <span className="text-gray-300 dark:text-gray-700">25</span>
                <span className="text-gray-300 dark:text-gray-700">26</span>
                <span className="text-gray-300 dark:text-gray-700">27</span>
                <span className="text-gray-300 dark:text-gray-700">28</span>
                <span className="text-gray-300 dark:text-gray-700">29</span>
                <span className="text-gray-300 dark:text-gray-700">30</span>
                <span>1</span>
                <span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
                <span>9</span><span>10</span><span>11</span><span>12</span>
                {/* Highlighted Event Days */}
                <span className="w-6 h-6 rounded-full bg-[#0F5B3E] text-white flex items-center justify-center mx-auto shadow-sm cursor-pointer" title="Ayesha & Hamza Wedding">13</span>
                <span>14</span>
                <span className="w-6 h-6 rounded-full bg-[#E6F0EC] dark:bg-emerald-500/20 text-[#0F5B3E] dark:text-emerald-400 flex items-center justify-center mx-auto cursor-pointer" title="Ali Raza Corporate Event">15</span>
                <span>16</span><span>17</span>
                <span className="w-6 h-6 rounded-full bg-[#E6F0EC] dark:bg-emerald-500/20 text-[#0F5B3E] dark:text-emerald-400 flex items-center justify-center mx-auto cursor-pointer" title="Another event">18</span>
                <span>19</span><span>20</span>
                <span>21</span><span>22</span><span>23</span><span>24</span>
                <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto cursor-pointer" title="Zainab & Usman Pre-wedding">25</span>
                <span>26</span><span>27</span>
                <span>28</span><span>29</span><span>30</span>
                <span className="text-gray-300 dark:text-gray-700">1</span>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-gray-100 dark:border-white/10 text-[10.5px] font-semibold text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0F5B3E] shrink-0" />
                  <span>Today (June 13)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E6F0EC] border border-[#0F5B3E] shrink-0" />
                  <span>Fully Staffed Events (2)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-100 border border-amber-500 shrink-0" />
                  <span>Needs Staff Assignment (1)</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

    </div>
  )
}

export default function TeamPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-48">
        <span className="text-sm font-bold text-gray-400 dark:text-gray-500 animate-pulse">Loading Team Directory...</span>
      </div>
    }>
      <TeamPageContent />
    </Suspense>
  )
}
