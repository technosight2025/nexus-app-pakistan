'use client';

import React, { useState } from 'react';
import { Home, ClipboardList, CheckCircle, Share2, ChevronLeft, ShieldCheck, Heart, Sparkles, Plus } from 'lucide-react';

interface ChecklistItem {
  id: string;
  name: string;
  category: 'Home Appliances' | 'Bedding & Linens' | 'Kitchenware' | 'Furniture';
  checked: boolean;
}

export default function NexusJahaizTracker() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copied, setCopied] = useState<boolean>(false);
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: 'j01', name: 'Automatic Washing Machine', category: 'Home Appliances', checked: true },
    { id: 'j02', name: 'Refrigerator / Deep Freezer', category: 'Home Appliances', checked: false },
    { id: 'j03', name: 'Premium Bridal Bedding Set', category: 'Bedding & Linens', checked: true },
    { id: 'j04', name: 'Luxury Cotton Towel Array', category: 'Bedding & Linens', checked: false },
    { id: 'j05', name: 'Non-Stick Cookware Dinner Set', category: 'Kitchenware', checked: false },
    { id: 'j06', name: 'Microwave & Baking Oven Combo', category: 'Kitchenware', checked: true },
    { id: 'j07', name: 'Bespoke Sheesham Wood Wardrobe', category: 'Furniture', checked: false },
  ]);

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleShareChecklist = () => {
    const mockTrackingUrl = typeof window !== 'undefined' ? `${window.location.origin}/tools/jahaiz-tracker` : '';
    navigator.clipboard.writeText(mockTrackingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    const whatsappText = encodeURIComponent(`Assalam-o-Alaikum! We are utilizing the premium Nexus Jahaiz Tracker to seamlessly coordinate our household wedding planning checklist. Review our live ledger here: ${mockTrackingUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${whatsappText}`, '_blank');
  };

  const categories = ['All', 'Home Appliances', 'Bedding & Linens', 'Kitchenware', 'Furniture'];
  const filteredItems = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);
  
  const completedCount = items.filter(i => i.checked).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans antialiased pb-12 selection:bg-[#0F5B3E]/10">
      
      {/* Minimal Luxury Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#C5A880]/20 px-4 py-4 max-w-xl mx-auto w-full flex items-center gap-3">
        <a href="/" className="p-1.5 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </a>
        <div>
          <span className="text-[9px] uppercase font-black tracking-widest text-[#C5A880]">Cultural Planning Tools</span>
          <h1 className="text-sm font-serif font-black text-slate-900 tracking-tight">Bespoke Jahaiz Tracker</h1>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 mt-6 space-y-6">
        
        {/* Cultural Context Intro Banner */}
        <div className="bg-gradient-to-br from-[#0F5B3E] to-[#0A3F2B] text-[#FDFBF7] p-6 rounded-2xl border border-[#C5A880]/30 shadow-md space-y-3">
          <div className="bg-white/10 p-2 rounded-xl border border-white/10 w-fit text-[#C5A880]">
            <Home className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-lg font-black tracking-wide">Coordinate Your Household Ledger</h2>
            <p className="text-[11px] text-slate-200 leading-relaxed">
              Organize wedding dowry items, bridal gifts, and essential household setups across verified categories to manage wedding expenses transparently.
            </p>
          </div>
          
          {/* Progress Tracker Bar */}
          <div className="pt-2 space-y-1.5">
            <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-wider text-slate-300">
              <span>Checklist Progress</span>
              <span className="text-[#C5A880]">{progressPercent}% Secured</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#C5A880] to-[#E5C494] h-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        {/* Category Horizontal Filter Segment */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#0F5B3E] text-white border-[#0F5B3E] shadow-sm'
                  : 'bg-white border-[#C5A880]/20 text-slate-400 hover:text-[#0F5B3E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Checklist Rows Container */}
        <div className="bg-white border border-[#C5A880]/20 rounded-2xl p-4 shadow-sm space-y-2">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 py-1 flex items-center gap-1.5">
            <ClipboardList className="w-4 h-4 text-[#0F5B3E]" /> Registry Inventory Matrix
          </h3>
          
          <div className="space-y-1.5">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => toggleItem(item.id)}
                className={`p-3.5 border rounded-xl flex items-center justify-between cursor-pointer transition-all duration-200 select-none ${
                  item.checked 
                    ? 'bg-emerald-50/40 border-emerald-100 text-slate-500 shadow-inner' 
                    : 'bg-slate-50/50 border-slate-200/60 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                    item.checked ? 'bg-[#0F5B3E] border-[#0F5B3E] text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {item.checked && <CheckCircle className="w-3 h-3" />}
                  </div>
                  <div>
                    <h4 className={`text-xs font-black transition-all ${item.checked ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {item.name}
                    </h4>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{item.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="w-full mt-4 bg-[#FDFBF7] border border-dashed border-[#C5A880]/40 text-slate-500 hover:text-[#0F5B3E] hover:border-[#0F5B3E]/30 font-black text-[10px] uppercase tracking-widest py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add Custom Ledger Item
          </button>
        </div>

        {/* Dynamic Action Trigger Panel Suite */}
        <div className="bg-gradient-to-br from-[#FAF5EC] to-[#F3EAD8] border border-[#C5A880]/30 rounded-2xl p-5 text-center space-y-4">
          <div className="space-y-1">
            <h3 className="font-serif text-sm font-black text-slate-900">Coordination Switch</h3>
            <p className="text-[11px] text-slate-400 max-w-xs mx-auto leading-relaxed">
              Generate a client-side localized webhook token payload link to dispatch your current ledger metrics directly across family WhatsApp groups.
            </p>
          </div>

          <button
            type="button"
            onClick={handleShareChecklist}
            className="w-full sm:w-auto bg-[#0F5B3E] hover:bg-[#0A3F2B] text-white font-black text-xs px-6 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 transition-all shadow-md group"
          >
            <Share2 className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
            {copied ? 'Link Copied to Clipboard!' : 'Share Ledger Path on WhatsApp'}
          </button>

          <div className="pt-2 border-t border-[#C5A880]/20 flex justify-center items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-[#0F5B3E]" /> Protected under Nexus Core Guardrails
          </div>
        </div>

      </main>
    </div>
  );
}
