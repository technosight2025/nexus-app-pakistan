"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShieldCheck, MessageCircle, FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface AuthWallModalProps {
  isOpen: boolean
  onClose: () => void
  vendorCount: number
}

export function AuthWallModal({ isOpen, onClose, vendorCount }: AuthWallModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0A3B2A]/60 backdrop-blur-sm z-[110]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[480px] bg-white rounded-[32px] shadow-2xl z-[120] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="relative bg-[#FAF8F5] p-8 pb-6 border-b border-[#E8E2D5] text-center">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
              
              <div className="w-16 h-16 bg-[#0A3B2A] rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg transform -rotate-3">
                <MessageCircle className="w-8 h-8 text-yellow-500" />
              </div>
              <h2 className="text-2xl font-black font-poppins text-[#0A3B2A] leading-tight">
                Ready to contact these {vendorCount} vendors?
              </h2>
              <p className="text-slate-500 mt-2 font-medium">
                Join Nexus to start messaging, manage your quotes, and secure your bookings.
              </p>
            </div>

            {/* Benefits List */}
            <div className="p-8 space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Direct Messaging</h4>
                  <p className="text-sm text-slate-500 font-medium">Chat instantly with vendors, negotiate rates, and share inspiration boards.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Escrow Protection</h4>
                  <p className="text-sm text-slate-500 font-medium">Your funds are held securely until the vendor delivers. 100% scam-free.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Smart Quotations</h4>
                  <p className="text-sm text-slate-500 font-medium">Receive, compare, and accept digital contracts all in one centralized hub.</p>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100">
              <Link href="/start-planning?intent=message_vendors">
                <button className="w-full h-14 bg-[#0A3B2A] hover:bg-[#155E45] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-colors text-lg group">
                  Sign up to Message
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <p className="text-center text-xs text-slate-400 font-medium mt-4">
                Your shortlist will be automatically saved to your new account.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
