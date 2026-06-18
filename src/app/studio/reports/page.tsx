"use client"

import { Card } from "@/components/ui/card"
import { Download, Filter, TrendingUp, TrendingDown, Users, Wallet, Target, BarChart3, ArrowUpRight } from "lucide-react"

export default function ReportsPage() {
  const stats = [
    { label: "Total Revenue", value: "Rs 4.2M", change: "+12.5%", isPositive: true, icon: Wallet, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "New Bookings", value: "34", change: "+5.2%", isPositive: true, icon: Target, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { label: "Lead Conversion", value: "28.4%", change: "-2.1%", isPositive: false, icon: Users, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10" },
    { label: "Avg Package Value", value: "Rs 125K", change: "+8.4%", isPositive: true, icon: BarChart3, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
  ]

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const chartData = [35, 45, 30, 60, 75, 55, 65, 80, 70, 95, 85, 90] // percentages for height

  const packages = [
    { name: "Premium Cinematic Wedding", bookings: 14, revenue: "Rs 2.1M", trend: "+15%" },
    { name: "Standard 3-Day Event", bookings: 12, revenue: "Rs 1.2M", trend: "+5%" },
    { name: "Corporate Gala Package", bookings: 5, revenue: "Rs 500K", trend: "-2%" },
    { name: "Bridal Shower & Mehndi", bookings: 8, revenue: "Rs 400K", trend: "+25%" },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-poppins text-gray-900 dark:text-white tracking-tight">
            Reports & Analytics
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Track your studio's financial performance, booking trends, and growth.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-colors shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4" /> This Year
          </button>
          <button className="px-5 py-2.5 bg-[#0A3B2A] dark:bg-cyan-600 text-white rounded-full font-bold text-sm hover:bg-[#0F5B3E] dark:hover:bg-cyan-500 transition-colors shadow-lg flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 transition-all hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${stat.isPositive ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'}`}>
                {stat.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white">{stat.value}</h3>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 p-6 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Revenue Overview</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monthly booking income for 2026</p>
            </div>
            <h3 className="text-2xl font-black text-[#0A3B2A] dark:text-cyan-400">Rs 4.2M</h3>
          </div>
          
          {/* CSS Bar Chart */}
          <div className="flex-1 flex items-end justify-between gap-2 h-[250px] mt-auto">
            {chartData.map((height, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 flex-1 group">
                {/* Tooltip on hover */}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-gray-700 dark:text-white bg-white dark:bg-black/60 shadow-lg px-2 py-1 rounded absolute -mt-10 backdrop-blur-md border border-gray-100 dark:border-white/10 pointer-events-none z-10">
                  {height * 10}k
                </span>
                <div className="w-full relative bg-gray-100 dark:bg-white/5 rounded-t-lg overflow-hidden h-full flex items-end">
                  <div 
                    className="w-full bg-[#0A3B2A] dark:bg-gradient-to-t dark:from-blue-600 dark:to-cyan-400 rounded-t-lg transition-all duration-1000 ease-out group-hover:opacity-80"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">{months[idx]}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Packages */}
        <Card className="p-6 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Top Packages</h2>
            <button className="text-sm font-semibold text-blue-600 dark:text-blue-400">View All</button>
          </div>
          
          <div className="space-y-6 flex-1">
            {packages.map((pkg, idx) => (
              <div key={idx} className="flex items-center justify-between group">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{pkg.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{pkg.bookings} Bookings</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-gray-900 dark:text-white text-sm">{pkg.revenue}</p>
                  <p className={`text-xs font-bold mt-1 ${pkg.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {pkg.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/10">
            <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-900 dark:text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
              Package Settings <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </Card>

      </div>
    </div>
  )
}
