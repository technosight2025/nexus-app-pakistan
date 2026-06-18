"use client"

import React from 'react';
import { CalendarHeart, Plus, ArrowRight, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function CustomerEventDashboard() {
  const myEvents = [
    {
      id: 'demo-wedding',
      name: "Ali & Fatima's Wedding",
      date: 'Dec 24, 2026',
      venue: 'Shalimar Gardens',
      type: 'Wedding',
      daysLeft: 197,
      status: 'Planning'
    },
    {
      id: 'zara-birthday',
      name: "Zara's 1st Birthday",
      date: 'Feb 15, 2027',
      venue: 'To be decided',
      type: 'Birthday',
      daysLeft: 250,
      status: 'Draft'
    }
  ];

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-[#1D1C17] mb-2">My Events</h1>
          <p className="text-[#5E6460]">Manage your upcoming celebrations, vendors, and guests.</p>
        </div>
        <Link href="/create-event" className="px-6 py-3 bg-[#0F5B3E] hover:bg-[#0A422C] transition-colors text-white rounded-full font-bold shadow-md flex items-center gap-2 w-fit">
          <Plus className="w-5 h-5" /> Create New Event
        </Link>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {myEvents.map(evt => (
          <div key={evt.id} className="bg-white border border-[#E6E2DA] rounded-3xl p-8 hover:shadow-xl hover:border-[#0F5B3E] transition-all group relative overflow-hidden flex flex-col">
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${evt.status === 'Planning' ? 'bg-[#E6F0EC] text-[#0F5B3E]' : 'bg-[#FAF7F2] text-[#5E6460]'}`}>
                {evt.status}
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#1D1C17] leading-none">{evt.daysLeft}</div>
                <div className="text-xs font-bold text-[#5E6460] uppercase mt-1">Days Left</div>
              </div>
            </div>

            <div className="relative z-10 mb-8">
              <h2 className="text-2xl font-serif font-bold text-[#1D1C17] mb-3">{evt.name}</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-[#5E6460] font-medium">
                  <Clock className="w-4 h-4 text-[#0F5B3E]" /> {evt.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#5E6460] font-medium">
                  <MapPin className="w-4 h-4 text-[#C9A227]" /> {evt.venue}
                </div>
              </div>
            </div>

            <div className="mt-auto relative z-10 pt-6 border-t border-[#E6E2DA]">
              <Link href={`/events/${evt.id}/timeline`} className="flex items-center justify-between group-hover:text-[#0F5B3E] transition-colors">
                <span className="font-bold text-sm">Open Command Center</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
