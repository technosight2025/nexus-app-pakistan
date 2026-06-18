'use client';

import React, { useState, useCallback, useId } from 'react';
import {
  Plus, Trash2, GripVertical, ChevronDown, ChevronUp,
  Utensils, Leaf, Drumstick, Fish, X, Check, Eye
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
export type DietTag = 'veg' | 'non-veg' | 'vegan' | 'seafood' | 'halal';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  diet: DietTag;
  price_per_head?: number;      // optional: per-item upsell price
  is_signature: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  items: MenuItem[];
}

export interface MenuConfig {
  title: string;
  price_per_head: string;       // base per-head price (main selling point)
  cuisine_type: string;
  serves: string;               // "minimum 100 pax"
  is_public: boolean;           // show on public profile
  categories: MenuCategory[];
}

export interface MenuDesignerProps {
  value: MenuConfig;
  onChange: (cfg: MenuConfig) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const DEFAULT_CATEGORIES: MenuCategory[] = [
  { id: 'starters', name: 'Starters', icon: '🥗', items: [] },
  { id: 'mains',    name: 'Main Course', icon: '🍖', items: [] },
  { id: 'bread',    name: 'Breads',  icon: '🫓', items: [] },
  { id: 'dessert',  name: 'Desserts', icon: '🍮', items: [] },
  { id: 'drinks',   name: 'Beverages', icon: '🥤', items: [] },
];

const DIET_META: Record<DietTag, { label: string; color: string; icon: React.ReactNode }> = {
  'veg':     { label: 'Veg',      color: 'bg-green-100 text-green-700 border-green-200',   icon: <Leaf size={10} /> },
  'non-veg': { label: 'Non-Veg',  color: 'bg-red-100 text-red-600 border-red-200',         icon: <Drumstick size={10} /> },
  'vegan':   { label: 'Vegan',    color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <Leaf size={10} /> },
  'seafood': { label: 'Seafood',  color: 'bg-blue-100 text-blue-600 border-blue-200',      icon: <Fish size={10} /> },
  'halal':   { label: 'Halal',    color: 'bg-teal-100 text-teal-700 border-teal-200',      icon: <Check size={10} /> },
};

const CUISINE_OPTIONS = [
  'Pakistani', 'Mughal / Desi', 'Continental', 'Chinese', 'BBQ',
  'Mediterranean', 'Arabic / Middle Eastern', 'Mixed'
];

const fmt = (n: number) =>
  'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(n);

function newItem(): MenuItem {
  return { id: `item-${Date.now()}-${Math.random().toString(36).slice(2)}`, name: '', description: '', diet: 'non-veg', is_signature: false };
}

// ─── Empty state builder ──────────────────────────────────────────────────────
export function buildEmptyMenu(): MenuConfig {
  return {
    title: '',
    price_per_head: '',
    cuisine_type: 'Pakistani',
    serves: '',
    is_public: true,
    categories: DEFAULT_CATEGORIES.map(c => ({ ...c, items: [] })),
  };
}

export function buildMenuFromData(d?: any): MenuConfig {
  if (!d?.menu) return buildEmptyMenu();
  const m = d.menu;
  return {
    title:          m.title ?? '',
    price_per_head: m.price_per_head != null ? String(m.price_per_head) : '',
    cuisine_type:   m.cuisine_type ?? 'Pakistani',
    serves:         m.serves ?? '',
    is_public:      m.is_public ?? true,
    categories:     Array.isArray(m.categories) ? m.categories
      : DEFAULT_CATEGORIES.map(c => ({ ...c, items: [] })),
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function DietBadge({ diet }: { diet: DietTag }) {
  const m = DIET_META[diet];
  return (
    <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded border ${m.color}`}>
      {m.icon}{m.label}
    </span>
  );
}

interface CategoryBlockProps {
  cat: MenuCategory;
  catIdx: number;
  onUpdate: (catIdx: number, cat: MenuCategory) => void;
  onRemoveCat: (catIdx: number) => void;
}

function CategoryBlock({ cat, catIdx, onUpdate, onRemoveCat }: CategoryBlockProps) {
  const [open, setOpen] = useState(true);
  const [addingItem, setAddingItem] = useState(false);
  const [draft, setDraft] = useState<MenuItem>(newItem);

  const saveItem = () => {
    if (!draft.name.trim()) return;
    onUpdate(catIdx, { ...cat, items: [...cat.items, { ...draft }] });
    setDraft(newItem());
    setAddingItem(false);
  };

  const removeItem = (itemIdx: number) =>
    onUpdate(catIdx, { ...cat, items: cat.items.filter((_, i) => i !== itemIdx) });

  const toggleSignature = (itemIdx: number) =>
    onUpdate(catIdx, {
      ...cat,
      items: cat.items.map((it, i) => i === itemIdx ? { ...it, is_signature: !it.is_signature } : it)
    });

  const inp = 'w-full border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition';

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      {/* Category header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-100">
        <div className="flex items-center gap-2">
          <GripVertical size={14} className="text-slate-300" />
          <span className="text-base">{cat.icon}</span>
          <input
            type="text"
            value={cat.name}
            onChange={e => onUpdate(catIdx, { ...cat, name: e.target.value })}
            className="text-sm font-bold text-slate-800 bg-transparent border-0 focus:outline-none focus:ring-0 min-w-0 w-36"
          />
          <span className="text-[11px] text-slate-400">({cat.items.length} items)</span>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setOpen(p => !p)} className="text-slate-400 hover:text-slate-600 transition-colors">
            {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
          <button type="button" onClick={() => onRemoveCat(catIdx)} className="text-slate-300 hover:text-rose-500 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {open && (
        <div className="bg-slate-50/50 p-3 space-y-2">
          {/* Items */}
          {cat.items.map((item, itemIdx) => (
            <div key={item.id} className={`flex items-start gap-2 bg-white rounded-lg border px-3 py-2 text-xs ${item.is_signature ? 'border-amber-300 bg-amber-50/30' : 'border-slate-200'}`}>
              <GripVertical size={12} className="text-slate-300 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-800">{item.name}</span>
                  <DietBadge diet={item.diet} />
                  {item.is_signature && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 border border-amber-200">⭐ Signature</span>
                  )}
                </div>
                {item.description && <p className="text-slate-500 mt-0.5 text-[11px]">{item.description}</p>}
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button type="button" onClick={() => toggleSignature(itemIdx)}
                  title="Toggle signature dish"
                  className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${item.is_signature ? 'bg-amber-100 border-amber-300 text-amber-600' : 'border-slate-200 text-slate-400 hover:border-amber-300 hover:text-amber-500'}`}>
                  ⭐
                </button>
                <button type="button" onClick={() => removeItem(itemIdx)}
                  className="text-slate-300 hover:text-rose-500 transition-colors">
                  <X size={12} />
                </button>
              </div>
            </div>
          ))}

          {/* Add item form */}
          {addingItem ? (
            <div className="bg-white border border-emerald-200 rounded-xl p-3 space-y-2 shadow-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Dish Name *</label>
                  <input type="text" value={draft.name}
                    onChange={e => setDraft(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Chicken Karahi" autoFocus className={inp} />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Description (optional)</label>
                  <input type="text" value={draft.description}
                    onChange={e => setDraft(p => ({ ...p, description: e.target.value }))}
                    placeholder="e.g. Slow-cooked in clay pot with spices" className={inp} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Diet Type</label>
                  <select value={draft.diet} onChange={e => setDraft(p => ({ ...p, diet: e.target.value as DietTag }))}
                    className={inp}>
                    {(Object.keys(DIET_META) as DietTag[]).map(d => (
                      <option key={d} value={d}>{DIET_META[d].label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-[11px] text-slate-600 select-none">
                    <input type="checkbox" checked={draft.is_signature}
                      onChange={e => setDraft(p => ({ ...p, is_signature: e.target.checked }))}
                      className="rounded border-slate-300 text-amber-500 focus:ring-amber-400" />
                    ⭐ Signature Dish
                  </label>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => { setAddingItem(false); setDraft(newItem()); }}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="button" onClick={saveItem} disabled={!draft.name.trim()}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-40 transition-colors flex items-center gap-1.5">
                  <Check size={11} /> Add Dish
                </button>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => setAddingItem(true)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-slate-300 text-xs text-slate-400 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50/30 transition-all">
              <Plus size={12} /> Add dish to {cat.name}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main MenuDesigner ────────────────────────────────────────────────────────
export function MenuDesigner({ value, onChange }: MenuDesignerProps) {
  const uid = useId();
  const [previewOpen, setPreviewOpen] = useState(false);

  const inp = 'w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition';
  const lbl = 'block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide';

  const updateCategory = useCallback((catIdx: number, cat: MenuCategory) => {
    onChange({ ...value, categories: value.categories.map((c, i) => i === catIdx ? cat : c) });
  }, [value, onChange]);

  const removeCategory = useCallback((catIdx: number) => {
    onChange({ ...value, categories: value.categories.filter((_, i) => i !== catIdx) });
  }, [value, onChange]);

  const addCategory = useCallback(() => {
    const newCat: MenuCategory = {
      id: `cat-${uid}-${Date.now()}`,
      name: 'New Category',
      icon: '🍽️',
      items: [],
    };
    onChange({ ...value, categories: [...value.categories, newCat] });
  }, [value, onChange, uid]);

  const totalDishes = value.categories.reduce((s, c) => s + c.items.length, 0);

  return (
    <div className="space-y-5">

      {/* ── Menu Header Config ─────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils size={16} className="text-emerald-600" />
            <h4 className="text-sm font-bold text-slate-800">Menu Configuration</h4>
          </div>
          {/* Public toggle */}
          <label className="inline-flex items-center gap-2 cursor-pointer select-none">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={value.is_public}
                onChange={e => onChange({ ...value, is_public: e.target.checked })} />
              <div className={`w-9 h-5 rounded-full transition-colors ${value.is_public ? 'bg-emerald-600' : 'bg-slate-300'}`} />
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${value.is_public ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
            <span className="text-xs font-semibold text-slate-600">
              {value.is_public ? '🌐 Public on Profile' : '🔒 Hidden'}
            </span>
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="col-span-2">
            <label className={lbl}>Menu Title *</label>
            <input type="text" value={value.title}
              onChange={e => onChange({ ...value, title: e.target.value })}
              placeholder="e.g. Premium Wedding Menu" className={inp} />
          </div>
          <div>
            <label className={lbl}>Cuisine Type</label>
            <select value={value.cuisine_type}
              onChange={e => onChange({ ...value, cuisine_type: e.target.value })}
              className={inp}>
              {CUISINE_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>Price / Head (PKR) *</label>
            <input type="text" value={value.price_per_head}
              onChange={e => onChange({ ...value, price_per_head: e.target.value })}
              placeholder="e.g. 3500" className={inp} />
          </div>
          <div className="col-span-2">
            <label className={lbl}>Minimum Serving</label>
            <input type="text" value={value.serves}
              onChange={e => onChange({ ...value, serves: e.target.value })}
              placeholder="e.g. Minimum 100 persons" className={inp} />
          </div>
        </div>

        {/* Stats pill row */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="text-[11px] bg-white border border-slate-200 rounded-full px-3 py-1 text-slate-600 font-medium">
            {value.categories.length} categories
          </span>
          <span className="text-[11px] bg-white border border-slate-200 rounded-full px-3 py-1 text-slate-600 font-medium">
            {totalDishes} dishes total
          </span>
          {value.price_per_head && (
            <span className="text-[11px] bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 text-emerald-700 font-bold">
              {fmt(Number(value.price_per_head))} / head
            </span>
          )}
        </div>
      </div>

      {/* ── Categories ─────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-700">Menu Categories</h4>
          <button type="button" onClick={() => setPreviewOpen(p => !p)}
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
            <Eye size={13} />
            {previewOpen ? 'Hide Preview' : 'Preview Menu'}
          </button>
        </div>

        {/* Preview card */}
        {previewOpen && (
          <div className="border-2 border-dashed border-indigo-200 rounded-xl p-4 bg-indigo-50/30 space-y-3">
            <p className="text-[11px] text-indigo-500 font-semibold uppercase tracking-wide">📋 Public Profile Preview</p>
            <div className="bg-white rounded-xl border border-indigo-200 p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-slate-900">{value.title || 'Menu Title'}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{value.cuisine_type} · {value.serves || 'Min pax not set'}</p>
                </div>
                {value.price_per_head && (
                  <span className="font-black text-emerald-700 text-sm">
                    PKR {Number(value.price_per_head).toLocaleString()} <span className="text-xs text-slate-400 font-medium">/head</span>
                  </span>
                )}
              </div>
              {value.categories.filter(c => c.items.length > 0).map(cat => (
                <div key={cat.id} className="mb-3">
                  <p className="text-xs font-bold text-slate-600 mb-1">{cat.icon} {cat.name}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {cat.items.map((it, i) => (
                      <span key={it.id}>
                        {it.is_signature ? <strong>⭐{it.name}</strong> : it.name}
                        {i < cat.items.length - 1 ? ' · ' : ''}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
              {value.categories.every(c => c.items.length === 0) && (
                <p className="text-xs text-slate-400 italic">Add dishes to see them in the preview.</p>
              )}
            </div>
          </div>
        )}

        {/* Category blocks */}
        {value.categories.map((cat, catIdx) => (
          <CategoryBlock
            key={cat.id}
            cat={cat}
            catIdx={catIdx}
            onUpdate={updateCategory}
            onRemoveCat={removeCategory}
          />
        ))}

        {/* Add category */}
        <button type="button" onClick={addCategory}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 text-sm text-slate-400 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50/30 transition-all">
          <Plus size={14} /> Add Category
        </button>
      </div>

    </div>
  );
}
