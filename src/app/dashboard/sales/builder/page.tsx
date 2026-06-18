import React, { Suspense } from 'react';
import { ERPSalesOrderConsole } from '@/components/dashboard/sales/ERPSalesOrderConsole';

export const metadata = {
  title: 'ERP Sales Order Console | NEXUS Event OS',
  description: 'Enterprise resource planning sales order cockpit',
};

export default function DocumentBuilderPage() {
  return (
    <div className="h-full flex flex-col">
      <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Loading sales console...</div>}>
        <ERPSalesOrderConsole />
      </Suspense>
    </div>
  );
}
