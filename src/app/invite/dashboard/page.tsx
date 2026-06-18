"use client"

import React, { useState } from 'react';
import { Users, CheckCircle2, Clock, MapPin, Download, Search, Filter, MessageSquare, ChevronDown, X } from 'lucide-react';
import Link from 'next/link';

export default function HostDashboardPage() {
  const [activeTab, setActiveTab] = useState('Overview');

  const rsvps = [
    { name: 'Tariq Mehmood', status: 'Attending', guests: 4, diet: 'None', time: '2 hours ago' },
    { name: 'Sarah Khan', status: 'Attending', guests: 2, diet: 'Vegetarian', time: '5 hours ago' },
    { name: 'Ahmed Ali', status: 'Pending', guests: 0, diet: '-', time: '-' },
    { name: 'Zainab Qureshi', status: 'Declined', guests: 0, diet: '-', time: '1 day ago' },
    { name: 'Usman Bilal', status: 'Attending', guests: 1, diet: 'Nut Allergy', time: '1 day ago' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Top Navigation */}
      <div className="w-full bg-white border-b border-[#E6E2DA] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/tools" className="text-xl font-bold text-[#1D1C17] tracking-tighter">NEXUS</Link>
            <div className="h-6 w-px bg-[#E6E2DA] mx-2" />
            <h1 className="font-serif font-bold text-lg text-[#1D1C17]">Ali & Fatima's Wedding Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[#5E6460] font-bold text-sm hover:text-[#1D1C17] transition-colors">Settings</button>
            <Link href="/invite/demo-guest-view" target="_blank" className="px-4 py-2 bg-[#FDF8EA] text-[#C9A227] border border-[#C9A227]/30 rounded-lg font-bold text-sm hover:bg-[#C9A227] hover:text-white transition-colors">
              View Live Invite
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#1D1C17] mb-2">RSVP Analytics</h2>
            <p className="text-[#5E6460]">Track and manage your guest responses in real-time.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E6E2DA] rounded-lg font-bold text-sm text-[#1D1C17] shadow-sm hover:bg-[#FDF8EA] transition-colors">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-[#E6E2DA] shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#E6F0EC] flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-[#0F5B3E]" />
            </div>
            <div className="text-3xl font-bold text-[#1D1C17] mb-1">142</div>
            <div className="text-sm text-[#5E6460] font-bold">Total Invited Guests</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#0F5B3E] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><CheckCircle2 className="w-20 h-20 text-[#0F5B3E]" /></div>
            <div className="w-10 h-10 rounded-full bg-[#0F5B3E] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div className="text-3xl font-bold text-[#0F5B3E] mb-1">86</div>
            <div className="text-sm text-[#5E6460] font-bold">Confirmed Attending</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E6E2DA] shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#FDF8EA] flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-[#C9A227]" />
            </div>
            <div className="text-3xl font-bold text-[#1D1C17] mb-1">45</div>
            <div className="text-sm text-[#5E6460] font-bold">Pending Response</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E6E2DA] shadow-sm">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <X className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-[#1D1C17] mb-1">11</div>
            <div className="text-sm text-[#5E6460] font-bold">Regretfully Declined</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-6 border-b border-[#E6E2DA] mb-6">
          {['Overview', 'Guest List', 'Dietary Needs', 'Wish Wall Messages'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold transition-colors relative ${activeTab === tab ? 'text-[#0F5B3E]' : 'text-[#5E6460] hover:text-[#1D1C17]'}`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0F5B3E]" />}
            </button>
          ))}
        </div>

        {/* Guest List Table Area */}
        <div className="bg-white border border-[#E6E2DA] rounded-2xl shadow-sm overflow-hidden">
          {/* Table Toolbar */}
          <div className="p-4 border-b border-[#E6E2DA] flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5E6460]" />
              <input type="text" placeholder="Search guests by name..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#E6E2DA] bg-[#FAF7F2] text-sm focus:outline-none focus:border-[#C9A227]" />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-[#E6E2DA] rounded-lg text-sm font-bold text-[#5E6460] hover:bg-[#FAF7F2]">
                <Filter className="w-4 h-4" /> Filter Status
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#0F5B3E] rounded-lg text-sm font-bold text-white hover:bg-[#0A422C]">
                <MessageSquare className="w-4 h-4" /> Send Reminder
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-[#E6E2DA] text-xs uppercase tracking-wider text-[#5E6460]">
                  <th className="p-4 font-bold">Guest Name</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold">Total Guests (+1s)</th>
                  <th className="p-4 font-bold">Dietary Needs</th>
                  <th className="p-4 font-bold">Responded At</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {rsvps.map((rsvp, idx) => (
                  <tr key={idx} className="border-b border-[#E6E2DA] hover:bg-[#FAF7F2] transition-colors">
                    <td className="p-4 font-bold text-[#1D1C17]">{rsvp.name}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        rsvp.status === 'Attending' ? 'bg-[#E6F0EC] text-[#0F5B3E]' :
                        rsvp.status === 'Pending' ? 'bg-[#FDF8EA] text-[#C9A227]' : 'bg-red-50 text-red-600'
                      }`}>
                        {rsvp.status}
                      </span>
                    </td>
                    <td className="p-4 text-[#5E6460]">{rsvp.guests > 0 ? rsvp.guests : '-'}</td>
                    <td className="p-4 text-[#5E6460]">{rsvp.diet}</td>
                    <td className="p-4 text-[#5E6460] text-xs">{rsvp.time}</td>
                    <td className="p-4 text-right">
                      <button className="text-[#C9A227] font-bold text-xs hover:underline">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-[#E6E2DA] flex justify-between items-center text-sm text-[#5E6460]">
             <span>Showing 5 of 142 guests</span>
             <div className="flex gap-2">
               <button className="px-3 py-1 border border-[#E6E2DA] rounded hover:bg-[#FAF7F2]">Prev</button>
               <button className="px-3 py-1 border border-[#E6E2DA] rounded bg-[#FAF7F2] font-bold text-[#1D1C17]">1</button>
               <button className="px-3 py-1 border border-[#E6E2DA] rounded hover:bg-[#FAF7F2]">2</button>
               <button className="px-3 py-1 border border-[#E6E2DA] rounded hover:bg-[#FAF7F2]">3</button>
               <button className="px-3 py-1 border border-[#E6E2DA] rounded hover:bg-[#FAF7F2]">Next</button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
