'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ProductForm } from '@/components/dashboard/products/ProductForm';
import { ArrowLeft } from 'lucide-react';

// Stable supabase client at module level
const supabase = createClient();

const MOCK_DB: Record<string, any> = {
  '1': { id: '1', name: 'Marquee / Hall Rental', description: 'Main Hall Booking for 3 Hours', type: 'rental', unit_price: 150000, tax_rate: 16, is_active: true, show_on_public_profile: true, is_featured: true, promo_badge: 'Premium Venue', discount_percentage: 0, metadata: { security_deposit: 50000, min_rental_period: '3 Hours' } },
  '2': { id: '2', name: 'Standard Menu (Per Head)', description: 'Chicken Karahi, Biryani, Naan, Salad, Raita, Gulab Jamun', type: 'package', unit_price: 3500, tax_rate: 16, is_active: true, show_on_public_profile: true, is_featured: false, promo_badge: '', discount_percentage: 5, metadata: { min_guests: 100, includes_setup: true } },
  '3': { id: '3', name: 'Premium Stage Decor', description: 'Fresh Floral stage setup', type: 'product', unit_price: 150000, tax_rate: 16, is_active: true, show_on_public_profile: false, is_featured: true, promo_badge: 'Trending', discount_percentage: 10, metadata: { stock_quantity: 5, weight: '' } },
  '4': { id: '4', name: 'Live DJ & Sound', description: 'Professional sound system with DJ', type: 'service', unit_price: 35000, tax_rate: 16, is_active: true, show_on_public_profile: false, is_featured: false, promo_badge: '', discount_percentage: 0, metadata: { duration: '4 Hours', provider_level: 'senior' } },
};

export default function EditProductPage() {
  const params = useParams() as { id: string };
  const id = params.id;
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) { setLoading(false); return; }

    async function load() {
      try {
        const { data, error } = await Promise.race([
          supabase.from('products' as any).select('*').eq('id', id).single(),
          new Promise<any>((_, rej) => setTimeout(() => rej(new Error('timeout')), 4000)),
        ]);

        if (data && !error) {
          setProduct(data);
        } else if (MOCK_DB[id]) {
          setProduct(MOCK_DB[id]);
        } else {
          setNotFound(true);
        }
      } catch {
        if (MOCK_DB[id]) {
          setProduct(MOCK_DB[id]);
        } else {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]); // ← only id; supabase is module-level and stable

  if (loading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Loading product…</span>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-slate-500">Product not found.</p>
          <button onClick={() => router.push('/dashboard/products')} className="text-sm text-emerald-600 font-semibold hover:underline">
            ← Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 lg:p-8 bg-slate-50/50">
      <div className="max-w-[800px] mx-auto space-y-6">

        {/* Back link + title */}
        <div>
          <button
            onClick={() => router.push('/dashboard/products')}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 font-medium transition-colors mb-4"
          >
            <ArrowLeft size={15} /> Back to Catalog
          </button>
          <h1 className="text-2xl font-bold text-slate-800">Edit Product</h1>
          <p className="text-sm text-slate-500 mt-1">Update details for <span className="font-semibold text-slate-700">{product?.name}</span>.</p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <ProductForm initialData={product} />
        </div>

      </div>
    </div>
  );
}
