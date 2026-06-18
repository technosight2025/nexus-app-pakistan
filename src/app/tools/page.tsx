"use client"

import React from 'react';
import { ToolsHero } from '@/components/tools/ToolsHero';
import { ModuleBentoGrid } from '@/components/tools/ModuleBentoGrid';
import { PublicLayout } from '@/components/layout/PublicLayout';

export default function ToolsPage() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#FAF7F2]">
        <ToolsHero />
        <ModuleBentoGrid />
      </div>
    </PublicLayout>
  );
}
