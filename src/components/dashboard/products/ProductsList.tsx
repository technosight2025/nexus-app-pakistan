'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useDashboard } from '@/contexts/DashboardContext';
import { Search, Filter, Edit, Trash2, Star, Eye, EyeOff, Tag } from 'lucide-react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────
type ProductType = 'product' | 'service' | 'rental' | 'package';

interface Product {
  id: string;
  name: string;
  description: string;
  type: ProductType;
  unit_price: number;
  tax_rate: number;
  is_active: boolean;
  show_on_public_profile?: boolean;
  is_featured?: boolean;
  promo_badge?: string;
  discount_percentage?: number;
  metadata?: any;
}

// ─── Mock data (shown when DB not yet available) ──────────────────────────────
const MOCK_DATA: Product[] = [
  { id: '1', name: 'Marquee / Hall Rental', description: 'Main Hall Booking for 3 Hours', type: 'rental', unit_price: 150000, tax_rate: 16, is_active: true, show_on_public_profile: true, is_featured: true, promo_badge: 'Premium Venue', discount_percentage: 0 },
  { id: '2', name: 'Standard Menu (Per Head)', description: 'Chicken Karahi, Biryani, Naan, Salad, Raita, Gulab Jamun', type: 'package', unit_price: 3500, tax_rate: 16, is_active: true, show_on_public_profile: true, is_featured: false, promo_badge: '', discount_percentage: 5 },
  { id: '3', name: 'Premium Stage Decor', description: 'Fresh Floral stage setup with premium lighting', type: 'product', unit_price: 150000, tax_rate: 16, is_active: true, show_on_public_profile: false, is_featured: true, promo_badge: 'Trending', discount_percentage: 10 },
  { id: '4', name: 'Live DJ & Sound', description: 'Professional sound system with DJ', type: 'service', unit_price: 35000, tax_rate: 16, is_active: true, show_on_public_profile: false, is_featured: false, promo_badge: '', discount_percentage: 0 },
];

// ─── Supabase singleton ───────────────────────────────────────────────────────
const supabase = createClient();

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatPKR = (n: number) =>
  'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(n);

const TYPE_COLORS: Record<ProductType, string> = {
  product: 'bg-blue-50 text-blue-700 border-blue-200',
  service: 'bg-violet-50 text-violet-700 border-violet-200',
  rental: 'bg-amber-50 text-amber-700 border-amber-200',
  package: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

// ─── Component ────────────────────────────────────────────────────────────────
export function ProductsList() {
  const { organizationId } = useDashboard();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Single fetch - stable because supabase is module-level
  useEffect(() => {
    async function load() {
      setLoading(true);
      if (!organizationId) {
        setProducts(MOCK_DATA);
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await Promise.race([
          supabase.from('products' as any).select('*').eq('organization_id', organizationId).order('name'),
          new Promise<any>((_, rej) => setTimeout(() => rej(new Error('timeout')), 4000)),
        ]);
        setProducts(!error && data ? data : MOCK_DATA);
      } catch {
        setProducts(MOCK_DATA);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [organizationId]); // ← only organizationId; supabase is stable

  const handleDelete = useCallback(async (id: string) => {
    if (!window.confirm('Delete this item from your catalog?')) return;
    const prev = products;
    setProducts(ps => ps.filter(p => p.id !== id));
    try {
      const { error } = await supabase.from('products' as any).delete().eq('id', id);
      if (error && error.code !== '42P01') throw error;
    } catch {
      alert('Failed to delete. Restoring item.');
      setProducts(prev);
    }
  }, [products]);

  const filtered = useMemo(() =>
    products.filter(p => {
      const q = searchTerm.toLowerCase();
      const matchSearch = p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
      const matchType = typeFilter === 'all' || p.type === typeFilter;
      return matchSearch && matchType;
    }),
  [products, searchTerm, typeFilter]);

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="p-8 flex flex-col gap-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-16 bg-slate-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* ── Toolbar ── */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          <input
            type="text"
            placeholder="Search catalog…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="text-sm border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-700"
          >
            <option value="all">All Types</option>
            <option value="product">Products</option>
            <option value="service">Services</option>
            <option value="rental">Rentals</option>
            <option value="package">Packages</option>
          </select>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wide">
              <th className="py-3 px-5 font-semibold">Item</th>
              <th className="py-3 px-4 font-semibold">Type</th>
              <th className="py-3 px-4 font-semibold text-right">Price</th>
              <th className="py-3 px-4 font-semibold text-center">Tax</th>
              <th className="py-3 px-4 font-semibold text-center">Status</th>
              <th className="py-3 px-4 font-semibold text-center">Promo</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/80 transition-colors group">

                {/* Name */}
                <td className="py-4 px-5">
                  <p className="font-semibold text-slate-800 leading-snug">{p.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{p.description}</p>
                </td>

                {/* Type badge */}
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border capitalize ${TYPE_COLORS[p.type] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                    {p.type}
                  </span>
                </td>

                {/* Price */}
                <td className="py-4 px-4 text-right font-semibold text-slate-800">
                  {formatPKR(p.unit_price)}
                </td>

                {/* Tax */}
                <td className="py-4 px-4 text-center text-slate-600">{p.tax_rate}%</td>

                {/* Status & Visibility */}
                <td className="py-4 px-4">
                  <div className="flex flex-col items-center gap-1">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${p.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {p.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${p.show_on_public_profile ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'}`}>
                      {p.show_on_public_profile ? <><Eye size={10} /> Public</> : <><EyeOff size={10} /> Hidden</>}
                    </span>
                  </div>
                </td>

                {/* Promo */}
                <td className="py-4 px-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    {p.is_featured && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
                        <Star size={9} /> Featured
                      </span>
                    )}
                    {p.promo_badge && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                        <Tag size={9} /> {p.promo_badge}
                      </span>
                    )}
                    {p.discount_percentage ? (
                      <span className="text-[10px] text-emerald-600 font-bold">{p.discount_percentage}% off</span>
                    ) : null}
                  </div>
                </td>

                {/* Actions */}
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href={`/dashboard/products/${p.id}/edit`}
                      className="p-1.5 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                      title="Edit"
                    >
                      <Edit size={15} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="py-16 text-center text-slate-400 text-sm">
                  No items match your search or filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
