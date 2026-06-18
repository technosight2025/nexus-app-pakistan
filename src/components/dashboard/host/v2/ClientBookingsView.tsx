"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Calendar, CheckCircle2, ChevronRight, Circle, Download, 
  FileText, ShieldCheck, DollarSign, Wallet, Users, Store, 
  Clock, X, Printer, CreditCard, Banknote, Sparkles, CheckSquare, Edit3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Milestone {
  id: string;
  name: string;
  percentage: number;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Locked';
}

interface HiredVendor {
  id: string;
  businessName: string;
  category: string;
  image: string;
  contractAmount: number;
  paidAmount: number;
  status: 'Confirmed' | 'Pending Signature' | 'Tentative' | 'Completed';
  milestones: Milestone[];
  contractTerms: string;
}

const INITIAL_VENDORS: HiredVendor[] = [
  {
    id: 'BKG-LHR-0021',
    businessName: 'Royal Palace Banquet',
    category: 'Venue & Banquet Hall',
    image: '/images/pakistani_wedding_venue.png',
    contractAmount: 1500000,
    paidAmount: 500000,
    status: 'Confirmed',
    contractTerms: '1. Venue usage: December 15, 2026 from 18:00 to 23:30.\n2. Catering and hall decorations are managed via separate addon sheets.\n3. Cancelations made 30 days prior to the slot date will receive 50% deposit refund. No refunds under 30 days.',
    milestones: [
      { id: 'm1', name: 'Booking Deposit (Retainer)', percentage: 33.3, amount: 500000, dueDate: 'Nov 01, 2026', status: 'Paid' },
      { id: 'm2', name: 'Midway Progress Milestone', percentage: 33.3, amount: 500000, dueDate: 'Dec 01, 2026', status: 'Pending' },
      { id: 'm3', name: 'Final Handover Clearance', percentage: 33.4, amount: 500000, dueDate: 'Dec 15, 2026', status: 'Locked' }
    ]
  },
  {
    id: 'BKG-LHR-0022',
    businessName: 'Sara Tariq Photography',
    category: 'Wedding Photography & Media',
    image: '/images/pakistani_artisan_photographer.png',
    contractAmount: 250000,
    paidAmount: 50000,
    status: 'Pending Signature',
    contractTerms: '1. Media coverage includes 2 photographers, 1 videographer.\n2. Deliverables: 1 premium hardcopy album, all raw footage raw streams.\n3. The Photographer owns raw copy rights but licenses unlimited usage to clients.\n4. Balance due must be cleared before album print orders.',
    milestones: [
      { id: 'm4', name: 'Booking Retainer Fee', percentage: 20, amount: 50000, dueDate: 'Nov 05, 2026', status: 'Paid' },
      { id: 'm5', name: 'Shoot Pre-Payment Clearance', percentage: 40, amount: 100000, dueDate: 'Dec 10, 2026', status: 'Pending' },
      { id: 'm6', name: 'Album Print Release Milestone', percentage: 40, amount: 100000, dueDate: 'Jan 05, 2027', status: 'Locked' }
    ]
  },
  {
    id: 'BKG-LHR-0023',
    businessName: 'Indus Flavors Catering',
    category: 'Wedding Catering & Cauldron Daigs',
    image: '/images/generated/angle1.png',
    contractAmount: 800000,
    paidAmount: 160000,
    status: 'Confirmed',
    contractTerms: '1. Serving size: 350-400 expected guests.\n2. Inclusions: 10 Daigs of Mutton Biryani, 8 Daigs of Chicken Korma, Gajar Halwa, and soft drinks.\n3. Menu edits can be requested up to 10 days before the event slot.\n4. Waste prevention: Surplus foods are packaged for charity distribution.',
    milestones: [
      { id: 'm7', name: 'Ingredient Purchase Deposit', percentage: 20, amount: 160000, dueDate: 'Nov 10, 2026', status: 'Paid' },
      { id: 'm8', name: 'Pre-Event Supply Milestone', percentage: 40, amount: 320000, dueDate: 'Dec 12, 2026', status: 'Pending' },
      { id: 'm9', name: 'Post-Event Clean up Balance', percentage: 40, amount: 320000, dueDate: 'Dec 16, 2026', status: 'Locked' }
    ]
  },
  {
    id: 'BKG-LHR-0024',
    businessName: 'Rose Petals Decorators',
    category: 'Theme Decorations & Lighting',
    image: '/images/venues_halls_circle.png',
    contractAmount: 450000,
    paidAmount: 0,
    status: 'Tentative',
    contractTerms: '1. Stage design: Royal Shehnai theme backdrop.\n2. Flower supply: Fresh local marigolds and red roses.\n3. Lighting: Full fairy light cascade array around banquet garden paths.\n4. Deposit is required to transition booking slot status to Confirmed.',
    milestones: [
      { id: 'm10', name: 'Decor Retainer Deposit', percentage: 20, amount: 90000, dueDate: 'Nov 20, 2026', status: 'Pending' },
      { id: 'm11', name: 'Material Acquisition Prep', percentage: 50, amount: 225000, dueDate: 'Dec 05, 2026', status: 'Locked' },
      { id: 'm12', name: 'Setup Handover Milestone', percentage: 30, amount: 135000, dueDate: 'Dec 14, 2026', status: 'Locked' }
    ]
  }
];

export function ClientBookingsView() {
  const [vendors, setVendors] = useState<HiredVendor[]>(INITIAL_VENDORS);
  const [selectedVendor, setSelectedVendor] = useState<HiredVendor | null>(null);
  
  // Contract Modal states
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [signatureType, setSignatureType] = useState<'type' | 'draw'>('type');
  const [typedSignature, setTypedSignature] = useState('');
  const [isSigned, setIsSigned] = useState(false);
  
  // Payment modal states
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Drawing Canvas setup
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const formatPKR = (val: number) => {
    return 'Rs. ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(val);
  };

  // Escrow summaries
  const totalContracted = vendors.reduce((acc, v) => acc + v.contractAmount, 0);
  const totalPaid = vendors.reduce((acc, v) => acc + v.paidAmount, 0);
  const totalRemaining = totalContracted - totalPaid;

  // Draw handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1E1B4B';
    
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleContractSubmit = () => {
    if (signatureType === 'type' && !typedSignature.trim()) {
      alert("Please type your name to sign the contract.");
      return;
    }
    
    setIsSigned(true);
    setTimeout(() => {
      if (selectedVendor) {
        const updated = vendors.map(v => {
          if (v.id === selectedVendor.id) {
            return { ...v, status: 'Confirmed' as const };
          }
          return v;
        });
        setVendors(updated);
        // Sync panel state
        setSelectedVendor({ ...selectedVendor, status: 'Confirmed' as const });
      }
      setIsContractOpen(false);
      setIsSigned(false);
      setTypedSignature('');
      alert("Mubarak! Escrow Contract signed and activated successfully.");
    }, 1000);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCVC) {
      alert("Please fill in card details.");
      return;
    }
    
    setPaymentProcessing(true);
    setTimeout(() => {
      if (selectedVendor && selectedMilestone) {
        // Update milestone status and vendor paid amount
        const updatedMilestones = selectedVendor.milestones.map(m => {
          if (m.id === selectedMilestone.id) {
            return { ...m, status: 'Paid' as const };
          }
          // Unlock next milestone if locked
          const milestoneIdx = selectedVendor.milestones.findIndex(x => x.id === selectedMilestone.id);
          const currentIdx = selectedVendor.milestones.findIndex(x => x.id === m.id);
          if (currentIdx === milestoneIdx + 1 && m.status === 'Locked') {
            return { ...m, status: 'Pending' as const };
          }
          return m;
        });

        const newPaidAmount = selectedVendor.paidAmount + selectedMilestone.amount;
        const allPaid = updatedMilestones.every(m => m.status === 'Paid');

        const updated = vendors.map(v => {
          if (v.id === selectedVendor.id) {
            return { 
              ...v, 
              paidAmount: newPaidAmount,
              status: allPaid ? ('Completed' as const) : v.status === 'Tentative' ? ('Confirmed' as const) : v.status,
              milestones: updatedMilestones
            };
          }
          return v;
        });

        setVendors(updated);
        setSelectedVendor({
          ...selectedVendor,
          paidAmount: newPaidAmount,
          status: allPaid ? ('Completed' as const) : selectedVendor.status === 'Tentative' ? ('Confirmed' as const) : selectedVendor.status,
          milestones: updatedMilestones
        });
      }

      setPaymentProcessing(false);
      setIsPaymentOpen(false);
      setCardNumber('');
      setCardExpiry('');
      setCardCVC('');
      alert("Milestone Payment of " + formatPKR(selectedMilestone?.amount || 0) + " completed successfully! Secured in Escrow Ledger.");
    }, 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 text-slate-800 pb-24 md:pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
        <div>
          <h1 className="text-3xl font-black text-[#0A3B2A] tracking-tight font-heading">Bookings & Vendor Hub</h1>
          <p className="text-slate-500 font-medium mt-1">Manage active contracts, sign agreements, and secure milestone payments in escrow.</p>
        </div>
        
        {/* Shield verification */}
        <div className="flex items-center gap-2 bg-[#0A3B2A]/5 border border-[#0A3B2A]/10 px-4 py-2.5 rounded-full text-[#0A3B2A] font-bold text-xs">
          <ShieldCheck className="w-4 h-4 text-[#047857]" />
          <span>Escrow Protected Ledger Activated</span>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-left">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">Total Contract Value</span>
            <DollarSign className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">{formatPKR(totalContracted)}</p>
          <span className="text-[10px] text-slate-400 font-semibold mt-1 block">Accumulated across hired professionals</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-left">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600">Total Secured (Paid)</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-[#0A3B2A] font-mono">{formatPKR(totalPaid)}</p>
          <span className="text-[10px] text-emerald-600/80 font-bold mt-1 block">Protected in Nexus Escrow Accounts</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-left">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B45309]">Milestones Balance Due</span>
            <Wallet className="w-4 h-4 text-[#B45309]" />
          </div>
          <p className="text-2xl font-black text-[#B45309] font-mono">{formatPKR(totalRemaining)}</p>
          <span className="text-[10px] text-slate-400 font-semibold mt-1 block">Awaiting timeline release approvals</span>
        </div>
      </div>

      {/* Bookings List Grid */}
      <div className="bg-white border border-slate-200 rounded-[2rem] shadow-xs overflow-hidden text-left">
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-base font-black text-[#0A3B2A]">Active Creative Professionals</h2>
          <span className="text-[10px] font-bold text-slate-500">{vendors.length} Total Gigs Hired</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {vendors.map((vendor) => {
            const paidPct = Math.round((vendor.paidAmount / vendor.contractAmount) * 100);
            return (
              <div 
                key={vendor.id} 
                className="border border-slate-200 hover:border-[#0A3B2A] rounded-2xl p-5 bg-white transition-all hover:shadow-md cursor-pointer flex flex-col justify-between"
                onClick={() => setSelectedVendor(vendor)}
              >
                <div className="space-y-4">
                  {/* Vendor visual & Name */}
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shrink-0">
                      <img src={vendor.image} alt={vendor.businessName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                        {vendor.category}
                      </span>
                      <h3 className="text-lg font-black text-slate-900 mt-1 leading-snug">{vendor.businessName}</h3>
                      <p className="text-[10px] text-[#0A3B2A] font-bold mt-0.5">{vendor.id}</p>
                    </div>
                  </div>

                  {/* Pricing Progress Bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-slate-500">Escrow Payout Progress</span>
                      <span className="font-mono">{paidPct}% ({formatPKR(vendor.paidAmount)})</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-100/50">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${paidPct}%` }} />
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-6">
                  <span className={`text-[9.5px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                    vendor.status === 'Confirmed' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                      : vendor.status === 'Pending Signature'
                        ? 'bg-amber-50 text-amber-700 border-amber-100'
                        : vendor.status === 'Completed'
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-150'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}>
                    {vendor.status}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A3B2A] group">
                    <span>Manage Hub</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide-out Detail Drawer */}
      <AnimatePresence>
        {selectedVendor && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVendor(null)}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-[60]"
            />
            <motion.div 
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FAF8F5] shadow-2xl z-[70] flex flex-col border-l border-slate-200 text-left"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-200 flex items-start justify-between bg-white shrink-0">
                <div>
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Nexus Booking Console</span>
                  <h2 className="text-xl font-black text-slate-900 mt-1">{selectedVendor.businessName}</h2>
                </div>
                <button 
                  onClick={() => setSelectedVendor(null)} 
                  className="p-1.5 rounded-full border border-slate-200 hover:bg-slate-100"
                >
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Status Callout */}
                <div className={`p-4.5 rounded-2xl border flex items-center justify-between ${
                  selectedVendor.status === 'Pending Signature'
                    ? 'bg-amber-50/50 border-amber-100 text-amber-900'
                    : 'bg-emerald-50/50 border-emerald-100 text-emerald-950'
                }`}>
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider block">BOOKING STATUS</span>
                    <span className="text-sm font-black">{selectedVendor.status}</span>
                  </div>
                  
                  {selectedVendor.status === 'Pending Signature' && (
                    <button 
                      onClick={() => setIsContractOpen(true)}
                      className="bg-[#B45309] hover:bg-[#9a4505] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl"
                    >
                      Sign Contract
                    </button>
                  )}
                </div>

                {/* Financial Summary */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3.5 shadow-xs">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Escrow Invoicing</h3>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-500">Contract Amount</span>
                    <span className="font-mono text-slate-900">{formatPKR(selectedVendor.contractAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-500">Paid In Escrow</span>
                    <span className="font-mono text-emerald-700">{formatPKR(selectedVendor.paidAmount)}</span>
                  </div>
                  <div className="h-px bg-slate-100 my-1" />
                  <div className="flex justify-between items-center text-xs font-black">
                    <span className="text-slate-900">Remaining Balance</span>
                    <span className="font-mono text-slate-950 text-sm">{formatPKR(selectedVendor.contractAmount - selectedVendor.paidAmount)}</span>
                  </div>
                </div>

                {/* Milestones Flow */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">Milestone Schedule</h3>
                  <div className="space-y-3">
                    {selectedVendor.milestones.map((m, idx) => (
                      <div 
                        key={m.id}
                        className={`bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-xs ${
                          m.status === 'Pending' ? 'border-[#0A3B2A] ring-1 ring-[#0A3B2A]/20' : ''
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                              {m.percentage}%
                            </span>
                            <span className="text-xs font-bold text-slate-800">{m.name}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-semibold">Due: {m.dueDate}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-slate-900 font-mono">{formatPKR(m.amount)}</span>
                          
                          {m.status === 'Paid' && (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-bold px-2 py-0.5 rounded-full">
                              Paid
                            </span>
                          )}
                          {m.status === 'Pending' && (
                            <button
                              onClick={() => {
                                setSelectedMilestone(m);
                                setIsPaymentOpen(true);
                              }}
                              className="bg-[#0A3B2A] hover:bg-[#035f44] text-white text-[9.5px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-colors"
                            >
                              Release
                            </button>
                          )}
                          {m.status === 'Locked' && (
                            <span className="bg-slate-50 text-slate-400 border border-slate-100 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Locked
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contract Terms Briefing */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Contract Agreement Terms</h3>
                  <pre className="text-[11.5px] leading-relaxed font-sans font-medium text-slate-600 whitespace-pre-wrap">
                    {selectedVendor.contractTerms}
                  </pre>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CONTRACT SIGNATURE MODAL */}
      <AnimatePresence>
        {isContractOpen && selectedVendor && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-[80]" onClick={() => setIsContractOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white rounded-2xl shadow-2xl z-[90] overflow-hidden flex flex-col max-h-[90vh] text-left"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h2 className="text-lg font-black text-slate-900">Sign Contract: {selectedVendor.businessName}</h2>
                <button onClick={() => setIsContractOpen(false)} className="p-1 rounded-full border border-slate-200 hover:bg-slate-100">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6">
                {/* Legal Block */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4.5 max-h-48 overflow-y-auto text-xs text-slate-500 space-y-3 font-medium leading-relaxed">
                  <h4 className="font-bold text-[#0A3B2A] uppercase tracking-wider text-[10px]">Escrow Master Agreement</h4>
                  <p>This Agreement is executed between the Event Host ("Client") and {selectedVendor.businessName} ("Service Provider") through the Nexus Platform.</p>
                  <p>1. **Deposit Escrow**: The client agrees to secure all milestone payments inside the Nexus Secure Escrow Account. Funds will be held and automatically released based on the agreed milestone schedule.</p>
                  <p>2. **Delivery & Release**: Upon successful completion of each milestone stage (subject to a 24-hour review window), the client approves the release of the respective funds directly to the provider's active ledger.</p>
                  <p>3. **Disputes Ledger**: In case of delivery disputes, either party can freeze funds inside escrow. A Nexus mediation agent will review timelogs, checklists, and chat transcripts to arbitrate splits.</p>
                  <pre className="font-sans whitespace-pre-wrap border-t border-slate-200 pt-3 mt-3">{selectedVendor.contractTerms}</pre>
                </div>

                {/* Signature Console */}
                <div className="space-y-4">
                  <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-xl w-60">
                    <button 
                      onClick={() => setSignatureType('type')}
                      className={`flex-1 text-center py-1.5 text-[10.5px] font-bold uppercase rounded-lg ${
                        signatureType === 'type' ? 'bg-[#0A3B2A] text-white' : 'text-slate-500'
                      }`}
                    >
                      Type Name
                    </button>
                    <button 
                      onClick={() => setSignatureType('draw')}
                      className={`flex-1 text-center py-1.5 text-[10.5px] font-bold uppercase rounded-lg ${
                        signatureType === 'draw' ? 'bg-[#0A3B2A] text-white' : 'text-slate-500'
                      }`}
                    >
                      Draw Signature
                    </button>
                  </div>

                  {signatureType === 'type' ? (
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Type Full Name as Electronic Signature</label>
                      <input 
                        type="text" 
                        value={typedSignature}
                        onChange={(e) => setTypedSignature(e.target.value)}
                        placeholder="e.g. Zoya Malik"
                        className="w-full h-12 px-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#0A3B2A]/30 italic font-serif text-lg"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Draw signature on box below</label>
                        <button onClick={clearCanvas} className="text-[10px] text-slate-400 hover:text-slate-600 font-bold uppercase">Clear Box</button>
                      </div>
                      <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 h-32 relative">
                        <canvas 
                          ref={canvasRef}
                          width={512}
                          height={128}
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                          onTouchStart={startDrawing}
                          onTouchMove={draw}
                          onTouchEnd={stopDrawing}
                          className="w-full h-full cursor-crosshair touch-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2.5 text-slate-400 text-xs font-semibold">
                  <CheckSquare className="w-4 h-4 text-[#047857]" />
                  <span>I agree to verify this electronic transaction secure audits.</span>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                <button onClick={() => setIsContractOpen(false)} className="text-slate-500 font-bold text-xs uppercase px-4 py-2 hover:bg-slate-100 rounded-lg">Cancel</button>
                <button 
                  onClick={handleContractSubmit}
                  disabled={isSigned}
                  className="bg-[#0A3B2A] hover:bg-[#035f44] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full shadow-lg shadow-emerald-700/10 flex items-center gap-1"
                >
                  {isSigned ? 'Activating Escrow...' : 'Sign & Activate'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MILESTONE PAYMENTS MODAL */}
      <AnimatePresence>
        {isPaymentOpen && selectedMilestone && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-[80]" onClick={() => setIsPaymentOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-2xl shadow-2xl z-[90] overflow-hidden flex flex-col text-left"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h2 className="text-base font-black text-slate-900">Release Milestone Payment</h2>
                <button onClick={() => setIsPaymentOpen(false)} className="p-1 rounded-full border border-slate-200 hover:bg-slate-100">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handlePaymentSubmit} className="p-6 space-y-6">
                <div>
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Milestone Release Amount</span>
                  <p className="text-3xl font-black text-[#0A3B2A] font-mono">{formatPKR(selectedMilestone.amount)}</p>
                  <p className="text-xs text-slate-500 font-semibold mt-1">{selectedMilestone.name}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Credit / Debit Card Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        placeholder="4242 4242 4242 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19))}
                        className="w-full h-11 pl-4 pr-10 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-sm font-semibold focus:outline-none" 
                      />
                      <CreditCard className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Expiry Date</label>
                      <input 
                        type="text" 
                        required
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value.substring(0, 5))}
                        className="w-full h-11 px-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-sm font-semibold focus:outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Secure CVC</label>
                      <input 
                        type="password" 
                        required
                        placeholder="CVC"
                        value={cardCVC}
                        onChange={(e) => setCardCVC(e.target.value.substring(0, 4))}
                        className="w-full h-11 px-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-sm font-semibold focus:outline-none" 
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={paymentProcessing}
                  className="w-full h-12 bg-[#0A3B2A] hover:bg-[#035f44] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-700/10 cursor-pointer"
                >
                  {paymentProcessing ? 'Processing Transaction...' : 'Release Escrow Payout'}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
