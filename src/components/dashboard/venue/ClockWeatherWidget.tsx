"use client"
import { useState, useEffect } from "react"
import { Cloud, ThermometerSun, MapPin, Wind } from "lucide-react"

export function ClockWeatherWidget() {
  const [time, setTime] = useState(new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) return <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl h-48 animate-pulse"></div>

  return (
    <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
        
        {/* Beautiful Clock */}
        <div className="flex-1">
          <p className="text-blue-300 font-bold text-sm tracking-widest uppercase mb-1">Local Time</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-6xl md:text-7xl font-black tracking-tighter">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </h2>
            <span className="text-2xl font-bold text-slate-400">
              {time.getSeconds().toString().padStart(2, '0')}
            </span>
          </div>
          <p className="text-slate-400 font-medium mt-2">
            {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px bg-slate-800 self-stretch" />

        {/* Max-Min Temperature Indoor-Outdoor */}
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-blue-300 font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Lahore, PK
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Outdoor */}
            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-slate-300 mb-2">
                <Cloud className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold uppercase">Outdoor</span>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-black text-white">32°C</span>
              </div>
              <div className="flex gap-3 text-xs font-bold text-slate-400">
                <span className="text-red-400 flex items-center gap-0.5">↑ 35°</span>
                <span className="text-blue-400 flex items-center gap-0.5">↓ 22°</span>
              </div>
            </div>

            {/* Indoor */}
            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-slate-300 mb-2">
                <ThermometerSun className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-bold uppercase">Indoor (Hall)</span>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-black text-white">24°C</span>
              </div>
              <div className="flex gap-3 text-xs font-bold text-slate-400">
                <span className="text-emerald-400">Optimum</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
