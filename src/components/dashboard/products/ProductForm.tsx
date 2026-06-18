'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useDashboard } from '@/contexts/DashboardContext';
import { Check, X, Search, UploadCloud, Image as ImageIcon } from 'lucide-react';
import { PackageDesigner, type PackageConfig } from './PackageDesigner';
import { MenuDesigner, buildMenuFromData, type MenuConfig } from './MenuDesigner';

// ─── Types ────────────────────────────────────────────────────────────────────
type ProductType = 'product' | 'service' | 'rental' | 'package';

interface CatalogItem {
  id: string;
  name: string;
  type: ProductType;
  unit_price: number;
}

interface FormState {
  name: string;
  description: string;
  type: ProductType;
  unit_price: string;
  tax_rate: string;
  is_active: boolean;
  show_on_public_profile: boolean;
  // promo
  is_featured: boolean;
  promo_badge: string;
  discount_percentage: string;
  // product
  stock_quantity: string;
  weight: string;
  // service
  duration: string;
  provider_level: string;
  // rental
  security_deposit: string;
  min_rental_period: string;
  // package
  min_guests: string;
  includes_setup: boolean;
  // add-ons
  addons: string[];
  // images
  image_url: string;
}

function buildPackageConfig(d?: any): PackageConfig {
  return {
    min_guests: d?.metadata?.min_guests != null ? String(d.metadata.min_guests) : '',
    max_guests: d?.metadata?.max_guests != null ? String(d.metadata.max_guests) : '',
    includes_setup: d?.metadata?.includes_setup ?? false,
    validity_days: d?.metadata?.validity_days != null ? String(d.metadata.validity_days) : '',
    lines: Array.isArray(d?.metadata?.package_lines) ? d.metadata.package_lines : [],
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  return Number(digits).toLocaleString('en-US');
}

function parsePrice(display: string): number {
  return Number(display.replace(/,/g, '')) || 0;
}

function buildInitial(d?: any): FormState {
  return {
    name: d?.name ?? '',
    description: d?.description ?? '',
    type: d?.type ?? 'product',
    unit_price: d?.unit_price ? formatDisplay(String(d.unit_price)) : '',
    tax_rate: d?.tax_rate != null ? String(d.tax_rate) : '16',
    is_active: d?.is_active ?? true,
    show_on_public_profile: d?.show_on_public_profile ?? false,
    is_featured: d?.is_featured ?? false,
    promo_badge: d?.promo_badge ?? '',
    discount_percentage: d?.discount_percentage != null ? String(d.discount_percentage) : '0',
    stock_quantity: d?.metadata?.stock_quantity != null ? String(d.metadata.stock_quantity) : '',
    weight: d?.metadata?.weight ?? '',
    duration: d?.metadata?.duration ?? '',
    provider_level: d?.metadata?.provider_level ?? '',
    security_deposit: d?.metadata?.security_deposit ? formatDisplay(String(d.metadata.security_deposit)) : '',
    min_rental_period: d?.metadata?.min_rental_period ?? '',
    min_guests: d?.metadata?.min_guests != null ? String(d.metadata.min_guests) : '',
    includes_setup: d?.metadata?.includes_setup ?? false,
    addons: Array.isArray(d?.metadata?.addons) ? d.metadata.addons : [],
    image_url: d?.metadata?.image_url ?? '',
  };
}

// ─── Supabase singleton (module-level) ───────────────────────────────────────
const supabase = createClient();

// ─── Component ────────────────────────────────────────────────────────────────
export function ProductForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams?.get('returnTo');
  const { organizationId } = useDashboard();

  const [form, setForm] = useState<FormState>(() => buildInitial(initialData));
  const [packageConfig, setPackageConfig] = useState<PackageConfig>(() => buildPackageConfig(initialData));
  const [menuConfig, setMenuConfig] = useState<MenuConfig>(() => buildMenuFromData(initialData));
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [addonSearch, setAddonSearch] = useState('');
  const [addonTypeFilter, setAddonTypeFilter] = useState('all');

  // Filtered catalog for Add-ons panel
  const filteredAddons = useMemo(() =>
    catalog.filter(c => {
      if (addonTypeFilter !== 'all' && c.type !== addonTypeFilter) return false;
      return c.name.toLowerCase().includes(addonSearch.toLowerCase());
    }),
  [catalog, addonSearch, addonTypeFilter]);

  // Track if we have mounted - prevents stale-closure issues on fast navigation
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  // Fetch catalog once on mount (or when org changes)
  useEffect(() => {
    const MOCK_CATALOG: CatalogItem[] = [
      { id: 'mock-1', name: 'Marquee / Hall Rental',    type: 'rental',  unit_price: 150000 },
      { id: 'mock-2', name: 'Standard Menu (Per Head)', type: 'package', unit_price: 3500   },
      { id: 'mock-3', name: 'Premium Stage Decor',      type: 'product', unit_price: 150000 },
      { id: 'mock-4', name: 'Live DJ & Sound',          type: 'service', unit_price: 35000  },
      { id: 'mock-5', name: 'Photography Package',      type: 'service', unit_price: 45000  },
      { id: 'mock-6', name: 'Floral Centerpieces',      type: 'product', unit_price: 12000  },
      { id: 'mock-7', name: 'Valet Parking (per car)',  type: 'service', unit_price: 500    },
      { id: 'mock-8', name: 'Generator Backup',         type: 'rental',  unit_price: 20000  },
    ];

    if (!organizationId) {
      // No org connected — always show mock catalog
      if (mounted.current) setCatalog(MOCK_CATALOG.filter(c => c.id !== initialData?.id));
      return;
    }

    supabase
      .from('products' as any)
      .select('id, name, type, unit_price')
      .eq('organization_id', organizationId)
      .eq('is_active', true)
      .then(({ data, error }) => {
        if (!mounted.current) return;
        if (error || !data || data.length === 0) {
          // Table not migrated yet or empty — fall back to mock catalog
          setCatalog(MOCK_CATALOG.filter(c => c.id !== initialData?.id));
          return;
        }
        const filtered = initialData?.id
          ? data.filter((p: any) => p.id !== initialData.id)
          : data;
        setCatalog(filtered);
      });
  }, [organizationId, initialData?.id]);

  // ── Field Handlers ──────────────────────────────────────────────────────────
  const setText = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const setPrice = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: formatDisplay(value) }));
  }, []);

  const setCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: checked }));
  }, []);

  const toggleAddon = useCallback((id: string) => {
    setForm(prev => ({
      ...prev,
      addons: prev.addons.includes(id)
        ? prev.addons.filter(a => a !== id)
        : [...prev.addons, id],
    }));
  }, []);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be less than 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setForm(prev => ({ ...prev, image_url: event.target!.result as string }));
      }
    };
    reader.readAsDataURL(file);
  }, []);

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizationId) { setError('No organization selected.'); return; }
    setIsSaving(true);
    setError('');

    const payload: any = {
      organization_id: organizationId,
      name: form.name,
      description: form.description,
      type: form.type,
      unit_price: parsePrice(form.unit_price),
      tax_rate: Number(form.tax_rate) || 0,
      is_active: form.is_active,
      show_on_public_profile: form.show_on_public_profile,
      is_featured: form.is_featured,
      promo_badge: form.promo_badge,
      discount_percentage: Number(form.discount_percentage) || 0,
      metadata: {
        addons: form.addons,
        ...(form.type === 'product' && { stock_quantity: Number(form.stock_quantity) || 0, weight: form.weight }),
        ...(form.type === 'service' && { duration: form.duration, provider_level: form.provider_level, menu: menuConfig }),
        ...(form.type === 'rental' && { security_deposit: parsePrice(form.security_deposit), min_rental_period: form.min_rental_period }),
        ...(form.type === 'package' && {
          min_guests: Number(packageConfig.min_guests) || 0,
          max_guests: Number(packageConfig.max_guests) || 0,
          includes_setup: packageConfig.includes_setup,
          validity_days: Number(packageConfig.validity_days) || 0,
          package_lines: packageConfig.lines,
          menu: menuConfig,
        }),
        image_url: form.image_url,
      },
    };

    try {
      let err: any;
      if (initialData?.id) {
        const res = await supabase.from('products' as any).update(payload).eq('id', initialData.id);
        err = res.error;
      } else {
        const res = await supabase.from('products' as any).insert(payload);
        err = res.error;
      }
      if (err && err.code !== '42P01') throw err;
      router.push(returnTo || '/dashboard/products');
    } catch (ex: any) {
      setError(ex.message || 'Failed to save. Please try again.');
    } finally {
      if (mounted.current) setIsSaving(false);
    }
  };

  // ── Shared input classes ────────────────────────────────────────────────────
  const inp = 'w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition';
  const lbl = 'block text-sm font-semibold text-slate-700 mb-1';

  // ── Toggle helper ───────────────────────────────────────────────────────────
  const Toggle = ({ name, checked, onChange, label }: { name: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; label: string }) => (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <div className="relative">
        <input type="checkbox" name={name} checked={checked} onChange={onChange} className="sr-only" />
        <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-emerald-600' : 'bg-slate-300'}`} />
        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg px-4 py-3">
          <X size={16} className="flex-shrink-0" />
          {error}
        </div>
      )}

      {/* ── Section 1: Core Info ─────────────────────────────────────── */}
      <section className="space-y-5">
        <h3 className="text-base font-bold text-slate-700 border-b border-slate-200 pb-2">Basic Information</h3>

        <div>
          <label className={lbl}>Product Name <span className="text-rose-500">*</span></label>
          <input type="text" name="name" required value={form.name} onChange={setText} placeholder="e.g. Premium Stage Decor" className={inp} />
        </div>

        <div>
          <label className={lbl}>Description</label>
          <textarea name="description" rows={3} value={form.description} onChange={setText} placeholder="Detailed description of what is included..." className={`${inp} resize-y`} />
        </div>

        <div>
          <label className={lbl}>Product Image</label>
          <div className="flex items-center gap-4">
            {form.image_url ? (
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-200">
                <img src={form.image_url} alt="Product" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, image_url: '' }))}
                  className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-rose-600 hover:bg-white transition-colors shadow-sm"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="w-24 h-24 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 text-slate-400">
                <ImageIcon size={24} />
              </div>
            )}
            <div className="flex-1">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                <UploadCloud size={16} />
                Upload Image
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
              <p className="text-xs text-slate-500 mt-2">Recommended: Square image, max 2MB.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={lbl}>Type <span className="text-rose-500">*</span></label>
            <select name="type" value={form.type} onChange={setText} className={inp}>
              <option value="product">Product</option>
              <option value="service">Service</option>
              <option value="rental">Rental</option>
              <option value="package">Package</option>
            </select>
          </div>
          <div className="flex flex-col gap-3 pt-6">
            <Toggle name="is_active" checked={form.is_active} onChange={setCheck} label={form.is_active ? 'Active' : 'Inactive'} />
            <Toggle name="show_on_public_profile" checked={form.show_on_public_profile} onChange={setCheck} label={form.show_on_public_profile ? 'Visible on Public Profile' : 'Hidden from Public'} />
          </div>
        </div>
      </section>

      {/* ── Section 2: Pricing ──────────────────────────────────────── */}
      <section className="space-y-5">
        <h3 className="text-base font-bold text-slate-700 border-b border-slate-200 pb-2">Pricing</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={lbl}>Unit Price (PKR) <span className="text-rose-500">*</span></label>
            <input type="text" name="unit_price" required value={form.unit_price} onChange={setPrice} placeholder="0" className={inp} />
          </div>
          <div>
            <label className={lbl}>Tax Rate (%)</label>
            <input type="number" name="tax_rate" min="0" max="100" step="0.01" value={form.tax_rate} onChange={setText} className={inp} />
          </div>
        </div>
      </section>

      {/* ── Section 3: Type-Specific Fields ─────────────────────────── */}
      {form.type === 'product' && (
        <section className="space-y-5">
          <h3 className="text-base font-bold text-slate-700 border-b border-slate-200 pb-2">Product Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={lbl}>Stock Quantity</label>
              <input type="number" name="stock_quantity" value={form.stock_quantity} onChange={setText} placeholder="e.g. 10" className={inp} />
            </div>
            <div>
              <label className={lbl}>Weight / Dimensions</label>
              <input type="text" name="weight" value={form.weight} onChange={setText} placeholder="e.g. 5kg" className={inp} />
            </div>
          </div>
        </section>
      )}

      {form.type === 'service' && (
        <section className="space-y-5">
          <h3 className="text-base font-bold text-slate-700 border-b border-slate-200 pb-2">Service Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={lbl}>Duration</label>
              <input type="text" name="duration" value={form.duration} onChange={setText} placeholder="e.g. 4 Hours" className={inp} />
            </div>
            <div>
              <label className={lbl}>Provider Level</label>
              <select name="provider_level" value={form.provider_level} onChange={setText} className={inp}>
                <option value="">Select level</option>
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>
        </section>
      )}

      {form.type === 'rental' && (
        <section className="space-y-5">
          <h3 className="text-base font-bold text-slate-700 border-b border-slate-200 pb-2">Rental Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={lbl}>Security Deposit (PKR)</label>
              <input type="text" name="security_deposit" value={form.security_deposit} onChange={setPrice} placeholder="0" className={inp} />
            </div>
            <div>
              <label className={lbl}>Minimum Rental Period</label>
              <input type="text" name="min_rental_period" value={form.min_rental_period} onChange={setText} placeholder="e.g. 3 Hours" className={inp} />
            </div>
          </div>
        </section>
      )}

      {form.type === 'package' && (
        <section className="space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-700 border-b border-slate-200 pb-2">Package Designer</h3>
            <p className="text-xs text-slate-500 mt-2">Build this package by selecting items from your catalog. Set quantities, mark items as optional, and see the computed base price automatically.</p>
          </div>
          <PackageDesigner
            catalog={catalog}
            value={packageConfig}
            onChange={setPackageConfig}
          />
        </section>
      )}

      {/* ── Menu Designer (Package + Service) ─────────────────────── */}
      {(form.type === 'package' || form.type === 'service') && (
        <section className="space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-700 border-b border-slate-200 pb-2 flex items-center gap-2">
              🍽️ Menu Designer
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Design the catering menu that guests see on your public profile.
              Toggle &ldquo;Public on Profile&rdquo; to show or hide it.
            </p>
          </div>
          <MenuDesigner value={menuConfig} onChange={setMenuConfig} />
        </section>
      )}

      {/* ── Section 4: Add-ons & Cross-Sells ────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-700">Add-ons &amp; Cross-Sells</h3>
            <p className="text-xs text-slate-500 mt-0.5">Select related items to upsell on quotations and invoices.</p>
          </div>
          {form.addons.length > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
              <Check size={11} /> {form.addons.length} selected
            </span>
          )}
        </div>

        {/* Selected strip */}
        {form.addons.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {form.addons.map(id => {
              const item = catalog.find(c => c.id === id);
              if (!item) return null;
              return (
                <span key={id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800">
                  {item.name}
                  <button type="button" onClick={() => toggleAddon(id)} className="text-emerald-500 hover:text-rose-500 transition-colors">
                    <X size={11} />
                  </button>
                </span>
              );
            })}
          </div>
        )}

        {/* Catalog list */}
        {catalog.length === 0 ? (
          <div className="text-sm text-slate-400 bg-slate-50 border border-slate-200 rounded-lg p-5 text-center">
            No other active items in your catalog.
          </div>
        ) : (
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            {/* Search + filter toolbar */}
            <div className="flex gap-2 p-3 bg-slate-50 border-b border-slate-200">
              <div className="relative flex-1">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search items…"
                  value={addonSearch}
                  onChange={e => setAddonSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <select
                value={addonTypeFilter}
                onChange={e => setAddonTypeFilter(e.target.value)}
                className="text-xs border border-slate-300 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-700"
              >
                <option value="all">All Types</option>
                <option value="product">Products</option>
                <option value="service">Services</option>
                <option value="rental">Rentals</option>
                <option value="package">Packages</option>
              </select>
            </div>

            {/* Item rows */}
            <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
              {filteredAddons.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">No matching items.</p>
              ) : filteredAddons.map(item => {
                const selected = form.addons.includes(item.id);
                const typeColor: Record<string, string> = {
                  product: 'bg-blue-50 text-blue-700',
                  service: 'bg-violet-50 text-violet-700',
                  rental:  'bg-amber-50 text-amber-700',
                  package: 'bg-emerald-50 text-emerald-700',
                };
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleAddon(item.id)}
                    className={`flex items-center gap-3 w-full text-left px-4 py-2.5 transition-all ${
                      selected ? 'bg-emerald-50' : 'bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      selected ? 'bg-emerald-600 border-emerald-600' : 'border-slate-300'
                    }`}>
                      {selected && <Check size={11} className="text-white" />}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className={`text-sm font-semibold ${selected ? 'text-emerald-800' : 'text-slate-800'}`}>{item.name}</span>
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${typeColor[item.type] ?? 'bg-slate-100 text-slate-600'}`}>
                      {item.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 tabular-nums flex-shrink-0">
                      PKR {Number(item.unit_price).toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
              <span>{filteredAddons.length} of {catalog.length} items shown</span>
              {form.addons.length > 0 && (
                <button type="button" onClick={() => setForm(p => ({ ...p, addons: [] }))}
                  className="text-rose-400 hover:text-rose-600 font-semibold transition-colors">
                  Clear all
                </button>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ── Section 5: Promotional Features ─────────────────────────── */}
      <section className="space-y-5">
        <h3 className="text-base font-bold text-slate-700 border-b border-slate-200 pb-2">Promotional Features</h3>
        <Toggle name="is_featured" checked={form.is_featured} onChange={setCheck} label="Feature this item (highlight in catalog)" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={lbl}>Promo Badge</label>
            <input type="text" name="promo_badge" value={form.promo_badge} onChange={setText} placeholder="e.g. Best Seller" className={inp} />
          </div>
          <div>
            <label className={lbl}>Discount (%)</label>
            <input type="number" name="discount_percentage" min="0" max="100" value={form.discount_percentage} onChange={setText} className={inp} />
          </div>
        </div>
      </section>

      {/* ── Action Buttons ────────────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={() => router.push(returnTo || '/dashboard/products')}
          className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? 'Saving…' : initialData?.id ? 'Update Product' : 'Save Product'}
        </button>
      </div>

    </form>
  );
}
