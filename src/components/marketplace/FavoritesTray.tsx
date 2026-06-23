"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X, MessageCircle, ChevronRight, Sparkles } from 'lucide-react'
import { useFavorites } from '@/contexts/FavoritesContext'
import { AuthWallModal } from './AuthWallModal'

export function FavoritesTray() {
  const { favorites, removeFavorite } = useFavorites()
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthWallOpen, setIsAuthWallOpen] = useState(false)

  if (favorites.length === 0) return null

  const handleMessageVendors = () => {
    setIsAuthWallOpen(true)
  }

  return (
    <>
      {/* Floating Action Button (Mobile) or Persistent Tab (Desktop) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-20 lg:bottom-10 right-6 z-40 bg-white text-[#0A3B2A] border-2 border-[#0A3B2A] shadow-xl px-5 py-3 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-transform"
          >
            <div className="relative">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-black">
                {favorites.length}
              </span>
            </div>
            <span className="hidden sm:inline">Shortlist</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Tray Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[99]"
            />
            
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 right-0 w-full sm:w-[380px] bg-white shadow-2xl z-[100] flex flex-col border-l border-slate-100"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#FAF8F5]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  </div>
                  <h3 className="font-poppins font-bold text-lg text-[#0A3B2A]">Your Shortlist</h3>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
                <AnimatePresence>
                  {favorites.map(vendor => (
                    <motion.div
                      key={vendor.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0 }}
                      className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3"
                    >
                      <img src={vendor.image} alt={vendor.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{vendor.category}</span>
                        <h4 className="font-bold text-slate-800 text-sm truncate leading-tight">{vendor.name}</h4>
                        <span className="text-xs font-bold text-[#0A3B2A] mt-1">Rs. {vendor.price}</span>
                      </div>
                      <button 
                        onClick={() => removeFavorite(vendor.id)}
                        className="text-slate-300 hover:text-rose-500 transition-colors self-start p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {favorites.length === 0 && (
                  <div className="text-center py-10 text-slate-400 font-medium">
                    Your shortlist is empty.
                  </div>
                )}
              </div>

              <div className="p-5 border-t border-slate-100 bg-white shrink-0">
                <button 
                  onClick={handleMessageVendors}
                  disabled={favorites.length === 0}
                  className="w-full h-12 bg-[#0A3B2A] hover:bg-[#155E45] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-colors disabled:opacity-50"
                >
                  <MessageCircle className="w-5 h-5" />
                  Message {favorites.length} Vendor{favorites.length !== 1 ? 's' : ''}
                </button>
                <p className="text-[11px] text-center text-slate-500 font-medium mt-3 flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3 text-yellow-500" />
                  Your list is saved securely to this device.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AuthWallModal 
        isOpen={isAuthWallOpen} 
        onClose={() => setIsAuthWallOpen(false)} 
        vendorCount={favorites.length}
      />
    </>
  )
}
