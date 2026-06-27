'use client';

import React from 'react';
import { Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ClientControlCenterPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-xl mx-auto py-12 px-6">
      <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full flex items-center justify-center mb-8 animate-pulse">
        <Clock className="w-10 h-10" />
      </div>
      
      <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded bg-[#D4AF37]/5 mb-4">
        Phase 3 Milestone
      </span>
      
      <h1 className="text-3xl font-serif font-medium text-slate-900 dark:text-white mb-4">
        Client Control Center
      </h1>
      
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
        Your event workspace has been generated successfully. The client dashboard and live synchronization with artisan networks will be fully active in Phase 3.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Link 
          href="/" 
          className="flex-1 py-3 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gateway
        </Link>
        <Link 
          href="/explore" 
          className="flex-1 py-3 px-6 bg-transparent border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
        >
          Explore Partners
        </Link>
      </div>
    </div>
  );
}
