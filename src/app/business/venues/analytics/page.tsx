'use client';

import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Calendar, ArrowUpRight, Download, SlidersHorizontal, Layers } from 'lucide-react';

export default function VenueAnalyticsDashboard() {
  const [selectedSeason, setSelectedSeason] = useState<string>('Peak Wedding Season (Nov-Feb)');
  
  // Simulated operational ledger states matching Pakistani wedding market economics
  const financialMetrics = {
    totalGrossRevenue: 4850000,
    outstandingReceivables: 1250000,
    averageContractValue: 450000,
    completedBookingsCount: 12,
  };

  const monthlyBreakdown = [
    { month: 'November', bookings: 4, yield: 1800000, status: 'Settled' },
    { month: 'December', bookings: 5, yield: 2250000, status: 'Settled' },
    { month: 'January', bookings: 2, yield: 900000, status: 'Partially Paid' },
    { month: 'February', bookings: 1, yield: 450000, status: 'Pending Deposit' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 pb-12 antialiased">
      {/* Upper Analytics HUD Header */}
      <header className="border-b border-[#C5A880]/20 bg-white sticky top-0 z-40 px-6 py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="text-[9px] uppercase font-black tracking-widest text-[#C5A880]">B2B Enterprise Tier</span>
          <h1 className="text-xl font-serif font-black text-slate-950 tracking-tight">Financial Yield Matrix</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all inline-flex items-center gap-1.5 shadow-sm">
            <Download className="w-3.5 h-3.5 text-[#0F5B3E]" /> Export CSV
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-6">
        
        {/* Core Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#C5A880]/20 p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[10px] font-black uppercase tracking-wider">Gross Contract Value</span>
              <DollarSign className="w-4 h-4 text-[#0F5B3E]" />
            </div>
            <p className="text-xl font-serif font-black text-slate-950">PKR {financialMetrics.totalGrossRevenue.toLocaleString()}</p>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +18% from last fiscal year
            </span>
          </div>

          <div className="bg-white border border-[#C5A880]/20 p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[10px] font-black uppercase tracking-wider">Outstanding Payoffs</span>
              <Layers className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-xl font-serif font-black text-slate-950">PKR {financialMetrics.outstandingReceivables.toLocaleString()}</p>
            <span className="text-[10px] text-slate-400 font-medium">Awaiting contract completions</span>
          </div>

          <div className="bg-white border border-[#C5A880]/20 p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[10px] font-black uppercase tracking-wider">Average Marquee Yield</span>
              <TrendingUp className="w-4 h-4 text-[#0F5B3E]" />
            </div>
            <p className="text-xl font-serif font-black text-slate-950">PKR {financialMetrics.averageContractValue.toLocaleString()}</p>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
              Premium premium layout tier standard
            </span>
          </div>

          <div className="bg-white border border-[#C5A880]/20 p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[10px] font-black uppercase tracking-wider">Confirmed Allocations</span>
              <Calendar className="w-4 h-4 text-slate-500" />
            </div>
            <p className="text-xl font-serif font-black text-slate-950">{financialMetrics.completedBookingsCount} Events</p>
            <span className="text-[10px] text-slate-400 font-medium">100% capacity utilization rate</span>
          </div>
        </div>

        {/* Spreadsheet Data Entry Layout Grid */}
        <div className="bg-white border border-[#C5A880]/20 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-[#0F5B3E]" /> Seasonal Performance Spreadsheet Breakdown
            </h3>
            <div className="flex items-center gap-1 text-xs text-slate-500 font-bold">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter Matrix
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-black uppercase tracking-wider border-b border-slate-100">
                  <th className="py-3 px-6">Operational Month</th>
                  <th className="py-3 px-6">Slots Utilized</th>
                  <th className="py-3 px-6 text-right">Gross Statement Yield</th>
                  <th className="py-3 px-6 text-center">Settlement Workflow State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {monthlyBreakdown.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">{row.month}</td>
                    <td className="py-4 px-6">{row.bookings} Booking Slots</td>
                    <td className="py-4 px-6 text-right font-bold text-slate-950">PKR {row.yield.toLocaleString()}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                        row.status === 'Settled' ? 'bg-emerald-50 text-emerald-700' :
                        row.status === 'Partially Paid' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
