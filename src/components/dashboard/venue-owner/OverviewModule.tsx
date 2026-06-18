"use client"

import { motion } from "framer-motion"
import { Users, TrendingUp, CalendarCheck, Banknote } from "lucide-react"

interface OverviewModuleProps {
  activeLeadsCount: number
  occupancyRate: number
  todayEventsCount: number
  wonValue: number
}

export default function OverviewModule({
  activeLeadsCount,
  occupancyRate,
  todayEventsCount,
  wonValue
}: OverviewModuleProps) {
  
  const kpis = [
    {
      title: "Active Pipeline Leads",
      value: activeLeadsCount,
      label: "Real-time",
      icon: Users,
      bg: "bg-[#E6F0EC]",
      color: "text-[#0F5B3E]"
    },
    {
      title: "Lead Conversion Rate",
      value: `${occupancyRate}%`,
      label: "80% Target",
      icon: TrendingUp,
      bg: "bg-[#FCEEF3]",
      color: "text-[#D9467A]"
    },
    {
      title: "Today's Hall Bookings",
      value: `${todayEventsCount} / 3`,
      label: "Live Status",
      icon: CalendarCheck,
      bg: "bg-amber-50",
      color: "text-[#C9A227]"
    },
    {
      title: "Won Leads Revenue",
      value: `${(wonValue / 1000000).toFixed(1)}M`,
      label: "PKR Value",
      icon: Banknote,
      bg: "bg-blue-50",
      color: "text-blue-600"
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, idx) => (
        <motion.div
          key={kpi.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          whileHover={{ y: -4 }}
          className="bg-white rounded-[16px] p-5 border border-[#E6E2DA] shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <div className={`p-2.5 rounded-lg ${kpi.bg} ${kpi.color}`}>
              <kpi.icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
              {kpi.label}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-slate-500 text-sm font-medium mb-1">{kpi.title}</p>
            <p className="text-3xl font-black tracking-tight text-[#1D1C17]">{kpi.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
