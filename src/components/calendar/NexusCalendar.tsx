'use client';
import React, { useState } from 'react';

interface CalendarBooking {
  id: string;
  hostName: string;
  venueName: string;
  date: string; // YYYY-MM-DD
  status: 'confirmed' | 'pending_venue';
}

// ٹیسٹنگ کے لیے عارضی ڈیٹا (جون 2026)
const mockCalendarBookings: CalendarBooking[] = [
  { id: 'b1', hostName: 'Muhammad Shafiq', venueName: 'Khyber City Mall Venue', date: '2026-06-25', status: 'confirmed' },
  { id: 'b2', hostName: 'Zain Ahmed', venueName: 'Khyber City Mall Venue', date: '2026-06-28', status: 'pending_venue' },
];

export default function NexusCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 5)); // June 2026

  // جون کے 30 دن جنریٹ کرنا
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const getBookingForDay = (day: number) => {
    const dateString = `2026-06-${day.toString().padStart(2, '0')}`;
    return mockCalendarBookings.find(b => b.date === dateString);
  };

  return (
    <div className="w-full max-w-4xl bg-[#FAF7F2]/60 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-xl">
      {/* Nexus Calendar Header */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-200/60 pb-4">
        <div>
          <h3 className="text-xl font-bold text-[#0F5B3E]">Nexus Event Schedule</h3>
          <p className="text-xs text-slate-500">Live Venue Availability & Slot Control</p>
        </div>
        <div className="flex gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#0F5B3E] border border-[#D4AF37]"></span> 
            Confirmed (WABA Out)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span> 
            Pending Venue
          </span>
        </div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
        <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
      </div>

      {/* Calendar Grid Sheets */}
      <div className="grid grid-cols-7 gap-3">
        {daysInMonth.map((day) => {
          const booking = getBookingForDay(day);
          return (
            <div 
              key={day} 
              className="min-h-[90px] bg-white/50 backdrop-blur-sm border border-white rounded-xl p-2 flex flex-col justify-between items-start transition-all hover:bg-white/90 hover:shadow-md"
            >
              <span className="font-extrabold text-slate-700 text-sm">{day}</span>
              
              {booking && (
                <div 
                  className={`w-full text-[10px] p-2 rounded-lg text-white font-semibold text-left truncate transition-all ${
                    booking.status === 'confirmed' 
                      ? 'bg-[#0F5B3E] border-l-4 border-[#D4AF37] shadow-sm' 
                      : 'bg-amber-500 shadow-sm'
                  }`}
                  title={`${booking.hostName} - ${booking.venueName}`}
                >
                  <p className="truncate text-[#FAF7F2]">{booking.hostName.split(' ')[0]}</p>
                  <p className="opacity-90 text-[8px] tracking-wide truncate">
                    {booking.status === 'confirmed' ? '✓ Connected' : '⏳ Waiting'}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
