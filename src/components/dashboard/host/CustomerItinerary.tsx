"use client"

import { CalendarHeart, MapPin, Clock } from "lucide-react"

export function CustomerItinerary() {
  const events = [
    {
      day: "Day 1",
      date: "August 18, 2026",
      title: "Mehndi Night",
      location: "Ali's Residence, DHA Lahore",
      time: "7:00 PM - 12:00 AM",
      color: "from-emerald-400 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      description: "Traditional Mehndi with dholki, dances, and dinner."
    },
    {
      day: "Day 2",
      date: "August 20, 2026",
      title: "The Baraat",
      location: "Grand Taj Marquee, Lahore",
      time: "6:00 PM - 11:00 PM",
      color: "from-rose-400 to-rose-600",
      bgColor: "bg-rose-50",
      textColor: "text-rose-700",
      description: "Arrival of Baraat, Nikah ceremony, and main dinner reception."
    },
    {
      day: "Day 3",
      date: "August 22, 2026",
      title: "Walima Reception",
      location: "Pearl Continental, Lahore",
      time: "8:00 PM - 11:30 PM",
      color: "from-indigo-400 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
      description: "Walima reception hosted by the Groom's family."
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Event Itinerary</h2>
        <p className="text-slate-500 font-medium">Your complete wedding schedule and timelines.</p>
      </div>

      <div className="relative border-l-2 border-slate-200 ml-6 md:ml-8 space-y-12">
        {events.map((event, index) => (
          <div key={index} className="relative pl-8 md:pl-12">
            {/* Timeline Dot */}
            <div className={`absolute -left-[17px] top-2 w-8 h-8 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg shadow-slate-200 ring-4 ring-white`}>
              <CalendarHeart className="w-4 h-4 text-white" />
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider ${event.bgColor} ${event.textColor}`}>
                  {event.day}
                </div>
                <h3 className="text-2xl font-black text-slate-900">{event.title}</h3>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center text-sm font-bold text-slate-600">
                  <Clock className="w-4 h-4 mr-2 text-amber-500" />
                  {event.date} • {event.time}
                </div>
                <div className="flex items-center text-sm font-bold text-slate-600">
                  <MapPin className="w-4 h-4 mr-2 text-amber-500" />
                  {event.location}
                </div>
              </div>

              <p className="text-slate-500 font-medium leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
