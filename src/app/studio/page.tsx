"use client"

import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useStudioApps } from "@/contexts/StudioAppContext"
import { 
  Camera, CheckCircle, Clock, Wallet, 
  TrendingUp, Users, ArrowUpRight, ArrowDownRight,
  MoreVertical, Calendar as CalendarIcon, Video,
  Image as ImageIcon, UploadCloud, ChevronDown, ChevronRight,
  Folder, BarChart3, Sparkles, FileText, Star, QrCode, MonitorPlay
} from "lucide-react"

export default function StudioDashboard() {
  const router = useRouter()
  const { isAppInstalled, installedAppIds } = useStudioApps()

  // Dynamic Metrics configurations
  const metrics = [
    {
      id: "projects",
      title: "Total Projects",
      value: "58",
      trend: "↑ 18%",
      trendText: "from last month",
      trendColor: "text-emerald-600 dark:text-emerald-400",
      icon: Folder,
      bgColor: "bg-[#E6F0EC] dark:bg-emerald-500/10",
      iconColor: "text-[#0F5B3E] dark:text-emerald-400",
    },
    {
      id: "bookings",
      title: "Upcoming Bookings",
      value: "12",
      trend: "Next:",
      trendText: "Ayesha Hamza",
      trendColor: "text-[#D9467A] dark:text-pink-400",
      icon: CalendarIcon,
      bgColor: "bg-rose-50 dark:bg-rose-500/10",
      iconColor: "text-[#E11D48] dark:text-rose-400",
    },
    {
      id: "deliveries",
      title: "Deliveries This Month",
      value: "24",
      trend: "↑ 24%",
      trendText: "from last month",
      trendColor: "text-emerald-600 dark:text-emerald-400",
      icon: UploadCloud,
      bgColor: "bg-amber-50 dark:bg-amber-500/10",
      iconColor: "text-[#D97706] dark:text-amber-400",
    },
    {
      id: "revenue",
      title: "Revenue This Month",
      value: "Rs. 2,45,000",
      trend: "↑ 32%",
      trendText: "from last month",
      trendColor: "text-emerald-600 dark:text-emerald-400",
      icon: BarChart3,
      bgColor: "bg-[#E6F0EC] dark:bg-emerald-500/10",
      iconColor: "text-[#059669] dark:text-emerald-400",
    },
    ...(isAppInstalled("team") ? [{
      id: "team",
      title: "Team Attendance",
      value: "9/12 Present",
      trend: "82%",
      trendText: "attendance rate",
      trendColor: "text-emerald-600 dark:text-emerald-400",
      icon: Users,
      bgColor: "bg-blue-50 dark:bg-blue-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
    }] : []),
    ...(isAppInstalled("accounting") ? [{
      id: "accounting",
      title: "Outstanding Invoices",
      value: "Rs. 85,000",
      trend: "5 unpaid",
      trendText: "invoices pending",
      trendColor: "text-amber-600 dark:text-amber-400",
      icon: Wallet,
      bgColor: "bg-amber-50 dark:bg-amber-500/10",
      iconColor: "text-amber-600 dark:text-amber-400",
    }] : []),
    ...(isAppInstalled("invitations") ? [{
      id: "invitations",
      title: "Invitations RSVP",
      value: "142 RSVPs",
      trend: "+18 today",
      trendText: "responses collected",
      trendColor: "text-emerald-600 dark:text-emerald-400",
      icon: QrCode,
      bgColor: "bg-purple-50 dark:bg-purple-500/10",
      iconColor: "text-purple-600 dark:text-purple-400",
    }] : []),
    ...(isAppInstalled("memories") ? [{
      id: "memories",
      title: "Album Views",
      value: "4,210 views",
      trend: "+320",
      trendText: "views this week",
      trendColor: "text-emerald-600 dark:text-emerald-400",
      icon: Camera,
      bgColor: "bg-[#E6F0EC] dark:bg-emerald-500/10",
      iconColor: "text-[#0F5B3E] dark:text-emerald-400",
    }] : []),
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Sub-header Date Filter */}
      <div className="flex justify-end items-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white dark:bg-white/5 border border-[#ECE7DF] dark:border-white/10 rounded-[10px] text-[12px] font-bold text-gray-700 dark:text-gray-200 shadow-xs cursor-pointer select-none hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
          <span>May 20 – Jun 20, 2025</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>

      {/* Top Metrics Row - Dynamically scales depending on active apps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {metrics.map((metric) => (
          <div key={metric.id} className="py-3.5 px-4.5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-[0_6px_24px_rgba(0,0,0,0.015)] transition-all flex items-center justify-between">
            <div className="flex flex-col text-left">
              <span className="text-[10.5px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{metric.title}</span>
              <h3 className="text-[21px] font-black text-gray-900 dark:text-white leading-none mt-1">{metric.value}</h3>
              <div className={`text-[10px] font-bold ${metric.trendColor} flex items-center gap-1 mt-2 leading-none`}>
                <span>{metric.trend}</span>
                <span className="text-gray-400 dark:text-gray-500 font-semibold">{metric.trendText}</span>
              </div>
            </div>
            <div className={`w-10 h-10 rounded-xl ${metric.bgColor} flex items-center justify-center ${metric.iconColor} shrink-0`}>
              <metric.icon className="w-4.5 h-4.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Primary Overview Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Widget 1: Project Overview */}
        <div className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-[0_6px_24px_rgba(0,0,0,0.015)] transition-all flex flex-col justify-between h-[300px]">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-gray-900 dark:text-white">Project Overview</h3>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-white/5 border border-[#ECE7DF] dark:border-white/10 rounded-[8px] text-[11px] font-bold text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
              <span>This Month</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-4 my-2">
            {/* Donut Chart SVG */}
            <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#F1EFE9" className="dark:stroke-white/5" strokeWidth="12" />
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#0A5C36" strokeWidth="12" strokeDasharray="97.9 238.76" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#E11D48" strokeWidth="12" strokeDasharray="66.85 238.76" strokeDashoffset="-97.9" />
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#EAB308" strokeWidth="12" strokeDasharray="50.14 238.76" strokeDashoffset="-164.75" />
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#374151" strokeWidth="12" strokeDasharray="23.87 238.76" strokeDashoffset="-214.89" />
              </svg>
              {/* Center Info */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[20px] font-black text-gray-900 dark:text-white leading-none">58</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Total</span>
              </div>
            </div>

            {/* Legend Column */}
            <div className="flex-1 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0A5C36] shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">Completed</span>
                </div>
                <span className="text-gray-900 dark:text-white font-black">24 <span className="text-gray-400 font-medium">(41%)</span></span>
              </div>
              
              <div className="flex items-center justify-between text-[11px] font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">In Progress</span>
                </div>
                <span className="text-gray-900 dark:text-white font-black">16 <span className="text-gray-400 font-medium">(28%)</span></span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308] shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">Upcoming</span>
                </div>
                <span className="text-gray-900 dark:text-white font-black">12 <span className="text-gray-400 font-medium">(21%)</span></span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#374151] shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">Cancelled</span>
                </div>
                <span className="text-gray-900 dark:text-white font-black">6 <span className="text-gray-400 font-medium">(10%)</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Widget 2: Revenue Overview */}
        <div className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-[0_6px_24px_rgba(0,0,0,0.015)] transition-all flex flex-col justify-between h-[300px]">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-gray-900 dark:text-white">Revenue Overview</h3>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-white/5 border border-[#ECE7DF] dark:border-white/10 rounded-[8px] text-[11px] font-bold text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
              <span>This Month</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
          </div>
          
          <div className="mt-1 flex flex-col items-start">
            <span className="text-[22px] font-black text-gray-900 dark:text-white leading-none">Rs. 2,45,000</span>
            <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-[6px] bg-[#E6F0EC] dark:bg-emerald-500/10 text-[#0F5B3E] dark:text-emerald-400 text-[10px] font-bold">
              <span>↑ 32%</span>
              <span className="text-[#0F5B3E]/75 dark:text-emerald-400/75 font-semibold">vs last month</span>
            </div>
          </div>

          {/* Smooth SVG Line Chart */}
          <div className="relative w-full h-[140px] mt-2 flex flex-col justify-end">
            <div className="absolute inset-x-0 bottom-6 top-2 flex flex-col justify-between">
              {/* Grid Lines */}
              <div className="w-full flex items-center justify-between text-[9px] font-bold text-gray-300 dark:text-white/10">
                <span className="w-6 shrink-0 text-left">300k</span>
                <div className="flex-1 border-t border-dashed border-gray-200 dark:border-white/10 ml-2" />
              </div>
              <div className="w-full flex items-center justify-between text-[9px] font-bold text-gray-300 dark:text-white/10">
                <span className="w-6 shrink-0 text-left">200k</span>
                <div className="flex-1 border-t border-dashed border-gray-200 dark:border-white/10 ml-2" />
              </div>
              <div className="w-full flex items-center justify-between text-[9px] font-bold text-gray-300 dark:text-white/10">
                <span className="w-6 shrink-0 text-left">100k</span>
                <div className="flex-1 border-t border-dashed border-gray-200 dark:border-white/10 ml-2" />
              </div>
              <div className="w-full flex items-center justify-between text-[9px] font-bold text-gray-300 dark:text-white/10">
                <span className="w-6 shrink-0 text-left">0</span>
                <div className="flex-1 border-t border-dashed border-gray-200 dark:border-white/10 ml-2" />
              </div>
            </div>

            {/* Line Path */}
            <svg className="absolute inset-x-0 bottom-6 left-8 right-0 h-[100px] w-[calc(100%-32px)] overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0A5C36" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0A5C36" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Gradient Fill under Line */}
              <path d="M 0 90 Q 15 50, 20 50 T 40 65 T 60 40 T 80 50 T 100 20 L 100 100 L 0 100 Z" fill="url(#chartGradient)" />
              {/* Curve Line */}
              <path d="M 0 90 Q 15 50, 20 50 T 40 65 T 60 40 T 80 50 T 100 20" fill="none" stroke="#0A5C36" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* X-Axis Labels */}
            <div className="w-full flex justify-between text-[9px] font-bold text-gray-400 dark:text-gray-500 pl-8 pt-1">
              <span>May 20</span>
              <span>May 27</span>
              <span>Jun 03</span>
              <span>Jun 10</span>
              <span>Jun 17</span>
              <span>Jun 20</span>
            </div>
          </div>
        </div>

        {/* Widget 3: Recent Activity */}
        <div className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-[0_6px_24px_rgba(0,0,0,0.015)] transition-all flex flex-col justify-between h-[300px]">
          <h3 className="text-[14px] font-bold text-gray-900 dark:text-white">Recent Activity</h3>
          
          <div className="flex-1 flex flex-col justify-center gap-2.5 my-2">
            {/* Activity 1 */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 dark:text-white">Ayesha & Hamza Wedding</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">Gallery delivered</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-gray-400 font-medium">2h ago</span>
                <div className="w-4 h-4 rounded-full bg-[#0F5B3E] flex items-center justify-center text-white text-[8px] font-bold">✓</div>
              </div>
            </div>

            {/* Activity 2 */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2.5">
                <img className="w-7 h-7 rounded-full object-cover shrink-0" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150" alt="Ali Raza" />
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 dark:text-white">Ali Raza Event</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">Payment received</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-gray-400 font-medium">5h ago</span>
                <div className="w-4 h-4 rounded-full bg-[#0F5B3E] flex items-center justify-center text-white text-[8px] font-bold">✓</div>
              </div>
            </div>

            {/* Activity 3 */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0">
                  <Camera className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 dark:text-white">Sarah Khan Shoot</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">Project created</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-gray-400 font-medium">1d ago</span>
                <div className="w-4 h-4 rounded-full bg-[#E11D48] flex items-center justify-center text-white text-[8px] font-bold">+</div>
              </div>
            </div>

            {/* Activity 4 */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 dark:text-white">Ahmed Studio</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">New quotation sent</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-gray-400 font-medium">1d ago</span>
                <div className="w-4 h-4 rounded-full bg-[#E11D48] flex items-center justify-center text-white text-[8px] font-bold">+</div>
              </div>
            </div>

            {/* Activity 5 */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#E6F0EC] dark:bg-emerald-500/10 flex items-center justify-center text-[#0A5C36] dark:text-emerald-400 shrink-0">
                  <ImageIcon className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 dark:text-white">Zainab Pre-Wedding</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">Album approved</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-gray-400 font-medium">2d ago</span>
                <div className="w-4 h-4 rounded-full bg-[#0F5B3E] flex items-center justify-center text-white text-[8px] font-bold">✓</div>
              </div>
            </div>
          </div>

          <button className="w-full py-1.5 border border-[#ECE7DF] dark:border-white/10 rounded-[10px] text-[11px] font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
            View All Activity
          </button>
        </div>
      </div>

      {/* Dynamic Ecosystem Modules Widget Row */}
      {installedAppIds.some(id => ["accounting", "displays", "team", "memories", "invitations"].includes(id)) && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-black text-gray-900 dark:text-white uppercase tracking-wider">
              Ecosystem Modules Status
            </h2>
            <span className="text-[9.5px] bg-[#E6F0EC] text-[#0F5B3E] dark:bg-emerald-500/10 dark:text-emerald-400 font-extrabold px-2.5 py-0.5 rounded-full">
              Live Connected Widgets
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Accounting Pro Widget */}
            {isAppInstalled("accounting") && (
              <div className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-[0_6px_24px_rgba(0,0,0,0.015)] transition-all flex flex-col justify-between h-[340px]">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#E6F0EC] dark:bg-emerald-500/10 flex items-center justify-center text-[#0F5B3E] dark:text-emerald-400">
                        <Wallet className="w-4 h-4" />
                      </div>
                      <h3 className="text-[13px] font-bold text-gray-900 dark:text-white">Accounting Pro Overview</h3>
                    </div>
                    <span className="text-[9.5px] font-extrabold text-emerald-600 dark:text-[#34D399] uppercase">FBR Estimated</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 my-4">
                    <div className="bg-[#FAF8F5] dark:bg-white/[0.02] border border-[#ECE7DF]/40 dark:border-white/5 p-2 rounded-xl text-left">
                      <span className="text-[9px] text-gray-400 font-bold block uppercase">Net Profit</span>
                      <span className="text-[13px] font-black text-emerald-600 dark:text-emerald-400 mt-1 block">Rs. 1,85,000</span>
                    </div>
                    <div className="bg-[#FAF8F5] dark:bg-white/[0.02] border border-[#ECE7DF]/40 dark:border-white/5 p-2 rounded-xl text-left">
                      <span className="text-[9px] text-gray-400 font-bold block uppercase">Total Expenses</span>
                      <span className="text-[13px] font-black text-rose-600 dark:text-rose-400 mt-1 block">Rs. 60,000</span>
                    </div>
                    <div className="bg-[#FAF8F5] dark:bg-white/[0.02] border border-[#ECE7DF]/40 dark:border-white/5 p-2 rounded-xl text-left">
                      <span className="text-[9px] text-gray-400 font-bold block uppercase">Tax Estimate</span>
                      <span className="text-[13px] font-black text-gray-800 dark:text-gray-300 mt-1 block">Rs. 32,500</span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                      <span>Recent Expenses</span>
                      <span>Amount</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-semibold">
                      <span className="text-gray-900 dark:text-white">Freelancer Day-rates (Walima shoot)</span>
                      <span className="text-rose-600 font-bold">- Rs. 15,000</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-semibold">
                      <span className="text-gray-900 dark:text-white">Studio Rent (May 2025)</span>
                      <span className="text-rose-600 font-bold">- Rs. 35,000</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-semibold">
                      <span className="text-gray-900 dark:text-white">Camera Sensor Cleaning</span>
                      <span className="text-rose-600 font-bold">- Rs. 10,000</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#ECE7DF] dark:border-white/10 flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 font-bold">Ledger matched: 100%</span>
                  <button 
                    onClick={() => router.push("/studio/accounting")}
                    className="text-[11px] font-bold text-[#0F5B3E] dark:text-emerald-400 flex items-center gap-1 hover:underline"
                  >
                    Manage Accounting Desk <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* 2. Displays OS Widget */}
            {isAppInstalled("displays") && (
              <div className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-[0_6px_24px_rgba(0,0,0,0.015)] transition-all flex flex-col justify-between h-[340px]">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#E6F0EC] dark:bg-emerald-500/10 flex items-center justify-center text-[#0F5B3E] dark:text-emerald-400">
                        <MonitorPlay className="w-4 h-4" />
                      </div>
                      <h3 className="text-[13px] font-bold text-gray-900 dark:text-white">Displays OS Monitor</h3>
                    </div>
                    <span className="text-[9.5px] font-extrabold text-emerald-600 dark:text-[#34D399] uppercase">3 Connected Screens</span>
                  </div>

                  <div className="space-y-3.5 my-4">
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <span className="font-bold text-gray-900 dark:text-white">Main Entrance Signage</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 font-semibold">Welcome Loop 2025</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#E6F0EC] text-[#0F5B3E] text-[9px] font-extrabold">LIVE</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <span className="font-bold text-gray-900 dark:text-white">VIP Lounge Wall</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 font-semibold">Cinematic Highlights</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#E6F0EC] text-[#0F5B3E] text-[9px] font-extrabold">LIVE</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                        <span className="font-bold text-gray-900 dark:text-white">Main Ballroom Screen</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 font-semibold">Slideshow Loop B</span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-extrabold">STANDBY</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FAF8F5] dark:bg-white/[0.02] border border-[#ECE7DF]/40 dark:border-white/5 p-2 rounded-xl text-left flex items-center justify-between">
                    <div>
                      <span className="text-[9.5px] text-gray-400 font-bold block uppercase">Active Media Playlist</span>
                      <span className="text-[12px] font-bold text-gray-900 dark:text-white">Walima Reception Slideshow</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-semibold">12 mins remaining</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#ECE7DF] dark:border-white/10 flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 font-bold">Signage Uptime: 99.8%</span>
                  <button 
                    onClick={() => router.push("/studio/displays")}
                    className="text-[11px] font-bold text-[#0F5B3E] dark:text-emerald-400 flex items-center gap-1 hover:underline"
                  >
                    Open Live Signage Manager <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* 3. Team OS Widget */}
            {isAppInstalled("team") && (
              <div className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-[0_6px_24px_rgba(0,0,0,0.015)] transition-all flex flex-col justify-between h-[340px]">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#E6F0EC] dark:bg-emerald-500/10 flex items-center justify-center text-[#0F5B3E] dark:text-emerald-400">
                        <Users className="w-4 h-4" />
                      </div>
                      <h3 className="text-[13px] font-bold text-gray-900 dark:text-white">Team OS Operations</h3>
                    </div>
                    <span className="text-[9.5px] font-extrabold text-emerald-600 dark:text-[#34D399] uppercase">Today's Roster</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 my-4">
                    <div className="bg-[#FAF8F5] dark:bg-white/[0.02] border border-[#ECE7DF]/40 dark:border-white/5 p-2 rounded-xl text-left">
                      <span className="text-[9px] text-gray-400 font-bold block uppercase">Present</span>
                      <span className="text-[12px] font-black text-emerald-600 mt-1 block">9 Members</span>
                    </div>
                    <div className="bg-[#FAF8F5] dark:bg-white/[0.02] border border-[#ECE7DF]/40 dark:border-white/5 p-2 rounded-xl text-left">
                      <span className="text-[9px] text-gray-400 font-bold block uppercase">Freelancers</span>
                      <span className="text-[12px] font-black text-blue-600 mt-1 block">4 Active</span>
                    </div>
                    <div className="bg-[#FAF8F5] dark:bg-white/[0.02] border border-[#ECE7DF]/40 dark:border-white/5 p-2 rounded-xl text-left">
                      <span className="text-[9px] text-gray-400 font-bold block uppercase">Daily Wagers</span>
                      <span className="text-[12px] font-black text-purple-600 mt-1 block">6 Booked</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase">
                      <span>Currently shooting</span>
                      <span>Location / Shift</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-semibold">
                      <span className="text-gray-900 dark:text-white">Usman Ali & Mansoor Shah</span>
                      <span className="text-gray-500 font-medium">Lahore Gymkhana • Day 2</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-semibold">
                      <span className="text-gray-900 dark:text-white">Bilal Ahmed (Drone)</span>
                      <span className="text-gray-500 font-medium">Sukh Chayn Gardens • Evening</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#ECE7DF] dark:border-white/10 flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 font-bold">Shift Schedule: Sync Active</span>
                  <button 
                    onClick={() => router.push("/studio/team")}
                    className="text-[11px] font-bold text-[#0F5B3E] dark:text-emerald-400 flex items-center gap-1 hover:underline"
                  >
                    Open Team Planner <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* 4. Memories / Invitations Widget */}
            {(isAppInstalled("memories") || isAppInstalled("invitations")) && (
              <div className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-[0_6px_24px_rgba(0,0,0,0.015)] transition-all flex flex-col justify-between h-[340px]">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#E6F0EC] dark:bg-emerald-500/10 flex items-center justify-center text-[#0F5B3E] dark:text-emerald-400">
                        <Camera className="w-4 h-4" />
                      </div>
                      <h3 className="text-[13px] font-bold text-gray-900 dark:text-white">Memories & Invitations Hub</h3>
                    </div>
                    <span className="text-[9.5px] font-extrabold text-emerald-600 dark:text-[#34D399] uppercase">Client Portals</span>
                  </div>

                  <div className="my-4 p-3 bg-[#FAF8F5] dark:bg-white/[0.02] border border-[#ECE7DF]/40 dark:border-white/5 rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E6F0EC] dark:bg-emerald-500/10 rounded-lg flex items-center justify-center text-[#0F5B3E] dark:text-emerald-400 shrink-0">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-gray-400 font-bold block uppercase">Active Wedding QR</span>
                      <span className="text-[11.5px] font-bold text-gray-900 dark:text-white block truncate">Ayesha & Hamza Guest Portal</span>
                    </div>
                    <button className="px-2.5 py-1 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white text-[10.5px] font-bold rounded-lg transition-colors">
                      Copy Link
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[11px] font-semibold">
                      <span className="text-gray-600 dark:text-gray-400">Total RSVP responses:</span>
                      <span className="text-gray-900 dark:text-white font-bold">142 Guests</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-semibold">
                      <span className="text-gray-600 dark:text-gray-400">Digital Card views:</span>
                      <span className="text-gray-900 dark:text-white font-bold">2,410 views</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-semibold">
                      <span className="text-gray-600 dark:text-gray-400">Guest photos uploaded:</span>
                      <span className="text-gray-900 dark:text-white font-bold">482 photos</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#ECE7DF] dark:border-white/10 flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 font-bold">Security: PIN Protection Active</span>
                  <div className="flex gap-3.5">
                    {isAppInstalled("memories") && (
                      <button 
                        onClick={() => router.push("/studio/memories")}
                        className="text-[10.5px] font-bold text-[#0F5B3E] dark:text-emerald-400 hover:underline"
                      >
                        Albums
                      </button>
                    )}
                    {isAppInstalled("invitations") && (
                      <button 
                        onClick={() => router.push("/studio/invitations")}
                        className="text-[10.5px] font-bold text-[#0F5B3E] dark:text-emerald-400 hover:underline"
                      >
                        RSVPs
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent Projects Section */}
      <div className="p-6 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-[0_6px_24px_rgba(0,0,0,0.015)] transition-all space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-gray-900 dark:text-white">Recent Projects</h3>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-white/5 border border-[#ECE7DF] dark:border-white/10 rounded-[8px] text-[11px] font-bold text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
            <span>View All Projects</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>
        </div>

        {/* Carousel Grid Row */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
            {/* Project Card 1 */}
            <div className="min-w-[240px] flex-1 max-w-[280px] bg-[#FAF8F5] dark:bg-white/[0.02] border border-[#ECE7DF]/50 dark:border-white/5 rounded-[12px] overflow-hidden flex flex-col justify-between shrink-0 snap-start">
              <div className="relative h-32 w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=450" className="w-full h-full object-cover" alt="Wedding" />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-[6px] bg-[#E6F0EC] text-[#0A5C36] text-[9px] font-bold">In Progress</span>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between gap-2.5">
                <div>
                  <h4 className="text-[12px] font-bold text-gray-950 dark:text-white leading-tight">Ayesha & Hamza Wedding</h4>
                  <p className="text-[9.5px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">May 25, 2025 • Lahore</p>
                </div>
                <div className="flex items-center gap-3 text-[9.5px] text-gray-500 dark:text-gray-400 font-semibold">
                  <span className="flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" /> 1280 Photos</span>
                  <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" /> 4 Videos</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0A5C36] rounded-full" style={{ width: '75%' }} />
                  </div>
                  <span className="text-[9.5px] font-bold text-gray-700 dark:text-gray-300">75%</span>
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="min-w-[240px] flex-1 max-w-[280px] bg-[#FAF8F5] dark:bg-white/[0.02] border border-[#ECE7DF]/50 dark:border-white/5 rounded-[12px] overflow-hidden flex flex-col justify-between shrink-0 snap-start">
              <div className="relative h-32 w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=450" className="w-full h-full object-cover" alt="Corporate Event" />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-[6px] bg-pink-100 text-pink-700 text-[9px] font-bold">Upcoming</span>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between gap-2.5">
                <div>
                  <h4 className="text-[12px] font-bold text-gray-950 dark:text-white leading-tight">Ali Raza Corporate Event</h4>
                  <p className="text-[9.5px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">May 28, 2025 • Karachi</p>
                </div>
                <div className="flex items-center gap-3 text-[9.5px] text-gray-500 dark:text-gray-400 font-semibold">
                  <span className="flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" /> 850 Photos</span>
                  <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" /> 2 Videos</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-500 rounded-full" style={{ width: '25%' }} />
                  </div>
                  <span className="text-[9.5px] font-bold text-gray-700 dark:text-gray-300">25%</span>
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="min-w-[240px] flex-1 max-w-[280px] bg-[#FAF8F5] dark:bg-white/[0.02] border border-[#ECE7DF]/50 dark:border-white/5 rounded-[12px] overflow-hidden flex flex-col justify-between shrink-0 snap-start">
              <div className="relative h-32 w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=450" className="w-full h-full object-cover" alt="Pre-Wedding" />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-[6px] bg-[#E6F0EC] text-[#0A5C36] text-[9px] font-bold">In Progress</span>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between gap-2.5">
                <div>
                  <h4 className="text-[12px] font-bold text-gray-950 dark:text-white leading-tight">Zainab & Usman Pre-Wedding</h4>
                  <p className="text-[9.5px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">Jun 02, 2025 • Islamabad</p>
                </div>
                <div className="flex items-center gap-3 text-[9.5px] text-gray-500 dark:text-gray-400 font-semibold">
                  <span className="flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" /> 650 Photos</span>
                  <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" /> 1 Video</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0A5C36] rounded-full" style={{ width: '60%' }} />
                  </div>
                  <span className="text-[9.5px] font-bold text-gray-700 dark:text-gray-300">60%</span>
                </div>
              </div>
            </div>

            {/* Project Card 4 */}
            <div className="min-w-[240px] flex-1 max-w-[280px] bg-[#FAF8F5] dark:bg-white/[0.02] border border-[#ECE7DF]/50 dark:border-white/5 rounded-[12px] overflow-hidden flex flex-col justify-between shrink-0 snap-start">
              <div className="relative h-32 w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=450" className="w-full h-full object-cover" alt="Mehndi" />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-[6px] bg-[#E6F0EC] text-[#0A5C36] text-[9px] font-bold">Completed</span>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between gap-2.5">
                <div>
                  <h4 className="text-[12px] font-bold text-gray-950 dark:text-white leading-tight">Sara Mehndi Event</h4>
                  <p className="text-[9.5px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">May 18, 2025 • Rawalpindi</p>
                </div>
                <div className="flex items-center gap-3 text-[9.5px] text-gray-500 dark:text-gray-400 font-semibold">
                  <span className="flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" /> 950 Photos</span>
                  <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" /> 3 Videos</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0A5C36] rounded-full" style={{ width: '100%' }} />
                  </div>
                  <span className="text-[9.5px] font-bold text-gray-700 dark:text-gray-300">100%</span>
                </div>
              </div>
            </div>

            {/* Project Card 5 */}
            <div className="min-w-[240px] flex-1 max-w-[280px] bg-[#FAF8F5] dark:bg-white/[0.02] border border-[#ECE7DF]/50 dark:border-white/5 rounded-[12px] overflow-hidden flex flex-col justify-between shrink-0 snap-start">
              <div className="relative h-32 w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=450" className="w-full h-full object-cover" alt="Birthday" />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-[6px] bg-[#E6F0EC] text-[#0A5C36] text-[9px] font-bold">Completed</span>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between gap-2.5">
                <div>
                  <h4 className="text-[12px] font-bold text-gray-950 dark:text-white leading-tight">Ahmed Birthday Event</h4>
                  <p className="text-[9.5px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">May 15, 2025 • Lahore</p>
                </div>
                <div className="flex items-center gap-3 text-[9.5px] text-gray-500 dark:text-gray-400 font-semibold">
                  <span className="flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" /> 400 Photos</span>
                  <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" /> 1 Video</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0A5C36] rounded-full" style={{ width: '100%' }} />
                  </div>
                  <span className="text-[9.5px] font-bold text-gray-700 dark:text-gray-300">100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Arrow Navigation Button */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md border border-[#ECE7DF] dark:border-white/10 flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            <ChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-300 ml-0.5" />
          </div>
        </div>
      </div>

      {/* Team, Tasks, and Packages Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Widget 1: Team Members */}
        <div className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-[0_6px_24px_rgba(0,0,0,0.015)] transition-all flex flex-col justify-between h-[280px]">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-gray-900 dark:text-white">Team Members</h3>
            <button 
              onClick={() => router.push("/studio/team")}
              className="px-2.5 py-1 bg-white dark:bg-white/5 border border-[#ECE7DF] dark:border-white/10 rounded-[8px] text-[11px] font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-3.5 my-2">
            {/* Usman Ali */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-3">
                <img className="w-8 h-8 rounded-full object-cover shrink-0" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150" alt="Usman Ali" />
                <div className="flex flex-col">
                  <span className="font-bold text-gray-950 dark:text-white">Usman Ali</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">Lead Photographer</span>
                </div>
              </div>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px]">Active</span>
            </div>
            {/* Hira Khan */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-3">
                <img className="w-8 h-8 rounded-full object-cover shrink-0" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" alt="Hira Khan" />
                <div className="flex flex-col">
                  <span className="font-bold text-gray-950 dark:text-white">Hira Khan</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">Video Editor</span>
                </div>
              </div>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px]">Active</span>
            </div>
            {/* Bilal Ahmed */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-3">
                <img className="w-8 h-8 rounded-full object-cover shrink-0" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" alt="Bilal Ahmed" />
                <div className="flex flex-col">
                  <span className="font-bold text-gray-950 dark:text-white">Bilal Ahmed</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">Drone Operator</span>
                </div>
              </div>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px]">Active</span>
            </div>
          </div>
        </div>

        {/* Widget 2: Tasks */}
        <div className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-[0_6px_24px_rgba(0,0,0,0.015)] transition-all flex flex-col justify-between h-[280px]">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-gray-900 dark:text-white">Tasks</h3>
            <button className="px-2.5 py-1 bg-white dark:bg-white/5 border border-[#ECE7DF] dark:border-white/10 rounded-[8px] text-[11px] font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
              View All
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-2.5 my-2">
            {/* Task 1 */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-white/20 shrink-0 cursor-pointer" />
                <div className="flex flex-col">
                  <span className="font-bold text-gray-950 dark:text-white leading-tight">Edit wedding highlights</span>
                  <span className="text-[9.5px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">Ayesha & Hamza</span>
                </div>
              </div>
              <span className="text-[#E11D48] text-[9.5px] font-bold">May 22</span>
            </div>
            {/* Task 2 */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-white/20 shrink-0 cursor-pointer" />
                <div className="flex flex-col">
                  <span className="font-bold text-gray-950 dark:text-white leading-tight">Color grading photos</span>
                  <span className="text-[9.5px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">Ali Raza Event</span>
                </div>
              </div>
              <span className="text-[#E11D48] text-[9.5px] font-bold">May 23</span>
            </div>
            {/* Task 3 */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-white/20 shrink-0 cursor-pointer" />
                <div className="flex flex-col">
                  <span className="font-bold text-gray-950 dark:text-white leading-tight">Album design</span>
                  <span className="text-[9.5px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">Zainab Pre-Wedding</span>
                </div>
              </div>
              <span className="text-[#E11D48] text-[9.5px] font-bold">May 24</span>
            </div>
            {/* Task 4 */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-white/20 shrink-0 cursor-pointer" />
                <div className="flex flex-col">
                  <span className="font-bold text-gray-950 dark:text-white leading-tight">Client meeting</span>
                  <span className="text-[9.5px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">Creative Studio Office</span>
                </div>
              </div>
              <span className="text-[#E11D48] text-[9.5px] font-bold">May 25</span>
            </div>
          </div>
        </div>

        {/* Widget 3: Top Packages */}
        <div className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-[0_6px_24px_rgba(0,0,0,0.015)] transition-all flex flex-col justify-between h-[280px]">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-gray-900 dark:text-white">Top Packages</h3>
            <button className="px-2.5 py-1 bg-white dark:bg-white/5 border border-[#ECE7DF] dark:border-white/10 rounded-[8px] text-[11px] font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
              View All
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-2.5 my-2">
            {/* Package 1 */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <img className="w-8 h-8 rounded-[8px] object-cover shrink-0" src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=100" alt="Premium Wedding" />
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-gray-950 dark:text-white truncate leading-tight">Premium Wedding</span>
                  <span className="text-[9.5px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">Rs. 120,000</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-2">
                <div className="w-16 h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: '80%' }} />
                </div>
                <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">24 Bookings</span>
              </div>
            </div>
            {/* Package 2 */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <img className="w-8 h-8 rounded-[8px] object-cover shrink-0" src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=100" alt="Cinematic Film" />
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-gray-950 dark:text-white truncate leading-tight">Cinematic Film</span>
                  <span className="text-[9.5px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">Rs. 85,000</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-2">
                <div className="w-16 h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: '60%' }} />
                </div>
                <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">18 Bookings</span>
              </div>
            </div>
            {/* Package 3 */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <img className="w-8 h-8 rounded-[8px] object-cover shrink-0" src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=100" alt="Pre-Wedding Shoot" />
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-gray-950 dark:text-white truncate leading-tight">Pre-Wedding Shoot</span>
                  <span className="text-[9.5px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">Rs. 45,000</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-2">
                <div className="w-16 h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: '50%' }} />
                </div>
                <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">16 Bookings</span>
              </div>
            </div>
            {/* Package 4 */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <img className="w-8 h-8 rounded-[8px] object-cover shrink-0" src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=100" alt="Event Coverage" />
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-gray-950 dark:text-white truncate leading-tight">Event Coverage</span>
                  <span className="text-[9.5px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">Rs. 60,000</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-2">
                <div className="w-16 h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: '40%' }} />
                </div>
                <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">12 Bookings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
