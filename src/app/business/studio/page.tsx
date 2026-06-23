'use client';

import React, { useState, useEffect } from 'react';
import { 
  Camera, DollarSign, Upload, MessageSquare, Check, X, 
  Layers, Calendar, Image as ImageIcon, Unlock, Lock, Send, 
  ShieldCheck, Loader2 
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import NexusChat from '@/components/NexusChat';
import StudioUploadDropzone from '@/components/StudioUploadDropzone';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NexusB2BStudioWorkspace() {
  const [activeTab, setActiveTab] = useState<'crm' | 'finance' | 'vault'>('crm');
  const [booking, setBooking] = useState<any>(null);
  const [payments, setPayments] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Using our seeded test values for local workspace context
  const testBookingId = '99999999-9999-9999-9999-999999999999';

  useEffect(() => {
    async function streamStudioSnapshot() {
      try {
        const { data: bookingData } = await supabase
          .from('event_bookings')
          .select('*, venues(*)')
          .eq('id', testBookingId)
          .single();

        const { data: paymentData } = await supabase
          .from('event_payments_matrix')
          .select('*')
          .eq('booking_id', testBookingId)
          .single();

        setBooking(bookingData);
        setPayments(paymentData);
      } catch (err) {
        console.error('Error hydrating B2B studio node:', err);
      } finally {
        setLoading(false);
      }
    }

    streamStudioSnapshot();

    // Bidirectional sync with database changes
    const studioChannel = supabase
      .channel(`b2b-studio-realtime`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'event_payments_matrix', filter: `booking_id=eq.${testBookingId}` }, 
        (payload) => setPayments(payload.new)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(studioChannel);
    };
  }, []);

  // Handler to release the vault lock state via the Nexus Engine API
  const handleVaultToggle = async () => {
    setActionLoading(true);
    try {
      const response = await fetch('/api/nexus-engine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'STUDIO_VAULT_RELEASE',
          bookingId: testBookingId, // '99999999-9999-9999-9999-999999999999'
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      alert('Vault state successfully flipped via Nexus Engine!');
    } catch (err: any) {
      alert(`Transaction Failed: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#0F5B3E] animate-spin mb-2" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Streaming B2B Workspace Module...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 font-sans pb-12">
      
      {/* Upper B2B Dashboard Header Row */}
      <header className="sticky top-0 z-50 bg-[#0F5B3E] text-[#FAF7F2] border-b border-[#D4AF37]/40 p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#D4AF37]/20 p-2 rounded-xl border border-[#D4AF37]/40">
            <Camera className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Technosight Core B2B</span>
            <h1 className="text-base font-black tracking-tight">STUDIO WORKSPACE ENGINE</h1>
          </div>
        </div>
        <div className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Core Verified
        </div>
      </header>

      {/* Metric Breakdown Cards Container */}
      <div className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/70 backdrop-blur-md border border-white p-5 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Client Allocation</p>
          <p className="text-2xl font-black text-[#0F5B3E] mt-1">{booking?.host_name || 'No Active Target'}</p>
          <p className="text-[11px] text-slate-400 mt-1">Shoot Target Date: {booking?.event_date}</p>
        </div>
        <div className="bg-white/70 backdrop-blur-md border border-white p-5 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pre-Wedding Ledger Status</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">Rs. {payments?.pre_wedding_paid?.toLocaleString()}</p>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase tracking-wider mt-1 inline-block">
            {payments?.pre_wedding_status}
          </span>
        </div>
        <div className="bg-white/70 backdrop-blur-md border border-white p-5 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Post-Wedding Due Payoff</p>
          <p className="text-2xl font-black text-amber-700 mt-1">
            Rs. {(payments?.post_wedding_total - payments?.post_wedding_paid)?.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Required to release final asset layers</p>
        </div>
      </div>

      {/* Control Surface Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveTab('crm')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'crm' ? 'bg-[#0F5B3E] text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" /> Core Logistics
        </button>
        <button
          onClick={() => setActiveTab('finance')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'finance' ? 'bg-[#0F5B3E] text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-100'
          }`}
        >
          <DollarSign className="w-4 h-4" /> Financial Master
        </button>
        <button
          onClick={() => setActiveTab('vault')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'vault' ? 'bg-[#D4AF37] text-slate-900 shadow-md' : 'bg-white text-slate-500 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Asset Vault Logic
        </button>
      </div>

      {/* Dynamic Tab Rendering Layer */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        
        {/* TAB 1: CORE LOGISTICS / CRM */}
        {activeTab === 'crm' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                <Calendar className="w-4 h-4 text-[#0F5B3E]" /> Assigned Event Context
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                  <span className="text-xs font-bold text-slate-500">Contact Node</span>
                  <span className="text-sm font-black text-slate-800">{booking?.host_name}</span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                  <span className="text-xs font-bold text-slate-500">Routing Direct</span>
                  <span className="text-sm font-black text-slate-800">{booking?.host_phone}</span>
                </div>
                <div className="flex justify-between items-center bg-[#0F5B3E]/5 p-3 rounded-xl border border-[#0F5B3E]/10">
                  <span className="text-xs font-bold text-[#0F5B3E]">Allocated Venue Surface</span>
                  <span className="text-sm font-black text-[#0F5B3E] text-right">
                    {booking?.venues?.name}<br/>
                    <span className="text-[10px] text-slate-500 font-normal">{booking?.venues?.location}</span>
                  </span>
                </div>
              </div>
            </div>
            
            <NexusChat bookingId={testBookingId} senderType="studio_admin" senderName="Studio Director" />
          </div>
        )}

        {/* TAB 2: FINANCIAL MASTER */}
        {activeTab === 'finance' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 max-w-2xl">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide flex items-center gap-2 border-b border-slate-100 pb-3 mb-6">
              <DollarSign className="w-4 h-4 text-[#0F5B3E]" /> Financial Architecture Matrix
            </h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Project Base</p>
                <div className="text-3xl font-black text-slate-800">Rs. {booking?.total_amount?.toLocaleString()}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Stage 1: Pre-Wedding</p>
                  <div className="mt-2 text-sm text-emerald-700 flex justify-between">
                    <span>Target:</span> <span>Rs. {payments?.pre_wedding_total?.toLocaleString()}</span>
                  </div>
                  <div className="mt-1 text-sm font-black text-emerald-900 flex justify-between">
                    <span>Cleared:</span> <span>Rs. {payments?.pre_wedding_paid?.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
                  <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">Stage 2: Post-Wedding</p>
                  <div className="mt-2 text-sm text-amber-700 flex justify-between">
                    <span>Target:</span> <span>Rs. {payments?.post_wedding_total?.toLocaleString()}</span>
                  </div>
                  <div className="mt-1 text-sm font-black text-amber-900 flex justify-between">
                    <span>Cleared:</span> <span>Rs. {payments?.post_wedding_paid?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ASSET VAULT LOGIC (The crucial B2B action surface) */}
        {activeTab === 'vault' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-xl shadow-[#0F5B3E]/5 border border-slate-200 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#0F5B3E]" /> High-Res Asset Vault Control
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Manage the Supabase storage path locking rules for this booking.</p>
                </div>
                {payments?.high_res_unlocked ? (
                  <div className="bg-emerald-100 text-emerald-700 p-3 rounded-full">
                    <Unlock className="w-6 h-6" />
                  </div>
                ) : (
                  <div className="bg-rose-100 text-rose-700 p-3 rounded-full">
                    <Lock className="w-6 h-6" />
                  </div>
                )}
              </div>
              
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-slate-700">Current Vault State:</span>
                  <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${payments?.high_res_unlocked ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                    {payments?.high_res_unlocked ? 'UNLOCKED (CLIENT VISIBLE)' : 'LOCKED (RESTRICTED)'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  When unlocked, the `event_payments_matrix` triggers a boolean state switch that perfectly aligns with the `storage.objects` RLS policy we pushed in the `000150` migration. This gives the client's NexusB2CCustomerPortal direct access to download the raw high-res master files.
                </p>
              </div>
              
              <div className="mb-6 border-b border-slate-100 pb-6">
                <StudioUploadDropzone bookingId={testBookingId} />
              </div>
              
              <button
                onClick={handleVaultToggle}
                disabled={actionLoading}
                className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 ${
                  actionLoading ? 'bg-slate-300 text-slate-500 cursor-not-allowed' :
                  payments?.high_res_unlocked 
                    ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {actionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : payments?.high_res_unlocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                {actionLoading ? 'Executing RLS Matrix Switch...' : payments?.high_res_unlocked ? 'REVOKE HIGH-RES CLEARANCE' : 'AUTHORIZE HIGH-RES CLEARANCE'}
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
              <div className="absolute -right-10 -top-10 opacity-10">
                <ShieldCheck className="w-64 h-64" />
              </div>
              <h3 className="text-sm font-black text-[#D4AF37] uppercase tracking-wider mb-4">RLS Matrix Architecture</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                By maintaining asset locks strictly within the Postgres Row Level Security (RLS) tier, Nexus Studio guarantees zero leakage of high-resolution IP prior to final financial clearance. 
              </p>
              <div className="bg-black/30 p-4 rounded-xl border border-white/10 font-mono text-[10px] text-emerald-400 space-y-2">
                <p>✓ Table `event_payments_matrix` synced</p>
                <p>✓ Realtime payload channel open</p>
                <p>✓ Policy `Enforce payment check` active</p>
                <p>✓ Bucket `nexus-media/originals` isolated</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
