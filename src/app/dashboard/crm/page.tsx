import React from 'react';
import { CRMLeadPipeline } from '@/components/dashboard/crm/CRMLeadPipeline';

export default function DashboardCRMPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="p-4 md:px-8 md:pt-8 bg-[#FAF7F2]">
        <h1 className="text-2xl font-bold tracking-tight text-[#1D1C17]">CRM Pipeline</h1>
        <p className="text-sm text-[#5E6460] mt-1">Manage new inquiries, site visits, and pending deposits.</p>
      </div>
      <div className="flex-1 overflow-hidden">
        <CRMLeadPipeline />
      </div>
    </div>
  );
}
