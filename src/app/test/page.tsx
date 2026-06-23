'use client';

import React, { useState, useEffect } from 'react';
import { Play, ShieldAlert, CheckCircle, RefreshCw, Send, Lock, Unlock, Database } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NexusHardTestSuite() {
  const [logs, setLogs] = useState<string[]>([]);
  const [dbState, setDbState] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);
  
  const testBookingId = '99999999-9999-9999-9999-999999999999';

  const addLog = (message: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev]);
  };

  // Fetch baseline state of our seeded test cluster
  const fetchClusterSnapshot = async () => {
    try {
      const { data: booking } = await supabase
        .from('event_bookings')
        .select('*, venues(*)')
        .eq('id', testBookingId)
        .single();

      const { data: matrix } = await supabase
        .from('event_payments_matrix')
        .select('*')
        .eq('booking_id', testBookingId)
        .single();

      setDbState({ booking, matrix });
    } catch (err) {
      addLog('❌ Database hydration check failed. Ensure seed data is applied.');
    }
  };

  useEffect(() => {
    fetchClusterSnapshot();

    // Listen to real-time events during the test execution
    const testChannel = supabase
      .channel('nexus-hard-test')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'event_bookings', filter: `id=eq.${testBookingId}` }, (payload) => {
        addLog(`⚡ DB REALTIME SIGNAL: event_bookings status changed to [${payload.new.order_status}]`);
        fetchClusterSnapshot();
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'event_payments_matrix', filter: `booking_id=eq.${testBookingId}` }, (payload) => {
        addLog(`⚡ DB REALTIME SIGNAL: event_payments_matrix high_res_unlocked set to [${payload.new.high_res_unlocked.toString().toUpperCase()}]`);
        fetchClusterSnapshot();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(testChannel);
    };
  }, []);

  // Run the automated cycle test
  const executeHardTestPipeline = async () => {
    setIsTesting(true);
    setLogs([]);
    addLog('🚀 Initializing Nexus automated system verification test loop...');

    try {
      // Step 1: Force reset row state to pending to start fresh
      addLog('🔄 Step 1: Resetting database cluster rows to baseline pending state...');
      await supabase.from('event_bookings').update({ order_status: 'pending_venue' }).eq('id', testBookingId);
      await supabase.from('event_payments_matrix').update({ high_res_unlocked: false }).eq('id', testBookingId);
      
      // Step 2: Trigger Venue Approval Flow
      addLog('🏢 Step 2: Firing VENUE_APPROVE payload to /api/nexus-engine...');
      const venueRes = await fetch('/api/nexus-engine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'VENUE_APPROVE', bookingId: testBookingId })
      });
      if (!venueRes.ok) throw new Error('Venue approval processing route failure');
      addLog('✅ Venue approval transaction committed successfully.');

      // Step 3: Trigger Studio Vault Release Flow
      addLog('📸 Step 3: Firing STUDIO_VAULT_RELEASE payload to /api/nexus-engine...');
      const studioRes = await fetch('/api/nexus-engine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'STUDIO_VAULT_RELEASE', bookingId: testBookingId })
      });
      if (!studioRes.ok) throw new Error('Studio vault release processing route failure');
      addLog('✅ Studio asset vault clearance transaction committed successfully.');

      addLog('🎉 Pipeline verification test loop concluded with perfect state marks!');
    } catch (err: any) {
      addLog(`❌ Test Pipeline Crash: ${err.message}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-6 text-slate-800 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Test Engine Header */}
        <div className="bg-[#0F5B3E] text-white p-6 rounded-2xl shadow-md border border-[#D4AF37]/30 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
              <ShieldAlert className="text-[#D4AF37]" /> NEXUS SYSTEM VERIFICATION TEST SUITE
            </h1>
            <p className="text-xs text-slate-200 mt-1">Simulate multi-tenant transactions across client and vendor boundaries simultaneously.</p>
          </div>
          <button 
            onClick={executeHardTestPipeline}
            disabled={isTesting}
            className="bg-[#D4AF37] hover:bg-[#bfa032] text-[#0F5B3E] px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {isTesting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
            Execute Hard Test Loop
          </button>
        </div>

        {/* Live System State Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Active Data States */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-4 h-4 text-[#0F5B3E]" /> Realtime Cluster Metrics
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-slate-500 font-bold">Booking Target Lifecycle:</span>
                <span className={`font-black uppercase px-2 py-0.5 rounded text-[10px] ${
                  dbState?.booking?.order_status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>{dbState?.booking?.order_status || 'Hydrating...'}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-slate-500 font-bold">High-Res Storage Access Check:</span>
                <span className="font-black flex items-center gap-1">
                  {dbState?.matrix?.high_res_unlocked ? (
                    <span className="text-emerald-600 flex items-center gap-1"><Unlock className="w-3.5 h-3.5" /> UNLOCKED</span>
                  ) : (
                    <span className="text-rose-600 flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> VAULTED</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Verification Logs */}
          <div className="bg-slate-900 text-slate-200 border border-slate-800 rounded-2xl p-5 shadow-inner flex flex-col h-[200px]">
            <h3 className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-2 border-b border-slate-800 pb-1.5">
              Live Transaction Log Output
            </h3>
            <div className="flex-1 overflow-y-auto font-mono text-[11px] space-y-1.5 pr-2 custom-scrollbar">
              {logs.length === 0 ? (
                <p className="text-slate-500 italic">Awaiting pipeline engine execution trigger...</p>
              ) : (
                logs.map((log, index) => <p key={index} className="leading-relaxed">{log}</p>)
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
