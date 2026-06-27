"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function VenueMatrix() {
  // 1. Calendar Slot Protection Matrix
  const [selectedMonth, setSelectedMonth] = useState("October 2026");
  const bookedDates = [12, 14, 16, 17, 18]; // Dates locked by Nexus events
  
  // 2. Interactive Daig-Math Catering Calculator States
  const [guestCount, setGuestCount] = useState<number>(500);
  const [daigCapacity, setDaigCapacity] = useState<number>(10); // Standard serving per Daig (e.g., 10-12 guests per Daig)
  
  // Custom formula matching culinary event logistics
  const calculatedDaigs = Math.ceil(guestCount / daigCapacity);
  const estimatedCostPerDaig = 18500; // PKR average baseline for premium mutton biryani daig
  const totalCateringCost = calculatedDaigs * estimatedCostPerDaig;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111C15] antialiased font-sans">
      
      {/* HEADER NAVBAR */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xs tracking-widest font-mono text-gray-400 hover:text-black">← MAIN ECOSYSTEM</Link>
          <span className="text-gray-200">|</span>
          <div className="text-xl font-serif font-bold tracking-tight">Venue Matrix</div>
        </div>
        <div className="text-xs bg-[#E8F5E9] text-[#2E7D32] font-mono px-3 py-1 rounded-full font-bold">
          Active Space: Lahore & Karachi
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        
        {/* SECTION 1: INTRO HEADER */}
        <div className="space-y-1">
          <h1 className="text-3xl font-serif font-bold tracking-tight">Marquee Scheduling & Inventory</h1>
          <p className="text-xs text-gray-500">Protect reservation slots against date clashes and calculate custom culinary capacities with precision.</p>
        </div>

        {/* TWO COLUMN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: CALENDAR SLOT LOCK MANAGER */}
          <div className="lg:col-span-1 bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h2 className="font-serif font-bold text-base">Slot Availability</h2>
              <span className="text-[10px] font-mono text-gray-400">{selectedMonth}</span>
            </div>

            {/* Simulated Grid Calendar Layout (October 2026) */}
            <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-mono pt-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div key={i} className="text-gray-400 font-bold py-1">{day}</div>
              ))}
              {Array.from({ length: 31 }, (_, i) => {
                const dayNumber = i + 1;
                const isBooked = bookedDates.includes(dayNumber);
                return (
                  <div
                    key={i}
                    className={`p-2 rounded-lg font-medium transition-all ${
                      isBooked 
                        ? "bg-red-50 text-red-700 border border-red-200 font-bold cursor-not-allowed" 
                        : "bg-gray-50 text-gray-700 hover:bg-[#111C15] hover:text-white cursor-pointer"
                    }`}
                    title={isBooked ? "Slot Clashed / Reserved" : "Available Space"}
                  >
                    {dayNumber}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] font-mono">
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 bg-red-100 border border-red-300 rounded" />
                <span className="text-gray-500">Clash Protection Locked</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 bg-gray-50 border border-gray-200 rounded" />
                <span className="text-gray-500">Available Date</span>
              </div>
            </div>
          </div>

          {/* RIGHT: DAIG-MATH VISUAL CATERING TOOL */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
            <div>
              <h2 className="font-serif font-bold text-xl">Daig-Math Calculator</h2>
              <p className="text-xs text-gray-500 mt-0.5">Scale traditional catering configurations gracefully to match your exact attendee baseline metrics.</p>
            </div>

            {/* INPUT RANGE BARS */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-500">Total Confirmed Attendance:</span>
                  <span className="text-black font-bold">{guestCount} Guests</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="1500" 
                  step="50"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-[#111C15]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-500">Serving Matrix Capacity (Per Daig):</span>
                  <span className="text-black font-bold">{daigCapacity} Persons</span>
                </div>
                <input 
                  type="range" 
                  min="8" 
                  max="15" 
                  step="1"
                  value={daigCapacity}
                  onChange={(e) => setDaigCapacity(Number(e.target.value))}
                  className="w-full accent-[#111C15]"
                />
              </div>
            </div>

            {/* CULINARY METRIC RESULTS SPLIT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 font-mono text-xs">
              <div className="space-y-1">
                <span className="text-gray-400 block">Total Required Inventory:</span>
                <span className="text-2xl font-serif font-bold text-[#111C15]">{calculatedDaigs} Traditional Daigs</span>
              </div>
              <div className="space-y-1">
                <span className="text-gray-400 block">Estimated Cost Frame (PKR):</span>
                <span className="text-2xl font-serif font-bold text-emerald-700">Rs. {totalCateringCost.toLocaleString()}</span>
              </div>
            </div>

            <button className="w-full bg-[#111C15] text-white font-mono uppercase text-[11px] font-bold py-3.5 rounded-xl tracking-wider hover:bg-black transition-colors shadow-xs cursor-pointer">
              Lock Culinary Provisions & Notify Vendor
            </button>
          </div>

        </div>
      </main>

      <footer className="border-t border-gray-100 mt-20 py-6 text-center text-xs text-gray-400 font-mono">
        © 2026 Nexus Ecosystem • Symmetrical Multi-Tenant Architecture Secure
      </footer>
    </div>
  );
}
