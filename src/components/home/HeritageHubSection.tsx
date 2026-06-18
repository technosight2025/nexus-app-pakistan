"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { CloudLightning, ShieldAlert, ArrowRight } from 'lucide-react'; 

export function HeritageHubSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full h-full p-6 md:p-8 bg-card border border-outline rounded-[32px] shadow-sm flex flex-col justify-center"
    >
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-2xl font-black text-foreground">Nexus Heritage Hub</h3>
      </div>
      
      {/* 1. Legacy Vault */}
      <div className="flex items-start p-5 bg-[#FAF6F0] rounded-2xl border-l-4 border-[#C5A880] shadow-sm mb-4 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer group">
        <div className="flex items-center justify-center w-12 h-12 mr-4 bg-white rounded-xl shadow-sm shrink-0 group-hover:scale-105 transition-transform">
          <CloudLightning className="w-6 h-6 text-[#C5A880]" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-foreground text-base mb-1">Nexus Legacy Vault</h4>
          <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-3">
            Preserve your family's heritage with military-grade digital storage for memories and documents.
          </p>
          <button className="flex items-center text-xs font-bold text-[#C5A880] hover:text-[#A88D6A] transition-colors group-hover:translate-x-1">
            Open Vault <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* 2. Family Health Vault */}
      <div className="flex items-start p-5 bg-[#FAF6F0] rounded-2xl border-l-4 border-[#C5A880] shadow-sm mb-4 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer group">
        <div className="flex items-center justify-center w-12 h-12 mr-4 bg-white rounded-xl shadow-sm shrink-0 group-hover:scale-105 transition-transform">
          <svg className="w-6 h-6 text-[#C5A880]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-foreground text-base mb-1">Family Health Vault</h4>
          <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-3">
            Secure your family's wellness with centralized health records accessible across generations.
          </p>
          <button className="flex items-center text-xs font-bold text-[#C5A880] hover:text-[#A88D6A] transition-colors group-hover:translate-x-1">
            Secure Now <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
