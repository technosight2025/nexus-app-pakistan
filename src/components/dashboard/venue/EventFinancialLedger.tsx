'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useDashboard } from '@/contexts/DashboardContext';
import { Loader2, X, Plus, DollarSign, Clock, FileText } from 'lucide-react';
import type { Database } from '@/types/supabase';

type EventRow = Database['public']['Tables']['events']['Row'];
type PaymentRow = Database['public']['Tables']['payments']['Row'];

interface EventFinancialLedgerProps {
  eventId: string;
  onClose: () => void;
}

export function EventFinancialLedger({ eventId, onClose }: EventFinancialLedgerProps) {
  const { organizationId } = useDashboard();
  const [eventRecord, setEventRecord] = useState<EventRow | null>(null);
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Animation State
  const [isVisible, setIsVisible] = useState(false);

  // Form State
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [referenceNote, setReferenceNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    // Trigger entrance animation shortly after mount
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  useEffect(() => {
    async function fetchLedgerData() {
      if (!organizationId || !eventId) return;
      setIsLoading(true);

      const [eventRes, paymentsRes] = await Promise.all([
        supabase.from('events').select('*').eq('id', eventId).eq('organization_id', organizationId).single(),
        supabase.from('payments').select('*').eq('event_id', eventId).order('created_at', { ascending: false })
      ]);

      if (eventRes.data) setEventRecord(eventRes.data);
      if (paymentsRes.data) setPayments(paymentsRes.data);

      setIsLoading(false);
    }
    fetchLedgerData();
  }, [eventId, organizationId, supabase]);

  const handleCloseAnimation = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Wait for transition duration to complete
  };

  const handleSavePayment = async () => {
    const numAmount = parseFloat(amount);
    if (!organizationId || !eventId || isNaN(numAmount) || numAmount <= 0) return;

    setIsSubmitting(true);

    const newPayment = {
      organization_id: organizationId,
      event_id: eventId,
      amount: numAmount,
      payment_method: paymentMethod,
      reference_note: referenceNote
    };

    const { data, error } = await supabase
      .from('payments')
      .insert(newPayment)
      .select()
      .single();

    if (error) {
      console.error('Failed to save payment:', error);
    } else if (data) {
      // Optimistic update
      setPayments(prev => [data, ...prev]);
      setAmount('');
      setPaymentMethod('Cash');
      setReferenceNote('');
    }

    setIsSubmitting(false);
  };

  const formatCurrency = (val: number) => {
    return 'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1D1C17]/30 transition-opacity duration-300"
        onClick={handleCloseAnimation}
      />
      
      {/* Sliding Panel */}
      <div 
        className={`relative w-[450px] h-full bg-[#FFFFFF] border-l border-[#E6E2DA] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out transform ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {isLoading || !eventRecord ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="animate-spin text-[#0F5B3E] w-8 h-8" />
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="h-16 shrink-0 flex items-center justify-between px-6 border-b border-[#E6E2DA] bg-[#FAF7F2]">
              <div>
                <h2 className="text-sm font-black text-[#1D1C17] uppercase tracking-wider">Financial Ledger</h2>
                <p className="text-[10px] font-bold text-[#5E6460] mt-0.5">{eventRecord.name}</p>
              </div>
              <button onClick={handleCloseAnimation} className="p-2 text-[#5E6460] hover:bg-[#E6E2DA] transition-colors rounded-none">
                <X size={18} />
              </button>
            </div>

            {/* Top Milestone Metrics Panel */}
            <div className="p-6 shrink-0 bg-[#FFFFFF] border-b border-[#E6E2DA]">
              <div className="grid grid-cols-1 gap-4">
                <div className="border border-[#E6E2DA] p-4 flex justify-between items-center bg-[#FAF7F2]">
                  <span className="text-xs font-bold text-[#5E6460] uppercase tracking-wider">Total Contract Value</span>
                  <span className="text-lg font-black text-[#1D1C17]">{formatCurrency(eventRecord.budget || 0)}</span>
                </div>
                
                <div className="border border-[#E6E2DA] p-4 flex justify-between items-center bg-[#FAF7F2]">
                  <span className="text-xs font-bold text-[#5E6460] uppercase tracking-wider">Amount Collected</span>
                  <span className="text-lg font-black text-[#0F5B3E]">
                    {formatCurrency(payments.reduce((sum, p) => sum + p.amount, 0))}
                  </span>
                </div>

                {(() => {
                  const totalContractValue = eventRecord.budget || 0;
                  const amountCollected = payments.reduce((sum, p) => sum + p.amount, 0);
                  const outstandingBalance = totalContractValue - amountCollected;
                  let isUrgentBalance = false;
                  if (outstandingBalance > 0 && eventRecord.start_datetime) {
                    const eventDate = new Date(eventRecord.start_datetime);
                    const diffDays = Math.ceil(Math.abs(eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)); 
                    if (diffDays < 14) isUrgentBalance = true;
                  }

                  return (
                    <div className={`border p-4 flex justify-between items-center ${isUrgentBalance ? 'border-[#D9467A] bg-[#D9467A]/5' : 'border-[#E6E2DA] bg-[#FAF7F2]'}`}>
                      <span className={`text-xs font-bold uppercase tracking-wider ${isUrgentBalance ? 'text-[#D9467A]' : 'text-[#5E6460]'}`}>Outstanding Balance</span>
                      <span className={`text-lg font-black ${isUrgentBalance ? 'text-[#D9467A]' : 'text-[#1D1C17]'}`}>
                        {formatCurrency(outstandingBalance)}
                      </span>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* The Advanced Payment Tracker Form */}
            <div className="p-6 shrink-0 border-b border-[#E6E2DA] bg-[#FAF7F2]">
              <h3 className="text-xs font-bold text-[#1D1C17] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Plus size={14} className="text-[#0F5B3E]" /> Log Installment
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#5E6460] mb-1 uppercase tracking-wider">Amount (PKR)</label>
                    <div className="relative">
                      <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5E6460]" />
                      <input 
                        type="number" 
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        className="w-full text-sm font-bold border border-[#E6E2DA] p-2 pl-8 focus:outline-none focus:border-[#0F5B3E] bg-[#FFFFFF] rounded-none text-[#1D1C17]"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#5E6460] mb-1 uppercase tracking-wider">Method</label>
                    <select 
                      value={paymentMethod}
                      onChange={e => setPaymentMethod(e.target.value)}
                      className="w-full text-sm font-bold border border-[#E6E2DA] p-2 focus:outline-none focus:border-[#0F5B3E] bg-[#FFFFFF] rounded-none text-[#1D1C17]"
                    >
                      <option value="Cash">Cash</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#5E6460] mb-1 uppercase tracking-wider">Reference Note</label>
                  <div className="relative">
                    <FileText size={14} className="absolute left-3 top-3 text-[#5E6460]" />
                    <textarea 
                      value={referenceNote}
                      onChange={e => setReferenceNote(e.target.value)}
                      className="w-full text-sm border border-[#E6E2DA] p-2 pl-8 focus:outline-none focus:border-[#0F5B3E] bg-[#FFFFFF] rounded-none resize-none h-16 text-[#1D1C17]"
                      placeholder="Transaction ID, Cheque #, etc."
                    />
                  </div>
                </div>

                <button 
                  onClick={handleSavePayment}
                  disabled={!amount || isSubmitting}
                  className="w-full bg-[#0F5B3E] text-white text-xs font-bold py-3 rounded-none hover:bg-[#0c4931] disabled:opacity-50 transition-colors uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                  Record Payment
                </button>
              </div>
            </div>

            {/* Transaction History Log */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#FFFFFF]">
              <h3 className="text-xs font-bold text-[#1D1C17] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Clock size={14} className="text-[#5E6460]" /> Transaction History
              </h3>
              
              {payments.length === 0 ? (
                <p className="text-xs font-bold text-[#5E6460] text-center py-8 border border-dashed border-[#E6E2DA] bg-[#FAF7F2]">No payments recorded yet.</p>
              ) : (
                <div className="space-y-3">
                  {payments.map(payment => (
                    <div key={payment.id} className="border border-[#E6E2DA] p-3 hover:border-[#0F5B3E]/30 transition-colors bg-[#FAF7F2]">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#0F5B3E] bg-[#E6F0EC] px-1.5 py-0.5">
                          {payment.payment_method}
                        </span>
                        <span className="text-sm font-black text-[#1D1C17]">{formatCurrency(payment.amount)}</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-bold text-[#5E6460] max-w-[200px] truncate">
                          {payment.reference_note || 'No reference note'}
                        </span>
                        <span className="text-[9px] font-bold text-[#5E6460] uppercase">
                          {new Date(payment.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
