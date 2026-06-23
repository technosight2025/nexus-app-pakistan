import React from 'react';
import StartPlanningWizard from '@/components/onboarding/StartPlanningWizard';
import Link from 'next/link';

export const metadata = {
  title: 'Start Planning | NEXUS',
  description: 'Onboarding wizard for couples starting their wedding planning journey on Nexus.',
};

export default function StartPlanningPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#052E20]/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center">
        {/* Logo / Header */}
        <Link href="/" className="mb-10 inline-block">
          <span className="text-3xl font-black tracking-tighter text-[#052E20]">NEXUS</span>
        </Link>
        
        {/* Wizard Component */}
        <div className="w-full">
          <StartPlanningWizard />
        </div>
      </div>
    </div>
  );
}
