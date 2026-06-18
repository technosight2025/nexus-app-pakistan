"use client"

import React, { useState } from 'react';
import { Settings, Users, Wallet, CheckSquare, MessageSquare, Briefcase, Camera, Building, CalendarDays, Phone, Monitor, QrCode } from 'lucide-react';
import { ModuleActivationModal } from './ModuleActivationModal';

export function ModuleBentoGrid() {
  const [selectedModule, setSelectedModule] = useState<any | null>(null);

  const categories = [
    {
      title: "Event Management OS",
      colSpan: "col-span-12 md:col-span-8 lg:col-span-8",
      modules: [
        { name: "Event Timeline", desc: "Build by-the-minute schedules", icon: CalendarDays, status: "Installed", tier: "Free" },
        { name: "Guest Manager", desc: "Track RSVPs and diets", icon: Users, status: "Installed", tier: "Free" },
        { name: "Budget Planner", desc: "Track all event expenses", icon: Wallet, status: "Not Installed", tier: "Free" },
        { name: "Task Manager", desc: "Assign duties to family", icon: CheckSquare, status: "Not Installed", tier: "Free" }
      ]
    },
    {
      title: "Digital Invitations",
      colSpan: "col-span-12 md:col-span-4 lg:col-span-4",
      modules: [
        { name: "Invitation Builder", desc: "Design animated e-vites", icon: MessageSquare, status: "Premium", tier: "Pro" },
        { name: "QR Passes", desc: "Secure entry scanning", icon: QrCode, status: "Premium", tier: "Pro" }
      ]
    },
    {
      title: "CRM & Sales",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
      modules: [
        { name: "Customer CRM", desc: "Manage client details", icon: Phone, status: "Not Installed", tier: "Pro" },
        { name: "Quotation Builder", desc: "Send fast estimates", icon: Briefcase, status: "Not Installed", tier: "Pro" }
      ]
    },
    {
      title: "Venue OS",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
      modules: [
        { name: "Hall Management", desc: "Track availability", icon: Building, status: "Not Installed", tier: "Business" },
        { name: "Floor Plans", desc: "Table layouts", icon: Settings, status: "Not Installed", tier: "Business" }
      ]
    },
    {
      title: "Studio OS",
      colSpan: "col-span-12 md:col-span-12 lg:col-span-4",
      modules: [
        { name: "Proofing Portal", desc: "Client photo selection", icon: Camera, status: "Not Installed", tier: "Business" },
        { name: "Video Approval", desc: "Client video comments", icon: Monitor, status: "Not Installed", tier: "Business" }
      ]
    }
  ];

  return (
    <>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
        <h2 className="text-2xl font-serif font-bold text-[#1D1C17] mb-8">App Marketplace</h2>
        
        <div className="grid grid-cols-12 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className={`${cat.colSpan} bg-white rounded-3xl p-6 border border-[#E6E2DA] shadow-sm`}>
              <h3 className="text-[#5E6460] font-bold text-xs uppercase tracking-wider mb-6">{cat.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cat.modules.map((mod, mIdx) => {
                  const Icon = mod.icon;
                  return (
                    <div 
                      key={mIdx} 
                      onClick={() => setSelectedModule(mod)}
                      className="group border border-[#E6E2DA] rounded-2xl p-4 hover:border-[#0F5B3E] hover:shadow-md transition-all cursor-pointer bg-[#FAF7F2] hover:bg-white flex flex-col h-full"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-[#E6E2DA] group-hover:border-[#0F5B3E]/30 transition-colors">
                          <Icon className="w-5 h-5 text-[#0F5B3E]" />
                        </div>
                        {mod.status === 'Installed' && (
                          <span className="text-[10px] font-bold px-2 py-1 bg-[#E6F0EC] text-[#0F5B3E] rounded-full uppercase tracking-wide">Installed</span>
                        )}
                        {mod.status === 'Premium' && (
                          <span className="text-[10px] font-bold px-2 py-1 bg-[#FDF8EA] text-[#C9A227] rounded-full uppercase tracking-wide">Premium</span>
                        )}
                      </div>
                      <h4 className="font-bold text-[#1D1C17] group-hover:text-[#0F5B3E] transition-colors">{mod.name}</h4>
                      <p className="text-xs text-[#5E6460] mt-1 line-clamp-2">{mod.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModuleActivationModal 
        module={selectedModule} 
        onClose={() => setSelectedModule(null)} 
      />
    </>
  );
}
