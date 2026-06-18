'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useDashboard } from '@/contexts/DashboardContext';
import { Loader2, TrendingUp, DollarSign, Activity, FileSpreadsheet, Scale } from 'lucide-react';
import type { Database } from '@/types/supabase';

type PaymentReceiptRow = Database['public']['Tables']['payment_receipts']['Row'] & {
  users?: { full_name: string | null } | null;
  invoices?: { invoice_number: string } | null;
};

export function GeneralLedgerAccounting() {
  const { organizationId } = useDashboard();
  const [receipts, setReceipts] = useState<PaymentReceiptRow[]>([]);
  const [metrics, setMetrics] = useState({
    grossBilling: 0,
    cashEnflux: 0,
    outstanding: 0,
    taxLiability: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function fetchLedger() {
      if (!organizationId) return;
      setIsLoading(true);

      const [invoicesRes, receiptsRes] = await Promise.all([
        supabase
          .from('invoices')
          .select('grand_total, tax_amount')
          .eq('organization_id', organizationId),
        
        supabase
          .from('payment_receipts')
          .select(`
            *,
            users (full_name),
            invoices (invoice_number)
          `)
          .eq('organization_id', organizationId)
          .order('created_at', { ascending: false })
      ]);

      let grossBilling = 0;
      let taxLiability = 0;
      let cashEnflux = 0;

      if (!invoicesRes.error && invoicesRes.data) {
        invoicesRes.data.forEach(inv => {
          grossBilling += inv.grand_total || 0;
          taxLiability += inv.tax_amount || 0;
        });
      }

      if (!receiptsRes.error && receiptsRes.data) {
        const data = receiptsRes.data as unknown as PaymentReceiptRow[];
        setReceipts(data);
        data.forEach(rec => {
          cashEnflux += rec.amount_paid || 0;
        });
      }

      setMetrics({
        grossBilling,
        cashEnflux,
        outstanding: grossBilling - cashEnflux,
        taxLiability
      });

      setIsLoading(false);
    }
    fetchLedger();
  }, [organizationId, supabase]);

  const formatCurrency = (amount: number) => {
    return 'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(amount);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center bg-[#FAF7F2]">
        <Loader2 className="animate-spin text-[#0F5B3E] w-8 h-8" />
      </div>
    );
  }

  const isHighOutstanding = metrics.grossBilling > 0 && (metrics.outstanding / metrics.grossBilling) > 0.2;

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#FAF7F2] font-sans">
      
      {/* Header */}
      <div className="bg-[#FFFFFF] border-b border-[#E6E2DA] px-6 py-5 shrink-0 flex items-center gap-3">
        <Scale className="text-[#0F5B3E]" size={24} />
        <div>
          <h1 className="text-xl font-black text-[#1D1C17] uppercase tracking-wider">Accounting & General Ledger</h1>
          <p className="text-[10px] font-bold text-[#5E6460] uppercase tracking-widest mt-0.5">Macro Revenue Flow & Tax Compliance</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        
        {/* Top-Level Fiscal Card Summary Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Gross Billing */}
          <div className="bg-[#FFFFFF] border border-[#E6E2DA] p-5 flex flex-col justify-between h-28">
            <div className="flex items-center gap-2 text-[#5E6460]">
              <FileSpreadsheet size={14} />
              <h2 className="text-[10px] font-black uppercase tracking-widest">Total Gross Billing</h2>
            </div>
            <div className="text-2xl font-black text-[#1D1C17]">{formatCurrency(metrics.grossBilling)}</div>
          </div>

          {/* Cash Enflux */}
          <div className="bg-[#FFFFFF] border border-[#E6E2DA] p-5 flex flex-col justify-between h-28">
            <div className="flex items-center gap-2 text-[#5E6460]">
              <TrendingUp size={14} className="text-[#0F5B3E]" />
              <h2 className="text-[10px] font-black uppercase tracking-widest">Total Cash Enflux</h2>
            </div>
            <div className="text-2xl font-black text-[#0F5B3E]">{formatCurrency(metrics.cashEnflux)}</div>
          </div>

          {/* Outstanding Receivables */}
          <div className={`bg-[#FFFFFF] border p-5 flex flex-col justify-between h-28 ${isHighOutstanding ? 'border-[#D9467A]' : 'border-[#E6E2DA]'}`}>
            <div className={`flex items-center gap-2 ${isHighOutstanding ? 'text-[#D9467A]' : 'text-[#5E6460]'}`}>
              <Activity size={14} />
              <h2 className="text-[10px] font-black uppercase tracking-widest">Outstanding Receivables</h2>
            </div>
            <div className={`text-2xl font-black ${isHighOutstanding ? 'text-[#D9467A]' : 'text-[#1D1C17]'}`}>
              {formatCurrency(metrics.outstanding)}
            </div>
          </div>

          {/* Tax Liability */}
          <div className="bg-[#FFFFFF] border border-[#E6E2DA] p-5 flex flex-col justify-between h-28 bg-[#FAF7F2]">
            <div className="flex items-center gap-2 text-[#5E6460]">
              <DollarSign size={14} />
              <h2 className="text-[10px] font-black uppercase tracking-widest">Tax Liability Account</h2>
            </div>
            <div className="text-2xl font-black text-[#5E6460]">{formatCurrency(metrics.taxLiability)}</div>
          </div>
          
        </div>

        {/* Double-Entry Audit Log Table */}
        <div className="bg-[#FFFFFF] border border-[#E6E2DA]">
          <div className="border-b border-[#E6E2DA] p-4 bg-[#FAF7F2]">
            <h3 className="text-xs font-black text-[#1D1C17] uppercase tracking-widest">Double-Entry Receipt Audit Log</h3>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E6E2DA] bg-[#FFFFFF]">
                <th className="p-4 text-[10px] font-black text-[#5E6460] uppercase tracking-widest">Clear Date</th>
                <th className="p-4 text-[10px] font-black text-[#5E6460] uppercase tracking-widest">Receipt #</th>
                <th className="p-4 text-[10px] font-black text-[#5E6460] uppercase tracking-widest">Invoice ID</th>
                <th className="p-4 text-[10px] font-black text-[#5E6460] uppercase tracking-widest">Payment Mode</th>
                <th className="p-4 text-[10px] font-black text-[#5E6460] uppercase tracking-widest">Collected By</th>
                <th className="p-4 text-[10px] font-black text-[#0F5B3E] uppercase tracking-widest text-right">Amount Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E2DA]">
              {receipts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-xs font-bold text-[#5E6460] uppercase tracking-wider">
                    No receipt entries found in ledger
                  </td>
                </tr>
              ) : (
                receipts.map((rec) => (
                  <tr key={rec.id} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="p-4 text-xs font-bold text-[#5E6460]">{formatDate(rec.created_at)}</td>
                    <td className="p-4 text-sm font-black text-[#1D1C17]">{rec.receipt_number}</td>
                    <td className="p-4 text-sm font-medium text-[#1D1C17]">{rec.invoices?.invoice_number || 'Orphaned'}</td>
                    <td className="p-4">
                      <span className="bg-[#FAF7F2] px-2 py-1 text-[10px] font-black text-[#5E6460] uppercase tracking-wider border border-[#E6E2DA]">
                        {rec.payment_method}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-medium text-[#1D1C17]">{rec.users?.full_name || 'System Auto'}</td>
                    <td className="p-4 text-sm font-black text-[#0F5B3E] text-right">{formatCurrency(rec.amount_paid)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
