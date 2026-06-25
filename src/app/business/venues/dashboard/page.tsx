'use client';

import React, { useState } from 'react';
import { 
  Building2, Calendar, DollarSign, TrendingUp, Users, 
  ArrowUpRight, Clock, ShieldCheck, FileSpreadsheet, LayoutGrid, SlidersHorizontal 
} from 'lucide-react';

export default function VenueBusinessDashboard() {
  // Mock administrative telemetry for a luxury Islamabad marquee tier
  const [activeVenueStats] = useState({
    marqueeName: 'The Royal Palm Marquee (E-11, Islamabad)',
    seasonalUtilization: '92%',
    grossReceivables: '4,850,000',
    pendingApprovalsCount: 3,
    activeContractsCount: 14
  });

  const [upcomingAllocations] = useState([
    { id: '1fe318b0', client: 'Zain & Fatima', type: 'Baraat Ceremony', date: '2026-11-14', guests: 350, budget: '1,325,000', state: 'Confirmed' },
    { id: '9a2e318c', client: 'Amina Wedding', type: 'Valima Dinner', date: '2026-11-15', guests: 500, budget: '1,700,000', state: 'Awaiting Deposit' },
    { id: 'bc718d2a', client: 'Hamza Reception', type: 'Mehndi Night', date: '2026-11-20', guests: 250, budget: '680,000', state: 'Pending Signed Contract' }
  ]);

  const [blackoutDate, setBlackoutDate] = useState<string>('');
  const [blackoutReason, setBlackoutReason] = useState<string>('Private Corporate Function');
  const [lockedDates, setLockedDates] = useState([
    { date: '2026-11-14', reason: 'Assigned: Zain & Fatima (Baraat)' },
    { date: '2026-12-25', reason: 'Winter Holiday Maintenance' },
    { date: '2026-12-26', reason: 'Quaid-e-Azam Day Private Gala' }
  ]);

  const handleAddBlackoutDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blackoutDate) return;
    
    // Optimistic tracking matrix inclusion
    setLockedDates([
      ...lockedDates, 
      { date: blackoutDate, reason: `🔒 Manual Blockout: ${blackoutReason}` }
    ]);
    setBlackoutDate('');
    alert(`Masha'Allah! ${blackoutDate} has been locked and removed from public discovery views.`);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 pb-16 antialiased font-sans">
      
      {/* Enterprise Upper HUD Header Layout */}
      <header className="border-b border-[#C5A880]/20 bg-white sticky top-0 z-40 px-6 py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#0F5B3E]/10 text-[#0F5B3E] rounded-xl">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[9px] uppercase font-black tracking-widest text-[#C5A880]">Nexus Management Matrix</span>
            <h1 className="text-lg font-serif font-black text-slate-950 tracking-tight">{activeVenueStats.marqueeName}</h1>
          </div>
        </div>

        {/* Business Navigation Links */}
        <div className="flex items-center gap-2">
          <a
            href="/business/venues/analytics"
            className="px-3 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all inline-flex items-center gap-1.5 shadow-sm"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#0F5B3E]" /> Open Revenue Yield Sheet
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        
        {/* Operational Performance Telemetry Metrics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white border border-[#C5A880]/20 p-5 rounded-2xl shadow-sm space-y-1.5">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[9px] font-black uppercase tracking-wider">Gross Statement Pipeline</span>
              <DollarSign className="w-4 h-4 text-[#0F5B3E]" />
            </div>
            <p className="text-xl font-serif font-black text-slate-950">PKR {activeVenueStats.grossReceivables}</p>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +14% active month velocity
            </span>
          </div>

          <div className="bg-white border border-[#C5A880]/20 p-5 rounded-2xl shadow-sm space-y-1.5">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[9px] font-black uppercase tracking-wider">Capacity Utilization Rate</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xl font-serif font-black text-slate-950">{activeVenueStats.seasonalUtilization}</p>
            <span className="text-[10px] text-slate-400 font-medium">Peak Wedding Season Window</span>
          </div>

          <div className="bg-white border border-[#C5A880]/20 p-5 rounded-2xl shadow-sm space-y-1.5">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[9px] font-black uppercase tracking-wider">Active Booked Projects</span>
              <Building2 className="w-4 h-4 text-[#C5A880]" />
            </div>
            <p className="text-xl font-serif font-black text-slate-950">{activeVenueStats.activeContractsCount} Venues</p>
            <span className="text-[10px] text-slate-400 font-medium">Hardened RLS data locked</span>
          </div>

          <div className="bg-white border border-[#C5A880]/20 p-5 rounded-2xl shadow-sm space-y-1.5">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[9px] font-black uppercase tracking-wider">Pending Initializations</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-xl font-serif font-black text-slate-950">{activeVenueStats.pendingApprovalsCount} Submissions</p>
            <span className="text-[10px] text-amber-600 font-bold flex items-center gap-0.5">
              Action required from Host wizard
            </span>
          </div>

        </div>

        {/* NEW SECTION: Two-column grid splitting Calendar Management and Live Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COMPONENT: Live Schedule Blockout Control Panel Form */}
          <div className="bg-white border border-[#C5A880]/20 p-5 rounded-2xl shadow-sm space-y-4 h-fit">
            <div>
              <span className="text-[9px] uppercase font-black tracking-widest text-[#C5A880]">Availability Ledger</span>
              <h3 className="font-serif text-sm font-black text-slate-950">Calendar Matrix Lock</h3>
              <p className="text-[11px] text-slate-400">Force block specific dates to preserve operational integrity.</p>
            </div>

            <form onSubmit={handleAddBlackoutDate} className="space-y-3 pt-2 border-t border-slate-100">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">Target Calendar Date</label>
                <input 
                  type="date" 
                  value={blackoutDate} 
                  onChange={(e) => setBlackoutDate(e.target.value)} 
                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0F5B3E]" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">Reason / Allocation Category</label>
                <select 
                  value={blackoutReason} 
                  onChange={(e) => setBlackoutReason(e.target.value)} 
                  className="w-full bg-slate-50 border border-slate-200 text-xs px-2 py-2 rounded-xl text-slate-700 font-medium focus:outline-none"
                >
                  <option value="Private Walk-In Booking">Private Walk-In Booking</option>
                  <option value="Facility HVAC Maintenance">Facility HVAC Maintenance</option>
                  <option value="Governmental Off-Day Protocol">Governmental Off-Day Protocol</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#0F5B3E] hover:bg-[#0A3F2B] text-white font-black text-[10px] uppercase tracking-widest py-2.5 rounded-xl transition-all shadow-sm"
              >
                Enforce Date Blockout
              </button>
            </form>

            {/* Locked Dates Active Scrollable Feed */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">Active Blacklisted Arrays ({lockedDates.length})</span>
              <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-50">
                {lockedDates.map((lock, index) => (
                  <div key={index} className="pt-1.5 flex justify-between items-center text-[11px]">
                    <span className="font-mono font-black text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">{lock.date}</span>
                    <span className="text-slate-500 font-medium truncate max-w-[150px]">{lock.reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COMPONENT: Master Scheduled Booking Table (Spans remaining columns) */}
          <div className="lg:col-span-2 bg-white border border-[#C5A880]/20 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
            {/* Paste your existing Scheduled Booking Allocations table component right inside here... */}
            <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#0F5B3E]" /> Scheduled Booking Allocations Matrix
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Live customer timeline links synchronized with target database rows.</p>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-slate-500 font-bold self-start sm:self-center">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Sorting Primitives Active
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 font-black uppercase tracking-wider border-b border-slate-100">
                    <th className="py-3 px-6">Client Portal Node ID</th>
                    <th className="py-3 px-6">Host Assignment</th>
                    <th className="py-3 px-6">Function Type</th>
                    <th className="py-3 px-6">Event Date</th>
                    <th className="py-3 px-6 text-center">Guest Scale</th>
                    <th className="py-3 px-6 text-right">Gross Budget Statement</th>
                    <th className="py-3 px-6 text-center">Workflow Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {upcomingAllocations.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <a 
                          href={`/portal/${row.id === '1fe318b0' ? '1fe318b0-acd3-4cc9-8ede-36f8a50ea2e9' : row.id}`} 
                          className="font-mono bg-slate-100 text-[#0F5B3E] font-black px-2 py-1 rounded-md text-[10px] hover:bg-[#0F5B3E] hover:text-white transition-all shadow-sm border border-slate-200/40"
                        >
                          {row.id}... ↗
                        </a>
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900">{row.client}</td>
                      <td className="py-4 px-6 text-slate-500">{row.type}</td>
                      <td className="py-4 px-6 font-semibold text-slate-600">{row.date}</td>
                      <td className="py-4 px-6 text-center font-bold text-slate-900">{row.guests} Pax</td>
                      <td className="py-4 px-6 text-right font-black text-slate-950">PKR {row.budget}</td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider ${
                          row.state === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                          row.state === 'Awaiting Deposit' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 
                          'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}>
                          {row.state}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Corporate Security Seal Frame */}
        <div className="bg-gradient-to-r from-[#FAF5EC] to-[#F3EAD8] border border-[#C5A880]/20 rounded-2xl p-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-[#0F5B3E]" /> Enterprise Node Administrative Clearance Protocol Secure
        </div>

      </main>
    </div>
  );
}
