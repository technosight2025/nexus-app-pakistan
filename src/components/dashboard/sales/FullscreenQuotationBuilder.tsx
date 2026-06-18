'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import {
  Printer, Download, MessageCircle, Save, ArrowLeft,
  Plus, Trash2, Link as LinkIcon, Eye, Settings2,
  ChevronDown, Package, User
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

// ─── Supabase singleton ───────────────────────────────────────────────────────
const supabase = createClient();

// ─── Types ────────────────────────────────────────────────────────────────────
interface LineItem {
  id: string;
  description: string;
  qty: number;
  unit: string;
  unit_price: number;
  discount_pct: number;
  is_addon: boolean;
}

interface QuotationForm {
  doc_type:        'QUOTATION' | 'INVOICE';
  quote_number:    string;
  customer_name:   string;
  contact_id:      string;
  event_id:        string;
  event_date:      string;
  valid_until:     string;
  venue:           string;
  tax_pct:         number;
  overall_discount:number;
  payment_terms:   string;
  notes:           string;
  terms:           string;
  lines:           LineItem[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(n);

function newLine(desc = '', price = 0, qty = 1, isAddon = false): LineItem {
  return {
    id: `line-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    description: desc, qty, unit: 'pax', unit_price: price,
    discount_pct: 0, is_addon: isAddon,
  };
}

function genDocNumber(type: 'QUOTATION' | 'INVOICE') {
  const prefix = type === 'QUOTATION' ? 'QT' : 'INV';
  const d = new Date();
  return `${prefix}-${d.getFullYear().toString().slice(2)}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}-${Math.floor(Math.random()*900+100)}`;
}

// ─── Mock catalog for Add-ons ─────────────────────────────────────────────────
const CATALOG_ADDONS = [
  { id: 'a1', name: 'Live DJ & Sound System',   unit_price: 35000 },
  { id: 'a2', name: 'Photography Package',       unit_price: 45000 },
  { id: 'a3', name: 'Premium Stage Decor',       unit_price: 150000 },
  { id: 'a4', name: 'Floral Centerpieces',       unit_price: 12000 },
  { id: 'a5', name: 'Valet Parking (per car)',   unit_price: 500 },
  { id: 'a6', name: 'Generator Backup',          unit_price: 20000 },
  { id: 'a7', name: 'Video Highlights Package',  unit_price: 55000 },
  { id: 'a8', name: 'Makeup & Hair Artist',      unit_price: 25000 },
];

const MOCK_EVENTS = [
  { id: 'ev1', name: 'Ahmad Raza Wedding',   date: '2024-07-15', guest_count: 400 },
  { id: 'ev2', name: 'Zara Khan Nikkah',     date: '2024-08-02', guest_count: 200 },
  { id: 'ev3', name: 'Corporate Dinner',     date: '2024-07-28', guest_count: 150 },
];

const MOCK_CONTACTS = [
  { id: 'c1', name: 'Ahmad Raza' },
  { id: 'c2', name: 'Zara Khan' },
  { id: 'c3', name: 'Bilal Anwar' },
  { id: 'c4', name: 'Sara Malik' },
];

const PAYMENT_TERMS = [
  '30% advance, balance on event day',
  '50% advance, 50% before event',
  '100% advance payment',
  'Net 15 days',
  'Net 30 days',
  'On delivery',
];

const DEFAULT_TERMS = `1. This quotation is valid until the specified validity date.
2. A 30% advance payment is required to confirm the booking.
3. Prices are subject to 16% GST as per applicable tax laws.
4. Cancellation within 14 days of event: 50% of total is non-refundable.
5. NEXUS OS reserves the right to adjust pricing based on guest count changes.`;

// ─── Shared style tokens ──────────────────────────────────────────────────────
const inp  = 'w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition';
const lbl  = 'block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1';
const sect = 'space-y-3';

// ─── Component ────────────────────────────────────────────────────────────────
export function FullscreenQuotationBuilder() {
  const { organizationId } = useDashboard();
  const router = useRouter();

  const docNumber = useRef(genDocNumber('QUOTATION'));
  const printRef  = useRef<HTMLDivElement>(null);

  const [panel, setPanel] = useState<'form' | 'preview'>('form');
  const [isSaving, setIsSaving] = useState(false);
  const [events,   setEvents]   = useState(MOCK_EVENTS);
  const [contacts, setContacts] = useState(MOCK_CONTACTS);
  const [addonPickerOpen, setAddonPickerOpen] = useState(false);

  const [form, setForm] = useState<QuotationForm>({
    doc_type:         'QUOTATION',
    quote_number:     docNumber.current,
    customer_name:    '',
    contact_id:       '',
    event_id:         '',
    event_date:       '',
    valid_until:      new Date(Date.now() + 30 * 86400_000).toISOString().split('T')[0],
    venue:            '',
    tax_pct:          16,
    overall_discount: 0,
    payment_terms:    PAYMENT_TERMS[0],
    notes:            '',
    terms:            DEFAULT_TERMS,
    lines: [
      newLine('Event Catering Services', 5000, 200),
    ],
  });

  // Fetch real events/contacts if org connected
  useEffect(() => {
    if (!organizationId) return;
    supabase.from('events').select('id, name, start_datetime, guest_count').eq('organization_id', organizationId).order('start_datetime', { ascending: false })
      .then(({ data }) => { if (data && data.length > 0) setEvents(data.map(e => ({ id: e.id, name: e.name, date: e.start_datetime?.split('T')[0] ?? '', guest_count: e.guest_count ?? 0 }))); });
    supabase.from('contacts').select('id, name').eq('organization_id', organizationId).order('name')
      .then(({ data }) => { if (data && data.length > 0) setContacts(data); });
  }, [organizationId]);

  // ── Field setters ──
  const setField = useCallback(<K extends keyof QuotationForm>(k: K, v: QuotationForm[K]) => {
    setForm(p => ({ ...p, [k]: v }));
  }, []);

  const handleEventSelect = useCallback((evId: string) => {
    setField('event_id', evId);
    const ev = events.find(e => e.id === evId);
    if (ev) {
      setField('event_date', ev.date);
      setField('venue', ev.name);
      // Update first line qty to guest count
      if (ev.guest_count) setForm(p => ({
        ...p, event_id: evId, event_date: ev.date, venue: ev.name,
        lines: p.lines.map((l, i) => i === 0 ? { ...l, qty: ev.guest_count } : l),
      }));
    }
  }, [events, setField]);

  const handleDocTypeChange = useCallback((t: 'QUOTATION' | 'INVOICE') => {
    docNumber.current = genDocNumber(t);
    setForm(p => ({ ...p, doc_type: t, quote_number: docNumber.current }));
  }, []);

  // ── Line items ──
  const addLine  = useCallback(() => setForm(p => ({ ...p, lines: [...p.lines, newLine()] })), []);
  const removeLine = useCallback((id: string) => setForm(p => ({ ...p, lines: p.lines.filter(l => l.id !== id) })), []);
  const updateLine = useCallback(<K extends keyof LineItem>(id: string, key: K, val: LineItem[K]) =>
    setForm(p => ({ ...p, lines: p.lines.map(l => l.id === id ? { ...l, [key]: val } : l) })), []);

  const addAddon = useCallback((addon: typeof CATALOG_ADDONS[0]) => {
    setForm(p => ({
      ...p, lines: [...p.lines, newLine(addon.name, addon.unit_price, 1, true)],
    }));
    setAddonPickerOpen(false);
  }, []);

  // ── Math ──
  const totals = useMemo(() => {
    const lineSubtotals = form.lines.map(l => {
      const base = l.qty * l.unit_price;
      return base - base * (l.discount_pct / 100);
    });
    const subtotal  = lineSubtotals.reduce((s, v) => s + v, 0);
    const afterDisc = subtotal - subtotal * (form.overall_discount / 100);
    const tax       = afterDisc * (form.tax_pct / 100);
    return { subtotal, afterDisc, tax, grand: afterDisc + tax };
  }, [form.lines, form.overall_discount, form.tax_pct]);

  // ── Save ──
  const handleSave = async () => {
    setIsSaving(true);
    const table = form.doc_type === 'QUOTATION' ? 'quotations' : 'invoices';
    const payload: any = {
      organization_id: organizationId,
      grand_total: totals.grand,
      tax_amount:  totals.tax,
      total_amount: totals.subtotal,
      status: form.doc_type === 'QUOTATION' ? 'draft' : 'unpaid',
      event_id: form.event_id || null,
      menu_tier_details: {
        customer_name:  form.customer_name,
        venue:          form.venue,
        event_date:     form.event_date,
        payment_terms:  form.payment_terms,
        notes:          form.notes,
        lines:          form.lines,
      },
    };
    if (form.doc_type === 'QUOTATION') {
      payload.quote_number     = form.quote_number;
      payload.subtotal         = totals.subtotal;
      payload.estimated_guests = form.lines[0]?.qty || 0;
    } else {
      payload.invoice_number = form.quote_number;
    }

    if (organizationId) {
      const { error } = await supabase.from(table as any).insert(payload);
      if (error) { alert('Save failed: ' + error.message); setIsSaving(false); return; }
    }
    setIsSaving(false);
    router.push('/dashboard/sales');
  };

  const handleWhatsApp = () => {
    const text = `*${form.doc_type} — ${form.quote_number}*\n\n`
      + `Customer: ${form.customer_name || '—'}\nVenue: ${form.venue || '—'}\nDate: ${form.event_date || '—'}\n\n`
      + form.lines.map(l => `• ${l.description}: ${fmt(l.qty * l.unit_price)}`).join('\n')
      + `\n\n*Subtotal:* ${fmt(totals.subtotal)}\n*Tax (${form.tax_pct}%):* ${fmt(totals.tax)}\n*GRAND TOTAL:* ${fmt(totals.grand)}\n\nPayment Terms: ${form.payment_terms}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="h-screen flex flex-col bg-slate-100 font-sans overflow-hidden">

      {/* ── Sticky Toolbar ───────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between gap-4 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-base font-black text-slate-900">Document Builder</h1>
            <p className="text-[11px] text-slate-400">{form.quote_number}</p>
          </div>
        </div>

        {/* Doc type toggle */}
        <div className="flex bg-slate-100 p-1 rounded-lg">
          {(['QUOTATION', 'INVOICE'] as const).map(t => (
            <button key={t} onClick={() => handleDocTypeChange(t)}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${form.doc_type === t ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Link event */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-60">
          <LinkIcon size={12} className="text-emerald-600 flex-shrink-0" />
          <select value={form.event_id} onChange={e => handleEventSelect(e.target.value)}
            className="flex-1 bg-transparent text-xs font-semibold text-slate-700 focus:outline-none">
            <option value="">Link Event / Project</option>
            {events.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
        </div>

        {/* Panel toggle */}
        <div className="flex bg-slate-100 p-1 rounded-lg">
          {([['form', <Settings2 size={14} />, 'Configure'], ['preview', <Eye size={14} />, 'Preview']] as const).map(([p, icon, label]) => (
            <button key={p} onClick={() => setPanel(p as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${panel === p ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              {icon}{label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Printer size={13} /> Print
          </button>
          <button onClick={handleWhatsApp} className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors">
            <MessageCircle size={13} /> WhatsApp
          </button>
          <button onClick={handleSave} disabled={isSaving}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-sm">
            <Save size={13} /> {isSaving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      {/* ── Body: Split Form + Preview ───────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">

        {/* LEFT: Form */}
        <div className={`overflow-y-auto bg-slate-100 ${panel === 'preview' ? 'hidden lg:block lg:w-2/5' : 'w-full lg:w-2/5'} lg:block`}>
          <div className="p-6 space-y-5 max-w-xl">

            {/* Client & Event */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <h2 className="text-xs font-black text-slate-700 uppercase tracking-wider">Client & Event Details</h2>

              <div className={sect}>
                <div>
                  <label className={lbl}>Customer Name *</label>
                  <div className="relative">
                    <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input type="text" value={form.customer_name} onChange={e => setField('customer_name', e.target.value)}
                      list="contacts-dl" placeholder="Select or type name…"
                      className={`${inp} pl-8`} />
                  </div>
                  <datalist id="contacts-dl">
                    {contacts.map(c => <option key={c.id} value={c.name} />)}
                  </datalist>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl}>Event Date</label>
                    <input type="date" value={form.event_date} onChange={e => setField('event_date', e.target.value)} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Valid Until</label>
                    <input type="date" value={form.valid_until} onChange={e => setField('valid_until', e.target.value)} className={inp} />
                  </div>
                </div>

                <div>
                  <label className={lbl}>Venue / Hall</label>
                  <input type="text" value={form.venue} onChange={e => setField('venue', e.target.value)} placeholder="e.g. Grand Emerald Hall" className={inp} />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-xs font-black text-slate-700 uppercase tracking-wider">Line Items</h2>
                <button onClick={addLine} type="button"
                  className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors">
                  <Plus size={13} /> Add Row
                </button>
              </div>

              {/* Column headers */}
              <div className="grid grid-cols-12 gap-1 bg-slate-50 border-b border-slate-100 px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                <span className="col-span-4">Description</span>
                <span className="col-span-2 text-center">Qty / Unit</span>
                <span className="col-span-2 text-right">Unit Price</span>
                <span className="col-span-2 text-right">Disc %</span>
                <span className="col-span-1 text-right">Total</span>
                <span className="col-span-1" />
              </div>

              <div className="divide-y divide-slate-100">
                {form.lines.map((line) => {
                  const lineTotal = line.qty * line.unit_price * (1 - line.discount_pct / 100);
                  return (
                    <div key={line.id} className={`grid grid-cols-12 gap-1 items-center px-4 py-2.5 text-xs ${line.is_addon ? 'bg-amber-50/30' : ''}`}>
                      <div className="col-span-4">
                        <input type="text" value={line.description}
                          onChange={e => updateLine(line.id, 'description', e.target.value)}
                          placeholder="Item description…"
                          className="w-full border-0 bg-transparent text-sm font-medium text-slate-800 focus:outline-none focus:ring-0 placeholder:text-slate-300 p-0" />
                        {line.is_addon && <span className="text-[9px] font-bold text-amber-600 bg-amber-100 px-1 rounded">add-on</span>}
                      </div>
                      <div className="col-span-2 flex items-center gap-1">
                        <input type="number" value={line.qty} min={1}
                          onChange={e => updateLine(line.id, 'qty', Number(e.target.value))}
                          className="w-12 text-center border border-slate-200 rounded text-xs px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                        <select value={line.unit} onChange={e => updateLine(line.id, 'unit', e.target.value)}
                          className="flex-1 text-[10px] border border-slate-200 rounded px-1 py-0.5 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-600">
                          {['pax', 'hr', 'day', 'unit', 'lot'].map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <input type="number" value={line.unit_price} min={0}
                          onChange={e => updateLine(line.id, 'unit_price', Number(e.target.value))}
                          className="w-full text-right border border-slate-200 rounded text-xs px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center">
                          <input type="number" value={line.discount_pct} min={0} max={100}
                            onChange={e => updateLine(line.id, 'discount_pct', Number(e.target.value))}
                            className="w-full text-right border border-slate-200 rounded text-xs px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                          <span className="text-slate-400 ml-1">%</span>
                        </div>
                      </div>
                      <div className="col-span-1 text-right font-bold text-slate-800 text-xs">{fmt(lineTotal)}</div>
                      <div className="col-span-1 flex justify-end">
                        <button onClick={() => removeLine(line.id)} className="p-1 text-slate-300 hover:text-rose-500 transition-colors rounded">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add-ons picker */}
              <div className="border-t border-slate-100">
                <button onClick={() => setAddonPickerOpen(p => !p)} type="button"
                  className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-amber-700 hover:bg-amber-50/40 transition-colors">
                  <span className="flex items-center gap-1.5"><Package size={12} /> Add Cross-Sell / Add-on</span>
                  <ChevronDown size={12} className={`transition-transform ${addonPickerOpen ? 'rotate-180' : ''}`} />
                </button>
                {addonPickerOpen && (
                  <div className="border-t border-amber-100 bg-amber-50/20 px-4 py-3 grid grid-cols-2 gap-1.5">
                    {CATALOG_ADDONS.map(a => (
                      <button key={a.id} onClick={() => addAddon(a)} type="button"
                        className="flex items-center justify-between text-left px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg hover:border-amber-400 hover:bg-amber-50 transition-all group">
                        <span className="font-medium text-slate-700 truncate">{a.name}</span>
                        <span className="text-slate-400 font-semibold flex-shrink-0 ml-1 text-[10px]">+{fmt(a.unit_price)}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pricing summary */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <h2 className="text-xs font-black text-slate-700 uppercase tracking-wider">Pricing</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={lbl}>Overall Discount (%)</label>
                  <input type="number" min={0} max={100} value={form.overall_discount}
                    onChange={e => setField('overall_discount', Number(e.target.value))} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Tax Rate (%)</label>
                  <input type="number" min={0} max={100} value={form.tax_pct}
                    onChange={e => setField('tax_pct', Number(e.target.value))} className={inp} />
                </div>
              </div>
              {/* Live totals */}
              <div className="bg-slate-50 rounded-lg p-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500"><span>Subtotal</span><span className="font-semibold">{fmt(totals.subtotal)}</span></div>
                {form.overall_discount > 0 && <div className="flex justify-between text-slate-500"><span>Discount ({form.overall_discount}%)</span><span className="font-semibold text-rose-600">−{fmt(totals.subtotal - totals.afterDisc)}</span></div>}
                <div className="flex justify-between text-slate-500"><span>Tax ({form.tax_pct}%)</span><span className="font-semibold">{fmt(totals.tax)}</span></div>
                <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-200 pt-2 mt-1"><span>Grand Total</span><span className="text-emerald-700">{fmt(totals.grand)}</span></div>
              </div>
            </div>

            {/* Terms & notes */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <h2 className="text-xs font-black text-slate-700 uppercase tracking-wider">Terms & Notes</h2>
              <div>
                <label className={lbl}>Payment Terms</label>
                <select value={form.payment_terms} onChange={e => setField('payment_terms', e.target.value)} className={inp}>
                  {PAYMENT_TERMS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Notes to Client (optional)</label>
                <textarea rows={2} value={form.notes} onChange={e => setField('notes', e.target.value)}
                  placeholder="Additional information for the client…"
                  className={`${inp} resize-y`} />
              </div>
              <div>
                <label className={lbl}>Terms & Conditions</label>
                <textarea rows={5} value={form.terms} onChange={e => setField('terms', e.target.value)}
                  className={`${inp} resize-y text-xs font-mono`} />
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT: Live Preview */}
        <div className={`flex-1 bg-slate-200 overflow-y-auto flex flex-col items-center py-8 px-4 print:bg-white print:p-0 ${panel === 'form' ? 'hidden lg:flex' : 'flex'}`}>

          {/* Mobile back button */}
          <div className="w-full max-w-[780px] mb-4 lg:hidden">
            <button onClick={() => setPanel('form')} className="text-xs font-bold text-slate-600 hover:text-slate-900">
              ← Back to form
            </button>
          </div>

          {/* A4 Document */}
          <div ref={printRef} className="w-full max-w-[780px] bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none print:rounded-none print:max-w-full">

            {/* Header band */}
            <div className="bg-[#0F5B3E] px-10 py-8 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-black tracking-tight">NEXUS OPERATING SYSTEM</h1>
                  <p className="text-emerald-200 text-xs font-medium mt-1">Enterprise Event Management Platform</p>
                  <p className="text-emerald-300 text-xs mt-1">Lahore, Pakistan · nexus.pk</p>
                </div>
                <div className="text-right">
                  <h2 className="text-3xl font-black text-emerald-200 uppercase tracking-tight">{form.doc_type}</h2>
                  <p className="text-emerald-300 text-xs mt-1 font-mono">{form.quote_number}</p>
                  <p className="text-emerald-300 text-xs">Issued: {new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</p>
                </div>
              </div>
            </div>

            <div className="px-10 py-8 space-y-7">

              {/* Billed to + details row */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Billed To</p>
                  <p className="text-lg font-black text-slate-900">{form.customer_name || 'Client Name'}</p>
                  {form.venue && <p className="text-sm text-slate-500 mt-0.5">Venue: {form.venue}</p>}
                </div>
                <div className="space-y-1.5">
                  {[
                    ['Document', form.quote_number],
                    ['Event Date', form.event_date || '—'],
                    ['Valid Until', form.valid_until || '—'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs">
                      <span className="text-slate-400 font-semibold uppercase tracking-wide">{k}</span>
                      <span className="font-bold text-slate-800">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Line items table */}
              <div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-y border-slate-200">
                      <th className="py-2.5 px-3 text-[10px] font-black text-slate-500 uppercase tracking-wider w-1/2">Description</th>
                      <th className="py-2.5 px-3 text-[10px] font-black text-slate-500 uppercase tracking-wider text-center">Qty</th>
                      <th className="py-2.5 px-3 text-[10px] font-black text-slate-500 uppercase tracking-wider text-right">Unit Price</th>
                      <th className="py-2.5 px-3 text-[10px] font-black text-slate-500 uppercase tracking-wider text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {form.lines.map(l => (
                      <tr key={l.id}>
                        <td className="py-3 px-3">
                          <p className="text-sm font-semibold text-slate-800">{l.description || '—'}</p>
                          {l.is_addon && <span className="text-[9px] text-amber-600 font-bold">add-on</span>}
                          {l.discount_pct > 0 && <span className="text-[9px] text-emerald-600 font-bold ml-2">{l.discount_pct}% disc.</span>}
                        </td>
                        <td className="py-3 px-3 text-sm text-center text-slate-600">{l.qty} {l.unit}</td>
                        <td className="py-3 px-3 text-sm text-right text-slate-600">{fmt(l.unit_price)}</td>
                        <td className="py-3 px-3 text-sm text-right font-bold text-slate-900">{fmt(l.qty * l.unit_price * (1 - l.discount_pct / 100))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals block */}
              <div className="flex justify-end">
                <div className="w-72 space-y-2">
                  {[
                    ['Subtotal', fmt(totals.subtotal), false],
                    ...(form.overall_discount > 0 ? [[`Discount (${form.overall_discount}%)`, `−${fmt(totals.subtotal - totals.afterDisc)}`, false]] : []),
                    [`Tax (${form.tax_pct}%)`, fmt(totals.tax), false],
                  ].map(([k, v, bold]) => (
                    <div key={k as string} className="flex justify-between text-xs text-slate-500">
                      <span>{k}</span><span className="font-semibold">{v}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center border-t-2 border-slate-900 pt-2 mt-1">
                    <span className="text-sm font-black text-slate-900">GRAND TOTAL</span>
                    <span className="text-xl font-black text-emerald-700">{fmt(totals.grand)}</span>
                  </div>
                </div>
              </div>

              {/* Payment terms */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-wide mb-1">Payment Terms</p>
                <p className="text-sm font-semibold text-slate-800">{form.payment_terms}</p>
                {form.notes && <p className="text-xs text-slate-500 mt-2">{form.notes}</p>}
              </div>

              {/* T&C */}
              {form.terms && (
                <div className="border-t border-slate-200 pt-5">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Terms & Conditions</p>
                  <div className="text-[11px] text-slate-500 leading-relaxed whitespace-pre-line">{form.terms}</div>
                </div>
              )}

              {/* Footer */}
              <div className="border-t border-slate-200 pt-4 text-center">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  This document is generated by NEXUS OS · nexus.pk · Electronically validated — no physical signature required.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
