"use client"

import React from 'react';
import { Users, UserPlus, Upload, Search, Mail } from 'lucide-react';

export default function EventGuestsPage() {
  const guests = [
    { name: 'Family Group A', count: 6, rsvp: 'Confirmed', side: 'Groom' },
    { name: 'Office Friends', count: 4, rsvp: 'Pending', side: 'Bride' },
    { name: 'Cousins', count: 12, rsvp: 'Confirmed', side: 'Both' },
  ];

  return (
    <div className="p-8 md:p-12 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1D1C17] mb-2">Guest List Manager</h1>
          <p className="text-[#5E6460]">Manage invitations, track RSVPs, and organize seating.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-[#E6E2DA] text-[#1D1C17] font-bold text-sm rounded-xl shadow-sm hover:bg-[#FDF8EA] transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" /> Import Excel
          </button>
          <button className="px-4 py-2 bg-[#0F5B3E] text-white font-bold text-sm rounded-xl shadow-md hover:bg-[#0A422C] transition-colors flex items-center gap-2">
            <UserPlus className="w-4 h-4" /> Add Guest
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-[#E6E2DA] shadow-sm">
          <div className="text-xs font-bold text-[#5E6460] uppercase tracking-wider mb-2">Total Invited</div>
          <div className="text-3xl font-bold text-[#1D1C17]">22</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E6E2DA] shadow-sm">
          <div className="text-xs font-bold text-[#5E6460] uppercase tracking-wider mb-2">Confirmed</div>
          <div className="text-3xl font-bold text-[#0F5B3E]">18</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E6E2DA] shadow-sm">
          <div className="text-xs font-bold text-[#5E6460] uppercase tracking-wider mb-2">Pending</div>
          <div className="text-3xl font-bold text-[#C9A227]">4</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E6E2DA] shadow-sm flex items-center justify-center">
          <button className="text-[#0F5B3E] font-bold text-sm flex flex-col items-center gap-2">
            <Mail className="w-6 h-6" /> Send Reminders
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#E6E2DA] overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#E6E2DA] flex justify-between items-center bg-[#FAF7F2]">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5E6460]" />
            <input type="text" placeholder="Search guests..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#E6E2DA] bg-white text-sm focus:outline-none focus:border-[#0F5B3E]" />
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="border-b border-[#E6E2DA]">
            <tr>
              <th className="p-4 font-bold text-[#5E6460] text-sm">Group / Name</th>
              <th className="p-4 font-bold text-[#5E6460] text-sm">Guest Count</th>
              <th className="p-4 font-bold text-[#5E6460] text-sm">Side</th>
              <th className="p-4 font-bold text-[#5E6460] text-sm">RSVP Status</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((g, i) => (
              <tr key={i} className="border-b border-[#E6E2DA] hover:bg-[#FAF7F2] transition-colors">
                <td className="p-4 font-bold text-[#1D1C17]">{g.name}</td>
                <td className="p-4 text-[#5E6460]">{g.count} Guests</td>
                <td className="p-4 text-[#5E6460]">{g.side}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    g.rsvp === 'Confirmed' ? 'bg-[#E6F0EC] text-[#0F5B3E]' : 'bg-[#FDF8EA] text-[#C9A227]'
                  }`}>
                    {g.rsvp}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
