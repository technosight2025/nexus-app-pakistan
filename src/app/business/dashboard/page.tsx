"use client"

import React from 'react';
import { Store, TrendingUp, Users, Calendar, ArrowRight, Play, MapPin, ChefHat, Plus, Activity } from 'lucide-react';
import Link from 'next/link';

export default function BusinessGlobalDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1D1C17]">Welcome back, Tariq</h1>
          <p className="text-[#5E6460]">Here is what's happening across Shalimar Gardens today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/business/tools" className="px-4 py-2 bg-white border border-[#E6E2DA] text-[#1D1C17] font-bold text-sm rounded-xl shadow-sm hover:bg-[#FDF8EA] transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add App
          </Link>
          <button className="px-4 py-2 bg-[#0F5B3E] text-white font-bold text-sm rounded-xl shadow-md hover:bg-[#0A422C] transition-colors flex items-center gap-2">
            <Activity className="w-4 h-4" /> View Reports
          </button>
        </div>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Bookings", value: "24", icon: Calendar, trend: "+12%" },
          { label: "Total Revenue", value: "Rs. 4.2M", icon: TrendingUp, trend: "+8%" },
          { label: "New Leads", value: "142", icon: Users, trend: "+24%" },
          { label: "Active Events Today", value: "2", icon: Play, trend: "Stable" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-[#E6E2DA] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E6F0EC] flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-[#0F5B3E]" />
              </div>
              <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-[#5E6460]'}`}>{stat.trend}</span>
            </div>
            <div className="text-2xl font-bold text-[#1D1C17] mb-1">{stat.value}</div>
            <div className="text-sm font-bold text-[#5E6460]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Launchpad: Active Modules */}
      <div>
        <h2 className="text-xl font-serif font-bold text-[#1D1C17] mb-4">Your Active Apps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="group bg-white border border-[#E6E2DA] rounded-2xl p-6 hover:shadow-xl hover:border-[#0F5B3E] transition-all cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6F0EC] rounded-bl-full -z-10 group-hover:scale-110 transition-transform opacity-50" />
            <div className="w-12 h-12 bg-[#0F5B3E] rounded-xl flex items-center justify-center mb-6 shadow-md">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#1D1C17] mb-2">Venue OS</h3>
            <p className="text-sm text-[#5E6460] mb-6">Manage hall bookings, calendar, and quotations for Shalimar Gardens.</p>
            <Link href="/business/venues" className="inline-flex items-center gap-2 text-sm font-bold text-[#0F5B3E] group-hover:gap-3 transition-all">
              Launch App <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="group bg-white border border-[#E6E2DA] rounded-2xl p-6 hover:shadow-xl hover:border-[#C9A227] transition-all cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FDF8EA] rounded-bl-full -z-10 group-hover:scale-110 transition-transform opacity-50" />
            <div className="w-12 h-12 bg-[#C9A227] rounded-xl flex items-center justify-center mb-6 shadow-md">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#1D1C17] mb-2">Catering OS</h3>
            <p className="text-sm text-[#5E6460] mb-6">Manage menus, food orders, and kitchen staff schedules.</p>
            <Link href="/business/restaurant" className="inline-flex items-center gap-2 text-sm font-bold text-[#C9A227] group-hover:gap-3 transition-all">
              Launch App <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="group bg-[#FAF7F2] border border-dashed border-[#C9A227] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#FDF8EA] transition-colors min-h-[240px]">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
              <Plus className="w-6 h-6 text-[#C9A227]" />
            </div>
            <h3 className="font-bold text-[#1D1C17] mb-2">Discover More Apps</h3>
            <p className="text-sm text-[#5E6460] px-4">Browse the App Store to add Display Management, CRM, and more.</p>
            <Link href="/business/tools" className="mt-4 px-6 py-2 bg-white border border-[#C9A227] text-[#C9A227] rounded-full text-xs font-bold hover:bg-[#C9A227] hover:text-white transition-colors">
              Open App Store
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
