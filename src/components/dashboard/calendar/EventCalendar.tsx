'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useDashboard } from '@/contexts/DashboardContext';
import { ChevronLeft, ChevronRight, Loader2, Calendar as CalIcon, AlertTriangle } from 'lucide-react';

type BookingWithDetails = {
  id: string;
  booking_date: string;
  slot: string | null;
  status: string;
  events?: { name: string; guest_count: number | null } | null;
  rooms?: { name: string } | null;
};

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

const STATUS_COLORS: Record<string, string> = {
  confirmed:  'bg-emerald-500',
  tentative:  'bg-amber-400',
  cancelled:  'bg-rose-400',
};

export function EventCalendar() {
  const { branchId, organizationId } = useDashboard();
  const supabase = createClient();

  const today = new Date();
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [bookings, setBookings]   = useState<BookingWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const DEMO_BOOKINGS: BookingWithDetails[] = [
    { id: 'd1', booking_date: `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-10`, slot: 'Evening', status: 'confirmed', events: { name: 'Ahmed & Sana Wedding', guest_count: 450 }, rooms: { name: 'Grand Marquee' } },
    { id: 'd5', booking_date: `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-10`, slot: 'Evening', status: 'tentative', events: { name: 'Corporate Dinner (Collision)', guest_count: 150 }, rooms: { name: 'Grand Marquee' } },
    { id: 'd2', booking_date: `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-15`, slot: 'Afternoon', status: 'confirmed', events: { name: 'Ali Walima', guest_count: 300 }, rooms: { name: 'Rose Garden Hall' } },
    { id: 'd3', booking_date: `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-22`, slot: 'Evening', status: 'tentative', events: { name: 'Corporate Gala', guest_count: 200 }, rooms: { name: 'Grand Marquee' } },
    { id: 'd4', booking_date: `${today.getFullYear()}-${String(today.getMonth()+2).padStart(2,'0')}-03`, slot: 'Evening', status: 'confirmed', events: { name: 'Barat Ceremony', guest_count: 600 }, rooms: { name: 'Rose Garden Hall' } },
  ];

  useEffect(() => {
    async function fetchBookings() {
      setIsLoading(true);
      if (!branchId) {
        setBookings(DEMO_BOOKINGS);
        setIsLoading(false);
        return;
      }
      const startDate = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-01`;
      const endDate   = `${viewYear}-${String(viewMonth + 2).padStart(2, '0')}-01`;

      const { data, error } = await supabase
        .from('bookings')
        .select('id, booking_date, slot, status, events(name, guest_count), rooms(name)')
        .gte('booking_date', startDate)
        .lt('booking_date', endDate)
        .order('booking_date', { ascending: true });

      if (error || !data || data.length === 0) {
        setBookings(DEMO_BOOKINGS);
      } else {
        setBookings(data as unknown as BookingWithDetails[]);
      }
      setIsLoading(false);
    }
    fetchBookings();
  }, [branchId, viewYear, viewMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else { setViewMonth(m => m - 1); }
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else { setViewMonth(m => m + 1); }
  };

  const daysInMonth  = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  // Build a map of date -> bookings for that date
  const bookingMap: Record<string, BookingWithDetails[]> = {};
  bookings.forEach(b => {
    const key = b.booking_date.slice(0, 10);
    if (!bookingMap[key]) bookingMap[key] = [];
    bookingMap[key].push(b);
  });

  // Upcoming events sorted by date
  const todayStr = today.toISOString().slice(0, 10);
  const upcoming = bookings
    .filter(b => b.booking_date >= todayStr)
    .sort((a, b) => a.booking_date.localeCompare(b.booking_date))
    .slice(0, 8);

  const fmtShort = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#0F5B3E] bg-[#FAF7F2]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#FAF7F2] font-sans pb-20 md:pb-0">

      {/* Header */}
      <div className="bg-[#FFFFFF] border-b border-[#E6E2DA] px-6 py-4 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-black text-[#1D1C17] uppercase tracking-tight">Event Calendar</h1>
          <p className="text-xs text-[#5E6460] font-medium mt-0.5">Confirmed bookings & upcoming events</p>
        </div>
        {/* Month Navigation */}
        <div className="flex items-center gap-3">
          <button onClick={prevMonth} className="p-2 hover:bg-[#FAF7F2] border border-[#E6E2DA] rounded transition-colors">
            <ChevronLeft size={16} className="text-[#1D1C17]" />
          </button>
          <span className="text-sm font-black text-[#1D1C17] w-40 text-center">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </span>
          <button onClick={nextMonth} className="p-2 hover:bg-[#FAF7F2] border border-[#E6E2DA] rounded transition-colors">
            <ChevronRight size={16} className="text-[#1D1C17]" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start">

        {/* Calendar Grid */}
        <div className="flex-[3] bg-[#FFFFFF] border border-[#E6E2DA] shadow-sm w-full">
          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-[#E6E2DA]">
            {DAY_NAMES.map(d => (
              <div key={d} className="p-3 text-center text-[10px] font-black text-[#5E6460] uppercase tracking-wider bg-[#FAF7F2]">
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7">
            {/* Empty cells before 1st */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2 md:p-3 min-h-[72px] border-b border-r border-[#E6E2DA] bg-[#FAF7F2]/50" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isToday = dateStr === todayStr;
              const dayBookings = bookingMap[dateStr] || [];
              const colIndex = (firstDayOfWeek + i) % 7;
              const isLastCol = colIndex === 6;

              const collisions = dayBookings.filter((b1, idx1) => 
                dayBookings.some((b2, idx2) => 
                  idx1 !== idx2 && 
                  b1.slot === b2.slot && 
                  b1.rooms?.name === b2.rooms?.name
                )
              );
              const hasCollision = collisions.length > 0;

              return (
                <div
                  key={day}
                  className={`p-2 min-h-[80px] border-b border-r border-[#E6E2DA] flex flex-col gap-1 transition-colors hover:bg-[#FAF7F2] relative ${isLastCol ? 'border-r-0' : ''} ${hasCollision ? 'bg-red-50/50 hover:bg-red-50' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-xs font-black w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 ${
                      isToday ? 'bg-[#0F5B3E] text-white' : 'text-[#1D1C17]'
                    }`}>
                      {day}
                    </span>
                    {hasCollision && (
                      <div className="text-red-500 bg-red-100 p-1 rounded-full shadow-sm animate-pulse" title="Double booking collision detected!">
                        <AlertTriangle className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                  {/* Event dots/chips */}
                  <div className="flex flex-col gap-0.5 overflow-hidden">
                    {dayBookings.slice(0, 2).map(b => (
                      <div
                        key={b.id}
                        title={`${b.events?.name} · ${b.slot}`}
                        className={`text-[8px] font-bold text-white px-1.5 py-0.5 rounded-sm truncate ${STATUS_COLORS[b.status] || 'bg-slate-400'}`}
                      >
                        {b.events?.name?.split(' ').slice(0, 2).join(' ') || b.slot}
                      </div>
                    ))}
                    {dayBookings.length > 2 && (
                      <span className="text-[8px] font-bold text-[#5E6460]">+{dayBookings.length - 2} more</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="p-4 border-t border-[#E6E2DA] flex gap-4 flex-wrap bg-[#FAF7F2]">
            <span className="flex items-center gap-1.5 text-[10px] text-[#5E6460] font-bold">
              <span className="w-3 h-3 rounded-full bg-[#0F5B3E] inline-block" /> Today
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-[#5E6460] font-bold">
              <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> Confirmed
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-[#5E6460] font-bold">
              <span className="w-3 h-3 rounded-sm bg-amber-400 inline-block" /> Tentative
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-[#5E6460] font-bold">
              <span className="w-3 h-3 rounded-sm bg-rose-400 inline-block" /> Cancelled
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-[#5E6460] font-bold ml-auto text-red-500">
              <AlertTriangle className="w-3.5 h-3.5" /> Collision Alert
            </span>
          </div>
        </div>

        {/* Upcoming Events Panel */}
        <div className="flex-[1] bg-[#FFFFFF] border border-[#E6E2DA] w-full lg:min-w-[260px]">
          <div className="p-4 border-b border-[#E6E2DA] bg-[#FAF7F2] flex items-center gap-2">
            <CalIcon size={14} className="text-[#0F5B3E]" />
            <h2 className="text-xs font-black text-[#1D1C17] uppercase tracking-wider">Upcoming Events</h2>
          </div>
          <div className="flex flex-col divide-y divide-[#E6E2DA]">
            {upcoming.length === 0 ? (
              <div className="p-8 text-center text-xs font-bold text-[#5E6460]">No upcoming events.</div>
            ) : upcoming.map(b => {
              const d = new Date(b.booking_date + 'T00:00:00');
              return (
                <div key={b.id} className="flex gap-3 p-3 hover:bg-[#FAF7F2] transition-colors items-center">
                  {/* Date badge */}
                  <div className="bg-[#E6F0EC] rounded px-2 py-1.5 text-center flex-shrink-0 min-w-[44px]">
                    <div className="text-lg font-black text-[#0F5B3E] leading-none">{d.getDate()}</div>
                    <div className="text-[8px] font-black text-[#5E6460] uppercase">{MONTH_NAMES[d.getMonth()].slice(0,3)}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-black text-[#1D1C17] truncate">{b.events?.name || 'Event'}</p>
                    <p className="text-[10px] text-[#5E6460] font-medium truncate">{b.rooms?.name} · {b.slot}</p>
                    {b.events?.guest_count && (
                      <p className="text-[9px] text-[#5E6460] font-bold mt-0.5">{b.events.guest_count} guests</p>
                    )}
                  </div>
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_COLORS[b.status] || 'bg-slate-400'}`} />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
