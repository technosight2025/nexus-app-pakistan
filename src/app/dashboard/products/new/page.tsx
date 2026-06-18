import React, { Suspense } from 'react';
import { ProductForm } from '@/components/dashboard/products/ProductForm';

export default function NewProductPage() {
  return (
    <div className="flex-1 p-6 lg:p-8 bg-slate-50/50">
      <div className="max-w-[800px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Add New Item</h1>
          <p className="text-sm text-slate-500 mt-1">Create a new product, service, rental, or package.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <Suspense fallback={<div className="p-4 text-center text-sm text-slate-500">Loading form...</div>}>
            <ProductForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
