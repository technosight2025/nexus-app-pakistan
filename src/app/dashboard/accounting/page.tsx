import React from 'react';
import { GeneralLedgerAccounting } from '@/components/dashboard/accounting/GeneralLedgerAccounting';

export const metadata = {
  title: 'Accounting & General Ledger | NEXUS Event OS',
  description: 'Macro Revenue Flow & Tax Compliance',
};

export default function AccountingPage() {
  return (
    <div className="h-full flex flex-col">
      <GeneralLedgerAccounting />
    </div>
  );
}
