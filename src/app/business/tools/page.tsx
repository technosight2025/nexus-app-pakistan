"use client"

import React, { useState } from 'react';
import { Search, MapPin, Camera, ChefHat, MonitorPlay, Users, Briefcase, FileText, CheckCircle2, DownloadCloud, Star, Calendar, LayoutTemplate } from 'lucide-react';

export default function BusinessToolsAppStore() {
  const [activeCategory, setActiveCategory] = useState('All Apps');
  
  const categories = ['All Apps', 'Venue Tools', 'Studio Tools', 'Hospitality', 'Media & Displays', 'CRM & Sales', 'Marketing'];

  const apps = [
    {
      id: 'venue_os',
      name: 'Venue Management OS',
      category: 'Venue Tools',
      icon: MapPin,
      description: 'The complete suite for marriage halls and venues. Manage halls, dates, and contracts.',
      installed: true,
      rating: 4.9,
    },
    {
      id: 'catering_os',
      name: 'Restaurant & Catering OS',
      category: 'Hospitality',
      icon: ChefHat,
      description: 'Manage menus, kitchen orders, food inventory, and catering staff.',
      installed: true,
      rating: 4.8,
    },
    {
      id: 'studio_os',
      name: 'Studio OS',
      category: 'Studio Tools',
      icon: Camera,
      description: 'Project tracking, client photo selection portals, and delivery management.',
      installed: false,
      rating: 4.9,
    },
    {
      id: 'display_os',
      name: 'Digital Displays Manager',
      category: 'Media & Displays',
      icon: MonitorPlay,
      description: 'Cast welcome screens, menus, and wayfinding to Smart TVs across your venue.',
      installed: false,
      rating: 4.7,
      premium: true
    },
    {
      id: 'crm_os',
      name: 'Unified CRM & Leads',
      category: 'CRM & Sales',
      icon: Users,
      description: 'Track leads from the NEXUS Marketplace directly into your sales pipeline.',
      installed: false,
      rating: 4.8,
    },
    {
      id: 'quotes_os',
      name: 'Quotations & Invoicing',
      category: 'CRM & Sales',
      icon: FileText,
      description: 'Generate beautiful PDF quotes and track payments online.',
      installed: false,
      rating: 4.9,
    },
    {
      id: 'workforce_os',
      name: 'Gig & Workforce Manager',
      category: 'Hospitality',
      icon: Briefcase,
      description: 'Hire waiters, security, and ushers on demand from the NEXUS Gig Board.',
      installed: false,
      rating: 4.6,
    },
    {
      id: 'calendar_os',
      name: 'Global Calendar',
      category: 'Venue Tools',
      icon: Calendar,
      description: 'Master view of all your events, meetings, and block-out dates.',
      installed: false,
      rating: 4.9,
    },
    {
      id: 'storefront',
      name: 'AI Storefront Maker',
      category: 'Marketing',
      icon: LayoutTemplate,
      description: 'Generate 3 stunning, fully-customized public vendor website themes using AI. Preview and publish instantly.',
      installed: false,
      rating: 5.0,
    }
  ];

  const filteredApps = activeCategory === 'All Apps' ? apps : apps.filter(app => app.category === activeCategory);

  const [installing, setInstalling] = useState<string | null>(null);

  const handleInstall = (id: string) => {
    setInstalling(id);
    setTimeout(() => {
      setInstalling(null);
      // Mock toggle installation logic here if needed
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-[#1D1C17] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A227] rounded-full blur-[120px] opacity-20 -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-xl z-10">
          <h1 className="text-4xl font-serif font-bold mb-4">NEXUS App Store</h1>
          <p className="text-white/70 text-lg">Customize your Business OS. Activate only the modules your business needs to operate efficiently.</p>
        </div>
        <div className="w-full md:w-auto relative z-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1D1C17]/50" />
          <input 
            type="text" 
            placeholder="Search for an app..." 
            className="w-full md:w-80 pl-12 pr-4 py-4 rounded-xl text-[#1D1C17] font-bold outline-none focus:ring-4 focus:ring-[#C9A227]/30 transition-shadow"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full font-bold text-sm shrink-0 transition-colors ${
              activeCategory === cat 
                ? 'bg-[#0F5B3E] text-white shadow-md' 
                : 'bg-white border border-[#E6E2DA] text-[#5E6460] hover:bg-[#FAF7F2] hover:text-[#1D1C17]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map(app => (
          <div key={app.id} className="bg-white border border-[#E6E2DA] rounded-3xl p-6 flex flex-col hover:shadow-lg hover:border-[#C9A227]/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${app.installed ? 'bg-[#E6F0EC] text-[#0F5B3E]' : 'bg-[#FAF7F2] text-[#1D1C17]'}`}>
                <app.icon className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-1 bg-[#FDF8EA] px-2 py-1 rounded-lg">
                <Star className="w-3 h-3 text-[#C9A227] fill-[#C9A227]" />
                <span className="text-xs font-bold text-[#1D1C17]">{app.rating}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-[#1D1C17] mb-1">{app.name}</h3>
            <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider mb-3">{app.category}</p>
            <p className="text-sm text-[#5E6460] mb-8 flex-1 leading-relaxed">{app.description}</p>
            
            <div className="mt-auto pt-4 border-t border-[#E6E2DA] flex items-center justify-between">
              {app.premium && !app.installed ? (
                <span className="text-xs font-bold text-[#C9A227] bg-[#FDF8EA] px-2 py-1 rounded-md">PREMIUM</span>
              ) : (
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">FREE</span>
              )}

              {app.installed ? (
                <button className="flex items-center gap-2 px-4 py-2 bg-[#E6F0EC] text-[#0F5B3E] rounded-xl text-sm font-bold pointer-events-none">
                  <CheckCircle2 className="w-4 h-4" /> Installed
                </button>
              ) : (
                <button 
                  onClick={() => handleInstall(app.id)}
                  disabled={installing === app.id}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1D1C17] text-white hover:bg-black rounded-xl text-sm font-bold transition-colors shadow-md disabled:opacity-70"
                >
                  {installing === app.id ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <DownloadCloud className="w-4 h-4" />
                  )}
                  {installing === app.id ? 'Installing...' : 'Install App'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
