"use client"
import { useState } from "react"
import { CheckCircle2, XCircle, Clock } from "lucide-react"

const OUTFITS = [
  { id: 1, name: "Crimson Bridal Set", image: "/images/wardrobe/1.png", bookedDates: ["Dec 15", "Dec 16", "Dec 17", "Dec 18", "Dec 19", "Dec 20"] },
  { id: 2, name: "Emerald Velvet Sherwani", image: "/images/wardrobe/2.png", bookedDates: ["Dec 28", "Dec 29", "Dec 30"] },
  { id: 3, name: "Regal Gold Lehnga", image: "/images/wardrobe/3.png", bookedDates: ["Jan 03", "Jan 04", "Jan 05", "Jan 06"] },
  { id: 4, name: "Pastel Walima Gown", image: "/images/wardrobe/4.png", bookedDates: ["Dec 22", "Dec 23", "Dec 24"] },
]

const ALL_DATES = [
  "Dec 15","Dec 16","Dec 17","Dec 18","Dec 19","Dec 20","Dec 21","Dec 22","Dec 23","Dec 24",
  "Dec 25","Dec 26","Dec 27","Dec 28","Dec 29","Dec 30","Dec 31",
  "Jan 01","Jan 02","Jan 03","Jan 04","Jan 05","Jan 06","Jan 07","Jan 08",
]

export default function AvailabilityPage() {
  return (
    <div className="space-y-6 max-w-[1440px] mx-auto">
      <div>
        <h1 className="text-2xl font-black text-[#0A3B2A]">Availability</h1>
        <p className="text-sm text-slate-500 mt-0.5">Per-outfit availability for the next 25 days</p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs font-bold">
        <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-emerald-100 border border-emerald-200" /><span className="text-slate-600">Available</span></div>
        <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-rose-100 border border-rose-200" /><span className="text-slate-600">Booked</span></div>
      </div>

      {/* Availability Matrix */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400 min-w-[180px] sticky left-0 bg-slate-50/50">Outfit</th>
                {ALL_DATES.map(d => (
                  <th key={d} className="px-1.5 py-3 text-center text-[9px] font-black uppercase tracking-wider text-slate-400 min-w-[50px]">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {OUTFITS.map(outfit => (
                <tr key={outfit.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-4 py-3 sticky left-0 bg-white hover:bg-slate-50/40">
                    <div className="flex items-center gap-3">
                      <img src={outfit.image} alt={outfit.name} className="w-9 h-12 object-cover rounded-lg" />
                      <p className="text-xs font-bold text-slate-900 leading-tight max-w-[100px]">{outfit.name}</p>
                    </div>
                  </td>
                  {ALL_DATES.map(date => {
                    const booked = outfit.bookedDates.includes(date)
                    return (
                      <td key={date} className="px-1.5 py-3 text-center">
                        <div className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center ${
                          booked ? 'bg-rose-100' : 'bg-emerald-100'
                        }`}>
                          {booked
                            ? <XCircle className="w-3.5 h-3.5 text-rose-500" />
                            : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Block Dates */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <h3 className="text-sm font-black text-[#0A3B2A] mb-4">Block Dates for Maintenance / Dry Cleaning</h3>
        <div className="flex flex-wrap gap-2">
          {OUTFITS.map(outfit => (
            <button key={outfit.id} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:border-[#0A3B2A]/40 hover:bg-slate-50 transition-colors flex items-center gap-2">
              <img src={outfit.image} alt="" className="w-5 h-6 object-cover rounded" />
              Block {outfit.name.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
