'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useDashboard } from '@/contexts/DashboardContext';
import {
  Loader2, Receipt, FileText, CheckCircle, Clock, AlertCircle,
  Plus, Search, TrendingUp, DollarSign, Eye, Send, ChevronRight, Edit, Trash2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Database } from '@/types/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────
type QuotationRow = Database['public']['Tables']['quotations']['Row'] & {
  events?: {
    name: string;
    start_datetime: string | null;
    contact_events?: { contacts?: { name: string } | null }[] | null;
  } | null;
  client_name?: string;
};

type InvoiceRow = Database['public']['Tables']['invoices']['Row'] & {
  events?: { name: string; payments?: { amount: number }[] | null } | null;
  client_name?: string;
};

// ─── Mock data for demo mode ──────────────────────────────────────────────────
const supabase = createClient();

const MOCK_QUOTES = [
  { id: 'q1', quote_number: 'QT-240601', grand_total: 875000,  subtotal: 750000,  tax_amount: 125000, status: 'draft',    estimated_guests: 250, event_id: null, organization_id: '', created_at: '2024-06-01', updated_at: '2024-06-01', menu_tier_details: null, client_name: 'Ahmad Raza', events: null },
  { id: 'q2', quote_number: 'QT-240589', grand_total: 1392000, subtotal: 1200000, tax_amount: 192000, status: 'accepted', estimated_guests: 400, event_id: null, organization_id: '', created_at: '2024-05-28', updated_at: '2024-05-30', menu_tier_details: null, client_name: 'Zara Khan',  events: null },
  { id: 'q3', quote_number: 'QT-240555', grand_total: 580000,  subtotal: 500000,  tax_amount: 80000,  status: 'sent',     estimated_guests: 150, event_id: null, organization_id: '', created_at: '2024-05-20', updated_at: '2024-05-21', menu_tier_details: null, client_name: 'Bilal Anwar', events: null },
  { id: 'q4', quote_number: 'QT-240532', grand_total: 2320000, subtotal: 2000000, tax_amount: 320000, status: 'rejected', estimated_guests: 600, event_id: null, organization_id: '', created_at: '2024-05-10', updated_at: '2024-05-15', menu_tier_details: null, client_name: 'Sara Malik',  events: null },
] as any[] as QuotationRow[];

const MOCK_INVOICES = [
  { id: 'i1', invoice_number: 'INV-QT-240589', grand_total: 1392000, total_amount: 1200000, tax_amount: 192000, status: 'paid',         event_id: null, organization_id: '', created_at: '2024-05-30', updated_at: '2024-06-05', client_name: 'Zara Khan',   events: null },
  { id: 'i2', invoice_number: 'INV-240601',    grand_total: 580000,  total_amount: 500000,  tax_amount: 80000,  status: 'partially_paid', event_id: null, organization_id: '', created_at: '2024-06-02', updated_at: '2024-06-03', client_name: 'Bilal Anwar', events: null },
  { id: 'i3', invoice_number: 'INV-240608',    grand_total: 290000,  total_amount: 250000,  tax_amount: 40000,  status: 'unpaid',         event_id: null, organization_id: '', created_at: '2024-06-08', updated_at: '2024-06-08', client_name: 'Asma Sheikh', events: null },
] as any[] as InvoiceRow[];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmtPKR = (n: number) =>
  'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(n);

const fmtDate = (d: string | null | undefined) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const STATUS_STYLE: Record<string, string> = {
  draft:          'bg-slate-100 text-slate-600 border-slate-200',
  sent:           'bg-blue-50 text-blue-700 border-blue-200',
  accepted:       'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected:       'bg-rose-50 text-rose-600 border-rose-200',
  paid:           'bg-emerald-50 text-emerald-700 border-emerald-200',
  partially_paid: 'bg-amber-50 text-amber-700 border-amber-200',
  unpaid:         'bg-rose-50 text-rose-600 border-rose-200',
};

const STATUS_ICON: Record<string, React.ReactNode> = {
  draft:          <Clock size={10} />,
  sent:           <Send size={10} />,
  accepted:       <CheckCircle size={10} />,
  rejected:       <AlertCircle size={10} />,
  paid:           <CheckCircle size={10} />,
  partially_paid: <Clock size={10} />,
  unpaid:         <AlertCircle size={10} />,
};

function InitialAvatar({ name }: { name: string }) {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const colors = ['bg-emerald-100 text-emerald-700', 'bg-blue-100 text-blue-700', 'bg-violet-100 text-violet-700', 'bg-amber-100 text-amber-700'];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${color}`}>
      {initials || '?'}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function SalesBillingConsole() {
  const { organizationId } = useDashboard();
  const router = useRouter();

  const [activeTab, setActiveTab]     = useState<'quotations' | 'invoices'>('quotations');
  const [quotations, setQuotations]   = useState<QuotationRow[]>([]);
  const [invoices, setInvoices]       = useState<InvoiceRow[]>([]);
  const [isLoading, setIsLoading]     = useState(true);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch]           = useState('');

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      if (!organizationId) {
        setQuotations(MOCK_QUOTES);
        setInvoices(MOCK_INVOICES);
        setIsLoading(false);
        return;
      }

      const [quotesRes, invoicesRes] = await Promise.all([
        supabase.from('quotations').select(`*, events (name, start_datetime, contact_events (contacts (name)))`).eq('organization_id', organizationId).order('created_at', { ascending: false }),
        supabase.from('invoices').select(`*, events (name, payments (amount))`).eq('organization_id', organizationId).order('created_at', { ascending: false }),
      ]);

      if (!quotesRes.error && quotesRes.data && quotesRes.data.length > 0) {
        setQuotations(quotesRes.data as unknown as QuotationRow[]);
      } else {
        setQuotations(MOCK_QUOTES);
      }

      if (!invoicesRes.error && invoicesRes.data && invoicesRes.data.length > 0) {
        setInvoices(invoicesRes.data as unknown as InvoiceRow[]);
      } else {
        setInvoices(MOCK_INVOICES);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [organizationId]);

  const handleConvertToInvoice = async (quote: QuotationRow) => {
    setIsProcessing(quote.id);
    if (organizationId && quote.event_id) {
      const { error } = await supabase.from('invoices').insert({
        organization_id: organizationId,
        event_id: quote.event_id,
        invoice_number: `INV-${quote.quote_number}`,
        grand_total: quote.grand_total,
        total_amount: quote.subtotal || quote.grand_total,
        tax_amount: quote.tax_amount || 0,
        status: 'unpaid',
      });
      if (!error) {
        setQuotations(prev => prev.map(q => q.id === quote.id ? { ...q, status: 'accepted' } : q));
        setActiveTab('invoices');
      }
    } else {
      // Demo mode: optimistic update
      setQuotations(prev => prev.map(q => q.id === quote.id ? { ...q, status: 'accepted' } : q));
      const newInv = {
        id: `i-${Date.now()}`, invoice_number: `INV-${quote.quote_number}`,
        grand_total: quote.grand_total, total_amount: quote.subtotal ?? 0,
        tax_amount: quote.tax_amount ?? 0, status: 'unpaid',
        event_id: null, organization_id: '' as string, created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(), client_name: quote.client_name, events: null,
      } as any as InvoiceRow;
      setInvoices(prev => [newInv, ...prev]);
      setActiveTab('invoices');
    }
    setIsProcessing(null);
  };

  const handleDeleteQuotation = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this quotation?')) return;
    if (organizationId) {
      await supabase.from('quotations').delete().eq('id', id);
    }
    setQuotations(prev => prev.filter(q => q.id !== id));
  };

  // ── Stats ──
  const totalRevenue   = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.grand_total, 0);
  const pendingValue   = quotations.filter(q => q.status === 'draft' || q.status === 'sent').reduce((s, q) => s + q.grand_total, 0);
  const activeQuotes   = quotations.filter(q => q.status !== 'rejected').length;

  // ── Filtered lists ──
  const QUOTE_STATUSES = ['all', 'draft', 'sent', 'accepted', 'rejected'];
  const INV_STATUSES   = ['all', 'unpaid', 'partially_paid', 'paid'];

  const filteredQuotes = quotations.filter(q => {
    const name = q.client_name || q.events?.contact_events?.find(ce => ce.contacts?.name)?.contacts?.name || '';
    if (statusFilter !== 'all' && q.status !== statusFilter) return false;
    return name.toLowerCase().includes(search.toLowerCase()) || (q.quote_number || '').toLowerCase().includes(search.toLowerCase());
  });

  const filteredInvoices = invoices.filter(i => {
    const name = i.client_name || i.events?.name || '';
    if (statusFilter !== 'all' && i.status !== statusFilter) return false;
    return name.toLowerCase().includes(search.toLowerCase()) || (i.invoice_number || '').toLowerCase().includes(search.toLowerCase());
  });

  const currentStatuses = activeTab === 'quotations' ? QUOTE_STATUSES : INV_STATUSES;

  // Reset filter when switching tabs
  const switchTab = (tab: 'quotations' | 'invoices') => {
    setActiveTab(tab);
    setStatusFilter('all');
    setSearch('');
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col gap-4 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-slate-900">Sales & Invoicing</h1>
            <p className="text-xs text-slate-500 mt-0.5">Manage quotations, convert to invoices, track payments</p>
          </div>
          <button
            onClick={() => router.push('/dashboard/sales/builder')}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
          >
            <Plus size={14} /> New Quotation
          </button>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Pipeline Value', value: fmtPKR(pendingValue), icon: <TrendingUp size={14} />, color: 'text-blue-600 bg-blue-50' },
            { label: 'Active Quotes', value: String(activeQuotes), icon: <FileText size={14} />, color: 'text-emerald-700 bg-emerald-50' },
            { label: 'Total Collected', value: fmtPKR(totalRevenue), icon: <DollarSign size={14} />, color: 'text-violet-700 bg-violet-50' },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-xl border border-slate-200 p-3 flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${k.color}`}>{k.icon}</div>
              <div>
                <p className="text-xs text-slate-500">{k.label}</p>
                <p className="text-sm font-bold text-slate-900">{k.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tab bar + Search + Filters ──────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-4 flex-wrap shrink-0">
        {/* Tabs */}
        <div className="flex bg-slate-100 rounded-lg p-1">
          {(['quotations', 'invoices'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => switchTab(tab)}
              className={`px-4 py-1.5 text-xs font-bold rounded-md capitalize transition-all ${
                activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab === 'quotations' ? <><FileText size={12} className="inline mr-1" />Quotations ({quotations.length})</> : <><Receipt size={12} className="inline mr-1" />Invoices ({invoices.length})</>}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or ref…"
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* Status filter pills */}
        <div className="flex gap-1 flex-wrap">
          {currentStatuses.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-full border capitalize transition-all ${
                statusFilter === s
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
              }`}
            >
              {s === 'all' ? 'All' : s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Table Area ──────────────────────────────────────────────── */}
      <div className="flex-1 overflow-auto p-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="animate-spin text-emerald-600 w-6 h-6" />
          </div>
        ) : activeTab === 'quotations' ? (

          /* ── QUOTATIONS TABLE ── */
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    {['Quote #', 'Client', 'Guests', 'Date', 'Value', 'Status', ''].map(h => (
                      <th key={h} className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredQuotes.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-16 text-center">
                        <FileText size={28} className="mx-auto text-slate-300 mb-3" />
                        <p className="text-sm text-slate-400">No quotations found.</p>
                        <button onClick={() => router.push('/dashboard/sales/builder')}
                          className="mt-3 text-xs font-bold text-emerald-600 hover:underline">
                          + Create your first quotation
                        </button>
                      </td>
                    </tr>
                  ) : filteredQuotes.map(quote => {
                    const name = quote.client_name || quote.events?.contact_events?.find(ce => ce.contacts?.name)?.contacts?.name || 'Unknown';
                    return (
                      <tr key={quote.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-4 py-3">
                          <span className="text-xs font-bold text-slate-800 font-mono">{quote.quote_number || '—'}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <InitialAvatar name={name} />
                            <span className="text-sm font-semibold text-slate-800">{name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">{quote.estimated_guests ? `${quote.estimated_guests} pax` : '—'}</td>
                        <td className="px-4 py-3 text-xs text-slate-500">{fmtDate(quote.created_at)}</td>
                        <td className="px-4 py-3">
                          <span className="text-sm font-black text-slate-900">{fmtPKR(quote.grand_total)}</span>
                          {(quote.tax_amount ?? 0) > 0 && <p className="text-[10px] text-slate-400">incl. {fmtPKR(quote.tax_amount ?? 0)} tax</p>}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-full border capitalize ${STATUS_STYLE[quote.status] ?? STATUS_STYLE.draft}`}>
                            {STATUS_ICON[quote.status]} {quote.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors" title="View">
                              <Eye size={14} />
                            </button>
                            <button 
                              onClick={() => router.push(`/dashboard/sales/builder?id=${quote.id}`)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors" 
                              title="Edit"
                            >
                              <Edit size={14} />
                            </button>
                            <button 
                              onClick={() => handleDeleteQuotation(quote.id)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-rose-600 transition-colors" 
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                            {quote.status !== 'accepted' && quote.status !== 'rejected' && (
                              <button
                                onClick={() => handleConvertToInvoice(quote)}
                                disabled={isProcessing === quote.id}
                                className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50"
                              >
                                {isProcessing === quote.id ? <Loader2 size={10} className="animate-spin" /> : <ChevronRight size={10} />}
                                {isProcessing === quote.id ? 'Converting…' : 'To Invoice'}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        ) : (

          /* ── INVOICES TABLE ── */
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    {['Invoice #', 'Client / Event', 'Grand Total', 'Balance Due', 'Date', 'Status'].map(h => (
                      <th key={h} className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-16 text-center">
                        <Receipt size={28} className="mx-auto text-slate-300 mb-3" />
                        <p className="text-sm text-slate-400">No invoices yet.</p>
                        <p className="text-xs text-slate-400 mt-1">Convert an accepted quotation to generate an invoice.</p>
                      </td>
                    </tr>
                  ) : filteredInvoices.map(inv => {
                    const name = inv.client_name || inv.events?.name || '—';
                    const totalPaid = inv.events?.payments?.reduce((s, p) => s + p.amount, 0) ?? 0;
                    const balance   = Math.max(0, inv.grand_total - totalPaid);
                    return (
                      <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <span className="text-xs font-bold font-mono text-slate-800">{inv.invoice_number || '—'}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <InitialAvatar name={name} />
                            <span className="text-sm font-semibold text-slate-800">{name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm font-black text-slate-900">{fmtPKR(inv.grand_total)}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-sm font-bold ${balance > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                            {balance > 0 ? fmtPKR(balance) : '✓ Settled'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500">{fmtDate(inv.created_at)}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-full border capitalize ${STATUS_STYLE[inv.status] ?? STATUS_STYLE.unpaid}`}>
                            {STATUS_ICON[inv.status]} {inv.status?.replace('_', ' ')}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
