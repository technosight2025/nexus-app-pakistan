import React from 'react';
import { SalesBillingConsole } from '@/components/dashboard/sales/SalesBillingConsole';

export const metadata = {
  title: 'Sales & Invoicing | NEXUS Event OS',
  description: 'Enterprise Quotation and Invoicing Matrix',
};

export default function SalesPage() {
  return (
    <div className="h-full flex flex-col">
      <SalesBillingConsole />
    </div>
  );
}
