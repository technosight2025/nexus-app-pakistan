"use client"

import React, { useState } from 'react';
import { MonitorPlay, Settings, Cast, Copy, Plus, Activity, LayoutTemplate, Link as LinkIcon, Edit3 } from 'lucide-react';
import Link from 'next/link';

export default function BusinessDisplaysManager() {
  const [screens, setScreens] = useState([
    {
      id: 'scr-1',
      name: 'Main Entrance Lobby TV',
      status: 'Online',
      currentlyCasting: 'Welcome Board (Ali & Fatima)',
      url: 'https://nexus.pk/display/scr-1'
    },
    {
      id: 'scr-2',
      name: 'Dining Hall A TV',
      status: 'Online',
      currentlyCasting: 'Dinner Menu',
      url: 'https://nexus.pk/display/scr-2'
    },
    {
      id: 'scr-3',
      name: 'Outdoor Patio Projector',
      status: 'Offline',
      currentlyCasting: 'None',
      url: 'https://nexus.pk/display/scr-3'
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1D1C17] flex items-center gap-3">
            <MonitorPlay className="w-8 h-8 text-[#0F5B3E]" /> Display Manager
          </h1>
          <p className="text-[#5E6460] mt-2">Control what appears on the Smart TVs across your venue in real-time.</p>
        </div>
        <button className="px-5 py-2.5 bg-[#1D1C17] text-white font-bold text-sm rounded-xl shadow-md hover:bg-black transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Register New Screen
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Screen Cards */}
        {screens.map(screen => (
          <div key={screen.id} className="bg-white border border-[#E6E2DA] rounded-3xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
            {/* Screen Header */}
            <div className={`p-4 border-b border-[#E6E2DA] flex justify-between items-center ${screen.status === 'Online' ? 'bg-[#FDF8EA]' : 'bg-[#FAF7F2]'}`}>
              <div className="flex items-center gap-2">
                <MonitorPlay className={`w-5 h-5 ${screen.status === 'Online' ? 'text-[#C9A227]' : 'text-[#5E6460]'}`} />
                <span className="font-bold text-[#1D1C17]">{screen.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${screen.status === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E6460]">{screen.status}</span>
              </div>
            </div>

            {/* Content Control */}
            <div className="p-6 flex-1 flex flex-col justify-center items-center text-center">
              <p className="text-xs font-bold text-[#5E6460] uppercase tracking-widest mb-2">Currently Casting</p>
              <h3 className={`text-lg font-bold mb-6 ${screen.currentlyCasting === 'None' ? 'text-[#5E6460] italic' : 'text-[#0F5B3E]'}`}>
                {screen.currentlyCasting}
              </h3>

              <div className="w-full space-y-3">
                <button className="w-full py-2.5 bg-[#FAF7F2] border border-[#E6E2DA] hover:border-[#0F5B3E] hover:text-[#0F5B3E] text-[#1D1C17] font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Cast className="w-4 h-4" /> Change Content
                </button>
                <div className="flex gap-3">
                  <button className="flex-1 py-2 bg-white border border-[#E6E2DA] text-[#5E6460] hover:bg-[#FAF7F2] font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2">
                    <Edit3 className="w-4 h-4" /> Edit Name
                  </button>
                  <button className="flex-1 py-2 bg-white border border-[#E6E2DA] text-[#5E6460] hover:bg-[#FAF7F2] font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2">
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Footer / Link */}
            <div className="bg-[#FAF7F2] p-4 border-t border-[#E6E2DA] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#5E6460]">
                <LinkIcon className="w-3 h-3" /> {screen.url.replace('https://', '')}
              </div>
              <button className="text-[#0F5B3E] hover:text-[#0A422C] transition-colors p-1" title="Copy URL">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Content Templates Promo */}
        <div className="bg-[#0F5B3E] text-white rounded-3xl p-8 relative overflow-hidden flex flex-col justify-end min-h-[300px]">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white opacity-5 rounded-full blur-2xl" />
          <LayoutTemplate className="w-10 h-10 text-[#C9A227] mb-6" />
          <h3 className="text-2xl font-serif font-bold mb-2">Display Templates</h3>
          <p className="text-white/70 text-sm mb-6">Create beautiful Welcome Boards, Menus, and photo slideshows to cast to your screens.</p>
          <button className="px-4 py-2.5 bg-white text-[#0F5B3E] font-bold text-sm rounded-xl shadow-md hover:bg-[#FDF8EA] transition-colors w-fit">
            Browse Templates
          </button>
        </div>

      </div>

    </div>
  );
}
