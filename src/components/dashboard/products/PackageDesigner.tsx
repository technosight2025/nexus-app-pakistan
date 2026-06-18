'use client';

import React, { useState, useMemo, useCallback, useId } from 'react';
import {
  Plus, Trash2, Search, Package, GripVertical,
  ChevronDown, ChevronUp, Info, PenLine, X, Check
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface CatalogItem {
  id: string;
  name: string;
  type: string;
  unit_price: number;
}

export interface PackageLine {
  catalog_item_id: string;   // prefixed with "custom-" for ad-hoc items
  name: string;
  type: string;
  unit_price: number;
  qty: number;
  note: string;
  is_optional: boolean;
  is_custom: boolean;        // true = not saved to products table
}

export interface PackageConfig {
  min_guests: string;
  max_guests: string;
  includes_setup: boolean;
  validity_days: string;
  lines: PackageLine[];
}

interface PackageDesignerProps {
  catalog: CatalogItem[];
  value: PackageConfig;
  onChange: (cfg: PackageConfig) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const TYPE_PILL: Record<string, string> = {
  product:  'bg-blue-50   text-blue-700',
  service:  'bg-violet-50 text-violet-700',
  rental:   'bg-amber-50  text-amber-700',
  package:  'bg-emerald-50 text-emerald-700',
  custom:   'bg-rose-50   text-rose-700',
};

const fmt = (n: number) =>
  'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(n);

const EMPTY_CUSTOM = { name: '', type: 'service', unit_price: '', qty: '1', note: '' };

// ─── Component ────────────────────────────────────────────────────────────────
export function PackageDesigner({ catalog, value, onChange }: PackageDesignerProps) {
  const uid = useId();
  const [search, setSearch]           = useState('');
  const [typeFilter, setTypeFilter]   = useState('all');
  const [pickerOpen, setPickerOpen]   = useState(false);
  const [customOpen, setCustomOpen]   = useState(false);
  const [custom, setCustom]           = useState({ ...EMPTY_CUSTOM });

  const inp = 'w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition';
  const lbl = 'block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide';

  const filtered = useMemo(() =>
    catalog.filter(c => {
      if (typeFilter !== 'all' && c.type !== typeFilter) return false;
      return c.name.toLowerCase().includes(search.toLowerCase());
    }),
  [catalog, search, typeFilter]);

  // ── Add catalog line ────────────────────────────────────────────────────────
  const addCatalogLine = useCallback((item: CatalogItem) => {
    const line: PackageLine = {
      catalog_item_id: item.id,
      name: item.name,
      type: item.type,
      unit_price: item.unit_price,
      qty: 1, note: '', is_optional: false, is_custom: false,
    };
    onChange({ ...value, lines: [...value.lines, line] });
    setSearch('');
  }, [value, onChange]);

  // ── Add custom line ──────────────────────────────────────────────────────────
  const addCustomLine = useCallback(() => {
    if (!custom.name.trim()) return;
    const price = Number(custom.unit_price.toString().replace(/,/g, '')) || 0;
    const line: PackageLine = {
      catalog_item_id: `custom-${uid}-${Date.now()}`,
      name: custom.name.trim(),
      type: custom.type,
      unit_price: price,
      qty: Number(custom.qty) || 1,
      note: custom.note,
      is_optional: false,
      is_custom: true,
    };
    onChange({ ...value, lines: [...value.lines, line] });
    setCustom({ ...EMPTY_CUSTOM });
    setCustomOpen(false);
  }, [custom, value, onChange, uid]);

  // ── Mutate a line ───────────────────────────────────────────────────────────
  const removeLine = useCallback((idx: number) =>
    onChange({ ...value, lines: value.lines.filter((_, i) => i !== idx) }),
  [value, onChange]);

  const updateLine = useCallback(<K extends keyof PackageLine>(idx: number, key: K, val: PackageLine[K]) => {
    onChange({ ...value, lines: value.lines.map((l, i) => i === idx ? { ...l, [key]: val } : l) });
  }, [value, onChange]);

  const setField = useCallback(<K extends keyof PackageConfig>(key: K, val: PackageConfig[K]) =>
    onChange({ ...value, [key]: val }),
  [value, onChange]);

  // ── Totals ──────────────────────────────────────────────────────────────────
  const { includedTotal, optionalTotal, alreadyCatalogIds } = useMemo(() => {
    return {
      includedTotal: value.lines.filter(l => !l.is_optional).reduce((s, l) => s + l.unit_price * l.qty, 0),
      optionalTotal: value.lines.filter(l =>  l.is_optional).reduce((s, l) => s + l.unit_price * l.qty, 0),
      alreadyCatalogIds: new Set(value.lines.map(l => l.catalog_item_id).filter(Boolean)),
    };
  }, [value.lines]);

  return (
    <div className="space-y-5">

      {/* ── Config Row ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div>
          <label className={lbl}>Min Guests</label>
          <input type="number" value={value.min_guests} onChange={e => setField('min_guests', e.target.value)} placeholder="100" className={inp} />
        </div>
        <div>
          <label className={lbl}>Max Guests</label>
          <input type="number" value={value.max_guests} onChange={e => setField('max_guests', e.target.value)} placeholder="500" className={inp} />
        </div>
        <div>
          <label className={lbl}>Validity (Days)</label>
          <input type="number" value={value.validity_days} onChange={e => setField('validity_days', e.target.value)} placeholder="30" className={inp} />
        </div>
        <div className="flex items-end pb-1">
          <label className="inline-flex items-center gap-2 cursor-pointer select-none">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={value.includes_setup}
                onChange={e => setField('includes_setup', e.target.checked)} />
              <div className={`w-10 h-5 rounded-full transition-colors ${value.includes_setup ? 'bg-emerald-600' : 'bg-slate-300'}`} />
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${value.includes_setup ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
            <span className={lbl} style={{ marginBottom: 0 }}>Setup Incl.</span>
          </label>
        </div>
      </div>

      {/* ── Lines Table ────────────────────────────────────────────── */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-1 bg-slate-50 border-b border-slate-200 px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
          <span className="col-span-1" />
          <span className="col-span-4">Item</span>
          <span className="col-span-2 text-right">Unit Price</span>
          <span className="col-span-1 text-center">Qty</span>
          <span className="col-span-2 text-right">Subtotal</span>
          <span className="col-span-1 text-center" title="Required / Optional">Req?</span>
          <span className="col-span-1 text-right">Del</span>
        </div>

        {/* Empty state */}
        {value.lines.length === 0 && (
          <div className="py-12 text-center space-y-2">
            <Package size={28} className="mx-auto text-slate-300" />
            <p className="text-sm text-slate-400">No items yet — add from catalog or create a custom item below.</p>
          </div>
        )}

        {/* Lines */}
        {value.lines.length > 0 && (
          <div className="divide-y divide-slate-100">
            {value.lines.map((line, idx) => (
              <div
                key={line.catalog_item_id + idx}
                className={`grid grid-cols-12 gap-1 items-center px-4 py-3 text-sm transition-colors ${line.is_optional ? 'bg-amber-50/40' : 'bg-white'}`}
              >
                <span className="col-span-1 text-slate-200 flex justify-center"><GripVertical size={13} /></span>

                <div className="col-span-4 min-w-0">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded capitalize leading-none ${TYPE_PILL[line.is_custom ? 'custom' : line.type] ?? 'bg-slate-100 text-slate-500'}`}>
                      {line.is_custom ? 'custom' : line.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 truncate">{line.name}</span>
                  </div>
                  <input
                    type="text" value={line.note}
                    onChange={e => updateLine(idx, 'note', e.target.value)}
                    placeholder="Add note…"
                    className="mt-1 w-full text-[11px] text-slate-400 bg-transparent border-0 focus:outline-none placeholder:text-slate-300 p-0"
                  />
                </div>

                <div className="col-span-2 text-right text-xs text-slate-500 font-medium">{fmt(line.unit_price)}</div>

                <div className="col-span-1 flex items-center justify-center">
                  <div className="inline-flex items-center border border-slate-200 rounded-lg overflow-hidden text-xs">
                    <button type="button" onClick={() => updateLine(idx, 'qty', Math.max(1, line.qty - 1))}
                      className="px-1.5 py-0.5 text-slate-500 hover:bg-slate-100 font-bold">−</button>
                    <span className="px-1.5 font-bold text-slate-700 min-w-[20px] text-center">{line.qty}</span>
                    <button type="button" onClick={() => updateLine(idx, 'qty', line.qty + 1)}
                      className="px-1.5 py-0.5 text-slate-500 hover:bg-slate-100 font-bold">+</button>
                  </div>
                </div>

                <div className="col-span-2 text-right text-xs font-bold text-slate-800">{fmt(line.unit_price * line.qty)}</div>

                <div className="col-span-1 flex justify-center">
                  <button type="button" onClick={() => updateLine(idx, 'is_optional', !line.is_optional)}
                    title={line.is_optional ? 'Optional → click to require' : 'Required → click to make optional'}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${line.is_optional ? 'border-amber-400 bg-amber-100' : 'border-emerald-500 bg-emerald-50'}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${line.is_optional ? 'bg-amber-400' : 'bg-emerald-500'}`} />
                  </button>
                </div>

                <div className="col-span-1 flex justify-end">
                  <button type="button" onClick={() => removeLine(idx)}
                    className="p-1 text-slate-300 hover:text-rose-500 rounded transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Totals */}
        {value.lines.length > 0 && (
          <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 space-y-1.5">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Included subtotal</span>
              <span className="font-semibold">{fmt(includedTotal)}</span>
            </div>
            {optionalTotal > 0 && (
              <div className="flex justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" />Optional items (not counted)</span>
                <span>{fmt(optionalTotal)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-slate-800 border-t border-slate-200 pt-2">
              <span>Package Base Price</span>
              <span className="text-emerald-700">{fmt(includedTotal)}</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Legend ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-5 text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full border-2 border-emerald-500 bg-emerald-50" /> Required</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full border-2 border-amber-400 bg-amber-100" /> Optional add-on</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-rose-100 border border-rose-300" /> Custom item</span>
      </div>

      {/* ── Two action buttons ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

        {/* Catalog Picker */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <button type="button" onClick={() => { setPickerOpen(p => !p); setCustomOpen(false); }}
            className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-emerald-50/50 transition-colors text-sm font-semibold text-slate-700"
          >
            <span className="flex items-center gap-2 text-emerald-700">
              <Plus size={15} className="text-emerald-600" /> From Catalog
              {catalog.length > 0 && <span className="text-xs font-normal text-slate-400">({catalog.length - alreadyCatalogIds.size} available)</span>}
            </span>
            {pickerOpen ? <ChevronUp size={15} className="text-slate-400" /> : <ChevronDown size={15} className="text-slate-400" />}
          </button>

          {pickerOpen && (
            <div className="border-t border-slate-200 bg-slate-50 p-3 space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input type="text" placeholder="Search catalog…" value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                  className="text-xs border border-slate-300 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-700">
                  <option value="all">All</option>
                  <option value="product">Products</option>
                  <option value="service">Services</option>
                  <option value="rental">Rentals</option>
                </select>
              </div>

              <div className="space-y-1 max-h-44 overflow-y-auto pr-0.5">
                {filtered.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">
                    {catalog.length === 0 ? 'No active items in your catalog.' : 'No matching items.'}
                  </p>
                ) : filtered.map(item => (
                  <button key={item.id} type="button" onClick={() => { addCatalogLine(item); setPickerOpen(false); }}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all group">
                    <Plus size={12} className="text-slate-300 group-hover:text-emerald-600 flex-shrink-0 transition-colors" />
                    <span className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-slate-800 block truncate">{item.name}</span>
                      <span className={`text-[9px] font-bold capitalize px-1 rounded ${TYPE_PILL[item.type] ?? ''}`}>{item.type}</span>
                      <span className="text-[11px] text-slate-400 ml-1">· {fmt(item.unit_price)}</span>
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-start gap-1.5 text-[10px] text-slate-400 border-t border-slate-200 pt-2.5">
                <Info size={10} className="flex-shrink-0 mt-0.5" />
                <span>Only active catalog items shown. Click an item to add it.</span>
              </div>
            </div>
          )}
        </div>

        {/* Custom Item Creator */}
        <div className="border border-dashed border-rose-200 rounded-xl overflow-hidden">
          <button type="button" onClick={() => { setCustomOpen(p => !p); setPickerOpen(false); }}
            className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-rose-50/40 transition-colors text-sm font-semibold text-rose-700">
            <span className="flex items-center gap-2">
              <PenLine size={14} className="text-rose-500" /> Add Custom Item
            </span>
            {customOpen ? <X size={15} className="text-slate-400" /> : <ChevronDown size={15} className="text-slate-400" />}
          </button>

          {customOpen && (
            <div className="border-t border-rose-100 bg-rose-50/30 p-3 space-y-3">
              <p className="text-[11px] text-slate-500">Create a one-off item not yet in your catalog. It will only be saved inside this package.</p>

              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <label className={lbl}>Item Name *</label>
                  <input type="text" value={custom.name} onChange={e => setCustom(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Custom Floral Arch" className={inp} />
                </div>
                <div>
                  <label className={lbl}>Type</label>
                  <select value={custom.type} onChange={e => setCustom(p => ({ ...p, type: e.target.value }))} className={inp}>
                    <option value="product">Product</option>
                    <option value="service">Service</option>
                    <option value="rental">Rental</option>
                  </select>
                </div>
                <div>
                  <label className={lbl}>Unit Price (PKR)</label>
                  <input type="text" value={custom.unit_price}
                    onChange={e => setCustom(p => ({ ...p, unit_price: e.target.value }))}
                    placeholder="0" className={inp} />
                </div>
                <div>
                  <label className={lbl}>Qty</label>
                  <input type="number" min="1" value={custom.qty}
                    onChange={e => setCustom(p => ({ ...p, qty: e.target.value }))}
                    className={inp} />
                </div>
                <div>
                  <label className={lbl}>Note (optional)</label>
                  <input type="text" value={custom.note}
                    onChange={e => setCustom(p => ({ ...p, note: e.target.value }))}
                    placeholder="e.g. colour: ivory" className={inp} />
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => { setCustom({ ...EMPTY_CUSTOM }); setCustomOpen(false); }}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="button" onClick={addCustomLine}
                  disabled={!custom.name.trim()}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-500 rounded-lg hover:bg-rose-600 disabled:opacity-40 transition-colors flex items-center gap-1.5">
                  <Check size={12} /> Add to Package
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
