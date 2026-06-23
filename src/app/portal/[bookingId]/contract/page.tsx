'use client';

import React, { useState, useEffect, use } from 'react';
import { ShieldCheck, FileText, PenTool, ChevronLeft, Loader2, CheckCircle2, AlertCircle, Calendar, Briefcase } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ContractPageProps {
  params: Promise<{ bookingId: string }>;
}

export default function NexusDigitalContractSignature({ params }: ContractPageProps) {
  const { bookingId } = use(params);
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [signature, setSignature] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contractSigned, setContractSigned] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContractData() {
      try {
        const { data, error } = await supabase
          .from('event_bookings')
          .select('*, venues(*)')
          .eq('id', bookingId)
          .single();

        if (error) throw error;
        setBooking(data);
        
        if (data?.order_status === 'confirmed' || data?.order_status === 'ready_for_production') {
          // If already signed or fully locked in by the platform loop
          setContractSigned(true);
        }
      } catch (err) {
        console.error('Failed to pull contract specifications:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchContractData();
  }, [bookingId]);

  const handleSignContract = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signature.trim()) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      // 1. Fire state change request directly to the serverless Nexus Engine API
      const response = await fetch('/api/nexus-engine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'CONTRACT_SIGN',
          bookingId: bookingId,
          signatureName: signature.trim()
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Contract binding failed.');

      setContractSigned(true);
      // Log signing event to live communication feed to alert studio managers instantly
      await supabase.from('nexus_live_communications').insert({
        booking_id: bookingId,
        sender_type: 'host',
        sender_name: 'System Legal Matrix',
        message: `📜 LEGAL EXECUTED: Digital Contract signed and authenticated by ${signature.trim()}.`
      });

    } catch (err: any) {
      setStatusMessage(err.message || 'Verification execution fault.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#0F5B3E] animate-spin mb-2" />
        <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Loading Legal Specifications...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans antialiased pb-12 selection:bg-[#0F5B3E]/10">
      
      {/* Navigation Row Header */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#C5A880]/20 px-4 py-4 max-w-2xl mx-auto w-full flex items-center gap-3">
        <a href={`/portal/${bookingId}`} className="p-1.5 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </a>
        <div>
          <span className="text-[9px] uppercase font-black tracking-widest text-[#C5A880]">Nexus Security Core</span>
          <h1 className="text-sm font-serif font-black text-slate-900 tracking-tight">Digital Coverage Agreement</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 mt-6 space-y-6">
        
        {/* Verification Overview Matrix */}
        <div className="bg-white border border-[#C5A880]/20 rounded-2xl p-5 shadow-sm grid grid-cols-2 gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-[#0F5B3E]" />
            <div>
              <p className="text-slate-400 font-bold uppercase text-[9px]">Event Date</p>
              <p className="font-black text-slate-700">{booking?.event_date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Briefcase className="w-4 h-4 text-[#0F5B3E]" />
            <div>
              <p className="text-slate-400 font-bold uppercase text-[9px]">Allocated Destination</p>
              <p className="font-black text-slate-700 truncate">{booking?.venues?.name || 'Assigned Hall'}</p>
            </div>
          </div>
        </div>

        {/* Legal Binding Terms Scroll Sheet Box */}
        <div className="bg-white border border-[#C5A880]/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-[#0F5B3E]" /> Terms & Standard Conditions
          </h3>
          
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 h-[180px] overflow-y-auto text-[11px] text-slate-500 space-y-3 font-medium leading-relaxed custom-scrollbar">
            <p className="font-bold text-slate-700">1. Media Coverage Allocation</p>
            <p>Technosight Premium Studios agrees to supply specialized equipment, photographers, and cinematic crew matching the verified slots logged inside the database cluster model.</p>
            
            <p className="font-bold text-slate-700">2. Intellectual Property & Asset Vaulting</p>
            <p>Watermarked compression proofs will pass to the customer console post-production layers instantly. High-resolution raw original deliverable assets are restricted securely at the file system layer under Supabase Row Level Security parameters until the balance payoff conditions achieve completion metrics.</p>
            
            <p className="font-bold text-slate-700">3. Cancellation & Rescheduling Guardrails</p>
            <p>Deposits are non-refundable but can shift to open dates pending calendar synchronization checks inside the centralized date conflict validation utilities.</p>
          </div>
        </div>

        {/* Signature Capture Core Block */}
        <div className="bg-gradient-to-br from-[#FAF5EC] to-[#F3EAD8] border border-[#C5A880]/30 rounded-2xl p-6 shadow-sm">
          {contractSigned ? (
            <div className="text-center py-4 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-serif text-sm font-black text-slate-900">Agreement Fully Executed</h4>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto leading-relaxed">
                This transaction contract has been legally signed, timestamped, and stored inside the secure database architecture.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSignContract} className="space-y-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-serif text-sm font-black text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
                  <PenTool className="w-4 h-4 text-[#0F5B3E]" /> E-Signature Verification
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Type your official legal name below. By submitting, you acknowledge and accept all system terms and operational guidelines.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  required
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Type Full Name to Sign..."
                  className="flex-1 bg-white border border-[#C5A880]/30 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-[#0F5B3E] transition-all font-serif"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !signature.trim()}
                  className="bg-[#0F5B3E] hover:bg-[#0A3F2B] text-white text-xs font-black px-6 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Authorize & Sign'}
                </button>
              </div>
            </form>
          )}

          {statusMessage && (
            <div className="mt-3 p-3 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl text-[11px] flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}
        </div>

        <div className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#0F5B3E]" /> Protected Under Nexus Contract Guardrails
        </div>

      </main>
    </div>
  );
}
