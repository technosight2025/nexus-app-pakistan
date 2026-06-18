import React from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { ProductsList } from '@/components/dashboard/products/ProductsList';

export default function ProductsPage() {
  return (
    <div className="flex-1 p-6 lg:p-8 bg-slate-50/50">
      <div className="max-w-[1200px] mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Products & Services</h1>
            <p className="text-sm text-slate-500 mt-1">Manage your catalog — venues, menus, decor, and add-on services.</p>
          </div>
          <Link
            href="/dashboard/products/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <Plus size={18} />
            Add New Item
          </Link>
        </div>

        {/* List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <ProductsList />
        </div>

      </div>
    </div>
  );
}
