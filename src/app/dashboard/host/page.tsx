"use client";

import React, { useState } from "react";

interface GuestContact {
  id: string;
  name: string;
  tier: "VIP" | "Family" | "General";
  rsvp: "Confirmed" | "Pending" | "Declined";
  invitationStatus: "Delivered" | "Opened" | "Played 🎵";
}

export default function HostDashboard() {
  const [activeTier, setActiveTier] = useState<string>("All");

  // Premium multi-day tracking matrix
  const eventsMatrix = [
    { name: "Mehndi", date: "Fri, Oct 16", venue: "The Royal Palms, Lahore", status: "Finalized" },
    { name: "Barat", date: "Sat, Oct 17", venue: "Imperial Ballroom, Karachi", status: "Locked" },
    { name: "Walima", date: "Sun, Oct 18", venue: "The Sapphire Marquee, Karachi", status: "Pending" }
  ];

  // Dynamic Contact list matching updated CRM guidelines
  const contactsData: GuestContact[] = [
    { id: "1", name: "Chaudhary Nabeel & Family", tier: "VIP", rsvp: "Confirmed", invitationStatus: "Played 🎵" },
    { id: "2", name: "Mian Shahzad Abbas", tier: "VIP", rsvp: "Confirmed", invitationStatus: "Opened" },
    { id: "3", name: "Zainab Malik", tier: "Family", rsvp: "Confirmed", invitationStatus: "Played 🎵" },
    { id: "4", name: "Barrister Ahmed Aly", tier: "General", rsvp: "Pending", invitationStatus: "Delivered" },
    { id: "5", name: "Dr. Amna Suleman", tier: "General", rsvp: "Declined", invitationStatus: "Opened" }
  ];

  const filteredContacts = activeTier === "All" 
    ? contactsData 
    : contactsData.filter(c => c.tier === activeTier);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111C15] antialiased font-sans">
      
      {/* HEADER NAVBAR */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="text-xl font-serif font-black tracking-tight">Nexus Ecosystem</div>
          <span className="text-xs bg-[#E8F5E9] text-[#2E7D32] font-mono px-2 py-0.5 rounded-full font-bold">Host Mode</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono text-gray-500">ID: MALIK-VIP</span>
          <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        
        {/* SECTION 1: MASTER HERO TITLE */}
        <div className="space-y-1">
          <h1 className="text-3xl font-serif font-bold tracking-tight">Celebration Management</h1>
          <p className="text-xs text-gray-500">Coordinate timelines, unified contacts, and live WhatsApp digital invitations.</p>
        </div>

        {/* SECTION 2: TIMELINE MATRIX OVERVIEW */}
        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold">Event Matrix</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {eventsMatrix.map((event, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between h-32 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base">{event.name}</h3>
                    <p className="text-xs font-mono text-gray-400 mt-0.5">{event.date}</p>
                  </div>
                  <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                    event.status === "Locked" ? "bg-red-50 text-red-700" :
                    event.status === "Finalized" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
                  }`}>
                    {event.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate font-light">📍 {event.venue}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: CONTACTS & INVITE PERFORMANCE SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT: CRM CONTACTS TABLES */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <h2 className="text-lg font-serif font-bold">Contacts Matrix</h2>
              
              {/* FILTER CAPSULES */}
              <div className="flex space-x-1 bg-gray-100 p-0.5 rounded-lg text-xs font-medium">
                {["All", "VIP", "Family"].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setActiveTier(tier)}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      activeTier === tier ? "bg-[#111C15] text-white shadow-xs" : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 font-mono font-medium tracking-wider uppercase border-b border-gray-100">
                    <th className="p-3">Contact</th>
                    <th className="p-3">Group</th>
                    <th className="p-3 text-right">RSVP Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-3 font-serif font-bold text-sm">{contact.name}</td>
                      <td className="p-3 font-mono">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          contact.tier === "VIP" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
                        }`}>{contact.tier}</span>
                      </td>
                      <td className="p-3 text-right font-mono font-bold">
                        <span className={contact.rsvp === "Confirmed" ? "text-emerald-600" : contact.rsvp === "Declined" ? "text-red-500" : "text-amber-500"}>
                          {contact.rsvp}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT: BROADCAST DISPATCH METRICS */}
          <div className="space-y-3">
            <h2 className="text-lg font-serif font-bold">Broadcast Engine</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">Meta Cloud API</span>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-gray-500">
                  <span>Sent Outbound:</span>
                  <span className="text-black font-bold">342</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivered Logs:</span>
                  <span className="text-black font-bold">328</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Read Checkmarks:</span>
                  <span className="text-emerald-600 font-bold">294</span>
                </div>
              </div>

              <button className="w-full bg-[#111C15] text-white font-mono uppercase text-[11px] font-bold py-2.5 rounded-lg tracking-wider hover:bg-black transition-colors cursor-pointer">
                Trigger Follow-up Sync
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER ACTION BAR */}
      <footer className="border-t border-gray-200 mt-16 py-6 text-center text-xs text-gray-400 font-mono">
        © 2026 Nexus Ecosystem • Platform System Secure
      </footer>
    </div>
  );
}
